'use client';

import React from 'react';
import { useCarouselScroll } from '@/redux';
import { CityCard } from './CityCard';
import { citiesData } from './citiesData';
import { CarouselScrollButton, CarouselEdgeGradient } from '../common';

export const DestinationsSection: React.FC = () => {
  const { trackRef, canScrollLeft, canScrollRight, handleScroll } =
    useCarouselScroll('destinations');

  return (
    <section
      id="destinations-section"
      className="relative w-full py-12 md:py-16 overflow-hidden bg-transparent font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl sm:text-[28px] md:text-[32px] font-black tracking-tight text-charcoal">
            Popular
            <span className="ml-1 text-primary">Destinations</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Scroll Left Button */}
          <CarouselScrollButton
            id="destinations-scroll-left"
            direction="left"
            disabled={!canScrollLeft}
            onClick={() => handleScroll('left')}
            ariaLabel="Scroll destinations left"
          />

          {/* Scroll Right Button */}
          <CarouselScrollButton
            id="destinations-scroll-right"
            direction="right"
            disabled={!canScrollRight}
            onClick={() => handleScroll('right')}
            ariaLabel="Scroll destinations right"
          />

          {/* Edge Fade Gradients */}
          <CarouselEdgeGradient side="left" visible={canScrollLeft} />
          <CarouselEdgeGradient side="right" visible={canScrollRight} />

          {/* 2-Row Horizontal Scroll Track */}
          <div
            ref={trackRef}
            className="overflow-x-auto scroll-smooth pb-4 select-none cursor-grab active:cursor-grabbing scrollbar-hide"
          >
            <div className="grid grid-rows-2 grid-flow-col gap-4 sm:gap-5 md:gap-6 auto-cols-[minmax(150px,1fr)] min-[480px]:auto-cols-[minmax(190px,1fr)] md:auto-cols-[minmax(210px,1fr)]">
              {citiesData.map((city) => (
                <CityCard key={city.id} city={city} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
