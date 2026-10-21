'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Home,
  Mountain,
  Trees,
} from 'lucide-react';
import { FloatingBackground, Button } from '@/components/shared';

export const NotFoundView: React.FC = () => {
  return (
    <main className="flex-1 min-h-[calc(100vh-100px)] sm:min-h-[calc(100vh-120px)] w-full flex flex-col items-center justify-center relative overflow-hidden py-8 sm:py-12 px-4 sm:px-5 bg-cream">
      {/* Floating travel icons background */}
      <FloatingBackground fixed />

      {/* Subtle warm ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(280px,45vw,520px)] h-[clamp(280px,45vw,520px)] rounded-full bg-[radial-gradient(circle,_rgba(250,203,43,0.22)_0%,_rgba(245,158,11,0.08)_50%,_transparent_70%)] blur-[80px] pointer-events-none z-1"
      />

      <div className="relative z-10 max-w-[720px] w-full flex flex-col items-center text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/90 border border-gray-200/95 backdrop-blur-md shadow-xs mb-4 transition-all hover:bg-white hover:border-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-500 ring-4 ring-amber-500/25 animate-pulse" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-gray-700">
            Page Not Found
          </span>
        </div>

        {/* 404 Hero Display with Animated Compass */}
        <div className="flex items-center justify-center gap-[clamp(0.5rem,3vw,1.75rem)] my-2 sm:my-3 relative">
          <div
            aria-hidden="true"
            className="hidden md:flex absolute -left-[12%] top-[18%] items-center gap-1.5 py-1.5 px-3 rounded-full bg-white/95 border border-gray-200/85 shadow-sm text-xs font-bold text-gray-700 whitespace-nowrap animate-float pointer-events-none"
          >
            <Trees className="w-3.5 h-3.5 text-emerald-600" />
            <span>Lost in the Wild</span>
          </div>

          <span className="font-montserrat text-[clamp(5.25rem,18vw,10.5rem)] font-black leading-[0.9] tracking-tighter text-charcoal select-none drop-shadow-sm">
            4
          </span>

          <div
            title="Lost compass spinning"
            className="w-[clamp(4.75rem,16vw,9.25rem)] h-[clamp(4.75rem,16vw,9.25rem)] rounded-full flex items-center justify-center relative bg-gradient-to-br from-[#fff2a3] via-amber-400 to-[#dfac16] shadow-[0_12px_36px_rgba(250,203,43,0.45),0_2px_8px_rgba(0,0,0,0.08)] transition-transform hover:scale-105"
          >
            <div className="w-[82%] h-[82%] rounded-full border-2 border-dashed border-amber-900/35 flex items-center justify-center relative">
              <div className="flex items-center justify-center text-charcoal animate-compass-oscillate [&>svg]:w-[clamp(2.25rem,8vw,4.25rem)] [&>svg]:h-[clamp(2.25rem,8vw,4.25rem)]">
                <Compass strokeWidth={2.2} />
              </div>
            </div>
          </div>

          <span className="font-montserrat text-[clamp(5.25rem,18vw,10.5rem)] font-black leading-[0.9] tracking-tighter text-charcoal select-none drop-shadow-sm">
            4
          </span>

          <div
            aria-hidden="true"
            className="hidden md:flex absolute -right-[12%] bottom-[18%] items-center gap-1.5 py-1.5 px-3 rounded-full bg-white/95 border border-gray-200/85 shadow-sm text-xs font-bold text-gray-700 whitespace-nowrap animate-float-slow pointer-events-none"
          >
            <Mountain className="w-3.5 h-3.5 text-amber-600" />
            <span>Elevation: Unknown</span>
          </div>
        </div>

        {/* Headings */}
        <h1 className="font-jakarta text-[clamp(1.625rem,4.2vw,2.625rem)] font-extrabold text-charcoal leading-tight tracking-tight mb-3.5">
          Looks like you&apos;ve wandered off the map.
        </h1>
        <p className="text-[clamp(0.9375rem,2vw,1.0625rem)] text-gray-600 leading-relaxed max-w-[560px] mx-auto mb-9 font-medium">
          The trail you followed seems to have vanished into thin air. The page
          you&apos;re looking for may have been moved, renamed, or is waiting to
          be charted in your next adventure.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mt-2">
          <Link href="/" className="inline-block w-full sm:w-auto">
            <Button
              size="lg"
              leftIcon={<Home className="w-4 h-4" />}
              showArrow
              className="w-full sm:w-auto justify-center"
            >
              Return to Home
            </Button>
          </Link>

          <Link href="/search" className="inline-block w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<Compass className="w-4 h-4 text-amber-500" />}
              className="w-full sm:w-auto justify-center"
            >
              Explore All Trips
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};
