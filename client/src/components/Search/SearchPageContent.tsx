'use client';

import React, { useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchTopBar } from './SearchTopBar';
import { SearchFilterSidebar } from './SearchFilterSidebar';
import { SearchMapView } from './SearchMapView';
import { allSearchTrips } from './mockSearchTrips';
import { SortOption } from './types';
import {
  useAppDispatch,
  useAppSelector,
  selectSearchFilters,
  selectSortOption,
  selectViewMode,
  selectIsMobileFilterOpen,
  selectHasActiveFilters,
  selectActiveFilterCount,
  selectFilteredTrips,
  setSearchQuery,
  setDestination,
  setBudget,
  toggleCategory,
  toggleDuration,
  toggleDifficulty,
  resetFilters,
  setSortOption,
  openMobileFilter,
  closeMobileFilter,
  setInitialSearchParams,
} from '@/redux';
import {
  SearchX,
  Filter as FilterIcon,
  RotateCcw,
  ChevronDown,
  Search as SearchIcon,
  X,
} from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, FloatingBackground, TripCard } from '@/components/shared';

export const SearchPageContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';

  const filters = useAppSelector(selectSearchFilters);
  const sortOption = useAppSelector(selectSortOption);
  const viewMode = useAppSelector(selectViewMode);
  const isMobileFilterOpen = useAppSelector(selectIsMobileFilterOpen);
  const hasActiveFilters = useAppSelector(selectHasActiveFilters);
  const activeFilterCount = useAppSelector(selectActiveFilterCount);

  // Sync initial URL search parameters into Redux
  useEffect(() => {
    if (initialQuery || initialCategory) {
      dispatch(
        setInitialSearchParams({
          query: initialQuery,
          category: initialCategory,
        })
      );
    }
  }, [initialQuery, initialCategory, dispatch]);

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  // Lock body scroll when mobile filter drawer is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeMobileFilter());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  // Filtered & Sorted trips memoized from Redux selector
  const filteredTrips = useAppSelector((state) =>
    selectFilteredTrips(state, allSearchTrips)
  );

  const breadcrumbItems = useMemo(() => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Search', href: filters.searchQuery ? '/search' : undefined },
    ];
    if (filters.searchQuery) {
      items.push({ label: `"${filters.searchQuery}"` });
    }
    return items;
  }, [filters.searchQuery]);

  return (
    <main className="grow w-full pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative font-jakarta">
      {/* Background Floating Travel Icons */}
      <FloatingBackground fixed />

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} className="mb-2 sm:mb-3" />

      <div className="pb-16">
        <section className="w-full pb-16 pt-2">
          {/* Top Bar with Title and Grid/Map toggle */}
          <SearchTopBar />

          {/* Unified Inline Control Bar: Sticky on Scroll */}
          <div className="sticky top-[4.25rem] md:top-[4.75rem] z-30 w-full bg-[#f9f9f9]/95 backdrop-blur-md py-2.5 sm:py-3 px-4 sm:px-5 lg:px-6 border border-gray-200 rounded-xl shadow-xs mb-4 sm:mb-6 transition-all duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center gap-2.5 sm:gap-3 lg:gap-8 max-w-7xl mx-auto">
              {/* Left Column Header: Filters & Trips Count with justify-between (Aligned with Filter Sidebar width) */}
              <div className="w-full lg:w-[400px] shrink-0 flex items-center justify-between h-9 sm:h-11">
                {/* Desktop: Static Header */}
                <div className="hidden lg:flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-xs">
                    <FilterIcon className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-extrabold text-charcoal font-jakarta">
                    Filters
                  </h2>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline bg-transparent border-none cursor-pointer flex items-center gap-1 transition-colors ml-1.5"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </button>
                  )}
                </div>

                {/* Mobile / Tablet: Interactive Filter Button with Badge */}
                <div className="flex lg:hidden items-center gap-2">
                  <button
                    type="button"
                    onClick={() => dispatch(openMobileFilter())}
                    aria-label="Open Filters"
                    className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-white border border-gray-200/80 shadow-xs transition-all duration-200 cursor-pointer text-left hover:border-amber-400 active:scale-95"
                  >
                    <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-xs">
                      <FilterIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-extrabold text-charcoal font-jakarta">
                      Filters
                    </span>
                    {activeFilterCount > 0 && (
                      <span className="min-w-4 h-4 px-1 rounded-full bg-primary text-black font-black text-[9px] flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline bg-transparent border-none cursor-pointer flex items-center gap-1 transition-colors ml-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </button>
                  )}
                </div>

                {/* Trips Found text */}
                <p className="text-xs sm:text-[13px] font-bold text-gray-500 shrink-0 whitespace-nowrap font-jakarta">
                  Trips found : <span className="text-black font-extrabold">{filteredTrips.length}</span>
                </p>
              </div>

              {/* Right Column Header: Search Bar + Sort Dropdown */}
              <div className="flex-1 min-w-0 flex items-center gap-2 sm:gap-3 lg:gap-4 h-10 sm:h-11 w-full">
                {/* Search Bar */}
                <div className="relative flex-1 min-w-0">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    placeholder="Search trips, destinations, experiences..."
                    className="w-full h-10 sm:h-11 pl-8 sm:pl-9 pr-8 sm:pr-9 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm font-bold outline-none shadow-xs text-gray-800 transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-amber-500 focus:ring-3 focus:ring-amber-100"
                  />
                  {filters.searchQuery && (
                    <button
                      type="button"
                      onClick={() => dispatch(setSearchQuery(''))}
                      aria-label="Clear Search"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 rounded-full bg-transparent border-none cursor-pointer transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Sort By Dropdown */}
                <div className="relative shrink-0">
                  <select
                    aria-label="Sort Trips"
                    value={sortOption}
                    onChange={(e) => dispatch(setSortOption(e.target.value as SortOption))}
                    className="appearance-none h-10 sm:h-11 text-[11px] sm:text-xs font-bold bg-white border border-gray-300 rounded-xl pl-3 sm:pl-3.5 pr-7 sm:pr-8 outline-none cursor-pointer shadow-xs text-gray-800 transition-all hover:border-gray-400 focus:border-amber-400"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="duration-asc">Duration: Short to Long</option>
                    <option value="duration-desc">Duration: Long to Short</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Active Filters Quick Chips (Mobile & Desktop) */}
            {hasActiveFilters && (
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pt-2 max-w-7xl mx-auto">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 shrink-0">
                  Active:
                </span>
                {filters.destination && (
                  <span className="inline-flex items-center gap-1 py-1 px-2.5 rounded-lg bg-charcoal text-white border border-charcoal text-[11px] font-bold shrink-0 shadow-xs">
                    {filters.destination}
                    <button
                      type="button"
                      onClick={() => dispatch(setDestination(''))}
                      aria-label="Remove destination filter"
                      className="p-0.5 bg-transparent border-none cursor-pointer text-inherit inline-flex items-center justify-center opacity-80 hover:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.selectedCategories.map((cat) => (
                  <span key={cat} className="inline-flex items-center gap-1 py-1 px-2.5 rounded-lg bg-charcoal text-white border border-charcoal text-[11px] font-bold shrink-0 shadow-xs">
                    {cat}
                    <button
                      type="button"
                      onClick={() => dispatch(toggleCategory(cat))}
                      aria-label={`Remove ${cat} filter`}
                      className="p-0.5 bg-transparent border-none cursor-pointer text-inherit inline-flex items-center justify-center opacity-80 hover:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.selectedDurations.map((dur) => (
                  <span key={dur} className="inline-flex items-center gap-1 py-1 px-2.5 rounded-lg bg-charcoal text-white border border-charcoal text-[11px] font-bold shrink-0 shadow-xs">
                    {dur}
                    <button
                      type="button"
                      onClick={() => dispatch(toggleDuration(dur))}
                      aria-label={`Remove ${dur} filter`}
                      className="p-0.5 bg-transparent border-none cursor-pointer text-inherit inline-flex items-center justify-center opacity-80 hover:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.selectedDifficulties.map((diff) => (
                  <span key={diff} className="inline-flex items-center gap-1 py-1 px-2.5 rounded-lg bg-charcoal text-white border border-charcoal text-[11px] font-bold shrink-0 shadow-xs">
                    {diff}
                    <button
                      type="button"
                      onClick={() => dispatch(toggleDifficulty(diff))}
                      aria-label={`Remove ${diff} filter`}
                      className="p-0.5 bg-transparent border-none cursor-pointer text-inherit inline-flex items-center justify-center opacity-80 hover:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {(filters.minBudget !== null || filters.maxBudget !== null) && (
                  <span className="inline-flex items-center gap-1 py-1 px-2.5 rounded-lg bg-charcoal text-white border border-charcoal text-[11px] font-bold shrink-0 shadow-xs">
                    ₹{filters.minBudget || 0} - ₹{filters.maxBudget || '∞'}
                    <button
                      type="button"
                      onClick={() => dispatch(setBudget({ min: null, max: null }))}
                      aria-label="Remove budget filter"
                      className="p-0.5 bg-transparent border-none cursor-pointer text-inherit inline-flex items-center justify-center opacity-80 hover:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-gray-500 hover:text-gray-800 underline shrink-0 px-1.5 bg-transparent border-none cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Main Layout: Filters Sidebar + Results Listing */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            {/* Desktop Sidebar Filters (Hidden on Mobile/Tablet) */}
            <div className="hidden lg:block w-[280px] xl:w-[300px] overflow-visible lg:sticky lg:top-[9rem] shrink-0 z-10 max-h-[calc(100vh-10.5rem)] overflow-y-auto scrollbar-hide">
              <SearchFilterSidebar />
            </div>

            {/* Results Column */}
            <div className="flex-1 min-w-0 z-0">
              {/* View Mode Switching: Grid or Map */}
              {viewMode === 'map' ? (
                <SearchMapView trips={filteredTrips} />
              ) : filteredTrips.length === 0 ? (
                /* Empty state */
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center flex flex-col items-center justify-center shadow-xs">
                  <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                    <SearchX className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    No matching adventures found
                  </h3>
                  <p className="text-sm text-gray-500 max-w-md mb-6 leading-relaxed">
                    Try relaxing your filters or searching for another
                    destination or activity.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="py-2.5 px-6 bg-primary hover:bg-black text-black hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl border-none transition-all duration-200 shadow-xs cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                /* 2-col on mobile, 2-col on md/lg, 3-col on xl */
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6 w-full">
                  {filteredTrips.map((trip, idx) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      priority={idx < 4}
                      fullWidth
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Mobile Filter Drawer / Bottom Sheet */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div
            onClick={() => dispatch(closeMobileFilter())}
            aria-hidden="true"
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Bottom Sheet Modal */}
          <div className="relative w-full max-h-[88vh] bg-white rounded-t-[28px] shadow-2xl flex flex-col overflow-hidden z-10 animate-fade-in-up">
            {/* Drawer Handle */}
            <div className="flex justify-center pt-3 pb-1 cursor-grab">
              <div className="w-12 h-1.5 rounded-full bg-gray-300" />
            </div>

            {/* Drawer Header */}
            <div className="flex items-center justify-between p-3 sm:px-5 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-xs">
                  <FilterIcon className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-charcoal font-jakarta">
                    Filters
                  </h2>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {filteredTrips.length} {filteredTrips.length === 1 ? 'trip' : 'trips'} found
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 underline py-1 px-2 bg-transparent border-none cursor-pointer"
                  >
                    Reset all
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => dispatch(closeMobileFilter())}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 bg-transparent border-none cursor-pointer transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Body (Scrollable Filters) */}
            <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-hide">
              <SearchFilterSidebar className="border-0 shadow-none p-0" />
            </div>

            {/* Drawer Footer CTA */}
            <div className="p-4 border-t border-gray-100 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.05)] flex items-center gap-3">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 bg-transparent hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                type="button"
                onClick={() => dispatch(closeMobileFilter())}
                className="flex-[2] py-3.5 px-4 rounded-xl bg-primary hover:bg-black text-black hover:text-white font-extrabold text-sm shadow-[0_4px_12px_rgba(244,140,6,0.25)] transition-all text-center border-none cursor-pointer"
              >
                Show {filteredTrips.length} {filteredTrips.length === 1 ? 'Adventure' : 'Adventures'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
