import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Plus, MapPin, Calendar, Clock } from 'lucide-react';
import { TripPartnerLayout, formatPartnerDisplayName } from '@/components/TripPartner';

export const instant = false;

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `My Trips | ${formatPartnerDisplayName(username)}`,
  };
}

async function TripsContent({ params }: PageProps) {
  const { username } = await params;

  return (
    <TripPartnerLayout username={username}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
              My <span className="text-amber-500">Trips</span>
            </h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
              Active and published itineraries
            </p>
          </div>
          <Link
            href={`/trip-partner/${username}/trips/new`}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-black font-black text-sm rounded-full shadow-lg shadow-amber-200 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Post New Trip
          </Link>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                Active & Booking
              </span>
              <span className="text-xl font-black text-gray-900">₹5,400</span>
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-2">The Kausani story 2.0</h3>
            <p className="text-xs font-medium text-gray-500 mb-4 line-clamp-2">
              Explore the serenity of Kausani hills, tea gardens, and Himalayan panorama with certified captains.
            </p>
            <div className="flex items-center gap-4 text-xs font-bold text-gray-400 pt-4 border-t border-gray-50">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Uttarakhand</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" /> 3D / 2N</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-amber-500" /> 24 Bookings</span>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                Upcoming Departure
              </span>
              <span className="text-xl font-black text-gray-900">₹14,999</span>
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-2">Ladakh High Passes Expedition</h3>
            <p className="text-xs font-medium text-gray-500 mb-4 line-clamp-2">
              Iconic viewpoints to cultural heritage sites, Pangong Tso, and high-altitude mountain passes.
            </p>
            <div className="flex items-center gap-4 text-xs font-bold text-gray-400 pt-4 border-t border-gray-50">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Ladakh</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" /> 6D / 5N</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-amber-500" /> Open for Booking</span>
            </div>
          </div>
        </div>
      </div>
    </TripPartnerLayout>
  );
}

export default function PartnerTripsPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFBF0]" />}>
      <TripsContent {...props} />
    </Suspense>
  );
}
