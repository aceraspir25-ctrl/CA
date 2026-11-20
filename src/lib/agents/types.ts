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
  | "CONTENT-09"
  | "PAPER-10"
  | "QUESTION-11"
  | "SOLUTION-12"
  | "QUALITY-13"
  | "LANGUAGE-14"
  | "SYLLABUS-15"
  | "FRIDAY-SEC"

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

// ── FRIDAY Security Types ──────────────────────────────────────────────────
export type IncidentSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
export type IncidentCategory =
  | "PROMPT_INJECTION"
  | "UNAUTHORIZED_ACCESS"
  | "DATA_LEAK"
  | "RLS_VIOLATION"
  | "DEPENDENCY_VULNERABILITY"
  | "ANOMALOUS_AGENT_BEHAVIOUR"
  | "SECRET_EXPOSURE"
  | "RATE_LIMIT_BREACH"

export interface SecurityIncident {
  id: string
  timestamp: string
  severity: IncidentSeverity
  category: IncidentCategory
  title: string
  detail: string
  source: string          // which agent/route triggered it
  resolved: boolean
  resolutionNote?: string
}

export interface FridayAuditReport {
  auditId: string
  timestamp: string
  healthScore: number     // 0-100
  rlsStatus: "PASS" | "WARN" | "FAIL"
  dependencyStatus: "PASS" | "WARN" | "FAIL"
  promptInjectionStatus: "PASS" | "WARN" | "FAIL"
  openIncidents: SecurityIncident[]
  resolvedCount: number
  recommendations: string[]
  agentTrustScores: Record<string, number>
}
