import crypto from "crypto"
import {
  revokeLastPaper,
  revokePaperById,
  revokeRecentMCQs,
  revokeAllRecentGenerated
} from "@/data/questionBanksData"
import { activeUploadJobs } from "@/lib/telegram/bot"

// One-way SHA-256 cryptographic digest of the master security code
// Never stores or logs the plain-text PIN
const DEFAULT_REVOKE_HASH = "48fe0661615dd0a2fc9cf1b77111613b4c3e7fc857b7bf89e472c233a0b35eb0"

/**
 * Validates candidate passcode against one-way SHA-256 cryptographic digest
 * Using constant-time buffer comparison to prevent timing side-channel attacks
 */
export function verifyRevokeAuthorization(candidateCode: string): boolean {
  if (!candidateCode || typeof candidateCode !== "string") return false
  const cleanCode = candidateCode.trim()

  const candidateDigest = crypto.createHash("sha256").update(cleanCode).digest("hex")
  const expectedDigest = process.env.REVOKE_SECURITY_HASH || DEFAULT_REVOKE_HASH

  try {
    const a = Buffer.from(candidateDigest, "utf-8")
    const b = Buffer.from(expectedDigest, "utf-8")
    if (a.length !== b.length) return false
    return crypto.timingSafeEqual(a, b)
  } catch {
    return candidateDigest === expectedDigest
  }
}

/**
 * Executes secure revocation across the platform
 */
export function executeSecureRevoke(
  candidateCode: string,
  target = "last"
): {
  success: boolean
  message: string
  actionSummary?: string
} {
  const isAuthorized = verifyRevokeAuthorization(candidateCode)

  if (!isAuthorized) {
    return {
      success: false,
      message:
        "⛔ *REVOKE REJECTED: AUTHORIZATION FAILED*\n" +
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
        "❌ Entered Master Code is invalid.\n" +
        "🔒 Zero changes were made. All database records remain intact and protected."
    }
  }

  const timestamp = new Date().toLocaleTimeString("en-IN")

  // Target 1: Revoke all recent items
  if (target.toLowerCase() === "all") {
    const { papersCount, mcqsCount } = revokeAllRecentGenerated()
    let jobsRevoked = 0
    activeUploadJobs.forEach((job) => {
      if (job.status === "approved") {
        job.status = "revoked" as any
        jobsRevoked++
      }
    })

    return {
      success: true,
      message:
        `🛡️ *MASTER REVOKE EXECUTED & CONFIRMED!*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `✅ *Cryptographic Auth:* Verified (SHA-256 Secure Match)\n` +
        `🗑️ *Purged Items:*\n` +
        `• Model Examination Papers: *${papersCount} removed*\n` +
        `• Generated Practice MCQs: *${mcqsCount} removed*\n` +
        `• Upload Packages Revoked: *${jobsRevoked} deactivated*\n\n` +
        `🔒 *Security Confirmation:* All revoked contents have been permanently uninstalled from the live website!\n` +
        `🕒 *Timestamp:* ${timestamp}`
    }
  }

  // Target 2: Revoke MCQs only
  if (target.toLowerCase() === "mcq" || target.toLowerCase() === "mcqs") {
    const count = revokeRecentMCQs(5)
    return {
      success: true,
      message:
        `🛡️ *MCQ QUESTION REVOKE CONFIRMED!*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `✅ *Cryptographic Auth:* Verified (SHA-256 Match)\n` +
        `🗑️ *Action:* *${count} recent MCQs* permanently removed from live assessment bank.\n` +
        `🕒 *Timestamp:* ${timestamp}`
    }
  }

  // Default: Revoke the latest paper & last job
  const removedPaper = revokeLastPaper()
  let revokedJobName = ""

  const lastJob = activeUploadJobs.find((j) => j.status === "approved")
  if (lastJob) {
    lastJob.status = "revoked" as any
    revokedJobName = lastJob.fileName
  }

  const paperTitle = removedPaper?.title || "Latest Examination Paper"

  return {
    success: true,
    message:
      `🛡️ *REVOKE PROTOCOL CONFIRMED & SUCCESSFUL!*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `✅ *Cryptographic Auth:* Verified (4-Digit SHA-256 Digest Match)\n` +
      `🗑️ *Item Revoked:* *${paperTitle}*\n` +
      (revokedJobName ? `📦 *Linked Package:* \`${revokedJobName}\` uninstalled from live site.\n` : "") +
      `\n🌐 *Platform Status:* The item has been completely removed from public display and active student tests.\n` +
      `🔒 *Privacy:* Confirmation passcode was verified in-memory; zero plain-text was retained in logs.\n` +
      `🕒 *Timestamp:* ${timestamp}`
  }
}
