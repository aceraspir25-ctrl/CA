"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  findSubjectPaperById,
  INSTITUTIONS_DATA,
  SubjectPaper,
  CourseLevel,
  Institution,
  Chapter
} from "@/data/coursesData"
import { getChapterLessonData } from "@/data/chapterContentData"
import {
  getExtractedVideoForChapter,
  getLatestExtractedVideoForPaper
} from "@/data/extractedVideosData"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  Languages,
  AlertTriangle,
  Lightbulb,
  FileSpreadsheet,
  BookMarked,
  HelpCircle,
  Bot,
  Share2,
  ChevronRight,
  Check,
  Play,
  ExternalLink,
  Video
} from "lucide-react"

// Robust fallback finder
function resolveSubjectData(id: string) {
  if (typeof findSubjectPaperById === "function") {
    const res = findSubjectPaperById(id)
    if (res) return res
  }
  for (const inst of INSTITUTIONS_DATA) {
    for (const lvl of inst.levels) {
      if (lvl.papers) {
        const found = lvl.papers.find((p) => p.id === id)
        if (found) return { paper: found, level: lvl, institution: inst }
      }
      if (lvl.groups) {
        for (const grp of lvl.groups) {
          const found = grp.papers.find((p) => p.id === id)
          if (found) return { paper: found, level: lvl, institution: inst }
        }
      }
    }
  }
  return null
}

function SubjectDetailsContent() {
  const params = useParams()
  const router = useRouter()
  const { markTopicStudied, activeLanguage } = useAppStore()

  const paperId = params?.id as string

  // Find subject paper, parent level & institution
  const subjectData = useMemo(() => {
    if (!paperId) return null
    return resolveSubjectData(paperId)
  }, [paperId])

  const [activeChapterIndex, setActiveChapterIndex] = useState(0)
  const [lessonLang, setLessonLang] = useState<"en" | "hi" | "hinglish">("hinglish")
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({})
  const [copiedLink, setCopiedLink] = useState(false)

  // Scroll to top immediately when chapter changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [activeChapterIndex])

  if (!subjectData) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <div className="p-4 rounded-full bg-amber-500/10 text-amber-500 w-16 h-16 mx-auto flex items-center justify-center">
          <BookOpen className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Subject Not Found</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Subject ID &ldquo;{paperId}&rdquo; was not found in the official curriculum database.
        </p>
        <Button asChild className="rounded-xl">
          <Link href="/courses">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Subjects & Semesters
          </Link>
        </Button>
      </div>
    )
  }

  const { paper, level, institution } = subjectData
  const chapters = paper.chapters || []
  const currentChapter: Chapter | undefined = chapters[activeChapterIndex] || chapters[0]

  const extractedVideo = useMemo(() => {
    if (!paper) return undefined
    if (currentChapter) {
      return getExtractedVideoForChapter(paper.id, currentChapter.id) || getLatestExtractedVideoForPaper(paper.id)
    }
    return getLatestExtractedVideoForPaper(paper.id)
  }, [paper, currentChapter])

  const lesson = currentChapter
    ? getChapterLessonData(currentChapter.id, currentChapter.title, currentChapter.hindiTitle)
    : null

  const handleNextChapter = () => {
    if (activeChapterIndex < chapters.length - 1) {
      setActiveChapterIndex((prev) => prev + 1)
    }
  }

  const handlePrevChapter = () => {
    if (activeChapterIndex > 0) {
      setActiveChapterIndex((prev) => prev - 1)
    }
  }

  const toggleChapterComplete = (chId: string) => {
    setCompletedChapters((prev) => {
      const next = !prev[chId]
      if (next && currentChapter) {
        markTopicStudied({
          id: currentChapter.id,
          title: currentChapter.title,
          course: level.shortTitle,
          levelAchieved: currentChapter.levels.max,
        })
      }
      return { ...prev, [chId]: next }
    })
  }

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* 1. TOP BREADCRUMB & ACTION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/courses?inst=${institution.id}&level=${level.id}`)}
          className="gap-2 self-start rounded-xl text-xs font-semibold hover:bg-[hsl(var(--muted))] active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {level.shortTitle}
        </Button>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="gap-1.5 rounded-xl text-xs font-semibold cursor-pointer active:scale-95"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
            {copiedLink ? "Link Copied!" : "Share Subject"}
          </Button>

          <Button
            asChild
            size="sm"
            className="gap-1.5 rounded-xl text-xs font-bold btn-tactile cursor-pointer"
          >
            <Link href={`/ai-tutor?prompt=${encodeURIComponent(`I am studying ${paper.title} (${currentChapter?.title || ""}). Please explain key concepts and exam questions.`)}`}>
              <Bot className="h-3.5 w-3.5 text-cyan-300" />
              Ask AI Tutor
            </Link>
          </Button>
        </div>
      </div>

      {/* 2. SUBJECT HERO CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold tracking-wide uppercase border border-white/20">
              {institution.shortName} &bull; {level.shortTitle}
            </span>
            <Badge className="bg-primary text-primary-foreground font-extrabold text-xs">
              Paper {paper.paperNumber}
            </Badge>
            <Badge variant="outline" className="text-white border-white/30 text-xs font-semibold">
              {paper.marks} Marks
            </Badge>
            <Badge variant="outline" className="text-emerald-300 border-emerald-400/30 text-xs font-semibold">
              {chapters.length} Structured Chapters
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
            {paper.title}
          </h1>

          <p className="text-blue-200 text-xs sm:text-sm max-w-3xl leading-relaxed">
            {paper.description}
          </p>
        </div>
      </div>

      {/* 3. CHAPTER SELECTOR TABS (IMMEDIATE ACCESS — ZERO SCROLLING) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
            Select Chapter to Read ({activeChapterIndex + 1} of {chapters.length}):
          </p>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {Object.values(completedChapters).filter(Boolean).length}/{chapters.length} Completed
          </span>
        </div>

        <div className="glass-panel p-2 rounded-2xl border border-[hsl(var(--border))] flex items-center gap-2 overflow-x-auto no-scrollbar shadow-xs">
          {chapters.map((ch, idx) => {
            const isActive = idx === activeChapterIndex
            const isDone = completedChapters[ch.id]

            return (
              <button
                key={ch.id}
                onClick={() => setActiveChapterIndex(idx)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-2 active:scale-95 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md font-black"
                    : isDone
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
                }`}
              >
                <span>Ch {ch.number}. {ch.title}</span>
                {isDone ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                ) : (
                  <span className="text-[10px] opacity-70 shrink-0">({ch.estimatedHours}h)</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* 4. ACTIVE CHAPTER CONTENT STUDIO (FULLY VISIBLE RIGHT AT TOP) */}
      {currentChapter && lesson && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="rounded-3xl glass-panel border-2 border-primary/40 p-6 shadow-xl space-y-6">
            {/* Chapter Header & Language Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[hsl(var(--border))] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary text-primary-foreground font-black text-xs">
                    Chapter {currentChapter.number} of {chapters.length}
                  </Badge>
                  <Badge variant="outline" className="text-xs font-semibold">
                    Lvl {currentChapter.levels.min}–{currentChapter.levels.max}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] font-semibold">
                    <Clock className="h-3.5 w-3.5" />
                    {currentChapter.estimatedHours} Hours
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-[hsl(var(--foreground))] mt-1">
                  {currentChapter.title}
                </h2>
                <p className="text-sm font-semibold text-primary">
                  {currentChapter.hindiTitle}
                </p>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] shrink-0 self-start sm:self-auto">
                <Languages className="h-4 w-4 text-primary ml-1" />
                {(["en", "hi", "hinglish"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLessonLang(lang)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      lessonLang === lang
                        ? "bg-primary text-primary-foreground shadow-xs font-extrabold"
                        : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                    }`}
                  >
                    {lang === "en" ? "English" : lang === "hi" ? "हिन्दी" : "Hinglish"}
                  </button>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="p-4 rounded-2xl bg-[hsl(var(--muted)/0.4)] border border-[hsl(var(--border))]">
              <p className="text-xs sm:text-sm text-[hsl(var(--foreground))] leading-relaxed">
                {lesson.overview}
              </p>
            </div>

            {/* EXTRACTED YOUTUBE VIDEO LECTURE PLAYER */}
            {extractedVideo && (
              <div className="rounded-3xl overflow-hidden border-2 border-red-500/30 bg-gradient-to-br from-red-950/20 via-[hsl(var(--card))] to-[hsl(var(--card))] p-5 space-y-3.5 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
                      <Play className="h-4 w-4 fill-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-red-500">
                          {extractedVideo.detectionMode === "user_specified" ? "Linked Video Lecture" : "AI Auto-Classified Lecture"}
                        </span>
                        <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] py-0 px-1.5 font-bold">
                          Live Active
                        </Badge>
                      </div>
                      <h3 className="text-sm sm:text-base font-black text-[hsl(var(--foreground))] line-clamp-1 mt-0.5">
                        {extractedVideo.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Badge variant="outline" className="text-xs font-semibold border-red-500/30 text-red-400">
                      Channel: {extractedVideo.author}
                    </Badge>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs font-bold gap-1 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 active:scale-95 cursor-pointer"
                    >
                      <a href={extractedVideo.videoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Watch on YT
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Responsive 16:9 Iframe Player */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/80 border border-[hsl(var(--border))] shadow-inner">
                  <iframe
                    src={`${extractedVideo.embedUrl}?rel=0&modestbranding=1`}
                    title={extractedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-[hsl(var(--muted-foreground))] pt-1">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="h-4 w-4" />
                    23-Point Deep Study Notes, Solved Numericals & MCQs Synthesized Below
                  </span>
                  <span className="text-[11px] font-semibold opacity-75">
                    Course Mapped: {extractedVideo.targetLevelTitle} &bull; Ch {currentChapter?.number || 1}
                  </span>
                </div>
              </div>
            )}

            {/* 23-Point Deep Learning Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Module 1: ELI10 (Intuitive Explanation) */}
              <div className="p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  Point 4: Explain Like I&apos;m 10 (ELI10 Intuition)
                </h4>
                <p className="text-xs sm:text-sm text-[hsl(var(--foreground))] leading-relaxed">
                  {lesson.eli10[lessonLang]}
                </p>
              </div>

              {/* Module 2: Statutory & Standards Framework */}
              <div className="p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                  Point 7 & 17: Statutory Rules, Standards & Legal Sections
                </h4>
                <div className="text-xs sm:text-sm text-[hsl(var(--foreground))] space-y-1 leading-relaxed">
                  <p><strong>Standards:</strong> {lesson.statutoryContext.standards}</p>
                  <p><strong>Legal Sections:</strong> {lesson.statutoryContext.sections}</p>
                  <p><strong>Provisions:</strong> {lesson.statutoryContext.provisions}</p>
                </div>
              </div>

              {/* Module 3: Practical Solved Numerical & Journal */}
              <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-2.5 md:col-span-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4 text-amber-600" />
                  Point 13 & 14: Practical Solved Numerical & Journal Entries
                </h4>
                <p className="text-xs sm:text-sm text-[hsl(var(--foreground))] font-bold">
                  {lesson.practicalIllustration.problemStatement}
                </p>
                <div className="text-xs text-[hsl(var(--foreground))] space-y-1">
                  {lesson.practicalIllustration.solutionSteps.map((step, idx) => (
                    <p key={idx} className="leading-relaxed">{step}</p>
                  ))}
                </div>
                {lesson.practicalIllustration.journalEntries && (
                  <div className="mt-3 p-3 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] font-mono text-xs space-y-1.5 shadow-xs">
                    {lesson.practicalIllustration.journalEntries.map((je, i) => (
                      <div key={i} className="flex justify-between items-center py-0.5 border-b border-[hsl(var(--border)/0.4)] last:border-0">
                        <span className="truncate pr-2">{je.particulars}</span>
                        <span className="font-bold shrink-0">{je.debit || je.credit}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Module 4: Exam Pitfalls & Mistakes */}
              <div className="p-5 rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-600" />
                  Point 18: Common Exam Traps & Mistakes
                </h4>
                <ul className="text-xs sm:text-sm text-[hsl(var(--foreground))] list-disc list-inside space-y-1 leading-relaxed">
                  {lesson.commonMistakes.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
                <div className="mt-3 pt-2.5 border-t border-rose-500/20 text-xs font-bold text-rose-600 dark:text-rose-400">
                  💡 Memory Shortcut: {lesson.memoryTrick}
                </div>
              </div>

              {/* Module 5: Quick Self-Assessment Check */}
              <div className="p-5 rounded-2xl glass-panel border border-[hsl(var(--border))] space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-[hsl(var(--foreground))] flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Point 23: Quick Self-Assessment Check
                </h4>
                <div className="space-y-2 text-xs">
                  {lesson.practiceQuestions.map((pq, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] space-y-1">
                      <p className="font-bold text-[hsl(var(--foreground))]">Q: {pq.q}</p>
                      <p className="text-[hsl(var(--muted-foreground))]">A: {pq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[hsl(var(--border))]">
              <div className="flex flex-wrap items-center gap-2.5">
                <Button
                  onClick={() => toggleChapterComplete(currentChapter.id)}
                  className={`gap-2 text-xs font-bold rounded-xl btn-tactile cursor-pointer ${
                    completedChapters[currentChapter.id]
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {completedChapters[currentChapter.id] ? "Completed (Studied)" : "Mark Chapter Completed (+50 XP)"}
                </Button>

                <Button asChild variant="outline" className="gap-2 text-xs font-semibold rounded-xl cursor-pointer">
                  <Link href={`/ai-tutor?prompt=${encodeURIComponent(`Explain ${currentChapter.title} in detail with step-by-step practical examples for examination.`)}`}>
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    Ask AI Tutor
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevChapter}
                  disabled={activeChapterIndex === 0}
                  className="rounded-xl text-xs font-bold gap-1 cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Previous
                </Button>

                <Button
                  size="sm"
                  onClick={handleNextChapter}
                  disabled={activeChapterIndex >= chapters.length - 1}
                  className="rounded-xl text-xs font-bold gap-1 btn-tactile cursor-pointer"
                >
                  Next Chapter <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SubjectDetailsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto py-12 px-4 text-center space-y-3">
        <div className="h-8 w-48 bg-[hsl(var(--muted))] animate-pulse rounded-xl mx-auto" />
        <p className="text-xs text-[hsl(var(--muted-foreground))]">Loading Subject Studio & Chapters...</p>
      </div>
    }>
      <SubjectDetailsContent />
    </Suspense>
  )
}
