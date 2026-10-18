'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { LogOut, Bell, UserCheck, Menu, X } from 'lucide-react';
import { colors } from '@/theme/colors';
import { TripPartnerLogoutModal } from './TripPartnerLogoutModal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectIsPartnerLogoutModalOpen,
  selectCurrentPartner,
  openPartnerLogoutModal,
  closePartnerLogoutModal,
  partnerLogout,
  toggleMobileSidebar,
  selectIsMobileSidebarOpen,
} from '@/redux/slices/tripPartnerSlice';

import { type TripPartnerHeaderProps } from './types/';

export type { TripPartnerHeaderProps };

const HeaderRoot = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  height: 64px;
  background-color: ${colors.offWhite};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${colors.amber[200]}80;
  padding: 0 0.875rem;

  @media (min-width: 640px) {
    height: 72px;
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
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
  gap: 0.75rem;

  @media (min-width: 640px) {
    gap: 1rem;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 640px) {
    gap: 0.875rem;
  }
`;

const MobileMenuToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.625rem;
  border: 1px solid ${colors.amber[200]}80;
  background-color: ${colors.white};
  color: ${colors.gray[700]};
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);

  &:hover {
    background-color: ${colors.amber[50]};
    color: ${colors.amber[600]};
    border-color: ${colors.amber[300]};
  }

  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const LogoContainer = styled(Link)`
  position: relative;
  height: 2rem;
  width: 7.25rem;
  display: block;
  transition: transform 0.2s ease;
  flex-shrink: 0;

  @media (min-width: 480px) {
    height: 2.25rem;
    width: 8.5rem;
  }

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.97);
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const PartnerBadge = styled.span`
  display: none;
  align-items: center;
  padding: 0.25rem 0.625rem;
  background-color: ${colors.amber[500]};
  color: ${colors.white};
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-radius: 9999px;
  box-shadow: 0 1px 3px 0 rgba(244, 140, 6, 0.35);
  white-space: nowrap;

  @media (min-width: 640px) {
    display: inline-flex;
    padding: 0.25rem 0.75rem;
    letter-spacing: 0.1em;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;

  @media (min-width: 640px) {
    gap: 0.75rem;
  }

  @media (min-width: 1024px) {
    gap: 1rem;
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
  const dispatch = useAppDispatch();
  const isLogoutModalOpen = useAppSelector(selectIsPartnerLogoutModalOpen);
  const isMobileSidebarOpen = useAppSelector(selectIsMobileSidebarOpen);
  const currentPartner = useAppSelector(selectCurrentPartner);

  const effectiveDisplayName =
    currentPartner?.displayName || displayName || username;

  const handleOpenLogout = () => {
    dispatch(openPartnerLogoutModal());
  };

  const handleCloseLogout = () => {
    dispatch(closePartnerLogoutModal());
  };

  const handleConfirmLogout = () => {
    dispatch(partnerLogout());
    router.push('/trip-partner/login');
  };

  return (
    <>
      <HeaderRoot>
        <HeaderInner>
          {/* Left: Brand & Portal Badge */}
          <LeftSection>
            <MobileMenuToggle
              type="button"
              onClick={() => dispatch(toggleMobileSidebar())}
              aria-label={isMobileSidebarOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              title={isMobileSidebarOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileSidebarOpen}
            >
              {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </MobileMenuToggle>

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
                {effectiveDisplayName.charAt(0) || 'T'}
              </Avatar>

              <ProfileInfo>
                <PartnerName>
                  {effectiveDisplayName}
                </PartnerName>
                <VerifiedBadge>
                  <UserCheck className="w-3 h-3" /> Verified Partner
                </VerifiedBadge>
              </ProfileInfo>

              {/* Logout Button */}
              <LogoutButton
                onClick={handleOpenLogout}
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
        onClose={handleCloseLogout}
        onConfirm={handleConfirmLogout}
        displayName={effectiveDisplayName}
      />
    </>
  );
};

