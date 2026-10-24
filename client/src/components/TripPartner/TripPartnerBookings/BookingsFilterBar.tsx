'use client';

import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Select, SearchBar } from '@/components/shared';
import { BookingsFilterState } from './types';

interface BookingsFilterBarProps {
  filters: BookingsFilterState;
  hasActiveFilters: boolean;
  onSearchChange: (val: string) => void;
  onStatusChange: (val: string) => void;
  onPaymentChange: (val: string) => void;
  onDateFilterTypeChange: (val: 'booking' | 'travel') => void;
  onStartDateChange: (val: string) => void;
  onEndDateChange: (val: string) => void;
  onResetFilters: () => void;
}

export const BookingsFilterBar: React.FC<BookingsFilterBarProps> = ({
  filters,
  hasActiveFilters,
  onSearchChange,
  onStatusChange,
  onPaymentChange,
  onDateFilterTypeChange,
  onStartDateChange,
  onEndDateChange,
  onResetFilters,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-2.5 sm:p-3.5 mb-5 sm:mb-6 shadow-xs font-jakarta">
      {/* Responsive filter layout: Stacks on mobile, wraps on tablet, single row on desktop */}
      <div className="flex flex-col xl:flex-row xl:items-center gap-2 sm:gap-2.5 w-full">
        {/* Search Bar using shared SearchBar */}
        <div className="w-full xl:max-w-[260px] xl:min-w-[180px] [&>div]:!max-w-full [&>div]:w-full">
          <SearchBar
            variant="filter"
            placeholder="Search by title, name, or ID..."
            value={filters.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onClear={() => onSearchChange('')}
            aria-label="Search bookings"
            maxWidth="100%"
            minWidth="100%"
          />
        </div>

        {/* Dropdowns & Date Controls */}
        <div className="grid grid-cols-1 min-[440px]:grid-cols-2 sm:flex sm:flex-wrap xl:flex-nowrap items-center gap-2 sm:gap-2.5 w-full xl:w-auto flex-1 min-w-0">
          {/* All Status Select */}
          <div className="w-full min-[440px]:w-auto shrink-0 [&>div]:w-full [&>div]:min-[440px]:w-auto">
            <Select
              aria-label="Filter by Status"
              value={filters.selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              isFullWidth
              className="w-full min-[440px]:w-auto"
            >
              <option value="All Status">All Status</option>
              <option value="Booked">Booked</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
          </div>

          {/* All Payments Select */}
          <div className="w-full min-[440px]:w-auto shrink-0 [&>div]:w-full [&>div]:min-[440px]:w-auto">
            <Select
              aria-label="Filter by Payment"
              value={filters.selectedPayment}
              onChange={(e) => onPaymentChange(e.target.value)}
              isFullWidth
              className="w-full min-[440px]:w-auto"
            >
              <option value="All Payments">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </Select>
          </div>

          {/* Date Filter Type Selector */}
          <div className="w-full min-[440px]:w-auto shrink-0 [&>div]:w-full [&>div]:min-[440px]:w-auto">
            <Select
              aria-label="Date Filter Type"
              value={filters.dateFilterType}
              onChange={(e) => onDateFilterTypeChange(e.target.value as 'booking' | 'travel')}
              isFullWidth
              className="w-full min-[440px]:w-auto"
            >
              <option value="booking">Filter by Booking Date</option>
              <option value="travel">Filter by Travel Date</option>
            </Select>
          </div>

          {/* Date Range Pill */}
          <div className="flex items-center justify-between min-[440px]:justify-start gap-1.5 sm:gap-2 bg-white border border-gray-200 rounded-xl py-2 px-2.5 sm:px-3 text-xs sm:text-[13px] font-bold text-gray-800 font-jakarta w-full min-[440px]:w-auto shrink-0 hover:border-gray-300 focus-within:border-amber-400 focus-within:ring-3 focus-within:ring-amber-100/50 transition-all min-w-0">
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              value={filters.startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              title="Start Date"
              aria-label="Start Date"
              className="bg-transparent border-none outline-none text-xs sm:text-[13px] font-bold text-gray-800 cursor-pointer min-w-0 max-w-[125px] sm:max-w-none flex-1 min-[440px]:flex-initial"
            />
            <span className="text-gray-400 font-medium text-xs sm:text-sm shrink-0">to</span>
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              value={filters.endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              title="End Date"
              aria-label="End Date"
              className="bg-transparent border-none outline-none text-xs sm:text-[13px] font-bold text-gray-800 cursor-pointer min-w-0 max-w-[125px] sm:max-w-none flex-1 min-[440px]:flex-initial"
            />
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
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
