'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  SearchBar,
  Select,
} from '@/components/shared';
import { TripPartnerTripCard } from './TripPartnerTripCard';
import {
  type TripPartnerMyTripsProps,
  type PartnerTripItem,
} from './types/';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectFilteredPartnerTrips,
  selectTripsSearchQuery,
  selectTripsStatusFilter,
  selectTripsCategoryFilter,
  selectTripsDifficultyFilter,
  selectTripsSortBy,
  selectTripsToastMessage,
  setTripsSearchQuery,
  setTripsStatusFilter,
  setTripsCategoryFilter,
  setTripsDifficultyFilter,
  setTripsSortBy,
  resetTripsFilters,
  setTripsToastMessage,
  deletePartnerTrip,
  archivePartnerTrip,
  editPartnerTrip,
  copyPartnerTripDetails,
} from '@/redux/slices/tripPartnerSlice';

export type { TripPartnerMyTripsProps };

export const TripPartnerMyTrips: React.FC<TripPartnerMyTripsProps> = ({ username }) => {
  const dispatch = useAppDispatch();

  // Redux Selectors
  const filteredTrips = useAppSelector(selectFilteredPartnerTrips);
  const searchQuery = useAppSelector(selectTripsSearchQuery);
  const statusFilter = useAppSelector(selectTripsStatusFilter);
  const categoryFilter = useAppSelector(selectTripsCategoryFilter);
  const difficultyFilter = useAppSelector(selectTripsDifficultyFilter);
  const sortBy = useAppSelector(selectTripsSortBy);
  const toastText = useAppSelector(selectTripsToastMessage);

  // Auto-dismiss toast timer
  useEffect(() => {
    if (!toastText) return;
    const timer = setTimeout(() => {
      dispatch(setTripsToastMessage(null));
    }, 2800);
    return () => clearTimeout(timer);
  }, [toastText, dispatch]);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Trip Partner', href: `/trip-partner/${username}/dashboard` },
    { label: 'My Trips' },
  ];

  /* Actions for 3-dot menu */
  const handleEdit = (trip: PartnerTripItem) => {
    dispatch(editPartnerTrip(trip));
  };

  const handleDelete = (tripId: string) => {
    dispatch(deletePartnerTrip(tripId));
  };

  const handleCopyDetails = (trip: PartnerTripItem) => {
    dispatch(copyPartnerTripDetails(trip));
  };

  const handleArchive = (tripId: string) => {
    dispatch(archivePartnerTrip(tripId));
  };

  /* Export CSV action */
  const handleExport = () => {
    const headers = [
      'ID',
      'Title',
      'Destination',
      'Status',
      'Duration',
      'Price (INR)',
      'Bookings',
      'Category',
      'Difficulty',
      'Departure Date',
    ];

    const rows = filteredTrips.map((t) => [
      t.id,
      `"${t.title.replace(/"/g, '""')}"`,
      `"${t.destination}"`,
      t.status,
      `"${t.duration}"`,
      t.price,
      t.bookingsCount,
      `"${t.category}"`,
      `"${t.difficulty}"`,
      `"${t.date}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `trips-export-${username}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    dispatch(setTripsToastMessage(`Exported ${filteredTrips.length} trips to CSV!`));
  };

  const handleResetFilters = () => {
    dispatch(resetTripsFilters());
  };

  const hasActiveFilters = Boolean(
    searchQuery ||
    statusFilter !== 'All Status' ||
    categoryFilter !== 'All Categories' ||
    difficultyFilter !== 'All Difficulties' ||
    sortBy !== 'newest'
  );

  return (
    <div className="max-w-7xl mx-auto w-full min-w-0 px-2.5 sm:px-4 md:px-6 pt-3.5 sm:pt-5 md:pt-6 pb-10 sm:pb-12 font-jakarta">
      {/* Top Banner / Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 sm:mb-7 gap-5 sm:gap-6 w-full min-w-0">
        <div className="w-full sm:w-auto">
          <div className="overflow-x-auto whitespace-nowrap max-w-full scrollbar-hide">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          <div className="mt-2">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase break-words">
              My <span className="text-amber-500">Trips</span>
            </h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
              Manage and track all your Active Trips, Upcoming Departures, and Published Itineraries
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link href={`/trip-partner/${username}/trips/new`} className="w-full sm:w-auto block">
            <Button
              leftIcon={<Plus className="w-4 h-4 stroke-[2.5]" />}
              showArrow={false}
              size="lg"
              className="w-full sm:w-auto justify-center"
            >
              Post New Trip
            </Button>
          </Link>
        </div>
      </div>

      {/* Search, Filters, and Export Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-3.5 mb-6 shadow-xs grid gap-2.5 sm:gap-3 grid-cols-1 sm:grid-cols-[1fr_auto] xl:flex xl:flex-row xl:items-center xl:justify-between">
        {/* Search Input using shared SearchBar */}
        <div className="w-full sm:col-start-1 sm:row-start-1 xl:flex-1 xl:max-w-[280px] xl:min-w-[180px] [&>div]:!max-w-full [&>div]:w-full">
          <SearchBar
            variant="filter"
            placeholder="Search by title or destination..."
            value={searchQuery}
            onChange={(e) => dispatch(setTripsSearchQuery(e.target.value))}
            onClear={() => dispatch(setTripsSearchQuery(''))}
            aria-label="Search trips"
            maxWidth="100%"
            minWidth="100%"
          />
        </div>

        {/* 4 Category Selects */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full sm:col-span-2 sm:row-start-2 xl:flex xl:items-center xl:w-auto xl:shrink-0">
          <div className="w-full xl:w-auto">
            <Select
              aria-label="Filter by Status"
              value={statusFilter}
              onChange={(e) => dispatch(setTripsStatusFilter(e.target.value))}
              isFullWidth
            >
              <option value="All Status">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Published">Published</option>
              <option value="Expired">Expired</option>
            </Select>
          </div>

          <div className="w-full xl:w-auto">
            <Select
              aria-label="Filter by Category"
              value={categoryFilter}
              onChange={(e) => dispatch(setTripsCategoryFilter(e.target.value))}
              isFullWidth
            >
              <option value="All Categories">All Categories</option>
              <option value="Budget Friendly">Budget Friendly</option>
              <option value="Educational Trips">Educational Trips</option>
              <option value="Explore Offbeat">Explore Offbeat</option>
              <option value="Heritage">Heritage</option>
              <option value="Hike">Hike</option>
              <option value="Mountains">Mountains</option>
              <option value="Weekend Escapes">Weekend Escapes</option>
            </Select>
          </div>

          <div className="w-full xl:w-auto">
            <Select
              aria-label="Filter by Difficulty"
              value={difficultyFilter}
              onChange={(e) => dispatch(setTripsDifficultyFilter(e.target.value))}
              isFullWidth
            >
              <option value="All Difficulties">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Hard">Hard</option>
            </Select>
          </div>

          <div className="w-full xl:w-auto">
            <Select
              aria-label="Sort Trips"
              value={sortBy}
              onChange={(e) => dispatch(setTripsSortBy(e.target.value))}
              isFullWidth
            >
              <option value="newest">Sort by Newest</option>
              <option value="oldest">Sort by Oldest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="bookings">Most Booked</option>
            </Select>
          </div>
        </div>

        {/* Action Buttons: Reset & Export */}
        <div className="flex items-center gap-2 w-full sm:w-auto sm:shrink-0 sm:justify-end sm:col-start-2 sm:row-start-1 xl:ml-auto">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              title="Reset all filters"
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 bg-amber-50 hover:bg-amber-100 text-amber-800 hover:text-amber-900 border border-amber-200 hover:border-amber-300 rounded-xl text-[13px] font-bold font-jakarta cursor-pointer transition-all duration-200 whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4.5 bg-[#0b132b] hover:bg-[#1c2541] text-white hover:text-amber-300 rounded-xl text-[13px] font-extrabold tracking-tight font-jakarta border border-amber-400/20 hover:border-amber-400/40 cursor-pointer transition-all duration-200 shrink-0 w-full sm:w-auto hover:-translate-y-0.5 active:translate-y-0 shadow-xs hover:shadow-md"
          >
            <Download className="w-3.5 h-3.5 text-amber-400 stroke-[2.25]" />
            <span>Export Trips</span>
          </button>
        </div>
      </div>

      {/* Trips Grid */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 w-full min-w-0">
          {filteredTrips.map((trip, idx) => (
            <TripPartnerTripCard
              key={trip.id}
              trip={trip}
              priority={idx < 3}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onCopyDetails={handleCopyDetails}
              onArchive={handleArchive}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-gray-300 rounded-2.5xl py-14 px-6 text-center flex flex-col items-center justify-center gap-4">
          <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-lg font-extrabold text-gray-900 mb-1">
              No trips match your filters
            </h4>
            <p className="text-[13px] text-gray-500 font-medium">
              Try adjusting your search query, status, or category filters.
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-full text-xs font-extrabold border-none cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toastText && (
        <div className="fixed bottom-8 right-8 z-[100] flex items-center gap-2.5 py-3 px-5 bg-[#0b132b] text-white rounded-xl shadow-xl text-[13px] font-bold font-jakarta animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastText}</span>
        </div>
      )}
    </div>
  );
};
