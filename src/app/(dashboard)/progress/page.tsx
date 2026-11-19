"use client"

import {
  BarChart2,
  TrendingUp,
  Clock,
  CheckCircle2,
  Award,
  AlertTriangle,
  Flame,
  Brain,
  BookOpen,
  ArrowRight
} from "lucide-react"
import { useAppStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProgressPage() {
  const { studentName, studentLevel, studyStreakDays, weakConcepts, studiedTopics, certificates } = useAppStore()

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <BarChart2 className="h-6 w-6 text-blue-300" />
            </div>
            <h1 className="text-2xl font-bold">Performance Analytics & Mastery Progress</h1>
            <Badge className="bg-emerald-500 text-white">Universal Tracking</Badge>
          </div>
          <p className="text-blue-200 text-sm max-w-2xl">
            Live metrics on concept mastery, test accuracy, study streak, and weak area resolutions across all enrolled courses.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
          <div className="text-center px-3 border-r border-white/20">
            <p className="text-xs text-blue-200">Overall Level</p>
            <p className="text-2xl font-bold text-emerald-300">Lvl {studentLevel}</p>
          </div>
          <div className="text-center px-3">
            <p className="text-xs text-blue-200">Daily Streak</p>
            <p className="text-2xl font-bold text-amber-300 flex items-center justify-center gap-1">
              <Flame className="h-5 w-5 text-amber-400 fill-amber-400" /> {studyStreakDays}d
            </p>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-[hsl(var(--border))]">
          <CardContent className="p-5 space-y-1">
            <div className="flex items-center justify-between text-blue-600">
              <Clock className="h-5 w-5" />
              <Badge variant="secondary" className="text-[10px]">+2.5h this week</Badge>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] pt-2">Total Study Hours</p>
            <p className="text-2xl font-bold">24.5 Hours</p>
          </CardContent>
        </Card>

        <Card className="border-[hsl(var(--border))]">
          <CardContent className="p-5 space-y-1">
            <div className="flex items-center justify-between text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
              <Badge variant="success" className="text-[10px]">On Track</Badge>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] pt-2">Chapters Completed</p>
            <p className="text-2xl font-bold">15 Chapters</p>
          </CardContent>
        </Card>

        <Card className="border-[hsl(var(--border))]">
          <CardContent className="p-5 space-y-1">
            <div className="flex items-center justify-between text-amber-600">
              <TrendingUp className="h-5 w-5" />
              <Badge variant="warning" className="text-[10px]">High Accuracy</Badge>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] pt-2">Quiz Accuracy</p>
            <p className="text-2xl font-bold">86.4%</p>
          </CardContent>
        </Card>

        <Card className="border-[hsl(var(--border))]">
          <CardContent className="p-5 space-y-1">
            <div className="flex items-center justify-between text-purple-600">
              <Award className="h-5 w-5" />
              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-[10px]">Verified</Badge>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] pt-2">Certificates Earned</p>
            <p className="text-2xl font-bold">{certificates.length} Credentials</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Breakdown across 4 Courses */}
      <Card className="border-[hsl(var(--border))]">
        <CardHeader>
          <CardTitle className="text-base">Course-Wise Syllabus Completion</CardTitle>
          <CardDescription>Independent progress metrics for each professional institution.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {[
            { course: "CA Foundation (ICAI)", progress: 35, current: "Paper 1: Accounting (Ch 4/12)", color: "bg-blue-600" },
            { course: "CMA Foundation (ICMAI)", progress: 20, current: "Paper 2: Cost Accounting (Ch 2/10)", color: "bg-emerald-600" },
            { course: "CS CSEET (ICSI)", progress: 10, current: "Legal Aptitude (Ch 1/8)", color: "bg-purple-600" },
            { course: "PRSU Raipur B.Com (Semester 5)", progress: 65, current: "Financial Management (Ch 7/10)", color: "bg-amber-600" },
          ].map((item) => (
            <div key={item.course} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold">{item.course}</span>
                <span className="font-mono font-semibold">{item.progress}%</span>
              </div>
              <Progress value={item.progress} className="h-2.5" />
              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Current focus: {item.current}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Knowledge Gaps / Weak Areas */}
        <Card className="border-[hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Active Knowledge Gaps ({weakConcepts.length})
            </CardTitle>
            <CardDescription>Topics flagged for review from quiz errors.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {weakConcepts.map((w) => (
              <div key={w.id} className="p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold">{w.concept}</h4>
                  <Badge variant="outline" className="text-[10px] text-amber-700 bg-amber-50 dark:bg-amber-950 dark:text-amber-300">
                    {w.errorCount} error{w.errorCount > 1 ? "s" : ""}
                  </Badge>
                </div>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))]">{w.subject}</p>
              </div>
            ))}
            <Button asChild variant="outline" size="sm" className="w-full text-xs gap-1.5 mt-2">
              <Link href="/ai-tutor">
                <Brain className="h-3.5 w-3.5 text-indigo-500" /> Revise with AI Memory Tutor
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Mastered Topics History */}
        <Card className="border-[hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Mastered Topic Milestones
            </CardTitle>
            <CardDescription>Verified concepts with demonstrated proficiency.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {studiedTopics.map((t) => (
              <div key={t.id} className="p-3 rounded-lg border border-[hsl(var(--border))] flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold">{t.title}</p>
                  <p className="text-[11px] text-[hsl(var(--muted-foreground))]">{t.course} • {t.timestamp}</p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 text-[10px]">
                  Lvl {t.levelAchieved}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
