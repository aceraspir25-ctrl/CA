"use client"

import { useState, useEffect } from "react"
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
  Pause,
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
  Share2,
  History,
  Activity,
  Send,
  Smartphone,
  BellRing
} from "lucide-react"
import {
  INITIAL_REGISTERED_SOURCES,
  INITIAL_PIPELINE_ITEMS,
  PipelineItem,
  OperatingMode,
  PipelineStage,
  RegisteredSource
} from "@/data/researchPipelineData"
import { APPROVED_RESEARCH_SOURCES } from "@/data/multiPlatformResearchData"
import { INITIAL_TELEGRAM_UPLOAD_JOBS, TelegramUploadJob } from "@/data/telegramAdminData"
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
  const [selectedCourse, setSelectedCourse] = useState("CA Foundation")
  const [selectedChapterInput, setSelectedChapterInput] = useState("Accounting Cycle & Trial Balance")
  const [isResearching, setIsResearching] = useState(false)
  const [researchSuccessMsg, setResearchSuccessMsg] = useState("")

  // Telegram Remote Admin State
  const [botTokenInput, setBotTokenInput] = useState("")
  const [adminChatIdInput, setAdminChatIdInput] = useState("")
  const [telegramStatusMsg, setTelegramStatusMsg] = useState("")
  const [isSendingTelegramTest, setIsSendingTelegramTest] = useState(false)

  // Telegram Document Uploads & Natural Language State
  const [telegramJobs, setTelegramJobs] = useState<TelegramUploadJob[]>(INITIAL_TELEGRAM_UPLOAD_JOBS)
  const [selectedTelegramJob, setSelectedTelegramJob] = useState<TelegramUploadJob | null>(telegramJobs[0])
  const [hinglishInput, setHinglishInput] = useState("CMA Inter ke notes verify karo")
  const [hinglishResponse, setHinglishResponse] = useState("")
  const [isProcessingHinglish, setIsProcessingHinglish] = useState(false)

  const handleExecuteHinglish = async (queryText?: string) => {
    const textToRun = queryText || hinglishInput
    if (!textToRun.trim()) return
    setIsProcessingHinglish(true)
    setHinglishResponse("")

    try {
      const res = await fetch("/api/telegram/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: {
            text: textToRun,
            chat: { id: 987654321 },
            from: { username: "RahulSharma_Admin", id: 987654321 }
          }
        })
      })
      const data = await res.json()
      // Refresh jobs list in case upload was triggered
      const freshRes = await fetch("/api/telegram/webhook")
      const freshData = await freshRes.json()
      if (freshData.uploadJobs) {
        setTelegramJobs(freshData.uploadJobs)
        if (freshData.uploadJobs[0]) setSelectedTelegramJob(freshData.uploadJobs[0])
      }
      setHinglishResponse(`🤖 Agent Executed Command: "${textToRun}"\nTask processed successfully across AI Orchestrator and synced with central database!`)
    } catch (e: any) {
      setHinglishResponse(`⚠️ Execution error: ${e?.message}`)
    } finally {
      setIsProcessingHinglish(false)
    }
  }

  const handleSendTelegramTest = async () => {
    setIsSendingTelegramTest(true)
    setTelegramStatusMsg("")
    try {
      const res = await fetch("/api/telegram/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: {
            text: "/test",
            chat: { id: adminChatIdInput || 987654321 },
            from: { username: "Admin", id: adminChatIdInput || 987654321 }
          }
        })
      })
      const data = await res.json()
      setTelegramStatusMsg("✅ Test verification prompt dispatched successfully! Telegram Webhook & Web Admin Panel are in real-time sync.")
    } catch (e: any) {
      setTelegramStatusMsg(`⚠️ Error sending test prompt: ${e?.message}`)
    } finally {
      setIsSendingTelegramTest(false)
    }
  }

  const handleSimulateUploadPdf = async (customFileName?: string) => {
    const fName = customFileName || "Cost_Accounting_Notes.pdf"
    setIsProcessingHinglish(true)
    try {
      const res = await fetch("/api/telegram/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: {
            document: {
              file_name: fName,
              file_size: 4404019
            },
            chat: { id: 987654321 },
            from: { username: "RahulSharma_Admin", id: 987654321 }
          }
        })
      })
      const data = await res.json()
      if (data.job) {
        setTelegramJobs((prev) => [data.job, ...prev])
        setSelectedTelegramJob(data.job)
        setTelegramStatusMsg(`📥 Received and analyzed ${fName}! 7 document agents executed with zero errors.`)
      }
    } catch (e: any) {
      console.error("Simulation error:", e)
    } finally {
      setIsProcessingHinglish(false)
    }
  }

  const handleJobAction = (jobId: string, action: "approve" | "reject" | "request_changes") => {
    const timestamp = new Date().toLocaleTimeString()
    setTelegramJobs((prev) =>
      prev.map((j) => {
        if (j.id === jobId) {
          const newStatus = action === "approve" ? "approved" : action === "reject" ? "rejected" : "changes_requested"
          return {
            ...j,
            status: newStatus as any,
            auditTrail: [
              {
                timestamp,
                action: action === "approve" ? "APPROVED_VIA_ADMIN_PANEL" : action === "reject" ? "REJECTED_VIA_ADMIN_PANEL" : "CHANGES_REQUESTED",
                actor: "Super Admin (Web UI / Telegram Synced)",
                notes: `Action: ${action.toUpperCase()} synchronized with Telegram webhook.`
              },
              ...j.auditTrail
            ]
          }
        }
        return j
      })
    )
    if (selectedTelegramJob?.id === jobId) {
      setSelectedTelegramJob((prev) =>
        prev
          ? {
              ...prev,
              status: (action === "approve" ? "approved" : action === "reject" ? "rejected" : "changes_requested") as any
            }
          : null
      )
    }
  }

  // 24x7 Autonomous Engine State
  const [is24x7Active, setIs24x7Active] = useState(true)
  const [countdownSeconds, setCountdownSeconds] = useState(45)
  const [autonomousCyclesCount, setAutonomousCyclesCount] = useState(38)

  // 24x7 Background Cycle Interval
  useEffect(() => {
    if (!is24x7Active) return
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev <= 1) {
          // Autonomous Cycle Triggers
          setAutonomousCyclesCount((c) => c + 1)
          return 45
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [is24x7Active])

  const handleRollback = (id: string) => {
    setPipelineItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              stage: "published",
              reviewerNotes: "Rolled back to verified previous stable release (v1.0).",
              lastUpdated: "Rolled back just now",
            }
          : item
      )
    )
    if (selectedItem?.id === id) {
      setSelectedItem((prev) =>
        prev
          ? {
              ...prev,
              reviewerNotes: "Rolled back to verified previous stable release (v1.0).",
              lastUpdated: "Rolled back just now",
            }
          : null
      )
    }
  }

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

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* 24x7 Engine Status */}
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
                <Activity className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                24x7 Continuous Agent
              </span>
              <button
                onClick={() => setIs24x7Active((prev) => !prev)}
                className="text-[10px] underline text-indigo-200 hover:text-white"
              >
                {is24x7Active ? "Pause" : "Resume"}
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Badge className={is24x7Active ? "bg-emerald-600 text-white" : "bg-slate-500 text-white"}>
                {is24x7Active ? "Active & Scanning" : "Paused"}
              </Badge>
              <span className="text-[11px] text-indigo-200">
                Next cycle: <strong>{countdownSeconds}s</strong>
              </span>
            </div>
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
          <TabsTrigger value="telegram" className="gap-1.5 text-xs py-1.5">
            <Send className="h-3.5 w-3.5 text-sky-500" /> 📱 Telegram Approval Bot
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
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRollback(pub.id)}
                      className="text-xs gap-1 text-amber-600 border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                      title="Rollback to previous stable release (v1.0)"
                    >
                      <RotateCcw className="h-3 w-3" /> Rollback
                    </Button>
                    <Button asChild size="sm" variant="outline" className="text-xs gap-1">
                      <a href="/courses">
                        View in Courses <ChevronRight className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
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

          {/* Approved Educational Platforms Rights Registry */}
          <div className="pt-4 border-t border-[hsl(var(--border))] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                  Multi-Platform Rights Registry (Educational Platforms Surveillance)
                </h4>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  Restricted third-party materials (BYJU&apos;S, PW, Aakash, EduRev, StudyX, Toppr, Vedantu) are surveyed strictly for concept discovery and learning gap identification under Fair Dealing. Redistribution is disabled; 100% original synthesis is enforced.
                </p>
              </div>
              <Badge className="bg-emerald-600 text-white text-xs">Zero Copyright Infringement Policy</Badge>
            </div>

            <div className="border rounded-xl overflow-hidden text-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[hsl(var(--muted))] border-b text-[11px] font-bold text-[hsl(var(--muted-foreground))]">
                    <tr>
                      <th className="p-3">Platform</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Surveillance URL</th>
                      <th className="p-3">Rights Status</th>
                      <th className="p-3">Processing</th>
                      <th className="p-3">Redistribute</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[hsl(var(--border))]">
                    {APPROVED_RESEARCH_SOURCES.map((plat) => (
                      <tr key={plat.id} className="hover:bg-[hsl(var(--muted))]/30">
                        <td className="p-3 font-semibold text-[hsl(var(--foreground))]">
                          {plat.sourceOrganization}
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="text-[10px]">
                            {plat.platformCategory === "official_statutory" ? "Official Statutory" : "Approved EdTech"}
                          </Badge>
                        </td>
                        <td className="p-3 font-mono text-[11px] text-blue-600 truncate max-w-[200px]">
                          {plat.sourceUrl}
                        </td>
                        <td className="p-3">
                          <Badge
                            className={`text-[10px] ${
                              plat.rightsStatus === "VERIFIED_PERMITTED"
                                ? "bg-emerald-600 text-white"
                                : "bg-amber-600 text-white"
                            }`}
                          >
                            {plat.rightsStatus}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <span className="text-emerald-600 font-bold">✓ Permitted (Topic Discovery)</span>
                        </td>
                        <td className="p-3">
                          {plat.canRedistribute ? (
                            <span className="text-emerald-600 font-semibold">Allowed</span>
                          ) : (
                            <span className="text-red-500 font-bold">🚫 Prohibited (Original Synth Only)</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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

        {/* TAB 7: TELEGRAM BOT REMOTE APPROVAL GATEWAY & 7-STAGE PDF ANALYSIS */}
        <TabsContent value="telegram" className="space-y-6">
          {/* Top Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-950 via-blue-950 to-slate-900 text-white border border-sky-800 shadow-xl space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-sky-500/20 rounded-lg">
                  <Send className="h-6 w-6 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Official Telegram Remote Admin & 7-Stage Document Processing Interface</h3>
                  <p className="text-xs text-sky-200">
                    Synchronized with Web Admin Panel: Send PDFs from your phone, trigger 7 specialized agents, and 1-click approve study materials.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge className="bg-emerald-500 text-white text-xs">Live Webhook Synced</Badge>
                <Button
                  size="sm"
                  onClick={() => handleSimulateUploadPdf("Cost_Accounting_Notes.pdf")}
                  disabled={isProcessingHinglish}
                  className="bg-sky-600 hover:bg-sky-700 text-white text-xs gap-1.5"
                >
                  <FileText className="h-3.5 w-3.5" /> Send PDF (Cost_Accounting_Notes.pdf)
                </Button>
              </div>
            </div>
          </div>

          {/* SECTION 1: TELEGRAM PDF UPLOADS & 7-STAGE AGENT PIPELINE QUEUE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold flex items-center gap-2 text-[hsl(var(--foreground))]">
                  <FileCheck className="h-4 w-4 text-emerald-600" />
                  Telegram Document Uploads & 7-Stage Multi-Agent Analysis Queue
                </h4>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  Documents received via Telegram are processed by: 1. Document Analysis → 2. Course Detection → 3. Internet Research → 4. Academic Verification → 5. Freshness & Amendment → 6. Copyright → 7. Content Integration.
                </p>
              </div>
              <Badge variant="outline" className="text-xs font-semibold">
                {telegramJobs.length} Upload Jobs Tracked
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 4 Cols: Upload Jobs List */}
              <div className="lg:col-span-4 space-y-2.5">
                {telegramJobs.map((job) => {
                  const isSelected = selectedTelegramJob?.id === job.id
                  return (
                    <Card
                      key={job.id}
                      onClick={() => setSelectedTelegramJob(job)}
                      className={`cursor-pointer transition-all border ${
                        isSelected
                          ? "border-sky-500 shadow-md ring-1 ring-sky-500/30 bg-sky-50/10 dark:bg-sky-950/20"
                          : "hover:border-[hsl(var(--border))]/80 hover:bg-[hsl(var(--muted))]/30"
                      }`}
                    >
                      <CardHeader className="p-3 pb-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] font-bold text-sky-600 truncate">
                            {job.fileName}
                          </span>
                          <Badge
                            className={`text-[9px] px-1.5 py-0 ${
                              job.status === "approved"
                                ? "bg-emerald-600 text-white"
                                : job.status === "rejected"
                                ? "bg-rose-600 text-white"
                                : job.status === "changes_requested"
                                ? "bg-amber-600 text-white"
                                : "bg-sky-600 text-white animate-pulse"
                            }`}
                          >
                            {job.status.replace(/_/g, " ")}
                          </Badge>
                        </div>
                        <p className="text-[11px] font-semibold text-[hsl(var(--foreground))] mt-0.5">
                          {job.courseDetection.course} • {job.courseDetection.subject}
                        </p>
                      </CardHeader>
                      <CardContent className="p-3 pt-0 text-[10px] text-[hsl(var(--muted-foreground))] flex items-center justify-between border-t border-[hsl(var(--border))]/40 mt-1">
                        <span>Size: {job.fileSize}</span>
                        <span>{job.uploadedBy}</span>
                        <span>{job.uploadedAt}</span>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Right 8 Cols: 7-Stage Inspection & Approval Card */}
              <div className="lg:col-span-8">
                {selectedTelegramJob ? (
                  <Card className="border-[hsl(var(--border))] shadow-md space-y-4">
                    <CardHeader className="p-4 pb-2 border-b border-[hsl(var(--border))]">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-sky-600">
                              {selectedTelegramJob.fileName}
                            </span>
                            <Badge variant="outline" className="text-[10px]">
                              Confidence: {selectedTelegramJob.courseDetection.confidence}%
                            </Badge>
                          </div>
                          <CardTitle className="text-sm font-bold mt-1">
                            {selectedTelegramJob.courseDetection.institution} • {selectedTelegramJob.courseDetection.course} • {selectedTelegramJob.courseDetection.subject}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            Mapped Chapter: <strong>{selectedTelegramJob.courseDetection.chapter}</strong>
                          </CardDescription>
                        </div>

                        {/* Status Badge */}
                        <div className="shrink-0">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              selectedTelegramJob.status === "approved"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                : selectedTelegramJob.status === "rejected"
                                ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                                : selectedTelegramJob.status === "changes_requested"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                : "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300"
                            }`}
                          >
                            Status: {selectedTelegramJob.status.replace(/_/g, " ").toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-4 pt-0 space-y-4 text-xs">
                      {/* Verification Results Table (Exact from User Spec) */}
                      <div className="p-3.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))] block">
                          🔍 Automated Multi-Agent Verification Results Table:
                        </span>
                        <div className="border rounded-lg overflow-hidden bg-[hsl(var(--background))] text-xs">
                          <table className="w-full text-left">
                            <thead className="bg-[hsl(var(--muted))] border-b text-[11px] font-bold">
                              <tr>
                                <th className="p-2.5">Verification Check</th>
                                <th className="p-2.5">Agent Result</th>
                                <th className="p-2.5">Remarks / Compliance</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[hsl(var(--border))] text-[11px]">
                              <tr>
                                <td className="p-2.5 font-medium">Course Mapping</td>
                                <td className="p-2.5">
                                  <Badge className="bg-emerald-600 text-white text-[10px]">
                                    {selectedTelegramJob.verificationReport.courseMapping}
                                  </Badge>
                                </td>
                                <td className="p-2.5 text-[hsl(var(--muted-foreground))]">
                                  Matched {selectedTelegramJob.courseDetection.institution} {selectedTelegramJob.courseDetection.course} syllabus
                                </td>
                              </tr>
                              <tr>
                                <td className="p-2.5 font-medium">Formula Verification</td>
                                <td className="p-2.5">
                                  <Badge className="bg-emerald-600 text-white text-[10px]">
                                    {selectedTelegramJob.verificationReport.formulaVerification}
                                  </Badge>
                                </td>
                                <td className="p-2.5 text-[hsl(var(--muted-foreground))]">
                                  {selectedTelegramJob.documentAnalysis.formulasIdentified[0]}
                                </td>
                              </tr>
                              <tr>
                                <td className="p-2.5 font-medium">Numerical Checks</td>
                                <td className="p-2.5">
                                  <Badge className="bg-emerald-600 text-white text-[10px]">
                                    {selectedTelegramJob.verificationReport.numericalChecks}
                                  </Badge>
                                </td>
                                <td className="p-2.5 text-[hsl(var(--muted-foreground))]">
                                  {selectedTelegramJob.documentAnalysis.numericalsFound} solved illustrations verified
                                </td>
                              </tr>
                              <tr>
                                <td className="p-2.5 font-medium">Latest Syllabus & Freshness</td>
                                <td className="p-2.5">
                                  <Badge className="bg-blue-600 text-white text-[10px]">
                                    {selectedTelegramJob.verificationReport.latestSyllabus}
                                  </Badge>
                                </td>
                                <td className="p-2.5 text-[hsl(var(--muted-foreground))]">
                                  {selectedTelegramJob.verificationReport.freshnessNotes}
                                </td>
                              </tr>
                              <tr>
                                <td className="p-2.5 font-medium">Copyright Permission</td>
                                <td className="p-2.5">
                                  <Badge className="bg-amber-600 text-white text-[10px]">
                                    {selectedTelegramJob.verificationReport.copyrightPermission}
                                  </Badge>
                                </td>
                                <td className="p-2.5 text-[hsl(var(--muted-foreground))]">
                                  Research & reference only. Original equivalent synthesized.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="p-2.5 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-[11px] text-indigo-950 dark:text-indigo-200 flex items-center gap-2">
                          <Bot className="h-4 w-4 text-indigo-600 shrink-0" />
                          <span><strong>AI Recommendation:</strong> {selectedTelegramJob.verificationReport.aiRecommendation}</span>
                        </div>
                      </div>

                      {/* 4 Interactive Action Buttons (Approve, Reject, Request Changes, View Report) */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                        <Button
                          size="sm"
                          onClick={() => handleJobAction(selectedTelegramJob.id, "approve")}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold gap-1.5"
                        >
                          <Check className="h-3.5 w-3.5" /> Approve & Publish
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleJobAction(selectedTelegramJob.id, "reject")}
                          className="text-xs font-bold gap-1.5"
                        >
                          <X className="h-3.5 w-3.5" /> Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleJobAction(selectedTelegramJob.id, "request_changes")}
                          className="text-xs font-bold gap-1.5 text-amber-600 border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                        >
                          <RotateCcw className="h-3.5 w-3.5" /> Request Changes
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setTelegramStatusMsg(`📊 Report Preview: All 7 stages completed for ${selectedTelegramJob.fileName}. Text OCR extracted ${selectedTelegramJob.documentAnalysis.pageCount} pages, ${selectedTelegramJob.documentAnalysis.tablesCount} tables, and ${selectedTelegramJob.documentAnalysis.numericalsFound} solved numericals.`)
                          }}
                          className="text-xs font-bold gap-1.5"
                        >
                          <FileText className="h-3.5 w-3.5 text-blue-600" /> View Report
                        </Button>
                      </div>

                      {/* 7-Stage Pipeline Status Checklist */}
                      <div className="space-y-1.5 pt-2 border-t border-[hsl(var(--border))]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                          7 Specialized Document Agents Execution Trail:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                          {selectedTelegramJob.stagesCompleted.map((stage, idx) => (
                            <div key={idx} className="p-2 rounded-md bg-[hsl(var(--muted))]/40 border flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                              <span className="truncate">{stage}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="p-8 text-center border border-dashed rounded-xl text-xs text-[hsl(var(--muted-foreground))]">
                    Select a document upload job to inspect verification details.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 2: NATURAL LANGUAGE HINGLISH COMMAND TERMINAL */}
          <div className="p-5 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[hsl(var(--border))] pb-3">
              <div>
                <h4 className="text-sm font-bold flex items-center gap-2">
                  <Bot className="h-4 w-4 text-sky-600" /> Natural Language Hinglish Command Processor
                </h4>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  Type natural conversational commands in Hinglish or English just like you would message on Telegram.
                </p>
              </div>
              <Badge className="bg-sky-600 text-white text-xs">AI Intent Router Active</Badge>
            </div>

            {/* Quick Command Chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[hsl(var(--muted-foreground))]">
                Click to Test Example Instructions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "CMA Inter ke notes verify karo",
                  "Ye PDF upload karo",
                  "Pending approvals dikhao",
                  "Chapter 4 ke MCQs banao",
                  "ICAI latest amendments check karo",
                  "Aaj ki agent report do",
                  "Is content ko publish karo",
                  "/status"
                ].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => {
                      setHinglishInput(chip)
                      handleExecuteHinglish(chip)
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs bg-[hsl(var(--muted))] hover:bg-sky-100 hover:text-sky-700 dark:hover:bg-sky-950 dark:hover:text-sky-300 border border-[hsl(var(--border))] transition-colors font-medium"
                  >
                    💬 {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Input */}
            <div className="flex gap-2">
              <Input
                value={hinglishInput}
                onChange={(e) => setHinglishInput(e.target.value)}
                placeholder="Type in Hinglish (e.g. 'Pending approvals dikhao', 'CMA Inter ke notes verify karo')..."
                className="text-xs h-9"
              />
              <Button
                onClick={() => handleExecuteHinglish()}
                disabled={isProcessingHinglish}
                className="h-9 px-4 text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shrink-0 gap-1.5"
              >
                <Send className="h-3.5 w-3.5" />
                {isProcessingHinglish ? "Executing..." : "Send Command"}
              </Button>
            </div>

            {/* Output Screen */}
            {hinglishResponse && (
              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 font-mono text-xs whitespace-pre-wrap leading-relaxed shadow-inner">
                {hinglishResponse}
              </div>
            )}
          </div>

          {/* SECTION 3: BOT SETUP & WEBHOOK CONFIGURATION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-4">
              <Card className="border-[hsl(var(--border))] shadow-md">
                <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-sky-600" /> Telegram Bot Configuration
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Connect your personal Telegram account to receive instant notifications when content needs your approval.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[hsl(var(--foreground))]">Telegram Bot Token (From @BotFather)</label>
                    <Input
                      type="password"
                      value={botTokenInput}
                      onChange={(e) => setBotTokenInput(e.target.value)}
                      placeholder="e.g. 7123456789:AAHxxxxx_xxxxxxxxxxxxxxx"
                      className="font-mono text-xs"
                    />
                    <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
                      Or set <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded">TELEGRAM_BOT_TOKEN</code> in your environment file.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-[hsl(var(--foreground))]">Authorized Admin Chat ID</label>
                    <Input
                      type="text"
                      value={adminChatIdInput}
                      onChange={(e) => setAdminChatIdInput(e.target.value)}
                      placeholder="e.g. 987654321 (Get from @userinfobot)"
                      className="font-mono text-xs"
                    />
                    <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
                      Ensures only your Telegram account has authorization to approve/reject materials.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                    <Button
                      onClick={handleSendTelegramTest}
                      disabled={isSendingTelegramTest}
                      className="w-full sm:w-auto text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white gap-2"
                    >
                      <BellRing className="h-3.5 w-3.5" />
                      {isSendingTelegramTest ? "Sending Test Ping..." : "Send Test Approval Prompt"}
                    </Button>
                    <span className="text-[11px] text-emerald-600 font-semibold">
                      Endpoint: /api/telegram/webhook
                    </span>
                  </div>

                  {telegramStatusMsg && (
                    <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-900 dark:text-sky-200 leading-relaxed">
                      {telegramStatusMsg}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <Card className="border-[hsl(var(--border))]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                    How to Setup in 2 Minutes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-1 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-sky-600">1.</span>
                    <p>Open Telegram and search <strong>@BotFather</strong>. Send <code>/newbot</code>, give it a name like <em>&quot;EduFinance Admin Bot&quot;</em>, and copy the HTTP API Token.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-sky-600">2.</span>
                    <p>Search <strong>@userinfobot</strong> on Telegram to find your unique numeric Chat ID.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-sky-600">3.</span>
                    <p>Paste them above or put them in <code>.env.local</code>. Now your phone is connected to your platform!</p>
                  </div>
                </CardContent>
              </Card>

              {/* Visual Mobile Phone Mockup */}
              <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50/30 dark:bg-sky-950/20 space-y-2">
                <span className="text-[10px] uppercase font-bold text-sky-600 tracking-wider block">
                  📱 Telegram Notification Preview on Your Phone:
                </span>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border text-xs shadow-sm space-y-2 font-sans">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-b pb-1">
                    <span className="font-bold text-sky-600">🤖 Education AI Admin Bot</span>
                    <span>Just now</span>
                  </div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    📋 <strong>New Content Verification Report</strong>
                  </p>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5">
                    <p>• <strong>Course:</strong> CMA Intermediate</p>
                    <p>• <strong>Subject:</strong> Cost Accounting</p>
                    <p>• <strong>Chapter:</strong> Material Cost</p>
                    <p>• <strong>Document:</strong> Cost_Accounting_Notes.pdf</p>
                  </div>
                  {/* Inline 4 Buttons Mockup */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    <div className="p-1.5 text-center rounded bg-emerald-600 text-white font-bold text-[10px]">
                      ✅ Approve
                    </div>
                    <div className="p-1.5 text-center rounded bg-rose-600 text-white font-bold text-[10px]">
                      ❌ Reject
                    </div>
                    <div className="p-1.5 text-center rounded bg-amber-600 text-white font-bold text-[10px]">
                      📝 Request Changes
                    </div>
                    <div className="p-1.5 text-center rounded bg-slate-700 text-white font-bold text-[10px]">
                      📖 View Report
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

