'use client';

import React from 'react';
import { useCarouselScroll } from '@/redux';
import { DestinationCard } from './DestinationCard';
import { destinationsData } from './destinationsData';
import { CarouselScrollButton, CarouselEdgeGradient } from '../common';
import { colorTokens } from '@/theme';

export const IndiaOnWheelsSection: React.FC = () => {
  const { trackRef, canScrollLeft, canScrollRight, handleScroll } =
    useCarouselScroll('india-on-wheels');

  return (
    <section
      id="india-on-wheels-section"
      style={{ backgroundColor: colorTokens.background }}
      className="relative w-full py-12 md:py-16 overflow-hidden font-sans z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl sm:text-[28px] md:text-[32px] font-black tracking-tight text-charcoal font-jakarta">
            <span>India on </span>
            <span className="ml-1" style={{ color: colorTokens.primaryContainer }}>
              Wheels
            </span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Scroll Left Button */}
          <CarouselScrollButton
            id="india-wheels-scroll-left"
            direction="left"
            disabled={!canScrollLeft}
            onClick={() => handleScroll('left')}
            ariaLabel="Scroll India on wheels left"
          />

          {/* Scroll Right Button */}
          <CarouselScrollButton
            id="india-wheels-scroll-right"
            direction="right"
            disabled={!canScrollRight}
            onClick={() => handleScroll('right')}
            ariaLabel="Scroll India on wheels right"
          />

          {/* Edge Fade Gradients */}
          <CarouselEdgeGradient side="left" visible={canScrollLeft} fromColor={colorTokens.background} />
          <CarouselEdgeGradient side="right" visible={canScrollRight} fromColor={colorTokens.background} />

          {/* 2-Row Horizontal Scroll Track */}
          <div
            ref={trackRef}
            className="overflow-x-auto scroll-smooth pb-4 select-none cursor-grab active:cursor-grabbing scrollbar-hide"
          >
            <div className="grid grid-rows-2 grid-flow-col gap-4 sm:gap-5 md:gap-6 auto-cols-[minmax(150px,1fr)] min-[480px]:auto-cols-[minmax(190px,1fr)] md:auto-cols-[minmax(210px,1fr)]">
              {destinationsData.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
