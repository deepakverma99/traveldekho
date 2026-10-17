import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CarouselScrollState {
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

export interface ScrollState {
  carousels: Record<string, CarouselScrollState>;
}

const initialState: ScrollState = {
  carousels: {},
};

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setScrollState: (
      state,
      action: PayloadAction<{
        sectionId: string;
        canScrollLeft: boolean;
        canScrollRight: boolean;
      }>
    ) => {
      const { sectionId, canScrollLeft, canScrollRight } = action.payload;
      const current = state.carousels[sectionId];
      if (
        !current ||
        current.canScrollLeft !== canScrollLeft ||
        current.canScrollRight !== canScrollRight
      ) {
        state.carousels[sectionId] = { canScrollLeft, canScrollRight };
      }
    },
    resetSectionScroll: (state, action: PayloadAction<string>) => {
      delete state.carousels[action.payload];
    },
  },
});

export const { setScrollState, resetSectionScroll } = scrollSlice.actions;

// Constant frozen references to prevent selector reference inequality warnings
const DEFAULT_SCROLL_RIGHT_TRUE: CarouselScrollState = Object.freeze({
  canScrollLeft: false,
  canScrollRight: true,
});

const DEFAULT_SCROLL_RIGHT_FALSE: CarouselScrollState = Object.freeze({
  canScrollLeft: false,
  canScrollRight: false,
});

// Selectors
export const selectScrollState = (state: { scroll?: ScrollState }) => state?.scroll;

export const selectCarouselScroll = (
  state: { scroll?: ScrollState },
  sectionId: string,
  defaultCanScrollRight = true
): CarouselScrollState => {
  const item = state?.scroll?.carousels?.[sectionId];
  if (item) return item;
  return defaultCanScrollRight
    ? DEFAULT_SCROLL_RIGHT_TRUE
    : DEFAULT_SCROLL_RIGHT_FALSE;
};

export const selectCanScrollLeft = (
  state: { scroll?: ScrollState },
  sectionId: string
): boolean => state?.scroll?.carousels?.[sectionId]?.canScrollLeft ?? false;

export const selectCanScrollRight = (
  state: { scroll?: ScrollState },
  sectionId: string,
  defaultValue = true
): boolean => state?.scroll?.carousels?.[sectionId]?.canScrollRight ?? defaultValue;

export const scrollReducer = scrollSlice.reducer;
