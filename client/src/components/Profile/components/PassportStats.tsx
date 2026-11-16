'use client';

import React from 'react';
import { Plane, Star } from 'lucide-react';
import { colorTokens } from '@/theme';

interface PassportStatsProps {
  completedTrips: number;
  reviewsWritten: number;
}

export const PassportStats: React.FC<PassportStatsProps> = ({
  completedTrips,
  reviewsWritten,
}) => {
  return (
    <div className="w-full max-w-[310px] mx-auto lg:mx-0 flex flex-col gap-2.5 mt-3.5">
      {/* Completed Trips Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] px-4.5 py-3.5 flex items-center justify-between transition-all hover:border-gray-200">
        <div className="flex items-center gap-2.5">
          <Plane
            className="w-4.5 h-4.5 shrink-0 stroke-[2.2]"
            style={{ color: colorTokens.primaryContainer }}
          />
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            COMPLETED TRIPS
          </span>
        </div>
        <span className="text-base sm:text-lg font-black text-gray-900">
          {completedTrips}
        </span>
      </div>

      {/* Reviews Written Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] px-4.5 py-3.5 flex items-center justify-between transition-all hover:border-gray-200">
        <div className="flex items-center gap-2.5">
          <Star
            className="w-4.5 h-4.5 shrink-0 stroke-[2.2]"
            style={{ color: colorTokens.primaryContainer }}
          />
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            REVIEWS WRITTEN
          </span>
        </div>
        <span className="text-base sm:text-lg font-black text-gray-900">
          {reviewsWritten}
        </span>
      </div>
    </div>
  );
};
