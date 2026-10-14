'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from '@/theme/colors';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  radius?: string;
  variant?: 'rectangular' | 'circular' | 'rounded';
}

const SkeletonBase = styled.div<{
  $width?: string | number;
  $height?: string | number;
  $radius?: string;
  $variant?: 'rectangular' | 'circular' | 'rounded';
}>`
  display: block;
  width: ${(props) => (typeof props.$width === 'number' ? `${props.$width}px` : props.$width || '100%')};
  height: ${(props) => (typeof props.$height === 'number' ? `${props.$height}px` : props.$height || '1rem')};
  border-radius: ${(props) => {
    if (props.$radius) return props.$radius;
    if (props.$variant === 'circular') return '9999px';
    if (props.$variant === 'rounded') return '0.75rem';
    return '0.375rem';
  }};
  background: linear-gradient(
    90deg,
    rgba(226, 216, 198, 0.45) 0%,
    rgba(255, 251, 240, 0.85) 50%,
    rgba(226, 216, 198, 0.45) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.6s ease-in-out infinite;
`;

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  radius,
  variant = 'rectangular',
  className,
  style,
  ...rest
}) => {
  return (
    <SkeletonBase
      $width={width}
      $height={height}
      $radius={radius}
      $variant={variant}
      className={className}
      style={style}
      aria-hidden="true"
      {...rest}
    />
  );
};

const CardRoot = styled.div`
  background-color: ${colors.white};
  border-radius: 0.875rem;
  overflow: hidden;
  border: 1px solid rgba(254, 243, 199, 0.7);
  box-shadow: 0 4px 20px -4px rgba(115, 92, 0, 0.08), 0 1px 3px 0 rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 205px;

  @media (min-width: 375px) {
    width: 215px;
  }

  @media (min-width: 440px) {
    width: 235px;
  }

  @media (min-width: 640px) {
    width: 280px;
    border-radius: 1rem;
    box-shadow: 0 4px 24px -4px rgba(115, 92, 0, 0.08), 0 1px 4px 0 rgba(0, 0, 0, 0.04);
  }
`;

export const TripCardSkeleton: React.FC = () => {
  return (
    <CardRoot aria-hidden="true">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Skeleton width="100%" height="100%" radius="0" />
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col flex-grow p-2.5 sm:p-4 space-y-2 sm:space-y-2.5">
        {/* Duration */}
        <Skeleton width="35%" height="10px" radius="4px" />

        {/* Title (2 lines) */}
        <div className="space-y-1 sm:space-y-1.5 h-[34px] sm:h-[40px]">
          <Skeleton width="90%" height="12px" radius="4px" />
          <Skeleton width="60%" height="12px" radius="4px" />
        </div>

        {/* Location */}
        <Skeleton width="45%" height="10px" radius="4px" />

        {/* Tags */}
        <div className="flex gap-1.5 pt-0.5">
          <Skeleton width="45px" height="16px" radius="9999px" />
          <Skeleton width="55px" height="16px" radius="9999px" />
        </div>

        {/* Price & Partner Footer */}
        <div className="pt-1.5 sm:pt-2 flex items-center justify-between border-t border-gray-100">
          <div className="space-y-1">
            <Skeleton width="60px" height="14px" radius="4px" />
            <Skeleton width="40px" height="10px" radius="4px" />
          </div>
          <Skeleton width="70px" height="24px" radius="8px" />
        </div>
      </div>
    </CardRoot>
  );
};
