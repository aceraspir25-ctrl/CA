# EduFinance Pro — AI-Powered Educational Learning Management & Autonomous Academic Publishing Platform

EduFinance Pro is a comprehensive, enterprise-grade EdTech and Coaching Management Ecosystem built for Indian and international professional commerce & finance education (CA, CMA, CS, ACCA, PRSU B.Com, and BBA).

It integrates 24×7 autonomous multi-agent academic research, digital library publishing, interactive financial simulation labs, and remote administrative command via Telegram Bot.

---

## 🌟 Key Highlights & Capabilities

### 1. 🎓 Comprehensive Curriculum & Course Engine
- **Full Spectrum Coverage**: 
  - **Chartered Accountancy (CA)**: Foundation, Intermediate (Group 1 & 2), Final.
  - **Cost and Management Accountancy (CMA)**: Foundation, Intermediate (Group 1 & 2), Final.
  - **Company Secretary (CS)**: CSEET, Executive (Group 1 & 2), Professional.
  - **Pt. Ravishankar Shukla University (PRSU) B.Com**: 1st Year, 2nd Year, 3rd Year (Corporate Accounting, Cost Accounting, Income Tax, Management Accounting, Auditing).
  - **ACCA & BBA**: Applied Knowledge, Applied Skills, Strategic Professional, Principles of Management, Financial Management, Marketing & OB.
- **Unified Progression**: Unlocked exploration across all 21 levels, allowing students to access syllabus roadmaps, concepts, MCQs, and handwritten notes freely.

### 2. 🤖 Autonomous Multi-Agent Academic Research Pipeline (MPA-11)
- **11 Specialized Autonomous Agents**:
  - `OSM-02`: Official Source Surveillance Agent (ICAI, ICMAI, ICSI, MCA, CBDT, CBIC).
  - `MPA-11`: Multi-Platform Academic Harvester (BYJU'S, PW, Aakash, EduRev, StudyX, Toppr, Vedantu).
  - `SAR-01`: Syllabus Alignment & Topic Discovery.
  - `CCA-04`: Independent AI Content Creation & Note Synthesis.
  - `QGA-05`: Question & MCQ Generation Agent with statutory explanations.
  - `VCR-06`: Verification & Calculation Auditing Agent.
  - `HNP-08`: Handwritten Notes & Aesthetic Diagram Generator.
  - `FQA-07`: Faculty & Admin Review Orchestrator.
- **Strict Copyright & Fair Dealing Engine**:
  - Tri-category content segregation: *Original Synthesized Content (Clean)*, *Licensed Content*, *Restricted Research-Only (Excluded from distribution)*.
  - Automated similarity scoring, attribution logs, and permission audit trails.

### 3. 📱 Telegram Admin Bot Remote Gateway (`@jarvis_Ai_AutomationBot`)
- **Direct Bot Access**: Remote command desk directly from mobile via Telegram.
- **7-Stage Document Processing Pipeline**:
  1. *Document Analysis Agent*: OCR extraction, formula detection (EOQ, Labor Variances, CAS-6), and numerical auditing.
  2. *Course Detection Agent*: Auto-maps uploaded PDFs to accurate Institute, Course, Group, and Subject.
  3. *Internet Research Agent*: Validates against official institute syllabuses.
  4. *Academic Verification Agent*: Audits mathematical balances and accounting treatment (Ind AS, AS, Income Tax Slabs).
  5. *Freshness & Amendment Agent*: Validates assessment year applicability (AY 2025-26 compliance).
  6. *Copyright & Permission Agent*: Checks commercial and fair-dealing redistribution rights.
  7. *Content Integration Agent*: Formats chapter package and sends approval request.
- **1-Click Interactive Inline Buttons**: `✅ Approve`, `❌ Reject`, `📝 Request Changes`, `📖 View Report`.
- **Natural Language Hinglish Processor**: Supports conversational voice/text instructions like *"CMA Inter ke notes verify karo"*, *"Pending approvals dikhao"*, *"Aaj ki agent report do"*.
- **Real-Time Database Sync**: 100% two-way synchronization between Telegram actions and the Web Admin Panel.

### 4. 📚 Student Digital Library & Handwritten Notes
- **Interactive Chapter Learning Packages**:
  - Summary Notes & Comprehensive Concept Breakdowns.
  - Curated Solved Numerical Illustrations.
  - Practice Question Banks & MCQs with timer simulations.
  - Downloadable / Printable Handwritten-style study sheets.
  - Dedicated Multi-Platform Reference folders.

### 5. 🔬 Interactive Finance Lab & AI Tutor
- Real-time Journal Entry Simulator with strict debit-credit balancing.
- Financial Statement Analyzer (Balance Sheet, P&L, Ratio Analysis).
- AI Mentor with real-time concept Q&A, statutory references, and exam solving hints.

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (`.env.local`)
Create a `.env.local` file in the root directory:
```env
TELEGRAM_BOT_TOKEN="your_telegram_bot_token"
TELEGRAM_ADMIN_CHAT_ID="your_telegram_chat_id"
```

### 3. Start Frontend Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Start Telegram Bot Daemon (Optional for Live Remote Admin)
```bash
npm run bot
```

---

## 📁 Project Structure

```
├── scripts/
│   └── telegram-bot-runner.mjs      # Long-polling daemon relaying Telegram events to webhook
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── admin/pipeline/      # AI Research Pipeline & Telegram Remote Admin UI
│   │   │   ├── courses/             # Course catalog & syllabus explorer
│   │   │   ├── library/             # Student Digital Library & Handwritten PDFs
│   │   │   ├── lab/                 # Practical finance & accounting simulators
│   │   │   └── ai-tutor/            # AI conversational learning assistant
│   │   └── api/
│   │       ├── ai/pipeline/         # Autonomous research orchestrator API
│   │       └── telegram/webhook/    # Telegram Bot webhook & document analysis endpoint
│   ├── data/
│   │   ├── coursesData.ts           # 21 levels, 103 official subject papers & chapters
│   │   ├── researchPipelineData.ts  # Registered official sources & pipeline state
│   │   ├── multiPlatformResearchData.ts # BYJU'S, PW, Aakash connector & rights records
│   │   └── telegramAdminData.ts     # Upload jobs, 7-stage verification reports & audit logs
│   └── lib/
│       └── telegram/bot.ts          # Bot messaging service, 7-agent document analyzer & Hinglish parser
```

---

## 🛡 Non-Destructive Architecture & Safety
- **Strict Data Preservation**: All existing user progress, course modules, test banks, and system configurations are preserved.
- **Type-Safe Verification**: Full TypeScript coverage (`npx tsc --noEmit` verified with 0 errors).
- **Environment Isolation**: Sensitive bot tokens and keys are strictly managed via environment variables and excluded from version control.
