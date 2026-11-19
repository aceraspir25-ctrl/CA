import { NextResponse } from "next/server"
import { aiUsageMetrics } from "@/lib/ai/gateway"

export async function GET() {
  const geminiConfigured = Boolean(process.env.GEMINI_API_KEY)
  const openaiConfigured = Boolean(process.env.OPENAI_API_KEY)

  return NextResponse.json({
    status: "online",
    providers: {
      gemini: {
        configured: geminiConfigured,
        model: "gemini-2.5-flash",
        status: geminiConfigured ? "ready" : "unconfigured (using simulated fallback)",
      },
      openai: {
        configured: openaiConfigured,
        model: "gpt-4o-mini",
        status: openaiConfigured ? "ready" : "unconfigured (using simulated fallback)",
      },
      simulated: {
        configured: true,
        model: "EduFinance-Knowledge-Engine-v2",
        status: "active fallback",
      },
    },
    metrics: aiUsageMetrics,
  })
}

