'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { Globe, LogOut, Bell, UserCheck } from 'lucide-react';
import { colors } from '@/theme/colors';
import { clearPartnerSession } from './utils/partnerAuth';
import { TripPartnerLogoutModal } from './TripPartnerLogoutModal';

export interface TripPartnerHeaderProps {
  username: string;
  displayName: string;
}

const HeaderRoot = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  height: 72px;
  background-color: ${colors.offWhite};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${colors.amber[200]}80;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const HeaderInner = styled.div`
  max-width: 1600px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (min-width: 640px) {
    gap: 1rem;
  }
`;

const LogoContainer = styled(Link)`
  position: relative;
  height: 2.25rem;
  width: 8.5rem;
  display: block;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.97);
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const PartnerBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background-color: ${colors.amber[400]};
  color: ${colors.black};
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 9999px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 640px) {
    gap: 1rem;
  }
`;

const MarketplaceLink = styled(Link)`
  display: none;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${colors.gray[600]};
  transition: color 0.2s ease, background-color 0.2s ease;

  svg {
    color: ${colors.amber[600]};
  }

  &:hover {
    color: ${colors.black};
    background-color: ${colors.amber[100]}80;
  }

  @media (min-width: 768px) {
    display: inline-flex;
  }
`;

const NotificationButton = styled(Link)`
  position: relative;
  padding: 0.5rem;
  border-radius: 0.75rem;
  color: ${colors.gray[500]};
  transition: color 0.2s ease, background-color 0.2s ease;

  &:hover {
    color: ${colors.gray[900]};
    background-color: ${colors.amber[100]}80;
  }
`;

const NotificationDot = styled.span`
  position: absolute;
  top: 0.375rem;
  right: 0.375rem;
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${colors.amber[500]};
  border-radius: 9999px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 0.5rem;
  border-left: 1px solid ${colors.amber[200]}80;
`;

const Avatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: ${colors.amber[400]};
  color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  text-transform: uppercase;
`;

const ProfileInfo = styled.div`
  display: none;
  flex-direction: column;
  text-align: left;

  @media (min-width: 640px) {
    display: flex;
  }
`;

const PartnerName = styled.span`
  font-size: 0.75rem;
  font-weight: 900;
  color: ${colors.gray[900]};
  line-height: 1.25;
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 120px;
`;

const VerifiedBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: ${colors.green[600]};
  display: flex;
  align-items: center;
  gap: 0.125rem;
`;

const LogoutButton = styled.button`
  padding: 0.5rem;
  margin-left: 0.25rem;
  color: ${colors.gray[400]};
  border-radius: 0.75rem;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, background-color 0.2s ease;

  &:hover {
    color: ${colors.red[600]};
    background-color: ${colors.red[50]};
  }
`;

export const TripPartnerHeader: React.FC<TripPartnerHeaderProps> = ({
  username,
  displayName,
}) => {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleConfirmLogout = () => {
    clearPartnerSession();
    setIsLogoutModalOpen(false);
    router.push('/trip-partner/login');
  };

  return (
    <>
      <HeaderRoot>
        <HeaderInner>
          {/* Left: Brand & Portal Badge */}
          <LeftSection>
            <LogoContainer
              href={`/trip-partner/${username}/dashboard`}
              title="Trip Partner Dashboard"
            >
              <Image
                alt="TravelDekho"
                src="/TravelDekho-logo.png"
                fill
                priority
                className="object-contain"
                sizes="176px"
              />
            </LogoContainer>

            <PartnerBadge>
              Trip Partner Portal
            </PartnerBadge>
          </LeftSection>

          {/* Right: Actions & Partner Profile */}
          <RightSection>
            {/* View Website Link */}
            <MarketplaceLink
              href="/"
              title="Visit TravelDekho Marketplace"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>View Marketplace</span>
            </MarketplaceLink>

            {/* Notifications Shortcut */}
            <NotificationButton
              href={`/trip-partner/${username}/notifications`}
              title="View Notifications"
            >
              <Bell className="w-4 h-4" />
              <NotificationDot className="animate-pulse" />
            </NotificationButton>

            {/* Profile Pill */}
            <ProfileContainer>
              <Avatar>
                {displayName.charAt(0) || 'T'}
              </Avatar>

              <ProfileInfo>
                <PartnerName>
                  {displayName}
                </PartnerName>
                <VerifiedBadge>
                  <UserCheck className="w-3 h-3" /> Verified Partner
                </VerifiedBadge>
              </ProfileInfo>

              {/* Logout Button */}
              <LogoutButton
                onClick={() => setIsLogoutModalOpen(true)}
                title="Log Out of Partner Portal"
                aria-label="Log Out of Partner Portal"
              >
                <LogOut className="w-4 h-4" />
              </LogoutButton>
            </ProfileContainer>
          </RightSection>
        </HeaderInner>
      </HeaderRoot>

      {/* Confirmation Modal */}
      <TripPartnerLogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        displayName={displayName}
      />
    </>
  );
};

