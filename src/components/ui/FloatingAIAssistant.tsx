"use client"

import { useState, useRef, useEffect } from "react"
import {
  Bot,
  Sparkles,
  Send,
  X,
  Minimize2,
  Maximize2,
  Copy,
  Check,
  Languages,
  Loader2,
  HelpCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
}

const QUICK_PROMPTS = [
  "B.Com Sem 1: Royalty Accounts Shortworkings Trick",
  "GST Input Tax Credit Sec 17(5) Blocked Items",
  "Section 185 Loans to Directors Companies Act",
  "AY 2025-26 New Tax Regime Slab Rates"
]

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [lang, setLang] = useState<"en" | "hi" | "hinglish">("hinglish")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      role: "assistant",
      content: "Namaste! Main aapka AI Academic Doubt Solver hu. Aap mujhse CA, CMA, CS ya PRSU B.Com (Sem 1 to 6) ka koi bhi question, section ya numerical puch sakte hain! 🚀"
    }
  ])

  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && !isMinimized) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen, isMinimized])

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim()
    if (!text || loading) return

    const userMsg: ChatMessage = { id: `user-${Date.now()}`, role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: text }],
          language: lang,
          capability: "doubt-solver"
        })
      })

      const data = await res.json()
      const replyContent = data.content || "Apologies, I encountered an issue retrieving the explanation. Please try again."

      setMessages((prev) => [
        ...prev,
        { id: `ai-${Date.now()}`, role: "assistant", content: replyContent }
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: `ai-${Date.now()}`, role: "assistant", content: "Network error occurred. Please check your internet connection." }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40">
      {/* Floating Pill Trigger */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Open AI Doubt Solver"
        >
          <div className="relative">
            <Bot className="h-5 w-5 animate-bounce" />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-xs font-bold tracking-wide hidden sm:inline">Ask AI Doubt Solver</span>
          <Sparkles className="h-4 w-4 text-amber-300 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div
          className={`flex flex-col rounded-3xl glass-panel shadow-2xl border border-[hsl(var(--border))] transition-all duration-300 overflow-hidden ${
            isMinimized
              ? "w-80 h-14"
              : "w-[92vw] sm:w-96 md:w-[420px] h-[520px] max-h-[80vh]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[hsl(var(--border))] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shrink-0">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div>
                <h3 className="font-bold text-xs sm:text-sm leading-tight">AI Doubt Solver</h3>
                <p className="text-[10px] text-white/80">CA • CMA • CS • B.Com Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Language Switcher */}
              {!isMinimized && (
                <button
                  onClick={() => setLang(lang === "en" ? "hinglish" : lang === "hinglish" ? "hi" : "en")}
                  className="px-2 py-0.5 rounded-md bg-white/20 hover:bg-white/30 text-[10px] font-bold uppercase transition-colors"
                  title="Switch Language"
                >
                  {lang === "en" ? "EN" : lang === "hi" ? "हिन्दी" : "Hinglish"}
                </button>
              )}

              <button
                onClick={() => setIsMinimized((prev) => !prev)}
                className="p-1 rounded-md hover:bg-white/20 text-white/80 hover:text-white"
                title={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-white/20 text-white/80 hover:text-white"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[hsl(var(--background))]/50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`relative group max-w-[88%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-xs shadow-md"
                          : "bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-bl-xs shadow-xs"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>

                      {msg.role === "assistant" && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded-md bg-[hsl(var(--muted))] hover:bg-[hsl(var(--accent))] text-[hsl(var(--muted-foreground))] transition-all"
                          title="Copy Answer"
                        >
                          {copiedId === msg.id ? (
                            <Check className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 p-3 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-xs text-[hsl(var(--muted-foreground))] w-fit">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                    <span>Analyzing statutory standards & generating solution...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Prompt Pills */}
              <div className="px-3 py-1.5 border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]/40 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
                <HelpCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                {QUICK_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(p)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] bg-[hsl(var(--muted))] hover:bg-primary hover:text-primary-foreground transition-colors shrink-0"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input Footer */}
              <div className="p-3 border-t border-[hsl(var(--border))] bg-[hsl(var(--card))] flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend()
                  }}
                  placeholder="Ask any question, chapter or concept..."
                  className="flex-1 bg-[hsl(var(--muted))] px-3 py-2 text-xs sm:text-sm rounded-xl outline-none border border-transparent focus:border-primary text-[hsl(var(--foreground))]"
                />
                <Button
                  size="icon"
                  onClick={() => handleSend()}
                  disabled={loading || !input.trim()}
                  className="h-9 w-9 rounded-xl bg-primary text-primary-foreground shadow-md hover:scale-105 active:scale-95 transition-all shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
