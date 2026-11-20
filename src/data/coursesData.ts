export interface Chapter {
  id: string
  number: number
  title: string
  hindiTitle: string
  description: string
  levels: { min: number; max: number }
  topicsCount: number
  estimatedHours: number
  isCompleted?: boolean
}

export interface SubjectPaper {
  id: string
  paperNumber: number | string
  title: string
  marks: number
  description: string
  chapters: Chapter[]
}

export interface CourseGroup {
  id: string
  title: string
  description: string
  papers: SubjectPaper[]
}

export interface CourseLevel {
  id: string
  title: string
  shortTitle: string
  institution: "ICAI" | "ICMAI" | "ICSI" | "PRSU" | "ACCA" | "BBA" | string
  description: string
  eligibility: string
  scheme: string
  groups?: CourseGroup[]
  papers?: SubjectPaper[] // for single group levels like Foundation
}

export interface Institution {
  id: string
  name: string
  shortName: string
  badgeColor: string
  description: string
  officialUrl: string
  levels: CourseLevel[]
}

export const INSTITUTIONS_DATA: Institution[] = [
  {
    id: "icai",
    name: "Institute of Chartered Accountants of India",
    shortName: "ICAI",
    badgeColor: "bg-blue-600 text-white",
    description: "Premier statutory accounting body in India regulating the Chartered Accountancy profession.",
    officialUrl: "https://www.icai.org",
    levels: [
      {
        id: "ca-foundation",
        title: "CA Foundation Course",
        shortTitle: "CA Foundation",
        institution: "ICAI",
        description: "Entry-level examination for Chartered Accountancy consisting of 4 comprehensive papers.",
        eligibility: "Passed Class 12 or registered after Class 10",
        scheme: "New Scheme of Education and Training (2023+)",
        papers: [
          {
            id: "ca-f-p1",
            paperNumber: 1,
            title: "Accounting",
            marks: 100,
            description: "Fundamental principles, accounting cycle, financial statements, and special transactions.",
            chapters: [
              { id: "ch1", number: 1, title: "Theoretical Framework & Meaning of Accounting", hindiTitle: "लेखांकन का सैद्धांतिक ढांचा एवं अर्थ", description: "Nature, scope, concepts, principles, conventions and Indian Accounting Standards.", levels: { min: 0, max: 20 }, topicsCount: 6, estimatedHours: 8, isCompleted: true },
              { id: "ch2", number: 2, title: "Accounting Process: Journal, Ledger & Trial Balance", hindiTitle: "लेखांकन प्रक्रिया: रोजनामचा, खाता-बही एवं तलपट", description: "Recording transactions, golden rules of accounting, ledger posting, and trial balance preparation.", levels: { min: 10, max: 35 }, topicsCount: 8, estimatedHours: 12, isCompleted: true },
              { id: "ch3", number: 3, title: "Bank Reconciliation Statement (BRS)", hindiTitle: "बैंक समाधान विवरण (BRS)", description: "Causes of difference between Cash Book and Pass Book, adjusted cash book approach.", levels: { min: 20, max: 45 }, topicsCount: 5, estimatedHours: 8, isCompleted: true },
              { id: "ch4", number: 4, title: "Inventories & Valuation Methods", hindiTitle: "रहतिया एवं मूल्यांकन पद्धतियां", description: "FIFO, LIFO, Weighted Average, Net Realisable Value (NRV) principles.", levels: { min: 25, max: 50 }, topicsCount: 5, estimatedHours: 6 },
              { id: "ch5", number: 5, title: "Depreciation and Amortisation", hindiTitle: "ह्रास एवं परिशोधन", description: "Straight Line Method (SLM), Written Down Value (WDV), change in method provisions.", levels: { min: 25, max: 55 }, topicsCount: 7, estimatedHours: 10 },
              { id: "ch6", number: 6, title: "Bills of Exchange & Promissory Notes", hindiTitle: "विनिमय विपत्र एवं प्रतिज्ञा पत्र", description: "Discounting, endorsement, dishonour, renewal, accommodation bills.", levels: { min: 30, max: 60 }, topicsCount: 6, estimatedHours: 8 },
              { id: "ch7", number: 7, title: "Preparation of Final Accounts of Sole Proprietors", hindiTitle: "अंतिम खाते: व्यापारिक, लाभ-हानि खाता व चिट्ठा", description: "Trading Account, Profit & Loss Account, Balance Sheet with comprehensive adjustments.", levels: { min: 35, max: 65 }, topicsCount: 9, estimatedHours: 14 },
              { id: "ch8", number: 8, title: "Financial Statements of Not-for-Profit Organisations (NPO)", hindiTitle: "गैर-लाभकारी संस्थाओं के वित्तीय विवरण (NPO)", description: "Receipts & Payments Account, Income & Expenditure Account, and Balance Sheet.", levels: { min: 40, max: 70 }, topicsCount: 6, estimatedHours: 10 },
              { id: "ch9", number: 9, title: "Accounts from Incomplete Records (Single Entry)", hindiTitle: "अपूर्ण अभिलेखों से खाते (इकहरा लेखा प्रणाली)", description: "Statement of Affairs method and conversion into double-entry system.", levels: { min: 40, max: 75 }, topicsCount: 5, estimatedHours: 8 },
              { id: "ch10", number: 10, title: "Partnership and LLP Accounts", hindiTitle: "साझेदारी एवं एलएलपी के खाते", description: "Profit sharing, goodwill, admission, retirement, death, and dissolution.", levels: { min: 45, max: 80 }, topicsCount: 12, estimatedHours: 20 },
              { id: "ch11", number: 11, title: "Company Accounts: Shares & Debentures", hindiTitle: "कंपनी खाते: अंश एवं ऋणपत्र", description: "Issue, forfeiture and re-issue of shares, issue of debentures with redemption conditions.", levels: { min: 50, max: 85 }, topicsCount: 10, estimatedHours: 16 }
            ]
          },
          {
            id: "ca-f-p2",
            paperNumber: 2,
            title: "Business Laws",
            marks: 100,
            description: "Indian Regulatory Framework, Indian Contract Act 1872, Sale of Goods Act, Partnership Act, LLP Act, Companies Act 2013.",
            chapters: [
              { id: "bl-ch1", number: 1, title: "Indian Regulatory Framework", hindiTitle: "भारतीय नियामक ढांचा", description: "Sources of law, court system, functioning of legislative bodies.", levels: { min: 0, max: 20 }, topicsCount: 4, estimatedHours: 4 },
              { id: "bl-ch2", number: 2, title: "The Indian Contract Act, 1872", hindiTitle: "भारतीय अनुबंध अधिनियम, 1872", description: "Essential elements of valid contract, offer, acceptance, consideration, void agreements, breach.", levels: { min: 10, max: 60 }, topicsCount: 14, estimatedHours: 24 },
              { id: "bl-ch3", number: 3, title: "The Sale of Goods Act, 1930", hindiTitle: "माल विक्रय अधिनियम, 1930", description: "Formation of contract of sale, conditions and warranties, transfer of ownership, unpaid seller.", levels: { min: 20, max: 60 }, topicsCount: 8, estimatedHours: 14 },
              { id: "bl-ch4", number: 4, title: "The Indian Partnership Act, 1932", hindiTitle: "भारतीय साझेदारी अधिनियम, 1932", description: "General nature of partnership, relations of partners, registration and dissolution.", levels: { min: 25, max: 65 }, topicsCount: 7, estimatedHours: 12 },
              { id: "bl-ch5", number: 5, title: "The Limited Liability Partnership Act, 2008", hindiTitle: "सीमित दायित्व साझेदारी अधिनियम, 2008", description: "Salient features, incorporation, partners and their relations, conversion.", levels: { min: 30, max: 70 }, topicsCount: 5, estimatedHours: 8 },
              { id: "bl-ch6", number: 6, title: "The Companies Act, 2013 (Introductory)", hindiTitle: "कंपनी अधिनियम, 2013 (परिचय)", description: "Meaning, characteristics, corporate veil theory, classes of companies, MOA and AOA.", levels: { min: 30, max: 75 }, topicsCount: 8, estimatedHours: 14 }
            ]
          },
          {
            id: "ca-f-p3",
            paperNumber: 3,
            title: "Quantitative Aptitude",
            marks: 100,
            description: "Business Mathematics, Logical Reasoning, and Statistics.",
            chapters: [
              { id: "qa-ch1", number: 1, title: "Ratio, Proportion, Indices and Logarithms", hindiTitle: "अनुपात, समानुपात, घातांक एवं लघुगणक", description: "Mathematical foundations for business calculations.", levels: { min: 0, max: 30 }, topicsCount: 5, estimatedHours: 8 },
              { id: "qa-ch2", number: 2, title: "Equations & Matrices", hindiTitle: "समीकरण एवं आव्यूह", description: "Linear and quadratic equations, matrix operations.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10 },
              { id: "qa-ch3", number: 3, title: "Mathematics of Finance", hindiTitle: "वित्तीय गणित: साधारण व चक्रवृद्धि ब्याज, वार्षिकी", description: "Simple interest, compound interest, annuities, perpetuities, Net Present Value.", levels: { min: 15, max: 65 }, topicsCount: 8, estimatedHours: 16 },
              { id: "qa-ch4", number: 4, title: "Logical Reasoning (Number Series, Blood Relations, Seating)", hindiTitle: "तार्किक तर्कशक्ति", description: "Direction tests, seating arrangements, coding-decoding, syllogisms.", levels: { min: 0, max: 40 }, topicsCount: 5, estimatedHours: 10 },
              { id: "qa-ch5", number: 5, title: "Statistical Description of Data & Central Tendency", hindiTitle: "सांख्यिकीय डेटा एवं केंद्रीय प्रवृत्ति के माप", description: "Mean, median, mode, standard deviation, variance, coefficient of variation.", levels: { min: 10, max: 55 }, topicsCount: 8, estimatedHours: 14 },
              { id: "qa-ch6", number: 6, title: "Probability and Theoretical Distributions", hindiTitle: "प्रायिकता एवं सैद्धांतिक वितरण", description: "Basic probability, Binomial, Poisson, and Normal distributions.", levels: { min: 30, max: 70 }, topicsCount: 7, estimatedHours: 14 }
            ]
          },
          {
            id: "ca-f-p4",
            paperNumber: 4,
            title: "Business Economics",
            marks: 100,
            description: "Microeconomics, Macroeconomics, Indian Economy, and Public Finance.",
            chapters: [
              { id: "ec-ch1", number: 1, title: "Introduction to Business Economics", hindiTitle: "व्यावसायिक अर्थशास्त्र का परिचय", description: "Scope, positive vs normative economics, micro vs macro fundamentals.", levels: { min: 0, max: 20 }, topicsCount: 4, estimatedHours: 6 },
              { id: "ec-ch2", number: 2, title: "Theory of Demand and Supply", hindiTitle: "मांग एवं पूर्ति का सिद्धांत", description: "Law of demand, elasticity of demand, supply curve, market equilibrium.", levels: { min: 10, max: 45 }, topicsCount: 8, estimatedHours: 12 },
              { id: "ec-ch3", number: 3, title: "Theory of Production and Cost", hindiTitle: "उत्पादन एवं लागत सिद्धांत", description: "Laws of returns, Cobb-Douglas function, short-run and long-run cost curves.", levels: { min: 20, max: 55 }, topicsCount: 7, estimatedHours: 12 },
              { id: "ec-ch4", number: 4, title: "Price Determination in Different Markets", hindiTitle: "विभिन्न बाजारों में मूल्य निर्धारण", description: "Perfect competition, monopoly, monopolistic competition, oligopoly.", levels: { min: 25, max: 65 }, topicsCount: 6, estimatedHours: 12 },
              { id: "ec-ch5", number: 5, title: "National Income Accounting", hindiTitle: "राष्ट्रीय आय लेखांकन", description: "GDP, GNP, NNP, circular flow of income, measurement methodologies.", levels: { min: 30, max: 70 }, topicsCount: 5, estimatedHours: 10 },
              { id: "ec-ch6", number: 6, title: "Public Finance, Fiscal & Monetary Policy", hindiTitle: "लोक वित्त, राजकोषीय एवं मौद्रिक नीति", description: "Taxation, government expenditure, RBI credit control instruments.", levels: { min: 35, max: 75 }, topicsCount: 7, estimatedHours: 12 }
            ]
          }
        ]
      },
      {
        id: "ca-intermediate",
        title: "CA Intermediate Course",
        shortTitle: "CA Intermediate",
        institution: "ICAI",
        description: "Intermediate level divided into 2 groups covering Advanced Accounting, Corporate Laws, Tax, Costing, Auditing and FM.",
        eligibility: "Passed CA Foundation or Direct Entry (Graduates / Post Graduates)",
        scheme: "New Scheme 2023+ (6 Papers)",
        groups: [
          {
            id: "ca-int-g1",
            title: "Group 1",
            description: "Advanced Accounting, Corporate and Other Laws, Taxation",
            papers: [
              {
                id: "ca-int-p1",
                paperNumber: 1,
                title: "Advanced Accounting",
                marks: 100,
                description: "Indian Accounting Standards (Ind AS), company financial statements, consolidation, branch accounts.",
                chapters: [
                  { id: "ca-int-ch1", number: 1, title: "Applicability of Accounting Standards & AS Framework", hindiTitle: "लेखांकन मानकों की प्रयोज्यता", description: "AS 1, 2, 3, 10, 11, 12, 13, 16 overview and framework.", levels: { min: 40, max: 80 }, topicsCount: 10, estimatedHours: 18 },
                  { id: "ca-int-ch2", number: 2, title: "Financial Statements of Companies (Schedule III)", hindiTitle: "कंपनियों के वित्तीय विवरण (अनुसूची III)", description: "Preparation of Balance Sheet and Statement of Profit and Loss as per Companies Act 2013.", levels: { min: 45, max: 85 }, topicsCount: 8, estimatedHours: 16 },
                  { id: "ca-int-ch3", number: 3, title: "Consolidated Financial Statements", hindiTitle: "समेकित वित्तीय विवरण", description: "Holding and subsidiary accounts, minority interest, unrealised profits.", levels: { min: 55, max: 95 }, topicsCount: 9, estimatedHours: 20 },
                  { id: "ca-int-ch4", number: 4, title: "Internal & External Reconstruction", hindiTitle: "आंतरिक एवं बाह्य पुनर्निर्माण", description: "Capital reduction schemes, absorption and amalgamation.", levels: { min: 50, max: 90 }, topicsCount: 7, estimatedHours: 16 }
                ]
              },
              {
                id: "ca-int-p2",
                paperNumber: 2,
                title: "Corporate and Other Laws",
                marks: 100,
                description: "Company Law (Companies Act 2013) & Other Laws including Foreign Exchange Management Act (FEMA).",
                chapters: [
                  { id: "ca-law-ch1", number: 1, title: "Incorporation of Company and Matters Incidental", hindiTitle: "कंपनी का समामेलन", description: "Sections 1 to 22 of the Companies Act 2013.", levels: { min: 40, max: 75 }, topicsCount: 6, estimatedHours: 12 },
                  { id: "ca-law-ch2", number: 2, title: "Prospectus and Allotment of Securities", hindiTitle: "प्रविवरण एवं प्रतिभूतियों का आवंटन", description: "Public offer, private placement, civil and criminal liability for misstatements.", levels: { min: 45, max: 80 }, topicsCount: 6, estimatedHours: 10 },
                  { id: "ca-law-ch3", number: 3, title: "Share Capital, Debentures, and Charges", hindiTitle: "अंश पूंजी, ऋणपत्र एवं प्रभार", description: "Creation, modification and satisfaction of charges (Sections 77 to 87).", levels: { min: 45, max: 85 }, topicsCount: 8, estimatedHours: 14 },
                  { id: "ca-law-ch4", number: 4, title: "Management & Administration (General Meetings)", hindiTitle: "प्रबंधन एवं प्रशासन (साधारण सभाएं)", description: "AGM, EGM, proxies, resolutions, voting mechanisms (Sections 96 to 122).", levels: { min: 50, max: 85 }, topicsCount: 9, estimatedHours: 16 },
                  { id: "ca-law-ch5", number: 5, title: "Foreign Exchange Management Act, 1999 (FEMA)", hindiTitle: "विदेशी मुद्रा प्रबंधन अधिनियम (FEMA)", description: "Current account transactions, capital account transactions, residential status.", levels: { min: 55, max: 90 }, topicsCount: 6, estimatedHours: 12 }
                ]
              },
              {
                id: "ca-int-p3",
                paperNumber: 3,
                title: "Taxation (Direct Tax: 50 Marks, GST: 50 Marks)",
                marks: 100,
                description: "Comprehensive study of Income Tax Act 1961 and Goods & Services Tax (GST) Acts.",
                chapters: [
                  { id: "tax-ch1", number: 1, title: "Basic Concepts & Residential Status (Sec 1-9)", hindiTitle: "आयकर के मूल सिद्धांत एवं आवासीय स्थिति", description: "Scope of total income, deemed resident, resident but not ordinarily resident.", levels: { min: 30, max: 65 }, topicsCount: 6, estimatedHours: 10 },
                  { id: "tax-ch2", number: 2, title: "Salaries & Perquisites (Sec 15-17)", hindiTitle: "वेतन शीर्ष से आय एवं अनुलाभ", description: "Allowances, perquisites valuation, retirement benefits, standard deduction.", levels: { min: 40, max: 80 }, topicsCount: 9, estimatedHours: 18 },
                  { id: "tax-ch3", number: 3, title: "Income from House Property (Sec 22-27)", hindiTitle: "मकान संपत्ति से आय", description: "NAV computation, municipal taxes, standard deduction (24a), interest on home loan (24b).", levels: { min: 35, max: 70 }, topicsCount: 5, estimatedHours: 8 },
                  { id: "tax-ch4", number: 4, title: "Profits and Gains of Business or Profession (PGBP - Sec 28-44DB)", hindiTitle: "व्यापार या पेशे से लाभ (PGBP)", description: "Allowable and disallowable expenses, depreciation under Sec 32, presumptive taxation (44AD, 44ADA).", levels: { min: 50, max: 90 }, topicsCount: 14, estimatedHours: 24 },
                  { id: "tax-ch5", number: 5, title: "Capital Gains (Sec 45-55A)", hindiTitle: "पूंजीगत लाभ", description: "Short-term vs long-term, indexation, exemptions under Section 54, 54EC, 54F.", levels: { min: 45, max: 85 }, topicsCount: 10, estimatedHours: 16 },
                  { id: "tax-ch6", number: 6, title: "Income from Other Sources & Deductions (80C to 80U)", hindiTitle: "अन्य स्रोतों से आय एवं कटौतियां", description: "Gift taxation, dividend income, family pension, 80C, 80D, 80G, 80TTA.", levels: { min: 40, max: 80 }, topicsCount: 8, estimatedHours: 14 },
                  { id: "tax-ch7", number: 7, title: "Old vs New Tax Regime (Section 115BAC)", hindiTitle: "पुरानी बनाम नई कर व्यवस्था (धारा 115BAC)", description: "Comparative tax calculation, default tax regime rules, surcharge and rebate under 87A.", levels: { min: 45, max: 90 }, topicsCount: 5, estimatedHours: 10 },
                  { id: "tax-ch8", number: 8, title: "GST: Concept, Supply, Charge & Exemption", hindiTitle: "जीएसटी: आपूर्ति, प्रभार एवं छूट", description: "CGST, SGST, IGST framework, composite and mixed supplies, reverse charge mechanism.", levels: { min: 35, max: 75 }, topicsCount: 8, estimatedHours: 14 },
                  { id: "tax-ch9", number: 9, title: "GST: Input Tax Credit (ITC) Mechanics", hindiTitle: "जीएसटी: इनपुट टैक्स क्रेडिट (ITC) की कार्यप्रणाली", description: "Eligibility, blocked credits (Sec 17(5)), apportionment, reversal rules.", levels: { min: 50, max: 95 }, topicsCount: 9, estimatedHours: 18 }
                ]
              }
            ]
          },
          {
            id: "ca-int-g2",
            title: "Group 2",
            description: "Cost and Management Accounting, Auditing and Ethics, Financial Management & Strategic Management",
            papers: [
              {
                id: "ca-int-p4",
                paperNumber: 4,
                title: "Cost and Management Accounting",
                marks: 100,
                description: "Material, Labour, Overheads, Cost Sheet, Marginal Costing, Standard Costing, Budgets.",
                chapters: [
                  { id: "cma-ch1", number: 1, title: "Material Costing & EOQ", hindiTitle: "सामग्री लागत एवं मितव्ययी आदेश मात्रा (EOQ)", description: "Stock levels, EOQ formula, pricing of material issues (FIFO/Weighted Average).", levels: { min: 30, max: 70 }, topicsCount: 6, estimatedHours: 10 },
                  { id: "cma-ch2", number: 2, title: "Marginal Costing & Break-Even Analysis", hindiTitle: "सीमांत लागत एवं सम-विच्छेद विश्लेषण (BEP)", description: "Contribution, P/V ratio, Break-even point, Margin of Safety, key factor decisions.", levels: { min: 40, max: 85 }, topicsCount: 8, estimatedHours: 16 },
                  { id: "cma-ch3", number: 3, title: "Standard Costing and Variance Analysis", hindiTitle: "प्रमाप लागत एवं विचरण विश्लेषण", description: "Material, Labour, and Overhead variances calculation and managerial interpretation.", levels: { min: 50, max: 90 }, topicsCount: 9, estimatedHours: 18 }
                ]
              },
              {
                id: "ca-int-p5",
                paperNumber: 5,
                title: "Auditing and Ethics",
                marks: 100,
                description: "Nature of Audit, Standards on Auditing (SAs), Audit Strategy, Internal Control, Company Audit.",
                chapters: [
                  { id: "audit-ch1", number: 1, title: "Nature, Objective and Scope of Audit (SA 200)", hindiTitle: "अंकेक्षण की प्रकृति, उद्देश्य एवं दायरा", description: "Inherent limitations, professional skepticism, audit risk components.", levels: { min: 35, max: 75 }, topicsCount: 6, estimatedHours: 10 },
                  { id: "audit-ch2", number: 2, title: "Audit Evidence, Sampling & Analytical Procedures (SA 500, 520, 530)", hindiTitle: "अंकेक्षण साक्ष्य एवं प्रतिचयन", description: "Sufficiency and appropriateness, substantive testing, test of controls.", levels: { min: 45, max: 85 }, topicsCount: 7, estimatedHours: 14 },
                  { id: "audit-ch3", number: 3, title: "Company Audit & Audit Report (Sec 139 to 148, SA 700)", hindiTitle: "कंपनी अंकेक्षण एवं अंकेक्षक की रिपोर्ट", description: "Appointment, removal, disqualification of auditor, CARO 2020 reporting requirements.", levels: { min: 50, max: 95 }, topicsCount: 10, estimatedHours: 18 }
                ]
              },
              {
                id: "ca-int-p6",
                paperNumber: 6,
                title: "Financial Management & Strategic Management",
                marks: 100,
                description: "Capital Budgeting, Cost of Capital, Capital Structure, Working Capital, Strategic Management.",
                chapters: [
                  { id: "fm-ch1", number: 1, title: "Cost of Capital (WACC)", hindiTitle: "पूंजी की लागत (WACC)", description: "Cost of equity (CAPM), cost of debt, cost of preference shares, weighted average cost.", levels: { min: 40, max: 80 }, topicsCount: 6, estimatedHours: 12 },
                  { id: "fm-ch2", number: 2, title: "Capital Budgeting Decisions", hindiTitle: "पूंजी बजटिंग निर्णय", description: "NPV, IRR, Payback Period, Profitability Index, risk analysis in capital budgeting.", levels: { min: 45, max: 90 }, topicsCount: 8, estimatedHours: 16 },
                  { id: "fm-ch3", number: 3, title: "Working Capital Management", hindiTitle: "कार्यशील पूंजी प्रबंधन", description: "Operating cycle calculation, cash budget, receivables management.", levels: { min: 40, max: 80 }, topicsCount: 7, estimatedHours: 14 }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "ca-final",
        title: "CA Final Course",
        shortTitle: "CA Final",
        institution: "ICAI",
        description: "The pinnacle of Chartered Accountancy testing advanced reporting, corporate laws, international tax, strategic FM and advanced auditing.",
        eligibility: "Completed CA Intermediate and required practical articleship training",
        scheme: "New Scheme 2023+ (6 Papers)",
        groups: [
          {
            id: "ca-fn-g1",
            title: "Group 1",
            description: "Financial Reporting (Ind AS), Advanced Financial Management, Advanced Auditing, Assurance & Professional Ethics",
            papers: [
              {
                id: "ca-fn-p1",
                paperNumber: 1,
                title: "Financial Reporting (Ind AS)",
                marks: 100,
                description: "Full Indian Accounting Standards (Ind AS), Business Combinations (Ind AS 103), Financial Instruments (Ind AS 109).",
                chapters: [
                  { id: "fr-ch1", number: 1, title: "Ind AS 115: Revenue from Contracts with Customers", hindiTitle: "Ind AS 115: ग्राहकों से अनुबंध से राजस्व", description: "Five-step model of revenue recognition with practical industry cases.", levels: { min: 60, max: 100 }, topicsCount: 8, estimatedHours: 18 },
                  { id: "fr-ch2", number: 2, title: "Ind AS 103: Business Combinations & Corporate Restructuring", hindiTitle: "Ind AS 103: व्यावसायिक संयोजन", description: "Acquisition method, goodwill/capital reserve, reverse acquisition.", levels: { min: 70, max: 100 }, topicsCount: 9, estimatedHours: 22 },
                  { id: "fr-ch3", number: 3, title: "Ind AS 109: Financial Instruments", hindiTitle: "Ind AS 109: वित्तीय साधन", description: "Classification, amortised cost, FVTOCI, FVTPL, expected credit loss (ECL) model.", levels: { min: 75, max: 100 }, topicsCount: 11, estimatedHours: 24 }
                ]
              },
              {
                id: "ca-fn-p2",
                paperNumber: 2,
                title: "Advanced Financial Management (AFM)",
                marks: 100,
                description: "Advanced Portfolio Management, Derivatives Analysis, Forex Risk Management, Mergers & Acquisitions.",
                chapters: [
                  { id: "afm-ch1", number: 1, title: "Forex Risk Management & Currency Derivatives", hindiTitle: "विदेशी मुद्रा जोखिम प्रबंधन", description: "Forward contracts, money market hedge, currency options, covered interest arbitrage.", levels: { min: 65, max: 100 }, topicsCount: 9, estimatedHours: 20 },
                  { id: "afm-ch2", number: 2, title: "Portfolio Management & Mutual Funds", hindiTitle: "पोर्टफोलियो प्रबंधन एवं म्यूचुअल फंड्स", description: "Markowitz Model, Sharpe, Treynor, Jensen Alpha ratios, Capital Asset Pricing Model.", levels: { min: 65, max: 100 }, topicsCount: 10, estimatedHours: 22 },
                  { id: "afm-ch3", number: 3, title: "Corporate Valuation & M&A Analysis", hindiTitle: "कॉर्पोरेट मूल्यांकन एवं विलय-अधिग्रहण", description: "Discounted Cash Flow (DCF), Free Cash Flow to Firm (FCFF), economic value added (EVA).", levels: { min: 70, max: 100 }, topicsCount: 8, estimatedHours: 18 }
                ]
              },
              {
                id: "ca-fn-p3",
                paperNumber: 3,
                title: "Advanced Auditing, Assurance and Professional Ethics",
                marks: 100,
                description: "Standards on Auditing (SA Series 200-800), Professional Ethics (CA Act 1949), Forensic Accounting, Digital Audit.",
                chapters: [
                  { id: "aa-ch1", number: 1, title: "Professional Ethics & Code of Conduct (CA Act, 1949)", hindiTitle: "व्यावसायिक नैतिकता एवं आचार संहिता", description: "First and Second Schedules, disciplinary mechanisms, council guidelines.", levels: { min: 60, max: 100 }, topicsCount: 10, estimatedHours: 20 },
                  { id: "aa-ch2", number: 2, title: "Forensic Accounting & Fraud Investigation", hindiTitle: "फोरेंसिक लेखांकन एवं धोखाधड़ी जांच", description: "Red flags, digital forensics, Benford's law, asset tracing procedures.", levels: { min: 65, max: 100 }, topicsCount: 7, estimatedHours: 16 }
                ]
              }
            ]
          },
          {
            id: "ca-fn-g2",
            title: "Group 2",
            description: "Direct Tax Laws & International Taxation, Indirect Tax Laws, Integrated Business Solutions (Case Studies)",
            papers: [
              {
                id: "ca-fn-p4",
                paperNumber: 4,
                title: "Direct Tax Laws & International Taxation",
                marks: 100,
                description: "Corporate Taxation, Transfer Pricing, Double Taxation Avoidance Agreements (DTAA), Equalisation Levy, GAAR.",
                chapters: [
                  { id: "dt-ch1", number: 1, title: "Transfer Pricing & Cross-Border Transactions", hindiTitle: "ट्रांसफर प्राइसिंग एवं अंतरराष्ट्रीय कराधान", description: "Arm's Length Price (ALP) methods, safe harbour rules, APA, Master File and CbCR.", levels: { min: 70, max: 100 }, topicsCount: 10, estimatedHours: 22 },
                  { id: "dt-ch2", number: 2, title: "Non-Resident Taxation & DTAA (Sec 90/91)", hindiTitle: "अनिवासी कराधान एवं डीटीएए", description: "Permanent Establishment (PE), business connection, tax treaties, BEPS Action Plans.", levels: { min: 75, max: 100 }, topicsCount: 9, estimatedHours: 20 }
                ]
              },
              {
                id: "ca-fn-p5",
                paperNumber: 5,
                title: "Indirect Tax Laws (Customs & GST)",
                marks: 100,
                description: "Advanced GST, Customs Act 1962, Foreign Trade Policy, Assessments, Appeals, Penalties.",
                chapters: [
                  { id: "idt-ch1", number: 1, title: "Customs Valuation & Import/Export Procedures", hindiTitle: "सीमा शुल्क मूल्यांकन एवं आयात-निर्यात प्रक्रिया", description: "Transaction value rules, baggage, duty drawback, warehousing.", levels: { min: 65, max: 95 }, topicsCount: 8, estimatedHours: 18 }
                ]
              },
              {
                id: "ca-fn-p6",
                paperNumber: 6,
                title: "Integrated Business Solutions (Multi-Disciplinary Case Studies)",
                marks: 100,
                description: "Open-book practical exam integrating Tax, Law, Auditing, Ind AS, and Strategic Financial Management.",
                chapters: [
                  { id: "ibs-ch1", number: 1, title: "Integrated Strategic & Financial Decision Making", hindiTitle: "एकीकृत रणनीतिक एवं वित्तीय निर्णय निर्माण", description: "Comprehensive corporate boardroom simulation and case study analysis.", levels: { min: 80, max: 100 }, topicsCount: 12, estimatedHours: 30 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "icmai",
    name: "Institute of Cost Accountants of India",
    shortName: "ICMAI",
    badgeColor: "bg-emerald-600 text-white",
    description: "Statutory body established under an Act of Parliament to regulate the profession of Cost and Management Accountancy in India.",
    officialUrl: "https://icmai.in",
    levels: [
      {
        id: "cma-foundation",
        title: "CMA Foundation Course",
        shortTitle: "CMA Foundation",
        institution: "ICMAI",
        description: "Entry-level qualification covering commercial laws, financial accounting, mathematics, and business economics.",
        eligibility: "Passed Class 12 or equivalent from recognized board",
        scheme: "ICMAI Syllabus 2022 (4 Papers)",
        papers: [
          {
            id: "cma-f-p1",
            paperNumber: 1,
            title: "Fundamentals of Business Laws and Business Communication",
            marks: 100,
            description: "Indian Contract Act, Sale of Goods Act, Negotiable Instruments Act, and Business Communication essentials.",
            chapters: [
              { id: "cma-f-bl-1", number: 1, title: "Commercial Laws: Contract Act & Sale of Goods Act", hindiTitle: "व्यापारिक कानून: अनुबंध अधिनियम एवं माल विक्रय अधिनियम", description: "Offer, acceptance, consideration, breach of contract, conditions and warranties.", levels: { min: 0, max: 25 }, topicsCount: 7, estimatedHours: 12 },
              { id: "cma-f-bl-2", number: 2, title: "Business Communication & Professional Ethics", hindiTitle: "व्यावसायिक संचार एवं व्यावसायिक नैतिकता", description: "Channels of communication, formal correspondence, business ethics fundamentals.", levels: { min: 0, max: 20 }, topicsCount: 5, estimatedHours: 8 }
            ]
          },
          {
            id: "cma-f-p2",
            paperNumber: 2,
            title: "Fundamentals of Financial and Cost Accounting",
            marks: 100,
            description: "Accounting principles, ledger posting, bank reconciliation, depreciation, cost concepts and classification.",
            chapters: [
              { id: "cma-f-acc-1", number: 1, title: "Financial Accounting: Cycle & Final Accounts", hindiTitle: "वित्तीय लेखांकन: चक्र एवं अंतिम खाते", description: "Double-entry framework, trial balance, adjustments, Trading & Profit and Loss account.", levels: { min: 5, max: 35 }, topicsCount: 8, estimatedHours: 16 },
              { id: "cma-f-cost-1", number: 2, title: "Fundamentals of Cost Accounting & Cost Sheet", hindiTitle: "लागत लेखांकन के मूल सिद्धांत एवं लागत पत्रक (Cost Sheet)", description: "Prime cost, factory cost, cost of production, preparation of cost sheet.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 14 }
            ]
          },
          {
            id: "cma-f-p3",
            paperNumber: 3,
            title: "Fundamentals of Business Mathematics and Statistics",
            marks: 100,
            description: "Arithmetic, algebra, calculus, measures of central tendency, dispersion, correlation and probability.",
            chapters: [
              { id: "cma-f-math-1", number: 1, title: "Business Mathematics: Ratios, Simple & Compound Interest", hindiTitle: "व्यावसायिक गणित: अनुपात, साधारण एवं चक्रवृद्धि ब्याज", description: "Time value of money, annuities, arithmetic and geometric progressions.", levels: { min: 5, max: 30 }, topicsCount: 6, estimatedHours: 12 },
              { id: "cma-f-stat-1", number: 2, title: "Business Statistics: Central Tendency & Dispersion", hindiTitle: "व्यावसायिक सांख्यिकी: केंद्रीय प्रवृत्ति एवं अपकिरण के माप", description: "Mean, median, mode, standard deviation, variance, coefficient of variation.", levels: { min: 5, max: 35 }, topicsCount: 7, estimatedHours: 14 }
            ]
          },
          {
            id: "cma-f-p4",
            paperNumber: 4,
            title: "Fundamentals of Business Economics and Management",
            marks: 100,
            description: "Demand and supply analysis, market structures, money and banking, management principles and leadership.",
            chapters: [
              { id: "cma-f-eco-1", number: 1, title: "Basic Economic Concepts & Market Forms", hindiTitle: "मूलभूत आर्थिक अवधारणाएं एवं बाजार के रूप", description: "Law of Demand, elasticity, perfect competition, monopoly, oligopoly pricing.", levels: { min: 0, max: 25 }, topicsCount: 6, estimatedHours: 10 },
              { id: "cma-f-mgmt-1", number: 2, title: "Management Processes: Planning to Controlling", hindiTitle: "प्रबंधन प्रक्रियाएं: नियोजन से नियंत्रण तक", description: "Functions of management, delegation, decentralization, leadership styles.", levels: { min: 0, max: 25 }, topicsCount: 6, estimatedHours: 10 }
            ]
          }
        ]
      },
      {
        id: "cma-intermediate",
        title: "CMA Intermediate Course",
        shortTitle: "CMA Intermediate",
        institution: "ICMAI",
        description: "Core professional qualification consisting of 8 papers covering Costing, Taxation, Corporate Law, and Financial Management.",
        eligibility: "Passed CMA Foundation or Graduation in any discipline",
        scheme: "ICMAI Syllabus 2022 (8 Papers)",
        groups: [
          {
            id: "cma-int-g1",
            title: "Group 1",
            description: "Business Laws & Ethics, Financial Accounting, Direct & Indirect Taxation, Cost Accounting",
            papers: [
              {
                id: "cma-int-p5",
                paperNumber: 5,
                title: "Business Laws and Ethics",
                marks: 100,
                description: "Commercial Laws, Industrial and Labour Laws, Corporate Law provisions, Business Ethics.",
                chapters: [
                  { id: "cma-bl-1", number: 1, title: "Indian Contracts, Sale of Goods & Factories Act", hindiTitle: "भारतीय अनुबंध, माल विक्रय एवं कारखाना अधिनियम", description: "Special contracts, worker safety, health and welfare statutory compliances.", levels: { min: 35, max: 70 }, topicsCount: 8, estimatedHours: 16 },
                  { id: "cma-bl-2", number: 2, title: "Corporate Law: Incorporation & Management", hindiTitle: "कंपनी अधिनियम: निगमन एवं प्रबंधन", description: "Director duties, board meetings, corporate governance, CSR compliance under Companies Act 2013.", levels: { min: 40, max: 75 }, topicsCount: 9, estimatedHours: 18 }
                ]
              },
              {
                id: "cma-int-p6",
                paperNumber: 6,
                title: "Financial Accounting",
                marks: 100,
                description: "Accounting standards, partnership dissolution, branch and departmental accounts, hire purchase.",
                chapters: [
                  { id: "cma-fa-1", number: 1, title: "Accounting Standards (AS 1, 2, 9, 10, 16)", hindiTitle: "लेखांकन मानक (AS ढांचा)", description: "Mandatory AS issued by ICAI/ICMAI for financial statement preparation.", levels: { min: 35, max: 75 }, topicsCount: 7, estimatedHours: 16 },
                  { id: "cma-fa-2", number: 2, title: "Partnership Dissolution & Piecemeal Distribution", hindiTitle: "साझेदारी विघटन एवं क्रमिक वितरण", description: "Garner vs Murray rule, insolvency of partners, maximum loss method.", levels: { min: 40, max: 80 }, topicsCount: 8, estimatedHours: 18 }
                ]
              },
              {
                id: "cma-int-p7",
                paperNumber: 7,
                title: "Direct and Indirect Taxation",
                marks: 100,
                description: "Income Tax Act 1961 (Direct Tax 50 Marks) and Goods and Services Tax (Indirect Tax 50 Marks).",
                chapters: [
                  { id: "cma-tax-1", number: 1, title: "Income Tax: 5 Heads of Income & Total Tax Liability", hindiTitle: "आयकर: आय के 5 शीर्षक एवं कुल कर दायित्व", description: "Salaries, House Property, PGBP, Capital Gains, Other Sources, Section 115BAC.", levels: { min: 45, max: 85 }, topicsCount: 12, estimatedHours: 24 },
                  { id: "cma-tax-2", number: 2, title: "GST: Levy, Time of Supply, Value & Input Tax Credit", hindiTitle: "जीएसटी: लेवी, आपूर्ति का समय, मूल्य एवं इनपुट टैक्स क्रेडिट", description: "CGST/SGST/IGST, ITC eligibility, blocked credits under Section 17(5).", levels: { min: 45, max: 85 }, topicsCount: 10, estimatedHours: 20 }
                ]
              },
              {
                id: "cma-int-p8",
                paperNumber: 8,
                title: "Cost Accounting",
                marks: 100,
                description: "Cost Accounting Standards (CAS 1 to 24), Material, Labour, Overheads, Marginal Costing, Standard Costing.",
                chapters: [
                  { id: "cma-cost-1", number: 1, title: "Cost Accounting Standards (CAS 1 to 24)", hindiTitle: "लागत लेखांकन मानक (CAS 1-24)", description: "Mandatory CAS issued by ICMAI for Indian cost records and statutory cost audits.", levels: { min: 40, max: 85 }, topicsCount: 10, estimatedHours: 20 },
                  { id: "cma-cost-2", number: 2, title: "Marginal Costing, CVP Analysis and Decision Making", hindiTitle: "सीमांत लागत, CVP विश्लेषण एवं निर्णय निर्माण", description: "P/V ratio, Break-even point, Margin of safety, make or buy decisions.", levels: { min: 45, max: 90 }, topicsCount: 8, estimatedHours: 18 },
                  { id: "cma-cost-3", number: 3, title: "Standard Costing and Variance Analysis", hindiTitle: "प्रमाप लागत निर्धारण एवं विचरण विश्लेषण", description: "Material, labour, overhead, sales variances and reconciliation statements.", levels: { min: 50, max: 90 }, topicsCount: 9, estimatedHours: 18 }
                ]
              }
            ]
          },
          {
            id: "cma-int-g2",
            title: "Group 2",
            description: "Operations Management & SM, Corporate Accounting & Auditing, Financial Management & BDA, Management Accounting",
            papers: [
              {
                id: "cma-int-p9",
                paperNumber: 9,
                title: "Operations Management and Strategic Management",
                marks: 100,
                description: "Production planning, facility layout, inventory control, strategic analysis and implementation.",
                chapters: [
                  { id: "cma-om-1", number: 1, title: "Operations Planning, Scheduling & Maintenance", hindiTitle: "परिचालन योजना, शेड्यूलिंग एवं रखरखाव", description: "Plant location, layout, aggregate planning, CPM/PERT network analysis.", levels: { min: 40, max: 80 }, topicsCount: 8, estimatedHours: 16 },
                  { id: "cma-sm-1", number: 2, title: "Strategic Analysis: SWOT, Porter's 5 Forces & Vision", hindiTitle: "रणनीतिक विश्लेषण: स्वाट, पोर्टर मॉडल एवं विज़न", description: "Mission, vision, environmental appraisal, generic competitive strategies.", levels: { min: 40, max: 80 }, topicsCount: 7, estimatedHours: 14 }
                ]
              },
              {
                id: "cma-int-p10",
                paperNumber: 10,
                title: "Corporate Accounting and Auditing",
                marks: 100,
                description: "Schedule III financial statements, company audit, auditor powers, duties, CARO 2020.",
                chapters: [
                  { id: "cma-ca-1", number: 1, title: "Company Financial Statements under Schedule III", hindiTitle: "अनुसूची III के अंतर्गत कंपनी वित्तीय विवरण", description: "Balance sheet, Statement of Profit and Loss, cash flow statements.", levels: { min: 45, max: 85 }, topicsCount: 9, estimatedHours: 18 },
                  { id: "cma-aud-1", number: 2, title: "Company Audit, Auditor Powers & CARO 2020", hindiTitle: "कंपनी अंकेक्षण, अधिकार, कर्तव्य एवं कारो 2020", description: "Statutory auditor appointment, disqualifications, reporting under Section 143.", levels: { min: 45, max: 85 }, topicsCount: 8, estimatedHours: 16 }
                ]
              },
              {
                id: "cma-int-p11",
                paperNumber: 11,
                title: "Financial Management and Business Data Analytics",
                marks: 100,
                description: "Capital Budgeting, Cost of Capital, Working Capital, Data Analytics, Python/R applications in finance.",
                chapters: [
                  { id: "cma-fm-1", number: 1, title: "Capital Budgeting & Financing Decisions (WACC)", hindiTitle: "पूंजी बजटिंग एवं वित्तपोषण निर्णय (WACC)", description: "NPV, IRR, cost of equity, cost of debt, weighted average cost of capital.", levels: { min: 45, max: 90 }, topicsCount: 9, estimatedHours: 18 },
                  { id: "cma-bda-1", number: 2, title: "Business Data Analytics & Financial Modelling", hindiTitle: "व्यावसायिक डेटा एनालिटिक्स एवं वित्तीय मॉडलिंग", description: "Big data in accounting, predictive analytics, data visualization in finance.", levels: { min: 45, max: 85 }, topicsCount: 6, estimatedHours: 12 }
                ]
              },
              {
                id: "cma-int-p12",
                paperNumber: 12,
                title: "Management Accounting",
                marks: 100,
                description: "Activity-Based Costing (ABC), Target Costing, Life Cycle Costing, Responsibility Accounting, Transfer Pricing.",
                chapters: [
                  { id: "cma-ma-1", number: 1, title: "Activity-Based Costing (ABC) & Cost Drivers", hindiTitle: "गतिविधि आधारित लागत निर्धारण (ABC)", description: "Cost pools, cost drivers, traditional vs ABC system comparison.", levels: { min: 50, max: 90 }, topicsCount: 7, estimatedHours: 14 },
                  { id: "cma-ma-2", number: 2, title: "Transfer Pricing & Divisional Performance", hindiTitle: "हस्तांतरण मूल्य निर्धारण एवं प्रभागीय प्रदर्शन", description: "Cost-based, market-based and negotiated transfer pricing, dual rate method.", levels: { min: 50, max: 90 }, topicsCount: 6, estimatedHours: 14 }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "cma-final",
        title: "CMA Final Course",
        shortTitle: "CMA Final",
        institution: "ICMAI",
        description: "The peak qualification stage focusing on Strategic Cost Management, Corporate Laws, Tax Planning, and Cost Audit.",
        eligibility: "Passed CMA Intermediate Examination and practical training",
        scheme: "ICMAI Syllabus 2022 (8 Papers)",
        groups: [
          {
            id: "cma-fn-g3",
            title: "Group 3",
            description: "Corporate and Economic Laws, Strategic Financial Management, Direct Tax Laws, Strategic Cost Management",
            papers: [
              {
                id: "cma-fn-p13",
                paperNumber: 13,
                title: "Corporate and Economic Laws",
                marks: 100,
                description: "Companies Act 2013 (Board processes, Mergers, Winding up), IBC 2016, SEBI laws, FEMA 1999.",
                chapters: [
                  { id: "cma-cl-1", number: 1, title: "Corporate Governance, Board Processes & Mergers", hindiTitle: "कॉर्पोरेट गवर्नेंस, बोर्ड प्रक्रियाएं एवं विलय", description: "Compromise, arrangements, amalgamations, NCLT proceedings.", levels: { min: 65, max: 95 }, topicsCount: 8, estimatedHours: 18 },
                  { id: "cma-el-1", number: 2, title: "Insolvency and Bankruptcy Code (IBC) 2016 & FEMA", hindiTitle: "दिवाला एवं शोधन अक्षमता संहिता (IBC) व फेमा", description: "Corporate insolvency resolution process (CIRP), liquidation, current and capital account transactions.", levels: { min: 70, max: 100 }, topicsCount: 9, estimatedHours: 20 }
                ]
              },
              {
                id: "cma-fn-p14",
                paperNumber: 14,
                title: "Strategic Financial Management (SFM)",
                marks: 100,
                description: "Investment decisions, portfolio management, financial derivatives (Futures & Options), Forex risk management.",
                chapters: [
                  { id: "cma-sfm-1", number: 1, title: "Portfolio Management & Security Analysis (CAPM & APT)", hindiTitle: "पोर्टफोलियो प्रबंधन एवं प्रतिभूति विश्लेषण", description: "Markowitz model, Sharpe & Treynor ratios, Capital Asset Pricing Model.", levels: { min: 70, max: 100 }, topicsCount: 9, estimatedHours: 22 },
                  { id: "cma-sfm-2", number: 2, title: "Forex Risk Management & Financial Derivatives", hindiTitle: "विदेशी मुद्रा जोखिम प्रबंधन एवं वित्तीय डेरिवेटिव्स", description: "Currency swaps, forward contracts, interest rate hedging, Black-Scholes model.", levels: { min: 75, max: 100 }, topicsCount: 9, estimatedHours: 24 }
                ]
              },
              {
                id: "cma-fn-p15",
                paperNumber: 15,
                title: "Direct Tax Laws and International Taxation",
                marks: 100,
                description: "Comprehensive direct taxes, corporate tax planning, transfer pricing, Double Tax Avoidance Agreements (DTAA).",
                chapters: [
                  { id: "cma-dt-1", number: 1, title: "Corporate Tax Assessment, MAT (Sec 115JB) & AMT", hindiTitle: "कॉर्पोरेट कर निर्धारण एवं न्यूनतम वैकल्पिक कर (MAT)", description: "Book profits computation, tax planning, assessments and reassessments.", levels: { min: 70, max: 100 }, topicsCount: 10, estimatedHours: 22 },
                  { id: "cma-dt-2", number: 2, title: "International Taxation, Transfer Pricing & DTAA", hindiTitle: "अंतर्राष्ट्रीय कराधान, ट्रांसफर प्राइसिंग एवं डीटीएए", description: "Arm's length price methods, APA, Equalisation Levy, BEPS action plans.", levels: { min: 75, max: 100 }, topicsCount: 9, estimatedHours: 20 }
                ]
              },
              {
                id: "cma-fn-p16",
                paperNumber: 16,
                title: "Strategic Cost Management (SCM)",
                marks: 100,
                description: "Value Chain Analysis, Kaizen Costing, Balanced Scorecard, Target Costing, Total Quality Management (TQM).",
                chapters: [
                  { id: "scm-ch1", number: 1, title: "Strategic Cost Management & Value Chain Analysis", hindiTitle: "रणनीतिक लागत प्रबंधन एवं मूल्य श्रृंखला विश्लेषण", description: "Porter's Value Chain, Core competencies, Cost leadership vs Differentiation.", levels: { min: 70, max: 100 }, topicsCount: 9, estimatedHours: 20 },
                  { id: "scm-ch2", number: 2, title: "Modern Cost Management Techniques: Kaizen, TQM, JIT", hindiTitle: "आधुनिक लागत प्रबंधन: काइज़न, टीक्यूएम एवं जेआईटी", description: "Six Sigma, Theory of Constraints (TOC), Life cycle costing, Target costing.", levels: { min: 70, max: 100 }, topicsCount: 8, estimatedHours: 18 }
                ]
              }
            ]
          },
          {
            id: "cma-fn-g4",
            title: "Group 4",
            description: "Cost & Management Audit, Corporate Financial Reporting, Indirect Tax Laws, Strategic Performance Management & Valuation",
            papers: [
              {
                id: "cma-fn-p17",
                paperNumber: 17,
                title: "Cost and Management Audit (Section 148)",
                marks: 100,
                description: "Cost audit rules, CRA-1, CRA-2, CRA-3, CRA-4, Cost Audit Report, internal audit and operational audit.",
                chapters: [
                  { id: "cma-audit-1", number: 1, title: "Statutory Cost Audit under Section 148 & Companies Rules", hindiTitle: "धारा 148 के अंतर्गत सांविधिक लागत अंकेक्षण", description: "Applicability thresholds, regulated vs non-regulated sectors, duties of cost auditor, form filing.", levels: { min: 65, max: 100 }, topicsCount: 8, estimatedHours: 18 },
                  { id: "cma-audit-2", number: 2, title: "Management Audit & Internal Control Systems", hindiTitle: "प्रबंधकीय अंकेक्षण एवं आंतरिक नियंत्रण प्रणालियां", description: "Operational audit, efficiency audit, social audit, internal audit standards.", levels: { min: 65, max: 95 }, topicsCount: 7, estimatedHours: 16 }
                ]
              },
              {
                id: "cma-fn-p18",
                paperNumber: 18,
                title: "Corporate Financial Reporting (CFR)",
                marks: 100,
                description: "Ind AS financial statements, group consolidation, valuation of goodwill, valuation of shares, accounting for financial instruments.",
                chapters: [
                  { id: "cma-cfr-1", number: 1, title: "Ind AS Group Accounting & Business Combinations", hindiTitle: "इंड एएस समूह लेखांकन एवं व्यावसायिक संयोजन", description: "Ind AS 103 Business Combinations, Ind AS 110 Consolidated Financial Statements.", levels: { min: 75, max: 100 }, topicsCount: 10, estimatedHours: 24 },
                  { id: "cma-cfr-2", number: 2, title: "Financial Instruments (Ind AS 32, 107, 109) & Valuation", hindiTitle: "वित्तीय उपकरण एवं शेयरों का मूल्यांकन", description: "Recognition, measurement, hedge accounting, share valuation techniques.", levels: { min: 75, max: 100 }, topicsCount: 9, estimatedHours: 20 }
                ]
              },
              {
                id: "cma-fn-p19",
                paperNumber: 19,
                title: "Indirect Tax Laws and Practice (GST & Customs)",
                marks: 100,
                description: "Advanced GST procedures, appeals, assessment, audit, Customs Act 1962, Foreign Trade Policy.",
                chapters: [
                  { id: "cma-gst-1", number: 1, title: "Advanced GST Assessment, Audit & Anti-Profiteering", hindiTitle: "उन्नत जीएसटी कर निर्धारण, अंकेक्षण एवं अपीलीय प्रक्रियाएं", description: "Departmental audits, inspection, search, seizure, arrest, appeals to Tribunal and High Court.", levels: { min: 70, max: 100 }, topicsCount: 9, estimatedHours: 20 },
                  { id: "cma-cust-1", number: 2, title: "Customs Law, Valuation & Foreign Trade Policy (FTP)", hindiTitle: "सीमा शुल्क कानून, मूल्यांकन एवं विदेश व्यापार नीति", description: "Types of duties, valuation of imported goods, baggage rules, duty drawback.", levels: { min: 70, max: 100 }, topicsCount: 8, estimatedHours: 18 }
                ]
              },
              {
                id: "cma-fn-p20",
                paperNumber: 20,
                title: "Strategic Performance Management and Business Valuation",
                marks: 100,
                description: "Performance evaluation metrics, EVA, MVA, DCF business valuation, mergers and acquisitions valuation.",
                chapters: [
                  { id: "cma-spm-1", number: 1, title: "Performance Evaluation: EVA, MVA & BSC", hindiTitle: "प्रदर्शन मूल्यांकन: आर्थिक मूल्य वर्धित (EVA) एवं बैलेंस्ड स्कोरकार्ड", description: "Economic Value Added, Market Value Added, productivity analysis, bench-marking.", levels: { min: 75, max: 100 }, topicsCount: 8, estimatedHours: 18 },
                  { id: "cma-val-1", number: 2, title: "Business Valuation Techniques (DCF & Relative Multiples)", hindiTitle: "व्यावसायिक मूल्यांकन तकनीकें (DCF एवं गुणक विधि)", description: "Discounted Cash Flow method, PE multiples, EV/EBITDA valuation in M&A.", levels: { min: 75, max: 100 }, topicsCount: 9, estimatedHours: 22 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "icsi",
    name: "Institute of Company Secretaries of India",
    shortName: "ICSI",
    badgeColor: "bg-purple-600 text-white",
    description: "Premier statutory professional body in India dedicated to the development and regulation of Company Secretaries.",
    officialUrl: "https://www.icsi.edu",
    levels: [
      {
        id: "cs-cseet",
        title: "Company Secretary Executive Entrance Test (CSEET)",
        shortTitle: "CS CSEET",
        institution: "ICSI",
        description: "National entrance test for admission to the CS Executive Programme.",
        eligibility: "Passed or appearing in Class 12",
        scheme: "ICSI Latest Scheme (4 Papers)",
        papers: [
          {
            id: "cs-e-p1",
            paperNumber: 1,
            title: "Business Communication",
            marks: 50,
            description: "Grammar, correspondence, business terms, listening and writing skills.",
            chapters: [
              { id: "cs-bc-1", number: 1, title: "Essentials of Good Business Communication", hindiTitle: "व्यावसायिक संचार के आवश्यक तत्व", description: "Types of communication, barriers, 7 Cs of communication.", levels: { min: 0, max: 20 }, topicsCount: 5, estimatedHours: 8 }
            ]
          },
          {
            id: "cs-e-p2",
            paperNumber: 2,
            title: "Legal Aptitude and Logical Reasoning",
            marks: 50,
            description: "Indian Constitution, Elements of Company Law, Law of Torts, Logical Reasoning.",
            chapters: [
              { id: "cs-la-1", number: 1, title: "Indian Constitution & Fundamental Rights", hindiTitle: "भारतीय संविधान एवं मौलिक अधिकार", description: "Preamble, Fundamental Rights, Directive Principles, Writ Jurisdiction.", levels: { min: 0, max: 30 }, topicsCount: 6, estimatedHours: 12 },
              { id: "cs-la-2", number: 2, title: "Elements of Company Law", hindiTitle: "कंपनी कानून के मूल तत्व", description: "Meaning, characteristics, lifting corporate veil, role of Company Secretary.", levels: { min: 5, max: 35 }, topicsCount: 7, estimatedHours: 14 }
            ]
          },
          {
            id: "cs-e-p3",
            paperNumber: 3,
            title: "Economic and Business Environment",
            marks: 50,
            description: "Indian Economy, Union Budget, Financial Markets, Government Initiatives (Startup India, Make in India).",
            chapters: [
              { id: "cs-eb-1", number: 1, title: "Indian Financial Ecosystem & Startup India", hindiTitle: "भारतीय वित्तीय प्रणाली एवं स्टार्टअप पहल", description: "Banking sector, NBFCs, SEBI, regulatory initiatives.", levels: { min: 0, max: 25 }, topicsCount: 5, estimatedHours: 8 }
            ]
          },
          {
            id: "cs-e-p4",
            paperNumber: 4,
            title: "Current Affairs and Quantitative Aptitude",
            marks: 50,
            description: "National & International current events, mathematics and reasoning fundamentals.",
            chapters: [
              { id: "cs-ca-1", number: 1, title: "Current Affairs & Quantitative Reasoning", hindiTitle: "समसामयिक मामले एवं मात्रात्मक तर्क", description: "Important recent appointments, regulatory developments, basic quantitative tests.", levels: { min: 0, max: 25 }, topicsCount: 6, estimatedHours: 8 }
            ]
          }
        ]
      },
      {
        id: "cs-executive",
        title: "CS Executive Programme",
        shortTitle: "CS Executive",
        institution: "ICSI",
        description: "Intermediate CS qualification with in-depth focus on Company Law, Securities Laws, Economic Laws, Tax Laws.",
        eligibility: "Passed CSEET or Direct Entry for Graduates",
        scheme: "ICSI New Syllabus 2022 (7 Papers in 2 Groups)",
        groups: [
          {
            id: "cs-ex-g1",
            title: "Group 1",
            description: "Jurisprudence & General Laws, Company Law & Practice, Setting Up of Business & Labour Laws, Corporate Accounting & FM",
            papers: [
              {
                id: "cs-ex-p1",
                paperNumber: 1,
                title: "Jurisprudence, Interpretation and General Laws (JIGL)",
                marks: 100,
                description: "Sources of law, Constitution of India, Interpretation of Statutes, CPC, CrPC, Indian Penal Code, RTI Act.",
                chapters: [
                  { id: "cs-jigl-1", number: 1, title: "Interpretation of Statutes & General Clauses Act", hindiTitle: "कानूनों की व्याख्या एवं सामान्य खंड अधिनियम", description: "Literal, mischief, golden rules of interpretation, internal and external aids to interpretation.", levels: { min: 35, max: 70 }, topicsCount: 7, estimatedHours: 14 },
                  { id: "cs-jigl-2", number: 2, title: "Constitution of India, Writs & Administrative Law", hindiTitle: "भारतीय संविधान, रिट क्षेत्राधिकार एवं प्रशासनिक कानून", description: "Fundamental Rights, Directive Principles, Articles 32 and 226, principles of natural justice.", levels: { min: 35, max: 75 }, topicsCount: 8, estimatedHours: 16 }
                ]
              },
              {
                id: "cs-ex-p2",
                paperNumber: 2,
                title: "Company Law and Practice",
                marks: 100,
                description: "Comprehensive Companies Act 2013, Board meetings, Secretarial Standards (SS-1 and SS-2), ROC filings.",
                chapters: [
                  { id: "cs-cl-1", number: 1, title: "Board Meetings, Committees & Secretarial Standards (SS-1)", hindiTitle: "बोर्ड बैठकें, समितियां एवं सेक्रेटेरियल स्टैंडर्ड्स", description: "Notice, agenda, quorum, minutes, Audit Committee, Stakeholders Relationship Committee.", levels: { min: 45, max: 85 }, topicsCount: 9, estimatedHours: 18 },
                  { id: "cs-cl-2", number: 2, title: "Shareholders Meetings, Voting & Secretarial Standards (SS-2)", hindiTitle: "शेयरधारकों की बैठकें, मतदान एवं एसएस-2", description: "AGM, EGM, postal ballot, e-voting, proxy, resolutions and minutes recording.", levels: { min: 45, max: 85 }, topicsCount: 8, estimatedHours: 16 }
                ]
              },
              {
                id: "cs-ex-p3",
                paperNumber: 3,
                title: "Setting Up of Business, Industrial and Labour Laws (SBILL)",
                marks: 100,
                description: "Entity selection (Pvt Ltd, LLP, Section 8), licenses, registrations, Labour codes (Wages, Social Security, OSH).",
                chapters: [
                  { id: "cs-sbill-1", number: 1, title: "Setting up Business Entities: Companies, LLPs & Startups", hindiTitle: "व्यावसायिक इकाइयों की स्थापना: कंपनी, एलएलपी एवं स्टार्टअप", description: "SPICe+ incorporation, MCA portal processes, PAN/TAN/GST registrations.", levels: { min: 40, max: 80 }, topicsCount: 8, estimatedHours: 16 },
                  { id: "cs-sbill-2", number: 2, title: "Labour Codes & Industrial Safety Regulations", hindiTitle: "श्रम संहिताएं एवं औद्योगिक सुरक्षा नियम", description: "Code on Wages 2019, Social Security Code, Industrial Relations Code provisions.", levels: { min: 40, max: 75 }, topicsCount: 7, estimatedHours: 14 }
                ]
              },
              {
                id: "cs-ex-p4",
                paperNumber: 4,
                title: "Corporate Accounting and Financial Management (CAFM)",
                marks: 100,
                description: "Corporate accounting, Ind AS basics, financial management, ratios, cash flow, working capital.",
                chapters: [
                  { id: "cs-cafm-1", number: 1, title: "Corporate Financial Statements & Schedule III Compliances", hindiTitle: "कॉर्पोरेट वित्तीय विवरण एवं अनुसूची III अनुपालन", description: "Presentation of balance sheet, P&L, corporate dividend distribution, buyback of shares.", levels: { min: 45, max: 85 }, topicsCount: 8, estimatedHours: 16 },
                  { id: "cs-cafm-2", number: 2, title: "Financial Analysis, Working Capital & Capital Structure", hindiTitle: "वित्तीय विश्लेषण, कार्यशील पूंजी एवं पूंजी संरचना", description: "Ratio analysis, operating cycle, leverage, EBIT-EPS analysis.", levels: { min: 45, max: 85 }, topicsCount: 8, estimatedHours: 16 }
                ]
              }
            ]
          },
          {
            id: "cs-ex-g2",
            title: "Group 2",
            description: "Capital Markets & Securities Laws, Economic, Commercial & IP Laws, Tax Laws & Practice",
            papers: [
              {
                id: "cs-ex-p5",
                paperNumber: 5,
                title: "Capital Markets and Securities Laws",
                marks: 100,
                description: "SEBI Act, SEBI (LODR) Regulations, SEBI (ICDR) Regulations, Insider Trading Regulations, Takeover Code.",
                chapters: [
                  { id: "cs-sec-1", number: 1, title: "SEBI (LODR) Regulations, 2015 & Corporate Governance", hindiTitle: "सेबी (LODR) नियम एवं कॉर्पोरेट गवर्नेंस", description: "Independent directors, quarterly compliances, disclosures, board diversity.", levels: { min: 50, max: 90 }, topicsCount: 8, estimatedHours: 16 },
                  { id: "cs-sec-2", number: 2, title: "SEBI (Prohibition of Insider Trading) Regulations, 2015", hindiTitle: "भेदिया कारोबार रोकथाम नियम (PIT)", description: "UPSI, trading window, code of conduct, Chinese Wall mechanisms.", levels: { min: 55, max: 95 }, topicsCount: 7, estimatedHours: 14 }
                ]
              },
              {
                id: "cs-ex-p6",
                paperNumber: 6,
                title: "Economic, Commercial and Intellectual Property Laws (ECIPL)",
                marks: 100,
                description: "FEMA 1999, Competition Act 2002, Consumer Protection Act 2019, Patents, Trademarks, Copyrights, RERA.",
                chapters: [
                  { id: "cs-ecipl-1", number: 1, title: "Foreign Exchange Management Act (FEMA 1999) & FDI", hindiTitle: "विदेशी मुद्रा प्रबंधन अधिनियम (फेमा 1999) व प्रत्यक्ष विदेशी निवेश", description: "Current and capital account transactions, FDI policy, ECB regulations, ODI.", levels: { min: 50, max: 90 }, topicsCount: 8, estimatedHours: 18 },
                  { id: "cs-ecipl-2", number: 2, title: "Intellectual Property Rights: Patents, Trademarks, Copyright", hindiTitle: "बौद्धिक संपदा अधिकार: पेटेंट, ट्रेडमार्क एवं कॉपीराइट", description: "Registration processes, infringement remedies, international conventions (TRIPS).", levels: { min: 45, max: 85 }, topicsCount: 7, estimatedHours: 14 }
                ]
              },
              {
                id: "cs-ex-p7",
                paperNumber: 7,
                title: "Tax Laws and Practice (TLP)",
                marks: 100,
                description: "Direct Taxes (Income Tax Act 1961) and Indirect Taxes (CGST, SGST, IGST, Customs Law).",
                chapters: [
                  { id: "cs-tlp-1", number: 1, title: "Income Tax for Corporates & Firms (Direct Taxes)", hindiTitle: "कंपनियों एवं फर्मों के लिए आयकर विधान", description: "Corporate tax rates, MAT under Section 115JB, TDS, TCS, advance tax.", levels: { min: 50, max: 90 }, topicsCount: 9, estimatedHours: 18 },
                  { id: "cs-tlp-2", number: 2, title: "GST Compliances & Customs Import/Export Procedures", hindiTitle: "जीएसटी अनुपालन एवं सीमा शुल्क आयात/निर्यात प्रक्रियाएं", description: "GST returns, e-invoicing, assessment, customs valuation and clearance.", levels: { min: 50, max: 90 }, topicsCount: 9, estimatedHours: 18 }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "cs-professional",
        title: "CS Professional Programme",
        shortTitle: "CS Professional",
        institution: "ICSI",
        description: "The highest professional CS tier covering ESG, Restructuring, Insolvency, Secretarial Audit and Board Advisory.",
        eligibility: "Passed CS Executive Programme",
        scheme: "ICSI New Syllabus 2022 (7 Papers in 2 Groups)",
        groups: [
          {
            id: "cs-prof-g1",
            title: "Group 1",
            description: "ESG Principles & Practice, Drafting, Pleadings & Appearances, Compliance Management & Secretarial Audit",
            papers: [
              {
                id: "cs-prof-p1",
                paperNumber: 1,
                title: "Environmental, Social and Governance (ESG) - Principles & Practice",
                marks: 100,
                description: "Sustainability reporting, BRSR framework, climate governance, CSR impact assessment, ethical investing.",
                chapters: [
                  { id: "cs-esg-1", number: 1, title: "ESG Frameworks & Business Responsibility Reporting (BRSR)", hindiTitle: "ईएसजी रूपरेखा एवं व्यापार उत्तरदायित्व रिपोर्टिंग (BRSR)", description: "SEBI mandate on BRSR for top 1000 listed entities, sustainability KPIs, carbon footprint.", levels: { min: 70, max: 100 }, topicsCount: 8, estimatedHours: 18 }
                ]
              },
              {
                id: "cs-prof-p2",
                paperNumber: 2,
                title: "Drafting, Pleadings and Appearances",
                marks: 100,
                description: "Drafting commercial contracts, deeds, petitions, appeals before NCLT, NCLAT, High Court, and quasi-judicial bodies.",
                chapters: [
                  { id: "cs-draft-1", number: 1, title: "Principles of Legal Drafting & Commercial Agreements", hindiTitle: "कानूनी प्रारूपण के सिद्धांत एवं वाणिज्यिक समझौते", description: "Shareholders agreements, JV agreements, non-disclosure agreements, arbitration clauses.", levels: { min: 70, max: 100 }, topicsCount: 9, estimatedHours: 20 },
                  { id: "cs-draft-2", number: 2, title: "Pleadings & Appearances before NCLT and NCLAT", hindiTitle: "एनसीएलटी एवं एनसीएलएटी के समक्ष अभिवचन व उपस्थिति", description: "Applications under Section 241/242 (Oppression and Mismanagement), appeals, affidavits.", levels: { min: 75, max: 100 }, topicsCount: 8, estimatedHours: 18 }
                ]
              },
              {
                id: "cs-prof-p3",
                paperNumber: 3,
                title: "Compliance Management, Audit and Due Diligence",
                marks: 100,
                description: "Secretarial Audit (Section 204), Form MR-3, non-compliances, penalties, M&A due diligence, peer review.",
                chapters: [
                  { id: "cs-audit-1", number: 1, title: "Secretarial Audit (Sec 204) & Form MR-3 Reporting", hindiTitle: "सेक्रेटेरियल ऑडिट एवं फॉर्म MR-3 रिपोर्टिंग", description: "Applicability, scope of audit, checklist of corporate laws, qualification reporting.", levels: { min: 70, max: 100 }, topicsCount: 10, estimatedHours: 20 },
                  { id: "cs-audit-2", number: 2, title: "Legal Due Diligence in Mergers & Acquisitions", hindiTitle: "विलय एवं अधिग्रहण में कानूनी ड्यू डिलिजेंस", description: "Data room review, statutory liabilities check, encumbrances verification, due diligence report.", levels: { min: 75, max: 100 }, topicsCount: 8, estimatedHours: 18 }
                ]
              }
            ]
          },
          {
            id: "cs-prof-g2",
            title: "Group 2",
            description: "Strategic Management & Corporate Finance, Corporate Restructuring & Insolvency, IBC Law, Banking & Insurance Law",
            papers: [
              {
                id: "cs-prof-p4",
                paperNumber: 4,
                title: "Strategic Management and Corporate Finance",
                marks: 100,
                description: "Strategic formulation, corporate valuation, capital structure, international finance, project finance.",
                chapters: [
                  { id: "cs-smcf-1", number: 1, title: "Corporate Financing & Cross-Border Capital Raising", hindiTitle: "कॉर्पोरेट वित्तपोषण एवं सीमा-पार पूंजी जुटाना", description: "ADRs, GDRs, FCCBs, green bonds, private equity, venture capital documentation.", levels: { min: 70, max: 100 }, topicsCount: 8, estimatedHours: 18 }
                ]
              },
              {
                id: "cs-prof-p5",
                paperNumber: 5,
                title: "Corporate Restructuring, Valuation and Insolvency",
                marks: 100,
                description: "Mergers, demergers, cross-border amalgamations, business valuation methodologies, cross-border insolvency.",
                chapters: [
                  { id: "cs-cr-1", number: 1, title: "Mergers, Demergers & Section 230-240 Approvals", hindiTitle: "विलय, डीमर्जर एवं धारा 230-240 के अंतर्गत स्वीकृतियां", description: "Scheme of arrangement, shareholder meetings, NCLT sanction process, stamp duty.", levels: { min: 75, max: 100 }, topicsCount: 9, estimatedHours: 22 }
                ]
              },
              {
                id: "cs-prof-p6",
                paperNumber: 6,
                title: "Insolvency and Bankruptcy Code, 2016 (IBC)",
                marks: 100,
                description: "Corporate Insolvency Resolution Process (CIRP), liquidation, pre-pack insolvency, NCLT jurisprudence.",
                chapters: [
                  { id: "cs-ibc-1", number: 1, title: "Corporate Insolvency Resolution Process (CIRP)", hindiTitle: "कॉर्पोरेट दिवाला समाधान प्रक्रिया (CIRP)", description: "Sec 7, 9, 10 initiation, moratorium (Sec 14), Committee of Creditors (CoC), resolution plans.", levels: { min: 75, max: 100 }, topicsCount: 11, estimatedHours: 24 }
                ]
              },
              {
                id: "cs-prof-p7",
                paperNumber: 7,
                title: "Banking & Insurance - Law and Practice (Elective)",
                marks: 100,
                description: "RBI regulations, SARFAESI Act, recovery of debts, Insurance Regulatory and Development Authority (IRDAI) rules.",
                chapters: [
                  { id: "cs-bank-1", number: 1, title: "SARFAESI Act 2002 & Asset Reconstruction Mechanics", hindiTitle: "सरफेसी अधिनियम 2002 एवं परिसंपत्ति पुनर्गठन प्रणाली", description: "Enforcement of security interest, notice under Sec 13(2), DRT and DRAT appeals.", levels: { min: 75, max: 100 }, topicsCount: 8, estimatedHours: 18 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "prsu",
    name: "Pt. Ravishankar Shukla University (PRSU), Raipur",
    shortName: "PRSU B.Com",
    badgeColor: "bg-amber-600 text-white",
    description: "Premier state university in Raipur, Chhattisgarh offering undergraduate commerce degrees (B.Com Semester 1 to Semester 6) aligned with UGC NEP-2020.",
    officialUrl: "https://www.prsu.ac.in",
    levels: [
          {
                "id": "prsu-bcom-sem1",
                "title": "B.Com Semester 1 (PRSU / NEP)",
                "shortTitle": "B.Com Sem 1",
                "institution": "PRSU",
                "description": "Certificate Level First Semester: 6 Subjects, 20 Credits (DSC-1, DSC-2, DSC-3, GE-1, AEC-1, VAC-1).",
                "eligibility": "Class 12 in Commerce or equivalent",
                "scheme": "NEP-2020 / PRSU Scheme (6 Subjects - 20 Credits)",
                "papers": [
                      {
                            "id": "prsu-s1-dsc1",
                            "paperNumber": "DSC-1",
                            "title": "Fundamental of Accounting (वित्तीय लेखांकन के मूल तत्व)",
                            "marks": 100,
                            "description": "Accounting principles, standards (AS-1, AS-10), double-entry cycle, depreciation, royalty and hire purchase accounts.",
                            "chapters": [
                                  {
                                        "id": "prsu-s1-dsc1-ch1",
                                        "number": 1,
                                        "title": "Theoretical Framework, Meaning & Accounting Standards (AS-1, AS-10)",
                                        "hindiTitle": "लेखांकन का सैद्धांतिक ढांचा एवं मानक (AS-1, AS-10)",
                                        "description": "Concepts, conventions, GAAP, AS-1 disclosure, AS-10 property plant equipment.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s1-dsc1-ch2",
                                        "number": 2,
                                        "title": "Accounting Process: Journal, Ledger, Trial Balance & BRS",
                                        "hindiTitle": "लेखांकन प्रक्रिया: रोजनामचा, खाता बही एवं बैंक समाधान विवरण",
                                        "description": "Recording transactions, golden rules, trial balance balancing, adjusted cash book BRS.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s1-dsc1-ch3",
                                        "number": 3,
                                        "title": "Depreciation Accounting, Provisions & Reserves",
                                        "hindiTitle": "ह्रास लेखांकन, प्रावधान एवं संचय",
                                        "description": "Straight line method, written down value method, change in method, capital vs revenue reserve.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s1-dsc1-ch4",
                                        "number": 4,
                                        "title": "Royalty Accounts: Minimum Rent & Shortworkings",
                                        "hindiTitle": "रॉयल्टी (अधिकार शुल्क) खाते: न्यूनतम किराया एवं लघुकार्य",
                                        "description": "Lessee and lessor entries, recoupment of shortworkings, strike and lockout provisions.",
                                        "levels": {
                                              "min": 15,
                                              "max": 50
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s1-dsc1-ch5",
                                        "number": 5,
                                        "title": "Hire Purchase and Installment Purchase System",
                                        "hindiTitle": "किराया क्रय एवं किस्त भुगतान पद्धति",
                                        "description": "Calculation of interest, cash price calculation, repossession of goods in default cases.",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s1-dsc2",
                            "paperNumber": "DSC-2",
                            "title": "Business Law (व्यावसायिक सन्नियम / व्यावसायिक विधि)",
                            "marks": 100,
                            "description": "Indian Contract Act 1872, Special contracts (Indemnity, Guarantee, Bailment, Pledge, Agency) & Sale of Goods Act 1930.",
                            "chapters": [
                                  {
                                        "id": "prsu-s1-dsc2-ch1",
                                        "number": 1,
                                        "title": "Indian Contract Act 1872: Nature, Offer, Acceptance & Consideration",
                                        "hindiTitle": "भारतीय अनुबंध अधिनियम: प्रस्ताव, स्वीकृति एवं प्रतिफल",
                                        "description": "Elements of valid contract, legal capacity, free consent, lawful object and consideration.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s1-dsc2-ch2",
                                        "number": 2,
                                        "title": "Capacity to Contract, Free Consent & Void Agreements",
                                        "hindiTitle": "अनुबंध की क्षमता, स्वतंत्र सहमति एवं व्यर्थ समझौते",
                                        "description": "Coercion, undue influence, fraud, misrepresentation, mistake, agreements in restraint of trade.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s1-dsc2-ch3",
                                        "number": 3,
                                        "title": "Special Contracts: Indemnity & Guarantee",
                                        "hindiTitle": "विशिष्ट अनुबंध: क्षतिपूर्ति एवं गारंटी अनुबंध",
                                        "description": "Rights of indemnity holder, surety's liability, discharge of surety, rights against creditor/debtor.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s1-dsc2-ch4",
                                        "number": 4,
                                        "title": "Bailment, Pledge & Law of Agency",
                                        "hindiTitle": "निक्षेप, गिरवी एवं एजेंसी के नियम",
                                        "description": "Duties of bailor and bailee, rights of pawnee, creation and termination of agency.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s1-dsc2-ch5",
                                        "number": 5,
                                        "title": "Sale of Goods Act 1930: Conditions, Warranties & Unpaid Seller",
                                        "hindiTitle": "वस्तु विक्रय अधिनियम: शर्तें, आश्वासन एवं अदत्त विक्रेता",
                                        "description": "Caveat emptor doctrine, transfer of property, rights of unpaid seller against goods.",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s1-dsc3",
                            "paperNumber": "DSC-3",
                            "title": "Business Economics (व्यावसायिक अर्थशास्त्र)",
                            "marks": 100,
                            "description": "Microeconomic principles, demand elasticity, indifference curve, production function and market cost structures.",
                            "chapters": [
                                  {
                                        "id": "prsu-s1-dsc3-ch1",
                                        "number": 1,
                                        "title": "Nature and Scope of Business Economics & Decision Making",
                                        "hindiTitle": "व्यावसायिक अर्थशास्त्र की प्रकृति, क्षेत्र एवं व्यावसायिक निर्णय",
                                        "description": "Integration of economic theory with business practice, opportunity cost principle.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s1-dsc3-ch2",
                                        "number": 2,
                                        "title": "Demand Analysis, Law of Demand & Elasticity of Demand",
                                        "hindiTitle": "मांग विश्लेषण, मांग का नियम एवं मांग की लोच",
                                        "description": "Price, income, cross elasticity, measurement methods, demand forecasting techniques.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s1-dsc3-ch3",
                                        "number": 3,
                                        "title": "Consumer Behavior: Indifference Curve & Marginal Rate of Substitution",
                                        "hindiTitle": "उपभोक्ता व्यवहार: उदासीनता वक्र एवं प्रतिस्थापन की सीमांत दर",
                                        "description": "Assumptions, properties of IC, budget constraint, consumer equilibrium under IC.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s1-dsc3-ch4",
                                        "number": 4,
                                        "title": "Production Function, Law of Variable Proportions & Returns to Scale",
                                        "hindiTitle": "उत्पादन फलन, परिवर्तनशील अनुपातों का नियम एवं पैमाने के प्रतिफल",
                                        "description": "Total, average, marginal product, stages of production, iso-quants, returns to scale.",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s1-dsc3-ch5",
                                        "number": 5,
                                        "title": "Cost Concepts, Revenue Curves & Short-Run/Long-Run Cost Analysis",
                                        "hindiTitle": "लागत अवधारणाएं, आगम वक्र एवं अल्पकालीन/दीर्घकालीन लागत विश्लेषण",
                                        "description": "Fixed and variable costs, marginal cost, U-shaped LAC curve, break-even analysis.",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s1-ge1",
                            "paperNumber": "GE-1",
                            "title": "Generic Elective: Information & Communication Technology in Business (ICT)",
                            "marks": 100,
                            "description": "Open interdisciplinary elective covering hardware, software, office productivity, internet, cloud and business data security.",
                            "chapters": [
                                  {
                                        "id": "prsu-s1-ge1-ch1",
                                        "number": 1,
                                        "title": "Fundamentals of Computers, Hardware, Software & Operating Systems",
                                        "hindiTitle": "कंप्यूटर के मूल तत्व, हार्डवेयर, सॉफ्टवेयर एवं ऑपरेटिंग सिस्टम",
                                        "description": "Input/output devices, CPU architecture, system software vs application software, Windows/Linux.",
                                        "levels": {
                                              "min": 5,
                                              "max": 35
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s1-ge1-ch2",
                                        "number": 2,
                                        "title": "Word Processing & Professional Business Document Formatting",
                                        "hindiTitle": "वर्ड प्रोसेसिंग एवं व्यावसायिक दस्तावेज निर्माण",
                                        "description": "Document design, tables, mail merge, professional templates, corporate report layout.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  },
                                  {
                                        "id": "prsu-s1-ge1-ch3",
                                        "number": 3,
                                        "title": "Spreadsheets for Business: Advanced Excel, Formulas & Functions",
                                        "hindiTitle": "व्यावसायिक स्प्रेडशीट: उन्नत एक्सेल, फॉर्मूले एवं फलन",
                                        "description": "VLOOKUP/XLOOKUP, Pivot Tables, conditional formatting, financial functions (PMT, NPV).",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s1-ge1-ch4",
                                        "number": 4,
                                        "title": "Internet, Cloud Computing & Database Management Systems (DBMS)",
                                        "hindiTitle": "इंटरनेट, क्लाउड कंप्यूटिंग एवं डेटाबेस प्रबंधन प्रणाली (DBMS)",
                                        "description": "Web protocols, Google Workspace/MS 365 cloud, relational database concepts, SQL queries.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s1-ge1-ch5",
                                        "number": 5,
                                        "title": "Information Security, Data Privacy & Cyber Ethics in Commerce",
                                        "hindiTitle": "सूचना सुरक्षा, डेटा गोपनीयता एवं वाणिज्य में साइबर नैतिकता",
                                        "description": "Malware prevention, two-factor authentication, data privacy norms, cyber safety practices.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s1-aec1",
                            "paperNumber": "AEC-1",
                            "title": "Environmental Studies (पर्यावरण अध्ययन)",
                            "marks": 100,
                            "description": "Multidisciplinary nature of environmental science, natural resources, biodiversity, pollution control and green business.",
                            "chapters": [
                                  {
                                        "id": "prsu-s1-aec1-ch1",
                                        "number": 1,
                                        "title": "Multidisciplinary Nature of Environmental Studies & Ecosystems",
                                        "hindiTitle": "पर्यावरण अध्ययन की बहुविषयक प्रकृति एवं पारिस्थितिकी तंत्र",
                                        "description": "Structure and function of forest, grassland, desert and aquatic ecosystems, food chains.",
                                        "levels": {
                                              "min": 5,
                                              "max": 35
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s1-aec1-ch2",
                                        "number": 2,
                                        "title": "Natural Resources: Renewable, Non-renewable & Sustainable Conservation",
                                        "hindiTitle": "प्राकृतिक संसाधन: नवीकरणीय व अनवीकरणीय तथा सतत संरक्षण",
                                        "description": "Water, land, mineral, energy resources, deforestation, over-utilization, dams and conflicts.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  },
                                  {
                                        "id": "prsu-s1-aec1-ch3",
                                        "number": 3,
                                        "title": "Biodiversity: Values, Threats, Hotspots & Conservation Strategies",
                                        "hindiTitle": "जैव विविधता: महत्व, संकट, तप्त स्थल एवं संरक्षण रणनीतियां",
                                        "description": "Genetic, species and ecosystem diversity, endangered flora and fauna, in-situ/ex-situ methods.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  },
                                  {
                                        "id": "prsu-s1-aec1-ch4",
                                        "number": 4,
                                        "title": "Environmental Pollution: Air, Water, Soil, Noise & Solid Waste",
                                        "hindiTitle": "पर्यावरण प्रदूषण: वायु, जल, मृदा, ध्वनि एवं ठोस अपशिष्ट प्रबंधन",
                                        "description": "Causes, effects and control of urban and industrial pollutants, nuclear hazards, e-waste.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s1-aec1-ch5",
                                        "number": 5,
                                        "title": "Environmental Policies, Climate Change, Green Business & Law",
                                        "hindiTitle": "पर्यावरण नीतियां, जलवायु परिवर्तन, हरित व्यवसाय एवं कानून",
                                        "description": "Environment Protection Act 1986, climate agreements, ESG corporate responsibilities.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s1-vac1",
                            "paperNumber": "VAC-1",
                            "title": "Concept of Business / Pool Elective (व्यावसायिक अवधारणाएं)",
                            "marks": 100,
                            "description": "Value Added Course: Meaning, nature, forms of business organization, ethics, CSR, startups and supply chains.",
                            "chapters": [
                                  {
                                        "id": "prsu-s1-vac1-ch1",
                                        "number": 1,
                                        "title": "Meaning, Evolution, Nature and Social Purpose of Modern Business",
                                        "hindiTitle": "आधुनिक व्यवसाय की अवधारणा, विकास, प्रकृति एवं सामाजिक उद्देश्य",
                                        "description": "Business vs profession vs employment, economic and social objectives of commerce.",
                                        "levels": {
                                              "min": 5,
                                              "max": 35
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s1-vac1-ch2",
                                        "number": 2,
                                        "title": "Forms of Business Ownership: Sole Trader, Partnership, LLP & Company",
                                        "hindiTitle": "व्यावसायिक स्वामित्व के रूप: एकाकी व्यापार, साझेदारी, एलएलपी व कंपनी",
                                        "description": "Comparative features, merits, demerits, suitability for different scales of enterprise.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s1-vac1-ch3",
                                        "number": 3,
                                        "title": "Business Ethics, Corporate Social Responsibility (CSR) & Governance",
                                        "hindiTitle": "व्यावसायिक नैतिकता, कॉर्पोरेट सामाजिक उत्तरदायित्व (CSR) व सुशासन",
                                        "description": "Moral principles in commercial deals, CSR mandate under Section 135 Companies Act 2013.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  },
                                  {
                                        "id": "prsu-s1-vac1-ch4",
                                        "number": 4,
                                        "title": "Startups, MSMEs & Business Incubation in Indian Economy",
                                        "hindiTitle": "स्टार्टअप्स, एमएसएमई एवं भारतीय अर्थव्यवस्था में व्यापार इनक्यूबेशन",
                                        "description": "Entrepreneurial mindset, government incentives, registration under Udyam portal.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  },
                                  {
                                        "id": "prsu-s1-vac1-ch5",
                                        "number": 5,
                                        "title": "Emerging Trends in Global Trade, Digital Business & Supply Chain",
                                        "hindiTitle": "वैश्विक व्यापार, डिजिटल व्यवसाय एवं आपूर्ति श्रृंखला के नए रुझान",
                                        "description": "E-commerce ecosystems, fintech innovations, circular economy business models.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  }
                            ]
                      }
                ]
          },
          {
                "id": "prsu-bcom-sem2",
                "title": "B.Com Semester 2 (PRSU / NEP)",
                "shortTitle": "B.Com Sem 2",
                "institution": "PRSU",
                "description": "Certificate Level Second Semester: 6 Subjects, 20 Credits (DSC-4, DSC-5, DSC-6, GE-2, AEC-2, SEC-1).",
                "eligibility": "Completed B.Com Semester 1",
                "scheme": "NEP-2020 / PRSU Scheme (6 Subjects - 20 Credits)",
                "papers": [
                      {
                            "id": "prsu-s2-dsc4",
                            "paperNumber": "DSC-4",
                            "title": "Business Accounting / Corporate Accounting Basics (व्यावसायिक / कंपनी लेखांकन मूल तत्व)",
                            "marks": 100,
                            "description": "Accounting for share capital, debentures, branch accounts, departmental accounts, partnership dissolution.",
                            "chapters": [
                                  {
                                        "id": "prsu-s2-dsc4-ch1",
                                        "number": 1,
                                        "title": "Accounting for Share Capital: Issue, Forfeiture & Re-issue of Shares",
                                        "hindiTitle": "अंश पूंजी लेखांकन: अंशों का निर्गमन, जब्ती एवं पुनर्निर्गमन",
                                        "description": "Issue of shares at par/premium, calls in arrears/advance, pro-rata allotment, forfeiture mechanics.",
                                        "levels": {
                                              "min": 20,
                                              "max": 55
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s2-dsc4-ch2",
                                        "number": 2,
                                        "title": "Redemption of Preference Shares & Debentures",
                                        "hindiTitle": "पूर्वाधिकार अंशों एवं ऋणपत्रों का शोधन",
                                        "description": "Capital Redemption Reserve (CRR), purchase of own debentures, ex-interest/cum-interest.",
                                        "levels": {
                                              "min": 25,
                                              "max": 60
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s2-dsc4-ch3",
                                        "number": 3,
                                        "title": "Branch Accounts: Debtors System & Stock-Debtors Method",
                                        "hindiTitle": "शाखा खाते: देनदार पद्धति एवं स्कंध-देनदार पद्धति",
                                        "description": "Dependent branch accounting at cost/invoice price, branch reconciliation.",
                                        "levels": {
                                              "min": 20,
                                              "max": 55
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s2-dsc4-ch4",
                                        "number": 4,
                                        "title": "Departmental Accounting & Inter-Departmental Transfers",
                                        "hindiTitle": "विभागीय लेखांकन एवं अंतर-विभागीय हस्तांतरण",
                                        "description": "Allocation of common expenses, transfers at cost vs selling price, unrealized profit reserve.",
                                        "levels": {
                                              "min": 20,
                                              "max": 55
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s2-dsc4-ch5",
                                        "number": 5,
                                        "title": "Partnership Accounts: Dissolution & Garner vs Murray Rule",
                                        "hindiTitle": "साझेदारी खाते: फर्म का विघटन एवं गार्नर बनाम मरे नियम",
                                        "description": "Insolvency of partners, piecemeal distribution of cash, maximum loss method.",
                                        "levels": {
                                              "min": 25,
                                              "max": 60
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s2-dsc5",
                            "paperNumber": "DSC-5",
                            "title": "Business Mathematics (व्यावसायिक गणित)",
                            "marks": 100,
                            "description": "Commercial mathematics, simultaneous equations, matrices, determinants, interest, annuities and calculus.",
                            "chapters": [
                                  {
                                        "id": "prsu-s2-dsc5-ch1",
                                        "number": 1,
                                        "title": "Ratio, Proportion, Percentage & Commercial Brokerage",
                                        "hindiTitle": "अनुपात, समानुपात, प्रतिशत एवं व्यापारिक दलाली",
                                        "description": "Direct and inverse proportions, commission calculations, trade discount and cash discount.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s2-dsc5-ch2",
                                        "number": 2,
                                        "title": "Simultaneous Equations & Linear Functions",
                                        "hindiTitle": "युगपत समीकरण एवं रैखिक फलन",
                                        "description": "Two and three variable linear systems, graphical method, applications in break-even analysis.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s2-dsc5-ch3",
                                        "number": 3,
                                        "title": "Matrices & Determinants: Cramer's Rule & Inverses",
                                        "hindiTitle": "आव्यूह एवं सारणिक: क्रेमर नियम एवं व्युत्क्रम",
                                        "description": "Matrix algebra, adjoint, inverse of 3x3 matrix, solving linear systems by Cramer's rule.",
                                        "levels": {
                                              "min": 15,
                                              "max": 50
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s2-dsc5-ch4",
                                        "number": 4,
                                        "title": "Simple and Compound Interest, Annuities & Sinking Funds",
                                        "hindiTitle": "साधारण व चक्रवृद्धि ब्याज, वार्षिकी एवं शोधन कोष",
                                        "description": "Effective rate of interest, present value of annuity regular, amortisation schedules.",
                                        "levels": {
                                              "min": 15,
                                              "max": 50
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s2-dsc5-ch5",
                                        "number": 5,
                                        "title": "Differential Calculus Basics & Linear Programming (LPP)",
                                        "hindiTitle": "अवकलन की मूल बातें एवं रैखिक प्रोग्रामन (LPP)",
                                        "description": "First and second order derivatives, marginal cost, revenue maximization, graphical LPP.",
                                        "levels": {
                                              "min": 20,
                                              "max": 55
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s2-dsc6",
                            "paperNumber": "DSC-6",
                            "title": "Business Environment (व्यावसायिक पर्यावरण)",
                            "marks": 100,
                            "description": "Micro/macro factors, 1991 LPG reforms, NITI Aayog, FDI/FII, Make in India and trade policy.",
                            "chapters": [
                                  {
                                        "id": "prsu-s2-dsc6-ch1",
                                        "number": 1,
                                        "title": "Nature, Concept & Dimensions of Business Environment",
                                        "hindiTitle": "व्यावसायिक पर्यावरण की प्रकृति, अवधारणा एवं आयाम",
                                        "description": "Internal vs external environment, PESTLE analysis, environmental scanning techniques.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s2-dsc6-ch2",
                                        "number": 2,
                                        "title": "New Economic Policy 1991: LPG Reforms in India",
                                        "hindiTitle": "नई आर्थिक नीति 1991: उदारीकरण, निजीकरण, वैश्वीकरण",
                                        "description": "De-licensing, dis-investment in PSUs, opening up sectors, impact on Indian industries.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s2-dsc6-ch3",
                                        "number": 3,
                                        "title": "Industrial Policy & NITI Aayog Strategic Framework",
                                        "hindiTitle": "औद्योगिक नीति एवं नीति आयोग का रणनीतिक ढांचा",
                                        "description": "Evolution from Planning Commission to NITI Aayog, cooperative federalism, industrial clusters.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  },
                                  {
                                        "id": "prsu-s2-dsc6-ch4",
                                        "number": 4,
                                        "title": "Foreign Capital, FDI, FII & EXIM Policy of India",
                                        "hindiTitle": "विदेशी पूंजी, प्रत्यक्ष विदेशी निवेश (FDI) एवं विदेश व्यापार नीति",
                                        "description": "Automatic vs government route for FDI, foreign exchange reserves, export incentives.",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s2-dsc6-ch5",
                                        "number": 5,
                                        "title": "Make in India, Atmanirbhar Bharat & Sustainable Industry",
                                        "hindiTitle": "मेक इन इंडिया, आत्मनिर्भर भारत एवं सतत औद्योगिक विकास",
                                        "description": "PLI schemes, start-up initiatives, environmental regulations, ESG compliance for businesses.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s2-ge2",
                            "paperNumber": "GE-2",
                            "title": "Generic Elective: Management Information Systems (MIS)",
                            "marks": 100,
                            "description": "Open interdisciplinary elective covering MIS concepts, Decision Support Systems, ERP modules, data analytics and IT security.",
                            "chapters": [
                                  {
                                        "id": "prsu-s2-ge2-ch1",
                                        "number": 1,
                                        "title": "Introduction to MIS: Concept, Structure & Organizational Role",
                                        "hindiTitle": "प्रबंध सूचना प्रणाली: अवधारणा, संरचना एवं संगठनात्मक भूमिका",
                                        "description": "Data vs information, characteristics of MIS, strategic role of information in management.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s2-ge2-ch2",
                                        "number": 2,
                                        "title": "Decision Support Systems (DSS) & Executive Information Systems",
                                        "hindiTitle": "निर्णय समर्थन प्रणाली (DSS) एवं कार्यकारी सूचना प्रणाली",
                                        "description": "Components of DSS, model base, group DSS, executive dashboards for strategic decisions.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  },
                                  {
                                        "id": "prsu-s2-ge2-ch3",
                                        "number": 3,
                                        "title": "Enterprise Resource Planning (ERP): SAP, Oracle & Integrated Modules",
                                        "hindiTitle": "ईआरपी (ERP): एकीकृत व्यावसायिक मॉड्यूल एवं कार्यान्वयन",
                                        "description": "ERP architecture, supply chain integration, finance and HR modules, challenges in ERP rollout.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s2-ge2-ch4",
                                        "number": 4,
                                        "title": "Business Data Analytics, Business Intelligence & Data Warehousing",
                                        "hindiTitle": "व्यावसायिक डेटा एनालिटिक्स, बिजनेस इंटेलिजेंस एवं डेटा वेयरहाउसिंग",
                                        "description": "Big data in business, ETL pipeline, OLAP vs OLTP, data mining for consumer insights.",
                                        "levels": {
                                              "min": 15,
                                              "max": 50
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s2-ge2-ch5",
                                        "number": 5,
                                        "title": "Information Systems Security, Cloud ERP & IT Audit",
                                        "hindiTitle": "सूचना प्रणाली सुरक्षा, क्लाउड ईआरपी एवं आईटी अंकेक्षण",
                                        "description": "Cyber threats to enterprise systems, disaster recovery planning, IT audit standards.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s2-aec2",
                            "paperNumber": "AEC-2",
                            "title": "English Language / Hindi Language (भाषा संचार)",
                            "marks": 100,
                            "description": "Ability Enhancement Course: Professional language precision, reading comprehension, trade correspondence, technical writing.",
                            "chapters": [
                                  {
                                        "id": "prsu-s2-aec2-ch1",
                                        "number": 1,
                                        "title": "Professional Communication, Grammar & Lexical Precision",
                                        "hindiTitle": "व्यावसायिक संवाद, व्याकरण एवं शब्दावली परिशुद्धता",
                                        "description": "Syntax in business writing, active vs passive voice in reporting, avoidance of ambiguity.",
                                        "levels": {
                                              "min": 5,
                                              "max": 35
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s2-aec2-ch2",
                                        "number": 2,
                                        "title": "Reading Comprehension, Business Summaries & Precis Writing",
                                        "hindiTitle": "बोधगम्यता, संक्षेपण एवं सार लेखन",
                                        "description": "Techniques of analytical reading, extracting key points, one-third precis rules.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  },
                                  {
                                        "id": "prsu-s2-aec2-ch3",
                                        "number": 3,
                                        "title": "Formal Business Correspondence: Inquiries, Quotations & Complaints",
                                        "hindiTitle": "औपचारिक व्यावसायिक पत्राचार: पूछताछ, कोटेशन एवं शिकायती पत्र",
                                        "description": "Standard business letter formats, adjustment letters, credit status letters.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s2-aec2-ch4",
                                        "number": 4,
                                        "title": "Technical Writing, Agendas, Minutes & Executive Notices",
                                        "hindiTitle": "तकनीकी लेखन, कार्यसूची, कार्यवृत्त एवं कार्यकारी सूचनाएं",
                                        "description": "Drafting statutory notices, resolutions, verbatim minutes of board meetings.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  },
                                  {
                                        "id": "prsu-s2-aec2-ch5",
                                        "number": 5,
                                        "title": "Oral Communication, Presentation Skills & Interview Dynamics",
                                        "hindiTitle": "मौखिक प्रस्तुतीकरण, संवाद कौशल एवं साक्षात्कार तकनीक",
                                        "description": "Non-verbal communication, visual aids in presentations, facing personal interview panels.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s2-sec1",
                            "paperNumber": "SEC-1",
                            "title": "Accounting for Everyone / Pool Elective (जनोपयोगी लेखांकन)",
                            "marks": 100,
                            "description": "Skill Enhancement Course: Financial literacy, household budgets, banking operations, basic tax filing, mutual funds.",
                            "chapters": [
                                  {
                                        "id": "prsu-s2-sec1-ch1",
                                        "number": 1,
                                        "title": "Financial Literacy, Family Budgets & Everyday Banking Operations",
                                        "hindiTitle": "वित्तीय साक्षरता, पारिवारिक बजट एवं दैनिक बैंकिंग परिचालन",
                                        "description": "Need for financial planning, 50-30-20 rule, tracking expenses, avoiding high-interest debt.",
                                        "levels": {
                                              "min": 5,
                                              "max": 35
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s2-sec1-ch2",
                                        "number": 2,
                                        "title": "Understanding Personal Bank Accounts, UPI, Fixed Deposits & Cards",
                                        "hindiTitle": "व्यक्तिगत बैंक खाते, यूपीआई, एफडी एवं कार्ड का सुरक्षित उपयोग",
                                        "description": "Savings vs current accounts, KYC norms, interest calculation, digital transaction safety.",
                                        "levels": {
                                              "min": 5,
                                              "max": 35
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  },
                                  {
                                        "id": "prsu-s2-sec1-ch3",
                                        "number": 3,
                                        "title": "Reading Financial Statements for Non-Accountants: P&L & Balance Sheet",
                                        "hindiTitle": "गैर-लेखाकारों के लिए वित्तीय विवरण समझना: लाभ-हानि व बैलेंस शीट",
                                        "description": "Understanding revenues, profit margins, assets, liabilities, debt ratios in simple language.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s2-sec1-ch4",
                                        "number": 4,
                                        "title": "Basic Income Tax Filing: ITR-1 (Sahaj), Tax Deductions & Slabs",
                                        "hindiTitle": "मूल आयकर विवरणी: आईटीआर-1 (सहज), कटौतियां एवं कर दरें",
                                        "description": "Tax computation under old vs new regime, Section 87A rebate, e-filing workflow on portal.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s2-sec1-ch5",
                                        "number": 5,
                                        "title": "Mutual Funds, SIPs, Insurance & Retirement Planning",
                                        "hindiTitle": "म्यूचुअल फंड, एसआईपी, बीमा एवं सेवानिवृत्ति योजना",
                                        "description": "Equity vs debt mutual funds, power of compounding via SIP, term insurance, PPF/NPS.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  }
                            ]
                      }
                ]
          },
          {
                "id": "prsu-bcom-sem3",
                "title": "B.Com Semester 3 (PRSU / NEP)",
                "shortTitle": "B.Com Sem 3",
                "institution": "PRSU",
                "description": "Diploma Level Third Semester: 6 Subjects, 20 Credits (DSC-7, DSC-8, DSC-9, GE-3, AEC-3, SEC-2).",
                "eligibility": "Completed B.Com Semester 2",
                "scheme": "NEP-2020 / PRSU Scheme (6 Subjects - 20 Credits)",
                "papers": [
                      {
                            "id": "prsu-s3-dsc7",
                            "paperNumber": "DSC-7",
                            "title": "Corporate Accounting (उच्चतर कंपनी लेखांकन)",
                            "marks": 100,
                            "description": "Company final accounts under Schedule III, valuation of goodwill and shares, amalgamation, absorption, internal reconstruction.",
                            "chapters": [
                                  {
                                        "id": "prsu-s3-dsc7-ch1",
                                        "number": 1,
                                        "title": "Final Accounts of Companies as per Schedule III Companies Act 2013",
                                        "hindiTitle": "कंपनी के अंतिम खाते: कंपनी अधिनियम 2013 अनुसूची III के अनुसार",
                                        "description": "Statement of Profit & Loss, Balance Sheet format, corporate dividend tax provisions.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s3-dsc7-ch2",
                                        "number": 2,
                                        "title": "Valuation of Goodwill: Average Profit, Super Profit, Capitalization",
                                        "hindiTitle": "ख्याति का मूल्यांकन: औसत लाभ, अधिलाभ एवं पूंजीकरण विधि",
                                        "description": "Factors affecting goodwill, purchase of super profit, annuity method, accounting treatment.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s3-dsc7-ch3",
                                        "number": 3,
                                        "title": "Valuation of Shares: Net Assets Method, Yield Method & Fair Value",
                                        "hindiTitle": "अंशों का मूल्यांकन: शुद्ध संपत्ति विधि, प्रत्याय विधि एवं उचित मूल्य",
                                        "description": "Intrinsic value, dividend yield vs earnings yield, valuation of preference shares.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s3-dsc7-ch4",
                                        "number": 4,
                                        "title": "Amalgamation, Absorption & Accounting Standard 14 (AS-14)",
                                        "hindiTitle": "कंपनियों का एकीकरण, संविलियन एवं लेखांकन मानक 14 (AS-14)",
                                        "description": "Pooling of interests vs purchase method, calculation of purchase consideration.",
                                        "levels": {
                                              "min": 35,
                                              "max": 70
                                        },
                                        "topicsCount": 9,
                                        "estimatedHours": 18
                                  },
                                  {
                                        "id": "prsu-s3-dsc7-ch5",
                                        "number": 5,
                                        "title": "Internal Reconstruction, Capital Reduction Scheme & Restructuring",
                                        "hindiTitle": "आंतरिक पुनर्निर्माण, पूंजी में कमी योजना एवं पुनर्गठन",
                                        "description": "Section 66 procedure, reconstruction account, writing off fictitious assets, restructured balance sheet.",
                                        "levels": {
                                              "min": 35,
                                              "max": 70
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s3-dsc8",
                            "paperNumber": "DSC-8",
                            "title": "Business Statistics (व्यावसायिक सांख्यिकी)",
                            "marks": 100,
                            "description": "Data classification, central tendency (mean/median/mode), dispersion, standard deviation, skewness and probability.",
                            "chapters": [
                                  {
                                        "id": "prsu-s3-dsc8-ch1",
                                        "number": 1,
                                        "title": "Data Collection, Frequency Distribution, Classification & Tabulation",
                                        "hindiTitle": "समंक संकलन, आवृत्ति वितरण, वर्गीकरण एवं सारणीयन",
                                        "description": "Primary vs secondary data, questionnaires, cumulative frequency curves, histograms.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s3-dsc8-ch2",
                                        "number": 2,
                                        "title": "Measures of Central Tendency: Mean, Median, Mode, GM & HM",
                                        "hindiTitle": "केंद्रीय प्रवृत्ति के माप: समांतर माध्य, मध्यका, बहुलक एवं गुणोत्तर माध्य",
                                        "description": "Mathematical properties, weighted mean, positional averages, applications in business.",
                                        "levels": {
                                              "min": 20,
                                              "max": 55
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s3-dsc8-ch3",
                                        "number": 3,
                                        "title": "Measures of Dispersion: Standard Deviation, Variance & Quartile Deviation",
                                        "hindiTitle": "अपकिरण के माप: प्रमाप विचलन, प्रसरण एवं चतुर्थक विचलन",
                                        "description": "Absolute vs relative dispersion, coefficient of variation (CV) for consistency testing.",
                                        "levels": {
                                              "min": 25,
                                              "max": 60
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s3-dsc8-ch4",
                                        "number": 4,
                                        "title": "Skewness: Karl Pearson's & Bowley's Coefficients of Skewness",
                                        "hindiTitle": "विषमता के माप: कार्ल पियर्सन एवं बाउले के विषमता गुणांक",
                                        "description": "Symmetrical vs skewed curves, Pearson's formula based on mode/median, Bowley's quartiles.",
                                        "levels": {
                                              "min": 25,
                                              "max": 60
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s3-dsc8-ch5",
                                        "number": 5,
                                        "title": "Elementary Probability Concepts, Addition & Multiplication Theorems",
                                        "hindiTitle": "प्रायिकता की मूलभूत अवधारणाएं, योग एवं गुणन प्रमेय",
                                        "description": "Classical, empirical and axiomatic probability, independent events, Bayes' theorem basics.",
                                        "levels": {
                                              "min": 25,
                                              "max": 60
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s3-dsc9",
                            "paperNumber": "DSC-9",
                            "title": "Principles of Business Management (प्रबंध के सिद्धांत)",
                            "marks": 100,
                            "description": "Fayol and Taylor principles, planning, MBO, organizational structure, motivation models, leadership styles, control.",
                            "chapters": [
                                  {
                                        "id": "prsu-s3-dsc9-ch1",
                                        "number": 1,
                                        "title": "Management Theories: Scientific Management & Fayol's 14 Principles",
                                        "hindiTitle": "प्रबंध सिद्धांत: टेलर का वैज्ञानिक प्रबंध एवं फेयोल के 14 सिद्धांत",
                                        "description": "Administrative management, bureaucratic model, human relations approach, Hawthorne study.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s3-dsc9-ch2",
                                        "number": 2,
                                        "title": "Planning, Forecasting, Decision Making & Management by Objectives (MBO)",
                                        "hindiTitle": "नियोजन, पूर्वानुमान, निर्णय प्रक्रिया एवं उद्देश्य आधारित प्रबंध (MBO)",
                                        "description": "Types of plans, strategic vs operational planning, steps in rational decision making.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s3-dsc9-ch3",
                                        "number": 3,
                                        "title": "Organization Structure, Formal/Informal, Delegation & Decentralization",
                                        "hindiTitle": "संगठन संरचना, औपचारिक/अनौपचारिक, अधिकार प्रत्यायोजन व विकेंद्रीकरण",
                                        "description": "Span of control, line and staff relationships, matrix organization, delegation principles.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s3-dsc9-ch4",
                                        "number": 4,
                                        "title": "Motivation Models: Maslow, Herzberg, McGregor's X & Y Theories",
                                        "hindiTitle": "अभिप्रेरणा सिद्धांत: मैस्लो, हर्जबर्ग द्वि-घटक एवं मैकग्रेगर X व Y",
                                        "description": "Hierarchy of needs, motivators vs hygiene factors, intrinsic motivation, job enrichment.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s3-dsc9-ch5",
                                        "number": 5,
                                        "title": "Leadership Styles, Coordination & Control Systems (PERT/CPM)",
                                        "hindiTitle": "नेतृत्व शैलियां, समन्वय एवं आधुनिक नियंत्रण तकनीकें (PERT/CPM)",
                                        "description": "Transformational vs transactional leadership, feedforward/feedback control, network analysis.",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s3-ge3",
                            "paperNumber": "GE-3",
                            "title": "Generic Elective: Basics of Banking & Insurance (बैंकिंग एवं बीमा के मूल सिद्धांत)",
                            "marks": 100,
                            "description": "Open interdisciplinary pool elective: Indian banking structure, RBI monetary policy, insurance principles, IRDAI regulation.",
                            "chapters": [
                                  {
                                        "id": "prsu-s3-ge3-ch1",
                                        "number": 1,
                                        "title": "Banking System in India: Commercial Banks, RRBs & Small Finance Banks",
                                        "hindiTitle": "भारतीय बैंकिंग प्रणाली: व्यापारिक बैंक, क्षेत्रीय ग्रामीण बैंक व लघु वित्त बैंक",
                                        "description": "Scheduled vs non-scheduled banks, public sector banking reforms, payment banks in India.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s3-ge3-ch2",
                                        "number": 2,
                                        "title": "Reserve Bank of India: Functions, Credit Control, Repo/CRR/SLR",
                                        "hindiTitle": "भारतीय रिज़र्व बैंक: कार्य, साख नियंत्रण एवं मौद्रिक उपकरण",
                                        "description": "Monetary policy committee, repo rate, open market operations, qualitative credit controls.",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s3-ge3-ch3",
                                        "number": 3,
                                        "title": "Banker-Customer Relationship, Rights, Duties & Banking Ombudsman",
                                        "hindiTitle": "बैंकर-ग्राहक संबंध, अधिकार, कर्तव्य एवं बैंकिंग लोकपाल योजना",
                                        "description": "Garnishee orders, banker's lien, right of appropriation, resolving customer grievances.",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s3-ge3-ch4",
                                        "number": 4,
                                        "title": "Principles of Insurance: Insurable Interest, Indemnity, Subrogation",
                                        "hindiTitle": "बीमा के मूल सिद्धांत: बीमायोग्य हित, क्षतिपूर्ति, प्रत्यासन एवं परम सद्विश्वास",
                                        "description": "Utmost good faith, proximate cause, contribution, insurable risk characteristics.",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s3-ge3-ch5",
                                        "number": 5,
                                        "title": "Life Insurance, General Insurance & IRDAI Regulatory Framework",
                                        "hindiTitle": "जीवन बीमा, सामान्य बीमा एवं इरडा (IRDAI) नियामक ढांचा",
                                        "description": "Term plans, endowment, health insurance, motor insurance, claim settlement procedures.",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s3-aec3",
                            "paperNumber": "AEC-3",
                            "title": "Hindi / English Language (उन्नत भाषा एवं अनुवाद कौशल)",
                            "marks": 100,
                            "description": "Ability Enhancement Course: Advanced commercial writing, bilingual terminology, business translation, corporate negotiation.",
                            "chapters": [
                                  {
                                        "id": "prsu-s3-aec3-ch1",
                                        "number": 1,
                                        "title": "Advanced Business Writing, Editorial Reports & Press Releases",
                                        "hindiTitle": "उन्नत व्यावसायिक लेखन, संपादकीय रिपोर्ट एवं प्रेस विज्ञप्ति",
                                        "description": "Drafting corporate newsletters, executive briefings, media releases, speech drafting.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s3-aec3-ch2",
                                        "number": 2,
                                        "title": "Commercial Terminology: Hindi-English Bilingual Vocabularies",
                                        "hindiTitle": "व्यापारिक पारिभाषिक शब्दावली: हिन्दी-अंग्रेजी द्विभाषी शब्दकोश",
                                        "description": "Statutory terms in banking, accounting, taxation, company law and government gazettes.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 10
                                  },
                                  {
                                        "id": "prsu-s3-aec3-ch3",
                                        "number": 3,
                                        "title": "Translation Skills: English to Hindi & Hindi to English Business Translation",
                                        "hindiTitle": "व्यावसायिक अनुवाद कौशल: अंग्रेजी से हिन्दी एवं हिन्दी से अंग्रेजी",
                                        "description": "Translating audit queries, annual report excerpts, commercial contracts accurately.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s3-aec3-ch4",
                                        "number": 4,
                                        "title": "Meeting Management: Resolutions, Dissents & Parliamentary Procedures",
                                        "hindiTitle": "सभा प्रबंध: प्रस्ताव, असहमति एवं संसदीय कार्यप्रणाली",
                                        "description": "Drafting ordinary and special resolutions, recording minutes of debate, voting procedures.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  },
                                  {
                                        "id": "prsu-s3-aec3-ch5",
                                        "number": 5,
                                        "title": "Corporate Public Speaking, Debate & Cross-Cultural Negotiation",
                                        "hindiTitle": "कॉर्पोरेट संवाद, वाद-विवाद एवं अंतर-सांस्कृतिक वार्ता कौशल",
                                        "description": "Pitching business proposals, negotiation tactics, cross-border corporate communication.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s3-sec2",
                            "paperNumber": "SEC-2",
                            "title": "Skill Enhancement Course: Computer Applications in Business / E-Filing",
                            "marks": 100,
                            "description": "Practical IT skills: TallyPrime accounting, ledger entries, Income Tax portal ITR e-filing, GST portal returns, DSC setup.",
                            "chapters": [
                                  {
                                        "id": "prsu-s3-sec2-ch1",
                                        "number": 1,
                                        "title": "Accounting Software Essentials: TallyPrime / Zoho Books Setup",
                                        "hindiTitle": "लेखांकन सॉफ्टवेयर: टैलीप्राइम व जोहो बुक्स कंपनी निर्माण",
                                        "description": "Company configuration, chart of accounts, master creation, groups and ledger architecture.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s3-sec2-ch2",
                                        "number": 2,
                                        "title": "Voucher Entry, Ledger Creation & Financial Reports in Accounting Software",
                                        "hindiTitle": "वाउचर प्रविष्टि, खाता बही एवं वित्तीय रिपोर्ट निर्माण",
                                        "description": "Payment, receipt, sales, purchase, contra, journal vouchers, Day Book, Trial Balance, P&L.",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s3-sec2-ch3",
                                        "number": 3,
                                        "title": "E-Filing of Income Tax Returns (ITR-1 / ITR-2) on IT Portal",
                                        "hindiTitle": "आयकर पोर्टल पर ई-फाइलिंग (ITR-1 / ITR-2)",
                                        "description": "Downloading pre-filled data, Form 26AS & AIS reconciliation, verifying ITR via Aadhaar OTP.",
                                        "levels": {
                                              "min": 20,
                                              "max": 55
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s3-sec2-ch4",
                                        "number": 4,
                                        "title": "E-Filing of GST Returns (GSTR-1, GSTR-3B) & GST Portal Operations",
                                        "hindiTitle": "जीएसटी पोर्टल परिचालन एवं विवरणियां (GSTR-1, GSTR-3B)",
                                        "description": "Uploading B2B invoices, generating e-way bills, offsetting tax liability using electronic ledger.",
                                        "levels": {
                                              "min": 25,
                                              "max": 60
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s3-sec2-ch5",
                                        "number": 5,
                                        "title": "Digital Signature Certificates (DSC), MCA21 Portal Filings & Form Filling",
                                        "hindiTitle": "डिजिटल हस्ताक्षर (DSC), एमसीए21 पोर्टल एवं कॉर्पोरेट ई-फॉर्म",
                                        "description": "Class 3 DSC registration, filing SPICe+ company incorporation forms, annual return MGT-7.",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  }
                            ]
                      }
                ]
          },
          {
                "id": "prsu-bcom-sem4",
                "title": "B.Com Semester 4 (PRSU / NEP)",
                "shortTitle": "B.Com Sem 4",
                "institution": "PRSU",
                "description": "Diploma Level Fourth Semester: 6 Subjects, 20 Credits (DSC-10, DSC-11, DSC-12, GE-4, AEC-4, VAC-2 / Internship).",
                "eligibility": "Completed B.Com Semester 3",
                "scheme": "NEP-2020 / PRSU Scheme (6 Subjects - 20 Credits)",
                "papers": [
                      {
                            "id": "prsu-s4-dsc10",
                            "paperNumber": "DSC-10",
                            "title": "Cost Accounting (लागत लेखांकन)",
                            "marks": 100,
                            "description": "Cost concepts, cost sheet, material control (EOQ, stores ledger), labour incentives, overhead absorption, unit costing.",
                            "chapters": [
                                  {
                                        "id": "prsu-s4-dsc10-ch1",
                                        "number": 1,
                                        "title": "Meaning, Objectives, Scope & Preparation of Cost Sheet",
                                        "hindiTitle": "लागत का अर्थ, उद्देश्य, क्षेत्र एवं लागत पत्रक निर्माण",
                                        "description": "Prime cost, factory cost, cost of production, total cost, quotation and tender prices.",
                                        "levels": {
                                              "min": 25,
                                              "max": 60
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s4-dsc10-ch2",
                                        "number": 2,
                                        "title": "Material Control: EOQ, Stock Levels & Stores Ledger",
                                        "hindiTitle": "सामग्री नियंत्रण: मितव्ययी आदेश मात्रा (EOQ) एवं स्टोर लेजर (FIFO, LIFO)",
                                        "description": "Economic order quantity, minimum/maximum stock levels, ABC analysis, store pricing methods.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s4-dsc10-ch3",
                                        "number": 3,
                                        "title": "Labour Costing: Incentive Wage Plans (Halsey, Rowan & Taylor)",
                                        "hindiTitle": "श्रम लागत एवं प्रेरणात्मक मजदूरी योजनाएं: हाल्से, रोवन व टेलर",
                                        "description": "Time wage vs piece wage, idle time, overtime, labour turnover ratios, efficiency bonuses.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s4-dsc10-ch4",
                                        "number": 4,
                                        "title": "Overhead Allocation, Apportionment & Absorption (Machine Hour Rate)",
                                        "hindiTitle": "उपरिव्यय आबंटन, अनुभाजन एवं अवशोषण (मशीन घंटा दर)",
                                        "description": "Primary and secondary distribution summary, step-ladder method, machine hour rate computation.",
                                        "levels": {
                                              "min": 35,
                                              "max": 70
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s4-dsc10-ch5",
                                        "number": 5,
                                        "title": "Methods of Costing: Unit Costing, Job Costing & Batch Costing",
                                        "hindiTitle": "लागत पद्धतियां: इकाई लागत, उपकार्य लागत एवं समूह लागत विधियां",
                                        "description": "Job cost sheet, economic batch quantity (EBQ), practical applications in production.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s4-dsc11",
                            "paperNumber": "DSC-11",
                            "title": "Company Law (कंपनी अधिनियम 2013)",
                            "marks": 100,
                            "description": "Corporate entity, MOA, AOA, prospectus, share capital, directors appointment, powers, meetings, winding up.",
                            "chapters": [
                                  {
                                        "id": "prsu-s4-dsc11-ch1",
                                        "number": 1,
                                        "title": "Nature, Characteristics & Types of Companies: Corporate Veil",
                                        "hindiTitle": "कंपनी की प्रकृति, विशेषताएं एवं प्रकार: कॉर्पोरेट आवरण",
                                        "description": "Private, public, OPC, small company, lifting of corporate veil, Salomon vs Salomon case.",
                                        "levels": {
                                              "min": 20,
                                              "max": 55
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s4-dsc11-ch2",
                                        "number": 2,
                                        "title": "Incorporation, Memorandum (MOA) & Articles of Association (AOA)",
                                        "hindiTitle": "कंपनी समामेलन, सीमा नियम (MOA) एवं अंतर्नियम (AOA)",
                                        "description": "Clauses of MOA, alteration procedure, doctrine of ultra vires, doctrine of indoor management.",
                                        "levels": {
                                              "min": 25,
                                              "max": 60
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s4-dsc11-ch3",
                                        "number": 3,
                                        "title": "Prospectus, Allotment of Securities, Share Capital & Debentures",
                                        "hindiTitle": "प्रविवरण, प्रतिभूतियों का आवंटन, अंश पूंजी एवं ऋणपत्र",
                                        "description": "Shelf prospectus, red-herring, misstatements in prospectus, sweat equity, debentures.",
                                        "levels": {
                                              "min": 25,
                                              "max": 60
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s4-dsc11-ch4",
                                        "number": 4,
                                        "title": "Directors: Appointment, Disqualification, Powers, Duties & Section 166",
                                        "hindiTitle": "निदेशक: नियुक्ति, अयोग्यताएं, अधिकार, कर्तव्य एवं धारा 166",
                                        "description": "DIN requirement, independent directors, woman director, duties of directors, board meetings.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s4-dsc11-ch5",
                                        "number": 5,
                                        "title": "Meetings, Resolutions, Board Committees, Prevention of Oppression & Winding Up",
                                        "hindiTitle": "सभाएं, प्रस्ताव, बोर्ड समितियां, उत्पीड़न रोकथाम एवं कंपनी समापन",
                                        "description": "AGM, EGM, quorum, ordinary and special resolutions, winding up by NCLT, voluntary winding up.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s4-dsc12",
                            "paperNumber": "DSC-12",
                            "title": "Fundamentals of Entrepreneurship / Business Finance (उद्यमिता एवं व्यावसायिक वित्त)",
                            "marks": 100,
                            "description": "Entrepreneur traits, opportunity scanning, bankable project reports (DPR), seed capital, venture finance, MSME policies.",
                            "chapters": [
                                  {
                                        "id": "prsu-s4-dsc12-ch1",
                                        "number": 1,
                                        "title": "Meaning, Traits, Functions and Economic Role of Entrepreneurs",
                                        "hindiTitle": "उद्यमिता का अर्थ, विशेषताएं, कार्य एवं आर्थिक विकास में भूमिका",
                                        "description": "Schumpeter innovation model, entrepreneurial competencies, intrapreneurship.",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s4-dsc12-ch2",
                                        "number": 2,
                                        "title": "Ideation, Business Opportunity Scanning & Feasibility Analysis",
                                        "hindiTitle": "व्यावसायिक अवसर की पहचान, विचार सृजन एवं व्यवहार्यता विश्लेषण",
                                        "description": "Market, technical, financial and economic viability tests, SWOT analysis for new ventures.",
                                        "levels": {
                                              "min": 25,
                                              "max": 55
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s4-dsc12-ch3",
                                        "number": 3,
                                        "title": "Preparation of Bankable Detailed Project Report (DPR) & Pitch Decks",
                                        "hindiTitle": "विस्तृत परियोजना प्रतिवेदन (DPR) एवं निवेशक पिच डेक निर्माण",
                                        "description": "Cash flow projections, break-even point in project report, sensitivity analysis.",
                                        "levels": {
                                              "min": 30,
                                              "max": 60
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s4-dsc12-ch4",
                                        "number": 4,
                                        "title": "Startup Financing: Bootstrapping, Seed Capital, Angels, Venture Capital",
                                        "hindiTitle": "स्टार्टअप वित्तपोषण: बूटस्ट्रैपिंग, सीड कैपिटल, एंजेल एवं वेंचर कैपिटल",
                                        "description": "Stages of startup funding, term sheets, equity dilution, crowd-funding mechanisms.",
                                        "levels": {
                                              "min": 25,
                                              "max": 55
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s4-dsc12-ch5",
                                        "number": 5,
                                        "title": "MSME Support Ecosystem: PMEGP, Stand-Up India, SIDBI & Incubators",
                                        "hindiTitle": "एमएसएमई सहायता पारिस्थितिकी: PMEGP, स्टैंड-अप इंडिया, सिडबी व इनक्यूबेटर",
                                        "description": "Credit guarantee schemes, MSME Samadhaan for delayed payments, technology centers.",
                                        "levels": {
                                              "min": 25,
                                              "max": 55
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s4-ge4",
                            "paperNumber": "GE-4",
                            "title": "Generic Elective: Principles of Microeconomics (व्यष्टि अर्थशास्त्र के सिद्धांत)",
                            "marks": 100,
                            "description": "Open interdisciplinary pool elective: PPC, consumer optimization, production isoquants, market structures, game theory.",
                            "chapters": [
                                  {
                                        "id": "prsu-s4-ge4-ch1",
                                        "number": 1,
                                        "title": "Scarcity, Choice, Production Possibility Curve (PPC) & Opportunity Cost",
                                        "hindiTitle": "दुर्लभता, चयन, उत्पादन संभावना वक्र (PPC) एवं अवसर लागत",
                                        "description": "Central problems of an economy, marginal rate of transformation, shifts in PPC.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s4-ge4-ch2",
                                        "number": 2,
                                        "title": "Consumer Choice: Indifference Curves, Budget Constraints & Optimal Choice",
                                        "hindiTitle": "उपभोक्ता चयन: उदासीनता वक्र, बजट रेखा एवं इष्टतम उपभोग",
                                        "description": "Income and substitution effects (Hicks and Slutsky), Giffen goods, normal vs inferior goods.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s4-ge4-ch3",
                                        "number": 3,
                                        "title": "Production with One and Multiple Variable Inputs, Isoquants & Isocosts",
                                        "hindiTitle": "उत्पादन फलन: सम-उत्पाद वक्र, सम-लागत रेखा एवं उत्पादक संतुलन",
                                        "description": "Marginal rate of technical substitution (MRTS), expansion path, ridge lines.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s4-ge4-ch4",
                                        "number": 4,
                                        "title": "Market Structure: Perfect Competition, Monopoly & Price Discrimination",
                                        "hindiTitle": "बाजार संरचना: पूर्ण प्रतियोगिता, एकाधिकार एवं मूल्य विभेद",
                                        "description": "Short-run and long-run equilibrium, first, second, third degree price discrimination.",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s4-ge4-ch5",
                                        "number": 5,
                                        "title": "Monopolistic Competition, Oligopoly & Game Theory Basics",
                                        "hindiTitle": "एकाधिकारात्मक प्रतियोगिता, अल्पाधिकार एवं गेम थ्योरी की मूल बातें",
                                        "description": "Product differentiation, selling costs, kinked demand curve model, Prisoner's Dilemma.",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s4-aec4",
                            "paperNumber": "AEC-4",
                            "title": "Ability Enhancement Course: Professional Ethics & Human Values (व्यावसायिक नैतिकता)",
                            "marks": 100,
                            "description": "Ethics philosophy, corporate governance committees, accounting fraud case studies, workplace PoSH, green CSR.",
                            "chapters": [
                                  {
                                        "id": "prsu-s4-aec4-ch1",
                                        "number": 1,
                                        "title": "Philosophy of Ethics, Morality, Values & Integrity in Profession",
                                        "hindiTitle": "व्यावसायिक नैतिकता, सत्यनिष्ठा एवं मानवीय मूल्यों का दर्शन",
                                        "description": "Deontological vs teleological ethics, fundamental human values, ethical dilemmas in finance.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s4-aec4-ch2",
                                        "number": 2,
                                        "title": "Corporate Governance: Cadbury Report, Kumar Mangalam Birla Committee",
                                        "hindiTitle": "कॉर्पोरेट प्रशासन: कैडबरी समिति एवं कुमार मंगलम बिड़ला समिति",
                                        "description": "OECD principles of corporate governance, audit committee role, independent directors.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  },
                                  {
                                        "id": "prsu-s4-aec4-ch3",
                                        "number": 3,
                                        "title": "Ethical Issues in Accounting, Insider Trading & Corporate Frauds",
                                        "hindiTitle": "लेखांकन में नैतिक मुद्दे, भेदिया व्यापार एवं कॉर्पोरेट घोटाले",
                                        "description": "Creative accounting, Satyam scandal, Enron collapse, SEBI Prohibition of Insider Trading regulations.",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s4-aec4-ch4",
                                        "number": 4,
                                        "title": "Workplace Ethics, Harassment Prevention (PoSH Act) & Whistleblower Policies",
                                        "hindiTitle": "कार्यस्थल नैतिकता, पोश अधिनियम (PoSH) एवं विसलब्लोअर नीतियां",
                                        "description": "Internal Complaints Committee (ICC), gender equality, protection to whistleblowers under law.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  },
                                  {
                                        "id": "prsu-s4-aec4-ch5",
                                        "number": 5,
                                        "title": "Environmental Ethics, Sustainable Development & Green Business Practices",
                                        "hindiTitle": "पर्यावरणीय नैतिकता, सतत विकास एवं हरित व्यावसायिक व्यवहार",
                                        "description": "Carbon footprint tracking, zero liquid discharge, sustainable corporate reporting.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s4-vac2",
                            "paperNumber": "VAC-2",
                            "title": "Value Added Course: Summer Internship / Field Project (व्यावहारिक इंटर्नशिप)",
                            "marks": 100,
                            "description": "Field training in industry/banks/offices: organizational exposure, commercial transactions, project report, viva-voce.",
                            "chapters": [
                                  {
                                        "id": "prsu-s4-vac2-ch1",
                                        "number": 1,
                                        "title": "Internship Preparation, Organizational Structure & Corporate Etiquette",
                                        "hindiTitle": "इंटर्नशिप की तैयारी, संगठनात्मक संरचना एवं कॉर्पोरेट शिष्टाचार",
                                        "description": "Workplace expectations, reporting hierarchy, professional dress codes, confidentiality agreements.",
                                        "levels": {
                                              "min": 10,
                                              "max": 40
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s4-vac2-ch2",
                                        "number": 2,
                                        "title": "Practical Commerce Field Exposure: Banking, Accounting or Retail Operations",
                                        "hindiTitle": "व्यावहारिक वाणिज्य क्षेत्रीय अनुभव: बैंकिंग, लेखांकन अथवा खुदरा व्यापार",
                                        "description": "Observing real-world commercial transaction processing, cashier operations, invoicing desks.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  },
                                  {
                                        "id": "prsu-s4-vac2-ch3",
                                        "number": 3,
                                        "title": "Data Gathering, Daily Logbook Maintenance & Project Formulation",
                                        "hindiTitle": "समंक संकलन, दैनिक कार्य विवरण (लॉगबुक) एवं परियोजना रूपरेखा",
                                        "description": "Maintaining day-to-day activity logs signed by industry mentor, identifying project topics.",
                                        "levels": {
                                              "min": 15,
                                              "max": 45
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10
                                  },
                                  {
                                        "id": "prsu-s4-vac2-ch4",
                                        "number": 4,
                                        "title": "Analysis of Real-World Financial Transactions & Workflow Documentation",
                                        "hindiTitle": "व्यावहारिक वित्तीय लेन-देन का विश्लेषण एवं कार्यप्रवाह प्रलेखन",
                                        "description": "Case analysis of internal controls, cash flow bottlenecks, customer service workflows.",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s4-vac2-ch5",
                                        "number": 5,
                                        "title": "Internship Project Report Writing, Presentation & Viva-Voce Defense",
                                        "hindiTitle": "इंटर्नशिप रिपोर्ट लेखन, प्रस्तुतीकरण एवं मौखिक परीक्षा",
                                        "description": "Structure of standard project report (Introduction, Methodology, Findings, Recommendations).",
                                        "levels": {
                                              "min": 20,
                                              "max": 50
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  }
                            ]
                      }
                ]
          },
          {
                "id": "prsu-bcom-sem5",
                "title": "B.Com Semester 5 (PRSU / NEP)",
                "shortTitle": "B.Com Sem 5",
                "institution": "PRSU",
                "description": "Degree Level Fifth Semester: 5 Subjects, 20 Credits (DSC-13, DSC-14, DSC-15, DSE-1, SEC-3 / Internship).",
                "eligibility": "Completed B.Com Semester 4",
                "scheme": "NEP-2020 / PRSU Scheme (5-6 Subjects - 20 Credits)",
                "papers": [
                      {
                            "id": "prsu-s5-dsc13",
                            "paperNumber": "DSC-13",
                            "title": "Income Tax Law & Practice (आयकर विधान एवं व्यवहार)",
                            "marks": 100,
                            "description": "Income Tax Act 1961: Residential status, Salary, House Property, PGBP, Capital Gains, Deductions 80C-80U, Tax Slabs (AY 2025-26).",
                            "chapters": [
                                  {
                                        "id": "prsu-s5-dsc13-ch1",
                                        "number": 1,
                                        "title": "Basic Concepts, Scope of Total Income, Agricultural Income & Residential Status",
                                        "hindiTitle": "आयकर की मूल अवधारणाएं, कृषि आय एवं निवास स्थिति (Sec 2, 5, 6, 10)",
                                        "description": "Assessee, assessment year, previous year, residential test of individuals, tax incidence.",
                                        "levels": {
                                              "min": 25,
                                              "max": 60
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s5-dsc13-ch2",
                                        "number": 2,
                                        "title": "Income from Salaries: Allowances, Perquisites, Retirement Benefits & Sec 16",
                                        "hindiTitle": "वेतन से आय: भत्ते, अनुलाभ, सेवानिवृत्ति लाभ एवं मानक कटौती",
                                        "description": "HRA, gratuity, commuted pension, perquisites valuation, standard deduction ₹50,000/₹75,000.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s5-dsc13-ch3",
                                        "number": 3,
                                        "title": "Income from House Property: Annual Value & Deductions Sec 24",
                                        "hindiTitle": "मकान संपत्ति से आय: वार्षिक मूल्य एवं कटौतियां (Sec 22-27)",
                                        "description": "Gross annual value (GAV), municipal taxes, standard deduction Sec 24(a), interest Sec 24(b).",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s5-dsc13-ch4",
                                        "number": 4,
                                        "title": "Profits & Gains of Business or Profession (PGBP) & Capital Gains (Sec 28-55)",
                                        "hindiTitle": "व्यापार अथवा पेशे के लाभ एवं पूंजीगत लाभ (Sec 28-55)",
                                        "description": "Admissible expenses (30-37), disallowances (40, 40A), STCG Sec 111A, LTCG Sec 112A, exemptions Sec 54.",
                                        "levels": {
                                              "min": 35,
                                              "max": 70
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s5-dsc13-ch5",
                                        "number": 5,
                                        "title": "Deductions under Chapter VI-A (80C to 80U) & Total Tax Liability (AY 2025-26)",
                                        "hindiTitle": "सकल कुल आय से कटौतियां (80C से 80U) एवं कर दायित्व (AY 2025-26)",
                                        "description": "Deductions 80C, 80D, 80G, tax calculation under default New Scheme Sec 115BAC, rebate 87A.",
                                        "levels": {
                                              "min": 35,
                                              "max": 75
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s5-dsc14",
                            "paperNumber": "DSC-14",
                            "title": "Auditing (अंकेक्षण सिद्धान्त एवं व्यवहार)",
                            "marks": 100,
                            "description": "Audit principles, internal control, vouching, verification of assets/liabilities, company auditor appointment, powers, report.",
                            "chapters": [
                                  {
                                        "id": "prsu-s5-dsc14-ch1",
                                        "number": 1,
                                        "title": "Meaning, Nature, Objectives & Basic Principles of Auditing",
                                        "hindiTitle": "अंकेक्षण का अर्थ, प्रकृति, उद्देश्य एवं मूलभूत सिद्धांत",
                                        "description": "Continuous audit, interim audit, statutory audit, internal audit, distinction with accounting.",
                                        "levels": {
                                              "min": 25,
                                              "max": 55
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s5-dsc14-ch2",
                                        "number": 2,
                                        "title": "Internal Control, Internal Check, Audit Programme & Working Papers",
                                        "hindiTitle": "आंतरिक नियंत्रण, आंतरिक निरीक्षण, अंकेक्षण कार्यक्रम एवं कार्यपत्रक",
                                        "description": "Auditor's evaluation of internal controls, test checking, audit working papers, audit notebook.",
                                        "levels": {
                                              "min": 30,
                                              "max": 60
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s5-dsc14-ch3",
                                        "number": 3,
                                        "title": "Vouching: Cash Book, Purchases, Sales, Deferred Revenue & Ledger",
                                        "hindiTitle": "प्रमाणन: रोकड़, क्रय, विक्रय, आस्थगित आयगत व्यय एवं खाता बही",
                                        "description": "Voucher examination, missing vouchers, vouching of wages, capital vs revenue payments.",
                                        "levels": {
                                              "min": 35,
                                              "max": 65
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s5-dsc14-ch4",
                                        "number": 4,
                                        "title": "Verification and Valuation of Fixed, Current & Intangible Assets and Liabilities",
                                        "hindiTitle": "स्थाई, चालू व अमूर्त संपत्तियों एवं दायित्वों का सत्यापन तथा मूल्यांकन",
                                        "description": "Verification of plant, goodwill, inventory valuation (AS-2), contingent liabilities verification.",
                                        "levels": {
                                              "min": 35,
                                              "max": 70
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s5-dsc14-ch5",
                                        "number": 5,
                                        "title": "Company Auditor: Appointment, Qualifications, Powers, Duties & Audit Reports",
                                        "hindiTitle": "कंपनी अंकेक्षक: नियुक्ति, अधिकार, कर्तव्य एवं अंकेक्षण प्रतिवेदन (Sec 139-147)",
                                        "description": "Qualification, disqualifications, rotation of auditors, clean vs qualified vs adverse audit report.",
                                        "levels": {
                                              "min": 40,
                                              "max": 75
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s5-dsc15",
                            "paperNumber": "DSC-15",
                            "title": "Principles of Marketing / Financial Management (विपणन एवं वित्तीय प्रबंध)",
                            "marks": 100,
                            "description": "Capital budgeting (NPV/IRR), cost of capital (WACC), leverages, capital structure, working capital management.",
                            "chapters": [
                                  {
                                        "id": "prsu-s5-dsc15-ch1",
                                        "number": 1,
                                        "title": "Financial Management: Objectives, Wealth Maximization, Time Value of Money",
                                        "hindiTitle": "वित्तीय प्रबंध: उद्देश्य, संपदा अधिकतमीकरण एवं मुद्रा का समय मूल्य",
                                        "description": "Finance function, profit vs wealth maximization, present value and future value discounting.",
                                        "levels": {
                                              "min": 25,
                                              "max": 55
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 12,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s5-dsc15-ch2",
                                        "number": 2,
                                        "title": "Capital Budgeting Decisions: Payback Period, Net Present Value (NPV), IRR & PI",
                                        "hindiTitle": "पूंजी बजटिंग तकनीकें: शुद्ध वर्तमान मूल्य (NPV) एवं आंतरिक प्रत्याय दर (IRR)",
                                        "description": "Discounted cash flow techniques, NPV vs IRR conflict, capital rationing, project feasibility.",
                                        "levels": {
                                              "min": 40,
                                              "max": 75
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s5-dsc15-ch3",
                                        "number": 3,
                                        "title": "Cost of Capital: Cost of Debt, Equity, Retained Earnings & WACC",
                                        "hindiTitle": "पूंजी की लागत: ऋण, अंश, प्रतिधारित आय एवं भारित औसत पूंजी लागत (WACC)",
                                        "description": "Cost of debt (Kd), preference (Kp), equity (Ke) via CAPM, book value vs market value weights.",
                                        "levels": {
                                              "min": 40,
                                              "max": 75
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s5-dsc15-ch4",
                                        "number": 4,
                                        "title": "Capital Structure Theories & Leverage Analysis (EBIT-EPS, Operating & Financial)",
                                        "hindiTitle": "पूंजी संरचना सिद्धांत एवं उत्तोलक विश्लेषण (EBIT-EPS, परिचालन व वित्तीय उत्तोलक)",
                                        "description": "Net Income, Net Operating Income, MM Theory without/with taxes, Operating & Financial Leverage.",
                                        "levels": {
                                              "min": 40,
                                              "max": 75
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s5-dsc15-ch5",
                                        "number": 5,
                                        "title": "Working Capital Management: Operating Cycle, Cash, Inventory & Receivables",
                                        "hindiTitle": "कार्यशील पूंजी प्रबंधन: परिचालन चक्र, रोकड़, स्कंध एवं देनदार प्रबंधन",
                                        "description": "Gross vs net working capital, estimation of working capital requirement, cash budgets.",
                                        "levels": {
                                              "min": 35,
                                              "max": 70
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s5-dse1",
                            "paperNumber": "DSE-1",
                            "title": "Discipline Specific Elective: Financial Services & Institutions (वित्तीय सेवाएं एवं संस्थान)",
                            "marks": 100,
                            "description": "Specialized Finance Group Paper 1: Merchant banking, mutual funds, leasing, factoring, credit rating agencies, venture finance.",
                            "chapters": [
                                  {
                                        "id": "prsu-s5-dse1-ch1",
                                        "number": 1,
                                        "title": "Financial System in India: Money Market, Capital Market & Regulatory Structure",
                                        "hindiTitle": "भारतीय वित्तीय प्रणाली: मुद्रा बाजार, पूंजी बाजार एवं नियामक ढांचा",
                                        "description": "Call money market, commercial paper, treasury bills, role of SEBI and RBI in capital markets.",
                                        "levels": {
                                              "min": 25,
                                              "max": 60
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s5-dse1-ch2",
                                        "number": 2,
                                        "title": "Merchant Banking, Issue Management, Underwriting & Book Building",
                                        "hindiTitle": "मर्चेंट बैंकिंग, इश्यू मैनेजमेंट, हामीदारी एवं बुक बिल्डिंग प्रक्रिया",
                                        "description": "Pre-issue and post-issue activities, SEBI ICDR regulations, role of lead managers.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s5-dse1-ch3",
                                        "number": 3,
                                        "title": "Mutual Funds: Types of Schemes, NAV Determination & SEBI Mutual Fund Regulations",
                                        "hindiTitle": "म्यूचुअल फंड: योजनाओं के प्रकार, एनएवी (NAV) निर्धारण एवं सेबी नियम",
                                        "description": "Open-ended vs close-ended funds, equity, debt and hybrid funds, AMFI code of ethics.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s5-dse1-ch4",
                                        "number": 4,
                                        "title": "Lease Financing, Hire Purchase Finance, Factoring & Forfaiting Services",
                                        "hindiTitle": "पट्टा वित्तपोषण, किराया क्रय वित्त, फैक्टरिंग एवं फॉरफेटिंग सेवाएं",
                                        "description": "Financial lease vs operating lease, recourse vs non-recourse factoring, export forfaiting.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s5-dse1-ch5",
                                        "number": 5,
                                        "title": "Credit Rating Agencies (CRISIL, ICRA, CARE), Venture Capital & Housing Finance",
                                        "hindiTitle": "क्रेडिट रेटिंग एजेंसियां (CRISIL, ICRA), वेंचर कैपिटल एवं आवास वित्त",
                                        "description": "Rating methodology, symbols, benefits to investors, NHB and affordable housing finance.",
                                        "levels": {
                                              "min": 25,
                                              "max": 60
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s5-sec3",
                            "paperNumber": "SEC-3",
                            "title": "Skill Enhancement Course / Practical Internship: Financial Analysis & Modeling",
                            "marks": 100,
                            "description": "Hands-on financial modeling: Advanced Excel, 3-statement financial modeling, DCF valuation, loan amortization schedules.",
                            "chapters": [
                                  {
                                        "id": "prsu-s5-sec3-ch1",
                                        "number": 1,
                                        "title": "Excel for Financial Modeling: Functions, Pivot Tables, What-If Analysis",
                                        "hindiTitle": "वित्तीय मॉडलिंग के लिए एक्सेल: फलन, पिवट टेबल एवं व्हॉट-इफ विश्लेषण",
                                        "description": "Data tables, goal seek, scenario manager, INDEX-MATCH, OFFSET, dynamic charting.",
                                        "levels": {
                                              "min": 20,
                                              "max": 55
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s5-sec3-ch2",
                                        "number": 2,
                                        "title": "Financial Statement Modeling: Building Integrated P&L, Balance Sheet & Cash Flow",
                                        "hindiTitle": "वित्तीय विवरण मॉडलिंग: एकीकृत लाभ-हानि, बैलेंस शीट एवं रोकड़ प्रवाह निर्माण",
                                        "description": "Linking revenue schedules, debt schedules, working capital drivers into integrated statements.",
                                        "levels": {
                                              "min": 30,
                                              "max": 70
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s5-sec3-ch3",
                                        "number": 3,
                                        "title": "Valuation Modeling: Discounted Cash Flow (DCF) & Relative Valuation",
                                        "hindiTitle": "मूल्यांकन मॉडलिंग: बट्टाकृत रोकड़ प्रवाह (DCF) एवं सापेक्ष मूल्यांकन",
                                        "description": "Free Cash Flow to Firm (FCFF), Terminal Value estimation, PE and EV/EBITDA multiples.",
                                        "levels": {
                                              "min": 35,
                                              "max": 75
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s5-sec3-ch4",
                                        "number": 4,
                                        "title": "Loan Amortization Schedules & Capital Investment Project Modeling",
                                        "hindiTitle": "ऋण परिशोधन अनुसूची एवं पूंजी निवेश परियोजना मॉडलिंग",
                                        "description": "Principal and interest breakup, balloon payments, project IRR and NPV calculation tables.",
                                        "levels": {
                                              "min": 25,
                                              "max": 60
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s5-sec3-ch5",
                                        "number": 5,
                                        "title": "Financial Dashboard Design, Sensitivity Analysis & Executive Presentation",
                                        "hindiTitle": "वित्तीय डैशबोर्ड डिजाइन, संवेदनशीलता विश्लेषण एवं कार्यकारी प्रस्तुति",
                                        "description": "Building interactive KPI visual summaries, tornado charts, presenting models to CFOs.",
                                        "levels": {
                                              "min": 25,
                                              "max": 60
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  }
                            ]
                      }
                ]
          },
          {
                "id": "prsu-bcom-sem6",
                "title": "B.Com Semester 6 (PRSU / NEP)",
                "shortTitle": "B.Com Sem 6",
                "institution": "PRSU",
                "description": "Degree Level Final Semester: 5 Subjects, 20 Credits (DSC-16, DSC-17, DSC-18, DSE-2, Research Project / Dissertation).",
                "eligibility": "Completed B.Com Semester 5",
                "scheme": "NEP-2020 / PRSU Scheme (5-6 Subjects - 20 Credits)",
                "papers": [
                      {
                            "id": "prsu-s6-dsc16",
                            "paperNumber": "DSC-16",
                            "title": "Indirect Taxes with GST (जीएसटी एवं अप्रत्यक्ष कर विधान)",
                            "marks": 100,
                            "description": "Constitutional framework, Supply (Sec 7), ITC (Sec 16, 17(5)), Composition levy (Sec 10), Returns, Customs valuation.",
                            "chapters": [
                                  {
                                        "id": "prsu-s6-dsc16-ch1",
                                        "number": 1,
                                        "title": "Constitutional Basis, CGST/SGST/IGST Architecture & Concept of Supply (Sec 7)",
                                        "hindiTitle": "जीएसटी का संवैधानिक आधार, सीजीएसटी/एसजीएसटी ढांचा एवं आपूर्ति की अवधारणा",
                                        "description": "101st Constitutional Amendment, dual GST model, taxable event: supply vs sale, composite/mixed supply.",
                                        "levels": {
                                              "min": 40,
                                              "max": 75
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s6-dsc16-ch2",
                                        "number": 2,
                                        "title": "Time, Place & Value of Supply (Sec 12, 13, 15) & Composition Levy Scheme (Sec 10)",
                                        "hindiTitle": "आपूर्ति का समय, स्थान व मूल्य तथा समाधान योजना (Sec 10)",
                                        "description": "Time of supply of goods/services, transaction value Sec 15, composition eligibility & tax rates.",
                                        "levels": {
                                              "min": 45,
                                              "max": 80
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s6-dsc16-ch3",
                                        "number": 3,
                                        "title": "Input Tax Credit (ITC): Eligibility (Sec 16), Blocked Credits (Sec 17(5)) & Reversal",
                                        "hindiTitle": "इनपुट टैक्स क्रेडिट (ITC): पात्रता (Sec 16) एवं रोकी गई छूट (Sec 17(5))",
                                        "description": "Conditions for taking ITC, blocked credits under Sec 17(5), electronic ledger utilization hierarchy.",
                                        "levels": {
                                              "min": 50,
                                              "max": 85
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s6-dsc16-ch4",
                                        "number": 4,
                                        "title": "Registration Procedures, Tax Invoice, E-Way Bill & Filing of Returns (GSTR-1, 3B)",
                                        "hindiTitle": "पंजीकरण, कर बीजक, ई-वे बिल एवं विवरणी दाखिल करना (GSTR-1, 3B)",
                                        "description": "Threshold limits for registration, mandatory e-invoicing, GSTR-1, GSTR-3B monthly compliance.",
                                        "levels": {
                                              "min": 45,
                                              "max": 80
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s6-dsc16-ch5",
                                        "number": 5,
                                        "title": "Customs Law: Types of Customs Duties, Assessable Value, Import & Export Procedures",
                                        "hindiTitle": "सीमा शुल्क कानून: शुल्कों के प्रकार, कर योग्य मूल्य एवं आयात-निर्यात प्रक्रिया",
                                        "description": "Basic customs duty, IGST on imports, anti-dumping duty, assessable value calculation (CIF).",
                                        "levels": {
                                              "min": 40,
                                              "max": 75
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s6-dsc17",
                            "paperNumber": "DSC-17",
                            "title": "Management Accounting (प्रबंधकीय लेखांकन)",
                            "marks": 100,
                            "description": "Ratio analysis, Cash Flow Statement (AS-3), Marginal costing, CVP & Break-Even analysis, Budgetary control.",
                            "chapters": [
                                  {
                                        "id": "prsu-s6-dsc17-ch1",
                                        "number": 1,
                                        "title": "Nature, Functions, Scope & Distinction with Financial and Cost Accounting",
                                        "hindiTitle": "प्रबंधकीय लेखांकन की प्रकृति, कार्य, क्षेत्र एवं वित्तीय/लागत लेखांकन से अंतर",
                                        "description": "Role of management accountant in corporate strategy, tools and techniques of management accounting.",
                                        "levels": {
                                              "min": 25,
                                              "max": 55
                                        },
                                        "topicsCount": 6,
                                        "estimatedHours": 10,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s6-dsc17-ch2",
                                        "number": 2,
                                        "title": "Ratio Analysis: Liquidity, Solvency, Turnover & Profitability Ratios",
                                        "hindiTitle": "अनुपात विश्लेषण: तरलता, शोधन क्षमता, आवर्त एवं लाभदायकता अनुपात",
                                        "description": "Current ratio, quick ratio, debt-equity, inventory turnover, debtors turnover, ROE, DuPont analysis.",
                                        "levels": {
                                              "min": 30,
                                              "max": 70
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s6-dsc17-ch3",
                                        "number": 3,
                                        "title": "Cash Flow Statement as per Accounting Standard 3 (AS-3 Revised)",
                                        "hindiTitle": "रोकड़ प्रवाह विवरण: लेखांकन मानक 3 (AS-3 संशोधित) के अनुसार",
                                        "description": "Cash from operating activities (indirect method), investing activities, financing activities.",
                                        "levels": {
                                              "min": 35,
                                              "max": 75
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s6-dsc17-ch4",
                                        "number": 4,
                                        "title": "Marginal Costing, Cost-Volume-Profit (CVP) Analysis & Break-Even Point (BEP)",
                                        "hindiTitle": "सीमांत लागत, लागत-मात्रा-लाभ (CVP) विश्लेषण एवं सम-विच्छेद बिंदु (BEP)",
                                        "description": "Contribution, P/V ratio, Break-even sales, Margin of safety, decision making problems.",
                                        "levels": {
                                              "min": 35,
                                              "max": 75
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s6-dsc17-ch5",
                                        "number": 5,
                                        "title": "Budgetary Control: Classification of Budgets, Cash Budget & Flexible Budget",
                                        "hindiTitle": "बजटीय नियंत्रण: बजटों का वर्गीकरण, रोकड़ बजट एवं लोचशील बजट",
                                        "description": "Budget manual, principal budget factor, preparation of flexible budget at different activity levels.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s6-dsc18",
                            "paperNumber": "DSC-18",
                            "title": "Financial Market Operations / E-Commerce (वित्तीय बाजार परिचालन एवं ई-कॉमर्स)",
                            "marks": 100,
                            "description": "Stock exchanges (BSE/NSE), IPOs, book building, SEBI regulations, payment systems (UPI), cyber security in commerce.",
                            "chapters": [
                                  {
                                        "id": "prsu-s6-dsc18-ch1",
                                        "number": 1,
                                        "title": "Financial Markets in India: Primary Market, IPOs, FPOs & Book Building",
                                        "hindiTitle": "भारतीय वित्तीय बाजार: प्राथमिक बाजार, आईपीओ, एफपीओ एवं बुक बिल्डिंग",
                                        "description": "Public issue mechanism, ASBA facility, retail and institutional quota, price discovery.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s6-dsc18-ch2",
                                        "number": 2,
                                        "title": "Secondary Market: Stock Exchanges (BSE, NSE), Trading Mechanism & T+1 Settlement",
                                        "hindiTitle": "द्वितीयक बाजार: शेयर बाजार (BSE, NSE), ट्रेडिंग प्रणाली एवं T+1 निपटान",
                                        "description": "Screen-based trading, order types, demat accounts, clearing corporation operations.",
                                        "levels": {
                                              "min": 35,
                                              "max": 70
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s6-dsc18-ch3",
                                        "number": 3,
                                        "title": "Securities and Exchange Board of India (SEBI): Role, Powers & Investor Protection",
                                        "hindiTitle": "भारतीय प्रतिभूति एवं विनिमय बोर्ड (सेबी): भूमिका, अधिकार एवं निवेशक संरक्षण",
                                        "description": "SCORES platform, insider trading prohibitions, regulation of brokers and depositories.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s6-dsc18-ch4",
                                        "number": 4,
                                        "title": "E-Commerce Architecture, Payment Gateways, UPI, Digital Wallets & Mobile Commerce",
                                        "hindiTitle": "ई-कॉमर्स वास्तुकला, भुगतान गेटवे, यूपीआई, डिजिटल वॉलेट्स एवं मोबाइल कॉमर्स",
                                        "description": "B2B, B2C, C2C business models, payment gateway aggregators, QR-code payment rails.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s6-dsc18-ch5",
                                        "number": 5,
                                        "title": "Cyber Security in Financial Transactions, Cryptography, SSL & IT Act 2000",
                                        "hindiTitle": "वित्तीय लेन-देन में साइबर सुरक्षा, कूटलेखन, एसएसएल एवं आईटी अधिनियम 2000",
                                        "description": "Symmetric vs asymmetric encryption, phishing and ransomware defense, legal validity of digital signatures.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s6-dse2",
                            "paperNumber": "DSE-2",
                            "title": "Discipline Specific Elective: Security Analysis & Portfolio Management",
                            "marks": 100,
                            "description": "Specialized Finance Group Paper 2: Risk-return analysis, fundamental EIC analysis, technical charts, Markowitz, CAPM.",
                            "chapters": [
                                  {
                                        "id": "prsu-s6-dse2-ch1",
                                        "number": 1,
                                        "title": "Investment Environment, Risk-Return Tradeoff, Systematic vs Unsystematic Risk",
                                        "hindiTitle": "निवेश पर्यावरण, जोखिम-प्रतिफल संतुलन, व्यवस्थित बनाम अव्यवस्थित जोखिम",
                                        "description": "Measurement of returns, variance, standard deviation, beta coefficient computation.",
                                        "levels": {
                                              "min": 35,
                                              "max": 75
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s6-dse2-ch2",
                                        "number": 2,
                                        "title": "Fundamental Analysis: Economic Analysis, Industry Analysis & Company Analysis (EIC)",
                                        "hindiTitle": "मौलिक विश्लेषण: आर्थिक, उद्योग एवं कंपनी स्तर विश्लेषण (EIC फ्रेमवर्क)",
                                        "description": "Macroeconomic indicators, industry life cycle, financial ratios analysis, management quality.",
                                        "levels": {
                                              "min": 35,
                                              "max": 75
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s6-dse2-ch3",
                                        "number": 3,
                                        "title": "Technical Analysis: Dow Theory, Chart Patterns, Trendlines, Moving Averages & RSI",
                                        "hindiTitle": "तकनीकी विश्लेषण: डाउ सिद्धांत, चार्ट पैटर्न, मूविंग एवरेज एवं आरएसआई (RSI)",
                                        "description": "Candlestick patterns, head and shoulders, support and resistance levels, momentum indicators.",
                                        "levels": {
                                              "min": 35,
                                              "max": 75
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s6-dse2-ch4",
                                        "number": 4,
                                        "title": "Efficient Market Hypothesis (EMH): Weak, Semi-Strong & Strong Form Efficiency",
                                        "hindiTitle": "दक्ष बाजार परिकल्पना (EMH): कमजोर, अर्ध-मजबूत एवं मजबूत दक्षता",
                                        "description": "Random walk theory, empirical tests of market efficiency, behavioral finance anomalies.",
                                        "levels": {
                                              "min": 30,
                                              "max": 70
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s6-dse2-ch5",
                                        "number": 5,
                                        "title": "Portfolio Theory: Markowitz Model, Sharpe Single Index & Capital Asset Pricing Model (CAPM)",
                                        "hindiTitle": "पोर्टफोलियो सिद्धांत: मार्कोविट्ज़ मॉडल, शार्प मॉडल एवं सीएपीएम (CAPM)",
                                        "description": "Efficient frontier, optimal portfolio selection, Security Market Line (SML), Capital Market Line (CML).",
                                        "levels": {
                                              "min": 40,
                                              "max": 85
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 18
                                  }
                            ]
                      },
                      {
                            "id": "prsu-s6-proj",
                            "paperNumber": "PROJ",
                            "title": "Research Project / Dissertation / Field Work (शोध परियोजना / फील्ड वर्क)",
                            "marks": 100,
                            "description": "Capstone Undergraduate Project: Research methodology, literature review, sampling, data analysis (SPSS/Excel), viva defense.",
                            "chapters": [
                                  {
                                        "id": "prsu-s6-proj-ch1",
                                        "number": 1,
                                        "title": "Fundamentals of Business Research Methodology: Problem Identification & Design",
                                        "hindiTitle": "व्यावसायिक अनुसंधान पद्धति के मूल तत्व: समस्या पहचान एवं अनुसंधान रूपरेखा",
                                        "description": "Exploratory vs descriptive vs causal research design, formulating research questions.",
                                        "levels": {
                                              "min": 25,
                                              "max": 60
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12,
                                        "isCompleted": true
                                  },
                                  {
                                        "id": "prsu-s6-proj-ch2",
                                        "number": 2,
                                        "title": "Literature Review, Hypothesis Formulation & Conceptual Framework",
                                        "hindiTitle": "साहित्य समीक्षा, परिकल्पना निर्माण एवं वैचारिक ढांचा",
                                        "description": "Identifying research gaps from indexed journals, null vs alternative hypotheses.",
                                        "levels": {
                                              "min": 25,
                                              "max": 60
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 12
                                  },
                                  {
                                        "id": "prsu-s6-proj-ch3",
                                        "number": 3,
                                        "title": "Sampling Techniques, Questionnaire Design & Primary/Secondary Data Collection",
                                        "hindiTitle": "प्रतिचयन तकनीकें, प्रश्नावली निर्माण एवं प्राथमिक व द्वितीयक समंक संकलन",
                                        "description": "Probability vs non-probability sampling, Likert scale measurement, pilot testing surveys.",
                                        "levels": {
                                              "min": 30,
                                              "max": 65
                                        },
                                        "topicsCount": 7,
                                        "estimatedHours": 14
                                  },
                                  {
                                        "id": "prsu-s6-proj-ch4",
                                        "number": 4,
                                        "title": "Data Processing, Statistical Analysis (SPSS/Excel) & Interpretation of Findings",
                                        "hindiTitle": "समंक प्रसंस्करण, सांख्यिकीय विश्लेषण (एक्सेल/एसपीएसएस) एवं निष्कर्ष",
                                        "description": "Descriptive statistics, chi-square tests, correlation and regression testing of hypotheses.",
                                        "levels": {
                                              "min": 35,
                                              "max": 70
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  },
                                  {
                                        "id": "prsu-s6-proj-ch5",
                                        "number": 5,
                                        "title": "Dissertation Writing, Referencing (APA), Executive Summary & Viva-Voce Defense",
                                        "hindiTitle": "शोध प्रबंध लेखन, संदर्भ सूची (APA), सारांश एवं मौखिक परीक्षा रक्षा",
                                        "description": "Report chapters layout, bibliography management, preparing presentation slides for viva defense.",
                                        "levels": {
                                              "min": 35,
                                              "max": 70
                                        },
                                        "topicsCount": 8,
                                        "estimatedHours": 16
                                  }
                            ]
                      }
                ]
          }
    ]
  },
  {
    id: "acca",
    name: "Association of Chartered Certified Accountants",
    shortName: "ACCA",
    badgeColor: "bg-red-600 text-white",
    description: "Global professional accounting body offering the Chartered Certified Accountant qualification recognized in 180+ countries.",
    officialUrl: "https://www.accaglobal.com",
    levels: [
      {
        id: "acca-knowledge",
        title: "ACCA Applied Knowledge",
        shortTitle: "Applied Knowledge",
        institution: "ACCA",
        description: "The starting point for the ACCA Qualification, covering broad introduction to finance and accounting.",
        eligibility: "10+2 passed or equivalent higher secondary education",
        scheme: "ACCA Global Qualification Framework (3 Papers)",
        papers: [
          {
            id: "acca-bt",
            paperNumber: "BT/FBT",
            title: "Business and Technology",
            marks: 100,
            description: "Understand business environment, corporate governance, organizational structure, leadership, and ethical compliance.",
            chapters: [
              { id: "acca-bt-ch1", number: 1, title: "The Business Organization, Stakeholders & External Environment", hindiTitle: "व्यावसायिक संगठन, हितधारक एवं बाह्य वातावरण", description: "Types of organization, stakeholder mapping (Mendelow matrix), PESTEL macro-environment.", levels: { min: 0, max: 25 }, topicsCount: 6, estimatedHours: 10 },
              { id: "acca-bt-ch2", number: 2, title: "Corporate Governance, Ethics & Professional Regulation", hindiTitle: "कॉर्पोरेट गवर्नेंस, नैतिकता एवं व्यावसायिक विनियमन", description: "OECD governance principles, directors' duties, IFAC code of ethics, whistleblowing.", levels: { min: 10, max: 35 }, topicsCount: 5, estimatedHours: 8 }
            ]
          },
          {
            id: "acca-ma",
            paperNumber: "MA/FMA",
            title: "Management Accounting",
            marks: 100,
            description: "Management information, cost classification, budgeting, standard costing, and performance measurement.",
            chapters: [
              { id: "acca-ma-ch1", number: 1, title: "Cost Classification, Behavior and Overhead Absorption", hindiTitle: "लागत वर्गीकरण एवं ओवरहेड अवशोषण", description: "Direct vs indirect, fixed vs variable, stepped costs, absorption costing vs marginal costing.", levels: { min: 15, max: 40 }, topicsCount: 7, estimatedHours: 12 },
              { id: "acca-ma-ch2", number: 2, title: "Budgeting, Variance Analysis & Performance Evaluation", hindiTitle: "बजट निर्माण, विचरण विश्लेषण एवं प्रदर्शन मूल्यांकन", description: "Master budget, flexed budget, material/labor variances, ROI and Residual Income (RI).", levels: { min: 25, max: 50 }, topicsCount: 8, estimatedHours: 14 }
            ]
          },
          {
            id: "acca-fa",
            paperNumber: "FA/FFA",
            title: "Financial Accounting",
            marks: 100,
            description: "Double-entry accounting, trial balance, preparation of financial statements under IFRS.",
            chapters: [
              { id: "acca-fa-ch1", number: 1, title: "Double-Entry Bookkeeping & Trial Balance under IFRS", hindiTitle: "दोहरा लेखा प्रणाली एवं तलपट (IFRS के अंतर्गत)", description: "Recording transactions, ledger accounting, correction of errors, suspense accounts.", levels: { min: 10, max: 35 }, topicsCount: 8, estimatedHours: 14 },
              { id: "acca-fa-ch2", number: 2, title: "Preparation of Financial Statements (IAS 1 & IFRS)", hindiTitle: "वित्तीय विवरणों का निर्माण (IAS 1 एवं IFRS)", description: "Statement of Profit or Loss, Statement of Financial Position, Statement of Cash Flows (IAS 7).", levels: { min: 25, max: 55 }, topicsCount: 9, estimatedHours: 16 }
            ]
          }
        ]
      },
      {
        id: "acca-skills",
        title: "ACCA Applied Skills",
        shortTitle: "Applied Skills",
        institution: "ACCA",
        description: "Intermediate professional level developing technical knowledge across 6 papers in law, performance, tax, reporting, audit and finance.",
        eligibility: "Completed Applied Knowledge or relevant degree exemptions",
        scheme: "ACCA Global Qualification Framework (6 Papers)",
        papers: [
          {
            id: "acca-lw",
            paperNumber: "LW",
            title: "Corporate and Business Law",
            marks: 100,
            description: "Legal frameworks, contract law, employment law, agency, company formation, capital and management.",
            chapters: [
              { id: "acca-lw-ch1", number: 1, title: "Essential Elements of Legal Systems & Law of Obligations", hindiTitle: "कानूनी प्रणालियां एवं अनुबंध कानून", description: "Sources of law, court structure, breach of contract, tort of negligence.", levels: { min: 35, max: 70 }, topicsCount: 7, estimatedHours: 14 }
            ]
          },
          {
            id: "acca-pm",
            paperNumber: "PM",
            title: "Performance Management",
            marks: 100,
            description: "Specialist cost and management accounting techniques, decision-making, budgeting, standard costing and control.",
            chapters: [
              { id: "acca-pm-ch1", number: 1, title: "Advanced Costing Techniques & Decision Analysis", hindiTitle: "उन्नत लागत तकनीकें एवं निर्णय विश्लेषण", description: "Activity-based costing, target costing, life-cycle costing, limiting factor analysis, pricing.", levels: { min: 40, max: 75 }, topicsCount: 8, estimatedHours: 16 }
            ]
          },
          {
            id: "acca-tx",
            paperNumber: "TX",
            title: "Taxation",
            marks: 100,
            description: "Income tax, corporation tax, capital gains tax, inheritance tax, and value added tax (VAT).",
            chapters: [
              { id: "acca-tx-ch1", number: 1, title: "Individual & Corporate Tax Liability Computations", hindiTitle: "व्यक्तिगत एवं कॉर्पोरेट कर दायित्व संगणना", description: "Trading income, capital allowances, corporation tax computation, VAT mechanics.", levels: { min: 40, max: 75 }, topicsCount: 9, estimatedHours: 18 }
            ]
          },
          {
            id: "acca-fr",
            paperNumber: "FR",
            title: "Financial Reporting",
            marks: 100,
            description: "Single entity and group accounts under IFRS, accounting standards application and financial analysis.",
            chapters: [
              { id: "acca-fr-ch1", number: 1, title: "Group Financial Statements (Consolidated Balance Sheet & P&L)", hindiTitle: "समूह वित्तीय विवरण (समेकित बैलेंस शीट व लाभ-हानि)", description: "IFRS 10 Consolidated Financial Statements, IFRS 3 Business Combinations, Goodwill and NCI calculations.", levels: { min: 45, max: 80 }, topicsCount: 10, estimatedHours: 20 },
              { id: "acca-fr-ch2", number: 2, title: "Leases (IFRS 16) & Revenue Recognition (IFRS 15)", hindiTitle: "पट्टे (IFRS 16) एवं राजस्व अभिज्ञान (IFRS 15)", description: "Right-of-use asset, lease liability, 5-step revenue model application.", levels: { min: 40, max: 75 }, topicsCount: 7, estimatedHours: 15 }
            ]
          },
          {
            id: "acca-aa",
            paperNumber: "AA",
            title: "Audit and Assurance",
            marks: 100,
            description: "Audit framework, internal audit, planning and risk assessment, internal control, audit evidence and reporting.",
            chapters: [
              { id: "acca-aa-ch1", number: 1, title: "Audit Planning, Risk Assessment & Internal Control (ISA)", hindiTitle: "अंकेक्षण योजना, जोखिम मूल्यांकन एवं आंतरिक नियंत्रण", description: "Audit risk model, testing controls, substantive procedures, auditor's report under ISA 700.", levels: { min: 45, max: 80 }, topicsCount: 8, estimatedHours: 16 }
            ]
          },
          {
            id: "acca-fm",
            paperNumber: "FM",
            title: "Financial Management",
            marks: 100,
            description: "Investment appraisal, working capital management, business valuation, and risk management.",
            chapters: [
              { id: "acca-fm-ch1", number: 1, title: "Advanced Investment Appraisal: NPV, IRR & MIRR", hindiTitle: "उन्नत निवेश मूल्यांकन: एनपीवी, आईआरआर एवं एमआईआरआर", description: "Discounted cash flow, taxation and inflation effects, project specific cost of capital.", levels: { min: 40, max: 75 }, topicsCount: 8, estimatedHours: 16 },
              { id: "acca-fm-ch2", number: 2, title: "Cost of Capital (WACC) & Capital Structure Decisions", hindiTitle: "पूंजी की लागत (WACC) एवं पूंजी संरचना निर्णय", description: "CAPM, Dividend Growth Model, Modigliani-Miller theorems, gearing and risk.", levels: { min: 45, max: 80 }, topicsCount: 7, estimatedHours: 14 }
            ]
          }
        ]
      },
      {
        id: "acca-professional",
        title: "ACCA Strategic Professional",
        shortTitle: "Strategic Professional",
        institution: "ACCA",
        description: "Advanced leadership, corporate governance, strategic advisory and complex financial management.",
        eligibility: "Completed Applied Skills level",
        scheme: "ACCA Global Qualification Framework (4 Papers)",
        papers: [
          {
            id: "acca-sbl",
            paperNumber: "SBL",
            title: "Strategic Business Leader",
            marks: 100,
            description: "Integrated case study testing leadership, ethical decisions, risk management, and strategic execution.",
            chapters: [
              { id: "acca-sbl-ch1", number: 1, title: "Leadership, Strategic Choice & Organizational Transformation", hindiTitle: "नेतृत्व, रणनीतिक चयन एवं संगठनात्मक परिवर्तन", description: "Porter's 5 Forces, Ansoff matrix, stakeholder management, change management models.", levels: { min: 65, max: 95 }, topicsCount: 8, estimatedHours: 22 }
            ]
          },
          {
            id: "acca-sbr",
            paperNumber: "SBR",
            title: "Strategic Business Reporting",
            marks: 100,
            description: "Professional judgment in complex IFRS applications, group restructurings, and ethical financial reporting.",
            chapters: [
              { id: "acca-sbr-ch1", number: 1, title: "Complex Financial Instruments (IFRS 9) & Employee Benefits (IAS 19)", hindiTitle: "जटिल वित्तीय उपकरण एवं कर्मचारी लाभ", description: "Classification and measurement, amortised cost vs FVTPL/FVTOCI, defined benefit pension plans.", levels: { min: 70, max: 100 }, topicsCount: 9, estimatedHours: 24 }
            ]
          },
          {
            id: "acca-afm",
            paperNumber: "AFM",
            title: "Advanced Financial Management (Optional)",
            marks: 100,
            description: "Advanced investment appraisal, corporate restructuring, international finance, treasury management.",
            chapters: [
              { id: "acca-afm-ch1", number: 1, title: "International Investment Appraisal & Cross-Border M&A", hindiTitle: "अंतर्राष्ट्रीय निवेश मूल्यांकन एवं सीमा-पार विलय", description: "Adjusted present value (APV), Black-Scholes real options, cross-border risk assessment.", levels: { min: 75, max: 100 }, topicsCount: 8, estimatedHours: 20 }
            ]
          },
          {
            id: "acca-aaa",
            paperNumber: "AAA",
            title: "Advanced Audit and Assurance (Optional)",
            marks: 100,
            description: "Regulatory environment, professional ethical considerations, quality control, group audits.",
            chapters: [
              { id: "acca-aaa-ch1", number: 1, title: "Audit Quality Management, Group Audits & Forensic Review", hindiTitle: "अंकेक्षण गुणवत्ता प्रबंधन, समूह अंकेक्षण एवं फॉरेंसिक समीक्षा", description: "ISQM 1, transnational audits, forensic investigations, money laundering checks.", levels: { min: 75, max: 100 }, topicsCount: 8, estimatedHours: 20 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "bba",
    name: "Bachelor of Business Administration",
    shortName: "BBA",
    badgeColor: "bg-indigo-600 text-white",
    description: "Undergraduate degree in management providing foundational to advanced competence in business leadership and operations.",
    officialUrl: "https://www.ugc.gov.in",
    levels: [
      {
        id: "bba-sem1",
        title: "BBA Semester 1",
        shortTitle: "BBA Sem 1",
        institution: "BBA",
        description: "First semester establishing foundations of management, business communication, accounting, and business economics.",
        eligibility: "10+2 passed from recognized board",
        scheme: "NEP-2020 Management Framework (4 Papers)",
        papers: [
          {
            id: "bba-s1-p1",
            paperNumber: 1,
            title: "Principles of Management (प्रबंधन के सिद्धांत)",
            marks: 100,
            description: "Planning, organizing, staffing, directing, controlling, Henri Fayol & Taylor principles.",
            chapters: [
              { id: "bba-pm-1", number: 1, title: "Foundations of Management & Administrative Theories", hindiTitle: "प्रबंधन की नींव एवं प्रशासनिक सिद्धांत", description: "Management functions, POSDCORB, 14 Principles of Henri Fayol, Scientific Management by FW Taylor.", levels: { min: 0, max: 20 }, topicsCount: 7, estimatedHours: 12 }
            ]
          },
          {
            id: "bba-s1-p2",
            paperNumber: 2,
            title: "Business Economics & Managerial Decision Making",
            marks: 100,
            description: "Demand forecasting, production functions, cost concepts, market forms.",
            chapters: [
              { id: "bba-be-1", number: 1, title: "Demand Analysis, Elasticity & Forecasting Methods", hindiTitle: "मांग विश्लेषण, लोच एवं पूर्वानुमान विधियां", description: "Law of Demand, price/income/cross elasticity, survey & trend projection methods.", levels: { min: 5, max: 25 }, topicsCount: 6, estimatedHours: 10 }
            ]
          },
          {
            id: "bba-s1-p3",
            paperNumber: 3,
            title: "Fundamentals of Financial Accounting",
            marks: 100,
            description: "Accounting principles, journal, ledger, trial balance, preparation of final accounts of sole proprietors.",
            chapters: [
              { id: "bba-fa-1", number: 1, title: "Accounting Equation, Journal Entries & Financial Statements", hindiTitle: "लेखांकन समीकरण, रोजनामचा प्रविष्टियां एवं वित्तीय विवरण", description: "Double-entry rules, posting to ledger, trading and profit/loss accounts.", levels: { min: 5, max: 30 }, topicsCount: 7, estimatedHours: 14 }
            ]
          },
          {
            id: "bba-s1-p4",
            paperNumber: 4,
            title: "Business Communication & Soft Skills",
            marks: 100,
            description: "Verbal and non-verbal communication, business letters, resume drafting, interview techniques.",
            chapters: [
              { id: "bba-bc-1", number: 1, title: "Corporate Communication & Executive Presentation Skills", hindiTitle: "कॉर्पोरेट संचार एवं प्रस्तुति कौशल", description: "Barriers to communication, business reports, professional email etiquette.", levels: { min: 0, max: 20 }, topicsCount: 6, estimatedHours: 10 }
            ]
          }
        ]
      },
      {
        id: "bba-sem3",
        title: "BBA Semester 3",
        shortTitle: "BBA Sem 3",
        institution: "BBA",
        description: "Third semester focusing on Marketing Management, Human Resource Management, Cost Accounting, Business Law.",
        eligibility: "Completed BBA Semester 2",
        scheme: "NEP-2020 Management Framework (4 Papers)",
        papers: [
          {
            id: "bba-s3-p1",
            paperNumber: 1,
            title: "Marketing Management (विपणन प्रबंध)",
            marks: 100,
            description: "STP (Segmentation, Targeting, Positioning), Marketing Mix 4Ps, Consumer Behavior.",
            chapters: [
              { id: "bba-mm-1", number: 1, title: "Market Segmentation, Targeting & Positioning (STP)", hindiTitle: "बाजार विभक्तिकरण, लक्ष्यीकरण एवं स्थिति निर्धारण", description: "Demographic/Psychographic segmentation, target strategies, perceptual mapping.", levels: { min: 25, max: 50 }, topicsCount: 7, estimatedHours: 12 }
            ]
          },
          {
            id: "bba-s3-p2",
            paperNumber: 2,
            title: "Human Resource Management (मानव संसाधन प्रबंध)",
            marks: 100,
            description: "Recruitment, selection, training, performance appraisal, employee motivation.",
            chapters: [
              { id: "bba-hrm-1", number: 1, title: "Talent Acquisition, Training & Performance Appraisal", hindiTitle: "प्रतिभा अधिग्रहण, प्रशिक्षण एवं प्रदर्शन मूल्यांकन", description: "Job analysis, 360-degree appraisal, MBO (Management by Objectives), Maslow & Herzberg theories.", levels: { min: 25, max: 50 }, topicsCount: 8, estimatedHours: 14 }
            ]
          },
          {
            id: "bba-s3-p3",
            paperNumber: 3,
            title: "Cost and Management Accounting for Managers",
            marks: 100,
            description: "Cost sheet, marginal costing, break-even point, budget preparation, variance analysis.",
            chapters: [
              { id: "bba-cost-1", number: 1, title: "Marginal Costing, CVP & Managerial Decision Making", hindiTitle: "सीमांत लागत, सीवीपी एवं प्रबंधकीय निर्णय", description: "Contribution, P/V ratio, break-even analysis, profit planning.", levels: { min: 30, max: 60 }, topicsCount: 7, estimatedHours: 14 }
            ]
          },
          {
            id: "bba-s3-p4",
            paperNumber: 4,
            title: "Business Law and Corporate Governance",
            marks: 100,
            description: "Indian Contract Act, Sale of Goods Act, Consumer Protection Act 2019, Corporate governance rules.",
            chapters: [
              { id: "bba-law-1", number: 1, title: "Commercial Laws & Consumer Protection Act 2019", hindiTitle: "व्यापारिक कानून एवं उपभोक्ता संरक्षण अधिनियम 2019", description: "Remedies for breach, consumer dispute redressal commissions, unfair trade practices.", levels: { min: 25, max: 55 }, topicsCount: 7, estimatedHours: 12 }
            ]
          }
        ]
      },
      {
        id: "bba-sem5",
        title: "BBA Semester 5",
        shortTitle: "BBA Sem 5",
        institution: "BBA",
        description: "Fifth semester covering Strategic Management, Entrepreneurship, Financial Markets, Digital Business.",
        eligibility: "Completed BBA Semester 4",
        scheme: "NEP-2020 Management Framework (4 Papers)",
        papers: [
          {
            id: "bba-s5-p1",
            paperNumber: 1,
            title: "Strategic Management & Corporate Policy",
            marks: 100,
            description: "SWOT analysis, Porter's Value Chain, BCG Matrix, generic competitive strategies.",
            chapters: [
              { id: "bba-sm-1", number: 1, title: "Strategic Formulation: SWOT, BCG Matrix & Porter's Generic Models", hindiTitle: "रणनीतिक सूत्रीकरण: स्वाट, बीसीजी मैट्रिक्स एवं पोर्टर मॉडल", description: "Cost leadership, differentiation, focus strategy, portfolio analysis.", levels: { min: 45, max: 80 }, topicsCount: 8, estimatedHours: 16 }
            ]
          },
          {
            id: "bba-s5-p2",
            paperNumber: 2,
            title: "Financial Markets, Institutions & Services",
            marks: 100,
            description: "Commercial banking, mutual funds, merchant banking, venture capital, stock markets in India.",
            chapters: [
              { id: "bba-fmis-1", number: 1, title: "Mutual Funds, Merchant Banking & Credit Rating Agencies", hindiTitle: "म्यूचुअल फंड, मर्चेंट बैंकिंग एवं क्रेडिट रेटिंग एजेंसियां", description: "SEBI mutual fund regulations, underwriting, credit rating symbols (CRISIL, ICRA).", levels: { min: 45, max: 80 }, topicsCount: 7, estimatedHours: 14 }
            ]
          },
          {
            id: "bba-s5-p3",
            paperNumber: 3,
            title: "Operations & Supply Chain Management",
            marks: 100,
            description: "Facility layout, inventory management, JIT, total quality management, logistics and supply chain optimization.",
            chapters: [
              { id: "bba-scm-1", number: 1, title: "Supply Chain Optimization, JIT & Total Quality Management (TQM)", hindiTitle: "आपूर्ति श्रृंखला अनुकूलन, जेआईटी एवं टीक्यूएम", description: "Bullwhip effect, lean manufacturing, vendor management, ISO quality standards.", levels: { min: 45, max: 80 }, topicsCount: 7, estimatedHours: 14 }
            ]
          },
          {
            id: "bba-s5-p4",
            paperNumber: 4,
            title: "Digital Business & Entrepreneurship Development",
            marks: 100,
            description: "E-business models, digital marketing, startup incubation, venture capital funding, pitch deck preparation.",
            chapters: [
              { id: "bba-db-1", number: 1, title: "Startup Ecosystem, Business Plan Formulation & Digital Marketing", hindiTitle: "स्टार्टअप पारिस्थितिकी तंत्र, बिजनेस प्लान एवं डिजिटल मार्केटिंग", description: "SEO, SEM, social media campaigns, investor pitch deck, valuation basics for startups.", levels: { min: 40, max: 75 }, topicsCount: 7, estimatedHours: 14 }
            ]
          }
        ]
      }
    ]
  }
];
