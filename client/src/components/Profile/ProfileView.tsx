'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from './hooks';
import {
  ProfileSidebar,
  PassportCard,
  PassportStats,
  MyInformationCard,
  EditProfileModal,
} from './components';
import { BookingsTab } from './components/Bookings';
import { WishlistTab } from './components/Wishlist';
import { ReviewsTab } from './components/Reviews';
import { SettingsTab } from './components/Settings';
import { colorTokens } from '@/theme';

import { ProfileTabId } from './types';

interface ProfileViewProps {
  defaultTab?: ProfileTabId;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ defaultTab = 'profile' }) => {
  const {
    activeTab,
    setActiveTab,
    profileData,
    activeEditField,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    handleSaveField,
    handleLogout,
    userInitial,
  } = useProfile(defaultTab);

  const activeFieldValue = activeEditField
    ? profileData[activeEditField] || ''
    : '';

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#FAF7F5] font-jakarta flex flex-col lg:flex-row w-full relative">
      {/* Left Docked Navigation Sidebar with Solid White Background */}
      <ProfileSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        profileData={profileData}
        userInitial={userInitial}
      />

      {/* Main Content Area */}
      <div className="flex-1 w-full min-w-0 p-5 sm:p-7 lg:p-8 xl:p-10 relative overflow-hidden">
        {/* Decorative Faint Background Typography Watermark */}
        <div
          aria-hidden="true"
          className="absolute bottom-6 right-8 text-[120px] font-caveat font-bold text-gray-200/40 select-none pointer-events-none leading-none -z-0 hidden md:block"
        >
          traveldekho
        </div>

        <div className="w-full max-w-7xl 2xl:max-w-[1600px] relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="tab-profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Category Subtitle & Hero Headline */}
                <div className="mb-6 sm:mb-8">
                  <span
                    className="block text-[11px] sm:text-xs font-black uppercase tracking-[0.24em] mb-1"
                    style={{ color: colorTokens.primary }}
                  >
                    PERSONAL TRAVEL LOGS
                  </span>
                  <h1 className="flex items-baseline gap-2">
                    <span
                      className="font-caveat text-4xl sm:text-5xl font-bold tracking-normal"
                      style={{ color: colorTokens.primaryContainer }}
                    >
                      My
                    </span>
                    <span
                      className="font-black text-3xl sm:text-4xl tracking-tight uppercase"
                      style={{ color: colorTokens.primaryContainer }}
                    >
                      PASSPORT
                    </span>
                  </h1>
                </div>

                {/* 2-Column Dashboard Layout */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Left Column: Passport Card + Stats */}
                  <div className="w-full lg:w-[310px] shrink-0">
                    <PassportCard
                      profileData={profileData}
                      userInitial={userInitial}
                    />
                    <PassportStats
                      completedTrips={profileData.completedTrips}
                      reviewsWritten={profileData.reviewsWritten}
                    />
                  </div>

                  {/* Right Column: MY INFORMATION Card */}
                  <div className="flex-1 w-full min-w-0">
                    <MyInformationCard
                      profileData={profileData}
                      onEditField={openEditModal}
                      onLogout={handleLogout}
                      onNavigateToWishlist={() => setActiveTab('wishlist')}
                      onNavigateToBookings={() => setActiveTab('bookings')}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'bookings' && (
              <motion.div
                key="tab-bookings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <BookingsTab />
              </motion.div>
            )}

            {activeTab === 'wishlist' && (
              <motion.div
                key="tab-wishlist"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <WishlistTab />
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="tab-reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ReviewsTab />
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="tab-settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <SettingsTab
                  userName={profileData.fullName}
                  userPhone={profileData.phoneNumber}
                  userEmail={profileData.email}
                  onLogout={handleLogout}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Edit Profile Field Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        field={activeEditField}
        currentValue={activeFieldValue}
        onClose={closeEditModal}
        onSave={handleSaveField}
      />
    </main>
  );
};
