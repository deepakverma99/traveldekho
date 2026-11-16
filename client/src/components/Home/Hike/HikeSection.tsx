'use client';

import { colorTokens } from '@/theme';
import { hikeTripsData } from './mockHikeTrips';
import { TripCarouselSection } from '../common';

export const HikeSection: React.FC = () => {
  return (
    <TripCarouselSection
      id="hike-section"
      carouselId="hike"
      title="Trail"
      highlightText="Hike"
      viewAllHref="/category/hike"
      trips={hikeTripsData}
      backgroundColor={colorTokens.surfacePure}
    />
  );
};
