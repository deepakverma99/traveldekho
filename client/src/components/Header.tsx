'use client';

import React, { useState, useEffect, useSyncExternalStore, Suspense } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styled from 'styled-components';
import {
  Smartphone,
  Play,
  ChevronDown,
  Menu,
  X,
  Info,
  Users,
  Building2,
  Bus,
  Briefcase,
} from 'lucide-react';
import { Button, SearchBar } from '@/components/shared';
import { LoginModal } from '@/components/Auth';
import { useAppDispatch, openLoginModal } from '@/redux';
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

const emptySubscribe = () => () => {};
const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
};

const HeaderContent = () => {
  const pathname = usePathname();
  const isMounted = useIsMounted();
  const dispatch = useAppDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  if (pathname?.startsWith('/trip-partner')) {
    return null;
  }

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
                  loading="eager"
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
              <Button onClick={() => dispatch(openLoginModal())}>Login</Button>
            </div>
          </Nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center h-10 w-10 bg-white/80 rounded-xl text-gray-700 hover:bg-amber-100 hover:text-amber-600 transition-colors ml-auto relative z-[60] border border-amber-200/50 shadow-sm cursor-pointer"
            aria-label={isMobileMenuOpen ? "Close Mobile Menu" : "Open Mobile Menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </HeaderInner>
      </Container>

      {/* Mobile Drawer (Portaled to document.body to break free from HeaderWrapper stacking context & backdrop-filter) */}
      {isMounted &&
        createPortal(
          <>
            {/* Mobile Drawer Overlay Backdrop */}
            <div
              className={`lg:hidden fixed inset-0 z-[9998] bg-black/60 transition-opacity duration-300 ${
                isMobileMenuOpen
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Right Slide-Over Drawer */}
            <div
              className={`lg:hidden fixed right-0 top-0 bottom-0 z-[9999] w-[85%] max-w-sm bg-white shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
                <Link
                  className="flex items-center gap-2"
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="relative h-12 w-36">
                    <Image
                      alt="TravelDekho"
                      src="/TravelDekho-logo.png"
                      fill
                      priority
                      className="object-contain"
                      sizes="150px"
                    />
                  </div>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-full cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                <nav className="flex flex-col gap-2">
                  <Link
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 text-gray-900 hover:bg-amber-50/60 transition-colors"
                    href="/app"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="p-3 rounded-xl bg-white shadow-sm shrink-0">
                      <Smartphone className="w-5 h-5 text-amber-500" />
                    </div>
                    <span className="font-black uppercase tracking-widest text-xs">
                      Get the App
                    </span>
                  </Link>

                  <Link
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 text-gray-900 hover:bg-amber-50/60 transition-colors"
                    href="/vlog"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="p-3 rounded-xl bg-white shadow-sm shrink-0">
                      <Play className="w-5 h-5 text-amber-500 fill-current" />
                    </div>
                    <span className="font-black uppercase tracking-widest text-xs">
                      Watch Vlogs
                    </span>
                  </Link>

                  <Link
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 text-gray-900 hover:bg-amber-50/60 transition-colors"
                    href="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="p-3 rounded-xl bg-white shadow-sm shrink-0">
                      <Info className="w-5 h-5 text-amber-500" />
                    </div>
                    <span className="font-black uppercase tracking-widest text-xs">
                      About Us
                    </span>
                  </Link>
                </nav>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3">
                    Join Our Network
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <Link
                      className="flex flex-col items-center justify-center p-3 rounded-2xl border border-gray-100 bg-white hover:bg-amber-50 transition-colors gap-2 text-center"
                      href="/trip-partner"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Users className="w-5 h-5 text-amber-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest leading-tight">
                        Trip<br />Partner
                      </span>
                    </Link>

                    <Link
                      className="flex flex-col items-center justify-center p-3 rounded-2xl border border-gray-100 bg-white hover:bg-amber-50 transition-colors gap-2 text-center"
                      href="/hotel-partner"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Building2 className="w-5 h-5 text-amber-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest leading-tight">
                        Hotel<br />Partner
                      </span>
                    </Link>

                    <Link
                      className="flex flex-col items-center justify-center p-3 rounded-2xl border border-gray-100 bg-white hover:bg-amber-50 transition-colors gap-2 text-center"
                      href="/travel-partner"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Bus className="w-5 h-5 text-amber-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest leading-tight">
                        Travel<br />Partner
                      </span>
                    </Link>

                    <Link
                      className="flex flex-col items-center justify-center p-3 rounded-2xl border border-gray-100 bg-white hover:bg-amber-50 transition-colors gap-2 text-center"
                      href="/work-with-us"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Briefcase className="w-5 h-5 text-amber-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest leading-tight">
                        Work<br />With Us
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      dispatch(openLoginModal());
                    }}
                    className="flex items-center justify-center h-16 w-full bg-amber-400 hover:bg-amber-500 text-gray-900 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg transition-all duration-300 cursor-pointer active:scale-98"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}

      {/* Login & Signup Modal */}
      <LoginModal />
    </HeaderWrapper>
  );
};

export const Header: React.FC = () => {
  return (
    <Suspense fallback={<div className="h-[72px] sm:h-[80px]" />}>
      <HeaderContent />
    </Suspense>
  );
};
