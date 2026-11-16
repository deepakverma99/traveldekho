'use client';

import React from 'react';

export const ProfileSkeleton: React.FC = () => {
  return (
    <div
      aria-label="Loading profile"
      className="min-h-[calc(100vh-80px)] bg-[#FAF7F5] font-jakarta flex flex-col lg:flex-row w-full animate-pulse"
    >
      {/* Left Sidebar Skeleton */}
      <aside className="w-full lg:w-56 xl:w-60 shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-gray-200/80 p-3.5 sm:p-4 lg:px-3.5 lg:py-6 lg:min-h-[calc(100vh-80px)] flex flex-col gap-2.5">
        <div className="h-11 w-full rounded-2xl bg-[#ff5722]/30" />
        <div className="h-11 w-full rounded-2xl bg-gray-100" />
        <div className="h-11 w-full rounded-2xl bg-gray-100" />
        <div className="h-11 w-full rounded-2xl bg-gray-100" />
        <div className="h-11 w-full rounded-2xl bg-gray-100" />
      </aside>

      {/* Main Content Area Skeleton */}
      <div className="flex-1 w-full min-w-0 p-5 sm:p-8 lg:p-10 xl:p-12">
        <div className="max-w-5xl">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-3 w-40 bg-[#ff5722]/20 rounded mb-2" />
            <div className="h-10 w-64 bg-[#ff5722]/30 rounded-xl" />
          </div>

          {/* Dashboard Skeleton Layout */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Column Skeleton */}
            <div className="w-full lg:w-[310px] shrink-0 space-y-3.5">
              <div className="h-[390px] w-full rounded-[26px] bg-gradient-to-b from-[#ff5722]/30 to-[#b02f00]/40 border border-[#ff5722]/20" />
              <div className="h-14 w-full rounded-2xl bg-white border border-gray-100" />
              <div className="h-14 w-full rounded-2xl bg-white border border-gray-100" />
            </div>

            {/* Right Column Skeleton */}
            <div className="flex-1 w-full min-w-0">
              <div className="h-[620px] w-full rounded-3xl bg-white border border-gray-100 p-6 space-y-4">
                <div className="h-5 w-48 bg-gray-200 rounded mb-6" />
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="h-11 w-full bg-gray-50 rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
