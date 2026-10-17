/**
 * OpenRouter API configuration for AI-powered features.
 * Centralizes API keys, endpoints, and model settings.
 */

export const OPENROUTER_CONFIG = {
  apiKey:
    process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  endpoint: 'https://openrouter.ai/api/v1/chat/completions',
  model: 'openai/gpt-4o',
  referer: 'https://traveldekho.com',
  siteName: 'TravelDekho Partner Portal',
  defaultTemperature: 0.7,
  defaultMaxTokens: 500,
} as const;
