"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { INSTITUTIONS_DATA, Institution, CourseLevel, SubjectPaper, Chapter } from "@/data/coursesData"
import { useAppStore } from "@/lib/store"
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
  ArrowRight,
  Search,
  Check
} from "lucide-react"
import Link from "next/link"

function CoursesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { markTopicStudied, activeLanguage, setLanguage, studentLevel } = useAppStore()

  const instParam = searchParams.get("inst")
  const levelParam = searchParams.get("level")

  const [selectedInstId, setSelectedInstId] = useState<string>(instParam || "prsu")
  const [selectedLevelId, setSelectedLevelId] = useState<string>(levelParam || "prsu-bcom-sem1")
  const [activeTab, setActiveTab] = useState<"curriculum" | "learning-path" | "graph">("curriculum")

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
              Explore PRSU Raipur NEP-2020 6-Semester Degree and Professional CA, CMA, CS & ACCA programs. Click any subject to immediately open its dedicated full chapter content studio.
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
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer active:scale-95 ${
                    isActive
                      ? "bg-white text-slate-950 border-white shadow-lg ring-2 ring-primary/40 font-black"
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
                className="rounded-3xl glass-panel border border-[hsl(var(--border))] p-5 shadow-xs flex flex-col justify-between hover:border-primary/50 transition-all group"
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

                  <Link href={`/courses/subject/${paper.id}`} className="block">
                    <h3 className="text-base font-extrabold text-[hsl(var(--foreground))] group-hover:text-primary transition-colors cursor-pointer">
                      {paper.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1 line-clamp-2">
                    {paper.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[hsl(var(--border))]">
                    <p className="text-[11px] font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-2">
                      Chapters ({paper.chapters.length}):
                    </p>
                    <div className="space-y-2">
                      {paper.chapters.map((ch) => (
                        <Link
                          key={ch.id}
                          href={`/courses/subject/${paper.id}`}
                          className="p-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:bg-primary/10 hover:border-primary/40 transition-all cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99] block"
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
                            <ArrowRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] group-hover:text-primary transition-colors" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[hsl(var(--border))]">
                  <Button
                    asChild
                    className="w-full gap-2 text-xs font-extrabold rounded-xl btn-tactile cursor-pointer"
                  >
                    <Link href={`/courses/subject/${paper.id}`}>
                      Open Subject & Read All Chapters
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
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
