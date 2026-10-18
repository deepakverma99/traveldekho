'use client';

import React from 'react';
import styled from 'styled-components';
import { WeatherCard } from './WeatherCard';
import { mockWeatherData } from './mockWeatherData';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const SectionWrapper = styled.section`
  position: relative;
  width: 100%;
  padding-top: 3rem;
  padding-bottom: 3rem;
  overflow: hidden;
  background-color: transparent;

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

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
  }
`;

const SectionHeading = styled.h2`
  font-family: ${typography.fonts.caveat};
  font-size: 1.875rem;
  color: ${colors.gray[900]};
  font-weight: 700;
  margin-bottom: 0.75rem;
  line-height: 1.1;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const SectionSubtitle = styled.p`
  color: ${colors.gray[500]};
  font-weight: 500;
  font-size: 0.875rem;
  max-width: 36rem;
  line-height: 1.5;
  font-family: ${typography.fonts.jakarta};

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const WeatherTrack = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.75rem;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
    overflow-x: visible;
    padding-bottom: 0;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
  }
`;

export const WeatherForecastSection: React.FC = () => {
  return (
    <SectionWrapper id="weather-forecast-section">
      <Container>
        {/* Section Header */}
        <HeaderContainer>
          <div>
            <SectionHeading>
              Live Weather <span className="ml-1 text-amber-500">Forecasts</span>
            </SectionHeading>
            <SectionSubtitle>
              Check the live weather and upcoming 3-day forecast for some of our
              most popular destinations before you pack your bags!
            </SectionSubtitle>
          </div>
        </HeaderContainer>

        {/* Weather Cards: Horizontal Scroll on Mobile, Grid on Tablet/Desktop */}
        <WeatherTrack>
          {mockWeatherData.map((destination) => (
            <WeatherCard key={destination.id} destination={destination} />
          ))}
        </WeatherTrack>
      </Container>
    </SectionWrapper>
  );
};
