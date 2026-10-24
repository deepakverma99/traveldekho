'use client';

import React, { useState } from 'react';
import {
  Building2,
  User,
  AtSign,
  Quote,
  FileText,
  MapPin,
  Clock,
  Check,
  Plus,
  Copy,
  CheckCheck,
} from 'lucide-react';
import { partnerColors } from '@/theme/colors';
import { PartnerProfileData } from '../types';
import { POPULAR_OPERATING_REGIONS } from '../data';

interface ProfileIdentitySectionProps {
  profile: PartnerProfileData;
  updateField: <K extends keyof PartnerProfileData>(key: K, value: PartnerProfileData[K]) => void;
  toggleRegion: (region: string) => void;
}

export const ProfileIdentitySection: React.FC<ProfileIdentitySectionProps> = ({
  profile,
  updateField,
  toggleRegion,
}) => {
  const [copiedSlug, setCopiedSlug] = useState(false);
  const [newRegionInput, setNewRegionInput] = useState('');
  const [showAddCustomRegion, setShowAddCustomRegion] = useState(false);

  const handleCopySlug = () => {
    if (typeof window !== 'undefined') {
      const fullUrl = `${window.location.origin}/trip-partner/${profile.username}`;
      navigator.clipboard.writeText(fullUrl);
      setCopiedSlug(true);
      setTimeout(() => setCopiedSlug(false), 2000);
    }
  };

  const handleAddCustomRegion = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newRegionInput.trim();
    if (trimmed && !profile.operatingRegions.includes(trimmed)) {
      toggleRegion(trimmed);
      setNewRegionInput('');
      setShowAddCustomRegion(false);
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
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-4 border-b" style={{ borderColor: partnerColors.borderLight }}>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            backgroundColor: partnerColors.accentLight,
            color: partnerColors.accent,
          }}
        >
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-black tracking-tight" style={{ color: partnerColors.dark }}>
            Agency Identity & Brand Story
          </h3>
          <p className="text-xs font-semibold" style={{ color: partnerColors.textSecondary }}>
            Primary business details, URL slug, and regions where you operate trips.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Company / Registered Legal Name */}
        <div className="space-y-1.5">
          <label
            className="block text-xs font-black uppercase tracking-wider"
            style={{ color: partnerColors.textSecondary }}
          >
            Registered Agency / Legal Name <span style={{ color: partnerColors.accent }}>*</span>
          </label>
          <div className="relative">
            <Building2
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: partnerColors.textMuted }}
            />
            <input
              type="text"
              required
              value={profile.companyName}
              onChange={(e) => updateField('companyName', e.target.value)}
              placeholder="e.g. Travellr Times Expeditions Pvt Ltd"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
          </div>
          <p className="text-[11px] font-medium" style={{ color: partnerColors.textMuted }}>
            Appears on invoices, contracts, and official traveler receipts.
          </p>
        </div>

        {/* Public Display Name */}
        <div className="space-y-1.5">
          <label
            className="block text-xs font-black uppercase tracking-wider"
            style={{ color: partnerColors.textSecondary }}
          >
            Public Display Name <span style={{ color: partnerColors.accent }}>*</span>
          </label>
          <div className="relative">
            <User
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: partnerColors.textMuted }}
            />
            <input
              type="text"
              required
              value={profile.displayName}
              onChange={(e) => updateField('displayName', e.target.value)}
              placeholder="e.g. Travellr Times"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
          </div>
          <p className="text-[11px] font-medium" style={{ color: partnerColors.textMuted }}>
            The brand name shown to travelers on trip cards and tour listings.
          </p>
        </div>

        {/* Partner Handle / Route Slug */}
        <div className="space-y-1.5 md:col-span-2">
          <label
            className="block text-xs font-black uppercase tracking-wider"
            style={{ color: partnerColors.textSecondary }}
          >
            Partner URL Handle / Slug <span style={{ color: partnerColors.accent }}>*</span>
          </label>
          <div className="flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center gap-2">
            <div
              className="flex-1 flex items-center rounded-xl border overflow-hidden"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
              }}
            >
              <span
                className="px-2.5 sm:px-3.5 py-2.5 sm:py-3 text-[11px] sm:text-xs font-bold border-r select-none whitespace-nowrap"
                style={{
                  backgroundColor: partnerColors.surfaceSubtle,
                  borderColor: partnerColors.border,
                  color: partnerColors.textSecondary,
                }}
              >
                /trip-partner/
              </span>
              <div className="relative flex-1 min-w-0">
                <AtSign
                  className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                  style={{ color: partnerColors.textMuted }}
                />
                <input
                  type="text"
                  required
                  value={profile.username}
                  onChange={(e) =>
                    updateField(
                      'username',
                      e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, '')
                    )
                  }
                  placeholder="travellr"
                  className="w-full pl-8 sm:pl-9 pr-3 py-2.5 sm:py-3 text-xs sm:text-sm font-bold bg-transparent outline-none truncate"
                  style={{ color: partnerColors.textPrimary }}
                />
              </div>
            </div>

            {/* Quick copy storefront URL button */}
            <button
              type="button"
              onClick={handleCopySlug}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs font-bold transition-all border active:scale-95 cursor-pointer shrink-0 w-full min-[480px]:w-auto"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
              title="Copy complete storefront link"
            >
              {copiedSlug ? (
                <>
                  <CheckCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" style={{ color: partnerColors.textSecondary }} />
                  <span>Copy Storefront URL</span>
                </>
              )}
            </button>
          </div>
          <p className="text-[11px] font-medium" style={{ color: partnerColors.textMuted }}>
            Used for your public storefront link and partner dashboard sign-in. Changing this will
            update your portal URL.
          </p>
        </div>

        {/* Tagline */}
        <div className="space-y-1.5 md:col-span-2">
          <label
            className="block text-xs font-black uppercase tracking-wider"
            style={{ color: partnerColors.textSecondary }}
          >
            Brand Tagline / Hook
          </label>
          <div className="relative">
            <Quote
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: partnerColors.textMuted }}
            />
            <input
              type="text"
              value={profile.tagline}
              onChange={(e) => updateField('tagline', e.target.value)}
              placeholder="e.g. Authentic Himalayan expeditions, high-altitude treks & scout-verified offbeat tours"
              maxLength={120}
              className="w-full pl-10 pr-14 py-3 rounded-xl text-xs sm:text-sm font-semibold border outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
            <span
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold"
              style={{ color: partnerColors.textMuted }}
            >
              {profile.tagline.length}/120
            </span>
          </div>
        </div>

        {/* Bio / About */}
        <div className="space-y-1.5 md:col-span-2">
          <div className="flex items-center justify-between">
            <label
              className="block text-xs font-black uppercase tracking-wider"
              style={{ color: partnerColors.textSecondary }}
            >
              Agency Bio & Exploration Philosophy
            </label>
            <span className="text-[11px] font-bold" style={{ color: partnerColors.textMuted }}>
              {profile.bio.length} characters
            </span>
          </div>
          <div className="relative">
            <FileText
              className="absolute left-3.5 top-3.5 w-4 h-4"
              style={{ color: partnerColors.textMuted }}
            />
            <textarea
              rows={4}
              value={profile.bio}
              onChange={(e) => updateField('bio', e.target.value)}
              placeholder="Tell travelers about your mountain guides, basecamp locations, safety ethics, and handcrafted itineraries..."
              className="w-full pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm font-medium border outline-none transition-all focus:ring-2 resize-y"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
          </div>
          <p className="text-[11px] font-medium" style={{ color: partnerColors.textMuted }}>
            A compelling story builds trust and significantly increases booking inquiry conversions.
          </p>
        </div>

        {/* Years in Business */}
        <div className="space-y-1.5">
          <label
            className="block text-xs font-black uppercase tracking-wider"
            style={{ color: partnerColors.textSecondary }}
          >
            Years in Business / Industry Experience
          </label>
          <div className="relative">
            <Clock
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: partnerColors.textMuted }}
            />
            <input
              type="number"
              min={1}
              max={50}
              value={profile.yearsInBusiness}
              onChange={(e) => updateField('yearsInBusiness', Number(e.target.value) || 1)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
          </div>
        </div>

        {/* Operating Regions Selector */}
        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center justify-between">
            <label
              className="block text-xs font-black uppercase tracking-wider"
              style={{ color: partnerColors.textSecondary }}
            >
              Primary Operating Regions / Circuits
            </label>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: partnerColors.accentLight,
                color: partnerColors.accentBadgeText,
              }}
            >
              {profile.operatingRegions.length} Active
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {POPULAR_OPERATING_REGIONS.map((region) => {
              const isSelected = profile.operatingRegions.includes(region);
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => toggleRegion(region)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border active:scale-95"
                  style={{
                    backgroundColor: isSelected
                      ? partnerColors.accentLight
                      : partnerColors.surfaceMuted,
                    borderColor: isSelected
                      ? partnerColors.accent
                      : partnerColors.border,
                    color: isSelected
                      ? partnerColors.accentBadgeText
                      : partnerColors.textSecondary,
                  }}
                >
                  <MapPin className="w-3 h-3" />
                  <span>{region}</span>
                  {isSelected && <Check className="w-3 h-3 text-amber-600" />}
                </button>
              );
            })}

            {/* Custom Added Regions */}
            {profile.operatingRegions
              .filter((r) => !POPULAR_OPERATING_REGIONS.includes(r))
              .map((custom) => (
                <button
                  key={custom}
                  type="button"
                  onClick={() => toggleRegion(custom)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border"
                  style={{
                    backgroundColor: partnerColors.accentLight,
                    borderColor: partnerColors.accent,
                    color: partnerColors.accentBadgeText,
                  }}
                >
                  <MapPin className="w-3 h-3" />
                  <span>{custom}</span>
                  <Check className="w-3 h-3 text-amber-600" />
                </button>
              ))}

            {/* Add Custom Region Button */}
            {!showAddCustomRegion ? (
              <button
                type="button"
                onClick={() => setShowAddCustomRegion(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border border-dashed transition-all hover:border-solid cursor-pointer"
                style={{
                  backgroundColor: partnerColors.surface,
                  borderColor: partnerColors.border,
                  color: partnerColors.textMuted,
                }}
              >
                <Plus className="w-3 h-3" />
                <span>Add Other</span>
              </button>
            ) : (
              <form onSubmit={handleAddCustomRegion} className="flex items-center gap-1.5">
                <input
                  type="text"
                  autoFocus
                  placeholder="e.g. Zanskar"
                  value={newRegionInput}
                  onChange={(e) => setNewRegionInput(e.target.value)}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg border outline-none"
                  style={{
                    backgroundColor: partnerColors.surface,
                    borderColor: partnerColors.accent,
                  }}
                />
                <button
                  type="submit"
                  disabled={!newRegionInput.trim()}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg text-white disabled:opacity-50 cursor-pointer"
                  style={{ backgroundColor: partnerColors.accent }}
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddCustomRegion(false)}
                  className="text-xs px-1.5 py-1 text-gray-400 hover:text-gray-600"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
