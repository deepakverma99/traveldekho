import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { DollarSign, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  TripPartnerLayout,
  formatPartnerDisplayName,
  MOCK_PARTNER_NOTIFICATIONS,
} from '@/components/TripPartner';

export const instant = false;

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `Notifications | ${formatPartnerDisplayName(username)}`,
  };
}

async function NotificationsContent({ params }: PageProps) {
  const { username } = await params;

  return (
    <TripPartnerLayout username={username}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href={`/trip-partner/${username}/dashboard`}
            className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
              Partner <span className="text-amber-500">Notifications</span>
            </h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">
              Updates, booking receipts, and system alerts
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-4">
          {MOCK_PARTNER_NOTIFICATIONS.map((notif) => (
            <div
              key={notif.id}
              className="flex gap-4 p-4 rounded-2xl border bg-amber-50/30 border-amber-100/60 items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm bg-green-50 text-green-500 shrink-0">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-900 uppercase">{notif.title}</h4>
                  <p className="text-xs font-semibold text-gray-600 mt-0.5">{notif.description}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-gray-400 shrink-0">{notif.date}</span>
            </div>
          ))}
        </div>
      </div>
    </TripPartnerLayout>
  );
}

export default function PartnerNotificationsPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <NotificationsContent {...props} />
    </Suspense>
  );
}
