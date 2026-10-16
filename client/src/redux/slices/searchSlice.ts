import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { TripItem } from '@/components/shared';

export type SortOption =
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'duration-asc'
  | 'duration-desc';

export type ViewMode = 'grid' | 'map';

export interface FilterState {
  searchQuery: string;
  destination: string;
  minBudget: number | null;
  maxBudget: number | null;
  selectedCategories: string[];
  selectedDurations: string[];
  selectedDifficulties: string[];
  selectedDate: number | null;
}

export interface SearchState {
  filters: FilterState;
  sortOption: SortOption;
  viewMode: ViewMode;
  isMobileFilterOpen: boolean;
}

export const initialFilterState: FilterState = {
  searchQuery: '',
  destination: '',
  minBudget: null,
  maxBudget: null,
  selectedCategories: [],
  selectedDurations: [],
  selectedDifficulties: [],
  selectedDate: null,
};

const initialState: SearchState = {
  filters: initialFilterState,
  sortOption: 'newest',
  viewMode: 'grid',
  isMobileFilterOpen: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
    },
    setDestination: (state, action: PayloadAction<string>) => {
      state.filters.destination = action.payload;
    },
    setBudget: (
      state,
      action: PayloadAction<{ min: number | null; max: number | null }>
    ) => {
      state.filters.minBudget = action.payload.min;
      state.filters.maxBudget = action.payload.max;
    },
    setMinBudget: (state, action: PayloadAction<number | null>) => {
      state.filters.minBudget = action.payload;
    },
    setMaxBudget: (state, action: PayloadAction<number | null>) => {
      state.filters.maxBudget = action.payload;
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const cat = action.payload;
      const exists = state.filters.selectedCategories.includes(cat);
      state.filters.selectedCategories = exists
        ? state.filters.selectedCategories.filter((c) => c !== cat)
        : [...state.filters.selectedCategories, cat];
    },
    toggleDuration: (state, action: PayloadAction<string>) => {
      const dur = action.payload;
      const exists = state.filters.selectedDurations.includes(dur);
      state.filters.selectedDurations = exists
        ? state.filters.selectedDurations.filter((d) => d !== dur)
        : [...state.filters.selectedDurations, dur];
    },
    toggleDifficulty: (state, action: PayloadAction<string>) => {
      const diff = action.payload;
      const exists = state.filters.selectedDifficulties.includes(diff);
      state.filters.selectedDifficulties = exists
        ? state.filters.selectedDifficulties.filter((d) => d !== diff)
        : [...state.filters.selectedDifficulties, diff];
    },
    setSelectedDate: (state, action: PayloadAction<number | null>) => {
      state.filters.selectedDate = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        ...initialFilterState,
        // preserve searchQuery if intentional, or full reset
        searchQuery: '',
      };
    },
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    setIsMobileFilterOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileFilterOpen = action.payload;
    },
    openMobileFilter: (state) => {
      state.isMobileFilterOpen = true;
    },
    closeMobileFilter: (state) => {
      state.isMobileFilterOpen = false;
    },
    toggleMobileFilter: (state) => {
      state.isMobileFilterOpen = !state.isMobileFilterOpen;
    },
    setInitialSearchParams: (
      state,
      action: PayloadAction<{ query?: string; category?: string }>
    ) => {
      const { query, category } = action.payload;
      if (query !== undefined) {
        state.filters.searchQuery = query;
      }
      if (category && category.trim()) {
        if (!state.filters.selectedCategories.includes(category)) {
          state.filters.selectedCategories = [category];
        }
      }
    },
  },
});

export const {
  setFilters,
  setSearchQuery,
  setDestination,
  setBudget,
  setMinBudget,
  setMaxBudget,
  toggleCategory,
  toggleDuration,
  toggleDifficulty,
  setSelectedDate,
  resetFilters,
  setSortOption,
  setViewMode,
  setIsMobileFilterOpen,
  openMobileFilter,
  closeMobileFilter,
  toggleMobileFilter,
  setInitialSearchParams,
} = searchSlice.actions;

// Pure filter & sort business logic (SOLID: Single Responsibility & DRY)
export const filterAndSortTrips = (
  trips: TripItem[],
  filters: FilterState,
  sortOption: SortOption
): TripItem[] => {
  if (!trips || !Array.isArray(trips)) return [];

  let result: TripItem[] = [...trips];

  // Search query filter (matches title, destination, or tags)
  if (filters?.searchQuery?.trim()) {
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
  if (filters?.destination?.trim()) {
    const dest = filters.destination.toLowerCase().trim();
    result = result.filter((t) => t.destination.toLowerCase().includes(dest));
  }

  // Budget range filter
  if (filters?.minBudget !== null && filters?.minBudget !== undefined) {
    result = result.filter((t) => t.price >= (filters.minBudget as number));
  }
  if (filters?.maxBudget !== null && filters?.maxBudget !== undefined) {
    result = result.filter((t) => t.price <= (filters.maxBudget as number));
  }

  // Categories filter
  if (filters?.selectedCategories && filters.selectedCategories.length > 0) {
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
  if (filters?.selectedDurations && filters.selectedDurations.length > 0) {
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
  if (filters?.selectedDifficulties && filters.selectedDifficulties.length > 0) {
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
      // Keep default curation ranking
      break;
  }

  return result;
};

// Defensive Selectors for Fast Refresh / Prerender Resilience
export const selectSearchState = (state: { search?: SearchState }) => state?.search;

export const selectSearchFilters = (state: { search?: SearchState }): FilterState =>
  state?.search?.filters ?? initialFilterState;

export const selectSearchQuery = (state: { search?: SearchState }): string =>
  state?.search?.filters?.searchQuery ?? '';

export const selectSearchDestination = (state: { search?: SearchState }): string =>
  state?.search?.filters?.destination ?? '';

export const selectSearchBudget = (state: { search?: SearchState }) => ({
  minBudget: state?.search?.filters?.minBudget ?? null,
  maxBudget: state?.search?.filters?.maxBudget ?? null,
});

export const selectSelectedCategories = (state: { search?: SearchState }): string[] =>
  state?.search?.filters?.selectedCategories ?? [];

export const selectSelectedDurations = (state: { search?: SearchState }): string[] =>
  state?.search?.filters?.selectedDurations ?? [];

export const selectSelectedDifficulties = (state: { search?: SearchState }): string[] =>
  state?.search?.filters?.selectedDifficulties ?? [];

export const selectSelectedDate = (state: { search?: SearchState }): number | null =>
  state?.search?.filters?.selectedDate ?? null;

export const selectSortOption = (state: { search?: SearchState }): SortOption =>
  state?.search?.sortOption ?? 'newest';

export const selectViewMode = (state: { search?: SearchState }): ViewMode =>
  state?.search?.viewMode ?? 'grid';

export const selectIsMobileFilterOpen = (state: { search?: SearchState }): boolean =>
  state?.search?.isMobileFilterOpen ?? false;

export const selectHasActiveFilters = (state: { search?: SearchState }): boolean => {
  const filters = state?.search?.filters;
  if (!filters) return false;
  return Boolean(
    filters.destination?.trim() ||
      filters.minBudget !== null ||
      filters.maxBudget !== null ||
      (filters.selectedCategories && filters.selectedCategories.length > 0) ||
      (filters.selectedDurations && filters.selectedDurations.length > 0) ||
      (filters.selectedDifficulties && filters.selectedDifficulties.length > 0) ||
      filters.selectedDate !== null
  );
};

export const selectActiveFilterCount = (state: { search?: SearchState }): number => {
  const filters = state?.search?.filters;
  if (!filters) return 0;
  let count = 0;
  if (filters.destination?.trim()) count++;
  if (filters.minBudget !== null || filters.maxBudget !== null) count++;
  count += filters.selectedCategories?.length ?? 0;
  count += filters.selectedDurations?.length ?? 0;
  count += filters.selectedDifficulties?.length ?? 0;
  if (filters.selectedDate !== null) count++;
  return count;
};

// Memoized filtered trips selector
export const selectFilteredTrips = createSelector(
  [
    selectSearchFilters,
    selectSortOption,
    (_state: { search?: SearchState }, trips: TripItem[]) => trips,
  ],
  (filters, sortOption, trips) => filterAndSortTrips(trips, filters, sortOption)
);

export const searchReducer = searchSlice.reducer;
