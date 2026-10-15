'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Map,
  CalendarCheck,
  CalendarClock,
  CircleUser,
  Settings,
  ArrowRight,
} from 'lucide-react';
import { colors } from '@/theme/colors';

export interface TripPartnerSidebarProps {
  username: string;
}

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

  @media (min-width: 768px) {
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

const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 0 0.875rem;
  margin-top: 0.5rem;
  flex-shrink: 0;
`;

const PulseIndicator = styled.span`
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 9999px;
  background-color: ${colors.amber[500]};
`;

const MenuTitle = styled.h2`
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${colors.gray[400]};
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

const NavItemLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  position: relative;
  z-index: 10;
  text-decoration: none;

  ${({ $isActive }) =>
    $isActive
      ? `
    color: ${colors.gray[950]};
    font-weight: 900;
    box-shadow: 0 4px 6px -1px ${colors.amber[300]}59;
    background: linear-gradient(to right, ${colors.amber[400]}, ${colors.gold});

    svg {
      color: ${colors.gray[950]};
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
      background-color: ${colors.white};
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

const StatusCardWrapper = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  flex-shrink: 0;
`;

const StatusCard = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${colors.white}E6;
  border: 1px solid ${colors.amber[100]};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ActiveBadge = styled.span`
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${colors.amber[800]};
  background-color: ${colors.amber[50]};
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
  border: 1px solid ${colors.amber[200]}80;
`;

const OnlineDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: ${colors.green[500]};
`;

const PartnerUsernameText = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${colors.gray[800]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: capitalize;
`;

const ManageProfileLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 11px;
  font-weight: 900;
  color: ${colors.amber[600]};
  margin-top: 0.5rem;
  transition: color 0.2s ease;
  cursor: pointer;

  svg {
    width: 0.75rem;
    height: 0.75rem;
    color: ${colors.amber[500]};
    transition: transform 0.2s ease;
  }

  &:hover {
    color: ${colors.black};

    svg {
      transform: translateX(2px);
    }
  }
`;

export const TripPartnerSidebar: React.FC<TripPartnerSidebarProps> = ({ username }) => {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Dashboard',
      href: `/trip-partner/${username}/dashboard`,
      icon: LayoutDashboard,
      isActive: pathname?.includes('/dashboard'),
    },
    {
      label: 'My Trips',
      href: `/trip-partner/${username}/trips`,
      icon: Map,
      isActive: pathname?.includes('/trips'),
    },
    {
      label: 'Bookings',
      href: `/trip-partner/${username}/bookings`,
      icon: CalendarCheck,
      isActive: pathname?.includes('/bookings'),
    },
    {
      label: 'Date Requests',
      href: `/trip-partner/${username}/date-requests`,
      icon: CalendarClock,
      isActive: pathname?.includes('/date-requests'),
    },
    {
      label: 'Public Profile',
      href: `/trip-partner/${username}/profile`,
      icon: CircleUser,
      isActive: pathname?.includes('/profile'),
    },
    {
      label: 'Settings',
      href: `/trip-partner/${username}/settings`,
      icon: Settings,
      isActive: pathname?.includes('/settings'),
    },
  ];

  return (
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
        {/* Menu Header */}
        <MenuHeader>
          <PulseIndicator className="animate-pulse" />
          <MenuTitle>
            Trip Partner Menu
          </MenuTitle>
        </MenuHeader>

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

        {/* Bottom Card: Active Status & Manage Link */}
        <StatusCardWrapper>
          <StatusCard>
            <StatusHeader>
              <ActiveBadge>
                Active Partner
              </ActiveBadge>
              <OnlineDot className="animate-pulse" title="System Connected" />
            </StatusHeader>
            <PartnerUsernameText>
              {username}
            </PartnerUsernameText>
            <ManageProfileLink href={`/trip-partner/${username}/profile`}>
              <span>Manage Profile</span>
              <ArrowRight />
            </ManageProfileLink>
          </StatusCard>
        </StatusCardWrapper>
      </SidebarBody>
    </SidebarRoot>
  );
};
