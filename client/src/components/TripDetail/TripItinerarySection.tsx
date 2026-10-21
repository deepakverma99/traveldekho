'use client';

import React from 'react';
import { Utensils } from 'lucide-react';
import { ItineraryItem } from './types';

interface TripItinerarySectionProps {
  itinerary: ItineraryItem[];
}

export const TripItinerarySection: React.FC<TripItinerarySectionProps> = ({
  itinerary,
}) => {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-caveat font-bold text-gray-900">
          Detailed Itinerary
        </h2>
      </div>

      <div className="flex flex-col gap-8 relative before:content-[''] before:absolute before:left-5 md:before:left-7 before:top-0 before:bottom-0 before:w-px before:bg-gray-100">
        {itinerary.map((item) => (
          <div key={item.day} className="relative pl-14 md:pl-20">
            {/* Day Number Badge */}
            <div className="absolute left-0 top-0 w-10 h-10 md:w-14 md:h-14 rounded-xl bg-amber-400 text-black flex items-center justify-center font-black text-xs md:text-sm z-10 shadow-xs">
              {item.day}
            </div>

            {/* Day Itinerary Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 md:p-8 shadow-xs hover:shadow-md transition-shadow">
              <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight mb-2 sm:mb-3">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed mb-4 sm:mb-5 whitespace-pre-wrap">
                {item.description}
              </p>

              {item.meals && (
                <div className="flex flex-wrap gap-4 mt-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
                    <Utensils className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">
                      Meals:
                    </span>
                    <span className="text-xs font-bold text-emerald-800">
                      {item.meals}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
