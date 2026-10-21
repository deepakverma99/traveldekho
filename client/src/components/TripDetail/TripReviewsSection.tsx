'use client';

import React from 'react';
import { Star, ShieldAlert } from 'lucide-react';

export const TripReviewsSection: React.FC = () => {
  return (
    <section className="pt-8 border-t border-gray-100">
      <div className="flex justify-between items-end mb-8 sm:mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-caveat font-bold text-gray-900">
            Traveler Feedback
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-current"
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs font-black text-amber-600 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/50">
              New
            </span>
          </div>
        </div>
      </div>

      <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 sm:p-6 text-center">
        <p className="text-xs sm:text-sm font-bold text-gray-600 flex items-center justify-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            Reviews are exclusively collected from verified travelers after they complete this trip.
          </span>
        </p>
      </div>
    </section>
  );
};
