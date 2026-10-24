'use client';

import React from 'react';
import Link from 'next/link';
import { Users, Mail, Calendar, Check, Trash2, ExternalLink, Phone } from 'lucide-react';
import { TripPartnerBooking } from '../types';

interface BookingItemCardProps {
  booking: TripPartnerBooking;
  onMarkPaid: (bookingId: string) => void;
  onDelete: (bookingId: string) => void;
}

export const BookingItemCard: React.FC<BookingItemCardProps> = ({
  booking,
  onMarkPaid,
  onDelete,
}) => {
  const isPaid = booking.paymentStatus === 'paid';
  const guests = booking.guestsCount || 1;
  const travelDate = booking.travelDate || '30/10/2026';
  const bookingDate = booking.bookingDate || '18 OCT 2026';

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 hover:border-amber-200 transition-colors shadow-2xs font-jakarta min-w-0">
      {/* Left: Avatar & Traveler Details */}
      <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
        <div
          title={booking.travelerName}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-amber-500/10 text-amber-700 font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0 border border-amber-200"
        >
          {getInitials(booking.travelerName)}
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate max-w-[200px] sm:max-w-none">
              {booking.travelerName}
            </h3>
            <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-mono text-[9px] sm:text-[10px] font-bold">
              #{booking.id}
            </span>
          </div>

          {booking.travelerPhone && (
            <p className="text-[11px] text-gray-500 font-medium truncate">
              <Phone className="w-3 h-3 text-gray-400 shrink-0 inline mr-1" />
              <span>{booking.travelerPhone}</span>
            </p>
          )}

          <p className="text-[11px] text-gray-500 font-medium flex items-center gap-1.5 truncate">
            <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="truncate">{booking.travelerEmail}</span>
          </p>

          <p className="flex items-center gap-2 text-[10px] font-bold text-gray-600 tracking-wide uppercase flex-wrap">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-amber-500 shrink-0" />
              {guests} {guests > 1 ? 'GUESTS' : 'GUEST'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gray-400 shrink-0" />
              <span>{travelDate}</span>
            </span>
          </p>
        </div>
      </div>

      {/* Right: Amount, Status, Paid Action, and Icon Buttons */}
      <div className="flex items-center flex-wrap sm:flex-nowrap justify-between md:justify-end gap-2.5 sm:gap-4 pt-2.5 md:pt-0 border-t md:border-t-0 border-gray-100 min-w-0">
        {/* Amount */}
        <div className="flex flex-col text-left md:text-right">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Amount
          </span>
          <span className="text-xs sm:text-sm md:text-base font-extrabold text-gray-900">
            ₹{booking.amount?.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Status Pill & Booking Date */}
        <div className="flex flex-col items-start md:items-end gap-0.5">
          <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">
            {booking.status || 'BOOKED'}
          </span>
          <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium">{bookingDate}</span>
        </div>

        {/* Mark Paid / Paid Status */}
        {isPaid ? (
          <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] sm:text-xs font-black uppercase tracking-wider shrink-0">
            <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5 stroke-[3]" />
            <span>PAID</span>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onMarkPaid(booking.id)}
            title="Click to mark this booking as paid"
            className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] sm:text-xs font-black uppercase tracking-wider cursor-pointer transition-colors shrink-0"
          >
            <span>💰</span>
            <span>MARK PAID</span>
          </button>
        )}

        {/* Action Icon Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Are you sure you want to remove booking for ${booking.travelerName}?`)) {
                onDelete(booking.id);
              }
            }}
            title="Delete Booking"
            aria-label="Delete booking"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors text-red-500 hover:text-red-700 hover:bg-red-50 border border-gray-200 hover:border-red-200 [&>svg]:w-3 sm:[&>svg]:w-3.5 [&>svg]:h-3 sm:[&>svg]:h-3.5"
          >
            <Trash2 />
          </button>

          <Link
            href={`/bookings/${booking.id}`}
            target="_blank"
            rel="noopener noreferrer"
            title="View Booking Details"
            aria-label="View booking details"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 [&>svg]:w-3 sm:[&>svg]:w-3.5 [&>svg]:h-3 sm:[&>svg]:h-3.5"
          >
            <ExternalLink />
          </Link>
        </div>
      </div>
    </div>
  );
};
