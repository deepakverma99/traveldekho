/**
 * Trip Partner User Profile & Session Types
 */

export interface TripPartnerUser {
  username: string;
  email: string;
  displayName: string;
  companyName?: string;
  avatar?: string;
  isVerified?: boolean;
}

export interface TripPartnerBooking {
  id: string;
  travelerName: string;
  travelerEmail: string;
  tripTitle: string;
  status: 'booked' | 'pending' | 'cancelled';
  amount: number;
}

export interface TripPartnerNotification {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'booking' | 'confirmation' | 'system';
  isRead?: boolean;
}

export interface TripPartnerStats {
  totalRevenue: number;
  totalBookings: number;
  activeTrips: number;
  avgRating: number;
}

export interface PartnerBookingChartPoint {
  day: string;
  count: number;
}
