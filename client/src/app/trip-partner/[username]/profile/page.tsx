import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { TripPartnerProfile, formatPartnerDisplayName } from '@/components/TripPartner';

export const instant = false;

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `Public Profile | ${formatPartnerDisplayName(username)}`,
  };
}

async function ProfileContent({ params }: PageProps) {
  const { username } = await params;

  return <TripPartnerProfile username={username} />;
}

export default function PartnerProfilePage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ProfileContent {...props} />
    </Suspense>
  );
}
