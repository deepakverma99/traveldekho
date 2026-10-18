'use client';

import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import {
  FilterCard,
  FilterInputsGrid,
  SearchInputWrapper,
  FilterSelect,
  DateRangePill,
  ResetFiltersButton,
} from './styles';
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
    <FilterCard>
      {/* All filter controls in a single row */}
      <FilterInputsGrid>
        {/* Search Bar */}
        <SearchInputWrapper>
          <Search />
          <input
            type="text"
            placeholder="Search by title, name, or ID..."
            value={filters.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search bookings"
          />
        </SearchInputWrapper>

        {/* All Status Select */}
        <FilterSelect
          value={filters.selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by Status"
        >
          <option value="All Status">All Status</option>
          <option value="Booked">Booked</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </FilterSelect>

        {/* All Payments Select */}
        <FilterSelect
          value={filters.selectedPayment}
          onChange={(e) => onPaymentChange(e.target.value)}
          aria-label="Filter by Payment"
        >
          <option value="All Payments">All Payments</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </FilterSelect>

        {/* Date Filter Type Selector */}
        <FilterSelect
          value={filters.dateFilterType}
          onChange={(e) => onDateFilterTypeChange(e.target.value as 'booking' | 'travel')}
          aria-label="Date Filter Type"
        >
          <option value="booking">Filter by Booking Date</option>
          <option value="travel">Filter by Travel Date</option>
        </FilterSelect>

        {/* Date Range Pill */}
        <DateRangePill>
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            value={filters.startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            title="Start Date"
            aria-label="Start Date"
          />
          <span>to</span>
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            value={filters.endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            title="End Date"
            aria-label="End Date"
          />
        </DateRangePill>

        {/* Reset Filters */}
        {hasActiveFilters && (
          <ResetFiltersButton
            type="button"
            onClick={onResetFilters}
            title="Reset Filters"
          >
            <RotateCcw />
            <span>Reset</span>
          </ResetFiltersButton>
        )}
      </FilterInputsGrid>
    </FilterCard>
  );
};

