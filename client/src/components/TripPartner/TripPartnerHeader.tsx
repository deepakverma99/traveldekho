'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogOut, Bell, UserCheck, Menu, X } from 'lucide-react';
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
      <header className="sticky top-0 z-50 w-full h-16 sm:h-[72px] bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] px-3.5 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] h-full mx-auto flex items-center justify-between gap-3 sm:gap-4 font-jakarta">
          {/* Left: Brand & Portal Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => dispatch(toggleMobileSidebar())}
              aria-label={isMobileSidebarOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              title={isMobileSidebarOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileSidebarOpen}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link
              href={`/trip-partner/${username}/dashboard`}
              title="Trip Partner Dashboard"
              className="relative h-10 w-44 hidden sm:block lg:hidden transition-transform hover:scale-[1.02]"
            >
              <Image
                alt="TravelDekho"
                src="/TravelDekho-logo.png"
                fill
                priority
                className="object-contain"
                sizes="176px"
              />
            </Link>

            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200/80">
              Trip Partner Portal
            </span>
          </div>

          {/* Right: Actions & Partner Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifications Shortcut */}
            <Link
              href={`/trip-partner/${username}/notifications`}
              title="View Notifications"
              className="relative p-2 rounded-xl text-gray-500 hover:text-amber-600 hover:bg-amber-50/60 transition-colors"
            >
              <Bell className="w-4 h-4" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            </Link>

            {/* Profile Pill */}
            <div className="flex items-center gap-2 p-1 pl-1.5 sm:p-1.5 sm:pl-2 rounded-full border border-gray-200 bg-white shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-charcoal flex items-center justify-center font-black text-xs shadow-xs uppercase shrink-0">
                {effectiveDisplayName.charAt(0) || 'T'}
              </div>

              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-black text-gray-900 leading-tight capitalize truncate max-w-[120px]">
                  {effectiveDisplayName}
                </span>
                <span className="text-[10px] font-bold text-green-600 flex items-center gap-0.5">
                  <UserCheck className="w-3 h-3" /> Verified Partner
                </span>
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleOpenLogout}
                title="Log Out of Partner Portal"
                aria-label="Log Out of Partner Portal"
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

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
