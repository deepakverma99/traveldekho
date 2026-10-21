'use client';

import React from 'react';
import { useCarouselScroll } from '@/redux';
import { TripCard, TripItem } from '@/components/shared';
import { CarouselHeader } from './CarouselHeader';
import { CarouselScrollButton } from './CarouselScrollButton';
import { CarouselEdgeGradient } from './CarouselEdgeGradient';

interface TripCarouselSectionProps {
  id: string;
  carouselId: string;
  title: string;
  highlightText: string;
  viewAllHref: string;
  trips: TripItem[];
  priorityFirstN?: number;
}

export const TripCarouselSection: React.FC<TripCarouselSectionProps> = ({
  id,
  carouselId,
  title,
  highlightText,
  viewAllHref,
  trips,
  priorityFirstN = 0,
}) => {
  const { trackRef, canScrollLeft, canScrollRight, handleScroll } =
    useCarouselScroll(carouselId);

  return (
    <section
      id={id}
      className="relative w-full py-12 md:py-16 overflow-hidden bg-transparent font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <CarouselHeader
          title={title}
          highlightText={highlightText}
          viewAllHref={viewAllHref}
        />

        <div className="relative">
          <CarouselScrollButton
            id={`${id}-scroll-left`}
            direction="left"
            disabled={!canScrollLeft}
            onClick={() => handleScroll('left')}
            ariaLabel={`Scroll ${title} left`}
          />

          <CarouselScrollButton
            id={`${id}-scroll-right`}
            direction="right"
            disabled={!canScrollRight}
            onClick={() => handleScroll('right')}
            ariaLabel={`Scroll ${title} right`}
          />

          <CarouselEdgeGradient side="left" visible={canScrollLeft} />
          <CarouselEdgeGradient side="right" visible={canScrollRight} />

          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
          >
            {trips.map((trip, idx) => (
              <TripCard
                key={trip.id}
                trip={trip}
                priority={idx < priorityFirstN}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
