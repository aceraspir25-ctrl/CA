"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import {
  Bot,
  Send,
  Sparkles,
  Brain,
  AlertTriangle,
  CheckCircle2,
  BookmarkPlus,
  RefreshCw,
  Lightbulb,
  BookOpen,
  ArrowRight,
  Calculator,
  Scale,
  GraduationCap
} from "lucide-react"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const QUICK_ACTIONS = [
  { id: "eli10", label: "👶 Explain Like I'm 10", prompt: "Explain the Accounting Equation and Double-Entry system like I am a 10-year-old child with everyday examples." },
  { id: "hindi", label: "🇮🇳 Explain in Simple Hindi", prompt: "सरल हिंदी में समझाइए कि Depreciation (ह्रास) क्या है और SLM तथा WDV विधि में क्या अंतर है?" },
  { id: "hinglish", label: "💬 Explain in Hinglish", prompt: "Hinglish me explain karo: Income Tax me Old Regime vs New Regime (Section 115BAC) ka kya difference hai?" },
  { id: "real-life", label: "🏢 Real-Life Business Example", prompt: "Give a real-world business example of Working Capital Management and Operating Cycle for a retail shop." },
  { id: "journal", label: "📒 Show Journal Entries", prompt: "Show step-by-step Golden Rules journal entries for: Started business with cash Rs 5,00,000, purchased goods Rs 1,00,000 with 18% GST, and sold goods on credit." },
  { id: "step-by-step", label: "🔢 Step-by-Step Calculation", prompt: "Calculate Break-Even Point in units and sales value: Fixed Cost = Rs 2,00,000, Selling Price = Rs 50/unit, Variable Cost = Rs 30/unit." },
  { id: "practice-q", label: "📝 Give Practice Questions", prompt: "Give me 3 CA Foundation examination-level practical MCQs on Bank Reconciliation Statement (BRS) with explanations." },
  { id: "test-me", label: "🎯 Test My Knowledge", prompt: "Test my knowledge on Companies Act 2013 provisions regarding Board Meetings and Quorum under Section 173 and 174." },
  { id: "mistake", label: "⚠️ Explain My Mistake", prompt: "Why is Carriage Inwards added to Trading Account but Carriage Outwards charged to Profit & Loss Account? Explain my concept confusion." },
  { id: "go-deeper", label: "🚀 Go Deeper (Mastery Level)", prompt: "Explain Ind AS 115 (Revenue from Contracts with Customers) five-step model with professional accounting treatment." }
]

function AITutorContent() {
  const searchParams = useSearchParams()
  const {
    studentName,
    studentLevel,
    activeLanguage,
    aiMessages,
    weakConcepts,
    studiedTopics,
    addAIMessage,
    resolveWeakConcept,
    recordWeakConcept
  } = useAppStore()

  const [inputQuery, setInputQuery] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState<"chat" | "memory">("chat")

  const promptParam = searchParams.get("prompt") || searchParams.get("topic")

  useEffect(() => {
    if (promptParam) {
      handleSend(`Please explain: ${promptParam} in simple terms with step-by-step examples.`)
    }
  }, [promptParam])

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputQuery
    if (!query.trim()) return

    addAIMessage({
      role: "user",
      content: query,
      category: "explanation",
    })

    if (!textToSend) setInputQuery("")
    setIsTyping(true)

    try {
      // 1. Attempt server AI Gateway with Gemini / OpenAI fallback
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...aiMessages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: query },
          ],
          capability: "teacher",
          studentLevel,
          language: activeLanguage,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data?.content) {
          addAIMessage({
            role: "assistant",
            content: data.content,
            category: "explanation",
            quickPromptUsed: textToSend ? query : undefined,
          })
          setIsTyping(false)
          return
        }
      }
    } catch (e) {
      console.warn("AI Gateway offline, falling back to local pedagogical engine:", e)
    }

    // 2. Client-side local pedagogical fallback (preserved)
    setTimeout(() => {
      let botResponse = ""
      const q = query.toLowerCase()

      if (q.includes("10-year") || q.includes("eli10") || q.includes("accounting equation")) {
        botResponse = `### 👶 Accounting Equation: Explained Like You're 10!

Imagine you have a **School Bag**:
- Inside the bag, you have: Notebooks worth ₹300, Colour Box worth ₹150, Water Bottle worth ₹50.
- Total things you **HAVE (Assets)** = ₹500.

Now, where did the money come from to buy these?
1. Your Mummy gave you ₹400 from her wallet ➔ This is **Owner's Equity (Capital)**.
2. You borrowed ₹100 from your friend Rohan to buy the bottle ➔ This is **Liability (Loan)**.

Notice the fundamental rule:
Assets (₹500) = Liabilities (₹100) + Capital (₹400)

Every single business in the world — from your local samosa stall to Apple & Tata — runs on this single fundamental truth:
**Everything a business OWNS = Everything it OWES to others + what the owner invested!**`
      } else if (q.includes("hindi") || q.includes("depreciation") || q.includes("ह्रास")) {
        botResponse = `### 🇮🇳 Depreciation (ह्रास): सरल हिंदी में समझ

**ह्रास क्या है?**
जब आप ₹50,000 की नई मोटरसाइकिल खरीदते हैं, और 1 साल बाद उसे बेचते हैं, तो कोई भी आपको ₹50,000 नहीं देगा। क्यों? क्योंकि उपयोग (Wear & Tear), समय बीतने (Efflux of time), और नई तकनीक आने के कारण उसका मूल्य घट गया। इस घटे हुए मूल्य को ही **Depreciation (ह्रास)** कहते हैं।

---

#### ⚖️ दो मुख्य विधियां (Methods):

| आधार | Straight Line Method (SLM) | Written Down Value (WDV) |
|---|---|---|
| **गणना का आधार** | हमेशा संपत्ति की **मूल लागत (Original Cost)** पर | हर साल के **घटते हुए शेष (Book Value)** पर |
| **ह्रास की राशि** | हर साल बिल्कुल **समान (Equal)** रहती है | हर साल लगातार **कम (Decreasing)** होती जाती है |
| **संपत्ति का मूल्य** | अंत में शून्य (Zero) हो सकता है | कभी भी शून्य नहीं होता |
| **आयकर मान्यता** | Income Tax Act इसे आमतौर पर नहीं मानता | **Income Tax Act (Sec 32) इसे ही मान्यता देता है** |

> 💡 **स्मार्ट टिप:** भारतीय कंपनी अधिनियम 2013 की अनुसूची II के अनुसार ह्रास उपयोगी जीवन (Useful Life) के आधार पर निकाला जाता है।`
      } else if (q.includes("hinglish") || q.includes("regime") || q.includes("115bac")) {
        botResponse = `### 💬 Old vs New Tax Regime (Section 115BAC) Explained!

Budget 2023 & 2024 ke baad **New Tax Regime** default ban chuka hai. Dono me main difference deductions aur tax rates ka hai:

#### 1. Old Tax Regime:
- High Tax Slabs (5%, 20%, 30%).
- **Lekin Deductions Allow Hote Hain:**
  - Standard Deduction: ₹50,000
  - Section 80C (PPF, EPF, ELSS, LIC): ₹1,50,000 tak
  - Section 80D (Health Insurance): ₹25,000 to ₹50,000
  - Section 24b (Home Loan Interest): ₹2,00,000 tak
  - HRA exemption under Section 10(13A).

#### 2. New Tax Regime (Section 115BAC):
- Concessional Lower Slabs:
  - ₹0 – ₹3 Lakh: Nil
  - ₹3 – ₹7 Lakh: 5%
  - ₹7 – ₹10 Lakh: 10%
  - ₹10 – ₹12 Lakh: 15%
  - ₹12 – ₹15 Lakh: 20%
  - Above ₹15 Lakh: 30%
- **Standard Deduction:** ₹75,000 (Salaried persons ke liye).
- **Tax Rebate under Section 87A:** Agar taxable income ₹7,00,000 tak hai, to **Zero Tax**!
- No 80C, 80D, HRA deductions allowed.

> 🎯 **Rule of Thumb:** Agar aapke total deductions ₹3,75,000 se zyada bante hain tabhi Old Regime faydemand hai, warna 90% logo ke liye New Regime better hai!`
      } else if (q.includes("break-even") || q.includes("bep") || q.includes("fixed cost")) {
        botResponse = `### 🔢 Step-by-Step Break-Even Point (BEP) Solution

#### Given Data:
- Fixed Costs (FC) = ₹2,00,000
- Selling Price per unit (SP) = ₹50
- Variable Cost per unit (VC) = ₹30

---

#### Step 1: Calculate Contribution per unit (C)
Contribution = Selling Price - Variable Cost
Contribution = ₹50 - ₹30 = ₹20 per unit

#### Step 2: Calculate Profit-Volume (P/V) Ratio
P/V Ratio = (Contribution / Selling Price) × 100
P/V Ratio = (20 / 50) × 100 = 40%

#### Step 3: Break-Even Point in Units (BEP Units)
BEP Units = Fixed Cost / Contribution per unit = ₹2,00,000 / ₹20 = 10,000 Units

#### Step 4: Break-Even Point in Sales Value (BEP Value)
BEP Value = Fixed Cost / P/V Ratio = ₹2,00,000 / 0.40 = ₹5,00,000

> 📌 **Interpretation:** The business makes neither profit nor loss when it sells exactly **10,000 units** or achieves **₹5,00,000** in turnover!`
      } else if (q.includes("journal") || q.includes("golden rules")) {
        botResponse = `### 📒 Golden Rules & Step-by-Step Journal Entries

#### Three Golden Rules of Accounting:
1. **Real Account (Assets):** Debit what comes in, Credit what goes out.
2. **Personal Account (Persons/Entities):** Debit the receiver, Credit the giver.
3. **Nominal Account (Expenses/Incomes):** Debit all expenses and losses, Credit all incomes and gains.

---

#### Transaction 1: Started business with Cash ₹5,00,000
- Cash comes in (Real A/c ➔ Debit)
- Capital given by Owner (Personal A/c ➔ Credit)
\`\`\`text
Cash A/c                           Dr.   ₹5,00,000
     To Capital A/c                                ₹5,00,000
(Being business commenced with cash)
\`\`\`

#### Transaction 2: Purchased goods worth ₹1,00,000 with 18% GST (CGST 9% + SGST 9%)
\`\`\`text
Purchases A/c                      Dr.   ₹1,00,000
Input CGST A/c                     Dr.       ₹9,000
Input SGST A/c                     Dr.       ₹9,000
     To Bank / Creditors A/c                       ₹1,18,000
(Being goods purchased with input tax credit)
\`\`\`

#### Transaction 3: Sold goods on credit to Sharma Traders for ₹1,50,000 + 18% GST
\`\`\`text
Sharma Traders A/c                 Dr.   ₹1,77,000
     To Sales A/c                                  ₹1,50,000
     To Output CGST A/c                              ₹13,500
     To Output SGST A/c                              ₹13,500
(Being credit sale made with output GST charged)
\`\`\``
      } else {
        botResponse = `### 🎓 Comprehensive Analysis for Your Query: "${query}"

Here is the structured conceptual breakdown from ICAI & ICMAI professional curriculum:

#### 1. Core Principle
In Commerce and Financial Accounting, every transaction impacts two aspects. Accuracy is maintained through strict compliance with Applicable Accounting Standards (AS / Ind AS) and regulatory statutes (Companies Act 2013 / Income Tax Act 1961).

#### 2. Practical Application
When tackling examination and real-world corporate situations:
- Always classify the nature of the transaction (Capital vs Revenue nature).
- Apply relevant statutory provisions (e.g. Schedule III for Balance Sheet, Section 115BAC for Taxation).
- Verify double-entry equality before advancing to financial statements.

#### 3. Recommended Follow-Up
- Practice testing this concept in the **Virtual Practice Lab**.
- Try solving related MCQs in **Tests & Assessments**.
- If you made an error in this before, it is tracked in your **AI Memory** tab!

Would you like me to explain this step-by-step or test your knowledge with a mock question?`
      }

      addAIMessage({
        role: "assistant",
        content: botResponse,
        category: "explanation",
        quickPromptUsed: textToSend ? query : undefined,
      })
      setIsTyping(false)
    }, 800)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/30 rounded-lg">
              <Bot className="h-6 w-6 text-indigo-200" />
            </div>
            <h1 className="text-2xl font-bold">AI Personal Memory Tutor</h1>
            <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">Active & Learning</Badge>
          </div>
          <p className="text-indigo-200 text-sm max-w-2xl">
            Trained on ICAI, ICMAI, ICSI & PRSU syllabuses. Remembers what you study, identifies weak concepts, and adapts explanations to your pace.
          </p>
        </div>

        {/* Student Memory Stats Strip */}
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
          <div className="text-center px-3 border-r border-white/20">
            <p className="text-xs text-indigo-200">Learner Level</p>
            <p className="text-xl font-bold text-emerald-300">Level {studentLevel}</p>
          </div>
          <div className="text-center px-3 border-r border-white/20">
            <p className="text-xs text-indigo-200">Weak Areas Tracked</p>
            <p className="text-xl font-bold text-amber-300">{weakConcepts.length}</p>
          </div>
          <div className="text-center px-3">
            <p className="text-xs text-indigo-200">Topics Mastered</p>
            <p className="text-xl font-bold text-blue-200">{studiedTopics.length}</p>
          </div>
        </div>
      </div>

      {/* Tabs: Active Chat vs AI Memory Inspector */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "chat" | "memory")} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-[hsl(var(--muted))]">
            <TabsTrigger value="chat" className="gap-2">
              <Bot className="h-4 w-4" /> Interactive Tutor Chat
            </TabsTrigger>
            <TabsTrigger value="memory" className="gap-2">
              <Brain className="h-4 w-4" /> 🧠 AI Memory Bank ({weakConcepts.length} weak areas)
            </TabsTrigger>
          </TabsList>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab(activeTab === "chat" ? "memory" : "chat")}
            className="gap-2 text-xs"
          >
            {activeTab === "chat" ? <Brain className="h-3.5 w-3.5 text-indigo-500" /> : <Bot className="h-3.5 w-3.5 text-blue-500" />}
            {activeTab === "chat" ? "Inspect AI Memory" : "Return to Chat"}
          </Button>
        </div>

        {/* TAB 1: Chat Stream */}
        <TabsContent value="chat" className="space-y-6">
          {/* Quick Action Chips Strip */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" /> QUICK PROMPTS & SPECIALIZED EXPLANATIONS:
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleSend(action.prompt)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:bg-indigo-50 hover:border-indigo-300 dark:hover:bg-indigo-950/50 dark:hover:border-indigo-700 transition-all shadow-sm"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Log */}
          <Card className="min-h-[480px] flex flex-col justify-between border-[hsl(var(--border))]">
            <CardContent className="p-6 space-y-6 overflow-y-auto max-h-[600px]">
              {aiMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 shadow-sm text-sm space-y-2 ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-xs"
                        : "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-bl-xs"
                    }`}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5 text-[11px] opacity-70">
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => recordWeakConcept("Topic from Chat", "General", msg.content.substring(0, 80))}
                            className="hover:underline flex items-center gap-1"
                          >
                            <BookmarkPlus className="h-3 w-3" /> Save to Weak List
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white shrink-0 font-bold text-xs">
                      {studentName.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 items-center text-sm text-[hsl(var(--muted-foreground))]">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 animate-pulse">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[hsl(var(--muted))]">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
                    <span className="text-xs ml-2">Consulting ICAI / ICMAI syllabus knowledge base...</span>
                  </div>
                </div>
              )}
            </CardContent>

            {/* Input Bar */}
            <div className="p-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex items-center gap-2"
              >
                <Input
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask any concept from CA, CMA, CS or B.Com... (e.g. 'Explain Section 185 loan to directors' or 'How to calculate WACC?')"
                  className="flex-1 bg-[hsl(var(--background))]"
                />
                <Button type="submit" disabled={!inputQuery.trim() || isTyping} className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                  <Send className="h-4 w-4" /> Send
                </Button>
              </form>
            </div>
          </Card>
        </TabsContent>

        {/* TAB 2: AI Memory Bank & Weak Area Tracker */}
        <TabsContent value="memory" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Weak Concepts Watchlist */}
            <Card className="md:col-span-2 border-[hsl(var(--border))]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      Active Weak Areas & Knowledge Gaps
                    </CardTitle>
                    <CardDescription>
                      The AI Memory Tutor automatically flags concepts where you made errors in quizzes or marked for revision.
                    </CardDescription>
                  </div>
                  <Badge variant="warning">{weakConcepts.length} Concepts</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {weakConcepts.length === 0 ? (
                  <div className="text-center py-12 text-[hsl(var(--muted-foreground))]">
                    <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
                    <p className="font-medium">No active weak concepts! You are fully on track.</p>
                  </div>
                ) : (
                  weakConcepts.map((weak) => (
                    <div
                      key={weak.id}
                      className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-sm text-[hsl(var(--foreground))]">{weak.concept}</h4>
                            <Badge variant="outline" className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                              {weak.errorCount} Mistake{weak.errorCount > 1 ? "s" : ""} Recorded
                            </Badge>
                          </div>
                          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{weak.subject} • Last tested {weak.lastAttempted}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => resolveWeakConcept(weak.id)}
                          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 text-xs gap-1"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" /> Mark Resolved
                        </Button>
                      </div>
                      <p className="text-xs bg-white dark:bg-black/20 p-2.5 rounded-lg border border-amber-100 dark:border-amber-900/30 text-[hsl(var(--foreground))]">
                        📝 <strong>Tutor Note:</strong> {weak.notes}
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setActiveTab("chat")
                            handleSend(`I struggled with "${weak.concept}" in ${weak.subject}. Please explain it from absolute zero with a step-by-step example so I never make this mistake again!`)
                          }}
                          className="text-xs gap-1 h-7 border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300"
                        >
                          <Sparkles className="h-3 w-3" /> Re-Explain Step-by-Step
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Right: Studied Topics & Retention Log */}
            <div className="space-y-6">
              <Card className="border-[hsl(var(--border))]">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    Recently Mastered Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {studiedTopics.map((item) => (
                    <div key={item.id} className="p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold">{item.title}</p>
                        <p className="text-[11px] text-[hsl(var(--muted-foreground))]">{item.course} • {item.timestamp}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-[10px]">
                        Lvl {item.levelAchieved}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-[hsl(var(--border))] bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-indigo-600" />
                    Smart Learning Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs text-[hsl(var(--muted-foreground))]">
                  <p>Based on your recent study history:</p>
                  <ul className="space-y-2 list-disc pl-4 text-[hsl(var(--foreground))]">
                    <li>Ready to unlock <strong>CA Foundation Chapter 4: Inventories (FIFO/NRV)</strong>.</li>
                    <li>Recommend revising <strong>TDS Section 194C</strong> before attempting the next Tax Assessment.</li>
                    <li>Daily study goal: 45 min completed / 120 min target.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function AITutorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-[hsl(var(--muted-foreground))]">Loading AI Tutor...</div>}>
      <AITutorContent />
    </Suspense>
  )
}
