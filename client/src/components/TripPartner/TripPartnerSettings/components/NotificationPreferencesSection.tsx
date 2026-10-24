'use client';

import React from 'react';
import {
  Bell,
  Mail,
} from 'lucide-react';
import { partnerColors } from '@/theme/colors';
import { PartnerNotificationSettings } from '../types';

interface NotificationPreferencesSectionProps {
  notifications: PartnerNotificationSettings;
  toggleNotification: (key: keyof PartnerNotificationSettings) => void;
}

export const NotificationPreferencesSection: React.FC<NotificationPreferencesSectionProps> = ({
  notifications,
  toggleNotification,
}) => {
  const EMAIL_OPTIONS = [
    {
      key: 'emailNewBookings' as const,
      title: 'New Booking Confirmations',
      desc: 'Receive immediate email receipts whenever a traveler books a tour slot.',
    },
    {
      key: 'emailCancellations' as const,
      title: 'Cancellations & Adjustments',
      desc: 'Get notified instantly if a guest modifies or cancels their trip reservation.',
    },
    {
      key: 'emailDateRequests' as const,
      title: 'Custom Date Inquiries',
      desc: 'Receive alerts when travelers propose private departure dates or group inquiries.',
    },
    {
      key: 'emailMonthlyPayouts' as const,
      title: 'Monthly Payout Statements',
      desc: 'Automated settlement invoices and GST credit summaries sent at month-end.',
    },
  ];


  return (
    <div
      className="w-full min-w-0 rounded-2xl p-3.5 sm:p-5 md:p-6 lg:p-8 border shadow-sm space-y-4 sm:space-y-6 font-jakarta"
      style={{
        backgroundColor: partnerColors.surface,
        borderColor: partnerColors.border,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 sm:gap-3 pb-3.5 sm:pb-4 border-b" style={{ borderColor: partnerColors.borderLight }}>
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            backgroundColor: partnerColors.accentLight,
            color: partnerColors.accent,
          }}
        >
          <Bell className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-base md:text-lg font-black tracking-tight" style={{ color: partnerColors.dark }}>
            Notification Channels & Alerts
          </h3>
          <p className="text-[11px] sm:text-xs font-semibold leading-relaxed" style={{ color: partnerColors.textSecondary }}>
            Choose how and where your operations team receives traveler activity updates.
          </p>
        </div>
      </div>

      {/* Email Notifications Group */}
      <div className="space-y-3 w-full">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-amber-500" />
          <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: partnerColors.dark }}>
            Email Notifications
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
          {EMAIL_OPTIONS.map((item) => {
            const isEnabled = notifications[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleNotification(item.key)}
                className="p-3 sm:p-4 rounded-xl border flex items-start justify-between gap-2.5 sm:gap-3 cursor-pointer transition-all hover:border-amber-300 select-none w-full min-w-0"
                style={{
                  backgroundColor: isEnabled
                    ? partnerColors.surface
                    : partnerColors.surfaceMuted,
                  borderColor: isEnabled
                    ? partnerColors.border
                    : partnerColors.borderLight,
                }}
              >
                <div className="space-y-0.5 min-w-0 flex-1 pr-1.5 sm:pr-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-xs sm:text-sm font-bold block leading-snug"
                      style={{
                        color: isEnabled ? partnerColors.dark : partnerColors.textMuted,
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                  <p
                    className="text-[10px] sm:text-[11px] font-medium leading-relaxed"
                    style={{
                      color: isEnabled ? partnerColors.textSecondary : partnerColors.textMuted,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>

                {/* Toggle switch */}
                <button
                  type="button"
                  className="relative inline-flex h-5.5 sm:h-6 w-10 sm:w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none mt-0.5"
                  style={{
                    backgroundColor: isEnabled ? partnerColors.verified : partnerColors.border,
                  }}
                  role="switch"
                  aria-checked={isEnabled}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-4.5 sm:h-5 w-4.5 sm:w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      isEnabled ? 'translate-x-4.5 sm:translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

