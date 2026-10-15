import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { TripPartnerLayout, formatPartnerDisplayName, MOCK_PARTNER_BOOKINGS } from '@/components/TripPartner';

export const instant = false;

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `Bookings | ${formatPartnerDisplayName(username)}`,
  };
}

async function BookingsContent({ params }: PageProps) {
  const { username } = await params;

  return (
    <TripPartnerLayout username={username}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
            All <span className="text-amber-500">Bookings</span>
          </h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            Real-time traveler bookings & payment status
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 sm:px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Traveler
                  </th>
                  <th className="px-6 sm:px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Trip
                  </th>
                  <th className="px-6 sm:px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 sm:px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_PARTNER_BOOKINGS.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 sm:px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900 uppercase leading-none">
                          {booking.travelerName}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 mt-1">
                          {booking.travelerEmail}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 sm:px-8 py-6 text-sm font-bold text-gray-600">
                      {booking.tripTitle}
                    </td>
                    <td className="px-6 sm:px-8 py-6">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-100 text-green-600">
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 sm:px-8 py-6 text-right text-sm font-black text-gray-900">
                      ₹{booking.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TripPartnerLayout>
  );
}

export default function PartnerBookingsPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFBF0]" />}>
      <BookingsContent {...props} />
    </Suspense>
  );
}
