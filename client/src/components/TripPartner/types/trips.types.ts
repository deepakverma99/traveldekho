/**
 * Trip Partner Itinerary & Trips Management Types
 */

export type TripPartnerCardStatus = 'Draft' | 'Pending' | 'Published';

export type TripDifficulty = 'Easy' | 'Moderate' | 'Difficult' | 'Challenging';

export interface PartnerTripItem {
  id: string;
  slug: string;
  title: string;
  destination: string;
  duration: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  date: string;
  status: TripPartnerCardStatus;
  category: string;
  difficulty: TripDifficulty;
  bookingsCount: number;
  tags: string[];
  partner: {
    name: string;
    logo?: string;
    ratingText?: string;
  };
}

export interface TripPartnerFilterState {
  searchQuery: string;
  selectedCategory: string;
  selectedStatus: string;
  sortBy: 'newest' | 'price-low' | 'price-high' | 'bookings';
}
