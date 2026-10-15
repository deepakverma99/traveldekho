'use client';

import React from 'react';
import { TripDetail } from './types';
import { TripDetailHero } from './TripDetailHero';
import { TripAboutSection } from './TripAboutSection';
import { TripItinerarySection } from './TripItinerarySection';
import { TripPackageSection } from './TripPackageSection';
import { TripCostingSection } from './TripCostingSection';
import { TripGallerySection } from './TripGallerySection';
import { TripDestinationsCovered } from './TripDestinationsCovered';
import { TripPickupPoints } from './TripPickupPoints';
import { TripPartnerCard } from './TripPartnerCard';
import { TripReviewsSection } from './TripReviewsSection';
import { TripBookingSidebar } from './TripBookingSidebar';
import { Breadcrumb, BreadcrumbItem, FloatingBackground } from '@/components/shared';

interface TripDetailContentProps {
  trip: TripDetail;
}

export const TripDetailContent: React.FC<TripDetailContentProps> = ({ trip }) => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Trips', href: '/search' },
    { label: trip.destination, href: `/search?q=${encodeURIComponent(trip.destination)}` },
    { label: trip.title },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#FFFBF0] overflow-x-hidden">
      {/* Floating Animated Travel Icons Background */}
      <FloatingBackground fixed />

      <main className="relative z-10 w-full pt-6 sm:pt-8">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 sm:mb-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Hero Top Banner */}
        <TripDetailHero trip={trip} />

        {/* Main Content & Sidebar Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <div className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 sm:p-8 md:p-12 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">
              {/* Left Column: Details & Itinerary */}
              <div className="flex-1 w-full space-y-12 sm:space-y-16">
                <TripAboutSection
                  description={trip.about.description}
                  mapImage={trip.about.mapImage}
                />

                <TripItinerarySection itinerary={trip.itinerary} />

                <TripPackageSection packageDetails={trip.packageDetails} />

                <TripCostingSection costing={trip.costing} />

                <TripGallerySection gallery={trip.gallery} />

                <TripDestinationsCovered
                  destinations={trip.destinationsCovered}
                />

                <TripPickupPoints pickupPoints={trip.pickupPoints} />

                <TripPartnerCard partner={trip.partner} />

                <TripReviewsSection />
              </div>

              {/* Right Column: Sticky Booking Widget & Live Weather */}
              <TripBookingSidebar trip={trip} />
            </div>
          </div>
        </div>

        {/* Mobile Sticky Booking Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-200/50 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Trip Starts From
            </p>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-amber-500">
                ₹{trip.pricing.startingPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-gray-400 line-through">
                ₹{trip.pricing.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const sidebar = document.getElementById('booking-sidebar-section');
              if (sidebar) {
                sidebar.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-6 py-2.5 bg-amber-400 hover:bg-black hover:text-white text-gray-900 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Select Dates
          </button>
        </div>
      </main>
    </div>
  );
};
