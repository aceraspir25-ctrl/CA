# India-Wide Academic Platform Expansion Roadmap

## Working principles

- This roadmap is additive: preserve existing routes, components, data, integrations, and user progress.
- Implement on `feature/india-professional-academic-expansion`; merge only after review and verification.
- Keep the current Next.js 16, React 19, TypeScript, Supabase, and existing AI gateway unless a measured reason requires change.
- Treat course coverage as data-backed: do not claim a course, syllabus, question bank, or notification is complete until official sources have been verified.
- Separate public discovery/content from authenticated private student records.
- Do not redistribute copyrighted coaching material without permission. Prefer official open resources, licensed content, links, and original explanations.

## Existing capabilities found in the repository

- Course catalogue data and course/subject/chapter pages.
- CA, CMA, CS, ACCA, PRSU B.Com and BBA course positioning.
- Student dashboard, profile, progress, tests, exams, library, AI tutor and finance lab.
- AI provider gateway with Gemini/OpenAI configuration and a simulated fallback.
- Research pipeline UI/API, agent dashboard data, multi-platform source registry.
- Telegram webhook and bot runner.
- Supabase schema/client, cloud sync, S3-compatible storage and Upstash memory adapters.

These are existing code paths, not proof that every advertised workflow is fully persistent or production-secure.

## Target course catalogue

Use a normalized catalogue that distinguishes professional qualifications, university degrees, and competitive examinations.

### Professional qualifications
- ICAI CA: Foundation, Intermediate, Final.
- ICMAI CMA: Foundation, Intermediate, Final.
- ICSI CS: CSEET, Executive, Professional.
- ACCA, US CMA, CPA, CFA, FRM, CIMA, CFP, CIA and actuarial qualifications.
- Banking and finance certifications: JAIIB, CAIIB, NISM and IRDAI qualifications.

### University and technical degrees
- B.Com, B.Com (Hons), M.Com, BBA, MBA and PGDM.
- LLB, LLM, CLAT and related law pathways.
- BCA, MCA, B.Tech and focused tracks such as AI/ML, data science and cybersecurity.
- Nursing, pharmacy and allied-health programmes.

### Competitive examinations
- UPSC, State PSC, SSC, banking, RRB, GATE and ESE.
- Keep these in a separate exam taxonomy rather than treating them as professional qualifications.

## Logical specialist capabilities

These can begin as modules within the current app; separate deployable microservices are not a launch requirement.

1. LEADER-00: central orchestration, approvals, task routing and system health.
2. ACADEMIC-01: institutions, qualifications, syllabus versions, subjects and chapters.
3. RESOURCE-02: source registry, document ingestion, OCR, metadata, rights and versioning.
4. TUTOR-03: grounded AI explanations, multilingual teaching and cited answers.
5. EXAM-04: question bank, PYQs, mock tests, marking rules and analytics.
6. RESEARCH-05: official-source discovery, comparison and fact verification.
7. CAREER-06: career pathways, skills, internships, CV and interview practice.
8. TRACKER-07: study plans, revision, spaced repetition and progress.
9. UPDATE-08: syllabus amendments, exam notices and statutory updates.

## Public and private access

### Public mode
- Browse verified course and institution catalogue.
- View public syllabus outlines and official source links.
- Ask limited public AI questions.
- Try sample quizzes and view public exam/career information.
- Read public announcements and release notes.

### Private student mode
- Account, profile, course enrolments and personal study plan.
- Private uploads, notes, bookmarks and saved AI conversations.
- Progress, test attempts, weak-topic tracking and revision reminders.
- Personal document search with strict user-level access controls.

### Faculty and institution mode
- Faculty review queue, batch management and assignment publishing.
- Institute-level dashboards with tenant isolation.
- Moderation and content approval history.

### Admin mode
- Role-based permissions, source registry, audit logs, moderation and system health.
- Sensitive actions require re-authentication and explicit approval.

## Resource ingestion lifecycle

1. Discover a source.
2. Capture canonical URL, author/institution and retrieval timestamp.
3. Download only when permitted; otherwise retain an official link.
4. Extract text and tables; OCR scanned pages when needed.
5. Classify institution, qualification, syllabus session, subject and chapter.
6. Verify against the relevant official syllabus and amendment date.
7. Check copyright, licence and redistribution permission.
8. Run duplicate, factual and numerical checks.
9. Route to human review where required.
10. Publish a versioned resource record with citations and supersession links.

## Recommended data model additions

Add incrementally alongside the current schema; do not drop or rename existing tables during the expansion.

- institutions, qualifications, course_levels
- syllabus_versions, subjects, chapters
- source_registry, resources, resource_versions, resource_chunks
- enrollments, bookmarks, student_notes, study_plans
- question_bank_items, assessments, assessment_attempts
- revision_cards, revision_events, notifications
- organizations, memberships, roles, audit_logs

Every private record should have an owner or tenant key and enforced database policies.

## Priority implementation phases

### Phase 0 — Security and reliability foundation
- Rotate any exposed Telegram bot token and remove all hard-coded credential fallbacks.
- Replace demo-only client authentication with server-verified Supabase Auth.
- Restrict every private API route and lock down Supabase RLS.
- Protect Telegram webhook origin, admin actions and webhook setup.
- Add rate limits, request validation, upload limits and audit logs.
- Replace misleading simulated success states with explicit demo/simulated labels.
- Add automated tests and production build checks.

### Phase 1 — Catalogue foundation
- Introduce a normalized institution/qualification taxonomy.
- Add course catalogue browsing and filters without changing existing course routes.
- Store syllabus versions and official references.
- Pilot CA, CMA, CS, ACCA and selected B.Com curricula.

### Phase 2 — Verified knowledge library
- Add document ingestion jobs, OCR, metadata, rights checks and version history.
- Add searchable resources with source citations.
- Add student-owned uploads and notes with private access control.

### Phase 3 — Learning and assessment
- Add grounded AI tutor retrieval and subject-specific tutor modes.
- Add PYQ tagging, mock exams, configurable marking and mistake analytics.
- Add spaced repetition, adaptive practice and revision calendar.

### Phase 4 — Student and faculty experience
- Add public/private mode navigation, student onboarding and faculty review.
- Add institution/coach workspaces with tenant isolation.
- Add community, study groups and moderated doubt discussions.

### Phase 5 — Career and scale
- Add career maps, skill gap analysis, internship discovery and interview practice.
- Add PWA/offline reading, accessibility, multilingual voice tutor and mobile polish.
- Add analytics, billing/subscriptions and institution partnerships only after core trust and security are established.

## Additional product ideas

- Amendment diff viewer: show exactly what changed in a syllabus, law or tax rule.
- PYQ trend explorer: chapter weightage and recurring question patterns with source/year.
- Exam readiness score: based on real attempts and syllabus coverage, not fabricated metrics.
- AI answer evaluator: rubric-based feedback with human-review option.
- Numerical answer checker: workings, formula and unit validation.
- Voice tutor and bilingual audio summaries.
- Notes scanner: OCR handwritten notes into searchable personal notes.
- Study-room / peer group with moderation.
- Faculty content studio and institute-branded portals.
- Career explorer, internship tracker, resume builder and mock interviews.
- Accessibility controls, low-bandwidth mode and offline saved chapters.
- Parent/mentor progress sharing with student-controlled consent.

## Release acceptance criteria

- Existing routes and user data remain intact.
- New features are isolated behind additive routes/components or backwards-compatible schema migrations.
- No private record can be read or written by another student.
- Every official syllabus/resource has a source and verification date.
- AI answers clearly distinguish verified facts from generated explanations.
- No autonomous agent can publish or alter production content without configured permissions and an auditable approval policy.
- TypeScript, lint, tests and production build pass before merge.
