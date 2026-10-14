'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { MapPin, ChevronRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { LocationPermissionCard } from './LocationPermissionCard';
import { LocationPermissionState, NearbyTripsSectionProps } from './types';
import { mockNearbyTripsData } from './mockNearbyTrips';
import { TripCard } from '@/components/shared';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const SectionWrapper = styled.section`
  position: relative;
  width: 100%;
  padding-top: 3rem;
  padding-bottom: 3rem;
  overflow: hidden;
  background-color: transparent;
  font-family: ${typography.fonts.jakarta};

  @media (min-width: 768px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

const Container = styled.div`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  position: relative;
  z-index: 10;

  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const HeaderWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: ${colors.charcoal};
  font-family: ${typography.fonts.jakarta};

  @media (min-width: 640px) {
    font-size: 28px;
  }

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const HighlightText = styled.span`
  margin-left: 0.25rem;
  color: ${colors.primaryContainer};
`;

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.charcoal};
  font-family: ${typography.fonts.jakarta};
  flex-shrink: 0;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.amber[600]};
  }

  svg {
    width: 1rem;
    height: 1rem;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(2px);
  }
`;

const ScrollTrack = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  @media (min-width: 640px) {
    gap: 1.25rem;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const LocationDetectedBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  margin-bottom: 1.25rem;
  background-color: rgba(254, 243, 199, 0.5);
  border: 1px solid ${colors.amber[200]};
  border-radius: 0.75rem;
  font-size: 0.8125rem;
  color: ${colors.charcoal};
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${colors.gray[600]};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.charcoal};
  }
`;

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
    <SectionWrapper id="nearby-trips-section">
      <Container>
        {/* Header Section */}
        <HeaderWrapper>
          <HeaderInner>
            <SectionTitle>
              <MapPin className="inline-block text-amber-500 w-6 h-6 mr-2 -mt-1" aria-hidden="true" />
              Trips Near
              <HighlightText>You</HighlightText>
            </SectionTitle>

            <ViewAllLink href="/search" id="nearby-trips-view-all">
              <span>View all</span>
              <ChevronRight aria-hidden="true" strokeWidth={2.5} />
            </ViewAllLink>
          </HeaderInner>
        </HeaderWrapper>

        {/* Content Section: Permission Prompt or Trips Carousel */}
        {status === 'granted' ? (
          <div>
            <LocationDetectedBar>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">Showing top getaways within 300 km of your location</span>
              </div>
              <ResetButton type="button" onClick={handleReset} title="Reset location state">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </ResetButton>
            </LocationDetectedBar>

            <ScrollTrack>
              {mockNearbyTripsData.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </ScrollTrack>
          </div>
        ) : (
          <LocationPermissionCard
            isLoading={status === 'requesting'}
            onRetry={handleRequestLocation}
          />
        )}
      </Container>
    </SectionWrapper>
  );
};
