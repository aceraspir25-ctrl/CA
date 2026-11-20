import fs from "fs"
import path from "path"

const coursesDataPath = path.resolve(process.cwd(), "src/data/coursesData.ts")
const chapterContentPath = path.resolve(process.cwd(), "src/data/chapterContentData.ts")

console.log("Loading files...")
let coursesContent = fs.readFileSync(coursesDataPath, "utf-8")
let chapterLessonsContent = fs.readFileSync(chapterContentPath, "utf-8")

// Define the 6 semesters with 4 papers each and 5 units/chapters per paper
const prsuSemesters = [
  {
    id: "prsu-bcom-sem1",
    title: "B.Com Semester 1 (PRSU / NEP)",
    shortTitle: "B.Com Sem 1",
    institution: "PRSU",
    description: "First semester covering Financial Accounting, Business Regulatory Framework, Business Communication, Business Mathematics.",
    eligibility: "Class 12 in Commerce or equivalent",
    scheme: "NEP-2020 / PRSU Scheme (4 Papers, 20 Chapters)",
    papers: [
      {
        id: "prsu-s1-p1",
        paperNumber: 1,
        title: "Financial Accounting (वित्तीय लेखांकन)",
        marks: 100,
        description: "Core financial accounting principles, AS-1/10, Royalty Accounts, Hire Purchase, Branch & Departmental Accounts.",
        chapters: [
          { id: "prsu-s1-p1-ch1", number: 1, title: "Meaning, Principles & Accounting Standards (AS-1, AS-10)", hindiTitle: "लेखांकन के सिद्धांत एवं मानक (AS-1, AS-10)", description: "Concepts, conventions, GAAP, AS-1 disclosure, AS-10 property plant equipment.", levels: { min: 10, max: 40 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s1-p1-ch2", number: 2, title: "Royalty Accounts: Minimum Rent & Shortworkings", hindiTitle: "रॉयल्टी (अधिकार शुल्क) खाते: न्यूनतम किराया एवं लघुकार्य", description: "Lessee & lessor journal entries, recoupment of shortworkings, strike/lockout provisions.", levels: { min: 15, max: 45 }, topicsCount: 8, estimatedHours: 14, isCompleted: true },
          { id: "prsu-s1-p1-ch3", number: 3, title: "Hire Purchase and Installment Purchase System", hindiTitle: "किराया क्रय एवं किस्त भुगतान पद्धति", description: "Interest calculation, cash price determination, default & repossession accounting.", levels: { min: 15, max: 50 }, topicsCount: 8, estimatedHours: 14, isCompleted: true },
          { id: "prsu-s1-p1-ch4", number: 4, title: "Branch Accounts: Debtors & Stock and Debtors Method", hindiTitle: "शाखा खाते: देनदार एवं स्कंध-देनदार पद्धति", description: "Dependent branch, independent branch, invoice price adjustments, reconciliation.", levels: { min: 20, max: 55 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s1-p1-ch5", number: 5, title: "Departmental Accounts & Partnership Dissolution", hindiTitle: "विभागीय खाते एवं साझेदारी फर्म का विघटन", description: "Inter-departmental transfers at cost/selling price, Garner vs Murray rule, piece-meal distribution.", levels: { min: 25, max: 60 }, topicsCount: 8, estimatedHours: 16 }
        ]
      },
      {
        id: "prsu-s1-p2",
        paperNumber: 2,
        title: "Business Regulatory Framework (व्यावसायिक नियामक ढांचा)",
        marks: 100,
        description: "Indian Contract Act 1872, Special Contracts, Sale of Goods Act 1930, Negotiable Instruments & Consumer Protection 2019.",
        chapters: [
          { id: "prsu-s1-p2-ch1", number: 1, title: "Indian Contract Act 1872: Offer, Acceptance & Consideration", hindiTitle: "भारतीय अनुबंध अधिनियम: प्रस्ताव, स्वीकृति एवं प्रतिफल", description: "Essential elements of valid contract, legal capacity, free consent, void agreements.", levels: { min: 10, max: 40 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s1-p2-ch2", number: 2, title: "Special Contracts: Indemnity & Guarantee", hindiTitle: "विशिष्ट अनुबंध: क्षतिपूर्ति एवं गारंटी अनुबंध", description: "Rights of indemnity holder, surety's liability, discharge of surety, rights against creditor/debtor.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s1-p2-ch3", number: 3, title: "Bailment, Pledge & Law of Agency", hindiTitle: "निक्षेप, गिरवी एवं एजेंसी के नियम", description: "Duties of bailor and bailee, rights of pawnee, creation and termination of agency.", levels: { min: 15, max: 45 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s1-p2-ch4", number: 4, title: "Sale of Goods Act 1930: Conditions & Warranties", hindiTitle: "वस्तु विक्रय अधिनियम: शर्तें एवं आश्वासन", description: "Caveat emptor doctrine, transfer of property, rights of unpaid seller against goods.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s1-p2-ch5", number: 5, title: "Negotiable Instruments Act 1881 & Consumer Protection Act 2019", hindiTitle: "परक्राम्य विलेख अधिनियम 1881 एवं उपभोक्ता संरक्षण 2019", description: "Promissory note, bill of exchange, cheque crossing, consumer dispute redressal commissions.", levels: { min: 20, max: 50 }, topicsCount: 8, estimatedHours: 14 }
        ]
      },
      {
        id: "prsu-s1-p3",
        paperNumber: 3,
        title: "Business Communication (व्यावसायिक संचार)",
        marks: 100,
        description: "Communication channels, barriers, business correspondence, report writing, oral presentation & digital tools.",
        chapters: [
          { id: "prsu-s1-p3-ch1", number: 1, title: "Concept, Process & Barriers to Business Communication", hindiTitle: "व्यावसायिक संचार की अवधारणा, प्रक्रिया एवं बाधाएं", description: "Communication loop, 7Cs of effective communication, physical, psychological & cultural barriers.", levels: { min: 5, max: 35 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s1-p3-ch2", number: 2, title: "Business Correspondence: Inquiries, Quotations & Orders", hindiTitle: "व्यावसायिक पत्राचार: पूछताछ, दर-सूची एवं आदेश पत्र", description: "Structure of trade letters, credit inquiries, complaint letters, collection correspondence.", levels: { min: 10, max: 40 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s1-p3-ch3", number: 3, title: "Report Writing, Notices, Agenda & Minutes", hindiTitle: "रिपोर्ट लेखन, सूचना, कार्यसूची एवं कार्यवृत्त", description: "Formal business reports, committee proceedings, writing notices and statutory meeting minutes.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s1-p3-ch4", number: 4, title: "Oral Presentation, Interviews & Group Discussions", hindiTitle: "मौखिक प्रस्तुतीकरण, साक्षात्कार एवं समूह चर्चा", description: "Public speaking techniques, audio-visual aids, facing interview boards, GD dynamics.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s1-p3-ch5", number: 5, title: "Digital Business Communication & Email Etiquette", hindiTitle: "डिजिटल व्यावसायिक संचार एवं ईमेल शिष्टाचार", description: "Corporate emailing standards, video conferencing etiquette, intranet, cyber protocols.", levels: { min: 10, max: 35 }, topicsCount: 6, estimatedHours: 10 }
        ]
      },
      {
        id: "prsu-s1-p4",
        paperNumber: 4,
        title: "Business Mathematics (व्यावसायिक गणित)",
        marks: 100,
        description: "Commercial mathematics, simultaneous equations, matrices, determinants, interest, annuities and calculus.",
        chapters: [
          { id: "prsu-s1-p4-ch1", number: 1, title: "Ratio, Proportion, Percentage & Commercial Brokerage", hindiTitle: "अनुपात, समानुपात, प्रतिशत एवं व्यापारिक दलाली", description: "Direct and inverse proportions, commission calculations, trade discount and cash discount.", levels: { min: 10, max: 40 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s1-p4-ch2", number: 2, title: "Simultaneous Equations & Linear Functions", hindiTitle: "युगपत समीकरण एवं रैखिक फलन", description: "Two and three variable linear systems, graphical method, applications in break-even analysis.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s1-p4-ch3", number: 3, title: "Matrices & Determinants: Cramer's Rule & Inverses", hindiTitle: "आव्यूह एवं सारणिक: क्रेमर नियम एवं व्युत्क्रम", description: "Matrix algebra, adjoint, inverse of 3x3 matrix, solving linear systems by Cramer's rule.", levels: { min: 15, max: 50 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s1-p4-ch4", number: 4, title: "Simple and Compound Interest, Annuities & Sinking Funds", hindiTitle: "साधारण व चक्रवृद्धि ब्याज, वार्षिकी एवं शोधन कोष", description: "Effective rate of interest, present value of annuity regular, amortisation schedules.", levels: { min: 15, max: 50 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s1-p4-ch5", number: 5, title: "Differential Calculus Basics & Linear Programming", hindiTitle: "अवकलन की मूल बातें एवं रैखिक प्रोग्रामन (LPP)", description: "First and second order derivatives, marginal cost, revenue maximization, graphical LPP.", levels: { min: 20, max: 55 }, topicsCount: 8, estimatedHours: 16 }
        ]
      }
    ]
  },
  {
    id: "prsu-bcom-sem2",
    title: "B.Com Semester 2 (PRSU / NEP)",
    shortTitle: "B.Com Sem 2",
    institution: "PRSU",
    description: "Second semester covering Corporate Accounting, Business Economics, Principles of Management, Business Environment.",
    eligibility: "Completed B.Com Semester 1",
    scheme: "NEP-2020 / PRSU Scheme (4 Papers, 20 Chapters)",
    papers: [
      {
        id: "prsu-s2-p1",
        paperNumber: 1,
        title: "Corporate Accounting (कंपनी लेखांकन)",
        marks: 100,
        description: "Shares, debentures redemption, company final accounts under Schedule III, valuation of goodwill/shares, amalgamation.",
        chapters: [
          { id: "prsu-s2-p1-ch1", number: 1, title: "Issue, Forfeiture & Re-issue of Shares, Pro-rata Allotment", hindiTitle: "अंशों का निर्गमन, जब्ती एवं आनुपातिक आवंटन", description: "Calls-in-arrears, calls-in-advance, forfeiture mechanics, re-issue at premium/discount.", levels: { min: 20, max: 55 }, topicsCount: 8, estimatedHours: 16, isCompleted: true },
          { id: "prsu-s2-p1-ch2", number: 2, title: "Redemption of Preference Shares & Debentures", hindiTitle: "पूर्वाधिकार अंशों एवं ऋणपत्रों का शोधन", description: "Capital Redemption Reserve (CRR), purchase of own debentures, ex-interest/cum-interest.", levels: { min: 25, max: 60 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s2-p1-ch3", number: 3, title: "Final Accounts of Companies as per Schedule III", hindiTitle: "कंपनी के अंतिम खाते: कंपनी अधिनियम 2013 अनुसूची III", description: "Statement of Profit & Loss, Balance Sheet format, corporate dividend tax provisions.", levels: { min: 30, max: 65 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s2-p1-ch4", number: 4, title: "Valuation of Goodwill and Valuation of Shares", hindiTitle: "ख्याति एवं अंशों का मूल्यांकन", description: "Super profit method, capitalization method, intrinsic value, yield value, fair value.", levels: { min: 30, max: 65 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s2-p1-ch5", number: 5, title: "Amalgamation, Absorption & Internal Reconstruction (AS-14)", hindiTitle: "कंपनियों का एकीकरण, संविलियन एवं आंतरिक पुनर्निर्माण", description: "Pooling of interests vs purchase method, capital reduction scheme, restructuring balance sheet.", levels: { min: 35, max: 70 }, topicsCount: 9, estimatedHours: 18 }
        ]
      },
      {
        id: "prsu-s2-p2",
        paperNumber: 2,
        title: "Business Economics (व्यावसायिक अर्थशास्त्र)",
        marks: 100,
        description: "Demand elasticity, indifference curves, production function, market pricing, theories of distribution.",
        chapters: [
          { id: "prsu-s2-p2-ch1", number: 1, title: "Law of Demand, Elasticity of Demand & Consumer Surplus", hindiTitle: "मांग का नियम, मांग की लोच एवं उपभोक्ता की बचत", description: "Price, income, cross elasticity, measurement methods, consumer equilibrium.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s2-p2-ch2", number: 2, title: "Indifference Curve Analysis & Marginal Rate of Substitution", hindiTitle: "उदासीनता वक्र विश्लेषण एवं प्रतिस्थापन की सीमांत दर", description: "Assumptions, properties of IC, budget constraint, consumer equilibrium under IC.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 12 },
          { id: "prsu-s2-p2-ch3", number: 3, title: "Production Function & Law of Variable Proportions", hindiTitle: "उत्पादन फलन एवं परिवर्तनशील अनुपातों का नियम", description: "Total, average, marginal product, stages of production, iso-quants, returns to scale.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s2-p2-ch4", number: 4, title: "Market Structures: Perfect Competition, Monopoly & Oligopoly", hindiTitle: "बाजार रूप: पूर्ण प्रतियोगिता, एकाधिकार, एकाधिकारात्मक व अल्पाधिकार", description: "Price and output determination in short run and long run, price discrimination, kinked demand.", levels: { min: 25, max: 55 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s2-p2-ch5", number: 5, title: "Theories of Distribution: Rent, Wages, Interest & Profit", hindiTitle: "वितरण के सिद्धांत: लगान, मजदूरी, ब्याज एवं लाभ के सिद्धांत", description: "Ricardian rent, modern theory of rent, marginal productivity theory of wages, liquidity preference.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 }
        ]
      },
      {
        id: "prsu-s2-p3",
        paperNumber: 3,
        title: "Principles of Business Management (प्रबंध के सिद्धांत)",
        marks: 100,
        description: "Taylor & Fayol principles, planning, MBO, organization structures, motivation models, leadership and control.",
        chapters: [
          { id: "prsu-s2-p3-ch1", number: 1, title: "Nature & Evolution of Management Thought: Taylor & Fayol", hindiTitle: "प्रबंध की प्रकृति एवं प्रबंधकीय चिंतन का विकास: टेलर व फेयोल", description: "Scientific management principles, Fayol's 14 administrative principles, Hawthorne experiments.", levels: { min: 10, max: 40 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s2-p3-ch2", number: 2, title: "Planning Process, Strategic Decisions & MBO", hindiTitle: "नियोजन प्रक्रिया, रणनीतिक निर्णय एवं उद्देश्य आधारित प्रबंध", description: "Types of plans, steps in planning, Drucker's MBO, decision making styles.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s2-p3-ch3", number: 3, title: "Organization Structures, Span of Control & Delegation", hindiTitle: "संगठन संरचनाएं, नियंत्रण विस्तार एवं अधिकार प्रत्यायोजन", description: "Formal vs informal organization, line and staff, centralization vs decentralization.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s2-p3-ch4", number: 4, title: "Directing & Motivation: Maslow, Herzberg & McGregor", hindiTitle: "निर्देशन एवं अभिप्रेरणा: मैस्लो, हर्जबर्ग एवं मैकग्रेगर सिद्धांत", description: "Hierarchy of needs, hygiene factors, Theory X & Theory Y, intrinsic vs extrinsic rewards.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s2-p3-ch5", number: 5, title: "Leadership Styles, Coordination & Modern Control Techniques", hindiTitle: "नेतृत्व शैलियां, समन्वय एवं आधुनिक नियंत्रण तकनीकें", description: "Autocratic, democratic, laissez-faire leadership, budgetary control, PERT and CPM.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 }
        ]
      },
      {
        id: "prsu-s2-p4",
        paperNumber: 4,
        title: "Business Environment (व्यावसायिक पर्यावरण)",
        marks: 100,
        description: "Micro & macro factors, 1991 LPG reforms, NITI Aayog, FDI/FII, Make in India, EXIM policy.",
        chapters: [
          { id: "prsu-s2-p4-ch1", number: 1, title: "Nature, Concept & Dimensions of Business Environment", hindiTitle: "व्यावसायिक पर्यावरण की प्रकृति, अवधारणा एवं आयाम", description: "Internal vs external environment, PESTLE analysis, environmental scanning techniques.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s2-p4-ch2", number: 2, title: "New Economic Policy 1991: LPG Reforms in India", hindiTitle: "नई आर्थिक नीति 1991: उदारीकरण, निजीकरण, वैश्वीकरण", description: "De-licensing, dis-investment in PSUs, opening up sectors, impact on Indian industries.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s2-p4-ch3", number: 3, title: "Industrial Policy & NITI Aayog Strategic Framework", hindiTitle: "औद्योगिक नीति एवं नीति आयोग का रणनीतिक ढांचा", description: "Evolution from Planning Commission to NITI Aayog, cooperative federalism, industrial clusters.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s2-p4-ch4", number: 4, title: "Foreign Capital, FDI, FII & EXIM Policy of India", hindiTitle: "विदेशी पूंजी, प्रत्यक्ष विदेशी निवेश (FDI) एवं विदेश व्यापार नीति", description: "Automatic vs government route for FDI, foreign exchange reserves, export incentives.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s2-p4-ch5", number: 5, title: "Make in India, Digital India & Sustainable Business", hindiTitle: "मेक इन इंडिया, डिजिटल इंडिया एवं सतत व्यावसायिक पर्यावरण", description: "PLI schemes, start-up initiatives, environmental regulations, ESG compliance for businesses.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10 }
        ]
      }
    ]
  },
  {
    id: "prsu-bcom-sem3",
    title: "B.Com Semester 3 (PRSU / NEP)",
    shortTitle: "B.Com Sem 3",
    institution: "PRSU",
    description: "Third semester covering Cost Accounting, Company Law, Principles of Statistics, Banking & Financial Systems.",
    eligibility: "Completed B.Com Semester 2",
    scheme: "NEP-2020 / PRSU Scheme (4 Papers, 20 Chapters)",
    papers: [
      {
        id: "prsu-s3-p1",
        paperNumber: 1,
        title: "Cost Accounting (लागत लेखांकन)",
        marks: 100,
        description: "Cost concepts, cost sheet, material control (EOQ, stores ledger), labour incentives, overhead absorption, unit costing.",
        chapters: [
          { id: "prsu-s3-p1-ch1", number: 1, title: "Cost Concepts, Classification & Cost Sheet Preparation", hindiTitle: "लागत की अवधारणाएं, वर्गीकरण एवं लागत पत्रक निर्माण", description: "Elements of cost (direct/indirect), prime cost, works cost, cost of production, tenders.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 14, isCompleted: true },
          { id: "prsu-s3-p1-ch2", number: 2, title: "Material Control: EOQ, Stock Levels & Stores Ledger", hindiTitle: "सामग्री नियंत्रण: EOQ, स्कंध स्तर एवं स्टोर लेजर (FIFO, LIFO)", description: "Economic order quantity, reorder level, ABC analysis, FIFO, LIFO, Weighted Average pricing.", levels: { min: 30, max: 65 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s3-p1-ch3", number: 3, title: "Labour Cost & Incentive Wage Schemes: Halsey & Rowan", hindiTitle: "श्रम लागत एवं प्रेरणात्मक मजदूरी योजनाएं: हाल्से व रोवन", description: "Idle time, overtime, labour turnover, differential piece rate systems, formula calculations.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s3-p1-ch4", number: 4, title: "Overhead Accounting: Allocation, Apportionment & Absorption", hindiTitle: "उपरिव्यय लेखांकन: आबंटन, अनुभाजन एवं अवशोषण", description: "Primary and secondary distribution, machine hour rate, under/over absorption of overheads.", levels: { min: 35, max: 70 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s3-p1-ch5", number: 5, title: "Unit Costing, Job Costing & Batch Costing Methods", hindiTitle: "इकाई, उपकार्य एवं समूह लागत विधियां", description: "Output costing, job cost sheets, economic batch quantity (EBQ), practical problems.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 }
        ]
      },
      {
        id: "prsu-s3-p2",
        paperNumber: 2,
        title: "Company Law (कंपनी अधिनियम 2013)",
        marks: 100,
        description: "Corporate entity, MOA, AOA, prospectus, share capital, directors appointment and powers, meetings, winding up.",
        chapters: [
          { id: "prsu-s3-p2-ch1", number: 1, title: "Nature, Features & Types of Companies: Corporate Veil", hindiTitle: "कंपनी की प्रकृति, विशेषताएं एवं प्रकार: कॉर्पोरेट आवरण", description: "Private, public, OPC, small company, lifting of corporate veil, Salomon vs Salomon case.", levels: { min: 20, max: 55 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s3-p2-ch2", number: 2, title: "Memorandum (MOA) & Articles of Association (AOA)", hindiTitle: "सीमा नियम (MOA) एवं अंतर्नियम (AOA): आंतरिक प्रबंध का सिद्धांत", description: "Clauses of MOA, alteration procedure, doctrine of ultra vires, doctrine of indoor management.", levels: { min: 25, max: 60 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s3-p2-ch3", number: 3, title: "Prospectus, Share Capital & Debentures", hindiTitle: "प्रविवरण, अंश पूंजी एवं ऋणपत्र", description: "Shelf prospectus, red-herring, misstatements in prospectus, sweat equity, issue of debentures.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s3-p2-ch4", number: 4, title: "Directors: Appointment, Powers, Duties & Liabilities", hindiTitle: "निदेशक: नियुक्ति, अधिकार, कर्तव्य एवं दायित्व (Sec 149-166)", description: "DIN requirement, independent directors, woman director, duties under Section 166, board meetings.", levels: { min: 30, max: 65 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s3-p2-ch5", number: 5, title: "Company Meetings, Resolutions & Winding Up Procedures", hindiTitle: "कंपनी की सभाएं, प्रस्ताव एवं कंपनी का समापन", description: "AGM, EGM, quorum, ordinary and special resolutions, winding up by NCLT, voluntary winding up.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 }
        ]
      },
      {
        id: "prsu-s3-p3",
        paperNumber: 3,
        title: "Principles of Business Statistics (व्यावसायिक सांख्यिकी)",
        marks: 100,
        description: "Data classification, central tendency (mean/median/mode), dispersion, standard deviation, skewness and probability.",
        chapters: [
          { id: "prsu-s3-p3-ch1", number: 1, title: "Collection, Classification & Tabulation of Statistical Data", hindiTitle: "सांख्यिकीय समंकों का संकलन, वर्गीकरण एवं सारणीयन", description: "Primary vs secondary data, questionnaires, frequency distributions, cumulative tables.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s3-p3-ch2", number: 2, title: "Measures of Central Tendency: Mean, Median, Mode", hindiTitle: "केंद्रीय प्रवृत्ति के माप: समांतर माध्य, मध्यका एवं बहुलक", description: "Arithmetic mean, weighted mean, median, mode, geometric & harmonic mean in business.", levels: { min: 20, max: 55 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s3-p3-ch3", number: 3, title: "Measures of Dispersion: Standard Deviation & Quartiles", hindiTitle: "अपकिरण के माप: प्रमाप विचलन, प्रसरण एवं चतुर्थक विचलन", description: "Range, quartile deviation, mean deviation, variance, coefficient of variation.", levels: { min: 25, max: 60 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s3-p3-ch4", number: 4, title: "Skewness: Karl Pearson's & Bowley's Coefficients", hindiTitle: "विषमता के माप: कार्ल पियर्सन एवं बाउले के विषमता गुणांक", description: "Symmetrical vs skewed distributions, Pearson's sk1 and sk2, Bowley's quartile formula.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s3-p3-ch5", number: 5, title: "Elementary Probability Theory & Additional Theorems", hindiTitle: "प्रायिकता के मूलभूत सिद्धांत एवं प्रमेय", description: "Sample space, mutually exclusive events, addition and multiplication theorems, Bayes' theorem basics.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 14 }
        ]
      },
      {
        id: "prsu-s3-p4",
        paperNumber: 4,
        title: "Banking & Financial Systems (बैंकिंग एवं वित्तीय प्रणाली)",
        marks: 100,
        description: "RBI monetary policy, commercial banks credit creation, NPA management, negotiable banking, digital UPI systems.",
        chapters: [
          { id: "prsu-s3-p4-ch1", number: 1, title: "Reserve Bank of India: Functions & Monetary Policy Tools", hindiTitle: "भारतीय रिज़र्व बैंक: कार्य एवं मौद्रic नीति के उपकरण", description: "Currency issue, banker to government, repo rate, reverse repo, CRR, SLR, quantitative tools.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s3-p4-ch2", number: 2, title: "Commercial Banks: Credit Creation & NPA Management", hindiTitle: "व्यापारिक बैंक: साख सृजन एवं एनपीए (गैर-निष्पादित परिसंपत्ति) प्रबंधन", description: "Credit multiplier, gross vs net NPA, SARFAESI Act, IBC code, insolvency resolution.", levels: { min: 25, max: 55 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s3-p4-ch3", number: 3, title: "Banker-Customer Relationship & Banking Ombudsman", hindiTitle: "बैंकर-ग्राहक संबंध, अधिकार, दायित्व एवं बैंकिंग लोकपाल", description: "Debtor-creditor relationship, banker's lien, right of set-off, RBI Ombudsman complaint process.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s3-p4-ch4", number: 4, title: "Negotiable Instruments in Banking: Crossing & Clearance", hindiTitle: "परक्राम्य विलेख: चेक का रेखांकन, बेचान एवं समाशोधन", description: "General and special crossing, holder in due course, paying vs collecting banker protection.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s3-p4-ch5", number: 5, title: "Digital Banking: UPI, NEFT, RTGS, IMPS & Cyber Fraud", hindiTitle: "डिजिटल बैंकिंग: यूपीआई, एनईएफटी, आरटीजीएस एवं साइबर सुरक्षा", description: "NPCI infrastructure, 2-factor authentication, mobile banking safety, prevention of financial frauds.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10 }
        ]
      }
    ]
  },
  {
    id: "prsu-bcom-sem4",
    title: "B.Com Semester 4 (PRSU / NEP)",
    shortTitle: "B.Com Sem 4",
    institution: "PRSU",
    description: "Fourth semester covering Income Tax Law & Accounts (Part 1), Management Accounting, Marketing Principles, Applied Statistics.",
    eligibility: "Completed B.Com Semester 3",
    scheme: "NEP-2020 / PRSU Scheme (4 Papers, 20 Chapters)",
    papers: [
      {
        id: "prsu-s4-p1",
        paperNumber: 1,
        title: "Income Tax Law & Accounts - Part 1 (आयकर विधान एवं लेखे)",
        marks: 100,
        description: "Income Tax Act 1961: Basic definitions, agricultural income, residential status, Salary, House Property.",
        chapters: [
          { id: "prsu-s4-p1-ch1", number: 1, title: "Basic Definitions, Agricultural Income & Residential Status", hindiTitle: "मूल परिभाषाएं, कृषि आय एवं निवास स्थिति (Sec 2, 6)", description: "Assessee, assessment year, previous year, residential tests for individual/HUF/firm, tax incidence.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 14, isCompleted: true },
          { id: "prsu-s4-p1-ch2", number: 2, title: "Income from Salaries: Allowances, Perquisites & Sec 16", hindiTitle: "वेतन से आय: भत्ते, अनुलाभ एवं मानक कटौती (Sec 15-17)", description: "HRA, gratuity, commuted pension, motor car perquisite, standard deduction ₹50,000/₹75,000.", levels: { min: 30, max: 65 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s4-p1-ch3", number: 3, title: "Income from House Property: Annual Value & Deductions Sec 24", hindiTitle: "मकान संपत्ति से आय: वार्षिक मूल्य एवं कटौतियां (Sec 22-27)", description: "Gross annual value (GAV), municipal taxes, standard deduction Sec 24(a), home loan interest Sec 24(b).", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s4-p1-ch4", number: 4, title: "Aggregation of Income, Clubbing & Set-off of Losses", hindiTitle: "आय का संकलन, मिलान (Clubbing) एवं हानियों की पूर्ति", description: "Spouse/minor child income clubbing, inter-source and inter-head set off, 8-year carry forward rules.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s4-p1-ch5", number: 5, title: "Assessment Procedure, PAN, Filing of ITR & Tax Deduction (TDS)", hindiTitle: "कर निर्धारण प्रक्रिया, पैन, आयकर विवरणी (ITR) एवं टीडीएस", description: "Types of returns (ITR 1-4), due dates, self-assessment tax, basic TDS/TCS obligations.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 12 }
        ]
      },
      {
        id: "prsu-s4-p2",
        paperNumber: 2,
        title: "Management Accounting (प्रबंधकीय लेखांकन)",
        marks: 100,
        description: "Ratio analysis, Cash Flow Statement (AS-3), Marginal costing, CVP & BEP analysis, Budgetary control.",
        chapters: [
          { id: "prsu-s4-p2-ch1", number: 1, title: "Nature, Scope & Tools of Management Accounting", hindiTitle: "प्रबंधकीय लेखांकन की प्रकृति, क्षेत्र एवं उपकरण", description: "Comparison with financial and cost accounting, decision making tools, role of management accountant.", levels: { min: 20, max: 50 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s4-p2-ch2", number: 2, title: "Financial Statement Analysis & Ratio Analysis", hindiTitle: "वित्तीय विवरण विश्लेषण एवं अनुपात विश्लेषण", description: "Current ratio, debt-equity, inventory turnover, debtors turnover, operating ratio, ROE calculations.", levels: { min: 30, max: 70 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s4-p2-ch3", number: 3, title: "Cash Flow Statement as per Accounting Standard 3 (AS-3)", hindiTitle: "रोकड़ प्रवाह विवरण: लेखांकन मानक 3 (AS-3 संशोधित)", description: "Cash from operating activities (indirect method), investing activities, financing activities.", levels: { min: 35, max: 75 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s4-p2-ch4", number: 4, title: "Marginal Costing, CVP Analysis & Break-Even Point", hindiTitle: "सीमांत लागत, लागत-मात्रा-लाभ (CVP) एवं सम-विच्छेद बिंदु", description: "Contribution, P/V ratio, Break-even sales, Margin of safety, decision making problems.", levels: { min: 35, max: 75 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s4-p2-ch5", number: 5, title: "Budgetary Control: Cash Budget & Flexible Budget", hindiTitle: "बजटीय नियंत्रण: रोकड़ बजट एवं लोचशील बजट", description: "Budget manual, principal budget factor, preparation of flexible budget at different activity levels.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 }
        ]
      },
      {
        id: "prsu-s4-p3",
        paperNumber: 3,
        title: "Principles of Marketing (विपणन के सिद्धांत)",
        marks: 100,
        description: "Marketing concept, STP strategy, Product life cycle, branding, pricing models, distribution channels, promotion.",
        chapters: [
          { id: "prsu-s4-p3-ch1", number: 1, title: "Marketing Concept, Philosophy & Marketing Environment", hindiTitle: "विपणन की अवधारणा, दर्शन एवं विपणन पर्यावरण", description: "Production, product, selling, societal marketing concepts, macro & micro environment.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s4-p3-ch2", number: 2, title: "Consumer Behaviour & Market Segmentation, Targeting (STP)", hindiTitle: "उपभोक्ता व्यवहार एवं बाजार विभक्तिकरण तथा लक्ष्यीकरण (STP)", description: "Consumer decision making process, geographic, demographic, psychographic segmentation.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s4-p3-ch3", number: 3, title: "Product Decisions, Product Life Cycle (PLC) & Branding", hindiTitle: "उत्पाद निर्णय, उत्पाद जीवन चक्र (PLC) एवं ब्रांडिंग", description: "Introduction, growth, maturity, decline strategies, brand equity, packaging & labelling.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s4-p3-ch4", number: 4, title: "Pricing Strategies & Policies, Channels of Distribution", hindiTitle: "मूल्य निर्धारण नीतियां एवं वितरण माध्यम", description: "Cost-plus pricing, penetration vs skimming, zero-level, one-level channels, logistics management.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s4-p3-ch5", number: 5, title: "Promotion Mix: Advertising, PR & Personal Selling", hindiTitle: "संवर्धन मिश्रण: विज्ञापन, जनसंपर्क एवं वैयक्तिक विक्रय", description: "Advertising budget, media selection, sales promotion schemes, direct marketing.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 }
        ]
      },
      {
        id: "prsu-s4-p4",
        paperNumber: 4,
        title: "Applied Business Statistics & Correlation (व्यावहारिक सांख्यिकी)",
        marks: 100,
        description: "Karl Pearson and Spearman correlation, linear regression, Fisher index numbers, time series analysis, SQC.",
        chapters: [
          { id: "prsu-s4-p4-ch1", number: 1, title: "Correlation Analysis: Karl Pearson & Spearman's Rank", hindiTitle: "सहसंबंध विश्लेषण: कार्ल पियर्सन एवं स्पीयरमैन कोटि सहसंबंध", description: "Scatter diagram, Pearson's product moment 'r', probable error, Spearman's tied ranks formula.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 14, isCompleted: true },
          { id: "prsu-s4-p4-ch2", number: 2, title: "Linear Regression Analysis: Equations & Regression Lines", hindiTitle: "रैखिक प्रतीपगमन विश्लेषण: समीकरण एवं रेखाएं", description: "Regression coefficients bxy and byx, properties, lines of regression of Y on X and X on Y.", levels: { min: 30, max: 65 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s4-p4-ch3", number: 3, title: "Index Numbers: Laspeyres, Paasche, Fisher's Ideal Index", hindiTitle: "निर्देशांक: लास्पेयर, पाशे एवं फिशर का आदर्श सूचकांक", description: "Weighted aggregate index, time reversal test, factor reversal test, cost of living index.", levels: { min: 30, max: 65 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s4-p4-ch4", number: 4, title: "Time Series Analysis: Secular Trend & Moving Averages", hindiTitle: "काल श्रेणी विश्लेषण: उपनति एवं चल माध्य विधि", description: "Components of time series (trend, seasonal, cyclical, irregular), method of least squares.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s4-p4-ch5", number: 5, title: "Statistical Quality Control (SQC) & Shewhart Control Charts", hindiTitle: "सांख्यिकीय गुणवत्ता नियंत्रण एवं शेवार्ट नियंत्रण चार्ट", description: "X-bar chart, R-chart, p-chart, c-chart, upper and lower control limits in production.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 14 }
        ]
      }
    ]
  },
  {
    id: "prsu-bcom-sem5",
    title: "B.Com Semester 5 (PRSU / NEP)",
    shortTitle: "B.Com Sem 5",
    institution: "PRSU",
    description: "Fifth semester covering Income Tax Law (Part 2 - PGBP & Capital Gains), Financial Management, Auditing, Entrepreneurship.",
    eligibility: "Completed B.Com Semester 4",
    scheme: "NEP-2020 / PRSU Scheme (4 Papers, 20 Chapters)",
    papers: [
      {
        id: "prsu-s5-p1",
        paperNumber: 1,
        title: "Income Tax Law & Accounts - Part 2 (आयकर विधान एवं कर नियोजन)",
        marks: 100,
        description: "PGBP (Sec 28-44), Capital Gains (Sec 45-55), Other Sources, Chapter VI-A deductions, New Regime Sec 115BAC.",
        chapters: [
          { id: "prsu-s5-p1-ch1", number: 1, title: "Profits & Gains of Business or Profession (PGBP)", hindiTitle: "व्यापार अथवा पेशे के लाभ एवं प्राप्तियां (Sec 28-44)", description: "Allowable business expenses (Sec 30-37), disallowances (Sec 40, 40A), presumptive taxation (44AD).", levels: { min: 35, max: 70 }, topicsCount: 8, estimatedHours: 16, isCompleted: true },
          { id: "prsu-s5-p1-ch2", number: 2, title: "Capital Gains: STCG, LTCG & Exemptions Sec 54", hindiTitle: "पूंजीगत लाभ: अल्पकालीन, दीर्घकालीन एवं धारा 54 छूटें", description: "Cost of acquisition, indexed cost, STCG Sec 111A, LTCG Sec 112A, exemptions Sec 54, 54EC, 54F.", levels: { min: 35, max: 70 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s5-p1-ch3", number: 3, title: "Income from Other Sources & Gifts Taxation Sec 56(2)(x)", hindiTitle: "अन्य साधनों से आय एवं उपहारों पर कराधान", description: "Dividend taxation, casual earnings (lottery/betting), family pension deduction, monetary gifts.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s5-p1-ch4", number: 4, title: "Deductions from Gross Total Income (Chapter VI-A: 80C to 80U)", hindiTitle: "सकल कुल आय से कटौतियां: धारा 80C से 80U", description: "Sec 80C, 80CCC, 80CCD (NPS), 80D (health insurance), 80G (donations), 80TTA/TTB, 80U.", levels: { min: 35, max: 70 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s5-p1-ch5", number: 5, title: "Tax Computation: Old vs New Tax Regime Sec 115BAC (AY 2025-26)", hindiTitle: "कर दायित्व की गणना: पुरानी बनाम नई कर व्यवस्था (AY 2025-26)", description: "Revised slab rates under default New Scheme, rebate under Sec 87A (₹25,000 up to ₹7 Lakh), surcharge.", levels: { min: 35, max: 75 }, topicsCount: 8, estimatedHours: 16 }
        ]
      },
      {
        id: "prsu-s5-p2",
        paperNumber: 2,
        title: "Financial Management (वित्तीय प्रबंध)",
        marks: 100,
        description: "Capital budgeting (NPV/IRR), cost of capital (WACC), leverages, capital structure theories, working capital cycle.",
        chapters: [
          { id: "prsu-s5-p2-ch1", number: 1, title: "Concept, Objectives & Wealth Maximization Principle", hindiTitle: "वित्तीय प्रबंध की अवधारणा, उद्देश्य एवं संपदा अधिकतमीकरण", description: "Finance function, profit vs wealth maximization, role of Chief Financial Officer (CFO).", levels: { min: 25, max: 55 }, topicsCount: 6, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s5-p2-ch2", number: 2, title: "Capital Budgeting: NPV, IRR, Payback & Profitability Index", hindiTitle: "पूंजी बजटिंग तकनीकें: शुद्ध वर्तमान मूल्य एवं आंतरिक प्रत्याय दर", description: "Discounted cash flow techniques, NPV vs IRR conflict, capital rationing, project feasibility.", levels: { min: 40, max: 75 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s5-p2-ch3", number: 3, title: "Cost of Capital: Specific Costs & WACC", hindiTitle: "पूंजी की लागत: ऋण, अंश एवं भारित औसत पूंजी लागत (WACC)", description: "Cost of debt (Kd), preference (Kp), equity (Ke) via CAPM, book value vs market value weights.", levels: { min: 40, max: 75 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s5-p2-ch4", number: 4, title: "Capital Structure Theories & Operating / Financial Leverages", hindiTitle: "पूंजी संरचना सिद्धांत एवं उत्तोलक (EBIT-EPS विश्लेषण)", description: "Net Income, Net Operating Income, MM Theory without/with taxes, Operating & Financial Leverage.", levels: { min: 40, max: 75 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s5-p2-ch5", number: 5, title: "Working Capital Management & Cash Operating Cycle", hindiTitle: "कार्यशील पूंजी प्रबंधन एवं रोकड़ परिचालन चक्र", description: "Gross vs net working capital, estimation of working capital requirement, inventory & receivables.", levels: { min: 35, max: 70 }, topicsCount: 7, estimatedHours: 14 }
        ]
      },
      {
        id: "prsu-s5-p3",
        paperNumber: 3,
        title: "Auditing (अंकेक्षण)",
        marks: 100,
        description: "Audit procedures, internal control, vouching, verification of assets/liabilities, company auditor rights and report.",
        chapters: [
          { id: "prsu-s5-p3-ch1", number: 1, title: "Meaning, Objectives, Advantages & Types of Audit", hindiTitle: "अंकेक्षण का अर्थ, उद्देश्य, लाभ एवं प्रकार", description: "Continuous audit, interim audit, statutory audit, internal audit, distinction with accounting.", levels: { min: 25, max: 55 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s5-p3-ch2", number: 2, title: "Internal Control, Internal Check & Audit Programme", hindiTitle: "आंतरिक नियंत्रण, आंतरिक निरीक्षण एवं अंकेक्षण कार्यक्रम", description: "Auditor's evaluation of internal controls, test checking, audit working papers, audit notebook.", levels: { min: 30, max: 60 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s5-p3-ch3", number: 3, title: "Vouching: Cash, Purchases, Sales & Ledger Vouching", hindiTitle: "प्रमाणन: रोकड़, क्रय, विक्रय एवं खाता बही प्रमाणन", description: "Voucher examination, missing vouchers, vouching of wages, capital vs revenue payments.", levels: { min: 35, max: 65 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s5-p3-ch4", number: 4, title: "Verification and Valuation of Assets and Liabilities", hindiTitle: "संपत्तियों एवं दायित्वों का सत्यापन तथा मूल्यांकन", description: "Verification of plant, goodwill, inventory valuation (AS-2), contingent liabilities verification.", levels: { min: 35, max: 70 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s5-p3-ch5", number: 5, title: "Company Auditor: Appointment, Powers, Duties & Report (Sec 139-147)", hindiTitle: "कंपनी अंकेक्षक: नियुक्ति, अधिकार, कर्तव्य एवं अंकेक्षण प्रतिवेदन", description: "Qualification, disqualifications, rotation of auditors, clean vs qualified vs adverse audit report.", levels: { min: 40, max: 75 }, topicsCount: 8, estimatedHours: 16 }
        ]
      },
      {
        id: "prsu-s5-p4",
        paperNumber: 4,
        title: "Entrepreneurship Development (उद्यमिता विकास)",
        marks: 100,
        description: "Entrepreneur traits, project identification, feasibility analysis, MSME support, PMEGP, venture capital.",
        chapters: [
          { id: "prsu-s5-p4-ch1", number: 1, title: "Concept, Traits & Theories of Entrepreneurship", hindiTitle: "उद्यमिता की अवधारणा, गुण एवं सिद्धांत", description: "Schumpeter innovation theory, risk bearing, social vs corporate entrepreneurship.", levels: { min: 20, max: 50 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s5-p4-ch2", number: 2, title: "Project Identification & Feasibility Analysis", hindiTitle: "परियोजना पहचान एवं व्यवहार्यता विश्लेषण", description: "Market survey, technical feasibility, financial viability, break-even economic analysis.", levels: { min: 25, max: 55 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s5-p4-ch3", number: 3, title: "Preparation of Detailed Project Report (DPR) & Business Plan", hindiTitle: "विस्तृत परियोजना प्रतिवेदन (DPR) एवं व्यावसायिक योजना", description: "Components of bankable project report, cash flow projections, sensitivity analysis.", levels: { min: 30, max: 60 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s5-p4-ch4", number: 4, title: "Institutional Support to MSMEs: DIC, SIDBI & PMEGP Schemes", hindiTitle: "एमएसएमई को संस्थागत सहायता एवं सरकारी योजनाएं", description: "Role of District Industries Centre (DIC), NSIC, Stand-Up India, Mudra loans, credit guarantee.", levels: { min: 25, max: 55 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s5-p4-ch5", number: 5, title: "Venture Capital, Angel Investors & Startup Ecosystem", hindiTitle: "उद्यम पूंजी, एंजेल निवेशक एवं स्टार्टअप पारिस्थितिकी", description: "Seed funding, Series A/B rounds, incubation centres, Intellectual Property Rights (Patents/Trademarks).", levels: { min: 25, max: 55 }, topicsCount: 7, estimatedHours: 12 }
        ]
      }
    ]
  },
  {
    id: "prsu-bcom-sem6",
    title: "B.Com Semester 6 (PRSU / NEP)",
    shortTitle: "B.Com Sem 6",
    institution: "PRSU",
    description: "Sixth semester final year covering GST & Customs Law, Advanced Costing, Human Resource Management, E-Commerce.",
    eligibility: "Completed B.Com Semester 5",
    scheme: "NEP-2020 / PRSU Scheme (4 Papers, 20 Chapters)",
    papers: [
      {
        id: "prsu-s6-p1",
        paperNumber: 1,
        title: "Goods & Services Tax (GST) & Customs Law (जीएसटी एवं सीमा शुल्क)",
        marks: 100,
        description: "GST constitutional framework, Supply (Sec 7), Input Tax Credit (Sec 16, 17(5)), Returns, Customs duty valuation.",
        chapters: [
          { id: "prsu-s6-p1-ch1", number: 1, title: "Constitutional Framework, CGST/SGST/IGST & Supply Concept", hindiTitle: "जीएसटी का संवैधानिक ढांचा एवं आपूर्ति की अवधारणा (Sec 7)", description: "101st Constitutional Amendment, dual GST model, taxable event: supply vs sale, mixed/composite supply.", levels: { min: 40, max: 75 }, topicsCount: 8, estimatedHours: 14, isCompleted: true },
          { id: "prsu-s6-p1-ch2", number: 2, title: "Time, Place and Value of Supply & Composition Scheme Sec 10", hindiTitle: "आपूर्ति का समय, स्थान, मूल्य एवं समाधान योजना (Sec 10)", description: "Time of supply of goods/services, transaction value Sec 15, composition eligibility & tax rates.", levels: { min: 45, max: 80 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s6-p1-ch3", number: 3, title: "Input Tax Credit (ITC) Mechanics & Blocked Credits Sec 17(5)", hindiTitle: "इनपुट टैक्स क्रेडिट (ITC) एवं रोकी गई छूट (Sec 16 & 17(5))", description: "Conditions for taking ITC, blocked credits under Sec 17(5), electronic ledger utilization hierarchy.", levels: { min: 50, max: 85 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s6-p1-ch4", number: 4, title: "Registration, E-Invoicing, E-Way Bill & Returns (GSTR-1, 3B)", hindiTitle: "जीएसटी पंजीकरण, ई-इनवॉइसिंग, ई-वे बिल एवं विवरणियां", description: "Threshold limits for registration, mandatory e-invoicing, GSTR-1, GSTR-3B monthly compliance.", levels: { min: 45, max: 80 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s6-p1-ch5", number: 5, title: "Customs Law: Types of Customs Duties & Valuation of Imports", hindiTitle: "सीमा शुल्क कानून: शुल्कों के प्रकार एवं आयात माल का मूल्यांकन", description: "Basic customs duty, IGST on imports, anti-dumping duty, assessable value calculation (CIF).", levels: { min: 40, max: 75 }, topicsCount: 7, estimatedHours: 14 }
        ]
      },
      {
        id: "prsu-s6-p2",
        paperNumber: 2,
        title: "Advanced Cost & Management Accounting (उच्चतर लागत एवं प्रबंध लेखांकन)",
        marks: 100,
        description: "Process costing (losses/gains), equivalent production, service costing (transport), contract costing, standard costing.",
        chapters: [
          { id: "prsu-s6-p2-ch1", number: 1, title: "Process Costing: Normal Loss, Abnormal Loss & Abnormal Gain", hindiTitle: "प्रक्रिया लागत: सामान्य व असामान्य हानि/लाभ लेखांकन", description: "Process ledger accounts, scrap realization, valuation of abnormal loss and abnormal gain.", levels: { min: 45, max: 85 }, topicsCount: 8, estimatedHours: 16, isCompleted: true },
          { id: "prsu-s6-p2-ch2", number: 2, title: "Process Costing: Equivalent Production & Inter-Process Profits", hindiTitle: "समतुल्य उत्पादन एवं अंतर-प्रक्रिया लाभ लेखांकन", description: "Statement of equivalent units (FIFO & Weighted Average), reserve for unrealized profits.", levels: { min: 50, max: 85 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s6-p2-ch3", number: 3, title: "Operating Costing: Transport, Hotel & Hospital Costing", hindiTitle: "परिचालन/सेवा लागत: परिवहन, होटल एवं अस्पताल लागत", description: "Composite cost units (passenger-km, tonne-km, room-days), operating cost sheet preparation.", levels: { min: 40, max: 75 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s6-p2-ch4", number: 4, title: "Contract Costing: Work Certified & Escalation Clause", hindiTitle: "ठेका लागत: प्रमाणित कार्य, रोकी गई राशि एवं मूल्य वृद्धि उपवाक्य", description: "Profit on incomplete contracts (AS-7 principles), work-in-progress presentation in balance sheet.", levels: { min: 45, max: 80 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s6-p2-ch5", number: 5, title: "Standard Costing & Variance Analysis: Material & Labour", hindiTitle: "प्रमाप लागत एवं विचरण विश्लेषण: सामग्री एवं श्रम विचरण", description: "Material price/usage/mix variance, Labour rate/efficiency/idle time variance calculations.", levels: { min: 50, max: 85 }, topicsCount: 8, estimatedHours: 16 }
        ]
      },
      {
        id: "prsu-s6-p3",
        paperNumber: 3,
        title: "Human Resource Management (मानव संसाधन प्रबंध)",
        marks: 100,
        description: "HR planning, job analysis, recruitment and selection, training, 360 performance appraisal, industrial relations.",
        chapters: [
          { id: "prsu-s6-p3-ch1", number: 1, title: "Nature, Scope & Strategic Role of Human Resource Management", hindiTitle: "मानव संसाधन प्रबंध की प्रकृति, क्षेत्र एवं रणनीतिक भूमिका", description: "HR functions, personnel management vs HRM, challenges of diversity and technology.", levels: { min: 25, max: 55 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s6-p3-ch2", number: 2, title: "Human Resource Planning (HRP), Job Analysis & Description", hindiTitle: "मानव संसाधन नियोजन (HRP), कार्य विश्लेषण एवं विवरण", description: "Forecasting manpower demand/supply, job description vs job specification, job design.", levels: { min: 30, max: 60 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s6-p3-ch3", number: 3, title: "Recruitment & Selection Process, Tests & Induction", hindiTitle: "भर्ती एवं चयन प्रक्रिया, परीक्षण, साक्षात्कार एवं कार्य-परिचय", description: "Internal vs external sourcing, structured interviews, psychometric testing, induction programs.", levels: { min: 30, max: 60 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s6-p3-ch4", number: 4, title: "Training Methods & Performance Appraisal: 360-Degree Feedback", hindiTitle: "प्रशिक्षण विधियां एवं कार्य-निष्पादन मूल्यांकन (360 डिग्री फीडबैक)", description: "On-the-job vs off-the-job training, MBO appraisal, 360-degree feedback, potential evaluation.", levels: { min: 35, max: 65 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s6-p3-ch5", number: 5, title: "Industrial Relations, Trade Unions & Grievance Redressal", hindiTitle: "औद्योगिक संबंध, श्रम संघ, विवाद निवारण एवं श्रमिक कल्याण", description: "Collective bargaining, conciliation and arbitration, statutory grievance procedures in India.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 12 }
        ]
      },
      {
        id: "prsu-s6-p4",
        paperNumber: 4,
        title: "E-Commerce & Digital Business Applications (ई-कॉमर्स)",
        marks: 100,
        description: "E-commerce architecture, B2B/B2C, UPI payment systems, digital marketing, SSL security, IT Act 2000.",
        chapters: [
          { id: "prsu-s6-p4-ch1", number: 1, title: "E-Commerce Architecture & Business Models: B2B, B2C, C2C", hindiTitle: "ई-कॉमर्स वास्तुकला एवं व्यावसायिक मॉडल: B2B, B2C, C2C", description: "Marketplace vs inventory models, digital supply chain, advantages and challenges in India.", levels: { min: 25, max: 55 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s6-p4-ch2", number: 2, title: "Electronic Payment Systems: UPI, Gateways & Digital Wallets", hindiTitle: "इलेक्ट्रॉनिक भुगतान प्रणाली: यूपीआई, गेटवे एवं डिजिटल वॉलेट्स", description: "Payment gateway mechanics, merchant accounts, settlement cycles, QR-code payment rails.", levels: { min: 30, max: 60 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s6-p4-ch3", number: 3, title: "Digital Marketing, SEO, Social Commerce & Affiliate Networks", hindiTitle: "डिजिटल मार्केटिंग, एसईओ, सोशल कॉमर्स एवं एफिलिएट नेटवर्क", description: "Search engine optimization (SEO), Google Analytics, conversion funnels, influencer marketing.", levels: { min: 30, max: 60 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s6-p4-ch4", number: 4, title: "Cyber Security, Cryptography, SSL/TLS & Fraud Prevention", hindiTitle: "साइबर सुरक्षा, कूटलेखन, एसएसएल एवं वित्तीय धोखाधड़ी रोकथाम", description: "Symmetric vs asymmetric encryption, phishing and ransomware defense, PCI-DSS compliance.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s6-p4-ch5", number: 5, title: "Information Technology Act 2000 & Digital Signatures", hindiTitle: "सूचना प्रौद्योगिकी अधिनियम 2000 एवं डिजिटल हस्ताक्षर", description: "Legal recognition of electronic records, certifying authorities, cyber offenses and penalties.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 }
        ]
      }
    ]
  }
]

// 1. Replace PRSU definition in coursesData.ts
const prsuMarkerStart = 'id: "prsu",'
const nextInstMarker = 'id: "acca",'

const startIndex = coursesContent.indexOf(prsuMarkerStart)
const endIndex = coursesContent.indexOf(nextInstMarker)

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find PRSU marker bounds in coursesData.ts")
  process.exit(1)
}

// Find opening brace of the PRSU object
let objStart = coursesContent.lastIndexOf("{", startIndex)
// Find closing brace of PRSU object before ACCA
let objEnd = coursesContent.lastIndexOf("},", endIndex)

const newPrsuObject = `{\n    id: "prsu",\n    name: "Pt. Ravishankar Shukla University (PRSU), Raipur",\n    shortName: "PRSU B.Com",\n    badgeColor: "bg-amber-600 text-white",\n    description: "Premier state university in Raipur, Chhattisgarh offering undergraduate commerce degrees (B.Com Semester 1 to Semester 6) aligned with UGC NEP-2020.",\n    officialUrl: "https://www.prsu.ac.in",\n    levels: ${JSON.stringify(prsuSemesters, null, 6).replace(/\n/g, "\n    ")}\n  `

coursesContent = coursesContent.slice(0, objStart) + newPrsuObject + coursesContent.slice(objEnd + 1)
fs.writeFileSync(coursesDataPath, coursesContent, "utf-8")
console.log("✅ Successfully updated src/data/coursesData.ts with all 6 semesters, 24 papers, and 120 chapters of PRSU B.Com!")

// 2. Add sample comprehensive lessons for key PRSU chapters into chapterContentData.ts
const samplePrsuLessons = {
  "prsu-s1-p1-ch1": {
    id: "lesson-prsu-s1-p1-ch1",
    chapterId: "prsu-s1-p1-ch1",
    title: "Meaning, Principles & Accounting Standards (AS-1, AS-10)",
    hindiTitle: "लेखांकन के सिद्धांत एवं मानक (AS-1, AS-10)",
    overview: "Financial accounting is the systematic process of identifying, recording, classifying, and summarizing financial transactions according to GAAP and mandatory Accounting Standards (AS-1 Disclosure of Accounting Policies, AS-10 Property, Plant and Equipment).",
    eli10: {
      en: "Imagine you have a piggy bank and a notebook. Every time you get pocket money or buy chocolates, you write the date and exact amount. Accounting is just that notebook, but with strict rules so nobody can cheat and everyone knows your exact financial health!",
      hi: "मान लीजिए आपके पास एक गुल्लक और एक डायरी है। जब भी आपको पैसे मिलते हैं या आप कोई खर्च करते हैं, तो आप डायरी में तारीख और रकम लिखते हैं। लेखांकन (Accounting) बस वही नियमबद्ध डायरी है जिससे व्यापार का सही लाभ-हानि पता चलता है।",
      hinglish: "Socho aapke paas ek diary hai jisme aap roz ka aana-jaana paisa likhte ho. Accounting bas wahi system hai jo official rules (GAAP aur Accounting Standards) follow karta hai taaki business ka exact profit aur balance sheet pata chale."
    },
    statutoryContext: {
      standards: "AS 1 (Disclosure of Accounting Policies) & AS 10 (Property, Plant and Equipment)",
      sections: "Section 128, 129 & 133 of Companies Act 2013",
      provisions: "Requires books of accounts to be maintained on accrual basis under double-entry system, presenting a true and fair view of state of affairs."
    },
    practicalIllustration: {
      problemStatement: "M/s Raipur Traders purchased machinery costing ₹5,00,000 on 1st April 2024. Installation expenses incurred were ₹50,000. Under AS-10, determine the total capitalized cost of machinery and record the journal entry.",
      solutionSteps: [
        "Step 1: Identify purchase price (₹5,00,000) and directly attributable costs (Installation ₹50,000).",
        "Step 2: Under AS-10, all expenses incurred to bring the asset to its working condition must be capitalized.",
        "Step 3: Total capitalized cost = ₹5,00,000 + ₹50,000 = ₹5,50,000."
      ],
      journalEntries: [
        { particulars: "Machinery Account ...................................... Dr.", debit: "₹5,50,000", credit: "" },
        { particulars: "   To Bank Account", debit: "", credit: "₹5,00,000" },
        { particulars: "   To Cash Account (Installation Expenses)", debit: "", credit: "₹50,000" }
      ]
    },
    commonMistakes: [
      "Treating machinery installation charges as revenue expenditure instead of capitalizing under AS-10.",
      "Omitting fundamental accounting assumptions (Going Concern, Consistency, Accrual) without required AS-1 disclosures."
    ],
    memoryTrick: "Golden Rule of Asset Capitalization: 'Buy Price + Fit Price = Total Asset Cost' (B + F = T).",
    practiceQuestions: [
      { q: "What are the three fundamental accounting assumptions under AS-1?", a: "Going Concern, Consistency, and Accrual. If they are followed, no specific disclosure is required. If not followed, the fact must be disclosed." },
      { q: "Can installation charges of plant be debited to Profit & Loss Account?", a: "No. Under AS-10, installation charges are directly attributable costs and must be debited to Plant/Machinery Account." }
    ]
  },
  "prsu-s1-p1-ch2": {
    id: "lesson-prsu-s1-p1-ch2",
    chapterId: "prsu-s1-p1-ch2",
    title: "Royalty Accounts: Minimum Rent & Shortworkings",
    hindiTitle: "रॉयल्टी (अधिकार शुल्क) खाते: न्यूनतम किराया एवं लघुकार्य",
    overview: "Royalty is periodic consideration paid by a lessee (user) to a lessor (owner) for exploiting special rights like coal mines, patents, or copyright books. Features Minimum Rent, Shortworkings, and Recoupment clauses.",
    eli10: {
      en: "Imagine you borrow your friend's bicycle to deliver newspapers. You promise him ₹10 for every newspaper delivered, but at least ₹50 per day no matter what. That ₹50 guarantee is 'Minimum Rent'. If you deliver only 3 papers (₹30 earned), the extra ₹20 you have to pay from your pocket is 'Shortworkings'!",
      hi: "मान लीजिए आप किसी लेखक की किताब छापने का अधिकार लेते हैं। आप प्रति किताब ₹20 देने का वादा करते हैं, लेकिन साल का कम से कम ₹10,000 जरूर देंगे (न्यूनतम किराया)। यदि किसी साल केवल 300 किताबें बिकीं (₹6,000), तो बाकी के ₹4,000 जो आपको अपनी जेब से भरने पड़े, उसे 'लघुकार्य (Shortworkings)' कहते हैं।",
      hinglish: "Agar aap kisi ki mine ya book right use karte ho aur per-unit payment ke saath ek minimum guarantee (Minimum Rent) dete ho, toh production kam hone par jo deficit hota hai use Shortworkings bolte hain, jise aage chal kar recover kiya ja sakta hai."
    },
    statutoryContext: {
      standards: "Guidance Note on Accounting for Mineral Rights & Royalties",
      sections: "Mines and Minerals (Development and Regulation) Act & Indian Contract Act 1872",
      provisions: "Royalty based on actual output/sales, subject to agreed minimum dead rent and recoupment terms within lease deed."
    },
    practicalIllustration: {
      problemStatement: "A lessee took a coal mine on royalty of ₹5 per tonne of coal extracted, with Minimum Rent of ₹40,000 p.a. Shortworkings can be recouped in first 3 years. Year 1 Output: 6,000 tonnes. Year 2 Output: 10,000 tonnes. Pass journal entries in lessee's books.",
      solutionSteps: [
        "Step 1: Year 1 Actual Royalty = 6,000 * ₹5 = ₹30,000. Minimum Rent = ₹40,000. Shortworking = ₹10,000. Payment = ₹40,000.",
        "Step 2: Year 2 Actual Royalty = 10,000 * ₹5 = ₹50,000. Excess = ₹10,000. Recoup Year 1 shortworking ₹10,000. Payment = ₹40,000."
      ],
      journalEntries: [
        { date: "Year 1", particulars: "Royalty A/c ............................................. Dr.", debit: "₹30,000", credit: "" },
        { date: "Year 1", particulars: "Shortworkings A/c ................................. Dr.", debit: "₹10,000", credit: "" },
        { date: "Year 1", particulars: "   To Landlord A/c", debit: "", credit: "₹40,000" },
        { date: "Year 1", particulars: "Landlord A/c ........................................... Dr.", debit: "₹40,000", credit: "" },
        { date: "Year 1", particulars: "   To Bank A/c", debit: "", credit: "₹40,000" },
        { date: "Year 2", particulars: "Royalty A/c ............................................. Dr.", debit: "₹50,000", credit: "" },
        { date: "Year 2", particulars: "   To Shortworkings A/c (Recouped)", debit: "", credit: "₹10,000" },
        { date: "Year 2", particulars: "   To Landlord A/c (Net Payable)", debit: "", credit: "₹40,000" }
      ]
    },
    commonMistakes: [
      "Recouping shortworkings beyond the expiry period allowed in the lease agreement.",
      "Failing to transfer unrecouped shortworkings to Profit & Loss Account in the year of forfeiture."
    ],
    memoryTrick: "Formula: 'Payment to Landlord = Higher of Actual Royalty or Minimum Rent (Minus Recouped Shortworkings)'.",
    practiceQuestions: [
      { q: "What is Shortworkings in Royalty Accounts?", a: "Shortworkings is the excess of Minimum Rent over the Actual Royalty when output/sales are lower than the threshold level." },
      { q: "Where does Unrecouped Shortworkings appear at the end of the year?", a: "It is written off as a loss to the debit side of the Profit & Loss Account." }
    ]
  },
  "prsu-s6-p1-ch1": {
    id: "lesson-prsu-s6-p1-ch1",
    chapterId: "prsu-s6-p1-ch1",
    title: "Constitutional Framework, CGST/SGST/IGST & Supply Concept",
    hindiTitle: "जीएसटी का संवैधानिक ढांचा एवं आपूर्ति की अवधारणा (Sec 7)",
    overview: "Goods and Services Tax (GST) is a comprehensive destination-based consumption tax introduced via the 101st Constitutional Amendment Act 2016. Replaced 17 central and state indirect taxes with CGST, SGST, UTGST, and IGST under the supreme principle of 'Supply' (Section 7 CGST Act).",
    eli10: {
      en: "Before GST, if you bought a toy made in another state, you paid 4 different taxes: Excise, VAT, Entry Tax, CST. With GST, it's 'One Nation, One Tax'. If you buy inside your state, you pay CGST + SGST. If you buy from another state, you pay IGST directly!",
      hi: "जीएसटी से पहले एक ही सामान पर कई टैक्स लगते थे—एक्साइज ड्यूटी, वैट, एंट्री टैक्स। 1 जुलाई 2017 से 'एक देश, एक कर' लागू हुआ। राज्य के अंदर खरीदारी पर CGST और SGST आधा-आधा लगता है, और दूसरे राज्य से मंगाने पर केवल IGST लगता है।",
      hinglish: "Pehle har state me alag alag VAT aur excise lagta tha jisse tax par tax (cascading effect) hota tha. 101st Constitutional Amendment se GST aaya. Ab sirf 'Supply' par tax lagta hai: intra-state me CGST + SGST aur inter-state me IGST."
    },
    statutoryContext: {
      standards: "Articles 246A, 269A & 279A (GST Council) of the Constitution of India",
      sections: "Section 7 (Scope of Supply) & Section 9 (Levy and Collection) of CGST Act 2017",
      provisions: "Supply includes all forms of supply of goods or services or both such as sale, transfer, barter, exchange, license, rental, lease made for a consideration in the course or furtherance of business."
    },
    practicalIllustration: {
      problemStatement: "A dealer in Raipur (Chhattisgarh) supplies commercial goods worth ₹2,00,000 to a trader in Bilaspur (Chhattisgarh). Applicable GST rate is 18%. In another transaction, he supplies goods worth ₹1,50,000 to a dealer in Nagpur (Maharashtra). Calculate the CGST, SGST, and IGST applicable.",
      solutionSteps: [
        "Step 1: Raipur to Bilaspur is within Chhattisgarh (Intra-State Supply). Applicable: CGST (9%) + SGST (9%).",
        "Step 2: CGST = 9% of ₹2,00,000 = ₹18,000. SGST = 9% of ₹2,00,000 = ₹18,000. Total = ₹36,000.",
        "Step 3: Raipur to Nagpur is Chhattisgarh to Maharashtra (Inter-State Supply). Applicable: IGST (18%).",
        "Step 4: IGST = 18% of ₹1,50,000 = ₹27,000."
      ],
      journalEntries: [
        { particulars: "Bilaspur Trader A/c ..................................... Dr.", debit: "₹2,36,000", credit: "" },
        { particulars: "   To Sales Account", debit: "", credit: "₹2,00,000" },
        { particulars: "   To Output CGST Account (9%)", debit: "", credit: "₹18,000" },
        { particulars: "   To Output SGST Account (9%)", debit: "", credit: "₹18,000" },
        { particulars: "Nagpur Trader A/c ....................................... Dr.", debit: "₹1,77,000", credit: "" },
        { particulars: "   To Sales Account", debit: "", credit: "₹1,50,000" },
        { particulars: "   To Output IGST Account (18%)", debit: "", credit: "₹27,000" }
      ]
    },
    commonMistakes: [
      "Charging IGST on intra-state supply or charging CGST/SGST on interstate supply.",
      "Confusing 'Composite Supply' (taxed at principal rate) with 'Mixed Supply' (taxed at highest rate)."
    ],
    memoryTrick: "GST Golden Mantra: 'Within State = C + S (Halves). Outside State = Full I (Whole)'.",
    practiceQuestions: [
      { q: "Which Constitutional Amendment enabled the implementation of GST in India?", a: "The 101st Constitutional Amendment Act, 2016, which inserted Article 246A conferring simultaneous powers to Parliament and State Legislatures." },
      { q: "What is the taxable event under GST law?", a: "The taxable event under GST is 'Supply' of goods or services or both, as defined under Section 7 of the CGST Act 2017." }
    ]
  }
}

// Check if these lessons already exist in chapterLessonsContent
for (const [chKey, chVal] of Object.entries(samplePrsuLessons)) {
  if (!chapterLessonsContent.includes(`"${chKey}":`) && !chapterLessonsContent.includes(`${chKey}:`)) {
    const lastBraceIndex = chapterLessonsContent.lastIndexOf("}")
    const lessonString = `,\n  // PRSU B.Com Chapter: ${chVal.title}\n  "${chKey}": ${JSON.stringify(chVal, null, 2).replace(/\n/g, "\n  ")}\n}`
    chapterLessonsContent = chapterLessonsContent.slice(0, lastBraceIndex) + lessonString
  }
}

fs.writeFileSync(chapterContentPath, chapterLessonsContent, "utf-8")
console.log("✅ Successfully updated src/data/chapterContentData.ts with detailed PRSU lessons!")
