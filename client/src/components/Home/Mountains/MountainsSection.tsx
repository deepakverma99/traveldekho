'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useCarouselScroll } from '@/redux';
import { TripCard } from '@/components/shared';
import { mountainsTripsData } from './mockMountainsTrips';
import { colors } from '@/theme/colors';
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
  z-index: 20;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  display: none;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(254, 243, 199, 0.8);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);

  opacity: ${(props) => (props.$disabled ? 0.4 : 1)};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};

  @media (min-width: 640px) {
    display: flex;
  }

  @media (min-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
  }

  ${(props) =>
    !props.$disabled &&
    `
    &:hover {
      background: #ffffff;
      transform: translateY(-50%) scale(1.08);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
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
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  @media (min-width: 640px) {
    gap: 1.25rem;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const EdgeGradient = styled.div<{ $side: 'left' | 'right'; $visible: boolean }>`
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3rem;
  z-index: 10;
  pointer-events: none;
  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.$visible ? 1 : 0)};

  @media (min-width: 768px) {
    display: block;
  }

  ${(props) =>
    props.$side === 'left'
      ? `
    left: 0;
    background: linear-gradient(to right, ${colors.cream}, transparent);
  `
      : `
    right: 0;
    background: linear-gradient(to left, ${colors.cream}, transparent);
  `}
`;

export const MountainsSection: React.FC = () => {
  const { trackRef, canScrollLeft, canScrollRight, handleScroll } =
    useCarouselScroll('mountains');

  return (
    <SectionWrapper id="mountains-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2
            className="text-xl sm:text-[28px] md:text-[32px] font-extrabold tracking-tight text-[#191c1d]"
          >
            Majestic
            <span className="ml-1 text-amber-500">Mountains</span>
          </h2>

          <Link
            href="/category/mountains"
            className="flex items-center gap-1 text-sm font-semibold transition-colors duration-200 group shrink-0 text-[#191c1d] hover:text-amber-600"
          >
            <span>View all</span>
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Scroll Left Button */}
          <ScrollButton
            id="mountains-scroll-left"
            type="button"
            aria-label="Scroll left"
            $disabled={!canScrollLeft}
            disabled={!canScrollLeft}
            onClick={() => handleScroll('left')}
            className="left-0 -translate-x-2 md:-translate-x-3"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#191c1d"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </ScrollButton>

          {/* Scroll Right Button */}
          <ScrollButton
            id="mountains-scroll-right"
            type="button"
            aria-label="Scroll right"
            $disabled={!canScrollRight}
            disabled={!canScrollRight}
            onClick={() => handleScroll('right')}
            className="right-0 translate-x-2 md:translate-x-3"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#191c1d"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </ScrollButton>

          {/* Edge Fade Gradients */}
          <EdgeGradient $side="left" $visible={canScrollLeft} />
          <EdgeGradient $side="right" $visible={canScrollRight} />

          {/* Horizontal Scroll Track */}
          <ScrollTrack ref={trackRef} className="scrollbar-hide">
            {mountainsTripsData.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </ScrollTrack>
        </div>
      </div>
    </SectionWrapper>
  );
};
