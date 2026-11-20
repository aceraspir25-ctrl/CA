"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Users,
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
  HelpCircle,
  Search,
  Sparkles,
  Bot,
  Filter,
  Plus,
  Send,
  BookOpen,
  Award,
  Scale,
  Eye,
  GraduationCap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CommunityThread } from "@/data/communityData"

const COURSE_FILTERS = [
  "all",
  "CA Foundation",
  "CA Intermediate",
  "CA Final",
  "CMA Intermediate",
  "CS Executive",
  "B.Com PRSU",
  "Tech / AI",
  "General Doubts"
]

export default function StudentCommunityPage() {
  const [threads, setThreads] = useState<CommunityThread[]>([])
  const [selectedThread, setSelectedThread] = useState<CommunityThread | null>(null)
  const [activeCourseFilter, setActiveCourseFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  // Ask Doubt Form State
  const [showAskModal, setShowAskModal] = useState(false)
  const [doubtTitle, setDoubtTitle] = useState("")
  const [doubtCourse, setDoubtCourse] = useState("CA Intermediate")
  const [doubtSubject, setDoubtSubject] = useState("Taxation (Direct Tax)")
  const [doubtQuestion, setDoubtQuestion] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const fetchThreads = useCallback(async () => {
    setLoading(true)
    try {
      const url = new URL("/api/community", window.location.origin)
      if (activeCourseFilter !== "all") url.searchParams.set("courseTag", activeCourseFilter)
      if (searchQuery.trim()) url.searchParams.set("q", searchQuery.trim())

      const res = await fetch(url.toString())
      if (res.ok) {
        const data = await res.json()
        setThreads(data.threads || [])
        if (!selectedThread && data.threads?.length > 0) {
          setSelectedThread(data.threads[0])
        }
      }
    } finally {
      setLoading(false)
    }
  }, [activeCourseFilter, searchQuery, selectedThread])

  useEffect(() => {
    fetchThreads()
  }, [fetchThreads])

  const handleUpvote = async (threadId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "upvote", threadId })
      })
      if (res.ok) {
        const data = await res.json()
        setThreads(prev =>
          prev.map(t => (t.id === threadId ? { ...t, upvotes: data.upvotes } : t))
        )
        if (selectedThread?.id === threadId) {
          setSelectedThread(prev => (prev ? { ...prev, upvotes: data.upvotes } : null))
        }
      }
    } catch {
      // silent
    }
  }

  const handlePostDoubt = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!doubtTitle.trim() || !doubtQuestion.trim()) return

    setSubmitting(true)
    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          title: doubtTitle,
          courseTag: doubtCourse,
          subject: doubtSubject,
          questionText: doubtQuestion,
          authorName: "You (Student)",
          authorRole: "Active Aspirant"
        })
      })

      if (res.ok) {
        const data = await res.json()
        setDoubtTitle("")
        setDoubtQuestion("")
        setShowAskModal(false)
        await fetchThreads()
        if (data.thread) setSelectedThread(data.thread)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 p-4 md:p-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 border border-blue-800/40 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-blue-600/30 rounded-2xl border border-blue-500/30">
              <Users className="h-6 w-6 text-blue-300" />
            </div>
            <h1 className="text-2xl font-black">All-India Student Community & Doubt Hub</h1>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              AI-Moderated
            </Badge>
          </div>
          <p className="text-xs text-blue-200/80 max-w-2xl leading-relaxed">
            Collaborate with peers, rank-holders, and autonomous AI tutors across CA, CMA, CS, B.Com, and Tech. Get instant verified answers citing statutory provisions.
          </p>
        </div>

        <Button
          onClick={() => setShowAskModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2 text-xs shadow-lg shadow-blue-900/30 shrink-0"
        >
          <Plus className="h-4 w-4" /> Ask a Doubt
        </Button>
      </div>

      {/* Course Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
        {COURSE_FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveCourseFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCourseFilter === f
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            }`}
          >
            {f === "all" ? "All Qualifications" : f}
          </button>
        ))}
      </div>

      {/* Main Grid: Left Roster + Right Thread Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Threads List */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            <Input
              placeholder="Search doubts by concept or section..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 text-xs bg-[hsl(var(--card))]"
            />
          </div>

          <div className="space-y-2.5 max-h-[650px] overflow-y-auto pr-1">
            {threads.map(thread => (
              <div
                key={thread.id}
                onClick={() => setSelectedThread(thread)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  selectedThread?.id === thread.id
                    ? "bg-blue-500/10 border-blue-500 shadow-sm"
                    : "bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-blue-400/60"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-600 dark:text-blue-400">
                    {thread.courseTag}
                  </Badge>
                  {thread.isSolved && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                      <CheckCircle2 className="h-3 w-3" /> Solved
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-bold text-[hsl(var(--foreground))] line-clamp-2 leading-snug">
                  {thread.title}
                </h3>

                <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-1 line-clamp-2">
                  {thread.questionText}
                </p>

                <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[hsl(var(--border))]/60 text-[11px] text-[hsl(var(--muted-foreground))]">
                  <span className="flex items-center gap-1">
                    <button
                      onClick={e => handleUpvote(thread.id, e)}
                      className="hover:text-blue-600 flex items-center gap-1 font-semibold"
                    >
                      <ThumbsUp className="h-3 w-3 text-blue-500" /> {thread.upvotes}
                    </button>
                  </span>

                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" /> {thread.comments?.length || 0} answers
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Selected Thread Inspector */}
        <div className="lg:col-span-2">
          {selectedThread ? (
            <Card className="border-[hsl(var(--border))] bg-[hsl(var(--card))]">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge className="bg-blue-600 text-white text-[10px]">{selectedThread.courseTag}</Badge>
                      <Badge variant="outline" className="text-[10px]">{selectedThread.subject}</Badge>
                      {selectedThread.isSolved && (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[10px]">
                          ✓ Verified Solution
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-base font-bold text-[hsl(var(--foreground))]">
                      {selectedThread.title}
                    </CardTitle>
                    {selectedThread.hindiTitle && (
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                        {selectedThread.hindiTitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 text-xs text-[hsl(var(--muted-foreground))]">
                  <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                    {selectedThread.avatarInitials}
                  </div>
                  <span>{selectedThread.authorName} ({selectedThread.authorRole})</span>
                  <span>•</span>
                  <span>{new Date(selectedThread.createdAt).toLocaleDateString("en-IN")}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Doubt Question Detail Box */}
                <div className="p-4 rounded-2xl bg-[hsl(var(--muted))]/40 border border-[hsl(var(--border))] text-xs leading-relaxed text-[hsl(var(--foreground))]">
                  {selectedThread.questionText}

                  {selectedThread.statutoryReference && (
                    <div className="mt-3 pt-2 border-t border-[hsl(var(--border))]/60 text-[11px] text-blue-600 dark:text-blue-400 font-mono flex items-center gap-1.5">
                      <Scale className="h-3.5 w-3.5" />
                      Statutory Reference: {selectedThread.statutoryReference}
                    </div>
                  )}
                </div>

                {/* Answers Stream */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))] flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5 text-blue-500" />
                      {selectedThread.comments?.length || 0} Answers & Solutions
                    </h4>
                  </div>

                  {selectedThread.comments?.map(comm => (
                    <div
                      key={comm.id}
                      className={`p-4 rounded-2xl border space-y-3 ${
                        comm.isAcceptedSolution
                          ? "bg-emerald-500/5 border-emerald-500/40"
                          : "bg-[hsl(var(--muted))]/20 border-[hsl(var(--border))]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            comm.authorRole === "AI Tutor" ? "bg-purple-600 text-white" : "bg-blue-600 text-white"
                          }`}>
                            {comm.authorRole === "AI Tutor" ? <Bot className="h-3.5 w-3.5" /> : comm.avatarInitials}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-[hsl(var(--foreground))]">{comm.authorName}</span>
                            <Badge variant="outline" className="text-[9px] ml-1.5 border-purple-500/30 text-purple-600 dark:text-purple-400">
                              {comm.authorRole}
                            </Badge>
                          </div>
                        </div>

                        {comm.isAcceptedSolution && (
                          <Badge className="bg-emerald-600 text-white text-[10px]">
                            ✓ Accepted Solution
                          </Badge>
                        )}
                      </div>

                      <div className="text-xs leading-relaxed whitespace-pre-wrap text-[hsl(var(--foreground))]">
                        {comm.content}
                      </div>

                      {comm.statutoryCitations && comm.statutoryCitations.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {comm.statutoryCitations.map((cite, i) => (
                            <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                              § {cite}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-64 flex items-center justify-center text-xs text-[hsl(var(--muted-foreground))] border rounded-3xl bg-[hsl(var(--card))]">
              Select a thread from the list to view community discussions and verified solutions
            </div>
          )}
        </div>
      </div>

      {/* Ask Doubt Modal / Slideover */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <Card className="w-full max-w-xl bg-[hsl(var(--card))] border-[hsl(var(--border))] shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-500" /> Ask an Academic Doubt
                </CardTitle>
                <button
                  onClick={() => setShowAskModal(false)}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>
              <CardDescription className="text-xs">
                Our autonomous AI tutor and all-India peer network will provide verified step-by-step answers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePostDoubt} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Doubt Title / Question Summary</label>
                  <Input
                    placeholder="e.g. Treatment of unabsorbed depreciation under Sec 32(2)..."
                    value={doubtTitle}
                    onChange={e => setDoubtTitle(e.target.value)}
                    required
                    className="text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Qualification Course</label>
                    <select
                      value={doubtCourse}
                      onChange={e => setDoubtCourse(e.target.value)}
                      className="w-full p-2 rounded-lg border text-xs bg-[hsl(var(--background))] border-[hsl(var(--border))]"
                    >
                      <option>CA Foundation</option>
                      <option>CA Intermediate</option>
                      <option>CA Final</option>
                      <option>CMA Intermediate</option>
                      <option>CS Executive</option>
                      <option>B.Com PRSU</option>
                      <option>Tech / AI</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Subject</label>
                    <Input
                      placeholder="e.g. Taxation / Law"
                      value={doubtSubject}
                      onChange={e => setDoubtSubject(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Detailed Question & What You Tried</label>
                  <textarea
                    rows={4}
                    placeholder="Provide complete facts of the problem, standard section numbers, or what step is confusing you..."
                    value={doubtQuestion}
                    onChange={e => setDoubtQuestion(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-lg border text-xs bg-[hsl(var(--background))] border-[hsl(var(--border))]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAskModal(false)}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs gap-1.5"
                  >
                    <Sparkles className={`h-3.5 w-3.5 ${submitting ? "animate-spin" : ""}`} />
                    Post & Generate AI Answer
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
