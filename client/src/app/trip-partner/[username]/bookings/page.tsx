import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import {
  TripPartnerLayout,
  formatPartnerDisplayName,
  TripPartnerBookingsView,
} from '@/components/TripPartner';

export const instant = false;

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `Bookings | ${formatPartnerDisplayName(username)}`,
  };
}

async function BookingsContent({ params }: PageProps) {
  const { username } = await params;

  return (
    <TripPartnerLayout username={username}>
      <TripPartnerBookingsView username={username} />
    </TripPartnerLayout>
  );
}

export default function PartnerBookingsPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFBF0]" />}>
      <BookingsContent {...props} />
    </Suspense>
  );
}

