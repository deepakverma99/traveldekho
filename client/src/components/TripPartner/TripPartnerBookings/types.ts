import { TripPartnerBooking } from '../types';

export interface BookingsFilterState {
  searchQuery: string;
  selectedStatus: string;
  selectedPayment: string;
  dateFilterType: 'booking' | 'travel';
  startDate: string;
  endDate: string;
}

export interface TripBookingsGroup {
  tripId: string;
  tripTitle: string;
  tripLocation: string;
  tripDuration: string;
  tripImage: string;
  totalBookings: number;
  totalRevenue: number;
  unpaidCount: number;
  bookings: TripPartnerBooking[];
}
