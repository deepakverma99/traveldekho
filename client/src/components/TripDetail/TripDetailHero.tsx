'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Share2, Check, ShieldCheck } from 'lucide-react';
import { TripDetail } from './types';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

interface TripDetailHeroProps {
  trip: TripDetail;
}

const HeroBanner = styled.div`
  position: relative;
  width: 100%;
  border-radius: 2rem;
  overflow: hidden;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  @media (min-width: 640px) {
    border-radius: 2.5rem;
  }
  @media (min-width: 768px) {
    min-height: 460px;
  }
`;

const HeroImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: brightness(0.95);
  -webkit-backdrop-filter: brightness(0.95);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  justify-content: space-between;
`;

const PartnerPill = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 0.75rem;
  padding: 0.375rem 0.875rem 0.375rem 0.375rem;
  transition: all 0.2s ease;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  &:active {
    transform: scale(0.98);
  }

  @media (min-width: 640px) {
    border-radius: 1rem;
    padding: 0.5rem 1rem 0.5rem 0.5rem;
    gap: 0.625rem;
  }
`;

const PartnerIconBox = styled.div`
  position: relative;
  width: 1.75rem;
  height: 1.75rem;
  background-color: ${colors.white};
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  flex-shrink: 0;

  img {
    object-fit: cover;
    transition: transform 0.2s ease;
  }

  ${PartnerPill}:hover & img {
    transform: scale(1.05);
  }

  @media (min-width: 640px) {
    width: 2rem;
    height: 2rem;
    border-radius: 0.75rem;
  }
`;

const PartnerNameText = styled.span`
  font-weight: 800;
  color: ${colors.white};
  font-size: 11px;
  letter-spacing: -0.01em;
  line-height: 1.25;
  transition: color 0.15s ease;

  ${PartnerPill}:hover & {
    color: ${colors.amber[300]};
  }

  @media (min-width: 640px) {
    font-size: 0.75rem;
  }
  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

const ShareButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: ${colors.white};
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const HeroTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 900;
  color: ${colors.white};
  line-height: 1.25;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-family: ${typography.fonts.montserrat};

  @media (min-width: 640px) {
    font-size: 2.25rem;
  }
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  @media (min-width: 1024px) {
    font-size: 3.75rem;
  }
`;

const TagChip = styled.span<{ $isWhite?: boolean }>`
  padding: 0.125rem 0.625rem;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 9999px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.15s ease;
  background-color: ${({ $isWhite }) =>
    $isWhite ? `${colors.white}E6` : `${colors.amber[400]}E6`};
  color: ${({ $isWhite }) => ($isWhite ? colors.gray[900] : colors.black)};

  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 640px) {
    padding: 0.25rem 0.75rem;
    font-size: 10px;
  }
`;

export const TripDetailHero: React.FC<TripDetailHeroProps> = ({ trip }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: trip.title,
          text: `Check out ${trip.title} on TravelDekho!`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const heroDescription =
    trip.description ||
    trip.about?.description ||
    'Explore the magical landscapes of Ladakh. From iconic viewpoints to cultural heritage sites, enjoy an all-inclusive adventure led by certified trip captains.';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3 pb-6 sm:pb-8">
      <HeroBanner className="group">
        {/* Background Image with Overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            alt={trip.title}
            src={trip.heroImage}
            fill
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <HeroImageOverlay />
        </div>

        {/* Hero Overlay Content */}
        <HeroContent>
          {/* Top Bar: Trip Partner Card & "Share" Button */}
          <div className="flex justify-between items-center sm:items-start gap-3">
            <PartnerPill href={`/trip-partners/${trip.partner.slug}`}>
              <PartnerIconBox>
                <Image
                  src={trip.partner.logo}
                  alt={trip.partner.name}
                  fill
                  sizes="32px"
                />
              </PartnerIconBox>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 900,
                    color: 'rgba(255, 255, 255, 0.8)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    lineHeight: 1,
                    marginBottom: '0.125rem',
                  }}
                >
                  MANAGED BY
                </span>
                <PartnerNameText>{trip.partner.name}</PartnerNameText>
              </div>

              {trip.partner.isVerified && (
                <div
                  style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    borderRadius: '9999px',
                    backgroundColor: colors.green[50],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginLeft: '0.25rem',
                  }}
                  title="Scout Verified Partner"
                >
                  <ShieldCheck style={{ width: '0.875rem', height: '0.875rem', color: colors.green[600] }} />
                </div>
              )}
            </PartnerPill>

            <ShareButton
              type="button"
              onClick={handleShare}
              aria-label="Share this trip"
            >
              {copied ? (
                <>
                  <Check style={{ width: '1rem', height: '1rem', color: colors.green[300] }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: colors.green[300] }}>
                    Copied!
                  </span>
                </>
              ) : (
                <>
                  <Share2 style={{ width: '1rem', height: '1rem' }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>
                    Share
                  </span>
                </>
              )}
            </ShareButton>
          </div>

          {/* Center Hero: Title, Description & Tags */}
          <div className="flex-1 flex flex-col items-center justify-center gap-3 sm:gap-4 my-auto py-6 sm:py-8 text-center max-w-4xl mx-auto">
            <HeroTitle>{trip.title}</HeroTitle>

            {heroDescription && (
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  maxWidth: '42rem',
                  lineHeight: 1.625,
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                }}
              >
                {heroDescription}
              </p>
            )}

            {/* Tags Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1 sm:pt-2">
              {trip.tags.map((tag) => (
                <TagChip
                  key={tag.label}
                  $isWhite={tag.variant === 'white'}
                >
                  {tag.label}
                </TagChip>
              ))}
            </div>
          </div>
        </HeroContent>
      </HeroBanner>
    </section>
  );
};
