'use client';

import React from 'react';
import { X, CheckCircle, Calendar, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { TripDetail, DateSlot } from './types';
import {
  useAppDispatch,
  useAppSelector,
  selectIsBookingModalOpen,
  selectTravellers,
  selectBookingForm,
  selectIsBookingSuccess,
  selectResolvedSlot,
  setBookingFormField,
  submitBookingSuccess,
  closeBookingModal,
  resetBookingModal,
} from '@/redux';

export interface TripBookingModalProps {
  trip: TripDetail;
  selectedSlot?: DateSlot;
  travellers?: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export const TripBookingModal: React.FC<TripBookingModalProps> = ({
  trip,
  selectedSlot: propSlot,
  travellers: propTravellers,
  isOpen: propIsOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const reduxIsOpen = useAppSelector(selectIsBookingModalOpen);
  const reduxTravellers = useAppSelector(selectTravellers);
  const reduxSlot = useAppSelector((state) => selectResolvedSlot(state, trip.dateSlots));
  const bookingForm = useAppSelector(selectBookingForm);
  const isSuccess = useAppSelector(selectIsBookingSuccess);

  const effectiveIsOpen = propIsOpen ?? reduxIsOpen;
  const effectiveSlot = propSlot ?? reduxSlot ?? trip.dateSlots[0];
  const effectiveTravellers = propTravellers ?? reduxTravellers;

  if (!effectiveIsOpen || !effectiveSlot) return null;

  const totalAmount = effectiveSlot.price * effectiveTravellers;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      dispatch(closeBookingModal());
    }
  };

  const handleBackToDetails = () => {
    handleClose();
    dispatch(resetBookingModal());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitBookingSuccess());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close booking modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer border-0"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/50">
                Confirm Reservation
              </span>
              <h3 className="text-2xl font-black text-gray-900 mt-2 tracking-tight">
                {trip.title}
              </h3>
            </div>

            {/* Selected Booking Info Pill */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">
                    {effectiveSlot.date}
                  </p>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {trip.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-black text-gray-900">
                  {effectiveTravellers} {effectiveTravellers === 1 ? 'Traveller' : 'Travellers'}
                </span>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deepak Verma"
                  value={bookingForm.name}
                  onChange={(e) =>
                    dispatch(
                      setBookingFormField({ field: 'name', value: e.target.value })
                    )
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 outline-none transition-colors focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. traveller@example.com"
                  value={bookingForm.email}
                  onChange={(e) =>
                    dispatch(
                      setBookingFormField({ field: 'email', value: e.target.value })
                    )
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 outline-none transition-colors focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={bookingForm.phone}
                  onChange={(e) =>
                    dispatch(
                      setBookingFormField({ field: 'phone', value: e.target.value })
                    )
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 outline-none transition-colors focus:border-amber-400"
                />
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                    Total Payable Amount
                  </p>
                  <p className="text-2xl font-black text-gray-900">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-bold">Scout Protected</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-4 bg-amber-400 hover:bg-black text-gray-900 hover:text-white font-extrabold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 border-0"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              Booking Request Received!
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Thank you, <span className="font-bold text-gray-900">{bookingForm.name || 'Traveler'}</span>! Our certified Scout Captain will contact you via WhatsApp / Phone at <span className="font-bold text-gray-900">{bookingForm.phone || 'your registered number'}</span> with your itinerary details and confirmation voucher.
            </p>
            <button
              type="button"
              onClick={handleBackToDetails}
              className="py-3 px-6 bg-amber-400 hover:bg-black hover:text-white text-black font-extrabold text-sm rounded-xl border-0 cursor-pointer transition-colors"
            >
              Back to Trip Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
