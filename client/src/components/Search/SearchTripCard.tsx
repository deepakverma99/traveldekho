'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin, Calendar, Star } from 'lucide-react';
import { TripItem } from './types';
import { typography } from '@/theme/typography';

export interface SearchTripCardProps {
  trip: TripItem;
}

export const SearchTripCard: React.FC<SearchTripCardProps> = ({ trip }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <Link
      href={`/trips/${trip.slug}`}
      id={trip.id}
      className="contents"
    >
      <div className="bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-2xl overflow-hidden border border-gray-100 group flex flex-col w-full h-full transition-all duration-300">
        {/* Thumbnail Aspect Container */}
        <div className="relative overflow-hidden shrink-0 w-full aspect-[4/3] bg-gray-100">
          <Image
            alt={trip.title}
            src={trip.image}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 300px"
            className="object-cover transition duration-500 group-hover:scale-105 opacity-100"
          />

          {/* Free Goodies Badge */}
          {trip.freeGoodies && (
            <div
              className="absolute top-2 sm:top-3 left-2 sm:left-3 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[11px] font-bold"
              style={{
                background: 'rgba(0, 0, 0, 0.75)',
                color: '#ffffff',
                backdropFilter: 'blur(4px)',
                fontFamily: typography.fonts.jakarta,
              }}
            >
              Free Goodies
              <span className="text-[10px] sm:text-xs">🎁</span>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            type="button"
            aria-label="Toggle Wishlist"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 rounded-full transition-all duration-300 backdrop-blur-md bg-black/20 text-white hover:bg-black/40 z-10"
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                isLiked ? 'text-red-500 fill-red-500' : 'text-white'
              }`}
            />
          </button>
        </div>

        {/* Card Body */}
        <div className="flex flex-col justify-center flex-grow p-2.5 sm:p-4 pt-2 sm:pt-3.5">
          {/* Duration */}
          <div
            className="flex items-center gap-1 text-[10px] sm:text-[12px] mb-1.5 text-gray-500"
            style={{ fontFamily: typography.fonts.vietnam }}
          >
            <Calendar className="w-3.5 h-3.5 opacity-70" />
            <span>{trip.duration}</span>
          </div>

          {/* Title */}
          <h3
            className="font-bold leading-snug mb-1 sm:mb-1.5 line-clamp-2 text-[12px] sm:text-[14px] h-[36px] sm:h-[40px] overflow-hidden text-[#191c1d]"
            style={{ fontFamily: typography.fonts.jakarta }}
          >
            {trip.title}
          </h3>

          {/* Destination */}
          <div className="h-[18px] sm:h-[20px] mb-2 sm:mb-2.5 flex items-center overflow-hidden">
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-amber-600 font-bold truncate">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{trip.destination}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="h-[22px] sm:h-[24px] mb-2 sm:mb-2.5 overflow-hidden">
            <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-1 sm:gap-1.5 pb-2">
              {trip.tags.map((tag, idx) => {
                const label = typeof tag === 'string' ? tag : tag.label;
                const variant =
                  typeof tag === 'string'
                    ? tag.toLowerCase().includes('moderate') ||
                      tag.toLowerCase().includes('challenging') ||
                      tag.toLowerCase().includes('extreme')
                      ? 'blue'
                      : 'amber'
                    : tag.variant || 'amber';

                const isBlue = variant === 'blue';

                return (
                  <span
                    key={idx}
                    className={`shrink-0 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[9px] font-black uppercase tracking-widest rounded-full border whitespace-nowrap ${
                      isBlue
                        ? 'bg-blue-50 text-blue-700 border-blue-100'
                        : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Pricing */}
          <div className="h-[22px] sm:h-[24px] flex items-baseline gap-1.5 sm:gap-2 mb-2 sm:mb-3 overflow-hidden whitespace-nowrap">
            <span
              className="text-[14px] sm:text-[16px] font-extrabold shrink-0 text-[#191c1d]"
              style={{ fontFamily: typography.fonts.jakarta }}
            >
              ₹{trip.price.toLocaleString('en-IN')}
            </span>
            {trip.originalPrice && (
              <span className="text-[10px] sm:text-[12px] line-through shrink-0 text-gray-400">
                ₹{trip.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {trip.discount && (
              <span className="text-[9px] sm:text-[11px] font-bold shrink-0 text-orange-600">
                {trip.discount}
              </span>
            )}
          </div>

          {/* Departure Date */}
          <div
            className="flex items-start gap-1.5 text-[11px] h-[16px] overflow-hidden text-gray-500"
            style={{ fontFamily: typography.fonts.vietnam }}
          >
            <Calendar className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-70" />
            <span className="truncate">{trip.date}</span>
          </div>

          {/* Partner Footer */}
          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-gray-50/80 border border-transparent">
              <div className="flex items-center gap-1 sm:gap-1.5 overflow-hidden flex-1 pr-1 sm:pr-2">
                <div className="shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-500 text-white font-black text-[9px] sm:text-[10px] flex items-center justify-center shadow-sm">
                  {trip.partner.name.charAt(0).toUpperCase()}
                </div>
                <span
                  className="text-[9px] sm:text-[11px] text-gray-500 truncate"
                  style={{ fontFamily: typography.fonts.jakarta }}
                >
                  By{' '}
                  <span className="font-bold text-gray-900 tracking-wide">
                    {trip.partner.name}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-2 border-l border-gray-200 pl-2">
                <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                <span className="text-[10px] font-black text-gray-700">
                  {trip.partner.ratingText || 'New'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
