"use client"

import Link from "next/link"
import { useState } from "react"
import {
  GraduationCap,
  Target,
  Bot,
  BookOpen,
  FlaskConical,
  BarChart2,
  Trophy,
  ArrowRight,
  Globe,
  Share2,
  MessageSquare,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const features = [
  {
    icon: Target,
    title: "Level 0–100 Progression",
    description: "From absolute basics to professional mastery. Structured learning path that takes you step by step.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/40",
  },
  {
    icon: Bot,
    title: "AI Personal Tutor",
    description: "24/7 doubt solving with step-by-step explanations. Your personal mentor available anytime.",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/40",
  },
  {
    icon: BookOpen,
    title: "Complete Curriculum",
    description: "CA, CMA, CS & B.Com official syllabuses covered fully. Always up to date with latest changes.",
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-950/40",
  },
  {
    icon: FlaskConical,
    title: "Practical Labs",
    description: "Accounting, Tax & Stock Market simulations. Learn by doing with real-world scenarios.",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/40",
  },
  {
    icon: BarChart2,
    title: "Smart Analytics",
    description: "Track your learning progress, identify weak areas, and get personalized study recommendations.",
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-950/40",
  },
  {
    icon: Trophy,
    title: "Assessments",
    description: "Chapter tests, mock exams, and performance review. Prepare thoroughly for your exams.",
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/40",
  },
]

const courseCards = [
  {
    name: "CA",
    fullName: "Chartered Accountancy",
    body: "ICAI",
    path: "Foundation → Intermediate → Final",
    desc: "Master accounting, law, taxation, and financial reporting under the ICAI official curriculum.",
    color: "border-t-blue-500",
    badge: "bg-blue-100 text-blue-700",
    href: "/courses?inst=icai&level=ca-foundation",
  },
  {
    name: "CMA",
    fullName: "Cost Management Accountancy",
    body: "ICMAI",
    path: "Foundation → Intermediate → Final",
    desc: "Learn cost accounting, management accounting, and financial management per ICMAI syllabus.",
    color: "border-t-green-500",
    badge: "bg-green-100 text-green-700",
    href: "/courses?inst=icmai&level=cma-foundation",
  },
  {
    name: "CS",
    fullName: "Company Secretary",
    body: "ICSI",
    path: "CSEET → Executive → Professional",
    desc: "Corporate law, governance, and secretarial practice as per ICSI official curriculum.",
    color: "border-t-purple-500",
    badge: "bg-purple-100 text-purple-700",
    href: "/courses?inst=icsi&level=cs-cseet",
  },
  {
    name: "B.Com",
    fullName: "Bachelor of Commerce",
    body: "PRSU",
    path: "Semester 1 – 6",
    desc: "Complete undergraduate commerce education following PRSU official university curriculum.",
    color: "border-t-orange-500",
    badge: "bg-orange-100 text-orange-700",
    href: "/courses?inst=prsu&level=prsu-bcom-sem1",
  },
]

const stats = [
  { value: "1000+", label: "Chapters" },
  { value: "100", label: "Learning Levels" },
  { value: "4", label: "Professional Courses" },
  { value: "AI", label: "Powered" },
]

export default function LandingPage() {
  const [email, setEmail] = useState("")

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background)/0.9)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-blue-600" />
            <span className="font-bold text-lg">EduFinance Pro</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#features" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Features</a>
            <a href="#courses" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Courses</a>
            <a href="#cta" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Get Started</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20">
        <div className="max-w-4xl mx-auto space-y-6">
          <Badge variant="secondary" className="text-sm px-4 py-1.5 rounded-full">
            🎓 India&apos;s Most Comprehensive Commerce Education Platform
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Master{" "}
            <span className="text-blue-600">CA, CMA, CS</span>
            <br />
            &amp; B.Com from Zero to Mastery
          </h1>

          <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            Structured learning with AI tutoring, visual explanations, practical labs and
            100-level progression system. Start from absolute zero, reach professional mastery.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" asChild className="gap-2">
              <Link href="/dashboard">
                Start Learning Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#courses">Explore Courses</Link>
            </Button>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 pt-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Everything You Need to Succeed</h2>
            <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
              A complete ecosystem for commerce education — from beginner to professional.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className={`${feature.bg} border-0 hover:shadow-md transition-shadow`}>
                  <CardHeader>
                    <div className={`p-2.5 rounded-lg w-fit bg-[hsl(var(--background))] ${feature.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-base mt-3">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section id="courses" className="py-20 px-4 bg-[hsl(var(--muted)/0.4)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Our Professional Courses</h2>
            <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
              All major commerce certifications under one roof with structured learning paths.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courseCards.map((course) => (
              <Card
                key={course.name}
                className={`border-t-4 ${course.color} hover:shadow-lg transition-shadow`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-xl">{course.name}</CardTitle>
                      <CardDescription className="text-base font-medium mt-0.5">
                        {course.fullName}
                      </CardDescription>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${course.badge}`}>
                      {course.body}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))] mt-1">
                    <span>{course.path}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">{course.desc}</p>
                  <Button variant="outline" className="gap-2" asChild>
                    <Link href={course.href}>
                      Explore {course.name} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Begin Your Journey Today</h2>
          <p className="text-[hsl(var(--muted-foreground))]">
            Join thousands of students mastering commerce with structured, AI-powered learning.
            Your professional career starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button className="shrink-0 gap-1">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Free forever • No credit card required • Start learning in minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--border))] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-blue-600" />
                <span className="font-bold">EduFinance Pro</span>
              </div>
              <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-xs">
                India&apos;s most comprehensive commerce education platform.
              </p>
              <div className="flex items-center gap-3">
                {[Globe, Share2, MessageSquare, Mail].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-2 rounded-full hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                    aria-label="Social link"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <nav className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              {[
                { title: "Platform", links: [{ label: "Features", href: "#features" }, { label: "Courses", href: "/courses" }, { label: "Dashboard", href: "/dashboard" }, { label: "AI Tutor", href: "/ai-tutor" }] },
                { title: "Courses", links: [{ label: "CA Foundation", href: "/courses?inst=icai&level=ca-foundation" }, { label: "CMA Foundation", href: "/courses?inst=icmai&level=cma-foundation" }, { label: "CS CSEET", href: "/courses?inst=icsi&level=cs-cseet" }, { label: "B.Com PRSU", href: "/courses?inst=prsu&level=prsu-bcom-sem1" }] },
                { title: "Practice Labs", links: [{ label: "Accounting Lab", href: "/lab" }, { label: "Taxation Lab", href: "/lab" }, { label: "Stock Market Lab", href: "/lab" }, { label: "BEP Costing", href: "/lab" }] },
                { title: "Exams & Library", links: [{ label: "Assessments", href: "/tests" }, { label: "Certifications", href: "/tests" }, { label: "Statutory Library", href: "/library" }, { label: "Progress Tracking", href: "/progress" }] },
              ].map((col) => (
                <div key={col.title}>
                  <h4 className="font-semibold mb-3 text-[hsl(var(--foreground))]">{col.title}</h4>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          <div className="mt-10 pt-6 border-t border-[hsl(var(--border))] text-center text-sm text-[hsl(var(--muted-foreground))]">
            © 2026 EduFinance Pro. All rights reserved. Made with ❤️ for Commerce Students of India.
          </div>
        </div>
      </footer>
    </div>
  )
}
