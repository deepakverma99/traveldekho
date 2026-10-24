'use client';

import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '@/components/shared';
import { partnerColors } from '@/theme/colors';

interface SettingsHeaderProps {
  username: string;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({ username }) => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Trip Partner', href: `/trip-partner/${username}` },
    { label: 'Settings' },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 sm:mb-6 gap-3 sm:gap-5 w-full min-w-0">
      {/* Title & Breadcrumb */}
      <div className="min-w-0 flex-1">
        <div className="overflow-x-auto whitespace-nowrap max-w-full scrollbar-hide">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="mt-2">
          <h1
            className="text-2xl min-[400px]:text-[1.75rem] sm:text-3xl font-black tracking-tight uppercase break-words"
            style={{ color: partnerColors.dark }}
          >
            Partner <span style={{ color: partnerColors.accent }}>Settings</span>
          </h1>
          <p
            className="text-[11px] sm:text-xs font-bold uppercase tracking-widest mt-1"
            style={{ color: partnerColors.textMuted }}
          >
            Payout preferences, operational policies, alerts & security
          </p>
        </div>
      </div>
    </div>
  );
};
