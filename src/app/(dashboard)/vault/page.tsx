"use client"

import { useState } from "react"
import Link from "next/link"
import { INITIAL_STUDENT_VAULT_DOCUMENTS, StudentVaultDocument } from "@/data/studentVaultData"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Library,
  Upload,
  Search,
  FileText,
  Sparkles,
  Bot,
  Brain,
  Tag,
  Star,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react"

export default function StudentVaultPage() {
  const [documents, setDocuments] = useState<StudentVaultDocument[]>(INITIAL_STUDENT_VAULT_DOCUMENTS)
  const [activeDoc, setActiveDoc] = useState<StudentVaultDocument>(documents[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [isSimulatingOcr, setIsSimulatingOcr] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newSubject, setNewSubject] = useState("")
  const [newNotesText, setNewNotesText] = useState("")

  const filtered = documents.filter((d) => {
    const q = searchQuery.toLowerCase()
    return (
      d.title.toLowerCase().includes(q) ||
      d.subject.toLowerCase().includes(q) ||
      d.chapter.toLowerCase().includes(q) ||
      d.extractedMarkdown.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q))
    )
  })

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newNotesText.trim()) return

    setIsSimulatingOcr(true)
    setTimeout(() => {
      const newDoc: StudentVaultDocument = {
        id: `vault-doc-${Date.now()}`,
        title: newTitle.trim(),
        subject: newSubject.trim() || "General Academic Notes",
        chapter: "Chapter 1: Student Synthesized Core",
        sourceType: "handwritten_ocr",
        originalFileName: "scanned_lecture_notes.jpg",
        extractedMarkdown: newNotesText,
        keyTakeaways: [
          "Meticulously indexed into your private student knowledge vault.",
          "Available for instant retrieval and RAG synthesis during AI Tutor sessions.",
          "Concept formulas and rules parsed into study flashcards."
        ],
        flashcards: [
          {
            question: `Core summary of: ${newTitle}`,
            answer: newNotesText.substring(0, 140) + "..."
          }
        ],
        tags: ["My Notes", newSubject.trim() || "Study Vault", "AI Indexed"],
        createdAt: new Date().toISOString(),
        isFavorite: false
      }

      setDocuments([newDoc, ...documents])
      setActiveDoc(newDoc)
      setNewTitle("")
      setNewSubject("")
      setNewNotesText("")
      setIsSimulatingOcr(false)
    }, 800)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* 1. Top Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 text-white p-6 sm:p-8 shadow-xl border border-indigo-500/20">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                <Library className="h-6 w-6" />
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
                Student Private Knowledge Engine & Notes Vault
              </h1>
            </div>
            <p className="text-indigo-200/90 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Your personal, private, searchable AI library. Upload your handwritten notes, coaching PDFs, and lecture bookmarks. AI automatically performs OCR text extraction, generates concept flashcards, and connects with your AI Tutor.
            </p>
          </div>

          <Badge className="bg-indigo-500 text-white font-black text-xs self-start sm:self-auto py-1 px-3">
            Private & Encrypted
          </Badge>
        </div>
      </div>

      {/* 2. Upload / OCR Intake Panel */}
      <Card className="glass-panel border border-[hsl(var(--border))] rounded-3xl overflow-hidden shadow-sm">
        <CardContent className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4 text-indigo-500" />
            <h3 className="text-sm font-black text-[hsl(var(--foreground))]">
              Scan Handwritten Notes or Ingest PDF Material (OCR Engine)
            </h3>
          </div>

          <form onSubmit={handleSimulateUpload} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Note Title (e.g. 'Classroom Notes: Section 185 Loans to Directors')"
                className="h-10 rounded-xl text-xs bg-[hsl(var(--card))]"
              />
              <Input
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Subject / Exam (e.g. 'Company Law', 'Direct Tax', 'Costing')"
                className="h-10 rounded-xl text-xs bg-[hsl(var(--card))]"
              />
            </div>

            <textarea
              value={newNotesText}
              onChange={(e) => setNewNotesText(e.target.value)}
              placeholder="Paste raw notes text or transcription from your handwritten sheet..."
              rows={3}
              className="w-full p-3 rounded-2xl text-xs bg-[hsl(var(--card))] border border-[hsl(var(--border))] focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSimulatingOcr || !newTitle.trim() || !newNotesText.trim()}
                className="rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white gap-2 btn-tactile cursor-pointer"
              >
                {isSimulatingOcr ? (
                  <>
                    <Sparkles className="h-4 w-4 animate-spin" /> Performing OCR & Vector Indexing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> Index into Private Vault & Generate Flashcards
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 3. Search & Vault Documents Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Documents List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search private notes by keyword, tag, or statute..."
              className="pl-9 h-10 rounded-xl text-xs bg-[hsl(var(--card))]"
            />
          </div>

          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
            {filtered.map((doc) => {
              const isSelected = activeDoc?.id === doc.id
              return (
                <div
                  key={doc.id}
                  onClick={() => setActiveDoc(doc)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden active:scale-[0.99] ${
                    isSelected
                      ? "bg-indigo-500/10 border-indigo-500 shadow-md ring-1 ring-indigo-500/40"
                      : "bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-indigo-500/40 hover:bg-[hsl(var(--muted))]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <Badge variant="outline" className="text-[10px] font-bold border-indigo-500/30 text-indigo-400">
                      {doc.sourceType === "handwritten_ocr" ? "Handwritten OCR" : "PDF Ingestion"}
                    </Badge>
                    <span className="text-[10px] text-[hsl(var(--muted-foreground))] font-semibold">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-black text-[hsl(var(--foreground))] line-clamp-2">
                    {doc.title}
                  </h3>
                  <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5 line-clamp-1">
                    {doc.subject} &bull; {doc.chapter}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {doc.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-md bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] font-semibold">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Active Document Deep Inspector */}
        <div className="lg:col-span-7">
          {activeDoc && (
            <Card className="glass-panel border-2 border-indigo-500/30 rounded-3xl overflow-hidden shadow-xl sticky top-4">
              <CardContent className="p-5 sm:p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[hsl(var(--border))] pb-4">
                  <div className="space-y-1">
                    <Badge className="bg-indigo-600 text-white font-bold text-xs">
                      {activeDoc.subject}
                    </Badge>
                    <h2 className="text-lg sm:text-xl font-black text-[hsl(var(--foreground))]">
                      {activeDoc.title}
                    </h2>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      {activeDoc.chapter} &bull; Source: {activeDoc.originalFileName || "Uploaded Note"}
                    </p>
                  </div>

                  <Button
                    asChild
                    size="sm"
                    className="rounded-xl text-xs font-bold bg-primary text-primary-foreground btn-tactile cursor-pointer shrink-0"
                  >
                    <Link href={`/ai-tutor?prompt=${encodeURIComponent(`Based on my private note "${activeDoc.title}": ${activeDoc.extractedMarkdown.substring(0, 300)}... Please clarify key concepts and test my memory!`)}`}>
                      <Bot className="h-3.5 w-3.5 mr-1 text-cyan-300" /> Ask AI Tutor on this Note
                    </Link>
                  </Button>
                </div>

                {/* Extracted Markdown View */}
                <div className="p-4 rounded-2xl bg-[hsl(var(--muted)/0.4)] border border-[hsl(var(--border))] space-y-2">
                  <p className="text-xs font-black uppercase tracking-wider text-indigo-400">
                    Transcribed Notes Content (Searchable)
                  </p>
                  <div className="text-xs sm:text-sm text-[hsl(var(--foreground))] whitespace-pre-wrap leading-relaxed font-mono">
                    {activeDoc.extractedMarkdown}
                  </div>
                </div>

                {/* Key Takeaways */}
                <div className="space-y-2">
                  <p className="text-xs font-black uppercase tracking-wider text-[hsl(var(--foreground))] flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" /> AI Synthesized Key Takeaways:
                  </p>
                  <ul className="space-y-1.5 text-xs text-[hsl(var(--muted-foreground))]">
                    {activeDoc.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Auto Flashcards */}
                {activeDoc.flashcards && activeDoc.flashcards.length > 0 && (
                  <div className="space-y-3 pt-2 border-t border-[hsl(var(--border))]">
                    <p className="text-xs font-black uppercase tracking-wider text-[hsl(var(--foreground))] flex items-center gap-1.5">
                      <Brain className="h-3.5 w-3.5 text-purple-400" /> Auto-Generated Study Flashcards ({activeDoc.flashcards.length}):
                    </p>
                    <div className="space-y-2">
                      {activeDoc.flashcards.map((fc, i) => (
                        <div key={i} className="p-3.5 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] space-y-1.5">
                          <p className="text-xs font-bold text-primary">Q: {fc.question}</p>
                          <p className="text-xs text-[hsl(var(--foreground))] bg-[hsl(var(--muted)/0.5)] p-2 rounded-xl">
                            A: {fc.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
