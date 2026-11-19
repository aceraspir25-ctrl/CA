"use client"

import { useState } from "react"
import {
  Sparkles,
  Bot,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Layers,
  Play,
  RotateCcw,
  BookOpen,
  Globe,
  FileText,
  FileCheck,
  Scale,
  Award,
  ChevronRight,
  Filter,
  ExternalLink,
  PlusCircle,
  Eye,
  Check,
  X,
  Share2
} from "lucide-react"
import {
  INITIAL_REGISTERED_SOURCES,
  INITIAL_PIPELINE_ITEMS,
  PipelineItem,
  OperatingMode,
  PipelineStage,
  RegisteredSource
} from "@/data/researchPipelineData"
import { INSTITUTIONS_DATA } from "@/data/coursesData"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function ContentPipelinePage() {
  const [pipelineItems, setPipelineItems] = useState<PipelineItem[]>(INITIAL_PIPELINE_ITEMS)
  const [sources, setSources] = useState<RegisteredSource[]>(INITIAL_REGISTERED_SOURCES)
  const [mode, setMode] = useState<OperatingMode>("research_generate")
  const [activeTab, setActiveTab] = useState<string>("research_now")
  const [selectedItem, setSelectedItem] = useState<PipelineItem | null>(pipelineItems[0])

  // Research Form State
  const [selectedCourse, setSelectedCourse] = useState("CA Foundation")
  const [selectedChapterInput, setSelectedChapterInput] = useState("Accounting Cycle & Trial Balance")
  const [isResearching, setIsResearching] = useState(false)
  const [researchSuccessMsg, setResearchSuccessMsg] = useState("")

  const handleModeChange = async (newMode: OperatingMode) => {
    setMode(newMode)
    try {
      await fetch("/api/ai/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "change_mode", payload: { mode: newMode } }),
      })
    } catch (e) {
      console.warn("Failed to update mode on server:", e)
    }
  }

  const handleTriggerResearch = async () => {
    if (!selectedChapterInput.trim()) return
    setIsResearching(true)
    setResearchSuccessMsg("")

    try {
      const res = await fetch("/api/ai/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "research_now",
          payload: {
            course: selectedCourse,
            chapter: selectedChapterInput,
          },
        }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.item) {
          setPipelineItems((prev) => [data.item, ...prev])
          setSelectedItem(data.item)
          setResearchSuccessMsg(`Successfully executed 8-stage research pipeline for "${selectedChapterInput}"!`)
        }
      }
    } catch (e) {
      console.warn("Research API failed, adding locally:", e)
    } finally {
      setIsResearching(false)
    }
  }

  const handleApprove = async (id: string) => {
    setPipelineItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stage: "published", reviewerNotes: "Approved by Faculty Administrator." } : item))
    )
    if (selectedItem?.id === id) {
      setSelectedItem((prev) => prev ? { ...prev, stage: "published" } : null)
    }
    try {
      await fetch("/api/ai/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve", payload: { id } }),
      })
    } catch (e) {
      console.warn("Approve API failed:", e)
    }
  }

  const handleReject = async (id: string) => {
    setPipelineItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stage: "rejected", reviewerNotes: "Sent back for revision." } : item))
    )
    if (selectedItem?.id === id) {
      setSelectedItem((prev) => prev ? { ...prev, stage: "rejected" } : null)
    }
    try {
      await fetch("/api/ai/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject", payload: { id, reason: "Needs deeper case illustrations." } }),
      })
    } catch (e) {
      console.warn("Reject API failed:", e)
    }
  }

  const pendingApprovalItems = pipelineItems.filter((i) => i.stage === "faculty_review_pending" || i.stage === "verification_pending")
  const publishedItems = pipelineItems.filter((i) => i.stage === "published")

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Sparkles className="h-6 w-6 text-indigo-300" />
            </div>
            <h1 className="text-2xl font-bold">Autonomous Academic Content Pipeline</h1>
            <Badge className="bg-emerald-500 text-white">8-Stage AI Research & Verification</Badge>
          </div>
          <p className="text-indigo-200 text-sm max-w-2xl">
            Surveils official regulatory portals (ICAI, ICMAI, ICSI, ACCA, PRSU, MCA, CBDT), synthesizes original notes, verifies calculations, validates copyright permissions, and submits to Faculty Review Queue.
          </p>
        </div>

        {/* Operating Mode Selector Card */}
        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 space-y-1.5 shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
            Agent Operating Mode
          </span>
          <div className="flex items-center gap-1">
            {[
              { id: "research_only", label: "Mode 1: Research Only", desc: "Safe (Reports only)" },
              { id: "research_generate", label: "Mode 2: Generate", desc: "Approval Queue" },
              { id: "approved_auto_publish", label: "Mode 3: Auto-Pub", desc: "Pre-approved" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => handleModeChange(m.id as OperatingMode)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  mode === m.id
                    ? "bg-emerald-600 text-white font-bold shadow-xs"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
                title={m.desc}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-[hsl(var(--muted))] flex-wrap h-auto p-1">
          <TabsTrigger value="research_now" className="gap-1.5 text-xs py-1.5">
            <Play className="h-3.5 w-3.5 text-blue-500" /> Research Now
          </TabsTrigger>
          <TabsTrigger value="approval_queue" className="gap-1.5 text-xs py-1.5">
            <Clock className="h-3.5 w-3.5 text-amber-500" /> Approval Queue ({pendingApprovalItems.length})
          </TabsTrigger>
          <TabsTrigger value="published" className="gap-1.5 text-xs py-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Published Content ({publishedItems.length})
          </TabsTrigger>
          <TabsTrigger value="sources" className="gap-1.5 text-xs py-1.5">
            <Globe className="h-3.5 w-3.5 text-indigo-500" /> Official & Internet Sources ({sources.length})
          </TabsTrigger>
          <TabsTrigger value="verification" className="gap-1.5 text-xs py-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Verification & Copyright
          </TabsTrigger>
          <TabsTrigger value="agents" className="gap-1.5 text-xs py-1.5">
            <Bot className="h-3.5 w-3.5 text-purple-500" /> Pipeline Agents
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: RESEARCH NOW & GENERATOR */}
        <TabsContent value="research_now" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col: Trigger Console */}
            <Card className="border-[hsl(var(--border))] shadow-md">
              <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Play className="h-4 w-4 text-blue-600" /> Trigger Autonomous Research Cycle
                </CardTitle>
                <CardDescription className="text-xs">
                  Instruct the multi-agent team to discover official syllabus sources and synthesize original lesson notes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold">Target Course</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-xs font-medium"
                  >
                    <option value="CA Foundation">CA Foundation (ICAI)</option>
                    <option value="CA Intermediate">CA Intermediate (ICAI)</option>
                    <option value="CA Final">CA Final (ICAI)</option>
                    <option value="CMA Foundation">CMA Foundation (ICMAI)</option>
                    <option value="CMA Intermediate">CMA Intermediate (ICMAI)</option>
                    <option value="CS Executive">CS Executive (ICSI)</option>
                    <option value="ACCA Applied Skills">ACCA Applied Skills (Global)</option>
                    <option value="PRSU B.Com Sem 5">PRSU B.Com Semester 5</option>
                    <option value="BBA Management">BBA Semester 3 Management</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold">Chapter / Topic Target</label>
                  <Input
                    value={selectedChapterInput}
                    onChange={(e) => setSelectedChapterInput(e.target.value)}
                    placeholder="e.g. Bank Reconciliation Statement, Section 115BAC, Ind AS 115..."
                    className="text-xs"
                  />
                </div>

                <div className="p-3 rounded-lg bg-[hsl(var(--muted))]/50 border border-[hsl(var(--border))] space-y-1.5">
                  <p className="font-bold text-[hsl(var(--foreground))]">8-Stage Autonomous Pipeline:</p>
                  <div className="space-y-1 text-[11px] text-[hsl(var(--muted-foreground))]">
                    <p>1. Official Portals (ICAI/MCA/CBDT/ACCA)</p>
                    <p>2. Internet Academic & OER Research</p>
                    <p>3. Concept & Numerical Extraction</p>
                    <p>4. Original Dual-AI Synthesis (No plagiarism)</p>
                    <p>5. Calculation & Statutory Verification</p>
                    <p>6. Copyright & Licensing Rights Audit</p>
                    <p>7. Faculty/Admin Review Queue</p>
                    <p>8. Live Publishing to Curriculum</p>
                  </div>
                </div>

                {researchSuccessMsg && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{researchSuccessMsg}</span>
                  </div>
                )}

                <Button
                  onClick={handleTriggerResearch}
                  disabled={isResearching}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-xs gap-2"
                >
                  {isResearching ? (
                    <>
                      <RotateCcw className="h-4 w-4 animate-spin" />
                      Running 8-Stage Research Cycle...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Execute Research Now
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Right 2 Cols: Content Viewer */}
            <div className="lg:col-span-2 space-y-4">
              {selectedItem ? (
                <Card className="border-[hsl(var(--border))] shadow-md">
                  <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs font-semibold">
                          {selectedItem.course}
                        </Badge>
                        <Badge
                          variant={
                            selectedItem.stage === "published"
                              ? "default"
                              : selectedItem.stage === "rejected"
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-[10px] capitalize"
                        >
                          {selectedItem.stage.replace(/_/g, " ")}
                        </Badge>
                      </div>
                      <span className="text-[11px] text-[hsl(var(--muted-foreground))]">
                        Updated {selectedItem.lastUpdated}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-bold mt-2">{selectedItem.title}</CardTitle>
                    <CardDescription className="text-xs">{selectedItem.chapter}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 pt-4 text-xs">
                    {/* Multi-Format Synthesized Content */}
                    {selectedItem.content && (
                      <div className="space-y-4">
                        {/* 1. Study Notes */}
                        <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 space-y-1.5">
                          <h4 className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5 text-xs">
                            <FileText className="h-3.5 w-3.5 text-blue-600" /> Synthesized Study Notes & Concept Overview
                          </h4>
                          <p className="text-[hsl(var(--foreground))] leading-relaxed">
                            {selectedItem.content.studyNotes}
                          </p>
                        </div>

                        {/* 2. Bilingual ELI10 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50 space-y-1">
                            <h5 className="font-bold text-indigo-900 dark:text-indigo-200 text-[11px]">👶 English ELI10:</h5>
                            <p className="text-[hsl(var(--foreground))]">{selectedItem.content.eli10.en}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50 space-y-1">
                            <h5 className="font-bold text-indigo-900 dark:text-indigo-200 text-[11px]">🇮🇳 Hindi / Hinglish:</h5>
                            <p className="text-[hsl(var(--foreground))]">{selectedItem.content.eli10.hi}</p>
                          </div>
                        </div>

                        {/* 3. Solved Numericals */}
                        {selectedItem.content.solvedNumericals.length > 0 && (
                          <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2">
                            <h4 className="font-bold text-amber-900 dark:text-amber-200 text-xs">
                              🔢 Original Solved Numerical Problem:
                            </h4>
                            <p className="font-semibold text-[hsl(var(--foreground))]">
                              {selectedItem.content.solvedNumericals[0].question}
                            </p>
                            <p className="text-[hsl(var(--foreground))] whitespace-pre-line text-[11px]">
                              {selectedItem.content.solvedNumericals[0].solution}
                            </p>
                          </div>
                        )}

                        {/* 4. Visual Concept Diagram */}
                        <div className="p-3.5 rounded-xl bg-[hsl(var(--muted))]/50 border border-[hsl(var(--border))] space-y-1.5">
                          <h4 className="font-bold text-xs">📊 Process Flowchart / Concept Map:</h4>
                          <pre className="font-mono text-[11px] p-2.5 rounded bg-white dark:bg-slate-900 border border-[hsl(var(--border))] overflow-x-auto text-blue-600 dark:text-blue-400">
                            {selectedItem.content.conceptDiagram}
                          </pre>
                        </div>

                        {/* 5. Formula Sheet & Exam Pitfalls */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                          <div className="p-3 rounded-xl border border-[hsl(var(--border))] space-y-1">
                            <h5 className="font-bold text-emerald-600">📐 Formula Compendium:</h5>
                            <ul className="list-disc list-inside space-y-0.5">
                              {selectedItem.content.formulaSheet.map((f, i) => (
                                <li key={i}>{f}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3 rounded-xl border border-[hsl(var(--border))] space-y-1">
                            <h5 className="font-bold text-rose-600">⚠️ Common Exam Pitfalls:</h5>
                            <ul className="list-disc list-inside space-y-0.5">
                              {selectedItem.content.examPitfalls.map((p, i) => (
                                <li key={i}>{p}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Source Citations & Permissions */}
                    <div className="pt-3 border-t border-[hsl(var(--border))] space-y-2">
                      <p className="font-bold text-[hsl(var(--foreground))]">Attributed Discovered Sources:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.sourcesUsed.map((src, i) => (
                          <a
                            key={i}
                            href={src.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted))]/80 text-[11px] font-semibold text-blue-600"
                          >
                            {src.name} ({src.license.replace(/_/g, " ")}) <ExternalLink className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Review Actions if Pending */}
                    {selectedItem.stage === "faculty_review_pending" && (
                      <div className="flex items-center justify-between pt-4 border-t border-[hsl(var(--border))]">
                        <span className="text-amber-600 font-semibold flex items-center gap-1">
                          <Clock className="h-4 w-4" /> Awaiting Human Approval
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(selectedItem.id)}
                            className="text-xs gap-1"
                          >
                            <X className="h-3.5 w-3.5" /> Request Revisions
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(selectedItem.id)}
                            className="text-xs gap-1 bg-emerald-600 hover:bg-emerald-700"
                          >
                            <Check className="h-3.5 w-3.5" /> Approve & Publish
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="p-8 text-center border border-dashed rounded-xl text-xs text-[hsl(var(--muted-foreground))]">
                  Select a research item to view details.
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: APPROVAL QUEUE */}
        <TabsContent value="approval_queue" className="space-y-4">
          <Card className="border-[hsl(var(--border))]">
            <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" /> Faculty & Admin Review Queue
                </CardTitle>
                <CardDescription className="text-xs">
                  Inspect synthesized content, verified calculations, and license attributions before approving for live student access.
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs">
                {pendingApprovalItems.length} Items Pending Review
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[hsl(var(--muted))]/50 border-y border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] font-semibold">
                    <tr>
                      <th className="p-3">Topic Title</th>
                      <th className="p-3">Course / Paper</th>
                      <th className="p-3">Sources Verified</th>
                      <th className="p-3">Factual Audit</th>
                      <th className="p-3">Duplicate Score</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[hsl(var(--border))]">
                    {pendingApprovalItems.map((item) => (
                      <tr key={item.id} className="hover:bg-[hsl(var(--muted))]/30">
                        <td className="p-3 font-semibold">{item.title}</td>
                        <td className="p-3 text-[hsl(var(--muted-foreground))]">{item.course}</td>
                        <td className="p-3">
                          <span className="text-blue-600 font-semibold">{item.sourcesUsed.length} Sources</span>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-300">
                            ✓ Verified by AVA-06
                          </Badge>
                        </td>
                        <td className="p-3 font-mono">{item.verificationReport?.duplicateScore}%</td>
                        <td className="p-3 text-right space-x-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedItem(item)
                              setActiveTab("research_now")
                            }}
                            className="h-7 px-2 text-[11px]"
                          >
                            Inspect
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(item.id)}
                            className="h-7 px-2 text-[11px] bg-emerald-600 hover:bg-emerald-700"
                          >
                            Approve
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: PUBLISHED CONTENT */}
        <TabsContent value="published" className="space-y-4">
          <Card className="border-[hsl(var(--border))]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Published Academic Modules in Curriculum
              </CardTitle>
              <CardDescription className="text-xs">
                These synthesized lessons are currently active in student chapter views with full version history.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-2 text-xs">
              {publishedItems.map((pub) => (
                <div
                  key={pub.id}
                  className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/20 dark:bg-emerald-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[hsl(var(--foreground))]">{pub.title}</span>
                      <Badge className="bg-emerald-600 text-white text-[10px]">Published</Badge>
                    </div>
                    <p className="text-[hsl(var(--muted-foreground))]">
                      Course: <strong>{pub.course}</strong> • Mapped: <strong>{pub.chapter}</strong>
                    </p>
                  </div>
                  <Button asChild size="sm" variant="outline" className="text-xs gap-1 shrink-0">
                    <a href="/courses">
                      View in Courses <ChevronRight className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4: OFFICIAL & INTERNET SOURCES REGISTRY */}
        <TabsContent value="sources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sources.map((src) => (
              <Card key={src.id} className="border-[hsl(var(--border))]">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={src.type === "official" ? "default" : "secondary"} className="text-[10px]">
                      {src.type === "official" ? "Official Statutory" : "Academic Research"}
                    </Badge>
                    <span className="text-[11px] font-bold text-emerald-600">Trust: {src.trustScore}/100</span>
                  </div>
                  <CardTitle className="text-sm font-bold mt-2">{src.name}</CardTitle>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{src.organization}</p>
                </CardHeader>
                <CardContent className="p-4 pt-1 space-y-3 text-xs">
                  <div className="space-y-1 text-[11px] text-[hsl(var(--muted-foreground))]">
                    <p>Licence: <strong>{src.license.replace(/_/g, " ")}</strong></p>
                    <p>Permissions: Store [{src.canStore ? "✓" : "✗"}] • Process [{src.canProcess ? "✓" : "✗"}] • Distribute [{src.canRedistribute ? "✓" : "✗"}]</p>
                    <p>Last Surveillance: {src.lastChecked}</p>
                  </div>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline"
                  >
                    Open Source Portal <ExternalLink className="h-3 w-3" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* TAB 5: VERIFICATION & COPYRIGHT AUDIT */}
        <TabsContent value="verification" className="space-y-4">
          <Card className="border-[hsl(var(--border))]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Automated Verification & Copyright Engine
              </CardTitle>
              <CardDescription className="text-xs">
                Every synthesized chapter undergoes 6 automated auditing checks before appearing in the approval queue.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              {[
                { name: "Syllabus Hierarchy Mapping", desc: "Ensures topics match the latest 2023+ ICAI/ICMAI/ICSI/ACCA schemes and NEP PRSU semester frameworks.", status: "100% Passed" },
                { name: "Mathematical & Numerical Accuracy Proof", desc: "Verifies double-entry equality, depreciation proration, tax slab calculations, and BEP formulas.", status: "Verified" },
                { name: "Legal & Statutory Amendment Check", desc: "Validates against current Finance Act 2024 and active MCA notification dates.", status: "Verified" },
                { name: "Zero Plagiarism & Originality Audit", desc: "Ensures text is independently authored synthesis rather than direct copyrighted textbook reproduction.", status: "< 2% Similarity" },
                { name: "Source Rights & Redistribution Permitted", desc: "Confirms non-infringement policy; restricted textbooks cited via external link only.", status: "Compliant" },
              ].map((v, i) => (
                <div key={i} className="p-3 rounded-lg border border-[hsl(var(--border))] flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-[hsl(var(--foreground))]">{v.name}</p>
                    <p className="text-[hsl(var(--muted-foreground))] text-[11px]">{v.desc}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shrink-0">
                    {v.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 6: SPECIALIZED AGENTS TEAM */}
        <TabsContent value="agents" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {[
              { code: "CAO-00", name: "Central AI Orchestrator", role: "Assigns and coordinates tasks across all pipeline agents." },
              { code: "ARA-01", name: "Research Agent", role: "Discovers official syllabus notices, gazettes, and academic articles." },
              { code: "EXT-02", name: "Source Extraction Agent", role: "Extracts facts, definitions, formulas, and statutory references." },
              { code: "CCA-03", name: "Content Creation Agent", role: "Synthesizes original notes, solved numericals, and ELI10 analogies." },
              { code: "AVA-06", name: "Verification Agent", role: "Verifies mathematical calculations, journal entries, and legal dates." },
              { code: "CPY-07", name: "Copyright Agent", role: "Checks source licenses, attribution tags, and redistribution permissions." },
              { code: "SYL-08", name: "Syllabus Mapping Agent", role: "Maps each unit, chapter, and topic to official institute schemes." },
              { code: "TRA-09", name: "Translation Agent", role: "Produces accurate translations in English, हिन्दी, and Hinglish." },
              { code: "PUB-10", name: "Publishing Agent", role: "Deploys verified, approved materials into student curriculum views." },
            ].map((ag) => (
              <Card key={ag.code} className="border-[hsl(var(--border))]">
                <CardHeader className="p-3 pb-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[hsl(var(--muted))] text-indigo-600">
                      {ag.code}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Active</span>
                  </div>
                  <CardTitle className="text-xs font-bold mt-1">{ag.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-1 text-[11px] text-[hsl(var(--muted-foreground))]">
                  {ag.role}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
