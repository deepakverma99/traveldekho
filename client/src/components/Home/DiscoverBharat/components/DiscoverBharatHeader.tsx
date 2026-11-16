'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, ArrowRight } from 'lucide-react';
import { colorTokens } from '@/theme';

interface DiscoverBharatHeaderProps {
  isExpanded: boolean;
  onToggleExpanded: () => void;
  viewAllHref?: string;
}

export const DiscoverBharatHeader: React.FC<DiscoverBharatHeaderProps> = ({
  isExpanded,
  onToggleExpanded,
  viewAllHref,
}) => {
  return (
    <div className="w-full mb-6 sm:mb-8 font-jakarta">
      {/* Top Flex Row */}
      <div className="flex items-center justify-between gap-4">
        {/* Left: Building Icon + Title + Badge */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Building Icon */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 border border-orange-200/80 flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-orange-600 stroke-[2.2]" />
          </div>

          {/* Heading */}
          <h2
            style={{ color: colorTokens.textPrimary }}
            className="text-2xl sm:text-[28px] md:text-[32px] font-black tracking-tight leading-none"
          >
            <span>Discover </span>
            <span style={{ color: colorTokens.primaryContainer }}>Bharat</span>
          </h2>

          {/* Badge */}
          <span
            style={{
              backgroundColor: colorTokens.accentWarmTint,
              color: colorTokens.primaryContainer,
              borderColor: 'rgba(255, 87, 34, 0.25)',
            }}
            className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-md border text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase select-none"
          >
            POPULAR HUBS
          </span>
        </div>

        {/* Right: View All Cities Action */}
        {viewAllHref ? (
          <Link
            href={viewAllHref}
            style={{ color: colorTokens.primaryContainer }}
            className="group flex items-center gap-1.5 text-sm sm:text-[15px] font-extrabold hover:brightness-95 transition-all select-none shrink-0"
          >
            <span>View All Cities</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={onToggleExpanded}
            style={{ color: colorTokens.primaryContainer }}
            className="group flex items-center gap-1.5 text-sm sm:text-[15px] font-extrabold hover:brightness-95 transition-all select-none cursor-pointer shrink-0"
          >
            <span>{isExpanded ? 'Show Fewer Cities' : 'View All Cities'}</span>
            <ArrowRight
              className={`w-4 h-4 stroke-[2.5] transition-transform duration-200 ${
                isExpanded ? '-rotate-90' : 'group-hover:translate-x-1'
              }`}
            />
          </button>
        )}
      </div>

      {/* Subtitle */}
      <p
        style={{ color: colorTokens.textSecondary }}
        className="text-[13px] sm:text-sm font-normal mt-2 leading-relaxed"
      >
        Discover top getaways, weekend departures, and iconic hotspots by city
      </p>
    </div>
  );
};
