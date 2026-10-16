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

// Selectors
export const selectScrollState = (state: { scroll?: ScrollState }) => state?.scroll;

export const selectCarouselScroll = (
  state: { scroll?: ScrollState },
  sectionId: string,
  defaultCanScrollRight = true
): CarouselScrollState =>
  state?.scroll?.carousels?.[sectionId] ?? {
    canScrollLeft: false,
    canScrollRight: defaultCanScrollRight,
  };

export const selectCanScrollLeft = (
  state: { scroll?: ScrollState },
  sectionId: string
): boolean => state?.scroll?.carousels?.[sectionId]?.canScrollLeft ?? false;

export const selectCanScrollRight = (
  state: { scroll?: ScrollState },
  sectionId: string
): boolean => state?.scroll?.carousels?.[sectionId]?.canScrollRight ?? true;

export const scrollReducer = scrollSlice.reducer;
