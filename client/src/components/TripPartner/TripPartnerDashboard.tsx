'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  IndianRupee,
  DollarSign,
  Users,
  Layers,
  Star,
  TrendingUp,
  ChevronRight,
  Bell,
  Plus,
} from 'lucide-react';
import { Button, Breadcrumb, BreadcrumbItem } from '@/components/shared';
import { colors } from '@/theme/colors';
import { TripPartnerBookingChart } from './TripPartnerBookingChart';
import { TripPartnerStatCard } from './TripPartnerStatCard';
import { useAppSelector } from '@/redux/hooks';
import {
  selectPartnerStats,
  selectPartnerBookings,
  selectPartnerNotifications,
  selectCurrentPartner,
} from '@/redux/slices/tripPartnerSlice';

import { type TripPartnerDashboardProps } from './types/';

export type { TripPartnerDashboardProps };

export const TripPartnerDashboard: React.FC<TripPartnerDashboardProps> = ({
  username,
  displayName,
}) => {
  const stats = useAppSelector(selectPartnerStats);
  const bookings = useAppSelector(selectPartnerBookings);
  const notifications = useAppSelector(selectPartnerNotifications);
  const currentPartner = useAppSelector(selectCurrentPartner);

  const effectiveDisplayName = currentPartner?.displayName || displayName || username;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Trip Partner', href: `/trip-partner/${username}/dashboard` },
    { label: 'Dashboard' },
  ];

  return (
    <div className="max-w-[80rem] mx-auto w-full min-w-0 px-3.5 pt-5 pb-10 sm:px-5 sm:pt-6 sm:pb-10 md:px-6 md:pt-6 md:pb-12 font-jakarta">
      {/* Top Banner / Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between items-start mb-5 md:mb-6 gap-5 w-full min-w-0">
        <div>
          <Breadcrumb items={breadcrumbItems} />

          <div className="mt-2">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase leading-9 break-words">
              Hello, <span className="text-amber-500">{effectiveDisplayName}!</span>
            </h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
              Manage your trips and track your growth
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/trip-partner/${username}/trips/new`}>
            <Button
              leftIcon={<Plus className="w-4 h-4 stroke-[2.5]" />}
              showArrow={false}
              size="lg"
            >
              Post New Trip
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 min-[1120px]:grid-cols-4 gap-3 sm:gap-5 mb-5 min-[1120px]:mb-6 w-full min-w-0">
        <TripPartnerStatCard
          label="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          trend={{ percentage: 12, text: 'since last month', isPositive: true }}
          icon={IndianRupee}
        />
        <TripPartnerStatCard
          label="Total Bookings"
          value={stats.totalBookings}
          trend={{ percentage: 8, text: 'since last month', isPositive: true }}
          icon={Users}
        />
        <TripPartnerStatCard
          label="Active Trips"
          value={stats.activeTrips}
          trend={{ percentage: 24, text: 'since last month', isPositive: true }}
          icon={Layers}
        />
        <TripPartnerStatCard
          label="Avg Rating"
          value={stats.avgRating}
          trend={{ percentage: 5, text: 'since last month', isPositive: false }}
          icon={Star}
        />
      </div>

      {/* Analytics Section: Booking Volume Chart (Left) & Notifications (Right) */}
      <div className="grid grid-cols-1 min-[1120px]:grid-cols-[1.8fr_1.2fr] gap-5 min-[1120px]:gap-6 min-[1120px]:items-stretch mb-6 w-full min-w-0">
        {/* Booking Volume Chart */}
        <TripPartnerBookingChart />

        {/* Notifications Card (Right of Graph) */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4.5 sm:p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.04),0_1px_2px_-1px_rgba(0,0,0,0.02)] flex flex-col h-full max-h-[440px] min-w-0 transition-all duration-250 ease-out hover:shadow-[0_10px_25px_-5px_rgba(255,237,208,0.5),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:border-amber-200">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2 [&>svg]:text-amber-500">
              <Bell className="w-5 h-5" /> Notifications
              {unreadCount > 0 && (
                <span className="bg-amber-100 text-amber-600 py-1 px-3 rounded-full text-[10px] font-black tracking-wider ml-2">
                  {unreadCount} NEW
                </span>
              )}
            </h4>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto pr-2 flex-1 -mr-2">
            {notifications.map((notif) => (
              <Link
                key={notif.id}
                href={`/trip-partner/${username}/notifications`}
                className="flex gap-3.5 p-3.5 sm:p-4 rounded-xl border border-amber-100/60 bg-amber-50/40 no-underline transition-all duration-200 hover:bg-amber-50 hover:border-amber-200"
              >
                <div className="flex-shrink-0 relative mt-1">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-xs bg-amber-50 text-amber-600 border border-amber-200/60">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-white animate-pulse" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <p className="text-[11px] uppercase tracking-wider truncate font-black text-gray-900">
                      {notif.title}
                    </p>
                    <span className="text-[9px] font-bold whitespace-nowrap uppercase mt-0.5 text-gray-400">
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

          <div className="pt-4 mt-2 border-t border-gray-100">
            <Link
              href={`/trip-partner/${username}/notifications`}
              className="flex items-center justify-center gap-2 w-full p-3.5 rounded-2xl bg-gray-50 text-[10px] font-black text-gray-900 uppercase tracking-widest no-underline transition-all duration-200 hover:bg-amber-50 hover:text-amber-600 group"
            >
              <span>View All Notifications</span>
              <ArrowUpRight className="w-4 h-4 text-amber-500 transition-transform duration-200 group-hover:scale-110" />
            </Link>
          </div>
        </div>
      </div>

      {/* Full-width Recent Bookings Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_1px_3px_0_rgba(0,0,0,0.04),0_1px_2px_-1px_rgba(0,0,0,0.02)] transition-all duration-250 ease-out hover:shadow-[0_10px_25px_-5px_rgba(255,237,208,0.5),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:border-amber-200 mb-10 w-full min-w-0">
        <div className="p-4.5 sm:px-8 sm:py-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2 sm:gap-3 [&>svg]:text-amber-500 [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6">
            <TrendingUp className="w-6 h-6" /> Recent Bookings
          </h3>
          <Link
            href={`/trip-partner/${username}/bookings`}
            className="text-xs font-black text-amber-600 uppercase tracking-widest flex items-center gap-1 transition-colors hover:underline"
          >
            <span>View All</span> <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[520px] border-collapse">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="p-4 sm:px-6 sm:py-5 md:px-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  Traveler
                </th>
                <th className="p-4 sm:px-6 sm:py-5 md:px-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  Trip
                </th>
                <th className="p-4 sm:px-6 sm:py-5 md:px-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  Status
                </th>
                <th className="p-4 sm:px-6 sm:py-5 md:px-8 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="transition-colors hover:bg-gray-50/60">
                  <td className="p-4 sm:px-6 sm:py-5 md:px-8 text-left">
                    <div className="flex flex-col">
                      <span className="text-sm font-black uppercase leading-none text-gray-900">
                        {booking.travelerName}
                      </span>
                      <span className="text-[10px] font-bold mt-1 text-gray-400">
                        {booking.travelerEmail}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 sm:px-6 sm:py-5 md:px-8 text-left">
                    <span className="text-sm font-bold text-gray-600">
                      {booking.tripTitle}
                    </span>
                  </td>
                  <td className="p-4 sm:px-6 sm:py-5 md:px-8 text-left">
                    <span className="py-1 px-3 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-100 text-green-700 whitespace-nowrap">
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4 sm:px-6 sm:py-5 md:px-8 text-right">
                    <span className="text-sm font-black text-gray-900">
                      ₹{booking.amount.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
