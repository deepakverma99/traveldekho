'use client';

import React from 'react';
import { Compass, CheckCircle2 } from 'lucide-react';

export const PrepForTripCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-3.5 md:p-4 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-2 sm:gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <h3 className="text-[11px] sm:text-xs font-black text-gray-900 uppercase tracking-wider m-0">
            Prep For Trip
          </h3>
        </div>
      </div>

      <ul className="list-none p-0 m-0 flex flex-col gap-1.5 sm:gap-2">
        <li className="flex items-start gap-2 p-2 sm:p-2.5 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-100 text-[11px] sm:text-[11.5px] font-medium text-gray-600 leading-snug">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <span>Verify government identity proofs (Aadhaar / Passport) for all travelers before departure.</span>
        </li>

        <li className="flex items-start gap-2 p-2 sm:p-2.5 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-100 text-[11px] sm:text-[11.5px] font-medium text-gray-600 leading-snug">
          <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          </div>
          <span>Check weather forecasts and regional guidelines for 48 hours prior to arrival.</span>
        </li>
      </ul>
    </div>
  );
};
