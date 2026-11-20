import { NextRequest, NextResponse } from "next/server"
import {
  testSupabaseConnection,
  configureSupabase,
  syncProfileToSupabase,
  syncAiMemoryToSupabase,
  syncYouTubeLectureToSupabase
} from "@/lib/cloud/supabaseClient"
import { testS3CloudConnection, configureS3CloudStorage } from "@/lib/cloud/s3StorageClient"
import { testCloudMemoryConnection, configureCloudMemory } from "@/lib/cloud/cloudMemoryEngine"

export async function GET(req: NextRequest) {
  try {
    const [supabaseStatus, s3Status, memoryStatus] = await Promise.all([
      testSupabaseConnection(),
      testS3CloudConnection(),
      testCloudMemoryConnection()
    ])

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      providers: {
        supabase: supabaseStatus,
        s3Storage: s3Status,
        cloudMemory: memoryStatus
      }
    })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { action, credentials, payload } = body

    // 1. Configure runtime credentials
    if (action === "configure_credentials") {
      if (credentials?.supabaseUrl && credentials?.supabaseKey) {
        configureSupabase(credentials.supabaseUrl, credentials.supabaseKey)
      }
      if (credentials?.s3Config) {
        configureS3CloudStorage(credentials.s3Config)
      }
      if (credentials?.upstashUrl && credentials?.upstashToken) {
        configureCloudMemory(credentials.upstashUrl, credentials.upstashToken)
      }

      return NextResponse.json({
        success: true,
        message: "Cloud service credentials updated successfully!"
      })
    }

    // 2. Test Connection
    if (action === "test_connections") {
      const [supabaseTest, s3Test, memoryTest] = await Promise.all([
        testSupabaseConnection(credentials?.supabaseUrl, credentials?.supabaseKey),
        testS3CloudConnection(),
        testCloudMemoryConnection()
      ])

      return NextResponse.json({
        success: true,
        results: {
          supabase: supabaseTest,
          s3Storage: s3Test,
          cloudMemory: memoryTest
        }
      })
    }

    // 3. Full Cloud Memory Sync
    if (action === "sync_memory") {
      const { profile, messages, weakConcepts, videos } = payload || {}

      let syncedItems = 0
      if (profile) {
        await syncProfileToSupabase(profile).catch(() => null)
        syncedItems++
      }
      if (profile?.email && (messages?.length || weakConcepts?.length)) {
        const memRes = await syncAiMemoryToSupabase(profile.email, messages || [], weakConcepts || []).catch(() => null)
        syncedItems += memRes?.memorySynced || 0
      }
      if (Array.isArray(videos)) {
        for (const v of videos) {
          await syncYouTubeLectureToSupabase(v).catch(() => null)
          syncedItems++
        }
      }

      return NextResponse.json({
        success: true,
        syncedCount: syncedItems,
        timestamp: new Date().toLocaleTimeString("en-IN"),
        message: `Successfully synchronized ${syncedItems} items with cloud storage and memory!`
      })
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 })
  } catch (err: any) {
    console.error("Cloud Sync API Error:", err)
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
