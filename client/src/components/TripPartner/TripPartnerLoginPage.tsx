'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { ArrowLeft } from 'lucide-react';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { TripPartnerBackground } from './TripPartnerBackground';
import { TripPartnerLoginForm } from './TripPartnerLoginForm';

const PageRoot = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const LoginSection = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;
  background-color: ${colors.cream};
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 420px;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[100]};
  border-radius: 2.5rem;
  box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.08);
  padding: 3.5rem 2rem 2rem 2rem;
  position: relative;
  z-index: 10;

  @media (min-width: 640px) {
    padding: 4rem 2.5rem 2.5rem 2.5rem;
  }
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${colors.gray[500]};
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${colors.amber[700]};

    svg {
      transform: translateX(-4px);
      color: ${colors.amber[400]};
    }
  }

  @media (min-width: 640px) {
    top: 1.5rem;
    left: 1.75rem;
  }
`;

const BackIcon = styled(ArrowLeft)`
  width: 0.875rem;
  height: 0.875rem;
  color: ${colors.gray[400]};
  transition: transform 0.2s ease, color 0.2s ease;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.75rem;
`;

const LogoLink = styled(Link)`
  position: relative;
  height: 2.75rem;
  width: 11rem;
  display: block;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 640px) {
    height: 3rem;
    width: 12rem;
  }
`;

const HeaderBox = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 900;
  font-family: ${typography.fonts.jakarta};
  color: ${colors.charcoal};
  letter-spacing: -0.025em;
  margin-bottom: 0.25rem;
`;

const GoldHighlight = styled.span`
  color: ${colors.gold};
`;

const PageSubtitle = styled.p`
  color: ${colors.gray[600]};
  font-size: 0.875rem;
  font-weight: 600;
`;

export const TripPartnerLoginPage: React.FC = () => {
  return (
    <PageRoot>
      <LoginSection>
        {/* Background Ambient Glows and Exact Homepage Floating Icons */}
        <TripPartnerBackground />

        {/* Login Card */}
        <LoginCard className="animate-fade-in-up">
          {/* Top-left: Back to Home Button */}
          <BackLink href="/" title="Return to TravelDekho Homepage">
            <BackIcon />
            <span>Back to Home</span>
          </BackLink>

          {/* Logo */}
          <LogoContainer>
            <LogoLink href="/" title="TravelDekho Homepage">
              <Image
                alt="TravelDekho"
                src="/TravelDekho-logo.png"
                fill
                priority
                className="object-contain"
                sizes="192px"
              />
            </LogoLink>
          </LogoContainer>

          {/* Title & Subtitle */}
          <HeaderBox>
            <PageTitle>
              Trip <GoldHighlight>Partner Portal</GoldHighlight>
            </PageTitle>
            <PageSubtitle>
              Manage your trips and bookings
            </PageSubtitle>
          </HeaderBox>

          {/* Credentials Form */}
          <TripPartnerLoginForm />
        </LoginCard>
      </LoginSection>
    </PageRoot>
  );
};

