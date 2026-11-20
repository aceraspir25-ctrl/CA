"use client"

import { useState } from "react"
import {
  GraduationCap,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Edit3,
  Upload,
  BookOpen,
  Scale,
  Award,
  Layers,
  Search,
  Eye,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface ReviewQueueItem {
  id: string
  title: string
  course: string
  subject: string
  authorAgent: string
  type: "Notes" | "Question Bank" | "Statutory Update"
  score: number
  submittedDate: string
  status: "PENDING_REVIEW" | "APPROVED" | "REVISION_REQUESTED"
  summary: string
}

const INITIAL_REVIEW_QUEUE: ReviewQueueItem[] = [
  {
    id: "rev-1",
    title: "Ind AS 115 Revenue from Contracts with Customers — Comprehensive Practical Illustration",
    course: "ICAI CA Intermediate",
    subject: "Paper 1 (Advanced Accounting)",
    authorAgent: "CONTENT-09",
    type: "Notes",
    score: 94,
    submittedDate: "Today, 18:30",
    status: "PENDING_REVIEW",
    summary: "Includes 5-step model explanation, variable consideration computation, and journal entries for bill-and-hold transactions."
  },
  {
    id: "rev-2",
    title: "Section 115BAC vs Old Regime: 15 High-Yield Examination MCQs",
    course: "ICAI CA Intermediate",
    subject: "Paper 3 (Taxation)",
    authorAgent: "QUESTION-11",
    type: "Question Bank",
    score: 91,
    submittedDate: "Today, 17:15",
    status: "PENDING_REVIEW",
    summary: "Questions include marginal relief calculations, rebate u/s 87A under new regime (₹25,000 max), and surcharge caps."
  },
  {
    id: "rev-3",
    title: "CAS-1 Standard Costing Variance Formulas & Reconciliation Statement",
    course: "ICMAI CMA Intermediate",
    subject: "Paper 8 (Cost Accounting)",
    authorAgent: "SOLUTION-12",
    type: "Notes",
    score: 89,
    submittedDate: "Yesterday",
    status: "APPROVED",
    summary: "Formulas for Material, Labour, and Overhead variance with clear distinction between absorption and marginal variance."
  }
]

export default function FacultyStudioPage() {
  const [queue, setQueue] = useState<ReviewQueueItem[]>(INITIAL_REVIEW_QUEUE)
  const [selectedItem, setSelectedItem] = useState<ReviewQueueItem>(queue[0])
  const [feedbackNote, setFeedbackNote] = useState("")
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  const handleApprove = (id: string) => {
    setQueue(prev =>
      prev.map(item => (item.id === id ? { ...item, status: "APPROVED" } : item))
    )
    if (selectedItem.id === id) {
      setSelectedItem(prev => ({ ...prev, status: "APPROVED" }))
    }
    setActionMessage("✅ Content approved and pushed to the Digital Library!")
    setTimeout(() => setActionMessage(null), 3000)
  }

  const handleReject = (id: string) => {
    setQueue(prev =>
      prev.map(item => (item.id === id ? { ...item, status: "REVISION_REQUESTED" } : item))
    )
    if (selectedItem.id === id) {
      setSelectedItem(prev => ({ ...prev, status: "REVISION_REQUESTED" }))
    }
    setActionMessage("⚠️ Sent back to AI Agent with revision feedback notes.")
    setTimeout(() => setActionMessage(null), 3000)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-800/30 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-emerald-600/30 rounded-2xl border border-emerald-500/30">
              <GraduationCap className="h-6 w-6 text-emerald-300" />
            </div>
            <h1 className="text-2xl font-black">Faculty Content Authoring Studio</h1>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">Verified Reviewer</Badge>
          </div>
          <p className="text-xs text-emerald-200/80 max-w-2xl leading-relaxed">
            Review, refine, and certify AI-generated notes, question banks, and solutions before they are published to students across India.
          </p>
        </div>

        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5 shrink-0">
          <Edit3 className="h-4 w-4" /> Author New Lecture Note
        </Button>
      </div>

      {actionMessage && (
        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Main Grid: Left Review Queue + Right Review Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Queue Roster */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Review Queue ({queue.filter(q => q.status === "PENDING_REVIEW").length} Pending)
            </h3>
          </div>

          <div className="space-y-2.5">
            {queue.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedItem.id === item.id
                    ? "bg-emerald-500/10 border-emerald-500 shadow-sm"
                    : "bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-emerald-400/50"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-600">
                    {item.course}
                  </Badge>
                  <Badge
                    className={`text-[9px] ${
                      item.status === "APPROVED"
                        ? "bg-emerald-600 text-white"
                        : item.status === "PENDING_REVIEW"
                        ? "bg-amber-500 text-white"
                        : "bg-rose-600 text-white"
                    }`}
                  >
                    {item.status.replace("_", " ")}
                  </Badge>
                </div>

                <h4 className="text-xs font-bold text-[hsl(var(--foreground))] line-clamp-2 leading-snug">
                  {item.title}
                </h4>

                <div className="flex items-center justify-between text-[11px] text-[hsl(var(--muted-foreground))] mt-2 pt-2 border-t border-[hsl(var(--border))]/50">
                  <span>From: {item.authorAgent}</span>
                  <span>Score: <strong className="text-emerald-600">{item.score}/100</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Review Workbench */}
        <div className="lg:col-span-2">
          {selectedItem && (
            <Card className="border-[hsl(var(--border))] bg-[hsl(var(--card))]">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge className="bg-emerald-600 text-white text-[10px]">{selectedItem.course}</Badge>
                      <Badge variant="outline" className="text-[10px]">{selectedItem.subject}</Badge>
                      <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-600">
                        Agent: {selectedItem.authorAgent}
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-bold text-[hsl(var(--foreground))]">
                      {selectedItem.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                      Submitted: {selectedItem.submittedDate} • Automated Quality Score: <strong>{selectedItem.score}/100</strong>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                {/* Summary Box */}
                <div className="p-4 rounded-2xl bg-[hsl(var(--muted))]/40 border border-[hsl(var(--border))] space-y-2">
                  <h4 className="font-semibold text-[hsl(var(--foreground))]">Executive Academic Summary:</h4>
                  <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {selectedItem.summary}
                  </p>
                </div>

                {/* Faculty Feedback Form */}
                <div className="space-y-2">
                  <label className="font-semibold text-[hsl(var(--foreground))] block">
                    Faculty Notes & Revision Guidelines:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide comments, required statutory additions, or adjustments before approval..."
                    value={feedbackNote}
                    onChange={e => setFeedbackNote(e.target.value)}
                    className="w-full p-2.5 rounded-xl border text-xs bg-[hsl(var(--background))] border-[hsl(var(--border))]"
                  />
                </div>

                {/* Decision Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-[hsl(var(--border))]">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(selectedItem.id)}
                    className="text-xs text-rose-600 border-rose-500/30 hover:bg-rose-500/10 gap-1.5"
                  >
                    <XCircle className="h-4 w-4" /> Request AI Revision
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => handleApprove(selectedItem.id)}
                    disabled={selectedItem.status === "APPROVED"}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Approve & Publish to Students
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
