import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateSlot } from '@/components/TripDetail/types';

export interface TripBookingForm {
  name: string;
  email: string;
  phone: string;
}

export interface TripDetailState {
  selectedSlotId: string | null;
  travellers: number;
  selectedMonth: string;
  isMonthDropdownOpen: boolean;
  isBookingModalOpen: boolean;
  bookingForm: TripBookingForm;
  isBookingSuccess: boolean;
  isSubmitting: boolean;
  activeGalleryIndex: number | null;
}

const initialState: TripDetailState = {
  selectedSlotId: null,
  travellers: 1,
  selectedMonth: 'All Months',
  isMonthDropdownOpen: false,
  isBookingModalOpen: false,
  bookingForm: {
    name: '',
    email: '',
    phone: '',
  },
  isBookingSuccess: false,
  isSubmitting: false,
  activeGalleryIndex: null,
};

export const tripDetailSlice = createSlice({
  name: 'tripDetail',
  initialState,
  reducers: {
    setSelectedSlotId: (state, action: PayloadAction<string>) => {
      state.selectedSlotId = action.payload;
    },
    setTravellers: (state, action: PayloadAction<number>) => {
      state.travellers = Math.max(1, Math.min(20, action.payload));
    },
    incrementTravellers: (state) => {
      state.travellers = Math.min(20, state.travellers + 1);
    },
    decrementTravellers: (state) => {
      state.travellers = Math.max(1, state.travellers - 1);
    },
    setSelectedMonth: (state, action: PayloadAction<string>) => {
      state.selectedMonth = action.payload;
      state.isMonthDropdownOpen = false;
    },
    setIsMonthDropdownOpen: (state, action: PayloadAction<boolean>) => {
      state.isMonthDropdownOpen = action.payload;
    },
    toggleMonthDropdown: (state) => {
      state.isMonthDropdownOpen = !state.isMonthDropdownOpen;
    },
    openBookingModal: (
      state,
      action: PayloadAction<{ slotId?: string; travellers?: number } | void>
    ) => {
      state.isBookingModalOpen = true;
      state.isBookingSuccess = false;
      if (action.payload?.slotId) {
        state.selectedSlotId = action.payload.slotId;
      }
      if (action.payload?.travellers) {
        state.travellers = Math.max(1, Math.min(20, action.payload.travellers));
      }
    },
    closeBookingModal: (state) => {
      state.isBookingModalOpen = false;
    },
    setBookingFormField: (
      state,
      action: PayloadAction<{ field: keyof TripBookingForm; value: string }>
    ) => {
      state.bookingForm[action.payload.field] = action.payload.value;
    },
    setBookingForm: (state, action: PayloadAction<Partial<TripBookingForm>>) => {
      state.bookingForm = { ...state.bookingForm, ...action.payload };
    },
    submitBookingStart: (state) => {
      state.isSubmitting = true;
    },
    submitBookingSuccess: (state) => {
      state.isSubmitting = false;
      state.isBookingSuccess = true;
    },
    submitBookingFailure: (state) => {
      state.isSubmitting = false;
    },
    resetBookingModal: (state) => {
      state.isBookingSuccess = false;
      state.isSubmitting = false;
      state.bookingForm = {
        name: '',
        email: '',
        phone: '',
      };
    },
    initializeTripDetail: (
      state,
      action: PayloadAction<{
        defaultSlotId?: string;
        user?: { name?: string; email?: string; mobileNumber?: string } | null;
      }>
    ) => {
      if (action.payload.defaultSlotId && !state.selectedSlotId) {
        state.selectedSlotId = action.payload.defaultSlotId;
      }
      if (action.payload.user) {
        if (action.payload.user.name && !state.bookingForm.name) {
          state.bookingForm.name = action.payload.user.name;
        }
        if (action.payload.user.email && !state.bookingForm.email) {
          state.bookingForm.email = action.payload.user.email;
        }
        if (action.payload.user.mobileNumber && !state.bookingForm.phone) {
          state.bookingForm.phone = action.payload.user.mobileNumber;
        }
      }
    },
    openGalleryPhoto: (state, action: PayloadAction<number>) => {
      state.activeGalleryIndex = action.payload;
    },
    closeGalleryPhoto: (state) => {
      state.activeGalleryIndex = null;
    },
    nextGalleryPhoto: (state, action: PayloadAction<number>) => {
      const total = action.payload;
      if (total <= 0) return;
      if (state.activeGalleryIndex !== null) {
        state.activeGalleryIndex = (state.activeGalleryIndex + 1) % total;
      }
    },
    prevGalleryPhoto: (state, action: PayloadAction<number>) => {
      const total = action.payload;
      if (total <= 0) return;
      if (state.activeGalleryIndex !== null) {
        state.activeGalleryIndex =
          state.activeGalleryIndex === 0 ? total - 1 : state.activeGalleryIndex - 1;
      }
    },
  },
});

export const {
  setSelectedSlotId,
  setTravellers,
  incrementTravellers,
  decrementTravellers,
  setSelectedMonth,
  setIsMonthDropdownOpen,
  toggleMonthDropdown,
  openBookingModal,
  closeBookingModal,
  setBookingFormField,
  setBookingForm,
  submitBookingStart,
  submitBookingSuccess,
  submitBookingFailure,
  resetBookingModal,
  initializeTripDetail,
  openGalleryPhoto,
  closeGalleryPhoto,
  nextGalleryPhoto,
  prevGalleryPhoto,
} = tripDetailSlice.actions;

// Defensive Selectors for Fast Refresh / Prerender Resilience
export const selectTripDetailState = (state: { tripDetail?: TripDetailState }) =>
  state?.tripDetail;

export const selectSelectedSlotId = (state: { tripDetail?: TripDetailState }): string | null =>
  state?.tripDetail?.selectedSlotId ?? null;

export const selectTravellers = (state: { tripDetail?: TripDetailState }): number =>
  state?.tripDetail?.travellers ?? 1;

export const selectSelectedMonth = (state: { tripDetail?: TripDetailState }): string =>
  state?.tripDetail?.selectedMonth ?? 'All Months';

export const selectIsMonthDropdownOpen = (state: { tripDetail?: TripDetailState }): boolean =>
  state?.tripDetail?.isMonthDropdownOpen ?? false;

export const selectIsBookingModalOpen = (state: { tripDetail?: TripDetailState }): boolean =>
  state?.tripDetail?.isBookingModalOpen ?? false;

export const selectBookingForm = (state: { tripDetail?: TripDetailState }): TripBookingForm =>
  state?.tripDetail?.bookingForm ?? { name: '', email: '', phone: '' };

export const selectBookingCustomerName = (state: { tripDetail?: TripDetailState }): string =>
  state?.tripDetail?.bookingForm?.name ?? '';

export const selectBookingCustomerEmail = (state: { tripDetail?: TripDetailState }): string =>
  state?.tripDetail?.bookingForm?.email ?? '';

export const selectBookingCustomerPhone = (state: { tripDetail?: TripDetailState }): string =>
  state?.tripDetail?.bookingForm?.phone ?? '';

export const selectIsBookingSuccess = (state: { tripDetail?: TripDetailState }): boolean =>
  state?.tripDetail?.isBookingSuccess ?? false;

export const selectIsSubmittingBooking = (state: { tripDetail?: TripDetailState }): boolean =>
  state?.tripDetail?.isSubmitting ?? false;

export const selectActiveGalleryIndex = (state: { tripDetail?: TripDetailState }): number | null =>
  state?.tripDetail?.activeGalleryIndex ?? null;

// Derived Helper Selectors
export const selectResolvedSlot = (
  state: { tripDetail?: TripDetailState },
  slots: DateSlot[]
): DateSlot | undefined => {
  if (!slots || slots.length === 0) return undefined;
  const selectedId = state?.tripDetail?.selectedSlotId;
  return slots.find((s) => s.id === selectedId) ?? slots[0];
};

export const selectFilteredDateSlots = (
  state: { tripDetail?: TripDetailState },
  slots: DateSlot[]
): DateSlot[] => {
  if (!slots || slots.length === 0) return [];
  const selectedMonth = state?.tripDetail?.selectedMonth ?? 'All Months';
  if (selectedMonth === 'All Months') return slots;
  return slots.filter((s) => s.month === selectedMonth);
};

export const selectTotalBookingAmount = (
  state: { tripDetail?: TripDetailState },
  slotPrice: number
): number => {
  const travellers = state?.tripDetail?.travellers ?? 1;
  return travellers * slotPrice;
};

export const tripDetailReducer = tripDetailSlice.reducer;
