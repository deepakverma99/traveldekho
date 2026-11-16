'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { colorTokens } from '@/theme';
import { EXPLORE_CATEGORIES } from '../data';
import { useCategoryCarousel } from '../hooks';
import { CategoryCard } from './CategoryCard';

export const ExploreCategoryCarousel: React.FC = () => {
  const { trackRef, canScrollLeft, canScrollRight, handleScroll } =
    useCategoryCarousel();

  return (
    <div className="w-full mb-12 md:mb-16 font-jakarta">
      {/* Header Row */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
        {/* Title + Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3.5">
          <h2
            style={{ color: colorTokens.textPrimary }}
            className="text-xl sm:text-2xl md:text-[26px] font-black tracking-tight leading-none"
          >
            <span>Explore by </span>
            <span style={{ color: colorTokens.primaryContainer }}>Category</span>
          </h2>
          <span
            style={{ color: colorTokens.textSecondary }}
            className="text-[11px] sm:text-xs font-bold tracking-wider uppercase"
          >
            HANDPICKED COLLECTIONS FOR EVERY TRAVEL STYLE
          </span>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            aria-label="Scroll categories left"
            disabled={!canScrollLeft}
            onClick={() => handleScroll('left')}
            style={{
              backgroundColor: colorTokens.surfacePure,
              borderColor: colorTokens.surfaceBorder,
              color: colorTokens.textPrimary,
            }}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${
              canScrollLeft
                ? 'hover:bg-gray-50 hover:border-gray-300'
                : 'opacity-40 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            aria-label="Scroll categories right"
            disabled={!canScrollRight}
            onClick={() => handleScroll('right')}
            style={{
              backgroundColor: colorTokens.surfacePure,
              borderColor: colorTokens.surfaceBorder,
              color: colorTokens.textPrimary,
            }}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${
              canScrollRight
                ? 'hover:bg-gray-50 hover:border-gray-300'
                : 'opacity-40 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track with Subtle Fades */}
      <div className="relative">
        {/* Left Fade Gradient */}
        <div
          aria-hidden="true"
          className={`hidden md:block absolute top-0 bottom-0 left-0 w-8 z-10 pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-white to-transparent ${
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Right Fade Gradient */}
        <div
          aria-hidden="true"
          className={`hidden md:block absolute top-0 bottom-0 right-0 w-8 z-10 pointer-events-none transition-opacity duration-300 bg-gradient-to-l from-white to-transparent ${
            canScrollRight ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Scroll Container */}
        <div
          ref={trackRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 scroll-smooth scrollbar-hide select-none"
        >
          {EXPLORE_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};
