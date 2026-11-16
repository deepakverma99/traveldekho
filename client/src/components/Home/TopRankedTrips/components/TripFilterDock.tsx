'use client';

import React from 'react';
import { TrendingUp, Globe } from 'lucide-react';
import { colorTokens } from '@/theme';
import { TripCategory } from '../types';
import {
  POPULAR_DOMESTIC_REGIONS,
  POPULAR_INTERNATIONAL_REGIONS,
} from '../data';

interface TripFilterDockProps {
  activeCategory: TripCategory;
  selectedRegion: string | null;
  onToggleCategory: (category: TripCategory) => void;
  onToggleRegion: (region: string) => void;
}

export const TripFilterDock: React.FC<TripFilterDockProps> = ({
  activeCategory,
  selectedRegion,
  onToggleCategory,
  onToggleRegion,
}) => {
  const currentRegions =
    activeCategory === 'domestic'
      ? POPULAR_DOMESTIC_REGIONS
      : POPULAR_INTERNATIONAL_REGIONS;

  const popularLabel =
    activeCategory === 'domestic'
      ? 'POPULAR DOMESTIC:'
      : 'POPULAR INTERNATIONAL:';

  return (
    <div
      style={{
        backgroundColor: colorTokens.surfacePure,
        borderColor: colorTokens.surfaceBorder,
      }}
      className="rounded-xl sm:rounded-2xl border shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-2.5 sm:p-3 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 font-jakarta w-full"
    >
      {/* Left: Category Switcher */}
      <div
        style={{
          backgroundColor: '#F3F4F6',
        }}
        className="p-1 rounded-lg sm:rounded-xl flex items-center shrink-0 w-full sm:w-auto"
      >
        {/* Domestic Trips Pill */}
        <button
          id="tab-domestic-trips"
          type="button"
          onClick={() => onToggleCategory('domestic')}
          style={{
            backgroundColor:
              activeCategory === 'domestic'
                ? colorTokens.primaryContainer
                : 'transparent',
            color:
              activeCategory === 'domestic'
                ? colorTokens.onPrimary
                : colorTokens.textPrimary,
          }}
          className={`flex items-center justify-center gap-2 rounded-lg text-[12px] sm:text-[13px] font-bold px-3.5 sm:px-4 py-2 transition-all duration-200 cursor-pointer flex-1 sm:flex-initial ${
            activeCategory === 'domestic'
              ? 'shadow-xs'
              : 'hover:bg-white/60'
          }`}
        >
          <span className="text-[14px]">🇮🇳</span>
          <span>Domestic Trips</span>
          <span
            style={{
              backgroundColor:
                activeCategory === 'domestic'
                  ? 'rgba(255, 255, 255, 0.25)'
                  : colorTokens.surfacePure,
              color:
                activeCategory === 'domestic'
                  ? colorTokens.onPrimary
                  : colorTokens.textSecondary,
            }}
            className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md ml-0.5 shadow-2xs"
          >
            1,200+ Trips
          </span>
        </button>

        {/* International Trips Pill */}
        <button
          id="tab-international-trips"
          type="button"
          onClick={() => onToggleCategory('international')}
          style={{
            backgroundColor:
              activeCategory === 'international'
                ? colorTokens.primaryContainer
                : 'transparent',
            color:
              activeCategory === 'international'
                ? colorTokens.onPrimary
                : colorTokens.textPrimary,
          }}
          className={`flex items-center justify-center gap-2 rounded-lg text-[12px] sm:text-[13px] font-bold px-3.5 sm:px-4 py-2 transition-all duration-200 cursor-pointer flex-1 sm:flex-initial ${
            activeCategory === 'international'
              ? 'shadow-xs'
              : 'hover:bg-white/60'
          }`}
        >
          <span className="text-[14px]">✈️</span>
          <span>International Trips</span>
          <span
            style={{
              backgroundColor:
                activeCategory === 'international'
                  ? 'rgba(255, 255, 255, 0.25)'
                  : colorTokens.surfacePure,
              color:
                activeCategory === 'international'
                  ? colorTokens.onPrimary
                  : colorTokens.textSecondary,
            }}
            className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md ml-0.5 shadow-2xs"
          >
            45+ Countries
          </span>
        </button>
      </div>

      {/* Right: Popular Destination Chips (Domestic & International) - strictly inline and horizontally scrollable */}
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 max-w-full overflow-hidden w-full lg:w-auto flex-1 lg:justify-end">
        <span
          style={{ color: colorTokens.textSecondary }}
          className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider shrink-0 select-none"
        >
          {activeCategory === 'domestic' ? (
            <TrendingUp
              className="w-3.5 h-3.5"
              style={{ color: colorTokens.primaryContainer }}
            />
          ) : (
            <Globe
              className="w-3.5 h-3.5"
              style={{ color: colorTokens.primaryContainer }}
            />
          )}
          {popularLabel}
        </span>

        {/* Scrollable inline chips track without wrapping */}
        <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto scrollbar-hide py-1 px-0.5 scroll-smooth min-w-0 shrink">
          {currentRegions.map((region) => {
            const isSelected = selectedRegion === region;
            return (
              <button
                key={region}
                type="button"
                onClick={() => onToggleRegion(region)}
                style={{
                  backgroundColor: isSelected
                    ? colorTokens.accentWarmTint
                    : colorTokens.surfacePure,
                  borderColor: isSelected
                    ? colorTokens.primaryContainer
                    : colorTokens.surfaceBorder,
                  color: isSelected
                    ? colorTokens.primaryContainer
                    : colorTokens.textPrimary,
                }}
                className={`rounded-lg px-3.5 py-1 text-[12px] font-medium border transition-all duration-150 cursor-pointer select-none shadow-2xs shrink-0 whitespace-nowrap ${
                  isSelected ? 'font-bold' : 'hover:border-gray-300'
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
