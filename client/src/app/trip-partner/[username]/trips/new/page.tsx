import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import {
  TripPartnerLayout,
  TripPartnerNewTripForm,
  formatPartnerDisplayName,
} from '@/components/TripPartner';

export const instant = false;

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `Post New Trip | ${formatPartnerDisplayName(username)} | TravelDekho Partner`,
    description: 'Launch your journey. Fill in the details to publish your next big trip on TravelDekho.',
  };
}

async function NewTripContent({ params }: PageProps) {
  const { username } = await params;

  return (
    <TripPartnerLayout username={username}>
      <TripPartnerNewTripForm username={username} />
    </TripPartnerLayout>
  );
}

export default function PartnerNewTripPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFBF0]" />}>
      <NewTripContent {...props} />
    </Suspense>
  );
}
