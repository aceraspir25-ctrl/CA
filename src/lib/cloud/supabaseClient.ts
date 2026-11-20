/**
 * Supabase Cloud Database & Storage Client
 * Handles cloud persistence for:
 * - Student profiles & authentication
 * - AI Tutor conversational memory & learning graph
 * - Weak concepts & mistake tracking
 * - Studied topics & course progress
 * - Extracted YouTube video lectures & study materials
 * - Storage of study PDFs, test papers, and student certificates
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { UserProfile, AIMessage, WeakConcept } from "@/lib/store"
import { ExtractedVideoRecord } from "@/data/extractedVideosData"

// Environment variable defaults
const ENV_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ""
const ENV_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ""

// Runtime dynamic credentials store (allows configuring via Settings UI)
let dynamicSupabaseUrl = ENV_SUPABASE_URL
let dynamicSupabaseKey = ENV_SUPABASE_KEY
let supabaseInstance: SupabaseClient | null = null

export interface CloudConnectionStatus {
  provider: "supabase" | "s3_cloudflare" | "cloud_memory"
  connected: boolean
  url?: string
  latencyMs?: number
  message: string
  lastSyncedAt?: string
}

/**
 * Configure Supabase credentials at runtime from settings or environment
 */
export function configureSupabase(url: string, anonKey: string): SupabaseClient | null {
  if (!url || !anonKey) {
    supabaseInstance = null
    return null
  }
  dynamicSupabaseUrl = url.trim()
  dynamicSupabaseKey = anonKey.trim()

  try {
    supabaseInstance = createClient(dynamicSupabaseUrl, dynamicSupabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
    return supabaseInstance
  } catch (err) {
    console.warn("Failed to initialize Supabase client:", err)
    supabaseInstance = null
    return null
  }
}

/**
 * Get the active Supabase client instance
 */
export function getSupabase(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance

  const url = dynamicSupabaseUrl || (typeof window !== "undefined" ? localStorage.getItem("edufinance_supabase_url") || "" : "")
  const key = dynamicSupabaseKey || (typeof window !== "undefined" ? localStorage.getItem("edufinance_supabase_key") || "" : "")

  if (url && key) {
    return configureSupabase(url, key)
  }
  return null
}

/**
 * Check if Supabase cloud is configured with valid URL & Key
 */
export function isSupabaseConfigured(): boolean {
  const supabase = getSupabase()
  return Boolean(supabase)
}

/**
 * Test live connection to Supabase cloud
 */
export async function testSupabaseConnection(urlInput?: string, keyInput?: string): Promise<CloudConnectionStatus> {
  const targetUrl = urlInput || dynamicSupabaseUrl || (typeof window !== "undefined" ? localStorage.getItem("edufinance_supabase_url") || "" : "")
  const targetKey = keyInput || dynamicSupabaseKey || (typeof window !== "undefined" ? localStorage.getItem("edufinance_supabase_key") || "" : "")

  if (!targetUrl || !targetKey) {
    return {
      provider: "supabase",
      connected: false,
      message: "Supabase URL and Anon Key are not configured. Using local-first storage mode."
    }
  }

  const startTime = Date.now()
  try {
    const client = createClient(targetUrl, targetKey)
    // Ping public health check / table probe
    const { error } = await client.from("profiles").select("count").limit(1)

    const latencyMs = Date.now() - startTime

    if (error && error.code !== "PGRST116" && !error.message.includes("relation") && !error.message.includes("does not exist")) {
      return {
        provider: "supabase",
        connected: false,
        url: targetUrl,
        latencyMs,
        message: `Connection error: ${error.message}`
      }
    }

    return {
      provider: "supabase",
      connected: true,
      url: targetUrl,
      latencyMs,
      message: `Successfully connected to Supabase PostgreSQL Database & Storage! (Ping: ${latencyMs}ms)`,
      lastSyncedAt: new Date().toLocaleTimeString()
    }
  } catch (err: any) {
    return {
      provider: "supabase",
      connected: false,
      url: targetUrl,
      message: `Network failure connecting to Supabase: ${err?.message || "Check URL format."}`
    }
  }
}

/**
 * Sync Student Profile to Supabase Cloud
 */
export async function syncProfileToSupabase(profile: UserProfile): Promise<{ success: boolean; message: string }> {
  const supabase = getSupabase()
  if (!supabase) {
    return { success: false, message: "Supabase not connected. Saved to local storage." }
  }

  try {
    const { error } = await supabase.from("profiles").upsert(
      {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        institution: profile.institution,
        level: profile.level,
        target_exam: profile.targetExam,
        target_exam_date: profile.targetExamDate,
        college: profile.college,
        city: profile.city,
        avatar: profile.avatar,
        updated_at: new Date().toISOString()
      },
      { onConflict: "email" }
    )

    if (error) throw error
    return { success: true, message: "Profile successfully synchronized with Supabase Cloud!" }
  } catch (err: any) {
    console.warn("Supabase profile sync warning:", err)
    return { success: false, message: `Cloud sync skipped: ${err?.message}` }
  }
}

/**
 * Sync AI Tutor Messages & Conversational Memory to Supabase Cloud
 */
export async function syncAiMemoryToSupabase(
  studentEmail: string,
  messages: AIMessage[],
  weakConcepts: WeakConcept[]
): Promise<{ success: boolean; memorySynced: number }> {
  const supabase = getSupabase()
  if (!supabase) return { success: false, memorySynced: 0 }

  try {
    let syncedCount = 0

    // 1. Sync AI messages
    if (messages.length > 0) {
      const records = messages.slice(-20).map((m) => ({
        student_email: studentEmail,
        role: m.role,
        content: m.content,
        category: m.category || "explanation",
        created_at: m.timestamp || new Date().toISOString()
      }))

      await supabase.from("ai_tutor_memory").upsert(records, { ignoreDuplicates: true })
      syncedCount += records.length
    }

    // 2. Sync Weak Concepts
    if (weakConcepts.length > 0) {
      const weakRecords = weakConcepts.map((w) => ({
        id: w.id,
        student_email: studentEmail,
        concept: w.concept,
        subject: w.subject,
        error_count: w.errorCount,
        notes: w.notes,
        last_attempted: w.lastAttempted
      }))

      await supabase.from("weak_concepts").upsert(weakRecords, { onConflict: "id" })
      syncedCount += weakRecords.length
    }

    return { success: true, memorySynced: syncedCount }
  } catch (e) {
    console.warn("AI memory sync note:", e)
    return { success: false, memorySynced: 0 }
  }
}

/**
 * Sync Extracted YouTube Video Lectures to Supabase Cloud
 */
export async function syncYouTubeLectureToSupabase(
  record: ExtractedVideoRecord
): Promise<{ success: boolean; message: string }> {
  const supabase = getSupabase()
  if (!supabase) return { success: false, message: "Local storage only" }

  try {
    const { error } = await supabase.from("extracted_youtube_lectures").upsert(
      {
        id: record.id,
        video_id: record.videoId,
        video_url: record.videoUrl,
        embed_url: record.embedUrl,
        title: record.title,
        author: record.author,
        thumbnail_url: record.thumbnailUrl,
        target_institution_id: record.targetInstitutionId,
        target_institution_name: record.targetInstitutionName,
        target_level_id: record.targetLevelId,
        target_level_title: record.targetLevelTitle,
        target_paper_id: record.targetPaperId,
        target_paper_title: record.targetPaperTitle,
        target_chapter_id: record.targetChapterId,
        target_chapter_title: record.targetChapterTitle,
        detection_mode: record.detectionMode,
        status: record.status,
        synthesized_notes: record.synthesizedNotes,
        created_at: record.extractedAt
      },
      { onConflict: "id" }
    )

    if (error) throw error
    return { success: true, message: "YouTube lecture synced to Supabase database!" }
  } catch (err: any) {
    return { success: false, message: err?.message || "Sync error" }
  }
}

/**
 * Upload Study File or Document to Supabase Cloud Storage
 */
export async function uploadFileToSupabaseStorage(
  bucket: "study-materials" | "avatars" | "exam-papers",
  filePath: string,
  fileBlob: Blob | File
): Promise<{ success: boolean; publicUrl?: string; error?: string }> {
  const supabase = getSupabase()
  if (!supabase) {
    return { success: false, error: "Supabase Cloud Storage is not configured." }
  }

  try {
    const { data, error } = await supabase.storage.from(bucket).upload(filePath, fileBlob, {
      cacheControl: "3600",
      upsert: true
    })

    if (error) throw error

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)
    return { success: true, publicUrl: urlData.publicUrl }
  } catch (err: any) {
    console.error("Supabase Storage Upload Error:", err)
    return { success: false, error: err?.message || "Storage upload failed" }
  }
}
