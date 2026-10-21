'use client';

import React from 'react';
import Image from 'next/image';
import {
  MapPin,
  ChevronDown,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  CalendarCheck,
} from 'lucide-react';
import {
  TripGroupCard,
  TripGroupHeader,
  TripInfoLeft,
  TripThumbnail,
  TripThumbnailBadge,
  TripTitleArea,
  TripMetaTagsRow,
  TripMetaTag,
  TripCenterProgress,
  ProgressHeaderRow,
  ProgressBarTrack,
  ProgressBarFill,
  TripStatsRight,
  MetricCardlet,
  ChevronToggleButton,
  BookingsListWrapper,
  ManifestHeaderBar,
} from './styles';
import { TripBookingsGroup } from './types';
import { BookingItemCard } from './BookingItemCard';

interface TripBookingsAccordionProps {
  group: TripBookingsGroup;
  isOpen: boolean;
  onToggle: () => void;
  onMarkPaid: (bookingId: string) => void;
  onDelete: (bookingId: string) => void;
}

export const TripBookingsAccordion: React.FC<TripBookingsAccordionProps> = ({
  group,
  isOpen,
  onToggle,
  onMarkPaid,
  onDelete,
}) => {
  const totalGuests = group.bookings.reduce((sum, b) => sum + (b.guestsCount || 1), 0);
  const paidBookings = group.bookings.filter((b) => b.paymentStatus === 'paid');
  const paidCount = paidBookings.length;
  const paidRevenue = paidBookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const unpaidRevenue = Math.max(0, group.totalRevenue - paidRevenue);
  const paidPercent =
    group.totalBookings > 0 ? Math.round((paidCount / group.totalBookings) * 100) : 0;

  return (
    <TripGroupCard $isOpen={isOpen}>
      {/* Group Header */}
      <TripGroupHeader
        $isOpen={isOpen}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        aria-expanded={isOpen}
      >
        {/* Left: Thumbnail & Trip Info */}
        <TripInfoLeft>
          <TripThumbnail>
            <Image
              src={group.tripImage || '/trips/spiti.png'}
              alt={group.tripTitle}
              fill
              className="object-cover"
              sizes="80px"
              unoptimized
            />
            <TripThumbnailBadge>{group.tripDuration}</TripThumbnailBadge>
          </TripThumbnail>

          <TripTitleArea>
            <h2>{group.tripTitle}</h2>
            <TripMetaTagsRow>
              <TripMetaTag>
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{group.tripLocation}</span>
              </TripMetaTag>
              <span className="dot">•</span>
              <TripMetaTag>
                <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{group.tripDuration}</span>
              </TripMetaTag>
              <span className="dot">•</span>
              <TripMetaTag $highlight>
                <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>
                  {totalGuests} {totalGuests === 1 ? 'Traveler' : 'Travelers'}
                </span>
              </TripMetaTag>
            </TripMetaTagsRow>
          </TripTitleArea>
        </TripInfoLeft>

        {/* Center: Collection Status & Segmented Progress */}
        <TripCenterProgress>
          <ProgressHeaderRow>
            <span className="title">Collection Status</span>
            <span className="stats">
              {paidPercent}% Paid ({paidCount}/{group.totalBookings})
            </span>
          </ProgressHeaderRow>

          <ProgressBarTrack>
            <ProgressBarFill $percent={paidPercent} />
          </ProgressBarTrack>

          <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 mt-1.5">
            <span className="text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" /> ₹{paidRevenue.toLocaleString('en-IN')} Paid
            </span>
            {group.unpaidCount > 0 ? (
              <span className="text-amber-700 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-amber-500" /> ₹{unpaidRevenue.toLocaleString('en-IN')} Pending
              </span>
            ) : (
              <span className="text-emerald-600 font-bold">All Settled</span>
            )}
          </div>
        </TripCenterProgress>

        {/* Right: Bookings, Revenue, Unpaid and Toggle Button */}
        <TripStatsRight>
          <MetricCardlet $variant="default">
            <span className="label">Bookings</span>
            <span className="value">
              <CalendarCheck className="w-3.5 h-3.5 text-gray-400 inline mr-1" />
              {group.totalBookings}
            </span>
          </MetricCardlet>

          <MetricCardlet $variant="green">
            <span className="label">Total Revenue</span>
            <span className="value">₹{group.totalRevenue.toLocaleString('en-IN')}</span>
          </MetricCardlet>

          <MetricCardlet $variant={group.unpaidCount > 0 ? 'amber' : 'neutral'}>
            <span className="label">Unpaid</span>
            <span className="value">
              {group.unpaidCount > 0 ? (
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  {group.unpaidCount}
                </span>
              ) : (
                '0'
              )}
            </span>
          </MetricCardlet>

          <ChevronToggleButton
            $isOpen={isOpen}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            aria-label={isOpen ? 'Collapse trip bookings' : 'Expand trip bookings'}
          >
            <span className="btn-text">{isOpen ? 'Hide' : 'View'}</span>
            <ChevronDown className="w-4 h-4 chevron-icon" />
          </ChevronToggleButton>
        </TripStatsRight>
      </TripGroupHeader>

      {/* Collapsible Bookings List */}
      {isOpen && (
        <BookingsListWrapper>
          <ManifestHeaderBar>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-gray-800">
                Passenger Manifest
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black">
                {group.bookings.length} {group.bookings.length === 1 ? 'Booking' : 'Bookings'}
              </span>
            </div>
            <div className="text-xs font-semibold text-gray-500">
              Manage individual traveler tickets, payment status, and itineraries
            </div>
          </ManifestHeaderBar>

          {group.bookings.map((booking) => (
            <BookingItemCard
              key={booking.id}
              booking={booking}
              onMarkPaid={onMarkPaid}
              onDelete={onDelete}
            />
          ))}
        </BookingsListWrapper>
      )}
    </TripGroupCard>
  );
};
