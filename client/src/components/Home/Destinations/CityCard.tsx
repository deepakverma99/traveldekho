'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { CityCardProps } from './types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const CardLink = styled(Link)`
  display: block;
  text-decoration: none;
`;

const ArticleWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 0.75rem;
  background-color: ${colors.gray[100]};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  ${CardLink}:hover & {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  transition: transform 0.5s ease;

  ${CardLink}:hover & {
    transform: scale(1.05);
  }
`;

const CityTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  line-height: 1.375;
  color: ${colors.charcoal};
  font-family: ${typography.fonts.jakarta};
  transition: color 0.2s ease;

  ${CardLink}:hover & {
    color: ${colors.primary};
  }
`;

const CitySubtitle = styled.p`
  font-size: 12px;
  text-align: center;
  margin-top: 0.125rem;
  color: #5e5e5e;
  font-family: ${typography.fonts.vietnam};
`;

export const CityCard: React.FC<CityCardProps> = ({ city }) => {
  return (
    <CardLink href={`/search?q=${encodeURIComponent(city.query)}`} className="group">
      <ArticleWrapper id={city.id}>
        <ImageContainer>
          <StyledImage
            alt={city.name}
            fill
            sizes="(max-width: 768px) 200px, 250px"
            src={city.image}
            loading="lazy"
          />
        </ImageContainer>

        <CityTitle>{city.name}</CityTitle>
        <CitySubtitle>{city.state}</CitySubtitle>
      </ArticleWrapper>
    </CardLink>
  );
};
