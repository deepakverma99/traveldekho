'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';
import { WeatherCardProps, WeatherIconType } from './types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const CardLink = styled(Link)`
  display: block;
  height: 100%;
  text-decoration: none;
  flex-shrink: 0;
  width: 205px;

  @media (min-width: 375px) {
    width: 215px;
  }

  @media (min-width: 440px) {
    width: 235px;
  }

  @media (min-width: 640px) {
    width: 100%;
    flex-shrink: 1;
  }
`;

const CardRoot = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[100]};
  border-radius: 1rem;
  padding: 0.875rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${typography.fonts.jakarta};

  @media (min-width: 640px) {
    border-radius: 1.5rem;
    padding: 1.25rem;
  }

  &:hover {
    border-color: ${colors.amber[400]};
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.12), 0 2px 4px rgba(0, 0, 0, 0.04);
    transform: translateY(-2px);
  }
`;

const GlowOrb = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 8rem;
  height: 8rem;
  background-color: rgba(251, 191, 36, 0.05);
  border-radius: 9999px;
  filter: blur(32px);
  margin-right: -2.5rem;
  margin-top: -2.5rem;
  transition: background-color 0.3s ease;

  ${CardRoot}:hover & {
    background-color: rgba(251, 191, 36, 0.12);
  }
`;

const FloatingIconBadge = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${colors.amber[50]};
  color: ${colors.amber[500]};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
  transition: background-color 0.3s ease, transform 0.3s ease;

  @media (min-width: 640px) {
    width: 2.5rem;
    height: 2.5rem;
  }

  ${CardRoot}:hover & {
    background-color: ${colors.amber[100]};
    transform: translateY(-2px);
  }
`;

const ForecastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.375rem 0.25rem;
  background-color: ${colors.gray[50]};
  border-radius: 0.5rem;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  cursor: default;

  @media (min-width: 640px) {
    padding: 0.5rem;
    border-radius: 0.75rem;
  }

  &:hover {
    background-color: rgba(254, 243, 199, 0.8);
    border-color: rgba(253, 230, 138, 0.5);
  }
`;

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
    <CardLink href={destination.href} className="group">
      <CardRoot>
        {/* Ambient Top Glow */}
        <GlowOrb />

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

          <FloatingIconBadge>
            <WeatherIcon type={destination.currentIcon} className="w-4 h-4 sm:w-5 sm:h-5" />
          </FloatingIconBadge>
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
              <ForecastItem key={`${destination.id}-fc-${index}`}>
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
              </ForecastItem>
            ))}
          </div>
        </div>
      </CardRoot>
    </CardLink>
  );
};
