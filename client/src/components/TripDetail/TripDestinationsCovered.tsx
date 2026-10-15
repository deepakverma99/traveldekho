'use client';

import React from 'react';
import styled from 'styled-components';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

interface TripDestinationsCoveredProps {
  destinations: string[];
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

const BadgeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;

  @media (min-width: 640px) {
    gap: 0.75rem;
  }
`;

const DestinationBadge = styled.span`
  padding: 0.5rem 1rem;
  background-color: ${colors.amber[400]};
  color: ${colors.gray[900]};
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 9999px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  @media (min-width: 640px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.75rem;
  }
`;

export const TripDestinationsCovered: React.FC<TripDestinationsCoveredProps> = ({
  destinations,
}) => {
  return (
    <section>
      <SectionTitle>Destinations Covered</SectionTitle>

      <BadgeList>
        {destinations.map((destination) => (
          <DestinationBadge key={destination}>
            {destination}
          </DestinationBadge>
        ))}
      </BadgeList>
    </section>
  );
};
