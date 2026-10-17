/**
 * AI AutoFill service for trip creation.
 * Uses OpenRouter API (GPT-4o) to generate structured trip details from a title.
 */

import { OPENROUTER_CONFIG } from './openrouter.config';

export interface AutoFillResponse {
  shortCatchphrase: string;
  image: string;
  description: string;
}

const AVAILABLE_IMAGES = [
  '/trips/spiti.png',
  '/trips/ladakh.png',
  '/trips/zanskar.png',
  '/trips/leh-turtuk.png',
  '/trips/zanskar-valley.png',
  '/trips/spain.png',
];

const SYSTEM_PROMPT = `You are a travel content expert for Indian travel company TravelDekho. Given a trip title, generate structured content in JSON format for ONLY these 3 fields:

Rules:
- shortCatchphrase: One compelling sentence, max 90 chars. Only use alphabets, numbers, periods, and spaces. No special characters.
- image: Pick the most relevant from these options: ${AVAILABLE_IMAGES.join(', ')}
- description: 2-3 sentences detailed blueprint. Only use alphabets, numbers, periods, and spaces. No special characters like commas, hyphens, apostrophes, etc.

CRITICAL: Do NOT generate categories, disclaimer, destination, city, state, pickup points, duration, pricing, or itinerary. Generate ONLY shortCatchphrase, image, and description.
Return ONLY valid JSON with these exact 3 keys. No markdown, no code blocks, no explanation.`;

/**
 * Fetches AI-generated trip details from OpenRouter GPT-4o based on the trip title.
 */
export const fetchAutoFill = async (title: string): Promise<AutoFillResponse> => {
  const { apiKey, endpoint, model, referer, siteName, defaultTemperature, defaultMaxTokens } =
    OPENROUTER_CONFIG;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': referer,
      'X-Title': siteName,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Generate trip details for: "${title}"` },
      ],
      temperature: defaultTemperature,
      max_tokens: defaultMaxTokens,
    }),
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';

  // Strip markdown code fences if present
  const cleanJson = content
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim();

  return JSON.parse(cleanJson) as AutoFillResponse;
};

export { AVAILABLE_IMAGES };
