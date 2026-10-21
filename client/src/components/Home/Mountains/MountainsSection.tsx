'use client';

import React from 'react';
import { mountainsTripsData } from './mockMountainsTrips';
import { TripCarouselSection } from '../common';

export const MountainsSection: React.FC = () => {
  return (
    <TripCarouselSection
      id="mountains-section"
      carouselId="mountains"
      title="Majestic"
      highlightText="Mountains"
      viewAllHref="/category/mountains"
      trips={mountainsTripsData}
    />
  );
};
