'use client';

import React from 'react';
import Image from 'next/image';

interface TripAboutSectionProps {
  description: string;
  mapImage?: string;
}

export const TripAboutSection: React.FC<TripAboutSectionProps> = ({
  description,
  mapImage,
}) => {
  return (
    <section>
      <h2 className="text-3xl md:text-4xl text-gray-900 mb-6 sm:mb-8 font-caveat">
        About the trip
      </h2>

      {mapImage && (
        <div className="group w-full bg-warm-cream rounded-3xl border border-gray-100 overflow-hidden relative mb-8 flex items-center justify-center min-h-[260px] sm:min-h-[320px] md:min-h-[400px]">
          <Image
            src={mapImage}
            alt="Route Map"
            width={1200}
            height={600}
            priority={false}
            className="w-full h-auto max-h-[600px] object-contain transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
      )}

      <div className="max-w-none text-gray-600 leading-relaxed font-medium whitespace-pre-wrap mb-8 text-sm sm:text-base md:text-lg">
        {description}
      </div>
    </section>
  );
};
