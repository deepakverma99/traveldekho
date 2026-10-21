'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { TripPartner } from './types';

interface TripPartnerCardProps {
  partner: TripPartner;
}

export const TripPartnerCard: React.FC<TripPartnerCardProps> = ({ partner }) => {
  return (
    <section>
      <Link href={`/trip-partners/${partner.slug}`} className="no-underline block">
        <div className="group flex items-center gap-4 bg-gray-50 hover:bg-gray-100/80 border border-gray-100 py-3 pl-3 pr-5 rounded-2xl w-fit transition-colors duration-150 cursor-pointer shadow-xs">
          <div className="relative w-10 h-10 bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden shrink-0">
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              sizes="40px"
              className="object-contain p-1.5 transition-transform duration-200 group-hover:scale-105"
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
              Managed by
            </p>
            <p className="font-extrabold text-gray-900 group-hover:text-amber-600 text-sm tracking-tight capitalize transition-colors duration-150">
              {partner.name}
            </p>
          </div>

          {partner.isVerified && (
            <div className="flex items-center gap-2">
              <div
                title="Scout Verified Partner"
                className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          )}
        </div>
      </Link>
    </section>
  );
};
