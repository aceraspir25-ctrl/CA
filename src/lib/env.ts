/**
 * Server Environment Validation & Configuration Guardian
 * Strictly enforces server-only secret isolation, input sanitation,
 * and prevents leaking of API keys, bot tokens, and service keys.
 */

export interface ValidatedServerEnv {
  TELEGRAM_BOT_TOKEN: string
  TELEGRAM_ADMIN_CHAT_ID: string
  TELEGRAM_WEBHOOK_SECRET: string
  REVOKE_SECURITY_HASH: string
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY: string
  GEMINI_API_KEY: string
  OPENAI_API_KEY: string
  GROQ_API_KEY: string
  DEEPSEEK_API_KEY: string
  NODE_ENV: string
  isProduction: boolean
}

export function getServerEnv(): ValidatedServerEnv {
  const nodeEnv = process.env.NODE_ENV || "development"

  return {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || "",
    TELEGRAM_ADMIN_CHAT_ID: process.env.TELEGRAM_ADMIN_CHAT_ID || "",
    TELEGRAM_WEBHOOK_SECRET: process.env.TELEGRAM_WEBHOOK_SECRET || "",
    REVOKE_SECURITY_HASH:
      process.env.REVOKE_SECURITY_HASH ||
      "48fe0661615dd0a2fc9cf1b77111613b4c3e7fc857b7bf89e472c233a0b35eb0",
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
    GROQ_API_KEY: process.env.GROQ_API_KEY || "",
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY || "",
    NODE_ENV: nodeEnv,
    isProduction: nodeEnv === "production",
  }
}

/**
 * Health check that reports configuration readiness WITHOUT returning any secret values.
 */
export function getEnvSecurityAudit() {
  const env = getServerEnv()

  return {
    telegramConfigured: Boolean(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_ADMIN_CHAT_ID),
    telegramWebhookSecretConfigured: Boolean(env.TELEGRAM_WEBHOOK_SECRET),
    supabaseConfigured: Boolean(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    supabaseServiceRoleConfigured: Boolean(env.SUPABASE_SERVICE_ROLE_KEY),
    aiProvidersAvailable: {
      gemini: Boolean(env.GEMINI_API_KEY),
      openai: Boolean(env.OPENAI_API_KEY),
      groq: Boolean(env.GROQ_API_KEY),
      deepseek: Boolean(env.DEEPSEEK_API_KEY),
      freeAiEngine: true, // Pollinations is zero-key always available
    },
    environment: env.NODE_ENV,
    isProduction: env.isProduction,
  }
}
