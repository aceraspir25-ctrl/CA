"use client"

import { useState, useEffect, useMemo } from "react"
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
  Lock,
  Star,
  Calendar,
  Activity,
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
  color: string
  borderColor: string
  badgeColor: string
  href: string
}

interface StatBox {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  color: string
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
}

interface RecommendedLesson {
  title: string
  course: string
  level: string
  duration: number
}

interface Achievement {
  name: string
  emoji: string
  unlocked: boolean
}

// --- Mock Data ---
const courses: CourseCard[] = [
  {
    id: "ca-foundation",
    name: "CA Foundation",
    institution: "ICAI",
    progress: 35,
    nextLesson: "Journal Entries",
    subject: "Accounting",
    currentChapter: 4,
    totalChapters: 12,
    color: "bg-blue-50 dark:bg-blue-950/40",
    borderColor: "border-t-4 border-t-blue-500",
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    href: "/courses?inst=icai&level=ca-foundation",
  },
  {
    id: "cma-foundation",
    name: "CMA Foundation",
    institution: "ICMAI",
    progress: 20,
    nextLesson: "Cost Concepts",
    subject: "Paper 1",
    currentChapter: 2,
    totalChapters: 10,
    color: "bg-green-50 dark:bg-green-950/40",
    borderColor: "border-t-4 border-t-green-500",
    badgeColor: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    href: "/courses?inst=icmai&level=cma-foundation",
  },
  {
    id: "cs-cseet",
    name: "CS CSEET",
    institution: "ICSI",
    progress: 10,
    nextLesson: "Business Communication Basics",
    subject: "Paper 1",
    currentChapter: 1,
    totalChapters: 8,
    color: "bg-purple-50 dark:bg-purple-950/40",
    borderColor: "border-t-4 border-t-purple-500",
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    href: "/courses?inst=icsi&level=cs-cseet",
  },
  {
    id: "bcom-sem5",
    name: "B.Com Sem 5",
    institution: "PRSU",
    progress: 65,
    nextLesson: "Capital Budgeting",
    subject: "Finance",
    currentChapter: 7,
    totalChapters: 10,
    color: "bg-orange-50 dark:bg-orange-950/40",
    borderColor: "border-t-4 border-t-orange-500",
    badgeColor: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    href: "/courses?inst=prsu&level=prsu-bcom-sem5",
  },
]

const stats: StatBox[] = [
  { label: "Total Study Hours", value: "24h", icon: Clock, color: "text-blue-500" },
  { label: "Chapters Done", value: "15", icon: CheckCircle2, color: "text-green-500" },
  { label: "Tests Taken", value: "8", icon: ClipboardList, color: "text-purple-500" },
  { label: "Streak", value: "7 days 🔥", icon: Flame, color: "text-orange-500" },
]

const recentActivity: ActivityItem[] = [
  { type: "study", title: "Accounting Equation", course: "CA Foundation", time: "2h ago" },
  { type: "bookmark", title: "Depreciation Methods", course: "CA Intermediate", time: "Yesterday" },
  { type: "quiz", title: "Chapter 1 Quiz (85%)", course: "CA Foundation", time: "3 days ago" },
]

const upcomingTests: UpcomingTest[] = [
  { name: "CA Foundation Mock 1", date: "Tomorrow" },
  { name: "CMA Chapter 2 Quiz", date: "In 3 days" },
  { name: "CS CSEET Practice", date: "Next week" },
]

const recommendedLessons: RecommendedLesson[] = [
  { title: "Golden Rules of Accounting", course: "CA Foundation", level: "Beginner", duration: 25 },
  { title: "Elements of Cost", course: "CMA Foundation", level: "Beginner", duration: 20 },
  { title: "Introduction to Company Law", course: "CS CSEET", level: "Beginner", duration: 30 },
]

const achievements: Achievement[] = [
  { name: "First Login", emoji: "🏅", unlocked: true },
  { name: "First Lesson", emoji: "📖", unlocked: true },
  { name: "7-Day Streak", emoji: "🔥", unlocked: true },
  { name: "Quiz Master", emoji: "🧠", unlocked: true },
  { name: "Chapter Champion", emoji: "🏆", unlocked: false },
  { name: "Subject Expert", emoji: "🎓", unlocked: false },
  { name: "Month Warrior", emoji: "⚔️", unlocked: false },
  { name: "Top Scorer", emoji: "⭐", unlocked: false },
]

function getGreeting(hour: number): string {
  if (hour < 12) return "Good Morning"
  if (hour < 17) return "Good Afternoon"
  return "Good Evening"
}

function getActivityIcon(type: ActivityItem["type"]) {
  switch (type) {
    case "study": return <BookOpen className="h-4 w-4 text-blue-500" />
    case "bookmark": return <BookMarked className="h-4 w-4 text-purple-500" />
    case "quiz": return <Star className="h-4 w-4 text-yellow-500" />
  }
}

// Daily Goal SVG arc
function DailyGoalRing({
  current,
  target,
}: {
  current: number
  target: number
}) {
  const percentage = Math.min(100, (current / target) * 100)
  const circumference = 2 * Math.PI * 42
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <svg width="120" height="120" viewBox="0 0 100 100" className="-rotate-90">
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
          />
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-[hsl(var(--foreground))]">
            {current}m
          </span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            / {target}m
          </span>
        </div>
      </div>
      <p className="text-sm font-medium text-[hsl(var(--foreground))]">Daily Goal</p>
      <p className="text-xs text-[hsl(var(--muted-foreground))]">
        {Math.round(percentage)}% complete
      </p>
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* A. Welcome Banner */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">
                {greeting}, Rahul! 👋
              </h1>
              <p className="text-blue-100 text-sm">
                {dateString} &nbsp;|&nbsp; 🔥 7-day study streak
              </p>
              <p className="text-blue-50 italic text-sm mt-2">
                &ldquo;Consistency is the key to mastery. Keep going!&rdquo;
              </p>
            </div>
            <Button
              variant="outline"
              asChild
              className="bg-white text-blue-700 border-white hover:bg-blue-50 hover:text-blue-800 gap-2 self-start md:self-auto cursor-pointer"
            >
              <Link href="/courses">
                Continue Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* B. Course Progress Cards */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-[hsl(var(--foreground))]">My Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <Card
              key={course.id}
              className={`${course.borderColor} ${course.color} hover:shadow-md transition-shadow`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm font-semibold">{course.name}</CardTitle>
                  <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${course.badgeColor}`}>
                    {course.institution}
                  </span>
                </div>
                <CardDescription className="text-xs mt-1">
                  Ch {course.currentChapter}/{course.totalChapters} • {course.subject}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Progress value={course.progress} showLabel />
                </div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  Next: <span className="font-medium text-[hsl(var(--foreground))]">{course.nextLesson}</span>
                </p>
                <Button size="sm" variant="outline" asChild className="w-full text-xs h-7 gap-1 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                  <Link href={course.href}>
                    Continue <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* C. Daily Goals & Stats */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-[hsl(var(--foreground))]">Today&apos;s Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Daily Goal Ring */}
          <Card className="md:col-span-1 flex items-center justify-center p-4">
            <CardContent className="p-0">
              <DailyGoalRing current={45} target={120} />
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                    <div className={`p-2 rounded-full bg-[hsl(var(--muted))] ${stat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-2xl font-bold text-[hsl(var(--foreground))]">
                      {stat.value}
                    </span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))] leading-tight">
                      {stat.label}
                    </span>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* D. Recent Activity + Upcoming Tests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i}>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded-full bg-[hsl(var(--muted))]">
                    {getActivityIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      {item.course} • {item.time}
                    </p>
                  </div>
                </div>
                {i < recentActivity.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Tests */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              Upcoming Tests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTests.map((test, i) => (
              <div key={i}>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{test.name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{test.date}</p>
                  </div>
                  <Badge variant={i === 0 ? "destructive" : i === 1 ? "warning" : "secondary"}>
                    {test.date}
                  </Badge>
                </div>
                {i < upcomingTests.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
            <div className="pt-2">
              <Button size="sm" variant="outline" asChild className="w-full text-xs gap-1 cursor-pointer">
                <Link href="/tests">
                  Go to Assessment Center <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* E. Recommended Next Lessons */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-[hsl(var(--foreground))]">Recommended Next Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedLessons.map((lesson, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-[hsl(var(--foreground))]">{lesson.title}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{lesson.course}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">{lesson.level}</Badge>
                  <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                    <Clock className="h-3 w-3" />
                    {lesson.duration} min
                  </span>
                </div>
                <Button size="sm" asChild className="w-full gap-1 cursor-pointer" variant="default">
                  <Link href={`/ai-tutor`}>
                    Start Lesson with AI <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* F. Achievements */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-[hsl(var(--foreground))]">Achievements</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {achievements.map((badge, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                badge.unlocked
                  ? "border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:shadow-md"
                  : "border-dashed border-[hsl(var(--border))] bg-[hsl(var(--muted))] opacity-50"
              }`}
            >
              <span className="text-2xl" role="img" aria-label={badge.name}>
                {badge.unlocked ? badge.emoji : "🔒"}
              </span>
              <span className="text-[10px] text-center font-medium text-[hsl(var(--muted-foreground))] leading-tight">
                {badge.name}
              </span>
              {badge.unlocked ? (
                <CheckCircle2 className="h-3 w-3 text-green-500" />
              ) : (
                <Lock className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-4" />
    </div>
  )
}
