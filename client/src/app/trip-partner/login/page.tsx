import type { Metadata } from 'next';
import { TripPartnerLoginPage } from '@/components/TripPartner';

export const metadata: Metadata = {
  title: 'Trip Partner Login',
  description: 'Secure login for verified TravelDekho trip partners.',
};

export default function TripPartnerLoginPageWrapper() {
  return <TripPartnerLoginPage />;
}
