"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Activity,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Bot,
  Cpu,
  FileSearch,
  Zap,
  TrendingUp,
  Clock
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface AuditReport {
  auditId?: string
  timestamp?: string
  healthScore: number
  rlsStatus: "PASS" | "WARN" | "FAIL"
  dependencyStatus: "PASS" | "WARN" | "FAIL"
  promptInjectionStatus: "PASS" | "WARN" | "FAIL"
  openIncidentCount?: number
  openIncidents?: SecurityIncident[]
  resolvedCount?: number
  recommendations?: string[]
  agentTrustScores?: Record<string, number>
  agentVersion?: string
}

interface SecurityIncident {
  id: string
  timestamp: string
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  category: string
  title: string
  detail: string
  source: string
  resolved: boolean
}

const severityColor = (s: string) => {
  if (s === "CRITICAL") return "bg-red-500/10 text-red-400 border-red-500/30"
  if (s === "HIGH") return "bg-orange-500/10 text-orange-400 border-orange-500/30"
  if (s === "MEDIUM") return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
  return "bg-blue-500/10 text-blue-400 border-blue-500/30"
}

const statusIcon = (s: "PASS" | "WARN" | "FAIL") => {
  if (s === "PASS") return <CheckCircle2 className="h-4 w-4 text-green-400" />
  if (s === "WARN") return <AlertTriangle className="h-4 w-4 text-yellow-400" />
  return <XCircle className="h-4 w-4 text-red-400" />
}

const statusBadge = (s: "PASS" | "WARN" | "FAIL") => {
  const cls = s === "PASS"
    ? "bg-green-500/10 text-green-400 border-green-500/30"
    : s === "WARN"
    ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
    : "bg-red-500/10 text-red-400 border-red-500/30"
  return <Badge variant="outline" className={`text-xs ${cls}`}>{s}</Badge>
}

const scoreColor = (score: number) => {
  if (score >= 80) return "text-green-400"
  if (score >= 60) return "text-yellow-400"
  if (score >= 40) return "text-orange-400"
  return "text-red-400"
}

const trustColor = (score: number) => {
  if (score >= 90) return "bg-green-500"
  if (score >= 80) return "bg-blue-500"
  if (score >= 70) return "bg-yellow-500"
  return "bg-red-500"
}

export default function FridaySecurityDashboard() {
  const [report, setReport] = useState<AuditReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [triggering, setTriggering] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<string>("")

  const fetchAudit = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/security/audit")
      if (res.ok) {
        const data = await res.json()
        setReport(data)
        setLastRefresh(new Date().toLocaleTimeString("en-IN"))
      }
    } catch {
      // Network error — show placeholder
      setReport({
        healthScore: 72,
        rlsStatus: "PASS",
        dependencyStatus: "WARN",
        promptInjectionStatus: "PASS",
        openIncidentCount: 1,
        resolvedCount: 0,
        recommendations: ["Connect to live API for real data"],
        agentVersion: "1.0.0"
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const triggerAudit = async () => {
    setTriggering(true)
    try {
      await fetch("/api/security/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "audit" }) })
      await fetchAudit()
    } finally {
      setTriggering(false)
    }
  }

  useEffect(() => { fetchAudit() }, [fetchAudit])

  const healthScore = report?.healthScore ?? 0
  const incidentCount = report?.openIncidentCount ?? (report?.openIncidents?.length ?? 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-purple-900/40">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-slate-950 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              FRIDAY Security Intelligence
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Independent Security Agent • v{report?.agentVersion || "1.0.0"} • Cannot be overridden
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {lastRefresh && (
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="h-3 w-3" /> {lastRefresh}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={fetchAudit}
            disabled={loading}
            className="bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-700"
          >
            <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={triggerAudit}
            disabled={triggering}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Zap className={`h-4 w-4 mr-1.5 ${triggering ? "animate-spin" : ""}`} />
            Run Audit
          </Button>
        </div>
      </div>

      {/* Health Score + Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Health */}
        <Card className="bg-slate-900/60 border-slate-700/60 col-span-1 sm:col-span-2 lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Security Health</span>
              <TrendingUp className="h-4 w-4 text-slate-500" />
            </div>
            <div className={`text-5xl font-black ${scoreColor(healthScore)}`}>
              {loading ? "—" : healthScore}
            </div>
            <div className="text-xs text-slate-500 mb-3">/ 100</div>
            <Progress value={healthScore} className="h-2 bg-slate-800" />
            <p className="text-xs text-slate-500 mt-2">
              {healthScore >= 80 ? "✅ Secure" : healthScore >= 60 ? "⚠️ Moderate Risk" : "🚨 Action Required"}
            </p>
          </CardContent>
        </Card>

        {/* RLS Status */}
        <Card className="bg-slate-900/60 border-slate-700/60">
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Database RLS</span>
              <Lock className="h-4 w-4 text-slate-500" />
            </div>
            {report ? (
              <>
                <div className="flex items-center gap-2">
                  {statusIcon(report.rlsStatus)}
                  <span className="text-sm font-semibold">{report.rlsStatus}</span>
                </div>
                {statusBadge(report.rlsStatus)}
                <p className="text-xs text-slate-500">Row-level security on all critical tables</p>
              </>
            ) : <div className="h-16 bg-slate-800/40 rounded animate-pulse" />}
          </CardContent>
        </Card>

        {/* Dependency Scan */}
        <Card className="bg-slate-900/60 border-slate-700/60">
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Dependencies</span>
              <FileSearch className="h-4 w-4 text-slate-500" />
            </div>
            {report ? (
              <>
                <div className="flex items-center gap-2">
                  {statusIcon(report.dependencyStatus)}
                  <span className="text-sm font-semibold">{report.dependencyStatus}</span>
                </div>
                {statusBadge(report.dependencyStatus)}
                <p className="text-xs text-slate-500">Package CVE & secret exposure scan</p>
              </>
            ) : <div className="h-16 bg-slate-800/40 rounded animate-pulse" />}
          </CardContent>
        </Card>

        {/* Prompt Injection */}
        <Card className="bg-slate-900/60 border-slate-700/60">
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Prompt Guard</span>
              <Eye className="h-4 w-4 text-slate-500" />
            </div>
            {report ? (
              <>
                <div className="flex items-center gap-2">
                  {statusIcon(report.promptInjectionStatus)}
                  <span className="text-sm font-semibold">{report.promptInjectionStatus}</span>
                </div>
                {statusBadge(report.promptInjectionStatus)}
                <p className="text-xs text-slate-500">Active injection pattern detection</p>
              </>
            ) : <div className="h-16 bg-slate-800/40 rounded animate-pulse" />}
          </CardContent>
        </Card>
      </div>

      {/* Open Incidents + Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Open Incidents */}
        <Card className="bg-slate-900/60 border-slate-700/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-200">
              <ShieldAlert className="h-4 w-4 text-orange-400" />
              Open Security Incidents
              {incidentCount > 0 && (
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs ml-auto">
                  {incidentCount} open
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {loading ? (
              <div className="space-y-2">
                {[1, 2].map(i => <div key={i} className="h-14 bg-slate-800/40 rounded animate-pulse" />)}
              </div>
            ) : report?.openIncidents && report.openIncidents.length > 0 ? (
              report.openIncidents.map(inc => (
                <div key={inc.id} className={`rounded-lg border p-3 ${severityColor(inc.severity)}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold">{inc.title}</p>
                      <p className="text-xs opacity-70 mt-0.5 line-clamp-2">{inc.detail}</p>
                    </div>
                    <Badge variant="outline" className={`text-[10px] shrink-0 ${severityColor(inc.severity)}`}>
                      {inc.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-[10px] opacity-60">
                    <span>Source: {inc.source}</span>
                    <span>•</span>
                    <span>{new Date(inc.timestamp).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <ShieldCheck className="h-8 w-8 mx-auto mb-2 text-green-400 opacity-60" />
                <p className="text-sm">
                  {incidentCount === 0 ? "No open incidents" : `${incidentCount} incident(s) — run full audit to view details`}
                </p>
                <p className="text-xs mt-1 opacity-60">FRIDAY is actively monitoring all agents</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-slate-900/60 border-slate-700/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-200">
              <Activity className="h-4 w-4 text-indigo-400" />
              Security Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => <div key={i} className="h-8 bg-slate-800/40 rounded animate-pulse" />)}
              </div>
            ) : (
              <ul className="space-y-2">
                {(report?.recommendations || []).map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="mt-0.5 shrink-0">{rec.startsWith("🔑") ? "🔑" : rec.startsWith("🔒") ? "🔒" : rec.startsWith("📋") ? "📋" : rec.startsWith("📦") ? "📦" : rec.startsWith("🔍") ? "🔍" : "📊"}</span>
                    <span className="opacity-80">{rec.replace(/^[🔑🔒📋📦🔍📊]\s+/, "")}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Agent Trust Scores */}
      {report?.agentTrustScores && (
        <Card className="bg-slate-900/60 border-slate-700/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-200">
              <Cpu className="h-4 w-4 text-blue-400" />
              Agent Trust Scores
              <span className="text-xs font-normal text-slate-500 ml-auto">FRIDAY-computed heuristic</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.entries(report.agentTrustScores).map(([agent, score]) => (
                <div key={agent} className="bg-slate-800/60 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono text-slate-300">{agent}</span>
                    <span className={`text-xs font-bold ${score >= 90 ? "text-green-400" : score >= 80 ? "text-blue-400" : score >= 70 ? "text-yellow-400" : "text-red-400"}`}>
                      {score}
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-slate-700 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${trustColor(score)}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* FRIDAY Status Footer */}
      <div className="bg-slate-900/40 border border-slate-700/40 rounded-xl p-4 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
          <Bot className="h-4 w-4 text-purple-400" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-300">
            FRIDAY Security Agent is active and operating independently
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            No other agent — including LEADER-00 — can override FRIDAY security decisions.
            All AI inputs and outputs are scanned for injection patterns and secret leaks.
          </p>
        </div>
        <div className="ml-auto shrink-0">
          <Badge className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">ACTIVE</Badge>
        </div>
      </div>

    </div>
  )
}
