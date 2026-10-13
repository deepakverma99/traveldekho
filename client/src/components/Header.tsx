'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { Smartphone, Play, ChevronDown, Menu } from 'lucide-react';
import { Button, SearchBar } from '@/components/shared';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: rgba(255, 251, 235, 0.95);
  border-bottom: 1px solid rgba(254, 243, 199, 0.8);
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(12px);
  font-family: ${typography.fonts.sans};
`;

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  transition: all 0.3s;

  @media (min-width: 768px) {
    height: 4.5rem;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const LogoContainer = styled.div`
  position: relative;
  height: 2.25rem;
  width: 8.75rem;
  flex-shrink: 0;
  transition: all 0.3s;

  @media (min-width: 640px) {
    height: 2.5rem;
    width: 9.75rem;
  }

  @media (min-width: 768px) {
    height: 3rem;
    width: 11.75rem;
  }
`;

const Nav = styled.nav`
  display: none;
  align-items: center;
  gap: 0.25rem;
  margin-left: auto;

  @media (min-width: 1024px) {
    display: flex;
  }

  @media (min-width: 1280px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.bold};
  color: ${colors.gray[700]};
  transition: colors 0.2s;
  border-radius: 0.5rem;

  &:hover {
    color: ${colors.amber[500]};
    background-color: ${colors.amber[50]};
    
    svg {
      transform: rotate(12deg);
    }
  }

  svg {
    transition: transform 0.2s;
  }
`;

const JoinUsBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.bold};
  color: ${colors.gray[700]};
  transition: colors 0.2s;
  border-radius: 0.5rem;

  &:hover {
    color: ${colors.amber[500]};
    background-color: ${colors.amber[50]};
    
    svg {
      transform: rotate(180deg);
    }
  }

  svg {
    transition: transform 0.2s;
  }
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <Container>
        <HeaderInner>
          <div className="flex-shrink-0">
            <LogoLink href="/" title="Go to Homepage">
              <LogoContainer>
                <Image
                  alt="Travel Dekho Logo"
                  src="/TravelDekho-logo.png"
                  fill
                  sizes="(max-width: 640px) 140px, (max-width: 768px) 156px, 188px"
                  className="object-contain object-left"
                  priority
                />
              </LogoContainer>
            </LogoLink>
          </div>

          <SearchBar />

          <Nav>
            <NavLink href="/app" className="hidden xl:flex group">
              <Smartphone className="h-4 w-4 text-amber-500" />
              <span className="whitespace-nowrap">Get the App</span>
            </NavLink>
            <NavLink href="/vlog" className="relative group">
              <Play className="h-4 w-4 text-amber-500 fill-current" />
              Vlog
              <span className="absolute -top-1 -right-1 flex h-4 w-10 items-center justify-center rounded-full bg-amber-500 text-[8px] font-black uppercase text-black ring-2 ring-white animate-pulse shadow-sm shadow-amber-500/20">
                NEW
              </span>
            </NavLink>

            <div className="relative group">
              <JoinUsBtn>
                Join us
                <ChevronDown className="h-4 w-4" />
              </JoinUsBtn>
            </div>

            <div className="ml-2 relative">
              <Button>Login</Button>
            </div>
          </Nav>

          <button
            className="lg:hidden flex items-center justify-center h-10 w-10 bg-gray-50 rounded-xl text-gray-600 hover:bg-amber-100 hover:text-amber-600 transition-colors ml-auto relative z-[60]"
            aria-label="Open Mobile Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </HeaderInner>
      </Container>
    </HeaderWrapper>
  );
};
