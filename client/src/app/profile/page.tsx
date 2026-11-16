import React from 'react';
import type { Metadata } from 'next';
import { ProfileClientWrapper } from '@/components/Profile';

export const metadata: Metadata = {
  title: 'My Profile & Passport',
  description:
    'View your Republic of TravelDekho passport, completed trips, travel logs, and account information.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfilePage() {
  return <ProfileClientWrapper />;
}
