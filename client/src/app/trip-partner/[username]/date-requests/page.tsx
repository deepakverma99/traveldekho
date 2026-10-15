import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Clock, Check, X } from 'lucide-react';
import { TripPartnerLayout, formatPartnerDisplayName } from '@/components/TripPartner';

export const instant = false;

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `Date Requests | ${formatPartnerDisplayName(username)}`,
  };
}

async function DateRequestsContent({ params }: PageProps) {
  const { username } = await params;

  return (
    <TripPartnerLayout username={username}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
            Date <span className="text-amber-500">Requests</span>
          </h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            Custom date inquiries and group slot requests
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 shadow-sm">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-amber-50/50 border border-amber-100 gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  Pending Review
                </span>
                <h4 className="text-sm font-black text-gray-900 mt-2">Kausani Weekend Batch - 12 Guests</h4>
                <p className="text-xs font-semibold text-gray-500 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" /> Requested for 25 Oct - 28 Oct
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer">
                  <Check className="w-3.5 h-3.5" /> Accept
                </button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer">
                  <X className="w-3.5 h-3.5" /> Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TripPartnerLayout>
  );
}

export default function PartnerDateRequestsPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFBF0]" />}>
      <DateRequestsContent {...props} />
    </Suspense>
  );
}
