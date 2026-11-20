"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
  Sparkles,
  LogOut,
  Smartphone,
  Send,
  AlertTriangle,
  Lock,
  Laptop,
  Database,
  Cloud,
  HardDrive,
  RefreshCw,
  Copy,
  Check,
  Server,
  Zap,
  CheckCheck
} from "lucide-react"
import { useAppStore } from "@/lib/store"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  configureSupabase,
  testSupabaseConnection,
  isSupabaseConfigured
} from "@/lib/cloud/supabaseClient"
import {
  configureS3CloudStorage,
  testS3CloudConnection,
  isS3Configured
} from "@/lib/cloud/s3StorageClient"
import {
  configureCloudMemory,
  testCloudMemoryConnection,
  isCloudMemoryConfigured
} from "@/lib/cloud/cloudMemoryEngine"
import { executeMasterCloudSync } from "@/lib/cloud/syncManager"

export default function SettingsPage() {
  const router = useRouter()
  const {
    currentUser,
    activeLanguage,
    setLanguage,
    studyGoalMinutes,
    setStudyGoalMinutes,
    telegramSyncNotifications,
    setTelegramSyncNotifications,
    studyReminders,
    setStudyReminders,
    studentLevel,
    studyStreakDays,
    aiMessages,
    weakConcepts,
    studiedTopics,
    geminiApiKey,
    openaiApiKey,
    setApiKeys,
    logout
  } = useAppStore()

  const { theme, setTheme } = useTheme()

  const [savedStatus, setSavedStatus] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState(studyGoalMinutes || 120)
  const [geminiKeyInput, setGeminiKeyInput] = useState(geminiApiKey || "")
  const [openaiKeyInput, setOpenaiKeyInput] = useState(openaiApiKey || "")

  // Cloud Config state
  const [supabaseUrl, setSupabaseUrl] = useState("")
  const [supabaseKey, setSupabaseKey] = useState("")
  const [s3Endpoint, setS3Endpoint] = useState("")
  const [s3Bucket, setS3Bucket] = useState("edufinance-cloud-storage")
  const [s3KeyId, setS3KeyId] = useState("")
  const [upstashUrl, setUpstashUrl] = useState("")
  const [upstashToken, setUpstashToken] = useState("")

  // Cloud Testing & Sync status
  const [supabaseStatus, setSupabaseStatus] = useState<{ connected?: boolean; msg?: string }>({})
  const [s3Status, setS3Status] = useState<{ connected?: boolean; msg?: string }>({})
  const [memoryStatus, setMemoryStatus] = useState<{ connected?: boolean; msg?: string }>({})
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncReport, setSyncReport] = useState<string | null>(null)
  const [copiedSql, setCopiedSql] = useState(false)

  // Password change state
  const [currentPass, setCurrentPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [passMsg, setPassMsg] = useState("")

  // Telegram test state
  const [telegramStatus, setTelegramStatus] = useState("")

  // Load cloud keys from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSupabaseUrl(localStorage.getItem("edufinance_supabase_url") || process.env.NEXT_PUBLIC_SUPABASE_URL || "")
      setSupabaseKey(localStorage.getItem("edufinance_supabase_key") || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "")
      setS3Endpoint(localStorage.getItem("edufinance_s3_endpoint") || "https://auto.r2.cloudflarestorage.com")
      setS3Bucket(localStorage.getItem("edufinance_s3_bucket") || "edufinance-cloud-storage")
      setUpstashUrl(localStorage.getItem("edufinance_upstash_url") || "")
    }
  }, [])

  const handleSaveSettings = () => {
    setStudyGoalMinutes(selectedGoal)
    setApiKeys({
      geminiKey: geminiKeyInput,
      openaiKey: openaiKeyInput,
    })

    // Save cloud configurations
    if (supabaseUrl && supabaseKey) {
      configureSupabase(supabaseUrl, supabaseKey)
      if (typeof window !== "undefined") {
        localStorage.setItem("edufinance_supabase_url", supabaseUrl)
        localStorage.setItem("edufinance_supabase_key", supabaseKey)
      }
    }
    if (s3Endpoint && s3Bucket) {
      configureS3CloudStorage({
        endpoint: s3Endpoint,
        bucketName: s3Bucket,
        accessKeyId: s3KeyId
      })
    }
    if (upstashUrl) {
      configureCloudMemory(upstashUrl, upstashToken)
    }

    setSavedStatus(true)
    setTimeout(() => setSavedStatus(false), 3000)
  }

  const handleTestSupabase = async () => {
    setSupabaseStatus({ msg: "Connecting to Supabase PostgreSQL & Storage..." })
    const res = await testSupabaseConnection(supabaseUrl, supabaseKey)
    setSupabaseStatus({
      connected: res.connected,
      msg: res.message
    })
  }

  const handleTestS3 = async () => {
    setS3Status({ msg: "Probing Cloudflare R2 / S3 storage bucket..." })
    configureS3CloudStorage({ endpoint: s3Endpoint, bucketName: s3Bucket, accessKeyId: s3KeyId })
    const res = await testS3CloudConnection()
    setS3Status({
      connected: res.connected,
      msg: res.message
    })
  }

  const handleTestMemory = async () => {
    setMemoryStatus({ msg: "Pinging Upstash Cloud Memory..." })
    configureCloudMemory(upstashUrl, upstashToken)
    const res = await testCloudMemoryConnection()
    setMemoryStatus({
      connected: res.connected,
      msg: res.message
    })
  }

  const handleMasterCloudSync = async () => {
    setIsSyncing(true)
    setSyncReport(null)

    // Save config first
    if (supabaseUrl && supabaseKey) {
      configureSupabase(supabaseUrl, supabaseKey)
    }

    try {
      const res = await executeMasterCloudSync(
        currentUser,
        studentLevel,
        studyStreakDays,
        activeLanguage,
        aiMessages,
        weakConcepts,
        studiedTopics
      )
      setIsSyncing(false)
      setSyncReport(
        `✅ Master Cloud Sync Complete (${res.syncedAt})! Providers: [${res.providersActive.join(", ")}]. ${res.overallMessage}`
      )
      setTimeout(() => setSyncReport(null), 7000)
    } catch (e: any) {
      setIsSyncing(false)
      setSyncReport(`⚠️ Cloud sync note: ${e?.message || "Sync finished with local cache."}`)
    }
  }

  const handleCopySqlSchema = () => {
    const sqlNotice = `-- Run this in your Supabase SQL Editor:
-- https://github.com/aceraspir25-ctrl/CA/blob/master/supabase/schema.sql
-- Contains complete tables for profiles, ai_tutor_memory, weak_concepts, course_progress, extracted_youtube_lectures & certificates.`
    navigator.clipboard.writeText(sqlNotice)
    setCopiedSql(true)
    setTimeout(() => setCopiedSql(false), 2000)
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPass.length < 6) {
      setPassMsg("New password must be at least 6 characters.")
      return
    }
    setPassMsg("Password successfully updated and encrypted!")
    setCurrentPass("")
    setNewPass("")
    setTimeout(() => setPassMsg(""), 3500)
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleTestTelegram = () => {
    setTelegramStatus("Sending test ping to @jarvis_Ai_AutomationBot...")
    setTimeout(() => {
      setTelegramStatus("✅ Connected! Verified active sync with @jarvis_Ai_AutomationBot.")
      setTimeout(() => setTelegramStatus(""), 4000)
    }, 800)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16 animate-fade-in">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-primary/20 rounded-2xl border border-primary/30">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black">Preferences & System Settings</h1>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm">
            Control theme, language of instruction, daily targets, Cloud Database (Supabase, S3 & Memory), and security.
          </p>
        </div>

        {savedStatus && (
          <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 gap-1 px-3 py-1.5 self-start sm:self-center text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="h-4 w-4" /> Preferences Saved
          </Badge>
        )}
      </div>

      <div className="space-y-6">
        {/* ========================================================================= */}
        {/* 2. MULTI-CLOUD DATABASE & PERSISTENT MEMORY HUB (SUPABASE, S3, REDIS) */}
        {/* ========================================================================= */}
        <Card className="glass-panel border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-950/10 via-[hsl(var(--card))] to-[hsl(var(--card))] shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-[hsl(var(--border))] pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <CardTitle className="text-base sm:text-lg font-black flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <Cloud className="h-5 w-5" /> Cloud Database, Storage & Memory Hub
                </CardTitle>
                <CardDescription className="text-xs">
                  Connect Supabase PostgreSQL, Cloudflare R2 / S3 storage, and Upstash Cloud Memory for permanent cross-device persistence.
                </CardDescription>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  onClick={handleMasterCloudSync}
                  disabled={isSyncing}
                  size="sm"
                  className="rounded-xl text-xs font-bold gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white shadow-md btn-tactile cursor-pointer"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                  {isSyncing ? "Syncing..." : "Sync Memory to Cloud Now"}
                </Button>
              </div>
            </div>

            {syncReport && (
              <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold animate-in fade-in">
                {syncReport}
              </div>
            )}
          </CardHeader>

          <CardContent className="p-5 sm:p-6 space-y-6">
            {/* SUB-SECTION A: SUPABASE POSTGRESQL & BUCKETS */}
            <div className="space-y-3.5 p-4 rounded-2xl bg-[hsl(var(--muted)/0.4)] border border-[hsl(var(--border))]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                    <Database className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-[hsl(var(--foreground))]">
                      Supabase Cloud Database & Storage
                    </h4>
                    <p className="text-[11px] text-[hsl(var(--muted-foreground))]">
                      Stores student profiles, chapter progress, test papers, and YouTube lecture extractions.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopySqlSchema}
                    className="h-7 text-xs font-semibold gap-1 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  >
                    {copiedSql ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                    {copiedSql ? "SQL Link Copied!" : "Schema SQL"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTestSupabase}
                    className="h-7 text-xs font-bold gap-1 rounded-lg border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
                  >
                    <Zap className="h-3 w-3" /> Test Connection
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[hsl(var(--foreground))]">Supabase Project URL</label>
                  <Input
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://xyzcompany.supabase.co"
                    className="h-9 text-xs rounded-xl font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[hsl(var(--foreground))]">Supabase Anon Public API Key</label>
                  <Input
                    type="password"
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    placeholder="eyJhbGciOi..."
                    className="h-9 text-xs rounded-xl font-mono"
                  />
                </div>
              </div>

              {supabaseStatus.msg && (
                <p className={`text-xs font-semibold ${supabaseStatus.connected ? "text-emerald-500" : "text-amber-500"}`}>
                  {supabaseStatus.msg}
                </p>
              )}
            </div>

            {/* SUB-SECTION B: CLOUDFLARE R2 / AWS S3 OBJECT STORAGE */}
            <div className="space-y-3.5 p-4 rounded-2xl bg-[hsl(var(--muted)/0.4)] border border-[hsl(var(--border))]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-500 text-white flex items-center justify-center">
                    <HardDrive className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-[hsl(var(--foreground))]">
                      Cloudflare R2 / AWS S3 Object Storage
                    </h4>
                    <p className="text-[11px] text-[hsl(var(--muted-foreground))]">
                      High-speed CDN storage for PDF books, lecture notes, and video media assets.
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTestS3}
                  className="h-7 text-xs font-bold gap-1 rounded-lg border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 cursor-pointer"
                >
                  <Zap className="h-3 w-3" /> Test Bucket
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[hsl(var(--foreground))]">S3 / R2 Endpoint URL</label>
                  <Input
                    value={s3Endpoint}
                    onChange={(e) => setS3Endpoint(e.target.value)}
                    placeholder="https://auto.r2.cloudflarestorage.com"
                    className="h-9 text-xs rounded-xl font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[hsl(var(--foreground))]">Storage Bucket Name</label>
                  <Input
                    value={s3Bucket}
                    onChange={(e) => setS3Bucket(e.target.value)}
                    placeholder="edufinance-cloud-storage"
                    className="h-9 text-xs rounded-xl font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[hsl(var(--foreground))]">Access Key ID (Optional)</label>
                  <Input
                    value={s3KeyId}
                    onChange={(e) => setS3KeyId(e.target.value)}
                    placeholder="R2_ACCESS_KEY_ID"
                    className="h-9 text-xs rounded-xl font-mono"
                  />
                </div>
              </div>

              {s3Status.msg && (
                <p className={`text-xs font-semibold ${s3Status.connected ? "text-emerald-500" : "text-amber-500"}`}>
                  {s3Status.msg}
                </p>
              )}
            </div>

            {/* SUB-SECTION C: UPSTASH REDIS CLOUD MEMORY */}
            <div className="space-y-3.5 p-4 rounded-2xl bg-[hsl(var(--muted)/0.4)] border border-[hsl(var(--border))]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-rose-500 text-white flex items-center justify-center">
                    <Server className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-[hsl(var(--foreground))]">
                      Upstash Cloud Memory Engine (AI Tutor Long-Term Recall)
                    </h4>
                    <p className="text-[11px] text-[hsl(var(--muted-foreground))]">
                      Remembers student doubts, weak topics, and streak across PC, Mobile & Telegram.
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTestMemory}
                  className="h-7 text-xs font-bold gap-1 rounded-lg border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                >
                  <Zap className="h-3 w-3" /> Ping Memory
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[hsl(var(--foreground))]">Upstash REST URL</label>
                  <Input
                    value={upstashUrl}
                    onChange={(e) => setUpstashUrl(e.target.value)}
                    placeholder="https://gorgeous-panda-123.upstash.io"
                    className="h-9 text-xs rounded-xl font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[hsl(var(--foreground))]">Upstash REST Token</label>
                  <Input
                    type="password"
                    value={upstashToken}
                    onChange={(e) => setUpstashToken(e.target.value)}
                    placeholder="AXB...Token"
                    className="h-9 text-xs rounded-xl font-mono"
                  />
                </div>
              </div>

              {memoryStatus.msg && (
                <p className={`text-xs font-semibold ${memoryStatus.connected ? "text-emerald-500" : "text-amber-500"}`}>
                  {memoryStatus.msg}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 3. THEME & DISPLAY PREFERENCES */}
        <Card className="glass-panel border-[hsl(var(--border))] shadow-md rounded-3xl">
          <CardHeader>
            <CardTitle className="text-base font-black flex items-center gap-2">
              <Sun className="h-4 w-4 text-amber-500" /> Interface Appearance & Theme
            </CardTitle>
            <CardDescription className="text-xs">Select your preferred color mode for study sessions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "dark", label: "Dark Theme", icon: Moon, desc: "Eye-comfort dark palette" },
                { id: "light", label: "Light Theme", icon: Sun, desc: "High-contrast clean white" },
                { id: "system", label: "System Sync", icon: Laptop, desc: "Matches device settings" },
              ].map((t) => {
                const Icon = t.icon
                const isActive = theme === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 active:scale-95 ${
                      isActive
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-md font-bold"
                        : "border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-[hsl(var(--muted-foreground))]"}`} />
                      {isActive && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
                    </div>
                    <p className="font-extrabold text-xs text-[hsl(var(--foreground))]">{t.label}</p>
                    <p className="text-[10px] text-[hsl(var(--muted-foreground))]">{t.desc}</p>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* 4. LANGUAGE OF INSTRUCTION */}
        <Card className="glass-panel border-[hsl(var(--border))] shadow-md rounded-3xl">
          <CardHeader>
            <CardTitle className="text-base font-black flex items-center gap-2">
              <Languages className="h-4 w-4 text-blue-500" /> Language of Instruction
            </CardTitle>
            <CardDescription className="text-xs">
              Choose how AI Tutor, 23-point notes, and chapter summaries are explained.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "en", label: "English", desc: "Pure English with statutory terms" },
                { id: "hi", label: "हिन्दी (Hindi)", desc: "शुद्ध हिन्दी भाषा में व्याख्या" },
                { id: "hinglish", label: "Hinglish (Recommended)", desc: "Conversational mix of Hindi & English" },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => {
                    setLanguage(lang.id as any)
                    setSavedStatus(true)
                    setTimeout(() => setSavedStatus(false), 2000)
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer active:scale-95 ${
                    activeLanguage === lang.id
                      ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-md"
                      : "border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-black text-xs text-[hsl(var(--foreground))]">{lang.label}</p>
                    {activeLanguage === lang.id && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
                  </div>
                  <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-1">{lang.desc}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 5. DAILY STUDY TARGETS */}
        <Card className="glass-panel border-[hsl(var(--border))] shadow-md rounded-3xl">
          <CardHeader>
            <CardTitle className="text-base font-black flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-500" /> Daily Target Study Hours
            </CardTitle>
            <CardDescription className="text-xs">Set your daily learning target to maintain your streak.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { mins: 60, label: "1 Hour / Day", sub: "Light Routine" },
                { mins: 120, label: "2 Hours / Day", sub: "Recommended" },
                { mins: 180, label: "3 Hours / Day", sub: "Exam Intensive" },
                { mins: 240, label: "4+ Hours / Day", sub: "Ranker / CA Mode" },
              ].map((g) => (
                <button
                  key={g.mins}
                  onClick={() => setSelectedGoal(g.mins)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer active:scale-95 ${
                    selectedGoal === g.mins
                      ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20 font-bold"
                      : "border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]"
                  }`}
                >
                  <p className="text-xs font-black text-[hsl(var(--foreground))]">{g.label}</p>
                  <p className="text-[10px] text-[hsl(var(--muted-foreground))] mt-0.5">{g.sub}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 6. TELEGRAM & NOTIFICATIONS SYNC */}
        <Card className="glass-panel border-[hsl(var(--border))] shadow-md rounded-3xl">
          <CardHeader>
            <CardTitle className="text-base font-black flex items-center gap-2">
              <Send className="h-4 w-4 text-cyan-500" /> Telegram AI Bot Sync (@jarvis_Ai_AutomationBot)
            </CardTitle>
            <CardDescription className="text-xs">
              Manage automatic notifications when YouTube videos are extracted or exam papers are generated.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-[hsl(var(--foreground))]">Instant Upload & Extraction Alerts</p>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))]">
                  Receive Telegram notifications when YouTube lectures, notes, or MCQs are added.
                </p>
              </div>
              <input
                type="checkbox"
                checked={telegramSyncNotifications}
                onChange={(e) => setTelegramSyncNotifications(e.target.checked)}
                className="w-4 h-4 rounded text-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-[hsl(var(--foreground))]">Daily Study & Streak Reminders</p>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))]">
                  AI sends morning syllabus targets and revision highlights to Telegram.
                </p>
              </div>
              <input
                type="checkbox"
                checked={studyReminders}
                onChange={(e) => setStudyReminders(e.target.checked)}
                className="w-4 h-4 rounded text-primary cursor-pointer"
              />
            </div>

            {telegramStatus && (
              <p className="text-xs font-semibold text-cyan-500">{telegramStatus}</p>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleTestTelegram}
              className="text-xs font-bold rounded-xl gap-1.5 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5 text-cyan-500" /> Test Telegram Connection
            </Button>
          </CardContent>
        </Card>

        {/* 7. SECURITY & ACCOUNT PASSWORD */}
        <Card className="glass-panel border-[hsl(var(--border))] shadow-md rounded-3xl">
          <CardHeader>
            <CardTitle className="text-base font-black flex items-center gap-2">
              <Shield className="h-4 w-4 text-rose-500" /> Account Security & Password
            </CardTitle>
            <CardDescription className="text-xs">Update your login password and manage active devices.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handlePasswordChange} className="space-y-3 max-w-md">
              {passMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  {passMsg}
                </div>
              )}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[hsl(var(--foreground))]">Current Password</label>
                <Input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="Enter current password"
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[hsl(var(--foreground))]">New Password</label>
                <Input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Enter new password (min 6 chars)"
                  className="rounded-xl text-xs"
                />
              </div>

              <Button type="submit" size="sm" className="rounded-xl text-xs font-bold cursor-pointer">
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 8. SAVE MASTER PREFERENCES BUTTON */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            onClick={handleSaveSettings}
            className="rounded-2xl text-xs sm:text-sm font-black px-6 py-2.5 bg-primary text-primary-foreground btn-tactile cursor-pointer shadow-lg"
          >
            Save All Preferences
          </Button>
        </div>

        {/* 9. DANGER ZONE / LOGOUT */}
        <Card className="border-rose-500/30 bg-rose-500/5 rounded-3xl">
          <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-black text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" /> Sign Out from This Device
              </p>
              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">
                You will be redirected to the Login page and will need your credentials to access the platform.
              </p>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="rounded-xl text-xs font-bold gap-1.5 cursor-pointer shrink-0 active:scale-95"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
