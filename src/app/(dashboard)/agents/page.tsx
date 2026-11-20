"use client"

import { useState, useEffect, useCallback } from "react"
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
  Cpu,
  RefreshCw,
  Zap,
  Target,
  FileCheck,
  TrendingUp,
  BarChart3,
  Flame
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"

interface Specialist {
  code: string
  name: string
  role: string
  description: string
  permissions: string[]
  responsibilities: string[]
}

interface QueueMetrics {
  pending: number
  inProgress: number
  completed: number
  failed: number
  totalProcessed: number
  averageExecutionTimeMs: number
}

interface CoverageRecord {
  courseId: string
  courseName: string
  institution?: string
  category: string
  overallCoveragePercent: number
  criticalGaps: string[]
  pillars: {
    pillar: string
    name: string
    scorePercent: number
    status: string
    itemsPresent: number
    itemsRequired: number
  }[]
}

export default function AgentControlCenterPage() {
  const [specialists, setSpecialists] = useState<Specialist[]>([])
  const [selectedAgent, setSelectedAgent] = useState<Specialist | null>(null)
  const [metrics, setMetrics] = useState<QueueMetrics | null>(null)
  const [coverageRecords, setCoverageRecords] = useState<CoverageRecord[]>([])
  const [overallCoverage, setOverallCoverage] = useState<number>(86)
  const [totalGaps, setTotalGaps] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [hunting, setHunting] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState<"fleet" | "coverage" | "queue">("fleet")
  const [filterQuery, setFilterQuery] = useState("")
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [agentsRes, queueRes, coverageRes] = await Promise.all([
        fetch("/api/agents"),
        fetch("/api/agents/queue"),
        fetch("/api/agents/missing-content")
      ])

      if (agentsRes.ok) {
        const aData = await agentsRes.json()
        setSpecialists(aData.specialists || [])
        if (!selectedAgent && aData.specialists?.length > 0) {
          setSelectedAgent(aData.specialists[0])
        }
      }

      if (queueRes.ok) {
        const qData = await queueRes.json()
        setMetrics(qData.metrics)
      }

      if (coverageRes.ok) {
        const cData = await coverageRes.json()
        setCoverageRecords(cData.courses || [])
        setOverallCoverage(cData.metrics?.averageCoveragePercent || 86)
        setTotalGaps(cData.totalGaps || 0)
      }
    } catch (err) {
      console.warn("Failed to fetch live agent data:", err)
    } finally {
      setLoading(false)
    }
  }, [selectedAgent])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleTriggerAutoHunt = async () => {
    setHunting(true)
    setActionMessage(null)
    try {
      const res = await fetch("/api/agents/missing-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "auto_hunt", maxTasksToEnqueue: 8 })
      })
      if (res.ok) {
        const data = await res.json()
        setActionMessage(`🎯 Auto-Hunt Triggered! Enqueued ${data.enqueuedCount} high-priority gap tasks.`)
        await fetchData()
      }
    } finally {
      setHunting(false)
    }
  }

  const handleProcessNextJob = async () => {
    setProcessing(true)
    setActionMessage(null)
    try {
      const res = await fetch("/api/agents/queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "process" })
      })
      if (res.ok) {
        const data = await res.json()
        if (data.processed) {
          setActionMessage(`✅ Task processed by ${data.task?.assignedAgent}: "${data.task?.intent}"`)
        } else {
          setActionMessage("Queue is currently idle (no pending tasks).")
        }
        await fetchData()
      }
    } finally {
      setProcessing(false)
    }
  }

  const filteredSpecialists = specialists.filter(
    s =>
      s.code.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(filterQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Autonomous Agent Control Centre
            </h1>
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs">
              LEADER-00 ACTIVE
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            24×7 multi-agent autonomous workforce coordinating academic intelligence across India
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            disabled={loading}
            className="border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800"
          >
            <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button
            size="sm"
            onClick={handleProcessNextJob}
            disabled={processing}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Play className={`h-4 w-4 mr-1.5 ${processing ? "animate-spin" : ""}`} />
            Run Next Task
          </Button>

          <Button
            size="sm"
            onClick={handleTriggerAutoHunt}
            disabled={hunting}
            className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-900/30"
          >
            <Target className={`h-4 w-4 mr-1.5 ${hunting ? "animate-spin" : ""}`} />
            Auto-Hunt Gaps
          </Button>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionMessage && (
        <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300 flex items-center gap-2 animate-in fade-in">
          <Sparkles className="h-4 w-4 text-indigo-400 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/60 border-slate-800">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Coverage Readiness</span>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">{overallCoverage}%</div>
            <p className="text-[11px] text-slate-500 mt-1">Tier-1 Indian Academic Standards</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Active Queue Tasks</span>
              <Activity className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400">{metrics?.pending ?? 0}</div>
            <p className="text-[11px] text-slate-500 mt-1">{metrics?.inProgress ?? 0} in progress</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Missing Content Gaps</span>
              <Target className="h-4 w-4 text-rose-400" />
            </div>
            <div className="text-3xl font-black text-rose-400">{totalGaps}</div>
            <p className="text-[11px] text-slate-500 mt-1">Identified by Hunter</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Specialist Agents</span>
              <Cpu className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-3xl font-black text-blue-400">{specialists.length}</div>
            <p className="text-[11px] text-slate-500 mt-1">+ FRIDAY & LEADER-00</p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("fleet")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "fleet" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          Specialist Fleet ({specialists.length})
        </button>
        <button
          onClick={() => setActiveTab("coverage")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "coverage" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          Course Coverage Matrix ({coverageRecords.length} Qualifications)
        </button>
      </div>

      {/* TAB 1: SPECIALIST FLEET */}
      {activeTab === "fleet" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent Roster List */}
          <div className="lg:col-span-1 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search agents by code or skill..."
                value={filterQuery}
                onChange={e => setFilterQuery(e.target.value)}
                className="pl-9 bg-slate-900/60 border-slate-800 text-xs text-white"
              />
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredSpecialists.map(agent => (
                <div
                  key={agent.code}
                  onClick={() => setSelectedAgent(agent)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedAgent?.code === agent.code
                      ? "bg-indigo-950/40 border-indigo-500/60 shadow-md"
                      : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-indigo-400">{agent.code}</span>
                    <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400 bg-emerald-500/5">
                      READY
                    </Badge>
                  </div>
                  <p className="text-xs font-semibold text-slate-200 mt-1">{agent.name}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{agent.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Inspector View */}
          <div className="lg:col-span-2">
            {selectedAgent ? (
              <Card className="bg-slate-900/60 border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-indigo-400" />
                      </div>
                      <div>
                        <CardTitle className="text-base text-white">{selectedAgent.name}</CardTitle>
                        <CardDescription className="text-xs font-mono text-indigo-400">
                          {selectedAgent.code}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                      AUTONOMOUS
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-xs">
                  <div>
                    <h3 className="font-semibold text-slate-300 mb-1">Role Description</h3>
                    <p className="text-slate-400 leading-relaxed">{selectedAgent.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-300 mb-1.5">Primary Responsibilities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedAgent.responsibilities.map((r, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/40 border border-slate-800 text-slate-300 text-[11px]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-300 mb-1.5">Granted Permissions</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedAgent.permissions.map((p, i) => (
                        <Badge key={i} variant="outline" className="text-[10px] border-slate-700 bg-slate-800/60 text-slate-300 font-mono">
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-64 flex items-center justify-center text-slate-500 text-xs">
                Select an agent from the roster to inspect details
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: COURSE COVERAGE MATRIX */}
      {activeTab === "coverage" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coverageRecords.map(course => (
              <Card key={course.courseId} className="bg-slate-900/60 border-slate-800">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-400 mb-1">
                        {course.institution} • {course.category}
                      </Badge>
                      <CardTitle className="text-sm font-bold text-white">{course.courseName}</CardTitle>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-emerald-400">{course.overallCoveragePercent}%</span>
                      <p className="text-[10px] text-slate-500">Coverage</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-2">
                  <Progress value={course.overallCoveragePercent} className="h-1.5 bg-slate-800" />

                  {/* Pillars Breakdown */}
                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    {course.pillars.map(p => (
                      <div key={p.pillar} className="p-2 rounded bg-slate-800/40 border border-slate-800/80">
                        <div className="text-slate-400 text-[10px] truncate">{p.name}</div>
                        <div className="font-bold text-slate-200 mt-0.5">
                          {p.scorePercent}%
                          <span className="text-[9px] text-slate-500 ml-1">({p.itemsPresent}/{p.itemsRequired})</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Critical Gaps Flagged */}
                  {course.criticalGaps && course.criticalGaps.length > 0 && (
                    <div className="p-2 rounded-lg bg-rose-950/20 border border-rose-500/20 text-[11px] text-rose-300 space-y-1">
                      <div className="font-semibold flex items-center gap-1.5 text-rose-400">
                        <Flame className="h-3 w-3" /> Identified Critical Gaps:
                      </div>
                      {course.criticalGaps.map((gap, i) => (
                        <div key={i} className="pl-4 text-[10px] text-slate-300 list-disc">
                          • {gap}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
