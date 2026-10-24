'use client';

import React, { useEffect, Suspense } from 'react';
import { FloatingBackground } from '@/components/shared';
import { TripPartnerHeader } from './TripPartnerHeader';
import { TripPartnerSidebar } from './TripPartnerSidebar';
import { formatPartnerDisplayName } from './utils/partnerAuth';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  initializePartnerSession,
  selectCurrentPartner,
} from '@/redux/slices/tripPartnerSlice';

import { type TripPartnerLayoutProps } from './types/';

export type { TripPartnerLayoutProps };

export const TripPartnerLayout: React.FC<TripPartnerLayoutProps> = ({
  children,
  username,
}) => {
  const dispatch = useAppDispatch();
  const currentPartner = useAppSelector(selectCurrentPartner);

  useEffect(() => {
    dispatch(initializePartnerSession(username));
  }, [username, dispatch]);

  const displayName = currentPartner?.displayName || formatPartnerDisplayName(username);

  return (
    <div className="min-h-screen bg-white flex w-full relative">
      <FloatingBackground fixed />
      <div className="flex flex-1 w-full min-h-screen relative z-1">
        <Suspense fallback={<div className="w-64 h-screen hidden lg:flex bg-white border-r border-gray-200 shrink-0 sticky top-0" />}>
          <TripPartnerSidebar username={username} />
        </Suspense>
        <div className="flex flex-col flex-1 min-w-0 w-full min-h-screen">
          <TripPartnerHeader username={username} displayName={displayName} />
          <main className="grow w-full max-w-[1600px] mx-auto min-w-0 overflow-x-hidden pb-10 md:pb-12">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
