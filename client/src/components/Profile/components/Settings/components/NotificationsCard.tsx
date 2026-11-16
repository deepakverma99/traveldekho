'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { NotificationSettings } from '../types';
import { colorTokens } from '@/theme';

interface NotificationsCardProps {
  notifications: NotificationSettings;
  onToggle: (key: keyof NotificationSettings) => void;
}

export const NotificationsCard: React.FC<NotificationsCardProps> = ({
  notifications,
  onToggle,
}) => {
  const items: {
    key: keyof NotificationSettings;
    title: string;
    description: string;
  }[] = [
    {
      key: 'emailAlerts',
      title: 'Email Alerts',
      description: 'Receive email updates about bookings and itinerary details.',
    },
    {
      key: 'smsAlerts',
      title: 'SMS Alerts',
      description:
        'Get real-time trip check-in updates and vendor responses via text message.',
    },
    {
      key: 'promoMarketing',
      title: 'Promo & Marketing',
      description: 'Stay informed about exclusive flight and hotel discounts.',
    },
  ];

  return (
    <section
      aria-labelledby="notifications-heading"
      className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-7 md:p-8 font-jakarta"
    >
      <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
        <Bell
          className="w-4.5 h-4.5 stroke-[2.2]"
          style={{ color: colorTokens.primaryContainer }}
        />
        <h3
          id="notifications-heading"
          className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-gray-900"
        >
          NOTIFICATIONS
        </h3>
      </div>

      <div className="divide-y divide-gray-100/90 mt-2">
        {items.map((item) => {
          const isEnabled = notifications[item.key];

          return (
            <div
              key={item.key}
              className="py-4.5 flex items-center justify-between gap-4"
            >
              <div className="min-w-0 pr-2">
                <h4 className="text-sm font-extrabold text-gray-900 tracking-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 font-medium leading-relaxed mt-0.5">
                  {item.description}
                </p>
              </div>

              {/* iOS / Modern Pill Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={isEnabled}
                onClick={() => onToggle(item.key)}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out outline-none select-none items-center ${
                  isEnabled
                    ? 'shadow-[0_2px_10px_rgba(255,87,34,0.35)]'
                    : 'bg-slate-200/90 border border-slate-300/50'
                }`}
                style={{
                  backgroundColor: isEnabled
                    ? colorTokens.primaryContainer
                    : undefined,
                }}
              >
                <motion.span
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`pointer-events-none inline-block h-5.5 w-5.5 rounded-full bg-white shadow-md transform transition-transform ${
                    isEnabled ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NotificationsCard;
