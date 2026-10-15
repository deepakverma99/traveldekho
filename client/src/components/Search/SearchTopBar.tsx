'use client';

import React from 'react';
import styled from 'styled-components';
import { LayoutGrid, Map as MapIcon } from 'lucide-react';
import { ViewMode } from './types';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

export interface SearchTopBarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  description?: string;
}

const TopBarRoot = styled.div`
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    margin-bottom: 2rem;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  font-family: ${typography.fonts.jakarta};
  color: ${colors.charcoal};

  @media (min-width: 640px) {
    font-size: 28px;
  }
  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const Highlight = styled.span`
  color: ${colors.primaryContainer};
`;

const Description = styled.p`
  font-size: 0.75rem;
  color: ${colors.gray[500]};
  margin-top: 0.25rem;
  font-weight: 500;
  font-family: ${typography.fonts.jakarta};

  @media (min-width: 640px) {
    font-size: 0.875rem;
    margin-top: 0.375rem;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  background-color: ${colors.gray[100]};
  padding: 0.25rem;
  border-radius: 0.75rem;
  flex-shrink: 0;
  align-self: flex-start;

  @media (min-width: 640px) {
    align-self: auto;
  }
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  border: none;
  transition: all 0.2s ease;
  cursor: pointer;

  background-color: ${({ $active }) => ($active ? colors.white : 'transparent')};
  color: ${({ $active }) => ($active ? colors.gray[900] : colors.gray[400])};
  box-shadow: ${({ $active }) => ($active ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none')};

  &:hover {
    color: ${({ $active }) => ($active ? colors.gray[900] : colors.gray[600])};
  }
`;

export const SearchTopBar: React.FC<SearchTopBarProps> = ({
  viewMode,
  onViewModeChange,
  description = 'Explore scout-verified trips, offbeat trails, and authentic Himalayan journeys across India.',
}) => {
  return (
    <TopBarRoot>
      <FlexContainer>
        <div>
          <Heading>
            All Upcoming{' '}
            <Highlight>Adventures</Highlight>
          </Heading>
          {description && (
            <Description>
              {description}
            </Description>
          )}
        </div>

        {/* View Toggle (Grid / Map) */}
        <ToggleContainer>
          <ToggleButton
            type="button"
            onClick={() => onViewModeChange('grid')}
            $active={viewMode === 'grid'}
          >
            <LayoutGrid className="w-4 h-4" /> Grid
          </ToggleButton>
          <ToggleButton
            type="button"
            onClick={() => onViewModeChange('map')}
            $active={viewMode === 'map'}
          >
            <MapIcon className="w-4 h-4" /> Map
          </ToggleButton>
        </ToggleContainer>
      </FlexContainer>
    </TopBarRoot>
  );
};

