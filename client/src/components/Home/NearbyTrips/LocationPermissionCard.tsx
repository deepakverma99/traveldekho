'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { MapPin, RefreshCw } from 'lucide-react';
import { Button } from '@/components/shared';
import { LocationPermissionCardProps } from './types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  width: 100%;
  background-color: rgba(255, 251, 235, 0.5);
  border-radius: 1.5rem;
  border: 2px solid ${colors.amber[100]};
  text-align: center;
  font-family: ${typography.fonts.jakarta};
`;

const IconWrapper = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${colors.amber[100]};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const CardTitle = styled.p`
  font-weight: 700;
  color: ${colors.gray[800]};
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 0.75rem;
  color: ${colors.gray[500]};
  margin-bottom: 0.5rem;
  max-width: 20rem;
  line-height: 1.625;
`;

const CardHint = styled.p`
  font-size: 11px;
  color: ${colors.gray[400]};
  margin-bottom: 1.25rem;
  max-width: 20rem;
`;

const AnimatedRefreshIcon = styled(RefreshCw)<{ $spinning?: boolean }>`
  width: 0.875rem;
  height: 0.875rem;
  animation: ${(props) => (props.$spinning ? spin : 'none')} 1s linear infinite;
`;

export const LocationPermissionCard: React.FC<LocationPermissionCardProps> = ({
  isLoading = false,
  onRetry,
}) => {
  return (
    <CardContainer>
      <IconWrapper>
        <MapPin className="w-7 h-7 text-amber-500" aria-hidden="true" />
      </IconWrapper>

      <CardTitle>Location access needed</CardTitle>

      <CardDescription>
        Location permission denied. Enable it in your browser settings to see trips near you.
      </CardDescription>

      <CardHint>
        On mobile: tap the 🔒 lock icon in your browser address bar → Site Settings → Allow Location.
      </CardHint>

      <Button
        id="nearby-trips-try-again-button"
        type="button"
        disabled={isLoading}
        onClick={onRetry}
        leftIcon={<AnimatedRefreshIcon $spinning={isLoading} aria-hidden="true" />}
      >
        {isLoading ? 'Checking...' : 'Try Again'}
      </Button>
    </CardContainer>
  );
};
