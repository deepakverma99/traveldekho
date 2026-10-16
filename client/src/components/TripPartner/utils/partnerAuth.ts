import type { TripPartnerUser } from '../types';

const STORAGE_KEY = 'traveldekho_trip_partner';

/**
 * Extracts a URL-safe username from an email prefix.
 * Example: travellr@gmail.com -> travellr
 */
export function extractUsernameFromEmail(email: string): string {
  if (!email || !email.includes('@')) {
    return 'travellr';
  }
  const prefix = email.split('@')[0].trim().toLowerCase();
  // Keep lowercase letters, numbers, hyphens, dots, underscores
  const sanitized = prefix.replace(/[^a-z0-9._-]/g, '');
  return sanitized || 'travellr';
}

/**
 * Formats a clean display name from a username.
 * Example: 'travellr' -> 'travellr times' (matching the user's mockup)
 * Example: 'mountain.explorer' -> 'mountain explorer'
 */
export function formatPartnerDisplayName(username: string): string {
  if (!username) return 'travellr times';
  if (username === 'travellr') return 'travellr times';
  return username.replace(/[._-]/g, ' ');
}

export function getStoredPartner(fallbackUsername?: string): TripPartnerUser {
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // Fallback on error
    }
  }

  const username = fallbackUsername || 'travellr';
  return {
    username,
    email: `${username}@gmail.com`,
    displayName: formatPartnerDisplayName(username),
    isVerified: true,
  };
}

export function savePartnerSession(partner: Partial<TripPartnerUser> & { email: string }): TripPartnerUser {
  const username = partner.username || extractUsernameFromEmail(partner.email);
  const fullPartner: TripPartnerUser = {
    displayName: formatPartnerDisplayName(username),
    companyName: `${formatPartnerDisplayName(username)} Travels`,
    isVerified: true,
    ...partner,
    username,
    email: partner.email,
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fullPartner));
    } catch {
      // Handle storage quota or private browsing
    }
  }

  return fullPartner;
}

export function clearPartnerSession(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }
}

export {
  MOCK_PARTNER_STATS,
  MOCK_PARTNER_BOOKINGS,
  MOCK_PARTNER_NOTIFICATIONS,
} from '../data';

