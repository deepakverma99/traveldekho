'use client';

import React from 'react';
import { useSettingsTab } from './hooks/useSettingsTab';
import { AccountOverviewCard } from './components/AccountOverviewCard';
import { NotificationsCard } from './components/NotificationsCard';
import { DangerZoneCard } from './components/DangerZoneCard';
import { CloseAccountModal } from './components/CloseAccountModal';
import { SettingsTabProps } from './types';
import { colorTokens } from '@/theme';

export const SettingsTab: React.FC<SettingsTabProps> = ({
  userName,
  userPhone,
  onLogout,
}) => {
  const {
    notifications,
    handleToggle,
    isCloseModalOpen,
    openCloseModal,
    closeCloseModal,
    handleConfirmCloseAccount,
  } = useSettingsTab(onLogout);

  return (
    <div className="w-full font-jakarta">
      {/* Category Subtitle & Hero Headline */}
      <div className="mb-6 sm:mb-8">
        <span
          className="block text-[11px] sm:text-xs font-black uppercase tracking-[0.24em] mb-1"
          style={{ color: colorTokens.primary }}
        >
          PREFERENCES &amp; SECURITY
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
            SETTINGS
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
          Manage account authentication, travel notifications, and data privacy.
        </p>
      </div>

      {/* 2-Column Settings Grid matching reference image */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* Left Column: Account Overview */}
        <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
          <AccountOverviewCard userName={userName} userPhone={userPhone} />
        </div>

        {/* Right Column: Notifications & Danger Zone */}
        <div className="flex-1 w-full min-w-0">
          <NotificationsCard
            notifications={notifications}
            onToggle={handleToggle}
          />
          <DangerZoneCard onOpenCloseAccount={openCloseModal} />
        </div>
      </div>

      {/* Delete / Close Account Modal */}
      <CloseAccountModal
        isOpen={isCloseModalOpen}
        onClose={closeCloseModal}
        onConfirm={handleConfirmCloseAccount}
      />
    </div>
  );
};

export default SettingsTab;
