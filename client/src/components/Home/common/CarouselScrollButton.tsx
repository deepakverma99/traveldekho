'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselScrollButtonProps {
  direction: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
  ariaLabel: string;
  id?: string;
  className?: string;
}

export const CarouselScrollButton: React.FC<CarouselScrollButtonProps> = ({
  direction,
  disabled,
  onClick,
  ariaLabel,
  id,
  className = '',
}) => {
  return (
    <button
      id={id}
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/95 backdrop-blur-md border border-amber-100 shadow-md transition-all duration-200 ${
        disabled
          ? 'opacity-35 cursor-not-allowed'
          : 'opacity-100 cursor-pointer hover:bg-white hover:-translate-y-1/2 hover:scale-105 active:scale-95 hover:shadow-lg'
      } ${
        direction === 'left' ? '-left-2 md:-left-3' : '-right-2 md:-right-3'
      } ${className}`}
    >
      {direction === 'left' ? (
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-charcoal" />
      ) : (
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-charcoal" />
      )}
    </button>
  );
};
