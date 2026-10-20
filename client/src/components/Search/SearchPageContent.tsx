'use client';

import React, { useMemo, useEffect } from 'react';
import styled from 'styled-components';
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
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

const MainWrapper = styled.main`
  flex-grow: 1;
  width: 100%;
  padding-top: 1.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;

  @media (min-width: 640px) {
    padding-top: 2rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const StickyBar = styled.div`
  position: sticky;
  top: 4.25rem;
  z-index: 30;
  width: 100%;
  background-color: rgba(249, 249, 249, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 0.625rem 1rem;
  border: 1px solid ${colors.gray[200]};
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.03);
  margin-bottom: 1rem;
  transition: all 0.2s ease;

  @media (min-width: 640px) {
    padding: 0.75rem 1.25rem;
    margin-bottom: 1.5rem;
  }
  @media (min-width: 768px) {
    top: 4.75rem;
  }
  @media (min-width: 1024px) {
    padding: 0.75rem 1.5rem;
  }
`;

const FilterIconSquare = styled.div<{ $small?: boolean }>`
  width: ${({ $small }) => ($small ? '1.5rem' : '2rem')};
  height: ${({ $small }) => ($small ? '1.5rem' : '2rem')};
  border-radius: ${({ $small }) => ($small ? '0.375rem' : '0.5rem')};
  background-color: ${colors.amber[100]};
  color: ${colors.amber[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const SectionHeaderTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 800;
  color: ${colors.charcoal};
  font-family: ${typography.fonts.jakarta};
`;

const ResetButton = styled.button`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${colors.amber[600]};
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.15s ease;
  margin-left: 0.375rem;

  &:hover {
    color: ${colors.amber[700]};
    text-decoration: underline;
  }
`;

const MobileFilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.75rem;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[200]}CC;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  cursor: pointer;
  text-align: left;

  &:hover {
    border-color: ${colors.amber[400]};
  }
  &:active {
    transform: scale(0.95);
  }
`;

const ActiveFilterBadge = styled.span`
  min-width: 1rem;
  height: 1rem;
  padding: 0 0.25rem;
  border-radius: 9999px;
  background-color: ${colors.amber[500]};
  color: ${colors.black};
  font-weight: 900;
  font-size: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TripsCountText = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${colors.gray[500]};
  flex-shrink: 0;
  white-space: nowrap;
  font-family: ${typography.fonts.jakarta};

  @media (min-width: 640px) {
    font-size: 13px;
  }

  span {
    color: ${colors.black};
    font-weight: 800;
  }
`;

const SearchInputBox = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
`;

const StyledSearchInput = styled.input`
  width: 100%;
  height: 2.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[300]};
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  outline: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
  color: ${colors.gray[800]};
  transition: all 0.2s ease;

  &::placeholder {
    color: ${colors.gray[400]};
  }

  &:hover {
    border-color: ${colors.gray[400]};
  }

  &:focus {
    border-color: ${colors.amber[500]};
    box-shadow: 0 0 0 3px ${colors.amber[100]};
  }

  @media (min-width: 640px) {
    height: 2.75rem;
    padding-left: 2.25rem;
    padding-right: 2.25rem;
    font-size: 0.875rem;
  }
`;

const ClearInputBtn = styled.button`
  position: absolute;
  right: 0.625rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.25rem;
  color: ${colors.gray[400]};
  border-radius: 9999px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: ${colors.gray[700]};
  }
`;

const SortSelectBox = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const StyledSortSelect = styled.select`
  appearance: none;
  height: 2.5rem;
  font-size: 11px;
  font-weight: 700;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[300]};
  border-radius: 0.75rem;
  padding-left: 0.75rem;
  padding-right: 1.75rem;
  outline: none;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  color: ${colors.gray[800]};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.gray[300]};
  }
  &:focus {
    border-color: ${colors.amber[400]};
  }

  @media (min-width: 640px) {
    height: 2.75rem;
    font-size: 0.75rem;
    padding-left: 0.875rem;
    padding-right: 2rem;
  }
`;

const FilterPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.625rem;
  border-radius: 0.5rem;
  background-color: ${colors.charcoal};
  color: ${colors.white};
  border: 1px solid ${colors.charcoal};
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  button {
    padding: 0.125rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
    transition: opacity 0.15s ease;

    &:hover {
      opacity: 1;
      color: ${colors.white};
    }
  }
`;

const EmptyStateContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 1rem;
  border: 1px solid ${colors.gray[100]};
  padding: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const EmptyIconBox = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 9999px;
  background-color: ${colors.amber[50]};
  color: ${colors.amber[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const EmptyActionButton = styled.button`
  padding: 0.625rem 1.5rem;
  background-color: ${colors.amber[400]};
  color: ${colors.black};
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.75rem;
  border: none;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;

  &:hover {
    background-color: ${colors.black};
    color: ${colors.white};
  }
`;

const DrawerBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: opacity 0.2s ease;
`;

const DrawerModal = styled.div`
  position: relative;
  width: 100%;
  max-height: 88vh;
  background-color: ${colors.white};
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 10;
`;

const DrawerHandle = styled.div`
  width: 3rem;
  height: 0.375rem;
  border-radius: 9999px;
  background-color: ${colors.gray[300]};
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid ${colors.gray[100]};
`;

const DrawerFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid ${colors.gray[100]};
  background-color: ${colors.white};
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const DrawerClearButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${colors.gray[200]};
  font-size: 0.75rem;
  font-weight: 700;
  color: ${colors.gray[700]};
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${colors.gray[50]};
  }
`;

const DrawerApplyButton = styled.button`
  flex: 2;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  background-color: ${colors.amber[400]};
  color: ${colors.black};
  font-weight: 800;
  font-size: 0.875rem;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);
  transition: all 0.2s ease;
  text-align: center;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${colors.black};
    color: ${colors.white};
  }
`;

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
    <MainWrapper>
      {/* Background Floating Travel Icons */}
      <FloatingBackground fixed />

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} className="mb-2 sm:mb-3" />

      <div className="pb-16">
        <section className="w-full pb-16 pt-2">
          {/* Top Bar with Title and Grid/Map toggle */}
          <SearchTopBar />

          {/* Unified Inline Control Bar: Sticky on Scroll */}
          <StickyBar>
            <div className="flex flex-col lg:flex-row lg:items-center gap-2.5 sm:gap-3 lg:gap-8 max-w-7xl mx-auto">
              {/* Left Column Header: Filters & Trips Count with justify-between (Aligned with Filter Sidebar width) */}
              <div className="w-full lg:w-[400px] shrink-0 flex items-center justify-between h-9 sm:h-11">
                {/* Desktop: Static Header */}
                <div className="hidden lg:flex items-center gap-2.5">
                  <FilterIconSquare>
                    <FilterIcon className="w-4 h-4" />
                  </FilterIconSquare>
                  <SectionHeaderTitle>
                    Filters
                  </SectionHeaderTitle>

                  {hasActiveFilters && (
                    <ResetButton
                      type="button"
                      onClick={handleResetFilters}
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </ResetButton>
                  )}
                </div>

                {/* Mobile / Tablet: Interactive Filter Button with Badge */}
                <div className="flex lg:hidden items-center gap-2">
                  <MobileFilterButton
                    type="button"
                    onClick={() => dispatch(openMobileFilter())}
                    aria-label="Open Filters"
                  >
                    <FilterIconSquare $small>
                      <FilterIcon className="w-3.5 h-3.5" />
                    </FilterIconSquare>
                    <span
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 800,
                        color: colors.charcoal,
                        fontFamily: typography.fonts.jakarta,
                      }}
                    >
                      Filters
                    </span>
                    {activeFilterCount > 0 && (
                      <ActiveFilterBadge>
                        {activeFilterCount}
                      </ActiveFilterBadge>
                    )}
                  </MobileFilterButton>

                  {hasActiveFilters && (
                    <ResetButton
                      type="button"
                      onClick={handleResetFilters}
                      style={{ marginLeft: '0.25rem' }}
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </ResetButton>
                  )}
                </div>

                {/* Trips Found text */}
                <TripsCountText>
                  Trips found : <span>{filteredTrips.length}</span>
                </TripsCountText>
              </div>

              {/* Right Column Header: Search Bar + Sort Dropdown */}
              <div className="flex-1 min-w-0 flex items-center gap-2 sm:gap-3 lg:gap-4 h-10 sm:h-11 w-full">
                {/* Search Bar */}
                <SearchInputBox>
                  <SearchIcon
                    style={{
                      position: 'absolute',
                      left: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '1rem',
                      height: '1rem',
                      color: colors.gray[400],
                      pointerEvents: 'none',
                    }}
                  />
                  <StyledSearchInput
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    placeholder="Search trips, destinations, experiences..."
                  />
                  {filters.searchQuery && (
                    <ClearInputBtn
                      type="button"
                      onClick={() => dispatch(setSearchQuery(''))}
                      aria-label="Clear Search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </ClearInputBtn>
                  )}
                </SearchInputBox>

                {/* Sort By Dropdown */}
                <SortSelectBox>
                  <StyledSortSelect
                    aria-label="Sort Trips"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="duration-asc">Duration: Short to Long</option>
                    <option value="duration-desc">Duration: Long to Short</option>
                  </StyledSortSelect>
                  <ChevronDown
                    style={{
                      position: 'absolute',
                      right: '0.625rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '1rem',
                      height: '1rem',
                      color: colors.gray[500],
                      pointerEvents: 'none',
                    }}
                  />
                </SortSelectBox>
              </div>
            </div>

            {/* Active Filters Quick Chips (Mobile & Desktop) */}
            {hasActiveFilters && (
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pt-2 max-w-7xl mx-auto">
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: colors.gray[400],
                    flexShrink: 0,
                  }}
                >
                  Active:
                </span>
                {filters.destination && (
                  <FilterPill>
                    {filters.destination}
                    <button
                      type="button"
                      onClick={() => dispatch(setDestination(''))}
                      aria-label="Remove destination filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </FilterPill>
                )}
                {filters.selectedCategories.map((cat) => (
                  <FilterPill key={cat}>
                    {cat}
                    <button
                      type="button"
                      onClick={() => dispatch(toggleCategory(cat))}
                      aria-label={`Remove ${cat} filter`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </FilterPill>
                ))}
                {filters.selectedDurations.map((dur) => (
                  <FilterPill key={dur}>
                    {dur}
                    <button
                      type="button"
                      onClick={() => dispatch(toggleDuration(dur))}
                      aria-label={`Remove ${dur} filter`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </FilterPill>
                ))}
                {filters.selectedDifficulties.map((diff) => (
                  <FilterPill key={diff}>
                    {diff}
                    <button
                      type="button"
                      onClick={() => dispatch(toggleDifficulty(diff))}
                      aria-label={`Remove ${diff} filter`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </FilterPill>
                ))}
                {(filters.minBudget !== null || filters.maxBudget !== null) && (
                  <FilterPill>
                    ₹{filters.minBudget || 0} - ₹{filters.maxBudget || '∞'}
                    <button
                      type="button"
                      onClick={() => dispatch(setBudget({ min: null, max: null }))}
                      aria-label="Remove budget filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </FilterPill>
                )}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: colors.gray[500],
                    textDecoration: 'underline',
                    flexShrink: 0,
                    padding: '0 0.375rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Clear all
                </button>
              </div>
            )}
          </StickyBar>

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
                <EmptyStateContainer>
                  <EmptyIconBox>
                    <SearchX className="w-8 h-8" />
                  </EmptyIconBox>
                  <h3
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: colors.gray[900],
                      marginBottom: '0.25rem',
                    }}
                  >
                    No matching adventures found
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: colors.gray[500],
                      maxWidth: '28rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    Try relaxing your filters or searching for another
                    destination or activity.
                  </p>
                  <EmptyActionButton
                    type="button"
                    onClick={handleResetFilters}
                  >
                    Reset All Filters
                  </EmptyActionButton>
                </EmptyStateContainer>
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
          <DrawerBackdrop
            onClick={() => dispatch(closeMobileFilter())}
            aria-hidden="true"
          />

          {/* Bottom Sheet Modal */}
          <DrawerModal className="animate-fade-in-up">
            {/* Drawer Handle */}
            <div className="flex justify-center pt-3 pb-1 cursor-grab">
              <DrawerHandle />
            </div>

            {/* Drawer Header */}
            <DrawerHeader>
              <div className="flex items-center gap-2.5">
                <FilterIconSquare>
                  <FilterIcon className="w-4 h-4" />
                </FilterIconSquare>
                <div>
                  <SectionHeaderTitle style={{ fontSize: '1rem' }}>
                    Filters
                  </SectionHeaderTitle>
                  <p
                    style={{
                      fontSize: '11px',
                      color: colors.gray[500],
                      fontWeight: 500,
                    }}
                  >
                    {filteredTrips.length} {filteredTrips.length === 1 ? 'trip' : 'trips'} found
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: colors.amber[600],
                      textDecoration: 'underline',
                      padding: '0.25rem 0.5rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Reset all
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => dispatch(closeMobileFilter())}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '9999px',
                    color: colors.gray[500],
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </DrawerHeader>

            {/* Drawer Body (Scrollable Filters) */}
            <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-hide">
              <SearchFilterSidebar
                className="border-0 shadow-none p-0"
              />
            </div>

            {/* Drawer Footer CTA */}
            <DrawerFooter>
              {hasActiveFilters && (
                <DrawerClearButton
                  type="button"
                  onClick={handleResetFilters}
                >
                  Clear All
                </DrawerClearButton>
              )}
              <DrawerApplyButton
                type="button"
                onClick={() => dispatch(closeMobileFilter())}
              >
                Show {filteredTrips.length} {filteredTrips.length === 1 ? 'Adventure' : 'Adventures'}
              </DrawerApplyButton>
            </DrawerFooter>
          </DrawerModal>
        </div>
      )}
    </MainWrapper>
  );
};
