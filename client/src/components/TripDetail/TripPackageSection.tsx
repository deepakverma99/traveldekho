'use client';

import React from 'react';
import styled from 'styled-components';
import { Check, X } from 'lucide-react';
import { PackageDetails } from './types';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

interface TripPackageSectionProps {
  packageDetails: PackageDetails;
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

const ColumnsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CheckIconBox = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  background-color: ${colors.green[500]};
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
`;

const CrossIconBox = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  background-color: ${colors.red[500]};
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
`;

const ColumnHeading = styled.h3<{ $isExcluded?: boolean }>`
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ $isExcluded }) => ($isExcluded ? colors.red[700] : colors.green[700])};
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const PackageCard = styled.div<{ $isExcluded?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background-color: ${({ $isExcluded }) =>
    $isExcluded ? `${colors.red[50]}80` : `${colors.green[50]}80`};
  border: 1px solid
    ${({ $isExcluded }) =>
      $isExcluded ? `${colors.red[100]}80` : `${colors.green[100]}80`};

  @media (min-width: 640px) {
    padding: 0.875rem;
  }
`;

const ItemDescription = styled.span<{ $isExcluded?: boolean }>`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ $isExcluded }) => ($isExcluded ? colors.gray[500] : colors.gray[700])};
  word-break: break-word;
  flex: 1;
  line-height: 1.625;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

export const TripPackageSection: React.FC<TripPackageSectionProps> = ({
  packageDetails,
}) => {
  return (
    <section>
      <SectionTitle>What&apos;s in the Package?</SectionTitle>

      <ColumnsGrid>
        {/* Included Column */}
        <ColumnWrapper>
          <HeaderRow>
            <CheckIconBox>
              <Check style={{ width: '0.75rem', height: '0.75rem', strokeWidth: 3 }} />
            </CheckIconBox>
            <ColumnHeading>Included</ColumnHeading>
          </HeaderRow>

          <ItemsList>
            {packageDetails.included.map((item, index) => (
              <PackageCard key={index}>
                <Check
                  style={{
                    width: '1rem',
                    height: '1rem',
                    color: colors.green[500],
                    marginTop: '0.125rem',
                    flexShrink: 0,
                  }}
                />
                <ItemDescription>{item}</ItemDescription>
              </PackageCard>
            ))}
          </ItemsList>
        </ColumnWrapper>

        {/* Excluded Column */}
        <ColumnWrapper>
          <HeaderRow>
            <CrossIconBox>
              <X style={{ width: '0.75rem', height: '0.75rem', strokeWidth: 3 }} />
            </CrossIconBox>
            <ColumnHeading $isExcluded>Excluded</ColumnHeading>
          </HeaderRow>

          <ItemsList>
            {packageDetails.excluded.map((item, index) => (
              <PackageCard key={index} $isExcluded>
                <X
                  style={{
                    width: '1rem',
                    height: '1rem',
                    color: colors.red[400],
                    marginTop: '0.125rem',
                    flexShrink: 0,
                  }}
                />
                <ItemDescription $isExcluded>{item}</ItemDescription>
              </PackageCard>
            ))}
          </ItemsList>
        </ColumnWrapper>
      </ColumnsGrid>
    </section>
  );
};
