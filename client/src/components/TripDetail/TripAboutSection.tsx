'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

interface TripAboutSectionProps {
  description: string;
  mapImage?: string;
}

const SectionTitle = styled.h2`
  font-size: 1.875rem;
  color: ${colors.gray[900]};
  margin-bottom: 1.5rem;
  font-family: ${typography.fonts.caveat};

  @media (min-width: 640px) {
    margin-bottom: 2rem;
  }
  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  background-color: ${colors.warmCream};
  border-radius: 1.5rem;
  border: 1px solid ${colors.gray[100]};
  overflow: hidden;
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 260px;

  @media (min-width: 640px) {
    min-height: 320px;
  }
  @media (min-width: 768px) {
    min-height: 400px;
  }

  img {
    width: 100%;
    height: auto;
    max-height: 600px;
    object-fit: contain;
    transition: transform 0.7s ease;

    &:hover {
      transform: scale(1.02);
    }
  }
`;

const DescriptionText = styled.div`
  max-width: none;
  color: ${colors.gray[600]};
  line-height: 1.625;
  font-weight: 500;
  white-space: pre-wrap;
  margin-bottom: 2rem;
  font-size: 0.875rem;

  @media (min-width: 640px) {
    font-size: 1rem;
  }
  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const TripAboutSection: React.FC<TripAboutSectionProps> = ({
  description,
  mapImage,
}) => {
  return (
    <section>
      <SectionTitle>About the trip</SectionTitle>

      {mapImage && (
        <MapWrapper className="group">
          <Image
            src={mapImage}
            alt="Route Map"
            width={1200}
            height={600}
            priority={false}
          />
        </MapWrapper>
      )}

      <DescriptionText>{description}</DescriptionText>
    </section>
  );
};
