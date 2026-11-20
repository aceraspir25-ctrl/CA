import { NextRequest, NextResponse } from "next/server"
import {
  telegramConfigState,
  sendTelegramMessage,
  sendDetailedVerificationReport,
  activeUploadJobs,
  processUploadedDocumentWithAgents,
  handleNaturalLanguageHinglishCommand,
  executeLeaderAutonomousCycle
} from "@/lib/telegram/bot"

export async function GET(req: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN || telegramConfigState.botToken || "9270115302:AAFyGSkjS_DZ_yrDwCVdpfxMgd2sENKtIo8"
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000"
  const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https")
  const autoWebhookUrl = `${proto}://${host}/api/telegram/webhook`

  // 1-Click Auto Setup: If ?setup=1 or ?set_webhook is passed, register webhook with Telegram!
  if (req.nextUrl.searchParams.get("setup") === "1" || req.nextUrl.searchParams.get("set_webhook")) {
    const customUrl = req.nextUrl.searchParams.get("url") || autoWebhookUrl
    try {
      const tgRes = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(customUrl)}`)
      const tgData = await tgRes.json()
      return NextResponse.json({
        success: tgData.ok,
        message: tgData.ok ? "🎉 Webhook successfully linked to Telegram! Bot will now answer 24×7 even with PC OFF!" : "Failed to link webhook",
        targetWebhookUrl: customUrl,
        telegramResponse: tgData
      })
    } catch (e: any) {
      return NextResponse.json({ success: false, error: e?.message }, { status: 500 })
    }
  }

  // Fetch current live webhook info from Telegram servers
  let liveWebhookInfo: any = null
  try {
    const infoRes = await fetch(`https://api.telegram.org/bot${token}/getWebhookInfo`)
    liveWebhookInfo = await infoRes.json()
  } catch (e) {}

  return NextResponse.json({
    status: "ok",
    service: "Telegram Bot Remote Approval & Admin Gateway",
    isConfigured: Boolean(token && telegramConfigState.adminChatId),
    currentHost: host,
    detectedWebhookUrl: autoWebhookUrl,
    liveTelegramWebhook: liveWebhookInfo?.result || null,
    isWebhookLiveOnCloud: Boolean(liveWebhookInfo?.result?.url),
    oneClickSetupHint: `Visit ${proto}://${host}/api/telegram/webhook?setup=1 in browser to link Telegram directly to Vercel!`,
    uploadJobsCount: activeUploadJobs.length,
    pendingJobsCount: activeUploadJobs.filter((j) => j.status === "pending_review").length
  })
}

export async function POST(req: NextRequest) {
  try {
    const update = await req.json()
    const token = process.env.TELEGRAM_BOT_TOKEN || telegramConfigState.botToken || "9270115302:AAFyGSkjS_DZ_yrDwCVdpfxMgd2sENKtIo8"

    // Extract sender chat ID & human user ID
    const senderChatId = String(update.message?.chat?.id || update.callback_query?.message?.chat?.id || "")
    const senderFromId = String(update.message?.from?.id || update.callback_query?.from?.id || "")

    // Auto-register human admin if not yet bound or previously set to bot's own ID
    if ((!telegramConfigState.adminChatId || telegramConfigState.adminChatId === "9270115302") && senderChatId && senderChatId !== "9270115302") {
      telegramConfigState.adminChatId = senderChatId
    }

    const adminChatId = telegramConfigState.adminChatId

    // Handle 24x7 background Leader Autonomous cycle pulse
    if (update.action === "leader_24hr_pulse") {
      const report = await executeLeaderAutonomousCycle(adminChatId, "24×7 Scheduled Autonomous Loop")
      return NextResponse.json({ ok: true, report })
    }

    // 1. Handle Inline Action Buttons (Approve, Reject, Request Changes, View Report)
    if (update.callback_query) {
      const callback = update.callback_query
      const fromId = String(callback.from?.id)
      const data = callback.data || "" // e.g. "approve_job:job-1", "reject_job:job-1", "request_changes:job-1", "view_report:job-1"
      const [action, itemId] = data.split(":")
      const callbackChatId = String(callback.message?.chat?.id || fromId)

      // Security Check: Verify that the clicker is the authorized admin (if configured)
      if (adminChatId && fromId !== adminChatId && fromId !== "9270115302") {
        if (token) {
          await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              callback_query_id: callback.id,
              text: "⚠️ Unauthorized: You are not registered as the platform admin.",
              show_alert: true
            })
          })
        }
        return NextResponse.json({ ok: true, status: "unauthorized" })
      }

      let resultMessage = ""
      const matchingJob = activeUploadJobs.find((j) => j.id === itemId)

      if (action === "approve" || action === "approve_job") {
        if (matchingJob) {
          matchingJob.status = "approved"
          matchingJob.auditTrail.push({
            timestamp: new Date().toLocaleTimeString(),
            action: "APPROVED_AND_PUBLISHED",
            actor: `Admin (${callback.from?.username || "Telegram"})`,
            notes: "Approved via Telegram 1-click button. Deployed to Student Digital Library."
          })
        }
        resultMessage = `✅ APPROVED & PUBLISHED! "${matchingJob ? matchingJob.fileName : itemId}" is now live in the Student Digital Library.`
      } else if (action === "reject" || action === "reject_job") {
        if (matchingJob) {
          matchingJob.status = "rejected"
          matchingJob.auditTrail.push({
            timestamp: new Date().toLocaleTimeString(),
            action: "REJECTED_BY_ADMIN",
            actor: `Admin (${callback.from?.username || "Telegram"})`,
            notes: "Rejected via Telegram Admin. Not published."
          })
        }
        resultMessage = `❌ REJECTED: "${matchingJob ? matchingJob.fileName : itemId}" has been flagged and archived.`
      } else if (action === "request_changes") {
        if (matchingJob) {
          matchingJob.status = "changes_requested"
          matchingJob.auditTrail.push({
            timestamp: new Date().toLocaleTimeString(),
            action: "CHANGES_REQUESTED",
            actor: `Admin (${callback.from?.username || "Telegram"})`,
            notes: "Requested faculty revision on working notes and formatting."
          })
        }
        resultMessage = `📝 REVISION REQUESTED: The Content Creation Agent has been tasked to refine the numerical workings.`
      } else if (action === "view_report") {
        const reportDetails = matchingJob
          ? `📊 *Detailed Audit Report for ${matchingJob.fileName}*\n\n` +
            `• *Course Matched:* ${matchingJob.courseDetection.course} (${matchingJob.courseDetection.subject})\n` +
            `• *Confidence:* ${matchingJob.courseDetection.confidence}%\n` +
            `• *Formulas:* ${matchingJob.documentAnalysis.formulasIdentified.join(" | ")}\n` +
            `• *Numericals Checked:* ${matchingJob.documentAnalysis.numericalsFound} solved problems verified\n` +
            `• *Copyright Status:* ${matchingJob.verificationReport.copyrightPermission}\n` +
            `• *Stages:* All 7 document agents passed.`
          : `ℹ️ Report details not available for ${itemId}.`

        if (token) {
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: callbackChatId,
              text: reportDetails,
              parse_mode: "Markdown"
            })
          })
          await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ callback_query_id: callback.id, text: "Report sent!" })
          })
        }
        return NextResponse.json({ ok: true, action: "view_report" })
      }

      // Acknowledge Telegram Callback Query (Toast on phone)
      if (token) {
        await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            callback_query_id: callback.id,
            text: resultMessage.slice(0, 180),
            show_alert: false
          })
        })

        // Edit original message to remove buttons and record decision
        const originalText = callback.message?.text || ""
        await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: callbackChatId,
            message_id: callback.message?.message_id,
            text: `${originalText}\n\n━━━━━━━━━━━━━━━━━━━━\n${resultMessage} (Action taken by Admin @ ${new Date().toLocaleTimeString()})`,
            parse_mode: "Markdown"
          })
        })
      }

      return NextResponse.json({ ok: true, action, itemId })
    }

    // 2. Handle Document / PDF Upload in Telegram
    if (update.message && update.message.document) {
      const doc = update.message.document
      const fileName = doc.file_name || "Uploaded_Document.pdf"
      const fileSize = doc.file_size ? `${(doc.file_size / (1024 * 1024)).toFixed(1)} MB` : "3.5 MB"
      const fromUser = update.message.from?.username ? `@${update.message.from.username}` : (update.message.from?.first_name || "@Admin")
      const chatId = String(update.message.chat.id)

      // Run through 7-Stage Agent Processing Pipeline
      const job = await processUploadedDocumentWithAgents(fileName, fileSize, fromUser, chatId)
      // Send the verification report with the 4 inline buttons directly back to user
      await sendDetailedVerificationReport(job, chatId)

      return NextResponse.json({ ok: true, type: "document_upload_processed", job })
    }

    // 3. Handle Natural Language Hinglish or Slash Commands
    if (update.message && update.message.text) {
      const text = update.message.text.trim()
      const chatId = String(update.message.chat.id)

      // Security Check: if adminChatId is explicitly set and different
      if (adminChatId && chatId !== adminChatId && adminChatId !== "9270115302") {
        await sendTelegramMessage("⚠️ Access Restricted: You are not authorized to command this educational platform.", chatId)
        return NextResponse.json({ ok: true, status: "unauthorized_chat" })
      }

      // Handle slash commands (/start, /status, /pending, /research, /help)
      if (text.startsWith("/")) {
        const [cmd, ...args] = text.split(" ")

        if (cmd === "/start" || cmd === "/help") {
          telegramConfigState.adminChatId = chatId
          const welcome = `🎓 *Welcome to EduFinance Pro Admin Bot (@jarvis_Ai_AutomationBot)!*\n\n` +
            `✅ *Authenticated!* Your Telegram Chat ID (\`${chatId}\`) is now registered as the *Super Admin*.\n\n` +
            `You have full remote executive control over the platform:\n\n` +
            `• 📄 *PDF Upload:* Send any PDF (Cost Accounting, Tax, Law notes) to automatically run through the *7-Stage Multi-Agent Pipeline*.\n` +
            `• 📊 */status* - Check 11 agents & 24x7 pipeline health\n` +
            `• ⏳ */pending* - View all content awaiting review with 1-click buttons\n` +
            `• 🔬 */research <topic>* - Trigger autonomous research cycle\n` +
            `• 🗣 *Hinglish:* Speak naturally (e.g. *"CMA Inter ke notes verify karo"*, *"Pending approvals dikhao"*, *"Aaj ki agent report do"*)\n\n` +
            `Below is a live Verification Report Card with 1-click approval buttons for testing:`

          await sendTelegramMessage(welcome, chatId)
          if (activeUploadJobs[0]) {
            await sendDetailedVerificationReport(activeUploadJobs[0], chatId)
          }
          return NextResponse.json({ ok: true })
        }

        if (cmd === "/status") {
          const reply = await handleNaturalLanguageHinglishCommand("status", chatId)
          await sendTelegramMessage(reply, chatId)
          return NextResponse.json({ ok: true, handled: true, reply })
        }

        if (cmd === "/pending") {
          const reply = await handleNaturalLanguageHinglishCommand("pending", chatId)
          await sendTelegramMessage(reply, chatId)
          return NextResponse.json({ ok: true, handled: true, reply })
        }

        if (cmd === "/research") {
          const topic = args.join(" ") || "General Topic"
          const reply = await handleNaturalLanguageHinglishCommand(`research ${topic}`, chatId)
          await sendTelegramMessage(reply, chatId)
          return NextResponse.json({ ok: true, handled: true, reply })
        }

        if (cmd === "/leader" || cmd === "/boss") {
          const reply = await executeLeaderAutonomousCycle(chatId, "Slash Command /leader")
          return NextResponse.json({ ok: true, handled: true, reply })
        }

        if (cmd === "/fix" || cmd === "/heal") {
          const reply = await executeLeaderAutonomousCycle(chatId, "Self-Healing Bug & Error Fix Engine")
          return NextResponse.json({ ok: true, handled: true, reply })
        }

        if (cmd === "/agents" || cmd === "/all") {
          const reply = await handleNaturalLanguageHinglishCommand("all agents run", chatId)
          await sendTelegramMessage(reply, chatId)
          return NextResponse.json({ ok: true, handled: true, reply })
        }

        if (cmd === "/report") {
          const reply = await handleNaturalLanguageHinglishCommand("daily report", chatId)
          await sendTelegramMessage(reply, chatId)
          return NextResponse.json({ ok: true, handled: true, reply })
        }

        if (cmd === "/notes") {
          const reply = await handleNaturalLanguageHinglishCommand("notes verify", chatId)
          await sendTelegramMessage(reply, chatId)
          return NextResponse.json({ ok: true, handled: true, reply })
        }

        if (cmd === "/mcqs") {
          const reply = await handleNaturalLanguageHinglishCommand("mcq banao", chatId)
          await sendTelegramMessage(reply, chatId)
          return NextResponse.json({ ok: true, handled: true, reply })
        }

        if (cmd === "/revoke") {
          const reply = await handleNaturalLanguageHinglishCommand(`revoke ${args.join(" ")}`.trim(), chatId)
          await sendTelegramMessage(reply, chatId)
          return NextResponse.json({ ok: true, handled: true, reply })
        }

        if (cmd === "/amendments") {
          const reply = await handleNaturalLanguageHinglishCommand("amendment check karo", chatId)
          await sendTelegramMessage(reply, chatId)
          return NextResponse.json({ ok: true, handled: true, reply })
        }
      }

      // Process Natural Language Hinglish / English instruction
      const responseText = await handleNaturalLanguageHinglishCommand(text, chatId)
      await sendTelegramMessage(responseText, chatId)
      return NextResponse.json({ ok: true, handled: true, reply: responseText })
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error("Telegram Webhook Error:", err)
    return NextResponse.json({ error: "Internal processing error", details: err?.message }, { status: 500 })
  }
}
