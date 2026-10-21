'use client';

import React from 'react';
import { Skeleton, FloatingBackground } from '@/components/shared';

export const TripDetailSkeleton: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-cream overflow-x-hidden">
      <FloatingBackground fixed />

      <main className="relative z-10 w-full pt-6">
        {/* Breadcrumb Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 sm:mb-3">
          <div className="flex items-center gap-2">
            <Skeleton width={60} height={18} radius="6px" />
            <span className="text-gray-300">/</span>
            <Skeleton width={80} height={18} radius="6px" />
            <span className="text-gray-300">/</span>
            <Skeleton width={140} height={18} radius="6px" />
          </div>
        </div>

        {/* Hero Banner Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3 pb-8">
          <div className="w-full rounded-[2.5rem] overflow-hidden min-h-[360px] md:min-h-[460px] bg-amber-100/40 p-8 flex flex-col justify-between border border-amber-200/40">
            <div className="flex justify-between items-center">
              <Skeleton width={160} height={40} radius="1rem" />
              <Skeleton width={100} height={36} radius="9999px" />
            </div>

            <div className="flex flex-col items-center justify-center gap-3 m-auto w-full">
              <Skeleton width="55%" height={44} radius="12px" />
              <Skeleton width="65%" height={18} radius="6px" />
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                <Skeleton width={80} height={20} radius="9999px" />
                <Skeleton width={90} height={20} radius="9999px" />
                <Skeleton width={60} height={20} radius="9999px" />
                <Skeleton width={75} height={20} radius="9999px" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content & Sidebar Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white rounded-[3rem] p-6 md:p-12 border border-gray-100 shadow-xs">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              {/* Left Column Skeleton */}
              <div className="flex-1 w-full flex flex-col gap-12">
                <div className="flex flex-col gap-4">
                  <Skeleton width={200} height={36} radius="10px" />
                  <Skeleton width="100%" height={320} radius="24px" />
                  <Skeleton width="100%" height={20} radius="6px" />
                  <Skeleton width="90%" height={20} radius="6px" />
                  <Skeleton width="75%" height={20} radius="6px" />
                </div>

                <div className="flex flex-col gap-4">
                  <Skeleton width={240} height={36} radius="10px" />
                  <div className="flex flex-col gap-4 pl-14">
                    <Skeleton width="100%" height={120} radius="16px" />
                    <Skeleton width="100%" height={120} radius="16px" />
                  </div>
                </div>
              </div>

              {/* Right Sidebar Skeleton */}
              <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-6">
                <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-4">
                  <Skeleton width={120} height={16} radius="6px" />
                  <Skeleton width={160} height={40} radius="10px" />
                  <Skeleton width="100%" height={48} radius="12px" />
                  <Skeleton width="100%" height={48} radius="12px" />
                  <Skeleton width="100%" height={50} radius="16px" />
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-4">
                  <Skeleton width={140} height={20} radius="6px" />
                  <Skeleton width={100} height={44} radius="10px" />
                  <Skeleton width="100%" height={60} radius="12px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
