'use client';

import React from 'react';
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Building,
  ShieldCheck,
  FileCheck2,
} from 'lucide-react';
import { partnerColors } from '@/theme/colors';
import { PartnerProfileData } from '../types';

interface ProfileContactSectionProps {
  profile: PartnerProfileData;
  updateField: <K extends keyof PartnerProfileData>(key: K, value: PartnerProfileData[K]) => void;
}

export const ProfileContactSection: React.FC<ProfileContactSectionProps> = ({
  profile,
  updateField,
}) => {
  const handleCopyPhoneToWhatsApp = () => {
    updateField('whatsapp', profile.phone);
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
            backgroundColor: partnerColors.accentLight,
            color: partnerColors.accent,
          }}
        >
          <Phone className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-black tracking-tight" style={{ color: partnerColors.dark }}>
            Contact & Basecamp Operations
          </h3>
          <p className="text-xs font-semibold" style={{ color: partnerColors.textSecondary }}>
            Official communication channels used for traveler support and booking confirmations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Email */}
        <div className="space-y-1.5">
          <label
            className="block text-xs font-black uppercase tracking-wider"
            style={{ color: partnerColors.textSecondary }}
          >
            Business Email <span style={{ color: partnerColors.accent }}>*</span>
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: partnerColors.textMuted }}
            />
            <input
              type="email"
              required
              value={profile.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="e.g. operations@travellr.in"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
          </div>
          <p className="text-[11px] font-medium" style={{ color: partnerColors.textMuted }}>
            Booking alerts, date inquiries, and monthly settlements are sent here.
          </p>
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label
            className="block text-xs font-black uppercase tracking-wider"
            style={{ color: partnerColors.textSecondary }}
          >
            Direct Phone Number <span style={{ color: partnerColors.accent }}>*</span>
          </label>
          <div className="relative">
            <Phone
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: partnerColors.textMuted }}
            />
            <input
              type="tel"
              required
              value={profile.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
          </div>
          <p className="text-[11px] font-medium" style={{ color: partnerColors.textMuted }}>
            For emergency coordinator contact during active departures.
          </p>
        </div>

        {/* WhatsApp with 'Same as Phone' helper */}
        <div className="space-y-1.5 md:col-span-2">
          <div className="flex items-center justify-between">
            <label
              className="block text-xs font-black uppercase tracking-wider"
              style={{ color: partnerColors.textSecondary }}
            >
              WhatsApp Support Number
            </label>
            {profile.phone && profile.whatsapp !== profile.phone && (
              <button
                type="button"
                onClick={handleCopyPhoneToWhatsApp}
                className="text-[11px] font-bold underline cursor-pointer hover:opacity-80"
                style={{ color: partnerColors.accent }}
              >
                Same as phone
              </button>
            )}
          </div>
          <div className="relative">
            <MessageCircle
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500"
            />
            <input
              type="tel"
              value={profile.whatsapp}
              onChange={(e) => updateField('whatsapp', e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
          </div>
          <p className="text-[11px] font-medium" style={{ color: partnerColors.textMuted }}>
            Customers can reach your desk directly for itinerary clarifications.
          </p>
        </div>

        {/* Physical Address / Basecamp */}
        <div className="space-y-1.5 md:col-span-2">
          <label
            className="block text-xs font-black uppercase tracking-wider"
            style={{ color: partnerColors.textSecondary }}
          >
            Basecamp Office / Street Address
          </label>
          <div className="relative">
            <MapPin
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: partnerColors.textMuted }}
            />
            <input
              type="text"
              value={profile.address}
              onChange={(e) => updateField('address', e.target.value)}
              placeholder="e.g. Suite 402, High Pass Tower, Old Manali Road"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
          </div>
        </div>

        {/* City, State, Pincode Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:col-span-2">
          {/* City */}
          <div className="space-y-1.5">
            <label
              className="block text-xs font-black uppercase tracking-wider"
              style={{ color: partnerColors.textSecondary }}
            >
              City / Base
            </label>
            <input
              type="text"
              value={profile.city}
              onChange={(e) => updateField('city', e.target.value)}
              placeholder="e.g. Manali"
              className="w-full px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold border outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
          </div>

          {/* State */}
          <div className="space-y-1.5">
            <label
              className="block text-xs font-black uppercase tracking-wider"
              style={{ color: partnerColors.textSecondary }}
            >
              State / UT
            </label>
            <input
              type="text"
              value={profile.state}
              onChange={(e) => updateField('state', e.target.value)}
              placeholder="e.g. Himachal Pradesh"
              className="w-full px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold border outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
          </div>

          {/* Pincode */}
          <div className="space-y-1.5">
            <label
              className="block text-xs font-black uppercase tracking-wider"
              style={{ color: partnerColors.textSecondary }}
            >
              Pincode
            </label>
            <input
              type="text"
              value={profile.pincode}
              onChange={(e) => updateField('pincode', e.target.value)}
              placeholder="e.g. 175131"
              maxLength={6}
              className="w-full px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold border outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
          </div>
        </div>

        {/* GSTIN / Legal ID */}
        <div className="space-y-1.5 md:col-span-2 pt-2">
          <label
            className="block text-xs font-black uppercase tracking-wider"
            style={{ color: partnerColors.textSecondary }}
          >
            GSTIN / Business Registration Number
          </label>
          <div className="relative">
            <FileCheck2
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: partnerColors.textMuted }}
            />
            <input
              type="text"
              value={profile.gstin || ''}
              onChange={(e) => updateField('gstin', e.target.value.toUpperCase())}
              placeholder="e.g. 02AABCT1234F1Z5"
              maxLength={15}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold tracking-wider border outline-none transition-all focus:ring-2 uppercase"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: partnerColors.textMuted }}>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>
              Encrypted & stored strictly for verified B2B GST tax credit invoicing.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
