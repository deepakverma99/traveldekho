'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, Star } from 'lucide-react';
import { typography } from '@/theme/typography';

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

const CardRoot = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 0.875rem;
  overflow: hidden;
  border: 1px solid rgba(254, 243, 199, 0.7);
  box-shadow: 0 4px 20px -4px rgba(115, 92, 0, 0.08), 0 1px 3px 0 rgba(0, 0, 0, 0.04);
  font-family: ${typography.fonts.jakarta};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 205px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

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

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px -6px rgba(115, 92, 0, 0.14), 0 2px 8px 0 rgba(0, 0, 0, 0.06);
  }
`;

const TagBadge = styled.span<{ $variant?: 'amber' | 'blue' | 'gray' }>`
  flex-shrink: 0;
  padding: 0.1rem 0.375rem;
  font-size: 0.5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-radius: 9999px;
  white-space: nowrap;

  @media (min-width: 640px) {
    padding: 0.125rem 0.5rem;
    font-size: 0.5625rem;
    font-weight: 900;
    letter-spacing: 0.08em;
  }

  ${(props) => {
    switch (props.$variant) {
      case 'blue':
        return `
          background-color: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #dbeafe;
        `;
      case 'gray':
        return `
          background-color: #f3f4f6;
          color: #4b5563;
          border: 1px solid #e5e7eb;
        `;
      default:
        return `
          background-color: #fffbeb;
          color: #b45309;
          border: 1px solid #fef3c7;
        `;
    }
  }}
`;

export interface TripCardProps {
  trip: TripItem;
  priority?: boolean;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, priority = false }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <Link href={`/trips/${trip.slug}`} id={trip.id} className="contents">
      <CardRoot className="group">
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
          />

          {/* Free Goodies Badge */}
          {trip.freeGoodies && (
            <div className="absolute top-1.5 sm:top-3 left-1.5 sm:left-3 flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-full text-[8.5px] sm:text-[11px] font-bold bg-black/75 text-white backdrop-blur-sm">
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
            className="absolute top-1.5 sm:top-3 right-1.5 sm:right-3 p-1 sm:p-2 rounded-full transition-all duration-300 backdrop-blur-md bg-black/20 text-white hover:bg-black/40 z-10"
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                isLiked ? 'text-red-500 fill-red-500' : 'text-white'
              }`}
            />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex flex-col justify-center flex-grow p-2.5 sm:p-4 pt-2 sm:pt-3.5">
          {/* Duration */}
          <div
            className="flex items-center gap-1 text-[10px] sm:text-[12px] mb-1 sm:mb-1.5 text-gray-500"
            style={{ fontFamily: typography.fonts.vietnam }}
          >
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70" />
            <span>{trip.duration}</span>
          </div>

          {/* Title */}
          <h3
            className="font-bold leading-snug mb-1 sm:mb-1.5 line-clamp-2 text-[12px] sm:text-[14px] h-[34px] sm:h-[40px] overflow-hidden text-[#191c1d]"
            style={{ fontFamily: typography.fonts.jakarta }}
          >
            {trip.title}
          </h3>

          {/* Destination */}
          <div className="h-[16px] sm:h-[20px] mb-1.5 sm:mb-2.5 flex items-center overflow-hidden">
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-amber-600 font-bold truncate">
              <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
              <span className="truncate">{trip.destination}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="h-[20px] sm:h-[24px] mb-1.5 sm:mb-2.5 overflow-hidden">
            <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-1 sm:gap-1.5 pb-2">
              {trip.tags.map((tag, idx) => {
                const label = typeof tag === 'string' ? tag : tag.label;
                const variant = typeof tag === 'string' ? 'amber' : tag.variant || 'amber';
                return (
                  <TagBadge key={idx} $variant={variant}>
                    {label}
                  </TagBadge>
                );
              })}
            </div>
          </div>

          {/* Pricing */}
          <div
            className="h-[20px] sm:h-[24px] flex items-baseline gap-1.5 sm:gap-2 mb-1.5 sm:mb-3 overflow-hidden whitespace-nowrap"
            style={{ fontFamily: typography.fonts.jakarta }}
          >
            <span className="text-[13px] sm:text-[16px] font-extrabold shrink-0 text-[#191c1d]">
              ₹{trip.price.toLocaleString('en-IN')}
            </span>
            {trip.originalPrice && (
              <span className="text-[10px] sm:text-[12px] line-through shrink-0 text-gray-400">
                ₹{trip.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {trip.discount && (
              <span className="text-[9px] sm:text-[11px] font-bold shrink-0 text-[#e65100]">
                {trip.discount}
              </span>
            )}
          </div>

          {/* Departure Date */}
          <div
            className="flex items-start gap-1 text-[9.5px] sm:text-[11px] h-[15px] sm:h-[16px] overflow-hidden text-gray-500"
            style={{ fontFamily: typography.fonts.vietnam }}
          >
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 mt-0.5 shrink-0 opacity-70" />
            <span className="truncate">{trip.date}</span>
          </div>

          {/* Partner / Vendor Footer */}
          <div className="mt-1.5 sm:mt-3 pt-1.5 sm:pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between w-full px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl bg-gray-50/80 border border-transparent">
              <div className="flex items-center gap-1 sm:gap-1.5 overflow-hidden flex-1 pr-1 sm:pr-2">
                {trip.partner.logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    alt="Trip Partner Logo"
                    className="shrink-0 w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full object-cover shadow-sm bg-white border border-gray-100"
                    src={trip.partner.logo}
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className={`shrink-0 w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-amber-500 text-white font-black text-[8px] sm:text-[9px] items-center justify-center shadow-sm ${
                    trip.partner.logo ? 'hidden' : 'flex'
                  }`}
                >
                  {trip.partner.name.charAt(0).toUpperCase()}
                </div>
                <span
                  className="text-[9px] sm:text-[11px] text-gray-500 truncate"
                  style={{ fontFamily: typography.fonts.jakarta }}
                >
                  By <span className="font-bold text-gray-900 tracking-wide">{trip.partner.name}</span>
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
      </CardRoot>
    </Link>
  );
};
