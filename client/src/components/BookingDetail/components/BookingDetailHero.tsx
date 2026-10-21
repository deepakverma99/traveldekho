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
    <div className="flex flex-col gap-5">
      {/* Hero Banner with Image & Overlay */}
      <div className="relative w-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden min-h-[340px] sm:min-h-[380px] flex flex-col justify-between shadow-lg border border-gray-100 bg-white">
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

        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-black/90 flex flex-col justify-between p-6 sm:p-8 z-10">
          {/* Top Bar inside Image */}
          <div className="flex items-center justify-between gap-4 w-full">
            <Link
              href={`/trip-partner/${encodeURIComponent(data.partnerName.toLowerCase().replace(/\s+/g, '-'))}/dashboard`}
              className="inline-flex items-center gap-2.5 bg-white/20 border border-white/40 backdrop-blur-md rounded-full p-1.5 pr-4 no-underline transition-all hover:bg-white/30 hover:-translate-y-0.5 shadow-md"
            >
              <div className="relative w-7 h-7 rounded-full overflow-hidden bg-amber-400 border-[1.5px] border-white shrink-0">
                <Image
                  src={data.tripImage || '/trips/spiti.png'}
                  alt={data.partnerName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[8px] font-black uppercase tracking-widest text-white/80 leading-none">
                  Managed by
                </span>
                <span className="text-xs font-black text-white tracking-tight leading-tight capitalize">
                  {data.partnerName}
                </span>
              </div>
              <ShieldCheck className="w-3.5 h-3.5 text-white/90" />
            </Link>

            <span className="bg-amber-400 text-gray-900 text-[10px] font-black uppercase tracking-wider py-1 px-3 rounded-full shadow-md">
              Confirmed Booking
            </span>
          </div>

          {/* Bottom Title & Details inside Image */}
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight m-0 leading-tight">
              {data.tripTitle}
            </h2>
            <div className="flex items-center flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-white uppercase tracking-wider bg-black/35 border border-white/20 py-1 px-2.5 rounded-full backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{data.tripLocation}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-white uppercase tracking-wider bg-black/35 border border-white/20 py-1 px-2.5 rounded-full backdrop-blur-md">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{data.tripDuration}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-white uppercase tracking-wider bg-black/35 border border-white/20 py-1 px-2.5 rounded-full backdrop-blur-md">
                <span>Scout Verified</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Dates & Guests Strip Card */}
      <div className="bg-white rounded-[1.75rem] p-5 sm:p-6 sm:px-8 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] border border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="flex items-center gap-4 p-3 px-4 bg-gray-50 rounded-2xl border border-gray-100 transition-colors hover:bg-amber-50/50 hover:border-amber-200">
          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-amber-600 shrink-0 shadow-xs">
            <Calendar className="w-4.5 h-4.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Check-In
            </span>
            <span className="text-[17px] font-black text-gray-900 tracking-tight">
              {data.checkInDate}
            </span>
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
              Standard Entry
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 p-3 px-4 bg-gray-50 rounded-2xl border border-gray-100 transition-colors hover:bg-amber-50/50 hover:border-amber-200">
          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-amber-600 shrink-0 shadow-xs">
            <Calendar className="w-4.5 h-4.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Check-Out
            </span>
            <span className="text-[17px] font-black text-gray-900 tracking-tight">
              {data.checkOutDate}
            </span>
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
              Standard Exit
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 p-3 px-4 bg-gray-50 rounded-2xl border border-gray-100 transition-colors hover:bg-amber-50/50 hover:border-amber-200">
          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-amber-600 shrink-0 shadow-xs">
            <Users className="w-4.5 h-4.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Guests
            </span>
            <span className="text-[17px] font-black text-gray-900 tracking-tight">
              {guestsLabel}
            </span>
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
              {additionalLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
