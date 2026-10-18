'use client';

import React from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarouselScroll } from '@/redux';
import { CityCard } from './CityCard';
import { citiesData } from './citiesData';
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

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h2`
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
  margin-left: 0.35rem;
  color: ${colors.amber[500]};
`;

const CarouselContainer = styled.div`
  position: relative;
`;

const ScrollButton = styled.button<{ $disabled: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  border: none;
  transition: all 0.2s ease;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.$disabled ? 0.4 : 1)};

  @media (min-width: 640px) {
    display: flex;
  }

  ${(props) =>
    !props.$disabled &&
    `
    &:hover {
      background: #ffffff;
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
    &:active {
      transform: translateY(-50%) scale(0.95);
    }
  `}
`;

const EdgeGradient = styled.div<{ $side: 'left' | 'right'; $visible: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4rem;
  z-index: 10;
  pointer-events: none;
  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.$visible ? 1 : 0)};

  ${(props) =>
    props.$side === 'left'
      ? `
    left: 0;
    background: linear-gradient(to right, ${colors.cream}, transparent);
  `
      : `
    right: 0;
    background: linear-gradient(to left, ${colors.cream}, transparent);
  `}
`;

const ScrollTrack = styled.div`
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 1rem;
  user-select: none;
  cursor: grab;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  &:active {
    cursor: grabbing;
  }
`;

const GridFlow = styled.div`
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  grid-auto-flow: column;
  gap: 1rem;
  grid-auto-columns: minmax(150px, 1fr);

  @media (min-width: 480px) {
    gap: 1.25rem;
    grid-auto-columns: minmax(190px, 1fr);
  }

  @media (min-width: 768px) {
    gap: 1.5rem;
    grid-auto-columns: minmax(210px, 1fr);
  }
`;

export const DestinationsSection: React.FC = () => {
  const { trackRef, canScrollLeft, canScrollRight, handleScroll } =
    useCarouselScroll('destinations');

  return (
    <SectionWrapper id="destinations-section">
      <Container>
        {/* Header */}
        <SectionHeader>
          <Title>
            Popular
            <HighlightText>Destinations</HighlightText>
          </Title>
        </SectionHeader>

        {/* Carousel */}
        <CarouselContainer>
          {/* Scroll Left Button */}
          <ScrollButton
            id="destinations-scroll-left"
            type="button"
            aria-label="Scroll left"
            $disabled={!canScrollLeft}
            disabled={!canScrollLeft}
            onClick={() => handleScroll('left')}
            className="left-0 -translate-x-3"
          >
            <ChevronLeft className="w-5 h-5 text-[#191c1d]" strokeWidth={2.5} />
          </ScrollButton>

          {/* Scroll Right Button */}
          <ScrollButton
            id="destinations-scroll-right"
            type="button"
            aria-label="Scroll right"
            $disabled={!canScrollRight}
            disabled={!canScrollRight}
            onClick={() => handleScroll('right')}
            className="right-0 translate-x-3"
          >
            <ChevronRight className="w-5 h-5 text-[#191c1d]" strokeWidth={2.5} />
          </ScrollButton>

          {/* Edge Fade Gradients */}
          <EdgeGradient $side="left" $visible={canScrollLeft} />
          <EdgeGradient $side="right" $visible={canScrollRight} />

          {/* 2-Row Horizontal Scroll Track */}
          <ScrollTrack ref={trackRef}>
            <GridFlow>
              {citiesData.map((city) => (
                <CityCard key={city.id} city={city} />
              ))}
            </GridFlow>
          </ScrollTrack>
        </CarouselContainer>
      </Container>
    </SectionWrapper>
  );
};
