'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Map,
  CalendarCheck,
  CircleUser,
  Settings,
} from 'lucide-react';

export interface TripPartnerMobileNavProps {
  username: string;
}

export const TripPartnerMobileNav: React.FC<TripPartnerMobileNavProps> = ({ username }) => {
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
      icon: CalendarCheck,
      isActive: pathname?.includes('/date-requests'),
    },
    {
      label: 'Profile',
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] animate-nav-appear">
      <div className="bg-[#FFFBF0] border-t border-amber-100/50 shadow-[0_-8px_30px_rgba(252,211,77,0.15)]">
        <div
          className="flex items-stretch overflow-x-auto no-scrollbar pt-1 pb-2 px-1"
          style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 py-2 px-3 min-w-[72px] tap-scale relative transition-all duration-200 ${
                  item.isActive ? 'text-amber-500' : 'text-gray-400'
                }`}
              >
                {item.isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-amber-400 rounded-b-lg" />
                )}
                <div
                  className={`p-1.5 rounded-xl transition-all duration-200 shrink-0 relative mt-1 ${
                    item.isActive ? 'bg-amber-50' : ''
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-all ${
                      item.isActive ? 'text-amber-500 scale-110' : 'text-gray-500'
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <span
                  className={`text-[10px] font-black uppercase tracking-wider leading-none text-center whitespace-nowrap ${
                    item.isActive ? 'text-amber-500' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
