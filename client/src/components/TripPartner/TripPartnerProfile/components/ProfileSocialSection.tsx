'use client';

import React from 'react';
import {
  Globe,
  ExternalLink,
  Share2,
} from 'lucide-react';
import { partnerColors } from '@/theme/colors';
import { PartnerProfileData } from '../types';

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

interface ProfileSocialSectionProps {
  social: PartnerProfileData['social'];
  updateSocial: (key: keyof PartnerProfileData['social'], value: string) => void;
}

export const ProfileSocialSection: React.FC<ProfileSocialSectionProps> = ({
  social,
  updateSocial,
}) => {
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
            backgroundColor: partnerColors.accentLight,
            color: partnerColors.accent,
          }}
        >
          <Share2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-black tracking-tight" style={{ color: partnerColors.dark }}>
            Online Presence & Social Handles
          </h3>
          <p className="text-xs font-semibold" style={{ color: partnerColors.textSecondary }}>
            Provide public handles where travelers can inspect real tour photos and testimonials.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Website */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              className="block text-xs font-black uppercase tracking-wider"
              style={{ color: partnerColors.textSecondary }}
            >
              Agency Website
            </label>
            {social?.website && (
              <a
                href={social.website}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold flex items-center gap-1 hover:underline"
                style={{ color: partnerColors.accent }}
              >
                <span>Visit</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <div className="relative">
            <Globe
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: partnerColors.textMuted }}
            />
            <input
              type="url"
              value={social?.website || ''}
              onChange={(e) => updateSocial('website', e.target.value)}
              placeholder="https://travellrtimes.in"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
          </div>
        </div>

        {/* Instagram */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              className="block text-xs font-black uppercase tracking-wider"
              style={{ color: partnerColors.textSecondary }}
            >
              Instagram Profile / Handle
            </label>
            {social?.instagram && (
              <a
                href={
                  social.instagram.startsWith('http')
                    ? social.instagram
                    : `https://instagram.com/${social.instagram.replace('@', '')}`
                }
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold flex items-center gap-1 hover:underline"
                style={{ color: partnerColors.accent }}
              >
                <span>Open</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <div className="relative">
            <InstagramIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-500" />
            <input
              type="text"
              value={social?.instagram || ''}
              onChange={(e) => updateSocial('instagram', e.target.value)}
              placeholder="https://instagram.com/travellrtimes"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
          </div>
        </div>

        {/* YouTube */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              className="block text-xs font-black uppercase tracking-wider"
              style={{ color: partnerColors.textSecondary }}
            >
              YouTube Channel
            </label>
            {social?.youtube && (
              <a
                href={social.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold flex items-center gap-1 hover:underline"
                style={{ color: partnerColors.accent }}
              >
                <span>Watch</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <div className="relative">
            <YoutubeIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
            <input
              type="url"
              value={social?.youtube || ''}
              onChange={(e) => updateSocial('youtube', e.target.value)}
              placeholder="https://youtube.com/@travellrtimes"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
          </div>
        </div>

        {/* Facebook */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              className="block text-xs font-black uppercase tracking-wider"
              style={{ color: partnerColors.textSecondary }}
            >
              Facebook Community Page
            </label>
            {social?.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold flex items-center gap-1 hover:underline"
                style={{ color: partnerColors.accent }}
              >
                <span>View</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <div className="relative">
            <FacebookIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
            <input
              type="url"
              value={social?.facebook || ''}
              onChange={(e) => updateSocial('facebook', e.target.value)}
              placeholder="https://facebook.com/travellrtimes"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
