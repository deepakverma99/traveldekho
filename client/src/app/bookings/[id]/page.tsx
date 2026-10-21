import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { BookingDetailView } from '@/components/BookingDetail';

export const instant = false;

interface BookingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Booking #${id} | TravelDekho`,
    description: `View full details, traveler info, and payment summary for booking #${id} on TravelDekho.`,
  };
}

async function BookingContent({ params }: BookingPageProps) {
  const { id } = await params;
  return <BookingDetailView bookingId={id} />;
}

export default function BookingDetailPage(props: BookingPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F5]" />}>
      <BookingContent {...props} />
    </Suspense>
  );
}
