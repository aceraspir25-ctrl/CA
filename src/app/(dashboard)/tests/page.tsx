"use client"

import { useState } from "react"
import {
  ClipboardList,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Printer,
  ShieldCheck,
  Trophy,
  ExternalLink,
  BookOpen,
  Bot,
  FileSpreadsheet,
  Check,
  Clock,
  Layers,
  ChevronRight,
  RefreshCw,
  Send
} from "lucide-react"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QUESTION_BANK_STORE, ModelQuestionPaper, MCQItem } from "@/data/questionBanksData"

export default function TestsPage() {
  const { studentName, certificates, issueCertificate, recordWeakConcept } = useAppStore()

  const [activeTab, setActiveTab] = useState<"quiz" | "papers" | "generator" | "certificates">("quiz")
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [earnedCert, setEarnedCert] = useState<any>(null)

  // Paper & Generator States
  const [papersList, setPapersList] = useState<ModelQuestionPaper[]>(QUESTION_BANK_STORE.papers)
  const [selectedPaper, setSelectedPaper] = useState<ModelQuestionPaper | null>(QUESTION_BANK_STORE.papers[0] || null)
  const [generating, setGenerating] = useState(false)
  const [generateSubject, setGenerateSubject] = useState("Fundamental of Accounting")
  const [generatePaperCode, setGeneratePaperCode] = useState("DSC-1")
  const [generateType, setGenerateType] = useState<"MQP" | "PYQ" | "SAMPLE">("MQP")
  const [genSuccessMessage, setGenSuccessMessage] = useState("")

  const allMCQs = QUESTION_BANK_STORE.mcqs

  const handleSelect = (qId: string, optionIdx: number) => {
    if (isSubmitted) return
    setSelectedAnswers({ ...selectedAnswers, [qId]: optionIdx })
  }

  const handleSubmitQuiz = () => {
    setIsSubmitted(true)
    let score = 0
    allMCQs.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++
      } else if (selectedAnswers[q.id] !== undefined) {
        recordWeakConcept(
          q.question.substring(0, 50) + "...",
          q.subject,
          `Failed quiz question: ${q.question}. Correct concept: ${q.explanation}`
        )
      }
    })

    const percentage = Math.round((score / allMCQs.length) * 100)
    if (percentage >= 75) {
      const newCert = issueCertificate({
        courseName: "PRSU B.Com & CA Universal Academic Foundation",
        institution: "EduFinance Universal Assessment Board",
        studentName,
        scorePercentage: percentage,
        masteryLevel: 50,
      })
      setEarnedCert(newCert)
    }
  }

  const handleResetQuiz = () => {
    setSelectedAnswers({})
    setIsSubmitted(false)
    setEarnedCert(null)
  }

  const totalScore = allMCQs.filter((q) => selectedAnswers[q.id] === q.correctIndex).length
  const scorePercentage = Math.round((totalScore / allMCQs.length) * 100)

  // Handle Dual AI Paper Generation
  const handleGeneratePaper = async () => {
    setGenerating(true)
    setGenSuccessMessage("")
    try {
      const res = await fetch("/api/ai/generate-paper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: generateSubject,
          paperCode: generatePaperCode,
          type: generateType,
          institution: "PRSU",
          courseLevel: "B.Com Semester (NEP)"
        })
      })
      const data = await res.json()
      if (data.success && data.paper) {
        setPapersList([data.paper, ...papersList])
        setSelectedPaper(data.paper)
        setGenSuccessMessage(`🎉 ${data.paper.title} successfully synthesized by Gemini 2.5 Flash + GPT-4o! Uploaded and notified to Telegram.`)
      }
    } catch (e: any) {
      setGenSuccessMessage("Failed to generate paper. Please try again.")
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* 1. TOP HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <ClipboardList className="h-6 w-6" />
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
                Assessment Center & Dual-AI Exam Studio
              </h1>
              <Badge className="bg-primary text-primary-foreground font-extrabold text-xs">
                Gemini 2.5 + GPT-4o Active
              </Badge>
            </div>
            <p className="text-blue-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Solve official Model Question Papers (MQP), Previous Year Papers (PYQ), and exam MCQs. Powered by continuous autonomous question harvesting and Telegram notifications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Button
              variant="outline"
              onClick={() => setActiveTab("generator")}
              className="bg-white/15 text-white border-white/30 hover:bg-white/25 gap-2 text-xs font-bold rounded-xl active:scale-95 cursor-pointer backdrop-blur-md"
            >
              <Bot className="h-4 w-4 text-cyan-300" />
              Generate Paper with AI
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveTab("certificates")}
              className="bg-white text-slate-950 border-white hover:bg-blue-50 gap-2 text-xs font-bold rounded-xl active:scale-95 cursor-pointer"
            >
              <Award className="h-4 w-4 text-amber-500" />
              Certificates ({certificates.length})
            </Button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION TABS */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
        <TabsList className="glass-panel border border-[hsl(var(--border))] p-1 h-auto rounded-2xl flex flex-wrap sm:inline-flex">
          <TabsTrigger
            value="quiz"
            className="gap-2 rounded-xl text-xs font-bold py-2 px-3 sm:px-4 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <ClipboardList className="h-4 w-4" />
            Live Practice MCQs ({allMCQs.length})
          </TabsTrigger>
          <TabsTrigger
            value="papers"
            className="gap-2 rounded-xl text-xs font-bold py-2 px-3 sm:px-4 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <BookOpen className="h-4 w-4 text-emerald-400" />
            Model Papers & PYQs ({papersList.length})
          </TabsTrigger>
          <TabsTrigger
            value="generator"
            className="gap-2 rounded-xl text-xs font-bold py-2 px-3 sm:px-4 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            Dual-AI Generator Studio
          </TabsTrigger>
          <TabsTrigger
            value="certificates"
            className="gap-2 rounded-xl text-xs font-bold py-2 px-3 sm:px-4 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Trophy className="h-4 w-4 text-amber-500" />
            Mastery Certificates ({certificates.length})
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: LIVE PRACTICE MCQS */}
        <TabsContent value="quiz" className="space-y-6">
          {/* Result Banner if submitted */}
          {isSubmitted && (
            <div className={`p-6 rounded-3xl border-2 glass-panel ${scorePercentage >= 75 ? "border-emerald-500 bg-emerald-500/10" : "border-amber-500 bg-amber-500/10"}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {scorePercentage >= 75 ? (
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                    ) : (
                      <HelpCircle className="h-6 w-6 text-amber-500" />
                    )}
                    <h3 className="text-xl font-black text-[hsl(var(--foreground))]">
                      {scorePercentage >= 75 ? "🎉 Mastery Verified! Certificate Issued" : "Keep Practicing!"}
                    </h3>
                  </div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    You scored <strong className="text-[hsl(var(--foreground))]">{totalScore} / {allMCQs.length} ({scorePercentage}%)</strong>.
                    {scorePercentage >= 75
                      ? " Outstanding performance! Your verifiable certificate has been stored in your vault."
                      : " Concepts you missed have been automatically recorded for revision in your AI Tutor."}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button onClick={handleResetQuiz} variant="outline" size="sm" className="gap-1.5 text-xs font-bold rounded-xl cursor-pointer">
                    <RotateCcw className="h-3.5 w-3.5" /> Retake Test
                  </Button>
                  {scorePercentage >= 75 && (
                    <Button onClick={() => setActiveTab("certificates")} size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl btn-tactile cursor-pointer">
                      <Award className="h-3.5 w-3.5" /> View Certificate
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* MCQ Question Cards */}
          <div className="space-y-4">
            {allMCQs.map((q, idx) => {
              const userAnswer = selectedAnswers[q.id]
              const isCorrect = isSubmitted && userAnswer === q.correctIndex
              const isWrong = isSubmitted && userAnswer !== undefined && userAnswer !== q.correctIndex

              return (
                <div
                  key={q.id}
                  className="rounded-3xl glass-panel border border-[hsl(var(--border))] p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-[hsl(var(--border))] pb-2.5">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs font-bold bg-primary/10 text-primary border-primary/20">
                        Q{idx + 1} &bull; {q.paperCode}
                      </Badge>
                      <span className="text-xs text-[hsl(var(--muted-foreground))] font-medium">
                        {q.subject}
                      </span>
                    </div>
                    {isSubmitted && (
                      <div>
                        {isCorrect && (
                          <Badge className="bg-emerald-600 text-white text-xs font-bold gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Correct (+1)
                          </Badge>
                        )}
                        {isWrong && (
                          <Badge variant="destructive" className="text-xs font-bold gap-1">
                            <XCircle className="h-3 w-3" /> Incorrect
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[hsl(var(--foreground))]">
                      {q.question}
                    </h3>
                    <p className="text-xs font-medium text-primary mt-0.5">
                      {q.hindiQuestion}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isChosen = userAnswer === oIdx
                      const isOptionRight = isSubmitted && oIdx === q.correctIndex
                      const isOptionWrongChoice = isSubmitted && isChosen && !isOptionRight

                      return (
                        <button
                          key={oIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelect(q.id, oIdx)}
                          className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between gap-2 active:scale-[0.99] ${
                            isOptionRight
                              ? "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30"
                              : isOptionWrongChoice
                              ? "border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300"
                              : isChosen
                              ? "border-primary bg-primary/15 text-primary ring-2 ring-primary/30"
                              : "border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:bg-[hsl(var(--muted))]"
                          }`}
                        >
                          <span>{opt}</span>
                          {isOptionRight && <Check className="h-4 w-4 text-emerald-500 shrink-0" />}
                        </button>
                      )
                    })}
                  </div>

                  {/* Explanation upon submission */}
                  {isSubmitted && (
                    <div className="p-3.5 rounded-2xl bg-[hsl(var(--muted)/0.5)] border border-[hsl(var(--border))] text-xs space-y-1">
                      <p className="font-bold text-[hsl(var(--foreground))] flex items-center gap-1.5">
                        <HelpCircle className="h-3.5 w-3.5 text-primary" />
                        Statutory Explanation & Rationale:
                      </p>
                      <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                        {q.explanation}
                      </p>
                      {q.statutoryReference && (
                        <p className="text-[11px] text-primary font-bold pt-1">
                          Ref: {q.statutoryReference}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {!isSubmitted && (
            <div className="flex justify-end pt-2">
              <Button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="gap-2 text-xs font-bold rounded-xl btn-tactile px-6 cursor-pointer"
              >
                Submit Assessment ({Object.keys(selectedAnswers).length}/{allMCQs.length} Answered)
              </Button>
            </div>
          )}
        </TabsContent>

        {/* TAB 2: MODEL PAPERS & PREVIOUS YEAR PAPERS */}
        <TabsContent value="papers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Paper Selection Sidebar */}
            <div className="space-y-3 lg:col-span-1">
              <p className="text-xs font-black uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                Available Papers ({papersList.length}):
              </p>
              <div className="space-y-2">
                {papersList.map((p) => {
                  const isSelected = selectedPaper?.id === p.id
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPaper(p)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 active:scale-[0.99] ${
                        isSelected
                          ? "border-primary bg-primary/10 shadow-sm ring-2 ring-primary/30"
                          : "border-[hsl(var(--border))] glass-panel hover:bg-[hsl(var(--muted))]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Badge className="bg-primary text-primary-foreground text-[10px] font-bold">
                          {p.type} &bull; {p.paperCode}
                        </Badge>
                        <span className="text-[11px] font-bold text-[hsl(var(--muted-foreground))]">
                          {p.totalMarks} Marks
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-[hsl(var(--foreground))] line-clamp-1">
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-[hsl(var(--muted-foreground))]">
                        {p.institution} &bull; {p.duration}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Selected Paper Full Viewer */}
            {selectedPaper && (
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-3xl glass-panel border border-[hsl(var(--border))] p-6 shadow-sm space-y-6">
                  {/* Paper Header */}
                  <div className="border-b border-[hsl(var(--border))] pb-4 space-y-2 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <Badge className="bg-primary text-primary-foreground text-xs font-bold">
                        {selectedPaper.institution} Official {selectedPaper.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        Year {selectedPaper.year}
                      </Badge>
                      <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">
                        Time: {selectedPaper.duration} &bull; Max Marks: {selectedPaper.totalMarks}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-[hsl(var(--foreground))]">
                      {selectedPaper.title}
                    </h2>
                    <p className="text-xs text-primary font-bold">
                      {selectedPaper.hindiTitle}
                    </p>
                  </div>

                  {/* Section A: Objective Questions */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-2">
                      <h3 className="text-sm font-black text-[hsl(var(--foreground))]">
                        Section A: Objective Questions (20 Marks)
                      </h3>
                      <span className="text-xs text-[hsl(var(--muted-foreground))] font-semibold">Compulsory</span>
                    </div>

                    <div className="space-y-3">
                      {selectedPaper.sectionA.map((q, idx) => (
                        <div key={q.id} className="p-3.5 rounded-2xl bg-[hsl(var(--muted)/0.3)] border border-[hsl(var(--border))] space-y-1.5">
                          <p className="text-xs font-bold text-[hsl(var(--foreground))]">
                            Q{idx + 1}. {q.question}
                          </p>
                          <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-1">
                            {q.options.map((opt, oi) => (
                              <div key={oi} className={`p-1.5 rounded-lg border ${oi === q.correctIndex ? "border-emerald-500/50 bg-emerald-500/10 font-bold text-emerald-600 dark:text-emerald-400" : "border-[hsl(var(--border))]"}`}>
                                {String.fromCharCode(65 + oi)}. {opt}
                              </div>
                            ))}
                          </div>
                          <p className="text-[10px] text-[hsl(var(--muted-foreground))] italic pt-1">
                            Answer: <strong>{q.options[q.correctIndex]}</strong> ({q.explanation})
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section B: Short Descriptive */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-2">
                      <h3 className="text-sm font-black text-[hsl(var(--foreground))]">
                        Section B: Short Conceptual Questions (30 Marks)
                      </h3>
                      <span className="text-xs text-[hsl(var(--muted-foreground))] font-semibold">Attempt All</span>
                    </div>

                    <div className="space-y-3">
                      {selectedPaper.sectionB.map((q, idx) => (
                        <div key={q.id} className="p-3.5 rounded-2xl bg-[hsl(var(--muted)/0.3)] border border-[hsl(var(--border))] space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-[hsl(var(--foreground))]">
                              Q{idx + 1}. {q.question}
                            </p>
                            <Badge variant="secondary" className="text-[10px] font-bold">
                              {q.marks} Marks
                            </Badge>
                          </div>
                          <div className="p-2.5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-xs text-[hsl(var(--foreground))] leading-relaxed">
                            <strong>Model Answer:</strong> {q.modelAnswer}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section C: Practical Problem */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-2">
                      <h3 className="text-sm font-black text-[hsl(var(--foreground))]">
                        Section C: Long Practical Numerical Problems (50 Marks)
                      </h3>
                      <span className="text-xs text-[hsl(var(--muted-foreground))] font-semibold">Step Marking</span>
                    </div>

                    <div className="space-y-3">
                      {selectedPaper.sectionC.map((q, idx) => (
                        <div key={q.id} className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-[hsl(var(--foreground))]">
                              Q{idx + 1}. {q.question}
                            </p>
                            <Badge className="bg-amber-600 text-white text-[10px] font-bold">
                              {q.marks} Marks
                            </Badge>
                          </div>
                          <div className="p-3 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-xs text-[hsl(var(--foreground))] leading-relaxed space-y-2">
                            <p><strong>Solution:</strong> {q.modelAnswer}</p>
                            {q.journalEntries && (
                              <div className="p-2 rounded-lg bg-[hsl(var(--muted)/0.5)] font-mono text-[11px] space-y-1">
                                {q.journalEntries.map((je, jIdx) => (
                                  <div key={jIdx} className="flex justify-between">
                                    <span>{je.particulars}</span>
                                    <span className="font-bold">{je.debit || je.credit}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* TAB 3: DUAL-AI GENERATOR STUDIO */}
        <TabsContent value="generator" className="space-y-6">
          <div className="max-w-3xl mx-auto rounded-3xl glass-panel border border-[hsl(var(--border))] p-6 sm:p-8 space-y-6 shadow-md">
            <div className="space-y-1 border-b border-[hsl(var(--border))] pb-4">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-black text-[hsl(var(--foreground))]">
                  Autonomous Dual-AI Paper Synthesizer
                </h3>
              </div>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Generate tailored Model Question Papers (MQP), Previous Year Papers (PYQ), and sample practice papers instantly using Google Gemini 2.5 Flash and OpenAI GPT-4o.
              </p>
            </div>

            {genSuccessMessage && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {genSuccessMessage}
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-[hsl(var(--foreground))] uppercase tracking-wider text-[11px]">
                  Select Paper / Subject:
                </label>
                <select
                  value={generatePaperCode}
                  onChange={(e) => {
                    setGeneratePaperCode(e.target.value)
                    const subNames: Record<string, string> = {
                      "DSC-1": "Fundamental of Accounting",
                      "DSC-2": "Business Law",
                      "DSC-3": "Business Economics",
                      "DSC-13": "Income Tax Law & Practice",
                      "DSC-16": "Indirect Taxes with GST",
                      "CA-P1": "CA Foundation Accounting",
                      "CMA-P1": "CMA Cost Accounting"
                    }
                    setGenerateSubject(subNames[e.target.value] || "Fundamental of Accounting")
                  }}
                  className="w-full p-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] font-semibold"
                >
                  <option value="DSC-1">PRSU B.Com Sem 1: Fundamental of Accounting (DSC-1)</option>
                  <option value="DSC-2">PRSU B.Com Sem 1: Business Law (DSC-2)</option>
                  <option value="DSC-3">PRSU B.Com Sem 1: Business Economics (DSC-3)</option>
                  <option value="DSC-13">PRSU B.Com Sem 5: Income Tax Law & Practice (DSC-13)</option>
                  <option value="DSC-16">PRSU B.Com Sem 6: Indirect Taxes with GST (DSC-16)</option>
                  <option value="CA-P1">ICAI: CA Foundation Accounting (Paper 1)</option>
                  <option value="CMA-P1">ICMAI: CMA Intermediate Cost Accounting</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[hsl(var(--foreground))] uppercase tracking-wider text-[11px]">
                  Paper Format / Type:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["MQP", "PYQ", "SAMPLE"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setGenerateType(t)}
                      className={`p-3 rounded-xl border font-bold text-center cursor-pointer transition-all active:scale-95 ${
                        generateType === t
                          ? "bg-primary text-primary-foreground border-primary shadow-xs"
                          : "border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))]"
                      }`}
                    >
                      {t === "MQP" ? "Model Paper (MQP)" : t === "PYQ" ? "Past Year Paper (PYQ)" : "Sample Paper"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 text-xs text-[hsl(var(--muted-foreground))] space-y-1">
                <p className="font-bold text-primary flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" /> Dual-AI Autonomous Guarantees:
                </p>
                <p>&bull; 100% original objective MCQs with statutory explanations.</p>
                <p>&bull; Realistic numerical problems with journal entries and balanced working notes.</p>
                <p>&bull; Direct real-time alert sent to your Telegram Desk (@jarvis_Ai_AutomationBot).</p>
              </div>

              <Button
                onClick={handleGeneratePaper}
                disabled={generating}
                className="w-full h-11 text-xs font-bold rounded-xl btn-tactile cursor-pointer"
              >
                {generating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Synthesizing with Gemini 2.5 + GPT-4o...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate & Upload Examination Paper Now
                  </>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* TAB 4: CERTIFICATES */}
        <TabsContent value="certificates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="rounded-3xl border-2 border-amber-400 bg-gradient-to-br from-amber-500/10 via-background to-amber-500/5 shadow-xl p-6 text-center space-y-4"
              >
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck className="h-8 w-8 text-amber-500" />
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
                      OFFICIAL CERTIFICATE OF MASTERY
                    </p>
                    <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">{cert.institution}</p>
                  </div>
                </div>

                <div className="py-2 space-y-1">
                  <p className="text-xs italic text-[hsl(var(--muted-foreground))]">This is to certify that</p>
                  <h3 className="text-xl font-bold font-serif text-[hsl(var(--foreground))]">{cert.studentName}</h3>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">has demonstrated rigorous understanding in</p>
                  <h4 className="text-sm font-bold text-primary">{cert.courseName}</h4>
                </div>

                <div className="flex items-center justify-around py-2 border-t border-b border-amber-500/20 text-xs">
                  <div>
                    <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Score Achieved</p>
                    <p className="font-bold text-emerald-600">{cert.scorePercentage}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Mastery Level</p>
                    <p className="font-bold text-indigo-600">Level {cert.masteryLevel}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Date of Issue</p>
                    <p className="font-bold">{cert.completionDate}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.print()}
                    className="gap-2 text-xs font-bold rounded-xl"
                  >
                    <Printer className="h-3.5 w-3.5" /> Print / Save Certificate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
