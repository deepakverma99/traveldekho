import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { SearchPageContent } from '@/components/Search';

export const metadata: Metadata = {
  title: 'Search All Upcoming Adventures & Holiday Packages',
  description:
    'Search and filter scout-verified tours, authentic Himalayan treks, weekend getaways, and budget travel packages across India on TravelDekho.',
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
