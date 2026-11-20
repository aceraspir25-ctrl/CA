/**
 * Telegram Admin Bot & Multi-Agent Processing Pipeline Data Model
 * Supports:
 * - 7-Stage Document Processing Pipeline (PDF Upload -> 7 Agents -> Verification Report)
 * - Natural Language Hinglish Command Processor
 * - Synchronized Approval Queue shared with Web Admin Panel
 * - Audit Trail & Security Enforcement
 */

export interface TelegramUploadJob {
  id: string
  fileName: string
  fileSize: string
  uploadedBy: string // Telegram username or Admin ID
  uploaderId: string
  uploadedAt: string
  status: "processing" | "pending_review" | "approved" | "rejected" | "changes_requested"
  stagesCompleted: string[]
  documentAnalysis: {
    textSummary: string
    chaptersDetected: string[]
    formulasIdentified: string[]
    tablesCount: number
    numericalsFound: number
    pageCount: number
  }
  courseDetection: {
    institution: string
    course: string
    level: string
    group: string
    subject: string
    chapter: string
    confidence: number // percentage
  }
  verificationReport: {
    courseMapping: "Matched" | "Partial" | "Ambiguous"
    formulaVerification: "Passed" | "Failed" | "Review needed"
    numericalChecks: "Passed" | "Failed" | "Review needed"
    latestSyllabus: "Matched" | "Review needed" | "Amendment detected"
    copyrightPermission: "Verified Public Domain" | "Restricted Reference Only" | "Pending Review"
    freshnessNotes: string
    aiRecommendation: string
  }
  auditTrail: {
    timestamp: string
    action: string
    actor: string
    notes?: string
  }[]
}

export interface NaturalLanguageCommandRule {
  patterns: RegExp[]
  intent: string
  description: string
  action: (query: string, match: RegExpMatchArray | null) => Promise<{ reply: string; data?: any }>
}

// Initial upload jobs demonstrating the 7-stage processing workflow
export const INITIAL_TELEGRAM_UPLOAD_JOBS: TelegramUploadJob[] = [
  {
    id: "job-cma-cost-01",
    fileName: "Cost_Accounting_Notes.pdf",
    fileSize: "4.2 MB",
    uploadedBy: "@RahulSharma_Admin",
    uploaderId: "987654321",
    uploadedAt: "10 mins ago",
    status: "pending_review",
    stagesCompleted: [
      "1. Document Analysis Agent (OCR & Extraction)",
      "2. Course Detection Agent (CMA Intermediate Group 1)",
      "3. Internet Research Agent (ICMAI Syllabus 2022)",
      "4. Academic Verification Agent (CAS-6 Material Costing)",
      "5. Freshness & Amendment Agent (Active Standards)",
      "6. Copyright & Permission Agent (Reference Only)",
      "7. Content Integration Agent (Library Draft Prepared)"
    ],
    documentAnalysis: {
      textSummary: "Comprehensive study notes covering Material Costing, Economic Order Quantity (EOQ), Stock levels (Reorder, Minimum, Maximum, Danger levels), and Stores Ledger methods (FIFO, LIFO, Weighted Average).",
      chaptersDetected: ["Material Cost Control", "EOQ & Inventory Valuation", "Losses & Spoilage in Production"],
      formulasIdentified: [
        "EOQ = sqrt((2 * Annual Consumption * Order Cost) / Carrying Cost per unit)",
        "Reorder Level = Maximum Consumption * Maximum Reorder Period",
        "Minimum Level = Reorder Level - (Normal Consumption * Normal Reorder Period)"
      ],
      tablesCount: 6,
      numericalsFound: 8,
      pageCount: 24
    },
    courseDetection: {
      institution: "ICMAI",
      course: "CMA Intermediate",
      level: "cma-intermediate",
      group: "Group 1",
      subject: "Paper 8: Cost Accounting",
      chapter: "Chapter 1: Material Cost Control (CAS-6)",
      confidence: 99.4
    },
    verificationReport: {
      courseMapping: "Matched",
      formulaVerification: "Passed",
      numericalChecks: "Passed",
      latestSyllabus: "Matched",
      copyrightPermission: "Restricted Reference Only",
      freshnessNotes: "Formulas and stock level standards comply 100% with Cost Accounting Standard 6 (CAS-6) issued by ICMAI. No conflicting amendments.",
      aiRecommendation: "Passed academic and numerical audits. 100% original synthesis created for student library. Faculty approval recommended."
    },
    auditTrail: [
      { timestamp: "10 mins ago", action: "FILE_RECEIVED", actor: "Telegram Bot Gateway", notes: "Received Cost_Accounting_Notes.pdf from Admin ID 987654321." },
      { timestamp: "9 mins ago", action: "OCR_EXTRACTION_COMPLETED", actor: "Document Analysis Agent", notes: "Extracted 24 pages, 6 tables, 8 numerical examples." },
      { timestamp: "8 mins ago", action: "COURSE_IDENTIFIED", actor: "Course Detection Agent", notes: "Matched with CMA Intermediate Group 1 Paper 8 (99.4% confidence)." },
      { timestamp: "6 mins ago", action: "ACADEMIC_AUDIT_PASSED", actor: "Academic Verification Agent", notes: "Formulas and inventory balances verified." },
      { timestamp: "4 mins ago", action: "NOTIFICATION_DISPATCHED", actor: "Telegram Gateway", notes: "Dispatched verification report with interactive approval buttons to Admin." }
    ]
  },
  {
    id: "job-ca-tax-02",
    fileName: "Finance_Act_2024_Sec115BAC_Slabs.pdf",
    fileSize: "1.8 MB",
    uploadedBy: "@RahulSharma_Admin",
    uploaderId: "987654321",
    uploadedAt: "45 mins ago",
    status: "approved",
    stagesCompleted: [
      "1. Document Analysis Agent",
      "2. Course Detection Agent",
      "3. Internet Research Agent",
      "4. Academic Verification Agent",
      "5. Freshness & Amendment Agent",
      "6. Copyright & Permission Agent",
      "7. Content Integration Agent"
    ],
    documentAnalysis: {
      textSummary: "Official budget tax rate revisions under Section 115BAC (New Tax Regime) for AY 2025-26, including standard deduction increase to ₹75,000 for salaried employees.",
      chaptersDetected: ["Income Tax Rates AY 2025-26", "Section 115BAC New Tax Regime", "Deductions & Surcharge"],
      formulasIdentified: [
        "Tax Liability = Slabs [0-3L Nil, 3-7L 5%, 7-10L 10%, 10-12L 15%, 12-15L 20%, >15L 30%]",
        "Salaried Standard Deduction = ₹75,000"
      ],
      tablesCount: 4,
      numericalsFound: 5,
      pageCount: 8
    },
    courseDetection: {
      institution: "ICAI",
      course: "CA Intermediate",
      level: "ca-intermediate",
      group: "Group 1",
      subject: "Paper 3: Taxation (Direct Taxes)",
      chapter: "Chapter 1: Basic Concepts & Section 115BAC Slabs",
      confidence: 100
    },
    verificationReport: {
      courseMapping: "Matched",
      formulaVerification: "Passed",
      numericalChecks: "Passed",
      latestSyllabus: "Amendment detected",
      copyrightPermission: "Verified Public Domain",
      freshnessNotes: "Published in official Government Gazette. High priority statutory amendment applicable to upcoming CA/CMA examination sessions.",
      aiRecommendation: "Statutory update approved and integrated into Taxation curriculum module."
    },
    auditTrail: [
      { timestamp: "45 mins ago", action: "FILE_RECEIVED", actor: "Telegram Bot", notes: "Received amendment gazette." },
      { timestamp: "40 mins ago", action: "STATUTORY_AMENDMENT_CONFIRMED", actor: "Freshness & Amendment Agent", notes: "Gazette date confirmed." },
      { timestamp: "35 mins ago", action: "APPROVED_AND_PUBLISHED", actor: "Admin @RahulSharma", notes: "Approved via Telegram inline button. Deployed to Student Library." }
    ]
  }
]

