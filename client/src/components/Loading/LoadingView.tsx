'use client';

import React from 'react';
import Image from 'next/image';
import { FloatingBackground } from '@/components/shared';
import {
  LoadingContainer,
  LoadingContentWrapper,
  AmbientBackglow,
  GifWrapper,
  ProgressBarTrack,
  ProgressBarFill,
  LoadingTitle,
  LoadingSubtitle,
} from './styles';

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
    <LoadingContainer
      $fullScreen={fullScreen}
      className={className}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <FloatingBackground fixed />

      <LoadingContentWrapper>
        <AmbientBackglow aria-hidden="true" />

        <GifWrapper>
          <Image
            src="/TravelDekho loader.gif"
            alt="TravelDekho loading animation"
            width={240}
            height={240}
            priority
            unoptimized
            className="w-44 h-44 sm:w-56 sm:h-56 object-contain"
          />
        </GifWrapper>

        <ProgressBarTrack aria-hidden="true">
          <ProgressBarFill />
        </ProgressBarTrack>

        <LoadingTitle>{title}</LoadingTitle>
        <LoadingSubtitle>{message}</LoadingSubtitle>
      </LoadingContentWrapper>
    </LoadingContainer>
  );
};
