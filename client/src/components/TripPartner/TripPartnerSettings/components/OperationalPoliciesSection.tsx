'use client';

import React from 'react';
import {
  SlidersHorizontal,
  Zap,
  Clock,
  ShieldAlert,
  Sparkles,
  CalendarCheck,
} from 'lucide-react';
import { partnerColors } from '@/theme/colors';
import { PartnerBookingPolicies } from '../types';
import { CANCELLATION_POLICIES, BOOKING_CUTOFF_OPTIONS } from '../data';

interface OperationalPoliciesSectionProps {
  policies: PartnerBookingPolicies;
  updatePolicy: <K extends keyof PartnerBookingPolicies>(
    key: K,
    value: PartnerBookingPolicies[K]
  ) => void;
}

export const OperationalPoliciesSection: React.FC<OperationalPoliciesSectionProps> = ({
  policies,
  updatePolicy,
}) => {
  return (
    <div
      className="rounded-2xl p-4 sm:p-6 md:p-8 border shadow-sm space-y-6"
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
          <SlidersHorizontal className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-black tracking-tight" style={{ color: partnerColors.dark }}>
            Booking & Operational Policies
          </h3>
          <p className="text-xs font-semibold" style={{ color: partnerColors.textSecondary }}>
            Configure reservation approval models, cancellation rules, and departure cut-off deadlines.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Instant Booking Toggle Card */}
        <div
          className="p-4 sm:p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            backgroundColor: partnerColors.surfaceMuted,
            borderColor: partnerColors.border,
          }}
        >
          <div className="flex items-start gap-3.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{
                backgroundColor: policies.instantBookingEnabled
                  ? partnerColors.accentLight
                  : partnerColors.surfaceSubtle,
                color: policies.instantBookingEnabled
                  ? partnerColors.accent
                  : partnerColors.textMuted,
              }}
            >
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold" style={{ color: partnerColors.dark }}>
                  Instant Booking Mode
                </h4>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: policies.instantBookingEnabled
                      ? partnerColors.verifiedBg
                      : partnerColors.surfaceSubtle,
                    color: policies.instantBookingEnabled
                      ? partnerColors.verifiedText
                      : partnerColors.textMuted,
                  }}
                >
                  {policies.instantBookingEnabled ? '3.2x Higher Conversions' : 'Manual Approval'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-medium mt-0.5" style={{ color: partnerColors.textSecondary }}>
                Travelers can book available seats immediately without waiting for host confirmation.
                Unchecking requires your operations team to accept bookings within 24 hours.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              updatePolicy('instantBookingEnabled', !policies.instantBookingEnabled)
            }
            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none self-end sm:self-center"
            style={{
              backgroundColor: policies.instantBookingEnabled
                ? partnerColors.accent
                : partnerColors.border,
            }}
            role="switch"
            aria-checked={policies.instantBookingEnabled}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                policies.instantBookingEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Booking Cut-off Deadline */}
        <div className="space-y-2">
          <label
            className="block text-xs font-black uppercase tracking-wider"
            style={{ color: partnerColors.textSecondary }}
          >
            Departure Booking Cut-off Deadline
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {BOOKING_CUTOFF_OPTIONS.map((opt) => {
              const isSelected = policies.bookingCutoffHours === opt.hours;
              return (
                <button
                  key={opt.hours}
                  type="button"
                  onClick={() => updatePolicy('bookingCutoffHours', opt.hours)}
                  className="px-3.5 py-3 rounded-xl border text-left transition-all cursor-pointer text-xs font-bold active:scale-98 flex items-center justify-between"
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
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{opt.label}</span>
                  </div>
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-amber-600" />}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] font-medium" style={{ color: partnerColors.textMuted }}>
            After this window before a departure date, bookings close automatically for logistical preparation.
          </p>
        </div>

        {/* Cancellation Policy Cards */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <label
              className="block text-xs font-black uppercase tracking-wider"
              style={{ color: partnerColors.textSecondary }}
            >
              Default Guest Cancellation Policy
            </label>
            <span className="text-[11px] font-bold" style={{ color: partnerColors.accent }}>
              Displayed on Trip Cards
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {CANCELLATION_POLICIES.map((cp) => {
              const isSelected = policies.cancellationPolicy === cp.id;
              return (
                <div
                  key={cp.id}
                  onClick={() => updatePolicy('cancellationPolicy', cp.id)}
                  className="p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between hover:border-amber-400 select-none"
                  style={{
                    backgroundColor: isSelected
                      ? partnerColors.accentLight
                      : partnerColors.surfaceMuted,
                    borderColor: isSelected
                      ? partnerColors.accent
                      : partnerColors.border,
                  }}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-bold"
                        style={{
                          color: isSelected ? partnerColors.dark : partnerColors.textPrimary,
                        }}
                      >
                        {cp.title}
                      </span>
                      {cp.recommended && (
                        <span
                          className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: partnerColors.verifiedBg,
                            color: partnerColors.verifiedText,
                          }}
                        >
                          Popular
                        </span>
                      )}
                    </div>
                    <p
                      className="text-[11px] font-medium leading-relaxed"
                      style={{ color: partnerColors.textSecondary }}
                    >
                      {cp.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-2 border-t flex items-center justify-between text-[11px] font-bold" style={{ borderColor: partnerColors.borderLight }}>
                    <span style={{ color: isSelected ? partnerColors.accentBadgeText : partnerColors.textMuted }}>
                      {isSelected ? 'Selected' : 'Select Policy'}
                    </span>
                    <input
                      type="radio"
                      name="cancellationPolicy"
                      checked={isSelected}
                      onChange={() => updatePolicy('cancellationPolicy', cp.id)}
                      className="accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
