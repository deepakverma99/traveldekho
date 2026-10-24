'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  ChevronDown,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  CalendarCheck,
} from 'lucide-react';
import { TripBookingsGroup } from './types';
import { BookingItemCard } from './BookingItemCard';

interface TripBookingsAccordionProps {
  group: TripBookingsGroup;
  isOpen: boolean;
  onToggle: () => void;
  onMarkPaid: (bookingId: string) => void;
  onDelete: (bookingId: string) => void;
}

export const TripBookingsAccordion: React.FC<TripBookingsAccordionProps> = ({
  group,
  isOpen,
  onToggle,
  onMarkPaid,
  onDelete,
}) => {
  const totalGuests = group.bookings.reduce((sum, b) => sum + (b.guestsCount || 1), 0);
  const paidBookings = group.bookings.filter((b) => b.paymentStatus === 'paid');
  const paidCount = paidBookings.length;
  const paidRevenue = paidBookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const unpaidRevenue = Math.max(0, group.totalRevenue - paidRevenue);
  const paidPercent =
    group.totalBookings > 0 ? Math.round((paidCount / group.totalBookings) * 100) : 0;

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 shadow-2xs font-jakarta overflow-hidden ${
        isOpen ? 'border-amber-200 shadow-md' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Group Header */}
      <div
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        aria-expanded={isOpen}
        className={`p-3.5 sm:p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-3.5 sm:gap-4 cursor-pointer select-none transition-colors ${
          isOpen ? 'bg-amber-50/20' : 'bg-white hover:bg-gray-50/50'
        }`}
      >
        {/* Left: Thumbnail & Trip Info */}
        <div className="flex items-start sm:items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
          <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
            <Image
              src={group.tripImage || '/trips/spiti.png'}
              alt={group.tripTitle}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 56px, 80px"
              unoptimized
            />
            <span className="absolute bottom-1 right-1 px-1 sm:px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[8px] sm:text-[9px] font-black text-white uppercase tracking-wider">
              {group.tripDuration}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-sm sm:text-base font-extrabold text-gray-900 truncate mb-1">
              {group.tripTitle}
            </h2>
            <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-gray-500 font-medium">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate max-w-[120px] sm:max-w-none">{group.tripLocation}</span>
              </span>
              <span className="text-gray-300">•</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{group.tripDuration}</span>
              </span>
              <span className="text-gray-300 hidden min-[400px]:inline">•</span>
              <span className="inline-flex items-center gap-1 text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
                <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>
                  {totalGuests} {totalGuests === 1 ? 'Traveler' : 'Travelers'}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Center: Collection Status & Segmented Progress */}
        <div className="w-full xl:w-64 shrink-0 px-0 xl:px-4 py-2.5 xl:py-0 border-y xl:border-y-0 xl:border-x border-gray-100 flex flex-col justify-center">
          <div className="flex items-center justify-between text-[11px] font-bold text-gray-700 mb-1.5">
            <span className="text-gray-500 uppercase tracking-wider text-[10px]">Collection Status</span>
            <span className="text-gray-900">
              {paidPercent}% Paid ({paidCount}/{group.totalBookings})
            </span>
          </div>

          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                paidPercent === 100 ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${paidPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 mt-1.5 flex-wrap gap-1">
            <span className="text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" /> ₹{paidRevenue.toLocaleString('en-IN')} Paid
            </span>
            {group.unpaidCount > 0 ? (
              <span className="text-amber-700 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-amber-500 shrink-0" /> ₹{unpaidRevenue.toLocaleString('en-IN')} Pending
              </span>
            ) : (
              <span className="text-emerald-600 font-bold">All Settled</span>
            )}
          </div>
        </div>

        {/* Right: Bookings, Revenue, Unpaid and Toggle Button */}
        <div className="flex items-center justify-between xl:justify-end gap-1.5 sm:gap-2.5 md:gap-3 shrink-0 w-full xl:w-auto">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 flex-1 xl:flex-initial">
            {/* Bookings */}
            <div className="flex flex-col items-center justify-center px-1.5 sm:px-3 py-1.5 rounded-xl border border-gray-100 bg-gray-50/80 text-center min-w-0 sm:min-w-[80px]">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5 truncate max-w-full">Bookings</span>
              <span className="text-xs sm:text-sm font-black text-gray-900 flex items-center justify-center gap-1">
                <CalendarCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 shrink-0" />
                <span>{group.totalBookings}</span>
              </span>
            </div>

            {/* Total Revenue */}
            <div className="flex flex-col items-center justify-center px-1.5 sm:px-3 py-1.5 rounded-xl border border-emerald-100 bg-emerald-50/80 text-center min-w-0 sm:min-w-[85px]">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-0.5 truncate max-w-full">Total Revenue</span>
              <span className="text-xs sm:text-sm font-black text-emerald-800 truncate max-w-full">₹{group.totalRevenue.toLocaleString('en-IN')}</span>
            </div>

            {/* Unpaid */}
            <div
              className={`flex flex-col items-center justify-center px-1.5 sm:px-3 py-1.5 rounded-xl border text-center min-w-0 sm:min-w-[75px] ${
                group.unpaidCount > 0
                  ? 'border-amber-100 bg-amber-50/80 text-amber-800'
                  : 'border-gray-100 bg-gray-50 text-gray-600'
              }`}
            >
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5 truncate max-w-full">Unpaid</span>
              <span className="text-xs sm:text-sm font-black">
                {group.unpaidCount > 0 ? (
                  <span className="flex items-center justify-center gap-1 text-amber-800">
                    <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                    <span>{group.unpaidCount}</span>
                  </span>
                ) : (
                  '0'
                )}
              </span>
            </div>
          </div>

          {/* Toggle View/Hide Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            aria-label={isOpen ? 'Collapse trip bookings' : 'Expand trip bookings'}
            className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-wider border cursor-pointer transition-all duration-150 shrink-0 ${
              isOpen
                ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
            }`}
          >
            <span>{isOpen ? 'Hide' : 'View'}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Collapsible Bookings List with smooth animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="bookings-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden border-t border-gray-100 bg-gray-50/50"
          >
            <div className="p-3 sm:p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-gray-200/80 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-gray-800">
                    Passenger Manifest
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black">
                    {group.bookings.length} {group.bookings.length === 1 ? 'Booking' : 'Bookings'}
                  </span>
                </div>
                <div className="text-xs font-semibold text-gray-500">
                  Manage individual traveler tickets, payment status, and itineraries
                </div>
              </div>

              {group.bookings.map((booking) => (
                <BookingItemCard
                  key={booking.id}
                  booking={booking}
                  onMarkPaid={onMarkPaid}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
