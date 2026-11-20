"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  Clock,
  CheckCircle2,
  ClipboardList,
  Flame,
  ArrowRight,
  BookMarked,
  Trophy,
  Star,
  Calendar,
  Activity,
  Sparkles,
  Bot,
  GraduationCap,
  TrendingUp,
  Zap,
  Layers,
  ChevronRight,
  Compass,
  Scale,
  Award,
  Library,
  Briefcase
} from "lucide-react"

// --- Types ---
interface CourseCard {
  id: string
  name: string
  institution: string
  progress: number
  nextLesson: string
  subject: string
  currentChapter: number
  totalChapters: number
  badgeColor: string
  href: string
  accentBorder: string
}

interface StatBox {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgGlow: string
}

interface ActivityItem {
  type: "study" | "bookmark" | "quiz"
  title: string
  course: string
  time: string
}

interface UpcomingTest {
  name: string
  date: string
  status: "urgent" | "normal" | "planned"
}

interface RecommendedLesson {
  title: string
  course: string
  level: string
  duration: number
  topic: string
}

interface Achievement {
  name: string
  emoji: string
  category: string
}

// B.Com Semesters Quick Jump
const BCOM_SEMESTERS = [
  { sem: "Sem 1", papers: "DSC-1, DSC-2, DSC-3", title: "Financial Accounting & Law", href: "/courses?inst=prsu&level=prsu-bcom-sem1", color: "from-blue-600 to-indigo-600" },
  { sem: "Sem 2", papers: "DSC-4, DSC-5, DSC-6", title: "Corporate Basics & Maths", href: "/courses?inst=prsu&level=prsu-bcom-sem2", color: "from-cyan-600 to-blue-600" },
  { sem: "Sem 3", papers: "DSC-7, DSC-8, DSC-9", title: "Corporate Acc & Stats", href: "/courses?inst=prsu&level=prsu-bcom-sem3", color: "from-emerald-600 to-teal-600" },
  { sem: "Sem 4", papers: "DSC-10, DSC-11, DSC-12", title: "Cost Acc & Company Law", href: "/courses?inst=prsu&level=prsu-bcom-sem4", color: "from-amber-600 to-orange-600" },
  { sem: "Sem 5", papers: "DSC-13, DSC-14, DSC-15", title: "Income Tax & Auditing", href: "/courses?inst=prsu&level=prsu-bcom-sem5", color: "from-violet-600 to-purple-600" },
  { sem: "Sem 6", papers: "DSC-16, DSC-17, DSC-18", title: "GST, Management & Projects", href: "/courses?inst=prsu&level=prsu-bcom-sem6", color: "from-rose-600 to-pink-600" },
]

// --- Mock Data ---
const courses: CourseCard[] = [
  {
    id: "bcom-sem1",
    name: "B.Com Semester 1 (NEP)",
    institution: "PRSU",
    progress: 72,
    nextLesson: "Royalty Accounts Shortworkings",
    subject: "DSC-1 Accounting",
    currentChapter: 3,
    totalChapters: 5,
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
    href: "/courses/subject/prsu-bcom-s1-p1",
    accentBorder: "hover:border-blue-500/50",
  },
  {
    id: "ca-foundation",
    name: "CA Foundation",
    institution: "ICAI",
    progress: 45,
    nextLesson: "Journal Entries & Trial Balance",
    subject: "Paper 1 Accounting",
    currentChapter: 4,
    totalChapters: 12,
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20",
    href: "/courses/subject/ca-f-p1",
    accentBorder: "hover:border-indigo-500/50",
  },
  {
    id: "bcom-sem5",
    name: "B.Com Semester 5 (NEP)",
    institution: "PRSU",
    progress: 60,
    nextLesson: "Income from Salaries & Deductions",
    subject: "DSC-13 Income Tax",
    currentChapter: 2,
    totalChapters: 5,
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    href: "/courses/subject/prsu-bcom-s5-p1",
    accentBorder: "hover:border-emerald-500/50",
  },
  {
    id: "cma-intermediate",
    name: "CMA Intermediate",
    institution: "ICMAI",
    progress: 28,
    nextLesson: "Material Costing & EOQ Formula",
    subject: "Group 1 Costing",
    currentChapter: 2,
    totalChapters: 10,
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    href: "/courses?inst=icmai&level=cma-intermediate",
    accentBorder: "hover:border-amber-500/50",
  },
]

const stats: StatBox[] = [
  { label: "Study Time", value: "24.5h", icon: Clock, color: "text-blue-500", bgGlow: "bg-blue-500/10" },
  { label: "Chapters Done", value: "48 / 170", icon: CheckCircle2, color: "text-emerald-500", bgGlow: "bg-emerald-500/10" },
  { label: "XP Points", value: "3,420 XP", icon: Zap, color: "text-purple-500", bgGlow: "bg-purple-500/10" },
  { label: "Active Streak", value: "7 Days 🔥", icon: Flame, color: "text-amber-500", bgGlow: "bg-amber-500/10" },
]

const recentActivity: ActivityItem[] = [
  { type: "study", title: "Royalty Accounts: Minimum Rent & Recoupment", course: "B.Com Sem 1", time: "1 hour ago" },
  { type: "quiz", title: "Indian Contract Act 1872 Mock Test (92%)", course: "CA Foundation", time: "3 hours ago" },
  { type: "bookmark", title: "Section 185 Loans to Directors Flowchart", course: "Company Law", time: "Yesterday" },
]

const upcomingTests: UpcomingTest[] = [
  { name: "PRSU B.Com Sem 1 Financial Acc Test", date: "Tomorrow, 10:00 AM", status: "urgent" },
  { name: "CA Foundation Law Quiz 3", date: "In 2 days", status: "normal" },
  { name: "Costing EOQ & Overhead Distribution", date: "Friday", status: "planned" },
]

const recommendedLessons: RecommendedLesson[] = [
  { title: "Hire Purchase vs Installment Payment System", course: "B.Com Sem 1 (DSC-1)", level: "Core Chapter", duration: 25, topic: "Accounting" },
  { title: "Corporate Veil & Salomon vs Salomon Doctrine", course: "Business Law (DSC-2)", level: "Exam Focus", duration: 20, topic: "Law" },
  { title: "GST Input Tax Credit Blocked Credits Sec 17(5)", course: "B.Com Sem 6 (DSC-16)", level: "High Yield", duration: 30, topic: "Taxation" },
]

const achievements: Achievement[] = [
  { name: "Pioneer Scholar", emoji: "🏅", category: "Account Setup" },
  { name: "Accounting Ninja", emoji: "📊", category: "DSC-1 Mastery" },
  { name: "7-Day Fire", emoji: "🔥", category: "Consistency" },
  { name: "Legal Eagle", emoji: "⚖️", category: "Law & Sections" },
  { name: "Tax Savvy", emoji: "💰", category: "GST & Direct Tax" },
  { name: "AI Doubt Buster", emoji: "🤖", category: "25+ Questions" },
  { name: "Grand Scholar", emoji: "🏆", category: "100+ Hours" },
  { name: "Flawless Score", emoji: "⭐", category: "100% in Quiz" },
]

function getGreeting(hour: number): string {
  if (hour < 12) return "Good Morning"
  if (hour < 17) return "Good Afternoon"
  return "Good Evening"
}

// Daily Goal Radial Ring
function DailyGoalRing({ current, target }: { current: number; target: number }) {
  const percentage = Math.min(100, Math.round((current / target) * 100))
  const circumference = 2 * Math.PI * 38
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="relative flex items-center justify-center">
        <svg width="104" height="104" viewBox="0 0 100 100" className="-rotate-90">
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="7"
          />
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">
            {current}m
          </span>
          <span className="text-[10px] font-semibold text-[hsl(var(--muted-foreground))]">
            / {target}m
          </span>
        </div>
      </div>
      <div className="text-center mt-2">
        <p className="text-xs font-bold text-[hsl(var(--foreground))]">Daily Study Goal</p>
        <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          {percentage}% Complete Today
        </p>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("Good Day")
  const [dateString, setDateString] = useState("Today")

  useEffect(() => {
    const now = new Date()
    const hour = now.getHours()
    setGreeting(getGreeting(hour))
    setDateString(
      now.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    )
  }, [])

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-fade-in">
      {/* 1. HERO BANNER: Ultimate Modern Gradient Mesh */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white p-6 sm:p-8 shadow-2xl border border-white/10">
        {/* Ambient background blur elements */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold tracking-wide uppercase border border-white/20">
                PRSU B.Com & Professional Suite
              </span>
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-semibold border border-amber-400/30">
                <Flame className="h-3 w-3 fill-amber-400 text-amber-400" />
                7-Day Streak Active
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              {greeting}, Rahul! 🚀
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              {dateString} &bull; Your autonomous academic engine is active with 34 PRSU B.Com papers & CA syllabus.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <Button
                asChild
                className="bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all btn-tactile text-xs sm:text-sm"
              >
                <Link href="/courses?inst=prsu&level=prsu-bcom-sem1">
                  Continue B.Com Sem 1
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-white/10 border-white/25 text-white hover:bg-white/20 font-semibold rounded-xl text-xs sm:text-sm backdrop-blur-md"
              >
                <Link href="/ai-tutor">
                  <Bot className="h-3.5 w-3.5 mr-1.5 text-cyan-300" />
                  Ask AI Tutor
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Snapshot Badge */}
          <div className="grid grid-cols-2 gap-3 shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
            <div className="text-center p-2 rounded-xl bg-white/5">
              <p className="text-xl sm:text-2xl font-black text-white">34</p>
              <p className="text-[10px] font-medium text-blue-200">B.Com Papers</p>
            </div>
            <div className="text-center p-2 rounded-xl bg-white/5">
              <p className="text-xl sm:text-2xl font-black text-emerald-300">170</p>
              <p className="text-[10px] font-medium text-blue-200">Curated Chapters</p>
            </div>
            <div className="text-center p-2 rounded-xl bg-white/5">
              <p className="text-xl sm:text-2xl font-black text-amber-300">3,420</p>
              <p className="text-[10px] font-medium text-blue-200">Total XP</p>
            </div>
            <div className="text-center p-2 rounded-xl bg-white/5">
              <p className="text-xl sm:text-2xl font-black text-cyan-300">100%</p>
              <p className="text-[10px] font-medium text-blue-200">NEP Aligned</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. UNIFIED ACADEMIC INTELLIGENCE HUBS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-[hsl(var(--foreground))] flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Unified Academic Intelligence Hubs
            </h2>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Advanced statutory tracking, private document vault, real exam simulator & career pathways
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/amendments"
            className="p-4 rounded-3xl glass-panel border border-amber-500/30 hover:border-amber-500 bg-gradient-to-br from-amber-950/15 via-[hsl(var(--card))] to-[hsl(var(--card))] shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <Scale className="h-5 w-5" />
                </span>
                <Badge variant="outline" className="text-[10px] font-bold border-amber-500/30 text-amber-500">
                  Live Gazettes
                </Badge>
              </div>
              <h3 className="text-sm font-black text-[hsl(var(--foreground))] group-hover:text-amber-500 transition-colors">
                Statutory Amendment Tracker
              </h3>
              <p className="text-[11px] text-[hsl(var(--muted-foreground))] line-clamp-2">
                Finance Act 2024, BNS 2023, Ind AS 116 side-by-side comparison & syllabus impact.
              </p>
            </div>
            <div className="pt-3 border-t border-[hsl(var(--border))] flex items-center justify-between text-xs font-bold text-amber-500 mt-3">
              <span>View Comparisons</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/vault"
            className="p-4 rounded-3xl glass-panel border border-indigo-500/30 hover:border-indigo-500 bg-gradient-to-br from-indigo-950/15 via-[hsl(var(--card))] to-[hsl(var(--card))] shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Library className="h-5 w-5" />
                </span>
                <Badge variant="outline" className="text-[10px] font-bold border-indigo-500/30 text-indigo-400">
                  OCR Engine
                </Badge>
              </div>
              <h3 className="text-sm font-black text-[hsl(var(--foreground))] group-hover:text-indigo-400 transition-colors">
                Notes & Knowledge Vault
              </h3>
              <p className="text-[11px] text-[hsl(var(--muted-foreground))] line-clamp-2">
                Handwritten notes OCR scanner, vector memory, study flashcards & private AI recall.
              </p>
            </div>
            <div className="pt-3 border-t border-[hsl(var(--border))] flex items-center justify-between text-xs font-bold text-indigo-400 mt-3">
              <span>Open Vault</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/exam-simulator"
            className="p-4 rounded-3xl glass-panel border border-blue-500/30 hover:border-blue-500 bg-gradient-to-br from-blue-950/15 via-[hsl(var(--card))] to-[hsl(var(--card))] shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Award className="h-5 w-5" />
                </span>
                <Badge variant="outline" className="text-[10px] font-bold border-blue-500/30 text-blue-400">
                  180 Min Timed
                </Badge>
              </div>
              <h3 className="text-sm font-black text-[hsl(var(--foreground))] group-hover:text-blue-400 transition-colors">
                Authentic Exam Simulator
              </h3>
              <p className="text-[11px] text-[hsl(var(--muted-foreground))] line-clamp-2">
                Official exam conditions, negative marking, step-by-step numerical working & AI rubric marks.
              </p>
            </div>
            <div className="pt-3 border-t border-[hsl(var(--border))] flex items-center justify-between text-xs font-bold text-blue-400 mt-3">
              <span>Simulate Exam</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/career"
            className="p-4 rounded-3xl glass-panel border border-emerald-500/30 hover:border-emerald-500 bg-gradient-to-br from-emerald-950/15 via-[hsl(var(--card))] to-[hsl(var(--card))] shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Briefcase className="h-5 w-5" />
                </span>
                <Badge variant="outline" className="text-[10px] font-bold border-emerald-500/30 text-emerald-400">
                  Executive AI
                </Badge>
              </div>
              <h3 className="text-sm font-black text-[hsl(var(--foreground))] group-hover:text-emerald-400 transition-colors">
                Career Roadmap AI
              </h3>
              <p className="text-[11px] text-[hsl(var(--muted-foreground))] line-clamp-2">
                Qualification to CFO pathways, salary bands, articleship milestones & partner mock interviews.
              </p>
            </div>
            <div className="pt-3 border-t border-[hsl(var(--border))] flex items-center justify-between text-xs font-bold text-emerald-400 mt-3">
              <span>Explore Pathways</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* 3. B.COM 6-SEMESTER NEP-2020 QUICK LAUNCHPAD */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-[hsl(var(--foreground))] flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              PRSU B.Com Semester Hub (NEP-2020)
            </h2>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Direct access to all 6 semesters, 34 papers & 170 structured chapters
            </p>
          </div>
          <Link
            href="/courses?inst=prsu"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            All Papers <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BCOM_SEMESTERS.map((item, idx) => (
            <Link
              key={item.sem}
              href={item.href}
              className="group p-3.5 rounded-2xl glass-panel border border-[hsl(var(--border))] hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md text-white bg-gradient-to-r ${item.color}`}>
                    {item.sem}
                  </span>
                  <span className="text-[10px] font-bold text-[hsl(var(--muted-foreground))]">
                    Sem {idx + 1}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-[hsl(var(--foreground))] group-hover:text-primary transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))] mt-1 line-clamp-1">
                  {item.papers}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-primary pt-2 border-t border-[hsl(var(--border))]">
                <span>Enter</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. ACTIVE COURSES & PROGRESS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[hsl(var(--foreground))] flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Continue Learning
          </h2>
          <Link href="/courses" className="text-xs font-semibold text-primary hover:underline">
            View All Courses &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`interactive-card p-4 rounded-2xl glass-panel border border-[hsl(var(--border))] ${course.accentBorder} flex flex-col justify-between`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm text-[hsl(var(--foreground))] line-clamp-1">
                    {course.name}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${course.badgeColor}`}>
                    {course.institution}
                  </span>
                </div>

                <div className="text-xs text-[hsl(var(--muted-foreground))]">
                  <p className="font-medium text-[hsl(var(--foreground))]">{course.subject}</p>
                  <p className="text-[11px] mt-0.5">Chapter {course.currentChapter} of {course.totalChapters}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[hsl(var(--muted-foreground))]">Syllabus Covered</span>
                    <span className="font-bold text-primary">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-[hsl(var(--muted))] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[hsl(var(--muted)/0.5)] border border-[hsl(var(--border))]">
                  <p className="text-[10px] text-[hsl(var(--muted-foreground))] font-medium uppercase tracking-wider">
                    Next Lesson
                  </p>
                  <p className="text-xs font-semibold text-[hsl(var(--foreground))] line-clamp-1 mt-0.5">
                    {course.nextLesson}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[hsl(var(--border))]">
                <Button
                  size="sm"
                  asChild
                  className="w-full h-8 text-xs font-semibold rounded-xl btn-tactile cursor-pointer"
                >
                  <Link href={course.href}>
                    Resume Learning
                    <ArrowRight className="h-3 w-3 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. TODAY'S ENGAGEMENT & STATS */}
      <div className="space-y-3">
        <h2 className="text-lg font-extrabold text-[hsl(var(--foreground))] flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Today&apos;s Velocity & Milestones
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Daily Goal Dial */}
          <div className="md:col-span-1 rounded-2xl glass-panel border border-[hsl(var(--border))] p-4 flex items-center justify-center shadow-xs">
            <DailyGoalRing current={45} target={120} />
          </div>

          {/* 4 Gamified Stats */}
          <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.label}
                  className="rounded-2xl glass-panel border border-[hsl(var(--border))] p-4 flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-xl ${s.bgGlow} ${s.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      +14%
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-xl sm:text-2xl font-black text-[hsl(var(--foreground))] tracking-tight">
                      {s.value}
                    </p>
                    <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] mt-0.5">
                      {s.label}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 5. SPLIT: RECENT ACTIVITY & UPCOMING ASSESSMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className="rounded-2xl glass-panel border border-[hsl(var(--border))] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <h3 className="font-bold text-sm text-[hsl(var(--foreground))]">Recent Academic Activity</h3>
            </div>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">Real-time sync</span>
          </div>

          <div className="space-y-3">
            {recentActivity.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[hsl(var(--muted)/0.5)] transition-colors">
                <div className="mt-0.5 p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[hsl(var(--foreground))] truncate">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5">
                    <span>{item.course}</span>
                    <span>&bull;</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Mock Tests & Papers */}
        <div className="rounded-2xl glass-panel border border-[hsl(var(--border))] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              <h3 className="font-bold text-sm text-[hsl(var(--foreground))]">Upcoming Assessments & Mocks</h3>
            </div>
            <Link href="/tests" className="text-xs font-semibold text-primary hover:underline">
              Test Center &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingTests.map((test, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[hsl(var(--foreground))] truncate">
                    {test.name}
                  </p>
                  <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5">
                    {test.date}
                  </p>
                </div>
                <Badge
                  variant={test.status === "urgent" ? "destructive" : "secondary"}
                  className="shrink-0 text-[10px] font-bold"
                >
                  {test.status === "urgent" ? "Priority" : "Scheduled"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. AI RECOMMENDED SMART LESSONS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-[hsl(var(--foreground))] flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              AI Recommended Deep-Dives
            </h2>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Tailored high-yield chapters based on your syllabus performance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedLessons.map((lesson, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl glass-panel border border-[hsl(var(--border))] hover:border-primary/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="text-[10px] font-bold">
                    {lesson.level}
                  </Badge>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[hsl(var(--muted-foreground))]">
                    <Clock className="h-3 w-3" />
                    {lesson.duration} mins
                  </span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-[hsl(var(--foreground))] line-clamp-2">
                  {lesson.title}
                </h4>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  {lesson.course} &bull; {lesson.topic}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[hsl(var(--border))]">
                <Button
                  size="sm"
                  asChild
                  className="w-full text-xs font-semibold rounded-xl btn-tactile cursor-pointer"
                >
                  <Link href="/ai-tutor">
                    <Bot className="h-3.5 w-3.5 mr-1.5" />
                    Study with AI Tutor
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. ACHIEVEMENTS: 8 UNLOCKED MEDALS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[hsl(var(--foreground))] flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Academic Honours & Badges
          </h2>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            8 / 8 Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl glass-panel border border-[hsl(var(--border))] flex flex-col items-center text-center gap-1.5 hover:scale-105 transition-all group"
            >
              <span className="text-3xl filter drop-shadow-md group-hover:scale-110 transition-transform">
                {item.emoji}
              </span>
              <p className="text-xs font-bold text-[hsl(var(--foreground))] leading-tight line-clamp-1">
                {item.name}
              </p>
              <span className="text-[9px] text-[hsl(var(--muted-foreground))]">
                {item.category}
              </span>
              <CheckCircle2 className="h-3 w-3 text-emerald-500 mt-0.5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
