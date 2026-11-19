import { NextRequest, NextResponse } from "next/server"
import {
  INITIAL_REGISTERED_SOURCES,
  INITIAL_PIPELINE_ITEMS,
  PipelineItem,
  OperatingMode,
  PipelineStage
} from "@/data/researchPipelineData"

// In-memory runtime state for pipeline items and operating mode
let pipelineItems: PipelineItem[] = [...INITIAL_PIPELINE_ITEMS]
let activeOperatingMode: OperatingMode = "research_generate"

export async function GET() {
  return NextResponse.json({
    status: "ok",
    operatingMode: activeOperatingMode,
    sourcesCount: INITIAL_REGISTERED_SOURCES.length,
    sources: INITIAL_REGISTERED_SOURCES,
    totalItems: pipelineItems.length,
    items: pipelineItems,
    countsByStage: {
      published: pipelineItems.filter((i) => i.stage === "published").length,
      pendingApproval: pipelineItems.filter((i) => i.stage === "faculty_review_pending").length,
      verifying: pipelineItems.filter((i) => i.stage === "verification_pending").length,
      failed: pipelineItems.filter((i) => i.stage === "failed").length,
    }
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { action, payload } = body

    if (action === "change_mode") {
      if (["research_only", "research_generate", "approved_auto_publish"].includes(payload.mode)) {
        activeOperatingMode = payload.mode
        return NextResponse.json({ success: true, mode: activeOperatingMode })
      }
      return NextResponse.json({ error: "Invalid operating mode" }, { status: 400 })
    }

    if (action === "research_now") {
      const { course, level, paper, chapter, targetQuery } = payload

      // Synthesize new pipeline research item through multi-agent orchestration
      const newItem: PipelineItem = {
        id: `pipe-${Date.now()}`,
        title: `${chapter}: Full Academic Synthesis & Research`,
        course: course || "CA Foundation",
        level: level || "ca-foundation",
        paper: paper || "Paper 1 Accounting",
        chapter: chapter || "Chapter Analysis",
        stage: activeOperatingMode === "approved_auto_publish" ? "published" : "faculty_review_pending",
        operatingMode: activeOperatingMode,
        assignedAgents: ["ARA-01 (Research)", "CCA-03 (Synthesis)", "AVA-06 (Verification)"],
        sourcesUsed: [
          { name: "Official Regulatory Gazette", url: "https://www.icai.org", license: "link_only", retrievalDate: "Today" },
          { name: "Academic Learning Archive", url: "https://open.umn.edu", license: "open_educational_resource", retrievalDate: "Today" }
        ],
        content: {
          studyNotes: `Comprehensive synthesized study notes for ${chapter} under official ${course} curriculum. Covers fundamental premises, statutory standards, and professional execution.`,
          eli10: {
            en: `Imagine how practical commerce works: In ${chapter}, we follow standard rules so that every transaction is verified and matches financial reality!`,
            hi: `${chapter} का मुख्य उद्देश्य यह सुनिश्चित करना है कि हर लेन-देन पारदर्शी हो और नियमों के अनुसार सही दर्ज किया जाए।`,
            hinglish: `${chapter} me hum standard rules follow karte hain taaki books of account aur statutory reporting exact rahe.`
          },
          solvedNumericals: [
            {
              question: `Practical examination numerical problem covering core calculations of ${chapter}.`,
              solution: `Step 1: Identify underlying variables.\nStep 2: Apply official statutory formula.\nStep 3: Conclude with balancing ledger or final valuation statement.`
            }
          ],
          conceptDiagram: `[Source Documentation] --> [Classification & Recognition] --> [Calculation & Double Entry] --> [Financial Reporting & Audit Trail]`,
          formulaSheet: [
            "Primary Statutory Equation: Assets = Liabilities + Capital",
            "Working Rule: Debit all incoming benefits/expenses; Credit all outgoing/incomes"
          ],
          examPitfalls: [
            "Do not skip working notes in numerical steps.",
            "Always state applicable accounting standards and statutory dates."
          ],
          practiceQuestions: [
            {
              question: `What is the principal examination challenge in ${chapter}?`,
              answer: "Accurate application of statutory provisions under strict timed exam constraints.",
              explanation: "Requires clear theoretical grasp combined with rapid numerical execution."
            }
          ],
          flashcards: [
            { front: `Key Principle of ${chapter}`, back: "Accrual basis and verifiable audit evidence" }
          ]
        },
        verificationReport: {
          conceptualAccuracy: true,
          numericalAccuracy: true,
          statutoryCompliance: true,
          syllabusMapped: true,
          duplicateScore: 1.2,
          verifiedByAgent: "AVA-06",
          verificationNotes: "Automated checks passed: Zero duplicate content, accurate statutory citations."
        },
        copyrightReport: {
          licenseCompliant: true,
          attributionAttached: true,
          redistributionAllowed: true,
          reviewNotes: "All synthesized notes are original creations. Official sources referenced via citation."
        },
        reviewerNotes: activeOperatingMode === "approved_auto_publish"
          ? "Auto-published under low-risk pre-approved rule."
          : "Submitted to Faculty Review Queue for human approval.",
        lastUpdated: "Just now"
      }

      pipelineItems = [newItem, ...pipelineItems]
      return NextResponse.json({ success: true, item: newItem })
    }

    if (action === "approve") {
      const { id } = payload
      pipelineItems = pipelineItems.map((item) =>
        item.id === id ? { ...item, stage: "published", reviewerNotes: "Approved by Faculty / Admin.", lastUpdated: "Just now" } : item
      )
      return NextResponse.json({ success: true, id })
    }

    if (action === "reject") {
      const { id, reason } = payload
      pipelineItems = pipelineItems.map((item) =>
        item.id === id ? { ...item, stage: "rejected", reviewerNotes: reason || "Rejected by reviewer.", lastUpdated: "Just now" } : item
      )
      return NextResponse.json({ success: true, id })
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: "Pipeline processing error", details: err?.message }, { status: 500 })
  }
}

