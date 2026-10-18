'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { PartnerCard } from './PartnerCard';
import { mockPartnersData } from './mockPartners';
import { typography } from '@/theme/typography';

const SectionWrapper = styled.section`
  padding-top: 2.5rem;
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  font-family: ${typography.fonts.jakarta};

  @media (min-width: 768px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
    margin-bottom: 4rem;
  }
`;

const PartnersTrack = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    overflow-x: visible;
    scroll-snap-type: none;
    padding-bottom: 0;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 1.25rem;
  }
`;

const CardSlide = styled.div`
  flex: 0 0 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  padding: 0 0.5rem;

  @media (min-width: 640px) {
    flex: unset;
    width: 100%;
    display: block;
    scroll-snap-align: none;
    padding: 0;
  }
`;

export const VendorsSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({
      left: index * track.clientWidth,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
  }, []);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, clientWidth } = track;
    if (clientWidth === 0) return;
    const index = Math.round(scrollLeft / clientWidth);
    if (index >= 0 && index < mockPartnersData.length) {
      setCurrentIndex(index);
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const interval = setInterval(() => {
      if (isInteractingRef.current) return;
      if (typeof document !== 'undefined' && document.hidden) return;

      const { scrollWidth, clientWidth } = track;
      if (scrollWidth <= clientWidth + 10) return;

      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % mockPartnersData.length;
        track.scrollTo({
          left: nextIndex * clientWidth,
          behavior: 'smooth',
        });
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper
      id="vendors"
      className="selection:bg-amber-400 selection:text-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <h2
            className="text-xl sm:text-[28px] md:text-[32px] font-extrabold tracking-tight text-[#191c1d]"
          >
            Trip Partner
            <span className="ml-1 text-amber-500">Network</span>
          </h2>
        </div>

        {/* Partners: 1 Full Card at a Time on Mobile, Grid on Tablet/Desktop */}
        <PartnersTrack
          ref={trackRef}
          className="mt-6 md:mt-8 lg:mt-10"
          onScroll={handleScroll}
          onMouseEnter={() => {
            isInteractingRef.current = true;
          }}
          onMouseLeave={() => {
            isInteractingRef.current = false;
          }}
          onTouchStart={() => {
            isInteractingRef.current = true;
          }}
          onTouchEnd={() => {
            setTimeout(() => {
              isInteractingRef.current = false;
            }, 1500);
          }}
        >
          {mockPartnersData.map((item) => (
            <CardSlide key={item.id}>
              <PartnerCard item={item} />
            </CardSlide>
          ))}
        </PartnersTrack>

        {/* Pagination Indicator Dots (Mobile Only) */}
        <div className="flex sm:hidden justify-center items-center gap-2 mt-4">
          {mockPartnersData.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => scrollToIndex(idx)}
              className={`h-2 transition-all duration-300 rounded-full ${
                currentIndex === idx
                  ? 'w-6 bg-amber-500 shadow-sm'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
