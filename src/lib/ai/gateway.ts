import { AIChatRequest, AIChatResponse, AIProvider, AIUsageMetrics } from "./types"

// Global in-memory metrics for admin dashboard
export const aiUsageMetrics: AIUsageMetrics = {
  totalRequests: 0,
  geminiRequests: 0,
  openaiRequests: 0,
  simulatedRequests: 0,
  totalPromptTokens: 0,
  totalCompletionTokens: 0,
  estimatedCostUSD: 0.0,
  lastActiveTimestamp: new Date().toISOString(),
}

function updateMetrics(provider: AIProvider, promptTokens: number, completionTokens: number) {
  aiUsageMetrics.totalRequests += 1
  if (provider === "gemini") aiUsageMetrics.geminiRequests += 1
  else if (provider === "openai") aiUsageMetrics.openaiRequests += 1
  else aiUsageMetrics.simulatedRequests += 1

  aiUsageMetrics.totalPromptTokens += promptTokens
  aiUsageMetrics.totalCompletionTokens += completionTokens

  // Approx cost: OpenAI gpt-4o-mini (~$0.15/1M prompt, $0.60/1M completion)
  // Gemini 2.5 Flash (~$0.075/1M prompt, $0.30/1M completion)
  const cost =
    provider === "openai"
      ? (promptTokens * 0.15 + completionTokens * 0.6) / 1000000
      : provider === "gemini"
      ? (promptTokens * 0.075 + completionTokens * 0.3) / 1000000
      : 0

  aiUsageMetrics.estimatedCostUSD += cost
  aiUsageMetrics.lastActiveTimestamp = new Date().toISOString()
}

/**
 * Builds the comprehensive pedagogical system prompt based on user settings
 */
function buildSystemPrompt(request: AIChatRequest): string {
  const lang = request.language || "en"
  const langInstruction =
    lang === "hi"
      ? "Respond primarily in pure, clear Hindi (Devanagari script) with technical English terms in brackets."
      : lang === "hinglish"
      ? "Respond in conversational Hinglish (Hindi written in Roman script mixed with standard English accounting terms)."
      : "Respond in professional, lucid English with clear structure, bold highlights, and bullet points."

  const level = request.studentLevel || 28
  const capability = request.capability || "teacher"

  return `You are EduFinance Pro's Principal Academic AI Mentor and Chartered Accountant / Professor.
You adhere to official Indian & Global professional curricula:
- ICAI (New Scheme 2023+): CA Foundation, Intermediate, Final
- ICMAI: Cost & Management Accountancy
- ICSI: Company Secretary (CSEET, Executive, Professional)
- ACCA: Applied Knowledge, Applied Skills, Strategic Professional
- PRSU / NEP: B.Com & BBA University syllabuses

STUDENT CONTEXT:
- Student Level: ${level} / 100
- Active Capability: ${capability}
- Language Preference: ${langInstruction}

PEDAGOGICAL TEACHING RULES:
1. Explain concepts from ABSOLUTE ZERO before introducing advanced statutory rules.
2. Provide step-by-step Golden Rules / Journal Entries where accounting is involved.
3. Reference authoritative statutory sections (e.g. Companies Act 2013, Income Tax Act 1961, CGST Act 2017, Ind AS / IFRS) accurately.
4. Highlight common examination mistakes and memory tricks (mnemonics).
5. Always maintain an encouraging, highly instructional, and professional tone.`
}

/**
 * Calls Google Gemini REST API
 */
async function callGemini(request: AIChatRequest, apiKey: string): Promise<AIChatResponse | null> {
  const model = "gemini-2.5-flash"
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

  const systemInstruction = buildSystemPrompt(request)
  const contents = request.messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }))

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemInstruction }] },
        contents,
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 2048,
        },
      }),
    })

    if (!res.ok) {
      console.warn(`Gemini API returned status ${res.status}`)
      return null
    }

    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) return null

    const promptTokens = data?.usageMetadata?.promptTokenCount || 200
    const completionTokens = data?.usageMetadata?.candidatesTokenCount || 400

    updateMetrics("gemini", promptTokens, completionTokens)

    return {
      content: text,
      providerUsed: "gemini",
      modelUsed: model,
      tokensUsed: {
        prompt: promptTokens,
        completion: completionTokens,
        total: promptTokens + completionTokens,
      },
      cached: false,
      timestamp: new Date().toISOString(),
    }
  } catch (err) {
    console.error("Gemini API error:", err)
    return null
  }
}

/**
 * Calls OpenAI REST API
 */
async function callOpenAI(request: AIChatRequest, apiKey: string): Promise<AIChatResponse | null> {
  const model = "gpt-4o-mini"
  const url = "https://api.openai.com/v1/chat/completions"

  const systemInstruction = buildSystemPrompt(request)
  const messages = [
    { role: "system", content: systemInstruction },
    ...request.messages.map((m) => ({ role: m.role, content: m.content })),
  ]

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.6,
        max_tokens: 2048,
      }),
    })

    if (!res.ok) {
      console.warn(`OpenAI API returned status ${res.status}`)
      return null
    }

    const data = await res.json()
    const text = data?.choices?.[0]?.message?.content
    if (!text) return null

    const promptTokens = data?.usage?.prompt_tokens || 200
    const completionTokens = data?.usage?.completion_tokens || 400

    updateMetrics("openai", promptTokens, completionTokens)

    return {
      content: text,
      providerUsed: "openai",
      modelUsed: model,
      tokensUsed: {
        prompt: promptTokens,
        completion: completionTokens,
        total: promptTokens + completionTokens,
      },
      cached: false,
      timestamp: new Date().toISOString(),
    }
  } catch (err) {
    console.error("OpenAI API error:", err)
    return null
  }
}

/**
 * Intelligent Academic Offline / Fallback Generator
 */
function generateContextualAcademicResponse(request: AIChatRequest): AIChatResponse {
  const lastMsg = request.messages[request.messages.length - 1]?.content || ""
  const q = lastMsg.toLowerCase()
  const lang = request.language || "en"

  let responseText = ""

  if (q.includes("depreciation") || q.includes("ह्रास") || q.includes("slm") || q.includes("wdv")) {
    responseText =
      lang === "hi"
        ? `### 🇮🇳 Depreciation (ह्रास): सरल एवं व्यावहारिक समझ

**ह्रास क्या है?**
समय बीतने, टूट-फूट या अप्रचलन (Obsolescence) के कारण किसी स्थायी संपत्ति (Fixed Asset) के मूल्य में आने वाली स्थायी और निरंतर कमी को **ह्रास (Depreciation)** कहते हैं।

#### 1. Straight Line Method (सरल रेखा पद्धति - SLM)
- हर वर्ष एक समान राशि संपत्ति के मूल लागत (Original Cost) पर घटाई जाती है।
- **फॉर्मूला:** \`वार्षिक ह्रास = (लागत - अवशिष्ट मूल्य) ÷ उपयोगी जीवनकाल\`
- **फायदा:** गणना में अत्यंत सरल।

#### 2. Written Down Value Method (अपलिखित मूल्य पद्धति - WDV)
- ह्रास संपत्ति के प्रारंभिक घटते शेष (Book Value at opening) पर लगाया जाता है।
- **Income Tax Act 1961 (धारा 32):** भारत का आयकर कानून ब्लॉक ऑफ एसेट्स के लिए केवल **WDV पद्धति** को ही मान्यता देता है (विद्युत उत्पादन इकाइयों को छोड़कर)।

**लेखांकन मानक (AS 10 / Ind AS 16):** ह्रास पद्धति में परिवर्तन अब 'Change in Accounting Estimate' माना जाता है और इसे **भविष्यलक्षी प्रभाव (Prospective Effect)** से लागू किया जाता है।`
        : `### 📊 Depreciation: Comprehensive Academic & Professional Analysis

**Core Definition (Ind AS 16 / AS 10):**
Depreciation is the systematic allocation of the depreciable amount of an asset over its estimated useful economic life.

| Dimension | Straight Line Method (SLM) | Written Down Value (WDV) |
|---|---|---|
| **Depreciation Base** | Original acquisition cost | Opening carrying amount (WDV) |
| **Annual Charge** | Constant throughout asset life | Decreases year after year |
| **P&L Total Burden (Dep + Repair)** | Increases as asset ages | Equalized (High Dep + Low Repair initially; Low Dep + High Repair later) |
| **Income Tax Recognition** | Allowed only for Power Generating units | **Mandatory under Section 32** for all asset blocks |

**Golden Journal Entry:**
- Depreciation A/c Dr. (Nominal - Expense)
- To Accumulated Depreciation A/c / Asset A/c Cr.`
  } else if (q.includes("115bac") || q.includes("tax regime") || q.includes("income tax")) {
    responseText = `### ⚖️ Income Tax: Old Regime vs New Regime (Section 115BAC)

As per the Finance Act / Budget 2024 updates:

#### 1. Default Tax Regime: Section 115BAC
- New Regime is now the **Default Tax Regime** for Individuals, HUFs, AOPs, and BOIs.
- **Salaried Standard Deduction:** Increased from ₹50,000 to **₹75,000**.
- **Section 87A Rebate:** Taxable income up to **₹7,00,000** pays ₹0 net income tax.
- **Slabs (Budget 2024):**
  - Up to ₹3,00,000: Nil
  - ₹3,00,001 to ₹7,00,000: 5%
  - ₹7,00,001 to ₹10,00,000: 10%
  - ₹10,00,001 to ₹12,00,000: 15%
  - ₹12,00,001 to ₹15,00,000: 20%
  - Above ₹15,00,000: 30%

#### 2. Old Regime Key Features
- Allows Chapter VI-A deductions: Section 80C (up to ₹1.5L), Section 80D (Health Insurance), Section 24(b) (Home loan interest up to ₹2L), HRA exemption under Section 10(13A).
- Standard deduction for salary remains ₹50,000.`
  } else if (q.includes("bep") || q.includes("break-even") || q.includes("marginal costing")) {
    responseText = `### 📈 Marginal Costing: Break-Even Point (BEP) Mastery

**Fundamental Marginal Costing Equation:**
$$\\text{Sales} - \\text{Variable Cost} = \\text{Contribution} = \\text{Fixed Cost} + \\text{Profit}$$

**Key Formulas:**
1. **P/V Ratio (Profit-Volume Ratio):**
   $$\\text{P/V Ratio} = \\frac{\\text{Contribution}}{\\text{Sales}} \\times 100$$
2. **Break-Even Point (in Units):**
   $$\\text{BEP (Units)} = \\frac{\\text{Fixed Cost}}{\\text{Contribution per Unit}}$$
3. **Break-Even Point (in Value ₹):**
   $$\\text{BEP (₹)} = \\frac{\\text{Fixed Cost}}{\\text{P/V Ratio}}$$
4. **Margin of Safety (MOS):**
   $$\\text{MOS} = \\text{Actual Sales} - \\text{Break-Even Sales} = \\frac{\\text{Profit}}{\\text{P/V Ratio}}$$

*Exam Tip:* Higher P/V Ratio and wider Margin of Safety reflect financial resilience against demand downturns.`
  } else {
    responseText = `### 🎓 Academic Concept Breakdown

**Question / Topic:** "${lastMsg}"

#### 1. Fundamental Conceptual Premise
In commerce, accountancy and business governance, every transaction and decision must be anchored on verifiable source documentation (Audit Trail), legal compliance, and economic reality.

#### 2. Key Professional & Statutory Principles
- **Dual Aspect Concept:** Every debit requires an equal and corresponding credit ($$Assets = Liabilities + Equity$$).
- **Substance over Form:** Accounting treatment must reflect financial reality rather than mere legal form.
- **Prudence Principle:** Anticipate no profits, but provide for all probable losses.

#### 3. Practical Industry Application
Corporate controllers and audit committees apply these tenets to ensure financial statements provide a **true and fair view** under Section 129 of the Companies Act 2013 and applicable Accounting Standards (Ind AS / AS).

#### 4. Exam & Practical Advice
Review related illustrations in your Institute study module, verify journal entries with narration, and double-check statutory threshold dates.`
  }

  updateMetrics("simulated", 150, 350)

  return {
    content: responseText,
    providerUsed: "simulated",
    modelUsed: "EduFinance-Knowledge-Engine-v2",
    tokensUsed: { prompt: 150, completion: 350, total: 500 },
    cached: true,
    timestamp: new Date().toISOString(),
  }
}

/**
 * Main Centralized AI Gateway Entry Point with Automatic Provider Fallback
 */
export async function executeAIChat(request: AIChatRequest): Promise<AIChatResponse> {
  const geminiKey = process.env.GEMINI_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY

  const preferred = request.preferredProvider || "gemini"

  // Primary attempt
  if (preferred === "gemini" && geminiKey) {
    const res = await callGemini(request, geminiKey)
    if (res) return res
    // Fallback to OpenAI if configured
    if (openaiKey) {
      const fallbackRes = await callOpenAI(request, openaiKey)
      if (fallbackRes) return fallbackRes
    }
  } else if (preferred === "openai" && openaiKey) {
    const res = await callOpenAI(request, openaiKey)
    if (res) return res
    // Fallback to Gemini if configured
    if (geminiKey) {
      const fallbackRes = await callGemini(request, geminiKey)
      if (fallbackRes) return fallbackRes
    }
  } else {
    // If preferred is unconfigured, try whichever key is present
    if (geminiKey) {
      const res = await callGemini(request, geminiKey)
      if (res) return res
    }
    if (openaiKey) {
      const res = await callOpenAI(request, openaiKey)
      if (res) return res
    }
  }

  // Fallback to rich, context-aware academic generator if both fail or keys are absent
  return generateContextualAcademicResponse(request)
}
