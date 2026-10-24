import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import {
  TripPartnerUser,
  TripPartnerBooking,
  TripPartnerNotification,
  TripPartnerStats,
  PartnerBookingChartPoint,
  PartnerTripItem,
} from '@/components/TripPartner/types/';
import {
  MOCK_PARTNER_STATS,
  MOCK_PARTNER_BOOKINGS,
  MOCK_PARTNER_NOTIFICATIONS,
  DEFAULT_BOOKING_TRENDS,
  INITIAL_PARTNER_TRIPS,
} from '@/components/TripPartner/data';
import {
  getStoredPartner,
  clearPartnerSession,
} from '@/components/TripPartner/utils/partnerAuth';

export type { PartnerBookingChartPoint };

export interface TripPartnerState {
  // Session & Authentication
  currentPartner: TripPartnerUser | null;
  isAuthenticated: boolean;
  isLogoutModalOpen: boolean;
  isMobileSidebarOpen: boolean;

  // Login Form
  loginEmail: string;
  loginPassword: string;
  showPassword: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;

  // Portal Data
  stats: TripPartnerStats;
  bookings: TripPartnerBooking[];
  notifications: TripPartnerNotification[];
  bookingTrends: PartnerBookingChartPoint[];

  // My Trips Management & Filters
  myTrips: PartnerTripItem[];
  tripsSearchQuery: string;
  tripsStatusFilter: string;
  tripsCategoryFilter: string;
  tripsDifficultyFilter: string;
  tripsSortBy: string;
  tripsToastMessage: string | null;
}

const initialState: TripPartnerState = {
  currentPartner: null,
  isAuthenticated: false,
  isLogoutModalOpen: false,
  isMobileSidebarOpen: false,

  loginEmail: 'travellr@gmail.com',
  loginPassword: 'travellr@123',
  showPassword: false,
  isLoading: false,
  isSuccess: false,
  error: null,

  stats: MOCK_PARTNER_STATS,
  bookings: MOCK_PARTNER_BOOKINGS,
  notifications: MOCK_PARTNER_NOTIFICATIONS,
  bookingTrends: DEFAULT_BOOKING_TRENDS,

  myTrips: INITIAL_PARTNER_TRIPS,
  tripsSearchQuery: '',
  tripsStatusFilter: 'All Status',
  tripsCategoryFilter: 'All Categories',
  tripsDifficultyFilter: 'All Difficulties',
  tripsSortBy: 'newest',
  tripsToastMessage: null,
};

export const tripPartnerSlice = createSlice({
  name: 'tripPartner',
  initialState,
  reducers: {
    // Login Form Reducers
    setPartnerLoginEmail: (state, action: PayloadAction<string>) => {
      state.loginEmail = action.payload;
      state.error = null;
    },
    setPartnerLoginPassword: (state, action: PayloadAction<string>) => {
      state.loginPassword = action.payload;
      state.error = null;
    },
    togglePartnerLoginShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
    setPartnerLoginShowPassword: (state, action: PayloadAction<boolean>) => {
      state.showPassword = action.payload;
    },
    partnerLoginStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.isSuccess = false;
    },
    partnerLoginSuccess: (state, action: PayloadAction<TripPartnerUser>) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isAuthenticated = true;
      state.currentPartner = action.payload;
      state.error = null;
    },
    partnerLoginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.payload;
    },
    resetPartnerLoginForm: (state) => {
      state.loginEmail = 'travellr@gmail.com';
      state.loginPassword = 'travellr@123';
      state.showPassword = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },

    // Session Reducers
    initializePartnerSession: (state, action: PayloadAction<string | undefined>) => {
      if (!state.currentPartner || (action.payload && state.currentPartner.username !== action.payload)) {
        const stored = getStoredPartner(action.payload);
        state.currentPartner = stored;
        state.isAuthenticated = true;
      }
    },
    setPartnerSession: (state, action: PayloadAction<TripPartnerUser>) => {
      state.currentPartner = action.payload;
      state.isAuthenticated = true;
    },

    // Logout Modal & Actions
    openPartnerLogoutModal: (state) => {
      state.isLogoutModalOpen = true;
    },
    closePartnerLogoutModal: (state) => {
      state.isLogoutModalOpen = false;
    },
    partnerLogout: (state) => {
      clearPartnerSession();
      state.currentPartner = null;
      state.isAuthenticated = false;
      state.isLogoutModalOpen = false;
      state.isMobileSidebarOpen = false;
      state.isSuccess = false;
      state.error = null;
    },
    // Mobile Drawer Reducers
    openMobileSidebar: (state) => {
      state.isMobileSidebarOpen = true;
    },
    closeMobileSidebar: (state) => {
      state.isMobileSidebarOpen = false;
    },
    toggleMobileSidebar: (state) => {
      state.isMobileSidebarOpen = !state.isMobileSidebarOpen;
    },

    // Portal Data Management
    updatePartnerStats: (state, action: PayloadAction<Partial<TripPartnerStats>>) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    addPartnerBooking: (state, action: PayloadAction<TripPartnerBooking>) => {
      state.bookings.unshift(action.payload);
      state.stats.totalBookings += 1;
      state.stats.totalRevenue += action.payload.amount;
    },
    togglePartnerBookingPaid: (state, action: PayloadAction<string>) => {
      const booking = state.bookings.find((b) => b.id === action.payload);
      if (booking) {
        booking.paymentStatus = booking.paymentStatus === 'paid' ? 'unpaid' : 'paid';
      }
    },
    deletePartnerBooking: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter((b) => b.id !== action.payload);
      state.stats.totalBookings = Math.max(0, state.stats.totalBookings - 1);
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notif = state.notifications.find((n) => n.id === action.payload);
      if (notif) {
        notif.isRead = true;
      }
    },
    setBookingTrends: (state, action: PayloadAction<PartnerBookingChartPoint[]>) => {
      state.bookingTrends = action.payload;
    },

    // My Trips Management & Filters Reducers
    setTripsSearchQuery: (state, action: PayloadAction<string>) => {
      state.tripsSearchQuery = action.payload;
    },
    setTripsStatusFilter: (state, action: PayloadAction<string>) => {
      state.tripsStatusFilter = action.payload;
    },
    setTripsCategoryFilter: (state, action: PayloadAction<string>) => {
      state.tripsCategoryFilter = action.payload;
    },
    setTripsDifficultyFilter: (state, action: PayloadAction<string>) => {
      state.tripsDifficultyFilter = action.payload;
    },
    setTripsSortBy: (state, action: PayloadAction<string>) => {
      state.tripsSortBy = action.payload;
    },
    resetTripsFilters: (state) => {
      state.tripsSearchQuery = '';
      state.tripsStatusFilter = 'All Status';
      state.tripsCategoryFilter = 'All Categories';
      state.tripsDifficultyFilter = 'All Difficulties';
      state.tripsSortBy = 'newest';
    },
    setTripsToastMessage: (state, action: PayloadAction<string | null>) => {
      state.tripsToastMessage = action.payload;
    },
    addPartnerTrip: (state, action: PayloadAction<PartnerTripItem>) => {
      const existingIdx = state.myTrips.findIndex((t) => t.id === action.payload.id);
      if (existingIdx >= 0) {
        state.myTrips[existingIdx] = action.payload;
        state.tripsToastMessage = `Trip "${action.payload.title}" updated successfully!`;
      } else {
        state.myTrips.unshift(action.payload);
        state.tripsToastMessage = `Trip "${action.payload.title}" published successfully!`;
      }
      state.stats.activeTrips = state.myTrips.filter((t) => t.status === 'Published').length;
    },
    deletePartnerTrip: (state, action: PayloadAction<string>) => {
      const tripToDelete = state.myTrips.find((t) => t.id === action.payload);
      state.myTrips = state.myTrips.filter((t) => t.id !== action.payload);
      state.tripsToastMessage = `Trip "${tripToDelete?.title || action.payload}" deleted.`;
      state.stats.activeTrips = state.myTrips.filter((t) => t.status === 'Published').length;
    },
    archivePartnerTrip: (state, action: PayloadAction<string>) => {
      const trip = state.myTrips.find((t) => t.id === action.payload);
      if (trip) {
        trip.status = 'Draft';
      }
      state.tripsToastMessage = 'Trip moved to archive (status set to Draft).';
      state.stats.activeTrips = state.myTrips.filter((t) => t.status === 'Published').length;
    },
    editPartnerTrip: (state, action: PayloadAction<PartnerTripItem>) => {
      state.tripsToastMessage = `Opening editor for "${action.payload.title}"...`;
    },
    copyPartnerTripDetails: (state, action: PayloadAction<PartnerTripItem>) => {
      state.tripsToastMessage = `Details for "${action.payload.title}" copied to clipboard!`;
    },
    addDateToPartnerTrip: (
      state,
      action: PayloadAction<{ tripId?: string; tripTitle?: string; date: string }>
    ) => {
      const { tripId, tripTitle, date } = action.payload;
      const trip = state.myTrips.find(
        (t) =>
          (tripId && t.id.toLowerCase() === tripId.toLowerCase()) ||
          (tripTitle && t.title.toLowerCase().includes(tripTitle.toLowerCase())) ||
          (tripTitle && tripTitle.toLowerCase().includes(t.title.toLowerCase()))
      );
      if (trip) {
        trip.date = date;
      }
    },
  },
});

export const {
  setPartnerLoginEmail,
  setPartnerLoginPassword,
  togglePartnerLoginShowPassword,
  setPartnerLoginShowPassword,
  partnerLoginStart,
  partnerLoginSuccess,
  partnerLoginFailure,
  resetPartnerLoginForm,
  initializePartnerSession,
  setPartnerSession,
  openPartnerLogoutModal,
  closePartnerLogoutModal,
  partnerLogout,
  openMobileSidebar,
  closeMobileSidebar,
  toggleMobileSidebar,
  updatePartnerStats,
  addPartnerBooking,
  togglePartnerBookingPaid,
  deletePartnerBooking,
  markNotificationAsRead,
  setBookingTrends,
  setTripsSearchQuery,
  setTripsStatusFilter,
  setTripsCategoryFilter,
  setTripsDifficultyFilter,
  setTripsSortBy,
  resetTripsFilters,
  setTripsToastMessage,
  addPartnerTrip,
  deletePartnerTrip,
  archivePartnerTrip,
  editPartnerTrip,
  copyPartnerTripDetails,
  addDateToPartnerTrip,
} = tripPartnerSlice.actions;

// Defensive Selectors with fallbacks for SSR and fast refresh safety
export const selectTripPartnerState = (state: { tripPartner?: TripPartnerState }) =>
  state?.tripPartner;

export const selectCurrentPartner = (state: { tripPartner?: TripPartnerState }): TripPartnerUser | null =>
  state?.tripPartner?.currentPartner ?? null;

export const selectIsPartnerAuthenticated = (state: { tripPartner?: TripPartnerState }): boolean =>
  state?.tripPartner?.isAuthenticated ?? false;

export const selectIsPartnerLogoutModalOpen = (state: { tripPartner?: TripPartnerState }): boolean =>
  state?.tripPartner?.isLogoutModalOpen ?? false;

export const selectIsMobileSidebarOpen = (state: { tripPartner?: TripPartnerState }): boolean =>
  state?.tripPartner?.isMobileSidebarOpen ?? false;

export const selectPartnerLoginEmail = (state: { tripPartner?: TripPartnerState }): string =>
  state?.tripPartner?.loginEmail ?? '';

export const selectPartnerLoginPassword = (state: { tripPartner?: TripPartnerState }): string =>
  state?.tripPartner?.loginPassword ?? '';

export const selectPartnerLoginShowPassword = (state: { tripPartner?: TripPartnerState }): boolean =>
  state?.tripPartner?.showPassword ?? false;

export const selectPartnerLoginLoading = (state: { tripPartner?: TripPartnerState }): boolean =>
  state?.tripPartner?.isLoading ?? false;

export const selectPartnerLoginSuccess = (state: { tripPartner?: TripPartnerState }): boolean =>
  state?.tripPartner?.isSuccess ?? false;

export const selectPartnerLoginError = (state: { tripPartner?: TripPartnerState }): string | null =>
  state?.tripPartner?.error ?? null;

export const selectPartnerStats = (state: { tripPartner?: TripPartnerState }): TripPartnerStats =>
  state?.tripPartner?.stats ?? MOCK_PARTNER_STATS;

export const selectPartnerBookings = (state: { tripPartner?: TripPartnerState }): TripPartnerBooking[] =>
  state?.tripPartner?.bookings ?? MOCK_PARTNER_BOOKINGS;

export const selectPartnerNotifications = (state: { tripPartner?: TripPartnerState }): TripPartnerNotification[] =>
  state?.tripPartner?.notifications ?? MOCK_PARTNER_NOTIFICATIONS;

export const selectPartnerBookingTrends = (state: { tripPartner?: TripPartnerState }): PartnerBookingChartPoint[] =>
  state?.tripPartner?.bookingTrends ?? DEFAULT_BOOKING_TRENDS;

export const selectPartnerMyTrips = (state: { tripPartner?: TripPartnerState }): PartnerTripItem[] =>
  state?.tripPartner?.myTrips ?? INITIAL_PARTNER_TRIPS;

export const selectTripsSearchQuery = (state: { tripPartner?: TripPartnerState }): string =>
  state?.tripPartner?.tripsSearchQuery ?? '';

export const selectTripsStatusFilter = (state: { tripPartner?: TripPartnerState }): string =>
  state?.tripPartner?.tripsStatusFilter ?? 'All';

export const selectTripsCategoryFilter = (state: { tripPartner?: TripPartnerState }): string =>
  state?.tripPartner?.tripsCategoryFilter ?? 'All';

export const selectTripsDifficultyFilter = (state: { tripPartner?: TripPartnerState }): string =>
  state?.tripPartner?.tripsDifficultyFilter ?? 'All';

export const selectTripsSortBy = (state: { tripPartner?: TripPartnerState }): string =>
  state?.tripPartner?.tripsSortBy ?? 'newest';

export const selectTripsToastMessage = (state: { tripPartner?: TripPartnerState }): string | null =>
  state?.tripPartner?.tripsToastMessage ?? null;

export const selectFilteredPartnerTrips = createSelector(
  [
    selectPartnerMyTrips,
    selectTripsSearchQuery,
    selectTripsStatusFilter,
    selectTripsCategoryFilter,
    selectTripsDifficultyFilter,
    selectTripsSortBy,
  ],
  (
    trips: PartnerTripItem[],
    rawSearchQuery: string,
    statusFilter: string,
    categoryFilter: string,
    difficultyFilter: string,
    sortBy: string
  ): PartnerTripItem[] => {
    const searchQuery = rawSearchQuery.toLowerCase().trim();

    return trips
      .filter((trip) => {
        if (searchQuery) {
          const matchTitle = trip.title.toLowerCase().includes(searchQuery);
          const matchDest = trip.destination.toLowerCase().includes(searchQuery);
          if (!matchTitle && !matchDest) return false;
        }
        // Status filtering
        if (statusFilter && statusFilter !== 'All' && statusFilter !== 'All Status') {
          if (statusFilter === 'Pending Review' && (trip.status === 'Pending Review' || trip.status === 'Pending')) {
            // match
          } else if (trip.status !== statusFilter) {
            return false;
          }
        }

        // Category filtering
        if (categoryFilter && categoryFilter !== 'All' && categoryFilter !== 'All Categories') {
          const catLower = categoryFilter.toLowerCase();
          const tripCatLower = trip.category.toLowerCase();
          const matchCategory =
            tripCatLower === catLower ||
            (catLower === 'weekend escapes' && (tripCatLower.includes('weekend') || tripCatLower.includes('gateway'))) ||
            (catLower === 'educational trips' && tripCatLower.includes('education')) ||
            (catLower === 'explore offbeat' && tripCatLower.includes('offbeat')) ||
            (catLower === 'hike' && (tripCatLower.includes('trek') || tripCatLower.includes('hike'))) ||
            (catLower === 'mountains' && tripCatLower.includes('mountain')) ||
            (catLower === 'budget friendly' && tripCatLower.includes('budget')) ||
            (trip.tags && trip.tags.some((t) => t.toLowerCase().includes(catLower) || catLower.includes(t.toLowerCase())));

          if (!matchCategory) {
            return false;
          }
        }

        // Difficulty filtering
        if (difficultyFilter && difficultyFilter !== 'All' && difficultyFilter !== 'All Difficulties') {
          const diffLower = difficultyFilter.toLowerCase();
          const tripDiffLower = trip.difficulty.toLowerCase();
          const matchDifficulty =
            tripDiffLower === diffLower ||
            (diffLower === 'hard' && (tripDiffLower === 'challenging' || tripDiffLower === 'difficult' || tripDiffLower === 'hard'));

          if (!matchDifficulty) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        if (sortBy === 'bookings') return b.bookingsCount - a.bookingsCount;
        if (sortBy === 'oldest') return a.id.localeCompare(b.id);
        return b.id.localeCompare(a.id);
      });
  }
);

export const tripPartnerReducer = tripPartnerSlice.reducer;
