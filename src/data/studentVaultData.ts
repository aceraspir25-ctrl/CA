/**
 * JARVIS CCA-04: Student Private Knowledge Vault & OCR Notes Engine
 */

export interface StudentVaultDocument {
  id: string
  title: string
  subject: string
  chapter: string
  sourceType: "handwritten_ocr" | "pdf_upload" | "ai_summary" | "bookmark"
  originalFileName?: string
  scannedImageUrl?: string
  extractedMarkdown: string
  keyTakeaways: string[]
  flashcards: {
    question: string
    answer: string
  }[]
  tags: string[]
  createdAt: string
  isFavorite: boolean
}

export const INITIAL_STUDENT_VAULT_DOCUMENTS: StudentVaultDocument[] = [
  {
    id: "vault-doc-1",
    title: "Handwritten Class Notes: Section 115BAC Slabs & Exemption Rules",
    subject: "Direct Tax Laws (Taxation)",
    chapter: "Chapter 1: Basics & Tax Rates (AY 2025-26)",
    sourceType: "handwritten_ocr",
    originalFileName: "tax_slabs_handwritten_page1.jpg",
    scannedImageUrl: "/placeholder-notes.png",
    extractedMarkdown: `### 📝 OCR Extracted Notes: Tax Regime Slabs & Rebates
- **Default Regime:** Section 115BAC is the default tax regime for Individuals & HUFs.
- **Revised Slab Rates (Budget 2024):**
  - ₹0 to ₹3,00,000 ➔ Nil
  - ₹3,00,001 to ₹7,00,000 ➔ 5%
  - ₹7,00,001 to ₹10,00,000 ➔ 10%
  - ₹10,00,001 to ₹12,00,000 ➔ 15%
  - ₹12,00,001 to ₹15,00,000 ➔ 20%
  - Above ₹15,00,000 ➔ 30%
- **Rebate under Section 87A:** Full rebate available up to ₹7,00,000 taxable income (Net tax = Zero).
- **Standard Deduction:** Increased from ₹50,000 to ₹75,000 for salaried employees.`,
    keyTakeaways: [
      "Taxable income up to ₹7.75 Lakhs is 100% tax-free for salaried individuals (₹7L + ₹75K standard deduction).",
      "Chapter VI-A deductions (80C, 80D, 80G) are disallowable under Section 115BAC.",
      "Section 80CCD(2) employer NPS contribution up to 14% is allowed under both regimes."
    ],
    flashcards: [
      {
        question: "What is the maximum standard deduction under New Tax Regime for AY 2025-26?",
        answer: "₹75,000 under Section 16(ia)."
      },
      {
        question: "What is the tax rate on income between ₹7,00,001 and ₹10,00,000 under Section 115BAC?",
        answer: "10% under the revised Budget 2024 slabs."
      }
    ],
    tags: ["Direct Tax", "Section 115BAC", "AY 2025-26", "CA Inter", "CMA Inter"],
    createdAt: "2026-11-19T14:30:00Z",
    isFavorite: true
  },
  {
    id: "vault-doc-2",
    title: "Cost Accounting: Working Notes on Economic Order Quantity (EOQ) & Stock Levels",
    subject: "Cost & Management Accounting",
    chapter: "Chapter 2: Material Cost Control",
    sourceType: "pdf_upload",
    originalFileName: "cma_material_cost_summary.pdf",
    extractedMarkdown: `### 📦 Material Control & EOQ Formulas
$$\\text{EOQ} = \\sqrt{\\frac{2 \\times A \\times O}{C}}$$
Where:
- $A$ = Annual Consumption of Raw Material in units.
- $O$ = Cost of placing one order.
- $C$ = Carrying cost per unit per annum ($C = \\text{Unit Price} \\times \\text{Carrying Percentage}$).

#### Essential Inventory Levels:
1. **Re-order Level (ROL):** $\\text{Maximum Usage} \\times \\text{Maximum Lead Time}$
2. **Minimum Stock Level:** $\\text{ROL} - (\\text{Normal Usage} \\times \\text{Average Lead Time})$
3. **Maximum Stock Level:** $\\text{ROL} + \\text{ROQ} - (\\text{Minimum Usage} \\times \\text{Minimum Lead Time})$
4. **Danger Level:** $\\text{Average Usage} \\times \\text{Emergency Lead Time}$`,
    keyTakeaways: [
      "At EOQ, Annual Ordering Cost equals Annual Carrying Cost.",
      "Safety Stock = Minimum Level if Lead Time is constant.",
      "Always take Carrying Cost per unit per annum on purchase price."
    ],
    flashcards: [
      {
        question: "What happens to ordering cost and carrying cost at EOQ?",
        answer: "Total ordering cost equals total carrying cost, and total inventory holding cost is minimized."
      },
      {
        question: "Formula for Re-order Level (ROL)?",
        answer: "Maximum Usage × Maximum Lead Time."
      }
    ],
    tags: ["Costing", "EOQ", "Inventory Levels", "CMA Inter Paper 8", "CA Inter Paper 4"],
    createdAt: "2026-11-18T10:15:00Z",
    isFavorite: false
  }
]
