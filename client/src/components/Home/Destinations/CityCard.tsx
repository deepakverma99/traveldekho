'use client';

import React, { useState } from 'react';
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

const SaveButton = styled.button<{ $saved?: boolean }>`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.95);
  }

  svg {
    width: 1rem;
    height: 1rem;
    fill: ${(props) => (props.$saved ? colors.amber[500] : 'none')};
    stroke: ${(props) => (props.$saved ? colors.amber[500] : colors.charcoal)};
    stroke-width: 2;
    transition: fill 0.2s ease, stroke 0.2s ease;
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

export const CityCard: React.FC<CityCardProps> = ({
  city,
  onSaveToggle,
  isSaved: initialSaved = false,
}) => {
  const [saved, setSaved] = useState<boolean>(initialSaved);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newSaved = !saved;
    setSaved(newSaved);
    if (onSaveToggle) {
      onSaveToggle(city.id, newSaved);
    }
  };

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

          <SaveButton
            type="button"
            aria-label={`Save ${city.name}`}
            $saved={saved}
            onClick={handleSaveClick}
          >
            <svg viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </SaveButton>
        </ImageContainer>

        <CityTitle>{city.name}</CityTitle>
        <CitySubtitle>{city.state}</CitySubtitle>
      </ArticleWrapper>
    </CardLink>
  );
};
