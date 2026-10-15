'use client';

import React from 'react';
import styled from 'styled-components';
import { FloatingBackground } from '@/components/shared';
import { colors } from '@/theme/colors';

const AmbientContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  user-select: none;
`;

const GlowTopLeft = styled.div`
  position: absolute;
  top: -8rem;
  left: -8rem;
  width: 24rem;
  height: 24rem;
  border-radius: 9999px;
  opacity: 0.04;
  background: radial-gradient(circle, ${colors.primaryContainer} 0%, ${colors.transparent} 70%);
`;

const GlowCenterRight = styled.div`
  position: absolute;
  top: 50%;
  right: -12rem;
  width: 500px;
  height: 500px;
  border-radius: 9999px;
  opacity: 0.03;
  background: radial-gradient(circle, ${colors.primaryContainer} 0%, ${colors.transparent} 70%);
`;

export const TripPartnerBackground: React.FC = () => {
  return (
    <>
      <AmbientContainer aria-hidden="true">
        <GlowTopLeft />
        <GlowCenterRight />
      </AmbientContainer>

      {/* Homepage Floating Icons Background */}
      <FloatingBackground fixed />
    </>
  );
};

