export type PipelineStage =
  | "discovered"
  | "retrieved"
  | "processing"
  | "research_completed"
  | "content_generated"
  | "verification_pending"
  | "verification_passed"
  | "copyright_review_pending"
  | "faculty_review_pending"
  | "approved"
  | "published"
  | "rejected"
  | "failed"
  | "needs_revision"

export type OperatingMode = "research_only" | "research_generate" | "approved_auto_publish"

export type LicenseType =
  | "official_public_domain"
  | "open_educational_resource"
  | "licensed_educational"
  | "restricted_copyright"
  | "link_only"

export interface RegisteredSource {
  id: string
  name: string
  organization: string
  url: string
  type: "official" | "academic_internet"
  license: LicenseType
  canStore: boolean
  canProcess: boolean
  canRedistribute: boolean
  lastChecked: string
  trustScore: number // 0-100
  courseScope: string[]
}

export interface GeneratedContentPayload {
  studyNotes: string
  eli10: { en: string; hi: string; hinglish: string }
  solvedNumericals: {
    question: string
    solution: string
    journalEntries?: { particulars: string; debit: string; credit: string }[]
  }[]
  conceptDiagram: string // ASCII or Mermaid flowchart
  formulaSheet: string[]
  examPitfalls: string[]
  practiceQuestions: { question: string; options?: string[]; answer: string; explanation: string }[]
  flashcards: { front: string; back: string }[]
}

export interface PipelineItem {
  id: string
  title: string
  course: string
  level: string
  paper: string
  chapter: string
  stage: PipelineStage
  operatingMode: OperatingMode
  assignedAgents: string[]
  sourcesUsed: {
    name: string
    url: string
    license: LicenseType
    retrievalDate: string
  }[]
  content?: GeneratedContentPayload
  verificationReport?: {
    conceptualAccuracy: boolean
    numericalAccuracy: boolean
    statutoryCompliance: boolean
    syllabusMapped: boolean
    duplicateScore: number // percentage
    verifiedByAgent: string
    verificationNotes: string
  }
  copyrightReport?: {
    licenseCompliant: boolean
    attributionAttached: boolean
    redistributionAllowed: boolean
    reviewNotes: string
  }
  reviewerNotes?: string
  lastUpdated: string
}

export const INITIAL_REGISTERED_SOURCES: RegisteredSource[] = [
  {
    id: "src-icai-bos",
    name: "ICAI BoS Knowledge Portal",
    organization: "Institute of Chartered Accountants of India",
    url: "https://www.icai.org/post/bos-knowledge-portal",
    type: "official",
    license: "link_only",
    canStore: true,
    canProcess: true,
    canRedistribute: false,
    lastChecked: "1 hour ago",
    trustScore: 100,
    courseScope: ["CA Foundation", "CA Intermediate", "CA Final"]
  },
  {
    id: "src-icmai-portal",
    name: "ICMAI Directorate of Studies",
    organization: "Institute of Cost Accountants of India",
    url: "https://icmai.in/studentswebsite/Study-Material.php",
    type: "official",
    license: "link_only",
    canStore: true,
    canProcess: true,
    canRedistribute: false,
    lastChecked: "3 hours ago",
    trustScore: 100,
    courseScope: ["CMA Foundation", "CMA Intermediate", "CMA Final"]
  },
  {
    id: "src-icsi-academic",
    name: "ICSI Academic Corner & Study Portals",
    organization: "Institute of Company Secretaries of India",
    url: "https://www.icsi.edu/academic-portal/",
    type: "official",
    license: "link_only",
    canStore: true,
    canProcess: true,
    canRedistribute: false,
    lastChecked: "2 hours ago",
    trustScore: 100,
    courseScope: ["CS CSEET", "CS Executive", "CS Professional"]
  },
  {
    id: "src-acca-global",
    name: "ACCA Global Student Study Hub",
    organization: "Association of Chartered Certified Accountants",
    url: "https://www.accaglobal.com/gb/en/student/exam-support-resources.html",
    type: "official",
    license: "link_only",
    canStore: true,
    canProcess: true,
    canRedistribute: false,
    lastChecked: "4 hours ago",
    trustScore: 100,
    courseScope: ["ACCA Applied Knowledge", "ACCA Applied Skills", "ACCA Strategic Professional"]
  },
  {
    id: "src-prsu-university",
    name: "Pt. Ravishankar Shukla University (PRSU) Raipur",
    organization: "PRSU University Portal",
    url: "http://www.prsu.ac.in",
    type: "official",
    license: "official_public_domain",
    canStore: true,
    canProcess: true,
    canRedistribute: true,
    lastChecked: "6 hours ago",
    trustScore: 98,
    courseScope: ["PRSU B.Com", "BBA Management"]
  },
  {
    id: "src-mca-gov",
    name: "Ministry of Corporate Affairs (MCA)",
    organization: "Government of India",
    url: "https://www.mca.gov.in",
    type: "official",
    license: "official_public_domain",
    canStore: true,
    canProcess: true,
    canRedistribute: true,
    lastChecked: "30 mins ago",
    trustScore: 100,
    courseScope: ["Corporate Law", "Companies Act 2013", "CSR"]
  },
  {
    id: "src-cbdt-incometax",
    name: "Income Tax Department (CBDT)",
    organization: "Ministry of Finance, Government of India",
    url: "https://incometaxindia.gov.in",
    type: "official",
    license: "official_public_domain",
    canStore: true,
    canProcess: true,
    canRedistribute: true,
    lastChecked: "45 mins ago",
    trustScore: 100,
    courseScope: ["Income Tax Act 1961", "Section 115BAC", "Direct Taxes"]
  },
  {
    id: "src-oer-accounting",
    name: "Open Educational Resources: Accounting & Business Archives",
    organization: "Global Open Textbook Initiative",
    url: "https://open.umn.edu/opentextbooks/subjects/accounting",
    type: "academic_internet",
    license: "open_educational_resource",
    canStore: true,
    canProcess: true,
    canRedistribute: true,
    lastChecked: "1 day ago",
    trustScore: 94,
    courseScope: ["Double Entry", "Financial Accounting", "Marginal Costing"]
  }
]

export const INITIAL_PIPELINE_ITEMS: PipelineItem[] = [
  {
    id: "pipe-1",
    title: "Bank Reconciliation Statement (BRS) Complete Academic Suite",
    course: "CA Foundation",
    level: "ca-foundation",
    paper: "Paper 1 Accounting",
    chapter: "ch3 - Bank Reconciliation Statement (BRS)",
    stage: "published",
    operatingMode: "research_generate",
    assignedAgents: ["ARA-01", "CCA-03", "AVA-06", "NA-08"],
    sourcesUsed: [
      { name: "ICAI BoS Study Material", url: "https://www.icai.org", license: "link_only", retrievalDate: "18 Nov 2026" },
      { name: "Global OER Accounting Archives", url: "https://open.umn.edu", license: "open_educational_resource", retrievalDate: "18 Nov 2026" }
    ],
    content: {
      studyNotes: "A comprehensive analysis of timing differences between Cash Book and Bank Passbook with adjusted cash book methodology.",
      eli10: {
        en: "Your personal bank diary says you have ₹10,000, but the bank ATM says ₹15,000 because a cheque you deposited took 2 days to clear. BRS explains the difference!",
        hi: "आपकी डायरी और बैंक पासबुक में तारीखों के अंतर के कारण आने वाले फर्क का मिलान BRS करता है।",
        hinglish: "Cash book aur Passbook ke timing differences ko reconcile karne wala statement BRS hai."
      },
      solvedNumericals: [
        {
          question: "Balance as per Cash Book ₹50,000. Cheques issued but not presented ₹15,000. Bank charges ₹500.",
          solution: "Adjusted Pass Book balance = ₹50,000 + ₹15,000 - ₹500 = ₹64,500 (Favourable Credit Balance)."
        }
      ],
      conceptDiagram: `[Cash Book Balance] --> (+ Cheques Issued but Not Presented) --> (- Direct Bank Debits) --> [Pass Book Balance]`,
      formulaSheet: [
        "Unpresented Cheques: Add to Cash Book, Less from Pass Book",
        "Uncleared Cheques: Less from Cash Book, Add to Pass Book"
      ],
      examPitfalls: [
        "Never adjust items in BRS that have already been adjusted in the Adjusted Cash Book.",
        "Remember Bank Overdraft is a Debit balance in Pass Book but Credit balance in Cash Book."
      ],
      practiceQuestions: [
        {
          question: "What is the nature of an Adjusted Cash Book balance?",
          answer: "It reflects true current bank balance after adjusting all errors and direct passbook entries committed by the entity.",
          explanation: "Adjusted cash book is prepared before BRS to isolate pure external timing differences."
        }
      ],
      flashcards: [
        { front: "Pass Book Favourable Balance", back: "Credit Balance in Bank Books" },
        { front: "Cash Book Favourable Balance", back: "Debit Balance in Entity Books" }
      ]
    },
    verificationReport: {
      conceptualAccuracy: true,
      numericalAccuracy: true,
      statutoryCompliance: true,
      syllabusMapped: true,
      duplicateScore: 2.1,
      verifiedByAgent: "AVA-06 (Academic Verification Agent)",
      verificationNotes: "All Golden Rules and adjusted cash book treatments cross-checked against ICAI study module."
    },
    copyrightReport: {
      licenseCompliant: true,
      attributionAttached: true,
      redistributionAllowed: true,
      reviewNotes: "All explanations and numerical problem sets are independently synthesized. Official links cited."
    },
    reviewerNotes: "Approved and published to CA Foundation Chapter 3 curriculum.",
    lastUpdated: "2 hours ago"
  },
  {
    id: "pipe-2",
    title: "Income Tax Section 115BAC New Slabs & Budget 2024 Amendments",
    course: "CA Intermediate / B.Com",
    level: "ca-intermediate",
    paper: "Paper 3 Taxation",
    chapter: "tax-ch1 - Basic Concepts & Residential Status",
    stage: "faculty_review_pending",
    operatingMode: "research_generate",
    assignedAgents: ["OSM-02", "CCA-03", "AVA-06"],
    sourcesUsed: [
      { name: "CBDT Official Gazette (Finance Act 2024)", url: "https://incometaxindia.gov.in", license: "official_public_domain", retrievalDate: "19 Nov 2026" }
    ],
    content: {
      studyNotes: "Detailed comparative tax computation under Section 115BAC (Revised Default Slabs) vs Old Tax Regime with standard deduction of ₹75,000.",
      eli10: {
        en: "The government created a simpler tax menu where you don't need to submit complicated investment receipts, and you pay zero tax if your income is up to ₹7 Lakhs!",
        hi: "सरकार ने एक सरल कर प्रणाली बनाई है जिसमें ₹7 लाख तक की आय पर कोई टैक्स नहीं देना पड़ता और ₹75,000 की मानक कटौती मिलती है।",
        hinglish: "New regime default ban gaya hai jisme bina kisi 80C receipt ke ₹7 Lakh tak zero tax lagta hai."
      },
      solvedNumericals: [
        {
          question: "Compute tax for Salaried Individual with Gross Salary ₹12,00,000 under Section 115BAC.",
          solution: "Gross Salary ₹12,00,000 - Std Deduction ₹75,000 = Net Taxable ₹11,25,000. Tax: Nil (up to 3L) + ₹20,000 (3-7L) + ₹30,000 (7-10L) + ₹18,750 (10-11.25L) = ₹68,750 + 4% Cess = ₹71,500."
        }
      ],
      conceptDiagram: `[Gross Salary] --> (- Std Deduction ₹75,000) --> [Taxable Income] --> [Compute Slabs 5%/10%/15%/20%/30%] --> (+ 4% HEC)`,
      formulaSheet: [
        "Section 87A Rebate: Available if Total Income <= ₹7,00,000 under New Regime",
        "Standard Deduction: ₹75,000 under Sec 16(ia) for salaried employees"
      ],
      examPitfalls: [
        "Do not allow Section 80C or 80D deductions under Section 115BAC.",
        "Remember standard deduction under Old Regime remains ₹50,000, not ₹75,000."
      ],
      practiceQuestions: [
        {
          question: "Can an individual switch between Old and New regime every year?",
          answer: "Individuals without business income (salary/other sources) can choose every year while filing ITR. Individuals with business income can switch only once in their lifetime.",
          explanation: "Section 115BAC(6) governs switching rules."
        }
      ],
      flashcards: [
        { front: "Section 115BAC Standard Deduction", back: "₹75,000 (Budget 2024)" },
        { front: "Section 87A Zero Tax Threshold", back: "₹7,00,000 Taxable Income" }
      ]
    },
    verificationReport: {
      conceptualAccuracy: true,
      numericalAccuracy: true,
      statutoryCompliance: true,
      syllabusMapped: true,
      duplicateScore: 1.4,
      verifiedByAgent: "AVA-06",
      verificationNotes: "Slabs and Cess calculations match Ministry of Finance official tax calculator."
    },
    copyrightReport: {
      licenseCompliant: true,
      attributionAttached: true,
      redistributionAllowed: true,
      reviewNotes: "Official gazette facts analyzed; explanations and worked numericals are 100% original."
    },
    reviewerNotes: "Awaiting final faculty sign-off before publishing to Taxation curriculum.",
    lastUpdated: "35 mins ago"
  },
  {
    id: "pipe-3",
    title: "Companies Act 2013 Corporate Social Responsibility (CSR) Framework",
    course: "CS Executive / CA Inter",
    level: "cs-executive",
    paper: "Paper 2 Company Law",
    chapter: "cs-cl-1 - Corporate Governance and Board Processes",
    stage: "verification_pending",
    operatingMode: "research_generate",
    assignedAgents: ["OSM-02", "ARA-01", "CCA-03"],
    sourcesUsed: [
      { name: "MCA E-Gazette on Section 135 & CSR Rules", url: "https://www.mca.gov.in", license: "official_public_domain", retrievalDate: "19 Nov 2026" }
    ],
    content: {
      studyNotes: "Detailed corporate governance provisions under Section 135, Schedule VII permissible activities, CSR Committee constitution, and unspent CSR account mechanics.",
      eli10: {
        en: "If a company earns huge profits using resources from society, the law requires it to return at least 2% back to the community for schools, hospitals, and clean water!",
        hi: "बड़ी मुनाफा कमाने वाली कंपनियों को अपने 3 साल के औसत मुनाफे का कम से कम 2% समाज कल्याण (CSR) में खर्च करना अनिवार्य है।",
        hinglish: "Jo companies Net Profit >= 5 Cr kamati hain, unhe 2% profit social welfare me spend karna mandatory hai."
      },
      solvedNumericals: [
        {
          question: "Company Net Profits: Year 1 = ₹10 Cr, Year 2 = ₹15 Cr, Year 3 = ₹20 Cr. Calculate mandatory CSR expenditure.",
          solution: "Average Net Profit = (10 + 15 + 20) / 3 = ₹15 Crore. Mandatory CSR (2%) = 2% of ₹15 Crore = ₹30 Lakhs."
        }
      ],
      conceptDiagram: `[Net Worth >= 500Cr OR Turnover >= 1000Cr OR Net Profit >= 5Cr] --> [Constitutes CSR Committee] --> [Spends >= 2% Avg Profit]`,
      formulaSheet: [
        "CSR Mandatory Spend = 2% × Average Net Profit of Preceding 3 Financial Years",
        "Committee: Minimum 3 directors with at least 1 Independent Director"
      ],
      examPitfalls: [
        "Do not compute Net Profit using normal GAAP profit; must follow Section 198 net profit calculation.",
        "Unspent ongoing project amounts must be transferred to 'Unspent CSR Account' within 30 days."
      ],
      practiceQuestions: [
        {
          question: "Is CSR mandatory for private companies?",
          answer: "Yes, if they meet any of the thresholds: Net Worth ₹500Cr, Turnover ₹1000Cr, or Net Profit ₹5Cr.",
          explanation: "Section 135 applies to all companies incorporated in India."
        }
      ],
      flashcards: [
        { front: "Section 135 Thresholds", back: "NW ₹500Cr / TO ₹1000Cr / NP ₹5Cr" },
        { front: "CSR Mandatory Percentage", back: "2% of Average Net Profit of 3 Years" }
      ]
    },
    verificationReport: {
      conceptualAccuracy: true,
      numericalAccuracy: true,
      statutoryCompliance: true,
      syllabusMapped: true,
      duplicateScore: 0.8,
      verifiedByAgent: "AVA-06",
      verificationNotes: "Pending legal cross-verification of penalty provisions under Section 135(7)."
    },
    copyrightReport: {
      licenseCompliant: true,
      attributionAttached: true,
      redistributionAllowed: true,
      reviewNotes: "Public domain statutory text extracted; synthesis is original."
    },
    reviewerNotes: "In Verification Queue.",
    lastUpdated: "12 mins ago"
  }
]

