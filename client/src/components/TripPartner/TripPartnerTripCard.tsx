'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MoreVertical,
  Pencil,
  Trash2,
  Copy,
  Archive,
  MapPin,
  Calendar,
  Star,
  Check,
} from 'lucide-react';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';
import {
  type TripPartnerCardStatus,
  type PartnerTripItem,
  type TripPartnerTripCardProps,
} from './types/';

export type { TripPartnerCardStatus, PartnerTripItem, TripPartnerTripCardProps };

const getStatusBadgeStyle = (status: TripPartnerCardStatus) => {
  switch (status) {
    case 'Published':
      return 'bg-emerald-600/95 text-white border-white/40';
    case 'Pending Review':
    case 'Pending':
      return 'bg-amber-500/95 text-white border-white/40';
    case 'Expired':
      return 'bg-red-500/92 text-white border-white/35';
    case 'Draft':
    default:
      return 'bg-slate-700/92 text-white border-white/35';
  }
};

export const TripPartnerTripCard: React.FC<TripPartnerTripCardProps> = ({
  trip,
  onEdit,
  onDelete,
  onArchive,
  onCopyDetails,
  priority = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuOpen]);

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(false);
    onEdit?.(trip);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(false);
    onDelete?.(trip.id);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const details = `${trip.title}\nDestination: ${trip.destination}\nDuration: ${trip.duration}\nPrice: ₹${trip.price.toLocaleString('en-IN')}\nStatus: ${trip.status}`;
    navigator.clipboard?.writeText(details);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setIsMenuOpen(false);
    onCopyDetails?.(trip);
  };

  const handleArchive = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(false);
    onArchive?.(trip.id);
  };

  return (
    <motion.div
      className="group relative flex flex-col w-full h-full bg-white rounded-2xl border border-amber-100/70 shadow-[0_4px_20px_-4px_rgba(115,92,0,0.08),0_1px_3px_0_rgba(0,0,0,0.04)] sm:shadow-[0_4px_24px_-4px_rgba(115,92,0,0.08),0_1px_4px_0_rgba(0,0,0,0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-6px_rgba(115,92,0,0.14),0_2px_8px_0_rgba(0,0,0,0.06)] font-jakarta overflow-visible"
    >
      {/* Media Thumbnail Container */}
      <div className="relative w-full aspect-[4/3] bg-gray-100">
        <div className="absolute inset-0 overflow-hidden rounded-t-2xl">
          <Link href={`/trips/${trip.slug}`} className="block w-full h-full relative">
            <Image
              alt={trip.title}
              src={trip.image}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={priority}
            />
          </Link>
        </div>

        {/* Status Badge in Top-Left */}
        <div
          className={`absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 z-25 inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold tracking-wide backdrop-blur-md shadow-md max-w-[calc(100%-2.85rem)] sm:max-w-[calc(100%-3.25rem)] border ${getStatusBadgeStyle(
            trip.status
          )}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
          <span className="truncate">{trip.status}</span>
        </div>

        {/* Three Dot Action Button in Top-Right */}
        <div className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 z-30" ref={menuRef}>
          <button
            type="button"
            aria-label="Trip Options"
            aria-expanded={isMenuOpen}
            onClick={handleMenuToggle}
            className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center bg-black/35 hover:bg-black/70 text-white border border-white/35 hover:border-white/60 backdrop-blur-md cursor-pointer transition-all duration-200 hover:scale-105"
          >
            <MoreVertical className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-[calc(100%+0.25rem)] right-0 w-39 bg-white rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.18),0_8px_10px_-6px_rgba(0,0,0,0.08)] border border-gray-200 p-1.5 z-50 flex flex-col gap-0.5"
              >
                <button
                  type="button"
                  onClick={handleEdit}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left transition-colors cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left transition-colors cursor-pointer"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  )}
                  <span>{copied ? 'Copied!' : 'Copy Details'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleArchive}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left transition-colors cursor-pointer"
                >
                  <Archive className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Archive Trip</span>
                </button>

                <div className="h-px bg-gray-100 my-1" />

                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11.5px] font-bold text-red-600 hover:bg-red-50 hover:text-red-700 text-left transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Delete</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Content Body */}
      <Link href={`/trips/${trip.slug}`} className="contents">
        <div className="flex flex-col justify-center flex-grow p-2 sm:p-4 pt-1.5 sm:pt-3.5">
          {/* Duration */}
          <div
            className="flex items-center gap-1 text-[9.5px] sm:text-[12px] mb-1 sm:mb-1.5 font-vietnam text-gray-500"
          >
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70" />
            <span>{trip.duration}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold leading-snug mb-1 sm:mb-1.5 line-clamp-2 text-[11.5px] sm:text-[14px] h-[32px] sm:h-[40px] overflow-hidden font-jakarta text-charcoal">
            {trip.title}
          </h3>

          {/* Destination */}
          <div className="h-[16px] sm:h-[20px] mb-1 sm:mb-2.5 flex items-center overflow-hidden">
            <div className="flex items-center gap-1 text-[9.5px] sm:text-[11px] font-bold truncate text-amber-600">
              <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
              <span className="truncate">{trip.destination}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="h-[18px] sm:h-[24px] mb-1 sm:mb-2.5 overflow-hidden">
            <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-1 sm:gap-1.5 pb-2">
              {trip.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="shrink-0 px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[8px] sm:text-[9px] font-extrabold sm:font-black uppercase tracking-wider rounded-full whitespace-nowrap bg-amber-50 text-amber-700 border border-amber-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="min-h-[18px] sm:min-h-[24px] flex items-baseline flex-wrap gap-x-1.5 gap-y-0.5 mb-1 sm:mb-2.5 font-jakarta">
            <span className="text-[12px] sm:text-[16px] font-extrabold shrink-0 text-charcoal">
              ₹{trip.price.toLocaleString('en-IN')}
            </span>
            {trip.originalPrice && (
              <span className="text-[9.5px] sm:text-[12px] line-through shrink-0 text-gray-400">
                ₹{trip.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {trip.discount && (
              <span className="text-[8.5px] sm:text-[11px] font-bold shrink-0 text-amber-700">
                {trip.discount}
              </span>
            )}
          </div>

          {/* Departure Date */}
          <div className="flex items-center gap-1 text-[9px] sm:text-[11px] h-[15px] sm:h-[18px] overflow-hidden font-vietnam text-gray-500">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 opacity-70" />
            <span className="truncate">{trip.date}</span>
          </div>

          {/* Partner / Booking Summary Footer */}
          <div className="mt-1.5 sm:mt-3 pt-1.5 sm:pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between w-full px-1.5 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl border border-transparent bg-gray-50/80">
              <div className="flex items-center gap-1 sm:gap-1.5 overflow-hidden flex-1 min-w-0 pr-1">
                <div className="shrink-0 w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full font-black text-[7.5px] sm:text-[9px] flex items-center justify-center shadow-xs bg-amber-500 text-white">
                  {trip.partner.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-[8.5px] sm:text-[11px] truncate min-w-0 font-jakarta text-gray-500">
                  By <span className="font-bold tracking-wide text-gray-900">{trip.partner.name}</span>
                </span>
              </div>

              <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 ml-1 border-l border-gray-200 pl-1 sm:pl-2">
                <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                <span className="text-[8.5px] sm:text-[10px] font-black whitespace-nowrap text-gray-700">
                  {trip.bookingsCount > 0 ? (
                    <>
                      <span className="hidden sm:inline">{trip.bookingsCount} Bookings</span>
                      <span className="inline sm:hidden">{trip.bookingsCount} Bkgs</span>
                    </>
                  ) : (
                    'New'
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
