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
    <div className="bg-white rounded-[1.75rem] p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-4.5 h-4.5" />
          </div>
          <h3 className="text-[15px] font-black text-gray-900 uppercase tracking-wider m-0">
            Trip Partner Info
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 p-3.5 sm:p-5 rounded-2xl transition-colors hover:bg-gray-100/50">
        <div className="relative w-12 h-12 bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden shrink-0">
          <Image
            src={data.tripImage || '/trips/spiti.png'}
            alt={data.partnerName}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">
            Managed by
          </span>
          <h4 className="text-base font-black text-gray-900 capitalize my-0.5 truncate">
            {data.partnerName}
          </h4>
          <span className="text-[11px] font-extrabold text-emerald-600 inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Trip Partner</span>
            <span className="flex items-center gap-0.5 text-amber-500 font-bold ml-1">
              <Star className="w-3 h-3 fill-amber-500" />
              <span>New</span>
            </span>
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onCall}
        className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-amber-400 text-gray-900 text-xs font-black uppercase tracking-wider border-0 cursor-pointer shadow-xs transition-all hover:bg-black hover:text-white active:scale-98 [&>svg]:w-3.5 [&>svg]:h-3.5"
      >
        <Phone />
        <span>Call Trip Partner</span>
      </button>
    </div>
  );
};
