'use client';

import React from 'react';
import styled from 'styled-components';
import { CostingSlot } from './types';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

interface TripCostingSectionProps {
  costing: CostingSlot[];
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

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 1rem;
  border: 1px solid ${colors.gray[100]};
  background-color: ${colors.white};
`;

const StyledTable = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
`;

const TableHeaderRow = styled.tr`
  background-color: ${colors.gray[50]};
  border-bottom: 1px solid ${colors.gray[100]};
`;

const TableHeaderCell = styled.th<{ $alignRightOnMobile?: boolean }>`
  padding: 0.875rem 1.25rem;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${colors.gray[400]};
  text-align: ${({ $alignRightOnMobile }) => ($alignRightOnMobile ? 'right' : 'left')};

  @media (min-width: 640px) {
    padding: 1rem 1.5rem;
    text-align: left;
  }
`;

const TableBodyRow = styled.tr`
  border-bottom: 1px solid ${colors.gray[50]};
  transition: background-color 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${colors.gray[50]}80;
  }
`;

const TableBodyCell = styled.td<{ $alignRightOnMobile?: boolean }>`
  padding: 0.875rem 1.25rem;
  text-align: ${({ $alignRightOnMobile }) => ($alignRightOnMobile ? 'right' : 'left')};

  @media (min-width: 640px) {
    padding: 1rem 1.5rem;
    text-align: left;
  }
`;

const SlotDateRange = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${colors.gray[800]};

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

const SlotLocation = styled.div`
  font-size: 10px;
  color: ${colors.gray[400]};
  font-weight: 500;
  margin-top: 0.125rem;
`;

const SlotPrice = styled.span`
  font-size: 0.75rem;
  font-weight: 900;
  color: ${colors.gray[900]};

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

export const TripCostingSection: React.FC<TripCostingSectionProps> = ({
  costing,
}) => {
  return (
    <section>
      <SectionTitle>Costing</SectionTitle>

      <TableContainer>
        <StyledTable>
          <thead>
            <TableHeaderRow>
              <TableHeaderCell>Route</TableHeaderCell>
              <TableHeaderCell $alignRightOnMobile>Price</TableHeaderCell>
            </TableHeaderRow>
          </thead>
          <tbody>
            {costing.map((slot, index) => (
              <TableBodyRow key={index}>
                <TableBodyCell>
                  <SlotDateRange>{slot.dateRange}</SlotDateRange>
                  <SlotLocation>{slot.location}</SlotLocation>
                </TableBodyCell>
                <TableBodyCell $alignRightOnMobile>
                  <SlotPrice>
                    ₹{slot.price.toLocaleString('en-IN')}
                  </SlotPrice>
                </TableBodyCell>
              </TableBodyRow>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </section>
  );
};
