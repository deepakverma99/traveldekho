'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { Smartphone, Play, ChevronDown, Menu, X, Search } from 'lucide-react';
import { Button, SearchBar } from '@/components/shared';
import { LoginModal } from '@/components/Auth';
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

const MobileMenuDrawer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.25rem 1.5rem;
  background-color: rgba(255, 251, 235, 0.98);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(254, 243, 199, 0.8);
  border-bottom: 1px solid rgba(254, 243, 199, 0.8);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <HeaderWrapper>
      <Container>
        <HeaderInner>
          <div className="flex-shrink-0">
            <LogoLink href="/" title="Go to Homepage" onClick={() => setIsMobileMenuOpen(false)}>
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
              <Button onClick={() => setIsLoginModalOpen(true)}>Login</Button>
            </div>
          </Nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center h-10 w-10 bg-white/80 rounded-xl text-gray-700 hover:bg-amber-100 hover:text-amber-600 transition-colors ml-auto relative z-[60] border border-amber-200/50 shadow-sm"
            aria-label={isMobileMenuOpen ? "Close Mobile Menu" : "Open Mobile Menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </HeaderInner>
      </Container>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <MobileMenuDrawer>
          {/* Mobile Search */}
          <form
            action="/search"
            method="GET"
            onSubmit={() => setIsMobileMenuOpen(false)}
            className="relative w-full"
          >
            <input
              type="text"
              name="q"
              placeholder="Search your next Destination"
              className="w-full h-11 pl-4 pr-10 text-sm rounded-xl bg-white border border-amber-200 outline-none focus:border-amber-400 font-medium text-gray-700"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-amber-400 rounded-lg text-black cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col gap-2 pt-1">
            <Link
              href="/app"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-gray-800 hover:bg-amber-100/70 transition-colors"
            >
              <Smartphone className="w-4 h-4 text-amber-500" />
              <span>Get the App</span>
            </Link>

            <Link
              href="/vlog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-gray-800 hover:bg-amber-100/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Play className="w-4 h-4 text-amber-500 fill-current" />
                <span>Vlog</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-[9px] font-black uppercase text-black">
                NEW
              </span>
            </Link>

            <Link
              href="/join-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-gray-800 hover:bg-amber-100/70 transition-colors"
            >
              <span>Join us</span>
              <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
            </Link>
          </div>

          {/* Login CTA */}
          <div className="pt-2 border-t border-amber-200/60">
            <Button
              className="w-full justify-center h-11 text-sm font-bold"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsLoginModalOpen(true);
              }}
            >
              Login
            </Button>
          </div>
        </MobileMenuDrawer>
      )}

      {/* Login & Signup Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </HeaderWrapper>
  );
};
