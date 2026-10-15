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

export interface TripPartnerSidebarProps {
  username: string;
}

export const TripPartnerSidebar: React.FC<TripPartnerSidebarProps> = ({ username }) => {
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
      label: 'Public Profile',
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
    <aside className="w-64 bg-[#FFFBF0] border-r border-amber-100/50 h-[calc(100vh-4rem)] md:h-[calc(100vh-72px)] flex flex-col p-4 flex-shrink-0 hidden md:flex sticky top-[72px]">
      <div className="mb-8 px-4 mt-4 shrink-0">
        <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">Trip Partner Menu</h2>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-amber-200/60 hover:[&::-webkit-scrollbar-thumb]:bg-amber-300 [&::-webkit-scrollbar-thumb]:rounded-full pr-1 pb-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all relative z-10 ${
                item.isActive
                  ? 'text-black font-black'
                  : 'text-gray-500 font-bold hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.isActive && (
                <div
                  className="absolute inset-0 bg-amber-400 rounded-2xl shadow-lg shadow-amber-200 z-0"
                  style={{ transform: 'none', transformOrigin: '50% 50% 0px', opacity: 1 }}
                />
              )}
              <div className="relative z-10">
                <Icon
                  className={`w-5 h-5 ${item.isActive ? 'text-black' : 'text-gray-400'}`}
                  aria-hidden="true"
                />
              </div>
              <span className="text-sm tracking-tight relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
