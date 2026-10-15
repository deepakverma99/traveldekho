'use client';

import React from 'react';
import styled from 'styled-components';
import { MapPin } from 'lucide-react';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

interface TripPickupPointsProps {
  pickupPoints: string[];
}

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${colors.gray[900]};
  margin-bottom: 1.25rem;
  font-family: ${typography.fonts.caveat};

  @media (min-width: 640px) {
    margin-bottom: 1.5rem;
  }
  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

const PointsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const PointItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background-color: ${colors.gray[50]};
  border-radius: 0.75rem;
  border: 1px solid ${colors.gray[100]};
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${colors.gray[100]}99;
  }
`;

const PointText = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${colors.gray[700]};

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

export const TripPickupPoints: React.FC<TripPickupPointsProps> = ({
  pickupPoints,
}) => {
  return (
    <section>
      <SectionTitle>Pickup Points</SectionTitle>

      <PointsList>
        {pickupPoints.map((point) => (
          <PointItem key={point}>
            <MapPin
              style={{
                width: '1rem',
                height: '1rem',
                color: colors.amber[500],
                flexShrink: 0,
              }}
            />
            <PointText>{point}</PointText>
          </PointItem>
        ))}
      </PointsList>
    </section>
  );
};
