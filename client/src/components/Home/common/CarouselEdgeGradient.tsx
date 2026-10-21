'use client';

import React from 'react';

interface CarouselEdgeGradientProps {
  side: 'left' | 'right';
  visible: boolean;
}

export const CarouselEdgeGradient: React.FC<CarouselEdgeGradientProps> = ({
  side,
  visible,
}) => {
  return (
    <div
      aria-hidden="true"
      className={`hidden md:block absolute top-0 bottom-0 w-12 z-10 pointer-events-none transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${
        side === 'left'
          ? 'left-0 bg-gradient-to-r from-cream to-transparent'
          : 'right-0 bg-gradient-to-l from-cream to-transparent'
      }`}
    />
  );
};
