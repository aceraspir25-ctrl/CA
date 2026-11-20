/**
 * JARVIS CCA-04: Course Coverage Matrix & Missing Content Hunter System
 * Audits academic assets across 6 key pillars:
 * 1. Syllabus & Chapter Taxonomy
 * 2. Detailed Study Notes & 23-Point Guides
 * 3. Verified Official Previous Year Papers (PYQ 2020-2024)
 * 4. Practice Question Banks (MCQs + Numericals)
 * 5. Step-by-Step Solutions & Ledger Workings
 * 6. Exam Simulator Mock Papers (180-min real exam)
 */

import { AgentCode } from "@/lib/agents/types"

export interface AcademicPillarScore {
  pillar: "syllabus" | "notes" | "pyq" | "questionBank" | "solutions" | "examSimulator"
  name: string
  scorePercent: number // 0 - 100
  status: "COMPLETE" | "PARTIAL" | "MISSING"
  itemsPresent: number
  itemsRequired: number
}

export interface CourseCoverageRecord {
  courseId: string
  courseName: string
  category: "Professional Accounting" | "University Degrees" | "Technology & Engineering" | "Competitive Examinations" | "Global Qualifications"
  institution: string
  overallCoveragePercent: number
  pillars: AcademicPillarScore[]
  lastAudited: string
  criticalGaps: string[]
}

export interface ContentGapItem {
  id: string
  courseId: string
  courseName: string
  pillar: string
  subjectOrChapter: string
  description: string
  priority: "low" | "medium" | "high" | "critical"
  assignedAgent: AgentCode
  intent: string
  payload: Record<string, any>
}

// Baseline Course Coverage Registry across Indian & Global qualifications
export const COURSE_COVERAGE_REGISTRY: CourseCoverageRecord[] = [
  {
    courseId: "ca-foundation",
    courseName: "ICAI CA Foundation (New Scheme)",
    category: "Professional Accounting",
    institution: "ICAI",
    overallCoveragePercent: 92,
    lastAudited: new Date().toISOString(),
    criticalGaps: [
      "Missing Paper 4 (Business Economics) 2024 Nov PYQ questions",
      "Need 10 additional case study questions for Final Accounts"
    ],
    pillars: [
      { pillar: "syllabus", name: "Official Syllabus", scorePercent: 100, status: "COMPLETE", itemsPresent: 4, itemsRequired: 4 },
      { pillar: "notes", name: "23-Point Chapter Notes", scorePercent: 95, status: "COMPLETE", itemsPresent: 28, itemsRequired: 30 },
      { pillar: "pyq", name: "Official PYQ Papers", scorePercent: 88, status: "PARTIAL", itemsPresent: 7, itemsRequired: 8 },
      { pillar: "questionBank", name: "Question Bank & MCQs", scorePercent: 90, status: "COMPLETE", itemsPresent: 450, itemsRequired: 500 },
      { pillar: "solutions", name: "Step-by-Step Solutions", scorePercent: 92, status: "COMPLETE", itemsPresent: 400, itemsRequired: 450 },
      { pillar: "examSimulator", name: "180-min Exam Simulator", scorePercent: 85, status: "COMPLETE", itemsPresent: 2, itemsRequired: 2 }
    ]
  },
  {
    courseId: "ca-intermediate",
    courseName: "ICAI CA Intermediate (New Scheme)",
    category: "Professional Accounting",
    institution: "ICAI",
    overallCoveragePercent: 86,
    lastAudited: new Date().toISOString(),
    criticalGaps: [
      "Group 2 Paper 5 (Auditing & Ethics) requires 2024 Ind AS revision notes",
      "Missing Paper 3 (Taxation Sec 115BAC) amendment MCQs for May 2025"
    ],
    pillars: [
      { pillar: "syllabus", name: "Official Syllabus", scorePercent: 100, status: "COMPLETE", itemsPresent: 6, itemsRequired: 6 },
      { pillar: "notes", name: "23-Point Chapter Notes", scorePercent: 85, status: "COMPLETE", itemsPresent: 55, itemsRequired: 65 },
      { pillar: "pyq", name: "Official PYQ Papers", scorePercent: 80, status: "PARTIAL", itemsPresent: 8, itemsRequired: 10 },
      { pillar: "questionBank", name: "Question Bank & MCQs", scorePercent: 82, status: "COMPLETE", itemsPresent: 620, itemsRequired: 750 },
      { pillar: "solutions", name: "Step-by-Step Solutions", scorePercent: 84, status: "COMPLETE", itemsPresent: 500, itemsRequired: 600 },
      { pillar: "examSimulator", name: "180-min Exam Simulator", scorePercent: 85, status: "COMPLETE", itemsPresent: 2, itemsRequired: 2 }
    ]
  },
  {
    courseId: "ca-final",
    courseName: "ICAI CA Final (New Scheme)",
    category: "Professional Accounting",
    institution: "ICAI",
    overallCoveragePercent: 78,
    lastAudited: new Date().toISOString(),
    criticalGaps: [
      "Paper 1 (Financial Reporting) Ind AS 115 & 116 comprehensive case studies needed",
      "Paper 2 (AFM) derivatives & portfolio numericals missing working notes"
    ],
    pillars: [
      { pillar: "syllabus", name: "Official Syllabus", scorePercent: 100, status: "COMPLETE", itemsPresent: 6, itemsRequired: 6 },
      { pillar: "notes", name: "23-Point Chapter Notes", scorePercent: 75, status: "PARTIAL", itemsPresent: 45, itemsRequired: 60 },
      { pillar: "pyq", name: "Official PYQ Papers", scorePercent: 70, status: "PARTIAL", itemsPresent: 6, itemsRequired: 10 },
      { pillar: "questionBank", name: "Question Bank & MCQs", scorePercent: 74, status: "PARTIAL", itemsPresent: 420, itemsRequired: 600 },
      { pillar: "solutions", name: "Step-by-Step Solutions", scorePercent: 76, status: "PARTIAL", itemsPresent: 380, itemsRequired: 500 },
      { pillar: "examSimulator", name: "180-min Exam Simulator", scorePercent: 70, status: "PARTIAL", itemsPresent: 1, itemsRequired: 2 }
    ]
  },
  {
    courseId: "cma-intermediate",
    courseName: "ICMAI CMA Intermediate (2022 Syllabus)",
    category: "Professional Accounting",
    institution: "ICMAI",
    overallCoveragePercent: 88,
    lastAudited: new Date().toISOString(),
    criticalGaps: [
      "Paper 7 (Direct & Indirect Taxation) Finance Act 2024 slab rate updates",
      "Paper 8 (Cost Accounting) Standard Costing variance numericals"
    ],
    pillars: [
      { pillar: "syllabus", name: "Official Syllabus", scorePercent: 100, status: "COMPLETE", itemsPresent: 8, itemsRequired: 8 },
      { pillar: "notes", name: "23-Point Chapter Notes", scorePercent: 88, status: "COMPLETE", itemsPresent: 60, itemsRequired: 70 },
      { pillar: "pyq", name: "Official PYQ Papers", scorePercent: 85, status: "COMPLETE", itemsPresent: 8, itemsRequired: 10 },
      { pillar: "questionBank", name: "Question Bank & MCQs", scorePercent: 86, status: "COMPLETE", itemsPresent: 580, itemsRequired: 650 },
      { pillar: "solutions", name: "Step-by-Step Solutions", scorePercent: 85, status: "COMPLETE", itemsPresent: 480, itemsRequired: 550 },
      { pillar: "examSimulator", name: "180-min Exam Simulator", scorePercent: 85, status: "COMPLETE", itemsPresent: 2, itemsRequired: 2 }
    ]
  },
  {
    courseId: "cs-executive",
    courseName: "ICSI CS Executive (2022 Syllabus)",
    category: "Professional Accounting",
    institution: "ICSI",
    overallCoveragePercent: 82,
    lastAudited: new Date().toISOString(),
    criticalGaps: [
      "Company Law & Practice: BNS 2023 statutory cross-references needed",
      "Jurisprudence, Interpretation and General Laws: Constitution articles notes"
    ],
    pillars: [
      { pillar: "syllabus", name: "Official Syllabus", scorePercent: 100, status: "COMPLETE", itemsPresent: 7, itemsRequired: 7 },
      { pillar: "notes", name: "23-Point Chapter Notes", scorePercent: 80, status: "COMPLETE", itemsPresent: 50, itemsRequired: 65 },
      { pillar: "pyq", name: "Official PYQ Papers", scorePercent: 75, status: "PARTIAL", itemsPresent: 6, itemsRequired: 8 },
      { pillar: "questionBank", name: "Question Bank & MCQs", scorePercent: 78, status: "PARTIAL", itemsPresent: 400, itemsRequired: 550 },
      { pillar: "solutions", name: "Step-by-Step Solutions", scorePercent: 80, status: "COMPLETE", itemsPresent: 350, itemsRequired: 450 },
      { pillar: "examSimulator", name: "180-min Exam Simulator", scorePercent: 80, status: "COMPLETE", itemsPresent: 1, itemsRequired: 2 }
    ]
  },
  {
    courseId: "bcom-prsu",
    courseName: "B.Com — Pt. Ravishankar Shukla University (NEP 2020)",
    category: "University Degrees",
    institution: "PRSU",
    overallCoveragePercent: 94,
    lastAudited: new Date().toISOString(),
    criticalGaps: [
      "B.Com 3rd Year: Corporate Accounting Amalgamation journal entries"
    ],
    pillars: [
      { pillar: "syllabus", name: "Official Syllabus", scorePercent: 100, status: "COMPLETE", itemsPresent: 6, itemsRequired: 6 },
      { pillar: "notes", name: "23-Point Chapter Notes", scorePercent: 96, status: "COMPLETE", itemsPresent: 48, itemsRequired: 50 },
      { pillar: "pyq", name: "Official PYQ Papers", scorePercent: 90, status: "COMPLETE", itemsPresent: 9, itemsRequired: 10 },
      { pillar: "questionBank", name: "Question Bank & MCQs", scorePercent: 92, status: "COMPLETE", itemsPresent: 450, itemsRequired: 500 },
      { pillar: "solutions", name: "Step-by-Step Solutions", scorePercent: 94, status: "COMPLETE", itemsPresent: 420, itemsRequired: 450 },
      { pillar: "examSimulator", name: "180-min Exam Simulator", scorePercent: 90, status: "COMPLETE", itemsPresent: 2, itemsRequired: 2 }
    ]
  },
  {
    courseId: "tech-ai-ml",
    courseName: "B.Tech / BCA: Artificial Intelligence & Machine Learning",
    category: "Technology & Engineering",
    institution: "AICTE / University",
    overallCoveragePercent: 80,
    lastAudited: new Date().toISOString(),
    criticalGaps: [
      "Transformer architectures & LLM fine-tuning practical notes needed",
      "Python NumPy/Pandas numerical practice problems for data analysis"
    ],
    pillars: [
      { pillar: "syllabus", name: "Official Syllabus", scorePercent: 100, status: "COMPLETE", itemsPresent: 5, itemsRequired: 5 },
      { pillar: "notes", name: "Technical Notes", scorePercent: 80, status: "COMPLETE", itemsPresent: 35, itemsRequired: 45 },
      { pillar: "pyq", name: "University Exam Papers", scorePercent: 75, status: "PARTIAL", itemsPresent: 5, itemsRequired: 8 },
      { pillar: "questionBank", name: "Coding Problems & MCQs", scorePercent: 75, status: "PARTIAL", itemsPresent: 250, itemsRequired: 350 },
      { pillar: "solutions", name: "Code Solutions", scorePercent: 78, status: "PARTIAL", itemsPresent: 200, itemsRequired: 280 },
      { pillar: "examSimulator", name: "Practical Assessment", scorePercent: 70, status: "PARTIAL", itemsPresent: 1, itemsRequired: 2 }
    ]
  }
]

/**
 * Scan all courses and extract concrete missing gaps
 */
export function scanMissingContentGaps(): ContentGapItem[] {
  const gaps: ContentGapItem[] = []

  for (const course of COURSE_COVERAGE_REGISTRY) {
    for (const pillar of course.pillars) {
      if (pillar.scorePercent < 85) {
        let assignedAgent: AgentCode = "CONTENT-09"
        let intent = `Generate missing ${pillar.name} for ${course.courseName}`
        let priority: "low" | "medium" | "high" | "critical" = "medium"

        if (pillar.pillar === "pyq") {
          assignedAgent = "PAPER-10"
          intent = `Discover and index official PYQs for ${course.courseName}`
          priority = "high"
        } else if (pillar.pillar === "questionBank") {
          assignedAgent = "QUESTION-11"
          intent = `Generate 50 exam-aligned MCQs and numericals for ${course.courseName}`
          priority = "high"
        } else if (pillar.pillar === "solutions") {
          assignedAgent = "SOLUTION-12"
          intent = `Generate step-by-step solutions for practice problems in ${course.courseName}`
          priority = "medium"
        } else if (pillar.pillar === "syllabus") {
          assignedAgent = "SYLLABUS-15"
          intent = `Audit active scheme version and official structure for ${course.courseName}`
          priority = "critical"
        }

        gaps.push({
          id: `gap-${course.courseId}-${pillar.pillar}`,
          courseId: course.courseId,
          courseName: course.courseName,
          pillar: pillar.pillar,
          subjectOrChapter: `${pillar.name} Gap (${pillar.itemsPresent}/${pillar.itemsRequired} items)`,
          description: `Coverage is ${pillar.scorePercent}% (${pillar.itemsRequired - pillar.itemsPresent} items missing to reach 100%).`,
          priority,
          assignedAgent,
          intent,
          payload: {
            course: course.courseName,
            courseId: course.courseId,
            pillar: pillar.pillar,
            itemsMissing: pillar.itemsRequired - pillar.itemsPresent
          }
        })
      }
    }

    // Add explicit critical gaps noted by faculty
    for (const crit of course.criticalGaps) {
      gaps.push({
        id: `crit-${course.courseId}-${Math.random().toString(36).substring(2, 6)}`,
        courseId: course.courseId,
        courseName: course.courseName,
        pillar: "specific_requirement",
        subjectOrChapter: "Faculty Audit Flag",
        description: crit,
        priority: "high",
        assignedAgent: crit.includes("PYQ") ? "PAPER-10" : crit.includes("MCQ") ? "QUESTION-11" : "CONTENT-09",
        intent: `Address critical academic gap: ${crit} in ${course.courseName}`,
        payload: {
          course: course.courseName,
          gapNote: crit
        }
      })
    }
  }

  return gaps
}

/**
 * Calculate overall system-wide academic intelligence readiness score
 */
export function getSystemCoverageMetrics() {
  const totalCourses = COURSE_COVERAGE_REGISTRY.length
  const avgCoverage = Math.round(
    COURSE_COVERAGE_REGISTRY.reduce((acc, c) => acc + c.overallCoveragePercent, 0) / totalCourses
  )

  const gaps = scanMissingContentGaps()

  return {
    totalQualificationsTracked: totalCourses,
    averageCoveragePercent: avgCoverage,
    totalGapsIdentified: gaps.length,
    criticalGapsCount: gaps.filter(g => g.priority === "critical" || g.priority === "high").length,
    readinessRating: avgCoverage >= 90 ? "TIER-1 EXCELLENCE" : avgCoverage >= 80 ? "PRODUCTION READY" : "EXPANSION IN PROGRESS",
    lastScanTimestamp: new Date().toISOString()
  }
}
