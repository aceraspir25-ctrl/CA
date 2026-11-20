"use client"

import { useState } from "react"
import { STATUTORY_AMENDMENTS, StatutoryAmendment } from "@/data/amendmentsData"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sparkles,
  Search,
  Scale,
  Calendar,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  BookOpen
} from "lucide-react"

export default function AmendmentsTrackerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [activeAmendment, setActiveAmendment] = useState<StatutoryAmendment>(STATUTORY_AMENDMENTS[0])

  const filtered = STATUTORY_AMENDMENTS.filter((item) => {
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory
    const q = searchQuery.toLowerCase()
    const matchesQuery =
      item.title.toLowerCase().includes(q) ||
      item.statute.toLowerCase().includes(q) ||
      item.sectionAffected.toLowerCase().includes(q)
    return matchesCat && matchesQuery
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-amber-500/20">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30">
              <Scale className="h-6 w-6" />
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
              Syllabus & Statutory Amendment Tracker
            </h1>
            <Badge className="bg-amber-500 text-slate-950 font-black text-xs">
              Live Verified Gazettes
            </Badge>
          </div>
          <p className="text-amber-200/90 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Side-by-side statutory comparison viewer. Track real-time amendments across Income Tax, Corporate Law (BNS 2023), Accounting Standards (Ind AS), and ICAI/ICMAI syllabus revisions with official gazette sources.
          </p>
        </div>
      </div>

      {/* 2. Search & Category Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search amendments by section (e.g. '115BAC', 'Section 16', 'Ind AS', 'BNS 2023')..."
            className="pl-9 h-11 rounded-2xl text-xs sm:text-sm bg-[hsl(var(--card))] border-[hsl(var(--border))]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {[
            { id: "all", label: "All Amendments" },
            { id: "taxation", label: "Taxation (IT Act & GST)" },
            { id: "corporate_law", label: "Corporate Law & BNS" },
            { id: "accounting_standards", label: "Ind AS / IFRS" },
            { id: "syllabus_scheme", label: "ICAI/ICMAI Schemes" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                selectedCategory === cat.id
                  ? "bg-amber-500 text-slate-950 shadow-md font-black"
                  : "bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main Split View: Amendments List (Left) + Side-by-Side Comparison (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Amendment Feed */}
        <div className="lg:col-span-5 space-y-3">
          <p className="text-xs font-black uppercase tracking-wider text-[hsl(var(--muted-foreground))] flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-amber-500" />
            Verified Statutory Gazettes ({filtered.length})
          </p>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filtered.map((item) => {
              const isSelected = activeAmendment.id === item.id
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveAmendment(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden active:scale-[0.99] ${
                    isSelected
                      ? "bg-amber-500/10 border-amber-500 shadow-md ring-1 ring-amber-500/40"
                      : "bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-amber-500/40 hover:bg-[hsl(var(--muted))]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <Badge variant="outline" className="text-[10px] font-bold border-amber-500/30 text-amber-500">
                      {item.statute}
                    </Badge>
                    <span className="text-[10px] font-bold text-[hsl(var(--muted-foreground))] flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Effective: {item.effectiveDate}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-black text-[hsl(var(--foreground))] line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-1 line-clamp-1">
                    Section: <strong className="text-primary">{item.sectionAffected}</strong> &bull; Applicable: {item.applicableExamSession}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Deep Side-by-Side Comparison Viewer */}
        <div className="lg:col-span-7">
          {activeAmendment && (
            <Card className="glass-panel border-2 border-amber-500/30 rounded-3xl overflow-hidden shadow-xl sticky top-4">
              <CardContent className="p-5 sm:p-6 space-y-6">
                {/* Title & Metadata Strip */}
                <div className="space-y-2 border-b border-[hsl(var(--border))] pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-amber-500 text-slate-950 font-black text-xs">
                      {activeAmendment.statute}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-bold border-amber-500/30 text-amber-500">
                      {activeAmendment.sectionAffected}
                    </Badge>
                    <span className="text-xs text-[hsl(var(--muted-foreground))] font-semibold">
                      Applicable for: <strong>{activeAmendment.applicableExamSession}</strong>
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-black text-[hsl(var(--foreground))]">
                    {activeAmendment.title}
                  </h2>

                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    Gazette Ref: <strong className="text-[hsl(var(--foreground))]">{activeAmendment.officialGazetteRef}</strong>
                  </p>
                </div>

                {/* SIDE-BY-SIDE STATUTORY PROVISION COMPARISON */}
                <div className="space-y-2">
                  <p className="text-xs font-black uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                    Statutory Language Transformation (Old vs. New)
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Previous Provision */}
                    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2">
                      <div className="flex items-center gap-1.5 text-rose-500 font-bold text-xs">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        <span>Previous Provision (Pre-Amendment)</span>
                      </div>
                      <p className="text-xs text-[hsl(var(--foreground))] leading-relaxed">
                        {activeAmendment.previousProvision}
                      </p>
                    </div>

                    {/* Amended Provision */}
                    <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                      <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-xs">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>Amended Active Law (Post-Amendment)</span>
                      </div>
                      <p className="text-xs text-[hsl(var(--foreground))] leading-relaxed font-semibold">
                        {activeAmendment.amendedProvision}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Bullet Changes */}
                <div className="space-y-2">
                  <p className="text-xs font-black uppercase tracking-wider text-[hsl(var(--foreground))]">
                    Key Exam Takeaways & Calculation Shifts
                  </p>
                  <ul className="space-y-1.5 text-xs text-[hsl(var(--muted-foreground))]">
                    {activeAmendment.keyChanges.map((change, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Examination Impact Alert Box */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
                  <p className="font-bold text-amber-500 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" /> Academic & Exam Impact Analysis:
                  </p>
                  <p className="text-[hsl(var(--foreground))] leading-relaxed">
                    {activeAmendment.academicImpactSummary}
                  </p>
                </div>

                {/* External Verification Link */}
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-[hsl(var(--muted-foreground))]">
                    Effective: {activeAmendment.effectiveDate}
                  </span>
                  <a
                    href={activeAmendment.sourceDocumentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary font-bold hover:underline"
                  >
                    Verify on Official Portal <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
