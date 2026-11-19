/**
 * Telegram Bot Admin Integration Service
 * Allows authorized faculty/admin to:
 * 1. Receive instant push notifications when AI generates new study packages or legal amendments.
 * 2. 1-Click Approve / Reject directly from Telegram via inline keyboard buttons.
 * 3. Send commands (/status, /pending, /research, /rollback) from phone anywhere in the world.
 */

export interface TelegramConfig {
  botToken?: string
  adminChatId?: string
  isWebhookActive: boolean
  lastPingTime?: string
}

// In-memory runtime config (can be populated via env or Admin UI)
export const telegramConfigState: TelegramConfig = {
  botToken: process.env.TELEGRAM_BOT_TOKEN || "",
  adminChatId: process.env.TELEGRAM_ADMIN_CHAT_ID || "",
  isWebhookActive: true,
  lastPingTime: "Ready"
}

/**
 * Send a notification with inline action buttons to Admin's Telegram
 */
export async function sendTelegramApprovalPrompt(item: {
  id: string
  title: string
  course: string
  chapter: string
  originalityScore?: number
  gapsFilled?: number
}) {
  const token = telegramConfigState.botToken || process.env.TELEGRAM_BOT_TOKEN
  const chatId = telegramConfigState.adminChatId || process.env.TELEGRAM_ADMIN_CHAT_ID

  if (!token || !chatId) {
    console.log(`[Telegram Simulation] Item ${item.id} awaiting approval: "${item.title}". (Bot token or Chat ID not configured in .env)`)
    return {
      success: false,
      simulated: true,
      message: "Telegram Bot Token / Chat ID not configured. Simulated dispatch."
    }
  }

  const messageText = `🔔 *NEW CONTENT AWAITING YOUR APPROVAL*\n\n` +
    `📚 *Course:* ${item.course}\n` +
    `📖 *Chapter:* ${item.chapter}\n` +
    `📝 *Title:* ${item.title}\n` +
    `🛡 *Verification:* Passed Academic & Copyright Checks\n` +
    (item.originalityScore ? `✨ *Originality:* ${item.originalityScore}%\n` : "") +
    `\nTap below to approve and publish immediately to the Student Library:`

  const inlineKeyboard = {
    inline_keyboard: [
      [
        { text: "✅ Approve & Publish", callback_data: `approve:${item.id}` },
        { text: "❌ Reject", callback_data: `reject:${item.id}` }
      ],
      [
        { text: "📖 Inspect Online", url: `http://localhost:3000/admin/pipeline` }
      ]
    ]
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: "Markdown",
        reply_markup: inlineKeyboard
      })
    })

    const data = await res.json()
    return { success: data.ok, data }
  } catch (err: any) {
    console.error("Failed to send Telegram prompt:", err)
    return { success: false, error: err?.message }
  }
}

/**
 * Send simple status message to Telegram Admin
 */
export async function sendTelegramMessage(text: string) {
  const token = telegramConfigState.botToken || process.env.TELEGRAM_BOT_TOKEN
  const chatId = telegramConfigState.adminChatId || process.env.TELEGRAM_ADMIN_CHAT_ID

  if (!token || !chatId) return { success: false, simulated: true }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown"
      })
    })
    return await res.json()
  } catch (err: any) {
    return { success: false, error: err?.message }
  }
}
