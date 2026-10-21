'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CarouselHeaderProps {
  title: string;
  highlightText: string;
  viewAllHref?: string;
  icon?: React.ReactNode;
}

export const CarouselHeader: React.FC<CarouselHeaderProps> = ({
  title,
  highlightText,
  viewAllHref,
  icon,
}) => {
  return (
    <div className="flex items-center justify-between mb-6 md:mb-8">
      <h2 className="text-xl sm:text-[28px] md:text-[32px] font-black tracking-tight text-charcoal flex items-center">
        {icon}
        <span>{title}</span>
        <span className="ml-1 text-primary">{highlightText}</span>
      </h2>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-sm font-bold text-charcoal hover:text-amber-600 transition-colors duration-200 group shrink-0"
        >
          <span>View all</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
};
