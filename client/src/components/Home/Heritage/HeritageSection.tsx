'use client';

import React from 'react';
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
    />
  );
};
