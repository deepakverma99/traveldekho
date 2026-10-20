import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { TripPartnerLayout, TripPartnerDashboard, formatPartnerDisplayName } from '@/components/TripPartner';

export const instant = false;

interface DashboardPageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: DashboardPageProps): Promise<Metadata> {
  const { username } = await params;
  const displayName = formatPartnerDisplayName(username);
  return {
    title: `${displayName} | Trip Partner Dashboard`,
    description: `Manage trips, monitor volume, and track bookings on TravelDekho.`,
  };
}

async function DashboardContent({ params }: DashboardPageProps) {
  const { username } = await params;
  const displayName = formatPartnerDisplayName(username);

  return (
    <TripPartnerLayout username={username}>
      <TripPartnerDashboard username={username} displayName={displayName} />
    </TripPartnerLayout>
  );
}

export default function PartnerDashboardPage(props: DashboardPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <DashboardContent {...props} />
    </Suspense>
  );
}
