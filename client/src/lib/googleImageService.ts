/**
 * Service to search and retrieve real-time travel images from Google/web search.
 */

export interface GoogleImageResult {
  success: boolean;
  images: string[];
  query: string;
}

/**
 * Fetches matching travel photos from the Google/web image search API.
 * @param query The destination or prompt text.
 * @returns Array of image URLs.
 */
export const fetchGoogleImages = async (query: string): Promise<string[]> => {
  try {
    const trimmed = query.trim();
    const endpoint = `/api/google-images?q=${encodeURIComponent(trimmed)}`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.status}`);
    }

    const data: GoogleImageResult = await response.json();
    if (data.success && Array.isArray(data.images) && data.images.length > 0) {
      return data.images;
    }
    return [];
  } catch (error) {
    console.warn('[fetchGoogleImages] Failed to retrieve images:', error);
    return [];
  }
};
