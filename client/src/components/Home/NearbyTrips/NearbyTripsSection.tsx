'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, ChevronRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { LocationPermissionCard } from './LocationPermissionCard';
import { LocationPermissionState, NearbyTripsSectionProps } from './types';
import { mockNearbyTripsData } from './mockNearbyTrips';
import { TripCard } from '@/components/shared';

export const NearbyTripsSection: React.FC<NearbyTripsSectionProps> = ({
  initialState = 'denied',
}) => {
  const [status, setStatus] = useState<LocationPermissionState>(initialState);

  const handleRequestLocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setStatus('denied');
      return;
    }

    setStatus('requesting');

    navigator.geolocation.getCurrentPosition(
      () => {
        setStatus('granted');
      },
      () => {
        setStatus('denied');
      },
      {
        timeout: 8000,
        enableHighAccuracy: false,
      }
    );
  };

  const handleReset = () => {
    setStatus('denied');
  };

  return (
    <section
      id="nearby-trips-section"
      className="relative w-full py-12 md:py-16 overflow-hidden bg-transparent font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="flex items-center text-xl sm:text-[28px] md:text-[32px] font-black tracking-tight text-charcoal">
            <MapPin className="inline-block text-primary w-6 h-6 mr-2 -mt-1" aria-hidden="true" />
            <span>Trips Near</span>
            <span className="ml-1 text-primary">You</span>
          </h2>

          <Link
            href="/search"
            id="nearby-trips-view-all"
            className="flex items-center gap-1 text-sm font-bold text-charcoal hover:text-amber-600 transition-colors duration-200 group shrink-0"
          >
            <span>View all</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>
        </div>

        {/* Content Section: Permission Prompt or Trips Carousel */}
        {status === 'granted' ? (
          <div>
            <div className="flex items-center justify-between p-3 sm:px-4 mb-5 bg-amber-50/50 border border-amber-200 rounded-xl text-[13px] text-charcoal">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Showing top getaways within 300 km of your location</span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                title="Reset location state"
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-charcoal bg-transparent border-none cursor-pointer transition-colors duration-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-hide">
              {mockNearbyTripsData.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </div>
        ) : (
          <LocationPermissionCard
            isLoading={status === 'requesting'}
            onRetry={handleRequestLocation}
          />
        )}
      </div>
    </section>
  );
};
