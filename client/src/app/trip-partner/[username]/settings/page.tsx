import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { TripPartnerSettings, formatPartnerDisplayName } from '@/components/TripPartner';

export const instant = false;

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `Settings | ${formatPartnerDisplayName(username)}`,
  };
}

async function SettingsContent({ params }: PageProps) {
  const { username } = await params;

  return <TripPartnerSettings username={username} />;
}

export default function PartnerSettingsPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SettingsContent {...props} />
    </Suspense>
  );
}
