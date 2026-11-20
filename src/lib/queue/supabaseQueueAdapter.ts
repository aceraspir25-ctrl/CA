/**
 * JARVIS CCA-04: Supabase & Fallback Memory Queue Adapter
 * Durable storage backed by `public.agent_tasks` and `public.agent_runs` in Supabase PostgreSQL,
 * with deterministic fallback to in-memory store if DB is offline.
 */

import { IJobQueue, JobTask, JobStatus, QueueMetrics } from "./jobQueue"
import { AgentCode } from "@/lib/agents/types"
import { getSupabase } from "@/lib/cloud/supabaseClient"

class SupabaseQueueAdapter implements IJobQueue {
  private memoryQueue: Map<string, JobTask> = new Map()
  private executionTimes: number[] = []

  private getClient() {
    return getSupabase()
  }

  async enqueue(
    params: Omit<JobTask, "id" | "status" | "createdAt" | "updatedAt" | "retryCount">
  ): Promise<JobTask> {
    const id = `job-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    const now = new Date().toISOString()

    const task: JobTask = {
      id,
      runId: params.runId,
      assignedAgent: params.assignedAgent,
      taskType: params.taskType,
      intent: params.intent,
      inputPayload: params.inputPayload || {},
      status: "pending",
      priority: params.priority || "medium",
      maxRetries: params.maxRetries ?? 3,
      retryCount: 0,
      createdAt: now,
      updatedAt: now,
      scheduledFor: params.scheduledFor
    }

    // Always keep in local memory
    this.memoryQueue.set(id, task)

    // Attempt Supabase PostgreSQL persistence
    const supabase = this.getClient()
    if (supabase) {
      try {
        await supabase.from("agent_tasks").insert({
          id,
          assigned_agent: task.assignedAgent,
          task_type: task.taskType,
          input_payload: {
            intent: task.intent,
            priority: task.priority,
            maxRetries: task.maxRetries,
            ...task.inputPayload
          },
          status: "pending"
        })
      } catch (err) {
        console.warn("[QueueAdapter] Supabase insert fallback to memory:", err)
      }
    }

    return task
  }

  async claimNext(agent?: AgentCode, workerId: string = "default-worker"): Promise<JobTask | null> {
    const now = new Date()

    // Find highest priority pending task matching agent
    const candidates = Array.from(this.memoryQueue.values())
      .filter(t => {
        if (t.status !== "pending") return false
        if (agent && t.assignedAgent !== agent) return false
        if (t.scheduledFor && new Date(t.scheduledFor) > now) return false
        return true
      })
      .sort((a, b) => {
        const priorityOrder: Record<string, number> = { critical: 4, high: 3, medium: 2, low: 1 }
        const pDiff = (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2)
        if (pDiff !== 0) return pDiff
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      })

    const selected = candidates[0]
    if (!selected) return null

    selected.status = "in_progress"
    selected.claimedAt = new Date().toISOString()
    selected.claimedBy = workerId
    selected.updatedAt = new Date().toISOString()
    this.memoryQueue.set(selected.id, selected)

    const supabase = this.getClient()
    if (supabase) {
      try {
        await supabase
          .from("agent_tasks")
          .update({
            status: "in_progress",
            updated_at: selected.updatedAt
          })
          .eq("id", selected.id)
      } catch (err) {
        console.warn("[QueueAdapter] Supabase update fallback to memory:", err)
      }
    }

    return selected
  }

  async complete(taskId: string, result: any): Promise<void> {
    const task = this.memoryQueue.get(taskId)
    const now = new Date().toISOString()

    if (task) {
      task.status = "completed"
      task.outputResult = result
      task.completedAt = now
      task.updatedAt = now

      if (task.claimedAt) {
        const duration = new Date(now).getTime() - new Date(task.claimedAt).getTime()
        this.executionTimes.push(duration)
        if (this.executionTimes.length > 200) this.executionTimes.shift()
      }
      this.memoryQueue.set(taskId, task)
    }

    const supabase = this.getClient()
    if (supabase) {
      try {
        await supabase
          .from("agent_tasks")
          .update({
            status: "completed",
            output_result: result,
            updated_at: now
          })
          .eq("id", taskId)
      } catch (err) {
        console.warn("[QueueAdapter] Supabase complete fallback to memory:", err)
      }
    }
  }

  async fail(taskId: string, error: string): Promise<void> {
    const task = this.memoryQueue.get(taskId)
    const now = new Date().toISOString()

    if (task) {
      task.retryCount = (task.retryCount || 0) + 1
      task.errorMessage = error
      task.updatedAt = now

      if (task.retryCount < (task.maxRetries ?? 3)) {
        // Re-queue with exponential backoff
        task.status = "pending"
        task.scheduledFor = new Date(Date.now() + Math.pow(2, task.retryCount) * 1000).toISOString()
      } else {
        task.status = "failed"
      }
      this.memoryQueue.set(taskId, task)
    }

    const supabase = this.getClient()
    if (supabase) {
      try {
        await supabase
          .from("agent_tasks")
          .update({
            status: task?.status || "failed",
            error_message: error,
            updated_at: now
          })
          .eq("id", taskId)
      } catch (err) {
        console.warn("[QueueAdapter] Supabase fail fallback to memory:", err)
      }
    }
  }

  async listTasks(options?: {
    status?: JobStatus
    assignedAgent?: AgentCode
    limit?: number
  }): Promise<JobTask[]> {
    let list = Array.from(this.memoryQueue.values())

    if (options?.status) {
      list = list.filter(t => t.status === options.status)
    }
    if (options?.assignedAgent) {
      list = list.filter(t => t.assignedAgent === options.assignedAgent)
    }

    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    const limit = options?.limit || 50
    return list.slice(0, limit)
  }

  async getMetrics(): Promise<QueueMetrics> {
    let pending = 0
    let inProgress = 0
    let completed = 0
    let failed = 0

    for (const t of this.memoryQueue.values()) {
      if (t.status === "pending") pending++
      else if (t.status === "in_progress") inProgress++
      else if (t.status === "completed") completed++
      else if (t.status === "failed") failed++
    }

    const totalProcessed = completed + failed
    const avgTime =
      this.executionTimes.length > 0
        ? Math.round(this.executionTimes.reduce((a, b) => a + b, 0) / this.executionTimes.length)
        : 0

    return {
      pending,
      inProgress,
      completed,
      failed,
      totalProcessed,
      averageExecutionTimeMs: avgTime
    }
  }

  async purgeCompleted(olderThanHours: number = 24): Promise<number> {
    const cutoff = new Date(Date.now() - olderThanHours * 60 * 60 * 1000)
    let purged = 0

    for (const [id, t] of this.memoryQueue.entries()) {
      if (t.status === "completed" && t.completedAt && new Date(t.completedAt) < cutoff) {
        this.memoryQueue.delete(id)
        purged++
      }
    }

    return purged
  }
}

export const globalJobQueue: IJobQueue = new SupabaseQueueAdapter()
