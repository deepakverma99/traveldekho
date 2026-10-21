'use client';

import React from 'react';
import { FloatingDecorations } from './FloatingDecorations';
import { HeroBookingCard } from './HeroBookingCard';
import { HeroImage } from './HeroImage';
import { WhatsAppButton } from '@/components/shared';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero-section" className="relative w-full overflow-hidden bg-transparent">
      {/* Background Floating Elements & Ambient Glows */}
      <FloatingDecorations />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 md:pt-14 md:pb-24">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-6">
          {/* Left Booking / CTA Card */}
          <div className="w-full max-w-full lg:max-w-[380px] shrink-0 z-10">
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
