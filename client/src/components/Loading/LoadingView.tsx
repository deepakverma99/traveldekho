'use client';

import React from 'react';
import Image from 'next/image';
import { FloatingBackground } from '@/components/shared';

export interface LoadingViewProps {
  title?: string;
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export const LoadingView: React.FC<LoadingViewProps> = ({
  title = 'Planning Your Journey...',
  message = 'Curating scout-verified trails & live forecasts',
  fullScreen = true,
  className = '',
}) => {
  return (
    <main
      className={`relative w-full flex flex-col items-center justify-center bg-cream overflow-hidden px-4 py-10 font-jakarta z-1 ${
        fullScreen ? 'min-h-[calc(100vh-80px)]' : 'min-h-[60vh]'
      } ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <FloatingBackground fixed />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
        {/* Ambient Backglow */}
        <div
          aria-hidden="true"
          className="absolute w-80 h-80 rounded-full bg-[radial-gradient(circle,_#faa12e_0%,_#fed7a1_40%,_transparent_70%)] pointer-events-none animate-pulse opacity-20 z-0"
        />

        {/* Loader GIF */}
        <div className="relative z-10 flex items-center justify-center mb-6 select-none">
          <Image
            src="/TravelDekho loader.gif"
            alt="TravelDekho loading animation"
            width={240}
            height={240}
            priority
            unoptimized
            className="w-44 h-44 sm:w-56 sm:h-56 object-contain"
          />
        </div>

        {/* Progress Bar */}
        <div
          aria-hidden="true"
          className="relative w-44 h-1 bg-amber-200/50 rounded-full overflow-hidden mb-4"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full animate-progress-sweep" />
        </div>

        <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-charcoal mb-1.5">
          {title}
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-amber-900/75 leading-snug max-w-xs">
          {message}
        </p>
      </div>
    </main>
  );
};
