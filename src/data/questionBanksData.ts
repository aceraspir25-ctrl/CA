export interface MCQItem {
  id: string
  question: string
  hindiQuestion: string
  options: string[]
  correctIndex: number
  explanation: string
  subject: string
  paperCode: string
  difficulty: "Easy" | "Medium" | "Exam-Level"
  statutoryReference?: string
  year?: string
}

export interface DescriptiveQuestion {
  id: string
  question: string
  hindiQuestion: string
  marks: number
  statutorySection?: string
  modelAnswer: string
  workingNotes?: string[]
  journalEntries?: {
    particulars: string
    debit?: string
    credit?: string
  }[]
}

export interface ModelQuestionPaper {
  id: string
  title: string
  hindiTitle: string
  subject: string
  paperCode: string
  institution: "PRSU" | "ICAI" | "ICMAI" | "ICSI" | "ACCA"
  courseLevel: string
  type: "MQP" | "PYQ" | "SAMPLE"
  year: string
  examSession?: string
  duration: string // e.g. "3 Hours"
  totalMarks: number
  aiEnginesUsed: string[]
  sectionA: MCQItem[] // 20 Marks (Objective)
  sectionB: DescriptiveQuestion[] // 30 Marks (Short Answer)
  sectionC: DescriptiveQuestion[] // 50 Marks (Practical / Case Law)
  createdAt: string
  verified: boolean
}

// Initial Comprehensive Question Bank Seed
export const QUESTION_BANK_STORE: {
  mcqs: MCQItem[]
  papers: ModelQuestionPaper[]
} = {
  mcqs: [
    {
      id: "mcq-1",
      question: "In Royalty Accounts, when Minimum Rent is greater than Actual Royalty, the difference is called:",
      hindiQuestion: "रॉयल्टी खातों में जब न्यूनतम किराया (Minimum Rent) वास्तविक रॉयल्टी से अधिक होता है, तो अंतर को क्या कहते हैं?",
      options: ["Surplus (आधिक्य)", "Shortworkings (लघुकार्य)", "Ground Rent (भू-भाटक)", "Dead Rent (मृत किराया)"],
      correctIndex: 1,
      explanation: "Shortworkings = Minimum Rent - Actual Royalty. It represents the deficiency payable to the landlord when output or sales fall below the guaranteed minimum threshold.",
      subject: "Fundamental of Accounting",
      paperCode: "DSC-1",
      difficulty: "Exam-Level",
      statutoryReference: "PRSU B.Com Sem 1 Unit 2 / Mining Leases Law"
    },
    {
      id: "mcq-2",
      question: "Under the Indian Contract Act 1872, an agreement without consideration is void under Section:",
      hindiQuestion: "भारतीय अनुबंध अधिनियम 1872 के अनुसार बिना प्रतिफल के किया गया समझौता किस धारा के अंतर्गत शून्य (Void) होता है?",
      options: ["Section 10", "Section 23", "Section 25", "Section 28"],
      correctIndex: 2,
      explanation: "Section 25 explicitly mandates: 'An agreement made without consideration is void', subject to three exceptions: natural love and affection (registered), promise to compensate past voluntary services, and promise to pay time-barred debt in writing.",
      subject: "Business Law",
      paperCode: "DSC-2",
      difficulty: "Exam-Level",
      statutoryReference: "Section 25, Indian Contract Act 1872"
    },
    {
      id: "mcq-3",
      question: "Under Section 16(2) of the CGST Act 2017, what is the time limit for a recipient to pay the supplier, failing which Input Tax Credit (ITC) must be reversed?",
      hindiQuestion: "CGST अधिनियम 2017 की धारा 16(2) के अनुसार आपूर्तिकर्ता को भुगतान करने की समय सीमा क्या है, जिसके अभाव में इनपुट टैक्स क्रेडिट (ITC) वापस करना होता है?",
      options: ["90 days", "120 days", "180 days", "1 year"],
      correctIndex: 2,
      explanation: "Second proviso to Section 16(2) states that if the recipient fails to pay the supplier within 180 days from the invoice date, the amount of ITC availed must be added to output tax liability along with interest.",
      subject: "Indirect Taxes with GST",
      paperCode: "DSC-16",
      difficulty: "Exam-Level",
      statutoryReference: "Section 16(2), CGST Act 2017"
    },
    {
      id: "mcq-4",
      question: "Under Section 24(b) of the Income Tax Act 1961, what is the maximum deduction allowed for interest on borrowed capital for self-occupied property?",
      hindiQuestion: "आयकर अधिनियम 1961 की धारा 24(b) के अंतर्गत स्वयं के रहने वाले मकान (Self-Occupied) हेतु ऋण पर ब्याज की अधिकतम छूट कितनी है?",
      options: ["₹1,50,000", "₹2,00,000", "₹2,50,000", "No limit"],
      correctIndex: 1,
      explanation: "Under the Old Tax Regime, interest on housing loan for self-occupied residential property is deductible up to a maximum ceiling of ₹2,00,000 under Section 24(b).",
      subject: "Income Tax Law & Practice",
      paperCode: "DSC-13",
      difficulty: "Medium",
      statutoryReference: "Section 24(b), Income Tax Act 1961"
    },
    {
      id: "mcq-5",
      question: "According to CARO 2020, an auditor must report whether physical verification of inventory has been conducted at reasonable intervals by management under clause:",
      hindiQuestion: "CARO 2020 के अनुसार किस क्लॉज के अंतर्गत ऑडिटर को यह रिपोर्ट करना होता है कि प्रबंधन द्वारा स्टॉक का भौतिक सत्यापन उचित अंतरालों पर किया गया है?",
      options: ["Clause 3(i)", "Clause 3(ii)", "Clause 3(iv)", "Clause 3(vii)"],
      correctIndex: 1,
      explanation: "Clause 3(ii)(a) of CARO 2020 requires the statutory auditor to report on whether physical verification of inventory has been conducted at reasonable intervals and whether discrepancies of 10% or more in the aggregate for each class of inventory were noticed.",
      subject: "Auditing & Corporate Governance",
      paperCode: "DSC-14",
      difficulty: "Exam-Level",
      statutoryReference: "Companies (Auditor's Report) Order, 2020"
    }
  ],
  papers: [
    {
      id: "mqp-prsu-s1-p1-2026",
      title: "Model Question Paper 2026: Fundamental of Accounting",
      hindiTitle: "मॉडल प्रश्न पत्र 2026: वित्तीय लेखांकन के मूल सिद्धांत",
      subject: "Fundamental of Accounting",
      paperCode: "DSC-1",
      institution: "PRSU",
      courseLevel: "B.Com Semester 1 (NEP)",
      type: "MQP",
      year: "2026",
      duration: "3 Hours",
      totalMarks: 100,
      aiEnginesUsed: ["Gemini 2.5 Flash", "GPT-4o Multi-Agent"],
      sectionA: [
        {
          id: "m-s1-1",
          question: "The concept that dictates fixed assets must be shown at historical cost less depreciation rather than net realizable market liquidation value is:",
          hindiQuestion: "वह अवधारणा जो यह निर्धारित करती है कि अचल संपत्तियों को बाजार मूल्य के बजाय ऐतिहासिक लागत घटाकर मूल्यह्रास पर दिखाया जाना चाहिए:",
          options: ["Money Measurement", "Going Concern", "Conservatism", "Accrual"],
          correctIndex: 1,
          explanation: "Going Concern assumes indefinite enterprise existence, justifying amortizing cost over economic life rather than immediate liquidation valuation.",
          subject: "Fundamental of Accounting",
          paperCode: "DSC-1",
          difficulty: "Easy"
        },
        {
          id: "m-s1-2",
          question: "Shortworkings Recoupment Account is in the nature of:",
          hindiQuestion: "लघुकार्य वसूली खाता (Shortworkings Recoupment Account) किस प्रकृति का होता है?",
          options: ["Real Account", "Personal Account", "Nominal / Valuation Account", "Representative Personal"],
          correctIndex: 2,
          explanation: "It represents a temporary asset/valuation account reflecting deferred royalty payment recoverable from future surplus.",
          subject: "Fundamental of Accounting",
          paperCode: "DSC-1",
          difficulty: "Medium"
        }
      ],
      sectionB: [
        {
          id: "sb-1",
          question: "Explain the difference between Hire Purchase System and Installment Payment System from a legal and accounting standpoint.",
          hindiQuestion: "कानूनी एवं लेखांकन दृष्टिकोण से किराया क्रय पद्धति (Hire Purchase) एवं किस्त भुगतान पद्धति (Installment) में अंतर स्पष्ट कीजिए।",
          marks: 6,
          modelAnswer: "In Hire Purchase, ownership passes only upon payment of the last installment, and the buyer is merely a bailee until then. The seller can repossess goods upon default. In Installment System, ownership passes immediately upon signing the contract, and the seller can only sue for unpaid price without repossession right.",
          statutorySection: "Hire Purchase Act 1972 & Sale of Goods Act 1930"
        },
        {
          id: "sb-2",
          question: "What is Minimum Rent? Why is it inserted into mining and copyright lease agreements?",
          hindiQuestion: "न्यूनतम किराया (Minimum Rent / Dead Rent) क्या है? इसे पट्टा समझौतों में क्यों शामिल किया जाता है?",
          marks: 6,
          modelAnswer: "Minimum Rent (or Dead Rent) is the guaranteed minimum monetary sum that the lessee must pay to the lessor in any accounting period, regardless of whether the actual production or royalty earned is zero or very low. It protects the landlord from loss due to strikes or mine closure.",
          statutorySection: "Indian Contract Act 1872 & Transfer of Property Act 1882"
        }
      ],
      sectionC: [
        {
          id: "sc-1",
          question: "A Ltd leased a coal mine from Landlord B on 1st January 2021 at a royalty of ₹10 per tonne with a minimum rent of ₹80,000 p.a. Shortworkings are recoupable during the first three years of the lease. Output: 2021: 5,000 tonnes; 2022: 7,500 tonnes; 2023: 10,000 tonnes. Pass Journal Entries in books of A Ltd.",
          hindiQuestion: "A Ltd ने Landlord B से 1 जनवरी 2021 को ₹10 प्रति टन रॉयल्टी पर कोयला खदान पट्टे पर ली। न्यूनतम किराया ₹80,000 प्रति वर्ष है। लघुकार्य की वसूली पट्टे के पहले तीन वर्षों में की जा सकती है। उत्पादन: 2021 में 5,000 टन; 2022 में 7,500 टन; 2023 में 10,000 टन। A Ltd की पुस्तकों में आवश्यक प्रविष्टियाँ कीजिए।",
          marks: 15,
          modelAnswer: "Year 2021: Royalty ₹50,000, Min Rent ₹80,000 -> Shortworkings ₹30,000. Payment to Landlord ₹80,000.\nYear 2022: Royalty ₹75,000, Min Rent ₹80,000 -> Shortworkings ₹5,000. Total Shortworkings ₹35,000. Payment ₹80,000.\nYear 2023: Royalty ₹1,00,000, Min Rent ₹80,000 -> Surplus ₹20,000. Recouped ₹20,000. Unrecouped shortworkings written off to P&L ₹15,000. Payment to Landlord ₹80,000.",
          workingNotes: [
            "2021: Shortworkings Carried Forward = ₹30,000",
            "2022: Additional Shortworkings = ₹5,000; Total Cumulative = ₹35,000",
            "2023: Surplus available = ₹20,000 (Recouped). Unrecouped Balance = ₹35,000 - ₹20,000 = ₹15,000 transferred to P&L Account as 3-year period lapsed."
          ],
          journalEntries: [
            { particulars: "Royalty A/c ..................................... Dr.", debit: "₹50,000" },
            { particulars: "Shortworkings A/c .............................. Dr.", debit: "₹30,000" },
            { particulars: "   To Landlord B A/c", credit: "₹80,000" },
            { particulars: "Landlord B A/c ................................. Dr.", debit: "₹80,000" },
            { particulars: "   To Bank A/c", credit: "₹80,000" }
          ]
        }
      ],
      createdAt: new Date().toISOString(),
      verified: true
    }
  ]
}

// Helpers
export function addGeneratedPaper(paper: ModelQuestionPaper) {
  const existingIdx = QUESTION_BANK_STORE.papers.findIndex((p) => p.id === paper.id)
  if (existingIdx >= 0) {
    QUESTION_BANK_STORE.papers[existingIdx] = paper
  } else {
    QUESTION_BANK_STORE.papers.unshift(paper)
  }
}

export function addGeneratedMCQs(mcqs: MCQItem[]) {
  mcqs.forEach((item) => {
    if (!QUESTION_BANK_STORE.mcqs.some((m) => m.id === item.id)) {
      QUESTION_BANK_STORE.mcqs.unshift(item)
    }
  })
}

export function getAllPapers(): ModelQuestionPaper[] {
  return QUESTION_BANK_STORE.papers
}

export function getPapersBySubject(subjectQuery: string): ModelQuestionPaper[] {
  const q = subjectQuery.toLowerCase()
  return QUESTION_BANK_STORE.papers.filter(
    (p) =>
      p.subject.toLowerCase().includes(q) ||
      p.paperCode.toLowerCase().includes(q) ||
      p.institution.toLowerCase().includes(q)
  )
}

export function getAllMCQs(): MCQItem[] {
  return QUESTION_BANK_STORE.mcqs
}

export function getMCQsBySubject(subjectQuery: string): MCQItem[] {
  const q = subjectQuery.toLowerCase()
  return QUESTION_BANK_STORE.mcqs.filter(
    (m) =>
      m.subject.toLowerCase().includes(q) ||
      m.paperCode.toLowerCase().includes(q)
  )
}

// Cryptographic Security Revoke Operations
export function revokeLastPaper(): ModelQuestionPaper | null {
  if (QUESTION_BANK_STORE.papers.length > 0) {
    return QUESTION_BANK_STORE.papers.shift() || null
  }
  return null
}

export function revokePaperById(paperId: string): boolean {
  const idx = QUESTION_BANK_STORE.papers.findIndex((p) => p.id === paperId)
  if (idx >= 0) {
    QUESTION_BANK_STORE.papers.splice(idx, 1)
    return true
  }
  return false
}

export function revokeRecentMCQs(count = 5): number {
  const removed = QUESTION_BANK_STORE.mcqs.splice(0, count)
  return removed.length
}

export function revokeAllRecentGenerated(): { papersCount: number; mcqsCount: number } {
  const pCount = QUESTION_BANK_STORE.papers.length
  const mCount = QUESTION_BANK_STORE.mcqs.length
  QUESTION_BANK_STORE.papers = []
  QUESTION_BANK_STORE.mcqs = []
  return { papersCount: pCount, mcqsCount: mCount }
}

