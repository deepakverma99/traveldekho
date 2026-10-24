'use client';

import React from 'react';
import {
  ShieldCheck,
  Award,
  Compass,
  Headphones,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { partnerColors } from '@/theme/colors';
import { PartnerProfileData } from '../types';

interface ProfileTrustBadgesSectionProps {
  badges?: PartnerProfileData['trustBadges'];
  toggleBadge: (badgeId: string) => void;
}

export const ProfileTrustBadgesSection: React.FC<ProfileTrustBadgesSectionProps> = ({
  badges = [],
  toggleBadge,
}) => {
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case 'Award':
        return <Award className="w-5 h-5 text-amber-500" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-blue-500" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5 text-purple-500" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div
      className="rounded-2xl p-4 sm:p-6 md:p-8 border shadow-sm space-y-5 sm:space-y-6"
      style={{
        backgroundColor: partnerColors.surface,
        borderColor: partnerColors.border,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b" style={{ borderColor: partnerColors.borderLight }}>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            backgroundColor: partnerColors.verifiedBg,
            color: partnerColors.verifiedText,
          }}
        >
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-black tracking-tight" style={{ color: partnerColors.dark }}>
            Trust & Safety Certifications
          </h3>
          <p className="text-xs font-semibold" style={{ color: partnerColors.textSecondary }}>
            Verified badges displayed prominently to travelers on your trip detail pages.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {badges.map((badge) => {
          return (
            <div
              key={badge.id}
              className="p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start justify-between gap-2.5 sm:gap-3"
              style={{
                backgroundColor: badge.enabled
                  ? partnerColors.surface
                  : partnerColors.surfaceMuted,
                borderColor: badge.enabled
                  ? partnerColors.verifiedBorder
                  : partnerColors.border,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2.5 rounded-xl shrink-0"
                  style={{
                    backgroundColor: badge.enabled
                      ? partnerColors.verifiedBg
                      : partnerColors.surfaceSubtle,
                  }}
                >
                  {getBadgeIcon(badge.iconName)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4
                      className="text-xs sm:text-sm font-bold"
                      style={{
                        color: badge.enabled
                          ? partnerColors.dark
                          : partnerColors.textMuted,
                      }}
                    >
                      {badge.title}
                    </h4>
                    {badge.enabled && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: partnerColors.verifiedBg,
                          color: partnerColors.verifiedText,
                        }}
                      >
                        Active
                      </span>
                    )}
                  </div>
                  <p
                    className="text-[11px] font-medium leading-relaxed"
                    style={{
                      color: badge.enabled
                        ? partnerColors.textSecondary
                        : partnerColors.textMuted,
                    }}
                  >
                    {badge.description}
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => toggleBadge(badge.id)}
                className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                style={{
                  backgroundColor: badge.enabled
                    ? partnerColors.verified
                    : partnerColors.border,
                }}
                role="switch"
                aria-checked={badge.enabled}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    badge.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div
        className="p-4 rounded-xl flex items-start gap-2.5 text-xs font-medium"
        style={{
          backgroundColor: partnerColors.surfaceMuted,
          color: partnerColors.textSecondary,
          border: `1px solid ${partnerColors.border}`,
        }}
      >
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: partnerColors.accent }} />
        <span>
          Verification audits are periodically conducted by TravelDekho scout team. Ensure your
          agency licenses and mountain guide IMF certificates remain active.
        </span>
      </div>
    </div>
  );
};
