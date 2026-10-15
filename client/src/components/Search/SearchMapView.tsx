'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { MapPin, Calendar, ArrowRight, X } from 'lucide-react';
import { TripItem } from './types';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

export interface SearchMapViewProps {
  trips: TripItem[];
}

const MapRoot = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid ${colors.gray[200]};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  background-color: ${colors.gray[100]};
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    height: 700px;
  }
`;

const MapBackground = styled.div`
  position: absolute;
  inset: 0;
  background-color: #e5e3df;
  overflow: hidden;
`;

const MapSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.35;
`;

const PinsOverlay = styled.div`
  position: absolute;
  inset: 0;
  padding: 2rem;
  pointer-events: none;

  @media (min-width: 640px) {
    padding: 3rem;
  }
`;

const PinWrapper = styled.div<{ $top: string; $left: string }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  pointer-events: auto;
  transform: translate(-50%, -50%);
  z-index: 20;
  cursor: pointer;
`;

const PinPill = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  ${({ $isSelected }) =>
    $isSelected
      ? `
    background-color: ${colors.black};
    color: ${colors.white};
    box-shadow: 0 0 0 4px ${colors.primaryContainer};
  `
      : `
    background-color: ${colors.white};
    color: ${colors.gray[900]};
    border: 1px solid ${colors.gray[200]};

    &:hover {
      background-color: ${colors.primaryContainer};
    }
  `}

  &:hover {
    transform: scale(1.1);
  }
`;

const FloatingCardContainer = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  z-index: 30;

  @media (min-width: 768px) {
    left: auto;
    right: 2rem;
    width: 360px;
  }
`;

const FloatingCard = styled.div`
  background-color: ${colors.white};
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid ${colors.gray[200]};
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.375rem;
  border-radius: 9999px;
  background-color: ${colors.gray[100]};
  color: ${colors.gray[500]};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  z-index: 10;

  &:hover {
    background-color: ${colors.gray[200]};
  }
`;

const CardFlex = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const PreviewImage = styled.div`
  position: relative;
  width: 6rem;
  height: 6rem;
  border-radius: 0.75rem;
  overflow: hidden;
  flex-shrink: 0;
  background-color: ${colors.gray[100]};
`;

const CardDetails = styled.div`
  flex: 1;
  min-width: 0;
  padding-right: 1.5rem;
`;

const DestinationLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 11px;
  color: ${colors.amber[600]};
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const CardTitle = styled.h4`
  font-weight: 700;
  font-size: 0.875rem;
  color: ${colors.charcoal};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.25rem;
  font-family: ${typography.fonts.jakarta};
`;

const DurationText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: ${colors.gray[500]};
  margin-bottom: 0.5rem;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PriceText = styled.span`
  font-weight: 800;
  font-size: 0.875rem;
  color: ${colors.gray[900]};
`;

const ViewLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${colors.amber[600]};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.black};
  }
`;

export const SearchMapView: React.FC<SearchMapViewProps> = ({ trips }) => {
  const [selectedTrip, setSelectedTrip] = useState<TripItem | null>(
    trips[0] || null
  );

  return (
    <MapRoot>
      {/* Map Graphic Background Simulation */}
      <MapBackground>
        {/* SVG Topographic / Roads styling pattern */}
        <MapSvg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="map-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke={colors.gray[300]}
                strokeWidth="1"
              />
              <circle cx="30" cy="30" r="1.5" fill={colors.gray[400]} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
          {/* Decorative Rivers / Routes */}
          <path
            d="M -50 150 Q 200 120 400 280 T 900 350 T 1500 500"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 100 -50 Q 300 300 700 380 T 1400 700"
            fill="none"
            stroke={colors.amber[200]}
            strokeWidth="3"
            strokeDasharray="6 6"
          />
        </MapSvg>

        {/* Map Interactive Pins */}
        <PinsOverlay>
          {trips.map((trip, idx) => {
            // Distribute pins across the map area
            const positions = [
              { top: '22%', left: '38%' }, // Manali
              { top: '35%', left: '52%' }, // Kausani
              { top: '15%', left: '32%' }, // Ladakh
              { top: '28%', left: '42%' }, // Spiti
              { top: '38%', left: '46%' }, // Rishikesh
              { top: '68%', left: '28%' }, // Goa
              { top: '44%', left: '34%' }, // Jaipur
              { top: '18%', left: '36%' }, // Zanskar
            ];
            const pos = positions[idx % positions.length];
            const isSelected = selectedTrip?.id === trip.id;

            return (
              <PinWrapper
                key={trip.id}
                $top={pos.top}
                $left={pos.left}
                onClick={() => setSelectedTrip(trip)}
              >
                <PinPill $isSelected={isSelected}>
                  <MapPin
                    className="w-3.5 h-3.5"
                    style={{
                      color: isSelected ? colors.primaryContainer : colors.red[500],
                    }}
                  />
                  <span>{trip.destination}</span>
                  <span className="text-[11px] font-black opacity-80">
                    ₹{trip.price}
                  </span>
                </PinPill>
              </PinWrapper>
            );
          })}
        </PinsOverlay>
      </MapBackground>

      {/* Selected Trip Floating Card on Map */}
      {selectedTrip && (
        <FloatingCardContainer>
          <FloatingCard className="animate-fade-in-up">
            <CloseButton
              type="button"
              onClick={() => setSelectedTrip(null)}
              aria-label="Close Preview"
            >
              <X className="w-4 h-4" />
            </CloseButton>

            <CardFlex>
              <PreviewImage>
                <Image
                  src={selectedTrip.image}
                  alt={selectedTrip.title}
                  fill
                  className="object-cover"
                />
              </PreviewImage>

              <CardDetails>
                <DestinationLabel>
                  <MapPin className="w-3 h-3" />
                  <span>{selectedTrip.destination}</span>
                </DestinationLabel>
                <CardTitle>
                  {selectedTrip.title}
                </CardTitle>
                <DurationText>
                  <Calendar className="w-3 h-3" />
                  <span>{selectedTrip.duration}</span>
                </DurationText>
                <BottomRow>
                  <PriceText>
                    ₹{selectedTrip.price.toLocaleString('en-IN')}
                  </PriceText>
                  <ViewLink href={`/trips/${selectedTrip.slug}`}>
                    <span>View Trip</span> <ArrowRight className="w-3 h-3" />
                  </ViewLink>
                </BottomRow>
              </CardDetails>
            </CardFlex>
          </FloatingCard>
        </FloatingCardContainer>
      )}
    </MapRoot>
  );
};

