'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Camera,
  ShieldCheck,
  Star,
  Compass,
  Calendar,
  Image as ImageIcon,
  Check,
  X,
} from 'lucide-react';
import { partnerColors } from '@/theme/colors';
import { PartnerProfileData } from '../types';

interface ProfileBannerCardProps {
  profile: PartnerProfileData;
  onAvatarChange: (url: string) => void;
  onCoverChange: (url: string) => void;
}

const PRESET_COVERS = [
  { name: 'Zanskar Valley', url: '/trips/zanskar.png' },
  { name: 'Spiti Pass', url: '/trips/spiti.png' },
  { name: 'Ladakh Lake', url: '/trips/zanskar.png' },
];

const PRESET_AVATARS = [
  { name: 'Expedition Compass', url: '/trips/spiti.png' },
  { name: 'Peak Emblem', url: '/trips/zanskar.png' },
];

export const ProfileBannerCard: React.FC<ProfileBannerCardProps> = ({
  profile,
  onAvatarChange,
  onCoverChange,
}) => {
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [customCoverUrl, setCustomCoverUrl] = useState('');
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');

  return (
    <div
      className="rounded-2xl overflow-hidden border shadow-sm transition-all"
      style={{
        backgroundColor: partnerColors.surface,
        borderColor: partnerColors.border,
      }}
    >
      {/* Cover Image Section */}
      <div className="relative h-40 min-[480px]:h-48 sm:h-56 md:h-64 w-full bg-slate-900 overflow-hidden">
        {profile.coverImage ? (
          <Image
            src={profile.coverImage}
            alt={`${profile.companyName} Cover`}
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            priority
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: partnerColors.dark }}
          >
            <Compass className="w-10 h-10 sm:w-12 sm:h-12 opacity-20 text-white animate-compass-oscillate" />
          </div>
        )}

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Change Cover Photo Trigger */}
        <button
          type="button"
          onClick={() => setShowCoverModal(true)}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold text-white bg-black/55 hover:bg-black/75 backdrop-blur-md transition-all active:scale-95 cursor-pointer border border-white/20 shadow-xs"
        >
          <ImageIcon className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden min-[480px]:inline">Change Cover Photo</span>
          <span className="min-[480px]:hidden">Cover</span>
        </button>

        {/* Agency Tagline Pill on Banner */}
        {profile.tagline && (
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-6 hidden lg:block max-w-md text-right">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md border border-white/10 truncate">
              {profile.tagline}
            </span>
          </div>
        )}
      </div>

      {/* Profile Details & Stats Strip */}
      <div className="px-3.5 sm:px-6 md:px-8 pb-5 sm:pb-6 pt-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3.5 sm:gap-4 -mt-10 min-[480px]:-mt-12 sm:-mt-16 relative z-10 mb-4 sm:mb-5">
          {/* Avatar and Name */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-3 sm:gap-4 text-center sm:text-left min-w-0">
            {/* Avatar with Camera Overlay */}
            <div className="relative group shrink-0">
              <div
                className="w-20 h-20 min-[480px]:w-24 min-[480px]:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl border-4 overflow-hidden shadow-xl flex items-center justify-center relative transition-transform duration-300 group-hover:scale-102"
                style={{
                  backgroundColor: partnerColors.surfaceMuted,
                  borderColor: partnerColors.surface,
                }}
              >
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={profile.displayName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 96px, 128px"
                  />
                ) : (
                  <span
                    className="text-2xl min-[480px]:text-3xl sm:text-4xl font-black uppercase"
                    style={{ color: partnerColors.accent }}
                  >
                    {profile.displayName.charAt(0) || 'T'}
                  </span>
                )}
              </div>

              {/* Camera Trigger */}
              <button
                type="button"
                onClick={() => setShowAvatarModal(true)}
                className="absolute -bottom-1 -right-1 p-1.5 sm:p-2 rounded-xl text-white shadow-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: partnerColors.accent,
                  border: `2px solid ${partnerColors.surface}`,
                }}
                title="Update Agency Logo"
              >
                <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>

            {/* Agency Titles & Badges */}
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                <h2
                  className="text-lg min-[480px]:text-xl sm:text-2xl font-black tracking-tight truncate max-w-full"
                  style={{ color: partnerColors.dark }}
                >
                  {profile.companyName || profile.displayName}
                </h2>
                {profile.isVerified && (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: partnerColors.verifiedBg,
                      color: partnerColors.verifiedText,
                      border: `1px solid ${partnerColors.verifiedBorder}`,
                    }}
                  >
                    <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Verified
                  </span>
                )}
              </div>

              <p
                className="text-xs sm:text-sm font-semibold flex items-center justify-center sm:justify-start gap-1.5"
                style={{ color: partnerColors.textSecondary }}
              >
                <span className="truncate max-w-[160px] sm:max-w-none">@{profile.username}</span>
                <span>•</span>
                <span className="capitalize">{profile.city || 'India'}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Badges: responsive grid on mobile, flex on desktop */}
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 w-full md:w-auto pt-1 sm:pt-2 md:pt-0">
            {/* Rating */}
            <div
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-center border"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
              }}
            >
              <div
                className="text-xs sm:text-sm font-black flex items-center justify-center gap-1"
                style={{ color: partnerColors.dark }}
              >
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                <span>{profile.rating}</span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-bold truncate" style={{ color: partnerColors.textMuted }}>
                {profile.reviewsCount} Reviews
              </p>
            </div>

            {/* Trips Hosted */}
            <div
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-center border"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
              }}
            >
              <div
                className="text-xs sm:text-sm font-black flex items-center justify-center gap-1"
                style={{ color: partnerColors.dark }}
              >
                <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" style={{ color: partnerColors.accent }} />
                <span>{profile.tripsHosted}</span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-bold truncate" style={{ color: partnerColors.textMuted }}>
                Trips Hosted
              </p>
            </div>

            {/* Experience */}
            <div
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-center border"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
              }}
            >
              <div
                className="text-xs sm:text-sm font-black flex items-center justify-center gap-1"
                style={{ color: partnerColors.dark }}
              >
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" style={{ color: partnerColors.textSecondary }} />
                <span>{profile.yearsInBusiness || 5}+ Yrs</span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-bold truncate" style={{ color: partnerColors.textMuted }}>
                In Business
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Photo Modal */}
      {showCoverModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up">
          <div
            className="w-full max-w-md rounded-2xl p-4 sm:p-6 shadow-2xl border"
            style={{
              backgroundColor: partnerColors.surface,
              borderColor: partnerColors.border,
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="text-base font-black" style={{ color: partnerColors.dark }}>
                Select Cover Photo
              </h3>
              <button
                type="button"
                onClick={() => setShowCoverModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <p className="text-xs font-medium mb-3" style={{ color: partnerColors.textSecondary }}>
              Choose from recommended Himalayan banners or provide an image link:
            </p>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {PRESET_COVERS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onCoverChange(preset.url);
                    setShowCoverModal(false);
                  }}
                  className="group relative h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer hover:border-amber-500"
                  style={{
                    borderColor:
                      profile.coverImage === preset.url
                        ? partnerColors.accent
                        : partnerColors.border,
                  }}
                >
                  <Image src={preset.url} alt={preset.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                  <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-white truncate text-center">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label
                className="block text-[11px] font-black uppercase tracking-wider"
                style={{ color: partnerColors.textSecondary }}
              >
                Or Custom Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={customCoverUrl}
                  onChange={(e) => setCustomCoverUrl(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border outline-none font-medium"
                  style={{
                    backgroundColor: partnerColors.surfaceMuted,
                    borderColor: partnerColors.border,
                  }}
                />
                <button
                  type="button"
                  disabled={!customCoverUrl.trim()}
                  onClick={() => {
                    if (customCoverUrl.trim()) {
                      onCoverChange(customCoverUrl.trim());
                      setCustomCoverUrl('');
                      setShowCoverModal(false);
                    }
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-white transition-all disabled:opacity-50 cursor-pointer"
                  style={{ backgroundColor: partnerColors.accent }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up">
          <div
            className="w-full max-w-md rounded-2xl p-4 sm:p-6 shadow-2xl border"
            style={{
              backgroundColor: partnerColors.surface,
              borderColor: partnerColors.border,
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="text-base font-black" style={{ color: partnerColors.dark }}>
                Update Agency Logo
              </h3>
              <button
                type="button"
                onClick={() => setShowAvatarModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <p className="text-xs font-medium mb-3" style={{ color: partnerColors.textSecondary }}>
              Choose a preset or enter an image link:
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {PRESET_AVATARS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onAvatarChange(preset.url);
                    setShowAvatarModal(false);
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl border transition-all cursor-pointer hover:border-amber-500"
                  style={{
                    borderColor:
                      profile.avatar === preset.url
                        ? partnerColors.accent
                        : partnerColors.border,
                    backgroundColor: partnerColors.surfaceMuted,
                  }}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden relative shrink-0">
                    <Image src={preset.url} alt={preset.name} fill className="object-cover" />
                  </div>
                  <span className="text-xs font-bold text-left truncate">{preset.name}</span>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label
                className="block text-[11px] font-black uppercase tracking-wider"
                style={{ color: partnerColors.textSecondary }}
              >
                Or Custom Logo URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/logo.png"
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border outline-none font-medium"
                  style={{
                    backgroundColor: partnerColors.surfaceMuted,
                    borderColor: partnerColors.border,
                  }}
                />
                <button
                  type="button"
                  disabled={!customAvatarUrl.trim()}
                  onClick={() => {
                    if (customAvatarUrl.trim()) {
                      onAvatarChange(customAvatarUrl.trim());
                      setCustomAvatarUrl('');
                      setShowAvatarModal(false);
                    }
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-white transition-all disabled:opacity-50 cursor-pointer"
                  style={{ backgroundColor: partnerColors.accent }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
