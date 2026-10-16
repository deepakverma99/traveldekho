import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { newsletterReducer } from './slices/newsletterSlice';
import { scrollReducer } from './slices/scrollSlice';
import { searchReducer } from './slices/searchSlice';
import { tripDetailReducer } from './slices/tripDetailSlice';
import { tripPartnerReducer } from './slices/tripPartnerSlice';

export const makeStore = () => {
  // Next.js 16 prerender checks intercept Math.random() in Client Components during SSR.
  // Redux core internally uses Math.random() to create probe action types (e.g. @@redux/PROBE_UNKNOWN_ACTION).
  // We shield Math.random with a deterministic value during configureStore initialization so prerender remains pure.
  const originalRandom = Math.random;
  let counter = 0;
  Math.random = () => {
    counter += 0.12345;
    return counter % 1;
  };

  try {
    return configureStore({
      reducer: {
        auth: authReducer,
        newsletter: newsletterReducer,
        scroll: scrollReducer,
        search: searchReducer,
        tripDetail: tripDetailReducer,
        tripPartner: tripPartnerReducer,
      },
      devTools: process.env.NODE_ENV !== 'production',
    });
  } finally {
    Math.random = originalRandom;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
