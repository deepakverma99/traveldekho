'use client';

import React, { useEffect, Suspense } from 'react';
import styled from 'styled-components';
import { colors } from '@/theme/colors';
import { FloatingBackground } from '@/components/shared';
import { TripPartnerHeader } from './TripPartnerHeader';
import { TripPartnerSidebar } from './TripPartnerSidebar';
import { formatPartnerDisplayName } from './utils/partnerAuth';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  initializePartnerSession,
  selectCurrentPartner,
} from '@/redux/slices/tripPartnerSlice';

import { type TripPartnerLayoutProps } from './types/';

export type { TripPartnerLayoutProps };

const LayoutRoot = styled.div`
  min-height: 100vh;
  background-color: ${colors.white};
  display: flex;
  width: 100%;
  position: relative;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  min-height: 100vh;
  position: relative;
  z-index: 1;
`;

const SidebarFallback = styled.div`
  width: 16rem;
  height: 100vh;
  display: none;
  background-color: ${colors.white};
  border-right: 1px solid ${colors.gray[200]};
  flex-shrink: 0;
  position: sticky;
  top: 0;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  width: 100%;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  min-width: 0;
  overflow-x: hidden;
  padding-bottom: 2.5rem;

  @media (min-width: 768px) {
    padding-bottom: 3rem;
  }
`;

export const TripPartnerLayout: React.FC<TripPartnerLayoutProps> = ({
  children,
  username,
}) => {
  const dispatch = useAppDispatch();
  const currentPartner = useAppSelector(selectCurrentPartner);

  useEffect(() => {
    dispatch(initializePartnerSession(username));
  }, [username, dispatch]);

  const displayName = currentPartner?.displayName || formatPartnerDisplayName(username);

  return (
    <LayoutRoot>
      <FloatingBackground fixed />
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
    </LayoutRoot>
  );
};
