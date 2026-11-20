-- ============================================================
-- Migration: 20261121_academic_content_factory.sql
-- Additive migration — records academic content factory items and review rubrics
-- Does NOT drop or modify existing tables
-- ============================================================

CREATE TABLE IF NOT EXISTS public.academic_content_items (
  id                      TEXT PRIMARY KEY,
  title                   TEXT NOT NULL,
  hindi_title             TEXT,
  course_id               TEXT NOT NULL,
  course_name             TEXT NOT NULL,
  subject_id              TEXT NOT NULL,
  subject_name            TEXT NOT NULL,
  chapter_id              TEXT,
  chapter_name            TEXT,
  content_type            TEXT NOT NULL CHECK (content_type IN ('NOTES', 'MCQ_BANK', 'SOLUTIONS', 'MODEL_PAPER', 'STATUTORY_SUMMARY')),
  workflow_state          TEXT NOT NULL DEFAULT 'DISCOVERED' CHECK (workflow_state IN ('DISCOVERED', 'INGESTED', 'EXTRACTED', 'CLASSIFIED', 'SOURCE_VERIFIED', 'ACADEMICALLY_REVIEWED', 'APPROVED', 'PUBLISHED')),
  quality_score           INTEGER DEFAULT 0 CHECK (quality_score BETWEEN 0 AND 100),
  rubric                  JSONB DEFAULT '{}'::jsonb,
  content                 TEXT NOT NULL DEFAULT '',
  statutory_references   TEXT[] DEFAULT ARRAY[]::TEXT[],
  tags                    TEXT[] DEFAULT ARRAY[]::TEXT[],
  version                 INTEGER DEFAULT 1,
  author_agent            TEXT NOT NULL DEFAULT 'CONTENT-09',
  reviewed_by             TEXT DEFAULT 'QUALITY-13',
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_content_course ON public.academic_content_items(course_id);
CREATE INDEX IF NOT EXISTS idx_content_workflow ON public.academic_content_items(workflow_state);
CREATE INDEX IF NOT EXISTS idx_content_type ON public.academic_content_items(content_type);
CREATE INDEX IF NOT EXISTS idx_content_quality ON public.academic_content_items(quality_score DESC);

-- Enable RLS
ALTER TABLE public.academic_content_items ENABLE ROW LEVEL SECURITY;

-- Published items are readable by all authenticated students
CREATE POLICY "Public read published content items"
  ON public.academic_content_items
  FOR SELECT
  USING (workflow_state = 'PUBLISHED');

COMMENT ON TABLE public.academic_content_items IS 'Academic content items created and reviewed by CONTENT-09, QUESTION-11, SOLUTION-12, and QUALITY-13';
