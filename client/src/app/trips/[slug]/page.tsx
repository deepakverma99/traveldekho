import React, { Suspense } from 'react';
import { Metadata } from 'next';
import {
  TripDetailContent,
  TripDetailSkeleton,
  getTripBySlug,
} from '@/components/TripDetail';

interface TripPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: TripPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  return {
    title: `${trip.title} - Book Authentic Tour Package`,
    description: trip.about.description.slice(0, 160),
    openGraph: {
      title: `${trip.title} | TravelDekho`,
      description: trip.about.description.slice(0, 160),
      images: [trip.heroImage],
    },
  };
}

async function TripDetailView({ params }: TripPageProps) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  return <TripDetailContent trip={trip} />;
}

export default function TripDetailPage({ params }: TripPageProps) {
  return (
    <Suspense fallback={<TripDetailSkeleton />}>
      <TripDetailView params={params} />
    </Suspense>
  );
}
