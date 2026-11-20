/**
 * JARVIS CCA-04: Standalone 24×7 Autonomous Queue Worker Process
 * Polls the Next.js Queue API to process pending agent tasks, trigger scheduled runs,
 * and report heartbeats.
 */

const QUEUE_URL = process.env.QUEUE_API_URL || "http://localhost:3000/api/agents/queue"
const POLL_INTERVAL_MS = 10000 // 10 seconds

console.log("==================================================")
console.log("⚡ JARVIS Background Queue Worker Starting...")
console.log(`🔗 Target: ${QUEUE_URL}`)
console.log("==================================================")

let cycleCount = 0

async function runWorkerCycle() {
  cycleCount++
  try {
    // 1. Every 6 cycles (~1 min), trigger periodic schedule check
    if (cycleCount % 6 === 0) {
      await fetch(QUEUE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "schedule" })
      }).catch(() => null)
    }

    // 2. Process up to 3 pending jobs
    const res = await fetch(QUEUE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "batch", count: 3 })
    })

    if (res.ok) {
      const data = await res.json()
      if (data.processedCount > 0) {
        console.log(`[Worker] Processed ${data.processedCount} agent job(s) in cycle ${cycleCount}`)
      }
    }
  } catch (err) {
    // Silent retry if local server is restarting
  }
}

// Start polling loop
setInterval(runWorkerCycle, POLL_INTERVAL_MS)
runWorkerCycle()
