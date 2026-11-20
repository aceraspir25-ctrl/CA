/**
 * JARVIS CCA-04: Multi-Agent Common Types & Communication Protocol
 */

export type AgentCode =
  | "LEADER-00"
  | "ACADEMIC-01"
  | "RESOURCE-02"
  | "TUTOR-03"
  | "EXAM-04"
  | "RESEARCH-05"
  | "CAREER-06"
  | "TRACKER-07"
  | "UPDATE-08"

export type AgentExecutionStatus = "idle" | "running" | "completed" | "failed" | "awaiting_approval"

export interface AgentTaskRequest {
  taskId: string
  targetAgent: AgentCode
  intent: string
  payload: Record<string, any>
  requester: "user" | "leader" | "telegram" | "cron"
  requiresHumanApproval?: boolean
}

export interface AgentExecutionLog {
  id: string
  timestamp: string
  level: "INFO" | "WARN" | "SUCCESS" | "VERIFIED" | "ERROR"
  agentCode: AgentCode
  message: string
  metadata?: Record<string, any>
}

export interface AgentOutput<T = any> {
  success: boolean
  agentCode: AgentCode
  taskId: string
  summary: string
  data: T
  error?: string
  confidenceScore: number
  requiresApproval: boolean
  approvalToken?: string
  executionTimeMs: number
  timestamp: string
  logs: AgentExecutionLog[]
}

export interface AcademicAgentDefinition {
  code: AgentCode
  name: string
  role: string
  description: string
  permissions: string[]
  responsibilities: string[]
  execute: (task: AgentTaskRequest) => Promise<AgentOutput>
}
