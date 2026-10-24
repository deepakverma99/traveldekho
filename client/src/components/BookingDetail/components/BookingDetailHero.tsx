'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Calendar, Users, ShieldCheck } from 'lucide-react';
import { BookingDetailData } from '../types';

interface BookingDetailHeroProps {
  data: BookingDetailData;
}

export const BookingDetailHero: React.FC<BookingDetailHeroProps> = ({ data }) => {
  const guestsLabel =
    data.guestsCount === 1 ? '1 Traveler' : `${data.guestsCount} Travelers`;
  const additionalLabel =
    data.additionalGuestsCount === 0
      ? '1 PRIMARY, 0 ADDITIONAL'
      : `1 PRIMARY, ${data.additionalGuestsCount} ADDITIONAL`;

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* Hero Banner with Image & Overlay */}
      <div className="relative w-full rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[250px] md:min-h-[280px] flex flex-col justify-between shadow-md border border-gray-100 bg-white">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={data.tripImage || '/trips/spiti.png'}
            alt={data.tripTitle}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 850px"
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-black/90 flex flex-col justify-between p-3 sm:p-4 md:p-5 z-10">
          {/* Top Bar inside Image */}
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-2.5 w-full">
            <Link
              href={`/trip-partner/${encodeURIComponent(data.partnerName.toLowerCase().replace(/\s+/g, '-'))}/dashboard`}
              className="inline-flex items-center gap-1.5 bg-white/20 border border-white/40 backdrop-blur-md rounded-full p-0.5 pr-2.5 sm:p-1 sm:pr-3 no-underline transition-all hover:bg-white/30 hover:-translate-y-0.5 shadow-xs shrink-0"
            >
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden bg-amber-400 border-[1.5px] border-white shrink-0">
                <Image
                  src={data.tripImage || '/trips/spiti.png'}
                  alt={data.partnerName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[7px] sm:text-[7.5px] font-black uppercase tracking-widest text-white/80 leading-none">
                  Managed by
                </span>
                <span className="text-[10px] sm:text-[11px] font-black text-white tracking-tight leading-tight capitalize">
                  {data.partnerName}
                </span>
              </div>
              <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/90" />
            </Link>

            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-end">
              <span className="inline-flex items-center gap-1 bg-black/45 border border-white/25 backdrop-blur-md text-white text-[9px] sm:text-[9.5px] font-extrabold uppercase tracking-wider py-0.5 px-2 sm:px-2.5 rounded-full shadow-xs">
                <Calendar className="w-2.5 h-2.5 text-amber-400" />
                <span>Booked: {data.bookingDate}</span>
              </span>
              <span className="bg-amber-400 text-gray-900 text-[8.5px] sm:text-[9px] font-black uppercase tracking-wider py-0.5 px-2 sm:px-2.5 rounded-full shadow-xs">
                Confirmed Booking
              </span>
            </div>
          </div>

          {/* Bottom Title & Details inside Image */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <h2 className="text-lg sm:text-2xl md:text-[26px] font-black text-white uppercase tracking-tight m-0 leading-tight">
              {data.tripTitle}
            </h2>
            <div className="flex items-center flex-wrap gap-1 sm:gap-1.5">
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[9.5px] font-extrabold text-white uppercase tracking-wider bg-black/35 border border-white/20 py-0.5 px-2 sm:px-2.5 rounded-full backdrop-blur-md">
                <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
                <span>{data.tripLocation}</span>
              </span>

              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[9.5px] font-extrabold text-white uppercase tracking-wider bg-black/35 border border-white/20 py-0.5 px-2 sm:px-2.5 rounded-full backdrop-blur-md">
                <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
                <span>{data.tripDuration}</span>
              </span>

              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[9.5px] font-extrabold text-white uppercase tracking-wider bg-black/35 border border-white/20 py-0.5 px-2 sm:px-2.5 rounded-full backdrop-blur-md">
                <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
                <span>Booked: {data.bookingDate}</span>
              </span>

              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[9.5px] font-extrabold text-white uppercase tracking-wider bg-black/35 border border-white/20 py-0.5 px-2 sm:px-2.5 rounded-full backdrop-blur-md">
                <span>Scout Verified</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Dates & Guests Strip Card */}
      <div className="bg-white rounded-2xl p-2.5 min-[400px]:p-3.5 sm:p-5 md:p-6 sm:px-6 md:px-8 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] border border-gray-100 grid grid-cols-3 gap-1.5 min-[400px]:gap-2 sm:gap-4 md:gap-6">
        <div className="flex flex-col min-[520px]:flex-row items-start min-[520px]:items-center gap-1 min-[400px]:gap-1.5 min-[520px]:gap-3 md:gap-4 p-2 min-[400px]:p-2.5 sm:p-3 px-2 min-[400px]:px-2.5 sm:px-3.5 md:px-4 bg-gray-50 rounded-xl border border-gray-100 transition-colors hover:bg-amber-50/50 hover:border-amber-200 min-w-0">
          <div className="w-6 h-6 min-[400px]:w-7 min-[400px]:h-7 min-[520px]:w-8 min-[520px]:h-8 md:w-10 md:h-10 rounded-md sm:rounded-lg bg-white border border-gray-200 flex items-center justify-center text-amber-600 shrink-0 shadow-xs">
            <Calendar className="w-3 h-3 min-[400px]:w-3.5 min-[400px]:h-3.5 min-[520px]:w-4 md:w-4.5" />
          </div>
          <div className="flex flex-col min-w-0 w-full">
            <span className="text-[8px] min-[400px]:text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-wider truncate">
              Check-In
            </span>
            <span className="text-[11px] min-[380px]:text-[12px] min-[440px]:text-[14px] sm:text-[17px] font-black text-gray-900 tracking-tight leading-tight truncate">
              {data.checkInDate}
            </span>
            <span className="text-[7px] min-[380px]:text-[7.5px] min-[440px]:text-[8.5px] sm:text-[9.5px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-tight sm:tracking-wider truncate whitespace-nowrap">
              Standard Entry
            </span>
          </div>
        </div>

        <div className="flex flex-col min-[520px]:flex-row items-start min-[520px]:items-center gap-1 min-[400px]:gap-1.5 min-[520px]:gap-3 md:gap-4 p-2 min-[400px]:p-2.5 sm:p-3 px-2 min-[400px]:px-2.5 sm:px-3.5 md:px-4 bg-gray-50 rounded-xl border border-gray-100 transition-colors hover:bg-amber-50/50 hover:border-amber-200 min-w-0">
          <div className="w-6 h-6 min-[400px]:w-7 min-[400px]:h-7 min-[520px]:w-8 min-[520px]:h-8 md:w-10 md:h-10 rounded-md sm:rounded-lg bg-white border border-gray-200 flex items-center justify-center text-amber-600 shrink-0 shadow-xs">
            <Calendar className="w-3 h-3 min-[400px]:w-3.5 min-[400px]:h-3.5 min-[520px]:w-4 md:w-4.5" />
          </div>
          <div className="flex flex-col min-w-0 w-full">
            <span className="text-[8px] min-[400px]:text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-wider truncate">
              Check-Out
            </span>
            <span className="text-[11px] min-[380px]:text-[12px] min-[440px]:text-[14px] sm:text-[17px] font-black text-gray-900 tracking-tight leading-tight truncate">
              {data.checkOutDate}
            </span>
            <span className="text-[7px] min-[380px]:text-[7.5px] min-[440px]:text-[8.5px] sm:text-[9.5px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-tight sm:tracking-wider truncate whitespace-nowrap">
              Standard Exit
            </span>
          </div>
        </div>

        <div className="flex flex-col min-[520px]:flex-row items-start min-[520px]:items-center gap-1 min-[400px]:gap-1.5 min-[520px]:gap-3 md:gap-4 p-2 min-[400px]:p-2.5 sm:p-3 px-2 min-[400px]:px-2.5 sm:px-3.5 md:px-4 bg-gray-50 rounded-xl border border-gray-100 transition-colors hover:bg-amber-50/50 hover:border-amber-200 min-w-0">
          <div className="w-6 h-6 min-[400px]:w-7 min-[400px]:h-7 min-[520px]:w-8 min-[520px]:h-8 md:w-10 md:h-10 rounded-md sm:rounded-lg bg-white border border-gray-200 flex items-center justify-center text-amber-600 shrink-0 shadow-xs">
            <Users className="w-3 h-3 min-[400px]:w-3.5 min-[400px]:h-3.5 min-[520px]:w-4 md:w-4.5" />
          </div>
          <div className="flex flex-col min-w-0 w-full">
            <span className="text-[8px] min-[400px]:text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-wider truncate">
              Guests
            </span>
            <span className="text-[11px] min-[380px]:text-[12px] min-[440px]:text-[14px] sm:text-[17px] font-black text-gray-900 tracking-tight leading-tight truncate">
              {guestsLabel}
            </span>
            <span className="text-[7px] min-[380px]:text-[7.5px] min-[440px]:text-[8.5px] sm:text-[9.5px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-tight sm:tracking-wide whitespace-nowrap truncate inline-block">
              {additionalLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
