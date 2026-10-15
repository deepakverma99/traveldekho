'use client';

import React from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  DollarSign,
  Users,
  Layers,
  Star,
  TrendingUp,
  ChevronRight,
  Bell,
} from 'lucide-react';
import { TripPartnerBookingChart } from './TripPartnerBookingChart';
import {
  MOCK_PARTNER_BOOKINGS,
  MOCK_PARTNER_NOTIFICATIONS,
  MOCK_PARTNER_STATS,
} from './utils/partnerAuth';

export interface TripPartnerDashboardProps {
  username: string;
  displayName: string;
}

export const TripPartnerDashboard: React.FC<TripPartnerDashboardProps> = ({
  username,
  displayName,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Top Banner / Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-amber-400 text-black text-[10px] font-black uppercase tracking-widest rounded-full">
              Trip Partner Portal
            </span>
            <span className="flex items-center gap-1 text-[10px] font-black text-green-600 uppercase tracking-widest">
              <Activity className="w-3 h-3" /> System Live
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase">
            Hello, <span className="text-amber-500">{displayName}!</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
            Manage your trips and track your growth
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/trip-partner/${username}/trips/new`}>
            <button className="py-2.5 bg-amber-400 hover:bg-amber-500 text-black rounded-full transition-all duration-200 hover:shadow-md active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap h-14 px-8 font-black text-base shadow-xl shadow-amber-200 cursor-pointer">
              Post New Trip <ArrowUpRight className="ml-2 w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-12">
        {/* Total Revenue */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 shadow-sm hover:shadow-lg hover:shadow-amber-100/50 hover:border-amber-200 transition-all duration-300 group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 rounded-2xl bg-green-100 text-green-600 group-hover:scale-110 transition-transform duration-500">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Total Revenue
          </p>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tighter">
            ₹{MOCK_PARTNER_STATS.totalRevenue.toLocaleString()}
          </h3>
        </div>

        {/* Total Bookings */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 shadow-sm hover:shadow-lg hover:shadow-amber-100/50 hover:border-amber-200 transition-all duration-300 group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 rounded-2xl bg-blue-100 text-blue-600 group-hover:scale-110 transition-transform duration-500">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Total Bookings
          </p>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tighter">
            {MOCK_PARTNER_STATS.totalBookings}
          </h3>
        </div>

        {/* Active Trips */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 shadow-sm hover:shadow-lg hover:shadow-amber-100/50 hover:border-amber-200 transition-all duration-300 group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 rounded-2xl bg-amber-100 text-amber-600 group-hover:scale-110 transition-transform duration-500">
              <Layers className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Active Trips
          </p>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tighter">
            {MOCK_PARTNER_STATS.activeTrips}
          </h3>
        </div>

        {/* Avg Rating */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 shadow-sm hover:shadow-lg hover:shadow-amber-100/50 hover:border-amber-200 transition-all duration-300 group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 rounded-2xl bg-purple-100 text-purple-600 group-hover:scale-110 transition-transform duration-500">
              <Star className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Avg Rating
          </p>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tighter">
            {MOCK_PARTNER_STATS.avgRating}
          </h3>
        </div>
      </div>

      {/* Booking Volume Chart */}
      <TripPartnerBookingChart />

      {/* 2 Columns: Recent Bookings & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        {/* Recent Bookings Table (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="p-6 sm:p-8 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-amber-500" /> Recent Bookings
            </h3>
            <Link
              className="text-xs font-black text-amber-600 uppercase tracking-widest hover:underline flex items-center gap-1"
              href={`/trip-partner/${username}/bookings`}
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

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

        {/* Notifications Card (1 col) */}
        <div className="space-y-8">
          <div className="bg-white border border-gray-100 rounded-[40px] p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-[500px]">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-500" /> Notifications
                <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-[10px] font-black tracking-widest ml-2">
                  5 NEW
                </span>
              </h4>
            </div>

            <div className="space-y-3 overflow-y-auto pr-2 flex-1 -mr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
              {MOCK_PARTNER_NOTIFICATIONS.map((notif) => (
                <Link
                  key={notif.id}
                  href={`/trip-partner/${username}/notifications`}
                  className="flex gap-4 p-4 rounded-3xl transition-all cursor-pointer group border bg-amber-50/40 border-amber-100/50 hover:bg-amber-50 hover:border-amber-200"
                >
                  <div className="flex-shrink-0 relative mt-1">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm bg-green-50 text-green-500">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full border-[3px] border-white animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <p className="text-[11px] uppercase tracking-wider truncate font-black text-gray-900">
                        {notif.title}
                      </p>
                      <span className="text-[9px] font-bold text-gray-400 whitespace-nowrap uppercase mt-0.5">
                        {notif.date}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed line-clamp-2 font-bold text-gray-600">
                      {notif.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-6 mt-2 border-t border-gray-50">
              <Link
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gray-50 text-[10px] font-black text-gray-900 uppercase tracking-widest hover:bg-amber-50 hover:text-amber-600 transition-colors group"
                href={`/trip-partner/${username}/notifications`}
              >
                View All Notifications{' '}
                <ArrowUpRight className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
