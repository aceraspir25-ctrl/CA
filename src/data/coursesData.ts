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
  institution: "ICAI" | "ICMAI" | "ICSI" | "PRSU"
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
    description: "Statutory professional accountancy body regulating the Cost and Management Accounting (CMA) profession.",
    officialUrl: "https://icmai.in",
    levels: [
      {
        id: "cma-foundation",
        title: "CMA Foundation Course",
        shortTitle: "CMA Foundation",
        institution: "ICMAI",
        description: "Entry-level qualification for Cost & Management Accountancy under ICMAI Syllabus 2022.",
        eligibility: "Passed Class 12",
        scheme: "ICMAI Syllabus 2022",
        papers: [
          {
            id: "cma-f-p1",
            paperNumber: 1,
            title: "Fundamentals of Business Laws and Business Communication",
            marks: 100,
            description: "Indian Contract Act, Sale of Goods Act, Negotiable Instruments Act, Communication skills.",
            chapters: [
              { id: "cma-bl-1", number: 1, title: "Essentials of Commercial Law", hindiTitle: "वाणिज्यिक कानून के मूल तत्व", description: "Contract Act, Offer, Acceptance, Consideration.", levels: { min: 0, max: 30 }, topicsCount: 6, estimatedHours: 10 }
            ]
          },
          {
            id: "cma-f-p2",
            paperNumber: 2,
            title: "Fundamentals of Financial and Cost Accounting",
            marks: 100,
            description: "Accounting principles, cost sheets, classification of costs, preparation of final accounts.",
            chapters: [
              { id: "cma-ac-1", number: 1, title: "Fundamentals of Cost Accounting & Cost Concepts", hindiTitle: "लागत लेखांकन के मूल सिद्धांत एवं लागत अवधारणाएं", description: "Direct vs indirect cost, fixed vs variable cost, elements of cost, Cost Sheet preparation.", levels: { min: 10, max: 40 }, topicsCount: 8, estimatedHours: 14 }
            ]
          },
          {
            id: "cma-f-p3",
            paperNumber: 3,
            title: "Fundamentals of Business Mathematics and Statistics",
            marks: 100,
            description: "Arithmetic, Algebra, Calculus, Central Tendency, Measures of Dispersion, Probability.",
            chapters: [
              { id: "cma-ms-1", number: 1, title: "Commercial Mathematics & Statistics", hindiTitle: "वाणिज्यिक गणित एवं सांख्यिकी", description: "Interest, annuities, index numbers, correlation and regression.", levels: { min: 0, max: 35 }, topicsCount: 7, estimatedHours: 12 }
            ]
          },
          {
            id: "cma-f-p4",
            paperNumber: 4,
            title: "Fundamentals of Business Economics and Management",
            marks: 100,
            description: "Microeconomics, Macroeconomics, Principles of Management, Decision Making.",
            chapters: [
              { id: "cma-em-1", number: 1, title: "Business Economics & Management Functions", hindiTitle: "व्यावसायिक अर्थशास्त्र एवं प्रबंधन कार्य", description: "Planning, organising, staffing, directing, controlling, market structures.", levels: { min: 0, max: 30 }, topicsCount: 6, estimatedHours: 10 }
            ]
          }
        ]
      },
      {
        id: "cma-intermediate",
        title: "CMA Intermediate Course",
        shortTitle: "CMA Intermediate",
        institution: "ICMAI",
        description: "Intermediate level with special focus on Cost Accounting, Direct & Indirect Tax, Operations Management.",
        eligibility: "Passed CMA Foundation or Graduation",
        scheme: "ICMAI Syllabus 2022 (8 Papers)",
        groups: [
          {
            id: "cma-int-g1",
            title: "Group 1",
            description: "Business Laws and Ethics, Financial Accounting, Direct and Indirect Taxation, Cost Accounting",
            papers: [
              {
                id: "cma-int-p8",
                paperNumber: 8,
                title: "Cost Accounting",
                marks: 100,
                description: "Cost Accounting Standards (CAS), Material, Labour, Overheads, Job/Batch/Contract Costing, Marginal Costing.",
                chapters: [
                  { id: "cma-cost-1", number: 1, title: "Cost Accounting Standards (CAS 1 to 24)", hindiTitle: "लागत लेखांकन मानक (CAS 1-24)", description: "Mandatory CAS issued by ICMAI for Indian cost records and audits.", levels: { min: 40, max: 85 }, topicsCount: 10, estimatedHours: 20 },
                  { id: "cma-cost-2", number: 2, title: "Marginal Costing, CVP Analysis and Decision Making", hindiTitle: "सीमांत लागत, CVP विश्लेषण एवं निर्णय निर्माण", description: "Make or buy, shut down, product mix decisions, angle of incidence.", levels: { min: 45, max: 90 }, topicsCount: 8, estimatedHours: 18 }
                ]
              }
            ]
          },
          {
            id: "cma-int-g2",
            title: "Group 2",
            description: "Operations Management & Strategic Management, Corporate Accounting & Auditing, Financial Management, Management Accounting",
            papers: [
              {
                id: "cma-int-p12",
                paperNumber: 12,
                title: "Management Accounting",
                marks: 100,
                description: "Activity-Based Costing (ABC), Target Costing, Life Cycle Costing, Responsibility Accounting, Transfer Pricing.",
                chapters: [
                  { id: "cma-ma-1", number: 1, title: "Activity-Based Costing (ABC) & Cost Drivers", hindiTitle: "गतिविधि आधारित लागत निर्धारण (ABC)", description: "Cost pools, cost drivers, traditional vs ABC system comparison.", levels: { min: 50, max: 90 }, topicsCount: 7, estimatedHours: 14 }
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
        description: "Strategic Cost Management, Cost & Management Audit, Strategic Performance Management, Business Valuation.",
        eligibility: "Passed CMA Intermediate and prescribed practical training",
        scheme: "ICMAI Syllabus 2022 (8 Papers)",
        groups: [
          {
            id: "cma-fn-g3",
            title: "Group 3",
            description: "Corporate and Economic Laws, Strategic Financial Management, Direct Tax Laws, Strategic Cost Management",
            papers: [
              {
                id: "cma-fn-p16",
                paperNumber: 16,
                title: "Strategic Cost Management (SCM)",
                marks: 100,
                description: "Value Chain Analysis, Kaizen Costing, Balanced Scorecard, Total Quality Management (TQM).",
                chapters: [
                  { id: "scm-ch1", number: 1, title: "Strategic Cost Management & Value Chain Analysis", hindiTitle: "रणनीतिक लागत प्रबंधन एवं मूल्य श्रृंखला विश्लेषण", description: "Porter's Value Chain, Core competencies, Cost leadership vs Differentiation.", levels: { min: 70, max: 100 }, topicsCount: 9, estimatedHours: 20 }
                ]
              }
            ]
          },
          {
            id: "cma-fn-g4",
            title: "Group 4",
            description: "Cost & Management Audit, Corporate Financial Reporting, Indirect Tax Laws, Strategic Performance Management & Business Valuation",
            papers: [
              {
                id: "cma-fn-p17",
                paperNumber: 17,
                title: "Cost and Management Audit (Section 148 of Companies Act 2013)",
                marks: 100,
                description: "Cost audit rules, CRA-1, CRA-2, CRA-3, CRA-4, Cost Audit Report.",
                chapters: [
                  { id: "cma-audit-1", number: 1, title: "Statutory Cost Audit under Section 148", hindiTitle: "धारा 148 के अंतर्गत सांविधिक लागत अंकेक्षण", description: "Applicability thresholds, regulated vs non-regulated sectors, duties of cost auditor.", levels: { min: 65, max: 100 }, topicsCount: 8, estimatedHours: 18 }
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
    description: "Premier statutory body for developing and regulating the profession of Company Secretaries in India.",
    officialUrl: "https://www.icsi.edu",
    levels: [
      {
        id: "cs-cseet",
        title: "Company Secretary Executive Entrance Test (CSEET)",
        shortTitle: "CS CSEET",
        institution: "ICSI",
        description: "National entrance test for admission to the CS Executive Programme.",
        eligibility: "Passed or appearing in Class 12",
        scheme: "ICSI Latest Scheme",
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
        scheme: "ICSI New Syllabus 2022 (7 Papers)",
        groups: [
          {
            id: "cs-ex-g1",
            title: "Group 1",
            description: "Jurisprudence & General Laws, Company Law and Practice, Setting Up of Business, Corporate Accounting",
            papers: [
              {
                id: "cs-ex-p2",
                paperNumber: 2,
                title: "Company Law and Practice",
                marks: 100,
                description: "Comprehensive Companies Act 2013, Board meetings, Secretarial Standards (SS-1 and SS-2), ROC filings.",
                chapters: [
                  { id: "cs-cl-1", number: 1, title: "Board Meetings, Committees & Secretarial Standards (SS-1)", hindiTitle: "बोर्ड बैठकें, समितियां एवं सेक्रेटेरियल स्टैंडर्ड्स", description: "Notice, agenda, quorum, minutes, Audit Committee, Stakeholders Relationship Committee.", levels: { min: 45, max: 85 }, topicsCount: 9, estimatedHours: 18 }
                ]
              }
            ]
          },
          {
            id: "cs-ex-g2",
            title: "Group 2",
            description: "Capital Markets & Securities Laws, Economic & Commercial Laws, Tax Laws & Practice",
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
        description: "Advanced stage for corporate governance, secretarial audit, corporate restructuring, insolvency and pleadings.",
        eligibility: "Passed CS Executive Programme",
        scheme: "ICSI New Syllabus 2022 (7 Papers)",
        groups: [
          {
            id: "cs-prof-g1",
            title: "Group 1",
            description: "Environmental, Social and Governance (ESG), Drafting and Pleadings, Compliance Management, Audit and Due Diligence",
            papers: [
              {
                id: "cs-prof-p2",
                paperNumber: 2,
                title: "Secretarial Audit, Compliance Management and Due Diligence",
                marks: 100,
                description: "Section 204 of Companies Act 2013, Form MR-3, non-compliances, penalties, M&A due diligence.",
                chapters: [
                  { id: "cs-audit-1", number: 1, title: "Secretarial Audit (Sec 204) & Form MR-3 Reporting", hindiTitle: "सेक्रेटेरियल ऑडिट एवं फॉर्म MR-3 रिपोर्टिंग", description: "Applicability, scope of audit, checklist of corporate laws, qualification reporting.", levels: { min: 70, max: 100 }, topicsCount: 10, estimatedHours: 20 }
                ]
              }
            ]
          },
          {
            id: "cs-prof-g2",
            title: "Group 2",
            description: "Corporate Restructuring, Insolvency and Winding-Up, Resolution of Corporate Disputes, Electives",
            papers: [
              {
                id: "cs-prof-p4",
                paperNumber: 4,
                title: "Insolvency and Bankruptcy Code, 2016 (IBC)",
                marks: 100,
                description: "Corporate Insolvency Resolution Process (CIRP), liquidation, pre-pack insolvency, NCLT jurisprudence.",
                chapters: [
                  { id: "cs-ibc-1", number: 1, title: "Corporate Insolvency Resolution Process (CIRP)", hindiTitle: "कॉर्पोरेट दिवाला समाधान प्रक्रिया (CIRP)", description: "Sec 7, 9, 10 initiation, moratorium (Sec 14), Committee of Creditors (CoC), resolution plans.", levels: { min: 75, max: 100 }, topicsCount: 11, estimatedHours: 24 }
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
    description: "State university in Raipur, Chhattisgarh offering undergraduate and postgraduate commerce degrees under NEP and Traditional Schemes.",
    officialUrl: "https://www.prsu.ac.in",
    levels: [
      {
        id: "prsu-bcom-sem1",
        title: "B.Com Semester 1 (PRSU / NEP)",
        shortTitle: "B.Com Sem 1",
        institution: "PRSU",
        description: "First semester covering Financial Accounting, Business Communication, Business Regulatory Framework.",
        eligibility: "Class 12 in Commerce or equivalent",
        scheme: "NEP-2020 / PRSU Scheme",
        papers: [
          {
            id: "prsu-s1-p1",
            paperNumber: 1,
            title: "Financial Accounting (Major / Core)",
            marks: 100,
            description: "Accounting principles, royalty accounts, hire purchase and installment purchase systems.",
            chapters: [
              { id: "prsu-ch1", number: 1, title: "Royalty Accounts (खान व कॉपीराइट रॉयल्टी खाते)", hindiTitle: "रॉयल्टी (अधिकार शुल्क) खाते", description: "Minimum rent, shortworkings, recoupment of shortworkings, journal entries in lessee and lessor books.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 12 },
              { id: "prsu-ch2", number: 2, title: "Hire Purchase and Installment Purchase System", hindiTitle: "किराया क्रय एवं किस्त भुगतान पद्धति", description: "Calculation of interest, cash price calculation, repossession of goods (default cases).", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 14 }
            ]
          },
          {
            id: "prsu-s1-p2",
            paperNumber: 2,
            title: "Business Regulatory Framework (व्यावसायिक नियामक ढांचा)",
            marks: 100,
            description: "Indian Contract Act, Special contracts (Indemnity, Guarantee, Bailment, Pledge, Agency).",
            chapters: [
              { id: "prsu-brf-1", number: 1, title: "Law of Contract: General Principles & Special Contracts", hindiTitle: "अनुबंध का नियम: सामान्य सिद्धांत व विशिष्ट अनुबंध", description: "Guarantee, Indemnity, Bailment, Pledge, Agency rules and case laws.", levels: { min: 10, max: 40 }, topicsCount: 7, estimatedHours: 12 }
            ]
          }
        ]
      },
      {
        id: "prsu-bcom-sem2",
        title: "B.Com Semester 2 (PRSU / NEP)",
        shortTitle: "B.Com Sem 2",
        institution: "PRSU",
        description: "Second semester covering Corporate Accounting, Business Economics, Business Mathematics.",
        eligibility: "Completed B.Com Semester 1",
        scheme: "NEP-2020 / PRSU Scheme",
        papers: [
          {
            id: "prsu-s2-p1",
            paperNumber: 1,
            title: "Corporate Accounting (कंपनी लेखांकन)",
            marks: 100,
            description: "Issue and forfeiture of shares, redemption of preference shares and debentures, final accounts of companies.",
            chapters: [
              { id: "prsu-ca-1", number: 1, title: "Issue and Forfeiture of Shares & Pro-rata Allotment", hindiTitle: "अंशों का निर्गमन, जब्ती एवं आनुपातिक आवंटन", description: "Journal entries for calls in arrears, calls in advance, pro-rata allotment, forfeiture and re-issue.", levels: { min: 20, max: 55 }, topicsCount: 8, estimatedHours: 16 }
            ]
          }
        ]
      },
      {
        id: "prsu-bcom-sem3",
        title: "B.Com Semester 3 (PRSU / NEP)",
        shortTitle: "B.Com Sem 3",
        institution: "PRSU",
        description: "Third semester covering Income Tax Law & Accounts (Part 1), Cost Accounting, Principles of Business Management.",
        eligibility: "Completed B.Com Semester 2",
        scheme: "NEP-2020 / PRSU Scheme",
        papers: [
          {
            id: "prsu-s3-p1",
            paperNumber: 1,
            title: "Income Tax Law & Accounts (आयकर विधान एवं लेखे)",
            marks: 100,
            description: "Income Tax Act 1961: Definition, Residential Status, Heads of Income (Salary, House Property).",
            chapters: [
              { id: "prsu-it-1", number: 1, title: "Income from Salaries (वेतन से आय)", hindiTitle: "वेतन से आय", description: "Computation of gross salary, taxable allowances, perquisites, deductions under Section 16.", levels: { min: 30, max: 65 }, topicsCount: 8, estimatedHours: 16 }
            ]
          }
        ]
      },
      {
        id: "prsu-bcom-sem4",
        title: "B.Com Semester 4 (PRSU / NEP)",
        shortTitle: "B.Com Sem 4",
        institution: "PRSU",
        description: "Fourth semester covering Income Tax Law (Part 2 - Business, Capital Gains, Deductions), Advanced Cost Accounting.",
        eligibility: "Completed B.Com Semester 3",
        scheme: "NEP-2020 / PRSU Scheme",
        papers: [
          {
            id: "prsu-s4-p1",
            paperNumber: 1,
            title: "Income Tax Law (Part 2) & Tax Planning",
            marks: 100,
            description: "Profits of Business, Capital Gains, Gross Total Income, Chapter VI-A Deductions, Rebates.",
            chapters: [
              { id: "prsu-it2-1", number: 1, title: "Capital Gains & Deductions from GTI", hindiTitle: "पूंजीगत लाभ एवं सकल कुल आय से कटौतियां", description: "Section 54 series, 80C, 80D, 80G deductions, calculation of tax liability.", levels: { min: 35, max: 70 }, topicsCount: 7, estimatedHours: 14 }
            ]
          }
        ]
      },
      {
        id: "prsu-bcom-sem5",
        title: "B.Com Semester 5 (PRSU / NEP)",
        shortTitle: "B.Com Sem 5",
        institution: "PRSU",
        description: "Fifth semester covering Financial Management, Auditing, Indirect Tax (GST).",
        eligibility: "Completed B.Com Semester 4",
        scheme: "NEP-2020 / PRSU Scheme",
        papers: [
          {
            id: "prsu-s5-p1",
            paperNumber: 1,
            title: "Financial Management (वित्तीय प्रबंध)",
            marks: 100,
            description: "Capital Budgeting, Cost of Capital, Working Capital Management, Leverage analysis.",
            chapters: [
              { id: "prsu-fm-1", number: 1, title: "Capital Budgeting & Investment Decisions", hindiTitle: "पूंजी बजटिंग एवं निवेश निर्णय", description: "Net Present Value (NPV), Internal Rate of Return (IRR), Payback method.", levels: { min: 40, max: 75 }, topicsCount: 8, estimatedHours: 16, isCompleted: true }
            ]
          },
          {
            id: "prsu-s5-p2",
            paperNumber: 2,
            title: "Auditing (अंकेक्षण)",
            marks: 100,
            description: "Internal control, vouching, verification of assets and liabilities, company auditor duties.",
            chapters: [
              { id: "prsu-aud-1", number: 1, title: "Vouching & Verification of Assets and Liabilities", hindiTitle: "प्रमाणन एवं संपत्तियों तथा दायित्वों का सत्यापन", description: "Vouching of cash transactions, sales, purchases, verification of stock, debtors, fixed assets.", levels: { min: 35, max: 70 }, topicsCount: 6, estimatedHours: 12 }
            ]
          }
        ]
      },
      {
        id: "prsu-bcom-sem6",
        title: "B.Com Semester 6 (PRSU / NEP)",
        shortTitle: "B.Com Sem 6",
        institution: "PRSU",
        description: "Sixth semester final year covering International Marketing, Corporate Governance, Goods & Services Tax (GST).",
        eligibility: "Completed B.Com Semester 5",
        scheme: "NEP-2020 / PRSU Scheme",
        papers: [
          {
            id: "prsu-s6-p1",
            paperNumber: 1,
            title: "Goods & Services Tax (GST) & Customs Law",
            marks: 100,
            description: "CGST/SGST/IGST structure, Input Tax Credit, registration, return filing.",
            chapters: [
              { id: "prsu-gst-1", number: 1, title: "GST Registration, Invoicing and Returns", hindiTitle: "जीएसटी पंजीकरण, इनवॉइसिंग एवं विवरणियां", description: "Threshold limits, GSTR-1, GSTR-3B, e-way bill system, reverse charge.", levels: { min: 45, max: 80 }, topicsCount: 8, estimatedHours: 14 }
            ]
          }
        ]
      }
    ]
  }
]

