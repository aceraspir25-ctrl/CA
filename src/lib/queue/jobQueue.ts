/**
 * JARVIS CCA-04: Durable Background Job Queue Interface & Types
 * Supports autonomous multi-agent task distribution, retry backoff, and execution observability.
 */

import { AgentCode } from "@/lib/agents/types"

export type JobStatus = "pending" | "in_progress" | "completed" | "failed" | "awaiting_approval"
export type JobPriority = "low" | "medium" | "high" | "critical"

export interface JobTask {
  id: string
  runId?: string
  assignedAgent: AgentCode
  taskType: string
  intent: string
  inputPayload: Record<string, any>
  outputResult?: any
  errorMessage?: string
  status: JobStatus
  priority: JobPriority
  maxRetries?: number
  retryCount: number
  createdAt: string
  updatedAt: string
  scheduledFor?: string
  claimedAt?: string
  completedAt?: string
  claimedBy?: string
}

export interface QueueMetrics {
  pending: number
  inProgress: number
  completed: number
  failed: number
  totalProcessed: number
  averageExecutionTimeMs: number
}

export interface IJobQueue {
  enqueue(
    task: Omit<JobTask, "id" | "status" | "createdAt" | "updatedAt" | "retryCount">
  ): Promise<JobTask>

  claimNext(agent?: AgentCode, workerId?: string): Promise<JobTask | null>

  complete(taskId: string, result: any): Promise<void>

  fail(taskId: string, error: string): Promise<void>

  listTasks(options?: {
    status?: JobStatus
    assignedAgent?: AgentCode
    limit?: number
  }): Promise<JobTask[]>

  getMetrics(): Promise<QueueMetrics>

  purgeCompleted(olderThanHours?: number): Promise<number>
}
