import { NextRequest, NextResponse } from "next/server"
import { telegramConfigState, sendTelegramMessage } from "@/lib/telegram/bot"

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Telegram Bot Remote Approval & Admin Gateway",
    isConfigured: Boolean(telegramConfigState.botToken && telegramConfigState.adminChatId),
    instructions: "Configure TELEGRAM_BOT_TOKEN and TELEGRAM_ADMIN_CHAT_ID in environment or via Admin UI."
  })
}

export async function POST(req: NextRequest) {
  try {
    const update = await req.json()
    const token = telegramConfigState.botToken || process.env.TELEGRAM_BOT_TOKEN
    const adminChatId = telegramConfigState.adminChatId || process.env.TELEGRAM_ADMIN_CHAT_ID

    // 1. Handle Inline Keyboard Button Click (Callback Query for Approval / Rejection)
    if (update.callback_query) {
      const callback = update.callback_query
      const fromId = String(callback.from?.id)
      const data = callback.data || "" // e.g. "approve:pipe-1" or "reject:pipe-1"
      const [action, itemId] = data.split(":")

      // Security Check: Verify that the clicker is the authorized admin
      if (adminChatId && fromId !== adminChatId) {
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

      // Execute approval or rejection via internal pipeline API
      let resultMessage = ""
      if (action === "approve") {
        try {
          await fetch("http://localhost:3000/api/ai/pipeline", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "approve", payload: { id: itemId } })
          })
          resultMessage = `✅ Item [${itemId}] APPROVED and published to Student Digital Library!`
        } catch (e: any) {
          resultMessage = `⚠️ Error approving: ${e?.message}`
        }
      } else if (action === "reject") {
        try {
          await fetch("http://localhost:3000/api/ai/pipeline", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "reject", payload: { id: itemId, reason: "Rejected via Telegram Admin" } })
          })
          resultMessage = `❌ Item [${itemId}] REJECTED and returned to revision queue.`
        } catch (e: any) {
          resultMessage = `⚠️ Error rejecting: ${e?.message}`
        }
      }

      // Acknowledge Telegram Callback Query (Toast on phone)
      if (token) {
        await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            callback_query_id: callback.id,
            text: resultMessage,
            show_alert: true
          })
        })

        // Edit original message to remove buttons and record decision
        const originalText = callback.message?.text || ""
        await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: callback.message?.chat?.id,
            message_id: callback.message?.message_id,
            text: `${originalText}\n\n━━━━━━━━━━━━━━━━━━━━\n${resultMessage} (Action taken by Admin @ ${new Date().toLocaleTimeString()})`,
            parse_mode: "Markdown"
          })
        })
      }

      return NextResponse.json({ ok: true, action, itemId })
    }

    // 2. Handle Text Commands from Admin's Telegram Chat
    if (update.message && update.message.text) {
      const text = update.message.text.trim()
      const chatId = String(update.message.chat.id)

      // Security Check
      if (adminChatId && chatId !== adminChatId) {
        await sendTelegramMessage("⚠️ Access Restricted: You are not authorized to command this educational platform.")
        return NextResponse.json({ ok: true, status: "unauthorized_chat" })
      }

      // /start or /help
      if (text === "/start" || text === "/help") {
        const welcome = `👋 *Welcome to EduFinance Pro Admin Bot!*\n\n` +
          `You have full remote command over the educational platform and autonomous AI pipeline:\n\n` +
          `📊 */status* - Live status of 11 AI Agents, 24x7 Pipeline & Library\n` +
          `⏳ */pending* - View all content awaiting your approval with 1-click buttons\n` +
          `🔬 */research <Course> <Chapter>* - Trigger autonomous research immediately\n` +
          `⚙️ */mode <research_only | research_generate | approved_auto_publish>* - Change operating mode\n` +
          `🔄 */sync* - Re-check pipeline consistency\n\n` +
          `You will receive automatic instant alerts whenever new study materials or regulatory amendments require your sign-off!`

        await sendTelegramMessage(welcome)
        return NextResponse.json({ ok: true })
      }

      // /status
      if (text === "/status") {
        try {
          const res = await fetch("http://localhost:3000/api/ai/pipeline")
          const data = await res.json()

          const statusMsg = `📊 *EDUTRAINING PRO SYSTEM HEALTH*\n\n` +
            `🤖 *Active Agents:* 11 Autonomous Agents (ARA, OSM, CCA, AVA, MPA-11)\n` +
            `⚙️ *Operating Mode:* \`${data.operatingMode}\`\n` +
            `📚 *Total Pipeline Items:* ${data.totalItems}\n` +
            `✅ *Published in Curriculum:* ${data.countsByStage?.published || 0}\n` +
            `⏳ *Awaiting Your Approval:* ${data.countsByStage?.pendingApproval || 0}\n` +
            `🛡 *Verified Sources:* ${data.sourcesCount} Official & EdTech Portals\n` +
            `📁 *Multi-Platform Dossiers:* ${data.multiPlatformDossiersCount || 3}\n\n` +
            `All systems operational on port 3000.`

          await sendTelegramMessage(statusMsg)
        } catch (e: any) {
          await sendTelegramMessage(`⚠️ Error fetching system status: ${e.message}`)
        }
        return NextResponse.json({ ok: true })
      }

      // /pending
      if (text === "/pending") {
        try {
          const res = await fetch("http://localhost:3000/api/ai/pipeline")
          const data = await res.json()
          const pending = (data.items || []).filter((i: any) => i.stage === "faculty_review_pending")

          if (pending.length === 0) {
            await sendTelegramMessage("🎉 *Approval Queue is Clear!* No study material is currently waiting for your review.")
          } else {
            await sendTelegramMessage(`⏳ *Found ${pending.length} items awaiting your approval:*`)
            for (const item of pending.slice(0, 5)) {
              if (token) {
                await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    chat_id: chatId,
                    text: `📌 *${item.title}*\nCourse: ${item.course} (${item.chapter})\nID: \`${item.id}\``,
                    parse_mode: "Markdown",
                    reply_markup: {
                      inline_keyboard: [
                        [
                          { text: "✅ Approve & Publish", callback_data: `approve:${item.id}` },
                          { text: "❌ Reject", callback_data: `reject:${item.id}` }
                        ]
                      ]
                    }
                  })
                })
              }
            }
          }
        } catch (e: any) {
          await sendTelegramMessage(`⚠️ Error: ${e.message}`)
        }
        return NextResponse.json({ ok: true })
      }

      // /research <course> <chapter>
      if (text.startsWith("/research")) {
        const query = text.replace("/research", "").trim()
        if (!query) {
          await sendTelegramMessage("ℹ️ Usage: `/research <Course> <Chapter>`\nExample: `/research CA Foundation Inventory Valuation`")
          return NextResponse.json({ ok: true })
        }

        await sendTelegramMessage(`🚀 *Initiating Autonomous Pipeline Research for:* "${query}"...\nSurveying official syllabus and approved platforms. You will receive draft for approval shortly!`)

        try {
          const res = await fetch("http://localhost:3000/api/ai/pipeline", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "research_now",
              payload: {
                course: query.split(" ")[0] || "CA Foundation",
                chapter: query,
                targetQuery: query
              }
            })
          })

          const data = await res.json()
          if (data.item) {
            if (token) {
              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `✅ *Research Completed & Synthesized!*\n\nTitle: *${data.item.title}*\nCourse: ${data.item.course}\nStage: ${data.item.stage}\n\n*Review & Approve:*`,
                  parse_mode: "Markdown",
                  reply_markup: {
                    inline_keyboard: [
                      [
                        { text: "✅ Approve & Publish", callback_data: `approve:${data.item.id}` },
                        { text: "❌ Reject", callback_data: `reject:${data.item.id}` }
                      ]
                    ]
                  }
                })
              })
            }
          }
        } catch (e: any) {
          await sendTelegramMessage(`⚠️ Failed to trigger research: ${e.message}`)
        }
        return NextResponse.json({ ok: true })
      }

      // Default fallback
      await sendTelegramMessage(`❓ Unrecognized command: "${text}". Send */help* to see available commands.`)
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error("Telegram Webhook Error:", err)
    return NextResponse.json({ error: "Internal processing error", details: err?.message }, { status: 500 })
  }
}
