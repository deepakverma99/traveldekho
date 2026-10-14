'use client';

import React from 'react';
import Image from 'next/image';

export const SearchHero: React.FC = () => {
  return (
    <div className="relative w-full h-[220px] md:h-[300px] rounded-[32px] overflow-hidden mb-12 mx-auto shadow-md max-w-[1440px]">
      <Image
        alt="Search Trips Hero Background"
        src="/trips/zanskar-valley.png"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-white text-3xl md:text-4xl lg:text-[42px] mb-[-10px] md:mb-[-20px] font-caveat drop-shadow-md z-10 animate-fade-in-up">
          Welcome to
        </h2>
        <h1 className="text-white text-5xl md:text-7xl lg:text-[120px] leading-[1.1] font-permanent-marker drop-shadow-xl delay-100 animate-fade-in-up">
          Search
        </h1>
      </div>
    </div>
  );
};
