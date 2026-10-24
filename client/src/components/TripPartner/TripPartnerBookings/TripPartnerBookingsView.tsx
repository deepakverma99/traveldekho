'use client';

import React from 'react';
import { Download, CalendarX, RotateCcw } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, Button } from '@/components/shared';
import { usePartnerBookings } from './hooks/usePartnerBookings';
import { BookingsFilterBar } from './BookingsFilterBar';
import { TripBookingsAccordion } from './TripBookingsAccordion';

interface TripPartnerBookingsViewProps {
  username: string;
}

export const TripPartnerBookingsView: React.FC<TripPartnerBookingsViewProps> = ({ username }) => {
  const {
    filters,
    tripGroups,
    expandedTrips,
    hasActiveFilters,
    setSearchQuery,
    setSelectedStatus,
    setSelectedPayment,
    setDateFilterType,
    setStartDate,
    setEndDate,
    resetFilters,
    toggleTripAccordion,
    handleMarkPaid,
    handleDeleteBooking,
    handleExportCSV,
  } = usePartnerBookings();

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Trip Partner', href: `/trip-partner/${username}` },
    { label: 'Bookings' },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full min-w-0 px-2.5 sm:px-4 md:px-6 pt-3.5 sm:pt-5 md:pt-6 pb-12 sm:pb-16 font-jakarta">
      {/* Banner matching partner portal header style */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 sm:mb-6 gap-3 sm:gap-5 w-full min-w-0">
        <div className="min-w-0 flex-1">
          <div className="overflow-x-auto whitespace-nowrap max-w-full scrollbar-hide">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          <div className="mt-2">
            <h1 className="text-2xl min-[400px]:text-[1.75rem] sm:text-3xl font-black text-gray-900 tracking-tight uppercase break-words">
              All <span className="text-amber-500">Bookings</span>
            </h1>
            <p className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
              Real-time traveler bookings & payment status
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-auto shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleExportCSV}
            title="Export all visible bookings to CSV"
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 sm:py-2.5 px-3 sm:px-4.5 bg-[#0b132b] hover:bg-[#1c2541] text-white hover:text-amber-300 rounded-lg sm:rounded-xl text-[11px] sm:text-[13px] font-bold sm:font-extrabold tracking-tight font-jakarta border border-amber-400/20 hover:border-amber-400/40 cursor-pointer transition-all duration-200 shrink-0 w-auto hover:-translate-y-0.5 active:translate-y-0 shadow-xs hover:shadow-md"
          >
            <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 stroke-[2.25]" />
            <span>Export Bookings</span>
          </button>
        </div>
      </div>

      {/* Top Filter Bar */}
      <BookingsFilterBar
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={setSearchQuery}
        onStatusChange={setSelectedStatus}
        onPaymentChange={setSelectedPayment}
        onDateFilterTypeChange={setDateFilterType}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onResetFilters={resetFilters}
      />

      {/* Grouped Trips Accordions */}
      {tripGroups.length > 0 ? (
        <div className="space-y-4">
          {tripGroups.map((group) => (
            <TripBookingsAccordion
              key={group.tripTitle}
              group={group}
              isOpen={expandedTrips[group.tripTitle] ?? true}
              onToggle={() => toggleTripAccordion(group.tripTitle)}
              onMarkPaid={handleMarkPaid}
              onDelete={handleDeleteBooking}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl py-16 px-6 text-center flex flex-col items-center justify-center gap-3">
          <CalendarX className="w-12 h-12 text-gray-300 stroke-[1.5]" />
          <h3 className="text-lg font-bold text-gray-900">No Bookings Found</h3>
          <p className="text-sm text-gray-500 max-w-md">
            {hasActiveFilters
              ? 'No traveler bookings matched your current filter or date range criteria.'
              : 'You do not have any traveler bookings recorded yet.'}
          </p>
          {hasActiveFilters && (
            <div className="mt-4">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                onClick={resetFilters}
                showArrow={false}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
