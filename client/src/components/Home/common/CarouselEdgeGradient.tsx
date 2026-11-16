'use client';

import React from 'react';

interface CarouselEdgeGradientProps {
  side: 'left' | 'right';
  visible: boolean;
  fromColor?: string;
}

export const CarouselEdgeGradient: React.FC<CarouselEdgeGradientProps> = ({
  side,
  visible,
  fromColor = '#ffffff',
}) => {
  return (
    <div
      aria-hidden="true"
      style={{
        background:
          side === 'left'
            ? `linear-gradient(to right, ${fromColor}, transparent)`
            : `linear-gradient(to left, ${fromColor}, transparent)`,
      }}
      className={`hidden md:block absolute top-0 bottom-0 w-12 z-10 pointer-events-none transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${side === 'left' ? 'left-0' : 'right-0'}`}
    />
  );
};
