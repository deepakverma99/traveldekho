'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Save, RotateCcw } from 'lucide-react';
import { partnerColors } from '@/theme/colors';
import { TripPartnerSettingsViewProps } from './types';
import { usePartnerSettings } from './hooks';
import {
  SettingsHeader,
  SettingsTabBar,
  ProfileAccountSection,
  NotificationPreferencesSection,
  SecuritySection,
  KycStatusSection,
} from './components';


export const TripPartnerSettingsView: React.FC<TripPartnerSettingsViewProps> = ({ username }) => {
  const {
    settings,
    activeTab,
    setActiveTab,
    isDirty,
    isSaving,
    toastMessage,
    updateBankDetails,
    toggleNotification,
    updatePolicy,
    toggleTwoFactor,
    setKycRegistrationType,
    updateKycFile,
    updateCompanyGst,
    handleSave,
    handleReset,
  } = usePartnerSettings(username);


  const renderSaveBar = (title: string, subtitle: string) => (
    <div
      className="w-full rounded-2xl p-3.5 sm:p-5 md:p-6 border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 transition-all"
      style={{
        backgroundColor: partnerColors.surface,
        borderColor: partnerColors.border,
      }}
    >
      <div className="text-center sm:text-left space-y-0.5 w-full sm:w-auto min-w-0">
        <h4 className="text-xs sm:text-sm font-black tracking-tight" style={{ color: partnerColors.dark }}>
          {title}
        </h4>
        <p className="text-[11px] sm:text-xs font-semibold leading-relaxed" style={{ color: partnerColors.textSecondary }}>
          {subtitle}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end shrink-0">
        {isDirty && (
          <button
            type="button"
            onClick={handleReset}
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 sm:py-2 px-4 rounded-xl text-xs sm:text-[13px] font-bold tracking-tight font-jakarta transition-all border active:scale-95 cursor-pointer w-full sm:w-auto hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            style={{
              backgroundColor: partnerColors.surfaceMuted,
              borderColor: partnerColors.border,
              color: partnerColors.textSecondary,
            }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Discard Changes</span>
          </button>
        )}

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-2.5 px-4.5 sm:px-5.5 rounded-xl text-xs sm:text-[13px] font-bold sm:font-extrabold tracking-tight font-jakarta cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-xs hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 w-full sm:w-auto group border"
          style={{
            backgroundColor: partnerColors.dark,
            borderColor: partnerColors.accentBorder,
            color: partnerColors.textInverse,
          }}
        >
          {isSaving ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
              <span className="text-amber-300">Saving Updates...</span>
            </>
          ) : (
            <>
              <Save
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.25] transition-colors group-hover:scale-105"
                style={{ color: partnerColors.accent }}
              />
              <span className="group-hover:text-amber-300 transition-colors">
                Save Settings
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="max-w-7xl mx-auto w-full min-w-0 px-3 sm:px-4 md:px-6 lg:px-8 pt-3 sm:pt-4 md:pt-6 pb-12 sm:pb-16 font-jakarta space-y-4 sm:space-y-6 md:space-y-8"
      style={{ color: partnerColors.textPrimary }}
    >
      {/* Settings Page Header */}
      <SettingsHeader username={username} />

      {/* Tab Bar directly below header: Profile Setting, Notification Setting, KYC Status */}
      <SettingsTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        {activeTab === 'profile' && (
          <motion.div
            key="tab-panel-profile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="w-full min-w-0"
          >
            <form onSubmit={handleSave} className="w-full min-w-0 space-y-4 sm:space-y-6 md:space-y-8">
              {/* Partner Account & Profile Summary */}
              <ProfileAccountSection username={username} />

              {/* Security & Access Management */}
              <SecuritySection
                security={settings.security}
                toggleTwoFactor={toggleTwoFactor}
              />

              {/* Bottom Save Action Bar */}
              {renderSaveBar(
                'Save Account Preferences?',
                'Account and password credentials update immediately.'
              )}
            </form>
          </motion.div>
        )}

        {activeTab === 'notifications' && (
          <motion.div
            key="tab-panel-notifications"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="w-full min-w-0"
          >
            <form onSubmit={handleSave} className="w-full min-w-0 space-y-4 sm:space-y-6 md:space-y-8">
              {/* Notification Channels & Broadcasts */}
              <NotificationPreferencesSection
                notifications={settings.notifications}
                toggleNotification={toggleNotification}
              />

              {/* Bottom Save Action Bar */}
              {renderSaveBar(
                'Save Notification Preferences?',
                'Email notification preferences will update immediately.'
              )}
            </form>
          </motion.div>
        )}

        {activeTab === 'kyc' && (
          <motion.div
            key="tab-panel-kyc"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="w-full min-w-0"
          >
            <KycStatusSection
              kyc={settings.kyc}
              onUpdateRegistrationType={setKycRegistrationType}
              onUpdateFile={updateKycFile}
              onUpdateCompanyGst={updateCompanyGst}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl shadow-2xl border text-xs sm:text-sm font-bold max-w-md mx-auto sm:mx-0"
            style={{
              backgroundColor: partnerColors.dark,
              borderColor: partnerColors.borderFocus,
              color: partnerColors.textInverse,
            }}
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

