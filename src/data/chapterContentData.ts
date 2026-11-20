export interface ChapterLessonDetail {
  id: string
  chapterId: string
  title: string
  hindiTitle: string
  overview: string
  eli10: {
    en: string
    hi: string
    hinglish: string
  }
  statutoryContext: {
    standards: string
    sections: string
    provisions: string
  }
  practicalIllustration: {
    problemStatement: string
    solutionSteps: string[]
    journalEntries?: {
      date?: string
      particulars: string
      debit: string
      credit: string
    }[]
  }
  commonMistakes: string[]
  memoryTrick: string
  practiceQuestions: {
    q: string
    a: string
  }[]
}

export const COMPREHENSIVE_CHAPTER_LESSONS: Record<string, ChapterLessonDetail> = {
  // 1. Theoretical Framework & Meaning of Accounting
  ch1: {
    id: "lesson-ch1",
    chapterId: "ch1",
    title: "Theoretical Framework & Meaning of Accounting",
    hindiTitle: "लेखांकन का सैद्धांतिक ढांचा एवं अर्थ",
    overview: "Accounting is the art of identifying, measuring, recording, and communicating economic information to permit informed judgments by stakeholders. Governed by GAAP and Indian Accounting Standards.",
    eli10: {
      en: "Imagine you are running a lemonade stand. If you don't write down how much sugar and lemons you bought, and how much money customers gave you, at the end of the day you won't know if you made money or lost money! Accounting is just writing everything down neatly so you always know your exact profit.",
      hi: "मान लीजिए आप नींबू-पानी की दुकान चलाते हैं। यदि आप यह डायरी में नहीं लिखेंगे कि कितने रुपये के नींबू और चीनी खरीदे, और ग्राहकों ने कितने रुपये दिए, तो शाम को आपको पता ही नहीं चलेगा कि मुनाफा हुआ या घाटा! लेखांकन (Accounting) बस हर लेन-देन को साफ-सुथरा लिखने की कला है।",
      hinglish: "Socho aap ek lemonade stand chala rahe ho. Agar aap diary me nahi likhoge ki kitne ka nimbu aur cheeni khareeda aur customers se kitna paisa mila, toh shaam ko profit ya loss pata hi nahi chalega. Accounting bas har transaction ko neatly record karne ka tareeqa hai."
    },
    statutoryContext: {
      standards: "Ind AS 1 / AS 1 (Disclosure of Accounting Policies)",
      sections: "Section 128 & 129 of Companies Act 2013",
      provisions: "Every company must keep books of account on an accrual basis and according to the double-entry system at its registered office for at least 8 financial years."
    },
    practicalIllustration: {
      problemStatement: "M/s Royal Traders purchased goods worth ₹2,00,000 on credit from M/s Apex Ltd. Identify the qualitative characteristics of this accounting transaction.",
      solutionSteps: [
        "1. Identification: A reliable commercial event backed by a tax invoice.",
        "2. Measurement: Quantifiable in monetary terms at ₹2,00,000.",
        "3. Dual Impact: Purchases (Expenses) increase, Creditors (Liabilities) increase.",
        "4. Audit Trail: Maintain invoice copy and e-way bill for statutory verification."
      ],
      journalEntries: [
        { particulars: "Purchases A/c ..................................... Dr.", debit: "₹2,00,000", credit: "" },
        { particulars: "   To M/s Apex Ltd (Creditor) A/c", debit: "", credit: "₹2,00,000" }
      ]
    },
    commonMistakes: [
      "Confusing personal expenses of the proprietor with business expenses (violates Business Entity Concept).",
      "Treating capital expenditure (machinery purchase) as revenue expenditure (normal purchases)."
    ],
    memoryTrick: "Mnemonic: 'RE-CO-ME' (Record ➔ Communicate ➔ Measure) + D-A-L-I-C (Drawing, Assets, Liabilities, Income, Capital).",
    practiceQuestions: [
      { q: "What is the Money Measurement Concept?", a: "Only transactions capable of being expressed in terms of money are recorded in financial books." },
      { q: "Why is the Going Concern Concept vital?", a: "It assumes the business will continue operations indefinitely, justifying valuing fixed assets at historical cost rather than net realizable market liquidation value." }
    ]
  },

  // 2. Journal, Ledger & Trial Balance
  ch2: {
    id: "lesson-ch2",
    chapterId: "ch2",
    title: "Accounting Process: Journal, Ledger & Trial Balance",
    hindiTitle: "लेखांकन प्रक्रिया: रोजनामचा, खाता-बही एवं तलपट",
    overview: "The core mechanics of the Double-Entry system: Golden Rules of Accounting, subsidiary books, posting into ledger accounts, balancing, and verifying arithmetic equality through the Trial Balance.",
    eli10: {
      en: "Every coin has two sides — Heads and Tails. In accounting, every transaction has two sides — Debit and Credit! If someone hands you a cricket bat for ₹500, you received a bat (Debit) and gave away cash (Credit). Both sides must always balance out perfectly.",
      hi: "सिक्के के दो पहलू होते हैं। लेखांकन में भी हर लेन-देन के दो पहलू होते हैं — डेबिट (नाम) और क्रेडिट (जमा)। यदि आपने ₹500 देकर एक बल्ला खरीदा, तो बल्ला आपके पास आया (Debit) और ₹500 आपके पास से गए (Credit)। दोनों पक्ष हमेशा बराबर होने चाहिए।",
      hinglish: "Har sikke ke do pehlu hote hain. Accounting me har transaction ke do sides hote hain — Debit aur Credit! Agar aapne ₹500 ka cricket bat khareeda, toh bat aaya (Debit) aur cash gaya (Credit). Dono sides hamesha barabar hone chahiye."
    },
    statutoryContext: {
      standards: "Indian GAAP / Accounting Principles",
      sections: "Section 128(1) of the Companies Act 2013",
      provisions: "Books must be maintained on double-entry accrual basis. Trial Balance serves as prima facie evidence of arithmetical accuracy before finalizing Balance Sheet."
    },
    practicalIllustration: {
      problemStatement: "Sharma started business with ₹5,00,000 cash, bought furniture for ₹80,000 via cheque, and paid rent of ₹25,000 in cash.",
      solutionSteps: [
        "Step 1: Identify accounts: Cash, Capital, Furniture, Bank, Rent.",
        "Step 2: Classify: Cash (Real), Capital (Personal), Furniture (Real), Bank (Personal), Rent (Nominal).",
        "Step 3: Apply Golden Rules: Debit what comes in / Debit all expenses; Credit the giver / Credit what goes out."
      ],
      journalEntries: [
        { particulars: "Cash A/c ........................................... Dr.", debit: "₹5,00,000", credit: "" },
        { particulars: "   To Capital A/c", debit: "", credit: "₹5,00,000" },
        { particulars: "Furniture A/c ...................................... Dr.", debit: "₹80,000", credit: "" },
        { particulars: "   To Bank A/c", debit: "", credit: "₹80,000" },
        { particulars: "Rent Expenses A/c .................................. Dr.", debit: "₹25,000", credit: "" },
        { particulars: "   To Cash A/c", debit: "", credit: "₹25,000" }
      ]
    },
    commonMistakes: [
      "Posting to the wrong side of the ledger account (e.g. posting credit item on debit side).",
      "Assuming a balanced Trial Balance means error-free books (Errors of Principle and Compensating Errors do not affect Trial Balance tally)."
    ],
    memoryTrick: "Golden Rules Mantra: Personal = 'Debit Receiver, Credit Giver'; Real = 'Debit Comes In, Credit Goes Out'; Nominal = 'Debit Expenses/Losses, Credit Income/Gains'.",
    practiceQuestions: [
      { q: "Does a tallied Trial Balance prove complete accounting accuracy?", a: "No, it only proves arithmetical accuracy. Errors of omission, commission, principle, and compensating errors can still exist." }
    ]
  },

  // 3. Bank Reconciliation Statement (BRS)
  ch3: {
    id: "lesson-ch3",
    chapterId: "ch3",
    title: "Bank Reconciliation Statement (BRS)",
    hindiTitle: "बैंक समाधान विवरण (BRS)",
    overview: "A statement prepared periodically to reconcile the difference between the bank balance shown by the Cash Book (Bank Column) and the bank balance shown by the Bank Pass Book / Statement.",
    eli10: {
      en: "Think of your notebook where you write what money your friend owes you, and your friend also has a notebook. Sometimes you wrote down that you sent a message, but your friend hasn't read it yet! Both notebooks are right, but they show different balances until the message is delivered. BRS explains that difference.",
      hi: "सोचिए आपके पास एक डायरी है जिसमें आप बैंक का हिसाब रखते हैं, और बैंक के पास अपनी पासबुक है। कभी-कभी आपने किसी को चेक काटकर दिया, पर उसने अभी तक बैंक से पैसे नहीं निकाले! आपकी डायरी में पैसे घट गए, लेकिन बैंक में अभी भी हैं। इस अंतर को मिलाने वाले विवरण को ही BRS कहते हैं।",
      hinglish: "Socho aapki diary me aapne likh liya ki ₹10,000 ka check kisi ko diya, lekin us bande ne abhi tak bank me check jama hi nahi kiya! Aapke hisaab se balance kam ho gaya, par bank passbook me abhi bhi dikh raha hai. Iss difference ko reconcile karne wala statement BRS kehlata hai."
    },
    statutoryContext: {
      standards: "Guidance Note on Audit of Cash and Bank Balances (ICAI)",
      sections: "Section 143 of Companies Act 2013 (Auditor Duty to verify bank balances)",
      provisions: "External auditor must independently obtain Bank Confirmation letters and inspect monthly BRS to detect unrecorded withdrawals, kiting, or fraud."
    },
    practicalIllustration: {
      problemStatement: "Balance as per Cash Book is ₹50,000. Cheques issued for ₹15,000 not presented for payment. Bank charges of ₹500 debited by bank only.",
      solutionSteps: [
        "Starting Point: Cash Book Balance (Debit) = ₹50,000.",
        "Add: Cheques issued but not presented = +₹15,000 (Bank has more money than our cash book).",
        "Less: Bank charges debited by bank = -₹500 (Bank balance reduced).",
        "Balance as per Pass Book = ₹50,000 + ₹15,000 - ₹500 = ₹64,500 (Credit/Favourable)."
      ]
    },
    commonMistakes: [
      "Forgetting that Bank Passbook is the exact mirror opposite of Cash Book (Bank Credit = Our Favourable Balance; Bank Debit = Overdraft).",
      "Not preparing the Adjusted Cash Book first for errors committed by the business entity itself."
    ],
    memoryTrick: "Anchor Rule: 'Look at where the Target Book is!' If starting with Cash Book, move your balance towards where the Pass Book is.",
    practiceQuestions: [
      { q: "What is an Adjusted Cash Book?", a: "Before preparing BRS, correct errors in the cash book and record items known only from passbook (e.g. bank charges, direct collections). BRS is then prepared with this corrected balance." }
    ]
  },

  // 5. Depreciation and Amortisation
  ch5: {
    id: "lesson-ch5",
    chapterId: "ch5",
    title: "Depreciation and Amortisation",
    hindiTitle: "ह्रास एवं परिशोधन",
    overview: "Systematic allocation of the depreciable amount of tangible and intangible assets over useful economic lives under SLM, WDV, and production units methods as per Ind AS 16 / AS 10.",
    eli10: {
      en: "When your parents buy a new bicycle for ₹6,000, after 3 years of riding it through mud and rain, you cannot sell it for ₹6,000 anymore. It might only be worth ₹1,500. The ₹4,500 loss over those 3 years is depreciation — the price of using the bicycle!",
      hi: "जब आपके माता-पिता ₹6,000 की नई साइकिल खरीदते हैं, और 3 साल आप उसे चलाते हैं, तो 3 साल बाद वह ₹6,000 में नहीं बिकेगी। उसका मूल्य घटकर ₹1,500 रह जाएगा। यह जो ₹4,500 मूल्य कम हुआ, उपयोग और समय बीतने के कारण, इसे ही 'ह्रास' (Depreciation) कहते हैं!",
      hinglish: "Jab aap ek nayi car ya bike khareedte ho, 3 saal baad uski value kam ho jaati hai kyunki aapne use chalaya, usme ghisawat hui. Iss ghate huye value ko accounting me Depreciation kehte hain."
    },
    statutoryContext: {
      standards: "Ind AS 16 (Property, Plant and Equipment) / AS 10",
      sections: "Schedule II of Companies Act 2013 & Section 32 of Income Tax Act 1961",
      provisions: "Companies Act mandates useful lives given in Schedule II. Income Tax Act 1961 requires block of assets WDV method only."
    },
    practicalIllustration: {
      problemStatement: "A machine was purchased for ₹10,00,000 on 1st April 2024. Scrap value estimated at ₹1,00,000 after 10 years useful life. Calculate SLM depreciation.",
      solutionSteps: [
        "Original Cost = ₹10,00,000. Residual Scrap Value = ₹1,00,000.",
        "Depreciable Amount = ₹10,00,000 - ₹1,00,000 = ₹9,00,000.",
        "Annual Depreciation (SLM) = Depreciable Amount ÷ Useful Life = ₹9,00,000 ÷ 10 = ₹90,000 per annum."
      ],
      journalEntries: [
        { particulars: "Depreciation A/c ................................... Dr.", debit: "₹90,000", credit: "" },
        { particulars: "   To Provision for Depreciation A/c", debit: "", credit: "₹90,000" }
      ]
    },
    commonMistakes: [
      "Calculating full year's depreciation on an asset purchased in the middle of the financial year without prorating for months.",
      "Treating change in depreciation method as a retrospective prior-period error (it is a prospective change in accounting estimate under Ind AS 8 / AS 10)."
    ],
    memoryTrick: "SLM = Flat like a ruler; WDV = Steeper drop initially, never touches exact zero.",
    practiceQuestions: [
      { q: "Why does the Income Tax department mandate WDV?", a: "To group assets into designated 'Blocks of Assets' and eliminate tracking individual vintage items upon disposal." }
    ]
  },

  // 11. Company Accounts: Shares & Debentures
  ch11: {
    id: "lesson-ch11",
    chapterId: "ch11",
    title: "Company Accounts: Shares & Debentures",
    hindiTitle: "कंपनी खाते: अंश एवं ऋणपत्र",
    overview: "Corporate equity financing, issue of equity/preference shares at par, premium, discount restrictions, calls-in-arrears, calls-in-advance, forfeiture and re-issue, and debenture redemption reserves.",
    eli10: {
      en: "If you and your 3 friends want to build a ₹1,000 treehouse, but no single friend has ₹1,000, you can slice that ₹1,000 into 100 small tickets of ₹10 each. Each ticket is a 'Share'. Whoever buys tickets owns that percentage of the treehouse!",
      hi: "यदि आपको और आपके दोस्तों को ₹1,000 की लागत से एक बड़ा प्रोजेक्ट शुरू करना है, और किसी एक के पास इतने पैसे नहीं हैं, तो आप ₹1,000 को ₹10 के 100 छोटे-छोटे हिस्सों में बांट देते हैं। इसी छोटे हिस्से को 'अंश' (Share) कहते हैं!",
      hinglish: "Socho ek badi company kholne ke liye ₹10 Crore chahiye. Ek akela insaan nahi la sakta, toh us poori capital ko ₹10 ke chhote-chhote hisso me divide kar diya jaata hai. Iss chote hisse ko Share kehte hain."
    },
    statutoryContext: {
      standards: "Ind AS 32 & 109 (Financial Instruments) / Schedule III",
      sections: "Section 52 (Securities Premium), Section 53 (Prohibition of issue at discount), Section 68 (Buyback) of Companies Act 2013",
      provisions: "Securities premium can only be utilized for 5 specific statutory purposes enumerated under Section 52(2)."
    },
    practicalIllustration: {
      problemStatement: "XYZ Ltd issued 10,000 Equity Shares of ₹10 each at a premium of ₹2 per share, payable ₹3 on Application, ₹5 on Allotment (including premium), and ₹4 on Final Call.",
      solutionSteps: [
        "1. Application: 10,000 × ₹3 = ₹30,000 received.",
        "2. Allotment: 10,000 × ₹5 = ₹50,000 (Capital ₹30,000 + Securities Premium ₹20,000).",
        "3. Final Call: 10,000 × ₹4 = ₹40,000 due and collected."
      ],
      journalEntries: [
        { particulars: "Bank A/c ........................................... Dr.", debit: "₹30,000", credit: "" },
        { particulars: "   To Share Application A/c", debit: "", credit: "₹30,000" },
        { particulars: "Share Allotment A/c ................................ Dr.", debit: "₹50,000", credit: "" },
        { particulars: "   To Share Capital A/c", debit: "", credit: "₹30,000" },
        { particulars: "   To Securities Premium A/c", debit: "", credit: "₹20,000" }
      ]
    },
    commonMistakes: [
      "Crediting Securities Premium before it is due.",
      "Transferring entire forfeited share balance to Capital Reserve without prorating for re-issued shares."
    ],
    memoryTrick: "Securities Premium 5 Uses: 'B-P-P-B-D' (Bonus shares, Preliminary expenses, Premium on redemption, Buyback of shares, Discount on debentures).",
    practiceQuestions: [
      { q: "What is the maximum discount permitted on re-issue of forfeited shares?", a: "The discount on re-issue cannot exceed the amount already forfeited on those specific shares." }
    ]
  },

  // 4. PRSU B.Com Semester 1: Financial Accounting - Accounting Standards
  "prsu-s1-p1-ch1": {
    id: "lesson-prsu-s1-p1-ch1",
    chapterId: "prsu-s1-p1-ch1",
    title: "Meaning, Principles & Accounting Standards (AS-1, AS-10)",
    hindiTitle: "लेखांकन के सिद्धांत एवं मानक (AS-1, AS-10)",
    overview: "Financial accounting is the systematic process of identifying, measuring, recording, and summarizing financial transactions according to GAAP and mandatory Accounting Standards (AS-1 Disclosure of Accounting Policies, AS-10 Property, Plant and Equipment).",
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

  // 5. PRSU B.Com Semester 1: Financial Accounting - Royalty Accounts
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

  // 6. PRSU B.Com Semester 6: Goods & Services Tax (GST) - Supply Concept
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

/**
 * Universal Fallback generator for any chapter in the curriculum
 */
export function getChapterLessonData(chapterId: string, title: string, hindiTitle: string): ChapterLessonDetail {
  if (COMPREHENSIVE_CHAPTER_LESSONS[chapterId]) {
    return COMPREHENSIVE_CHAPTER_LESSONS[chapterId]
  }

  // Synthesize structured 23-point instructional framework for any other chapter
  return {
    id: `lesson-${chapterId}`,
    chapterId,
    title,
    hindiTitle,
    overview: `Comprehensive academic and practical study of ${title}. Structured to guide students from fundamental principles to examination excellence and professional corporate practice.`,
    eli10: {
      en: `Imagine how everyday life involves trade, agreements, and accountability. In ${title}, we look at how businesses keep accurate records and make smart, lawful financial decisions so everyone can trust their numbers.`,
      hi: `${title} का मूल विचार यह है कि व्यापार में जो भी लेन-देन या निर्णय लिया जाए, वह स्पष्ट, नियमों के अनुकूल और पूरी तरह पारदर्शी होना चाहिए ताकि कोई भी वित्तीय निर्णय गलत न हो।`,
      hinglish: `${title} ka main concept yeh hai ki business me jo bhi transaction ya legal process ho, usko step-by-step rules ke according follow kiya jaye taaki calculations aur compliances accurate rahein.`
    },
    statutoryContext: {
      standards: "Applicable Indian Accounting Standards (Ind AS / AS) & IFRS Guidelines",
      sections: "Provisions of Companies Act 2013, Income Tax Act 1961, or relevant regulatory statute",
      provisions: "Requires strict adherence to verifiable source documentation, disclosure norms, and statutory audit compliance."
    },
    practicalIllustration: {
      problemStatement: `Practical corporate case analysis covering core mechanics of ${title}.`,
      solutionSteps: [
        "Step 1: Scrutinize the underlying facts, contracts, and commercial terms.",
        "Step 2: Classify the transaction under applicable statutory accounting heads.",
        "Step 3: Execute numerical calculations or double-entry balancing with precision.",
        "Step 4: Prepare the financial statement notes and compliance disclosures."
      ],
      journalEntries: [
        { particulars: "Primary Account A/c ............................... Dr.", debit: "₹1,00,000", credit: "" },
        { particulars: "   To Secondary Settlement A/c", debit: "", credit: "₹1,00,000" }
      ]
    },
    commonMistakes: [
      "Overlooking statutory threshold limits or applicable tax rates.",
      "Misclassifying operational items as capital transactions or vice-versa."
    ],
    memoryTrick: `Key Rule: 'Identify ➔ Measure ➔ Comply ➔ Disclose' — Always verify source vouchers before making final entries.`,
    practiceQuestions: [
      { q: `What is the primary examination objective of ${title}?`, a: "To test comprehensive understanding of theoretical fundamentals, statutory compliance, and accurate numerical problem solving under timed conditions." }
    ]
  }
}

