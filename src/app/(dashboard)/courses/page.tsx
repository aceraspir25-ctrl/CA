"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { INSTITUTIONS_DATA, Institution, CourseLevel, SubjectPaper, Chapter } from "@/data/coursesData"
import { getChapterLessonData } from "@/data/chapterContentData"
import { useAppStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  FileSpreadsheet,
  ArrowRight,
  Search,
  Check
} from "lucide-react"
import Link from "next/link"

function CoursesContent() {
  const searchParams = useSearchParams()
  const { markTopicStudied, activeLanguage, setLanguage, studentLevel } = useAppStore()

  const instParam = searchParams.get("inst")
  const levelParam = searchParams.get("level")

  const [selectedInstId, setSelectedInstId] = useState<string>(instParam || "prsu")
  const [selectedLevelId, setSelectedLevelId] = useState<string>(levelParam || "prsu-bcom-sem1")
  const [activeTab, setActiveTab] = useState<"curriculum" | "learning-path" | "graph">("curriculum")
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)
  const [lessonLang, setLessonLang] = useState<"en" | "hi" | "hinglish">("hinglish")
  const [chapterFilter, setChapterFilter] = useState("")

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
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* 1. TOP HEADER BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <GraduationCap className="h-6 w-6" />
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
                Academic Curriculum & Learning Engine
              </h1>
            </div>
            <p className="text-blue-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Explore PRSU Raipur NEP-2020 6-Semester Degree and Professional CA, CMA, CS & ACCA programs. Complete syllabus coverage with verified conceptual depth.
            </p>
          </div>

          {/* Institution Switcher Pills */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {INSTITUTIONS_DATA.map((inst) => {
              const isActive = selectedInstId === inst.id
              return (
                <button
                  key={inst.id}
                  onClick={() => {
                    setSelectedInstId(inst.id)
                    setSelectedLevelId(inst.levels[0].id)
                    setSelectedChapter(null)
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer active:scale-95 ${
                    isActive
                      ? "bg-white text-slate-950 border-white shadow-lg ring-2 ring-primary/40"
                      : "bg-white/10 text-white/90 border-white/15 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {inst.shortName}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 2. LEVEL & SEMESTER SELECTION TABS */}
      <div className="glass-panel p-2 rounded-2xl border border-[hsl(var(--border))] flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-wider shrink-0 px-3">
          Stage / Sem:
        </span>
        <div className="flex items-center gap-1.5 flex-1 min-w-max">
          {activeInstitution.levels.map((lvl) => {
            const isSelected = selectedLevelId === lvl.id
            return (
              <button
                key={lvl.id}
                onClick={() => {
                  setSelectedLevelId(lvl.id)
                  setSelectedChapter(null)
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-md font-extrabold"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
                }`}
              >
                {lvl.shortTitle}
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. MAIN NAVIGATION TABS */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
        <TabsList className="glass-panel border border-[hsl(var(--border))] p-1 h-auto rounded-2xl flex flex-wrap sm:inline-flex">
          <TabsTrigger
            value="curriculum"
            className="gap-2 rounded-xl text-xs font-bold py-2 px-3 sm:px-4 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <BookOpen className="h-4 w-4" />
            Official Syllabus ({papersList.length} Papers)
          </TabsTrigger>
          <TabsTrigger
            value="learning-path"
            className="gap-2 rounded-xl text-xs font-bold py-2 px-3 sm:px-4 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Compass className="h-4 w-4 text-emerald-400" />
            Level 0 to 100 Path
          </TabsTrigger>
          <TabsTrigger
            value="graph"
            className="gap-2 rounded-xl text-xs font-bold py-2 px-3 sm:px-4 cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Layers className="h-4 w-4 text-indigo-400" />
            Knowledge Graph
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: CURRICULUM BROWSER */}
        <TabsContent value="curriculum" className="space-y-6">
          {/* Metadata Strip */}
          <div className="p-4 rounded-2xl glass-panel border border-blue-500/20 bg-blue-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-sm text-[hsl(var(--foreground))]">
                {activeInstitution.name} &bull; {activeLevel.title}
              </p>
              <p className="text-[hsl(var(--muted-foreground))] mt-0.5">
                Scheme: <strong className="text-[hsl(var(--foreground))]">{activeLevel.scheme}</strong> &bull; Eligibility: {activeLevel.eligibility}
              </p>
            </div>
            <a
              href={activeInstitution.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline shrink-0"
            >
              Verify on Portal <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Papers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {papersList.map((paper) => (
              <div
                key={paper.id}
                className="rounded-3xl glass-panel border border-[hsl(var(--border))] p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs font-bold bg-primary/10 text-primary border-primary/20">
                      Paper {paper.paperNumber}
                    </Badge>
                    <span className="text-xs font-extrabold text-[hsl(var(--muted-foreground))]">
                      {paper.marks} Marks
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-[hsl(var(--foreground))]">
                    {paper.title}
                  </h3>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1 line-clamp-2">
                    {paper.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[hsl(var(--border))]">
                    <p className="text-[11px] font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-2">
                      Chapters ({paper.chapters.length}):
                    </p>
                    <div className="space-y-2">
                      {paper.chapters.map((ch) => {
                        const isSelected = selectedChapter?.id === ch.id
                        return (
                          <div
                            key={ch.id}
                            onClick={() => setSelectedChapter(ch)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99] ${
                              isSelected
                                ? "border-primary bg-primary/10 shadow-sm ring-2 ring-primary/30"
                                : "border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:bg-[hsl(var(--muted)/0.7)]"
                            }`}
                          >
                            <div className="space-y-0.5 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-primary shrink-0">
                                  Ch {ch.number}.
                                </span>
                                <h4 className="text-xs font-bold text-[hsl(var(--foreground))] truncate">
                                  {ch.title}
                                </h4>
                              </div>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))] truncate">
                                {ch.hindiTitle} &bull; {ch.estimatedHours} Hours
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <Badge variant="secondary" className="text-[10px] font-bold">
                                Lvl {ch.levels.min}–{ch.levels.max}
                              </Badge>
                              <ChevronRight className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CHAPTER 23-POINT EXPANDABLE VIEWER */}
          {selectedChapter && (() => {
            const lesson = getChapterLessonData(selectedChapter.id, selectedChapter.title, selectedChapter.hindiTitle)

            return (
              <div className="rounded-3xl glass-panel border-2 border-primary p-6 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[hsl(var(--border))] pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-600 text-white font-bold text-xs">
                        Chapter {selectedChapter.number} Standardized
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        23-Point Engine
                      </Badge>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[hsl(var(--foreground))] mt-1">
                      {selectedChapter.title}
                    </h2>
                    <p className="text-sm font-semibold text-primary">{selectedChapter.hindiTitle}</p>
                  </div>

                  {/* Language Selector */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] shrink-0 self-start sm:self-auto">
                    <Languages className="h-4 w-4 text-primary ml-1" />
                    {(["en", "hi", "hinglish"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLessonLang(lang)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          lessonLang === lang
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                        }`}
                      >
                        {lang === "en" ? "English" : lang === "hi" ? "हिन्दी" : "Hinglish"}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed italic">
                  {lesson.overview}
                </p>

                {/* 23-Point Visual Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Point 4: ELI10 */}
                  <div className="p-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      Point 4: Explain Like I&apos;m 10 (ELI10 Intuition)
                    </h4>
                    <p className="text-xs text-[hsl(var(--foreground))] leading-relaxed">
                      {lesson.eli10[lessonLang]}
                    </p>
                  </div>

                  {/* Point 7 & 17: Statutory Rules */}
                  <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4 text-blue-600" />
                      Point 7 & 17: Statutory Rules & Applicable Standards
                    </h4>
                    <p className="text-xs text-[hsl(var(--foreground))] leading-relaxed">
                      <strong>Standards:</strong> {lesson.statutoryContext.standards}<br />
                      <strong>Legal Sections:</strong> {lesson.statutoryContext.sections}<br />
                      <strong>Compliance:</strong> {lesson.statutoryContext.provisions}
                    </p>
                  </div>

                  {/* Point 13 & 14: Practical Numerical & Journal */}
                  <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                      <FileSpreadsheet className="h-4 w-4 text-amber-600" />
                      Point 13 & 14: Practical Numerical & Illustration
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
                      <div className="mt-2 p-2.5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] font-mono text-[11px] space-y-1">
                        {lesson.practicalIllustration.journalEntries.map((je, i) => (
                          <div key={i} className="flex justify-between">
                            <span className="truncate">{je.particulars}</span>
                            <span className="font-bold shrink-0">{je.debit || je.credit}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Point 18: Common Exam Traps */}
                  <div className="p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-rose-600" />
                      Point 18: Common Exam Traps & Mistakes
                    </h4>
                    <ul className="text-xs text-[hsl(var(--foreground))] list-disc list-inside space-y-1 leading-relaxed">
                      {lesson.commonMistakes.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                    <div className="mt-2 pt-2 border-t border-rose-500/20 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                      <strong>💡 Memory Shortcut:</strong> {lesson.memoryTrick}
                    </div>
                  </div>
                </div>

                {/* Self-Assessment Check */}
                <div className="p-4 rounded-2xl glass-panel border border-[hsl(var(--border))] space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[hsl(var(--foreground))] flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Point 23: Quick Self-Assessment Check
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {lesson.practiceQuestions.map((pq, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] space-y-1">
                        <p className="font-bold text-[hsl(var(--foreground))]">Q: {pq.q}</p>
                        <p className="text-[hsl(var(--muted-foreground))]">A: {pq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[hsl(var(--border))]">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      onClick={() => {
                        markTopicStudied({
                          id: selectedChapter.id,
                          title: selectedChapter.title,
                          course: activeLevel.shortTitle,
                          levelAchieved: selectedChapter.levels.max,
                        })
                      }}
                      className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl btn-tactile cursor-pointer"
                    >
                      <CheckCircle2 className="h-4 w-4" /> Mark Studied (+50 XP)
                    </Button>
                    <Button asChild className="gap-2 text-xs font-bold rounded-xl btn-tactile cursor-pointer">
                      <Link href={`/ai-tutor?prompt=${encodeURIComponent(`Explain ${selectedChapter.title} in simple terms with practical numerical illustrations and exam tips.`)}`}>
                        <Sparkles className="h-4 w-4" /> Ask AI Tutor
                      </Link>
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="sm" className="gap-1.5 text-xs font-semibold rounded-xl">
                      <Link href="/lab">
                        <Layers className="h-3.5 w-3.5" /> Practice in Lab
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="gap-1.5 text-xs font-semibold rounded-xl">
                      <Link href="/tests">
                        <BookMarked className="h-3.5 w-3.5" /> Take Quiz
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )
          })()}
        </TabsContent>

        {/* TAB 2: SMART LEARNING PATH */}
        <TabsContent value="learning-path" className="space-y-6">
          <div className="rounded-3xl glass-panel border border-[hsl(var(--border))] p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[hsl(var(--border))] pb-4">
              <div>
                <h3 className="text-lg font-black text-[hsl(var(--foreground))] flex items-center gap-2">
                  <Compass className="h-5 w-5 text-emerald-500" />
                  Level 0 to Level 100 Universal Progression Path
                </h3>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                  All 100 levels are 100% unlocked for open exploration and self-paced mastery.
                </p>
              </div>
              <Badge className="bg-emerald-600 text-white text-xs font-bold self-start sm:self-auto">
                100% Unlocked (Open Access)
              </Badge>
            </div>

            <div className="space-y-3">
              {[
                { range: "Level 0–10", title: "Absolute Beginner (शुरुआती समझ)", desc: "What is Commerce? Why do we study it? Everyday examples, basic terms, child-level intuition.", color: "text-blue-500" },
                { range: "Level 11–20", title: "Basic Understanding (मूलभूत अवधारणाएं)", desc: "Double-entry rules, accounting cycle, terminology, basic principles.", color: "text-cyan-500" },
                { range: "Level 21–30", title: "Beginner Practical (व्यावहारिक आरंभ)", desc: "Simple journal entries, ledger balancing, Bank Reconciliation Statements, basic numericals.", color: "text-emerald-500" },
                { range: "Level 31–40", title: "Intermediate (मध्यम स्तर)", desc: "Depreciation SLM/WDV, Final Accounts adjustments, partnership fundamentals, residential status.", color: "text-amber-500" },
                { range: "Level 41–50", title: "Advanced (उच्च स्तर)", desc: "Company Accounts (Shares/Debentures), Schedule III financial statements, PGBP taxation, Marginal Costing.", color: "text-orange-500" },
                { range: "Level 51–60", title: "Professional Application (व्यावसायिक स्तर)", desc: "CA/CMA/CS exam-level case problems, GST ITC mechanics, Capital Budgeting (NPV/IRR), CARO 2020.", color: "text-purple-500" },
                { range: "Level 61–70", title: "Expert Level (विशेषज्ञ स्तर)", desc: "Corporate Restructuring, Transfer Pricing, WACC & CAPM, Forensic audit procedures.", color: "text-pink-500" },
                { range: "Level 71–80", title: "Ultra-Advanced (अल्ट्रा-एडवांस्ड)", desc: "Ind AS 115 & 109, Cross-border tax treaties (DTAA), Forex risk management, SEBI LODR compliances.", color: "text-rose-500" },
                { range: "Level 81–90", title: "Specialist Level (स्पेशलिस्ट स्तर)", desc: "Financial modelling, M&A DCF valuation, Insolvency CIRP (IBC 2016), Board advisory.", color: "text-indigo-500" },
                { range: "Level 91–100", title: "Mastery Level (पूर्ण महारत)", desc: "Real-world corporate projects, statutory audit sign-off simulations, complex litigation analysis.", color: "text-yellow-500" },
              ].map((tier) => (
                <div
                  key={tier.range}
                  className="p-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-xs hover:shadow-md transition-all flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-600 text-white text-[11px] font-bold">
                        {tier.range}
                      </Badge>
                      <h4 className={`font-bold text-sm ${tier.color}`}>{tier.title}</h4>
                    </div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" /> Open
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
