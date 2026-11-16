'use client';

import React from 'react';
import Link from 'next/link';
import { CalendarX2 } from 'lucide-react';
import { Button } from '@/components/shared';
import { colorTokens } from '@/theme';

interface BookingsEmptyStateProps {
  hasSearchQuery: boolean;
  onClearFilters: () => void;
}

export const BookingsEmptyState: React.FC<BookingsEmptyStateProps> = ({
  hasSearchQuery,
  onClearFilters,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 sm:p-12 text-center my-4 font-jakarta">
      <div
        className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4"
        style={{
          backgroundColor: colorTokens.accentWarmTint,
          color: colorTokens.primaryContainer,
        }}
      >
        <CalendarX2 className="w-8 h-8 stroke-[2]" />
      </div>

      <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2">
        {hasSearchQuery ? 'No matching bookings found' : 'No bookings in this category'}
      </h3>

      <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mb-6 leading-relaxed">
        {hasSearchQuery
          ? 'Try adjusting your search keywords or clear filters to see your complete travel reservations.'
          : 'Ready for your next adventure? Explore scout-verified trips across Himachal, Goa, and Uttarakhand.'}
      </p>

      <div className="flex items-center justify-center gap-3">
        {hasSearchQuery ? (
          <Button variant="secondary" size="sm" rounded="xl" onClick={onClearFilters}>
            Clear Filters
          </Button>
        ) : (
          <Link href="/">
            <Button variant="primary" size="sm" rounded="xl">
              Explore Trips
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BookingsEmptyState;

