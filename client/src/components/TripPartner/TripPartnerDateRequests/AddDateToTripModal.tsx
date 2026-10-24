'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  CalendarCheck,
  MapPin,
  Clock,
} from 'lucide-react';
import { DateRequestItem, AddDateToTripFormValues } from './types';

interface AddDateToTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: DateRequestItem | null;
  onConfirm: (requestId: string, values: AddDateToTripFormValues) => void;
}

export const AddDateToTripModal: React.FC<AddDateToTripModalProps> = ({
  isOpen,
  onClose,
  request,
  onConfirm,
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Sync initial dates when modal opens with a request
  useEffect(() => {
    if (request) {
      setStartDate(request.requestedStartDate || '');
      setEndDate(request.requestedEndDate || '');
      setError(null);
    }
  }, [request]);

  if (!isOpen || !request) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setError('Please select both start date and end date.');
      return;
    }

    if (new Date(endDate).getTime() < new Date(startDate).getTime()) {
      setError('End date cannot be earlier than start date.');
      return;
    }

    onConfirm(request.id, {
      startDate,
      endDate,
    });

    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 font-jakarta">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 flex flex-col"
        >
          {/* Header */}
          <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-gray-100 flex items-start justify-between gap-3 bg-gradient-to-b from-amber-50/40 to-transparent">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider mb-1.5">
                <Calendar className="w-3 h-3 text-amber-600" />
                Add Date to Trip
              </div>
              <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                Add Date to Trip
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Confirm schedule dates to add a departure to this trip
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
              title="Close modal"
              aria-label="Close"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="px-5 sm:px-6 py-5 space-y-4">
            {/* Trip Overview Pill */}
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200/80 flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                <Image
                  src={request.tripImage || '/trips/spiti.png'}
                  alt={request.tripTitle}
                  fill
                  className="object-cover"
                  sizes="48px"
                  unoptimized
                />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 truncate">
                  {request.tripTitle}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium mt-0.5">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="truncate">{request.tripLocation}</span>
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400 shrink-0" />
                    <span>{request.tripDuration}</span>
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Traveler
                </span>
                <span className="text-xs font-black text-gray-900 truncate max-w-[120px] block">
                  {request.travelerName}
                </span>
              </div>
            </div>

            {error && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700">
                {error}
              </div>
            )}

            {/* Date Range Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setError(null);
                    }}
                    required
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  End Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      setError(null);
                    }}
                    required
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 flex flex-col-reverse min-[420px]:flex-row items-stretch min-[420px]:items-center justify-end gap-2 sm:gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="py-2 sm:py-2.5 px-4 rounded-xl border border-gray-200 text-xs sm:text-[13px] font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 py-2 sm:py-2.5 px-5 rounded-xl bg-[#0b132b] hover:bg-[#1c2541] text-white hover:text-amber-300 font-bold text-xs sm:text-[13px] transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg border border-amber-400/20"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-amber-400 stroke-[2.5]" />
                <span>Confirm & Add Date to Trip</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
