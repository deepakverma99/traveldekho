'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  Check,
  Copy,
  Sparkles,
} from 'lucide-react';
import { TravelerBooking } from '../types';
import { Button } from '@/components/shared';
import { colorTokens } from '@/theme';

interface BookingCardProps {
  booking: TravelerBooking;
  isCopied: boolean;
  onCopyRef: (ref: string) => void;
  onViewDetails: (id: string) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  isCopied,
  onCopyRef,
  onViewDetails,
}) => {
  const isCompleted = booking.status === 'COMPLETED';
  const isUpcoming = booking.status === 'UPCOMING';

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.22 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:border-gray-200 transition-all duration-300 p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-stretch overflow-hidden"
    >
      {/* Trip Thumbnail Image */}
      <div className="relative w-full md:w-56 lg:w-60 h-48 md:h-auto min-h-[180px] rounded-2xl overflow-hidden shrink-0 bg-gray-100">
        <Image
          src={booking.image}
          alt={booking.tripTitle}
          fill
          sizes="(max-width: 768px) 100vw, 240px"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Status Badge Over Image */}
        <div className="absolute top-3 left-3 z-10">
          {isUpcoming && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/95 text-blue-700 shadow-xs backdrop-blur-xs border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              CONFIRMED
            </span>
          )}
          {isCompleted && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/95 text-emerald-700 shadow-xs backdrop-blur-xs border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              COMPLETED
            </span>
          )}
        </div>

        {/* Duration Capsule Bottom Right */}
        <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-black/70 text-white backdrop-blur-xs flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{booking.duration}</span>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Reference ID & Partner Bar */}
          <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-gray-100">
            <button
              type="button"
              onClick={() => onCopyRef(booking.referenceId)}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer select-none"
              title="Click to copy booking reference"
            >
              <span>{booking.referenceId}</span>
              {isCopied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
              ) : (
                <Copy className="w-3 h-3 text-gray-400 stroke-[2]" />
              )}
              {isCopied && (
                <span className="text-[10px] font-sans font-bold text-emerald-600">
                  Copied
                </span>
              )}
            </button>

            {/* Scout Verified Partner Badge */}
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded-md border border-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 stroke-[2.2]" />
              <span>{booking.partnerName}</span>
            </div>
          </div>

          {/* Trip Title */}
          <h4 className="text-base sm:text-lg font-black text-gray-900 tracking-tight mt-2.5 line-clamp-1">
            {booking.tripTitle}
          </h4>

          {/* Location & Hub */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold mt-1">
            <MapPin
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: colorTokens.primaryContainer }}
            />
            <span className="truncate">{booking.destination}</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500 text-[11px]">Ex-{booking.pickupHub}</span>
          </div>

          {/* Trip Parameters Badges */}
          <div className="flex flex-wrap items-center gap-3 mt-3 pt-2 text-xs text-gray-600 font-medium">
            <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span className="font-semibold text-gray-800">{booking.travelDate}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
              <Users className="w-3.5 h-3.5 text-gray-500" />
              <span className="font-semibold text-gray-800">
                {booking.guestsCount} Travelers
              </span>
            </div>
          </div>
        </div>

        {/* Pricing & Footer Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 mt-3 border-t border-gray-100">
          <div>
            <span className="block text-[10px] uppercase font-bold tracking-wider text-gray-400">
              Total Amount
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-black text-gray-900">
                ₹{booking.totalAmount.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] font-bold text-emerald-600">
                ✓ {booking.paymentStatus === 'PAID' ? 'Paid in Full' : booking.paymentStatus}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {isCompleted && (
              <button
                type="button"
                onClick={() => onViewDetails(booking.id)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Rate Trip</span>
              </button>
            )}

            <Button
              variant="primary"
              size="sm"
              rounded="xl"
              showArrow
              onClick={() => onViewDetails(booking.id)}
              className="text-xs sm:text-[13px] py-2 px-4 shadow-sm whitespace-nowrap shrink-0"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default BookingCard;

