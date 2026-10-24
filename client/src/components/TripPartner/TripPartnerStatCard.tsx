'use client';

import React from 'react';
import { type TripPartnerStatCardProps } from './types/';

export type { TripPartnerStatCardProps };

export const TripPartnerStatCard: React.FC<TripPartnerStatCardProps> = ({
  label,
  value,
  trend,
  icon: Icon,
}) => {
  const isPositive = trend.isPositive;

  return (
    <div className="bg-white border border-gray-200 rounded-xl min-[480px]:p-4 sm:p-5 sm:rounded-2xl p-3 flex items-center justify-between gap-2 min-[480px]:gap-3 sm:gap-4 min-w-0 transition-all duration-250 ease-out shadow-[0_1px_3px_0_rgba(0,0,0,0.04),0_1px_2px_-1px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_25px_-5px_rgba(255,237,208,0.5),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:border-amber-200 hover:-translate-y-0.5 group">
      <div className="flex flex-col gap-1 sm:gap-1.5 min-w-0 flex-1 font-jakarta">
        <p className="text-xs sm:text-[13px] font-semibold text-gray-500 leading-tight tracking-tight truncate">
          {label}
        </p>
        <h3 className="text-[19px] min-[480px]:text-[22px] sm:text-2xl font-extrabold text-gray-900 leading-tight tracking-tight truncate">
          {value}
        </h3>
        <div
          className={`flex items-baseline flex-wrap gap-x-1 gap-y-0.5 text-[11px] sm:text-xs font-semibold tracking-tight mt-0.5 min-w-0 sm:truncate ${
            isPositive ? 'text-green-600' : 'text-red-500'
          }`}
        >
          <span className="inline-flex items-center gap-0.5 whitespace-nowrap">
            <span className="text-xs sm:text-[13px] font-extrabold leading-none" aria-hidden="true">
              {isPositive ? '↑' : '↓'}
            </span>
            {trend.percentage}%
          </span>
          <span className="whitespace-nowrap truncate">{trend.text}</span>
        </div>
      </div>

      <div className="w-[34px] h-[34px] min-[480px]:w-10 min-[480px]:h-10 sm:w-[52px] sm:h-[52px] rounded-full bg-amber-50 text-amber-600 border border-amber-200/50 flex items-center justify-center shrink-0 transition-all duration-250 ease-out group-hover:scale-105 group-hover:bg-amber-100 group-hover:text-amber-700 [&>svg]:w-[17px] [&>svg]:h-[17px] min-[480px]:[&>svg]:w-5 min-[480px]:[&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6 [&>svg]:stroke-[2.25]">
        <Icon />
      </div>
    </div>
  );
};
