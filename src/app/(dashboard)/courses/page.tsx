"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { INSTITUTIONS_DATA, Institution, CourseLevel, SubjectPaper, Chapter } from "@/data/coursesData"
import { getChapterLessonData } from "@/data/chapterContentData"
import { useAppStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import KnowledgeGraph from "@/components/graph/KnowledgeGraph"
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Layers,
  Compass,
  ChevronRight,
  ExternalLink,
  BookMarked,
  Languages,
  AlertTriangle,
  Lightbulb,
  FileSpreadsheet
} from "lucide-react"
import Link from "next/link"

function CoursesContent() {
  const searchParams = useSearchParams()
  const { markTopicStudied, activeLanguage, setLanguage, studentLevel } = useAppStore()

  const instParam = searchParams.get("inst")
  const levelParam = searchParams.get("level")

  const [selectedInstId, setSelectedInstId] = useState<string>(instParam || "icai")
  const [selectedLevelId, setSelectedLevelId] = useState<string>(levelParam || "ca-foundation")
  const [activeTab, setActiveTab] = useState<"curriculum" | "learning-path" | "graph">("curriculum")
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)
  const [lessonLang, setLessonLang] = useState<"en" | "hi" | "hinglish">("en")

  useEffect(() => {
    if (instParam) setSelectedInstId(instParam)
    if (levelParam) setSelectedLevelId(levelParam)
  }, [instParam, levelParam])

  const activeInstitution = INSTITUTIONS_DATA.find((i) => i.id === selectedInstId) || INSTITUTIONS_DATA[0]
  const activeLevel = activeInstitution.levels.find((l) => l.id === selectedLevelId) || activeInstitution.levels[0]

  const papersList: SubjectPaper[] = activeLevel.papers
    ? activeLevel.papers
    : activeLevel.groups
    ? activeLevel.groups.flatMap((g) => g.papers)
    : []

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <GraduationCap className="h-6 w-6 text-blue-300" />
            </div>
            <h1 className="text-2xl font-bold">Curriculum & Smart Learning Path</h1>
            <Badge className="bg-blue-500 text-white">Level 0–100 Progression</Badge>
          </div>
          <p className="text-blue-200 text-sm max-w-2xl">
            Official curriculum of ICAI, ICMAI, ICSI and PRSU Raipur B.Com. Master foundational concepts up to senior professional competence.
          </p>
        </div>

        {/* Institution Switcher Pills */}
        <div className="flex flex-wrap gap-2">
          {INSTITUTIONS_DATA.map((inst) => (
            <button
              key={inst.id}
              onClick={() => {
                setSelectedInstId(inst.id)
                setSelectedLevelId(inst.levels[0].id)
                setSelectedChapter(null)
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                selectedInstId === inst.id
                  ? "bg-white text-slate-900 border-white shadow-md font-bold"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }`}
            >
              {inst.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Level Selection Sub-Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[hsl(var(--border))]">
        <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider shrink-0 mr-2">
          Select Stage:
        </span>
        {activeInstitution.levels.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => {
              setSelectedLevelId(lvl.id)
              setSelectedChapter(null)
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all ${
              selectedLevelId === lvl.id
                ? "bg-blue-600 text-white shadow-sm font-semibold"
                : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            }`}
          >
            {lvl.shortTitle}
          </button>
        ))}
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
        <TabsList className="bg-[hsl(var(--muted))]">
          <TabsTrigger value="curriculum" className="gap-2">
            <BookOpen className="h-4 w-4" /> Official Syllabus & Papers ({papersList.length} Papers)
          </TabsTrigger>
          <TabsTrigger value="learning-path" className="gap-2">
            <Compass className="h-4 w-4 text-emerald-500" /> Smart Learning Path (Lvl 0 to 100)
          </TabsTrigger>
          <TabsTrigger value="graph" className="gap-2">
            <Layers className="h-4 w-4 text-indigo-500" /> Knowledge Graph
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: CURRICULUM BROWSER */}
        <TabsContent value="curriculum" className="space-y-6">
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-200">
                {activeInstitution.name} — {activeLevel.title}
              </p>
              <p className="text-blue-700 dark:text-blue-300">
                Scheme: {activeLevel.scheme} • Eligibility: {activeLevel.eligibility}
              </p>
            </div>
            <a
              href={activeInstitution.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline shrink-0"
            >
              Verify on Official Portal <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {papersList.map((paper) => (
              <Card key={paper.id} className="border-[hsl(var(--border))]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs font-semibold">
                      Paper {paper.paperNumber}
                    </Badge>
                    <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">
                      {paper.marks} Marks
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-1">{paper.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">
                    {paper.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">
                    Chapters ({paper.chapters.length}):
                  </p>
                  <div className="space-y-2">
                    {paper.chapters.map((ch) => {
                      return (
                        <div
                          key={ch.id}
                          onClick={() => setSelectedChapter(ch)}
                          className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            selectedChapter?.id === ch.id
                              ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/20"
                              : "border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/50"
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-blue-600">Ch {ch.number}.</span>
                              <h4 className="text-xs font-semibold">{ch.title}</h4>
                            </div>
                            <p className="text-[11px] text-[hsl(var(--muted-foreground))]">
                              {ch.hindiTitle} • {ch.estimatedHours} Hours
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <Badge variant="secondary" className="text-[10px]">
                              Lvl {ch.levels.min}–{ch.levels.max}
                            </Badge>
                            <ChevronRight className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chapter 23-Point Standardized Lesson Viewer */}
          {selectedChapter && (() => {
            const lesson = getChapterLessonData(selectedChapter.id, selectedChapter.title, selectedChapter.hindiTitle)

            return (
              <Card className="border-2 border-blue-500 bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-900 dark:to-blue-950/20 shadow-2xl">
                <CardHeader className="border-b border-[hsl(var(--border))] pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="success">Chapter {selectedChapter.number} Standardized Lesson</Badge>
                      <Badge variant="outline">23-Point Instructional Engine</Badge>
                    </div>
                    {/* Language Switcher */}
                    <div className="flex items-center gap-1.5 bg-[hsl(var(--muted))] p-1 rounded-lg">
                      <Languages className="h-3.5 w-3.5 text-indigo-500 ml-1" />
                      {(["en", "hi", "hinglish"] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLessonLang(lang)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                            lessonLang === lang
                              ? "bg-blue-600 text-white shadow-xs"
                              : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                          }`}
                        >
                          {lang === "en" ? "English" : lang === "hi" ? "हिन्दी" : "Hinglish"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <CardTitle className="text-2xl mt-2">{selectedChapter.title}</CardTitle>
                  <p className="text-sm font-medium text-blue-600">{selectedChapter.hindiTitle}</p>
                  <CardDescription className="text-xs">{lesson.overview}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                  {/* 23-Point Teaching Sections Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 1. ELI10 & Intuitive Understanding */}
                    <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                        Point 4: Explain Like I&apos;m 10 (ELI10 Intuition)
                      </h4>
                      <p className="text-xs text-[hsl(var(--foreground))] leading-relaxed">
                        {lesson.eli10[lessonLang]}
                      </p>
                    </div>

                    {/* 2. Professional & Statutory Context */}
                    <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                        <GraduationCap className="h-4 w-4 text-blue-600" />
                        Point 7 & 17: Statutory Rules & Applicable Standards
                      </h4>
                      <p className="text-xs text-[hsl(var(--foreground))] leading-relaxed">
                        <strong>Standards:</strong> {lesson.statutoryContext.standards}<br />
                        <strong>Legal Sections:</strong> {lesson.statutoryContext.sections}<br />
                        <strong>Compliance:</strong> {lesson.statutoryContext.provisions}
                      </p>
                    </div>

                    {/* 3. Formulas & Step-by-Step Calculations */}
                    <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                        <FileSpreadsheet className="h-4 w-4 text-amber-600" />
                        Point 13 & 14: Practical Numerical & Journal Illustration
                      </h4>
                      <p className="text-xs text-[hsl(var(--foreground))] font-semibold">
                        {lesson.practicalIllustration.problemStatement}
                      </p>
                      <div className="text-[11px] text-[hsl(var(--foreground))] space-y-0.5">
                        {lesson.practicalIllustration.solutionSteps.map((step, idx) => (
                          <p key={idx}>{step}</p>
                        ))}
                      </div>
                      {lesson.practicalIllustration.journalEntries && (
                        <div className="mt-2 p-2 rounded bg-white dark:bg-slate-900 border border-amber-200 font-mono text-[11px] space-y-1">
                          {lesson.practicalIllustration.journalEntries.map((je, i) => (
                            <div key={i} className="flex justify-between">
                              <span className="truncate">{je.particulars}</span>
                              <span className="font-bold shrink-0">{je.debit || je.credit}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 4. Common Mistakes to Avoid */}
                    <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                        <AlertTriangle className="h-4 w-4 text-rose-600" />
                        Point 18: Common Exam Traps & Mistakes
                      </h4>
                      <ul className="text-xs text-[hsl(var(--foreground))] list-disc list-inside space-y-1 leading-relaxed">
                        {lesson.commonMistakes.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                      <div className="mt-2 pt-2 border-t border-rose-200 dark:border-rose-800 text-[11px] text-rose-700 dark:text-rose-300">
                        <strong>💡 Memory Shortcut:</strong> {lesson.memoryTrick}
                      </div>
                    </div>
                  </div>

                  {/* Practice Questions Check */}
                  <div className="p-4 rounded-xl bg-[hsl(var(--muted))]/50 border border-[hsl(var(--border))] space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--foreground))] flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Point 23: Quick Self-Assessment Check
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {lesson.practiceQuestions.map((pq, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-[hsl(var(--border))] space-y-1">
                          <p className="font-bold text-[hsl(var(--foreground))]">Q: {pq.q}</p>
                          <p className="text-[hsl(var(--muted-foreground))]">A: {pq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[hsl(var(--border))]">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => {
                          markTopicStudied({
                            id: selectedChapter.id,
                            title: selectedChapter.title,
                            course: activeLevel.shortTitle,
                            levelAchieved: selectedChapter.levels.max,
                          })
                        }}
                        className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-xs"
                      >
                        <CheckCircle2 className="h-4 w-4" /> Mark Completed & Level Up
                      </Button>
                      <Button asChild className="gap-2 bg-blue-600 hover:bg-blue-700 text-xs">
                        <Link href={`/ai-tutor?prompt=${encodeURIComponent(`Explain ${selectedChapter.title} in simple terms with practical numerical illustrations and exam tips.`)}`}>
                          <Sparkles className="h-4 w-4" /> Ask AI Tutor on this Chapter
                        </Link>
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button asChild variant="outline" size="sm" className="gap-1.5 text-xs">
                        <Link href="/lab">
                          <Layers className="h-3.5 w-3.5" /> Practice in Lab
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="gap-1.5 text-xs">
                        <Link href="/tests">
                          <BookMarked className="h-3.5 w-3.5" /> Take Quiz
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })()}
        </TabsContent>

        {/* TAB 2: SMART LEARNING PATH LEVEL 0 TO 100 */}
        <TabsContent value="learning-path" className="space-y-6">
          <Card className="border-[hsl(var(--border))]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Compass className="h-5 w-5 text-emerald-500" />
                    Level 0 to Level 100 Universal Progression Path
                  </CardTitle>
                  <CardDescription>
                    All 100 levels and courses are 100% unlocked for open exploration and self-paced mastery. (सभी लेवल्स और कोर्सेज पूरी तरह खुले हैं)
                  </CardDescription>
                </div>
                <Badge variant="success" className="text-sm">
                  100% Unlocked (Open Access)
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { range: "Level 0–10", title: "Absolute Beginner (शुरुआती समझ)", desc: "What is Commerce? Why do we study it? Everyday examples, basic terms, child-level intuition.", color: "text-blue-500", bg: "border-blue-300 dark:border-blue-800" },
                { range: "Level 11–20", title: "Basic Understanding (मूलभूत अवधारणाएं)", desc: "Double-entry rules, accounting cycle, terminology, basic principles.", color: "text-cyan-500", bg: "border-cyan-300 dark:border-cyan-800" },
                { range: "Level 21–30", title: "Beginner Practical (व्यावहारिक आरंभ)", desc: "Simple journal entries, ledger balancing, Bank Reconciliation Statements, basic numericals.", color: "text-emerald-500", bg: "border-emerald-300 dark:border-emerald-800" },
                { range: "Level 31–40", title: "Intermediate (मध्यम स्तर)", desc: "Depreciation SLM/WDV, Final Accounts adjustments, partnership fundamentals, residential status.", color: "text-amber-500", bg: "border-amber-300 dark:border-amber-800" },
                { range: "Level 41–50", title: "Advanced (उच्च स्तर)", desc: "Company Accounts (Shares/Debentures), Schedule III financial statements, PGBP taxation, Marginal Costing.", color: "text-orange-500", bg: "border-orange-300 dark:border-orange-800" },
                { range: "Level 51–60", title: "Professional Application (व्यावसायिक स्तर)", desc: "CA/CMA/CS exam-level case problems, GST ITC mechanics, Capital Budgeting (NPV/IRR), CARO 2020.", color: "text-purple-500", bg: "border-purple-300 dark:border-purple-800" },
                { range: "Level 61–70", title: "Expert Level (विशेषज्ञ स्तर)", desc: "Corporate Restructuring, Transfer Pricing, WACC & CAPM, Forensic audit procedures.", color: "text-pink-500", bg: "border-pink-300 dark:border-pink-800" },
                { range: "Level 71–80", title: "Ultra-Advanced (अल्ट्रा-एडवांस्ड)", desc: "Ind AS 115 & 109, Cross-border tax treaties (DTAA), Forex risk management, SEBI LODR compliances.", color: "text-rose-500", bg: "border-rose-300 dark:border-rose-800" },
                { range: "Level 81–90", title: "Specialist Level (स्पेशलिस्ट स्तर)", desc: "Financial modelling, M&A DCF valuation, Insolvency CIRP (IBC 2016), Board advisory.", color: "text-indigo-500", bg: "border-indigo-300 dark:border-indigo-800" },
                { range: "Level 91–100", title: "Mastery Level (पूर्ण महारत)", desc: "Real-world corporate projects, statutory audit sign-off simulations, complex litigation analysis.", color: "text-yellow-500", bg: "border-yellow-300 dark:border-yellow-800" },
              ].map((tier) => (
                <div
                  key={tier.range}
                  className={`p-4 rounded-xl border bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md ${tier.bg}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge className={`bg-emerald-600 text-white text-xs`}>
                          {tier.range}
                        </Badge>
                        <h4 className={`font-bold text-sm ${tier.color}`}>{tier.title}</h4>
                      </div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">{tier.desc}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <CheckCircle2 className="h-4 w-4" /> Open
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: KNOWLEDGE GRAPH */}
        <TabsContent value="graph">
          <KnowledgeGraph />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-[hsl(var(--muted-foreground))]">Loading Curriculum...</div>}>
      <CoursesContent />
    </Suspense>
  )
}
