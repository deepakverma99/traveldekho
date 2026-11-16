import React from 'react';
import type { Metadata } from 'next';
import { ProfileClientWrapper } from '@/components/Profile';

export const metadata: Metadata = {
  title: 'My Bookings & Reservations',
  description: 'View your completed and upcoming trip bookings on TravelDekho.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookingsPage() {
  return <ProfileClientWrapper defaultTab="bookings" />;
}

