'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  useAppDispatch,
  useAppSelector,
  selectActiveGalleryIndex,
  openGalleryPhoto,
  closeGalleryPhoto,
  nextGalleryPhoto,
  prevGalleryPhoto,
} from '@/redux';

interface TripGallerySectionProps {
  gallery: string[];
}

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${colors.gray[900]};
  margin-bottom: 1.5rem;
  font-family: ${typography.fonts.caveat};

  @media (min-width: 640px) {
    margin-bottom: 2rem;
  }
  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.625rem;

  @media (min-width: 640px) {
    gap: 0.75rem;
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const GalleryCard = styled.div<{ $isFeatured?: boolean }>`
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  aspect-ratio: 1 / 1;
  cursor: zoom-in;
  background-color: ${colors.gray[100]};

  @media (min-width: 768px) {
    ${({ $isFeatured }) =>
      $isFeatured &&
      `
      grid-column: span 2;
      grid-row: span 2;
    `}
  }

  img {
    object-fit: cover;
    transition: transform 0.7s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.2s ease;

  ${GalleryCard}:hover & {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

const LightboxBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const LightboxNavButton = styled.button<{ $position: 'close' | 'prev' | 'next' }>`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.white};
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  z-index: 20;
  transition: background-color 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }

  ${({ $position }) =>
    $position === 'close' &&
    `
    top: 1.25rem;
    right: 1.25rem;
    padding: 0.625rem;
  `}

  ${({ $position }) =>
    $position === 'prev' &&
    `
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.75rem;
  `}

  ${({ $position }) =>
    $position === 'next' &&
    `
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.75rem;
  `}
`;

export const TripGallerySection: React.FC<TripGallerySectionProps> = ({
  gallery,
}) => {
  const dispatch = useAppDispatch();
  const activePhotoIndex = useAppSelector(selectActiveGalleryIndex);

  const handleOpenPhoto = (index: number) => {
    dispatch(openGalleryPhoto(index));
  };

  const handleClosePhoto = () => {
    dispatch(closeGalleryPhoto());
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(prevGalleryPhoto(gallery.length));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(nextGalleryPhoto(gallery.length));
  };

  return (
    <section>
      <SectionTitle>Gallery</SectionTitle>

      <GalleryGrid>
        {gallery.map((photo, index) => {
          const isFeatured = index === 0;
          return (
            <GalleryCard
              key={photo + index}
              $isFeatured={isFeatured}
              onClick={() => handleOpenPhoto(index)}
              className="group"
            >
              <Image
                src={photo}
                alt={`Trip photo ${index + 1}`}
                fill
                sizes={
                  isFeatured
                    ? '(max-width: 768px) 100vw, 50vw'
                    : '(max-width: 768px) 50vw, 25vw'
                }
              />
              <ImageOverlay />
            </GalleryCard>
          );
        })}
      </GalleryGrid>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <LightboxBackdrop onClick={handleClosePhoto}>
          {/* Close Button */}
          <LightboxNavButton
            type="button"
            $position="close"
            onClick={handleClosePhoto}
            aria-label="Close Lightbox"
          >
            <X style={{ width: '1.5rem', height: '1.5rem' }} />
          </LightboxNavButton>

          {/* Left Arrow */}
          <LightboxNavButton
            type="button"
            $position="prev"
            onClick={handlePrev}
            aria-label="Previous Photo"
          >
            <ChevronLeft style={{ width: '1.5rem', height: '1.5rem' }} />
          </LightboxNavButton>

          {/* Image Container */}
          <div
            style={{
              position: 'relative',
              maxWidth: '56rem',
              maxHeight: '85vh',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '70vh',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Image
                src={gallery[activePhotoIndex]}
                alt={`Trip photo preview ${activePhotoIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Right Arrow */}
          <LightboxNavButton
            type="button"
            $position="next"
            onClick={handleNext}
            aria-label="Next Photo"
          >
            <ChevronRight style={{ width: '1.5rem', height: '1.5rem' }} />
          </LightboxNavButton>
        </LightboxBackdrop>
      )}
    </section>
  );
};
