-- =====================================================================
-- EduFinance Pro & Antigravity - Complete Supabase Cloud Schema
-- PostgreSQL Tables, Indexes, Row-Level-Security (RLS), and Storage Buckets
-- =====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. STUDENT PROFILES TABLE
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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. AI TUTOR CONVERSATION MEMORY TABLE
CREATE TABLE IF NOT EXISTS public.ai_tutor_memory (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  category TEXT DEFAULT 'explanation',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_memory_student ON public.ai_tutor_memory(student_email);

-- 4. WEAK CONCEPTS & ERROR LOG TABLE
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

CREATE INDEX IF NOT EXISTS idx_weak_concepts_student ON public.weak_concepts(student_email);

-- 5. COURSE PROGRESS & STUDIED CHAPTERS TABLE
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

-- 6. EXTRACTED YOUTUBE LECTURES & STUDY MATERIALS
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

CREATE INDEX IF NOT EXISTS idx_yt_paper ON public.extracted_youtube_lectures(target_paper_id);
CREATE INDEX IF NOT EXISTS idx_yt_status ON public.extracted_youtube_lectures(status);

-- 7. GENERATED QUESTION PAPERS & MCQS
CREATE TABLE IF NOT EXISTS public.generated_papers (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  paper_code TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  paper_type TEXT NOT NULL,
  academic_session TEXT,
  max_marks INTEGER DEFAULT 100,
  duration_minutes INTEGER DEFAULT 180,
  questions JSONB NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CERTIFICATES OF MASTERY
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

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_tutor_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weak_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extracted_youtube_lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Allow public read & write for authorized student sessions
CREATE POLICY "Public profiles access" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Public AI memory access" ON public.ai_tutor_memory FOR ALL USING (true);
CREATE POLICY "Public weak concepts access" ON public.weak_concepts FOR ALL USING (true);
CREATE POLICY "Public course progress access" ON public.course_progress FOR ALL USING (true);
CREATE POLICY "Public extracted lectures access" ON public.extracted_youtube_lectures FOR ALL USING (true);
CREATE POLICY "Public generated papers access" ON public.generated_papers FOR ALL USING (true);
CREATE POLICY "Public certificates access" ON public.certificates FOR ALL USING (true);

-- 10. STORAGE BUCKETS (Run in Supabase Dashboard / Storage)
-- insert into storage.buckets (id, name, public) values ('study-materials', 'study-materials', true);
-- insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);
-- insert into storage.buckets (id, name, public) values ('exam-papers', 'exam-papers', true);
