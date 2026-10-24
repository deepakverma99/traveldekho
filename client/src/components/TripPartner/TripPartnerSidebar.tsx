'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Globe,
  ArrowUpRight,
  X,
  UserCheck,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectIsMobileSidebarOpen,
  closeMobileSidebar,
  selectCurrentPartner,
} from '@/redux/slices/tripPartnerSlice';
import { type TripPartnerSidebarProps } from './types/';
import { getPartnerNavItems } from './data';

export type { TripPartnerSidebarProps };

const emptySubscribe = () => () => {};
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

  const [optimisticPath, setOptimisticPath] = useState<string | null>(null);

  // Close on route navigation and clear optimistic path
  useEffect(() => {
    dispatch(closeMobileSidebar());
    setOptimisticPath(null);
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
  const activePathname = optimisticPath ?? pathname;
  const navItems = getPartnerNavItems(username, activePathname);

  return (
    <>
      {/* Desktop Persistent Sidebar (>= 1024px) */}
      <aside className="w-64 bg-white border-r border-gray-200 h-screen hidden lg:flex flex-col shrink-0 sticky top-0 z-40 transition-colors shadow-[1px_0_10px_rgba(0,0,0,0.02)] font-jakarta">
        {/* Top 72px Header with TravelDekho Logo */}
        <div className="h-[72px] flex items-center px-5 border-b border-gray-200 shrink-0">
          <Link
            href={`/trip-partner/${username}/dashboard`}
            title="Trip Partner Dashboard"
            className="relative h-10 w-[168px] block transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            <Image
              alt="TravelDekho"
              src="/TravelDekho-logo.png"
              fill
              priority
              className="object-contain"
              sizes="168px"
            />
          </Link>
        </div>

        <div className="flex-1 flex flex-col p-4 overflow-y-auto min-h-0">
          {/* Navigation List */}
          <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto pr-1 pb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = !!item.isActive;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOptimisticPath(item.href)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl relative z-10 no-underline select-none border transition-all duration-150 ${
                    isActive
                      ? 'text-white font-black shadow-[0_4px_12px_rgba(244,140,6,0.25)] bg-gradient-to-r from-amber-500 to-amber-600 border-transparent'
                      : 'text-slate-900 font-extrabold bg-white border-gray-200 hover:border-amber-300 hover:text-black hover:shadow-xs'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-transform ${
                      isActive ? 'text-white' : 'text-amber-500'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-extrabold tracking-tight">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Footer: View Marketplace Button */}
        <div className="p-4 border-t border-gray-200 bg-white shrink-0">
          <Link
            href="/"
            title="Visit TravelDekho Marketplace"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-gray-700 bg-white border border-gray-200 no-underline shadow-xs transition-all duration-200 hover:bg-amber-50 hover:border-amber-300 hover:text-gray-950 group/market"
          >
            <Globe className="w-4 h-4 shrink-0 text-amber-600 group-hover/market:scale-110 transition-transform" aria-hidden="true" />
            <span>View Marketplace</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-gray-400 group-hover/market:text-amber-600 group-hover/market:translate-x-0.5 group-hover/market:-translate-y-0.5 transition-all ml-auto" aria-hidden="true" />
          </Link>
        </div>
      </aside>

      {/* Mobile & Tablet Off-Canvas Drawer (< 1024px, Portaled to body) */}
      {isMounted &&
        createPortal(
          <>
            <div
              className={`fixed inset-0 z-[9998] bg-black/45 backdrop-blur-xs lg:hidden transition-opacity duration-300 ${
                isMobileSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => dispatch(closeMobileSidebar())}
              aria-hidden="true"
            />

            <aside
              className={`fixed top-0 bottom-0 left-0 z-[9999] w-[85%] max-w-xs h-screen h-[100dvh] bg-white shadow-2xl flex flex-col font-jakarta lg:hidden transition-transform duration-300 ease-out ${
                isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
              role="dialog"
              aria-modal="true"
              aria-label="Partner Navigation"
            >
              <div className="h-[72px] flex items-center justify-between px-5 border-b border-gray-200 shrink-0">
                <Link
                  href={`/trip-partner/${username}/dashboard`}
                  title="Trip Partner Dashboard"
                  onClick={() => dispatch(closeMobileSidebar())}
                  className="relative h-10 w-[168px] block transition-transform hover:scale-[1.03]"
                >
                  <Image
                    alt="TravelDekho"
                    src="/TravelDekho-logo.png"
                    fill
                    priority
                    className="object-contain"
                    sizes="168px"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => dispatch(closeMobileSidebar())}
                  aria-label="Close navigation menu"
                  title="Close navigation menu"
                  className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="m-4 mb-1 p-3.5 px-4 bg-white border border-gray-200 rounded-xl flex items-center gap-3 shadow-xs">
                <div className="w-9 h-9 rounded-full bg-amber-400 text-charcoal flex items-center justify-center font-black text-sm shadow-xs uppercase shrink-0">
                  {effectiveDisplayName.charAt(0) || 'T'}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-extrabold text-gray-900 leading-tight capitalize truncate">
                    {effectiveDisplayName}
                  </span>
                  <span className="text-[11px] font-bold text-green-600 flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-green-600" /> Verified Partner
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col p-4 overflow-y-auto min-h-0">
                <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto pr-1 pb-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = !!item.isActive;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          setOptimisticPath(item.href);
                          dispatch(closeMobileSidebar());
                        }}
                        className={`flex items-center gap-3.5 px-4 py-3 rounded-xl relative z-10 no-underline select-none border transition-all duration-150 ${
                          isActive
                            ? 'text-white font-black shadow-[0_4px_12px_rgba(244,140,6,0.25)] bg-gradient-to-r from-amber-500 to-amber-600 border-transparent'
                            : 'text-slate-900 font-extrabold bg-white border-gray-200 hover:border-amber-300 hover:text-black hover:shadow-xs'
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 shrink-0 transition-transform ${
                            isActive ? 'text-white' : 'text-amber-500'
                          }`}
                          aria-hidden="true"
                        />
                        <span className="text-sm font-extrabold tracking-tight">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="p-4 border-t border-gray-200 bg-white shrink-0">
                <Link
                  href="/"
                  title="Visit TravelDekho Marketplace"
                  onClick={() => dispatch(closeMobileSidebar())}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-gray-700 bg-white border border-gray-200 no-underline shadow-xs transition-all duration-200 hover:bg-amber-50 hover:border-amber-300 hover:text-gray-950 group/market"
                >
                  <Globe className="w-4 h-4 shrink-0 text-amber-600 group-hover/market:scale-110 transition-transform" aria-hidden="true" />
                  <span>View Marketplace</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-gray-400 group-hover/market:text-amber-600 group-hover/market:translate-x-0.5 group-hover/market:-translate-y-0.5 transition-all ml-auto" aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </>,
          document.body
        )}
    </>
  );
};
