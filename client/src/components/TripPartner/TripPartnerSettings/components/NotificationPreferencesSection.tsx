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
          <Bell className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-black tracking-tight" style={{ color: partnerColors.dark }}>
            Notification Channels & Alerts
          </h3>
          <p className="text-xs font-semibold" style={{ color: partnerColors.textSecondary }}>
            Choose how and where your operations team receives traveler activity updates.
          </p>
        </div>
      </div>

      {/* Email Notifications Group */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-amber-500" />
          <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: partnerColors.dark }}>
            Email Notifications
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {EMAIL_OPTIONS.map((item) => {
            const isEnabled = notifications[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleNotification(item.key)}
                className="p-3.5 sm:p-4 rounded-xl border flex items-start justify-between gap-3 cursor-pointer transition-all hover:border-amber-300 select-none"
                style={{
                  backgroundColor: isEnabled
                    ? partnerColors.surface
                    : partnerColors.surfaceMuted,
                  borderColor: isEnabled
                    ? partnerColors.border
                    : partnerColors.borderLight,
                }}
              >
                <div className="space-y-0.5 min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-xs sm:text-sm font-bold"
                      style={{
                        color: isEnabled ? partnerColors.dark : partnerColors.textMuted,
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                  <p
                    className="text-[11px] font-medium leading-relaxed"
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
                  className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none mt-0.5"
                  style={{
                    backgroundColor: isEnabled ? partnerColors.verified : partnerColors.border,
                  }}
                  role="switch"
                  aria-checked={isEnabled}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      isEnabled ? 'translate-x-5' : 'translate-x-0'
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

