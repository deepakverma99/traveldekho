'use client';

import React from 'react';
import { Skeleton, TripCardSkeleton, FloatingBackground } from '@/components/shared';

export const HomeSkeleton: React.FC = () => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading homepage content"
      className="min-h-screen w-full bg-cream relative overflow-hidden"
    >
      {/* Floating Ambient Background */}
      <FloatingBackground />

      {/* 1. Hero Section Skeleton */}
      <section className="relative w-full overflow-hidden pt-8 pb-10 md:pt-14 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-6">
            {/* Left Booking Card Skeleton */}
            <div className="w-full max-w-full lg:max-w-[380px] shrink-0 z-10">
              <div className="rounded-2xl p-5 sm:p-8 bg-gradient-to-br from-amber-300/25 to-amber-400/15 border border-amber-300/40 shadow-xl flex flex-col gap-5">
                <div className="space-y-2">
                  <Skeleton width="65%" height="24px" radius="6px" />
                  <Skeleton width="85%" height="16px" radius="4px" />
                </div>

                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 space-y-3 border border-white/50">
                  <Skeleton width="100%" height="48px" radius="12px" />
                  <Skeleton width="100%" height="48px" radius="12px" />
                  <Skeleton width="100%" height="48px" radius="12px" />
                  <Skeleton width="100%" height="52px" radius="12px" />
                </div>
              </div>
            </div>

            {/* Right Hero Image Skeleton */}
            <div className="hidden md:flex flex-1 w-full max-w-full lg:max-w-[850px] justify-center lg:justify-end">
              <div className="w-full aspect-[4/3] lg:h-[520px] rounded-3xl overflow-hidden opacity-80">
                <Skeleton width="100%" height="100%" radius="24px" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Upcoming Trips Carousel Skeleton */}
      <section className="relative w-full py-12 md:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <Skeleton width="180px" height="32px" radius="8px" />
            </div>
            <Skeleton width="76px" height="24px" radius="9999px" />
          </div>

          <div className="flex gap-4 sm:gap-6 overflow-hidden">
            <TripCardSkeleton />
            <TripCardSkeleton />
            <TripCardSkeleton />
            <TripCardSkeleton />
          </div>
        </div>
      </section>

      {/* 3. Nearby Trips Section Skeleton */}
      <section className="relative w-full py-12 md:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-2.5">
              <Skeleton width="28px" height="28px" variant="circular" />
              <Skeleton width="210px" height="32px" radius="8px" />
            </div>
            <Skeleton width="76px" height="24px" radius="9999px" />
          </div>

          <div className="flex gap-4 sm:gap-6 overflow-hidden">
            <TripCardSkeleton />
            <TripCardSkeleton />
            <TripCardSkeleton />
            <TripCardSkeleton />
          </div>
        </div>
      </section>

      {/* 4. Weather Forecast Section Skeleton */}
      <section className="relative w-full py-12 md:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div className="space-y-2">
              <Skeleton width="260px" height="40px" radius="8px" />
              <Skeleton width="340px" height="18px" radius="4px" />
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 lg:gap-6 sm:overflow-x-visible sm:pb-0">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-sm flex flex-col gap-3 sm:gap-4 shrink-0 w-[205px] min-[375px]:w-[215px] min-[440px]:w-[235px] sm:w-full sm:shrink"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Skeleton width="60px" height="12px" radius="4px" />
                    <Skeleton width="90px" height="20px" radius="6px" />
                  </div>
                  <Skeleton width="32px" height="32px" variant="circular" />
                </div>
                <div className="space-y-1.5 py-1.5">
                  <Skeleton width="60px" height="28px" radius="6px" />
                  <Skeleton width="80px" height="12px" radius="4px" />
                </div>
                <div className="pt-2 border-t border-gray-100 flex gap-1.5">
                  <Skeleton width="30%" height="24px" radius="6px" />
                  <Skeleton width="30%" height="24px" radius="6px" />
                  <Skeleton width="30%" height="24px" radius="6px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Budget Friendly Carousel Skeleton */}
      <section className="relative w-full py-12 md:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <Skeleton width="220px" height="32px" radius="8px" />
            <Skeleton width="76px" height="24px" radius="9999px" />
          </div>

          <div className="flex gap-4 sm:gap-6 overflow-hidden">
            <TripCardSkeleton />
            <TripCardSkeleton />
            <TripCardSkeleton />
            <TripCardSkeleton />
          </div>
        </div>
      </section>
    </div>
  );
};
