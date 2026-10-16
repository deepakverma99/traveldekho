import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NewsletterState {
  email: string;
  isSubscribed: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: NewsletterState = {
  email: '',
  isSubscribed: false,
  isLoading: false,
  error: null,
};

export const newsletterSlice = createSlice({
  name: 'newsletter',
  initialState,
  reducers: {
    setNewsletterEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.error = null;
    },
    subscribeStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    subscribeSuccess: (state) => {
      state.isLoading = false;
      state.isSubscribed = true;
      state.email = '';
      state.error = null;
    },
    subscribeFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetNewsletter: (state) => {
      state.email = '';
      state.isSubscribed = false;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setNewsletterEmail,
  subscribeStart,
  subscribeSuccess,
  subscribeFailure,
  resetNewsletter,
} = newsletterSlice.actions;

// Selectors
export const selectNewsletterState = (state: { newsletter?: NewsletterState }) =>
  state?.newsletter;
export const selectNewsletterEmail = (state: { newsletter?: NewsletterState }) =>
  state?.newsletter?.email ?? '';
export const selectIsNewsletterSubscribed = (state: {
  newsletter?: NewsletterState;
}) => state?.newsletter?.isSubscribed ?? false;
export const selectNewsletterLoading = (state: {
  newsletter?: NewsletterState;
}) => state?.newsletter?.isLoading ?? false;
export const selectNewsletterError = (state: {
  newsletter?: NewsletterState;
}) => state?.newsletter?.error ?? null;
export const selectCanSubmitNewsletter = (state: {
  newsletter?: NewsletterState;
}) => Boolean(state?.newsletter?.email?.trim());

export const newsletterReducer = newsletterSlice.reducer;
