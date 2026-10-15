'use client';

import React, { useState, Suspense } from 'react';
import { TripPartnerHeader } from './TripPartnerHeader';
import { TripPartnerSidebar } from './TripPartnerSidebar';
import { TripPartnerMobileNav } from './TripPartnerMobileNav';
import { getStoredPartner, formatPartnerDisplayName } from './utils/partnerAuth';

export interface TripPartnerLayoutProps {
  children: React.ReactNode;
  username: string;
}

export const TripPartnerLayout: React.FC<TripPartnerLayoutProps> = ({
  children,
  username,
}) => {
  const [partner] = useState(() => getStoredPartner(username));
  const displayName = partner?.displayName || formatPartnerDisplayName(username);

  return (
    <div className="min-h-screen bg-[#FFFBF0] flex flex-col">
      <TripPartnerHeader username={username} displayName={displayName} />
      <div className="flex flex-1 max-w-[1600px] w-full mx-auto">
        <Suspense fallback={<div className="w-64 hidden md:flex" />}>
          <TripPartnerSidebar username={username} />
        </Suspense>
        <main className="flex-grow w-full overflow-hidden pb-24 md:pb-12">
          {children}
        </main>
      </div>
      <Suspense fallback={null}>
        <TripPartnerMobileNav username={username} />
      </Suspense>
    </div>
  );
};
