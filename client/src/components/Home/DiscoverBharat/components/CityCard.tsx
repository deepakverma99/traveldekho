'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { colorTokens } from '@/theme';
import { DiscoverCityItem } from '../types';

interface CityCardProps {
  city: DiscoverCityItem;
}

export const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const bgImage = city.image || `/destinations/${city.id}.png`;

  return (
    <div className="group relative flex flex-col justify-between p-2.5 sm:p-4 rounded-2xl sm:rounded-[24px] border border-gray-200/60 shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.2)] transition-all duration-300 font-jakarta overflow-hidden min-h-[380px] sm:min-h-[400px]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={city.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={false}
        />
        {/* Multi-stop gradient overlay for crisp legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35 group-hover:from-black/95 group-hover:via-black/65 transition-colors duration-300" />
        {/* Subtle warm brand tint highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-[#ff5722]/15 pointer-events-none" />
      </div>

      {/* Card Content Layer */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top: Trip Count Badge */}
        <div className="flex items-center justify-end">
          {/* Trip Count Pill */}
          <span
            style={{
              backgroundColor: colorTokens.primaryContainer,
            }}
            className="inline-flex items-center px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-full text-[8.5px] sm:text-[11px] font-bold text-white shadow-[0_2px_8px_rgba(255,87,34,0.4)] select-none"
          >
            {city.tripCountText}
          </span>
        </div>

        {/* Bottom Details Stack */}
        <div className="mt-auto pt-10 sm:pt-12 flex flex-col">
          {/* City Title */}
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[#ffb5a0] transition-colors leading-tight drop-shadow-sm">
            {city.name}
          </h3>

          {/* Subtitle / Hotspots */}
          <p className="text-xs sm:text-[13px] font-medium mt-1 mb-3.5 sm:mb-4 text-white/85 leading-normal drop-shadow-xs">
            {city.subtitle}
          </p>

          {/* Destination Tags / Hubs */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3.5 sm:mb-4">
            {city.tags.map((tag) => (
              <Link
                key={tag}
                href={`/search?query=${encodeURIComponent(tag)}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-white/95 bg-white/15 backdrop-blur-md border border-white/25 rounded-lg hover:bg-[#ff5722] hover:border-[#ff5722] hover:text-white transition-all cursor-pointer select-none shadow-xs"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Bottom Link: Explore City */}
          <Link
            href={city.href}
            className="flex items-center justify-between pt-3 sm:pt-3.5 border-t border-white/20 font-bold text-xs sm:text-[13px] text-white hover:text-[#ff5722] transition-colors select-none"
          >
            <span>Explore City</span>
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
