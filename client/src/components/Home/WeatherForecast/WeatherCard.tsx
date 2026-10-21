'use client';

import React from 'react';
import Link from 'next/link';
import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';
import { WeatherCardProps, WeatherIconType } from './types';

interface WeatherIconProps {
  type: WeatherIconType;
  className?: string;
  size?: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ type, className, size = 16 }) => {
  switch (type) {
    case 'sun':
      return <Sun className={className} size={size} aria-hidden="true" />;
    case 'cloud':
      return <Cloud className={className} size={size} aria-hidden="true" />;
    case 'cloud-rain':
      return <CloudRain className={className} size={size} aria-hidden="true" />;
    case 'snowflake':
      return <Snowflake className={className} size={size} aria-hidden="true" />;
    default:
      return <Sun className={className} size={size} aria-hidden="true" />;
  }
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ destination }) => {
  return (
    <Link
      href={destination.href}
      className="group block h-full no-underline shrink-0 w-[205px] min-[375px]:w-[215px] min-[440px]:w-[235px] sm:w-full sm:shrink"
    >
      <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-sm relative overflow-hidden h-full cursor-pointer transition-all duration-300 font-jakarta group-hover:border-amber-400 group-hover:shadow-[0_4px_12px_rgba(245,158,11,0.12),0_2px_4px_rgba(0,0,0,0.04)] group-hover:-translate-y-0.5">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 group-hover:bg-amber-400/12 rounded-full blur-2xl -mr-10 -mt-10 transition-colors duration-300 pointer-events-none" />

        {/* Card Header: Category & City + Floating Weather Icon */}
        <div className="flex justify-between items-start mb-2.5 sm:mb-4 relative z-10">
          <div>
            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5 sm:mb-1 group-hover:text-amber-500 transition-colors duration-300">
              Live Weather
            </p>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 capitalize group-hover:text-amber-600 transition-colors duration-300">
              {destination.city}
            </h3>
          </div>

          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-50 group-hover:bg-amber-100 text-amber-500 rounded-full flex items-center justify-center shrink-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-300 group-hover:-translate-y-0.5">
            <WeatherIcon type={destination.currentIcon} className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Current Temperature & Condition */}
        <div className="flex items-end gap-1.5 sm:gap-2 mb-3 sm:mb-6 relative z-10">
          <span className="text-2xl sm:text-4xl font-black text-gray-900">
            {destination.currentTemp}
          </span>
          <span className="text-xs sm:text-sm font-bold text-gray-500 mb-0.5 sm:mb-1 truncate">
            {destination.condition}
          </span>
        </div>

        {/* 3-Day Forecast Grid */}
        <div className="pt-2.5 sm:pt-4 border-t border-gray-100 relative z-10">
          <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 sm:mb-3">
            Forecast
          </p>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {destination.forecast.map((fc, index) => (
              <div
                key={`${destination.id}-fc-${index}`}
                className="flex flex-col items-center p-1.5 sm:p-2 bg-gray-50 hover:bg-amber-50/80 rounded-lg sm:rounded-xl border border-transparent hover:border-amber-200/50 transition-all duration-200 cursor-default"
              >
                <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 mb-0.5 sm:mb-1">
                  {fc.day}
                </span>
                <div>
                  <WeatherIcon
                    type={fc.icon}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 mb-1 group-hover:text-amber-500 transition-colors duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm font-black text-gray-900">
                  {fc.temp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
