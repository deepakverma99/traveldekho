'use client';

import React, { useState, useEffect, useSyncExternalStore, Suspense } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
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
    <header className="w-full bg-white/95 border-b border-gray-200 sticky top-0 z-50 shadow-xs backdrop-blur-md font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem] transition-all">
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

          <SearchBar />

          <nav className="hidden lg:flex items-center gap-1 xl:gap-4 ml-auto">
            <Link
              href="/app"
              className="hidden xl:flex items-center gap-2 px-3 py-2 text-sm font-bold text-gray-700 transition-colors rounded-lg hover:text-amber-500 hover:bg-amber-50 [&:hover_svg]:rotate-12 [&_svg]:transition-transform [&_svg]:duration-200"
            >
              <Smartphone className="h-4 w-4 text-amber-500" />
              <span className="whitespace-nowrap">Get the App</span>
            </Link>
            <Link
              href="/vlog"
              className="relative flex items-center gap-2 px-3 py-2 text-sm font-bold text-gray-700 transition-colors rounded-lg hover:text-amber-500 hover:bg-amber-50 [&:hover_svg]:rotate-12 [&_svg]:transition-transform [&_svg]:duration-200"
            >
              <Play className="h-4 w-4 text-amber-500 fill-current" />
              <span>Vlog</span>
              <span className="absolute -top-1 -right-1 flex h-4 w-10 items-center justify-center rounded-full bg-amber-500 text-[8px] font-black uppercase text-black ring-2 ring-white animate-pulse shadow-sm shadow-amber-500/20">
                NEW
              </span>
            </Link>

            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-sm font-bold text-gray-700 transition-colors rounded-lg hover:text-amber-500 hover:bg-amber-50 [&:hover_svg]:rotate-180 [&_svg]:transition-transform [&_svg]:duration-200 cursor-pointer border-0 bg-transparent"
              >
                <span>Join us</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div className="ml-2 relative">
              <Button onClick={() => dispatch(openLoginModal())}>Login</Button>
            </div>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center h-10 w-10 bg-white/80 rounded-xl text-gray-700 hover:bg-amber-100 hover:text-amber-600 transition-colors ml-auto relative z-[60] border border-amber-200/50 shadow-sm cursor-pointer"
            aria-label={isMobileMenuOpen ? "Close Mobile Menu" : "Open Mobile Menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
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
