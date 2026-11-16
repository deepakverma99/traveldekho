import React from 'react';
import type { Metadata } from 'next';
import { ProfileClientWrapper } from '@/components/Profile';

export const metadata: Metadata = {
  title: 'My Reviews & Community Feedback | TravelDekho',
  description: 'Manage and share your travel reviews and ratings on TravelDekho.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReviewsPage() {
  return <ProfileClientWrapper defaultTab="reviews" />;
}

