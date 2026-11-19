export type NoteVisualStyle =
  | "clean_handwritten"
  | "visual_learning"
  | "numerical_notes"
  | "exam_revision"

export interface StudyResourceItem {
  id: string
  code: string
  title: string
  hindiTitle: string
  type:
    | "complete_notes"
    | "basic_concepts"
    | "detailed_notes"
    | "diagrams"
    | "workflow"
    | "solved_examples"
    | "formula_sheet"
    | "mcq_bank"
    | "practice_questions"
    | "quiz"
    | "sample_paper"
    | "revision_notes"
    | "flashcards"
    | "test_solutions"
  pagesCount: number
  estimatedReadTime: string
  language: "en" | "hi" | "hinglish" | "multilingual"
  visualStyle: NoteVisualStyle
  description: string
  rawContent: string
  printableHtml?: string
}

export interface ChapterStudyPackage {
  id: string
  courseId: string
  courseName: string
  institution: string
  levelId: string
  paperId: string
  paperTitle: string
  chapterId: string
  chapterNumber: number
  chapterTitle: string
  hindiTitle: string
  version: string
  publishDate: string
  verifiedBy: string
  isPublished: boolean
  totalResources: number
  resources: StudyResourceItem[]
}

export const SAMPLE_STUDY_PACKAGES: ChapterStudyPackage[] = [
  {
    id: "pkg-ca-f-ch3",
    courseId: "icai",
    courseName: "CA Foundation",
    institution: "ICAI",
    levelId: "ca-foundation",
    paperId: "ca-f-p1",
    paperTitle: "Accounting",
    chapterId: "ch3",
    chapterNumber: 3,
    chapterTitle: "Bank Reconciliation Statement (BRS)",
    hindiTitle: "बैंक समाधान विवरण (BRS)",
    version: "v2.4 (Budget 2024 / ICAI 2026 Aligned)",
    publishDate: "19 Nov 2026",
    verifiedBy: "AVA-06 (Academic Verification Agent) & Faculty Lead",
    isPublished: true,
    totalResources: 14,
    resources: [
      {
        id: "res-01",
        code: "01",
        title: "Complete Handwritten Notes (Notebook Style)",
        hindiTitle: "सम्पूर्ण हस्तलिखित नोट्स (नोटबुक शैली)",
        type: "complete_notes",
        pagesCount: 18,
        estimatedReadTime: "45 mins",
        language: "multilingual",
        visualStyle: "clean_handwritten",
        description: "Full chapter ruled notebook-style study notes with handwritten typography, colored margin annotations, and highlighted definitions.",
        rawContent: `# 📒 Bank Reconciliation Statement (BRS) - Handwritten Notes

## 1. What is BRS? (Meaning & Need)
- Cash Book (Bank Column) maintains the record of deposits and withdrawals kept by the business entity.
- Bank Pass Book is the customer's ledger account maintained in the bank's general ledger.
- In theory, both must match. In practice, timing differences and omissions create variances!

## 2. Four Causes of Difference:
1. Cheques issued by firm, but not presented to bank for payment (Cash Book reduced, Pass Book untouched).
2. Cheques deposited into bank, but not yet collected / cleared (Cash Book increased, Pass Book untouched).
3. Direct bank debits (Interest charged, bank charges, standing instruction payments).
4. Direct bank credits (Direct deposits by customers, dividend credited directly).

## 3. The Golden Rule of BRS:
Always identify your STARTING BALANCE. If starting with Cash Book balance, adjust to arrive at Pass Book balance!
- If Pass Book is HIGHER ➔ ADD (+).
- If Pass Book is LOWER ➔ LESS (-).`
      },
      {
        id: "res-02",
        code: "02",
        title: "Basic Concepts (Zero-Level ELI10)",
        hindiTitle: "मूलभूत अवधारणाएं (शुरुआती समझ)",
        type: "basic_concepts",
        pagesCount: 4,
        estimatedReadTime: "10 mins",
        language: "multilingual",
        visualStyle: "clean_handwritten",
        description: "Child-level everyday examples explaining why bank passbook and personal cash book balances differ.",
        rawContent: `### 👶 Explain Like I'm 10:
Imagine you have a piggy bank with a friend. You write in your notebook that you gave ₹500 to the postman to deliver to your friend. 
Your notebook says the money is already gone. But the postman takes 2 days to walk to your friend's house!
For those 2 days, your notebook says ₹0, but your friend's notebook still says ₹500!
Nobody stole money, nobody cheated — it's just the travel time (Timing Difference)! BRS is the letter that explains the postman is on his way.`
      },
      {
        id: "res-03",
        code: "03",
        title: "Detailed Technical Notes & Accounting Rules",
        hindiTitle: "विस्तृत तकनीकी नोट्स एवं लेखांकन नियम",
        type: "detailed_notes",
        pagesCount: 14,
        estimatedReadTime: "30 mins",
        language: "en",
        visualStyle: "clean_handwritten",
        description: "In-depth treatment of Adjusted Cash Book, errors of omission, errors of commission, and audit procedures under ICAI guidelines.",
        rawContent: `### Technical Treatment: Adjusted Cash Book Approach
Under ICAI New Scheme, when bank reconciliation is prepared at the end of an accounting period:
1. First, correct the Cash Book (Bank Column) for:
   - All errors committed by the firm in recording transactions.
   - All items recorded by the bank but not yet known or recorded by the firm (Bank charges, interest credited, direct collections).
2. Second, prepare the BRS taking the Adjusted Cash Book Balance as starting point:
   - Only external timing differences (Unpresented cheques & Uncleared cheques) appear in BRS!`
      },
      {
        id: "res-04",
        code: "04",
        title: "Concept Maps & Mind Maps",
        hindiTitle: "अवधारणा मानचित्र एवं माइंड मैप",
        type: "diagrams",
        pagesCount: 6,
        estimatedReadTime: "15 mins",
        language: "multilingual",
        visualStyle: "visual_learning",
        description: "Visual charts illustrating Pass Book vs Cash Book relationships and color-coded adjustment flows.",
        rawContent: `[CASH BOOK BALANCE]
   │
   ├── (+) Cheques Issued but Not Yet Presented for Payment
   ├── (+) Direct Deposit by Customer into Bank Account
   ├── (+) Interest / Dividend Credited Directly by Bank
   │
   ├── (-) Cheques Deposited but Not Yet Collected by Bank
   ├── (-) Bank Service Charges / Commission Debited by Bank
   ├── (-) Cheques Discounted Dishonoured by Bank
   │
   └── = [PASS BOOK / BANK STATEMENT BALANCE]`
      },
      {
        id: "res-05",
        code: "05",
        title: "Step-by-Step BRS Process Workflow",
        hindiTitle: "चरणबद्ध BRS निर्माण प्रक्रिया फ्लोचार्ट",
        type: "workflow",
        pagesCount: 5,
        estimatedReadTime: "12 mins",
        language: "en",
        visualStyle: "visual_learning",
        description: "Decision-tree flowchart guiding students step-by-step from raw bank statement to final tallied balance.",
        rawContent: `Step 1: Compare Cash Book with Bank Passbook line by line.
Step 2: Cross out all matching items that appear on both sides.
Step 3: Unmatched items in Passbook are entered in Adjusted Cash Book.
Step 4: Balance the Adjusted Cash Book to get corrected starting balance.
Step 5: Place unpresented & uncleared cheques in BRS schedule.
Step 6: Tally to exact balance shown on Bank Statement!`
      },
      {
        id: "res-06",
        code: "06",
        title: "Solved Numerical Examples (With Working Notes)",
        hindiTitle: "हल किए गए व्यावहारिक प्रश्न (कार्यकारी टिप्पणियों सहित)",
        type: "solved_examples",
        pagesCount: 16,
        estimatedReadTime: "40 mins",
        language: "multilingual",
        visualStyle: "numerical_notes",
        description: "10 ICAI examination-grade numericals with complete adjusted cash book ledger and BRS statements.",
        rawContent: `### Practical Problem 1 (ICAI Exam Pattern):
On 31st March 2026, Cash Book of M/s Rajesh Bros showed a debit balance of ₹78,000.
1. Cheques issued to creditors worth ₹24,000, but only ₹14,000 presented till 31st March.
2. Cheques paid into bank ₹18,000, but credit given by bank only on 4th April.
3. Bank charges ₹650 debited by bank not recorded in Cash Book.
4. Dividend of ₹3,500 collected by bank directly.

Solution:
Starting Balance as per Cash Book: ₹78,000
Add: Cheques issued but not presented (₹24,000 - ₹14,000) = +₹10,000
Add: Dividend directly collected by bank = +₹3,500
Less: Cheques deposited but not cleared = -₹18,000
Less: Bank charges debited by bank = -₹650
==================================================
Balance as per Bank Pass Book (Credit): ₹72,850`
      },
      {
        id: "res-07",
        code: "07",
        title: "Formula Sheet & Summary Tables",
        hindiTitle: "सूत्र संग्रह एवं सारांश तालिका",
        type: "formula_sheet",
        pagesCount: 3,
        estimatedReadTime: "8 mins",
        language: "en",
        visualStyle: "exam_revision",
        description: "Quick formula reference card for favorable vs overdraft balance rules across Cash Book and Pass Book.",
        rawContent: `### Balance Nature Matrix:
- Cash Book Debit = Favourable Balance (Asset)
- Cash Book Credit = Bank Overdraft (Liability)
- Pass Book Credit = Favourable Balance (Bank owes us)
- Pass Book Debit = Bank Overdraft (We owe bank)`
      },
      {
        id: "res-08",
        code: "08",
        title: "MCQ Practice Bank (50 Questions + Rationale)",
        hindiTitle: "बहुविकल्पीय प्रश्न बैंक (50 प्रश्न एवं व्याख्या)",
        type: "mcq_bank",
        pagesCount: 12,
        estimatedReadTime: "30 mins",
        language: "en",
        visualStyle: "clean_handwritten",
        description: "50 categorized MCQs covering basic, intermediate, and advanced tricky BRS scenarios.",
        rawContent: `Q1: A Bank Reconciliation Statement is prepared by:
(a) Bank Manager  (b) Auditor  (c) Business Entity / Account Holder  (d) Registrar of Companies
Answer: (c) Account Holder
Explanation: BRS is prepared by the account holder to verify their internal cash book with the external bank statement.`
      },
      {
        id: "res-09",
        code: "09",
        title: "Descriptive Practice Questions & Case Problems",
        hindiTitle: "वर्णनात्मक अभ्यास प्रश्न एवं केस स्टडीज",
        type: "practice_questions",
        pagesCount: 10,
        estimatedReadTime: "25 mins",
        language: "multilingual",
        visualStyle: "clean_handwritten",
        description: "8 comprehensive descriptive questions testing adjusted cash book adjustments and bank overdraft mechanics.",
        rawContent: `Question 1: Explain the procedure for preparing an Adjusted Cash Book. Why is it preferable to prepare an Adjusted Cash Book before drafting a Bank Reconciliation Statement at the close of an accounting year? (5 Marks)`
      },
      {
        id: "res-10",
        code: "10",
        title: "Interactive Chapter Quiz Blueprint",
        hindiTitle: "इंटरैक्टिव अध्याय प्रश्नोत्तरी",
        type: "quiz",
        pagesCount: 4,
        estimatedReadTime: "15 mins",
        language: "en",
        visualStyle: "visual_learning",
        description: "15 timed assessment questions mapped directly to the interactive test simulator.",
        rawContent: `Interactive Quiz Module: 15 Questions | Duration: 15 Minutes | Negative Marking: -0.25.`
      },
      {
        id: "res-11",
        code: "11",
        title: "Sample Question Paper (Exam Pattern - 100 Marks)",
        hindiTitle: "मॉडल प्रश्न पत्र (परीक्षा पैटर्न - 100 अंक)",
        type: "sample_paper",
        pagesCount: 8,
        estimatedReadTime: "3 Hours",
        language: "multilingual",
        visualStyle: "exam_revision",
        description: "Full-length 3-hour mock practice paper designed according to the latest ICAI Foundation pattern.",
        rawContent: `CA Foundation Principles and Practice of Accounting - Paper 1 (Full Length Mock Examination). Total Marks: 100. Time Allowed: 3 Hours.`
      },
      {
        id: "res-12",
        code: "12",
        title: "Quick Revision Notes (Last-Minute Booster)",
        hindiTitle: "त्वरित पुनरीक्षण नोट्स (अंतिम समय की तैयारी)",
        type: "revision_notes",
        pagesCount: 5,
        estimatedReadTime: "10 mins",
        language: "multilingual",
        visualStyle: "exam_revision",
        description: "High-yield 5-page revision cheat-sheet for rapid exam-day review.",
        rawContent: `⚡ 5-Minute Exam Day Booster:
1. Cheques issued not presented ➔ Always ADD to Cash Book balance!
2. Cheques deposited not cleared ➔ Always LESS from Cash Book balance!
3. Bank charges / interest debited ➔ Enter in Adjusted Cash Book Credit!`
      },
      {
        id: "res-13",
        code: "13",
        title: "Active Recall Flashcards (20 Revision Cards)",
        hindiTitle: "एक्टिव रिकॉल फ्लैशकार्ड्स (20 रिवीजन कार्ड)",
        type: "flashcards",
        pagesCount: 4,
        estimatedReadTime: "10 mins",
        language: "en",
        visualStyle: "visual_learning",
        description: "Front-and-back flashcards for rapid memorization of bank overdrafts, timing differences, and journal entries.",
        rawContent: `Card 1: Front: Who prepares BRS? | Back: The Account Holder / Business Entity.
Card 2: Front: Credit balance in Cash Book means? | Back: Bank Overdraft (Unfavourable).`
      },
      {
        id: "res-14",
        code: "14",
        title: "Detailed Test Solutions & Step Marking Scheme",
        hindiTitle: "विस्तृत परीक्षा समाधान एवं चरणबद्ध अंकन योजना",
        type: "test_solutions",
        pagesCount: 10,
        estimatedReadTime: "20 mins",
        language: "en",
        visualStyle: "numerical_notes",
        description: "Complete step-by-step model solutions and marking distribution for the Sample Paper.",
        rawContent: `Model Answer Scheme:
- Adjusted Cash Book Format & Posting: 4 Marks
- BRS Format & Timing Adjustments: 4 Marks
- Final Balance Tally: 2 Marks`
      }
    ]
  }
]
