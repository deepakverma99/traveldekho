import { TripItem } from '@/components/shared';

export type SortOption =
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'duration-asc'
  | 'duration-desc';

export type ViewMode = 'grid' | 'map';

export interface FilterState {
  searchQuery: string;
  destination: string;
  minBudget: number | null;
  maxBudget: number | null;
  selectedCategories: string[];
  selectedDurations: string[];
  selectedDifficulties: string[];
  selectedDate: number | null; // day of current month or null
}

export interface SearchTripsProps {
  initialQuery?: string;
  initialCategory?: string;
}

export type { TripItem };
