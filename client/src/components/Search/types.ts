import { TripItem } from '@/components/shared';
export type {
  SortOption,
  ViewMode,
  FilterState,
  SearchState,
} from '@/redux/slices/searchSlice';

export interface SearchTripsProps {
  initialQuery?: string;
  initialCategory?: string;
}

export type { TripItem };

