export type BookingFilterType = 'all' | 'upcoming' | 'completed' | 'cancelled';

export type BookingStatus = 'UPCOMING' | 'COMPLETED' | 'CANCELLED';

export interface TravelerBooking {
  id: string;
  referenceId: string;
  tripTitle: string;
  destination: string;
  pickupHub: string;
  image: string;
  travelDate: string;
  duration: string;
  guestsCount: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: 'PAID' | 'PARTIAL' | 'PENDING';
  partnerName: string;
  isVerifiedPartner: boolean;
  canReview?: boolean;
}

export interface BookingFilterOption {
  id: BookingFilterType;
  label: string;
  count: number;
}

