'use client';

import React from 'react';
import { MapPin } from 'lucide-react';

interface TripPickupPointsProps {
  pickupPoints: string[];
}

export const TripPickupPoints: React.FC<TripPickupPointsProps> = ({
  pickupPoints,
}) => {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl text-gray-900 mb-5 sm:mb-6 font-caveat">
        Pickup Points
      </h2>

      <div className="flex flex-col gap-2.5">
        {pickupPoints.map((point) => (
          <div
            key={point}
            className="flex items-center gap-3 p-3.5 sm:px-4 bg-gray-50 hover:bg-gray-100/60 rounded-xl border border-gray-100 transition-colors duration-150"
          >
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-gray-700">
              {point}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
