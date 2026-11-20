/**
 * JARVIS CCA-04: Academic Content Factory API
 *
 * GET  /api/content/factory — Catalog of content items, workflow states, and quality scores
 * POST /api/content/factory — Generate new chapter notes, question banks, or advance workflow
 */

import { NextRequest, NextResponse } from "next/server"
import { globalContentPipeline, ContentItemType, WorkflowState } from "@/lib/content/contentPipeline"

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const courseId = url.searchParams.get("courseId") || undefined
  const contentType = (url.searchParams.get("contentType") as ContentItemType) || undefined
  const workflowState = (url.searchParams.get("workflowState") as WorkflowState) || undefined

  const metrics = globalContentPipeline.getPipelineMetrics()
  const items = globalContentPipeline.listItems({ courseId, contentType, workflowState })

  return NextResponse.json({
    metrics,
    totalItems: items.length,
    items
  }, { status: 200 })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { action = "generate_notes", courseId, courseName, subjectId, subjectName, chapterName, count, contentId, targetState } = body

    if (action === "advance") {
      if (!contentId || !targetState) {
        return NextResponse.json({ error: "Missing contentId or targetState." }, { status: 400 })
      }
      const updated = globalContentPipeline.advanceWorkflow(contentId, targetState)
      if (!updated) {
        return NextResponse.json({ error: "Content item not found." }, { status: 404 })
      }
      return NextResponse.json({ success: true, item: updated })
    }

    if (action === "generate_notes") {
      if (!courseId || !chapterName) {
        return NextResponse.json({ error: "Missing courseId or chapterName." }, { status: 400 })
      }
      const item = await globalContentPipeline.generateChapterNotes({
        courseId,
        courseName: courseName || courseId,
        subjectId: subjectId || "gen-subj",
        subjectName: subjectName || "General Subject",
        chapterName
      })
      return NextResponse.json({ success: true, item }, { status: 201 })
    }

    if (action === "generate_qb") {
      if (!courseId || !chapterName) {
        return NextResponse.json({ error: "Missing courseId or chapterName." }, { status: 400 })
      }
      const item = await globalContentPipeline.generateQuestionBank({
        courseId,
        courseName: courseName || courseId,
        subjectId: subjectId || "gen-subj",
        subjectName: subjectName || "General Subject",
        chapterName,
        count: Number(count) || 10
      })
      return NextResponse.json({ success: true, item }, { status: 201 })
    }

    return NextResponse.json({ error: `Unknown action '${action}'` }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Content factory error" }, { status: 500 })
  }
}
