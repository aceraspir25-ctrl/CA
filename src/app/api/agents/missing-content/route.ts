/**
 * JARVIS CCA-04: Missing Content Hunter API
 *
 * GET  /api/agents/missing-content — Returns coverage score, per-course breakdown, and gap items
 * POST /api/agents/missing-content — Triggers missing gap scan or auto-hunt queueing
 */

import { NextRequest, NextResponse } from "next/server"
import {
  COURSE_COVERAGE_REGISTRY,
  scanMissingContentGaps,
  getSystemCoverageMetrics
} from "@/data/coverageMatrix"
import { globalJobQueue } from "@/lib/queue/supabaseQueueAdapter"
import { sendTelegramMessage } from "@/lib/telegram/bot"

export async function GET() {
  const metrics = getSystemCoverageMetrics()
  const gaps = scanMissingContentGaps()

  return NextResponse.json({
    metrics,
    totalGaps: gaps.length,
    courses: COURSE_COVERAGE_REGISTRY,
    gaps
  }, { status: 200 })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { action = "scan", maxTasksToEnqueue = 10 } = body

    const gaps = scanMissingContentGaps()

    if (action === "scan") {
      return NextResponse.json({
        success: true,
        totalGapsDetected: gaps.length,
        gaps
      }, { status: 200 })
    }

    if (action === "auto_hunt") {
      // Enqueue top priority gaps to globalJobQueue
      const tasksToEnqueue = gaps.slice(0, maxTasksToEnqueue)
      const enqueuedTasks = []

      for (const gap of tasksToEnqueue) {
        const task = await globalJobQueue.enqueue({
          assignedAgent: gap.assignedAgent,
          taskType: `hunt_${gap.pillar}`,
          intent: gap.intent,
          inputPayload: gap.payload,
          priority: gap.priority
        })
        enqueuedTasks.push(task)
      }

      // Notify Telegram
      await sendTelegramMessage(
        `🎯 *LEADER-00: Missing Content Hunter Triggered*\n` +
        `Detected *${gaps.length}* academic coverage gaps across courses.\n` +
        `Enqueued top *${enqueuedTasks.length}* tasks for autonomous fulfillment by CONTENT-09, PAPER-10 & QUESTION-11.`
      ).catch(() => null)

      return NextResponse.json({
        success: true,
        enqueuedCount: enqueuedTasks.length,
        totalRemainingGaps: gaps.length - enqueuedTasks.length,
        enqueuedTasks
      }, { status: 201 })
    }

    return NextResponse.json({ error: `Unknown action '${action}'. Use 'scan' or 'auto_hunt'.` }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Missing content scan error" }, { status: 500 })
  }
}
