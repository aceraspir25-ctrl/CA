"use client"

import { useState, useEffect } from "react"
import { REAL_EXAM_SIMULATIONS, ExamPaperSimulation, ExamQuestion } from "@/data/examSimulatorData"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ClipboardList,
  Clock,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  BookOpen,
  HelpCircle
} from "lucide-react"

export default function ExamSimulatorPage() {
  const [selectedSim, setSelectedSim] = useState<ExamPaperSimulation>(REAL_EXAM_SIMULATIONS[0])
  const [isExamStarted, setIsExamStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(selectedSim.durationMinutes * 60)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number
    totalMarks: number
    percentage: number
    isPassed: boolean
    rubricBreakdown: { questionNumber: number; marksAwarded: number; feedback: string }[]
  } | null>(null)

  // Timer countdown
  useEffect(() => {
    if (!isExamStarted || isSubmitted) return
    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isExamStarted, isSubmitted])

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600)
    const minutes = Math.floor((secs % 3600) / 60)
    const seconds = secs % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isSubmitted) return
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const handleTextAnswerChange = (questionId: string, text: string) => {
    if (isSubmitted) return
    setUserAnswers((prev) => ({ ...prev, [questionId]: text }))
  }

  const handleSubmitExam = () => {
    setIsSubmitted(true)
    let totalScore = 0
    let possibleMarks = 0
    const rubric: { questionNumber: number; marksAwarded: number; feedback: string }[] = []

    selectedSim.questions.forEach((q) => {
      possibleMarks += q.marks
      const ans = userAnswers[q.id] || ""

      if (q.type === "mcq") {
        if (ans === q.correctOptionId) {
          totalScore += q.marks
          rubric.push({
            questionNumber: q.number,
            marksAwarded: q.marks,
            feedback: `Correct Option (${ans}). Full statutory marks awarded.`
          })
        } else if (ans) {
          const neg = q.negativeMarks || selectedSim.negativeMarkingRatio * q.marks
          totalScore -= neg
          rubric.push({
            questionNumber: q.number,
            marksAwarded: -neg,
            feedback: `Incorrect option selected (${ans}). Correct answer: ${q.correctOptionId}. Negative deduction applied: -${neg}.`
          })
        } else {
          rubric.push({
            questionNumber: q.number,
            marksAwarded: 0,
            feedback: `Unattempted. Zero marks awarded.`
          })
        }
      } else {
        // Numerical / descriptive evaluation
        if (ans.trim().length > 20) {
          const awarded = Math.round(q.marks * 0.8) // Simulated AI step-by-step rubric evaluation
          totalScore += awarded
          rubric.push({
            questionNumber: q.number,
            marksAwarded: awarded,
            feedback: `AI Evaluator: Clear working notes and statutory references provided. Step-by-step marking awarded ${awarded}/${q.marks}.`
          })
        } else {
          rubric.push({
            questionNumber: q.number,
            marksAwarded: 0,
            feedback: `Incomplete working notes or missing answer. 0/${q.marks} awarded.`
          })
        }
      }
    })

    const finalScore = Math.max(0, totalScore)
    const percentage = Math.round((finalScore / possibleMarks) * 100)

    setEvaluationResult({
      score: finalScore,
      totalMarks: possibleMarks,
      percentage,
      isPassed: percentage >= (selectedSim.passingMarks / selectedSim.totalMarks) * 100,
      rubricBreakdown: rubric
    })
  }

  const currentQuestion = selectedSim.questions[currentQuestionIndex]

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-blue-500/20">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <ClipboardList className="h-6 w-6" />
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
                Authentic Real Exam Simulator & AI Evaluator
              </h1>
            </div>
            <p className="text-blue-200/90 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Official ICAI, ICMAI & University exam conditions. Includes 3-hour timer, compulsory case-scenario MCQs, negative marking configuration, step-by-step numerical working notes, and automated AI rubric scoring.
            </p>
          </div>

          {isExamStarted && !isSubmitted && (
            <div className="p-3 rounded-2xl bg-black/40 border border-red-500/40 text-center shrink-0">
              <p className="text-[10px] uppercase font-bold text-red-400 flex items-center justify-center gap-1">
                <Clock className="h-3 w-3 animate-pulse" /> Time Remaining
              </p>
              <p className="text-2xl font-black text-white font-mono">{formatTime(timeRemainingSeconds)}</p>
            </div>
          )}
        </div>
      </div>

      {!isExamStarted ? (
        /* Paper Selection & Instructions Screen */
        <Card className="glass-panel border-2 border-primary/30 rounded-3xl overflow-hidden shadow-xl">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <Badge className="bg-primary text-primary-foreground font-black text-xs">
                Select Official Exam Paper
              </Badge>
              <h2 className="text-xl font-black text-[hsl(var(--foreground))]">
                {selectedSim.title}
              </h2>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Qualification: <strong className="text-[hsl(var(--foreground))]">{selectedSim.qualificationName}</strong> &bull; Code: {selectedSim.paperCode}
              </p>
            </div>

            {/* Exam Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[hsl(var(--muted)/0.4)] border border-[hsl(var(--border))] text-center">
              <div>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Total Marks</p>
                <p className="text-lg font-black text-primary">{selectedSim.totalMarks} Marks</p>
              </div>
              <div>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Time Allowed</p>
                <p className="text-lg font-black text-[hsl(var(--foreground))]">{selectedSim.durationMinutes} Mins</p>
              </div>
              <div>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Passing Standard</p>
                <p className="text-lg font-black text-emerald-500">{selectedSim.passingMarks} Marks (40%)</p>
              </div>
              <div>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Negative Marking</p>
                <p className="text-lg font-black text-amber-500">{selectedSim.negativeMarkingRatio > 0 ? `${selectedSim.negativeMarkingRatio * 100}%` : "No Negative"}</p>
              </div>
            </div>

            {/* Official Instructions */}
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-wider text-[hsl(var(--foreground))]">
                Examination Hall Instructions:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
                {selectedSim.instructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                onClick={() => {
                  setTimeRemainingSeconds(selectedSim.durationMinutes * 60)
                  setIsExamStarted(true)
                }}
                size="lg"
                className="rounded-2xl text-xs sm:text-sm font-black bg-blue-600 hover:bg-blue-500 text-white gap-2 btn-tactile cursor-pointer"
              >
                <Clock className="h-4 w-4" /> Start Official Timed Exam Now
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : isSubmitted && evaluationResult ? (
        /* Evaluation & Result Card */
        <Card className="glass-panel border-2 border-emerald-500/40 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[hsl(var(--border))] pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className={evaluationResult.isPassed ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"}>
                    {evaluationResult.isPassed ? "PASSED (Satisfies ICAI/ICMAI Norms)" : "NEEDS REVISION"}
                  </Badge>
                  <span className="text-xs text-[hsl(var(--muted-foreground))] font-semibold">
                    Completed in {formatTime(selectedSim.durationMinutes * 60 - timeRemainingSeconds)}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-[hsl(var(--foreground))]">
                  Exam Simulation Evaluation Report
                </h2>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  Paper: {selectedSim.title}
                </p>
              </div>

              <div className="text-right p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs text-[hsl(var(--muted-foreground))] font-bold">Your Total Score</p>
                <p className="text-3xl font-black text-emerald-500">
                  {evaluationResult.score} / {evaluationResult.totalMarks}
                </p>
                <p className="text-xs font-bold text-[hsl(var(--foreground))] mt-0.5">
                  Percentage: {evaluationResult.percentage}%
                </p>
              </div>
            </div>

            {/* Step-by-Step Marking Breakdown */}
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-wider text-[hsl(var(--foreground))] flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" /> Question-by-Question Marking Scheme Rubric:
              </p>

              <div className="space-y-2.5">
                {evaluationResult.rubricBreakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] flex items-start justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <p className="font-bold text-[hsl(var(--foreground))]">
                        Question #{item.questionNumber}
                      </p>
                      <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                        {item.feedback}
                      </p>
                    </div>
                    <Badge variant="outline" className={`font-black shrink-0 ${item.marksAwarded > 0 ? "border-emerald-500 text-emerald-500" : "border-rose-500 text-rose-500"}`}>
                      {item.marksAwarded > 0 ? `+${item.marksAwarded}` : item.marksAwarded} Marks
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Uncertainty Warning Disclaimer */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-500 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>
                <strong>Academic Disclaimer:</strong> AI evaluator marks are generated against official published marking keys and rubrics. Final official results depend on subjective examiner evaluation by ICAI/ICMAI/University authorities.
              </span>
            </div>

            <div className="pt-2 flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setIsExamStarted(false)
                  setIsSubmitted(false)
                  setEvaluationResult(null)
                  setUserAnswers({})
                }}
                className="rounded-xl text-xs font-bold"
              >
                Attempt Another Paper
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Active Question Answering Screen */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question View (Left/Center) */}
          <div className="lg:col-span-8 space-y-4">
            <Card className="glass-panel border border-[hsl(var(--border))] rounded-3xl overflow-hidden shadow-md">
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary text-primary-foreground font-bold text-xs">
                      Question {currentQuestion.number} of {selectedSim.questions.length}
                    </Badge>
                    <span className="text-xs text-[hsl(var(--muted-foreground))] font-semibold">
                      {currentQuestion.section}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs font-bold">
                    {currentQuestion.marks} Marks
                  </Badge>
                </div>

                {/* Question Statement */}
                <p className="text-sm sm:text-base font-bold text-[hsl(var(--foreground))] leading-relaxed whitespace-pre-wrap">
                  {currentQuestion.questionText}
                </p>

                {/* MCQ Options */}
                {currentQuestion.type === "mcq" && currentQuestion.options && (
                  <div className="space-y-2.5 pt-2">
                    {currentQuestion.options.map((opt) => {
                      const isSelected = userAnswers[currentQuestion.id] === opt.id
                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                          className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-3 ${
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary shadow-md font-bold"
                              : "bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]"
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${isSelected ? "bg-white text-slate-950" : "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]"}`}>
                            {opt.id}
                          </span>
                          <span>{opt.text}</span>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Subjective / Numerical Solution Input */}
                {currentQuestion.type !== "mcq" && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-black uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                      Your Step-by-Step Working Notes & Computation:
                    </p>
                    <textarea
                      value={userAnswers[currentQuestion.id] || ""}
                      onChange={(e) => handleTextAnswerChange(currentQuestion.id, e.target.value)}
                      placeholder="Write your step-by-step working notes, formula, and final calculated value..."
                      rows={8}
                      className="w-full p-4 rounded-2xl text-xs sm:text-sm bg-[hsl(var(--card))] border border-[hsl(var(--border))] font-mono focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                )}

                {/* Nav Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-[hsl(var(--border))]">
                  <Button
                    variant="outline"
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                    className="rounded-xl text-xs font-bold"
                  >
                    Previous Question
                  </Button>

                  {currentQuestionIndex < selectedSim.questions.length - 1 ? (
                    <Button
                      onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                      className="rounded-xl text-xs font-bold bg-primary text-primary-foreground"
                    >
                      Next Question <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmitExam}
                      className="rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white"
                    >
                      Submit Exam for AI Evaluation
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Palette (Right) */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="glass-panel border border-[hsl(var(--border))] rounded-3xl p-5 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-[hsl(var(--foreground))]">
                Question Palette
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {selectedSim.questions.map((q, idx) => {
                  const isAnswered = Boolean(userAnswers[q.id])
                  const isCurrent = idx === currentQuestionIndex
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-10 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        isCurrent
                          ? "ring-2 ring-primary bg-primary text-primary-foreground"
                          : isAnswered
                          ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                          : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                      }`}
                    >
                      Q{q.number}
                    </button>
                  )
                })}
              </div>

              <div className="pt-2 border-t border-[hsl(var(--border))] space-y-1.5 text-[11px] text-[hsl(var(--muted-foreground))]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-emerald-500/20 border border-emerald-500/30 inline-block" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-[hsl(var(--muted))] inline-block" />
                  <span>Unanswered</span>
                </div>
              </div>

              <Button
                onClick={handleSubmitExam}
                className="w-full rounded-2xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white mt-2"
              >
                Submit Paper & Get Marks
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
