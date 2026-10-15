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
      <Link href={`/trip-partners/${partner.slug}`}>
        <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 p-3 pr-5 rounded-2xl w-fit hover:bg-gray-100/80 transition-colors cursor-pointer group shadow-2xs">
          <div className="relative w-10 h-10 bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden shrink-0">
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              sizes="40px"
              className="object-contain p-1.5 group-hover:scale-105 transition-transform"
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
              Managed by
            </p>
            <p className="font-extrabold text-gray-900 text-sm tracking-tight capitalize group-hover:text-amber-600 transition-colors">
              {partner.name}
            </p>
          </div>

          {partner.isVerified && (
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0"
                title="Scout Verified Partner"
              >
                <ShieldCheck className="w-4 h-4 text-green-600" />
              </div>
            </div>
          )}
        </div>
      </Link>
    </section>
  );
};
