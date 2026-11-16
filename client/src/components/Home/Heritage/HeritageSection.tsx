'use client';

import { colorTokens } from '@/theme';
import { heritageTripsData } from './mockHeritageTrips';
import { TripCarouselSection } from '../common';

export const HeritageSection: React.FC = () => {
  return (
    <TripCarouselSection
      id="heritage-section"
      carouselId="heritage"
      title="Cultural"
      highlightText="Heritage"
      viewAllHref="/category/heritage"
      trips={heritageTripsData}
      backgroundColor={colorTokens.background}
    />
  );
};
