export interface TravelerReview {
  id: string;
  tripId: string;
  tripTitle: string;
  destination: string;
  tripImage: string;
  rating: number; // 1 to 5
  title: string;
  content: string;
  date: string;
  travelDate: string;
  partnerName: string;
  isVerified: boolean;
}

export interface PendingReviewItem {
  id: string;
  bookingId: string;
  tripTitle: string;
  destination: string;
  tripImage: string;
  travelDate: string;
  partnerName: string;
}

export type ReviewTabSubFilter = 'written' | 'pending';

