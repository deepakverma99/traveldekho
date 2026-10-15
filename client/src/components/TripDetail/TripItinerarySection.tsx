'use client';

import React from 'react';
import styled from 'styled-components';
import { ItineraryItem } from './types';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';
import { Utensils } from 'lucide-react';

interface TripItinerarySectionProps {
  itinerary: ItineraryItem[];
}

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${colors.gray[900]};
  font-family: ${typography.fonts.caveat};

  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 1.25rem;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: ${colors.gray[100]};

    @media (min-width: 768px) {
      left: 1.75rem;
    }
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-left: 3.5rem;

  @media (min-width: 768px) {
    padding-left: 5rem;
  }
`;

const DayBadge = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background-color: ${colors.amber[400]};
  color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.75rem;
  z-index: 10;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 0.875rem;
  }
`;

const DayCard = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[100]};
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 640px) {
    padding: 1.5rem;
  }
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const DayTitle = styled.h3`
  font-size: 1rem;
  font-weight: 900;
  color: ${colors.gray[900]};
  letter-spacing: -0.01em;
  margin-bottom: 0.5rem;

  @media (min-width: 640px) {
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
  }
`;

const DayDescription = styled.p`
  font-size: 0.75rem;
  color: ${colors.gray[600]};
  font-weight: 500;
  line-height: 1.625;
  margin-bottom: 1rem;
  white-space: pre-wrap;

  @media (min-width: 640px) {
    font-size: 0.875rem;
    margin-bottom: 1.25rem;
  }
`;

const MealsBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background-color: ${colors.green[50]};
  border-radius: 0.5rem;
  border: 1px solid ${colors.green[100]};
`;

export const TripItinerarySection: React.FC<TripItinerarySectionProps> = ({
  itinerary,
}) => {
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <SectionTitle>Detailed Itinerary</SectionTitle>
      </div>

      <TimelineContainer>
        {itinerary.map((item) => (
          <TimelineItem key={item.day}>
            {/* Day Number Badge */}
            <DayBadge>{item.day}</DayBadge>

            {/* Day Itinerary Card */}
            <DayCard>
              <DayTitle>{item.title}</DayTitle>
              <DayDescription>{item.description}</DayDescription>

              {item.meals && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.75rem' }}>
                  <MealsBadge>
                    <Utensils style={{ width: '0.875rem', height: '0.875rem', color: colors.green[600] }} />
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        color: colors.green[600],
                        letterSpacing: '0.1em',
                      }}
                    >
                      Meals:
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: colors.green[800],
                      }}
                    >
                      {item.meals}
                    </span>
                  </MealsBadge>
                </div>
              )}
            </DayCard>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </section>
  );
};
