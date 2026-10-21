'use client';

import React from 'react';
import Image from 'next/image';

export const HeroImage: React.FC = () => {
  return (
    <div className="hidden md:flex flex-1 w-full max-w-full lg:max-w-[850px] relative mt-2 lg:mt-0 justify-center lg:justify-end">
      <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[620px] lg:-mr-8 xl:-mr-16">
        <div className="relative w-full h-full animate-float">
          <Image
            alt="Search for your next adventure"
            src="/heroimage.png"
            fill
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 55vw"
            className="object-contain lg:object-right object-center drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] mix-blend-multiply"
          />
        </div>
      </div>
    </div>
  );
};
