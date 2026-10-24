'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, Button } from '@/components/shared';
import { partnerColors } from '@/theme/colors';

interface ProfileHeaderProps {
  username: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username }) => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Trip Partner', href: `/trip-partner/${username}` },
    { label: 'Profile' },
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
            Public <span style={{ color: partnerColors.accent }}>Profile</span>
          </h1>
          <p
            className="text-[11px] sm:text-xs font-bold uppercase tracking-widest mt-1"
            style={{ color: partnerColors.textMuted }}
          >
            Update your partner handle, brand name, and public visibility
          </p>
        </div>
      </div>

      {/* Right Side: View Public Storefront Button styled exactly like Post New Trip */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Link href={`/trip-partner/${username}`} className="w-full sm:w-auto block">
          <Button
            leftIcon={<ExternalLink className="w-4 h-4 stroke-[2.5]" />}
            showArrow={false}
            size="lg"
            className="w-full sm:w-auto justify-center"
          >
            Public View
          </Button>
        </Link>
      </div>
    </div>
  );
};
