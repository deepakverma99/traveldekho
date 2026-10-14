'use client';

import React from 'react';
import { LayoutGrid, Map as MapIcon, Search as SearchIcon, X } from 'lucide-react';
import { ViewMode } from './types';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

export interface SearchTopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export const SearchTopBar: React.FC<SearchTopBarProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-6">
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

        {/* View Toggle (Grid / Map) */}
        <div className="flex bg-gray-100 p-1 rounded-xl shrink-0">
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

      {/* Main Search Input */}
      <div className="relative flex-1 max-w-xl">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search trips, destinations, experiences..."
          className="w-full h-12 pl-10 pr-10 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-sm text-gray-800 placeholder:text-gray-400"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Clear Search"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
