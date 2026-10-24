'use client';

import React from 'react';
import Link from 'next/link';
import { User, Mail, Phone, Building2, ExternalLink, ShieldCheck } from 'lucide-react';
import { partnerColors } from '@/theme/colors';

interface ProfileAccountSectionProps {
  username: string;
}

export const ProfileAccountSection: React.FC<ProfileAccountSectionProps> = ({ username }) => {
  return (
    <div
      className="rounded-2xl p-4 sm:p-6 md:p-8 border shadow-xs transition-all space-y-6 font-jakarta"
      style={{
        backgroundColor: partnerColors.surface,
        borderColor: partnerColors.border,
      }}
    >
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b gap-3"
        style={{ borderColor: partnerColors.borderLight }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: partnerColors.accentLight,
              color: partnerColors.accent,
            }}
          >
            <User className="w-5 h-5 stroke-[2.25]" />
          </div>
          <div>
            <h3
              className="text-base sm:text-lg font-black tracking-tight"
              style={{ color: partnerColors.dark }}
            >
              Account & Profile Details
            </h3>
            <p className="text-xs font-semibold" style={{ color: partnerColors.textSecondary }}>
              Primary partner credentials, contact points, and public storefront link.
            </p>
          </div>
        </div>

        <Link
          href={`/trip-partner/${username}/profile`}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all duration-150 hover:bg-slate-50 cursor-pointer w-full min-[480px]:w-auto self-start sm:self-auto active:scale-95 shadow-2xs shrink-0"
          style={{
            backgroundColor: partnerColors.surface,
            borderColor: partnerColors.border,
            color: partnerColors.dark,
          }}
        >
          <span>Edit Public Profile</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>
      </div>

      {/* Account Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Agency Name */}
        <div
          className="p-3.5 rounded-xl border space-y-1"
          style={{
            backgroundColor: partnerColors.surfaceMuted,
            borderColor: partnerColors.border,
          }}
        >
          <div className="flex items-center gap-1.5 text-slate-400">
            <Building2 className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-wider">
              Agency Name
            </span>
          </div>
          <p className="text-xs sm:text-[13px] font-bold text-slate-800 truncate">
            Travellr Times Expeditions
          </p>
        </div>

        {/* Username / Handle */}
        <div
          className="p-3.5 rounded-xl border space-y-1"
          style={{
            backgroundColor: partnerColors.surfaceMuted,
            borderColor: partnerColors.border,
          }}
        >
          <div className="flex items-center gap-1.5 text-slate-400">
            <User className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-wider">
              Partner Handle
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <p className="text-xs sm:text-[13px] font-bold text-slate-800 font-mono">
              @{username}
            </p>
            <span
              className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-black"
              style={{
                backgroundColor: partnerColors.verifiedBg,
                color: partnerColors.verifiedText,
              }}
            >
              <ShieldCheck className="w-2.5 h-2.5" />
              Verified
            </span>
          </div>
        </div>

        {/* Primary Contact Email */}
        <div
          className="p-3.5 rounded-xl border space-y-1"
          style={{
            backgroundColor: partnerColors.surfaceMuted,
            borderColor: partnerColors.border,
          }}
        >
          <div className="flex items-center gap-1.5 text-slate-400">
            <Mail className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-wider">
              Contact Email
            </span>
          </div>
          <p className="text-xs sm:text-[13px] font-bold text-slate-800 truncate">
            partner@{username}.com
          </p>
        </div>

        {/* Primary Phone */}
        <div
          className="p-3.5 rounded-xl border space-y-1"
          style={{
            backgroundColor: partnerColors.surfaceMuted,
            borderColor: partnerColors.border,
          }}
        >
          <div className="flex items-center gap-1.5 text-slate-400">
            <Phone className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-wider">
              Registered Phone
            </span>
          </div>
          <p className="text-xs sm:text-[13px] font-bold text-slate-800 truncate">
            +91 98765 43210
          </p>
        </div>
      </div>
    </div>
  );
};
