'use client';

import React from 'react';
import Link from 'next/link';
import { PartnerNetworkItem } from './types';

interface PartnerCardProps {
  item: PartnerNetworkItem;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({ item }) => {
  return (
    <article className="group flex flex-col items-center bg-[#f0f0f0] rounded-2xl sm:rounded-[20px] lg:rounded-[24px] p-5 sm:p-5 lg:p-6 w-full max-w-[300px] sm:max-w-none h-[260px] sm:h-full sm:min-h-[275px] lg:min-h-[300px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg font-jakarta">
      {/* Icon */}
      <div className="flex justify-center items-center h-20 sm:h-24 lg:h-28 mb-2 sm:mb-3 lg:mb-4">
        <div className="drop-shadow-[0_10px_8px_rgba(0,0,0,0.04)] opacity-90 scale-75 sm:scale-80 lg:scale-90 transition-transform duration-300 group-hover:scale-95">
          {item.icon}
        </div>
      </div>

      <div className="flex flex-col flex-grow items-center justify-center text-center w-full min-h-[56px] px-1">
        <h3 className="text-[13px] sm:text-[14px] lg:text-[15px] font-bold text-gray-900 leading-[1.35] whitespace-pre-line text-center">
          {item.title}
        </h3>
      </div>

      <div className="mt-auto flex justify-center items-center w-full pt-3">
        <Link
          href={item.link}
          className="inline-block bg-[#111111] text-white text-[11px] sm:text-[12px] lg:text-sm font-semibold px-5 py-2 rounded-full hover:bg-black transition-colors shadow-sm text-center"
        >
          {item.ctaText || 'Apply Now'}
        </Link>
      </div>
    </article>
  );
};
