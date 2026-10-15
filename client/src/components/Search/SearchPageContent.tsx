'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchTopBar } from './SearchTopBar';
import { SearchFilterSidebar } from './SearchFilterSidebar';
import { SearchTripCard } from './SearchTripCard';
import { SearchMapView } from './SearchMapView';
import { allSearchTrips } from './mockSearchTrips';
import { FilterState, SortOption, ViewMode, TripItem } from './types';
import {
  SearchX,
  Filter as FilterIcon,
  RotateCcw,
  ChevronDown,
  Search as SearchIcon,
  X,
} from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, FloatingBackground } from '@/components/shared';
import { typography } from '@/theme/typography';

export const SearchPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: initialQuery,
    destination: '',
    minBudget: null,
    maxBudget: null,
    selectedCategories: initialCategory ? [initialCategory] : [],
    selectedDurations: [],
    selectedDifficulties: [],
    selectedDate: null,
  });

  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      destination: '',
      minBudget: null,
      maxBudget: null,
      selectedCategories: [],
      selectedDurations: [],
      selectedDifficulties: [],
      selectedDate: null,
    });
  };

  const hasActiveFilters = useMemo(() => {
    return Boolean(
      filters.destination.trim() ||
      filters.minBudget !== null ||
      filters.maxBudget !== null ||
      filters.selectedCategories.length > 0 ||
      filters.selectedDurations.length > 0 ||
      filters.selectedDifficulties.length > 0 ||
      filters.selectedDate !== null
    );
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.destination.trim()) count++;
    if (filters.minBudget !== null || filters.maxBudget !== null) count++;
    count += filters.selectedCategories.length;
    count += filters.selectedDurations.length;
    count += filters.selectedDifficulties.length;
    if (filters.selectedDate !== null) count++;
    return count;
  }, [filters]);

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
        setIsMobileFilterOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered & Sorted trips
  const filteredTrips = useMemo(() => {
    let result: TripItem[] = [...allSearchTrips];

    // Search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.destination.toLowerCase().includes(q) ||
          t.tags.some((tag) =>
            (typeof tag === 'string' ? tag : tag.label).toLowerCase().includes(q)
          )
      );
    }

    // Destination filter
    if (filters.destination.trim()) {
      const dest = filters.destination.toLowerCase().trim();
      result = result.filter((t) => t.destination.toLowerCase().includes(dest));
    }

    // Budget range filter
    if (filters.minBudget !== null) {
      result = result.filter((t) => t.price >= (filters.minBudget as number));
    }
    if (filters.maxBudget !== null) {
      result = result.filter((t) => t.price <= (filters.maxBudget as number));
    }

    // Categories filter
    if (filters.selectedCategories.length > 0) {
      result = result.filter((t) =>
        filters.selectedCategories.some((cat) =>
          t.tags.some(
            (tag) =>
              (typeof tag === 'string' ? tag : tag.label).toLowerCase() ===
              cat.toLowerCase()
          )
        )
      );
    }

    // Duration filter
    if (filters.selectedDurations.length > 0) {
      result = result.filter((t) => {
        const dLower = t.duration.toLowerCase();
        return filters.selectedDurations.some((dur) => {
          if (dur === '1-3 Days') {
            return (
              dLower.includes('1 day') ||
              dLower.includes('2 day') ||
              dLower.includes('3 day') ||
              dLower.includes('1 night') ||
              dLower.includes('2 night') ||
              dLower.includes('3 night')
            );
          }
          if (dur === '4-7 Days') {
            return (
              dLower.includes('4 day') ||
              dLower.includes('5 day') ||
              dLower.includes('6 day') ||
              dLower.includes('7 day') ||
              dLower.includes('4 night') ||
              dLower.includes('5 night') ||
              dLower.includes('6 night') ||
              dLower.includes('7 night')
            );
          }
          if (dur === '8+ Days') {
            return (
              dLower.includes('8 day') ||
              dLower.includes('9 day') ||
              dLower.includes('10 day') ||
              dLower.includes('8 night') ||
              dLower.includes('9 night')
            );
          }
          return false;
        });
      });
    }

    // Difficulty filter
    if (filters.selectedDifficulties.length > 0) {
      result = result.filter((t) =>
        filters.selectedDifficulties.some((diff) =>
          t.tags.some((tag) => {
            const label = (
              typeof tag === 'string' ? tag : tag.label
            ).toLowerCase();
            return label === diff.toLowerCase();
          })
        )
      );
    }

    // Sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'duration-asc':
        result.sort((a, b) => a.duration.localeCompare(b.duration));
        break;
      case 'duration-desc':
        result.sort((a, b) => b.duration.localeCompare(a.duration));
        break;
      case 'newest':
      default:
        // maintain default ranking
        break;
    }

    return result;
  }, [filters, sortOption]);

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
    <main className="grow w-full pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Floating Travel Icons */}
      <FloatingBackground fixed />

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} className="mb-2 sm:mb-3" />

      <div className="pb-16">
        <section className="w-full pb-16 pt-2">
          {/* Top Bar with Title and Grid/Map toggle */}
          <SearchTopBar
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* Unified Inline Control Bar: Sticky on Scroll */}
          <div className="sticky top-16 md:top-[4.5rem] z-30 bg-[#FFFBF0]/95 backdrop-blur-md py-2.5 sm:py-3 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b border-amber-200/40 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] mb-4 sm:mb-6 transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center gap-2.5 sm:gap-3 lg:gap-8 max-w-7xl mx-auto">
              {/* Left Column Header: Filters & Trips Count with justify-between (Aligned with Filter Sidebar width) */}
              <div className="w-full lg:w-[400px] shrink-0 flex items-center justify-between h-9 sm:h-11">
                {/* Desktop: Static Header */}
                <div className="hidden lg:flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300/70 text-amber-600 flex items-center justify-center shrink-0 shadow-xs">
                    <FilterIcon className="w-4 h-4" />
                  </div>
                  <h2
                    className="text-lg font-extrabold text-[#191c1d]"
                    style={{ fontFamily: typography.fonts.jakarta }}
                  >
                    Filters
                  </h2>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline cursor-pointer flex items-center gap-1 transition-colors ml-1.5"
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
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-gray-200/80 shadow-xs hover:border-amber-400 active:scale-95 transition-all text-left"
                    aria-label="Open Filters"
                  >
                    <div className="w-6 h-6 rounded-md bg-amber-100 border border-amber-300/70 text-amber-600 flex items-center justify-center shrink-0">
                      <FilterIcon className="w-3.5 h-3.5" />
                    </div>
                    <span
                      className="text-xs sm:text-sm font-extrabold text-[#191c1d]"
                      style={{ fontFamily: typography.fonts.jakarta }}
                    >
                      Filters
                    </span>
                    {activeFilterCount > 0 && (
                      <span className="min-w-4 h-4 px-1 rounded-full bg-amber-500 text-black font-black text-[9px] flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline cursor-pointer flex items-center gap-1 transition-colors ml-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </button>
                  )}
                </div>

                {/* Trips Found text */}
                <p
                  className="text-xs sm:text-[13px] font-bold text-gray-500 shrink-0 whitespace-nowrap"
                  style={{ fontFamily: typography.fonts.jakarta }}
                >
                  Trips found :{' '}
                  <span className="text-black font-extrabold">
                    {filteredTrips.length}
                  </span>
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
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
                    }
                    placeholder="Search trips, destinations, experiences..."
                    className="w-full h-10 sm:h-11 pl-8 sm:pl-9 pr-8 sm:pr-9 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-bold outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-xs text-gray-800 placeholder:text-gray-400"
                  />
                  {filters.searchQuery && (
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, searchQuery: '' }))
                      }
                      aria-label="Clear Search"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 rounded-full transition-colors"
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
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="appearance-none h-10 sm:h-11 text-[11px] sm:text-xs font-bold bg-white border border-gray-200 rounded-xl pl-3 pr-7 sm:pl-3.5 sm:pr-8 outline-none focus:border-amber-400 cursor-pointer shadow-xs text-gray-800 transition-all hover:border-gray-300"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="duration-asc">Duration: Short to Long</option>
                    <option value="duration-desc">Duration: Long to Short</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100/80 text-amber-900 border border-amber-200 text-[11px] font-bold shrink-0">
                    {filters.destination}
                    <button
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, destination: '' }))}
                      className="p-0.5 hover:text-black cursor-pointer"
                      aria-label="Remove destination filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100/80 text-amber-900 border border-amber-200 text-[11px] font-bold shrink-0"
                  >
                    {cat}
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          selectedCategories: prev.selectedCategories.filter((c) => c !== cat),
                        }))
                      }
                      className="p-0.5 hover:text-black cursor-pointer"
                      aria-label={`Remove ${cat} filter`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.selectedDurations.map((dur) => (
                  <span
                    key={dur}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100/80 text-amber-900 border border-amber-200 text-[11px] font-bold shrink-0"
                  >
                    {dur}
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          selectedDurations: prev.selectedDurations.filter((d) => d !== dur),
                        }))
                      }
                      className="p-0.5 hover:text-black cursor-pointer"
                      aria-label={`Remove ${dur} filter`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.selectedDifficulties.map((diff) => (
                  <span
                    key={diff}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100/80 text-amber-900 border border-amber-200 text-[11px] font-bold shrink-0"
                  >
                    {diff}
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          selectedDifficulties: prev.selectedDifficulties.filter((d) => d !== diff),
                        }))
                      }
                      className="p-0.5 hover:text-black cursor-pointer"
                      aria-label={`Remove ${diff} filter`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {(filters.minBudget !== null || filters.maxBudget !== null) && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100/80 text-amber-900 border border-amber-200 text-[11px] font-bold shrink-0">
                    ₹{filters.minBudget || 0} - ₹{filters.maxBudget || '∞'}
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, minBudget: null, maxBudget: null }))
                      }
                      className="p-0.5 hover:text-black cursor-pointer"
                      aria-label="Remove budget filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-gray-500 hover:text-black underline shrink-0 px-1.5 cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Main Layout: Filters Sidebar + Results Listing */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            {/* Desktop Sidebar Filters (Hidden on Mobile/Tablet) */}
            <div className="hidden lg:block w-[400px] overflow-visible lg:sticky lg:top-[9rem] shrink-0 z-10 max-h-[calc(100vh-10.5rem)] overflow-y-auto scrollbar-hide">
              <SearchFilterSidebar
                filters={filters}
                onFilterChange={setFilters}
              />
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
                  <p className="text-sm text-gray-500 max-w-md mb-6">
                    Try relaxing your filters or searching for another
                    destination or activity.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 bg-amber-400 hover:bg-black hover:text-white text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                /* 2-col on mobile, 2-col on md/lg, 3-col on xl */
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6 w-full">
                  {filteredTrips.map((trip, idx) => (
                    <SearchTripCard
                      key={trip.id}
                      trip={trip}
                      priority={idx < 4}
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
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />

          {/* Bottom Sheet Modal */}
          <div className="relative w-full max-h-[88vh] bg-white rounded-t-[28px] shadow-2xl flex flex-col overflow-hidden z-10 animate-fade-in-up">
            {/* Drawer Handle */}
            <div className="flex justify-center pt-3 pb-1 cursor-grab">
              <div className="w-12 h-1.5 rounded-full bg-gray-300" />
            </div>

            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300/70 text-amber-600 flex items-center justify-center shrink-0 shadow-xs">
                  <FilterIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    className="text-base font-extrabold text-[#191c1d]"
                    style={{ fontFamily: typography.fonts.jakarta }}
                  >
                    Filters
                  </h3>
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
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 underline px-2 py-1"
                  >
                    Reset all
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Body (Scrollable Filters) */}
            <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-hide">
              <SearchFilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                className="border-0 shadow-none p-0"
              />
            </div>

            {/* Drawer Footer CTA */}
            <div className="p-4 border-t border-gray-100 bg-white shadow-lg flex items-center gap-3">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors text-center"
                >
                  Clear All
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-[2] py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-black hover:text-white text-black font-extrabold text-sm shadow-md transition-all text-center cursor-pointer"
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
