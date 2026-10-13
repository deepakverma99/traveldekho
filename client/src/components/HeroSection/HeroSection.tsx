'use client';

import React from 'react';
import styled from 'styled-components';
import { FloatingDecorations } from './FloatingDecorations';
import { HeroBookingCard } from './HeroBookingCard';
import { HeroImage } from './HeroImage';
import { WhatsAppButton } from '@/components/shared';
import { colors } from '@/theme/colors';

const SectionWrapper = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: ${colors.cream};
`;

export const HeroSection: React.FC = () => {
  return (
    <SectionWrapper id="hero-section">
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
    </SectionWrapper>
  );
};
