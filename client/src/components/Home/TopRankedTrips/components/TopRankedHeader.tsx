'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { colorTokens } from '@/theme';

interface TopRankedHeaderProps {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

export const TopRankedHeader: React.FC<TopRankedHeaderProps> = ({
  canScrollLeft,
  canScrollRight,
  onScrollLeft,
  onScrollRight,
}) => {
  return (
    <div className="flex items-center justify-between mb-6 md:mb-8 font-jakarta">
      {/* Title */}
      <h2
        style={{ color: colorTokens.textPrimary }}
        className="text-2xl sm:text-[28px] md:text-[32px] font-black tracking-tight"
      >
        <span>Top 10 Trips Right </span>
        <span style={{ color: colorTokens.primaryContainer }}>Now</span>
      </h2>

      {/* Navigation Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Scroll left"
          disabled={!canScrollLeft}
          onClick={onScrollLeft}
          style={{
            backgroundColor: colorTokens.surfacePure,
            borderColor: colorTokens.surfaceBorder,
            color: colorTokens.textPrimary,
          }}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${
            canScrollLeft
              ? 'hover:bg-gray-50 hover:border-gray-300'
              : 'opacity-40 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          aria-label="Scroll right"
          disabled={!canScrollRight}
          onClick={onScrollRight}
          style={{
            backgroundColor: colorTokens.surfacePure,
            borderColor: colorTokens.surfaceBorder,
            color: colorTokens.textPrimary,
          }}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${
            canScrollRight
              ? 'hover:bg-gray-50 hover:border-gray-300'
              : 'opacity-40 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
