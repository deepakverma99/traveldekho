'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type TripPartnerMobileNavProps } from './types/';
import { getPartnerNavItems } from './data';

export type { TripPartnerMobileNavProps };

export const TripPartnerMobileNav: React.FC<TripPartnerMobileNavProps> = ({ username }) => {
  const pathname = usePathname();
  const navItems = getPartnerNavItems(username, pathname);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 block md:hidden animate-fade-in-up">
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-stretch overflow-x-auto pt-1 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] px-1 scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = !!item.isActive;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 py-2 px-3 min-w-[72px] relative no-underline transition-all duration-200 active:scale-95 ${
                  active ? 'text-gray-950 font-black' : 'text-gray-500 font-bold'
                }`}
              >
                {active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-b-md shadow-2xs" />
                )}
                <div
                  className={`p-1.5 rounded-xl transition-all duration-200 shrink-0 relative mt-1 ${
                    active
                      ? 'bg-amber-100 text-amber-900 shadow-xs'
                      : 'bg-transparent text-gray-400'
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    className={`w-5 h-5 transition-transform duration-200 ${
                      active ? 'text-gray-950 scale-110' : 'text-gray-400'
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] font-black uppercase tracking-wider leading-none text-center whitespace-nowrap ${
                    active ? 'text-gray-950' : 'text-gray-500'
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
