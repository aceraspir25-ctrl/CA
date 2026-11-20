/**
 * JARVIS CCA-04: Agent Workforce Orchestration API
 *
 * GET  /api/agents — Returns the list of all registered specialist agents (LEADER-00 through SYLLABUS-15)
 * POST /api/agents — Dispatches a task to LEADER-00 or a specific specialist agent
 */

import { NextRequest, NextResponse } from "next/server"
import { globalLeaderOrchestrator } from "@/lib/agents/orchestrator"
import { AgentTaskRequest } from "@/lib/agents/types"

export async function GET() {
  const specialists = globalLeaderOrchestrator.getAllSpecialists().map(agent => ({
    code: agent.code,
    name: agent.name,
    role: agent.role,
    description: agent.description,
    permissions: agent.permissions,
    responsibilities: agent.responsibilities
  }))

  return NextResponse.json({
    orchestrator: {
      code: "LEADER-00",
      name: "Autonomous Multi-Agent Orchestrator",
      status: "ACTIVE"
    },
    totalSpecialists: specialists.length,
    specialists
  }, { status: 200 })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { intent, targetAgent = "LEADER-00", payload = {}, requester = "user" } = body

    if (!intent || typeof intent !== "string") {
      return NextResponse.json({ error: "Missing required 'intent' string." }, { status: 400 })
    }

    const task: AgentTaskRequest = {
      taskId: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      targetAgent,
      intent,
      payload,
      requester
    }

    const output = await globalLeaderOrchestrator.execute(task)
    return NextResponse.json(output, { status: output.success ? 200 : 500 })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message || "Internal agent execution error"
    }, { status: 500 })
  }
}
