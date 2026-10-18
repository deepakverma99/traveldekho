'use client';

import React, { useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import {
  Globe,
  ArrowUpRight,
  X,
  UserCheck,
} from 'lucide-react';
import { colors } from '@/theme/colors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectIsMobileSidebarOpen,
  closeMobileSidebar,
  selectCurrentPartner,
} from '@/redux/slices/tripPartnerSlice';
import { type TripPartnerSidebarProps } from './types/';
import { getPartnerNavItems } from './data';

export type { TripPartnerSidebarProps };

const SidebarRoot = styled.aside`
  width: 16rem;
  background-color: ${colors.offWhite};
  border-right: 1px solid ${colors.amber[200]}80;
  height: 100vh;
  display: none;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 40;
  transition: colors 0.2s ease;
  box-shadow: 1px 0 10px rgba(0, 0, 0, 0.02);

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const SidebarBrand = styled.div`
  height: 72px;
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  border-bottom: 1px solid ${colors.amber[200]}80;
  flex-shrink: 0;
`;

const LogoContainer = styled(Link)`
  position: relative;
  height: 2.5rem;
  width: 10.5rem;
  display: block;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const SidebarBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow-y: auto;
  min-height: 0;
`;


const NavList = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  overflow-y: auto;
  padding-right: 0.25rem;
  padding-bottom: 1rem;

  &::-webkit-scrollbar {
    width: 0.375rem;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.amber[200]}99;
    border-radius: 9999px;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: ${colors.amber[300]};
  }
`;

const NavItemLink = styled(Link) <{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  position: relative;
  z-index: 10;
  text-decoration: none;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[300]}80;

  ${({ $isActive }) =>
    $isActive
      ? `
    color: ${colors.white};
    font-weight: 900;
    box-shadow: 0 4px 12px ${colors.amber[500]}40;
    background: linear-gradient(to right, ${colors.amber[500]}, ${colors.gold});

    svg {
      color: ${colors.white};
    }
  `
      : `
    color: ${colors.gray[600]};
    font-weight: 700;

    svg {
      color: ${colors.gray[400]};
      transition: all 0.2s ease;
    }

    &:hover {
      
      color: ${colors.gray[950]};
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

      svg {
        color: ${colors.amber[500]};
        transform: scale(1.05);
      }
    }
  `}
`;

const NavLabel = styled.span`
  font-size: 0.875rem;
  letter-spacing: -0.015em;
  position: relative;
  z-index: 10;
`;

const SidebarFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid ${colors.amber[200]}80;
  background-color: ${colors.offWhite};
  flex-shrink: 0;
`;

const MarketplaceButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: ${colors.gray[700]};
  background-color: ${colors.white};
  border: 1px solid ${colors.amber[200]}80;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);

  svg.globe-icon {
    color: ${colors.amber[600]};
    transition: transform 0.2s ease;
  }

  svg.arrow-icon {
    color: ${colors.gray[400]};
    margin-left: auto;
    transition: all 0.2s ease;
  }

  &:hover {
    background-color: ${colors.amber[50]};
    border-color: ${colors.amber[300]};
    color: ${colors.gray[950]};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

    svg.globe-icon {
      transform: scale(1.1);
    }
    svg.arrow-icon {
      color: ${colors.amber[600]};
      transform: translate(2px, -2px);
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;


const DrawerOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (min-width: 1024px) {
    display: none;
  }
`;

const DrawerContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  width: 85%;
  max-width: 20rem;
  height: 100vh;
  height: 100dvh;
  background-color: ${colors.offWhite};
  box-shadow: 8px 0 36px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border-right: 1px solid ${colors.amber[200]}80;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const DrawerHeader = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  border-bottom: 1px solid ${colors.amber[200]}80;
  flex-shrink: 0;

  @media (min-width: 640px) {
    height: 72px;
  }
`;

const DrawerCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.625rem;
  border: 1px solid ${colors.amber[200]}80;
  background-color: ${colors.white};
  color: ${colors.gray[600]};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);

  &:hover {
    background-color: ${colors.amber[100]}80;
    color: ${colors.gray[900]};
    border-color: ${colors.amber[300]};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const DrawerPartnerCard = styled.div`
  margin: 1rem 1rem 0.25rem 1rem;
  padding: 0.875rem 1rem;
  background-color: ${colors.white};
  border: 1px solid ${colors.amber[200]}80;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
`;

const DrawerAvatar = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  background-color: ${colors.amber[400]};
  color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.875rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  text-transform: uppercase;
  flex-shrink: 0;
`;

const DrawerPartnerDetails = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const DrawerPartnerName = styled.span`
  font-size: 0.8125rem;
  font-weight: 800;
  color: ${colors.gray[900]};
  line-height: 1.25;
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DrawerPartnerBadge = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: ${colors.green[600]};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const emptySubscribe = () => () => { };
const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
};

export const TripPartnerSidebar: React.FC<TripPartnerSidebarProps> = ({ username }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isMobileSidebarOpen = useAppSelector(selectIsMobileSidebarOpen);
  const currentPartner = useAppSelector(selectCurrentPartner);
  const isMounted = useIsMounted();

  // Close on route navigation
  useEffect(() => {
    dispatch(closeMobileSidebar());
  }, [pathname, dispatch]);

  // Lock scroll & handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeMobileSidebar());
      }
    };
    if (isMobileSidebarOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMobileSidebarOpen, dispatch]);

  const effectiveDisplayName = currentPartner?.displayName || username;

  const navItems = getPartnerNavItems(username, pathname);

  return (
    <>
      {/* Desktop Persistent Sidebar (>= 1024px) */}
      <SidebarRoot>
        {/* Top 72px Header with TravelDekho Logo */}
        <SidebarBrand>
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
              sizes="168px"
            />
          </LogoContainer>
        </SidebarBrand>

        <SidebarBody>
          {/* Navigation List */}
          <NavList>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavItemLink
                  key={item.label}
                  href={item.href}
                  $isActive={!!item.isActive}
                >
                  <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <NavLabel>{item.label}</NavLabel>
                </NavItemLink>
              );
            })}
          </NavList>
        </SidebarBody>

        {/* Sidebar Bottom Footer: View Marketplace Button */}
        <SidebarFooter>
          <MarketplaceButton
            href="/"
            title="Visit TravelDekho Marketplace"
          >
            <Globe className="w-4 h-4 shrink-0 globe-icon" aria-hidden="true" />
            <span>View Marketplace</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 arrow-icon" aria-hidden="true" />
          </MarketplaceButton>
        </SidebarFooter>
      </SidebarRoot>

      {/* Mobile & Tablet Off-Canvas Drawer (< 1024px, Portaled to body) */}
      {isMounted &&
        createPortal(
          <>
            <DrawerOverlay
              $isOpen={isMobileSidebarOpen}
              onClick={() => dispatch(closeMobileSidebar())}
              aria-hidden="true"
            />

            <DrawerContainer
              $isOpen={isMobileSidebarOpen}
              role="dialog"
              aria-modal="true"
              aria-label="Partner Navigation"
            >
              <DrawerHeader>
                <LogoContainer
                  href={`/trip-partner/${username}/dashboard`}
                  title="Trip Partner Dashboard"
                  onClick={() => dispatch(closeMobileSidebar())}
                >
                  <Image
                    alt="TravelDekho"
                    src="/TravelDekho-logo.png"
                    fill
                    priority
                    className="object-contain"
                    sizes="168px"
                  />
                </LogoContainer>

                <DrawerCloseButton
                  onClick={() => dispatch(closeMobileSidebar())}
                  aria-label="Close navigation menu"
                  title="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </DrawerCloseButton>
              </DrawerHeader>

              <DrawerPartnerCard>
                <DrawerAvatar>
                  {effectiveDisplayName.charAt(0) || 'T'}
                </DrawerAvatar>
                <DrawerPartnerDetails>
                  <DrawerPartnerName>{effectiveDisplayName}</DrawerPartnerName>
                  <DrawerPartnerBadge>
                    <UserCheck className="w-3 h-3 text-green-600" /> Verified Partner
                  </DrawerPartnerBadge>
                </DrawerPartnerDetails>
              </DrawerPartnerCard>

              <SidebarBody>
                <NavList>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavItemLink
                        key={item.label}
                        href={item.href}
                        $isActive={!!item.isActive}
                        onClick={() => dispatch(closeMobileSidebar())}
                      >
                        <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                        <NavLabel>{item.label}</NavLabel>
                      </NavItemLink>
                    );
                  })}
                </NavList>
              </SidebarBody>

              <SidebarFooter>
                <MarketplaceButton
                  href="/"
                  title="Visit TravelDekho Marketplace"
                  onClick={() => dispatch(closeMobileSidebar())}
                >
                  <Globe className="w-4 h-4 shrink-0 globe-icon" aria-hidden="true" />
                  <span>View Marketplace</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 arrow-icon" aria-hidden="true" />
                </MarketplaceButton>
              </SidebarFooter>
            </DrawerContainer>
          </>,
          document.body
        )}
    </>
  );
};
