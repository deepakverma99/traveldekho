'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';
import { colorTokens } from '@/theme';

interface ExploreBharatHeaderProps {
  isExpanded: boolean;
  onToggleExpanded: () => void;
  viewAllHref?: string;
}

export const ExploreBharatHeader: React.FC<ExploreBharatHeaderProps> = ({
  isExpanded,
  onToggleExpanded,
  viewAllHref,
}) => {
  return (
    <div className="w-full mb-6 sm:mb-8 font-jakarta">
      {/* Top Flex Row */}
      <div className="flex items-center justify-between gap-4">
        {/* Left: Compass Icon + Title + Badge */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Compass Icon */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 border border-orange-200/80 flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 stroke-[2.2]" />
          </div>

          {/* Heading */}
          <h2
            style={{ color: colorTokens.textPrimary }}
            className="text-2xl sm:text-[28px] md:text-[32px] font-black tracking-tight leading-none"
          >
            <span>Explore </span>
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
            EXPLORE STATES
          </span>
        </div>

        {/* Right: View All States */}
        {viewAllHref ? (
          <Link
            href={viewAllHref}
            style={{ color: colorTokens.primaryContainer }}
            className="group flex items-center gap-1.5 text-sm sm:text-[15px] font-extrabold hover:brightness-95 transition-all select-none shrink-0"
          >
            <span>View All States</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={onToggleExpanded}
            style={{ color: colorTokens.primaryContainer }}
            className="group flex items-center gap-1.5 text-sm sm:text-[15px] font-extrabold hover:brightness-95 transition-all select-none cursor-pointer shrink-0"
          >
            <span>{isExpanded ? 'Show Fewer States' : 'View All States'}</span>
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
        Find curated trips, hidden gems, and top adventures across India
      </p>
    </div>
  );
};
