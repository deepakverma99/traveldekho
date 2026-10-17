import { NextRequest, NextResponse } from 'next/server';

interface GoogleImageSearchResponse {
  success: boolean;
  images: string[];
  query: string;
  source?: string;
}

const CLEAN_QUERY_REGEX = /^\/trips\/|\.(png|jpg|jpeg|webp)$|[-_]/gi;

const extractSearchTerm = (input: string): string => {
  if (!input) return 'India travel landscape';
  // Strip paths, extensions, dashes
  const cleaned = input
    .replace(CLEAN_QUERY_REGEX, ' ')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .trim();
  return cleaned || 'India scenic travel';
};

/**
 * Searches real-time web images for destinations/scenic views
 */
const searchWebImages = async (searchTerm: string): Promise<string[]> => {
  try {
    const query = `${searchTerm} travel 4k hd`;
    const tokenRes = await fetch(
      `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        cache: 'no-store',
      }
    );

    const html = await tokenRes.text();
    const vqdMatch = html.match(/vqd=([^&"']+)/);
    if (!vqdMatch) return [];

    const vqd = vqdMatch[1];
    const imgRes = await fetch(
      `https://duckduckgo.com/i.js?q=${encodeURIComponent(query)}&o=json&p=1&s=0&u=bing&f=,,,;&l=us-en&vqd=${vqd}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        cache: 'no-store',
      }
    );

    if (!imgRes.ok) return [];

    const data = await imgRes.json();
    const results = (data.results || [])
      .map((item: { image?: string }) => item.image)
      .filter(
        (url: unknown): url is string =>
          typeof url === 'string' &&
          (url.startsWith('https://') || url.startsWith('http://'))
      );

    return results;
  } catch (error) {
    console.warn('[searchWebImages] error:', error);
    return [];
  }
};

/**
 * Fallback Unsplash curated images
 */
const getUnsplashFallbackImages = (searchTerm: string): string[] => {
  const encoded = encodeURIComponent(searchTerm);
  return [
    `https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80`,
    `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80`,
    `https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80`,
    `https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80`,
    `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80`,
  ].map((url) => `${url}&sig=${Math.floor(Math.random() * 1000)}&term=${encoded}`);
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get('q') || searchParams.get('query') || '';
  const searchTerm = extractSearchTerm(rawQuery);

  // 1. Fetch real-time web travel images
  let images = await searchWebImages(searchTerm);

  // 2. If nothing returned, fallback to Unsplash collection
  if (!images || images.length === 0) {
    images = getUnsplashFallbackImages(searchTerm);
  }

  const response: GoogleImageSearchResponse = {
    success: true,
    images: images.slice(0, 30),
    query: searchTerm,
  };

  return NextResponse.json(response);
}
