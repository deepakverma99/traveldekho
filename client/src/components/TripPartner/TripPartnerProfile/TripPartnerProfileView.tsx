'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Save, RotateCcw } from 'lucide-react';
import { partnerColors } from '@/theme/colors';
import { TripPartnerProfileViewProps } from './types';
import { usePartnerProfile } from './hooks';
import {
  ProfileHeader,
  ProfileBannerCard,
  ProfileIdentitySection,
  ProfileContactSection,
  ProfileSocialSection,
  ProfileTrustBadgesSection,
} from './components';

export const TripPartnerProfileView: React.FC<TripPartnerProfileViewProps> = ({ username }) => {
  const {
    formData,
    isDirty,
    isSaving,
    toastMessage,
    updateField,
    updateSocial,
    toggleRegion,
    toggleBadge,
    handleAvatarChange,
    handleCoverChange,
    handleSave,
    handleReset,
  } = usePartnerProfile(username);

  return (
    <div
      className="max-w-7xl mx-auto w-full min-w-0 px-2.5 sm:px-4 md:px-6 pt-3.5 sm:pt-5 md:pt-6 pb-12 sm:pb-16 font-jakarta space-y-6 sm:space-y-8"
      style={{ color: partnerColors.textPrimary }}
    >
      {/* Profile Header */}
      <ProfileHeader username={formData.username} />

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="space-y-6 sm:space-y-8">
        {/* Banner, Logo & Quick Stats */}
        <ProfileBannerCard
          profile={formData}
          onAvatarChange={handleAvatarChange}
          onCoverChange={handleCoverChange}
        />

        {/* Agency Identity & Brand Story */}
        <ProfileIdentitySection
          profile={formData}
          updateField={updateField}
          toggleRegion={toggleRegion}
        />

        {/* Contact & Operations */}
        <ProfileContactSection profile={formData} updateField={updateField} />

        {/* Social Presence */}
        <ProfileSocialSection social={formData.social} updateSocial={updateSocial} />

        {/* Trust & Safety Badges */}
        <ProfileTrustBadgesSection
          badges={formData.trustBadges}
          toggleBadge={toggleBadge}
        />

        {/* Bottom Save Action Bar */}
        <div
          className="rounded-2xl p-4 sm:p-6 border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4 transition-all"
          style={{
            backgroundColor: partnerColors.surface,
            borderColor: partnerColors.border,
          }}
        >
          <div className="text-center sm:text-left space-y-0.5">
            <h4 className="text-sm font-black" style={{ color: partnerColors.dark }}>
              Ready to publish your partner profile?
            </h4>
            <p className="text-xs font-semibold" style={{ color: partnerColors.textSecondary }}>
              Updates are reflected instantly across your trip listings and public storefront.
            </p>
          </div>

          <div className="flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-end">
            {isDirty && (
              <button
                type="button"
                onClick={handleReset}
                disabled={isSaving}
                className="inline-flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-3.5 sm:px-4.5 rounded-xl text-xs sm:text-[13px] font-bold tracking-tight font-jakarta transition-all border active:scale-95 cursor-pointer w-full min-[480px]:w-auto hover:bg-red-50 hover:text-red-600 hover:border-red-200"
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
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-4 sm:px-5.5 rounded-xl text-xs sm:text-[13px] font-bold sm:font-extrabold tracking-tight font-jakarta cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-xs hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 w-full min-[480px]:w-auto group border"
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
                  <span className="group-hover:text-amber-300 transition-colors">Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl shadow-2xl border text-xs sm:text-sm font-bold"
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
