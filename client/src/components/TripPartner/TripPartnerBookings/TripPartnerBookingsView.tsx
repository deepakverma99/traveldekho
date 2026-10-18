'use client';

import React from 'react';
import { Download, CalendarX, RotateCcw } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, Button } from '@/components/shared';
import {
  BookingsPageRoot,
  BannerWrapper,
  BreadcrumbScroll,
  Heading,
  AmberText,
  SubtitleText,
  EmptyBookingsState,
  ExportButton,
} from './styles';
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
    <BookingsPageRoot>
      {/* Banner matching partner portal header style */}
      <BannerWrapper>
        <div>
          <BreadcrumbScroll>
            <Breadcrumb items={breadcrumbItems} />
          </BreadcrumbScroll>

          <div className="mt-2">
            <Heading>
              All <AmberText>Bookings</AmberText>
            </Heading>
            <SubtitleText>
              Real-time traveler bookings & payment status
            </SubtitleText>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <ExportButton
            type="button"
            onClick={handleExportCSV}
            title="Export all visible bookings to CSV"
          >
            <Download />
            <span>Export Bookings</span>
          </ExportButton>
        </div>
      </BannerWrapper>

      {/* Top Filter Bar matching user screenshot */}
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
        <EmptyBookingsState>
          <CalendarX className="w-12 h-12 text-gray-300 stroke-[1.5]" />
          <h3>No Bookings Found</h3>
          <p>
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
        </EmptyBookingsState>
      )}
    </BookingsPageRoot>
  );
};

