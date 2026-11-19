import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface AIMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  category?: "explanation" | "accounting-entry" | "tax-calc" | "case-study" | "mistake-analysis"
  quickPromptUsed?: string
}

export interface WeakConcept {
  id: string
  concept: string
  subject: string
  errorCount: number
  lastAttempted: string
  notes: string
}

export interface StockHolding {
  symbol: string
  name: string
  shares: number
  avgPrice: number
  currentPrice: number
}

export interface StockTransaction {
  id: string
  symbol: string
  name: string
  type: "BUY" | "SELL"
  shares: number
  price: number
  total: number
  date: string
}

export interface CertificateRecord {
  id: string
  courseName: string
  institution: string
  studentName: string
  completionDate: string
  scorePercentage: number
  masteryLevel: number
  verificationCode: string
}

interface AppState {
  // Student Profile
  studentName: string
  studentLevel: number // 0 - 100
  studyStreakDays: number
  activeLanguage: "en" | "hi" | "hinglish"
  setLanguage: (lang: "en" | "hi" | "hinglish") => void

  // AI Memory Tutor
  aiMessages: AIMessage[]
  weakConcepts: WeakConcept[]
  studiedTopics: { id: string; title: string; course: string; timestamp: string; levelAchieved: number }[]
  addAIMessage: (msg: Omit<AIMessage, "id" | "timestamp">) => void
  recordWeakConcept: (concept: string, subject: string, notes: string) => void
  resolveWeakConcept: (id: string) => void
  markTopicStudied: (topic: { id: string; title: string; course: string; levelAchieved: number }) => void

  // Practical Lab: Virtual Stock Portfolio
  virtualCash: number
  portfolio: StockHolding[]
  transactions: StockTransaction[]
  executeTrade: (symbol: string, name: string, type: "BUY" | "SELL", shares: number, currentPrice: number) => { success: boolean; message: string }

  // Certificates & Tests
  certificates: CertificateRecord[]
  issueCertificate: (cert: Omit<CertificateRecord, "id" | "verificationCode" | "completionDate">) => CertificateRecord

  // AI API Keys
  geminiApiKey?: string
  openaiApiKey?: string
  setApiKeys: (keys: { geminiKey?: string; openaiKey?: string }) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      studentName: "Rahul Sharma",
      studentLevel: 28,
      studyStreakDays: 7,
      activeLanguage: "en",
      setLanguage: (lang) => set({ activeLanguage: lang }),
      geminiApiKey: "",
      openaiApiKey: "",
      setApiKeys: (keys) => set((state) => ({
        geminiApiKey: keys.geminiKey !== undefined ? keys.geminiKey : state.geminiApiKey,
        openaiApiKey: keys.openaiKey !== undefined ? keys.openaiKey : state.openaiApiKey,
      })),

      // AI Tutor Memory Initial State
      aiMessages: [
        {
          id: "m-welcome",
          role: "assistant",
          content: "Namaste Rahul! I am your AI Commerce & Professional Tutor. I remember what you study and where you face difficulty. How can I help you today? You can choose a quick action below or ask any doubt from CA, CMA, CS or B.Com syllabus.",
          timestamp: new Date().toISOString(),
          category: "explanation",
        },
      ],
      weakConcepts: [
        {
          id: "w-1",
          concept: "Depreciation - Written Down Value (WDV) method change to SLM",
          subject: "CA Foundation - Paper 1 Accounting",
          errorCount: 2,
          lastAttempted: "Yesterday",
          notes: "Confusion in prospective vs retrospective effect calculation as per AS 10.",
        },
        {
          id: "w-2",
          concept: "Section 194C vs 194J TDS Rate Applicability",
          subject: "Income Tax - CA Intermediate / B.Com",
          errorCount: 3,
          lastAttempted: "3 days ago",
          notes: "Confused between contract work (2%) and technical/professional fees (10%).",
        },
      ],
      studiedTopics: [
        { id: "t-1", title: "Accounting Equation & Principles", course: "CA Foundation", timestamp: "2 hours ago", levelAchieved: 25 },
        { id: "t-2", title: "Golden Rules of Accounting", course: "CA Foundation", timestamp: "1 day ago", levelAchieved: 30 },
        { id: "t-3", title: "Residential Status (Sec 6)", course: "Taxation", timestamp: "3 days ago", levelAchieved: 40 },
      ],

      addAIMessage: (msg) =>
        set((state) => ({
          aiMessages: [
            ...state.aiMessages,
            {
              ...msg,
              id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
              timestamp: new Date().toISOString(),
            },
          ],
        })),

      recordWeakConcept: (concept, subject, notes) =>
        set((state) => {
          const existing = state.weakConcepts.find((w) => w.concept.toLowerCase() === concept.toLowerCase())
          if (existing) {
            return {
              weakConcepts: state.weakConcepts.map((w) =>
                w.id === existing.id
                  ? { ...w, errorCount: w.errorCount + 1, lastAttempted: "Just now", notes: notes || w.notes }
                  : w
              ),
            }
          }
          return {
            weakConcepts: [
              ...state.weakConcepts,
              {
                id: `weak-${Date.now()}`,
                concept,
                subject,
                errorCount: 1,
                lastAttempted: "Just now",
                notes,
              },
            ],
          }
        }),

      resolveWeakConcept: (id) =>
        set((state) => ({
          weakConcepts: state.weakConcepts.filter((w) => w.id !== id),
        })),

      markTopicStudied: (topic) =>
        set((state) => ({
          studiedTopics: [
            { ...topic, timestamp: "Just now" },
            ...state.studiedTopics.filter((t) => t.id !== topic.id),
          ],
          studentLevel: Math.min(100, Math.max(state.studentLevel, topic.levelAchieved)),
        })),

      // Practical Lab - Virtual Stock Trading
      virtualCash: 1000000, // ₹10,00,000 Starting Simulated Capital
      portfolio: [
        { symbol: "TCS", name: "Tata Consultancy Services Ltd", shares: 25, avgPrice: 3820, currentPrice: 3950 },
        { symbol: "HDFCBANK", name: "HDFC Bank Ltd", shares: 50, avgPrice: 1610, currentPrice: 1680 },
        { symbol: "RELIANCE", name: "Reliance Industries Ltd", shares: 30, avgPrice: 2890, currentPrice: 2940 },
      ],
      transactions: [
        { id: "tx-1", symbol: "TCS", name: "Tata Consultancy Services", type: "BUY", shares: 25, price: 3820, total: 95500, date: "12 Nov 2026" },
        { id: "tx-2", symbol: "HDFCBANK", name: "HDFC Bank Ltd", type: "BUY", shares: 50, price: 1610, total: 80500, date: "10 Nov 2026" },
      ],

      executeTrade: (symbol, name, type, shares, currentPrice) => {
        const state = get()
        const total = shares * currentPrice
        if (type === "BUY") {
          if (state.virtualCash < total) {
            return { success: false, message: `Insufficient virtual cash. Needed ₹${total.toLocaleString("en-IN")}, available ₹${state.virtualCash.toLocaleString("en-IN")}.` }
          }
          const existing = state.portfolio.find((p) => p.symbol === symbol)
          let updatedPortfolio: StockHolding[]
          if (existing) {
            const totalShares = existing.shares + shares
            const avgPrice = Math.round((existing.shares * existing.avgPrice + total) / totalShares)
            updatedPortfolio = state.portfolio.map((p) =>
              p.symbol === symbol ? { ...p, shares: totalShares, avgPrice, currentPrice } : p
            )
          } else {
            updatedPortfolio = [...state.portfolio, { symbol, name, shares, avgPrice: currentPrice, currentPrice }]
          }
          const newTx: StockTransaction = {
            id: `tx-${Date.now()}`,
            symbol,
            name,
            type: "BUY",
            shares,
            price: currentPrice,
            total,
            date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
          }
          set({
            virtualCash: state.virtualCash - total,
            portfolio: updatedPortfolio,
            transactions: [newTx, ...state.transactions],
          })
          return { success: true, message: `Successfully bought ${shares} shares of ${symbol} for ₹${total.toLocaleString("en-IN")}.` }
        } else {
          // SELL
          const existing = state.portfolio.find((p) => p.symbol === symbol)
          if (!existing || existing.shares < shares) {
            return { success: false, message: `You do not hold ${shares} shares of ${symbol} to sell.` }
          }
          let updatedPortfolio: StockHolding[]
          if (existing.shares === shares) {
            updatedPortfolio = state.portfolio.filter((p) => p.symbol !== symbol)
          } else {
            updatedPortfolio = state.portfolio.map((p) =>
              p.symbol === symbol ? { ...p, shares: p.shares - shares, currentPrice } : p
            )
          }
          const newTx: StockTransaction = {
            id: `tx-${Date.now()}`,
            symbol,
            name,
            type: "SELL",
            shares,
            price: currentPrice,
            total,
            date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
          }
          set({
            virtualCash: state.virtualCash + total,
            portfolio: updatedPortfolio,
            transactions: [newTx, ...state.transactions],
          })
          return { success: true, message: `Successfully sold ${shares} shares of ${symbol} for ₹${total.toLocaleString("en-IN")}.` }
        }
      },

      // Certificates
      certificates: [
        {
          id: "cert-ca-f-1",
          courseName: "CA Foundation: Paper 1 Accounting Mastery",
          institution: "ICAI Educational Standard",
          studentName: "Rahul Sharma",
          completionDate: "14 Nov 2026",
          scorePercentage: 88,
          masteryLevel: 45,
          verificationCode: "EDU-CA-F-88429",
        },
      ],

      issueCertificate: (cert) => {
        const newRecord: CertificateRecord = {
          ...cert,
          id: `cert-${Date.now()}`,
          completionDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
          verificationCode: `EDU-${cert.institution.substring(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
        }
        set((state) => ({
          certificates: [newRecord, ...state.certificates],
        }))
        return newRecord
      },
    }),
    {
      name: "edufinance-storage",
    }
  )
)

