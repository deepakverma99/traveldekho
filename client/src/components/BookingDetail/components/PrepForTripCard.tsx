'use client';

import React from 'react';
import { Compass, CheckCircle2 } from 'lucide-react';

export const PrepForTripCard: React.FC = () => {
  return (
    <div className="bg-white rounded-[1.75rem] p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <Compass className="w-4.5 h-4.5" />
          </div>
          <h3 className="text-[15px] font-black text-gray-900 uppercase tracking-wider m-0">
            Prep For Trip
          </h3>
        </div>
      </div>

      <ul className="list-none p-0 m-0 flex flex-col gap-3.5">
        <li className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100 text-[13px] font-semibold text-gray-700 leading-relaxed">
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
          <span>Verify government identity proofs (Aadhaar / Passport) for all travelers before departure.</span>
        </li>

        <li className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100 text-[13px] font-semibold text-gray-700 leading-relaxed">
          <div className="w-4.5 h-4.5 flex items-center justify-center shrink-0 mt-0.5">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
          </div>
          <span>Check weather forecasts and regional guidelines for 48 hours prior to arrival.</span>
        </li>
      </ul>
    </div>
  );
};
