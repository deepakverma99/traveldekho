'use client';

import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  radius?: string;
  variant?: 'rectangular' | 'circular' | 'rounded';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  radius,
  variant = 'rectangular',
  className = '',
  style,
  ...rest
}) => {
  const getRadiusClass = () => {
    if (radius) return '';
    if (variant === 'circular') return 'rounded-full';
    if (variant === 'rounded') return 'rounded-xl';
    return 'rounded-md';
  };

  const computedStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width || '100%',
    height: typeof height === 'number' ? `${height}px` : height || '1rem',
    borderRadius: radius,
    ...style,
  };

  return (
    <div
      style={computedStyle}
      className={`block bg-amber-100/40 animate-pulse ${getRadiusClass()} ${className}`}
      aria-hidden="true"
      {...rest}
    />
  );
};

export const TripCardSkeleton: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="bg-white rounded-[0.875rem] sm:rounded-2xl overflow-hidden border border-amber-100/70 shadow-[0_4px_20px_-4px_rgba(115,92,0,0.08),0_1px_3px_0_rgba(0,0,0,0.04)] flex flex-col shrink-0 w-[205px] min-[375px]:w-[215px] min-[440px]:w-[235px] sm:w-[280px]"
    >
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
    </div>
  );
};
