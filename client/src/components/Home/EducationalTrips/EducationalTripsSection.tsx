'use client';

import React from 'react';
import { educationalTripsData } from './mockEducationalTrips';
import { TripCarouselSection } from '../common';

export const EducationalTripsSection: React.FC = () => {
  return (
    <TripCarouselSection
      id="educational-section"
      carouselId="educational-trips"
      title="Educational"
      highlightText="Trips"
      viewAllHref="/category/educational-trips"
      trips={educationalTripsData}
    />
  );
};
