'use client';

import React from 'react';
import Link from 'next/link';
import { SunMedium, ArrowRight } from 'lucide-react';
import { colorTokens } from '@/theme';

interface LiveClimateHeaderProps {
  radarHref?: string;
}

export const LiveClimateHeader: React.FC<LiveClimateHeaderProps> = ({
  radarHref = '/search?tab=weather',
}) => {
  return (
    <div className="w-full mt-12 md:mt-16 mb-6 sm:mb-8 font-jakarta">
      {/* Top Flex Row */}
      <div className="flex items-center justify-between gap-4">
        {/* Left: Weather Icon + Title + UPDATED JUST NOW Badge */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Weather Icon */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 border border-orange-200/80 flex items-center justify-center shrink-0">
            <SunMedium className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-orange-600 stroke-[2.2]" />
          </div>

          {/* Heading */}
          <h2
            style={{ color: colorTokens.textPrimary }}
            className="text-2xl sm:text-[28px] md:text-[32px] font-black tracking-tight leading-none"
          >
            <span>Live Weather & Travel </span>
            <span style={{ color: colorTokens.primaryContainer }}>Climate</span>
          </h2>

          {/* Badge with Green Pulsing Dot */}
          <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-700 text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            UPDATED JUST NOW
          </span>
        </div>

        {/* Right: Live Radar & 7-Day Forecast */}
        <Link
          href={radarHref}
          style={{ color: colorTokens.primaryContainer }}
          className="group flex items-center gap-1.5 text-sm sm:text-[15px] font-extrabold hover:brightness-95 transition-all select-none shrink-0"
        >
          <span>Live Radar & 7-Day Forecast</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Subtitle */}
      <p
        style={{ color: colorTokens.textSecondary }}
        className="text-[13px] sm:text-sm font-normal mt-2 leading-relaxed"
      >
        Real-time conditions, temperatures, and best visiting windows for India&apos;s top tourist destinations
      </p>
    </div>
  );
};
