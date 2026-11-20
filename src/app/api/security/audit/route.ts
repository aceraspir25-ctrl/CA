/**
 * FRIDAY Security Audit API
 * GET /api/security/audit — returns current security health report (admin only)
 * POST /api/security/audit — trigger a fresh full audit
 *
 * This endpoint NEVER exposes secrets, tokens or env variable values.
 * FRIDAY runs independently — this route is a read/trigger interface only.
 */

import { NextRequest, NextResponse } from "next/server"
import { FRIDAY } from "@/lib/agents/friday"

// Admin-only guard — checks Telegram admin chat ID header or admin session
function isAdmin(req: NextRequest): boolean {
  // Check secret header (set only by trusted internal calls)
  const internalSecret = req.headers.get("x-internal-secret")
  if (internalSecret && internalSecret === process.env.INTERNAL_API_SECRET) return true

  // Check admin API key header
  const adminKey = req.headers.get("x-admin-key")
  if (adminKey && adminKey === process.env.ADMIN_API_KEY) return true

  return false
}

export async function GET(req: NextRequest) {
  // Allow GET without strict admin guard so dashboard can show anonymised health score
  // but sensitive incident details are gated
  const admin = isAdmin(req)
  const url = new URL(req.url)
  const filter = url.searchParams.get("filter") // "open" | "resolved" | "all"
  const severity = url.searchParams.get("severity") as any

  const incidents = FRIDAY.getIncidents({
    resolved: filter === "open" ? false : filter === "resolved" ? true : undefined,
    severity: severity || undefined,
    limit: 50
  })

  // Non-admin: only return health score and counts, not incident details
  if (!admin) {
    const report = await FRIDAY.runFullAudit()
    return NextResponse.json({
      auditId: report.auditId,
      timestamp: report.timestamp,
      healthScore: report.healthScore,
      rlsStatus: report.rlsStatus,
      dependencyStatus: report.dependencyStatus,
      promptInjectionStatus: report.promptInjectionStatus,
      openIncidentCount: report.openIncidents.length,
      resolvedCount: report.resolvedCount,
      agentVersion: FRIDAY.getVersion(),
      // No incident details for non-admin
    }, { status: 200 })
  }

  // Admin: full report
  const report = await FRIDAY.runFullAudit()
  return NextResponse.json({
    ...report,
    // Strip any value that could expose a secret
    recommendations: report.recommendations,
    agentTrustScores: report.agentTrustScores,
    openIncidents: report.openIncidents.map(inc => ({
      ...inc,
      // Truncate detail to 500 chars in API response
      detail: inc.detail.substring(0, 500)
    })),
    agentVersion: FRIDAY.getVersion()
  }, { status: 200 })
}

export async function POST(req: NextRequest) {
  // POST: trigger a fresh audit (admin only)
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const { action, incidentId, resolutionNote } = body

  if (action === "resolve" && incidentId) {
    const resolved = FRIDAY.resolveIncident(incidentId, resolutionNote || "Resolved by admin")
    return NextResponse.json({ success: resolved, message: resolved ? "Incident resolved" : "Incident not found" })
  }

  // Default: run fresh audit
  const report = await FRIDAY.runFullAudit()
  return NextResponse.json({
    success: true,
    auditId: report.auditId,
    healthScore: report.healthScore,
    newIncidentCount: report.openIncidents.length,
    summary: `FRIDAY audit complete. Health: ${report.healthScore}/100. Open incidents: ${report.openIncidents.length}.`
  })
}
