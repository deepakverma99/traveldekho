import { TripPartnerStats, PartnerBookingChartPoint } from '../types/';

export const MOCK_PARTNER_STATS: TripPartnerStats = {
  totalRevenue: 21600,
  totalBookings: 24,
  activeTrips: 2,
  avgRating: 0,
};

export const DEFAULT_BOOKING_TRENDS: PartnerBookingChartPoint[] = [
  { day: 'Mon', count: 2 },
  { day: 'Tue', count: 3 },
  { day: 'Wed', count: 1 },
  { day: 'Thu', count: 4 },
  { day: 'Fri', count: 3 },
  { day: 'Sat', count: 4 },
  { day: 'Sun', count: 2 },
];
