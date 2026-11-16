import { TripItem } from '@/components/shared';

export type TripCategory = 'domestic' | 'international';

export interface TopRankedTripsProps {
  id?: string;
}

export interface RankedTripItemProps {
  trip: TripItem;
  rank: number;
  priority?: boolean;
}
