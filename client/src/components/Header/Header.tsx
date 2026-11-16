'use client';

import React, { useState, useEffect, useSyncExternalStore, Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { SearchBar } from '@/components/shared';
import { LoginModal } from '@/components/Auth';
import { useAppDispatch, openLoginModal } from '@/redux';
import { colorTokens } from '@/theme';
import { DesktopNav, MobileDrawer } from './components';

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

  const handleOpenLogin = () => {
    dispatch(openLoginModal());
  };

  return (
    <header className="w-full bg-white/95 border-b border-gray-200 sticky top-0 z-50 shadow-xs backdrop-blur-md font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem] transition-all">
          {/* Logo */}
          <div className="shrink-0">
            <Link
              href="/"
              title="Go to Homepage"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
            >
              <div className="relative h-9 w-35 sm:h-10 sm:w-[9.75rem] md:h-12 md:w-[11.75rem] shrink-0 transition-all">
                <Image
                  alt="Travel Dekho Logo"
                  src="/TravelDekho-logo.png"
                  fill
                  sizes="(max-width: 640px) 140px, (max-width: 768px) 156px, 188px"
                  className="object-contain object-left"
                  priority
                  loading="eager"
                />
              </div>
            </Link>
          </div>

          {/* SearchBar */}
          <SearchBar />

          {/* Desktop Navigation Links */}
          <DesktopNav onLoginClick={handleOpenLogin} />

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center h-10 w-10 bg-white/90 rounded-xl transition-all ml-auto relative z-[60] border shadow-xs cursor-pointer"
            style={{
              borderColor: colorTokens.surfaceBorder,
              color: colorTokens.textPrimary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colorTokens.primaryContainer;
              e.currentTarget.style.backgroundColor = colorTokens.accentWarmTint;
              e.currentTarget.style.borderColor = colorTokens.primaryContainer;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colorTokens.textPrimary;
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)';
              e.currentTarget.style.borderColor = colorTokens.surfaceBorder;
            }}
            aria-label={isMobileMenuOpen ? 'Close Mobile Menu' : 'Open Mobile Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onLoginClick={handleOpenLogin}
        isMounted={isMounted}
      />

      {/* Login & Signup Modal */}
      <LoginModal />
    </header>
  );
};

export const Header: React.FC = () => {
  return (
    <Suspense fallback={<div className="h-[72px] sm:h-[80px]" />}>
      <HeaderContent />
    </Suspense>
  );
};
