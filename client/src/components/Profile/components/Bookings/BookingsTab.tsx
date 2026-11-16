'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingsTab } from './hooks';
import { TravelerBookingsFilterBar } from './components/BookingsFilterBar';
import { BookingCard } from './components/BookingCard';
import { BookingsEmptyState } from './components/BookingsEmptyState';
import { colorTokens } from '@/theme';

export const BookingsTab: React.FC = () => {
  const {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    filteredBookings,
    filterOptions,
    copiedId,
    handleCopyRef,
    handleViewDetails,
  } = useBookingsTab();

  return (
    <div className="w-full font-jakarta">
      {/* Category Subtitle & Hero Headline */}
      <div className="mb-6 sm:mb-8">
        <span
          className="block text-[11px] sm:text-xs font-black uppercase tracking-[0.24em] mb-1"
          style={{ color: colorTokens.primary }}
        >
          TRAVEL RESERVATIONS
        </span>
        <h1 className="flex items-baseline gap-2">
          <span
            className="font-caveat text-4xl sm:text-5xl font-bold tracking-normal"
            style={{ color: colorTokens.primaryContainer }}
          >
            My
          </span>
          <span
            className="font-black text-3xl sm:text-4xl tracking-tight uppercase"
            style={{ color: colorTokens.primaryContainer }}
          >
            BOOKINGS
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
          Manage upcoming departures, review completed journeys, and access your verified trip vouchers.
        </p>
      </div>

      {/* Filter Bar & Search */}
      <TravelerBookingsFilterBar
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Bookings Card List */}
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isCopied={copiedId === booking.referenceId}
                onCopyRef={handleCopyRef}
                onViewDetails={handleViewDetails}
              />
            ))
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <BookingsEmptyState
                hasSearchQuery={Boolean(searchQuery)}
                onClearFilters={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingsTab;
