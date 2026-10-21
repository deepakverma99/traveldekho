'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { colors } from '@/theme/colors';
import { type TripPartnerMobileNavProps } from './types/';
import { getPartnerNavItems } from './data';

export type { TripPartnerMobileNavProps };

const MobileNavRoot = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`;

const NavInner = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid ${colors.gray[200]};
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.05);
`;

const NavScroll = styled.div`
  display: flex;
  align-items: stretch;
  overflow-x: auto;
  padding-top: 0.25rem;
  padding-bottom: calc(0.5rem + env(safe-area-inset-bottom, 0px));
  padding-left: 0.25rem;
  padding-right: 0.25rem;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const NavItemLink = styled(Link) <{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  min-width: 72px;
  position: relative;
  text-decoration: none;
  transition: all 0.2s ease;
  color: ${({ $isActive }) => ($isActive ? colors.gray[950] : colors.gray[500])};
  font-weight: ${({ $isActive }) => ($isActive ? 900 : 700)};

  &:active {
    transform: scale(0.95);
  }
`;

const ActiveIndicator = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2rem;
  height: 0.25rem;
  background: linear-gradient(to right, ${colors.amber[400]}, ${colors.gold});
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const IconContainer = styled.div<{ $isActive: boolean }>`
  padding: 0.375rem;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  flex-shrink: 0;
  position: relative;
  margin-top: 0.25rem;
  background-color: ${({ $isActive }) => ($isActive ? colors.amber[100] : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? colors.amber[900] : 'inherit')};
  box-shadow: ${({ $isActive }) => ($isActive ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none')};

  svg {
    width: 1.25rem;
    height: 1.25rem;
    transition: all 0.2s ease;
    color: ${({ $isActive }) => ($isActive ? colors.gray[950] : colors.gray[400])};
    transform: ${({ $isActive }) => ($isActive ? 'scale(1.1)' : 'scale(1)')};
  }
`;

const NavLabel = styled.span<{ $isActive: boolean }>`
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  color: ${({ $isActive }) => ($isActive ? colors.gray[950] : colors.gray[500])};
`;

export const TripPartnerMobileNav: React.FC<TripPartnerMobileNavProps> = ({ username }) => {
  const pathname = usePathname();

  const navItems = getPartnerNavItems(username, pathname);

  return (
    <MobileNavRoot className="animate-nav-appear">
      <NavInner>
        <NavScroll>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = !!item.isActive;
            return (
              <NavItemLink
                key={item.label}
                href={item.href}
                $isActive={active}
              >
                {active && <ActiveIndicator />}
                <IconContainer $isActive={active}>
                  <Icon aria-hidden="true" />
                </IconContainer>
                <NavLabel $isActive={active}>
                  {item.label}
                </NavLabel>
              </NavItemLink>
            );
          })}
        </NavScroll>
      </NavInner>
    </MobileNavRoot>
  );
};

