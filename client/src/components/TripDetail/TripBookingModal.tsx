'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Calendar, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { TripDetail, DateSlot } from './types';
import { typography } from '@/theme/typography';

interface TripBookingModalProps {
  trip: TripDetail;
  selectedSlot: DateSlot;
  travellers: number;
  isOpen: boolean;
  onClose: () => void;
}

export const TripBookingModal: React.FC<TripBookingModalProps> = ({
  trip,
  selectedSlot,
  travellers,
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const totalAmount = selectedSlot.price * travellers;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 z-10 overflow-hidden animate-fade-in-up">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/50">
                Confirm Reservation
              </span>
              <h3
                className="text-2xl font-black text-gray-900 mt-2 tracking-tight"
                style={{ fontFamily: typography.fonts.jakarta }}
              >
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
                    {selectedSlot.date}
                  </p>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {trip.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-black text-gray-900">
                  {travellers} {travellers === 1 ? 'Traveller' : 'Travellers'}
                </span>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deepak Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-400 text-sm font-medium transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. traveller@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-400 text-sm font-medium transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-hidden focus:border-amber-400 text-sm font-medium transition-colors"
                />
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Total Payable Amount
                  </p>
                  <p className="text-2xl font-black text-gray-900">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-bold">Scout Protected</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 bg-amber-400 hover:bg-black hover:text-white text-gray-900 font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3
              className="text-2xl font-black text-gray-900 mb-2"
              style={{ fontFamily: typography.fonts.jakarta }}
            >
              Booking Request Received!
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Thank you, <span className="font-bold text-gray-900">{name}</span>! Our certified Scout Captain will contact you via WhatsApp / Phone at <span className="font-bold text-gray-900">{phone}</span> with your itinerary details and confirmation voucher.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-black font-extrabold text-sm rounded-xl transition-all cursor-pointer"
            >
              Back to Trip Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
