'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, CircleDot, Star, Heart } from 'lucide-react';
import { colorTokens } from '@/theme';
import { Button, BookingDropdown } from '@/components/shared';
import { useHeroBooking } from './hooks';
import { POPULAR_DESTINATIONS, POPULAR_PICKUP_CITIES } from './data';

const CUSTOMER_AVATARS = [
  '/customers/customer-1.jpg',
  '/customers/customer-2.jpg',
  '/customers/customer-3.jpg',
] as const;

export const HeroBookingCard: React.FC = () => {
  const {
    destination,
    setDestination,
    pickup,
    setPickup,
    activeDropdown,
    toggleDropdown,
    containerRef,
    handleSelectDestination,
    handleSelectPickup,
    handleSearch,
  } = useHeroBooking();

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: colorTokens.surfacePure,
        borderColor: colorTokens.surfaceBorder,
      }}
      className="relative rounded-[28px] sm:rounded-[32px] p-6 sm:px-7 sm:py-8 border shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06),0_10px_25px_-5px_rgba(0,0,0,0.03)] font-jakarta w-full"
    >
      {/* Heading */}
      <h1
        style={{ color: colorTokens.textPrimary }}
        className="text-[32px] sm:text-[36px] md:text-[38px] font-black leading-[1.08] tracking-tight"
      >
        Find Your
        <br />
        Dream Trip
      </h1>

      {/* Subtitle */}
      <p
        style={{ color: colorTokens.textSecondary }}
        className="text-[13px] sm:text-[14px] mt-2 mb-6 font-normal leading-relaxed"
      >
        Get instant suggestions for your next adventure
      </p>

      {/* Booking Form Fields Stack */}
      <div className="flex flex-col gap-4">
        {/* 1. Destination Shared Dropdown */}
        <BookingDropdown
          id="hero-destination-trigger"
          label="DESTINATION"
          value={destination}
          placeholder="Where do you want to go?"
          icon={<MapPin className="w-5 h-5" />}
          isOpen={activeDropdown === 'destination'}
          onToggle={() => toggleDropdown('destination')}
          options={POPULAR_DESTINATIONS}
          onSelect={handleSelectDestination}
          onInputChange={setDestination}
          inputValue={destination}
          searchPlaceholder="Type destination..."
          sectionTitle="Popular Places"
        />

        {/* 2. Pickup Shared Dropdown */}
        <BookingDropdown
          id="hero-pickup-trigger"
          label="PICKUP"
          value={pickup}
          placeholder="Select starting point / city"
          icon={<CircleDot className="w-5 h-5" />}
          isOpen={activeDropdown === 'pickup'}
          onToggle={() => toggleDropdown('pickup')}
          options={POPULAR_PICKUP_CITIES}
          onSelect={handleSelectPickup}
          onInputChange={setPickup}
          inputValue={pickup}
          searchPlaceholder="Type starting city..."
          sectionTitle="Starting Hubs"
        />

        {/* Primary Action Button from Shared */}
        <Button
          id="hero-search-button"
          type="button"
          variant="primary"
          size="xl"
          isFullWidth
          showArrow
          onClick={handleSearch}
          className="mt-1.5"
        >
          CHECK TRIPS FOR FREE
        </Button>
      </div>

      {/* Footer Trust Badges */}
      <div className="flex items-center justify-between sm:justify-center gap-4 sm:gap-7 mt-8 pt-3">
        {/* 1. Rating with Star Row */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-1.5">
            <span
              style={{ color: colorTokens.textPrimary }}
              className="text-[15px] font-black leading-none"
            >
              4.0/5
            </span>
            {/* Stars Row */}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5"
                  style={{
                    color: colorTokens.badgeMatch,
                    fill: colorTokens.badgeMatch,
                  }}
                />
              ))}
            </div>
          </div>
          <span
            style={{ color: colorTokens.textSecondary }}
            className="text-[11px] font-medium mt-1 leading-tight"
          >
            Based on Reviews
          </span>
        </div>

        {/* Divider */}
        <div
          style={{ backgroundColor: colorTokens.surfaceBorder }}
          className="h-8 w-px shrink-0"
        />

        {/* 2. Happy Customers with Customer Images Stack */}
        <div className="flex items-center gap-2.5">
          {/* Overlapping Customer Avatar Images */}
          <div className="flex items-center -space-x-2">
            {CUSTOMER_AVATARS.map((src, idx) => (
              <div
                key={idx}
                className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0"
              >
                <Image
                  src={src}
                  alt={`Happy Traveler ${idx + 1}`}
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <span
              style={{ color: colorTokens.textPrimary }}
              className="text-[15px] font-black leading-none flex items-center gap-1"
            >
              Happy
              <Heart
                className="w-3.5 h-3.5 shrink-0"
                style={{
                  color: colorTokens.error,
                  fill: colorTokens.error,
                }}
              />
            </span>
            <span
              style={{ color: colorTokens.textSecondary }}
              className="text-[11px] font-medium mt-1 leading-tight"
            >
              Customers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
