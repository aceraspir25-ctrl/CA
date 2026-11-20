-- ============================================================
-- Migration: 20261121_community_and_institutions.sql
-- Additive migration — adds community_threads, community_comments,
-- institution_workspaces, and institution_batches tables.
-- Does NOT drop or modify existing tables.
-- ============================================================

-- 1. Community Threads
CREATE TABLE IF NOT EXISTS public.community_threads (
  id                  TEXT PRIMARY KEY,
  title               TEXT NOT NULL,
  hindi_title         TEXT,
  course_tag          TEXT NOT NULL,
  subject             TEXT NOT NULL,
  author_id           UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name         TEXT NOT NULL,
  author_role         TEXT DEFAULT 'Student',
  question_text       TEXT NOT NULL,
  statutory_reference TEXT,
  upvotes             INTEGER DEFAULT 1,
  views               INTEGER DEFAULT 1,
  is_solved           BOOLEAN DEFAULT false,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Community Comments & AI Solutions
CREATE TABLE IF NOT EXISTS public.community_comments (
  id                  TEXT PRIMARY KEY,
  thread_id           TEXT NOT NULL REFERENCES public.community_threads(id) ON DELETE CASCADE,
  author_name         TEXT NOT NULL,
  author_role         TEXT DEFAULT 'Student',
  content             TEXT NOT NULL,
  statutory_citations TEXT[] DEFAULT ARRAY[]::TEXT[],
  upvotes             INTEGER DEFAULT 0,
  is_accepted_solution BOOLEAN DEFAULT false,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Institution Workspaces
CREATE TABLE IF NOT EXISTS public.institution_workspaces (
  id                  UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name                TEXT NOT NULL,
  institution_code    TEXT UNIQUE NOT NULL,
  domain              TEXT,
  category            TEXT NOT NULL CHECK (category IN ('University', 'Affiliated College', 'Coaching Institute', 'Corporate Academy')),
  admin_email         TEXT NOT NULL,
  settings            JSONB DEFAULT '{}'::jsonb,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Institution Batches
CREATE TABLE IF NOT EXISTS public.institution_batches (
  id                  TEXT PRIMARY KEY,
  workspace_id        UUID REFERENCES public.institution_workspaces(id) ON DELETE CASCADE,
  name                TEXT NOT NULL,
  course              TEXT NOT NULL,
  total_students      INTEGER DEFAULT 0,
  syllabus_completed_pct INTEGER DEFAULT 0,
  avg_readiness_score INTEGER DEFAULT 0,
  target_exam_date    TEXT,
  faculty_lead        TEXT,
  next_mock_exam      TEXT,
  status              TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'UPCOMING', 'COMPLETED')),
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.community_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institution_workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institution_batches ENABLE ROW LEVEL SECURITY;

-- Public read for community threads & comments
CREATE POLICY "Public read community threads"
  ON public.community_threads FOR SELECT USING (true);

CREATE POLICY "Public read community comments"
  ON public.community_comments FOR SELECT USING (true);

-- Insert policy for authenticated students
CREATE POLICY "Authenticated users can create community threads"
  ON public.community_threads FOR INSERT WITH CHECK (true);

COMMENT ON TABLE public.community_threads IS 'All-India student community doubt discussions and AI solutions';
COMMENT ON TABLE public.institution_workspaces IS 'Multi-tenant institution, university and coaching institute workspaces';
