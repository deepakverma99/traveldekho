'use client';

import React from 'react';
import Image from 'next/image';

export const HeroImage: React.FC = () => {
  return (
    <div className="hidden md:flex flex-1 w-full relative mt-2 lg:mt-0 items-center justify-center lg:justify-end">
      <div className="relative w-full max-w-[520px] lg:max-w-[620px] xl:max-w-[690px] 2xl:max-w-[740px] aspect-[816/753] lg:-translate-x-2 xl:-translate-x-5">
        <div className="relative w-full h-full">
          <Image
            alt="Search for your next adventure"
            src="/heroimage.png"
            fill
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 690px, 740px"
            className="object-contain object-right select-none mix-blend-multiply"
          />

          {/* Soft Dissolve Overlays: Seamlessly blends raw PNG shadow boundaries into pure white background */}
          {/* 1. Bottom shadow dissolve */}
          <div
            className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white via-white/70 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* 2. Left tent shadow dissolve */}
          <div
            className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white via-white/70 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* 3. Top edge dissolve */}
          <div
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white/80 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* 4. Right edge dissolve */}
          <div
            className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-white/80 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};
