/**
 * JARVIS CCA-04: Student Community & Doubt Discussion Hub API
 *
 * GET  /api/community — List threads, filter by courseTag, search query
 * POST /api/community — Create new thread, trigger AI auto-answer, or upvote
 */

import { NextRequest, NextResponse } from "next/server"
import { INITIAL_COMMUNITY_THREADS, CommunityThread, CommunityComment } from "@/data/communityData"
import { executeAIChat } from "@/lib/ai/gateway"

// In-memory thread store with baseline seed
let threads: CommunityThread[] = [...INITIAL_COMMUNITY_THREADS]

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const courseTag = url.searchParams.get("courseTag")
  const search = url.searchParams.get("q")?.toLowerCase()

  let list = [...threads]

  if (courseTag && courseTag !== "all") {
    list = list.filter(t => t.courseTag === courseTag)
  }

  if (search) {
    list = list.filter(t =>
      t.title.toLowerCase().includes(search) ||
      t.questionText.toLowerCase().includes(search) ||
      t.subject.toLowerCase().includes(search)
    )
  }

  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json({
    totalThreads: list.length,
    threads: list
  }, { status: 200 })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { action = "create", threadId, title, courseTag, subject, questionText, authorName, authorRole } = body

    if (action === "upvote" && threadId) {
      const thread = threads.find(t => t.id === threadId)
      if (thread) {
        thread.upvotes = (thread.upvotes || 0) + 1
        return NextResponse.json({ success: true, upvotes: thread.upvotes })
      }
      return NextResponse.json({ error: "Thread not found" }, { status: 404 })
    }

    if (action === "create") {
      if (!title || !questionText) {
        return NextResponse.json({ error: "Missing title or questionText." }, { status: 400 })
      }

      const id = `thread-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`
      const newThread: CommunityThread = {
        id,
        title,
        courseTag: courseTag || "General Doubts",
        subject: subject || "General Academic",
        authorName: authorName || "Student Learner",
        authorRole: authorRole || "Aspirant",
        avatarInitials: (authorName || "ST").substring(0, 2).toUpperCase(),
        questionText,
        upvotes: 1,
        views: 1,
        isSolved: false,
        createdAt: new Date().toISOString(),
        comments: []
      }

      // Automatically generate an instant AI Tutor verified answer!
      try {
        const prompt = `A student in India studying ${courseTag || "Commerce & Finance"} asked:
"${title}"
Details: "${questionText}"

Provide an authoritative, clear, examination-accurate answer citing relevant statutory sections, accounting standards (AS/Ind AS), or legal precedents where applicable.`

        const aiResult = await executeAIChat({
          messages: [
            { role: "system", content: "You are the JARVIS Academic AI Tutor in the Student Community. Provide clear, exam-accurate answers citing sections and standards." },
            { role: "user", content: prompt }
          ]
        })

        if (aiResult?.content) {
          const aiComment: CommunityComment = {
            id: `comm-ai-${Date.now()}`,
            authorName: "JARVIS AI Academic Tutor",
            authorRole: "AI Tutor",
            avatarInitials: "AI",
            content: aiResult.content,
            statutoryCitations: [`${courseTag || "Statutory"} Guidelines`],
            upvotes: 5,
            isAcceptedSolution: true,
            createdAt: new Date().toISOString()
          }
          newThread.comments.push(aiComment)
          newThread.isSolved = true
        }
      } catch (err) {
        console.warn("[Community] AI answer generation fallback:", err)
      }

      threads.unshift(newThread)
      return NextResponse.json({ success: true, thread: newThread }, { status: 201 })
    }

    return NextResponse.json({ error: `Unknown action '${action}'` }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Community API error" }, { status: 500 })
  }
}
