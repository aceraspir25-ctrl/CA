/**
 * Extracted YouTube Educational Videos & Course Material Registry
 * Stores videos, synthesized 23-point notes, numericals, and MCQs extracted from YouTube lectures.
 */

export interface ExtractedVideoRecord {
  id: string
  videoId: string
  videoUrl: string
  embedUrl: string
  title: string
  author: string
  authorUrl?: string
  thumbnailUrl?: string
  targetInstitutionId: string
  targetInstitutionName: string
  targetLevelId: string
  targetLevelTitle: string
  targetPaperId: string
  targetPaperTitle: string
  targetChapterId: string
  targetChapterTitle: string
  extractedAt: string
  status: "active" | "revoked"
  detectionMode: "auto_classified" | "user_specified"
  synthesizedNotes: {
    overview: string
    eli10: {
      en: string
      hi: string
      hinglish: string
    }
    statutoryContext: {
      standards: string
      sections: string
      provisions: string
    }
    practicalIllustration: {
      problemStatement: string
      solutionSteps: string[]
      journalEntries?: {
        particulars: string
        debit: string
        credit: string
      }[]
    }
    commonMistakes: string[]
    memoryTrick: string
    practiceQuestions: {
      q: string
      a: string
    }[]
    mcqs?: {
      q: string
      options: string[]
      answer: number
      explanation: string
    }[]
  }
}

// In-memory persistent registry for extracted videos
export const EXTRACTED_VIDEOS_STORE: ExtractedVideoRecord[] = []

/**
 * Register or update an extracted YouTube video
 */
export function registerExtractedVideo(record: ExtractedVideoRecord): ExtractedVideoRecord {
  // Check if already exists for same videoId and paperId
  const existingIdx = EXTRACTED_VIDEOS_STORE.findIndex(
    (v) => v.videoId === record.videoId && v.targetPaperId === record.targetPaperId
  )
  if (existingIdx >= 0) {
    EXTRACTED_VIDEOS_STORE[existingIdx] = record
  } else {
    EXTRACTED_VIDEOS_STORE.unshift(record)
  }
  return record
}

/**
 * Get all active extracted videos for a given subject paper
 */
export function getExtractedVideosByPaperId(paperId: string): ExtractedVideoRecord[] {
  return EXTRACTED_VIDEOS_STORE.filter(
    (v) => v.targetPaperId === paperId && v.status === "active"
  )
}

/**
 * Get active extracted video for a specific chapter
 */
export function getExtractedVideoForChapter(paperId: string, chapterId: string): ExtractedVideoRecord | undefined {
  return EXTRACTED_VIDEOS_STORE.find(
    (v) => v.targetPaperId === paperId && v.targetChapterId === chapterId && v.status === "active"
  )
}

/**
 * Get the latest active extracted video for a paper (fallback if chapter not pinned)
 */
export function getLatestExtractedVideoForPaper(paperId: string): ExtractedVideoRecord | undefined {
  return EXTRACTED_VIDEOS_STORE.find(
    (v) => v.targetPaperId === paperId && v.status === "active"
  )
}

/**
 * Revoke extracted video(s)
 */
export function revokeExtractedVideos(target: "last" | "all" | string): { revokedCount: number; message: string } {
  if (target === "all") {
    const count = EXTRACTED_VIDEOS_STORE.filter((v) => v.status === "active").length
    EXTRACTED_VIDEOS_STORE.forEach((v) => {
      v.status = "revoked"
    })
    return {
      revokedCount: count,
      message: `Revoked all ${count} extracted YouTube videos from courses.`
    }
  }

  if (target === "last") {
    const lastActive = EXTRACTED_VIDEOS_STORE.find((v) => v.status === "active")
    if (lastActive) {
      lastActive.status = "revoked"
      return {
        revokedCount: 1,
        message: `Revoked video "${lastActive.title}" from ${lastActive.targetPaperTitle}.`
      }
    }
    return { revokedCount: 0, message: "No active extracted videos to revoke." }
  }

  // Target specific videoId
  const match = EXTRACTED_VIDEOS_STORE.find((v) => v.videoId === target && v.status === "active")
  if (match) {
    match.status = "revoked"
    return {
      revokedCount: 1,
      message: `Revoked video "${match.title}" from ${match.targetPaperTitle}.`
    }
  }

  return { revokedCount: 0, message: `No active video found matching "${target}".` }
}
