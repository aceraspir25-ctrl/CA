"use client"

import { useState } from "react"
import {
  Settings,
  Languages,
  Target,
  Bell,
  Moon,
  Sun,
  Shield,
  RotateCcw,
  CheckCircle2,
  User,
  GraduationCap,
  Key,
  Bot,
  Sparkles
} from "lucide-react"
import { useAppStore } from "@/lib/store"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const { studentName, activeLanguage, setLanguage, geminiApiKey, openaiApiKey, setApiKeys } = useAppStore()
  const { theme, setTheme } = useTheme()

  const [savedStatus, setSavedStatus] = useState(false)
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(120)
  const [targetExam, setTargetExam] = useState("CA Foundation - May 2027")
  const [geminiKeyInput, setGeminiKeyInput] = useState(geminiApiKey || "")
  const [openaiKeyInput, setOpenaiKeyInput] = useState(openaiApiKey || "")

  const handleSave = () => {
    setApiKeys({
      geminiKey: geminiKeyInput,
      openaiKey: openaiKeyInput,
    })
    setSavedStatus(true)
    setTimeout(() => setSavedStatus(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Student Preferences & Settings</h1>
          </div>
          <p className="text-slate-300 text-sm">
            Customize language of instruction, daily study targets, examination goals, and learning themes.
          </p>
        </div>

        {savedStatus && (
          <Badge variant="success" className="gap-1 px-3 py-1.5 self-start sm:self-center">
            <CheckCircle2 className="h-4 w-4" /> Changes Saved
          </Badge>
        )}
      </div>

      <div className="space-y-6">
        {/* Language of Instruction */}
        <Card className="border-[hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Languages className="h-4 w-4 text-blue-500" /> Language of Instruction
            </CardTitle>
            <CardDescription>Choose how AI Tutor and course explanations are presented to you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "en", label: "English", desc: "Pure English with technical terms" },
                { id: "hi", label: "हिन्दी (Hindi)", desc: "शुद्ध हिन्दी भाषा में व्याख्या" },
                { id: "hinglish", label: "Hinglish (Recommended)", desc: "Easy conversational mix of Hindi & English" },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id as any)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    activeLanguage === lang.id
                      ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/20"
                      : "border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/50"
                  }`}
                >
                  <p className="font-bold text-xs">{lang.label}</p>
                  <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-1">{lang.desc}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Study Goals & Target Examination */}
        <Card className="border-[hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-500" /> Target Examination & Daily Goals
            </CardTitle>
            <CardDescription>Tailors recommendations and daily streak milestones.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold">Target Examination</label>
              <Input
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                placeholder="e.g. CA Foundation May 2027, CS Executive, B.Com Sem 5"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-semibold">Daily Study Target (Minutes)</label>
              <Input
                type="number"
                value={dailyGoalMinutes}
                onChange={(e) => setDailyGoalMinutes(Number(e.target.value))}
              />
              <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Current setting: {Math.floor(dailyGoalMinutes / 60)} hours {dailyGoalMinutes % 60} minutes daily</p>
            </div>
          </CardContent>
        </Card>

        {/* Theme Preference */}
        <Card className="border-[hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sun className="h-4 w-4 text-amber-500" /> Interface Theme
            </CardTitle>
            <CardDescription>Select between Light and Dark mode appearance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
                className="gap-2 text-xs"
              >
                <Sun className="h-3.5 w-3.5" /> Light Theme
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="gap-2 text-xs"
              >
                <Moon className="h-3.5 w-3.5" /> Dark Theme
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("system")}
                className="gap-2 text-xs"
              >
                System Default
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Gateway & Custom API Keys */}
        <Card className="border-[hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="h-4 w-4 text-indigo-500" /> AI Gateway & Live Provider Keys (Optional)
            </CardTitle>
            <CardDescription>
              Connect your own Google Gemini or OpenAI API key for live GPT-4o / Gemini 2.5 Pro inference. If left empty, our built-in offline Commerce Knowledge Engine operates automatically.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold flex items-center gap-1.5">
                  <Key className="h-3.5 w-3.5 text-blue-500" /> Google Gemini API Key
                </label>
                <span className="text-[10px] text-[hsl(var(--muted-foreground))]">gemini-2.5-flash / pro</span>
              </div>
              <Input
                type="password"
                value={geminiKeyInput}
                onChange={(e) => setGeminiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="font-mono text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold flex items-center gap-1.5">
                  <Key className="h-3.5 w-3.5 text-purple-500" /> OpenAI API Key
                </label>
                <span className="text-[10px] text-[hsl(var(--muted-foreground))]">gpt-4o / gpt-4o-mini</span>
              </div>
              <Input
                type="password"
                value={openaiKeyInput}
                onChange={(e) => setOpenaiKeyInput(e.target.value)}
                placeholder="sk-proj-..."
                className="font-mono text-xs"
              />
            </div>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
              ✓ Keys are stored locally on your device and sent only to server-side inference handlers.
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-2">
          <Button onClick={handleSave} className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  )
}
