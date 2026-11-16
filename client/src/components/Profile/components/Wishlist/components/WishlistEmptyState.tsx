'use client';

import React from 'react';
import Link from 'next/link';
import { HeartCrack } from 'lucide-react';
import { Button } from '@/components/shared';
import { colorTokens } from '@/theme';

interface WishlistEmptyStateProps {
  hasSearchQuery: boolean;
  onClearSearch: () => void;
}

export const WishlistEmptyState: React.FC<WishlistEmptyStateProps> = ({
  hasSearchQuery,
  onClearSearch,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 sm:p-12 text-center my-4 font-jakarta w-full">
      <div
        className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4"
        style={{
          backgroundColor: colorTokens.accentWarmTint,
          color: colorTokens.primaryContainer,
        }}
      >
        <HeartCrack className="w-8 h-8 stroke-[2]" />
      </div>

      <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2">
        {hasSearchQuery ? 'No matching saved trips' : 'Your wishlist is currently empty'}
      </h3>

      <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mb-6 leading-relaxed">
        {hasSearchQuery
          ? 'Try adjusting your search keywords to find your dream destinations.'
          : 'Browse our scout-verified itineraries across Himachal, Ladakh, Kerala, and Goa to save your dream adventures.'}
      </p>

      <div className="flex items-center justify-center gap-3">
        {hasSearchQuery ? (
          <Button variant="secondary" size="sm" rounded="xl" onClick={onClearSearch}>
            Clear Search
          </Button>
        ) : (
          <Link href="/">
            <Button variant="primary" size="sm" rounded="xl">
              Explore Destinations
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default WishlistEmptyState;

