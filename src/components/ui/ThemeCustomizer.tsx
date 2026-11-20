"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Check,
  Sparkles,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"

export type AccentColor = "indigo" | "cyan" | "emerald" | "violet" | "amber"

const ACCENTS: { id: AccentColor; name: string; hex: string; bgClass: string }[] = [
  { id: "indigo", name: "Electric Indigo", hex: "#6366f1", bgClass: "bg-indigo-500" },
  { id: "cyan", name: "Cyber Cyan", hex: "#06b6d4", bgClass: "bg-cyan-500" },
  { id: "emerald", name: "Matrix Emerald", hex: "#10b981", bgClass: "bg-emerald-500" },
  { id: "violet", name: "Royal Violet", hex: "#8b5cf6", bgClass: "bg-purple-500" },
  { id: "amber", name: "Sunset Gold", hex: "#f59e0b", bgClass: "bg-amber-500" },
]

export default function ThemeCustomizer() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeAccent, setActiveAccent] = useState<AccentColor>("indigo")

  useEffect(() => {
    setMounted(true)
    const savedAccent = localStorage.getItem("edu-accent") as AccentColor
    if (savedAccent && ACCENTS.some((a) => a.id === savedAccent)) {
      setActiveAccent(savedAccent)
      document.documentElement.setAttribute("data-theme", savedAccent)
    }
  }, [])

  const handleAccentChange = (accent: AccentColor) => {
    setActiveAccent(accent)
    localStorage.setItem("edu-accent", accent)
    if (accent === "indigo") {
      document.documentElement.removeAttribute("data-theme")
    } else {
      document.documentElement.setAttribute("data-theme", accent)
    }
  }

  if (!mounted) return null

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative h-9 w-9 rounded-full hover:bg-[hsl(var(--accent))] transition-all active:scale-95"
        title="Customize Theme & Accents"
        aria-label="Theme Customizer"
      >
        <Palette className="h-4 w-4 text-[hsl(var(--foreground))]" />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-11 z-50 w-72 p-4 rounded-2xl glass-panel shadow-2xl border border-[hsl(var(--border))] space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-2">
              <div className="flex items-center gap-1.5 font-semibold text-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Theme & Appearance</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Mode Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                Display Mode
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[hsl(var(--muted))] rounded-xl">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    theme === "light"
                      ? "bg-[hsl(var(--card))] text-[hsl(var(--foreground))] shadow-xs font-semibold"
                      : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  }`}
                >
                  <Sun className="h-3.5 w-3.5" /> Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    theme === "dark"
                      ? "bg-[hsl(var(--card))] text-[hsl(var(--foreground))] shadow-xs font-semibold"
                      : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  }`}
                >
                  <Moon className="h-3.5 w-3.5" /> Dark
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    theme === "system"
                      ? "bg-[hsl(var(--card))] text-[hsl(var(--foreground))] shadow-xs font-semibold"
                      : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5" /> Auto
                </button>
              </div>
            </div>

            {/* Accent Color Palettes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                Accent Glow
              </label>
              <div className="grid grid-cols-5 gap-2 pt-1">
                {ACCENTS.map((accent) => (
                  <button
                    key={accent.id}
                    onClick={() => handleAccentChange(accent.id)}
                    className="group flex flex-col items-center gap-1 transition-transform active:scale-90"
                    title={accent.name}
                  >
                    <div
                      className={`h-8 w-8 rounded-full ${accent.bgClass} flex items-center justify-center shadow-md transition-all group-hover:scale-110 ${
                        activeAccent === accent.id ? "ring-2 ring-offset-2 ring-offset-[hsl(var(--card))] ring-white" : ""
                      }`}
                    >
                      {activeAccent === accent.id && <Check className="h-4 w-4 text-white" />}
                    </div>
                    <span className="text-[10px] text-[hsl(var(--muted-foreground))] truncate max-w-[45px]">
                      {accent.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))] p-2 rounded-xl text-center">
              💡 Live applied to all pages, charts, buttons & graphs.
            </div>
          </div>
        </>
      )}
    </div>
  )
}
