'use client';

import React from 'react';
import { useCarouselScroll } from '@/redux';
import { VibeCard } from './VibeCard';
import { mockVibeData } from './mockVibeData';
import { CarouselScrollButton } from '../common';

export const VibeWithUsSection: React.FC = () => {
  const { trackRef, canScrollLeft, canScrollRight, handleScroll } =
    useCarouselScroll('vibe-with-us');

  return (
    <section
      id="vibe-with-us-section"
      className="relative w-full py-12 md:py-16 overflow-hidden bg-transparent font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl sm:text-[28px] md:text-[32px] font-extrabold tracking-tight text-charcoal">
            Vibe with
            <span className="ml-1 text-primary">Us</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative mt-6 md:mt-8">
          {/* Scroll Left Button */}
          <CarouselScrollButton
            id="vibe-scroll-left"
            direction="left"
            disabled={!canScrollLeft}
            onClick={() => handleScroll('left')}
            ariaLabel="Scroll vibe videos left"
          />

          {/* Scroll Right Button */}
          <CarouselScrollButton
            id="vibe-scroll-right"
            direction="right"
            disabled={!canScrollRight}
            onClick={() => handleScroll('right')}
            ariaLabel="Scroll vibe videos right"
          />

          {/* Horizontal Scroll Track */}
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 px-1 scroll-smooth scrollbar-hide items-center select-none cursor-grab active:cursor-grabbing"
          >
            {mockVibeData.map((item) => (
              <VibeCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
