'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PartnerCard } from './PartnerCard';
import { mockPartnersData } from './mockPartners';

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
    <section
      id="vendors"
      className="py-10 md:py-16 mb-12 md:mb-16 relative overflow-hidden bg-transparent font-sans selection:bg-amber-400 selection:text-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <h2 className="text-xl sm:text-[28px] md:text-[32px] font-extrabold tracking-tight text-charcoal">
            Trip Partner
            <span className="ml-1 text-primary">Network</span>
          </h2>
        </div>

        {/* Partners: 1 Full Card at a Time on Mobile, Grid on Tablet/Desktop */}
        <div
          ref={trackRef}
          className="mt-6 md:mt-8 lg:mt-10 flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-4 lg:gap-5 sm:overflow-x-visible sm:snap-none sm:pb-0"
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
            <div
              key={item.id}
              className="flex-[0_0_100%] w-full flex justify-center items-stretch snap-center snap-always px-2 sm:flex-initial sm:w-full sm:block sm:snap-none sm:p-0"
            >
              <PartnerCard item={item} />
            </div>
          ))}
        </div>

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
                  ? 'w-6 bg-primary shadow-sm'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
