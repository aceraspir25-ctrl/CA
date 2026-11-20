/**
 * JARVIS CCA-04: Authentic Examination Simulation Engine & Test Banks
 * Matches ICAI, ICMAI, and University Exam Patterns.
 */

export interface ExamQuestion {
  id: string
  number: number
  type: "mcq" | "numerical" | "case_study" | "descriptive"
  section: "Section A (Compulsory MCQs)" | "Section B (Subjective & Practical Numericals)"
  questionText: string
  marks: number
  negativeMarks?: number
  options?: { id: string; text: string }[]
  correctOptionId?: string
  modelAnswer: string
  markingSchemeRubric: {
    step: string
    marksAllocated: number
  }[]
  statutoryReference?: string
}

export interface ExamPaperSimulation {
  id: string
  title: string
  qualificationName: string
  paperCode: string
  totalMarks: number
  durationMinutes: number
  passingMarks: number
  negativeMarkingRatio: number // e.g. 0.25
  instructions: string[]
  questions: ExamQuestion[]
}

export const REAL_EXAM_SIMULATIONS: ExamPaperSimulation[] = [
  {
    id: "sim-cma-inter-p7-mock1",
    title: "CMA Intermediate Paper 7: Direct & Indirect Taxation (Mock Exam Simulation)",
    qualificationName: "ICMAI CMA Intermediate (Group 1)",
    paperCode: "CMA-INT-P7-SIM-2025",
    totalMarks: 100,
    durationMinutes: 180,
    passingMarks: 40,
    negativeMarkingRatio: 0.00,
    instructions: [
      "All questions in Section A are compulsory objective case MCQs carrying 30 Marks.",
      "Section B contains subjective practical computation questions carrying 70 Marks. Answer any 5 out of 6.",
      "Working notes must form part of your answer. Clearly state applicable AY 2025-26 provisions.",
      "Answers are evaluated step-by-step based on ICMAI official marking schemes."
    ],
    questions: [
      {
        id: "q-1",
        number: 1,
        type: "mcq",
        section: "Section A (Compulsory MCQs)",
        questionText: "Mr. Sharma, a resident individual aged 42 years, has a total taxable income of ₹6,80,000 computed under the default New Tax Regime (Section 115BAC) for AY 2025-26. What is his net tax liability after applicable rebate under Section 87A?",
        marks: 2,
        negativeMarks: 0,
        options: [
          { id: "A", text: "₹24,000 plus 4% Health & Education Cess" },
          { id: "B", text: "₹19,000" },
          { id: "C", text: "Nil (Zero Tax Liability)" },
          { id: "D", text: "₹12,500" }
        ],
        correctOptionId: "C",
        modelAnswer: "Under Section 115BAC for AY 2025-26, tax on ₹6,80,000 is 5% on (₹6,80,000 - ₹3,00,000) = ₹19,000. Since taxable income does not exceed ₹7,00,000, Section 87A rebate is available up to ₹25,000. Hence, Net Tax = Nil.",
        markingSchemeRubric: [
          { step: "Identification of Section 115BAC revised slab (₹3L-₹7L @ 5%)", marksAllocated: 1 },
          { step: "Application of Section 87A rebate eligibility (Income <= ₹7,00,000)", marksAllocated: 1 }
        ],
        statutoryReference: "Income Tax Act 1961, Section 115BAC & Section 87A"
      },
      {
        id: "q-2",
        number: 2,
        type: "mcq",
        section: "Section A (Compulsory MCQs)",
        questionText: "Under Section 16(ia) of the Income Tax Act 1961, as amended by Finance (No. 2) Act 2024, the standard deduction allowable from salary under Section 115BAC default regime is:",
        marks: 2,
        negativeMarks: 0,
        options: [
          { id: "A", text: "₹50,000" },
          { id: "B", text: "₹75,000" },
          { id: "C", text: "₹1,00,000" },
          { id: "D", text: "₹40,000" }
        ],
        correctOptionId: "B",
        modelAnswer: "Finance Act 2024 increased the standard deduction for salaried individuals opting for the New Tax Regime from ₹50,000 to ₹75,000.",
        markingSchemeRubric: [
          { step: "Selection of revised statutory limit of ₹75,000", marksAllocated: 2 }
        ],
        statutoryReference: "Section 16(ia) read with Section 115BAC(1A)"
      },
      {
        id: "q-3",
        number: 3,
        type: "numerical",
        section: "Section B (Subjective & Practical Numericals)",
        questionText: "ABC Ltd. manufactures consumer appliances. The company purchased machinery costing ₹12,00,000 on 15th July 2024. State and calculate the allowable normal depreciation and additional depreciation under Section 32 of the Income Tax Act 1961 for AY 2025-26, assuming the company opted for Section 115BAA corporate tax regime.",
        marks: 10,
        modelAnswer: "1. Under Section 115BAA, normal depreciation @ 15% is allowed. However, additional depreciation under Section 32(1)(iia) of 20% is NOT available to companies opting for Section 115BAA.\n2. Normal Depreciation = ₹12,00,000 × 15% = ₹1,80,000 (since put to use for more than 180 days).\n3. Allowable Depreciation = ₹1,80,000. Additional Depreciation = Nil.",
        markingSchemeRubric: [
          { step: "Statutory note regarding non-availability of additional depreciation under Section 115BAA", marksAllocated: 3 },
          { step: "Verification of >180 days put to use criteria (15th July to 31st March)", marksAllocated: 2 },
          { step: "Computation of Normal Depreciation @ 15% on ₹12,00,000 = ₹1,80,000", marksAllocated: 3 },
          { step: "Final Written Down Value (WDV) determination as on 01.04.2025 = ₹10,20,000", marksAllocated: 2 }
        ],
        statutoryReference: "Section 32(1)(ii) & Section 115BAA(2)(i)"
      }
    ]
  },
  {
    id: "sim-ca-foundation-p1-mock",
    title: "CA Foundation Paper 1: Accounting (ICAI New Scheme 100-Mark Simulation)",
    qualificationName: "ICAI CA Foundation",
    paperCode: "CA-FND-P1-SIM-2025",
    totalMarks: 100,
    durationMinutes: 180,
    passingMarks: 40,
    negativeMarkingRatio: 0.00,
    instructions: [
      "Question No. 1 is compulsory carrying 20 Marks.",
      "Attempt any four questions from the remaining five questions.",
      "Working notes should form part of the answers."
    ],
    questions: [
      {
        id: "q-caf-1",
        number: 1,
        type: "descriptive",
        section: "Section A (Compulsory MCQs)",
        questionText: "State with reasons whether the following statement is True or False: 'Freight paid on the purchase of a new machinery is a revenue expenditure because transportation does not produce any goods directly.'",
        marks: 4,
        modelAnswer: "False. All expenses incurred up to the point when an asset is installed and ready for its intended commercial use (including freight, transit insurance, import duty, and installation charges) form part of the cost of the asset and must be capitalized under AS 10 (Property, Plant and Equipment).",
        markingSchemeRubric: [
          { step: "Correct True/False verdict stated explicitly", marksAllocated: 1 },
          { step: "Citation of AS 10 / Capital expenditure capitalization principles", marksAllocated: 2 },
          { step: "Impact on Balance Sheet vs P&L explained", marksAllocated: 1 }
        ],
        statutoryReference: "AS 10: Property, Plant & Equipment"
      }
    ]
  }
]
