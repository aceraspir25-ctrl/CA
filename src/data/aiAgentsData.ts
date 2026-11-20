export interface AIAgent {
  id: string
  name: string
  code: string
  role: string
  description: string
  institutions: string[]
  status: "idle" | "running" | "scheduled" | "paused"
  lastRunTime: string
  tasksCompleted: number
  successRate: number
  permissions: string[]
  logs: {
    id: string
    timestamp: string
    level: "INFO" | "WARN" | "SUCCESS" | "VERIFIED"
    message: string
  }[]
}

export const INITIAL_AI_AGENTS: AIAgent[] = [
  {
    id: "agent-leader-00",
    name: "Supreme Leader & Chief Autonomous Orchestrator",
    code: "LEADER-00",
    role: "Commander-in-Chief, Autonomous Task Allocator & Self-Healing Bug Fixer",
    description: "Supreme Commander of all specialized sub-agents. Continuously monitors system health across all course pipelines, schedules research cycles, directs specialized agents, detects anomalies, auto-patches code/syllabus drift in real time, and sends executive progress & health reports directly to the Super Admin via Telegram.",
    institutions: ["All 21 Levels", "All 11 Sub-Agents", "Telegram Remote Gateway"],
    status: "running",
    lastRunTime: "Real-time 24×7",
    tasksCompleted: 4890,
    successRate: 100,
    permissions: [
      "Supreme Agent Command & Dynamic Task Delegation",
      "Autonomous Self-Healing & Bug Fixing Engine",
      "Real-Time Exception Interception & Auto-Patching",
      "Direct Telegram Executive Reporting & Alerts",
      "24×7 Continuous Execution Loop Orchestration"
    ],
    logs: [
      { id: "log-lead-1", timestamp: "Real-time", level: "SUCCESS", message: "LEADER-00 active: All 11 agents operational with 0 errors. Real-time Telegram sync online." },
      { id: "log-lead-2", timestamp: "1 min ago", level: "VERIFIED", message: "Auto-healed: Validated 21 course levels and 103 official papers. Zero syllabus drift detected." },
      { id: "log-lead-3", timestamp: "5 mins ago", level: "INFO", message: "Command issued to OSM-02 & MPA-11: Execute 24x7 surveillance and sync study packages." }
    ]
  },
  {
    id: "agent-1",
    name: "Academic Research Agent",
    code: "ARA-01",
    role: "Literature & Statutory Research",
    description: "Monitors and analyzes academic publications, ICAI journal articles, research papers, and corporate case precedents.",
    institutions: ["ICAI", "ICMAI", "ICSI", "ACCA"],
    status: "scheduled",
    lastRunTime: "10 mins ago",
    tasksCompleted: 420,
    successRate: 99.2,
    permissions: ["Read-Only Academic Repositories", "Draft Conceptual Synthesis"],
    logs: [
      { id: "log-1", timestamp: "10 mins ago", level: "SUCCESS", message: "Indexed 14 new ICAI Research Committee guidance notes on Ind AS 116 Leases." },
      { id: "log-2", timestamp: "1 hour ago", level: "INFO", message: "Analyzed ACCA SBR case study updates for 2026/2027 examination sessions." }
    ]
  },
  {
    id: "agent-2",
    name: "Official Source Monitoring Agent",
    code: "OSM-02",
    role: "Regulatory & Statutory Feed Surveillance",
    description: "Tracks official gazettes, MCA notifications, CBDT circulars, CBIC GST notifications, and SEBI regulations for real-time syllabus impact.",
    institutions: ["MCA", "CBDT", "CBIC", "SEBI"],
    status: "running",
    lastRunTime: "2 mins ago",
    tasksCompleted: 856,
    successRate: 100,
    permissions: ["Read-Only Statutory Portals", "Notification Dispatch"],
    logs: [
      { id: "log-3", timestamp: "2 mins ago", level: "INFO", message: "Checked CBDT portal: No new TDS rate amendments issued today." },
      { id: "log-4", timestamp: "35 mins ago", level: "VERIFIED", message: "Verified Finance Act 2024 Section 115BAC revised slabs against official Gazette." }
    ]
  },
  {
    id: "agent-3",
    name: "Content Creation Agent",
    code: "CCA-03",
    role: "Instructional Material Synthesis",
    description: "Generates zero-level intuitive analogies (ELI10), bilingual explanations (Hindi/Hinglish), step-by-step illustrations, and memory mnemonics.",
    institutions: ["CA", "CMA", "CS", "B.Com", "BBA", "ACCA"],
    status: "idle",
    lastRunTime: "25 mins ago",
    tasksCompleted: 612,
    successRate: 98.8,
    permissions: ["Draft Educational Content", "Non-Destructive File Append"],
    logs: [
      { id: "log-5", timestamp: "25 mins ago", level: "SUCCESS", message: "Authored 23-Point standardized lesson draft for Ind AS 115 Revenue Model." },
      { id: "log-6", timestamp: "2 hours ago", level: "SUCCESS", message: "Generated Hinglish analogy for Working Capital Operating Cycle." }
    ]
  },
  {
    id: "agent-4",
    name: "PYQ Research Agent",
    code: "PRA-04",
    role: "Past Examination Trend Analysis",
    description: "Scans past 10 years of ICAI, ICMAI, ICSI and university papers to compute chapter mark weightages, recurring questions, and topic frequencies.",
    institutions: ["ICAI", "ICMAI", "ICSI", "PRSU"],
    status: "scheduled",
    lastRunTime: "4 hours ago",
    tasksCompleted: 310,
    successRate: 99.5,
    permissions: ["Index Official Examination Archives", "Compute Topic Heatmaps"],
    logs: [
      { id: "log-7", timestamp: "4 hours ago", level: "INFO", message: "Computed CA Foundation Accounting trend: Partnership & Company accounts average 38 marks." }
    ]
  },
  {
    id: "agent-5",
    name: "Question Generation Agent",
    code: "QGA-05",
    role: "Original Problem & Assessment Synthesis",
    description: "Creates high-quality, strictly original MCQs, case-based numericals, and descriptive exam questions with comprehensive step-by-step solutions.",
    institutions: ["All Courses"],
    status: "idle",
    lastRunTime: "1 hour ago",
    tasksCompleted: 1240,
    successRate: 99.1,
    permissions: ["Generate Original Assessment Items", "Submit to Faculty Review"],
    logs: [
      { id: "log-8", timestamp: "1 hour ago", level: "SUCCESS", message: "Drafted 15 new practical MCQs on Costing Break-Even Point with detailed rationale." }
    ]
  },
  {
    id: "agent-6",
    name: "Academic Verification Agent",
    code: "AVA-06",
    role: "Rigorous Peer Review & Fact Checking",
    description: "Ensures every generated explanation, mathematical solution, and tax calculation strictly adheres to current statutory law and standard accounting practice.",
    institutions: ["ICAI", "ICMAI", "ICSI", "ACCA"],
    status: "running",
    lastRunTime: "1 min ago",
    tasksCompleted: 1540,
    successRate: 99.9,
    permissions: ["Audit Content", "Flag Discrepancies", "Approve Verified Badge"],
    logs: [
      { id: "log-9", timestamp: "1 min ago", level: "VERIFIED", message: "Audit passed: Depreciation calculation complies with Schedule II useful lives." },
      { id: "log-10", timestamp: "15 mins ago", level: "VERIFIED", message: "Cross-checked BRS adjusted cash book treatment against ICAI Study Material." }
    ]
  },
  {
    id: "agent-7",
    name: "Syllabus Monitoring Agent",
    code: "SMA-07",
    role: "Curriculum Version Control",
    description: "Continuously tracks university circulars and institute transition schemes to flag newly introduced or deleted topics automatically.",
    institutions: ["ICAI New Scheme", "ICMAI 2022", "ICSI 2022", "PRSU NEP 2020"],
    status: "scheduled",
    lastRunTime: "6 hours ago",
    tasksCompleted: 180,
    successRate: 100,
    permissions: ["Read Official Examination Portals", "Audit Scheme Revisions"],
    logs: [
      { id: "log-11", timestamp: "6 hours ago", level: "SUCCESS", message: "Verified PRSU Raipur B.Com Semester 1-6 syllabus against latest university gazette." }
    ]
  },
  {
    id: "agent-8",
    name: "Notification Agent",
    code: "NA-08",
    role: "Exam Alerts & Study Reminders",
    description: "Dispatches study streak reminders, upcoming mock test notifications, and statutory deadline alerts to enrolled students.",
    institutions: ["Student Engagement"],
    status: "scheduled",
    lastRunTime: "15 mins ago",
    tasksCompleted: 4890,
    successRate: 99.7,
    permissions: ["Dispatch In-App Notifications", "Update Study Streak Alerts"],
    logs: [
      { id: "log-12", timestamp: "15 mins ago", level: "SUCCESS", message: "Dispatched 7-day streak celebration badge to student Rahul Sharma." }
    ]
  },
  {
    id: "agent-9",
    name: "Student Performance Agent",
    code: "SPA-09",
    role: "Adaptive Learning Analytics",
    description: "Analyzes student quiz errors, time spent per chapter, and practical lab trial balances to compute personal weak concepts and recommended lessons.",
    institutions: ["All Students"],
    status: "running",
    lastRunTime: "Just now",
    tasksCompleted: 2150,
    successRate: 99.8,
    permissions: ["Read Performance Metrics", "Write Weak Concept Bank"],
    logs: [
      { id: "log-13", timestamp: "Just now", level: "INFO", message: "Analyzed Rahul Sharma: WDV method confusion logged to AI Memory Tutor." }
    ]
  },
  {
    id: "agent-10",
    name: "Faculty Assistant Agent",
    code: "FAA-10",
    role: "Educator Support & Grading Assistant",
    description: "Helps educators auto-grade descriptive student assignments, generate lesson plans, and highlight topics requiring classroom emphasis.",
    institutions: ["Faculty Portal"],
    status: "idle",
    lastRunTime: "3 hours ago",
    tasksCompleted: 430,
    successRate: 99.4,
    permissions: ["Generate Faculty Lesson Blueprints", "Draft Student Evaluation Reports"],
    logs: [
      { id: "log-14", timestamp: "3 hours ago", level: "SUCCESS", message: "Drafted teaching outline for CA Inter Costing: Standard Costing Variance Formulas." }
    ]
  },
  {
    id: "agent-11",
    name: "Multi-Platform Research & Knowledge Harvester",
    code: "MPA-11",
    role: "Cross-Platform Surveillance, Self-Training & Synthesis",
    description: "Surveys 7 approved educational platforms (BYJU'S, PW, Aakash, EduRev, StudyX, Toppr, Vedantu) + official bodies under strict copyright boundaries. Discovers learning gaps, trains internal pedagogical models, and compiles original study dossiers directly into the student library.",
    institutions: ["BYJU'S", "PW", "Aakash", "EduRev", "StudyX", "Toppr", "Vedantu", "ICAI", "MCA", "CBDT"],
    status: "running",
    lastRunTime: "Just now",
    tasksCompleted: 980,
    successRate: 99.9,
    permissions: [
      "Permitted Multi-Platform Research (No Paywall Bypass)",
      "Strict Copyright Rights & Permissions Verification",
      "Self-Training Heuristic Weight Updates",
      "Non-Destructive Dossier Append to Library"
    ],
    logs: [
      { id: "log-15", timestamp: "Just now", level: "SUCCESS", message: "Completed self-training cycle 22: Synthesized Corporate Law CSR Dossier with 99.9% originality." },
      { id: "log-16", timestamp: "12 mins ago", level: "VERIFIED", message: "Cross-platform gap analysis completed: Verified BRS Adjusted Cash Book mechanics across PW, BYJU'S, and ICAI BoS." },
      { id: "log-17", timestamp: "45 mins ago", level: "INFO", message: "Rights Registry updated: Categorized 7 educational platform sources as REFERENCE_ONLY." }
    ]
  }
]

