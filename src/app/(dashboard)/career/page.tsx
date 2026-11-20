"use client"

import { useState } from "react"
import { CAREER_ROADMAPS, CareerPathway } from "@/data/careerRoadmapsData"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Building,
  ArrowRight
} from "lucide-react"

export default function CareerRoadmapPage() {
  const [selectedPathway, setSelectedPathway] = useState<CareerPathway>(CAREER_ROADMAPS[0])
  const [activeTab, setActiveTab] = useState<"roles" | "internship" | "skills" | "interviews">("roles")

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-6 sm:p-8 shadow-xl border border-emerald-500/20">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <GraduationCap className="h-6 w-6" />
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
              Career Roadmap AI & Corporate Intelligence Hub
            </h1>
            <Badge className="bg-emerald-500 text-slate-950 font-black text-xs">
              Qualification ➔ CFO & Executive Leadership
            </Badge>
          </div>
          <p className="text-emerald-200/90 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Bridge academic preparation and corporate industry expectations. Explore verified compensation benchmarks, mandatory articleship milestones, high-impact financial modelling skills, and realistic technical mock interviews.
          </p>
        </div>
      </div>

      {/* 2. Qualification Switcher Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {CAREER_ROADMAPS.map((p) => {
          const isSelected = selectedPathway.id === p.id
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPathway(p)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                isSelected
                  ? "bg-emerald-600 text-white shadow-md font-black ring-2 ring-emerald-500/30"
                  : "bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]"
              }`}
            >
              {p.qualificationTitle}
            </button>
          )
        })}
      </div>

      {/* 3. Section Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[hsl(var(--border))] pb-3 overflow-x-auto">
        {[
          { id: "roles", label: "Executive & Corporate Roles", icon: Briefcase },
          { id: "internship", label: "Articleship & Practical Training", icon: Clock },
          { id: "skills", label: "Skills Gap Checklist", icon: TrendingUp },
          { id: "interviews", label: "Technical Mock Interviews", icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-primary text-primary-foreground font-black shadow-xs"
                  : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* TAB 1: EXECUTIVE & CORPORATE ROLES */}
      {activeTab === "roles" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedPathway.targetRoles.map((role, idx) => (
            <Card key={idx} className="glass-panel border border-[hsl(var(--border))] rounded-3xl p-6 shadow-sm hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="space-y-1">
                  <Badge variant="outline" className="text-[10px] font-bold text-emerald-500 border-emerald-500/30">
                    Target Role #{idx + 1}
                  </Badge>
                  <h3 className="text-base sm:text-lg font-black text-[hsl(var(--foreground))]">
                    {role.title}
                  </h3>
                  <p className="text-xs font-black text-emerald-500">
                    Typical CTC: {role.averageSalaryRangeINR}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Key Corporate Responsibilities:
                  </p>
                  <ul className="space-y-1 text-xs text-[hsl(var(--muted-foreground))] list-disc list-inside">
                    {role.keyResponsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-[hsl(var(--border))]">
                  <p className="text-[11px] font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                    Top Hiring Sectors:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {role.topHiringSectors.map((sector, i) => (
                      <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[hsl(var(--border))] flex items-center justify-between text-xs text-primary font-bold">
                <span>{role.essentialSkills.join(" • ")}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* TAB 2: ARTICLESHIP & PRACTICAL TRAINING */}
      {activeTab === "internship" && (
        <Card className="glass-panel border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1 border-b border-[hsl(var(--border))] pb-4">
            <Badge className="bg-emerald-600 text-white font-bold text-xs">
              Statutory Training Norms
            </Badge>
            <h2 className="text-xl font-black text-[hsl(var(--foreground))]">
              {selectedPathway.articleshipInternshipRoadmap.title}
            </h2>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Statutory Basis: {selectedPathway.articleshipInternshipRoadmap.statutoryRegulations}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
              <p className="text-xs text-[hsl(var(--muted-foreground))] font-bold">Mandatory Duration</p>
              <p className="text-lg font-black text-primary">{selectedPathway.articleshipInternshipRoadmap.duration}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
              <p className="text-xs text-[hsl(var(--muted-foreground))] font-bold">Stipend Standards (INR)</p>
              <p className="text-lg font-black text-emerald-500">{selectedPathway.articleshipInternshipRoadmap.stipendNormsINR}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-wider text-[hsl(var(--foreground))]">
              Year-wise Practical Milestones:
            </p>
            <div className="space-y-2">
              {selectedPathway.articleshipInternshipRoadmap.keyLearningMilestones.map((m, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-[hsl(var(--muted)/0.4)] border border-[hsl(var(--border))] flex items-start gap-2.5 text-xs text-[hsl(var(--foreground))]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* TAB 3: SKILLS GAP CHECKLIST */}
      {activeTab === "skills" && (
        <div className="space-y-6">
          {selectedPathway.skillsGapChecklist.map((cat, idx) => (
            <Card key={idx} className="glass-panel border border-[hsl(var(--border))] rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-black text-[hsl(var(--foreground))] flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                {cat.category}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="p-3.5 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[hsl(var(--foreground))]">{skill.name}</span>
                    <Badge variant={skill.importance === "Mandatory" ? "default" : "outline"} className="text-[10px] font-bold shrink-0">
                      {skill.importance}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* TAB 4: MOCK INTERVIEWS */}
      {activeTab === "interviews" && (
        <div className="space-y-4">
          {selectedPathway.mockInterviewScenarios.map((mock, idx) => (
            <Card key={idx} className="glass-panel border border-[hsl(var(--border))] rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <Badge className="bg-primary text-primary-foreground font-bold text-xs">
                  {mock.interviewType} Interview Case
                </Badge>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-[hsl(var(--foreground))]">
                Q: {mock.question}
              </h3>

              <div className="p-4 rounded-2xl bg-[hsl(var(--muted)/0.5)] border border-[hsl(var(--border))] space-y-2 text-xs">
                <p className="font-bold text-primary flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Model Answer Key & Statutory Arguments:
                </p>
                <p className="text-[hsl(var(--foreground))] leading-relaxed">
                  {mock.modelAnswerKey}
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Partner Evaluation Rubric Checklist:
                </p>
                <ul className="space-y-1 text-xs text-[hsl(var(--muted-foreground))] list-disc list-inside">
                  {mock.evaluationRubric.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
