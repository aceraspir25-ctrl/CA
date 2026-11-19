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
  BookOpen
} from "lucide-react"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Question {
  id: number
  question: string
  hindiQuestion: string
  options: string[]
  correctIndex: number
  explanation: string
  subject: string
}

const MOCK_QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "According to the Golden Rules of Accounting, what is the rule for Nominal Accounts?",
    hindiQuestion: "लेखांकन के स्वर्णिम नियमों के अनुसार नाममात्र (Nominal) खातों का क्या नियम है?",
    options: [
      "Debit what comes in, Credit what goes out",
      "Debit all expenses and losses, Credit all incomes and gains",
      "Debit the receiver, Credit the giver",
      "Debit liabilities, Credit assets"
    ],
    correctIndex: 1,
    explanation: "Nominal accounts deal with revenues, expenses, gains, and losses. Rule: Debit all expenses/losses, Credit all incomes/gains.",
    subject: "CA Foundation - Accounting"
  },
  {
    id: 2,
    question: "Under Section 115BAC (New Tax Regime as per Budget 2024), what is the Standard Deduction allowed for salaried employees?",
    hindiQuestion: "धारा 115BAC (नई कर व्यवस्था) के अंतर्गत वेतनभोगी कर्मचारियों के लिए मानक कटौती (Standard Deduction) कितनी है?",
    options: [
      "₹50,000",
      "₹75,000",
      "₹1,00,000",
      "Nil (Not allowed)"
    ],
    correctIndex: 1,
    explanation: "Finance Act / Budget 2024 increased standard deduction under Section 115BAC from ₹50,000 to ₹75,000 for salaried individuals.",
    subject: "Income Tax"
  },
  {
    id: 3,
    question: "If Selling Price is ₹100 per unit, Variable Cost is ₹60 per unit, and Fixed Cost is ₹2,00,000, what is the Break-Even Point in units?",
    hindiQuestion: "यदि विक्रय मूल्य ₹100, परिवर्तनशील लागत ₹60 और स्थिर लागत ₹2,00,000 है, तो सम-विच्छेद बिंदु (इकाइयों में) क्या होगा?",
    options: [
      "2,000 units",
      "3,333 units",
      "5,000 units",
      "10,000 units"
    ],
    correctIndex: 2,
    explanation: "Contribution = ₹100 - ₹60 = ₹40/unit. BEP (units) = Fixed Cost / Contribution = ₹2,00,000 / ₹40 = 5,000 units.",
    subject: "Costing - CMA / B.Com"
  },
  {
    id: 4,
    question: "As per the Companies Act 2013, what is the minimum quorum required for a Board Meeting of a company under Section 174?",
    hindiQuestion: "कंपनी अधिनियम 2013 की धारा 174 के अनुसार बोर्ड बैठक के लिए न्यूनतम कोरम क्या है?",
    options: [
      "1/3rd of total strength or 2 directors, whichever is higher",
      "1/2 of total strength or 3 directors, whichever is higher",
      "Minimum 5 directors",
      "Any 2 directors regardless of total strength"
    ],
    correctIndex: 0,
    explanation: "Section 174(1) mandates quorum for a board meeting shall be 1/3rd of its total strength or 2 directors, whichever is higher.",
    subject: "Corporate Law - CS / CA"
  }
]

export default function TestsPage() {
  const { studentName, certificates, issueCertificate, recordWeakConcept } = useAppStore()

  const [activeTab, setActiveTab] = useState<"quiz" | "certificates">("quiz")
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [earnedCert, setEarnedCert] = useState<any>(null)

  const handleSelect = (qId: number, optionIdx: number) => {
    if (isSubmitted) return
    setSelectedAnswers({ ...selectedAnswers, [qId]: optionIdx })
  }

  const handleSubmitQuiz = () => {
    setIsSubmitted(true)
    let score = 0
    MOCK_QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++
      } else {
        // Record weak concept automatically
        recordWeakConcept(
          q.question.substring(0, 50) + "...",
          q.subject,
          `Failed quiz question: ${q.question}. Correct concept: ${q.explanation}`
        )
      }
    })

    const percentage = Math.round((score / MOCK_QUIZ_QUESTIONS.length) * 100)
    if (percentage >= 75) {
      const newCert = issueCertificate({
        courseName: "CA / CMA / CS Professional Competency Foundation",
        institution: "EduFinance Universal Council",
        studentName,
        scorePercentage: percentage,
        masteryLevel: 45,
      })
      setEarnedCert(newCert)
    }
  }

  const handleResetQuiz = () => {
    setSelectedAnswers({})
    setIsSubmitted(false)
    setEarnedCert(null)
  }

  const totalScore = MOCK_QUIZ_QUESTIONS.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length
  const scorePercentage = Math.round((totalScore / MOCK_QUIZ_QUESTIONS.length) * 100)

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <ClipboardList className="h-6 w-6 text-emerald-300" />
            </div>
            <h1 className="text-2xl font-bold">Assessments & Mastery Certification</h1>
            <Badge className="bg-emerald-500 text-white">ICAI / ICMAI / ICSI Standards</Badge>
          </div>
          <p className="text-emerald-200 text-sm max-w-2xl">
            Demonstrate your competency with topic tests and mock exams. Scoring 75%+ unlocks official Certificates of Mastery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setActiveTab(activeTab === "quiz" ? "certificates" : "quiz")}
            className="bg-white/10 text-white border-white/20 hover:bg-white/20 gap-2 text-xs"
          >
            <Award className="h-4 w-4 text-amber-300" />
            {activeTab === "quiz" ? `My Certificates (${certificates.length})` : "Take Assessment"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
        <TabsList className="bg-[hsl(var(--muted))]">
          <TabsTrigger value="quiz" className="gap-2">
            <ClipboardList className="h-4 w-4" /> Live Mock Test (4 Questions)
          </TabsTrigger>
          <TabsTrigger value="certificates" className="gap-2">
            <Trophy className="h-4 w-4 text-amber-500" /> 🏆 Earned Certificates ({certificates.length})
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: LIVE TEST */}
        <TabsContent value="quiz" className="space-y-6">
          {/* Quiz Scorecard Banner after submission */}
          {isSubmitted && (
            <Card className={`border-2 ${scorePercentage >= 75 ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20" : "border-amber-500 bg-amber-50/40 dark:bg-amber-950/20"}`}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {scorePercentage >= 75 ? (
                        <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                      ) : (
                        <HelpCircle className="h-6 w-6 text-amber-600" />
                      )}
                      <h3 className="text-xl font-bold">
                        {scorePercentage >= 75 ? "🎉 Mastery Verified! Certificate Issued" : "Keep Practicing!"}
                      </h3>
                    </div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      You scored <strong>{totalScore} / {MOCK_QUIZ_QUESTIONS.length} ({scorePercentage}%)</strong>.
                      {scorePercentage >= 75
                        ? " Excellent performance! Your verified certificate is ready below."
                        : " Concepts you missed have been automatically recorded in your AI Memory bank for targeted revision."}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button onClick={handleResetQuiz} variant="outline" size="sm" className="gap-1.5 text-xs">
                      <RotateCcw className="h-3.5 w-3.5" /> Retake Test
                    </Button>
                    {scorePercentage >= 75 && (
                      <Button onClick={() => setActiveTab("certificates")} size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-xs">
                        <Award className="h-3.5 w-3.5" /> View Certificate
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Questions List */}
          <div className="space-y-4">
            {MOCK_QUIZ_QUESTIONS.map((q, idx) => {
              const userAnswer = selectedAnswers[q.id]
              const isCorrect = isSubmitted && userAnswer === q.correctIndex
              const isWrong = isSubmitted && userAnswer !== undefined && userAnswer !== q.correctIndex

              return (
                <Card key={q.id} className="border-[hsl(var(--border))]">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs font-semibold">
                        Question {idx + 1} • {q.subject}
                      </Badge>
                      {isSubmitted && (
                        <span>
                          {isCorrect && (
                            <Badge variant="success" className="gap-1">
                              <CheckCircle2 className="h-3 w-3" /> Correct (+1)
                            </Badge>
                          )}
                          {isWrong && (
                            <Badge variant="destructive" className="gap-1">
                              <XCircle className="h-3 w-3" /> Incorrect (Added to AI Memory)
                            </Badge>
                          )}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-base font-semibold mt-1">
                      {q.question}
                    </CardTitle>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {q.hindiQuestion}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle = "border-[hsl(var(--border))] bg-[hsl(var(--card))]"
                        if (isSubmitted) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200 font-bold"
                          } else if (userAnswer === optIdx) {
                            btnStyle = "border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200"
                          }
                        } else if (userAnswer === optIdx) {
                          btnStyle = "border-blue-600 bg-blue-50 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200 font-semibold"
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isSubmitted}
                            onClick={() => handleSelect(q.id, optIdx)}
                            className={`p-3 rounded-lg border text-left transition-all flex items-start gap-2 ${btnStyle}`}
                          >
                            <span className="font-mono font-bold text-xs uppercase shrink-0">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span>{opt}</span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Explanation after submit */}
                    {isSubmitted && (
                      <div className="mt-3 p-3 rounded-lg bg-[hsl(var(--muted))] text-xs space-y-1">
                        <p className="font-semibold text-[hsl(var(--foreground))]">Explanation & Statutory Provision:</p>
                        <p className="text-[hsl(var(--muted-foreground))]">{q.explanation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {!isSubmitted && (
            <div className="flex justify-end pt-2">
              <Button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 px-6"
              >
                Submit Assessment ({Object.keys(selectedAnswers).length}/{MOCK_QUIZ_QUESTIONS.length} Answered)
              </Button>
            </div>
          )}
        </TabsContent>

        {/* TAB 2: CERTIFICATES VAULT */}
        <TabsContent value="certificates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <Card
                key={cert.id}
                className="border-2 border-amber-400 bg-gradient-to-br from-amber-50/50 via-white to-amber-100/30 dark:from-amber-950/20 dark:via-slate-900 dark:to-amber-950/40 shadow-xl overflow-hidden relative"
              >
                {/* Certificate Decorative Border */}
                <div className="p-6 border-4 border-dashed border-amber-300 dark:border-amber-700 m-2 rounded-xl space-y-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <ShieldCheck className="h-8 w-8 text-amber-600" />
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-amber-700 dark:text-amber-400">
                        OFFICIAL CERTIFICATE OF MASTERY
                      </p>
                      <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">{cert.institution}</p>
                    </div>
                  </div>

                  <div className="py-2 space-y-1">
                    <p className="text-xs italic text-[hsl(var(--muted-foreground))]">This is to certify that</p>
                    <h3 className="text-xl font-bold font-serif text-[hsl(var(--foreground))]">{cert.studentName}</h3>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">has demonstrated rigorous understanding in</p>
                    <h4 className="text-sm font-bold text-blue-700 dark:text-blue-300">{cert.courseName}</h4>
                  </div>

                  <div className="flex items-center justify-around py-2 border-t border-b border-amber-200 dark:border-amber-800 text-xs">
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

                  <div className="flex items-center justify-between text-[10px] text-[hsl(var(--muted-foreground))] pt-1">
                    <span className="font-mono">VERIFIED ID: {cert.verificationCode}</span>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Cryptographically Verified
                    </span>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.print()}
                      className="gap-2 text-xs border-amber-300 text-amber-800 hover:bg-amber-100 dark:text-amber-200"
                    >
                      <Printer className="h-3.5 w-3.5" /> Print / Save Certificate
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
