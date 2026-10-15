import type { Metadata } from 'next';
import { TripPartnerLoginPage } from '@/components/TripPartner';

export const metadata: Metadata = {
  title: 'Trip Partner Portal',
  description: 'Manage your trips, itineraries, and bookings on TravelDekho.',
};

export default function TripPartnerPage() {
  return <TripPartnerLoginPage />;
}
