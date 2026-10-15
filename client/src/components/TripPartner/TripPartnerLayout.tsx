'use client';

import React, { useState, Suspense } from 'react';
import styled from 'styled-components';
import { colors } from '@/theme/colors';
import { TripPartnerHeader } from './TripPartnerHeader';
import { TripPartnerSidebar } from './TripPartnerSidebar';
import { TripPartnerMobileNav } from './TripPartnerMobileNav';
import { getStoredPartner, formatPartnerDisplayName } from './utils/partnerAuth';

export interface TripPartnerLayoutProps {
  children: React.ReactNode;
  username: string;
}

const LayoutRoot = styled.div`
  min-height: 100vh;
  background-color: ${colors.cream};
  display: flex;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  min-height: 100vh;
`;

const SidebarFallback = styled.div`
  width: 16rem;
  height: 100vh;
  display: none;
  background-color: ${colors.offWhite};
  border-right: 1px solid ${colors.amber[200]}80;
  flex-shrink: 0;
  position: sticky;
  top: 0;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  overflow: hidden;
  padding-bottom: 6rem;

  @media (min-width: 768px) {
    padding-bottom: 3rem;
  }
`;

export const TripPartnerLayout: React.FC<TripPartnerLayoutProps> = ({
  children,
  username,
}) => {
  const [partner] = useState(() => getStoredPartner(username));
  const displayName = partner?.displayName || formatPartnerDisplayName(username);

  return (
    <LayoutRoot>
      <ContentContainer>
        <Suspense fallback={<SidebarFallback />}>
          <TripPartnerSidebar username={username} />
        </Suspense>
        <MainWrapper>
          <TripPartnerHeader username={username} displayName={displayName} />
          <MainContent>
            {children}
          </MainContent>
        </MainWrapper>
      </ContentContainer>
      <Suspense fallback={null}>
        <TripPartnerMobileNav username={username} />
      </Suspense>
    </LayoutRoot>
  );
};
