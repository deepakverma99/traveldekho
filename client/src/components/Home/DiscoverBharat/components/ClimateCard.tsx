'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  SunMedium,
  Thermometer,
  ArrowRight,
  CheckCircle2,
  Snowflake,
  Wind,
  Waves,
  Building,
  MapPin,
} from 'lucide-react';
import { colorTokens } from '@/theme';
import { DestinationClimateItem, ClimateConditionLine } from '../types';

interface ClimateCardProps {
  climate: DestinationClimateItem;
}

const renderConditionIcon = (iconType: ClimateConditionLine['iconType']) => {
  switch (iconType) {
    case 'snow':
      return <Snowflake className="w-3.5 h-3.5 text-cyan-300 shrink-0" />;
    case 'wave':
      return <Waves className="w-3.5 h-3.5 text-sky-300 shrink-0" />;
    case 'raft':
      return <Wind className="w-3.5 h-3.5 text-teal-300 shrink-0" />;
    case 'fort':
      return <Building className="w-3.5 h-3.5 text-amber-300 shrink-0" />;
    case 'check':
    default:
      return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 stroke-[2.5] shrink-0" />;
  }
};

export const ClimateCard: React.FC<ClimateCardProps> = ({ climate }) => {
  const bgImage = climate.image || '/destinations/default.png';

  return (
    <div className="group relative flex flex-col justify-between p-2.5 sm:p-4 rounded-2xl sm:rounded-[24px] border border-gray-200/60 shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.2)] transition-all duration-300 font-jakarta overflow-hidden min-h-[380px] sm:min-h-[400px]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={climate.destination}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={false}
        />
        {/* Cinematic gradient: top stays vivid and bright, bottom fades to dark for readable text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 via-45% to-black/15 group-hover:from-black/95 group-hover:via-black/65 transition-colors duration-300" />
        {/* Subtle warm brand tint highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-[#ff5722]/10 pointer-events-none" />
      </div>

      {/* Card Content Layer */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top Row: Weather Capsule + Live Pulse Indicator */}
        <div className="flex items-center justify-between gap-2">
          {/* Temperature & Condition Capsule */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-xs">
            {climate.iconType === 'thermometer' ? (
              <Thermometer
                style={{ color: colorTokens.primaryContainer }}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2] shrink-0"
              />
            ) : (
              <SunMedium className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 stroke-[2.2] shrink-0" />
            )}
            <span className="text-xs sm:text-sm font-extrabold tracking-tight">{climate.temp}</span>
            <span className="text-[9.5px] sm:text-[11px] font-semibold text-white/85 border-l border-white/25 pl-1.5 sm:pl-2 whitespace-nowrap">
              {climate.badgeText}
            </span>
          </div>

          {/* Live Indicator Pill */}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 backdrop-blur-md select-none whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>

        {/* Bottom Details Stack */}
        <div className="mt-auto pt-8 flex flex-col">
          {/* Destination Title */}
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[#ffb5a0] transition-colors leading-tight drop-shadow-sm">
            {climate.destination}
          </h3>

          {/* Context / Region */}
          <p className="text-xs sm:text-[13px] font-medium mt-1 mb-3.5 text-white/90 leading-normal drop-shadow-xs flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{climate.context}</span>
          </p>

          {/* Real-time Climate Conditions Pills */}
          <div className="flex flex-col gap-1.5 mb-3.5 sm:mb-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white/95 text-xs font-medium shadow-xs">
              {renderConditionIcon(climate.condition1.iconType)}
              <span className="truncate">{climate.condition1.text}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white/95 text-xs font-medium shadow-xs">
              {renderConditionIcon(climate.condition2.iconType)}
              <span className="truncate">{climate.condition2.text}</span>
            </div>
          </div>

          {/* Bottom Action Link */}
          <Link
            href={climate.href}
            className="flex items-center justify-between pt-3 sm:pt-3.5 border-t border-white/20 font-bold text-xs sm:text-[13px] text-white hover:text-[#ff5722] transition-colors select-none group/btn"
          >
            <span>{climate.tripCountText}</span>
            <div
              style={{ backgroundColor: colorTokens.primaryContainer }}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1"
            >
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-[2.5]" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
