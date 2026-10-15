'use client';

import React from 'react';
import styled from 'styled-components';
import { Skeleton, FloatingBackground } from '@/components/shared';
import { colors } from '@/theme/colors';

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: ${colors.cream};
  overflow-x: hidden;
`;

const HeroSkeletonCard = styled.div`
  width: 100%;
  border-radius: 2.5rem;
  overflow: hidden;
  min-height: 360px;
  background-color: ${colors.amber[100]}66;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${colors.amber[200]}66;

  @media (min-width: 768px) {
    min-height: 460px;
  }
`;

const ContentCard = styled.div`
  background-color: ${colors.white};
  border-radius: 3rem;
  padding: 1.5rem;
  border: 1px solid ${colors.gray[100]};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const SkeletonSidebarCard = styled.div`
  background-color: ${colors.white};
  border-radius: 1.5rem;
  border: 1px solid ${colors.gray[100]};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TripDetailSkeleton: React.FC = () => {
  return (
    <PageContainer>
      <FloatingBackground fixed />

      <main style={{ position: 'relative', zIndex: 10, width: '100%', paddingTop: '1.5rem' }}>
        {/* Breadcrumb Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 sm:mb-3">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Skeleton width={60} height={18} radius="6px" />
            <span style={{ color: colors.gray[300] }}>/</span>
            <Skeleton width={80} height={18} radius="6px" />
            <span style={{ color: colors.gray[300] }}>/</span>
            <Skeleton width={140} height={18} radius="6px" />
          </div>
        </div>

        {/* Hero Banner Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3 pb-8">
          <HeroSkeletonCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Skeleton width={160} height={40} radius="1rem" />
              <Skeleton width={100} height={36} radius="9999px" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', margin: 'auto' }}>
              <Skeleton width="55%" height={44} radius="12px" />
              <Skeleton width="65%" height={18} radius="6px" />
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', paddingTop: '0.25rem' }}>
                <Skeleton width={80} height={20} radius="9999px" />
                <Skeleton width={90} height={20} radius="9999px" />
                <Skeleton width={60} height={20} radius="9999px" />
                <Skeleton width={75} height={20} radius="9999px" />
              </div>
            </div>
          </HeroSkeletonCard>
        </div>

        {/* Main Content & Sidebar Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ContentCard>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', alignItems: 'flex-start' }} className="lg:flex-row">
              {/* Left Column Skeleton */}
              <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Skeleton width={200} height={36} radius="10px" />
                  <Skeleton width="100%" height={320} radius="24px" />
                  <Skeleton width="100%" height={20} radius="6px" />
                  <Skeleton width="90%" height={20} radius="6px" />
                  <Skeleton width="75%" height={20} radius="6px" />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Skeleton width={240} height={36} radius="10px" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '3.5rem' }}>
                    <Skeleton width="100%" height={120} radius="16px" />
                    <Skeleton width="100%" height={120} radius="16px" />
                  </div>
                </div>
              </div>

              {/* Right Sidebar Skeleton */}
              <div style={{ width: '100%', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="lg:w-[380px]">
                <SkeletonSidebarCard>
                  <Skeleton width={120} height={16} radius="6px" />
                  <Skeleton width={160} height={40} radius="10px" />
                  <Skeleton width="100%" height={48} radius="12px" />
                  <Skeleton width="100%" height={48} radius="12px" />
                  <Skeleton width="100%" height={50} radius="16px" />
                </SkeletonSidebarCard>

                <SkeletonSidebarCard>
                  <Skeleton width={140} height={20} radius="6px" />
                  <Skeleton width={100} height={44} radius="10px" />
                  <Skeleton width="100%" height={60} radius="12px" />
                </SkeletonSidebarCard>
              </div>
            </div>
          </ContentCard>
        </div>
      </main>
    </PageContainer>
  );
};
