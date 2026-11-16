'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface AccountOverviewCardProps {
  userName: string;
  userPhone?: string;
}

export const AccountOverviewCard: React.FC<AccountOverviewCardProps> = ({
  userName,
  userPhone,
}) => {
  return (
    <section
      aria-labelledby="account-overview-heading"
      className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-7 font-jakarta"
    >
      <h3
        id="account-overview-heading"
        className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-gray-900 pb-3 border-b border-gray-100"
      >
        ACCOUNT OVERVIEW
      </h3>

      <div className="mt-4">
        <span className="block text-xs font-semibold text-gray-400">
          Logged in as:
        </span>
        <h4 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight mt-1 flex items-center gap-2">
          <span>{userName || 'Deepak'}</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
        </h4>

        <div className="mt-2 flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            PHONE AUTHENTICATED
          </span>
          {userPhone && (
            <span className="text-xs font-mono font-bold text-gray-600">
              {userPhone}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default AccountOverviewCard;
