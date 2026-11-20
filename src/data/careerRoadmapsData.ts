/**
 * JARVIS CCA-04: Career Intelligence & Professional Roadmap Registry
 */

export interface CareerPathway {
  id: string
  qualificationId: string
  qualificationTitle: string
  targetRoles: {
    title: string
    averageSalaryRangeINR: string
    topHiringSectors: string[]
    keyResponsibilities: string[]
    essentialSkills: string[]
  }[]
  articleshipInternshipRoadmap: {
    title: string
    duration: string
    stipendNormsINR: string
    statutoryRegulations: string
    keyLearningMilestones: string[]
  }
  skillsGapChecklist: {
    category: string
    skills: { name: string; importance: "Mandatory" | "Recommended" | "Competitive Edge"; verifiedCourseUrl?: string }[]
  }[]
  mockInterviewScenarios: {
    question: string
    interviewType: "Technical" | "Behavioral" | "Statutory Case Study"
    modelAnswerKey: string
    evaluationRubric: string[]
  }[]
}

export const CAREER_ROADMAPS: CareerPathway[] = [
  {
    id: "career-ca",
    qualificationId: "icai-ca",
    qualificationTitle: "Chartered Accountancy (CA)",
    targetRoles: [
      {
        title: "Statutory Audit Senior / Manager (Big 4 & Large Firms)",
        averageSalaryRangeINR: "₹10,00,000 – ₹24,00,000 / annum",
        topHiringSectors: ["Public Accounting (EY, PwC, Deloitte, KPMG)", "Advisory Firms"],
        keyResponsibilities: [
          "Leading statutory audit engagements under Companies Act 2013 and CARO 2020.",
          "Verifying compliance with Ind AS 115, 116, 109 and Standards on Auditing (SAs).",
          "Auditing Internal Financial Controls over Financial Reporting (IFCoFR)."
        ],
        essentialSkills: ["Ind AS / IFRS", "Standards on Auditing (SA 200–700 series)", "Advanced Excel & Alteryx", "CARO 2020 Reporting"]
      },
      {
        title: "Chief Financial Officer (CFO) / Corporate Controller",
        averageSalaryRangeINR: "₹25,00,000 – ₹60,00,000+ / annum",
        topHiringSectors: ["FMCG", "IT / Tech Enterprises", "Manufacturing & Infra", "Fintech"],
        keyResponsibilities: [
          "Capital allocation, cash flow forecasting, and debt-equity structuring.",
          "Board reporting, investor relations, and quarterly SEBI LODR compliances.",
          "Tax optimization and M&A due diligence."
        ],
        essentialSkills: ["Corporate Finance", "Strategic Budgeting", "SEBI LODR", "Direct & Indirect Tax Structuring"]
      }
    ],
    articleshipInternshipRoadmap: {
      title: "ICAI Practical Articleship Training",
      duration: "2 Years Mandatory (New Scheme 2024)",
      stipendNormsINR: "₹4,000 – ₹15,000 / month (varies by city classification & Big 4 norms)",
      statutoryRegulations: "Governed under Regulation 43 to 48 of Chartered Accountants Regulations 1988",
      keyLearningMilestones: [
        "Year 1: Vouching, verification of statutory books, GST 3B/1 reconciliations, Tax Audit Form 3CD preparation.",
        "Year 2: Substantive audit procedures, Ind AS disclosures, company law filings with ROC, client management."
      ]
    },
    skillsGapChecklist: [
      {
        category: "Financial Modelling & Technology",
        skills: [
          { name: "3-Statement Financial Modelling (DCF & LBO)", importance: "Mandatory" },
          { name: "Power BI & Tableau Dashboarding for Audit Sampling", importance: "Competitive Edge" },
          { name: "SAP S/4 HANA ERP Navigation (T-Codes)", importance: "Recommended" }
        ]
      },
      {
        category: "Statutory & Governance Mastery",
        skills: [
          { name: "CARO 2020 21-Clause Reporting Checklist", importance: "Mandatory" },
          { name: "Transfer Pricing Form 3CEB & Arm's Length Pricing", importance: "Recommended" },
          { name: "Insolvency and Bankruptcy Code (IBC 2016) Process", importance: "Competitive Edge" }
        ]
      }
    ],
    mockInterviewScenarios: [
      {
        question: "How do you evaluate whether a lease contains a low-value asset or short-term lease exemption under Ind AS 116?",
        interviewType: "Statutory Case Study",
        modelAnswerKey: "Ind AS 116 paragraph 5 allows a lessee to elect not to apply the recognition requirements to: (a) short-term leases (<= 12 months with no purchase option), and (b) leases for which the underlying asset is of low value (e.g. personal computers, small office furniture; typically < $5,000 when new). The election is made on a class-of-underlying-asset basis for short-term leases, and on a lease-by-lease basis for low-value assets.",
        evaluationRubric: [
          "Mentions 12-month criterion and absence of purchase option",
          "Distinguishes class-by-class vs lease-by-lease election",
          "Identifies that lease payments are recognized as an expense on straight-line basis in P&L"
        ]
      }
    ]
  },
  {
    id: "career-cma",
    qualificationId: "icmai-cma",
    qualificationTitle: "Cost and Management Accountancy (CMA)",
    targetRoles: [
      {
        title: "Plant Cost Controller & Operations Finance Head",
        averageSalaryRangeINR: "₹9,00,000 – ₹20,00,000 / annum",
        topHiringSectors: ["Automotive & Heavy Engg", "Pharmaceuticals", "Steel & Metals", "FMCG"],
        keyResponsibilities: [
          "Standard costing, variance analysis (material, labor, overheads) and root-cause tracing.",
          "Cost Records maintenance under Section 148 of Companies Act 2013.",
          "Marginal costing analysis for Make-or-Buy and product profitability."
        ],
        essentialSkills: ["Cost Accounting Standards (CAS 1 to 24)", "Activity Based Costing (ABC)", "SAP CO Module", "Supply Chain Valuation"]
      }
    ],
    articleshipInternshipRoadmap: {
      title: "ICMAI Practical Training Scheme",
      duration: "15 Months Mandatory (before appearing in CMA Final both groups)",
      stipendNormsINR: "₹6,000 – ₹12,000 / month",
      statutoryRegulations: "Cost and Works Accountants Act 1959 regulations",
      keyLearningMilestones: [
        "Month 1–6: Cost ledger maintenance, reconciliation between Cost and Financial Accounts.",
        "Month 7–15: Cost Audit Report CRA-1 & CRA-3 filings, inventory valuation under CAS-4."
      ]
    },
    skillsGapChecklist: [
      {
        category: "Strategic Cost Control Tools",
        skills: [
          { name: "Target Costing & Life Cycle Costing Implementation", importance: "Mandatory" },
          { name: "CAS 4: Cost of Production for Captive Consumption", importance: "Mandatory" },
          { name: "Six Sigma & Lean Manufacturing Financial Metrics", importance: "Competitive Edge" }
        ]
      }
    ],
    mockInterviewScenarios: [
      {
        question: "Explain the treatment of abnormal idle time cost in Cost Accounting versus Financial Accounting.",
        interviewType: "Technical",
        modelAnswerKey: "In Cost Accounting (under CAS 7 on Employee Cost), abnormal idle time (due to machine breakdowns, power failure, or strikes) is NOT charged to production cost or inventory valuation; it is transferred directly to Costing Profit & Loss Account to prevent distortion of unit production cost. In Financial Accounting, it appears as part of overall operational expenses in Profit & Loss Account.",
        evaluationRubric: [
          "Identifies transfer to Costing P&L A/c directly",
          "Notes non-inclusion in product valuation/inventory",
          "Cites CAS 7 guidelines"
        ]
      }
    ]
  }
]
