/**
 * JARVIS CCA-04: Student Community & Academic Doubt Hub Data
 * Peer-to-peer and AI-moderated academic discussion threads across India.
 */

export interface CommunityComment {
  id: string
  authorName: string
  authorRole: "Student" | "AIR Holder" | "Faculty" | "AI Tutor"
  avatarInitials: string
  content: string
  statutoryCitations?: string[]
  upvotes: number
  isAcceptedSolution?: boolean
  createdAt: string
}

export interface CommunityThread {
  id: string
  title: string
  hindiTitle?: string
  courseTag: "CA Foundation" | "CA Intermediate" | "CA Final" | "CMA Intermediate" | "CS Executive" | "B.Com PRSU" | "Tech / AI" | "General Doubts"
  subject: string
  authorName: string
  authorRole: string
  avatarInitials: string
  questionText: string
  statutoryReference?: string
  upvotes: number
  views: number
  isSolved: boolean
  createdAt: string
  comments: CommunityComment[]
}

export const INITIAL_COMMUNITY_THREADS: CommunityThread[] = [
  {
    id: "thread-ca-inter-115bac",
    title: "Sec 115BAC: Can an employee switch between old and new tax regimes every year?",
    hindiTitle: "धारा 115BAC: क्या वेतनभोगी कर्मचारी हर साल पुरानी और नई कर व्यवस्था में बदलाव कर सकता है?",
    courseTag: "CA Intermediate",
    subject: "Taxation (Direct Tax)",
    authorName: "Rohan Verma",
    authorRole: "CA Inter Student (Nov 2025)",
    avatarInitials: "RV",
    questionText: "If a salaried person opts for the old regime in AY 2024-25, can they switch back to the default Sec 115BAC regime in AY 2025-26 without filing Form 10-IEA? Does this restriction apply only to business income?",
    statutoryReference: "Income Tax Act 1961 Sec 115BAC(6)",
    upvotes: 42,
    views: 380,
    isSolved: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    comments: [
      {
        id: "comm-1",
        authorName: "LEADER-00 & AI Tutor",
        authorRole: "AI Tutor",
        avatarInitials: "AI",
        content: "Yes! An individual having income ONLY from Salaries, House Property, or Other Sources (NO business or profession income) can choose between the old regime and the default Sec 115BAC regime every single year at the time of filing their ITR u/s 139(1). Form 10-IEA is NOT required for salaried individuals. The restriction of switching only once in a lifetime applies strictly to persons having 'Profits and Gains of Business or Profession' (PGBP).",
        statutoryCitations: ["Sec 115BAC(6)", "CBDT Circular No. 04/2023"],
        upvotes: 38,
        isAcceptedSolution: true,
        createdAt: new Date(Date.now() - 86400000 * 1.8).toISOString()
      },
      {
        id: "comm-2",
        authorName: "Ananya Sharma, ACA",
        authorRole: "AIR Holder",
        avatarInitials: "AS",
        content: "Confirmed. In exam questions, always check if the assessee has business income. If yes, withdrawal from 115BAC is a once-in-a-lifetime option. If purely salaried, annual switching is freely permitted.",
        upvotes: 19,
        createdAt: new Date(Date.now() - 86400000 * 1.2).toISOString()
      }
    ]
  },
  {
    id: "thread-cma-cost-variance",
    title: "Why does standard costing variance reconcile to Actual Profit rather than Budgeted Profit?",
    hindiTitle: "मानक लागत में विचरण बजटेड लाभ के बजाय वास्तविक लाभ से कैसे मेल खाता है?",
    courseTag: "CMA Intermediate",
    subject: "Cost Accounting",
    authorName: "Pooja Mishra",
    authorRole: "CMA Inter Aspirant",
    avatarInitials: "PM",
    questionText: "When preparing the profit reconciliation statement under standard absorption costing, what is the exact treatment of Fixed Overhead Volume Variance vs Capacity Variance?",
    statutoryReference: "ICMAI Paper 8 Study Guide / CAS-1",
    upvotes: 28,
    views: 240,
    isSolved: true,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    comments: [
      {
        id: "comm-3",
        authorName: "TUTOR-03 Academic Engine",
        authorRole: "AI Tutor",
        avatarInitials: "AI",
        content: "Under standard absorption costing: Budgeted Profit + Favourable Variances - Adverse Variances = Actual Profit. Specifically, Fixed Overhead Volume Variance = (Actual Output in Std Hours - Budgeted Hours) × Standard Absorption Rate. Volume Variance is further split into: (1) Capacity Variance (due to working more/less days or hours) and (2) Calendar / Efficiency Variance.",
        statutoryCitations: ["CAS-1 Principles of Costing", "ICMAI Chapter 11"],
        upvotes: 24,
        isAcceptedSolution: true,
        createdAt: new Date(Date.now() - 86400000 * 0.9).toISOString()
      }
    ]
  },
  {
    id: "thread-cs-board-meeting",
    title: "Companies Act 2013 Sec 173: Minimum quorum for board meeting with interested directors",
    hindiTitle: "कंपनी अधिनियम धारा 173: बोर्ड बैठक में न्यूनतम कोरम",
    courseTag: "CS Executive",
    subject: "Company Law & Practice",
    authorName: "Kunal Deshmukh",
    authorRole: "CS Executive Candidate",
    avatarInitials: "KD",
    questionText: "If a company has 6 directors and 4 are interested in a contract u/s 184, what will be the valid quorum for passing that resolution?",
    statutoryReference: "Companies Act 2013 Sec 174(3)",
    upvotes: 35,
    views: 310,
    isSolved: true,
    createdAt: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    comments: [
      {
        id: "comm-4",
        authorName: "RESEARCH-05 Legal Intelligence",
        authorRole: "AI Tutor",
        avatarInitials: "AI",
        content: "Under Section 174(3) of Companies Act 2013, if the number of interested directors exceeds or equals 2/3rds of total strength, the remaining disinterested directors (present at the meeting) being not less than TWO shall form the quorum. Here, disinterested directors = 6 - 4 = 2. Since 2 is at least 2, the quorum is SATISFIED and the 2 disinterested directors can validly vote on the resolution.",
        statutoryCitations: ["Companies Act 2013 Sec 174(3)", "SS-1 Secretarial Standard on Board Meetings"],
        upvotes: 31,
        isAcceptedSolution: true,
        createdAt: new Date(Date.now() - 86400000 * 0.4).toISOString()
      }
    ]
  }
]
