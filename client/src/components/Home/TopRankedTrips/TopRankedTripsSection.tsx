'use client';

import React from 'react';
import { colorTokens } from '@/theme';
import { useTopRankedTrips } from './hooks';
import { TripFilterDock, TopRankedHeader, RankedTripCard } from './components';
import { TopRankedTripsProps } from './types';

export const TopRankedTripsSection: React.FC<TopRankedTripsProps> = ({
  id = 'top-10-trips-section',
}) => {
  const {
    activeCategory,
    selectedRegion,
    filteredTrips,
    trackRef,
    canScrollLeft,
    canScrollRight,
    handleScroll,
    handleToggleCategory,
    handleToggleRegion,
  } = useTopRankedTrips();

  return (
    <section
      id={id}
      style={{ backgroundColor: colorTokens.background }}
      className="relative w-full py-10 md:py-14 overflow-hidden font-sans z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Filter Dock: Domestic/International tabs + Popular Domestic/International Chips */}
        <TripFilterDock
          activeCategory={activeCategory}
          selectedRegion={selectedRegion}
          onToggleCategory={handleToggleCategory}
          onToggleRegion={handleToggleRegion}
        />

        {/* Section Heading & Prev/Next Controls */}
        <TopRankedHeader
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
          onScrollLeft={() => handleScroll('left')}
          onScrollRight={() => handleScroll('right')}
        />

        {/* Horizontal Ranked Carousel */}
        <div className="relative">
          {/* Subtle baseline track line running behind cards and rank numbers */}
          <div className="absolute left-0 right-0 bottom-8 sm:bottom-9 h-[1.5px] bg-slate-200/80 z-0 pointer-events-none" />

          {/* Edge fade gradients matching exact background */}
          <div
            aria-hidden="true"
            className={`hidden md:block absolute top-0 bottom-0 w-12 z-20 pointer-events-none transition-opacity duration-300 left-0 bg-gradient-to-r from-[#f9f9fc] to-transparent ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            aria-hidden="true"
            className={`hidden md:block absolute top-0 bottom-0 w-12 z-20 pointer-events-none transition-opacity duration-300 right-0 bg-gradient-to-l from-[#f9f9fc] to-transparent ${
              canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Carousel Track */}
          <div
            ref={trackRef}
            className="flex gap-2 sm:gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth scrollbar-hide select-none"
          >
            {filteredTrips.map((trip, idx) => (
              <RankedTripCard
                key={trip.id}
                trip={trip}
                rank={idx + 1}
                priority={idx < 2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
