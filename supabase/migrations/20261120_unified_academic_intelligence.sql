-- Migration: 20261120_unified_academic_intelligence.sql
-- Applies backwards-compatible schema expansion for JARVIS CCA-04
-- Preserves all previous tables: profiles, ai_tutor_memory, weak_concepts, course_progress, extracted_youtube_lectures, generated_papers, certificates

\i ../schema.sql
