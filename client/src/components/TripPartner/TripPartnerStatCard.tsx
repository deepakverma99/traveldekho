'use client';

import React from 'react';
import styled from 'styled-components';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { type TripPartnerStatCardProps } from './types/';

export type { TripPartnerStatCardProps };

const CardRoot = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[200]};
  border-radius: 0.875rem;
  padding: 0.875rem 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-width: 0;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  @media (min-width: 480px) {
    padding: 1rem 1rem;
    gap: 0.75rem;
  }

  @media (min-width: 640px) {
    border-radius: 1rem;
    padding: 1.25rem 1.5rem;
    gap: 1rem;
  }

  &:hover {
    box-shadow: 0 10px 25px -5px ${colors.amber[100]}80, 0 8px 10px -6px rgba(0, 0, 0, 0.04);
    border-color: ${colors.amber[200]};
    transform: translateY(-2px);
  }
`;

const ContentStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  flex: 1;

  @media (min-width: 640px) {
    gap: 0.375rem;
  }
`;

const CardLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${colors.gray[500]};
  line-height: 1.25;
  letter-spacing: -0.01em;
  font-family: ${typography.fonts.jakarta};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 640px) {
    font-size: 0.8125rem;
  }
`;

const CardValue = styled.h3`
  font-size: 1.1875rem;
  font-weight: 800;
  color: ${colors.gray[900]};
  line-height: 1.2;
  letter-spacing: -0.025em;
  font-family: ${typography.fonts.jakarta};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 480px) {
    font-size: 1.375rem;
  }

  @media (min-width: 640px) {
    font-size: 1.5rem;
  }
`;

const TrendRow = styled.div<{ $isPositive: boolean }>`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  column-gap: 0.25rem;
  row-gap: 0.125rem;
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${({ $isPositive }) => ($isPositive ? colors.green[600] : colors.red[500])};
  letter-spacing: -0.01em;
  margin-top: 0.125rem;
  font-family: ${typography.fonts.jakarta};
  min-width: 0;

  @media (min-width: 640px) {
    font-size: 0.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const TrendBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  white-space: nowrap;
`;

const TrendText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrendArrow = styled.span`
  font-size: 0.75rem;
  font-weight: 800;
  line-height: 1;

  @media (min-width: 640px) {
    font-size: 0.8125rem;
  }
`;

const IconCircle = styled.div`
  width: 2.125rem;
  height: 2.125rem;
  border-radius: 9999px;
  background-color: ${colors.amber[50]};
  color: ${colors.amber[600]};
  border: 1px solid ${colors.amber[200]}80;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.25s ease, background-color 0.25s ease, color 0.25s ease;

  @media (min-width: 480px) {
    width: 2.5rem;
    height: 2.5rem;
  }

  @media (min-width: 640px) {
    width: 3.25rem;
    height: 3.25rem;
  }

  ${CardRoot}:hover & {
    transform: scale(1.08);
    background-color: ${colors.amber[100]};
    color: ${colors.amber[700]};
  }

  svg {
    width: 1.0625rem;
    height: 1.0625rem;
    stroke-width: 2.25px;

    @media (min-width: 480px) {
      width: 1.25rem;
      height: 1.25rem;
    }

    @media (min-width: 640px) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export const TripPartnerStatCard: React.FC<TripPartnerStatCardProps> = ({
  label,
  value,
  trend,
  icon: Icon,
}) => {
  return (
    <CardRoot>
      <ContentStack>
        <CardLabel>{label}</CardLabel>
        <CardValue>{value}</CardValue>
        <TrendRow $isPositive={trend.isPositive}>
          <TrendBadge>
            <TrendArrow aria-hidden="true">{trend.isPositive ? '↑' : '↓'}</TrendArrow>
            {trend.percentage}%
          </TrendBadge>
          <TrendText>{trend.text}</TrendText>
        </TrendRow>
      </ContentStack>

      <IconCircle>
        <Icon />
      </IconCircle>
    </CardRoot>
  );
};
