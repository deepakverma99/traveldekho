'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Globe, LogOut, Bell, UserCheck } from 'lucide-react';
import { clearPartnerSession } from './utils/partnerAuth';

export interface TripPartnerHeaderProps {
  username: string;
  displayName: string;
}

export const TripPartnerHeader: React.FC<TripPartnerHeaderProps> = ({
  username,
  displayName,
}) => {
  const router = useRouter();

  const handleLogout = () => {
    clearPartnerSession();
    router.push('/trip-partner/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full h-[72px] bg-[#FFFBF0]/95 backdrop-blur-md border-b border-amber-100/60 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1600px] h-full mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand & Portal Badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href={`/trip-partner/${username}/dashboard`}
            className="relative h-10 w-36 sm:h-11 sm:w-44 block transition-transform hover:scale-105 active:scale-95"
            title="Trip Partner Dashboard"
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

          <span className="hidden sm:inline-flex items-center px-3 py-1 bg-amber-400 text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-xs">
            Trip Partner Portal
          </span>
        </div>

        {/* Right: Actions & Partner Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* View Website Link */}
          <Link
            href="/"
            title="Visit TravelDekho Marketplace"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600 hover:text-black hover:bg-amber-100/50 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-amber-600" />
            <span>View Marketplace</span>
          </Link>

          {/* Notifications Shortcut */}
          <Link
            href={`/trip-partner/${username}/notifications`}
            title="View Notifications"
            className="relative p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-amber-100/50 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          </Link>

          {/* Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-amber-200/50">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center font-black text-xs shadow-xs uppercase">
              {displayName.charAt(0) || 'T'}
            </div>

            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-black text-gray-900 leading-tight capitalize truncate max-w-[120px]">
                {displayName}
              </span>
              <span className="text-[10px] font-bold text-green-600 flex items-center gap-0.5">
                <UserCheck className="w-3 h-3" /> Verified Partner
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              title="Log Out of Partner Portal"
              className="p-2 ml-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
