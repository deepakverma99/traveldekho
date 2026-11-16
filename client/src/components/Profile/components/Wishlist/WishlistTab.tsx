'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Search, X, Heart } from 'lucide-react';
import { useWishlistTab } from './hooks/useWishlistTab';
import { WishlistCard } from './components/WishlistCard';
import { WishlistEmptyState } from './components/WishlistEmptyState';
import { colorTokens } from '@/theme';

export const WishlistTab: React.FC = () => {
  const {
    filteredItems,
    searchQuery,
    setSearchQuery,
    handleRemove,
    handleExploreTrip,
    totalCount,
  } = useWishlistTab();

  return (
    <div className="w-full font-jakarta">
      {/* Category Subtitle & Hero Headline */}
      <div className="mb-6 sm:mb-8">
        <span
          className="block text-[11px] sm:text-xs font-black uppercase tracking-[0.24em] mb-1"
          style={{ color: colorTokens.primary }}
        >
          CURATED ITINERARIES
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
            WISHLIST
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
          Handpicked dream trips and mountain getaways you&apos;ve saved for upcoming journeys.
        </p>
      </div>

      {/* Top Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 mb-6">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200/90 text-xs font-bold text-gray-700 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>{totalCount} Saved Trips</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64 shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved trips..."
            aria-label="Search saved trips"
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-[13px] font-semibold text-gray-800 placeholder:text-gray-400 placeholder:font-normal bg-white border border-gray-200/90 rounded-xl focus:border-[#ff5722] focus:ring-2 focus:ring-[#ff5722]/15 outline-none transition-all"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2]" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
            >
              <X className="w-3 h-3 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>

      {/* Wishlist Grid - 4 cards in one row */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 xl:gap-5 w-full">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <WishlistCard
                key={item.id}
                item={item}
                priority={idx < 4}
                onRemove={handleRemove}
                onExplore={handleExploreTrip}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <WishlistEmptyState
          hasSearchQuery={Boolean(searchQuery)}
          onClearSearch={() => setSearchQuery('')}
        />
      )}
    </div>
  );
};

export default WishlistTab;

