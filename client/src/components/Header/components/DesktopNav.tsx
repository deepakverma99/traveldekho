'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Smartphone, Play, ChevronDown } from 'lucide-react';
import { colorTokens } from '@/theme';
import { Button } from '@/components/shared';
import { JoinUsDropdown } from './JoinUsDropdown';

const AuthNavSection = dynamic(
  () => import('./AuthNavSection').then((mod) => mod.AuthNavSection),
  {
    ssr: false,
    loading: () => (
      <div className="ml-2 relative">
        <Button>Login</Button>
      </div>
    ),
  }
);

interface DesktopNavProps {
  onLoginClick: () => void;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ onLoginClick }) => {
  return (
    <nav className="hidden lg:flex items-center gap-1 xl:gap-3 ml-auto select-none">
      {/* Get the App */}
      <Link
        href="/app"
        className="group flex items-center gap-2 px-3 py-2 text-sm font-bold transition-all duration-200 rounded-xl"
        style={{ color: colorTokens.textPrimary }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = colorTokens.primaryContainer;
          e.currentTarget.style.backgroundColor = colorTokens.accentWarmTint;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = colorTokens.textPrimary;
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Smartphone
          className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
          style={{ color: colorTokens.primaryContainer }}
        />
        <span className="whitespace-nowrap">Get the App</span>
      </Link>

      {/* Vlog */}
      <Link
        href="/vlog"
        className="group flex items-center gap-2 px-3 py-2 text-sm font-bold transition-all duration-200 rounded-xl"
        style={{ color: colorTokens.textPrimary }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = colorTokens.primaryContainer;
          e.currentTarget.style.backgroundColor = colorTokens.accentWarmTint;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = colorTokens.textPrimary;
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Play
          className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
          style={{
            color: colorTokens.primaryContainer,
            fill: colorTokens.primaryContainer,
          }}
        />
        <span>Vlog</span>
        <span
          className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider text-white leading-none shadow-xs transition-transform duration-200 group-hover:scale-105"
          style={{ backgroundColor: colorTokens.primaryContainer }}
        >
          NEW
        </span>
      </Link>

      {/* Join us */}
      <div className="relative group">
        <button
          type="button"
          aria-haspopup="true"
          className="group/btn flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition-all duration-200 rounded-xl cursor-pointer border-0 bg-transparent"
          style={{ color: colorTokens.textPrimary }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colorTokens.primaryContainer;
            e.currentTarget.style.backgroundColor = colorTokens.accentWarmTint;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colorTokens.textPrimary;
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <span>Join us</span>
          <ChevronDown
            className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
            style={{ color: colorTokens.primaryContainer }}
          />
        </button>

        <JoinUsDropdown />
      </div>

      {/* Auth State: User Menu & Notification Bell OR Login Button */}
      <AuthNavSection onLoginClick={onLoginClick} />
    </nav>
  );
};
