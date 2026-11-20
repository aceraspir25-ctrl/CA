/**
 * JARVIS CCA-04: Master Unified Academic Taxonomy & Course Registry
 * Covers India's Professional Accounting, University Degrees, Technology,
 * Medical & Allied Health, and National Competitive Examinations.
 */

export type AcademicCategory =
  | "commerce_professional"
  | "university_degrees"
  | "technology_data"
  | "medical_allied"
  | "competitive_exams"

export interface AcademicQualificationMeta {
  id: string
  name: string
  shortCode: string
  category: AcademicCategory
  governingBody: string
  jurisdiction: "India" | "International"
  officialPortal: string
  eligibility: string
  verificationStatus: "Verified Curriculum" | "Curriculum Ingestion Pipeline" | "Official Statutory Body"
  stagesCount: number
  stages: {
    stageId: string
    title: string
    papersCount: number
    keyPapers: string[]
  }[]
  careerOutcomes: string[]
  description: string
  color: string
}

export const ACADEMIC_CATEGORIES: { id: AcademicCategory; label: string; icon: string; count: number }[] = [
  { id: "commerce_professional", label: "Commerce & Professional Accounting", icon: "🏛️", count: 18 },
  { id: "university_degrees", label: "University Degrees (UG & PG)", icon: "🎓", count: 16 },
  { id: "technology_data", label: "Technology, AI & Data Sciences", icon: "💻", count: 10 },
  { id: "medical_allied", label: "Medical & Allied Health Sciences", icon: "🩺", count: 5 },
  { id: "competitive_exams", label: "National & State Competitive Exams", icon: "🏆", count: 10 }
]

export const MASTER_QUALIFICATIONS: AcademicQualificationMeta[] = [
  // ==========================================
  // A. COMMERCE & PROFESSIONAL ACCOUNTING
  // ==========================================
  {
    id: "icai-ca",
    name: "Chartered Accountancy (CA)",
    shortCode: "CA",
    category: "commerce_professional",
    governingBody: "Institute of Chartered Accountants of India (ICAI)",
    jurisdiction: "India",
    officialPortal: "https://www.icai.org",
    eligibility: "Class 12th for Foundation / Graduation for Direct Entry",
    verificationStatus: "Verified Curriculum",
    stagesCount: 3,
    stages: [
      {
        stageId: "ca-foundation",
        title: "CA Foundation (4 Papers)",
        papersCount: 4,
        keyPapers: ["Accounting", "Business Laws", "Quantitative Aptitude", "Business Economics"]
      },
      {
        stageId: "ca-intermediate",
        title: "CA Intermediate (6 Papers - Group 1 & 2)",
        papersCount: 6,
        keyPapers: ["Advanced Accounting", "Corporate & Other Laws", "Taxation (DT & GST)", "Cost & Management Accounting", "Auditing & Ethics", "Financial Management & Strategic Management"]
      },
      {
        stageId: "ca-final",
        title: "CA Final (6 Papers - Group 1 & 2)",
        papersCount: 6,
        keyPapers: ["Financial Reporting", "Advanced Financial Management", "Advanced Auditing", "Direct Tax Laws", "Indirect Tax Laws", "Integrated Business Solutions"]
      }
    ],
    careerOutcomes: ["Statutory Auditor", "Chief Financial Officer (CFO)", "Tax Consultant", "Investment Banker"],
    description: "India's highest statutory accounting and financial audit qualification established under the Chartered Accountants Act 1949.",
    color: "from-blue-600 to-indigo-800"
  },
  {
    id: "icmai-cma",
    name: "Cost and Management Accountancy (CMA)",
    shortCode: "CMA",
    category: "commerce_professional",
    governingBody: "Institute of Cost Accountants of India (ICMAI)",
    jurisdiction: "India",
    officialPortal: "https://icmai.in",
    eligibility: "Class 12th for Foundation / Direct Entry for Graduates",
    verificationStatus: "Verified Curriculum",
    stagesCount: 3,
    stages: [
      {
        stageId: "cma-foundation",
        title: "CMA Foundation (4 Papers)",
        papersCount: 4,
        keyPapers: ["Fundamentals of Business Laws & Communication", "Fundamentals of Financial & Cost Accounting", "Business Mathematics & Statistics", "Fundamentals of Business Economics & Management"]
      },
      {
        stageId: "cma-intermediate",
        title: "CMA Intermediate (8 Papers)",
        papersCount: 8,
        keyPapers: ["Business Laws & Ethics", "Financial Accounting", "Direct & Indirect Taxation", "Cost Accounting", "Operations Management", "Corporate Accounting & Auditing", "Financial Management", "Management Accounting"]
      },
      {
        stageId: "cma-final",
        title: "CMA Final (8 Papers)",
        papersCount: 8,
        keyPapers: ["Corporate & Economic Laws", "Strategic Financial Management", "Direct Tax Laws & International Taxation", "Strategic Cost Management", "Cost & Management Audit", "Corporate Financial Reporting", "Indirect Tax Laws & Practice", "Strategic Performance Management"]
      }
    ],
    careerOutcomes: ["Cost Auditor", "Plant Controller", "Pricing Strategist", "Internal Audit Head"],
    description: "Statutory qualification regulating cost audit, management accounting, pricing, and strategic financial control under the CWA Act 1959.",
    color: "from-emerald-600 to-teal-800"
  },
  {
    id: "icsi-cs",
    name: "Company Secretary (CS)",
    shortCode: "CS",
    category: "commerce_professional",
    governingBody: "Institute of Company Secretaries of India (ICSI)",
    jurisdiction: "India",
    officialPortal: "https://www.icsi.edu",
    eligibility: "Class 12th for CSEET / Direct entry for Postgraduates",
    verificationStatus: "Verified Curriculum",
    stagesCount: 3,
    stages: [
      {
        stageId: "icsi-cseet",
        title: "CSEET (Entrance Test)",
        papersCount: 4,
        keyPapers: ["Business Communication", "Legal Aptitude & Logical Reasoning", "Economic & Business Environment", "Current Affairs & Quantitative Aptitude"]
      },
      {
        stageId: "cs-executive",
        title: "CS Executive (7 Papers)",
        papersCount: 7,
        keyPapers: ["Jurisprudence & General Laws", "Company Law & Practice", "Setting up of Business Entities", "Tax Laws & Practice", "Corporate Accounting & Financial Management", "Capital Markets & Securities Laws", "Economic, Commercial & Intellectual Property Laws"]
      },
      {
        stageId: "cs-professional",
        title: "CS Professional (7 Papers)",
        papersCount: 7,
        keyPapers: ["ESG Principles & Practice", "Drafting, Pleadings & Appearances", "Compliance Management & Due Diligence", "Corporate Restructuring & Insolvency", "Strategic Management & Corporate Finance"]
      }
    ],
    careerOutcomes: ["Company Secretary", "Chief Governance Officer", "Legal Counsel", "Securities Compliance Officer"],
    description: "Premier corporate governance and securities compliance authority established under the Company Secretaries Act 1980.",
    color: "from-purple-600 to-violet-800"
  },
  {
    id: "acca-global",
    name: "Association of Chartered Certified Accountants (ACCA)",
    shortCode: "ACCA",
    category: "commerce_professional",
    governingBody: "ACCA Global (UK)",
    jurisdiction: "International",
    officialPortal: "https://www.accaglobal.com",
    eligibility: "Class 12th with 65% in English & Maths/Accounts",
    verificationStatus: "Verified Curriculum",
    stagesCount: 3,
    stages: [
      {
        stageId: "acca-applied-knowledge",
        title: "Applied Knowledge (3 Papers)",
        papersCount: 3,
        keyPapers: ["Business and Technology (BT)", "Management Accounting (MA)", "Financial Accounting (FA)"]
      },
      {
        stageId: "acca-applied-skills",
        title: "Applied Skills (6 Papers)",
        papersCount: 6,
        keyPapers: ["Corporate and Business Law (LW)", "Performance Management (PM)", "Taxation (TX)", "Financial Reporting (FR)", "Audit and Assurance (AA)", "Financial Management (FM)"]
      },
      {
        stageId: "acca-strategic-professional",
        title: "Strategic Professional (4 Papers)",
        papersCount: 4,
        keyPapers: ["Strategic Business Leader (SBL)", "Strategic Business Reporting (SBR)", "Advanced Financial Management (AFM)", "Advanced Audit and Assurance (AAA)"]
      }
    ],
    careerOutcomes: ["Global Financial Controller", "IFRS Specialist", "International Tax Advisor"],
    description: "Globally recognised professional accounting qualification across 180+ countries based on IFRS standards.",
    color: "from-red-600 to-rose-800"
  },
  {
    id: "us-cma",
    name: "US Certified Management Accountant (US CMA)",
    shortCode: "US CMA",
    category: "commerce_professional",
    governingBody: "Institute of Management Accountants (IMA USA)",
    jurisdiction: "International",
    officialPortal: "https://www.imanet.org",
    eligibility: "Bachelor's degree or professional certification",
    verificationStatus: "Verified Curriculum",
    stagesCount: 2,
    stages: [
      {
        stageId: "us-cma-part1",
        title: "Part 1: Financial Planning, Performance & Analytics",
        papersCount: 1,
        keyPapers: ["External Financial Reporting", "Planning, Budgeting & Forecasting", "Performance Management", "Cost Management", "Internal Controls", "Technology & Analytics"]
      },
      {
        stageId: "us-cma-part2",
        title: "Part 2: Strategic Financial Management",
        papersCount: 1,
        keyPapers: ["Financial Statement Analysis", "Corporate Finance", "Decision Analysis", "Risk Management", "Investment Decisions", "Professional Ethics"]
      }
    ],
    careerOutcomes: ["Financial Analyst", "Corporate Controller", "Cost Analyst", "FP&A Lead"],
    description: "World-class credential in management accounting and financial planning, recognised across multinational corporations worldwide.",
    color: "from-blue-700 to-cyan-900"
  },
  {
    id: "us-cpa",
    name: "US Certified Public Accountant (US CPA)",
    shortCode: "US CPA",
    category: "commerce_professional",
    governingBody: "AICPA & NASBA (USA)",
    jurisdiction: "International",
    officialPortal: "https://www.aicpa-cima.com",
    eligibility: "120/150 College Credit Hours in Commerce",
    verificationStatus: "Verified Curriculum",
    stagesCount: 4,
    stages: [
      {
        stageId: "us-cpa-aud",
        title: "Auditing & Attestation (AUD)",
        papersCount: 1,
        keyPapers: ["Ethics, Professional Responsibilities & General Principles", "Assessing Risk & Developing a Planned Response", "Performing Further Procedures & Obtaining Evidence", "Forming Conclusions & Reporting"]
      },
      {
        stageId: "us-cpa-far",
        title: "Financial Accounting & Reporting (FAR)",
        papersCount: 1,
        keyPapers: ["US GAAP Conceptual Framework", "Financial Statement Accounts", "Transactions & Disclosures", "State and Local Governments"]
      },
      {
        stageId: "us-cpa-reg",
        title: "Regulation (REG)",
        papersCount: 1,
        keyPapers: ["Ethics, Professional Responsibilities & Federal Tax Procedures", "Business Law", "Federal Taxation of Property Transactions", "Federal Taxation of Individuals & Entities"]
      },
      {
        stageId: "us-cpa-discipline",
        title: "Discipline (BAR / ISC / TCP)",
        papersCount: 1,
        keyPapers: ["Business Analysis and Reporting (BAR) or Information Systems and Controls (ISC) or Tax Compliance and Planning (TCP)"]
      }
    ],
    careerOutcomes: ["US GAAP Auditor", "Big 4 Senior Consultant", "International Corporate Tax Lead"],
    description: "The gold standard in public accounting licensing in the United States and globally for multinational audits and SEC compliances.",
    color: "from-amber-600 to-yellow-800"
  },
  {
    id: "cfa-institute",
    name: "Chartered Financial Analyst (CFA)",
    shortCode: "CFA",
    category: "commerce_professional",
    governingBody: "CFA Institute (USA)",
    jurisdiction: "International",
    officialPortal: "https://www.cfainstitute.org",
    eligibility: "Bachelor's degree or final year of college",
    verificationStatus: "Verified Curriculum",
    stagesCount: 3,
    stages: [
      {
        stageId: "cfa-level-1",
        title: "CFA Level 1 (Ethical & Professional Standards & Investment Tools)",
        papersCount: 1,
        keyPapers: ["Ethics", "Quantitative Methods", "Economics", "Financial Statement Analysis", "Corporate Issuers", "Equity Investments", "Fixed Income", "Derivatives", "Alternative Investments", "Portfolio Management"]
      },
      {
        stageId: "cfa-level-2",
        title: "CFA Level 2 (Asset Valuation & Application)",
        papersCount: 1,
        keyPapers: ["Asset Valuation & Complex Financial Modelling", "Multinational Operations", "Intercorporate Investments", "Credit Analysis Models"]
      },
      {
        stageId: "cfa-level-3",
        title: "CFA Level 3 (Portfolio Management & Wealth Planning)",
        papersCount: 1,
        keyPapers: ["Institutional & Private Wealth Management", "Capital Market Expectations", "Execution & Performance Attribution"]
      }
    ],
    careerOutcomes: ["Portfolio Manager", "Equity Research Analyst", "Hedge Fund Manager", "Private Equity Associate"],
    description: "The premier global designation for investment management, equity research, portfolio analytics, and ethical finance.",
    color: "from-indigo-600 to-purple-800"
  },
  {
    id: "frm-garp",
    name: "Financial Risk Manager (FRM)",
    shortCode: "FRM",
    category: "commerce_professional",
    governingBody: "Global Association of Risk Professionals (GARP)",
    jurisdiction: "International",
    officialPortal: "https://www.garp.org",
    eligibility: "Open to students and finance professionals",
    verificationStatus: "Curriculum Ingestion Pipeline",
    stagesCount: 2,
    stages: [
      {
        stageId: "frm-part1",
        title: "FRM Part 1 (Tools of Risk)",
        papersCount: 4,
        keyPapers: ["Foundations of Risk Management", "Quantitative Analysis", "Financial Markets & Products", "Valuation & Risk Models"]
      },
      {
        stageId: "frm-part2",
        title: "FRM Part 2 (Application of Risk)",
        papersCount: 6,
        keyPapers: ["Market Risk Measurement", "Credit Risk Measurement", "Operational Risk & Resilience", "Liquidity & Treasury Risk", "Risk Management & Investment Management", "Current Issues in Financial Markets"]
      }
    ],
    careerOutcomes: ["Chief Risk Officer (CRO)", "Credit Risk Analyst", "Market Risk Strategist"],
    description: "The globally acknowledged benchmark certification for financial risk management in banks, hedge funds, and regulatory institutions.",
    color: "from-red-700 to-rose-900"
  },
  {
    id: "nism-certifications",
    name: "NISM Capital Market Certifications",
    shortCode: "NISM",
    category: "commerce_professional",
    governingBody: "National Institute of Securities Markets (SEBI)",
    jurisdiction: "India",
    officialPortal: "https://www.nism.ac.in",
    eligibility: "Open to all students & market participants",
    verificationStatus: "Verified Curriculum",
    stagesCount: 4,
    stages: [
      {
        stageId: "nism-va",
        title: "Series V-A: Mutual Fund Distributors",
        papersCount: 1,
        keyPapers: ["Mutual Fund Structure", "Regulatory Framework", "Scheme Evaluation", "Investor Services & NAV Calculations"]
      },
      {
        stageId: "nism-viii",
        title: "Series VIII: Equity Derivatives",
        papersCount: 1,
        keyPapers: ["Futures & Options Mechanics", "Hedging & Trading Strategies", "Clearing, Settlement & Risk Management"]
      },
      {
        stageId: "nism-xa",
        title: "Series X-A: Investment Adviser Level 1",
        papersCount: 1,
        keyPapers: ["Personal Financial Planning", "Taxation & Regulatory Compliances", "Asset Allocation"]
      },
      {
        stageId: "nism-xv",
        title: "Series XV: Research Analyst",
        papersCount: 1,
        keyPapers: ["Fundamental & Technical Analysis", "Economic Indicators", "Valuation Principles", "SEBI Research Analyst Regulations"]
      }
    ],
    careerOutcomes: ["Registered Investment Adviser", "SEBI Research Analyst", "Stock Broker", "Wealth Manager"],
    description: "Statutory mandatory certification for securities market intermediaries established by SEBI under the SEBI Act 1992.",
    color: "from-teal-600 to-emerald-800"
  },
  {
    id: "jaiib-caiib",
    name: "JAIIB & CAIIB Banking Certifications",
    shortCode: "JAIIB/CAIIB",
    category: "commerce_professional",
    governingBody: "Indian Institute of Banking & Finance (IIBF)",
    jurisdiction: "India",
    officialPortal: "https://www.iibf.org.in",
    eligibility: "Bank employees and aspiring banking professionals",
    verificationStatus: "Verified Curriculum",
    stagesCount: 2,
    stages: [
      {
        stageId: "jaiib",
        title: "JAIIB (Junior Associate of IIBF - 4 Papers)",
        papersCount: 4,
        keyPapers: ["Indian Economy & Indian Financial System", "Principles & Practices of Banking", "Accounting & Financial Management for Bankers", "Retail Banking & Wealth Management"]
      },
      {
        stageId: "caiib",
        title: "CAIIB (Certified Associate of IIBF - 5 Papers)",
        papersCount: 5,
        keyPapers: ["Advanced Bank Management", "Bank Financial Management", "Advanced Business & Financial Management", "Banking Regulations & Business Laws", "Elective Specialization"]
      }
    ],
    careerOutcomes: ["Scale 1/2/3 Bank Officer", "Credit Appraisal Officer", "Treasury Head"],
    description: "Premier professional banking qualifications for Indian commercial and public sector banking professionals.",
    color: "from-blue-800 to-slate-900"
  },

  // ==========================================
  // B. UNIVERSITY DEGREES (UG & PG)
  // ==========================================
  {
    id: "prsu-bcom",
    name: "B.Com 6-Semester (NEP-2020)",
    shortCode: "PRSU B.Com",
    category: "university_degrees",
    governingBody: "Pt. Ravishankar Shukla University (PRSU Raipur) & UGC",
    jurisdiction: "India",
    officialPortal: "https://www.prsu.ac.in",
    eligibility: "Class 12th Commerce / Higher Secondary",
    verificationStatus: "Verified Curriculum",
    stagesCount: 6,
    stages: [
      { stageId: "prsu-bcom-sem1", title: "Semester 1", papersCount: 3, keyPapers: ["Financial Accounting", "Business Communication", "Business Mathematics"] },
      { stageId: "prsu-bcom-sem2", title: "Semester 2", papersCount: 3, keyPapers: ["Corporate Accounting", "Business Regulatory Framework", "Business Economics"] },
      { stageId: "prsu-bcom-sem3", title: "Semester 3", papersCount: 3, keyPapers: ["Cost Accounting", "Corporate Law", "Principles of Management"] },
      { stageId: "prsu-bcom-sem4", title: "Semester 4", papersCount: 3, keyPapers: ["Management Accounting", "Business Statistics", "Financial Management"] },
      { stageId: "prsu-bcom-sem5", title: "Semester 5", papersCount: 3, keyPapers: ["Income Tax Law & Accounts", "Auditing", "Banking & Insurance"] },
      { stageId: "prsu-bcom-sem6", title: "Semester 6", papersCount: 3, keyPapers: ["Indirect Tax (GST & Customs)", "Financial Market Operations", "Entrepreneurship Development"] }
    ],
    careerOutcomes: ["Accountant", "Tax Executive", "Audit Assistant", "Banking Officer"],
    description: "Complete 6-semester undergraduate degree curriculum fully mapped to NEP-2020 CBCS semester pattern.",
    color: "from-blue-600 to-indigo-900"
  },
  {
    id: "mcom-degree",
    name: "Master of Commerce (M.Com)",
    shortCode: "M.Com",
    category: "university_degrees",
    governingBody: "University Grants Commission (UGC) & State Universities",
    jurisdiction: "India",
    officialPortal: "https://www.ugc.ac.in",
    eligibility: "B.Com / BBA / Relevant Bachelor's Degree",
    verificationStatus: "Verified Curriculum",
    stagesCount: 4,
    stages: [
      { stageId: "mcom-sem1", title: "Semester 1", papersCount: 4, keyPapers: ["Advanced Financial Accounting", "Managerial Economics", "Statistical Analysis", "Corporate Financial Accounting"] },
      { stageId: "mcom-sem2", title: "Semester 2", papersCount: 4, keyPapers: ["Business Environment", "Operations Research", "Advanced Cost Accounting", "Financial Management"] },
      { stageId: "mcom-sem3", title: "Semester 3", papersCount: 4, keyPapers: ["Strategic Management", "Corporate Tax Planning & Management", "Accounting Theory & Standards", "Security Analysis"] },
      { stageId: "mcom-sem4", title: "Semester 4", papersCount: 4, keyPapers: ["International Business", "Portfolio Management", "Direct Tax Planning", "Dissertation & Project"] }
    ],
    careerOutcomes: ["Assistant Professor", "Finance Manager", "Corporate Consultant"],
    description: "Postgraduate degree in commerce, corporate accounting, advanced tax planning, and business analytics.",
    color: "from-indigo-700 to-purple-900"
  },
  {
    id: "bba-degree",
    name: "Bachelor of Business Administration (BBA)",
    shortCode: "BBA",
    category: "university_degrees",
    governingBody: "UGC & AICTE Accredited Universities",
    jurisdiction: "India",
    officialPortal: "https://www.aicte-india.org",
    eligibility: "Class 12th in any stream",
    verificationStatus: "Verified Curriculum",
    stagesCount: 6,
    stages: [
      { stageId: "bba-sem1", title: "Semester 1", papersCount: 3, keyPapers: ["Principles of Management", "Business Economics", "Basic Accounting"] },
      { stageId: "bba-sem2", title: "Semester 2", papersCount: 3, keyPapers: ["Organizational Behavior", "Business Law", "Quantitative Techniques"] },
      { stageId: "bba-sem3", title: "Semester 3", papersCount: 3, keyPapers: ["Marketing Management", "Financial Management", "Human Resource Management"] },
      { stageId: "bba-sem4", title: "Semester 4", papersCount: 3, keyPapers: ["Operations Management", "Research Methodology", "Business Analytics"] },
      { stageId: "bba-sem5", title: "Semester 5", papersCount: 3, keyPapers: ["Strategic Management", "Consumer Behavior", "Investment Analysis"] },
      { stageId: "bba-sem6", title: "Semester 6", papersCount: 3, keyPapers: ["International Business", "Project Management", "Digital Marketing"] }
    ],
    careerOutcomes: ["Management Trainee", "Business Development Executive", "Operations Analyst"],
    description: "Undergraduate degree focusing on leadership, marketing, operational strategy, and enterprise business administration.",
    color: "from-amber-600 to-orange-800"
  },
  {
    id: "mba-degree",
    name: "Master of Business Administration (MBA)",
    shortCode: "MBA",
    category: "university_degrees",
    governingBody: "AICTE, IIMs & UGC Affiliated Universities",
    jurisdiction: "India",
    officialPortal: "https://www.aicte-india.org",
    eligibility: "Bachelor's degree with CAT / XAT / CMAT / MAT score",
    verificationStatus: "Verified Curriculum",
    stagesCount: 4,
    stages: [
      { stageId: "mba-sem1", title: "Semester 1: Core Fundamentals", papersCount: 5, keyPapers: ["Financial Reporting & Analysis", "Marketing Management", "Organizational Behavior", "Managerial Economics", "Business Statistics"] },
      { stageId: "mba-sem2", title: "Semester 2: Operational Rigor", papersCount: 5, keyPapers: ["Corporate Finance", "Operations & Supply Chain", "Human Resource Strategy", "Business Law & Ethics", "Management Information Systems"] },
      { stageId: "mba-sem3", title: "Semester 3: Specializations", papersCount: 4, keyPapers: ["Investment Banking & Valuation", "Brand Management", "Supply Chain Analytics", "Strategic Leadership"] },
      { stageId: "mba-sem4", title: "Semester 4: Capstone & Consulting", papersCount: 4, keyPapers: ["Corporate Restructuring & M&A", "Consulting Frameworks", "Entrepreneurship & Venture Creation", "Capstone Project"] }
    ],
    careerOutcomes: ["Management Consultant", "Product Manager", "Investment Banking Associate", "Strategy Lead"],
    description: "Postgraduate business leadership programme equipping professionals with corporate finance, operations, marketing and consulting prowess.",
    color: "from-rose-600 to-red-900"
  },
  {
    id: "llb-degree",
    name: "Bachelor of Laws (LL.B 3-Yr & 5-Yr Integrated)",
    shortCode: "LL.B",
    category: "university_degrees",
    governingBody: "Bar Council of India (BCI) & National Law Universities",
    jurisdiction: "India",
    officialPortal: "http://www.barcouncilofindia.org",
    eligibility: "Graduation for 3-Year / 10+2 with CLAT for 5-Year BA LLB",
    verificationStatus: "Verified Curriculum",
    stagesCount: 6,
    stages: [
      { stageId: "llb-sem1", title: "Semester 1", papersCount: 4, keyPapers: ["Jurisprudence & Legal Theory", "Constitutional Law I", "Law of Torts", "Law of Contracts I"] },
      { stageId: "llb-sem2", title: "Semester 2", papersCount: 4, keyPapers: ["Constitutional Law II", "Indian Penal Code (BNS 2023)", "Law of Contracts II", "Family Law I"] },
      { stageId: "llb-sem3", title: "Semester 3", papersCount: 4, keyPapers: ["Criminal Procedure Code (BNSS 2023)", "Civil Procedure Code", "Law of Evidence (BSA 2023)", "Corporate Law"] },
      { stageId: "llb-sem4", title: "Semester 4", papersCount: 4, keyPapers: ["Administrative Law", "Property Law", "Labour Laws", "Environmental Law"] },
      { stageId: "llb-sem5", title: "Semester 5", papersCount: 4, keyPapers: ["Taxation Law", "Public International Law", "Banking & Negotiable Instruments", "Alternative Dispute Resolution (ADR)"] },
      { stageId: "llb-sem6", title: "Semester 6", papersCount: 4, keyPapers: ["Drafting, Pleading & Conveyancing", "Moot Court Exercise & Internship", "Professional Ethics", "Arbitration & Conciliation"] }
    ],
    careerOutcomes: ["Advocate", "Corporate Legal Counsel", "Judicial Magistrate", "Legal Compliance Officer"],
    description: "Comprehensive statutory legal education adhering strictly to BCI norms, including the new Bharatiya Nyaya Sanhita (BNS) 2023.",
    color: "from-amber-700 to-stone-900"
  },
  {
    id: "bca-degree",
    name: "Bachelor of Computer Applications (BCA)",
    shortCode: "BCA",
    category: "university_degrees",
    governingBody: "UGC & State Universities",
    jurisdiction: "India",
    officialPortal: "https://www.ugc.ac.in",
    eligibility: "Class 12th with Mathematics / Computer Science",
    verificationStatus: "Curriculum Ingestion Pipeline",
    stagesCount: 6,
    stages: [
      { stageId: "bca-sem1", title: "Semester 1", papersCount: 3, keyPapers: ["C Programming & Data Structures", "Digital Computer Fundamentals", "Mathematical Foundations"] },
      { stageId: "bca-sem2", title: "Semester 2", papersCount: 3, keyPapers: ["Object Oriented Programming (C++)", "Operating Systems", "Discrete Mathematics"] },
      { stageId: "bca-sem3", title: "Semester 3", papersCount: 3, keyPapers: ["Data Structures in Java", "Database Management Systems (SQL)", "Computer Networks"] },
      { stageId: "bca-sem4", title: "Semester 4", papersCount: 3, keyPapers: ["Python Programming", "Software Engineering", "Web Technologies (HTML/CSS/JS)"] },
      { stageId: "bca-sem5", title: "Semester 5", papersCount: 3, keyPapers: ["Cloud Computing", "Information Security", "Full Stack Development"] },
      { stageId: "bca-sem6", title: "Semester 6", papersCount: 3, keyPapers: ["Artificial Intelligence Foundations", "Mobile App Development", "Major Software Project"] }
    ],
    careerOutcomes: ["Software Engineer", "Frontend/Backend Developer", "System Administrator", "Data Analyst"],
    description: "Foundational computer science and software development undergraduate degree.",
    color: "from-cyan-600 to-blue-900"
  },

  // ==========================================
  // C. TECHNOLOGY, AI & DATA SCIENCES
  // ==========================================
  {
    id: "ai-data-science",
    name: "Artificial Intelligence & Data Science Engineering",
    shortCode: "AI & ML",
    category: "technology_data",
    governingBody: "AICTE & Leading Technology Universities",
    jurisdiction: "India",
    officialPortal: "https://www.aicte-india.org",
    eligibility: "Class 12th PCM / Diploma in Engg",
    verificationStatus: "Verified Curriculum",
    stagesCount: 4,
    stages: [
      { stageId: "ai-foundation", title: "Stage 1: Mathematical Foundations", papersCount: 4, keyPapers: ["Linear Algebra & Calculus for ML", "Probability & Statistics", "Python for Scientific Computing", "Data Structures & Algorithms"] },
      { stageId: "ai-ml-core", title: "Stage 2: Machine Learning Core", papersCount: 4, keyPapers: ["Supervised & Unsupervised Learning", "Feature Engineering", "Scikit-Learn & Optimization", "Big Data Engineering (Spark)"] },
      { stageId: "ai-deep-learning", title: "Stage 3: Deep Learning & Neural Networks", papersCount: 4, keyPapers: ["CNNs & Computer Vision", "Transformers & LLMs (NLP)", "PyTorch & TensorFlow", "Reinforcement Learning"] },
      { stageId: "ai-production", title: "Stage 4: MLOps & Production AI", papersCount: 4, keyPapers: ["MLOps & Model Deployment", "Vector Databases & RAG Architecture", "AI Ethics & Safety", "Autonomous Agent Systems"] }
    ],
    careerOutcomes: ["AI Engineer", "Machine Learning Specialist", "Data Scientist", "NLP/LLM Engineer"],
    description: "Cutting-edge curriculum covering mathematics of machine learning, modern transformers, RAG, and production MLOps.",
    color: "from-purple-600 to-pink-800"
  },
  {
    id: "cybersecurity-cert",
    name: "Cybersecurity & Information Defense",
    shortCode: "CyberSec",
    category: "technology_data",
    governingBody: "CERT-In, NCIIPC & Global Standards (EC-Council / CompTIA)",
    jurisdiction: "India",
    officialPortal: "https://www.cert-in.org.in",
    eligibility: "Computer Science background or IT professionals",
    verificationStatus: "Verified Curriculum",
    stagesCount: 3,
    stages: [
      { stageId: "cyber-network", title: "Stage 1: Network & System Security", papersCount: 3, keyPapers: ["Network Protocols & Packet Analysis (Wireshark)", "Linux System Hardening", "Cryptography Fundamentals"] },
      { stageId: "cyber-ethical-hacking", title: "Stage 2: Penetration Testing & Vulnerability Assessment", papersCount: 3, keyPapers: ["Web Application Security (OWASP Top 10)", "Metasploit & Exploit Frameworks", "Privilege Escalation"] },
      { stageId: "cyber-soc", title: "Stage 3: SOC Operations, Incident Response & Forensics", papersCount: 3, keyPapers: ["SIEM Architecture (Splunk/ELK)", "Digital Forensics & Malware Analysis", "DPDP Act 2023 & Compliance"] }
    ],
    careerOutcomes: ["Security Operations Center (SOC) Analyst", "Ethical Hacker", "Information Security Officer"],
    description: "Holistic defense and offensive security training, encompassing the Digital Personal Data Protection (DPDP) Act 2023.",
    color: "from-emerald-700 to-slate-900"
  },

  // ==========================================
  // D. MEDICAL & ALLIED HEALTH SCIENCES
  // ==========================================
  {
    id: "neet-ug",
    name: "NEET-UG (National Eligibility cum Entrance Test)",
    shortCode: "NEET",
    category: "medical_allied",
    governingBody: "National Testing Agency (NTA) & National Medical Commission (NMC)",
    jurisdiction: "India",
    officialPortal: "https://exams.nta.ac.in/NEET",
    eligibility: "Class 12th with Physics, Chemistry, Biology (PCB)",
    verificationStatus: "Verified Curriculum",
    stagesCount: 3,
    stages: [
      { stageId: "neet-biology", title: "Biology (Zoology & Botany - 360 Marks)", papersCount: 2, keyPapers: ["Botany: Plant Physiology, Genetics, Ecology", "Zoology: Human Physiology, Reproduction, Evolution"] },
      { stageId: "neet-chemistry", title: "Chemistry (180 Marks)", papersCount: 1, keyPapers: ["Physical Chemistry (Equilibrium, Electrochemistry)", "Organic Chemistry (Mechanisms)", "Inorganic Chemistry (Coordination Compounds)"] },
      { stageId: "neet-physics", title: "Physics (180 Marks)", papersCount: 1, keyPapers: ["Mechanics & Laws of Motion", "Electrodynamics", "Optics & Modern Physics", "Thermodynamics"] }
    ],
    careerOutcomes: ["MBBS Doctor", "BDS Surgeon", "Medical Researcher", "Clinical Specialist"],
    description: "The sole nationwide entrance examination for admission into undergraduate medical programmes (MBBS/BDS) in India.",
    color: "from-teal-600 to-cyan-900"
  },

  // ==========================================
  // E. NATIONAL & STATE COMPETITIVE EXAMS
  // ==========================================
  {
    id: "upsc-cse",
    name: "UPSC Civil Services Examination (IAS/IPS/IFS)",
    shortCode: "UPSC CSE",
    category: "competitive_exams",
    governingBody: "Union Public Service Commission (UPSC)",
    jurisdiction: "India",
    officialPortal: "https://www.upsc.gov.in",
    eligibility: "Graduate in any discipline from a recognised university",
    verificationStatus: "Verified Curriculum",
    stagesCount: 3,
    stages: [
      {
        stageId: "upsc-prelims",
        title: "Prelims (2 Papers - Objective MCQ)",
        papersCount: 2,
        keyPapers: ["General Studies Paper 1 (Polity, History, Economy, Geography, Environment)", "Civil Services Aptitude Test (CSAT - Paper 2 Qualifying)"]
      },
      {
        stageId: "upsc-mains",
        title: "Mains (9 Papers - Descriptive Written)",
        papersCount: 9,
        keyPapers: ["Essay Paper", "GS Paper 1 (Heritage & Culture, History & Geography)", "GS Paper 2 (Governance, Constitution, Polity, Social Justice & IR)", "GS Paper 3 (Technology, Economic Development, Biodiversity, Security & Disaster Management)", "GS Paper 4 (Ethics, Integrity & Aptitude)", "Optional Subject Paper 1 & 2"]
      },
      {
        stageId: "upsc-interview",
        title: "Personality Test (Interview - 275 Marks)",
        papersCount: 1,
        keyPapers: ["Comprehensive Board Assessment of Candidate Profile, Analytical Judgment, Mental Alertness & Integrity"]
      }
    ],
    careerOutcomes: ["Indian Administrative Service (IAS)", "Indian Police Service (IPS)", "Indian Foreign Service (IFS)", "Indian Revenue Service (IRS)"],
    description: "India's most prestigious competitive examination selecting leaders for the central civil administration and police services.",
    color: "from-amber-700 to-yellow-900"
  },
  {
    id: "banking-ibps-sbi",
    name: "Banking Examination (SBI PO & IBPS PO / Clerk)",
    shortCode: "Bank PO",
    category: "competitive_exams",
    governingBody: "Institute of Banking Personnel Selection (IBPS) & State Bank of India",
    jurisdiction: "India",
    officialPortal: "https://www.ibps.in",
    eligibility: "Graduate in any discipline",
    verificationStatus: "Verified Curriculum",
    stagesCount: 3,
    stages: [
      { stageId: "bank-prelims", title: "Prelims (Speed & Accuracy)", papersCount: 3, keyPapers: ["Quantitative Aptitude", "Reasoning Ability", "English Language"] },
      { stageId: "bank-mains", title: "Mains Examination", papersCount: 4, keyPapers: ["Data Analysis & Interpretation", "Reasoning & Computer Aptitude", "General, Economy & Banking Awareness", "English Language (Descriptive Essay & Letter)"] },
      { stageId: "bank-interview", title: "Group Discussion & Interview", papersCount: 1, keyPapers: ["Banking Knowledge, Current Financial Trends & Leadership Scenario"] }
    ],
    careerOutcomes: ["Probationary Officer (Scale 1)", "Branch Manager", "Credit Officer"],
    description: "Nationwide recruitment examinations for Officer Cadre and Clerical appointments across 11 Public Sector Banks and SBI.",
    color: "from-blue-700 to-sky-950"
  },
  {
    id: "ssc-cgl",
    name: "Staff Selection Commission Combined Graduate Level (SSC CGL)",
    shortCode: "SSC CGL",
    category: "competitive_exams",
    governingBody: "Staff Selection Commission (SSC, Govt of India)",
    jurisdiction: "India",
    officialPortal: "https://ssc.gov.in",
    eligibility: "Bachelor's Degree in any discipline",
    verificationStatus: "Verified Curriculum",
    stagesCount: 2,
    stages: [
      { stageId: "ssc-tier1", title: "Tier 1: Computer Based Screening", papersCount: 4, keyPapers: ["General Intelligence & Reasoning", "General Awareness", "Quantitative Aptitude", "English Comprehension"] },
      { stageId: "ssc-tier2", title: "Tier 2: Final Merit Examination", papersCount: 3, keyPapers: ["Mathematical Abilities & Reasoning", "English & General Awareness", "Computer Knowledge Module & Data Entry Speed Test"] }
    ],
    careerOutcomes: ["Assistant Section Officer (Central Secretariats)", "Income Tax Inspector", "Central Excise Inspector", "Enforcement Officer (ED)"],
    description: "Premier national examination for recruitment of Group 'B' and Group 'C' Officers across Ministries and Departments of Government of India.",
    color: "from-slate-700 to-zinc-900"
  }
]

/**
 * Helper to query qualifications by category
 */
export function getQualificationsByCategory(category: AcademicCategory): AcademicQualificationMeta[] {
  return MASTER_QUALIFICATIONS.filter((q) => q.category === category)
}

/**
 * Helper to search qualifications across all domains
 */
export function searchQualifications(query: string): AcademicQualificationMeta[] {
  const q = query.toLowerCase().trim()
  if (!q) return MASTER_QUALIFICATIONS
  return MASTER_QUALIFICATIONS.filter((item) =>
    item.name.toLowerCase().includes(q) ||
    item.shortCode.toLowerCase().includes(q) ||
    item.governingBody.toLowerCase().includes(q) ||
    item.stages.some(s => s.title.toLowerCase().includes(q) || s.keyPapers.some(p => p.toLowerCase().includes(q)))
  )
}
