import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { TripPartnerLayout, TripPartnerMyTrips, formatPartnerDisplayName } from '@/components/TripPartner';

export const instant = false;

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `My Trips | ${formatPartnerDisplayName(username)}`,
  };
}

async function TripsContent({ params }: PageProps) {
  const { username } = await params;

  return (
    <TripPartnerLayout username={username}>
      <TripPartnerMyTrips username={username} />
    </TripPartnerLayout>
  );
}

export default function PartnerTripsPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <TripsContent {...props} />
    </Suspense>
  );
}
