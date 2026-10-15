'use client';

import React from 'react';
import styled from 'styled-components';
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
import { colors } from '@/theme/colors';

interface TripDetailContentProps {
  trip: TripDetail;
}

const PageRoot = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: ${colors.cream};
  overflow-x: hidden;
`;

const MainContentWrapper = styled.div`
  background-color: ${colors.white};
  border-radius: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
  padding: 1.25rem;
  border: 1px solid ${colors.gray[100]};

  @media (min-width: 640px) {
    border-radius: 3rem;
    padding: 2rem;
  }
  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const MobileStickyBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 40;
  background-color: ${colors.white}F2;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid ${colors.amber[200]}80;
  padding: 0.75rem 1rem;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const MobileSelectDatesButton = styled.button`
  padding: 0.625rem 1.5rem;
  background-color: ${colors.amber[400]};
  color: ${colors.gray[900]};
  font-weight: 800;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.75rem;
  border: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: ${colors.black};
    color: ${colors.white};
  }
  &:active {
    transform: scale(0.95);
  }
`;

export const TripDetailContent: React.FC<TripDetailContentProps> = ({ trip }) => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Trips', href: '/search' },
    { label: trip.destination, href: `/search?q=${encodeURIComponent(trip.destination)}` },
    { label: trip.title },
  ];

  return (
    <PageRoot>
      {/* Floating Animated Travel Icons Background */}
      <FloatingBackground fixed />

      <main style={{ position: 'relative', zIndex: 10, width: '100%', paddingTop: '1.5rem' }}>
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 sm:mb-3">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Hero Top Banner */}
        <TripDetailHero trip={trip} />

        {/* Main Content & Sidebar Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <MainContentWrapper>
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
          </MainContentWrapper>
        </div>

        {/* Mobile Sticky Booking Bar */}
        <MobileStickyBar>
          <div>
            <p
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: colors.gray[500],
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Trip Starts From
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: colors.amber[500] }}>
                ₹{trip.pricing.startingPrice.toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.gray[400], textDecoration: 'line-through' }}>
                ₹{trip.pricing.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <MobileSelectDatesButton
            type="button"
            onClick={() => {
              const sidebar = document.getElementById('booking-sidebar-section');
              if (sidebar) {
                sidebar.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Select Dates
          </MobileSelectDatesButton>
        </MobileStickyBar>
      </main>
    </PageRoot>
  );
};
