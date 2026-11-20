-- =====================================================================
-- JARVIS CCA-04: INDIA'S UNIFIED ACADEMIC INTELLIGENCE ECOSYSTEM
-- Versioned Supabase PostgreSQL Schema & Backwards-Compatible Migration
-- Includes: Multi-Tenant Organizations, Academic Taxonomies, RAG Engine,
-- Question Banks, Real Exam Engine, Revisions, Agent Runs, Audit Logs & Secure RLS
-- =====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CREATE EXTENSION IF NOT EXISTS "vector"; -- Uncomment when pgvector is enabled in Supabase project

-- 2. ORGANIZATIONS & TENANT DATA ISOLATION
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('university', 'college', 'coaching', 'firm', 'school')),
  domain TEXT,
  logo_url TEXT,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.roles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  permissions TEXT[] DEFAULT ARRAY[]::TEXT[]
);

INSERT INTO public.roles (id, name, description, permissions)
VALUES 
  ('super_admin', 'Super Administrator', 'Full platform control and agent oversight', ARRAY['*']),
  ('institution_admin', 'Institution Admin', 'Manage coaching or college organization', ARRAY['org.read', 'org.write', 'batch.manage', 'faculty.manage']),
  ('faculty', 'Academic Faculty', 'Create study materials, mock tests, and evaluate students', ARRAY['course.read', 'test.create', 'test.evaluate', 'content.publish']),
  ('student', 'Enrolled Student', 'Access courses, AI tutor, tests, and personal knowledge engine', ARRAY['course.read', 'ai.chat', 'test.attempt', 'notes.manage']),
  ('guest', 'Public Explorer', 'Browse course catalogue and limited AI demonstrations', ARRAY['catalog.read', 'sample.test'])
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.memberships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  role_id TEXT REFERENCES public.roles(id) DEFAULT 'student',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_memberships_user ON public.memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_org ON public.memberships(org_id);

-- 3. EXISTING PROFILES TABLE (PRESERVED & BACKWARDS-COMPATIBLE EXTENSION)
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  bio TEXT,
  institution TEXT NOT NULL DEFAULT 'PRSU',
  level TEXT NOT NULL DEFAULT 'B.Com Semester 1',
  target_exam TEXT,
  target_exam_date TEXT,
  college TEXT,
  city TEXT,
  avatar TEXT,
  student_level INTEGER DEFAULT 28,
  study_streak_days INTEGER DEFAULT 7,
  active_language TEXT DEFAULT 'en',
  role TEXT DEFAULT 'student',
  org_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ACADEMIC TAXONOMY: INSTITUTIONS & QUALIFICATIONS (INDIA & GLOBAL)
CREATE TABLE IF NOT EXISTS public.institutions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('statutory_body', 'central_university', 'state_university', 'international_body', 'exam_board')),
  jurisdiction TEXT DEFAULT 'India',
  official_url TEXT NOT NULL,
  logo_url TEXT,
  is_verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.qualifications (
  id TEXT PRIMARY KEY,
  institution_id TEXT REFERENCES public.institutions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('professional', 'university_degree', 'competitive_exam', 'certification')),
  description TEXT,
  official_syllabus_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.course_levels (
  id TEXT PRIMARY KEY,
  qualification_id TEXT REFERENCES public.qualifications(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  short_title TEXT NOT NULL,
  scheme TEXT DEFAULT 'NEP-2020 / New Scheme 2024',
  eligibility TEXT,
  sequence_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.syllabus_versions (
  id TEXT PRIMARY KEY,
  course_level_id TEXT REFERENCES public.course_levels(id) ON DELETE CASCADE,
  version_tag TEXT NOT NULL,
  academic_session TEXT NOT NULL,
  effective_date DATE,
  source_document_url TEXT,
  changelog_summary TEXT,
  is_current BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.subjects (
  id TEXT PRIMARY KEY,
  course_level_id TEXT REFERENCES public.course_levels(id) ON DELETE CASCADE,
  paper_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  code TEXT,
  marks INTEGER DEFAULT 100,
  is_practical BOOLEAN DEFAULT FALSE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.chapters (
  id TEXT PRIMARY KEY,
  subject_id TEXT REFERENCES public.subjects(id) ON DELETE CASCADE,
  chapter_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  hindi_title TEXT,
  estimated_hours INTEGER DEFAULT 6,
  weightage_marks INTEGER,
  level_min INTEGER DEFAULT 0,
  level_max INTEGER DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. VERIFIED DIGITAL LIBRARY, RESOURCE REGISTRY & RAG ENGINE
CREATE TABLE IF NOT EXISTS public.source_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  authority_type TEXT NOT NULL CHECK (authority_type IN ('official_statutory', 'university_portal', 'government_gazette', 'academic_journal', 'licensed_partner')),
  base_url TEXT NOT NULL,
  verification_status TEXT DEFAULT 'verified' CHECK (verification_status IN ('verified', 'pending', 'revoked')),
  copyright_policy TEXT DEFAULT 'link_only_fair_use',
  last_verified_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.resources (
  id TEXT PRIMARY KEY,
  source_id TEXT REFERENCES public.source_registry(id) ON DELETE SET NULL,
  qualification_id TEXT REFERENCES public.qualifications(id) ON DELETE SET NULL,
  subject_id TEXT REFERENCES public.subjects(id) ON DELETE SET NULL,
  chapter_id TEXT REFERENCES public.chapters(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('official_study_mat', 'pyq_paper', 'statutory_amendment', 'syllabus_pdf', 'video_lecture', 'faculty_note')),
  file_url TEXT NOT NULL,
  source_url TEXT,
  academic_session TEXT,
  language TEXT DEFAULT 'en',
  license_status TEXT DEFAULT 'official_open_access',
  is_verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.resource_chunks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  resource_id TEXT REFERENCES public.resources(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chunks_resource ON public.resource_chunks(resource_id);

-- 6. STUDENT KNOWLEDGE VAULT: NOTES SCANNER, BOOKMARKS & STUDY PLANS
CREATE TABLE IF NOT EXISTS public.student_notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_email TEXT NOT NULL,
  subject_id TEXT,
  chapter_id TEXT,
  title TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  is_ocr BOOLEAN DEFAULT FALSE,
  scanned_image_url TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notes_student ON public.student_notes(student_email);

CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_email TEXT NOT NULL,
  resource_id TEXT REFERENCES public.resources(id) ON DELETE CASCADE,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.study_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_email TEXT NOT NULL,
  qualification_id TEXT,
  target_exam_date DATE,
  daily_goal_minutes INTEGER DEFAULT 120,
  current_streak_days INTEGER DEFAULT 0,
  schedule JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. REAL EXAMINATION ENGINE & QUESTION BANKS
CREATE TABLE IF NOT EXISTS public.question_bank_items (
  id TEXT PRIMARY KEY,
  subject_id TEXT REFERENCES public.subjects(id) ON DELETE CASCADE,
  chapter_id TEXT REFERENCES public.chapters(id) ON DELETE SET NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('mcq', 'numerical', 'descriptive', 'case_study')),
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard', 'expert')),
  marks INTEGER NOT NULL DEFAULT 5,
  negative_marks NUMERIC(3, 2) DEFAULT 0.00,
  question_text TEXT NOT NULL,
  options JSONB, -- For MCQs: [{id: 'A', text: '...'}, ...]
  correct_answer TEXT,
  marking_scheme TEXT,
  pyq_reference TEXT, -- e.g. "CA Inter May 2023 Q3(b)"
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.assessments (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subject_id TEXT REFERENCES public.subjects(id) ON DELETE CASCADE,
  course_level_id TEXT REFERENCES public.course_levels(id) ON DELETE SET NULL,
  time_limit_minutes INTEGER NOT NULL DEFAULT 180,
  total_marks INTEGER NOT NULL DEFAULT 100,
  passing_marks INTEGER DEFAULT 40,
  negative_marking_ratio NUMERIC(3, 2) DEFAULT 0.25,
  instructions TEXT,
  sections JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.assessment_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  assessment_id TEXT REFERENCES public.assessments(id) ON DELETE CASCADE,
  student_email TEXT NOT NULL,
  score NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
  total_marks INTEGER NOT NULL,
  percentage NUMERIC(5, 2) NOT NULL,
  is_passed BOOLEAN DEFAULT FALSE,
  answers JSONB NOT NULL,
  ai_evaluation_rubric JSONB,
  weak_topics_identified TEXT[],
  time_spent_seconds INTEGER DEFAULT 0,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_attempts_student ON public.assessment_attempts(student_email);

-- 8. REPETITION & REVISION ENGINE (LEITNER / ANKI STYLE)
CREATE TABLE IF NOT EXISTS public.revision_cards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_email TEXT NOT NULL,
  subject_id TEXT,
  front_prompt TEXT NOT NULL,
  back_solution TEXT NOT NULL,
  interval_days INTEGER DEFAULT 1,
  repetition_count INTEGER DEFAULT 0,
  ease_factor NUMERIC(3, 2) DEFAULT 2.5,
  next_review_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_revision_next ON public.revision_cards(student_email, next_review_at);

-- 9. PRESERVED ORIGINAL TABLES
CREATE TABLE IF NOT EXISTS public.ai_tutor_memory (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  category TEXT DEFAULT 'explanation',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.weak_concepts (
  id TEXT PRIMARY KEY,
  student_email TEXT NOT NULL,
  concept TEXT NOT NULL,
  subject TEXT NOT NULL,
  error_count INTEGER DEFAULT 1,
  notes TEXT,
  last_attempted TEXT,
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.course_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_email TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  topic_title TEXT NOT NULL,
  course_name TEXT NOT NULL,
  level_achieved INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_email, topic_id)
);

CREATE TABLE IF NOT EXISTS public.extracted_youtube_lectures (
  id TEXT PRIMARY KEY,
  video_id TEXT NOT NULL,
  video_url TEXT NOT NULL,
  embed_url TEXT NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  thumbnail_url TEXT,
  target_institution_id TEXT NOT NULL,
  target_institution_name TEXT,
  target_level_id TEXT NOT NULL,
  target_level_title TEXT,
  target_paper_id TEXT NOT NULL,
  target_paper_title TEXT,
  target_chapter_id TEXT,
  target_chapter_title TEXT,
  detection_mode TEXT DEFAULT 'auto_classified',
  status TEXT DEFAULT 'active',
  synthesized_notes JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.certificates (
  id TEXT PRIMARY KEY,
  student_email TEXT NOT NULL,
  student_name TEXT NOT NULL,
  course_name TEXT NOT NULL,
  institution TEXT NOT NULL,
  completion_date TEXT NOT NULL,
  score_percentage INTEGER NOT NULL,
  mastery_level INTEGER NOT NULL,
  verification_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. MULTI-AGENT ORCHESTRATION & OBSERVABILITY (LEADER-00 + SPECIALISTS)
CREATE TABLE IF NOT EXISTS public.agent_runs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  agent_id TEXT NOT NULL, -- e.g. 'LEADER-00', 'TUTOR-03', 'EXAM-04'
  triggered_by TEXT NOT NULL, -- 'cron_24hr', 'user_request', 'telegram'
  status TEXT NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed', 'paused_approval')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  metrics JSONB DEFAULT '{}'::jsonb,
  summary_output TEXT
);

CREATE TABLE IF NOT EXISTS public.agent_tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  run_id UUID REFERENCES public.agent_runs(id) ON DELETE CASCADE,
  assigned_agent TEXT NOT NULL,
  task_type TEXT NOT NULL,
  input_payload JSONB NOT NULL,
  output_result JSONB,
  error_message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.approval_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  operation_name TEXT NOT NULL,
  requester_agent TEXT NOT NULL,
  payload JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  security_hash TEXT,
  approved_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  target_entity TEXT NOT NULL,
  ip_address TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_created ON public.audit_logs(created_at);

-- 11. SECURE ROW-LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_tutor_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weak_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revision_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_bank_items ENABLE ROW LEVEL SECURITY;

-- Public Academic Catalog: Read-only for all public visitors & students
CREATE POLICY "Public Read Institutions" ON public.institutions FOR SELECT USING (true);
CREATE POLICY "Public Read Qualifications" ON public.qualifications FOR SELECT USING (true);
CREATE POLICY "Public Read Course Levels" ON public.course_levels FOR SELECT USING (true);
CREATE POLICY "Public Read Subjects" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Public Read Chapters" ON public.chapters FOR SELECT USING (true);
CREATE POLICY "Public Read Resources" ON public.resources FOR SELECT USING (is_verified = true);
CREATE POLICY "Public Read Assessments" ON public.assessments FOR SELECT USING (true);
CREATE POLICY "Public Read Question Bank" ON public.question_bank_items FOR SELECT USING (true);

-- Student Private Data Isolation: Users can access and modify only their own data
CREATE POLICY "Student Profile Self Manage" ON public.profiles FOR ALL USING (
  auth.jwt()->>'email' = email OR auth.uid()::text = id OR auth.role() = 'service_role'
);

CREATE POLICY "Student Notes Self Manage" ON public.student_notes FOR ALL USING (
  auth.jwt()->>'email' = student_email OR auth.role() = 'service_role'
);

CREATE POLICY "Student AI Memory Self Manage" ON public.ai_tutor_memory FOR ALL USING (
  auth.jwt()->>'email' = student_email OR auth.role() = 'service_role'
);

CREATE POLICY "Student Weak Concepts Self Manage" ON public.weak_concepts FOR ALL USING (
  auth.jwt()->>'email' = student_email OR auth.role() = 'service_role'
);

CREATE POLICY "Student Bookmarks Self Manage" ON public.bookmarks FOR ALL USING (
  auth.jwt()->>'email' = student_email OR auth.role() = 'service_role'
);

CREATE POLICY "Student Attempts Self Manage" ON public.assessment_attempts FOR ALL USING (
  auth.jwt()->>'email' = student_email OR auth.role() = 'service_role'
);

CREATE POLICY "Student Revision Cards Self Manage" ON public.revision_cards FOR ALL USING (
  auth.jwt()->>'email' = student_email OR auth.role() = 'service_role'
);

CREATE POLICY "Admin Audit Log Read" ON public.audit_logs FOR SELECT USING (
  auth.jwt()->>'role' = 'super_admin' OR auth.role() = 'service_role'
);
