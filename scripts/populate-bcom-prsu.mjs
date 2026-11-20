import fs from "fs"
import path from "path"

const coursesDataPath = path.resolve(process.cwd(), "src/data/coursesData.ts")

console.log("Loading coursesData.ts...")
let coursesContent = fs.readFileSync(coursesDataPath, "utf-8")

// The exact PRSU / UGC NEP-2020 B.Com Curriculum (Semester 1 to Semester 6)
const prsuNepSemesters = [
  {
    id: "prsu-bcom-sem1",
    title: "B.Com Semester 1 (PRSU / NEP)",
    shortTitle: "B.Com Sem 1",
    institution: "PRSU",
    description: "Certificate Level First Semester: 6 Subjects, 20 Credits (DSC-1, DSC-2, DSC-3, GE-1, AEC-1, VAC-1).",
    eligibility: "Class 12 in Commerce or equivalent",
    scheme: "NEP-2020 / PRSU Scheme (6 Subjects - 20 Credits)",
    papers: [
      {
        id: "prsu-s1-dsc1",
        paperNumber: "DSC-1",
        title: "Fundamental of Accounting (वित्तीय लेखांकन के मूल तत्व)",
        marks: 100,
        description: "Accounting principles, standards (AS-1, AS-10), double-entry cycle, depreciation, royalty and hire purchase accounts.",
        chapters: [
          { id: "prsu-s1-dsc1-ch1", number: 1, title: "Theoretical Framework, Meaning & Accounting Standards (AS-1, AS-10)", hindiTitle: "लेखांकन का सैद्धांतिक ढांचा एवं मानक (AS-1, AS-10)", description: "Concepts, conventions, GAAP, AS-1 disclosure, AS-10 property plant equipment.", levels: { min: 10, max: 40 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s1-dsc1-ch2", number: 2, title: "Accounting Process: Journal, Ledger, Trial Balance & BRS", hindiTitle: "लेखांकन प्रक्रिया: रोजनामचा, खाता बही एवं बैंक समाधान विवरण", description: "Recording transactions, golden rules, trial balance balancing, adjusted cash book BRS.", levels: { min: 10, max: 40 }, topicsCount: 8, estimatedHours: 14, isCompleted: true },
          { id: "prsu-s1-dsc1-ch3", number: 3, title: "Depreciation Accounting, Provisions & Reserves", hindiTitle: "ह्रास लेखांकन, प्रावधान एवं संचय", description: "Straight line method, written down value method, change in method, capital vs revenue reserve.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s1-dsc1-ch4", number: 4, title: "Royalty Accounts: Minimum Rent & Shortworkings", hindiTitle: "रॉयल्टी (अधिकार शुल्क) खाते: न्यूनतम किराया एवं लघुकार्य", description: "Lessee and lessor entries, recoupment of shortworkings, strike and lockout provisions.", levels: { min: 15, max: 50 }, topicsCount: 8, estimatedHours: 14, isCompleted: true },
          { id: "prsu-s1-dsc1-ch5", number: 5, title: "Hire Purchase and Installment Purchase System", hindiTitle: "किराया क्रय एवं किस्त भुगतान पद्धति", description: "Calculation of interest, cash price calculation, repossession of goods in default cases.", levels: { min: 20, max: 50 }, topicsCount: 8, estimatedHours: 14 }
        ]
      },
      {
        id: "prsu-s1-dsc2",
        paperNumber: "DSC-2",
        title: "Business Law (व्यावसायिक सन्नियम / व्यावसायिक विधि)",
        marks: 100,
        description: "Indian Contract Act 1872, Special contracts (Indemnity, Guarantee, Bailment, Pledge, Agency) & Sale of Goods Act 1930.",
        chapters: [
          { id: "prsu-s1-dsc2-ch1", number: 1, title: "Indian Contract Act 1872: Nature, Offer, Acceptance & Consideration", hindiTitle: "भारतीय अनुबंध अधिनियम: प्रस्ताव, स्वीकृति एवं प्रतिफल", description: "Elements of valid contract, legal capacity, free consent, lawful object and consideration.", levels: { min: 10, max: 40 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s1-dsc2-ch2", number: 2, title: "Capacity to Contract, Free Consent & Void Agreements", hindiTitle: "अनुबंध की क्षमता, स्वतंत्र सहमति एवं व्यर्थ समझौते", description: "Coercion, undue influence, fraud, misrepresentation, mistake, agreements in restraint of trade.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s1-dsc2-ch3", number: 3, title: "Special Contracts: Indemnity & Guarantee", hindiTitle: "विशिष्ट अनुबंध: क्षतिपूर्ति एवं गारंटी अनुबंध", description: "Rights of indemnity holder, surety's liability, discharge of surety, rights against creditor/debtor.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s1-dsc2-ch4", number: 4, title: "Bailment, Pledge & Law of Agency", hindiTitle: "निक्षेप, गिरवी एवं एजेंसी के नियम", description: "Duties of bailor and bailee, rights of pawnee, creation and termination of agency.", levels: { min: 15, max: 45 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s1-dsc2-ch5", number: 5, title: "Sale of Goods Act 1930: Conditions, Warranties & Unpaid Seller", hindiTitle: "वस्तु विक्रय अधिनियम: शर्तें, आश्वासन एवं अदत्त विक्रेता", description: "Caveat emptor doctrine, transfer of property, rights of unpaid seller against goods.", levels: { min: 20, max: 50 }, topicsCount: 8, estimatedHours: 14 }
        ]
      },
      {
        id: "prsu-s1-dsc3",
        paperNumber: "DSC-3",
        title: "Business Economics (व्यावसायिक अर्थशास्त्र)",
        marks: 100,
        description: "Microeconomic principles, demand elasticity, indifference curve, production function and market cost structures.",
        chapters: [
          { id: "prsu-s1-dsc3-ch1", number: 1, title: "Nature and Scope of Business Economics & Decision Making", hindiTitle: "व्यावसायिक अर्थशास्त्र की प्रकृति, क्षेत्र एवं व्यावसायिक निर्णय", description: "Integration of economic theory with business practice, opportunity cost principle.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s1-dsc3-ch2", number: 2, title: "Demand Analysis, Law of Demand & Elasticity of Demand", hindiTitle: "मांग विश्लेषण, मांग का नियम एवं मांग की लोच", description: "Price, income, cross elasticity, measurement methods, demand forecasting techniques.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s1-dsc3-ch3", number: 3, title: "Consumer Behavior: Indifference Curve & Marginal Rate of Substitution", hindiTitle: "उपभोक्ता व्यवहार: उदासीनता वक्र एवं प्रतिस्थापन की सीमांत दर", description: "Assumptions, properties of IC, budget constraint, consumer equilibrium under IC.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s1-dsc3-ch4", number: 4, title: "Production Function, Law of Variable Proportions & Returns to Scale", hindiTitle: "उत्पादन फलन, परिवर्तनशील अनुपातों का नियम एवं पैमाने के प्रतिफल", description: "Total, average, marginal product, stages of production, iso-quants, returns to scale.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s1-dsc3-ch5", number: 5, title: "Cost Concepts, Revenue Curves & Short-Run/Long-Run Cost Analysis", hindiTitle: "लागत अवधारणाएं, आगम वक्र एवं अल्पकालीन/दीर्घकालीन लागत विश्लेषण", description: "Fixed and variable costs, marginal cost, U-shaped LAC curve, break-even analysis.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 }
        ]
      },
      {
        id: "prsu-s1-ge1",
        paperNumber: "GE-1",
        title: "Generic Elective: Information & Communication Technology in Business (ICT)",
        marks: 100,
        description: "Open interdisciplinary elective covering hardware, software, office productivity, internet, cloud and business data security.",
        chapters: [
          { id: "prsu-s1-ge1-ch1", number: 1, title: "Fundamentals of Computers, Hardware, Software & Operating Systems", hindiTitle: "कंप्यूटर के मूल तत्व, हार्डवेयर, सॉफ्टवेयर एवं ऑपरेटिंग सिस्टम", description: "Input/output devices, CPU architecture, system software vs application software, Windows/Linux.", levels: { min: 5, max: 35 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s1-ge1-ch2", number: 2, title: "Word Processing & Professional Business Document Formatting", hindiTitle: "वर्ड प्रोसेसिंग एवं व्यावसायिक दस्तावेज निर्माण", description: "Document design, tables, mail merge, professional templates, corporate report layout.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s1-ge1-ch3", number: 3, title: "Spreadsheets for Business: Advanced Excel, Formulas & Functions", hindiTitle: "व्यावसायिक स्प्रेडशीट: उन्नत एक्सेल, फॉर्मूले एवं फलन", description: "VLOOKUP/XLOOKUP, Pivot Tables, conditional formatting, financial functions (PMT, NPV).", levels: { min: 15, max: 45 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s1-ge1-ch4", number: 4, title: "Internet, Cloud Computing & Database Management Systems (DBMS)", hindiTitle: "इंटरनेट, क्लाउड कंप्यूटिंग एवं डेटाबेस प्रबंधन प्रणाली (DBMS)", description: "Web protocols, Google Workspace/MS 365 cloud, relational database concepts, SQL queries.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s1-ge1-ch5", number: 5, title: "Information Security, Data Privacy & Cyber Ethics in Commerce", hindiTitle: "सूचना सुरक्षा, डेटा गोपनीयता एवं वाणिज्य में साइबर नैतिकता", description: "Malware prevention, two-factor authentication, data privacy norms, cyber safety practices.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10 }
        ]
      },
      {
        id: "prsu-s1-aec1",
        paperNumber: "AEC-1",
        title: "Environmental Studies (पर्यावरण अध्ययन)",
        marks: 100,
        description: "Multidisciplinary nature of environmental science, natural resources, biodiversity, pollution control and green business.",
        chapters: [
          { id: "prsu-s1-aec1-ch1", number: 1, title: "Multidisciplinary Nature of Environmental Studies & Ecosystems", hindiTitle: "पर्यावरण अध्ययन की बहुविषयक प्रकृति एवं पारिस्थितिकी तंत्र", description: "Structure and function of forest, grassland, desert and aquatic ecosystems, food chains.", levels: { min: 5, max: 35 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s1-aec1-ch2", number: 2, title: "Natural Resources: Renewable, Non-renewable & Sustainable Conservation", hindiTitle: "प्राकृतिक संसाधन: नवीकरणीय व अनवीकरणीय तथा सतत संरक्षण", description: "Water, land, mineral, energy resources, deforestation, over-utilization, dams and conflicts.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s1-aec1-ch3", number: 3, title: "Biodiversity: Values, Threats, Hotspots & Conservation Strategies", hindiTitle: "जैव विविधता: महत्व, संकट, तप्त स्थल एवं संरक्षण रणनीतियां", description: "Genetic, species and ecosystem diversity, endangered flora and fauna, in-situ/ex-situ methods.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s1-aec1-ch4", number: 4, title: "Environmental Pollution: Air, Water, Soil, Noise & Solid Waste", hindiTitle: "पर्यावरण प्रदूषण: वायु, जल, मृदा, ध्वनि एवं ठोस अपशिष्ट प्रबंधन", description: "Causes, effects and control of urban and industrial pollutants, nuclear hazards, e-waste.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s1-aec1-ch5", number: 5, title: "Environmental Policies, Climate Change, Green Business & Law", hindiTitle: "पर्यावरण नीतियां, जलवायु परिवर्तन, हरित व्यवसाय एवं कानून", description: "Environment Protection Act 1986, climate agreements, ESG corporate responsibilities.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10 }
        ]
      },
      {
        id: "prsu-s1-vac1",
        paperNumber: "VAC-1",
        title: "Concept of Business / Pool Elective (व्यावसायिक अवधारणाएं)",
        marks: 100,
        description: "Value Added Course: Meaning, nature, forms of business organization, ethics, CSR, startups and supply chains.",
        chapters: [
          { id: "prsu-s1-vac1-ch1", number: 1, title: "Meaning, Evolution, Nature and Social Purpose of Modern Business", hindiTitle: "आधुनिक व्यवसाय की अवधारणा, विकास, प्रकृति एवं सामाजिक उद्देश्य", description: "Business vs profession vs employment, economic and social objectives of commerce.", levels: { min: 5, max: 35 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s1-vac1-ch2", number: 2, title: "Forms of Business Ownership: Sole Trader, Partnership, LLP & Company", hindiTitle: "व्यावसायिक स्वामित्व के रूप: एकाकी व्यापार, साझेदारी, एलएलपी व कंपनी", description: "Comparative features, merits, demerits, suitability for different scales of enterprise.", levels: { min: 10, max: 40 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s1-vac1-ch3", number: 3, title: "Business Ethics, Corporate Social Responsibility (CSR) & Governance", hindiTitle: "व्यावसायिक नैतिकता, कॉर्पोरेट सामाजिक उत्तरदायित्व (CSR) व सुशासन", description: "Moral principles in commercial deals, CSR mandate under Section 135 Companies Act 2013.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s1-vac1-ch4", number: 4, title: "Startups, MSMEs & Business Incubation in Indian Economy", hindiTitle: "स्टार्टअप्स, एमएसएमई एवं भारतीय अर्थव्यवस्था में व्यापार इनक्यूबेशन", description: "Entrepreneurial mindset, government incentives, registration under Udyam portal.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s1-vac1-ch5", number: 5, title: "Emerging Trends in Global Trade, Digital Business & Supply Chain", hindiTitle: "वैश्विक व्यापार, डिजिटल व्यवसाय एवं आपूर्ति श्रृंखला के नए रुझान", description: "E-commerce ecosystems, fintech innovations, circular economy business models.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10 }
        ]
      }
    ]
  },
  {
    id: "prsu-bcom-sem2",
    title: "B.Com Semester 2 (PRSU / NEP)",
    shortTitle: "B.Com Sem 2",
    institution: "PRSU",
    description: "Certificate Level Second Semester: 6 Subjects, 20 Credits (DSC-4, DSC-5, DSC-6, GE-2, AEC-2, SEC-1).",
    eligibility: "Completed B.Com Semester 1",
    scheme: "NEP-2020 / PRSU Scheme (6 Subjects - 20 Credits)",
    papers: [
      {
        id: "prsu-s2-dsc4",
        paperNumber: "DSC-4",
        title: "Business Accounting / Corporate Accounting Basics (व्यावसायिक / कंपनी लेखांकन मूल तत्व)",
        marks: 100,
        description: "Accounting for share capital, debentures, branch accounts, departmental accounts, partnership dissolution.",
        chapters: [
          { id: "prsu-s2-dsc4-ch1", number: 1, title: "Accounting for Share Capital: Issue, Forfeiture & Re-issue of Shares", hindiTitle: "अंश पूंजी लेखांकन: अंशों का निर्गमन, जब्ती एवं पुनर्निर्गमन", description: "Issue of shares at par/premium, calls in arrears/advance, pro-rata allotment, forfeiture mechanics.", levels: { min: 20, max: 55 }, topicsCount: 8, estimatedHours: 16, isCompleted: true },
          { id: "prsu-s2-dsc4-ch2", number: 2, title: "Redemption of Preference Shares & Debentures", hindiTitle: "पूर्वाधिकार अंशों एवं ऋणपत्रों का शोधन", description: "Capital Redemption Reserve (CRR), purchase of own debentures, ex-interest/cum-interest.", levels: { min: 25, max: 60 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s2-dsc4-ch3", number: 3, title: "Branch Accounts: Debtors System & Stock-Debtors Method", hindiTitle: "शाखा खाते: देनदार पद्धति एवं स्कंध-देनदार पद्धति", description: "Dependent branch accounting at cost/invoice price, branch reconciliation.", levels: { min: 20, max: 55 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s2-dsc4-ch4", number: 4, title: "Departmental Accounting & Inter-Departmental Transfers", hindiTitle: "विभागीय लेखांकन एवं अंतर-विभागीय हस्तांतरण", description: "Allocation of common expenses, transfers at cost vs selling price, unrealized profit reserve.", levels: { min: 20, max: 55 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s2-dsc4-ch5", number: 5, title: "Partnership Accounts: Dissolution & Garner vs Murray Rule", hindiTitle: "साझेदारी खाते: फर्म का विघटन एवं गार्नर बनाम मरे नियम", description: "Insolvency of partners, piecemeal distribution of cash, maximum loss method.", levels: { min: 25, max: 60 }, topicsCount: 8, estimatedHours: 14 }
        ]
      },
      {
        id: "prsu-s2-dsc5",
        paperNumber: "DSC-5",
        title: "Business Mathematics (व्यावसायिक गणित)",
        marks: 100,
        description: "Commercial mathematics, simultaneous equations, matrices, determinants, interest, annuities and calculus.",
        chapters: [
          { id: "prsu-s2-dsc5-ch1", number: 1, title: "Ratio, Proportion, Percentage & Commercial Brokerage", hindiTitle: "अनुपात, समानुपात, प्रतिशत एवं व्यापारिक दलाली", description: "Direct and inverse proportions, commission calculations, trade discount and cash discount.", levels: { min: 10, max: 40 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s2-dsc5-ch2", number: 2, title: "Simultaneous Equations & Linear Functions", hindiTitle: "युगपत समीकरण एवं रैखिक फलन", description: "Two and three variable linear systems, graphical method, applications in break-even analysis.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s2-dsc5-ch3", number: 3, title: "Matrices & Determinants: Cramer's Rule & Inverses", hindiTitle: "आव्यूह एवं सारणिक: क्रेमर नियम एवं व्युत्क्रम", description: "Matrix algebra, adjoint, inverse of 3x3 matrix, solving linear systems by Cramer's rule.", levels: { min: 15, max: 50 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s2-dsc5-ch4", number: 4, title: "Simple and Compound Interest, Annuities & Sinking Funds", hindiTitle: "साधारण व चक्रवृद्धि ब्याज, वार्षिकी एवं शोधन कोष", description: "Effective rate of interest, present value of annuity regular, amortisation schedules.", levels: { min: 15, max: 50 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s2-dsc5-ch5", number: 5, title: "Differential Calculus Basics & Linear Programming (LPP)", hindiTitle: "अवकलन की मूल बातें एवं रैखिक प्रोग्रामन (LPP)", description: "First and second order derivatives, marginal cost, revenue maximization, graphical LPP.", levels: { min: 20, max: 55 }, topicsCount: 8, estimatedHours: 16 }
        ]
      },
      {
        id: "prsu-s2-dsc6",
        paperNumber: "DSC-6",
        title: "Business Environment (व्यावसायिक पर्यावरण)",
        marks: 100,
        description: "Micro/macro factors, 1991 LPG reforms, NITI Aayog, FDI/FII, Make in India and trade policy.",
        chapters: [
          { id: "prsu-s2-dsc6-ch1", number: 1, title: "Nature, Concept & Dimensions of Business Environment", hindiTitle: "व्यावसायिक पर्यावरण की प्रकृति, अवधारणा एवं आयाम", description: "Internal vs external environment, PESTLE analysis, environmental scanning techniques.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s2-dsc6-ch2", number: 2, title: "New Economic Policy 1991: LPG Reforms in India", hindiTitle: "नई आर्थिक नीति 1991: उदारीकरण, निजीकरण, वैश्वीकरण", description: "De-licensing, dis-investment in PSUs, opening up sectors, impact on Indian industries.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s2-dsc6-ch3", number: 3, title: "Industrial Policy & NITI Aayog Strategic Framework", hindiTitle: "औद्योगिक नीति एवं नीति आयोग का रणनीतिक ढांचा", description: "Evolution from Planning Commission to NITI Aayog, cooperative federalism, industrial clusters.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s2-dsc6-ch4", number: 4, title: "Foreign Capital, FDI, FII & EXIM Policy of India", hindiTitle: "विदेशी पूंजी, प्रत्यक्ष विदेशी निवेश (FDI) एवं विदेश व्यापार नीति", description: "Automatic vs government route for FDI, foreign exchange reserves, export incentives.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s2-dsc6-ch5", number: 5, title: "Make in India, Atmanirbhar Bharat & Sustainable Industry", hindiTitle: "मेक इन इंडिया, आत्मनिर्भर भारत एवं सतत औद्योगिक विकास", description: "PLI schemes, start-up initiatives, environmental regulations, ESG compliance for businesses.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10 }
        ]
      },
      {
        id: "prsu-s2-ge2",
        paperNumber: "GE-2",
        title: "Generic Elective: Management Information Systems (MIS)",
        marks: 100,
        description: "Open interdisciplinary elective covering MIS concepts, Decision Support Systems, ERP modules, data analytics and IT security.",
        chapters: [
          { id: "prsu-s2-ge2-ch1", number: 1, title: "Introduction to MIS: Concept, Structure & Organizational Role", hindiTitle: "प्रबंध सूचना प्रणाली: अवधारणा, संरचना एवं संगठनात्मक भूमिका", description: "Data vs information, characteristics of MIS, strategic role of information in management.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s2-ge2-ch2", number: 2, title: "Decision Support Systems (DSS) & Executive Information Systems", hindiTitle: "निर्णय समर्थन प्रणाली (DSS) एवं कार्यकारी सूचना प्रणाली", description: "Components of DSS, model base, group DSS, executive dashboards for strategic decisions.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s2-ge2-ch3", number: 3, title: "Enterprise Resource Planning (ERP): SAP, Oracle & Integrated Modules", hindiTitle: "ईआरपी (ERP): एकीकृत व्यावसायिक मॉड्यूल एवं कार्यान्वयन", description: "ERP architecture, supply chain integration, finance and HR modules, challenges in ERP rollout.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s2-ge2-ch4", number: 4, title: "Business Data Analytics, Business Intelligence & Data Warehousing", hindiTitle: "व्यावसायिक डेटा एनालिटिक्स, बिजनेस इंटेलिजेंस एवं डेटा वेयरहाउसिंग", description: "Big data in business, ETL pipeline, OLAP vs OLTP, data mining for consumer insights.", levels: { min: 15, max: 50 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s2-ge2-ch5", number: 5, title: "Information Systems Security, Cloud ERP & IT Audit", hindiTitle: "सूचना प्रणाली सुरक्षा, क्लाउड ईआरपी एवं आईटी अंकेक्षण", description: "Cyber threats to enterprise systems, disaster recovery planning, IT audit standards.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10 }
        ]
      },
      {
        id: "prsu-s2-aec2",
        paperNumber: "AEC-2",
        title: "English Language / Hindi Language (भाषा संचार)",
        marks: 100,
        description: "Ability Enhancement Course: Professional language precision, reading comprehension, trade correspondence, technical writing.",
        chapters: [
          { id: "prsu-s2-aec2-ch1", number: 1, title: "Professional Communication, Grammar & Lexical Precision", hindiTitle: "व्यावसायिक संवाद, व्याकरण एवं शब्दावली परिशुद्धता", description: "Syntax in business writing, active vs passive voice in reporting, avoidance of ambiguity.", levels: { min: 5, max: 35 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s2-aec2-ch2", number: 2, title: "Reading Comprehension, Business Summaries & Precis Writing", hindiTitle: "बोधगम्यता, संक्षेपण एवं सार लेखन", description: "Techniques of analytical reading, extracting key points, one-third precis rules.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s2-aec2-ch3", number: 3, title: "Formal Business Correspondence: Inquiries, Quotations & Complaints", hindiTitle: "औपचारिक व्यावसायिक पत्राचार: पूछताछ, कोटेशन एवं शिकायती पत्र", description: "Standard business letter formats, adjustment letters, credit status letters.", levels: { min: 10, max: 40 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s2-aec2-ch4", number: 4, title: "Technical Writing, Agendas, Minutes & Executive Notices", hindiTitle: "तकनीकी लेखन, कार्यसूची, कार्यवृत्त एवं कार्यकारी सूचनाएं", description: "Drafting statutory notices, resolutions, verbatim minutes of board meetings.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s2-aec2-ch5", number: 5, title: "Oral Communication, Presentation Skills & Interview Dynamics", hindiTitle: "मौखिक प्रस्तुतीकरण, संवाद कौशल एवं साक्षात्कार तकनीक", description: "Non-verbal communication, visual aids in presentations, facing personal interview panels.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10 }
        ]
      },
      {
        id: "prsu-s2-sec1",
        paperNumber: "SEC-1",
        title: "Accounting for Everyone / Pool Elective (जनोपयोगी लेखांकन)",
        marks: 100,
        description: "Skill Enhancement Course: Financial literacy, household budgets, banking operations, basic tax filing, mutual funds.",
        chapters: [
          { id: "prsu-s2-sec1-ch1", number: 1, title: "Financial Literacy, Family Budgets & Everyday Banking Operations", hindiTitle: "वित्तीय साक्षरता, पारिवारिक बजट एवं दैनिक बैंकिंग परिचालन", description: "Need for financial planning, 50-30-20 rule, tracking expenses, avoiding high-interest debt.", levels: { min: 5, max: 35 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s2-sec1-ch2", number: 2, title: "Understanding Personal Bank Accounts, UPI, Fixed Deposits & Cards", hindiTitle: "व्यक्तिगत बैंक खाते, यूपीआई, एफडी एवं कार्ड का सुरक्षित उपयोग", description: "Savings vs current accounts, KYC norms, interest calculation, digital transaction safety.", levels: { min: 5, max: 35 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s2-sec1-ch3", number: 3, title: "Reading Financial Statements for Non-Accountants: P&L & Balance Sheet", hindiTitle: "गैर-लेखाकारों के लिए वित्तीय विवरण समझना: लाभ-हानि व बैलेंस शीट", description: "Understanding revenues, profit margins, assets, liabilities, debt ratios in simple language.", levels: { min: 10, max: 40 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s2-sec1-ch4", number: 4, title: "Basic Income Tax Filing: ITR-1 (Sahaj), Tax Deductions & Slabs", hindiTitle: "मूल आयकर विवरणी: आईटीआर-1 (सहज), कटौतियां एवं कर दरें", description: "Tax computation under old vs new regime, Section 87A rebate, e-filing workflow on portal.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s2-sec1-ch5", number: 5, title: "Mutual Funds, SIPs, Insurance & Retirement Planning", hindiTitle: "म्यूचुअल फंड, एसआईपी, बीमा एवं सेवानिवृत्ति योजना", description: "Equity vs debt mutual funds, power of compounding via SIP, term insurance, PPF/NPS.", levels: { min: 10, max: 40 }, topicsCount: 7, estimatedHours: 12 }
        ]
      }
    ]
  },
  {
    id: "prsu-bcom-sem3",
    title: "B.Com Semester 3 (PRSU / NEP)",
    shortTitle: "B.Com Sem 3",
    institution: "PRSU",
    description: "Diploma Level Third Semester: 6 Subjects, 20 Credits (DSC-7, DSC-8, DSC-9, GE-3, AEC-3, SEC-2).",
    eligibility: "Completed B.Com Semester 2",
    scheme: "NEP-2020 / PRSU Scheme (6 Subjects - 20 Credits)",
    papers: [
      {
        id: "prsu-s3-dsc7",
        paperNumber: "DSC-7",
        title: "Corporate Accounting (उच्चतर कंपनी लेखांकन)",
        marks: 100,
        description: "Company final accounts under Schedule III, valuation of goodwill and shares, amalgamation, absorption, internal reconstruction.",
        chapters: [
          { id: "prsu-s3-dsc7-ch1", number: 1, title: "Final Accounts of Companies as per Schedule III Companies Act 2013", hindiTitle: "कंपनी के अंतिम खाते: कंपनी अधिनियम 2013 अनुसूची III के अनुसार", description: "Statement of Profit & Loss, Balance Sheet format, corporate dividend tax provisions.", levels: { min: 30, max: 65 }, topicsCount: 8, estimatedHours: 16, isCompleted: true },
          { id: "prsu-s3-dsc7-ch2", number: 2, title: "Valuation of Goodwill: Average Profit, Super Profit, Capitalization", hindiTitle: "ख्याति का मूल्यांकन: औसत लाभ, अधिलाभ एवं पूंजीकरण विधि", description: "Factors affecting goodwill, purchase of super profit, annuity method, accounting treatment.", levels: { min: 30, max: 65 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s3-dsc7-ch3", number: 3, title: "Valuation of Shares: Net Assets Method, Yield Method & Fair Value", hindiTitle: "अंशों का मूल्यांकन: शुद्ध संपत्ति विधि, प्रत्याय विधि एवं उचित मूल्य", description: "Intrinsic value, dividend yield vs earnings yield, valuation of preference shares.", levels: { min: 30, max: 65 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s3-dsc7-ch4", number: 4, title: "Amalgamation, Absorption & Accounting Standard 14 (AS-14)", hindiTitle: "कंपनियों का एकीकरण, संविलियन एवं लेखांकन मानक 14 (AS-14)", description: "Pooling of interests vs purchase method, calculation of purchase consideration.", levels: { min: 35, max: 70 }, topicsCount: 9, estimatedHours: 18 },
          { id: "prsu-s3-dsc7-ch5", number: 5, title: "Internal Reconstruction, Capital Reduction Scheme & Restructuring", hindiTitle: "आंतरिक पुनर्निर्माण, पूंजी में कमी योजना एवं पुनर्गठन", description: "Section 66 procedure, reconstruction account, writing off fictitious assets, restructured balance sheet.", levels: { min: 35, max: 70 }, topicsCount: 8, estimatedHours: 16 }
        ]
      },
      {
        id: "prsu-s3-dsc8",
        paperNumber: "DSC-8",
        title: "Business Statistics (व्यावसायिक सांख्यिकी)",
        marks: 100,
        description: "Data classification, central tendency (mean/median/mode), dispersion, standard deviation, skewness and probability.",
        chapters: [
          { id: "prsu-s3-dsc8-ch1", number: 1, title: "Data Collection, Frequency Distribution, Classification & Tabulation", hindiTitle: "समंक संकलन, आवृत्ति वितरण, वर्गीकरण एवं सारणीयन", description: "Primary vs secondary data, questionnaires, cumulative frequency curves, histograms.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s3-dsc8-ch2", number: 2, title: "Measures of Central Tendency: Mean, Median, Mode, GM & HM", hindiTitle: "केंद्रीय प्रवृत्ति के माप: समांतर माध्य, मध्यका, बहुलक एवं गुणोत्तर माध्य", description: "Mathematical properties, weighted mean, positional averages, applications in business.", levels: { min: 20, max: 55 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s3-dsc8-ch3", number: 3, title: "Measures of Dispersion: Standard Deviation, Variance & Quartile Deviation", hindiTitle: "अपकिरण के माप: प्रमाप विचलन, प्रसरण एवं चतुर्थक विचलन", description: "Absolute vs relative dispersion, coefficient of variation (CV) for consistency testing.", levels: { min: 25, max: 60 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s3-dsc8-ch4", number: 4, title: "Skewness: Karl Pearson's & Bowley's Coefficients of Skewness", hindiTitle: "विषमता के माप: कार्ल पियर्सन एवं बाउले के विषमता गुणांक", description: "Symmetrical vs skewed curves, Pearson's formula based on mode/median, Bowley's quartiles.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s3-dsc8-ch5", number: 5, title: "Elementary Probability Concepts, Addition & Multiplication Theorems", hindiTitle: "प्रायिकता की मूलभूत अवधारणाएं, योग एवं गुणन प्रमेय", description: "Classical, empirical and axiomatic probability, independent events, Bayes' theorem basics.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 14 }
        ]
      },
      {
        id: "prsu-s3-dsc9",
        paperNumber: "DSC-9",
        title: "Principles of Business Management (प्रबंध के सिद्धांत)",
        marks: 100,
        description: "Fayol and Taylor principles, planning, MBO, organizational structure, motivation models, leadership styles, control.",
        chapters: [
          { id: "prsu-s3-dsc9-ch1", number: 1, title: "Management Theories: Scientific Management & Fayol's 14 Principles", hindiTitle: "प्रबंध सिद्धांत: टेलर का वैज्ञानिक प्रबंध एवं फेयोल के 14 सिद्धांत", description: "Administrative management, bureaucratic model, human relations approach, Hawthorne study.", levels: { min: 10, max: 40 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s3-dsc9-ch2", number: 2, title: "Planning, Forecasting, Decision Making & Management by Objectives (MBO)", hindiTitle: "नियोजन, पूर्वानुमान, निर्णय प्रक्रिया एवं उद्देश्य आधारित प्रबंध (MBO)", description: "Types of plans, strategic vs operational planning, steps in rational decision making.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s3-dsc9-ch3", number: 3, title: "Organization Structure, Formal/Informal, Delegation & Decentralization", hindiTitle: "संगठन संरचना, औपचारिक/अनौपचारिक, अधिकार प्रत्यायोजन व विकेंद्रीकरण", description: "Span of control, line and staff relationships, matrix organization, delegation principles.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s3-dsc9-ch4", number: 4, title: "Motivation Models: Maslow, Herzberg, McGregor's X & Y Theories", hindiTitle: "अभिप्रेरणा सिद्धांत: मैस्लो, हर्जबर्ग द्वि-घटक एवं मैकग्रेगर X व Y", description: "Hierarchy of needs, motivators vs hygiene factors, intrinsic motivation, job enrichment.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s3-dsc9-ch5", number: 5, title: "Leadership Styles, Coordination & Control Systems (PERT/CPM)", hindiTitle: "नेतृत्व शैलियां, समन्वय एवं आधुनिक नियंत्रण तकनीकें (PERT/CPM)", description: "Transformational vs transactional leadership, feedforward/feedback control, network analysis.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 }
        ]
      },
      {
        id: "prsu-s3-ge3",
        paperNumber: "GE-3",
        title: "Generic Elective: Basics of Banking & Insurance (बैंकिंग एवं बीमा के मूल सिद्धांत)",
        marks: 100,
        description: "Open interdisciplinary pool elective: Indian banking structure, RBI monetary policy, insurance principles, IRDAI regulation.",
        chapters: [
          { id: "prsu-s3-ge3-ch1", number: 1, title: "Banking System in India: Commercial Banks, RRBs & Small Finance Banks", hindiTitle: "भारतीय बैंकिंग प्रणाली: व्यापारिक बैंक, क्षेत्रीय ग्रामीण बैंक व लघु वित्त बैंक", description: "Scheduled vs non-scheduled banks, public sector banking reforms, payment banks in India.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s3-ge3-ch2", number: 2, title: "Reserve Bank of India: Functions, Credit Control, Repo/CRR/SLR", hindiTitle: "भारतीय रिज़र्व बैंक: कार्य, साख नियंत्रण एवं मौद्रिक उपकरण", description: "Monetary policy committee, repo rate, open market operations, qualitative credit controls.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s3-ge3-ch3", number: 3, title: "Banker-Customer Relationship, Rights, Duties & Banking Ombudsman", hindiTitle: "बैंकर-ग्राहक संबंध, अधिकार, कर्तव्य एवं बैंकिंग लोकपाल योजना", description: "Garnishee orders, banker's lien, right of appropriation, resolving customer grievances.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s3-ge3-ch4", number: 4, title: "Principles of Insurance: Insurable Interest, Indemnity, Subrogation", hindiTitle: "बीमा के मूल सिद्धांत: बीमायोग्य हित, क्षतिपूर्ति, प्रत्यासन एवं परम सद्विश्वास", description: "Utmost good faith, proximate cause, contribution, insurable risk characteristics.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s3-ge3-ch5", number: 5, title: "Life Insurance, General Insurance & IRDAI Regulatory Framework", hindiTitle: "जीवन बीमा, सामान्य बीमा एवं इरडा (IRDAI) नियामक ढांचा", description: "Term plans, endowment, health insurance, motor insurance, claim settlement procedures.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 }
        ]
      },
      {
        id: "prsu-s3-aec3",
        paperNumber: "AEC-3",
        title: "Hindi / English Language (उन्नत भाषा एवं अनुवाद कौशल)",
        marks: 100,
        description: "Ability Enhancement Course: Advanced commercial writing, bilingual terminology, business translation, corporate negotiation.",
        chapters: [
          { id: "prsu-s3-aec3-ch1", number: 1, title: "Advanced Business Writing, Editorial Reports & Press Releases", hindiTitle: "उन्नत व्यावसायिक लेखन, संपादकीय रिपोर्ट एवं प्रेस विज्ञप्ति", description: "Drafting corporate newsletters, executive briefings, media releases, speech drafting.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s3-aec3-ch2", number: 2, title: "Commercial Terminology: Hindi-English Bilingual Vocabularies", hindiTitle: "व्यापारिक पारिभाषिक शब्दावली: हिन्दी-अंग्रेजी द्विभाषी शब्दकोश", description: "Statutory terms in banking, accounting, taxation, company law and government gazettes.", levels: { min: 10, max: 40 }, topicsCount: 7, estimatedHours: 10 },
          { id: "prsu-s3-aec3-ch3", number: 3, title: "Translation Skills: English to Hindi & Hindi to English Business Translation", hindiTitle: "व्यावसायिक अनुवाद कौशल: अंग्रेजी से हिन्दी एवं हिन्दी से अंग्रेजी", description: "Translating audit queries, annual report excerpts, commercial contracts accurately.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s3-aec3-ch4", number: 4, title: "Meeting Management: Resolutions, Dissents & Parliamentary Procedures", hindiTitle: "सभा प्रबंध: प्रस्ताव, असहमति एवं संसदीय कार्यप्रणाली", description: "Drafting ordinary and special resolutions, recording minutes of debate, voting procedures.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s3-aec3-ch5", number: 5, title: "Corporate Public Speaking, Debate & Cross-Cultural Negotiation", hindiTitle: "कॉर्पोरेट संवाद, वाद-विवाद एवं अंतर-सांस्कृतिक वार्ता कौशल", description: "Pitching business proposals, negotiation tactics, cross-border corporate communication.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10 }
        ]
      },
      {
        id: "prsu-s3-sec2",
        paperNumber: "SEC-2",
        title: "Skill Enhancement Course: Computer Applications in Business / E-Filing",
        marks: 100,
        description: "Practical IT skills: TallyPrime accounting, ledger entries, Income Tax portal ITR e-filing, GST portal returns, DSC setup.",
        chapters: [
          { id: "prsu-s3-sec2-ch1", number: 1, title: "Accounting Software Essentials: TallyPrime / Zoho Books Setup", hindiTitle: "लेखांकन सॉफ्टवेयर: टैलीप्राइम व जोहो बुक्स कंपनी निर्माण", description: "Company configuration, chart of accounts, master creation, groups and ledger architecture.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s3-sec2-ch2", number: 2, title: "Voucher Entry, Ledger Creation & Financial Reports in Accounting Software", hindiTitle: "वाउचर प्रविष्टि, खाता बही एवं वित्तीय रिपोर्ट निर्माण", description: "Payment, receipt, sales, purchase, contra, journal vouchers, Day Book, Trial Balance, P&L.", levels: { min: 20, max: 50 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s3-sec2-ch3", number: 3, title: "E-Filing of Income Tax Returns (ITR-1 / ITR-2) on IT Portal", hindiTitle: "आयकर पोर्टल पर ई-फाइलिंग (ITR-1 / ITR-2)", description: "Downloading pre-filled data, Form 26AS & AIS reconciliation, verifying ITR via Aadhaar OTP.", levels: { min: 20, max: 55 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s3-sec2-ch4", number: 4, title: "E-Filing of GST Returns (GSTR-1, GSTR-3B) & GST Portal Operations", hindiTitle: "जीएसटी पोर्टल परिचालन एवं विवरणियां (GSTR-1, GSTR-3B)", description: "Uploading B2B invoices, generating e-way bills, offsetting tax liability using electronic ledger.", levels: { min: 25, max: 60 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s3-sec2-ch5", number: 5, title: "Digital Signature Certificates (DSC), MCA21 Portal Filings & Form Filling", hindiTitle: "डिजिटल हस्ताक्षर (DSC), एमसीए21 पोर्टल एवं कॉर्पोरेट ई-फॉर्म", description: "Class 3 DSC registration, filing SPICe+ company incorporation forms, annual return MGT-7.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 }
        ]
      }
    ]
  },
  {
    id: "prsu-bcom-sem4",
    title: "B.Com Semester 4 (PRSU / NEP)",
    shortTitle: "B.Com Sem 4",
    institution: "PRSU",
    description: "Diploma Level Fourth Semester: 6 Subjects, 20 Credits (DSC-10, DSC-11, DSC-12, GE-4, AEC-4, VAC-2 / Internship).",
    eligibility: "Completed B.Com Semester 3",
    scheme: "NEP-2020 / PRSU Scheme (6 Subjects - 20 Credits)",
    papers: [
      {
        id: "prsu-s4-dsc10",
        paperNumber: "DSC-10",
        title: "Cost Accounting (लागत लेखांकन)",
        marks: 100,
        description: "Cost concepts, cost sheet, material control (EOQ, stores ledger), labour incentives, overhead absorption, unit costing.",
        chapters: [
          { id: "prsu-s4-dsc10-ch1", number: 1, title: "Meaning, Objectives, Scope & Preparation of Cost Sheet", hindiTitle: "लागत का अर्थ, उद्देश्य, क्षेत्र एवं लागत पत्रक निर्माण", description: "Prime cost, factory cost, cost of production, total cost, quotation and tender prices.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 14, isCompleted: true },
          { id: "prsu-s4-dsc10-ch2", number: 2, title: "Material Control: EOQ, Stock Levels & Stores Ledger", hindiTitle: "सामग्री नियंत्रण: मितव्ययी आदेश मात्रा (EOQ) एवं स्टोर लेजर (FIFO, LIFO)", description: "Economic order quantity, minimum/maximum stock levels, ABC analysis, store pricing methods.", levels: { min: 30, max: 65 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s4-dsc10-ch3", number: 3, title: "Labour Costing: Incentive Wage Plans (Halsey, Rowan & Taylor)", hindiTitle: "श्रम लागत एवं प्रेरणात्मक मजदूरी योजनाएं: हाल्से, रोवन व टेलर", description: "Time wage vs piece wage, idle time, overtime, labour turnover ratios, efficiency bonuses.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s4-dsc10-ch4", number: 4, title: "Overhead Allocation, Apportionment & Absorption (Machine Hour Rate)", hindiTitle: "उपरिव्यय आबंटन, अनुभाजन एवं अवशोषण (मशीन घंटा दर)", description: "Primary and secondary distribution summary, step-ladder method, machine hour rate computation.", levels: { min: 35, max: 70 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s4-dsc10-ch5", number: 5, title: "Methods of Costing: Unit Costing, Job Costing & Batch Costing", hindiTitle: "लागत पद्धतियां: इकाई लागत, उपकार्य लागत एवं समूह लागत विधियां", description: "Job cost sheet, economic batch quantity (EBQ), practical applications in production.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 }
        ]
      },
      {
        id: "prsu-s4-dsc11",
        paperNumber: "DSC-11",
        title: "Company Law (कंपनी अधिनियम 2013)",
        marks: 100,
        description: "Corporate entity, MOA, AOA, prospectus, share capital, directors appointment, powers, meetings, winding up.",
        chapters: [
          { id: "prsu-s4-dsc11-ch1", number: 1, title: "Nature, Characteristics & Types of Companies: Corporate Veil", hindiTitle: "कंपनी की प्रकृति, विशेषताएं एवं प्रकार: कॉर्पोरेट आवरण", description: "Private, public, OPC, small company, lifting of corporate veil, Salomon vs Salomon case.", levels: { min: 20, max: 55 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s4-dsc11-ch2", number: 2, title: "Incorporation, Memorandum (MOA) & Articles of Association (AOA)", hindiTitle: "कंपनी समामेलन, सीमा नियम (MOA) एवं अंतर्नियम (AOA)", description: "Clauses of MOA, alteration procedure, doctrine of ultra vires, doctrine of indoor management.", levels: { min: 25, max: 60 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s4-dsc11-ch3", number: 3, title: "Prospectus, Allotment of Securities, Share Capital & Debentures", hindiTitle: "प्रविवरण, प्रतिभूतियों का आवंटन, अंश पूंजी एवं ऋणपत्र", description: "Shelf prospectus, red-herring, misstatements in prospectus, sweat equity, debentures.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s4-dsc11-ch4", number: 4, title: "Directors: Appointment, Disqualification, Powers, Duties & Section 166", hindiTitle: "निदेशक: नियुक्ति, अयोग्यताएं, अधिकार, कर्तव्य एवं धारा 166", description: "DIN requirement, independent directors, woman director, duties of directors, board meetings.", levels: { min: 30, max: 65 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s4-dsc11-ch5", number: 5, title: "Meetings, Resolutions, Board Committees, Prevention of Oppression & Winding Up", hindiTitle: "सभाएं, प्रस्ताव, बोर्ड समितियां, उत्पीड़न रोकथाम एवं कंपनी समापन", description: "AGM, EGM, quorum, ordinary and special resolutions, winding up by NCLT, voluntary winding up.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 }
        ]
      },
      {
        id: "prsu-s4-dsc12",
        paperNumber: "DSC-12",
        title: "Fundamentals of Entrepreneurship / Business Finance (उद्यमिता एवं व्यावसायिक वित्त)",
        marks: 100,
        description: "Entrepreneur traits, opportunity scanning, bankable project reports (DPR), seed capital, venture finance, MSME policies.",
        chapters: [
          { id: "prsu-s4-dsc12-ch1", number: 1, title: "Meaning, Traits, Functions and Economic Role of Entrepreneurs", hindiTitle: "उद्यमिता का अर्थ, विशेषताएं, कार्य एवं आर्थिक विकास में भूमिका", description: "Schumpeter innovation model, entrepreneurial competencies, intrapreneurship.", levels: { min: 20, max: 50 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s4-dsc12-ch2", number: 2, title: "Ideation, Business Opportunity Scanning & Feasibility Analysis", hindiTitle: "व्यावसायिक अवसर की पहचान, विचार सृजन एवं व्यवहार्यता विश्लेषण", description: "Market, technical, financial and economic viability tests, SWOT analysis for new ventures.", levels: { min: 25, max: 55 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s4-dsc12-ch3", number: 3, title: "Preparation of Bankable Detailed Project Report (DPR) & Pitch Decks", hindiTitle: "विस्तृत परियोजना प्रतिवेदन (DPR) एवं निवेशक पिच डेक निर्माण", description: "Cash flow projections, break-even point in project report, sensitivity analysis.", levels: { min: 30, max: 60 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s4-dsc12-ch4", number: 4, title: "Startup Financing: Bootstrapping, Seed Capital, Angels, Venture Capital", hindiTitle: "स्टार्टअप वित्तपोषण: बूटस्ट्रैपिंग, सीड कैपिटल, एंजेल एवं वेंचर कैपिटल", description: "Stages of startup funding, term sheets, equity dilution, crowd-funding mechanisms.", levels: { min: 25, max: 55 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s4-dsc12-ch5", number: 5, title: "MSME Support Ecosystem: PMEGP, Stand-Up India, SIDBI & Incubators", hindiTitle: "एमएसएमई सहायता पारिस्थितिकी: PMEGP, स्टैंड-अप इंडिया, सिडबी व इनक्यूबेटर", description: "Credit guarantee schemes, MSME Samadhaan for delayed payments, technology centers.", levels: { min: 25, max: 55 }, topicsCount: 7, estimatedHours: 12 }
        ]
      },
      {
        id: "prsu-s4-ge4",
        paperNumber: "GE-4",
        title: "Generic Elective: Principles of Microeconomics (व्यष्टि अर्थशास्त्र के सिद्धांत)",
        marks: 100,
        description: "Open interdisciplinary pool elective: PPC, consumer optimization, production isoquants, market structures, game theory.",
        chapters: [
          { id: "prsu-s4-ge4-ch1", number: 1, title: "Scarcity, Choice, Production Possibility Curve (PPC) & Opportunity Cost", hindiTitle: "दुर्लभता, चयन, उत्पादन संभावना वक्र (PPC) एवं अवसर लागत", description: "Central problems of an economy, marginal rate of transformation, shifts in PPC.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s4-ge4-ch2", number: 2, title: "Consumer Choice: Indifference Curves, Budget Constraints & Optimal Choice", hindiTitle: "उपभोक्ता चयन: उदासीनता वक्र, बजट रेखा एवं इष्टतम उपभोग", description: "Income and substitution effects (Hicks and Slutsky), Giffen goods, normal vs inferior goods.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s4-ge4-ch3", number: 3, title: "Production with One and Multiple Variable Inputs, Isoquants & Isocosts", hindiTitle: "उत्पादन फलन: सम-उत्पाद वक्र, सम-लागत रेखा एवं उत्पादक संतुलन", description: "Marginal rate of technical substitution (MRTS), expansion path, ridge lines.", levels: { min: 15, max: 45 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s4-ge4-ch4", number: 4, title: "Market Structure: Perfect Competition, Monopoly & Price Discrimination", hindiTitle: "बाजार संरचना: पूर्ण प्रतियोगिता, एकाधिकार एवं मूल्य विभेद", description: "Short-run and long-run equilibrium, first, second, third degree price discrimination.", levels: { min: 20, max: 50 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s4-ge4-ch5", number: 5, title: "Monopolistic Competition, Oligopoly & Game Theory Basics", hindiTitle: "एकाधिकारात्मक प्रतियोगिता, अल्पाधिकार एवं गेम थ्योरी की मूल बातें", description: "Product differentiation, selling costs, kinked demand curve model, Prisoner's Dilemma.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 }
        ]
      },
      {
        id: "prsu-s4-aec4",
        paperNumber: "AEC-4",
        title: "Ability Enhancement Course: Professional Ethics & Human Values (व्यावसायिक नैतिकता)",
        marks: 100,
        description: "Ethics philosophy, corporate governance committees, accounting fraud case studies, workplace PoSH, green CSR.",
        chapters: [
          { id: "prsu-s4-aec4-ch1", number: 1, title: "Philosophy of Ethics, Morality, Values & Integrity in Profession", hindiTitle: "व्यावसायिक नैतिकता, सत्यनिष्ठा एवं मानवीय मूल्यों का दर्शन", description: "Deontological vs teleological ethics, fundamental human values, ethical dilemmas in finance.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s4-aec4-ch2", number: 2, title: "Corporate Governance: Cadbury Report, Kumar Mangalam Birla Committee", hindiTitle: "कॉर्पोरेट प्रशासन: कैडबरी समिति एवं कुमार मंगलम बिड़ला समिति", description: "OECD principles of corporate governance, audit committee role, independent directors.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s4-aec4-ch3", number: 3, title: "Ethical Issues in Accounting, Insider Trading & Corporate Frauds", hindiTitle: "लेखांकन में नैतिक मुद्दे, भेदिया व्यापार एवं कॉर्पोरेट घोटाले", description: "Creative accounting, Satyam scandal, Enron collapse, SEBI Prohibition of Insider Trading regulations.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s4-aec4-ch4", number: 4, title: "Workplace Ethics, Harassment Prevention (PoSH Act) & Whistleblower Policies", hindiTitle: "कार्यस्थल नैतिकता, पोश अधिनियम (PoSH) एवं विसलब्लोअर नीतियां", description: "Internal Complaints Committee (ICC), gender equality, protection to whistleblowers under law.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s4-aec4-ch5", number: 5, title: "Environmental Ethics, Sustainable Development & Green Business Practices", hindiTitle: "पर्यावरणीय नैतिकता, सतत विकास एवं हरित व्यावसायिक व्यवहार", description: "Carbon footprint tracking, zero liquid discharge, sustainable corporate reporting.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10 }
        ]
      },
      {
        id: "prsu-s4-vac2",
        paperNumber: "VAC-2",
        title: "Value Added Course: Summer Internship / Field Project (व्यावहारिक इंटर्नशिप)",
        marks: 100,
        description: "Field training in industry/banks/offices: organizational exposure, commercial transactions, project report, viva-voce.",
        chapters: [
          { id: "prsu-s4-vac2-ch1", number: 1, title: "Internship Preparation, Organizational Structure & Corporate Etiquette", hindiTitle: "इंटर्नशिप की तैयारी, संगठनात्मक संरचना एवं कॉर्पोरेट शिष्टाचार", description: "Workplace expectations, reporting hierarchy, professional dress codes, confidentiality agreements.", levels: { min: 10, max: 40 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s4-vac2-ch2", number: 2, title: "Practical Commerce Field Exposure: Banking, Accounting or Retail Operations", hindiTitle: "व्यावहारिक वाणिज्य क्षेत्रीय अनुभव: बैंकिंग, लेखांकन अथवा खुदरा व्यापार", description: "Observing real-world commercial transaction processing, cashier operations, invoicing desks.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s4-vac2-ch3", number: 3, title: "Data Gathering, Daily Logbook Maintenance & Project Formulation", hindiTitle: "समंक संकलन, दैनिक कार्य विवरण (लॉगबुक) एवं परियोजना रूपरेखा", description: "Maintaining day-to-day activity logs signed by industry mentor, identifying project topics.", levels: { min: 15, max: 45 }, topicsCount: 6, estimatedHours: 10 },
          { id: "prsu-s4-vac2-ch4", number: 4, title: "Analysis of Real-World Financial Transactions & Workflow Documentation", hindiTitle: "व्यावहारिक वित्तीय लेन-देन का विश्लेषण एवं कार्यप्रवाह प्रलेखन", description: "Case analysis of internal controls, cash flow bottlenecks, customer service workflows.", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s4-vac2-ch5", number: 5, title: "Internship Project Report Writing, Presentation & Viva-Voce Defense", hindiTitle: "इंटर्नशिप रिपोर्ट लेखन, प्रस्तुतीकरण एवं मौखिक परीक्षा", description: "Structure of standard project report (Introduction, Methodology, Findings, Recommendations).", levels: { min: 20, max: 50 }, topicsCount: 7, estimatedHours: 12 }
        ]
      }
    ]
  },
  {
    id: "prsu-bcom-sem5",
    title: "B.Com Semester 5 (PRSU / NEP)",
    shortTitle: "B.Com Sem 5",
    institution: "PRSU",
    description: "Degree Level Fifth Semester: 5 Subjects, 20 Credits (DSC-13, DSC-14, DSC-15, DSE-1, SEC-3 / Internship).",
    eligibility: "Completed B.Com Semester 4",
    scheme: "NEP-2020 / PRSU Scheme (5-6 Subjects - 20 Credits)",
    papers: [
      {
        id: "prsu-s5-dsc13",
        paperNumber: "DSC-13",
        title: "Income Tax Law & Practice (आयकर विधान एवं व्यवहार)",
        marks: 100,
        description: "Income Tax Act 1961: Residential status, Salary, House Property, PGBP, Capital Gains, Deductions 80C-80U, Tax Slabs (AY 2025-26).",
        chapters: [
          { id: "prsu-s5-dsc13-ch1", number: 1, title: "Basic Concepts, Scope of Total Income, Agricultural Income & Residential Status", hindiTitle: "आयकर की मूल अवधारणाएं, कृषि आय एवं निवास स्थिति (Sec 2, 5, 6, 10)", description: "Assessee, assessment year, previous year, residential test of individuals, tax incidence.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 14, isCompleted: true },
          { id: "prsu-s5-dsc13-ch2", number: 2, title: "Income from Salaries: Allowances, Perquisites, Retirement Benefits & Sec 16", hindiTitle: "वेतन से आय: भत्ते, अनुलाभ, सेवानिवृत्ति लाभ एवं मानक कटौती", description: "HRA, gratuity, commuted pension, perquisites valuation, standard deduction ₹50,000/₹75,000.", levels: { min: 30, max: 65 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s5-dsc13-ch3", number: 3, title: "Income from House Property: Annual Value & Deductions Sec 24", hindiTitle: "मकान संपत्ति से आय: वार्षिक मूल्य एवं कटौतियां (Sec 22-27)", description: "Gross annual value (GAV), municipal taxes, standard deduction Sec 24(a), interest Sec 24(b).", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s5-dsc13-ch4", number: 4, title: "Profits & Gains of Business or Profession (PGBP) & Capital Gains (Sec 28-55)", hindiTitle: "व्यापार अथवा पेशे के लाभ एवं पूंजीगत लाभ (Sec 28-55)", description: "Admissible expenses (30-37), disallowances (40, 40A), STCG Sec 111A, LTCG Sec 112A, exemptions Sec 54.", levels: { min: 35, max: 70 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s5-dsc13-ch5", number: 5, title: "Deductions under Chapter VI-A (80C to 80U) & Total Tax Liability (AY 2025-26)", hindiTitle: "सकल कुल आय से कटौतियां (80C से 80U) एवं कर दायित्व (AY 2025-26)", description: "Deductions 80C, 80D, 80G, tax calculation under default New Scheme Sec 115BAC, rebate 87A.", levels: { min: 35, max: 75 }, topicsCount: 8, estimatedHours: 16 }
        ]
      },
      {
        id: "prsu-s5-dsc14",
        paperNumber: "DSC-14",
        title: "Auditing (अंकेक्षण सिद्धान्त एवं व्यवहार)",
        marks: 100,
        description: "Audit principles, internal control, vouching, verification of assets/liabilities, company auditor appointment, powers, report.",
        chapters: [
          { id: "prsu-s5-dsc14-ch1", number: 1, title: "Meaning, Nature, Objectives & Basic Principles of Auditing", hindiTitle: "अंकेक्षण का अर्थ, प्रकृति, उद्देश्य एवं मूलभूत सिद्धांत", description: "Continuous audit, interim audit, statutory audit, internal audit, distinction with accounting.", levels: { min: 25, max: 55 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s5-dsc14-ch2", number: 2, title: "Internal Control, Internal Check, Audit Programme & Working Papers", hindiTitle: "आंतरिक नियंत्रण, आंतरिक निरीक्षण, अंकेक्षण कार्यक्रम एवं कार्यपत्रक", description: "Auditor's evaluation of internal controls, test checking, audit working papers, audit notebook.", levels: { min: 30, max: 60 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s5-dsc14-ch3", number: 3, title: "Vouching: Cash Book, Purchases, Sales, Deferred Revenue & Ledger", hindiTitle: "प्रमाणन: रोकड़, क्रय, विक्रय, आस्थगित आयगत व्यय एवं खाता बही", description: "Voucher examination, missing vouchers, vouching of wages, capital vs revenue payments.", levels: { min: 35, max: 65 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s5-dsc14-ch4", number: 4, title: "Verification and Valuation of Fixed, Current & Intangible Assets and Liabilities", hindiTitle: "स्थाई, चालू व अमूर्त संपत्तियों एवं दायित्वों का सत्यापन तथा मूल्यांकन", description: "Verification of plant, goodwill, inventory valuation (AS-2), contingent liabilities verification.", levels: { min: 35, max: 70 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s5-dsc14-ch5", number: 5, title: "Company Auditor: Appointment, Qualifications, Powers, Duties & Audit Reports", hindiTitle: "कंपनी अंकेक्षक: नियुक्ति, अधिकार, कर्तव्य एवं अंकेक्षण प्रतिवेदन (Sec 139-147)", description: "Qualification, disqualifications, rotation of auditors, clean vs qualified vs adverse audit report.", levels: { min: 40, max: 75 }, topicsCount: 8, estimatedHours: 16 }
        ]
      },
      {
        id: "prsu-s5-dsc15",
        paperNumber: "DSC-15",
        title: "Principles of Marketing / Financial Management (विपणन एवं वित्तीय प्रबंध)",
        marks: 100,
        description: "Capital budgeting (NPV/IRR), cost of capital (WACC), leverages, capital structure, working capital management.",
        chapters: [
          { id: "prsu-s5-dsc15-ch1", number: 1, title: "Financial Management: Objectives, Wealth Maximization, Time Value of Money", hindiTitle: "वित्तीय प्रबंध: उद्देश्य, संपदा अधिकतमीकरण एवं मुद्रा का समय मूल्य", description: "Finance function, profit vs wealth maximization, present value and future value discounting.", levels: { min: 25, max: 55 }, topicsCount: 6, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s5-dsc15-ch2", number: 2, title: "Capital Budgeting Decisions: Payback Period, Net Present Value (NPV), IRR & PI", hindiTitle: "पूंजी बजटिंग तकनीकें: शुद्ध वर्तमान मूल्य (NPV) एवं आंतरिक प्रत्याय दर (IRR)", description: "Discounted cash flow techniques, NPV vs IRR conflict, capital rationing, project feasibility.", levels: { min: 40, max: 75 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s5-dsc15-ch3", number: 3, title: "Cost of Capital: Cost of Debt, Equity, Retained Earnings & WACC", hindiTitle: "पूंजी की लागत: ऋण, अंश, प्रतिधारित आय एवं भारित औसत पूंजी लागत (WACC)", description: "Cost of debt (Kd), preference (Kp), equity (Ke) via CAPM, book value vs market value weights.", levels: { min: 40, max: 75 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s5-dsc15-ch4", number: 4, title: "Capital Structure Theories & Leverage Analysis (EBIT-EPS, Operating & Financial)", hindiTitle: "पूंजी संरचना सिद्धांत एवं उत्तोलक विश्लेषण (EBIT-EPS, परिचालन व वित्तीय उत्तोलक)", description: "Net Income, Net Operating Income, MM Theory without/with taxes, Operating & Financial Leverage.", levels: { min: 40, max: 75 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s5-dsc15-ch5", number: 5, title: "Working Capital Management: Operating Cycle, Cash, Inventory & Receivables", hindiTitle: "कार्यशील पूंजी प्रबंधन: परिचालन चक्र, रोकड़, स्कंध एवं देनदार प्रबंधन", description: "Gross vs net working capital, estimation of working capital requirement, cash budgets.", levels: { min: 35, max: 70 }, topicsCount: 7, estimatedHours: 14 }
        ]
      },
      {
        id: "prsu-s5-dse1",
        paperNumber: "DSE-1",
        title: "Discipline Specific Elective: Financial Services & Institutions (वित्तीय सेवाएं एवं संस्थान)",
        marks: 100,
        description: "Specialized Finance Group Paper 1: Merchant banking, mutual funds, leasing, factoring, credit rating agencies, venture finance.",
        chapters: [
          { id: "prsu-s5-dse1-ch1", number: 1, title: "Financial System in India: Money Market, Capital Market & Regulatory Structure", hindiTitle: "भारतीय वित्तीय प्रणाली: मुद्रा बाजार, पूंजी बाजार एवं नियामक ढांचा", description: "Call money market, commercial paper, treasury bills, role of SEBI and RBI in capital markets.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s5-dse1-ch2", number: 2, title: "Merchant Banking, Issue Management, Underwriting & Book Building", hindiTitle: "मर्चेंट बैंकिंग, इश्यू मैनेजमेंट, हामीदारी एवं बुक बिल्डिंग प्रक्रिया", description: "Pre-issue and post-issue activities, SEBI ICDR regulations, role of lead managers.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s5-dse1-ch3", number: 3, title: "Mutual Funds: Types of Schemes, NAV Determination & SEBI Mutual Fund Regulations", hindiTitle: "म्यूचुअल फंड: योजनाओं के प्रकार, एनएवी (NAV) निर्धारण एवं सेबी नियम", description: "Open-ended vs close-ended funds, equity, debt and hybrid funds, AMFI code of ethics.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s5-dse1-ch4", number: 4, title: "Lease Financing, Hire Purchase Finance, Factoring & Forfaiting Services", hindiTitle: "पट्टा वित्तपोषण, किराया क्रय वित्त, फैक्टरिंग एवं फॉरफेटिंग सेवाएं", description: "Financial lease vs operating lease, recourse vs non-recourse factoring, export forfaiting.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s5-dse1-ch5", number: 5, title: "Credit Rating Agencies (CRISIL, ICRA, CARE), Venture Capital & Housing Finance", hindiTitle: "क्रेडिट रेटिंग एजेंसियां (CRISIL, ICRA), वेंचर कैपिटल एवं आवास वित्त", description: "Rating methodology, symbols, benefits to investors, NHB and affordable housing finance.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 12 }
        ]
      },
      {
        id: "prsu-s5-sec3",
        paperNumber: "SEC-3",
        title: "Skill Enhancement Course / Practical Internship: Financial Analysis & Modeling",
        marks: 100,
        description: "Hands-on financial modeling: Advanced Excel, 3-statement financial modeling, DCF valuation, loan amortization schedules.",
        chapters: [
          { id: "prsu-s5-sec3-ch1", number: 1, title: "Excel for Financial Modeling: Functions, Pivot Tables, What-If Analysis", hindiTitle: "वित्तीय मॉडलिंग के लिए एक्सेल: फलन, पिवट टेबल एवं व्हॉट-इफ विश्लेषण", description: "Data tables, goal seek, scenario manager, INDEX-MATCH, OFFSET, dynamic charting.", levels: { min: 20, max: 55 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s5-sec3-ch2", number: 2, title: "Financial Statement Modeling: Building Integrated P&L, Balance Sheet & Cash Flow", hindiTitle: "वित्तीय विवरण मॉडलिंग: एकीकृत लाभ-हानि, बैलेंस शीट एवं रोकड़ प्रवाह निर्माण", description: "Linking revenue schedules, debt schedules, working capital drivers into integrated statements.", levels: { min: 30, max: 70 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s5-sec3-ch3", number: 3, title: "Valuation Modeling: Discounted Cash Flow (DCF) & Relative Valuation", hindiTitle: "मूल्यांकन मॉडलिंग: बट्टाकृत रोकड़ प्रवाह (DCF) एवं सापेक्ष मूल्यांकन", description: "Free Cash Flow to Firm (FCFF), Terminal Value estimation, PE and EV/EBITDA multiples.", levels: { min: 35, max: 75 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s5-sec3-ch4", number: 4, title: "Loan Amortization Schedules & Capital Investment Project Modeling", hindiTitle: "ऋण परिशोधन अनुसूची एवं पूंजी निवेश परियोजना मॉडलिंग", description: "Principal and interest breakup, balloon payments, project IRR and NPV calculation tables.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s5-sec3-ch5", number: 5, title: "Financial Dashboard Design, Sensitivity Analysis & Executive Presentation", hindiTitle: "वित्तीय डैशबोर्ड डिजाइन, संवेदनशीलता विश्लेषण एवं कार्यकारी प्रस्तुति", description: "Building interactive KPI visual summaries, tornado charts, presenting models to CFOs.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 14 }
        ]
      }
    ]
  },
  {
    id: "prsu-bcom-sem6",
    title: "B.Com Semester 6 (PRSU / NEP)",
    shortTitle: "B.Com Sem 6",
    institution: "PRSU",
    description: "Degree Level Final Semester: 5 Subjects, 20 Credits (DSC-16, DSC-17, DSC-18, DSE-2, Research Project / Dissertation).",
    eligibility: "Completed B.Com Semester 5",
    scheme: "NEP-2020 / PRSU Scheme (5-6 Subjects - 20 Credits)",
    papers: [
      {
        id: "prsu-s6-dsc16",
        paperNumber: "DSC-16",
        title: "Indirect Taxes with GST (जीएसटी एवं अप्रत्यक्ष कर विधान)",
        marks: 100,
        description: "Constitutional framework, Supply (Sec 7), ITC (Sec 16, 17(5)), Composition levy (Sec 10), Returns, Customs valuation.",
        chapters: [
          { id: "prsu-s6-dsc16-ch1", number: 1, title: "Constitutional Basis, CGST/SGST/IGST Architecture & Concept of Supply (Sec 7)", hindiTitle: "जीएसटी का संवैधानिक आधार, सीजीएसटी/एसजीएसटी ढांचा एवं आपूर्ति की अवधारणा", description: "101st Constitutional Amendment, dual GST model, taxable event: supply vs sale, composite/mixed supply.", levels: { min: 40, max: 75 }, topicsCount: 8, estimatedHours: 14, isCompleted: true },
          { id: "prsu-s6-dsc16-ch2", number: 2, title: "Time, Place & Value of Supply (Sec 12, 13, 15) & Composition Levy Scheme (Sec 10)", hindiTitle: "आपूर्ति का समय, स्थान व मूल्य तथा समाधान योजना (Sec 10)", description: "Time of supply of goods/services, transaction value Sec 15, composition eligibility & tax rates.", levels: { min: 45, max: 80 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s6-dsc16-ch3", number: 3, title: "Input Tax Credit (ITC): Eligibility (Sec 16), Blocked Credits (Sec 17(5)) & Reversal", hindiTitle: "इनपुट टैक्स क्रेडिट (ITC): पात्रता (Sec 16) एवं रोकी गई छूट (Sec 17(5))", description: "Conditions for taking ITC, blocked credits under Sec 17(5), electronic ledger utilization hierarchy.", levels: { min: 50, max: 85 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s6-dsc16-ch4", number: 4, title: "Registration Procedures, Tax Invoice, E-Way Bill & Filing of Returns (GSTR-1, 3B)", hindiTitle: "पंजीकरण, कर बीजक, ई-वे बिल एवं विवरणी दाखिल करना (GSTR-1, 3B)", description: "Threshold limits for registration, mandatory e-invoicing, GSTR-1, GSTR-3B monthly compliance.", levels: { min: 45, max: 80 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s6-dsc16-ch5", number: 5, title: "Customs Law: Types of Customs Duties, Assessable Value, Import & Export Procedures", hindiTitle: "सीमा शुल्क कानून: शुल्कों के प्रकार, कर योग्य मूल्य एवं आयात-निर्यात प्रक्रिया", description: "Basic customs duty, IGST on imports, anti-dumping duty, assessable value calculation (CIF).", levels: { min: 40, max: 75 }, topicsCount: 7, estimatedHours: 14 }
        ]
      },
      {
        id: "prsu-s6-dsc17",
        paperNumber: "DSC-17",
        title: "Management Accounting (प्रबंधकीय लेखांकन)",
        marks: 100,
        description: "Ratio analysis, Cash Flow Statement (AS-3), Marginal costing, CVP & Break-Even analysis, Budgetary control.",
        chapters: [
          { id: "prsu-s6-dsc17-ch1", number: 1, title: "Nature, Functions, Scope & Distinction with Financial and Cost Accounting", hindiTitle: "प्रबंधकीय लेखांकन की प्रकृति, कार्य, क्षेत्र एवं वित्तीय/लागत लेखांकन से अंतर", description: "Role of management accountant in corporate strategy, tools and techniques of management accounting.", levels: { min: 25, max: 55 }, topicsCount: 6, estimatedHours: 10, isCompleted: true },
          { id: "prsu-s6-dsc17-ch2", number: 2, title: "Ratio Analysis: Liquidity, Solvency, Turnover & Profitability Ratios", hindiTitle: "अनुपात विश्लेषण: तरलता, शोधन क्षमता, आवर्त एवं लाभदायकता अनुपात", description: "Current ratio, quick ratio, debt-equity, inventory turnover, debtors turnover, ROE, DuPont analysis.", levels: { min: 30, max: 70 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s6-dsc17-ch3", number: 3, title: "Cash Flow Statement as per Accounting Standard 3 (AS-3 Revised)", hindiTitle: "रोकड़ प्रवाह विवरण: लेखांकन मानक 3 (AS-3 संशोधित) के अनुसार", description: "Cash from operating activities (indirect method), investing activities, financing activities.", levels: { min: 35, max: 75 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s6-dsc17-ch4", number: 4, title: "Marginal Costing, Cost-Volume-Profit (CVP) Analysis & Break-Even Point (BEP)", hindiTitle: "सीमांत लागत, लागत-मात्रा-लाभ (CVP) विश्लेषण एवं सम-विच्छेद बिंदु (BEP)", description: "Contribution, P/V ratio, Break-even sales, Margin of safety, decision making problems.", levels: { min: 35, max: 75 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s6-dsc17-ch5", number: 5, title: "Budgetary Control: Classification of Budgets, Cash Budget & Flexible Budget", hindiTitle: "बजटीय नियंत्रण: बजटों का वर्गीकरण, रोकड़ बजट एवं लोचशील बजट", description: "Budget manual, principal budget factor, preparation of flexible budget at different activity levels.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 }
        ]
      },
      {
        id: "prsu-s6-dsc18",
        paperNumber: "DSC-18",
        title: "Financial Market Operations / E-Commerce (वित्तीय बाजार परिचालन एवं ई-कॉमर्स)",
        marks: 100,
        description: "Stock exchanges (BSE/NSE), IPOs, book building, SEBI regulations, payment systems (UPI), cyber security in commerce.",
        chapters: [
          { id: "prsu-s6-dsc18-ch1", number: 1, title: "Financial Markets in India: Primary Market, IPOs, FPOs & Book Building", hindiTitle: "भारतीय वित्तीय बाजार: प्राथमिक बाजार, आईपीओ, एफपीओ एवं बुक बिल्डिंग", description: "Public issue mechanism, ASBA facility, retail and institutional quota, price discovery.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s6-dsc18-ch2", number: 2, title: "Secondary Market: Stock Exchanges (BSE, NSE), Trading Mechanism & T+1 Settlement", hindiTitle: "द्वितीयक बाजार: शेयर बाजार (BSE, NSE), ट्रेडिंग प्रणाली एवं T+1 निपटान", description: "Screen-based trading, order types, demat accounts, clearing corporation operations.", levels: { min: 35, max: 70 }, topicsCount: 8, estimatedHours: 14 },
          { id: "prsu-s6-dsc18-ch3", number: 3, title: "Securities and Exchange Board of India (SEBI): Role, Powers & Investor Protection", hindiTitle: "भारतीय प्रतिभूति एवं विनिमय बोर्ड (सेबी): भूमिका, अधिकार एवं निवेशक संरक्षण", description: "SCORES platform, insider trading prohibitions, regulation of brokers and depositories.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s6-dsc18-ch4", number: 4, title: "E-Commerce Architecture, Payment Gateways, UPI, Digital Wallets & Mobile Commerce", hindiTitle: "ई-कॉमर्स वास्तुकला, भुगतान गेटवे, यूपीआई, डिजिटल वॉलेट्स एवं मोबाइल कॉमर्स", description: "B2B, B2C, C2C business models, payment gateway aggregators, QR-code payment rails.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s6-dsc18-ch5", number: 5, title: "Cyber Security in Financial Transactions, Cryptography, SSL & IT Act 2000", hindiTitle: "वित्तीय लेन-देन में साइबर सुरक्षा, कूटलेखन, एसएसएल एवं आईटी अधिनियम 2000", description: "Symmetric vs asymmetric encryption, phishing and ransomware defense, legal validity of digital signatures.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 }
        ]
      },
      {
        id: "prsu-s6-dse2",
        paperNumber: "DSE-2",
        title: "Discipline Specific Elective: Security Analysis & Portfolio Management",
        marks: 100,
        description: "Specialized Finance Group Paper 2: Risk-return analysis, fundamental EIC analysis, technical charts, Markowitz, CAPM.",
        chapters: [
          { id: "prsu-s6-dse2-ch1", number: 1, title: "Investment Environment, Risk-Return Tradeoff, Systematic vs Unsystematic Risk", hindiTitle: "निवेश पर्यावरण, जोखिम-प्रतिफल संतुलन, व्यवस्थित बनाम अव्यवस्थित जोखिम", description: "Measurement of returns, variance, standard deviation, beta coefficient computation.", levels: { min: 35, max: 75 }, topicsCount: 7, estimatedHours: 14, isCompleted: true },
          { id: "prsu-s6-dse2-ch2", number: 2, title: "Fundamental Analysis: Economic Analysis, Industry Analysis & Company Analysis (EIC)", hindiTitle: "मौलिक विश्लेषण: आर्थिक, उद्योग एवं कंपनी स्तर विश्लेषण (EIC फ्रेमवर्क)", description: "Macroeconomic indicators, industry life cycle, financial ratios analysis, management quality.", levels: { min: 35, max: 75 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s6-dse2-ch3", number: 3, title: "Technical Analysis: Dow Theory, Chart Patterns, Trendlines, Moving Averages & RSI", hindiTitle: "तकनीकी विश्लेषण: डाउ सिद्धांत, चार्ट पैटर्न, मूविंग एवरेज एवं आरएसआई (RSI)", description: "Candlestick patterns, head and shoulders, support and resistance levels, momentum indicators.", levels: { min: 35, max: 75 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s6-dse2-ch4", number: 4, title: "Efficient Market Hypothesis (EMH): Weak, Semi-Strong & Strong Form Efficiency", hindiTitle: "दक्ष बाजार परिकल्पना (EMH): कमजोर, अर्ध-मजबूत एवं मजबूत दक्षता", description: "Random walk theory, empirical tests of market efficiency, behavioral finance anomalies.", levels: { min: 30, max: 70 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s6-dse2-ch5", number: 5, title: "Portfolio Theory: Markowitz Model, Sharpe Single Index & Capital Asset Pricing Model (CAPM)", hindiTitle: "पोर्टफोलियो सिद्धांत: मार्कोविट्ज़ मॉडल, शार्प मॉडल एवं सीएपीएम (CAPM)", description: "Efficient frontier, optimal portfolio selection, Security Market Line (SML), Capital Market Line (CML).", levels: { min: 40, max: 85 }, topicsCount: 8, estimatedHours: 18 }
        ]
      },
      {
        id: "prsu-s6-proj",
        paperNumber: "PROJ",
        title: "Research Project / Dissertation / Field Work (शोध परियोजना / फील्ड वर्क)",
        marks: 100,
        description: "Capstone Undergraduate Project: Research methodology, literature review, sampling, data analysis (SPSS/Excel), viva defense.",
        chapters: [
          { id: "prsu-s6-proj-ch1", number: 1, title: "Fundamentals of Business Research Methodology: Problem Identification & Design", hindiTitle: "व्यावसायिक अनुसंधान पद्धति के मूल तत्व: समस्या पहचान एवं अनुसंधान रूपरेखा", description: "Exploratory vs descriptive vs causal research design, formulating research questions.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 12, isCompleted: true },
          { id: "prsu-s6-proj-ch2", number: 2, title: "Literature Review, Hypothesis Formulation & Conceptual Framework", hindiTitle: "साहित्य समीक्षा, परिकल्पना निर्माण एवं वैचारिक ढांचा", description: "Identifying research gaps from indexed journals, null vs alternative hypotheses.", levels: { min: 25, max: 60 }, topicsCount: 7, estimatedHours: 12 },
          { id: "prsu-s6-proj-ch3", number: 3, title: "Sampling Techniques, Questionnaire Design & Primary/Secondary Data Collection", hindiTitle: "प्रतिचयन तकनीकें, प्रश्नावली निर्माण एवं प्राथमिक व द्वितीयक समंक संकलन", description: "Probability vs non-probability sampling, Likert scale measurement, pilot testing surveys.", levels: { min: 30, max: 65 }, topicsCount: 7, estimatedHours: 14 },
          { id: "prsu-s6-proj-ch4", number: 4, title: "Data Processing, Statistical Analysis (SPSS/Excel) & Interpretation of Findings", hindiTitle: "समंक प्रसंस्करण, सांख्यिकीय विश्लेषण (एक्सेल/एसपीएसएस) एवं निष्कर्ष", description: "Descriptive statistics, chi-square tests, correlation and regression testing of hypotheses.", levels: { min: 35, max: 70 }, topicsCount: 8, estimatedHours: 16 },
          { id: "prsu-s6-proj-ch5", number: 5, title: "Dissertation Writing, Referencing (APA), Executive Summary & Viva-Voce Defense", hindiTitle: "शोध प्रबंध लेखन, संदर्भ सूची (APA), सारांश एवं मौखिक परीक्षा रक्षा", description: "Report chapters layout, bibliography management, preparing presentation slides for viva defense.", levels: { min: 35, max: 70 }, topicsCount: 8, estimatedHours: 16 }
        ]
      }
    ]
  }
]

// Locate PRSU in coursesContent
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

const newPrsuObject = `{\n    id: "prsu",\n    name: "Pt. Ravishankar Shukla University (PRSU), Raipur",\n    shortName: "PRSU B.Com",\n    badgeColor: "bg-amber-600 text-white",\n    description: "Premier state university in Raipur, Chhattisgarh offering undergraduate commerce degrees (B.Com Semester 1 to Semester 6) aligned with UGC NEP-2020.",\n    officialUrl: "https://www.prsu.ac.in",\n    levels: ${JSON.stringify(prsuNepSemesters, null, 6).replace(/\n/g, "\n    ")}\n  }`

coursesContent = coursesContent.slice(0, objStart) + newPrsuObject + coursesContent.slice(objEnd)
fs.writeFileSync(coursesDataPath, coursesContent, "utf-8")
console.log("✅ Successfully updated coursesData.ts with the EXACT 6-semester PRSU NEP-2020 curriculum (34 papers, 170 chapters)!")
