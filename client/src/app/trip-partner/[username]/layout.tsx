import React from 'react';
import { TripPartnerLayout } from '@/components/TripPartner';

export const instant = false;

interface PartnerRouteLayoutProps {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}

export default async function PartnerRouteLayout({
  children,
  params,
}: PartnerRouteLayoutProps) {
  const { username } = await params;

  return (
    <TripPartnerLayout username={username}>
      {children}
    </TripPartnerLayout>
  );
}
