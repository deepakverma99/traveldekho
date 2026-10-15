'use client';

import React from 'react';
import { CostingSlot } from './types';
import { typography } from '@/theme/typography';

interface TripCostingSectionProps {
  costing: CostingSlot[];
}

export const TripCostingSection: React.FC<TripCostingSectionProps> = ({
  costing,
}) => {
  return (
    <section>
      <h2
        className="text-2xl md:text-3xl text-gray-900 mb-6 sm:mb-8"
        style={{ fontFamily: typography.fonts.caveat }}
      >
        Costing
      </h2>

      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-5 sm:px-6 py-3.5 sm:py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Route
              </th>
              <th className="px-5 sm:px-6 py-3.5 sm:py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right sm:text-left">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {costing.map((slot, index) => (
              <tr
                key={index}
                className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-5 sm:px-6 py-3.5 sm:py-4">
                  <div className="text-xs sm:text-sm font-bold text-gray-800">
                    {slot.dateRange}
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium mt-0.5">
                    {slot.location}
                  </div>
                </td>
                <td className="px-5 sm:px-6 py-3.5 sm:py-4 text-right sm:text-left">
                  <span className="text-xs sm:text-sm font-black text-gray-900">
                    ₹{slot.price.toLocaleString('en-IN')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
