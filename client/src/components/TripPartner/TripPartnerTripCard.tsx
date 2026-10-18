'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
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

const CardRoot = styled(motion.div)`
  background-color: ${colors.white};
  border-radius: 0.875rem;
  overflow: visible;
  border: 1px solid ${colors.amber[100]}B3;
  box-shadow: 0 4px 20px -4px rgba(115, 92, 0, 0.08), 0 1px 3px 0 rgba(0, 0, 0, 0.04);
  font-family: ${typography.fonts.jakarta};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  @media (min-width: 640px) {
    border-radius: 1rem;
    box-shadow: 0 4px 24px -4px rgba(115, 92, 0, 0.08), 0 1px 4px 0 rgba(0, 0, 0, 0.04);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px -6px rgba(115, 92, 0, 0.14), 0 2px 8px 0 rgba(0, 0, 0, 0.06);
  }
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background-color: ${colors.gray[100]};
`;

const ImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 0.875rem 0.875rem 0 0;

  @media (min-width: 640px) {
    border-radius: 1rem 1rem 0 0;
  }

  img {
    transition: transform 0.5s ease;
  }

  ${CardRoot}:hover & img {
    transform: scale(1.05);
  }
`;

const StatusPill = styled.div<{ $status: TripPartnerCardStatus }>`
  position: absolute;
  top: 0.375rem;
  left: 0.375rem;
  z-index: 25;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.15rem 0.45rem;
  border-radius: 9999px;
  font-size: 0.5625rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  max-width: calc(100% - 2.85rem);

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (min-width: 640px) {
    top: 0.625rem;
    left: 0.625rem;
    padding: 0.2rem 0.55rem;
    font-size: 0.625rem;
    gap: 0.35rem;
    max-width: calc(100% - 3.25rem);
  }

  ${({ $status }) => {
    switch ($status) {
      case 'Published':
        return `
          background-color: rgba(16, 185, 129, 0.95);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.4);
        `;
      case 'Pending Review':
      case 'Pending':
        return `
          background-color: rgba(245, 158, 11, 0.95);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.4);
        `;
      case 'Expired':
        return `
          background-color: rgba(239, 68, 68, 0.92);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.35);
        `;
      case 'Draft':
      default:
        return `
          background-color: rgba(51, 65, 85, 0.92);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.35);
        `;
    }
  }}
`;

const StatusDot = styled.span<{ $status: TripPartnerCardStatus }>`
  width: 0.3125rem;
  height: 0.3125rem;
  border-radius: 9999px;
  background-color: #ffffff;
`;

const MenuWrapper = styled.div`
  position: absolute;
  top: 0.375rem;
  right: 0.375rem;
  z-index: 30;

  @media (min-width: 640px) {
    top: 0.625rem;
    right: 0.625rem;
  }
`;

const MenuButton = styled.button`
  width: 1.625rem;
  height: 1.625rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.35);
  color: ${colors.white};
  border: 1px solid rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.2s ease;

  @media (min-width: 640px) {
    width: 1.875rem;
    height: 1.875rem;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
    transform: scale(1.06);
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

const ActionMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.25rem);
  right: 0;
  width: 9.75rem;
  background-color: ${colors.white};
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.18), 0 8px 10px -6px rgba(0, 0, 0, 0.08);
  border: 1px solid ${colors.gray[200]};
  padding: 0.3rem;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

const MenuItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.625rem;
  border-radius: 0.5rem;
  font-size: 0.71875rem;
  font-weight: 700;
  color: ${({ $danger }) => ($danger ? colors.red[600] : colors.gray[700])};
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ $danger }) => ($danger ? colors.red[50] : colors.gray[100])};
    color: ${({ $danger }) => ($danger ? colors.red[700] : colors.gray[900])};
  }

  svg {
    width: 0.8125rem;
    height: 0.8125rem;
    flex-shrink: 0;
  }
`;

const TagBadge = styled.span`
  flex-shrink: 0;
  padding: 0.1rem 0.375rem;
  font-size: 0.5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-radius: 9999px;
  white-space: nowrap;
  background-color: ${colors.amber[50]};
  color: ${colors.amber[700]};
  border: 1px solid ${colors.amber[100]};

  @media (min-width: 640px) {
    padding: 0.125rem 0.5rem;
    font-size: 0.5625rem;
    font-weight: 900;
    letter-spacing: 0.08em;
  }
`;

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
    <CardRoot>
      {/* Media Thumbnail Container */}
      <ThumbnailContainer>
        <ImageWrapper>
          <Link href={`/trips/${trip.slug}`} className="block w-full h-full relative">
            <Image
              alt={trip.title}
              src={trip.image}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
              className="object-cover"
              priority={priority}
            />
          </Link>
        </ImageWrapper>

        {/* Status Badge in Top-Left */}
        <StatusPill $status={trip.status}>
          <StatusDot $status={trip.status} />
          <span>{trip.status}</span>
        </StatusPill>

        {/* Three Dot Action Button in Top-Right (In place of heart icon) */}
        <MenuWrapper ref={menuRef}>
          <MenuButton
            type="button"
            aria-label="Trip Options"
            aria-expanded={isMenuOpen}
            onClick={handleMenuToggle}
          >
            <MoreVertical className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </MenuButton>

          <AnimatePresence>
            {isMenuOpen && (
              <ActionMenu
                initial={{ opacity: 0, scale: 0.92, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                <MenuItem type="button" onClick={handleEdit}>
                  <Pencil className="text-blue-500" />
                  <span>Edit</span>
                </MenuItem>

                <MenuItem type="button" onClick={handleCopy}>
                  {copied ? <Check className="text-green-500" /> : <Copy className="text-gray-500" />}
                  <span>{copied ? 'Copied!' : 'Copy Details'}</span>
                </MenuItem>

                <MenuItem type="button" onClick={handleArchive}>
                  <Archive className="text-amber-500" />
                  <span>Archive Trip</span>
                </MenuItem>

                <div
                  style={{
                    height: '1px',
                    backgroundColor: colors.gray[100],
                    margin: '0.25rem 0',
                  }}
                />

                <MenuItem type="button" $danger onClick={handleDelete}>
                  <Trash2 />
                  <span>Delete</span>
                </MenuItem>
              </ActionMenu>
            )}
          </AnimatePresence>
        </MenuWrapper>
      </ThumbnailContainer>

      {/* Content Body */}
      <Link href={`/trips/${trip.slug}`} className="contents">
        <div className="flex flex-col justify-center flex-grow p-2 sm:p-4 pt-1.5 sm:pt-3.5">
          {/* Duration */}
          <div
            className="flex items-center gap-1 text-[9.5px] sm:text-[12px] mb-1 sm:mb-1.5"
            style={{ fontFamily: typography.fonts.vietnam, color: colors.gray[500] }}
          >
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70" />
            <span>{trip.duration}</span>
          </div>

          {/* Title */}
          <h3
            className="font-bold leading-snug mb-1 sm:mb-1.5 line-clamp-2 text-[11.5px] sm:text-[14px] h-[32px] sm:h-[40px] overflow-hidden"
            style={{ fontFamily: typography.fonts.jakarta, color: colors.charcoal }}
          >
            {trip.title}
          </h3>

          {/* Destination */}
          <div className="h-[16px] sm:h-[20px] mb-1 sm:mb-2.5 flex items-center overflow-hidden">
            <div
              className="flex items-center gap-1 text-[9.5px] sm:text-[11px] font-bold truncate"
              style={{ color: colors.amber[600] }}
            >
              <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
              <span className="truncate">{trip.destination}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="h-[18px] sm:h-[24px] mb-1 sm:mb-2.5 overflow-hidden">
            <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-1 sm:gap-1.5 pb-2">
              {trip.tags.map((tag, idx) => (
                <TagBadge key={idx}>{tag}</TagBadge>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div
            className="min-h-[18px] sm:min-h-[24px] flex items-baseline flex-wrap gap-x-1.5 gap-y-0.5 mb-1 sm:mb-2.5"
            style={{ fontFamily: typography.fonts.jakarta }}
          >
            <span
              className="text-[12px] sm:text-[16px] font-extrabold shrink-0"
              style={{ color: colors.charcoal }}
            >
              ₹{trip.price.toLocaleString('en-IN')}
            </span>
            {trip.originalPrice && (
              <span
                className="text-[9.5px] sm:text-[12px] line-through shrink-0"
                style={{ color: colors.gray[400] }}
              >
                ₹{trip.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {trip.discount && (
              <span
                className="text-[8.5px] sm:text-[11px] font-bold shrink-0"
                style={{ color: colors.amber[700] }}
              >
                {trip.discount}
              </span>
            )}
          </div>

          {/* Departure Date */}
          <div
            className="flex items-center gap-1 text-[9px] sm:text-[11px] h-[15px] sm:h-[18px] overflow-hidden"
            style={{ fontFamily: typography.fonts.vietnam, color: colors.gray[500] }}
          >
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 opacity-70" />
            <span className="truncate">{trip.date}</span>
          </div>

          {/* Partner / Booking Summary Footer */}
          <div
            className="mt-1.5 sm:mt-3 pt-1.5 sm:pt-3 border-t"
            style={{ borderColor: colors.gray[100] }}
          >
            <div
              className="flex items-center justify-between w-full px-1.5 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl border border-transparent"
              style={{ backgroundColor: `${colors.gray[50]}CC` }}
            >
              <div className="flex items-center gap-1 sm:gap-1.5 overflow-hidden flex-1 min-w-0 pr-1">
                <div
                  className="shrink-0 w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full font-black text-[7.5px] sm:text-[9px] flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: colors.amber[500], color: colors.white }}
                >
                  {trip.partner.name.charAt(0).toUpperCase()}
                </div>
                <span
                  className="text-[8.5px] sm:text-[11px] truncate min-w-0"
                  style={{ fontFamily: typography.fonts.jakarta, color: colors.gray[500] }}
                >
                  By <span className="font-bold tracking-wide" style={{ color: colors.gray[900] }}>{trip.partner.name}</span>
                </span>
              </div>

              <div
                className="flex items-center gap-0.5 sm:gap-1 shrink-0 ml-1 border-l pl-1 sm:pl-2"
                style={{ borderColor: colors.gray[200] }}
              >
                <Star
                  className="w-2.5 h-2.5"
                  style={{ color: colors.amber[500], fill: colors.amber[500] }}
                />
                <span
                  className="text-[8.5px] sm:text-[10px] font-black whitespace-nowrap"
                  style={{ color: colors.gray[700] }}
                >
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
    </CardRoot>
  );
};
