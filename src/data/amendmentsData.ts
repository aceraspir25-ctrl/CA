/**
 * JARVIS CCA-04: Statutory & Syllabus Amendment Tracker Data
 * Real historical and current statutory amendments for ICAI CA, ICMAI CMA, ICSI CS, and Taxation.
 */

export interface StatutoryAmendment {
  id: string
  title: string
  category: "taxation" | "corporate_law" | "accounting_standards" | "syllabus_scheme"
  qualificationIds: string[] // e.g. ["icai-ca", "icmai-cma", "prsu-bcom"]
  statute: string
  sectionAffected: string
  effectiveDate: string
  officialGazetteRef: string
  sourceDocumentUrl: string
  previousProvision: string
  amendedProvision: string
  academicImpactSummary: string
  applicableExamSession: string
  keyChanges: string[]
}

export const STATUTORY_AMENDMENTS: StatutoryAmendment[] = [
  {
    id: "amend-tax-115bac-2024",
    title: "Finance Act 2024: New Tax Regime Slab Revision & Standard Deduction Hike",
    category: "taxation",
    qualificationIds: ["icai-ca", "icmai-cma", "prsu-bcom"],
    statute: "Income Tax Act 1961",
    sectionAffected: "Section 115BAC & Section 16(ia)",
    effectiveDate: "2024-04-01",
    officialGazetteRef: "Finance (No. 2) Act 2024 (Gazette of India Extraordinary Part II)",
    sourceDocumentUrl: "https://incometaxindia.gov.in",
    previousProvision: "Standard deduction for salaried employees was ₹50,000. New regime slabs: ₹0–3L (Nil), ₹3–6L (5%), ₹6–9L (10%), ₹9–12L (15%), ₹12–15L (20%), Above ₹15L (30%).",
    amendedProvision: "Standard deduction increased to ₹75,000 for salaried employees opting for Section 115BAC. Revised slabs: ₹0–3L (Nil), ₹3–7L (5%), ₹7–10L (10%), ₹10–12L (15%), ₹12–15L (20%), Above ₹15L (30%).",
    academicImpactSummary: "Directly impacts CA Inter Paper 3 (Taxation), CMA Inter Paper 7, and B.Com Sem 5 Income Tax computations for May/Nov 2025 and 2026 examination sessions.",
    applicableExamSession: "May/June 2025 & Nov/Dec 2025 onwards",
    keyChanges: [
      "Standard Deduction under Section 16(ia) raised from ₹50,000 to ₹75,000 under New Tax Regime.",
      "Slab of 5% widened to cover ₹3,00,000 to ₹7,00,000 (earlier ₹3L–₹6L).",
      "Family pension standard deduction under Section 57(iia) raised from ₹15,000 to ₹25,000.",
      "Section 87A rebate of ₹25,000 ensures Zero Tax up to ₹7,00,000 taxable income."
    ]
  },
  {
    id: "amend-law-bns-2023",
    title: "Bharatiya Nyaya Sanhita (BNS 2023) replacing Indian Penal Code 1860",
    category: "corporate_law",
    qualificationIds: ["icai-ca", "icsi-cs", "llb-degree"],
    statute: "Criminal & Corporate Penal Jurisprudence",
    sectionAffected: "BNS 2023 (Acts 45, 46 & 47 of 2023)",
    effectiveDate: "2024-07-01",
    officialGazetteRef: "Ministry of Home Affairs Notification S.O. 850(E)",
    sourceDocumentUrl: "https://mha.gov.in",
    previousProvision: "Offences relating to corporate fraud, cheating, criminal breach of trust, and forgery governed under IPC 1860 Sections 405, 415, 420 and 463.",
    amendedProvision: "IPC 1860 repealed. Replaced by Bharatiya Nyaya Sanhita 2023: Section 316 (Criminal breach of trust), Section 318 (Cheating), Section 336 (Forgery), and community service penalties introduced.",
    academicImpactSummary: "Essential for CS Executive Jurisprudence & Company Law, CA Foundation Paper 2 Business Laws, and 3-Year/5-Year LL.B criminal law papers.",
    applicableExamSession: "December 2024 & June 2025 onwards",
    keyChanges: [
      "Section 420 IPC (Cheating) transitioned to Section 318(4) of BNS 2023.",
      "Section 405 IPC (Criminal Breach of Trust) transitioned to Section 316 of BNS 2023.",
      "Electronic records and digital communications given primary evidentiary status under BSA 2023.",
      "Introduction of mandatory community service for petty commercial misdemeanors."
    ]
  },
  {
    id: "amend-icai-new-scheme",
    title: "ICAI New Scheme of Education and Training (Gazetted 2023/2024)",
    category: "syllabus_scheme",
    qualificationIds: ["icai-ca"],
    statute: "Chartered Accountants Regulations 1988 (Amended 2023)",
    sectionAffected: "Regulations 25F to 31",
    effectiveDate: "2023-07-01",
    officialGazetteRef: "ICAI Notification No. 1-CA(7)/201/2023",
    sourceDocumentUrl: "https://www.icai.org/post/new-scheme-of-education-and-training",
    previousProvision: "8 Papers in CA Intermediate (2 Groups of 4 papers each) and 8 Papers in CA Final. 3 years mandatory articleship.",
    amendedProvision: "6 Papers in CA Intermediate (2 Groups of 3 papers each) and 6 Papers in CA Final. Articleship duration reduced to 2 years with 4 Self-Paced Online Modules (SPOM Set A, B, C, D).",
    academicImpactSummary: "Significant restructuring of examination weightage: 30% mandatory case-scenario MCQs across all papers with negative marking removed for Foundation/Inter subjective papers.",
    applicableExamSession: "May 2024 onwards (Current Active Scheme)",
    keyChanges: [
      "Intermediate reduced from 8 papers to 6 papers.",
      "Final reduced from 8 papers to 6 papers (Multi-Disciplinary Case Study incorporated as Paper 6).",
      "Articleship reduced from 3 years to 2 years seamless industrial training.",
      "Self-Paced Online Modules (SPOM) introduced for Corporate & Economic Laws (Set A) and Strategic Cost & Performance Management (Set B)."
    ]
  },
  {
    id: "amend-indas-115-116",
    title: "Ind AS 116 Leases & Ind AS 115 Revenue Contracts MCA Disclosures",
    category: "accounting_standards",
    qualificationIds: ["icai-ca", "icmai-cma", "acca-global"],
    statute: "Companies (Indian Accounting Standards) Rules 2015",
    sectionAffected: "MCA Notification on Ind AS Disclosures",
    effectiveDate: "2024-04-01",
    officialGazetteRef: "Ministry of Corporate Affairs Notification G.S.R. 242(E)",
    sourceDocumentUrl: "https://mca.gov.in",
    previousProvision: "Permitted transitional expedients for discount rates and lease modifications with general disclosures.",
    amendedProvision: "Mandatory quantitative disclosure of lease liabilities maturity profiles, variable lease payments, and five-step contract performance obligation allocations.",
    academicImpactSummary: "High-weightage practical numericals in CA Final Paper 1 (Financial Reporting) and CMA Final Paper 17 (Corporate Financial Reporting).",
    applicableExamSession: "2024/2025/2026 Examination Sessions",
    keyChanges: [
      "Right-of-Use (ROU) asset amortization schedules must be presented separately by asset class.",
      "Variable lease payments not included in lease liability measurement must be disclosed explicitly.",
      "Stand-alone selling price (SSP) allocation methodologies under Ind AS 115 Step 4 scrutinized."
    ]
  }
]
