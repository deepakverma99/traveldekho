'use client';

import React from 'react';
import { LayoutGrid, Map as MapIcon } from 'lucide-react';
import { ViewMode } from './types';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

export interface SearchTopBarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  description?: string;
}

export const SearchTopBar: React.FC<SearchTopBarProps> = ({
  viewMode,
  onViewModeChange,
  description = 'Explore scout-verified trips, offbeat trails, and authentic Himalayan journeys across India.',
}) => {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-[28px] md:text-[32px] font-extrabold tracking-tight"
            style={{
              fontFamily: typography.fonts.jakarta,
              color: colors.charcoal,
            }}
          >
            All Upcoming{' '}
            <span style={{ color: colors.primaryContainer }}>Adventures</span>
          </h1>
          {description && (
            <p
              className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-1.5 font-medium"
              style={{ fontFamily: typography.fonts.jakarta }}
            >
              {description}
            </p>
          )}
        </div>

        {/* View Toggle (Grid / Map) */}
        <div className="flex bg-gray-100 p-1 rounded-xl shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> Grid
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
              viewMode === 'map'
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <MapIcon className="w-4 h-4" /> Map
          </button>
        </div>
      </div>
    </div>
  );
};
