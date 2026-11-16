import React from 'react';
import type { Metadata } from 'next';
import { ProfileClientWrapper } from '@/components/Profile';

export const metadata: Metadata = {
  title: 'Settings & Security | TravelDekho',
  description: 'Manage account authentication, travel notifications, and data privacy on TravelDekho.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SettingsPage() {
  return <ProfileClientWrapper defaultTab="settings" />;
}

