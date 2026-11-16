'use client';

import React from 'react';
import { TripCard, TripItem } from '@/components/shared';

interface RankedTripCardProps {
  trip: TripItem;
  rank: number;
  priority?: boolean;
}

export const RankedTripCard: React.FC<RankedTripCardProps> = ({
  trip,
  rank,
  priority = false,
}) => {
  return (
    <div className="relative shrink-0 flex items-end pt-3 pb-8 pl-14 sm:pl-16">
      {/* Big Hollow Outlined Rank Number positioned prominently to the left/bottom of card */}
      <span
        aria-hidden="true"
        className="absolute bottom-6 sm:bottom-7 left-1 sm:left-2 text-[130px] sm:text-[155px] font-black leading-none select-none pointer-events-none z-0 tracking-tighter"
        style={{
          WebkitTextStroke: '2px #CBD5E1',
          color: 'transparent',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        }}
      >
        {rank}
      </span>

      {/* Untouched Trip Card Component */}
      <div className="relative z-10">
        <TripCard trip={trip} priority={priority} />
      </div>
    </div>
  );
};
