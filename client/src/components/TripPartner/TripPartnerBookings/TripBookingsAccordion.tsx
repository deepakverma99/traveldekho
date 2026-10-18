'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, ChevronUp } from 'lucide-react';
import {
  TripGroupCard,
  TripGroupHeader,
  TripInfoLeft,
  TripThumbnail,
  TripTitleArea,
  TripStatsRight,
  StatBlock,
  ChevronCircleButton,
  BookingsListWrapper,
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
  return (
    <TripGroupCard>
      {/* Group Header */}
      <TripGroupHeader onClick={onToggle} role="button" tabIndex={0} onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}>
        {/* Left: Thumbnail & Trip Info */}
        <TripInfoLeft>
          <TripThumbnail>
            <Image
              src={group.tripImage || '/trips/spiti.png'}
              alt={group.tripTitle}
              fill
              className="object-cover"
              sizes="56px"
              unoptimized
            />
          </TripThumbnail>

          <TripTitleArea>
            <h2>{group.tripTitle}</h2>
            <p>
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{group.tripLocation}</span>
              <span>•</span>
              <span>{group.tripDuration}</span>
            </p>
          </TripTitleArea>
        </TripInfoLeft>

        {/* Right: Bookings, Revenue, Unpaid and Chevron Button */}
        <TripStatsRight>
          <StatBlock $colorVariant="default">
            <span className="label">Bookings</span>
            <span className="value">{group.totalBookings}</span>
          </StatBlock>

          <StatBlock $colorVariant="green">
            <span className="label">Revenue</span>
            <span className="value">₹{group.totalRevenue.toLocaleString('en-IN')}</span>
          </StatBlock>

          <StatBlock $colorVariant="amber">
            <span className="label">Unpaid</span>
            <span className="value">{group.unpaidCount}</span>
          </StatBlock>

          <ChevronCircleButton
            $isOpen={isOpen}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            aria-label={isOpen ? 'Collapse trip bookings' : 'Expand trip bookings'}
          >
            <ChevronUp />
          </ChevronCircleButton>
        </TripStatsRight>
      </TripGroupHeader>

      {/* Collapsible Bookings List */}
      {isOpen && (
        <BookingsListWrapper>
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
