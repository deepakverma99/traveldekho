'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProfileTabId, UserProfileData } from '../types';
import { PROFILE_NAV_ITEMS } from '../config/profileNav';
import { MiniPassportCard } from './MiniPassportCard';
import { colorTokens } from '@/theme';

interface ProfileSidebarProps {
  activeTab: ProfileTabId;
  onTabChange: (tab: ProfileTabId) => void;
  className?: string;
  profileData?: UserProfileData;
  userInitial?: string;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  activeTab,
  onTabChange,
  className = '',
  profileData,
  userInitial = 'D',
}) => {
  return (
    <aside
      aria-label="Profile navigation"
      className={`w-full lg:w-56 xl:w-60 shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-gray-200/80 p-3.5 sm:p-4 lg:px-3.5 lg:py-6 lg:min-h-[calc(100vh-80px)] ${className}`.trim()}
    >
      {/* Mini Passport Card rendered at the top when on non-profile tabs (Settings, Bookings, Wishlist, Reviews) */}
      {profileData && activeTab !== 'profile' && (
        <div className="hidden lg:block mb-4">
          <MiniPassportCard
            profileData={profileData}
            userInitial={userInitial}
          />
        </div>
      )}

      <nav className="flex lg:flex-col gap-1.5 sm:gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 scrollbar-hide">
        {PROFILE_NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTabChange(item.id)}
              className={`relative flex items-center gap-3 px-3.5 py-3 rounded-2xl text-[13.5px] tracking-tight transition-all duration-200 cursor-pointer select-none text-left shrink-0 lg:w-full ${
                isActive
                  ? 'text-white font-extrabold shadow-[0_10px_25px_-5px_rgba(255,87,34,0.38)]'
                  : 'text-gray-600 hover:text-gray-950 hover:bg-gray-50/90 font-semibold border border-transparent'
              }`}
              style={{
                backgroundColor: isActive ? colorTokens.primaryContainer : 'transparent',
                color: isActive ? '#ffffff' : undefined,
              }}
            >
              <Icon
                className={`w-4.5 h-4.5 shrink-0 stroke-[2.2] ${
                  isActive ? 'text-white' : 'text-gray-500'
                }`}
              />
              <span className="whitespace-nowrap text-inherit">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
};
