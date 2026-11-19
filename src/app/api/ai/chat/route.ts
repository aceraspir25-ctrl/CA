import { NextRequest, NextResponse } from "next/server"
import { executeAIChat } from "@/lib/ai/gateway"
import { AIChatRequest } from "@/lib/ai/types"

export async function POST(req: NextRequest) {
  try {
    const body: AIChatRequest = await req.json()

    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required." },
        { status: 400 }
      )
    }

    const response = await executeAIChat(body)
    return NextResponse.json(response)
  } catch (err: any) {
    console.error("AI Chat Route Error:", err)
    return NextResponse.json(
      { error: "Internal AI processing error", details: err?.message },
      { status: 500 }
    )
  }
}

