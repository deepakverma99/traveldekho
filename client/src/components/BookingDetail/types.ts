export interface BookingDetailData {
  id: string;
  referenceId: string;
  tripId: string;
  tripTitle: string;
  tripLocation: string;
  tripDuration: string;
  tripImage: string;
  travelDate: string;
  bookingDate: string;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  primaryGuestsCount: number;
  additionalGuestsCount: number;
  status: string;
  paymentStatus: 'paid' | 'unpaid' | string;
  amount: number;
  baseAmount: number;
  bookingAmount: number;
  dueAmount: number;
  travelerName: string;
  travelerPhone: string;
  travelerEmail: string;
  partnerName: string;
  partnerVerified: boolean;
  partnerPhone: string;
}

export interface BookingDetailProps {
  bookingId: string;
}
