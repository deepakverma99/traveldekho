'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { BookingFilterType, BookingFilterOption } from '../types';
import { colorTokens } from '@/theme';

export interface TravelerBookingsFilterBarProps {
  filterOptions: BookingFilterOption[];
  activeFilter: BookingFilterType;
  onFilterChange: (filter: BookingFilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TravelerBookingsFilterBar: React.FC<TravelerBookingsFilterBarProps> = ({
  filterOptions,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 mb-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
        {filterOptions.map((opt) => {
          const isActive = activeFilter === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onFilterChange(opt.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold tracking-tight transition-all duration-200 cursor-pointer select-none whitespace-nowrap border ${
                isActive
                  ? 'text-white shadow-[0_6px_16px_rgba(255,87,34,0.3)] border-transparent'
                  : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 border-gray-200/80'
              }`}
              style={{
                backgroundColor: isActive ? colorTokens.primaryContainer : undefined,
              }}
            >
              <span>{opt.label}</span>
              <span
                className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {opt.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-64 shrink-0">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by trip, city, ID..."
          aria-label="Search bookings"
          className="w-full pl-9 pr-8 py-2 text-xs sm:text-[13px] font-semibold text-gray-800 placeholder:text-gray-400 placeholder:font-normal bg-white border border-gray-200/90 rounded-xl focus:border-[#ff5722] focus:ring-2 focus:ring-[#ff5722]/15 outline-none transition-all"
        />
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2]" />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
          >
            <X className="w-3 h-3 stroke-[2.5]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TravelerBookingsFilterBar;
