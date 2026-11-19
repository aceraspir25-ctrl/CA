"use client"

import { useState } from "react"
import {
  Bot,
  ShieldCheck,
  Activity,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Sparkles,
  Layers,
  Terminal,
  Cpu
} from "lucide-react"
import { INITIAL_AI_AGENTS, AIAgent } from "@/data/aiAgentsData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function AIAgentsPage() {
  const [agents, setAgents] = useState<AIAgent[]>(INITIAL_AI_AGENTS)
  const [selectedAgent, setSelectedAgent] = useState<AIAgent>(INITIAL_AI_AGENTS[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [runningTaskId, setRunningTaskId] = useState<string | null>(null)

  const handleRunAgent = (agentId: string) => {
    setRunningTaskId(agentId)
    setTimeout(() => {
      setAgents((prev) =>
        prev.map((a) => {
          if (a.id === agentId) {
            const newLog = {
              id: `log-${Date.now()}`,
              timestamp: "Just now",
              level: "SUCCESS" as const,
              message: `Manually initiated task cycle completed successfully: Verified data consistency across all assigned syllabus endpoints.`,
            }
            return {
              ...a,
              tasksCompleted: a.tasksCompleted + 1,
              lastRunTime: "Just now",
              logs: [newLog, ...a.logs],
            }
          }
          return a
        })
      )
      setRunningTaskId(null)
    }, 1200)
  }

  const filteredAgents = agents.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || a.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Cpu className="h-6 w-6 text-indigo-300" />
            </div>
            <h1 className="text-2xl font-bold">Academic AI Agent Orchestration System</h1>
            <Badge className="bg-emerald-500 text-white">10 Autonomous Agents</Badge>
          </div>
          <p className="text-indigo-200 text-sm max-w-2xl">
            Specialized autonomous academic agents operating under strict non-destructive permissions. Handling literature surveillance, question synthesis, peer review, and syllabus monitoring.
          </p>
        </div>

        {/* Safety Badge */}
        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center gap-3 shrink-0">
          <ShieldCheck className="h-8 w-8 text-emerald-400" />
          <div className="text-xs">
            <p className="font-bold text-white">Non-Destructive Boundary</p>
            <p className="text-emerald-300">Read-Only & Verified Append Only</p>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            <Input
              placeholder="Search agent name, code, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-[hsl(var(--muted))] p-1 rounded-lg shrink-0">
          <Filter className="h-3.5 w-3.5 text-indigo-500 ml-1" />
          {["all", "running", "scheduled", "idle"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition-all ${
                statusFilter === st
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Agent Cards + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Agent Cards */}
        <div className="lg:col-span-2 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredAgents.map((agent) => {
              const isSelected = selectedAgent.id === agent.id
              const isRunning = runningTaskId === agent.id

              return (
                <Card
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={`cursor-pointer transition-all border ${
                    isSelected
                      ? "border-blue-600 shadow-md ring-2 ring-blue-500/20 bg-blue-50/20 dark:bg-blue-950/20"
                      : "hover:border-[hsl(var(--border))] hover:shadow-xs"
                  }`}
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-[hsl(var(--muted))] text-indigo-600 dark:text-indigo-400">
                          {agent.code}
                        </span>
                        <CardTitle className="text-sm font-bold">{agent.name}</CardTitle>
                      </div>
                      <Badge
                        variant={
                          agent.status === "running"
                            ? "default"
                            : agent.status === "scheduled"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-[10px] capitalize shrink-0"
                      >
                        {agent.status}
                      </Badge>
                    </div>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">
                      {agent.role}
                    </p>
                  </CardHeader>
                  <CardContent className="p-4 pt-1 space-y-3 text-xs">
                    <p className="text-[hsl(var(--muted-foreground))] line-clamp-2 leading-relaxed">
                      {agent.description}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-[hsl(var(--muted-foreground))] pt-2 border-t border-[hsl(var(--border))]">
                      <span>Tasks: <strong>{agent.tasksCompleted}</strong></span>
                      <span>Success: <strong>{agent.successRate}%</strong></span>
                      <span>{agent.lastRunTime}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <div className="flex flex-wrap gap-1">
                        {agent.institutions.slice(0, 3).map((inst) => (
                          <span
                            key={inst}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                          >
                            {inst}
                          </span>
                        ))}
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isRunning}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRunAgent(agent.id)
                        }}
                        className="h-7 px-2.5 text-[11px] gap-1 shrink-0"
                      >
                        {isRunning ? (
                          <>
                            <RotateCcw className="h-3 w-3 animate-spin text-blue-600" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="h-3 w-3 text-emerald-600" />
                            Trigger
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Right Col: Live Agent Inspector & Activity Log */}
        <div className="space-y-4">
          <Card className="border-[hsl(var(--border))] shadow-md">
            <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="font-mono text-xs">
                  {selectedAgent.code} Inspector
                </Badge>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Safety Verified
                </span>
              </div>
              <CardTitle className="text-base mt-2">{selectedAgent.name}</CardTitle>
              <CardDescription className="text-xs">{selectedAgent.role}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-4 text-xs">
              <div>
                <p className="font-bold text-[hsl(var(--foreground))] mb-1">Assigned Scope:</p>
                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {selectedAgent.description}
                </p>
              </div>

              <div>
                <p className="font-bold text-[hsl(var(--foreground))] mb-1.5">Permitted Actions:</p>
                <div className="space-y-1">
                  {selectedAgent.permissions.map((p, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[hsl(var(--border))]">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-[hsl(var(--foreground))] flex items-center gap-1">
                    <Terminal className="h-3.5 w-3.5 text-indigo-500" /> Live Execution Stream
                  </p>
                  <span className="text-[10px] text-[hsl(var(--muted-foreground))]">Real-Time</span>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {selectedAgent.logs.map((log) => (
                    <div
                      key={log.id}
                      className="p-2.5 rounded-lg bg-[hsl(var(--muted))]/50 border border-[hsl(var(--border))] space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span
                          className={`font-bold px-1.5 py-0.5 rounded ${
                            log.level === "SUCCESS" || log.level === "VERIFIED"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                          }`}
                        >
                          {log.level}
                        </span>
                        <span className="text-[hsl(var(--muted-foreground))]">{log.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-[hsl(var(--foreground))] leading-relaxed">
                        {log.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[hsl(var(--border))]">
                <Button
                  onClick={() => handleRunAgent(selectedAgent.id)}
                  disabled={runningTaskId === selectedAgent.id}
                  className="w-full text-xs gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  {runningTaskId === selectedAgent.id ? (
                    <>
                      <RotateCcw className="h-4 w-4 animate-spin" />
                      Executing Cycle...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Run Diagnostic & Update Cycle
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
