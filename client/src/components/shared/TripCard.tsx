'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, Star } from 'lucide-react';

export interface TripTag {
  label: string;
  variant?: 'amber' | 'blue' | 'gray';
}

export interface TripItem {
  id: string;
  slug: string;
  title: string;
  destination: string;
  duration: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: string;
  date: string;
  freeGoodies?: boolean;
  tags: (string | TripTag)[];
  partner: {
    name: string;
    logo?: string;
    ratingText?: string;
  };
}

export interface TripCardProps {
  trip: TripItem;
  priority?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const TripCard: React.FC<TripCardProps> = ({
  trip,
  priority = false,
  fullWidth = false,
  className = '',
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const getTagClasses = (variant?: 'amber' | 'blue' | 'gray') => {
    switch (variant) {
      case 'blue':
        return 'bg-blue-50 text-blue-700 border border-blue-100';
      case 'gray':
        return 'bg-gray-100 text-gray-600 border border-gray-200';
      default:
        return 'bg-amber-50 text-amber-700 border border-amber-100';
    }
  };

  return (
    <Link href={`/trips/${trip.slug}`} id={trip.id} className="contents">
      <motion.div
        className={`bg-white rounded-[0.875rem] sm:rounded-2xl overflow-hidden border border-amber-100/70 shadow-[0_4px_20px_-4px_rgba(115,92,0,0.08),0_1px_3px_0_rgba(0,0,0,0.04)] font-jakarta flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-6px_rgba(115,92,0,0.14),0_2px_8px_0_rgba(0,0,0,0.06)] group ${
          fullWidth
            ? 'w-full h-full shrink'
            : 'w-[205px] min-[375px]:w-[215px] min-[440px]:w-[235px] sm:w-[280px] shrink-0'
        } ${className}`}
      >
        {/* Media Thumbnail Container */}
        <div className="relative overflow-hidden shrink-0 w-full aspect-[4/3] bg-gray-100">
          <Image
            alt={trip.title}
            src={trip.image}
            fill
            sizes="(max-width: 640px) 235px, 280px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
            loading={priority ? 'eager' : undefined}
            unoptimized
          />

          {/* Free Goodies Badge */}
          {trip.freeGoodies && (
            <div className="absolute top-1.5 sm:top-3 left-1.5 sm:left-3 flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-full text-[8.5px] sm:text-[11px] font-bold backdrop-blur-xs bg-black/75 text-white">
              Free Goodies
              <span className="text-[9px] sm:text-xs">🎁</span>
            </div>
          )}

          {/* Wishlist Heart Toggle */}
          <button
            type="button"
            aria-label="Toggle Wishlist"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-1.5 sm:top-3 right-1.5 sm:right-3 p-1 sm:p-2 rounded-full transition-all duration-300 backdrop-blur-md z-10 cursor-pointer bg-black/20 text-white"
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                isLiked ? 'text-red-500 fill-red-500' : 'text-white fill-none'
              }`}
            />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex flex-col justify-center flex-grow p-2.5 sm:p-4 pt-2 sm:pt-3.5">
          {/* Duration */}
          <div className="flex items-center gap-1 text-[10px] sm:text-[12px] mb-1 sm:mb-1.5 font-vietnam text-gray-500">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70" />
            <span>{trip.duration}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold leading-snug mb-1 sm:mb-1.5 line-clamp-2 text-[12px] sm:text-[14px] h-[34px] sm:h-[40px] overflow-hidden font-jakarta text-charcoal">
            {trip.title}
          </h3>

          {/* Destination */}
          <div className="h-4 sm:h-5 mb-1.5 sm:mb-2.5 flex items-center overflow-hidden">
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold truncate text-amber-600">
              <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
              <span className="truncate">{trip.destination}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="h-5 sm:h-6 mb-1.5 sm:mb-2.5 overflow-hidden">
            <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-1 sm:gap-1.5 pb-2">
              {trip.tags.map((tag, idx) => {
                const label = typeof tag === 'string' ? tag : tag.label;
                const variant = typeof tag === 'string' ? 'amber' : tag.variant || 'amber';
                return (
                  <span
                    key={idx}
                    className={`shrink-0 py-0.5 px-1.5 sm:px-2 text-[8px] sm:text-[9px] font-extrabold sm:font-black uppercase tracking-wider rounded-full whitespace-nowrap ${getTagClasses(
                      variant
                    )}`}
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Pricing */}
          <div className="h-5 sm:h-6 flex items-baseline gap-1.5 sm:gap-2 mb-1.5 sm:mb-3 overflow-hidden whitespace-nowrap font-jakarta">
            <span className="text-[13px] sm:text-[16px] font-extrabold shrink-0 text-charcoal">
              ₹{trip.price.toLocaleString('en-IN')}
            </span>
            {trip.originalPrice && (
              <span className="text-[10px] sm:text-[12px] line-through shrink-0 text-gray-400">
                ₹{trip.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {trip.discount && (
              <span className="text-[9px] sm:text-[11px] font-bold shrink-0 text-amber-700">
                {trip.discount}
              </span>
            )}
          </div>

          {/* Departure Date */}
          <div className="flex items-start gap-1 text-[9.5px] sm:text-[11px] h-[15px] sm:h-4 overflow-hidden font-vietnam text-gray-500">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 mt-0.5 shrink-0 opacity-70" />
            <span className="truncate">{trip.date}</span>
          </div>

          {/* Partner / Vendor Footer */}
          <div className="mt-1.5 sm:mt-3 pt-1.5 sm:pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between w-full px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl border border-transparent bg-gray-50/80">
              <div className="flex items-center gap-1 sm:gap-1.5 overflow-hidden flex-1 pr-1 sm:pr-2">
                {trip.partner.logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    alt="Trip Partner Logo"
                    className="shrink-0 w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full object-cover shadow-xs border bg-white border-gray-100"
                    src={trip.partner.logo}
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className={`shrink-0 w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full font-black text-[8px] sm:text-[9px] items-center justify-center shadow-xs bg-amber-500 text-white ${
                    trip.partner.logo ? 'hidden' : 'flex'
                  }`}
                >
                  {trip.partner.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-[9px] sm:text-[11px] truncate font-jakarta text-gray-500">
                  By <span className="font-bold tracking-wide text-gray-900">{trip.partner.name}</span>
                </span>
              </div>

              <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 ml-1.5 sm:ml-2 border-l border-gray-200 pl-1.5 sm:pl-2">
                <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                <span className="text-[9px] sm:text-[10px] font-black text-gray-700">
                  {trip.partner.ratingText || 'New'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
