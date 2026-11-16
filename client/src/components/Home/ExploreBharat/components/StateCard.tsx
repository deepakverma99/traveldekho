'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { colorTokens } from '@/theme';
import { ExploreStateItem } from '../types';

interface StateCardProps {
  state: ExploreStateItem;
}

export const StateCard: React.FC<StateCardProps> = ({ state }) => {
  const bgImage = state.image || `/destinations/${state.id}.png`;

  return (
    <div className="group relative flex flex-col justify-between p-2.5 sm:p-4 rounded-2xl sm:rounded-[24px] border border-gray-200/60 shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.2)] transition-all duration-300 font-jakarta overflow-hidden min-h-[380px] sm:min-h-[400px]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={state.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={false}
        />
        {/* Deep contrast gradient overlay: lighter at top for scenery, deep at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 via-50% to-black/25 group-hover:from-black/95 group-hover:via-black/75 transition-colors duration-300" />
        {/* Subtle warm brand tint highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-[#ff5722]/15 pointer-events-none" />
      </div>

      {/* Card Content Layer */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top: Trip Count Badge */}
        <div className="flex items-center justify-end">
          <span
            style={{
              backgroundColor: colorTokens.primaryContainer,
            }}
            className="inline-flex items-center px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-full text-[8.5px] sm:text-[11px] font-bold text-white shadow-[0_2px_8px_rgba(255,87,34,0.4)] select-none"
          >
            {state.tripCountText}
          </span>
        </div>

        {/* Bottom Details Stack */}
        <div className="mt-auto pt-12 flex flex-col">
          {/* State Title */}
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[#ffb5a0] transition-colors leading-tight drop-shadow-sm">
            {state.name}
          </h3>

          {/* Subtitle / Tagline */}
          <p className="text-xs sm:text-[13px] font-medium mt-1 mb-4 text-white/90 leading-normal drop-shadow-xs">
            {state.subtitle}
          </p>

          {/* Destination Chips */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            {state.tags.map((tag) => (
              <Link
                key={tag}
                href={`/search?query=${encodeURIComponent(tag)}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-white/95 bg-white/15 backdrop-blur-md border border-white/25 rounded-lg hover:bg-[#ff5722] hover:border-[#ff5722] hover:text-white transition-all cursor-pointer select-none shadow-xs"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Bottom Link: Explore Itineraries */}
          <Link
            href={state.href}
            className="flex items-center justify-between pt-3.5 border-t border-white/20 font-bold text-xs sm:text-[13px] text-white hover:text-[#ff5722] transition-colors select-none"
          >
            <span>Explore Itineraries</span>
            <ArrowRight
              style={{ color: colorTokens.primaryContainer }}
              className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
