-- ============================================================
-- Migration: 20261121_course_coverage_matrix.sql
-- Additive migration — records course coverage snapshots & missing gap hunts
-- Does NOT drop or modify existing tables
-- ============================================================

CREATE TABLE IF NOT EXISTS public.course_coverage_records (
  id                      UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id               TEXT NOT NULL,
  course_name             TEXT NOT NULL,
  institution             TEXT NOT NULL,
  category                TEXT NOT NULL,
  overall_coverage_pct    INTEGER NOT NULL CHECK (overall_coverage_pct BETWEEN 0 AND 100),
  syllabus_score_pct      INTEGER DEFAULT 100,
  notes_score_pct         INTEGER DEFAULT 80,
  pyq_score_pct           INTEGER DEFAULT 75,
  question_bank_score_pct INTEGER DEFAULT 80,
  solutions_score_pct     INTEGER DEFAULT 80,
  exam_simulator_score_pct INTEGER DEFAULT 80,
  critical_gaps           JSONB DEFAULT '[]'::jsonb,
  audited_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_course_coverage_course ON public.course_coverage_records(course_id);
CREATE INDEX IF NOT EXISTS idx_course_coverage_audited ON public.course_coverage_records(audited_at DESC);

-- Enable RLS
ALTER TABLE public.course_coverage_records ENABLE ROW LEVEL SECURITY;

-- Read-only policy for authenticated users
CREATE POLICY "Public read coverage snapshots"
  ON public.course_coverage_records
  FOR SELECT
  USING (true);

COMMENT ON TABLE public.course_coverage_records IS 'Historical audit records tracking academic completeness and content hunter cycles';
