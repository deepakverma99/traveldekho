'use client';

import { colorTokens } from '@/theme';
import { exploreOffbeatTripsData } from './mockExploreOffbeatTrips';
import { TripCarouselSection } from '../common';

export const ExploreOffbeatSection: React.FC = () => {
  return (
    <TripCarouselSection
      id="explore-offbeat-section"
      carouselId="explore-offbeat"
      title="Explore"
      highlightText="Offbeat"
      viewAllHref="/category/explore-offbeat"
      trips={exploreOffbeatTripsData}
      backgroundColor={colorTokens.surfacePure}
    />
  );
};
