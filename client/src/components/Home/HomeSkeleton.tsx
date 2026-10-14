'use client';

import React from 'react';
import styled from 'styled-components';
import { Skeleton, TripCardSkeleton, FloatingBackground } from '@/components/shared';
import { colors } from '@/theme/colors';

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${colors.cream};
  position: relative;
  overflow: hidden;
`;

const SectionWrapper = styled.section`
  position: relative;
  width: 100%;
  padding-top: 3rem;
  padding-bottom: 3rem;
  overflow: hidden;

  @media (min-width: 768px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

const Container = styled.div`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  position: relative;
  z-index: 10;

  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const HeroCardSkeleton = styled.div`
  border-radius: 1rem;
  padding: 1.25rem 1rem 1.5rem;
  background: linear-gradient(145deg, rgba(255, 209, 51, 0.25) 0%, rgba(245, 198, 35, 0.15) 100%);
  border: 1px solid rgba(255, 209, 51, 0.4);
  box-shadow: rgba(115, 92, 0, 0.08) 0px 20px 60px -12px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

const WeatherTrackSkeleton = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.75rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
    overflow-x: visible;
    padding-bottom: 0;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
  }
`;

const WeatherCardSkeletonRoot = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[100]};
  border-radius: 1rem;
  padding: 0.875rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex-shrink: 0;
  width: 205px;

  @media (min-width: 375px) {
    width: 215px;
  }

  @media (min-width: 440px) {
    width: 235px;
  }

  @media (min-width: 640px) {
    border-radius: 1.5rem;
    padding: 1.25rem;
    width: 100%;
    flex-shrink: 1;
    gap: 1rem;
  }
`;

export const HomeSkeleton: React.FC = () => {
  return (
    <PageWrapper aria-busy="true" aria-label="Loading homepage content">
      {/* Floating Ambient Background */}
      <FloatingBackground />

      {/* 1. Hero Section Skeleton */}
      <section className="relative w-full overflow-hidden pt-8 pb-10 md:pt-14 md:pb-20">
        <Container>
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-6">
            {/* Left Booking Card Skeleton */}
            <div className="w-full max-w-full lg:max-w-[380px] shrink-0 z-10">
              <HeroCardSkeleton>
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
              </HeroCardSkeleton>
            </div>

            {/* Right Hero Image Skeleton */}
            <div className="hidden md:flex flex-1 w-full max-w-full lg:max-w-[850px] justify-center lg:justify-end">
              <div className="w-full aspect-[4/3] lg:h-[520px] rounded-3xl overflow-hidden opacity-80">
                <Skeleton width="100%" height="100%" radius="24px" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Upcoming Trips Carousel Skeleton */}
      <SectionWrapper>
        <Container>
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
        </Container>
      </SectionWrapper>

      {/* 3. Nearby Trips Section Skeleton */}
      <SectionWrapper>
        <Container>
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
        </Container>
      </SectionWrapper>

      {/* 4. Weather Forecast Section Skeleton */}
      <SectionWrapper>
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div className="space-y-2">
              <Skeleton width="260px" height="40px" radius="8px" />
              <Skeleton width="340px" height="18px" radius="4px" />
            </div>
          </div>

          <WeatherTrackSkeleton>
            {[1, 2, 3, 4].map((item) => (
              <WeatherCardSkeletonRoot key={item}>
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
              </WeatherCardSkeletonRoot>
            ))}
          </WeatherTrackSkeleton>
        </Container>
      </SectionWrapper>

      {/* 5. Budget Friendly Carousel Skeleton */}
      <SectionWrapper>
        <Container>
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
        </Container>
      </SectionWrapper>
    </PageWrapper>
  );
};
