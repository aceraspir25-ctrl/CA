"use client"

import { useState, useEffect } from "react"
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Flag,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Trophy,
  Award,
  Layers,
  Sparkles,
  ShieldCheck,
  BookOpen
} from "lucide-react"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

interface ExamQuestion {
  id: number
  question: string
  hindiQuestion?: string
  options: string[]
  correctIndex: number
  marks: number
  negativeMarks: number
  explanation: string
  category: "PYQ" | "RTP" | "MTP" | "CaseStudy"
  source: string
}

interface ExamPaper {
  id: string
  title: string
  course: string
  institution: string
  year: string
  durationMinutes: number
  totalMarks: number
  questions: ExamQuestion[]
}

const SAMPLE_EXAM_PAPERS: ExamPaper[] = [
  {
    id: "ca-f-mock-2026",
    title: "CA Foundation: Principles and Practice of Accounting (Simulated Full Test)",
    course: "CA Foundation",
    institution: "ICAI Pattern",
    year: "Nov 2025 / May 2026",
    durationMinutes: 15,
    totalMarks: 20,
    questions: [
      {
        id: 1,
        question: "When a cheque received from a customer is deposited into the bank on the same day, which account is debited in the Cash Book?",
        hindiQuestion: "जब ग्राहक से प्राप्त चेक उसी दिन बैंक में जमा किया जाता है, तो रोकड़ बही में कौन सा खाता नाम (Debit) किया जाता है?",
        options: ["Cash Account", "Bank Account", "Customer Account", "Suspense Account"],
        correctIndex: 1,
        marks: 4,
        negativeMarks: 1,
        explanation: "When a cheque is deposited on the same day it is received, Bank Account is immediately debited. If deposited on a later date, it is initially treated as Cheques in Hand.",
        category: "PYQ",
        source: "ICAI Past Exam May 2024 (Adapted)"
      },
      {
        id: 2,
        question: "Under Section 32 of the Income Tax Act 1961, depreciation on intangible assets (e.g. patents, copyrights) is allowed at what standard rate?",
        hindiQuestion: "आयकर अधिनियम 1961 की धारा 32 के अंतर्गत अमूर्त संपत्तियों (पेटेंट, कॉपीराइट आदि) पर किस दर से ह्रास मान्य है?",
        options: ["10%", "15%", "25%", "40%"],
        correctIndex: 2,
        marks: 4,
        negativeMarks: 1,
        explanation: "As per Income Tax Rules, the block of Intangible Assets attracts a flat depreciation rate of 25% on WDV.",
        category: "PYQ",
        source: "Income Tax Direct Tax Provisions"
      },
      {
        id: 3,
        question: "A company has a P/V Ratio of 40% and Margin of Safety is 25%. If total sales are ₹20,00,000, what is the net profit of the company?",
        hindiQuestion: "एक कंपनी का P/V अनुपात 40% और सुरक्षा सीमा (Margin of Safety) 25% है। यदि कुल बिक्री ₹20,00,000 है, तो शुद्ध लाभ क्या होगा?",
        options: ["₹1,50,000", "₹2,00,000", "₹2,50,000", "₹3,00,000"],
        correctIndex: 1,
        marks: 4,
        negativeMarks: 1,
        explanation: "Margin of Safety (MOS) Sales = 25% of ₹20,00,000 = ₹5,00,000. Profit = MOS Sales × P/V Ratio = ₹5,00,000 × 40% = ₹2,00,000.",
        category: "MTP",
        source: "ICMAI Costing Model Paper"
      },
      {
        id: 4,
        question: "Under Section 135 of the Companies Act 2013, which companies are required to constitute a Corporate Social Responsibility (CSR) Committee?",
        hindiQuestion: "कंपनी अधिनियम 2013 की धारा 135 के तहत किन कंपनियों को सीएसआर समिति गठित करना अनिवार्य है?",
        options: [
          "Net Worth ≥ ₹500 Cr, OR Turnover ≥ ₹1000 Cr, OR Net Profit ≥ ₹5 Cr",
          "Net Worth ≥ ₹100 Cr, OR Turnover ≥ ₹500 Cr, OR Net Profit ≥ ₹1 Cr",
          "Paid-up Capital ≥ ₹50 Cr, OR Turnover ≥ ₹250 Cr",
          "All listed public companies irrespective of turnover"
        ],
        correctIndex: 0,
        marks: 4,
        negativeMarks: 1,
        explanation: "Section 135(1) mandates CSR for any company having Net Worth ≥ ₹500 crore, OR Turnover ≥ ₹1,000 crore, OR Net Profit ≥ ₹5 crore during any financial year.",
        category: "RTP",
        source: "ICSI Corporate Law Examination"
      },
      {
        id: 5,
        question: "According to IFRS 15 / Ind AS 115, what is the core 5-step model's first step in revenue recognition?",
        hindiQuestion: "Ind AS 115 के 5-चरणीय मॉडल में राजस्व मान्यता का पहला चरण क्या है?",
        options: [
          "Determine the transaction price",
          "Identify performance obligations in the contract",
          "Identify the contract(s) with a customer",
          "Allocate transaction price to performance obligations"
        ],
        correctIndex: 2,
        marks: 4,
        negativeMarks: 1,
        explanation: "Step 1: Identify the contract(s) with a customer. Step 2: Identify performance obligations. Step 3: Determine transaction price. Step 4: Allocate price. Step 5: Recognize revenue when/as obligation is satisfied.",
        category: "CaseStudy",
        source: "ACCA SBR & CA Final Financial Reporting"
      }
    ]
  }
]

export default function ExamSimulatorPage() {
  const { studentName, recordWeakConcept, markTopicStudied } = useAppStore()

  const [activePaper, setActivePaper] = useState<ExamPaper>(SAMPLE_EXAM_PAPERS[0])
  const [examStarted, setExamStarted] = useState(false)
  const [examSubmitted, setExamSubmitted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [reviewFlags, setReviewFlags] = useState<Record<number, boolean>>({})
  const [secondsRemaining, setSecondsRemaining] = useState(activePaper.durationMinutes * 60)

  // Countdown timer
  useEffect(() => {
    if (!examStarted || examSubmitted) return
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [examStarted, examSubmitted])

  const handleStartExam = () => {
    setExamStarted(true)
    setExamSubmitted(false)
    setCurrentIndex(0)
    setSelectedAnswers({})
    setReviewFlags({})
    setSecondsRemaining(activePaper.durationMinutes * 60)
  }

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (examSubmitted) return
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleToggleReview = (questionId: number) => {
    setReviewFlags((prev) => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const handleSubmitExam = () => {
    setExamSubmitted(true)

    // Compute weak concepts automatically and save to AI Tutor memory
    activePaper.questions.forEach((q) => {
      const studentAns = selectedAnswers[q.id]
      if (studentAns !== undefined && studentAns !== q.correctIndex) {
        recordWeakConcept(
          `Exam Error: ${q.question.substring(0, 60)}...`,
          activePaper.course,
          `Answered Option ${studentAns + 1} instead of ${q.correctIndex + 1}. Source: ${q.source}. Explanation: ${q.explanation}`
        )
      }
    })

    markTopicStudied({
      id: `exam-${activePaper.id}`,
      title: activePaper.title,
      course: activePaper.course,
      levelAchieved: 55,
    })
  }

  // Calculate score with negative marking
  let totalScore = 0
  let correctCount = 0
  let wrongCount = 0
  let unattemptedCount = 0

  if (examSubmitted) {
    activePaper.questions.forEach((q) => {
      const ans = selectedAnswers[q.id]
      if (ans === undefined) {
        unattemptedCount++
      } else if (ans === q.correctIndex) {
        correctCount++
        totalScore += q.marks
      } else {
        wrongCount++
        totalScore -= q.negativeMarks
      }
    })
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  const currentQ = activePaper.questions[currentIndex]

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <ClipboardList className="h-6 w-6 text-blue-300" />
            </div>
            <h1 className="text-2xl font-bold">PYQ & Examination Simulator</h1>
            <Badge className="bg-blue-500 text-white">ICAI / ICMAI / ICSI / ACCA Pattern</Badge>
          </div>
          <p className="text-blue-200 text-sm max-w-2xl">
            Simulate realistic timed examinations with official negative marking (-0.25), question navigation palette, and automated error logging directly into your AI Memory Tutor.
          </p>
        </div>

        {/* Paper Info Pill */}
        <div className="flex items-center gap-2 shrink-0">
          <Badge variant="outline" className="text-white border-white/30 text-xs py-1.5 px-3">
            {activePaper.course} • {activePaper.year}
          </Badge>
        </div>
      </div>

      {!examStarted && (
        <Card className="border-[hsl(var(--border))] shadow-lg">
          <CardHeader className="text-center py-10 space-y-3">
            <div className="mx-auto p-4 rounded-full bg-blue-50 dark:bg-blue-950/40 w-fit text-blue-600">
              <Trophy className="h-10 w-10" />
            </div>
            <CardTitle className="text-2xl">{activePaper.title}</CardTitle>
            <CardDescription className="max-w-xl mx-auto text-sm">
              Standard Institute Examination format. Total Questions: {activePaper.questions.length} | Total Marks: {activePaper.totalMarks} | Time: {activePaper.durationMinutes} Minutes. Negative marking applicable.
            </CardDescription>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-[hsl(var(--muted-foreground))] pt-2">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-amber-500" /> {activePaper.durationMinutes} Mins</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> +4 for Correct</span>
              <span className="flex items-center gap-1"><AlertCircle className="h-4 w-4 text-rose-500" /> -1 for Incorrect</span>
            </div>
            <div className="pt-4">
              <Button size="lg" onClick={handleStartExam} className="gap-2 bg-blue-600 hover:bg-blue-700 px-8">
                Start Examination Now <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
        </Card>
      )}

      {examStarted && !examSubmitted && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left 3 Cols: Question Viewer */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="border-[hsl(var(--border))] shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-[hsl(var(--border))]">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600 text-white text-xs">
                    Question {currentIndex + 1} of {activePaper.questions.length}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {currentQ.category} • {currentQ.source}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleReview(currentQ.id)}
                    className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md transition-all ${
                      reviewFlags[currentQ.id]
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                        : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
                    }`}
                  >
                    <Flag className="h-3.5 w-3.5" />
                    {reviewFlags[currentQ.id] ? "Marked for Review" : "Mark for Review"}
                  </button>
                  <span className="text-xs font-bold text-emerald-600">+{currentQ.marks} / -{currentQ.negativeMarks}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <p className="text-base font-medium text-[hsl(var(--foreground))] leading-relaxed">
                    {currentQ.question}
                  </p>
                  {currentQ.hindiQuestion && (
                    <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed italic">
                      {currentQ.hindiQuestion}
                    </p>
                  )}
                </div>

                {/* Options List */}
                <div className="space-y-2.5">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = selectedAnswers[currentQ.id] === i
                    return (
                      <div
                        key={i}
                        onClick={() => handleSelectOption(currentQ.id, i)}
                        className={`p-3.5 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? "border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-950 dark:text-blue-200 ring-2 ring-blue-500/20 font-semibold"
                            : "border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/60 text-[hsl(var(--foreground))]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              isSelected
                                ? "bg-blue-600 text-white"
                                : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                            }`}
                          >
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Navigation Bar */}
                <div className="flex items-center justify-between pt-6 border-t border-[hsl(var(--border))]">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => prev - 1)}
                    className="gap-1 text-xs"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    {currentIndex < activePaper.questions.length - 1 ? (
                      <Button
                        size="sm"
                        onClick={() => setCurrentIndex((prev) => prev + 1)}
                        className="gap-1 text-xs bg-blue-600 hover:bg-blue-700"
                      >
                        Save & Next <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={handleSubmitExam}
                        className="gap-1 text-xs bg-emerald-600 hover:bg-emerald-700"
                      >
                        Submit Test <CheckCircle2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Col: Timer & Question Matrix Palette */}
          <div className="space-y-4">
            {/* Countdown Clock */}
            <Card className="border-[hsl(var(--border))] shadow-md">
              <CardContent className="p-4 text-center space-y-1">
                <span className="text-[11px] font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Time Remaining
                </span>
                <div
                  className={`text-3xl font-mono font-bold ${
                    secondsRemaining < 300 ? "text-rose-600 animate-pulse" : "text-blue-600"
                  }`}
                >
                  {formatTime(secondsRemaining)}
                </div>
              </CardContent>
            </Card>

            {/* Question Matrix */}
            <Card className="border-[hsl(var(--border))] shadow-md">
              <CardHeader className="p-4 pb-2 border-b border-[hsl(var(--border))]">
                <CardTitle className="text-xs font-bold uppercase tracking-wider">
                  Question Palette
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-5 gap-2">
                  {activePaper.questions.map((q, idx) => {
                    const isAnswered = selectedAnswers[q.id] !== undefined
                    const isFlagged = reviewFlags[q.id]
                    const isCurrent = currentIndex === idx

                    let btnClass = "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]"
                    if (isAnswered) btnClass = "bg-emerald-600 text-white font-bold"
                    if (isFlagged) btnClass = "bg-amber-500 text-white font-bold"

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-9 w-9 rounded-lg text-xs transition-all flex items-center justify-center ${btnClass} ${
                          isCurrent ? "ring-2 ring-blue-500 ring-offset-2" : ""
                        }`}
                      >
                        {idx + 1}
                      </button>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="space-y-1 text-[11px] text-[hsl(var(--muted-foreground))] pt-2 border-t border-[hsl(var(--border))]">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-emerald-600 inline-block" /> Answered
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-amber-500 inline-block" /> Marked for Review
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-[hsl(var(--muted))] inline-block" /> Not Visited
                  </div>
                </div>

                <Button
                  onClick={handleSubmitExam}
                  className="w-full text-xs bg-emerald-600 hover:bg-emerald-700"
                >
                  End & Submit Test
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Results View */}
      {examSubmitted && (
        <div className="space-y-6">
          <Card className="border-2 border-emerald-500 bg-gradient-to-br from-white to-emerald-50/30 dark:from-slate-900 dark:to-emerald-950/20 shadow-2xl">
            <CardHeader className="text-center py-8 space-y-2 border-b border-[hsl(var(--border))]">
              <Badge className="mx-auto bg-emerald-600 text-white text-xs">
                Examination Completed & Evaluated
              </Badge>
              <CardTitle className="text-3xl font-bold">
                Your Score: {totalScore} / {activePaper.totalMarks}
              </CardTitle>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Accuracy: {Math.round((correctCount / activePaper.questions.length) * 100)}% • Negative Marking applied (-{wrongCount * 1} marks)
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs font-semibold">
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> {correctCount} Correct (+{correctCount * 4})
                </span>
                <span className="text-rose-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" /> {wrongCount} Incorrect (-{wrongCount * 1})
                </span>
                <span className="text-[hsl(var(--muted-foreground))] flex items-center gap-1">
                  <HelpCircle className="h-4 w-4" /> {unattemptedCount} Unattempted
                </span>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    AI Memory Tutor Synced
                  </h4>
                  <p className="text-xs text-blue-800 dark:text-blue-300">
                    {wrongCount > 0
                      ? `${wrongCount} incorrect questions have been automatically stored in your AI Memory Bank for targeted revision.`
                      : "Flawless score! Your mastery level has been updated."}
                  </p>
                </div>
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs shrink-0">
                  <Link href="/ai-tutor">Review in AI Tutor</Link>
                </Button>
              </div>

              {/* Detailed Solutions Breakdown */}
              <div className="space-y-4">
                <h3 className="text-base font-bold">Comprehensive Answer Keys & Explanations:</h3>
                {activePaper.questions.map((q, idx) => {
                  const studentAns = selectedAnswers[q.id]
                  const isCorrect = studentAns === q.correctIndex

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border text-xs space-y-2 ${
                        isCorrect
                          ? "border-emerald-200 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20"
                          : "border-rose-200 bg-rose-50/40 dark:border-rose-900 dark:bg-rose-950/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">
                          Q{idx + 1}. {q.question}
                        </span>
                        <Badge variant={isCorrect ? "default" : "destructive"} className="text-[10px]">
                          {isCorrect ? "Correct (+4)" : "Wrong (-1)"}
                        </Badge>
                      </div>

                      <p className="text-[hsl(var(--muted-foreground))]">
                        Your Answer: <strong>{studentAns !== undefined ? q.options[studentAns] : "Not Attempted"}</strong>
                      </p>
                      <p className="text-emerald-700 dark:text-emerald-300 font-semibold">
                        Correct Answer: {q.options[q.correctIndex]}
                      </p>
                      <p className="text-[hsl(var(--foreground))] leading-relaxed pt-1 border-t border-[hsl(var(--border))]">
                        <strong>Explanation:</strong> {q.explanation}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-center gap-3 pt-4">
                <Button onClick={handleStartExam} variant="outline" className="text-xs gap-1">
                  <RotateCcw className="h-4 w-4" /> Retake Test
                </Button>
                <Button asChild className="text-xs gap-1 bg-blue-600 hover:bg-blue-700">
                  <Link href="/dashboard">Back to Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
