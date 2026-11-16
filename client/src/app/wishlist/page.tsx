import React from 'react';
import type { Metadata } from 'next';
import { ProfileClientWrapper } from '@/components/Profile';

export const metadata: Metadata = {
  title: 'My Wishlist & Saved Trips',
  description: 'View your handpicked dream trips across India on TravelDekho.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function WishlistPage() {
  return <ProfileClientWrapper defaultTab="wishlist" />;
}

