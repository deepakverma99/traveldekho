'use client';

import React from 'react';
import { colorTokens } from '@/theme';
import { DiscoverBharatSectionProps } from './types';
import { useDiscoverCities, useTravelClimate } from './hooks';
import {
  DiscoverBharatHeader,
  CityCard,
  LiveClimateHeader,
  ClimateCard,
} from './components';

export const DiscoverBharatSection: React.FC<DiscoverBharatSectionProps> = ({
  id = 'discover-bharat-section',
  className = '',
}) => {
  const { isExpanded, toggleExpanded, displayedCities } = useDiscoverCities();
  const { climates } = useTravelClimate();

  return (
    <section
      id={id}
      style={{ backgroundColor: colorTokens.background }}
      className={`relative w-full py-10 md:py-14 overflow-hidden font-sans z-10 ${className}`.trim()}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Discover Bharat - Popular Hubs */}
        <DiscoverBharatHeader
          isExpanded={isExpanded}
          onToggleExpanded={toggleExpanded}
        />

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {displayedCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>

        {/* 2. Live Weather & Travel Climate */}
        <LiveClimateHeader />

        {/* Climate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {climates.map((climate) => (
            <ClimateCard key={climate.id} climate={climate} />
          ))}
        </div>
      </div>
    </section>
  );
};
