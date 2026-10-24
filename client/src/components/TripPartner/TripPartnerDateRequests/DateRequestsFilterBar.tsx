'use client';

import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Select, SearchBar } from '@/components/shared';
import { DateRequestsFilterState, DateRequestsSortBy } from './types';

interface DateRequestsFilterBarProps {
  filters: DateRequestsFilterState;
  hasActiveFilters: boolean;
  onSearchChange: (query: string) => void;
  onStatusChange: (status: string) => void;
  onSortChange: (sortBy: DateRequestsSortBy) => void;
  onReset: () => void;
}

export const DateRequestsFilterBar: React.FC<DateRequestsFilterBarProps> = ({
  filters,
  hasActiveFilters,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onReset,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-2.5 sm:p-3.5 mb-5 sm:mb-6 shadow-xs font-jakarta">
      <div className="flex flex-col lg:flex-row lg:items-center gap-2 sm:gap-2.5 w-full">
        {/* Search Bar using shared SearchBar */}
        <div className="w-full lg:max-w-[280px] lg:min-w-[180px] [&>div]:!max-w-full [&>div]:w-full">
          <SearchBar
            variant="filter"
            placeholder="Search by traveler, trip, or ID..."
            value={filters.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onClear={() => onSearchChange('')}
            aria-label="Search date requests"
            maxWidth="100%"
            minWidth="100%"
          />
        </div>

        {/* Filters and Controls */}
        <div className="grid grid-cols-1 min-[440px]:grid-cols-2 sm:flex sm:flex-wrap lg:flex-nowrap items-center gap-2 sm:gap-2.5 w-full lg:w-auto flex-1 min-w-0">
          {/* Status Filter Dropdown */}
          <div className="w-full min-[440px]:w-auto shrink-0 [&>div]:w-full [&>div]:min-[440px]:w-auto">
            <Select
              aria-label="Filter by Status"
              value={filters.statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              isFullWidth
              className="w-full min-[440px]:w-auto"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending Review</option>
              <option value="accepted">Accepted</option>
              <option value="declined">Declined</option>
            </Select>
          </div>

          {/* Sort By Dropdown */}
          <div className="w-full min-[440px]:w-auto shrink-0 [&>div]:w-full [&>div]:min-[440px]:w-auto">
            <Select
              aria-label="Sort Date Requests"
              value={filters.sortBy}
              onChange={(e) => onSortChange(e.target.value as DateRequestsSortBy)}
              isFullWidth
              className="w-full min-[440px]:w-auto"
            >
              <option value="newest">Sort by Newest</option>
              <option value="oldest">Sort by Oldest</option>
              <option value="travelDate">Upcoming Travel Date</option>
              <option value="revenue">Highest Pipeline Value</option>
              <option value="guests">Most Guests</option>
            </Select>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              title="Reset all filters"
              className="inline-flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-3 sm:px-3.5 bg-amber-50 hover:bg-amber-100 text-amber-800 hover:text-amber-900 border border-amber-200 hover:border-amber-300 rounded-xl text-xs sm:text-[13px] font-bold font-jakarta cursor-pointer transition-all duration-200 whitespace-nowrap w-full min-[440px]:w-auto shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
