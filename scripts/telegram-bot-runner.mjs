/**
 * Telegram Bot Live Polling Runner
 * Connects directly to Telegram Bot API (@jarvis_Ai_AutomationBot)
 * and relays all incoming messages, PDF uploads, and approval button clicks
 * to the local Next.js webhook at http://localhost:3000/api/telegram/webhook.
 * 
 * Works 100% locally on localhost:3000 without requiring any ngrok tunnel or public domain!
 */

import fs from "fs"
import path from "path"

// Load .env.local if present
try {
  const envPath = path.resolve(process.cwd(), ".env.local")
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8")
    for (const line of content.split("\n")) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...vals] = trimmed.split("=")
        if (key && vals.length) {
          const val = vals.join("=").replace(/^["']|["']$/g, "").trim()
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = val
          }
        }
      }
    }
  }
} catch (e) {}

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ""
const WEBHOOK_LOCAL_URL = "http://localhost:3000/api/telegram/webhook"

async function start24hrAutonomousLeaderLoop() {
  console.log("👑 LEADER-00 24×7 Autonomous Loop Initiated.")
  
  // Wait 4 seconds after startup for webhook to be warm
  await new Promise((r) => setTimeout(r, 4000))
  
  // Initial startup notification to Admin
  try {
    await fetch(WEBHOOK_LOCAL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "leader_24hr_pulse" })
    })
    console.log("  👑 [LEADER-00] Dispatched initial 24×7 executive briefing to Super Admin on Telegram.")
  } catch (e) {
    console.error("  ⚠️ Error in initial leader pulse:", e.message)
  }

  // Periodic 24x7 autonomous pulse (every 20 minutes)
  const PULSE_INTERVAL_MS = 20 * 60 * 1000
  setInterval(async () => {
    try {
      console.log("👑 [LEADER-00] Triggering 24×7 autonomous cycle & self-healing bug audit...")
      const res = await fetch(WEBHOOK_LOCAL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "leader_24hr_pulse" })
      })
      const data = await res.json()
      console.log("  👑 [LEADER-00] Cycle completed and executive report sent to Telegram.")
    } catch (err) {
      console.error("  ⚠️ Error in 24hr leader loop:", err.message)
    }
  }, PULSE_INTERVAL_MS)
}

async function startTelegramPoller() {
  console.log("==================================================")
  console.log("🤖 JARVIS & LEADER-00 Bot Runner Initializing...")
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

  // Start 24x7 autonomous loop
  start24hrAutonomousLeaderLoop()

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

