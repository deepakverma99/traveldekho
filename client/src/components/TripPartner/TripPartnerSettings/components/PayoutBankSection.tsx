'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Building,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { partnerColors } from '@/theme/colors';
import { PartnerBankDetails } from '../types';
import { SUPPORTED_BANKS, PAYOUT_SCHEDULE_OPTIONS } from '../data';

interface PayoutBankSectionProps {
  bankDetails: PartnerBankDetails;
  updateBankDetails: <K extends keyof PartnerBankDetails>(
    key: K,
    value: PartnerBankDetails[K]
  ) => void;
}

export const PayoutBankSection: React.FC<PayoutBankSectionProps> = ({
  bankDetails,
  updateBankDetails,
}) => {
  const [showAccountNumber, setShowAccountNumber] = useState(false);

  return (
    <div
      className="rounded-2xl p-4 sm:p-6 md:p-8 border shadow-sm space-y-6"
      style={{
        backgroundColor: partnerColors.surface,
        borderColor: partnerColors.border,
      }}
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: partnerColors.borderLight }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: partnerColors.accentLight,
              color: partnerColors.accent,
            }}
          >
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black tracking-tight" style={{ color: partnerColors.dark }}>
              Payout Bank Account & Settlements
            </h3>
            <p className="text-xs font-semibold" style={{ color: partnerColors.textSecondary }}>
              Direct deposit destination for booking revenues and traveler tour payouts.
            </p>
          </div>
        </div>

        {/* Verification Status Pill */}
        {bankDetails.isVerified && (
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold self-start sm:self-auto shrink-0"
            style={{
              backgroundColor: partnerColors.verifiedBg,
              color: partnerColors.verifiedText,
              border: `1px solid ${partnerColors.verifiedBorder}`,
            }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Active & Verified</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Account Holder Name */}
        <div className="space-y-1.5">
          <label
            className="block text-xs font-black uppercase tracking-wider"
            style={{ color: partnerColors.textSecondary }}
          >
            Beneficiary / Account Holder Name <span style={{ color: partnerColors.accent }}>*</span>
          </label>
          <div className="relative">
            <Building
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: partnerColors.textMuted }}
            />
            <input
              type="text"
              required
              value={bankDetails.accountHolderName}
              onChange={(e) => updateBankDetails('accountHolderName', e.target.value)}
              placeholder="e.g. Travellr Times Expeditions Pvt Ltd"
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold border outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
          </div>
          <p className="text-[11px] font-medium" style={{ color: partnerColors.textMuted }}>
            Must match your registered business entity or PAN name.
          </p>
        </div>

        {/* Bank Name */}
        <div className="space-y-1.5">
          <label
            className="block text-xs font-black uppercase tracking-wider"
            style={{ color: partnerColors.textSecondary }}
          >
            Bank Name <span style={{ color: partnerColors.accent }}>*</span>
          </label>
          <select
            value={bankDetails.bankName}
            onChange={(e) => updateBankDetails('bankName', e.target.value)}
            className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold border outline-none transition-all focus:ring-2 cursor-pointer"
            style={{
              backgroundColor: partnerColors.surfaceMuted,
              borderColor: partnerColors.border,
              color: partnerColors.textPrimary,
            }}
          >
            {SUPPORTED_BANKS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <p className="text-[11px] font-medium" style={{ color: partnerColors.textMuted }}>
            Direct IMPS/NEFT settlements supported for all major Indian banks.
          </p>
        </div>

        {/* Account Number */}
        <div className="space-y-1.5">
          <label
            className="block text-xs font-black uppercase tracking-wider"
            style={{ color: partnerColors.textSecondary }}
          >
            Bank Account Number <span style={{ color: partnerColors.accent }}>*</span>
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: partnerColors.textMuted }}
            />
            <input
              type={showAccountNumber ? 'text' : 'password'}
              required
              value={bankDetails.accountNumber}
              onChange={(e) => updateBankDetails('accountNumber', e.target.value)}
              placeholder="Enter Account Number"
              className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-mono font-bold tracking-wider border outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: partnerColors.surfaceMuted,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            />
            <button
              type="button"
              onClick={() => setShowAccountNumber(!showAccountNumber)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
              title={showAccountNumber ? 'Hide account number' : 'Show account number'}
            >
              {showAccountNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* IFSC Code */}
        <div className="space-y-1.5">
          <label
            className="block text-xs font-black uppercase tracking-wider"
            style={{ color: partnerColors.textSecondary }}
          >
            IFSC Code <span style={{ color: partnerColors.accent }}>*</span>
          </label>
          <input
            type="text"
            required
            maxLength={11}
            value={bankDetails.ifscCode}
            onChange={(e) => updateBankDetails('ifscCode', e.target.value.toUpperCase())}
            placeholder="e.g. HDFC0001248"
            className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider border outline-none transition-all focus:ring-2"
            style={{
              backgroundColor: partnerColors.surfaceMuted,
              borderColor: partnerColors.border,
              color: partnerColors.textPrimary,
            }}
          />
          <p className="text-[11px] font-medium" style={{ color: partnerColors.textMuted }}>
            {bankDetails.branchName || 'Valid 11-digit alphanumeric bank branch identifier.'}
          </p>
        </div>

        {/* Account Type */}
        <div className="space-y-1.5 md:col-span-2">
          <label
            className="block text-xs font-black uppercase tracking-wider"
            style={{ color: partnerColors.textSecondary }}
          >
            Account Type
          </label>
          <div className="flex items-center gap-3">
            {(['current', 'savings'] as const).map((type) => {
              const isSelected = bankDetails.accountType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateBankDetails('accountType', type)}
                  className="flex-1 sm:flex-none sm:min-w-[140px] px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer capitalize active:scale-95 text-center"
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
                  {type} Account
                </button>
              );
            })}
          </div>
        </div>

        {/* Payout Schedule Selector */}
        <div className="space-y-2 md:col-span-2 pt-2">
          <div className="flex items-center justify-between">
            <label
              className="block text-xs font-black uppercase tracking-wider"
              style={{ color: partnerColors.textSecondary }}
            >
              Settlement & Payout Schedule
            </label>
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: partnerColors.accentLight,
                color: partnerColors.accentBadgeText,
              }}
            >
              Direct Bank Transfer
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PAYOUT_SCHEDULE_OPTIONS.map((option) => {
              const isSelected = bankDetails.payoutSchedule === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateBankDetails('payoutSchedule', option.value)}
                  className="p-3.5 rounded-xl border text-left transition-all cursor-pointer active:scale-98 flex flex-col justify-between"
                  style={{
                    backgroundColor: isSelected
                      ? partnerColors.accentLight
                      : partnerColors.surfaceMuted,
                    borderColor: isSelected
                      ? partnerColors.accent
                      : partnerColors.border,
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-xs font-bold"
                        style={{
                          color: isSelected ? partnerColors.dark : partnerColors.textPrimary,
                        }}
                      >
                        {option.label}
                      </span>
                      {isSelected && <Sparkles className="w-3.5 h-3.5 text-amber-600" />}
                    </div>
                    <p
                      className="text-[11px] font-medium leading-relaxed"
                      style={{ color: partnerColors.textSecondary }}
                    >
                      {option.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Security Footer Notice */}
      <div
        className="p-3.5 sm:p-4 rounded-xl flex items-start gap-2.5 text-xs font-medium border"
        style={{
          backgroundColor: partnerColors.surfaceMuted,
          borderColor: partnerColors.border,
          color: partnerColors.textSecondary,
        }}
      >
        <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
        <span>
          Bank details are encrypted using 256-bit AES standard. TravelDekho never shares your
          account credentials or stores raw banking passwords.
        </span>
      </div>
    </div>
  );
};
