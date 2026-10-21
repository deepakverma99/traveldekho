import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Bell, CreditCard } from 'lucide-react';
import { formatPartnerDisplayName } from '@/components/TripPartner';

export const instant = false;

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `Settings | ${formatPartnerDisplayName(username)}`,
  };
}

async function SettingsContent({ params }: PageProps) {
  const { username } = await params;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
          Partner <span className="text-amber-500">Settings</span>
        </h1>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
          Payout preferences, notifications, and security
        </p>
      </div>

      <div className="space-y-6">
        {/* Payout Information */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 shadow-sm">
          <h3 className="text-base font-black text-gray-900 uppercase tracking-tight flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-amber-500" /> Payout Bank Account
          </h3>
          <p className="text-xs font-medium text-gray-500 mb-4">
            Earnings from completed bookings will be deposited directly to your registered bank account.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl">
              <span className="text-[10px] font-black uppercase text-gray-400">Account Holder</span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">{formatPartnerDisplayName(username)}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl">
              <span className="text-[10px] font-black uppercase text-gray-400">Status</span>
              <p className="text-sm font-bold text-green-600 mt-0.5">Active & Verified (HDFC Bank)</p>
            </div>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 shadow-sm">
          <h3 className="text-base font-black text-gray-900 uppercase tracking-tight flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-amber-500" /> Notifications & Alerts
          </h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 cursor-pointer">
              <span className="text-xs font-bold text-gray-800">Email alerts on new bookings</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber-500" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 cursor-pointer">
              <span className="text-xs font-bold text-gray-800">SMS updates for traveler date requests</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber-500" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PartnerSettingsPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SettingsContent {...props} />
    </Suspense>
  );
}
