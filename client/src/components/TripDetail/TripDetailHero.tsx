'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Share2, Check, ShieldCheck } from 'lucide-react';
import { TripDetail } from './types';

interface TripDetailHeroProps {
  trip: TripDetail;
}

export const TripDetailHero: React.FC<TripDetailHeroProps> = ({ trip }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: trip.title,
          text: `Check out ${trip.title} on TravelDekho!`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const heroDescription =
    trip.description ||
    trip.about?.description ||
    'Explore the magical landscapes of Ladakh. From iconic viewpoints to cultural heritage sites, enjoy an all-inclusive adventure led by certified trip captains.';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3 pb-6 sm:pb-8">
      <div className="relative w-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden min-h-[360px] md:min-h-[460px] flex flex-col shadow-lg group">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            alt={trip.title}
            src={trip.heroImage}
            fill
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/45 backdrop-brightness-95" />
        </div>

        {/* Hero Overlay Content */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-col flex-1 h-full justify-between">
          {/* Top Bar: Trip Partner Card & "Share" Button */}
          <div className="flex justify-between items-center sm:items-start gap-3">
            <Link
              href={`/trip-partners/${trip.partner.slug}`}
              className="group/partner flex items-center gap-2 sm:gap-2.5 bg-white/20 border border-white/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-1.5 pr-3.5 sm:p-2 sm:pr-4 transition-all shadow-md cursor-pointer hover:bg-white/30 active:scale-98"
            >
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-lg sm:rounded-xl border border-white/30 overflow-hidden shrink-0">
                <Image
                  src={trip.partner.logo}
                  alt={trip.partner.name}
                  fill
                  sizes="32px"
                  className="object-cover transition-transform duration-200 group-hover/partner:scale-105"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-[9px] font-black text-white/80 uppercase tracking-wider leading-none mb-0.5">
                  MANAGED BY
                </span>
                <span className="font-extrabold text-white text-[11px] sm:text-xs md:text-sm tracking-tight leading-tight transition-colors group-hover/partner:text-amber-300">
                  {trip.partner.name}
                </span>
              </div>

              {trip.partner.isVerified && (
                <div
                  className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 ml-1"
                  title="Scout Verified Partner"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              )}
            </Link>

            <button
              type="button"
              onClick={handleShare}
              aria-label="Share this trip"
              className="bg-white/20 border border-white/40 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all shadow-md cursor-pointer hover:bg-white/30 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span className="text-sm font-bold text-emerald-300">
                    Copied!
                  </span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-bold">
                    Share
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Center Hero: Title, Description & Tags */}
          <div className="flex-1 flex flex-col items-center justify-center gap-3 sm:gap-4 my-auto py-6 sm:py-8 text-center max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-md px-2 font-montserrat">
              {trip.title}
            </h1>

            {heroDescription && (
              <p className="text-white/90 text-sm font-medium max-w-2xl leading-relaxed px-4">
                {heroDescription}
              </p>
            )}

            {/* Tags Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1 sm:pt-2">
              {trip.tags.map((tag) => (
                <span
                  key={tag.label}
                  className={`px-2.5 py-0.5 sm:px-3 sm:py-1 backdrop-blur-xs text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-full shadow-xs transition-transform hover:scale-105 ${
                    tag.variant === 'white'
                      ? 'bg-white/90 text-gray-900'
                      : 'bg-amber-400/90 text-black'
                  }`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
