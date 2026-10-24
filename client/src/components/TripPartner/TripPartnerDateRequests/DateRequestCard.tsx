'use client';

import React from 'react';
import Image from 'next/image';
import {
  MapPin,
  Calendar,
  CalendarPlus,
  Check,
  CheckCircle2,
  X,
  Phone,
  Mail,
  Pencil,
} from 'lucide-react';
import { DateRequestItem } from './types';

interface DateRequestCardProps {
  request: DateRequestItem;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  onAddDate: (request: DateRequestItem) => void;
}

export const DateRequestCard: React.FC<DateRequestCardProps> = ({
  request,
  onAccept,
  onDecline,
  onAddDate,
}) => {
  const isPending = request.status === 'pending';
  const isAccepted = request.status === 'accepted';
  const isDeclined = request.status === 'declined';

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const formatDateRange = (start: string, end: string) => {
    try {
      const s = new Date(start);
      const e = new Date(end);
      const sStr = s.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      const eStr = e.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      return `${sStr} - ${eStr}`;
    } catch {
      return `${start} to ${end}`;
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 shadow-2xs font-jakarta overflow-hidden ${
        isPending
          ? 'border-amber-200 hover:border-amber-300 hover:shadow-md'
          : isAccepted
          ? 'border-emerald-200 hover:border-emerald-300'
          : 'border-gray-200 hover:border-gray-300 opacity-90'
      }`}
    >
      {/* Top Banner: Trip Info & Status Badge */}
      <div className="p-3.5 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/40">
        {/* Trip Header with Image */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
            <Image
              src={request.tripImage || '/trips/spiti.png'}
              alt={request.tripTitle}
              fill
              className="object-cover"
              sizes="56px"
              unoptimized
            />
            <span className="absolute bottom-0.5 right-0.5 px-1 py-0.2 rounded bg-black/60 backdrop-blur-xs text-[8px] font-black text-white uppercase tracking-wider">
              {request.tripDuration}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 truncate">
                {request.tripTitle}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium mt-0.5">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                <span className="truncate">{request.tripLocation}</span>
              </span>
              <span className="text-gray-300">•</span>
              <span className="font-mono text-[10px] text-gray-400">#{request.id}</span>
            </div>
          </div>
        </div>

        {/* Status Tag */}
        <div className="shrink-0 flex items-center self-start sm:self-auto gap-2">
          {isPending && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Pending Review
            </span>
          )}
          {isAccepted && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-black uppercase tracking-wider">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              Accepted
            </span>
          )}
          {isDeclined && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-800 border border-red-200 text-[11px] font-black uppercase tracking-wider">
              <X className="w-3.5 h-3.5 text-red-600 stroke-[2.5]" />
              Declined
            </span>
          )}
        </div>
      </div>

      {/* Middle Body: Traveler Info, Requested Dates & Notes */}
      <div className="p-3.5 sm:p-5 space-y-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          {/* Traveler Details */}
          <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
            <div
              title={request.travelerName}
              className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-700 font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0 border border-amber-200"
            >
              {getInitials(request.travelerName)}
            </div>

            <div className="min-w-0 flex-1 space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                {request.travelerName}
              </h4>
              <div className="flex items-center flex-wrap gap-2 text-[11px] text-gray-500 font-medium">
                <a
                  href={`tel:${request.travelerPhone}`}
                  className="hover:text-amber-600 inline-flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-gray-400 shrink-0" />
                  <span>{request.travelerPhone}</span>
                </a>
                <span className="text-gray-300">•</span>
                <a
                  href={`mailto:${request.travelerEmail}`}
                  className="hover:text-amber-600 inline-flex items-center gap-1 truncate max-w-[180px] sm:max-w-none"
                >
                  <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                  <span className="truncate">{request.travelerEmail}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Requested Dates & Budget Badges */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
            {/* Requested Dates */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800">
              <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{formatDateRange(request.requestedStartDate, request.requestedEndDate)}</span>
              {request.flexibleDates && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-amber-100 text-amber-800 ml-1">
                  Flexible
                </span>
              )}
            </div>

            {/* Total Estimated Budget */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-black text-emerald-800">
              <span>₹{request.totalEstimatedRevenue.toLocaleString('en-IN')}</span>
              {request.budgetPerPerson && (
                <span className="text-[10px] font-semibold text-emerald-600">
                  (₹{request.budgetPerPerson.toLocaleString('en-IN')}/pax)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Response Note if accepted or declined */}
        {request.responseNote && !isPending && (
          <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-2.5 text-xs text-gray-600 flex items-center gap-2">
            <span className="font-bold text-gray-800 text-[11px] shrink-0">Partner Note:</span>
            <span className="text-gray-600 font-medium">{request.responseNote}</span>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="px-3.5 sm:px-5 py-3 bg-gray-50/60 border-t border-gray-100 flex items-center justify-end gap-2.5">
        {/* Primary Status Handlers */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {isPending && (
            <>
              <button
                type="button"
                onClick={() => onDecline(request.id)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-3 sm:px-4 bg-white hover:bg-red-50 text-red-600 hover:text-red-700 border border-gray-200 hover:border-red-300 rounded-xl text-xs font-bold cursor-pointer transition-all shadow-2xs"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Decline</span>
              </button>

              <button
                type="button"
                onClick={() => onAccept(request.id)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-3.5 sm:px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all shadow-xs hover:shadow-md"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Accept Request</span>
              </button>
            </>
          )}

          {isAccepted && (
            <div className="flex items-center flex-wrap gap-2 justify-end">
              {request.dateAddedToTrip ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Date Added to Trip</span>
                  {request.addedDateRange && (
                    <span className="text-[11px] font-semibold text-emerald-700 hidden min-[480px]:inline">
                      ({request.addedDateRange})
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => onAddDate(request)}
                    className="ml-1 inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-900 hover:text-amber-600 underline cursor-pointer"
                    title="Edit scheduled dates"
                  >
                    <Pencil className="w-2.5 h-2.5" />
                    <span>Edit</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-200">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    Accepted
                  </span>
                  <button
                    type="button"
                    onClick={() => onAddDate(request)}
                    className="inline-flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-3 sm:px-4 bg-[#0b132b] hover:bg-[#1c2541] text-white hover:text-amber-300 rounded-xl text-xs sm:text-[13px] font-bold cursor-pointer transition-all shadow-xs hover:shadow-md border border-amber-400/20 hover:border-amber-400/40"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-amber-400 stroke-[2.25]" />
                    <span>Add Date to Trip</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {isDeclined && (
            <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-xl">
              <X className="w-3.5 h-3.5" />
              Request Closed
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
