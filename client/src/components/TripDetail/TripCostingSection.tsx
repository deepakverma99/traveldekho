'use client';

import React from 'react';
import { CostingSlot } from './types';

interface TripCostingSectionProps {
  costing: CostingSlot[];
}

export const TripCostingSection: React.FC<TripCostingSectionProps> = ({
  costing,
}) => {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl text-gray-900 mb-6 sm:mb-8 font-caveat">
        Costing
      </h2>

      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="py-3.5 px-5 sm:py-4 sm:px-6 text-[10px] font-black uppercase tracking-wider text-gray-400">
                Route
              </th>
              <th className="py-3.5 px-5 sm:py-4 sm:px-6 text-[10px] font-black uppercase tracking-wider text-gray-400 text-right sm:text-left">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {costing.map((slot, index) => (
              <tr
                key={index}
                className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors duration-150"
              >
                <td className="py-3.5 px-5 sm:py-4 sm:px-6">
                  <div className="text-xs sm:text-sm font-bold text-gray-800">
                    {slot.dateRange}
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium mt-0.5">
                    {slot.location}
                  </div>
                </td>
                <td className="py-3.5 px-5 sm:py-4 sm:px-6 text-right sm:text-left">
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
