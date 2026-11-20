export type AIProvider = "gemini" | "openai" | "groq" | "deepseek" | "free-ai" | "simulated"

export type AICapability =
  | "teacher"
  | "doubt-solver"
  | "chapter-explainer"
  | "numerical-solver"
  | "study-planner"
  | "notes-generator"
  | "quiz-generator"
  | "document-analyzer"
  | "revision-assistant"
  | "performance-assistant"

export interface AIModelConfig {
  provider: AIProvider
  modelName: string
  temperature: number
  maxTokens: number
}

export interface AIUsageMetrics {
  totalRequests: number
  geminiRequests: number
  openaiRequests: number
  groqRequests: number
  deepseekRequests: number
  freeAiRequests: number
  simulatedRequests: number
  totalPromptTokens: number
  totalCompletionTokens: number
  estimatedCostUSD: number
  lastActiveTimestamp: string
}

export interface AIChatRequest {
  messages: {
    role: "user" | "assistant" | "system"
    content: string
  }[]
  capability?: AICapability
  preferredProvider?: AIProvider
  modelName?: string
  studentLevel?: number
  courseContext?: string
  language?: "en" | "hi" | "hinglish"
  apiKey?: string
  geminiKey?: string
  openaiKey?: string
  groqKey?: string
  deepseekKey?: string
}

export interface AIChatResponse {
  content: string
  providerUsed: AIProvider
  modelUsed: string
  tokensUsed: {
    prompt: number
    completion: number
    total: number
  }
  cached: boolean
  timestamp: string
}

