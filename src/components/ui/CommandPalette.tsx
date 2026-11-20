"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  BookOpen,
  GraduationCap,
  Bot,
  Sparkles,
  FlaskConical,
  Library,
  ArrowRight,
  X,
  Command,
  FileText
} from "lucide-react"

interface SearchItem {
  id: string
  title: string
  subtitle: string
  category: "B.Com Semesters" | "Professional Courses" | "AI & Tools" | "Features"
  href: string
  badge?: string
}

const SEARCH_CATALOG: SearchItem[] = [
  // B.Com Semesters (PRSU NEP-2020)
  { id: "bcom-s1", title: "B.Com Semester 1 (NEP)", subtitle: "Financial Accounting (DSC-1), Business Law (DSC-2), Business Economics (DSC-3)", category: "B.Com Semesters", href: "/courses?inst=prsu&level=prsu-bcom-sem1", badge: "Sem 1" },
  { id: "bcom-s2", title: "B.Com Semester 2 (NEP)", subtitle: "Corporate Accounting Basics (DSC-4), Business Mathematics (DSC-5), Business Environment", category: "B.Com Semesters", href: "/courses?inst=prsu&level=prsu-bcom-sem2", badge: "Sem 2" },
  { id: "bcom-s3", title: "B.Com Semester 3 (NEP)", subtitle: "Corporate Accounting (DSC-7), Business Statistics (DSC-8), Management (DSC-9)", category: "B.Com Semesters", href: "/courses?inst=prsu&level=prsu-bcom-sem3", badge: "Sem 3" },
  { id: "bcom-s4", title: "B.Com Semester 4 (NEP)", subtitle: "Cost Accounting (DSC-10), Company Law (DSC-11), Entrepreneurship (DSC-12)", category: "B.Com Semesters", href: "/courses?inst=prsu&level=prsu-bcom-sem4", badge: "Sem 4" },
  { id: "bcom-s5", title: "B.Com Semester 5 (NEP)", subtitle: "Income Tax Law & Practice (DSC-13), Auditing (DSC-14), Financial Management (DSC-15)", category: "B.Com Semesters", href: "/courses?inst=prsu&level=prsu-bcom-sem5", badge: "Sem 5" },
  { id: "bcom-s6", title: "B.Com Semester 6 (NEP)", subtitle: "Indirect Taxes with GST (DSC-16), Management Accounting (DSC-17), Financial Markets", category: "B.Com Semesters", href: "/courses?inst=prsu&level=prsu-bcom-sem6", badge: "Sem 6" },

  // Professional Courses
  { id: "ca-f", title: "CA Foundation Course (ICAI)", subtitle: "Accounting, Business Laws, Quantitative Aptitude, Economics", category: "Professional Courses", href: "/courses?inst=icai&level=ca-foundation", badge: "ICAI" },
  { id: "ca-i", title: "CA Intermediate Course (ICAI)", subtitle: "Advanced Accounting, Corporate Laws, Taxation, Costing, Auditing", category: "Professional Courses", href: "/courses?inst=icai&level=ca-intermediate", badge: "ICAI" },
  { id: "ca-fn", title: "CA Final Course (ICAI)", subtitle: "Financial Reporting, AFM, Advanced Auditing, Direct & Indirect Taxes", category: "Professional Courses", href: "/courses?inst=icai&level=ca-final", badge: "ICAI" },
  { id: "cma-i", title: "CMA Intermediate (ICMAI)", subtitle: "Business Laws, Cost Accounting, Direct & Indirect Taxation", category: "Professional Courses", href: "/courses?inst=icmai&level=cma-intermediate", badge: "ICMAI" },
  { id: "cs-ex", title: "CS Executive (ICSI)", subtitle: "Jurisprudence, Company Law, Setting Up of Business, Tax Laws", category: "Professional Courses", href: "/courses?inst=icsi&level=cs-executive", badge: "ICSI" },
  { id: "acca-k", title: "ACCA Applied Knowledge", subtitle: "Business and Technology, Management Accounting, Financial Accounting", category: "Professional Courses", href: "/courses?inst=acca&level=acca-knowledge", badge: "ACCA" },

  // AI & Tools
  { id: "ai-tutor", title: "AI Academic Tutor & Doubt Solver", subtitle: "Trilingual instant doubt resolution with legal sections & step-by-step numericals", category: "AI & Tools", href: "/ai-tutor", badge: "AI" },
  { id: "pipeline", title: "Autonomous Research & Content Pipeline", subtitle: "8-Stage multi-agent surveillance (MCA, CBDT, ICAI, PW, BYJU'S)", category: "AI & Tools", href: "/admin/pipeline", badge: "24x7" },
  { id: "agents", title: "11 Autonomous Academic Agents & LEADER-00", subtitle: "Real-time coordinator, self-healing bug fixer & Telegram link", category: "AI & Tools", href: "/admin/agents", badge: "Leader" },

  // Features
  { id: "lab", title: "Study Lab & Interactive Visualizer", subtitle: "CAS-6 costing calculators, GST offset simulation & ratio graphs", category: "Features", href: "/lab", badge: "Tools" },
  { id: "library", title: "Digital Student Library", subtitle: "Downloadable verified PDF notes, analytical tables & 15-MCQ banks", category: "Features", href: "/library", badge: "Notes" },
  { id: "exams", title: "PYQ & Exam Simulator", subtitle: "Mock timed papers, marking scheme analysis & past year trends", category: "Features", href: "/exams", badge: "Exams" },
]

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Listen for keyboard shortcut Ctrl+K / ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        // Parent controls open state
      }
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const filteredItems = useMemo(() => {
    if (!query.trim()) return SEARCH_CATALOG
    const q = query.toLowerCase()
    return SEARCH_CATALOG.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.badge?.toLowerCase().includes(q)
    )
  }, [query])

  const handleSelect = (item: SearchItem) => {
    router.push(item.href)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl rounded-2xl glass-panel shadow-2xl border border-[hsl(var(--border))] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
          <Search className="h-5 w-5 text-primary shrink-0 animate-pulse" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Search B.Com semesters, CA/CMA subjects, AI tutor, tools..."
            autoFocus
            className="flex-1 bg-transparent text-sm sm:text-base outline-none text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-semibold text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))] border border-[hsl(var(--border))] rounded-md">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-[hsl(var(--muted-foreground))] space-y-2">
              <p>No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs">Try searching for &quot;B.Com Sem 1&quot;, &quot;Tax&quot;, &quot;Costing&quot; or &quot;AI Tutor&quot;</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]"
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isSelected ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                      }`}
                    >
                      {item.category === "B.Com Semesters" ? (
                        <BookOpen className="h-4 w-4" />
                      ) : item.category === "Professional Courses" ? (
                        <GraduationCap className="h-4 w-4" />
                      ) : item.category === "AI & Tools" ? (
                        <Bot className="h-4 w-4" />
                      ) : (
                        <FlaskConical className="h-4 w-4" />
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm truncate">{item.title}</span>
                        {item.badge && (
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-xs truncate ${
                          isSelected ? "text-white/80" : "text-[hsl(var(--muted-foreground))]"
                        }`}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isSelected ? "translate-x-1 text-white" : "text-[hsl(var(--muted-foreground))] opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </div>
              )
            })
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 text-[11px] text-[hsl(var(--muted-foreground))]">
          <span>Navigate with arrows, press Enter to jump</span>
          <span className="font-medium text-primary">EduFinance Pro Spotlight</span>
        </div>
      </div>
    </div>
  )
}
