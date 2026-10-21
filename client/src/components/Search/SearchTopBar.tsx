'use client';

import React from 'react';
import { LayoutGrid, Map as MapIcon } from 'lucide-react';
import { ViewMode } from './types';
import { useAppDispatch, useAppSelector, selectViewMode, setViewMode } from '@/redux';

export interface SearchTopBarProps {
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  description?: string;
}

export const SearchTopBar: React.FC<SearchTopBarProps> = ({
  viewMode: propViewMode,
  onViewModeChange,
  description = 'Explore scout-verified trips, offbeat trails, and authentic Himalayan journeys across India.',
}) => {
  const dispatch = useAppDispatch();
  const reduxViewMode = useAppSelector(selectViewMode);
  const currentViewMode = propViewMode ?? reduxViewMode;

  const handleModeChange = (mode: ViewMode) => {
    if (onViewModeChange) {
      onViewModeChange(mode);
    } else {
      dispatch(setViewMode(mode));
    }
  };

  return (
    <div className="mb-6 sm:mb-8 font-jakarta">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] md:text-[32px] font-extrabold tracking-tight text-charcoal">
            All Upcoming <span className="text-primary-container">Adventures</span>
          </h1>
          {description && (
            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-1.5 font-medium">
              {description}
            </p>
          )}
        </div>

        {/* View Toggle (Grid / Map) */}
        <div className="flex bg-gray-100 p-1 rounded-xl shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => handleModeChange('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
              currentViewMode === 'grid'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'bg-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> Grid
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
              currentViewMode === 'map'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'bg-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <MapIcon className="w-4 h-4" /> Map
          </button>
        </div>
      </div>
    </div>
  );
};
