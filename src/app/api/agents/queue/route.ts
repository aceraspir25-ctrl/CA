/**
 * JARVIS CCA-04: Agent Background Task Queue API
 *
 * GET  /api/agents/queue — Returns queue metrics, tasks list, and AI budget usage
 * POST /api/agents/queue — Dispatches enqueue, process, batch, or schedule commands
 */

import { NextRequest, NextResponse } from "next/server"
import { globalJobQueue } from "@/lib/queue/supabaseQueueAdapter"
import { globalScheduler } from "@/lib/queue/scheduler"
import { AgentCode } from "@/lib/agents/types"

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const status = url.searchParams.get("status") as any
  const agent = url.searchParams.get("agent") as AgentCode | null
  const limit = parseInt(url.searchParams.get("limit") || "30", 10)

  const [metrics, tasks, budget] = await Promise.all([
    globalJobQueue.getMetrics(),
    globalJobQueue.listTasks({
      status: status || undefined,
      assignedAgent: agent || undefined,
      limit
    }),
    Promise.resolve(globalScheduler.getBudgetStatus())
  ])

  return NextResponse.json({
    metrics,
    budget,
    tasksCount: tasks.length,
    tasks
  }, { status: 200 })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { action = "process", assignedAgent, taskType, intent, inputPayload, priority, count = 5 } = body

    if (action === "enqueue") {
      if (!assignedAgent || !intent) {
        return NextResponse.json({ error: "Missing 'assignedAgent' or 'intent'." }, { status: 400 })
      }
      const task = await globalJobQueue.enqueue({
        assignedAgent,
        taskType: taskType || "custom_agent_task",
        intent,
        inputPayload: inputPayload || {},
        priority: priority || "medium"
      })
      return NextResponse.json({ success: true, task }, { status: 201 })
    }

    if (action === "process") {
      const result = await globalScheduler.processNextJob("api-worker")
      return NextResponse.json({ success: true, ...result })
    }

    if (action === "batch") {
      const processedCount = await globalScheduler.processBatch(Number(count) || 5)
      return NextResponse.json({ success: true, processedCount })
    }

    if (action === "schedule") {
      await globalScheduler.triggerPeriodicSchedules()
      return NextResponse.json({ success: true, message: "Periodic background schedules enqueued." })
    }

    if (action === "purge") {
      const purged = await globalJobQueue.purgeCompleted(1)
      return NextResponse.json({ success: true, purgedCount: purged })
    }

    return NextResponse.json({ error: `Unknown action '${action}'` }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Queue processing error" }, { status: 500 })
  }
}
