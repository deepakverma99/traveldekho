'use client';

import React from 'react';
import styled from 'styled-components';
import { Star, ShieldAlert } from 'lucide-react';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

const SectionWrapper = styled.section`
  padding-top: 2rem;
  border-top: 1px solid ${colors.gray[100]};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    margin-bottom: 2.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${colors.gray[900]};
  font-family: ${typography.fonts.caveat};

  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const StarsWrapper = styled.div`
  display: flex;
  gap: 0.125rem;
  color: ${colors.amber[400]};
`;

const NewBadge = styled.span`
  font-size: 10px;
  font-weight: 900;
  color: ${colors.amber[600]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background-color: ${colors.amber[50]};
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
  border: 1px solid ${colors.amber[200]}80;

  @media (min-width: 640px) {
    font-size: 0.75rem;
  }
`;

const NoticeCard = styled.div`
  background-color: ${colors.amber[50]}80;
  border: 1px solid ${colors.amber[100]};
  border-radius: 1rem;
  padding: 1.25rem;
  text-align: center;

  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

const NoticeText = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${colors.gray[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

export const TripReviewsSection: React.FC = () => {
  return (
    <SectionWrapper>
      <SectionHeader>
        <div>
          <SectionTitle>Traveler Feedback</SectionTitle>
          <RatingRow>
            <StarsWrapper>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  style={{ width: '0.875rem', height: '0.875rem', fill: 'currentColor' }}
                />
              ))}
            </StarsWrapper>
            <NewBadge>New</NewBadge>
          </RatingRow>
        </div>
      </SectionHeader>

      <NoticeCard>
        <NoticeText>
          <ShieldAlert
            style={{
              width: '1rem',
              height: '1rem',
              color: colors.amber[500],
              flexShrink: 0,
            }}
          />
          <span>
            Reviews are exclusively collected from verified travelers after they complete this trip.
          </span>
        </NoticeText>
      </NoticeCard>
    </SectionWrapper>
  );
};
