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
 * Deep Commerce Knowledge Engine - Contextual Academic Fallback
 */
function generateContextualAcademicResponse(request: AIChatRequest): AIChatResponse {
  const lastMsg = request.messages[request.messages.length - 1]?.content || ""
  const q = lastMsg.toLowerCase()
  const lang = request.language || "en"

  let responseText = ""

  // 1. Bank Reconciliation Statement (BRS)
  if (q.includes("brs") || q.includes("bank reconciliation") || q.includes("समाधान विवरण")) {
    responseText =
      lang === "hi"
        ? `### 🏦 बैंक समाधान विवरण (BRS): विस्तृत एवं परीक्षा-उपयोगी समझ

**BRS क्या है?**
रोकड़ बही (Cash Book) के बैंक कॉलम और बैंक पासबुक (Pass Book) के शेष में समय-समय पर अंतर आ जाता है। इस अंतर के कारणों को स्पष्ट करने और दोनों के शेष का मिलान करने के लिए जो विवरण बनाया जाता है, उसे **Bank Reconciliation Statement (BRS)** कहते हैं।

#### ⏱️ अंतर के प्रमुख कारण:
1. **चेक जारी किए गए परंतु भुगतान हेतु प्रस्तुत नहीं हुए:** रोकड़ बही में तुरंत घटा दिया गया, परंतु बैंक में नहीं घटा।
2. **चेक जमा किए गए परंतु संग्रहित (Clearing) नहीं हुए:** रोकड़ बही में जोड़ दिया गया, पर बैंक में अभी तक जमा नहीं हुआ।
3. **बैंक द्वारा सीधे लगाए गए प्रभार / ब्याज:** बैंक शुल्क (Bank Charges) पासबुक में कट गए, रोकड़ बही में प्रविष्टि बाकी है।
4. **ग्राहकों द्वारा सीधे बैंक खाते में जमा राशि:** पासबुक का बैलेंस बढ़ गया, पर व्यापारी को सूचना बाद में मिली।

#### 💡 गोल्डन नियम (Starting Point Rule):
- यदि **Cash Book के अनुकूल शेष** से शुरू कर रहे हैं, तो जो भी बैंक पासबुक में जुड़ चुका है उसे **जोड़ें (+)**, और जो पासबुक में घट चुका है उसे **घटाएं (-)**।`
        : `### 🏦 Bank Reconciliation Statement (BRS): Complete Conceptual & Exam Analysis

**Core Definition:**
A Bank Reconciliation Statement (BRS) is a schedule prepared periodically by a business to reconcile the difference between the bank balance as shown by the **Cash Book (Bank Column)** and the balance shown by the **Bank Pass Book / Bank Statement**.

#### ⏱️ The 4 Major Causes of Differences:
| Transaction | Cash Book Impact | Bank Pass Book Impact | Adjustment (If starting from Cash Book) |
|---|---|---|---|
| **Cheques issued but not presented for payment** | Decreased (-) | Unchanged | **ADD (+)** |
| **Cheques deposited but not cleared** | Increased (+) | Unchanged | **LESS (-)** |
| **Direct payment by bank (Standing Order, Bank Charges)** | Unchanged | Decreased (-) | **LESS (-)** |
| **Direct collection by bank / Dividend received** | Unchanged | Increased (+) | **ADD (+)** |

#### ⚠️ Exam Trap to Avoid:
Always check whether you are asked to prepare an **Adjusted Cash Book** first. If required, record all cash book omissions and entity errors in the Cash Book first; only timing differences (unpresented/uncleared cheques) appear in the BRS!`
  }
  // 2. Journal Entries & Golden Rules
  else if (q.includes("journal") || q.includes("golden rule") || q.includes("swarnim") || q.includes("रोजनामचा")) {
    responseText = `### 📒 Golden Rules of Accounting & Standard Journal Entries

All accounts in financial accounting are classified into **3 Classic Types**:

#### 1. The Three Golden Rules:
1. **Personal Accounts (व्यक्तिगत खाते):**
   - Rule: *Debit the Receiver, Credit the Giver* (पाने वाले को नाम, देने वाले को जमा)
   - Examples: Ram A/c, Tata Consultancy Services Ltd A/c, Bank A/c, Capital A/c.
2. **Real Accounts (वास्तविक खाते):**
   - Rule: *Debit what comes in, Credit what goes out* (जो वस्तु व्यापार में आए उसे नाम, जो जाए उसे जमा)
   - Examples: Cash A/c, Plant & Machinery A/c, Furniture A/c, Building A/c.
3. **Nominal Accounts (नाममात्र खाते):**
   - Rule: *Debit all expenses & losses, Credit all incomes & gains* (समस्त व्यय व हानियों को नाम, समस्त आय व लाभों को जमा)
   - Examples: Rent A/c, Salary A/c, Commission Received A/c, Depreciation A/c.

#### 📝 Practical Example (3 Classic Transactions):
\`\`\`text
1. Capital introduced into business in cash ₹5,00,000:
   Cash A/c ..................................... Dr.  ₹5,00,000
       To Capital A/c                                         ₹5,00,000
   (Being capital introduced by proprietor)

2. Purchased goods for ₹1,00,000 + 18% GST on credit from Apex Ltd:
   Purchases A/c ................................. Dr.  ₹1,00,000
   Input CGST A/c (9%) ........................... Dr.     ₹9,000
   Input SGST A/c (9%) ........................... Dr.     ₹9,000
       To Apex Ltd A/c                                        ₹1,18,000
   (Being goods purchased on credit with GST)

3. Sold goods costing ₹60,000 for ₹80,000 cash:
   Cash A/c ..................................... Dr.    ₹80,000
       To Sales A/c                                           ₹80,000
   (Being goods sold for cash)
\`\`\``
  }
  // 3. Accounting Equation
  else if (q.includes("equation") || q.includes("समीकरण") || q.includes("assets = liabilities")) {
    responseText = `### ⚖️ The Fundamental Accounting Equation

**The Equation:**
$$\\text{Assets} = \\text{Liabilities} + \\text{Owner's Equity (Capital)}$$

#### 👶 Intuitive Example (Explain Like I'm 10):
Think of a **School Backpack**:
- What is inside? Books (₹300), Pen Box (₹100), Calculator (₹600) ➔ **Total Assets = ₹1,000**.
- Who provided the money?
  - Your Dad gave you ₹800 ➔ **Capital (Owner's Equity)**.
  - You borrowed ₹200 from your friend ➔ **Liability (Loan)**.
- Notice: ₹1,000 (Assets) = ₹200 (Liabilities) + ₹800 (Capital)!

Every single business transaction in the world preserves this equality without exception.`
  }
  // 4. Depreciation (SLM vs WDV)
  else if (q.includes("depreciation") || q.includes("ह्रास") || q.includes("slm") || q.includes("wdv")) {
    responseText = `### 📊 Depreciation: Comprehensive Academic & Professional Analysis

**Core Definition (Ind AS 16 / AS 10):**
Depreciation is the systematic allocation of the depreciable amount of an asset over its estimated useful economic life.

| Dimension | Straight Line Method (SLM) | Written Down Value (WDV) |
|---|---|---|
| **Depreciation Base** | Original acquisition cost | Opening carrying amount (WDV) |
| **Annual Charge** | Constant throughout asset life | Decreases year after year |
| **P&L Total Burden (Dep + Repair)** | Increases as asset ages | Equalized (High Dep + Low Repair initially; Low Dep + High Repair later) |
| **Income Tax Recognition** | Allowed only for Power Generating units | **Mandatory under Section 32** for all asset blocks |

**Formula for SLM:**
$$\\text{Annual Depreciation} = \\frac{\\text{Cost of Asset} - \\text{Estimated Scrap Value}}{\\text{Useful Life in Years}}$$

**Accounting Standard Requirement (Ind AS 8 / AS 10):**
A change in depreciation method is treated as a **Change in Accounting Estimate** applied with **prospective effect** only.`
  }
  // 5. Taxation (Section 115BAC & Slabs)
  else if (q.includes("115bac") || q.includes("tax regime") || q.includes("income tax") || q.includes("आयकर")) {
    responseText = `### ⚖️ Income Tax: Old Regime vs New Regime (Section 115BAC)

As per the Finance Act / Budget 2024 updates:

#### 1. Default Tax Regime: Section 115BAC
- New Regime is the **Default Tax Regime** for Individuals, HUFs, AOPs, and BOIs.
- **Salaried Standard Deduction:** Increased from ₹50,000 to **₹75,000**.
- **Section 87A Rebate:** Taxable income up to **₹7,00,000** pays ₹0 net income tax.
- **Revised Slabs (Budget 2024):**
  - Up to ₹3,00,000: **Nil**
  - ₹3,00,001 to ₹7,00,000: **5%**
  - ₹7,00,001 to ₹10,00,000: **10%**
  - ₹10,00,001 to ₹12,00,000: **15%**
  - ₹12,00,001 to ₹15,00,000: **20%**
  - Above ₹15,00,000: **30%**

#### 2. Old Regime Key Features
- Allows Chapter VI-A deductions: Section 80C (up to ₹1.5L), Section 80D (Health Insurance), Section 24(b) (Home loan interest up to ₹2L), HRA exemption under Section 10(13A).
- Standard deduction for salary remains ₹50,000.`
  }
  // 6. Marginal Costing & Break-Even Point
  else if (q.includes("bep") || q.includes("break-even") || q.includes("marginal costing") || q.includes("p/v ratio")) {
    responseText = `### 📈 Marginal Costing: Break-Even Point (BEP) Mastery

**Fundamental Marginal Costing Equation:**
$$\\text{Sales} - \\text{Variable Cost} = \\text{Contribution} = \\text{Fixed Cost} + \\text{Profit}$$

**Key Formulas:**
1. **P/V Ratio (Profit-Volume Ratio):**
   $$\\text{P/V Ratio} = \\frac{\\text{Contribution}}{\\text{Sales}} \\times 100 = \\frac{\\text{Change in Profit}}{\\text{Change in Sales}} \\times 100$$
2. **Break-Even Point (in Units):**
   $$\\text{BEP (Units)} = \\frac{\\text{Fixed Cost}}{\\text{Contribution per Unit}}$$
3. **Break-Even Point (in Value ₹):**
   $$\\text{BEP (₹)} = \\frac{\\text{Fixed Cost}}{\\text{P/V Ratio}}$$
4. **Margin of Safety (MOS):**
   $$\\text{MOS} = \\text{Actual Sales} - \\text{Break-Even Sales} = \\frac{\\text{Profit}}{\\text{P/V Ratio}}$$`
  }
  // 7. Companies Act 2013 / Corporate Law
  else if (q.includes("companies act") || q.includes("company law") || q.includes("csr") || q.includes("quorum") || q.includes("board meeting")) {
    responseText = `### 🏢 Companies Act 2013: Essential Examination Sections

#### 1. Corporate Social Responsibility (CSR) — Section 135:
- **Applicability:** Any company fulfilling ANY of the following in immediately preceding financial year:
  - Net Worth $\\ge$ ₹500 Crore, OR
  - Turnover $\\ge$ ₹1,000 Crore, OR
  - Net Profit $\\ge$ ₹5 Crore.
- **Mandatory Spend:** At least **2% of average net profits** of immediately preceding 3 financial years.

#### 2. Board Meetings & Quorum — Section 173 & 174:
- **Frequency (Sec 173):** First Board meeting within 30 days of incorporation; minimum 4 meetings every year with not more than 120 days between two consecutive meetings.
- **Quorum (Sec 174):** **1/3rd of total strength** OR **2 directors**, whichever is HIGHER. Participation by video conferencing is counted towards quorum.`
  }
  // 8. Goods & Services Tax (GST)
  else if (q.includes("gst") || q.includes("itc") || q.includes("input tax credit") || q.includes("goods and services tax")) {
    responseText = `### 🧾 Goods & Services Tax (GST): Input Tax Credit (ITC) Mechanics

#### 1. Dual GST Architecture:
- **Intra-State Supply (Within same State):** CGST (Central Tax) + SGST (State Tax).
- **Inter-State Supply (Between different States):** IGST (Integrated Tax).

#### 2. Eligibility & Conditions for claiming ITC (Section 16):
1. Possession of tax invoice or debit note issued by supplier.
2. Details of invoice uploaded by supplier in **GSTR-1** and reflected in recipient's **GSTR-2B**.
3. Goods or services have actually been received.
4. Tax charged in respect of supply has been paid to the Government.
5. Recipient has furnished return under Section 39 (GSTR-3B).

#### 3. Blocked Credits (Section 17(5)):
ITC cannot be claimed on motor vehicles (seating $\\le$ 13 persons, with exceptions), food & beverages, club memberships, goods lost/stolen/destroyed or written off.`
  }
  // 9. Inventories (FIFO, Weighted Average, AS 2)
  else if (q.includes("inventory") || q.includes("fifo") || q.includes("stock") || q.includes("रहतिया")) {
    responseText = `### 📦 Inventory Valuation (AS 2 / Ind AS 2)

**Golden Valuation Principle:**
Inventories must be valued at **Cost** OR **Net Realisable Value (NRV)**, whichever is **LOWER**.

#### 1. Permitted Cost Formulas:
- **FIFO (First-In, First-Out):** Assumes earliest acquired goods are sold first. Ending inventory reflects most recent purchase costs.
- **Weighted Average Cost:** Unit cost is recomputed by dividing total cost of goods by total units available.

#### ⚠️ Prohibited Methods:
- **LIFO (Last-In, First-Out):** Strictly **prohibited** under Ind AS 2, AS 2, and IFRS because it understates current asset valuation in periods of inflation.`
  }
  // 10. Dynamic Comprehensive Fallback for Any Other Topic
  else {
    responseText = `### 🎓 Comprehensive Academic Guide: ${lastMsg}

#### 1. Core Conceptual Foundation
Every concept in commerce, professional finance, and corporate management is designed around **economic truth, fiduciary responsibility, and regulatory compliance**.
- **Nature of the Subject:** Addresses commercial valuation, legal obligation, and stakeholder transparency.
- **Prudence Principle:** Anticipate potential losses and liabilities promptly; record gains only upon realization.

#### 2. Statutory Context & Legal Authority
- Governed by applicable **Indian Accounting Standards (Ind AS / AS)** or **International Financial Reporting Standards (IFRS)**.
- Complies with statutory mandates under the **Companies Act 2013**, **Income Tax Act 1961**, or regulatory circulars from **SEBI, MCA, and RBI**.

#### 3. Practical Numerical & Real-World Application
1. **Identify the transaction facts:** Gather invoices, contractual agreements, and financial data.
2. **Classify:** Determine whether the transaction affects Assets, Liabilities, Incomes, or Expenses.
3. **Execute:** Apply the relevant statutory rate, equation, or journal entries with full supporting narration.

#### 4. Common Examination Mistakes & Tips
- Double check date thresholds (e.g. 180 days for depreciation, 120 days for board meetings).
- Always show full working notes in CA, CMA, CS and University examination papers — marks are allocated per working step!

*Tip:* You can ask me to explain this with **journal entries**, as an **ELI10 analogy**, or generate **mock test questions**!`
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
  const geminiKey = request.geminiKey || request.apiKey || process.env.GEMINI_API_KEY
  const openaiKey = request.openaiKey || process.env.OPENAI_API_KEY

  const preferred = request.preferredProvider || "gemini"

  // Primary attempt
  if (preferred === "gemini" && geminiKey) {
    const res = await callGemini(request, geminiKey)
    if (res) return res
    if (openaiKey) {
      const fallbackRes = await callOpenAI(request, openaiKey)
      if (fallbackRes) return fallbackRes
    }
  } else if (preferred === "openai" && openaiKey) {
    const res = await callOpenAI(request, openaiKey)
    if (res) return res
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

  // Fallback to rich, context-aware academic generator if keys are absent or failed
  return generateContextualAcademicResponse(request)
}
