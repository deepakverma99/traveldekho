import { TripPartnerUser, TripPartnerBooking, TripPartnerNotification, TripPartnerStats } from '../types';

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

export const MOCK_PARTNER_STATS: TripPartnerStats = {
  totalRevenue: 21600,
  totalBookings: 24,
  activeTrips: 2,
  avgRating: 0,
};

export const MOCK_PARTNER_BOOKINGS: TripPartnerBooking[] = [
  {
    id: 'b-1',
    travelerName: 'pranaw',
    travelerEmail: 'guest_7011371292@traveldekho.local',
    tripTitle: 'The Kausani story 2.0',
    status: 'booked',
    amount: 5400,
  },
  {
    id: 'b-2',
    travelerName: 'Deepak',
    travelerEmail: 'guest_9891413535@traveldekho.local',
    tripTitle: 'The Kausani story 2.0',
    status: 'booked',
    amount: 5400,
  },
  {
    id: 'b-3',
    travelerName: 'Deepak',
    travelerEmail: 'guest_9140506902@traveldekho.local',
    tripTitle: 'The Kausani story 2.0',
    status: 'booked',
    amount: 5400,
  },
  {
    id: 'b-4',
    travelerName: 'travellr times',
    travelerEmail: 'travellr@gmail.com',
    tripTitle: 'The Kausani story 2.0',
    status: 'booked',
    amount: 5400,
  },
  {
    id: 'b-5',
    travelerName: 'Guest User',
    travelerEmail: 'guest_9389848494@traveldekho.local',
    tripTitle: 'The Kausani story 2.0',
    status: 'booked',
    amount: 5400,
  },
];

export const MOCK_PARTNER_NOTIFICATIONS: TripPartnerNotification[] = [
  {
    id: 'n-1',
    title: 'New Booking Received! 🎉',
    description: 'You have a new booking for The Kausani story 2.0.',
    date: '15 Oct',
    type: 'booking',
  },
  {
    id: 'n-2',
    title: 'New Booking Received! 🎉',
    description: 'You have a new booking for The Kausani story 2.0.',
    date: '14 Oct',
    type: 'booking',
  },
  {
    id: 'n-3',
    title: 'New Booking Received! 🎉',
    description: 'You have a new booking for The Kausani story 2.0.',
    date: '10 Oct',
    type: 'booking',
  },
  {
    id: 'n-4',
    title: 'Booking Confirmed! ✅',
    description: 'Your booking for The Kausani story 2.0 is confirmed.',
    date: '9 Oct',
    type: 'confirmation',
  },
  {
    id: 'n-5',
    title: 'New Booking Received! 🎉',
    description: 'You have a new booking for The Kausani story 2.0.',
    date: '9 Oct',
    type: 'booking',
  },
];
