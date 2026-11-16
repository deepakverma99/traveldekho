'use client';

import React from 'react';
import { HeroBookingCard } from './HeroBookingCard';
import { HeroImage } from './HeroImage';
import { WhatsAppButton } from '@/components/shared';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero-section"
      className="relative w-full overflow-hidden bg-white z-10 min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-4.5rem)] min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-4.5rem)] flex flex-col justify-center"
    >
      {/* Main Content Container */}
      <div className="max-w-7xl xl:max-w-[1260px] 2xl:max-w-[1320px] mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-2 xl:pr-0 py-6 sm:py-8 md:py-10 lg:py-12 w-full my-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-4 lg:gap-6">
          {/* Left Booking / CTA Card */}
          <div className="w-full max-w-full sm:max-w-[375px] lg:max-w-[370px] xl:max-w-[380px] shrink-0 z-10">
            <HeroBookingCard />
          </div>

          {/* Right Hero Image */}
          <HeroImage />
        </div>
      </div>

      {/* Floating Action Button */}
      <WhatsAppButton />
    </section>
  );
};
