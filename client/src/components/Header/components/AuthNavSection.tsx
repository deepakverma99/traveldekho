'use client';

import React from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { Button } from '@/components/shared';
import { useAppSelector, selectIsAuthenticated } from '@/redux';
import { UserMenuDropdown } from './UserMenuDropdown';

export interface AuthNavSectionProps {
  onLoginClick: () => void;
}

export const AuthNavSection: React.FC<AuthNavSectionProps> = ({ onLoginClick }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2.5 ml-2">
        {/* Notifications Bell */}
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200/90 flex items-center justify-center text-gray-700 hover:text-black hover:bg-gray-100 transition-colors shadow-xs"
        >
          <Bell className="w-4 h-4 stroke-[2.2]" />
        </Link>

        {/* User Profile Pill & Dropdown */}
        <UserMenuDropdown />
      </div>
    );
  }

  return (
    <div className="ml-2 relative">
      <Button onClick={onLoginClick}>Login</Button>
    </div>
  );
};

