'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CityCardProps } from './types';

export const CityCard: React.FC<CityCardProps> = ({ city }) => {
  return (
    <Link
      href={`/search?q=${encodeURIComponent(city.query)}`}
      className="group block no-underline"
    >
      <article id={city.id} className="flex flex-col items-center cursor-pointer w-full">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3 bg-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.06)]">
          <Image
            alt={city.name}
            fill
            sizes="(max-width: 768px) 200px, 250px"
            src={city.image}
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <h3 className="text-[15px] font-bold text-center leading-snug text-charcoal font-jakarta transition-colors duration-200 group-hover:text-primary">
          {city.name}
        </h3>
        <p className="text-xs text-center mt-0.5 text-[#5e5e5e] font-vietnam">
          {city.state}
        </p>
      </article>
    </Link>
  );
};
