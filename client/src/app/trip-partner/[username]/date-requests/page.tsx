import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { formatPartnerDisplayName, TripPartnerDateRequestsView } from '@/components/TripPartner';

export const instant = false;

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `Date Requests | ${formatPartnerDisplayName(username)}`,
  };
}

async function DateRequestsContent({ params }: PageProps) {
  const { username } = await params;

  return <TripPartnerDateRequestsView username={username} />;
}

export default function PartnerDateRequestsPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <DateRequestsContent {...props} />
    </Suspense>
  );
}

