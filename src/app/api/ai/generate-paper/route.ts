import { NextRequest, NextResponse } from "next/server"
import {
  generateFullExaminationPaper,
  generateMCQBatchForSubject,
  runAutonomousDualAiCycle
} from "@/lib/ai/dualAiQuestionAgent"
import { getAllPapers, getAllMCQs } from "@/data/questionBanksData"

export async function GET(req: NextRequest) {
  const papers = getAllPapers()
  const mcqs = getAllMCQs()

  return NextResponse.json({
    success: true,
    totalPapers: papers.length,
    totalMCQs: mcqs.length,
    papers,
    mcqs
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))

    if (body.action === "cycle") {
      const cycleResult = await runAutonomousDualAiCycle()
      return NextResponse.json({
        success: true,
        message: "Dual-AI autonomous cycle executed successfully",
        paper: cycleResult.paper
      })
    }

    const subject = body.subject || "Fundamental of Accounting"
    const paperCode = body.paperCode || "DSC-1"
    const institution = body.institution || "PRSU"
    const level = body.courseLevel || "B.Com Semester 1 (NEP)"
    const type = body.type || "MQP"

    const paper = await generateFullExaminationPaper(
      subject,
      paperCode,
      institution,
      level,
      type
    )

    return NextResponse.json({
      success: true,
      paper,
      message: `Successfully synthesized and uploaded ${paper.title} using Gemini & GPT agent.`
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message || "Failed to generate paper"
    }, { status: 500 })
  }
}
