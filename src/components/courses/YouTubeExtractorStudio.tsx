"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Video,
  Play,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Check,
  ExternalLink,
  BookOpen,
  GraduationCap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { processYouTubeLectureUrl } from "@/lib/ai/youtubeContentExtractor"
import { ExtractedVideoRecord } from "@/data/extractedVideosData"

export function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

export default function YouTubeExtractorStudio() {
  const [urlInput, setUrlInput] = useState("")
  const [targetPreference, setTargetPreference] = useState("auto")
  const [isExtracting, setIsExtracting] = useState(false)
  const [extractedRecord, setExtractedRecord] = useState<ExtractedVideoRecord | null>(null)
  const [errorMsg, setErrorMsg] = useState("")

  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")
    setExtractedRecord(null)

    if (!urlInput.trim()) {
      setErrorMsg("Please enter or paste a valid YouTube video link.")
      return
    }

    setIsExtracting(true)

    // Build instruction prompt if specific course chosen
    let promptInstruction = urlInput
    if (targetPreference === "cma-inter") {
      promptInstruction = `cma intermediate direct taxation ${urlInput}`
    } else if (targetPreference === "ca-inter") {
      promptInstruction = `ca intermediate taxation ${urlInput}`
    } else if (targetPreference === "prsu-s1") {
      promptInstruction = `prsu bcom sem 1 accounting ${urlInput}`
    } else if (targetPreference === "prsu-s5") {
      promptInstruction = `prsu bcom sem 5 income tax ${urlInput}`
    } else if (targetPreference === "prsu-s6") {
      promptInstruction = `prsu bcom sem 6 gst ${urlInput}`
    }

    try {
      const res = await processYouTubeLectureUrl(urlInput, promptInstruction)
      setIsExtracting(false)

      if (res.success && res.record) {
        setExtractedRecord(res.record)
      } else {
        setErrorMsg(res.error || "Could not extract video metadata. Please check the URL.")
      }
    } catch (err: any) {
      setIsExtracting(false)
      setErrorMsg(err?.message || "Extraction error occurred.")
    }
  }

  return (
    <Card className="glass-panel border-2 border-red-500/30 bg-gradient-to-br from-red-950/15 via-[hsl(var(--card))] to-[hsl(var(--card))] shadow-xl rounded-3xl overflow-hidden">
      <CardContent className="p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[hsl(var(--border))] pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30 shrink-0">
              <YoutubeIcon className="h-5 w-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-[hsl(var(--foreground))]">
                  Instant YouTube Lecture Extractor & Course Adder
                </h3>
                <Badge className="bg-red-500/10 text-red-500 border border-red-500/30 text-[10px] font-bold py-0">
                  Dual-AI Powered
                </Badge>
              </div>
              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">
                Paste any YouTube video URL or iframe. AI auto-extracts 23-point notes, numericals, MCQs, and embeds the player into the course.
              </p>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleExtract} className="space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <div className="relative flex-1 w-full">
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Paste YouTube Link (e.g. https://youtu.be/3oZpRAycSSY or watch?v=...)"
                className="h-11 rounded-2xl text-xs sm:text-sm pl-4 pr-10 bg-[hsl(var(--card))] border-[hsl(var(--border))] focus-visible:ring-red-500"
              />
              {urlInput && (
                <button
                  type="button"
                  onClick={() => setUrlInput("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                >
                  Clear
                </button>
              )}
            </div>

            <select
              value={targetPreference}
              onChange={(e) => setTargetPreference(e.target.value)}
              className="h-11 px-3 rounded-2xl text-xs font-bold bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] shrink-0 w-full sm:w-auto cursor-pointer"
            >
              <option value="auto">🧠 Auto-Detect Course & Chapter (AI)</option>
              <option value="cma-inter">🎯 CMA Intermediate (Direct & Indirect Tax)</option>
              <option value="ca-inter">📘 CA Intermediate (Taxation)</option>
              <option value="prsu-s1">🏛️ PRSU B.Com Sem 1 (Fundamental Accounting)</option>
              <option value="prsu-s5">🏛️ PRSU B.Com Sem 5 (Income Tax Law)</option>
              <option value="prsu-s6">🏛️ PRSU B.Com Sem 6 (Indirect Tax GST)</option>
            </select>

            <Button
              type="submit"
              disabled={isExtracting}
              className="h-11 px-5 rounded-2xl text-xs sm:text-sm font-black bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 btn-tactile cursor-pointer shrink-0 w-full sm:w-auto"
            >
              {isExtracting ? (
                <>
                  <Sparkles className="h-4 w-4 mr-1.5 animate-spin" /> Extracting Lecture...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-1.5 fill-white" /> Extract & Add to Course
                </>
              )}
            </Button>
          </div>
        </form>

        {errorMsg && (
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Live Extraction Result Preview */}
        {extractedRecord && (
          <div className="p-4 sm:p-5 rounded-3xl bg-[hsl(var(--card))] border-2 border-emerald-500/30 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500 text-white font-black text-xs">
                    Lecture Successfully Extracted & Added!
                  </Badge>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                    {extractedRecord.detectionMode === "user_specified" ? "Target Specified by You" : "AI Auto-Classified"}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-[hsl(var(--foreground))]">
                  {extractedRecord.title}
                </h4>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  Faculty: <strong className="text-[hsl(var(--foreground))]">{extractedRecord.author}</strong> &bull; Mapped: <strong className="text-primary">{extractedRecord.targetInstitutionName} &bull; {extractedRecord.targetLevelTitle} ➔ {extractedRecord.targetPaperTitle}</strong>
                </p>
              </div>

              <Button
                asChild
                size="sm"
                className="rounded-xl text-xs font-bold bg-primary text-primary-foreground btn-tactile cursor-pointer shrink-0"
              >
                <Link href={`/courses/subject/${extractedRecord.targetPaperId}`}>
                  Open in Subject Studio <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </Button>
            </div>

            {/* Embedded Player Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/80 border border-[hsl(var(--border))] shadow-md">
                <iframe
                  src={`${extractedRecord.embedUrl}?rel=0&modestbranding=1`}
                  title={extractedRecord.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-[hsl(var(--muted)/0.5)] border border-[hsl(var(--border))] space-y-2 text-xs">
                <p className="font-extrabold text-[hsl(var(--foreground))] flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Synthesized Study Package Contents:
                </p>
                <ul className="list-disc list-inside space-y-1 text-[hsl(var(--muted-foreground))]">
                  <li>23-Point Deep Academic & Statutory Analysis</li>
                  <li>ELI10 Concept Intuition (English, Hindi & Hinglish)</li>
                  <li>Solved Practical Numerical Case + Journal Entries</li>
                  <li>Common Exam Traps & Memory Mnemonic</li>
                  <li>{extractedRecord.synthesizedNotes.mcqs?.length || 10} Practice MCQs with Answers</li>
                </ul>
                <div className="pt-2 border-t border-[hsl(var(--border))] flex justify-between items-center text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Saved to Course Registry</span>
                  <span>Chapter: {extractedRecord.targetChapterTitle}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
