import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthModalStep = 'phone' | 'otp';

export interface AuthUser {
  id: string;
  mobileNumber?: string;
  name?: string;
  email?: string;
}

export interface AuthState {
  isModalOpen: boolean;
  countryCode: string;
  mobileNumber: string;
  otp: string;
  step: AuthModalStep;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  user: AuthUser | null;
}

const initialState: AuthState = {
  isModalOpen: false,
  countryCode: '+91',
  mobileNumber: '',
  otp: '',
  step: 'phone',
  isLoading: false,
  error: null,
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isModalOpen = true;
      state.error = null;
    },
    closeLoginModal: (state) => {
      state.isModalOpen = false;
      state.error = null;
    },
    toggleLoginModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
      state.error = null;
    },
    setCountryCode: (state, action: PayloadAction<string>) => {
      state.countryCode = action.payload;
    },
    setMobileNumber: (state, action: PayloadAction<string>) => {
      const sanitized = action.payload.replace(/\D/g, '').slice(0, 10);
      state.mobileNumber = sanitized;
      state.error = null;
    },
    setOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload.replace(/\D/g, '').slice(0, 6);
      state.error = null;
    },
    setStep: (state, action: PayloadAction<AuthModalStep>) => {
      state.step = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    requestOtpStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    requestOtpSuccess: (state) => {
      state.isLoading = false;
      state.step = 'otp';
      state.error = null;
    },
    requestOtpFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: AuthUser; token?: string }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.isModalOpen = false;
      state.isLoading = false;
      state.step = 'phone';
      state.otp = '';
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isModalOpen = false;
      state.step = 'phone';
      state.mobileNumber = '';
      state.otp = '';
      state.error = null;
    },
    resetLoginForm: (state) => {
      state.countryCode = '+91';
      state.mobileNumber = '';
      state.otp = '';
      state.step = 'phone';
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  toggleLoginModal,
  setCountryCode,
  setMobileNumber,
  setOtp,
  setStep,
  setLoading,
  setError,
  requestOtpStart,
  requestOtpSuccess,
  requestOtpFailure,
  loginSuccess,
  logout,
  resetLoginForm,
} = authSlice.actions;

// Selectors
export const selectAuthState = (state: { auth?: AuthState }) => state?.auth;
export const selectIsLoginModalOpen = (state: { auth?: AuthState }) =>
  state?.auth?.isModalOpen ?? false;
export const selectCountryCode = (state: { auth?: AuthState }) =>
  state?.auth?.countryCode ?? '+91';
export const selectMobileNumber = (state: { auth?: AuthState }) =>
  state?.auth?.mobileNumber ?? '';
export const selectIsMobileComplete = (state: { auth?: AuthState }) =>
  (state?.auth?.mobileNumber?.length ?? 0) === 10;
export const selectAuthStep = (state: { auth?: AuthState }) =>
  state?.auth?.step ?? 'phone';
export const selectAuthOtp = (state: { auth?: AuthState }) =>
  state?.auth?.otp ?? '';
export const selectAuthLoading = (state: { auth?: AuthState }) =>
  state?.auth?.isLoading ?? false;
export const selectAuthError = (state: { auth?: AuthState }) =>
  state?.auth?.error ?? null;
export const selectIsAuthenticated = (state: { auth?: AuthState }) =>
  state?.auth?.isAuthenticated ?? false;
export const selectUser = (state: { auth?: AuthState }) =>
  state?.auth?.user ?? null;

export const authReducer = authSlice.reducer;
