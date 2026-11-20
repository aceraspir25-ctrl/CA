"use client"

import { useState } from "react"
import {
  Building2,
  Users,
  GraduationCap,
  Calendar,
  ClipboardList,
  BarChart3,
  Award,
  CheckCircle2,
  Plus,
  Search,
  BookOpen,
  ArrowUpRight,
  TrendingUp,
  FileSpreadsheet
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"

interface BatchRecord {
  id: string
  name: string
  course: string
  totalStudents: number
  syllabusCompletedPercent: number
  avgReadinessScore: number
  targetExamDate: string
  facultyLead: string
  nextMockExam: string
  status: "ACTIVE" | "UPCOMING" | "COMPLETED"
}

const INITIAL_BATCHES: BatchRecord[] = [
  {
    id: "batch-ca-inter-may25",
    name: "CA Intermediate May 2025 Fast-Track Regular Batch",
    course: "ICAI CA Intermediate (New Scheme)",
    totalStudents: 142,
    syllabusCompletedPercent: 78,
    avgReadinessScore: 84,
    targetExamDate: "03 May 2025",
    facultyLead: "CA Rajesh Singhania, FCA",
    nextMockExam: "Mock Exam #3 (Paper 1 & 2) — Sunday 10:00 AM",
    status: "ACTIVE"
  },
  {
    id: "batch-bcom-nep-sem2",
    name: "B.Com NEP Semester 2 Corporate Accounting Batch",
    course: "PRSU B.Com (NEP 2020 Scheme)",
    totalStudents: 210,
    syllabusCompletedPercent: 92,
    avgReadinessScore: 88,
    targetExamDate: "15 April 2025",
    facultyLead: "Prof. S. K. Agrawal, M.Com, Ph.D.",
    nextMockExam: "Mid-Term Assessment — 28 March",
    status: "ACTIVE"
  },
  {
    id: "batch-cma-inter-june25",
    name: "CMA Intermediate June 2025 Cost & Management Batch",
    course: "ICMAI CMA Intermediate (2022 Syllabus)",
    totalStudents: 88,
    syllabusCompletedPercent: 65,
    avgReadinessScore: 80,
    targetExamDate: "12 June 2025",
    facultyLead: "CMA Meera Sundaram, FCMA",
    nextMockExam: "Cost Accounting Practice Drill #2 — Saturday",
    status: "ACTIVE"
  }
]

export default function InstitutionWorkspacesPage() {
  const [batches, setBatches] = useState<BatchRecord[]>(INITIAL_BATCHES)
  const [selectedBatch, setSelectedBatch] = useState<BatchRecord>(batches[0])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBatches = batches.filter(
    b =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.facultyLead.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalStudents = batches.reduce((acc, b) => acc + b.totalStudents, 0)
  const avgReadiness = Math.round(batches.reduce((acc, b) => acc + b.avgReadinessScore, 0) / batches.length)

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 p-4 md:p-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/30 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-indigo-600/30 rounded-2xl border border-indigo-500/30">
              <Building2 className="h-6 w-6 text-indigo-300" />
            </div>
            <h1 className="text-2xl font-black">Institution & Coaching Workspaces</h1>
            <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">Enterprise</Badge>
          </div>
          <p className="text-xs text-indigo-200/80 max-w-2xl leading-relaxed">
            Multi-tenant batch orchestration, college syllabus mapping, automated mock exam distribution, and all-India student ranking for institutions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-1.5 shrink-0">
            <Plus className="h-4 w-4" /> Create New Batch
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
          <CardContent className="pt-4 pb-4">
            <div className="text-xs text-[hsl(var(--muted-foreground))] flex items-center justify-between mb-1">
              <span>Active Students</span>
              <Users className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-3xl font-black text-[hsl(var(--foreground))]">{totalStudents}</div>
            <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5">Enrolled across batches</p>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
          <CardContent className="pt-4 pb-4">
            <div className="text-xs text-[hsl(var(--muted-foreground))] flex items-center justify-between mb-1">
              <span>Average Readiness</span>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-black text-emerald-600">{avgReadiness}%</div>
            <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5">Exam pass probability</p>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
          <CardContent className="pt-4 pb-4">
            <div className="text-xs text-[hsl(var(--muted-foreground))] flex items-center justify-between mb-1">
              <span>Active Cohorts</span>
              <GraduationCap className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-3xl font-black text-purple-600">{batches.length}</div>
            <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5">Targeting 2025 exams</p>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
          <CardContent className="pt-4 pb-4">
            <div className="text-xs text-[hsl(var(--muted-foreground))] flex items-center justify-between mb-1">
              <span>Mocks Conducted</span>
              <Award className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-amber-600">18</div>
            <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5">180-min simulations</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Batches Roster & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Batches List */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            <Input
              placeholder="Search batches by course or faculty..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>

          <div className="space-y-2.5">
            {filteredBatches.map(batch => (
              <div
                key={batch.id}
                onClick={() => setSelectedBatch(batch)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedBatch.id === batch.id
                    ? "bg-indigo-500/10 border-indigo-500 shadow-sm"
                    : "bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-indigo-400/50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline" className="text-[10px] border-indigo-500/30 text-indigo-600">
                    {batch.course}
                  </Badge>
                  <span className="text-[10px] font-bold text-emerald-600">{batch.status}</span>
                </div>

                <h3 className="text-xs font-bold text-[hsl(var(--foreground))] line-clamp-1 mt-1">
                  {batch.name}
                </h3>

                <div className="flex items-center justify-between text-[11px] text-[hsl(var(--muted-foreground))] mt-2 pt-2 border-t border-[hsl(var(--border))]/50">
                  <span>{batch.totalStudents} Students</span>
                  <span>Readiness: <strong className="text-emerald-600">{batch.avgReadinessScore}%</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Selected Batch Detailed Inspector */}
        <div className="lg:col-span-2">
          <Card className="border-[hsl(var(--border))] bg-[hsl(var(--card))]">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge className="bg-indigo-600 text-white text-[10px] mb-1.5">{selectedBatch.course}</Badge>
                  <CardTitle className="text-base font-bold text-[hsl(var(--foreground))]">
                    {selectedBatch.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                    Faculty In-Charge: <strong>{selectedBatch.facultyLead}</strong> • Target Exam: <strong>{selectedBatch.targetExamDate}</strong>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 text-xs">
              {/* Progress Gauges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[hsl(var(--muted))]/40 border border-[hsl(var(--border))]">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-[hsl(var(--foreground))]">Syllabus Coverage</span>
                    <span className="font-bold text-indigo-600">{selectedBatch.syllabusCompletedPercent}%</span>
                  </div>
                  <Progress value={selectedBatch.syllabusCompletedPercent} className="h-2 bg-slate-200 dark:bg-slate-800" />
                  <p className="text-[10px] text-[hsl(var(--muted-foreground))] mt-1">Mapped to ICAI/University scheme</p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-[hsl(var(--foreground))]">Cohort Mock Readiness</span>
                    <span className="font-bold text-emerald-600">{selectedBatch.avgReadinessScore}%</span>
                  </div>
                  <Progress value={selectedBatch.avgReadinessScore} className="h-2 bg-slate-200 dark:bg-slate-800" />
                  <p className="text-[10px] text-[hsl(var(--muted-foreground))] mt-1">Based on previous 3 assessments</p>
                </div>
              </div>

              {/* Next Scheduled Assessment Drill */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Calendar className="h-5 w-5 text-amber-500 shrink-0" />
                  <div>
                    <span className="font-bold block text-xs">Upcoming Assessment:</span>
                    <span className="text-[11px] opacity-90">{selectedBatch.nextMockExam}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-amber-500/40 text-xs shrink-0 bg-transparent">
                  View Roster
                </Button>
              </div>

              {/* Actions Ribbon */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[hsl(var(--border))]">
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-1.5">
                  <FileSpreadsheet className="h-3.5 w-3.5" /> Export Attendance & Performance (CSV)
                </Button>
                <Button size="sm" variant="outline" className="text-xs gap-1.5">
                  <ClipboardList className="h-3.5 w-3.5" /> Assign Practice Paper
                </Button>
                <Button size="sm" variant="outline" className="text-xs gap-1.5">
                  <Award className="h-3.5 w-3.5" /> Generate Rank List
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
