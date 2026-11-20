/**
 * JARVIS CCA-04: Autonomous 24×7 Background Task Scheduler & Worker Runner
 * Manages periodic cron-style task generation, budget tracking, and queue consumption.
 */

import { globalJobQueue } from "./supabaseQueueAdapter"
import { JobTask } from "./jobQueue"
import { globalLeaderOrchestrator } from "@/lib/agents/orchestrator"
import { FRIDAY } from "@/lib/agents/friday"
import { sendTelegramMessage } from "@/lib/telegram/bot"

export interface BudgetConfig {
  maxDailyAiCalls: number
  currentDailyAiCalls: number
  resetDate: string
}

const budgetState: BudgetConfig = {
  maxDailyAiCalls: 500,
  currentDailyAiCalls: 0,
  resetDate: new Date().toISOString().split("T")[0]
}

export class AgentScheduler {
  private isProcessing = false
  private schedulerTimer: NodeJS.Timeout | null = null

  /**
   * Check and reset daily budget counter if day rolled over
   */
  private checkBudget(): boolean {
    const today = new Date().toISOString().split("T")[0]
    if (budgetState.resetDate !== today) {
      budgetState.resetDate = today
      budgetState.currentDailyAiCalls = 0
    }
    return budgetState.currentDailyAiCalls < budgetState.maxDailyAiCalls
  }

  recordAiCall() {
    budgetState.currentDailyAiCalls++
  }

  getBudgetStatus() {
    this.checkBudget()
    return { ...budgetState }
  }

  /**
   * Schedule recurring maintenance jobs
   */
  async triggerPeriodicSchedules() {
    if (!this.checkBudget()) {
      console.warn("[Scheduler] Daily AI budget exceeded. Skipping auto-enqueue.")
      return
    }

    // 1. Hourly UPDATE-08 check
    await globalJobQueue.enqueue({
      assignedAgent: "UPDATE-08",
      taskType: "statutory_update_scan",
      intent: "Scan for recent statutory amendments, CBDT circulars & ICAI notifications",
      inputPayload: { scope: "daily_amendments" },
      priority: "medium",
      maxRetries: 2
    })

    // 2. Weekly SYLLABUS-15 audit
    await globalJobQueue.enqueue({
      assignedAgent: "SYLLABUS-15",
      taskType: "syllabus_scheme_audit",
      intent: "Verify active syllabus schemes and exam notification dates for CA, CMA, CS",
      inputPayload: { boards: ["ICAI", "ICMAI", "ICSI"] },
      priority: "low",
      maxRetries: 1
    })

    // 3. FRIDAY Security Audit
    const auditReport = await FRIDAY.runFullAudit()
    if (auditReport.healthScore < 70 || auditReport.openIncidents.length > 0) {
      // Alert admin on Telegram
      await sendTelegramMessage(
        `🚨 *FRIDAY Security Alert*\n` +
        `Security Health Score: ${auditReport.healthScore}/100\n` +
        `Open Incidents: ${auditReport.openIncidents.length}\n` +
        `Immediate review recommended at /security`
      ).catch(() => null)
    }
  }

  /**
   * Worker Loop: Claims and processes pending tasks from the queue
   */
  async processNextJob(workerId: string = "orchestrator-worker"): Promise<{ processed: boolean; task?: JobTask; error?: string }> {
    if (this.isProcessing) return { processed: false }
    this.isProcessing = true

    try {
      const task = await globalJobQueue.claimNext(undefined, workerId)
      if (!task) {
        return { processed: false }
      }

      console.log(`[Scheduler] Processing task ${task.id} (${task.assignedAgent}): "${task.intent}"`)

      // Execute through LEADER-00 orchestrator
      const output = await globalLeaderOrchestrator.execute({
        taskId: task.id,
        targetAgent: task.assignedAgent,
        intent: task.intent,
        payload: task.inputPayload,
        requester: "leader"
      })

      if (output.success) {
        await globalJobQueue.complete(task.id, output.data)
        this.recordAiCall()

        // Notify telegram if priority is high or critical
        if (task.priority === "high" || task.priority === "critical") {
          await sendTelegramMessage(
            `✅ *Agent Task Completed*\n` +
            `Agent: *${task.assignedAgent}*\n` +
            `Task: ${task.intent}\n` +
            `Summary: ${output.summary}`
          ).catch(() => null)
        }

        return { processed: true, task }
      } else {
        await globalJobQueue.fail(task.id, output.error || "Agent execution failed")
        return { processed: true, task, error: output.error }
      }
    } catch (err: any) {
      return { processed: false, error: err?.message }
    } finally {
      this.isProcessing = false
    }
  }

  /**
   * Process a batch of pending jobs
   */
  async processBatch(maxJobs: number = 5): Promise<number> {
    let completed = 0
    for (let i = 0; i < maxJobs; i++) {
      const res = await this.processNextJob(`batch-worker-${i}`)
      if (!res.processed) break
      completed++
    }
    return completed
  }
}

export const globalScheduler = new AgentScheduler()
