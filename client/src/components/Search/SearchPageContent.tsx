'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchHero } from './SearchHero';
import { SearchTopBar } from './SearchTopBar';
import { SearchFilterSidebar } from './SearchFilterSidebar';
import { SearchTripCard } from './SearchTripCard';
import { SearchMapView } from './SearchMapView';
import { allSearchTrips } from './mockSearchTrips';
import { FilterState, SortOption, ViewMode, TripItem } from './types';
import { SearchX } from 'lucide-react';

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

  return (
    <main className="grow w-full pt-6 px-4 md:px-8 max-w-[1440px] mx-auto">
      {/* Search Hero Banner */}
      <SearchHero />

      <div className="pb-16">
        <section className="w-full pb-16 pt-8">
          {/* Top Bar with Title, Grid/Map toggle, and Search Input */}
          <SearchTopBar
            searchQuery={filters.searchQuery}
            onSearchChange={(query) =>
              setFilters((prev) => ({ ...prev, searchQuery: query }))
            }
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* Main Layout: Filters Sidebar + Results Listing */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-auto overflow-visible lg:sticky lg:top-8 shrink-0 z-10">
              <SearchFilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onResetFilters={handleResetFilters}
              />
            </div>

            {/* Results Column */}
            <div className="flex-grow w-full z-0">
              {/* Sort Bar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {filteredTrips.length}{' '}
                  {filteredTrips.length === 1 ? 'trip' : 'trips'} found
                </p>

                <select
                  aria-label="Sort Trips"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="text-xs font-bold bg-white border border-gray-100 rounded-xl px-4 py-2.5 outline-none focus:border-amber-400 cursor-pointer shadow-sm text-gray-800"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="duration-asc">Duration: Short to Long</option>
                  <option value="duration-desc">Duration: Long to Short</option>
                </select>
              </div>

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
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6 w-full max-w-7xl mx-auto">
                  {filteredTrips.map((trip) => (
                    <SearchTripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
