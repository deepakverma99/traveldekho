'use client';

import React from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarouselScroll } from '@/redux';
import { VibeCard } from './VibeCard';
import { mockVibeData } from './mockVibeData';
import { typography } from '@/theme/typography';

const SectionWrapper = styled.section`
  position: relative;
  width: 100%;
  padding-top: 3rem;
  padding-bottom: 3rem;
  overflow: hidden;
  background-color: transparent;
  font-family: ${typography.fonts.jakarta};

  @media (min-width: 768px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

const ScrollButton = styled.button<{ $disabled: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 30;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  display: none;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);

  opacity: ${(props) => (props.$disabled ? 0.4 : 1)};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};

  @media (min-width: 640px) {
    display: flex;
  }

  ${(props) =>
    !props.$disabled &&
    `
    &:hover {
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 14px 28px -4px rgba(0, 0, 0, 0.15);
    }
    &:active {
      transform: translateY(-50%) scale(0.95);
    }
  `}
`;

const ScrollTrack = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  padding-top: 0.5rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  align-items: center;
  user-select: none;
  cursor: grab;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 640px) {
    gap: 1.5rem;
  }
`;

export const VibeWithUsSection: React.FC = () => {
  const { trackRef, canScrollLeft, canScrollRight, handleScroll } =
    useCarouselScroll('vibe-with-us');

  return (
    <SectionWrapper id="vibe-with-us-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2
            className="text-xl sm:text-[28px] md:text-[32px] font-extrabold tracking-tight text-[#191c1d]"
          >
            Vibe with
            <span className="ml-1 text-amber-500">
              Us
            </span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative mt-6 md:mt-8">
          {/* Scroll Left Button */}
          <ScrollButton
            type="button"
            aria-label="Scroll left"
            $disabled={!canScrollLeft}
            disabled={!canScrollLeft}
            onClick={() => handleScroll('left')}
            className="left-0 -translate-x-3"
          >
            <ChevronLeft className="w-5 h-5 text-[#191c1d]" strokeWidth={2.5} />
          </ScrollButton>

          {/* Scroll Right Button */}
          <ScrollButton
            type="button"
            aria-label="Scroll right"
            $disabled={!canScrollRight}
            disabled={!canScrollRight}
            onClick={() => handleScroll('right')}
            className="right-0 translate-x-3"
          >
            <ChevronRight className="w-5 h-5 text-[#191c1d]" strokeWidth={2.5} />
          </ScrollButton>

          {/* Horizontal Scroll Track */}
          <ScrollTrack ref={trackRef} className="scrollbar-hide">
            {mockVibeData.map((item) => (
              <VibeCard key={item.id} item={item} />
            ))}
          </ScrollTrack>
        </div>
      </div>
    </SectionWrapper>
  );
};
