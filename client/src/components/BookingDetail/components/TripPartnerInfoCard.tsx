'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Phone, Star } from 'lucide-react';
import { BookingDetailData } from '../types';

interface TripPartnerInfoCardProps {
  data: BookingDetailData;
  onCall: () => void;
}

export const TripPartnerInfoCard: React.FC<TripPartnerInfoCardProps> = ({
  data,
  onCall,
}) => {
  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 md:p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-2.5 sm:gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs sm:text-[13px] font-black text-gray-900 uppercase tracking-wider m-0">
            Trip Partner Info
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2.5 bg-gray-50 border border-gray-100 p-2.5 sm:p-3 rounded-xl transition-colors hover:bg-gray-100/50">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-lg shadow-xs border border-gray-100 overflow-hidden shrink-0">
            <Image
              src={data.tripImage || '/trips/spiti.png'}
              alt={data.partnerName}
              fill
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <span className="text-[7.5px] sm:text-[8px] font-black text-gray-400 uppercase tracking-widest block leading-none">
              Managed by
            </span>
            <h4 className="text-[11.5px] sm:text-xs font-black text-gray-900 capitalize my-0.5 truncate leading-tight">
              {data.partnerName}
            </h4>
            <span className="text-[9px] sm:text-[9.5px] font-extrabold text-emerald-600 inline-flex items-center gap-0.5 leading-none">
              <ShieldCheck className="w-2.5 h-2.5 shrink-0" />
              <span>Verified Trip Partner</span>
              <span className="flex items-center gap-0.5 text-amber-500 font-bold ml-0.5">
                <Star className="w-2 h-2 fill-amber-500 shrink-0" />
                <span>New</span>
              </span>
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onCall}
          className="inline-flex items-center justify-center gap-1 py-2 sm:py-2.5 px-3 sm:px-3 rounded-full bg-black text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider border-0 cursor-pointer shadow-xs transition-all hover:bg-neutral-800 hover:-translate-y-0.5 active:scale-98 shrink-0 [&>svg]:w-2.5 [&>svg]:h-2.5"
        >
          <Phone />
          <span>Call</span>
        </button>
      </div>
    </div>
  );
};
