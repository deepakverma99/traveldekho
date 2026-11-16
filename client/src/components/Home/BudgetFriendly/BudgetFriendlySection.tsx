'use client';

import { colorTokens } from '@/theme';
import { budgetTripsData } from './mockBudgetTrips';
import { TripCarouselSection } from '../common';

export const BudgetFriendlySection: React.FC = () => {
  return (
    <TripCarouselSection
      id="budget-friendly-section"
      carouselId="budget-friendly"
      title="Budget"
      highlightText="Friendly"
      viewAllHref="/category/budget-friendly"
      trips={budgetTripsData}
      backgroundColor={colorTokens.background}
    />
  );
};
