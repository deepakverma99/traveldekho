'use client';

import React from 'react';

interface TripDestinationsCoveredProps {
  destinations: string[];
}

export const TripDestinationsCovered: React.FC<TripDestinationsCoveredProps> = ({
  destinations,
}) => {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl text-gray-900 mb-5 sm:mb-6 font-caveat">
        Destinations Covered
      </h2>

      <div className="flex flex-wrap gap-2.5 sm:gap-3">
        {destinations.map((destination) => (
          <span
            key={destination}
            className="py-2 px-4 sm:py-2.5 sm:px-5 bg-primary text-gray-900 text-[11px] sm:text-xs font-black uppercase tracking-wider rounded-full shadow-xs"
          >
            {destination}
          </span>
        ))}
      </div>
    </section>
  );
};
