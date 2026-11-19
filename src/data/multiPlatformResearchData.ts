/**
 * Multi-Platform Academic Research & Rights Registry Data Model
 * Complies with strict copyright boundaries:
 * 1. Original AI / Faculty Content -> Verified & Published
 * 2. Licensed Third-Party Content -> Strictly published per license permissions
 * 3. Restricted Third-Party Content -> Research & reference ONLY; used to identify
 *    learning objectives and gaps, followed by 100% independent original content generation.
 */

export type ContentCategory =
  | "original_ai_faculty"
  | "licensed_third_party"
  | "restricted_reference_only"

export type RightsStatus =
  | "VERIFIED_PERMITTED"
  | "RESTRICTED_PENDING_REVIEW"
  | "REFERENCE_ONLY"

export interface SourceRightsRecord {
  id: string
  sourceOrganization: string
  platformCategory: "official_statutory" | "approved_educational_platform"
  sourceUrl: string
  documentTitle: string
  retrievalDate: string
  copyrightOwner: string
  licenseInfo: string
  canDownload: boolean
  canProcess: boolean
  canRedistribute: boolean
  attributionRequired: boolean
  rightsStatus: RightsStatus
  trustScore: number
  notes: string
}

export interface PlatformComparativeAnalysis {
  topic: string
  subject: string
  course: string
  platformsSurveyed: string[]
  learningObjectivesIdentified: string[]
  crossPlatformExplanationsSummary: string
  knowledgeGapsIdentified: string[]
  supplementaryConceptsFound: string[]
  officialSourceValidation: string
}

export interface MultiPlatformDossier {
  id: string
  folderPath: string // e.g. "/library/multi-platform-dossiers/ca-accounting/"
  title: string
  course: string
  subject: string
  chapter: string
  contentCategory: ContentCategory
  status: "verified_published" | "faculty_reviewed" | "self_trained_ready"
  generatedDate: string
  selfTrainingCycle: number
  trainingMetrics: {
    conceptualConvergence: number // % (e.g. 99.4%)
    knowledgeGapsFilled: number // count of gaps addressed
    originalityScore: number // % (must exceed 98%)
    pedagogicalClarity: number // %
  }
  comparativeAnalysis: PlatformComparativeAnalysis
  originalContent: {
    handwrittenNotesMarkdown: string
    eli10Intuition: {
      en: string
      hi: string
      hinglish: string
    }
    conceptFlowchart: string
    solvedCaseStudy: {
      problemStatement: string
      workingNotes: string[]
      finalSolution: string
    }
    practiceMCQs: {
      id: string
      question: string
      options: string[]
      correctIndex: number
      explanation: string
    }[]
    revisionCheatSheet: string[]
  }
  rightsRegistry: SourceRightsRecord[]
  complianceStatement: string
}

// 7 Approved Educational Platforms + Authoritative Official Sources
export const APPROVED_RESEARCH_SOURCES: SourceRightsRecord[] = [
  // 1. Official Sources (Authoritative Fact-Checkers)
  {
    id: "src-icai",
    sourceOrganization: "ICAI (Institute of Chartered Accountants of India)",
    platformCategory: "official_statutory",
    sourceUrl: "https://www.icai.org/post/bos-knowledge-portal",
    documentTitle: "ICAI BoS Study Material & Guidance Notes",
    retrievalDate: "19 Nov 2026",
    copyrightOwner: "The Institute of Chartered Accountants of India",
    licenseInfo: "Statutory curriculum repository; link & reference permitted",
    canDownload: true,
    canProcess: true,
    canRedistribute: false,
    attributionRequired: true,
    rightsStatus: "VERIFIED_PERMITTED",
    trustScore: 100,
    notes: "Primary statutory benchmark for accounting standards, Ind AS, and CARO 2020."
  },
  {
    id: "src-mca",
    sourceOrganization: "Ministry of Corporate Affairs (MCA)",
    platformCategory: "official_statutory",
    sourceUrl: "https://www.mca.gov.in",
    documentTitle: "Companies Act 2013 & E-Gazette Notifications",
    retrievalDate: "19 Nov 2026",
    copyrightOwner: "Government of India",
    licenseInfo: "Official Gazette / Public Domain Legal Text",
    canDownload: true,
    canProcess: true,
    canRedistribute: true,
    attributionRequired: true,
    rightsStatus: "VERIFIED_PERMITTED",
    trustScore: 100,
    notes: "Mandatory legal authority for corporate governance, CSR, and audit compliance."
  },
  {
    id: "src-cbdt",
    sourceOrganization: "Central Board of Direct Taxes (CBDT)",
    platformCategory: "official_statutory",
    sourceUrl: "https://incometaxindia.gov.in",
    documentTitle: "Income Tax Act 1961 & Finance Act Circulars",
    retrievalDate: "19 Nov 2026",
    copyrightOwner: "Ministry of Finance, Government of India",
    licenseInfo: "Government Statutory Domain",
    canDownload: true,
    canProcess: true,
    canRedistribute: true,
    attributionRequired: true,
    rightsStatus: "VERIFIED_PERMITTED",
    trustScore: 100,
    notes: "Definitive authority for Section 115BAC slabs, TDS rates, and PGBP allowances."
  },

  // 2. The 7 Approved Educational Platforms (Strict Reference Only)
  {
    id: "src-byjus",
    sourceOrganization: "BYJU'S",
    platformCategory: "approved_educational_platform",
    sourceUrl: "https://byjus.com/commerce/",
    documentTitle: "Commerce Concept Explanations & Visual Analogies",
    retrievalDate: "19 Nov 2026",
    copyrightOwner: "Think and Learn Pvt. Ltd.",
    licenseInfo: "Proprietary; Public educational web pages for reference only",
    canDownload: false,
    canProcess: true, // permitted conceptual reading & topic discovery
    canRedistribute: false, // NEVER redistribute third-party proprietary text
    attributionRequired: true,
    rightsStatus: "REFERENCE_ONLY",
    trustScore: 89,
    notes: "Surveyed for visual concept sequencing and intuitive child-level analogies. Original content generated independently."
  },
  {
    id: "src-pw",
    sourceOrganization: "Physics Wallah (PW)",
    platformCategory: "approved_educational_platform",
    sourceUrl: "https://www.pw.live/commerce",
    documentTitle: "PW Commerce Wallah Chapter Overviews & Problem Frameworks",
    retrievalDate: "19 Nov 2026",
    copyrightOwner: "PhysicsWallah Ltd.",
    licenseInfo: "Proprietary; Public educational articles for topic discovery",
    canDownload: false,
    canProcess: true,
    canRedistribute: false,
    attributionRequired: true,
    rightsStatus: "REFERENCE_ONLY",
    trustScore: 92,
    notes: "Surveyed for step-by-step problem breakdown methods and Hindi-medium student pain points."
  },
  {
    id: "src-aakash",
    sourceOrganization: "Aakash Institute",
    platformCategory: "approved_educational_platform",
    sourceUrl: "https://www.aakash.ac.in",
    documentTitle: "Aakash Foundations Commerce & Economics Guides",
    retrievalDate: "19 Nov 2026",
    copyrightOwner: "Aakash Educational Services Limited",
    licenseInfo: "Proprietary; Public web guides",
    canDownload: false,
    canProcess: true,
    canRedistribute: false,
    attributionRequired: true,
    rightsStatus: "REFERENCE_ONLY",
    trustScore: 90,
    notes: "Used to survey rigorous analytical question styling and foundational concepts."
  },
  {
    id: "src-edurev",
    sourceOrganization: "EduRev",
    platformCategory: "approved_educational_platform",
    sourceUrl: "https://edurev.in/courses/CA-Foundation",
    documentTitle: "EduRev CA & Commerce Question Pattern Archives",
    retrievalDate: "19 Nov 2026",
    copyrightOwner: "EduRev Technologies",
    licenseInfo: "Proprietary; Public syllabus indices",
    canDownload: false,
    canProcess: true,
    canRedistribute: false,
    attributionRequired: true,
    rightsStatus: "REFERENCE_ONLY",
    trustScore: 88,
    notes: "Surveyed for chapter weightage distributions and recurring student doubt heatmaps."
  },
  {
    id: "src-studyx",
    sourceOrganization: "StudyX",
    platformCategory: "approved_educational_platform",
    sourceUrl: "https://studyx.ai",
    documentTitle: "StudyX Financial Accounting Problem Breakdowns",
    retrievalDate: "19 Nov 2026",
    copyrightOwner: "StudyX Inc.",
    licenseInfo: "Proprietary; Public conceptual Q&A index",
    canDownload: false,
    canProcess: true,
    canRedistribute: false,
    attributionRequired: true,
    rightsStatus: "REFERENCE_ONLY",
    trustScore: 86,
    notes: "Surveyed for international accounting terminology alignments (IFRS vs US GAAP vs Indian AS)."
  },
  {
    id: "src-toppr",
    sourceOrganization: "Toppr",
    platformCategory: "approved_educational_platform",
    sourceUrl: "https://www.toppr.com/guides/commerce/",
    documentTitle: "Toppr Commerce Guides & Solved Conceptual Exemplars",
    retrievalDate: "19 Nov 2026",
    copyrightOwner: "Toppr / BYJU'S",
    licenseInfo: "Proprietary; Public web guides",
    canDownload: false,
    canProcess: true,
    canRedistribute: false,
    attributionRequired: true,
    rightsStatus: "REFERENCE_ONLY",
    trustScore: 87,
    notes: "Surveyed for quick revision summaries and formula categorization formats."
  },
  {
    id: "src-vedantu",
    sourceOrganization: "Vedantu",
    platformCategory: "approved_educational_platform",
    sourceUrl: "https://www.vedantu.com/commerce",
    documentTitle: "Vedantu Commerce Interactive Revision Notes",
    retrievalDate: "19 Nov 2026",
    copyrightOwner: "Vedantu Innovations Pvt. Ltd.",
    licenseInfo: "Proprietary; Public web educational articles",
    canDownload: false,
    canProcess: true,
    canRedistribute: false,
    attributionRequired: true,
    rightsStatus: "REFERENCE_ONLY",
    trustScore: 89,
    notes: "Surveyed for bilingual Hindi/English terminology bridging and visual mind map layouts."
  }
]

// Synthesized Multi-Platform Dossiers stored in dedicated Library Folders
export const INITIAL_MULTI_PLATFORM_DOSSIERS: MultiPlatformDossier[] = [
  {
    id: "dossier-brs-01",
    folderPath: "/library/multi-platform-dossiers/ca-cma-accounting/",
    title: "Bank Reconciliation Statement (BRS) & Adjusted Cash Book Mechanics",
    course: "CA Foundation / CMA Foundation",
    subject: "Principles and Practice of Accounting",
    chapter: "Chapter 3: Bank Reconciliation Statement",
    contentCategory: "original_ai_faculty",
    status: "verified_published",
    generatedDate: "19 Nov 2026",
    selfTrainingCycle: 14,
    trainingMetrics: {
      conceptualConvergence: 99.8,
      knowledgeGapsFilled: 4,
      originalityScore: 99.4,
      pedagogicalClarity: 98.7
    },
    comparativeAnalysis: {
      topic: "Timing vs Error Discrepancies in BRS & Adjusted Cash Book Treatment",
      subject: "Financial Accounting",
      course: "CA Foundation",
      platformsSurveyed: ["BYJU'S", "Physics Wallah", "Toppr", "Vedantu", "ICAI BoS"],
      learningObjectivesIdentified: [
        "Distinguish between timing differences (cheques unpresented/uncredited) and recording errors.",
        "Master the 2-step Adjusted Cash Book procedure before preparing the final reconciliation statement.",
        "Handle favorable debit balance vs bank overdraft (unfavorable credit balance) without rote memorization."
      ],
      crossPlatformExplanationsSummary: "BYJU'S emphasized timeline graphics; PW utilized ledger arrows; Vedantu focused on debit/credit signs. Most platforms treated Adjusted Cash Book as an optional footnote.",
      knowledgeGapsIdentified: [
        "Gap 1: When NOT to amend Cash Book (e.g. Bank errors must stay in BRS only).",
        "Gap 2: Overdraft sign reversals confuse students when starting with Pass Book balance.",
        "Gap 3: Dishonour of discounted bills omitted in basic coaching notes."
      ],
      supplementaryConceptsFound: [
        "Direct bank debits for standing instructions",
        "Cheque deposited but omitted from Cash Book bank column",
        "Interest allowed credited twice by bank"
      ],
      officialSourceValidation: "ICAI BoS Module 1 Chapter 3 explicitly mandates the Adjusted Cash Book method when financial year accounts are being finalized."
    },
    originalContent: {
      handwrittenNotesMarkdown: `### 📓 HANDWRITTEN-STYLE STUDY DOSSIER: BRS WITH ADJUSTED CASH BOOK

#### 1. Why Does the Difference Arise? (The 2 Core Causes)
* **Timing Differences**: Transactions recorded in one book today will enter the second book later (e.g. *Cheque issued to vendor* -> Cash Book credited immediately, but vendor deposits it 4 days later -> Pass Book debited later).
* **Errors & Omissions**: Customer paid directly into bank, bank charges debited, or transcription error (e.g. ₹5,400 recorded as ₹4,500).

#### 2. The Golden Rule of Adjusted Cash Book:
> **RULE:** Only correct entries that **belong in your own Cash Book** (Bank Charges, Direct Collections, Errors by your accountant).
> **NEVER** alter the Cash Book for *Bank Errors* or *Cheques Issued but Not Yet Presented*! Those go straight into the BRS table!`,
      eli10Intuition: {
        en: "Think of your Cash Book as your diary, and the Bank Pass Book as the bank's diary. If you wrote down an ice cream you bought, but the shopkeeper hasn't cashed the cheque yet, your diaries differ only because of time!",
        hi: "कैश बुक आपकी डायरी है और पास बुक बैंक की। अगर आपने चेक काट दिया लेकिन सामने वाले ने बैंक में जमा नहीं किया, तो दोनों में केवल समय का अंतर है।",
        hinglish: "Cash book humari diary hai aur Pass book bank ki. Dono balance match karne ke liye BRS banta hai bina pass book me cutting kiye."
      },
      conceptFlowchart: `[Identify Discrepancy]
   ├── Is it our omission/error? (Interest, Charges, Direct Deposit)
   │     └──> Update Adjusted Cash Book first
   └── Is it a timing difference or Bank Error? (Unpresented cheques, Bank mistake)
         └──> Reconcile directly in BRS Table`,
      solvedCaseStudy: {
        problemStatement: "On 31st March, Cash Book showed Dr. balance ₹50,000. Cheques deposited ₹12,000 not credited. Cheques issued ₹18,000 not presented. Bank charges ₹500 debited only in Pass Book. Customer directly paid ₹6,000 into bank.",
        workingNotes: [
          "Step 1: Open Adjusted Cash Book. Starting Balance = ₹50,000.",
          "Step 2: Add Direct Deposit by customer (+₹6,000). Deduct Bank Charges (-₹500).",
          "Step 3: Adjusted Cash Book Corrected Balance = ₹55,500.",
          "Step 4: Prepare BRS starting with Corrected Cash Book (₹55,500). Add Unpresented cheques (+₹18,000). Deduct Uncredited cheques (-₹12,000). Balance per Pass Book = ₹61,500."
        ],
        finalSolution: "Corrected Cash Book Balance = ₹55,500 (Dr.) | Balance as per Bank Pass Book = ₹61,500 (Cr.)"
      },
      practiceMCQs: [
        {
          id: "brs-q1",
          question: "Which of the following items requires an adjustment in the Cash Book before preparing BRS?",
          options: [
            "Cheque issued but not presented for payment",
            "Cheque deposited but not yet collected by bank",
            "Dividend collected directly by bank on behalf of client",
            "Error made by bank cashier in Pass Book"
          ],
          correctIndex: 2,
          explanation: "Dividend collected by bank is an omission in the entity's own books. It must be entered into Adjusted Cash Book."
        }
      ],
      revisionCheatSheet: [
        "Dr. Balance as per Cash Book = Favourable Balance (Our Asset)",
        "Cr. Balance as per Cash Book = Overdraft (Our Liability)",
        "Dr. Balance as per Pass Book = Overdraft (Bank's Asset / Our Debt)",
        "Cr. Balance as per Pass Book = Favourable Balance (Our Deposit with Bank)"
      ]
    },
    rightsRegistry: [
      APPROVED_RESEARCH_SOURCES[0], // ICAI
      APPROVED_RESEARCH_SOURCES[3], // BYJU'S
      APPROVED_RESEARCH_SOURCES[4], // PW
      APPROVED_RESEARCH_SOURCES[8], // Vedantu
    ],
    complianceStatement: "Verified under Section 52(1)(a) Indian Copyright Act & Fair Dealing. Third-party platforms researched solely for syllabus mapping and gap detection. 100% of study notes, analogies, flowcharts, numericals, and MCQs are original independent creations."
  },

  {
    id: "dossier-gst-itc-02",
    folderPath: "/library/multi-platform-dossiers/taxation-direct-indirect/",
    title: "GST Input Tax Credit (ITC) Mechanics, Blocked Credits (Sec 17(5)) & Rule 42/43",
    course: "CA Intermediate / CMA Intermediate / CS Executive",
    subject: "Indirect Taxation - Goods & Services Tax",
    chapter: "Chapter 6: Input Tax Credit Mechanics",
    contentCategory: "original_ai_faculty",
    status: "verified_published",
    generatedDate: "19 Nov 2026",
    selfTrainingCycle: 18,
    trainingMetrics: {
      conceptualConvergence: 99.6,
      knowledgeGapsFilled: 6,
      originalityScore: 99.8,
      pedagogicalClarity: 99.1
    },
    comparativeAnalysis: {
      topic: "Section 16 Eligibility, Section 17(5) Blocked Credits, GSTR-2B Invoicing Reconciliations",
      subject: "Goods & Services Tax (GST)",
      course: "CA / CMA Intermediate",
      platformsSurveyed: ["Physics Wallah", "EduRev", "StudyX", "Toppr", "CBIC & ICAI"],
      learningObjectivesIdentified: [
        "Verify 4 statutory conditions under Section 16(2) for claiming ITC.",
        "Identify blocked credit exceptions under Section 17(5) (Motor vehicles, food/catering, personal consumption).",
        "Calculate proportionate ITC reversal under Rule 42 (Inputs) and Rule 43 (Capital Goods)."
      ],
      crossPlatformExplanationsSummary: "PW provided good practical examples for transport agencies; StudyX offered quick summary charts; EduRev highlighted past exam questions. None included the Finance Act 2024 invoice matching restrictions.",
      knowledgeGapsIdentified: [
        "Gap 1: Motor vehicles for seating capacity > 13 persons ARE eligible for ITC, but general coaching notes simply write 'vehicles blocked'.",
        "Gap 2: CSR goods distribution blocked credit status under Section 17(5)(fa).",
        "Gap 3: Mandatory reconciliation with static auto-drafted GSTR-2B vs GSTR-2A."
      ],
      supplementaryConceptsFound: [
        "Rule 37: 180-day vendor non-payment interest calculation at 18%",
        "Capital goods 5% reduction per quarter rule upon business transfer"
      ],
      officialSourceValidation: "CBIC GST notifications & ICAI Intermediate Tax Module 2026 confirmed mandatory Section 16(2)(aa) compliance."
    },
    originalContent: {
      handwrittenNotesMarkdown: `### 📓 HANDWRITTEN-STYLE STUDY DOSSIER: GST INPUT TAX CREDIT

#### 1. The 4 Golden Pillars of Section 16(2):
To claim ITC, a registered person MUST possess:
1. **Tax Invoice / Debit Note** issued by registered supplier.
2. **Details reflected in GSTR-2B** (auto-drafted statement).
3. **Actual Receipt of Goods or Services** (constructive delivery to job-worker counts).
4. **Tax Actually Paid to Government** by supplier & Valid Return filed under Section 39 (GSTR-3B).

#### 2. Section 17(5) Blocked Credits Mnemonic (**M-F-G-C-P**):
* **M**otor Vehicles (< 14 persons capacity) - BLOCKED (unless for driving school, transport of passengers, or resale).
* **F**ood, Outdoor Catering, Beauty Treatment - BLOCKED (unless outward taxable supply of same category).
* **G**oods Lost, Stolen, Destroyed, Written Off or Gifted - BLOCKED.
* **C**onstruction of Immovable Property on own account - BLOCKED (Plant & Machinery is allowed!).
* **P**ersonal Consumption - BLOCKED.`,
      eli10Intuition: {
        en: "If a bakery buys flour with 5% GST and sells cakes with 12% GST, it only pays the difference to the government. The tax paid on flour is refunded as an offset (Input Tax Credit)!",
        hi: "सामान बनाने में जो टैक्स पहले भर चुके हैं, उसे बेचते समय मिलने वाले टैक्स में से घटाने की छूट ही इनपुट टैक्स क्रेडिट (ITC) कहलाती है।",
        hinglish: "Raw material par bhara hua GST final product ke tax liability me se deduct ho jata hai. Isse tax par tax (cascading) nahi lagta."
      },
      conceptFlowchart: `[Purchase Goods / Services]
   ├── Is it for business use?
   │     ├── NO  ──> Ineligible
   │     └── YES ──> Check Section 17(5) Blocked List
   │                   ├── Listed in Sec 17(5)? ──> BLOCKED ITC
   │                   └── Not Blocked? ──> Reflected in GSTR-2B?
   │                                           ├── NO  ──> Hold until GSTR-2B
   │                                           └── YES ──> Claim in GSTR-3B`,
      solvedCaseStudy: {
        problemStatement: "ABC Ltd purchased a delivery truck (commercial transport) for ₹10 Lakhs (GST ₹2.8L), 2 executive sedans (7-seater) for directors for ₹30 Lakhs (GST ₹8.4L), and raw materials for manufacturing for ₹5 Lakhs (GST ₹90,000). Compute eligible ITC.",
        workingNotes: [
          "1. Delivery truck is used for transportation of goods -> Section 17(5) exception applies -> Eligible ITC = ₹2,80,000.",
          "2. Executive sedans (seating <= 13 persons) for directors -> Blocked under Section 17(5)(a) -> Eligible ITC = ₹0.",
          "3. Raw materials -> Normal business input -> Eligible ITC = ₹90,000."
        ],
        finalSolution: "Total Eligible Input Tax Credit = ₹2,80,000 + ₹90,000 = ₹3,70,000."
      },
      practiceMCQs: [
        {
          id: "itc-q1",
          question: "Under GST, which of the following vehicles qualifies for eligible Input Tax Credit?",
          options: [
            "Motor car purchased for official travel of Managing Director (5 seats)",
            "Passenger bus with approved seating capacity of 32 passengers for staff pickup",
            "Luxury SUV used for company guest reception",
            "Sports car purchased by IT company for branch manager"
          ],
          correctIndex: 1,
          explanation: "Section 17(5)(a) only blocks motor vehicles for transport of persons having approved seating capacity of not more than 13 persons. A 32-seater bus is fully eligible."
        }
      ],
      revisionCheatSheet: [
        "Payment to supplier must be made within 180 days, else ITC must be reversed with 18% interest.",
        "ITC cannot be claimed after 30th November following the end of financial year or filing of Annual Return, whichever is earlier."
      ]
    },
    rightsRegistry: [
      APPROVED_RESEARCH_SOURCES[2], // CBDT / CBIC
      APPROVED_RESEARCH_SOURCES[0], // ICAI
      APPROVED_RESEARCH_SOURCES[4], // PW
      APPROVED_RESEARCH_SOURCES[6], // EduRev
      APPROVED_RESEARCH_SOURCES[7], // StudyX
    ],
    complianceStatement: "Fully compliant with legal fair dealing doctrine. Proprietary portals surveyed solely for student doubt analysis; all instructional frameworks, numerical calculations, and mnemonics are 100% original."
  },

  {
    id: "dossier-corp-law-csr-03",
    folderPath: "/library/multi-platform-dossiers/corporate-law-and-csr/",
    title: "Companies Act 2013: Section 135 CSR, Schedule VII & Penal Sanctions",
    course: "CS Executive / CA Inter / CS Professional",
    subject: "Company Law & Practice",
    chapter: "Chapter 14: Corporate Social Responsibility",
    contentCategory: "original_ai_faculty",
    status: "verified_published",
    generatedDate: "19 Nov 2026",
    selfTrainingCycle: 22,
    trainingMetrics: {
      conceptualConvergence: 99.9,
      knowledgeGapsFilled: 5,
      originalityScore: 99.9,
      pedagogicalClarity: 99.4
    },
    comparativeAnalysis: {
      topic: "Section 135 Net Profit Computations (Sec 198), Ongoing vs Non-Ongoing CSR Accounts",
      subject: "Company Law",
      course: "CS Executive",
      platformsSurveyed: ["BYJU'S", "Aakash Institute", "Vedantu", "EduRev", "MCA E-Gazette"],
      learningObjectivesIdentified: [
        "Recall exact threshold criteria: Net Worth ₹500 Cr, Turnover ₹1000 Cr, or Net Profit ₹5 Cr.",
        "Calculate 2% spend using average net profits calculated strictly under Section 198.",
        "Manage unspent CSR amounts (Unspent CSR Account within 30 days vs Fund in Schedule VII within 6 months)."
      ],
      crossPlatformExplanationsSummary: "General coaching sites explain the 2% spend well, but fail to detail Section 135(5) ongoing project timeline rules and Section 135(7) criminal/financial penalty amendments.",
      knowledgeGapsIdentified: [
        "Gap 1: Students often confuse ordinary profit before tax with Section 198 net profit (capital gains & foreign branch profits are excluded).",
        "Gap 2: Excess CSR spend can be set off against mandatory spend for up to 3 succeeding financial years.",
        "Gap 3: Penalty under Section 135(7) is non-imprisonment (monetary penalty on company and officer in default)."
      ],
      supplementaryConceptsFound: [
        "Impact assessment mandatory for companies with average CSR spend >= ₹10 Crore",
        "Administrative overheads capped at 5% of total CSR expenditure"
      ],
      officialSourceValidation: "Ministry of Corporate Affairs (MCA) Companies (CSR Policy) Amendment Rules 2021 & 2022."
    },
    originalContent: {
      handwrittenNotesMarkdown: `### 📓 HANDWRITTEN-STYLE STUDY DOSSIER: SECTION 135 CSR

#### 1. Applicability Thresholds (Any ONE in immediately preceding FY):
* **Net Worth** >= ₹500 Crore, OR
* **Turnover** >= ₹1,000 Crore, OR
* **Net Profit** >= ₹5 Crore.

#### 2. Mandatory Spending Requirement:
* At least **2% of the average net profits** of the company made during the **three immediately preceding financial years**.
* Net Profit must be calculated in accordance with **Section 198**.

#### 3. Treatment of Unspent CSR Amount:
* **Ongoing Projects**: Transfer to a special bank account called **'Unspent CSR Account'** within **30 days** from end of FY. Must spend within **3 financial years**. If still unspent, transfer to Schedule VII Fund within 30 days of end of 3rd FY.
* **Other Than Ongoing Projects**: Transfer directly to a fund specified in **Schedule VII** (e.g. PM CARES, Clean Ganga) within **6 months** from end of FY.`,
      eli10Intuition: {
        en: "Big companies make money by using roads, air, and workers from society. The law tells them: 'If you made good profit, give 2% back to build schools, plant trees, and heal the sick!'",
        hi: "अगर किसी बड़ी कंपनी का शुद्ध लाभ 5 करोड़ या उससे ज्यादा है, तो उसे समाज के विकास (स्कूल, अस्पताल, पर्यावरण) के लिए अपने 3 साल के मुनाफे का 2% खर्च करना अनिवार्य है।",
        hinglish: "Net Profit >= 5 Cr hone par company ko 3 saal ke average profit ka 2% CSR me spend karna legal compulsion hai."
      },
      conceptFlowchart: `[Financial Year End - Unspent CSR Amount]
   ├── Is it related to an ONGOING project?
   │     ├── YES ──> Transfer to 'Unspent CSR Account' within 30 days (Spend in 3 yrs)
   │     └── NO  ──> Transfer to Schedule VII Fund within 6 months
   └── Penalty for default: Up to ₹1 Crore on Company; ₹2 Lakhs on Officer in default`,
      solvedCaseStudy: {
        problemStatement: "XYZ Ltd net profits under Section 198: FY 2023-24 = ₹12 Cr, FY 2024-25 = ₹18 Cr, FY 2025-26 = ₹24 Cr. Company had an unspent CSR amount of ₹8 Lakhs relating to building a school (ongoing project). What are the company's legal obligations?",
        workingNotes: [
          "1. Average Net Profit = (12 + 18 + 24) / 3 = ₹18 Crore.",
          "2. Mandatory CSR Spend (2%) = 2% of ₹18 Cr = ₹36 Lakhs.",
          "3. The unspent ₹8 Lakhs for school construction (ongoing project) must be transferred to 'Unspent CSR Account' in a scheduled bank by 30th April."
        ],
        finalSolution: "Mandatory CSR for the year = ₹36 Lakhs. The ₹8 Lakhs unspent ongoing balance must be deposited in 'Unspent CSR Account' within 30 days."
      },
      practiceMCQs: [
        {
          id: "csr-q1",
          question: "Within what period must an unspent CSR amount relating to an ongoing project be transferred to the 'Unspent CSR Account'?",
          options: [
            "Within 30 days from the end of the financial year",
            "Within 6 months from the end of the financial year",
            "Within 60 days from the date of the AGM",
            "Within 90 days from the board meeting"
          ],
          correctIndex: 0,
          explanation: "Under Section 135(6), unspent amounts pursuant to an ongoing project must be transferred within 30 days from the end of the financial year."
        }
      ],
      revisionCheatSheet: [
        "CSR Committee requires minimum 3 directors with at least 1 Independent Director.",
        "If CSR obligation does not exceed ₹50 Lakhs, the requirement for CSR committee is dispensed with (Board discharges functions)."
      ]
    },
    rightsRegistry: [
      APPROVED_RESEARCH_SOURCES[1], // MCA
      APPROVED_RESEARCH_SOURCES[0], // ICAI
      APPROVED_RESEARCH_SOURCES[3], // BYJU'S
      APPROVED_RESEARCH_SOURCES[5], // Aakash
      APPROVED_RESEARCH_SOURCES[8], // Vedantu
    ],
    complianceStatement: "Fully compliant with Indian statutory exceptions. Third-party portals analyzed solely for comparative educational outlines; all textual dossiers, analogies, and examination numericals are original works."
  }
]
