/**
 * Telegram Bot Live Polling Runner
 * Connects directly to Telegram Bot API (@jarvis_Ai_AutomationBot)
 * and relays all incoming messages, PDF uploads, and approval button clicks
 * to the local Next.js webhook at http://localhost:3000/api/telegram/webhook.
 * 
 * Works 100% locally on localhost:3000 without requiring any ngrok tunnel or public domain!
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "9270115302:AAFyGSkjS_DZ_yrDwCVdpfxMgd2sENKtIo8"
const WEBHOOK_LOCAL_URL = "http://localhost:3000/api/telegram/webhook"

async function startTelegramPoller() {
  console.log("==================================================")
  console.log("🤖 JARVIS Telegram Bot Runner Initializing...")
  console.log("==================================================")

  try {
    const meRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`)
    const me = await meRes.json()
    if (!me.ok) {
      console.error("❌ Telegram Bot Token Authentication Failed:", me)
      return
    }
    console.log(`✅ Authenticated successfully as @${me.result.username} (ID: ${me.result.id})`)
    console.log(`🔗 Webhook Relay Target: ${WEBHOOK_LOCAL_URL}`)
    console.log("⚡ Listening for incoming Telegram messages, PDF uploads, and button clicks...\n")
  } catch (e) {
    console.error("⚠️ Network error verifying bot token:", e.message)
  }

  let offset = 0

  while (true) {
    try {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${offset}&timeout=10`
      const res = await fetch(url)
      const data = await res.json()

      if (data.ok && Array.isArray(data.result)) {
        for (const update of data.result) {
          offset = update.update_id + 1

          const sender = update.message?.from?.username || update.callback_query?.from?.username || update.message?.from?.first_name || "User"
          const chatId = update.message?.chat?.id || update.callback_query?.message?.chat?.id

          if (update.message?.document) {
            console.log(`📥 [PDF Upload Received] from @${sender} (Chat ID: ${chatId}): "${update.message.document.file_name}"`)
          } else if (update.callback_query) {
            console.log(`🔘 [Button Clicked] from @${sender}: data="${update.callback_query.data}"`)
          } else if (update.message?.text) {
            console.log(`💬 [Message Received] from @${sender} (Chat ID: ${chatId}): "${update.message.text}"`)
          }

          // Forward to local webhook
          try {
            const forwardRes = await fetch(WEBHOOK_LOCAL_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(update)
            })
            const forwardData = await forwardRes.json()
            if (forwardData.job) {
              console.log(`  ✅ 7-Stage Agent Pipeline Completed for "${forwardData.job.fileName}"! Report dispatched to Telegram.`)
            } else if (forwardData.handled) {
              console.log(`  ✅ Executed command response sent to chat ${chatId}.`)
            }
          } catch (forwardErr) {
            console.error(`  ⚠️ Error forwarding update to local Next.js: ${forwardErr.message}`)
          }
        }
      }
    } catch (err) {
      // Small pause before retry on timeout or network blip
      await new Promise((r) => setTimeout(r, 1500))
    }
  }
}

startTelegramPoller()
