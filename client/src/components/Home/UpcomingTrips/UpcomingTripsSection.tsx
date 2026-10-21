'use client';

import React from 'react';
import { upcomingTripsData } from './mockTrips';
import { TripCarouselSection } from '../common';

export const UpcomingTripsSection: React.FC = () => {
  return (
    <TripCarouselSection
      id="upcoming-trips-section"
      carouselId="upcoming-trips"
      title="Upcoming"
      highlightText="Trips"
      viewAllHref="/search"
      trips={upcomingTripsData}
      priorityFirstN={4}
    />
  );
};
