'use client';

import { useState, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectPartnerBookings,
  selectPartnerMyTrips,
  togglePartnerBookingPaid,
  deletePartnerBooking,
} from '@/redux/slices/tripPartnerSlice';
import { BookingsFilterState, TripBookingsGroup } from '../types';
import { TripPartnerBooking } from '../../types';

const INITIAL_FILTERS: BookingsFilterState = {
  searchQuery: '',
  selectedStatus: 'All Status',
  selectedPayment: 'All Payments',
  dateFilterType: 'booking',
  startDate: '',
  endDate: '',
};

export const usePartnerBookings = () => {
  const dispatch = useAppDispatch();
  const bookings = useAppSelector(selectPartnerBookings);
  const myTrips = useAppSelector(selectPartnerMyTrips);

  const [filters, setFilters] = useState<BookingsFilterState>(INITIAL_FILTERS);
  const [expandedTrips, setExpandedTrips] = useState<Record<string, boolean>>({
    'The Kausani story 2.0': true,
    'Manali times': true,
    'Ladakh High Passes Expedition': true,
  });

  // Filter handlers
  const setSearchQuery = useCallback((searchQuery: string) => {
    setFilters((prev) => ({ ...prev, searchQuery }));
  }, []);

  const setSelectedStatus = useCallback((selectedStatus: string) => {
    setFilters((prev) => ({ ...prev, selectedStatus }));
  }, []);

  const setSelectedPayment = useCallback((selectedPayment: string) => {
    setFilters((prev) => ({ ...prev, selectedPayment }));
  }, []);

  const setDateFilterType = useCallback((dateFilterType: 'booking' | 'travel') => {
    setFilters((prev) => ({ ...prev, dateFilterType }));
  }, []);

  const setStartDate = useCallback((startDate: string) => {
    setFilters((prev) => ({ ...prev, startDate }));
  }, []);

  const setEndDate = useCallback((endDate: string) => {
    setFilters((prev) => ({ ...prev, endDate }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  // Accordion toggle
  const toggleTripAccordion = useCallback((tripTitle: string) => {
    setExpandedTrips((prev) => ({
      ...prev,
      [tripTitle]: !prev[tripTitle],
    }));
  }, []);

  // Action handlers
  const handleMarkPaid = useCallback(
    (bookingId: string) => {
      dispatch(togglePartnerBookingPaid(bookingId));
    },
    [dispatch]
  );

  const handleDeleteBooking = useCallback(
    (bookingId: string) => {
      dispatch(deletePartnerBooking(bookingId));
    },
    [dispatch]
  );

  // Filtered bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesTitle = booking.tripTitle?.toLowerCase().includes(query);
        const matchesName = booking.travelerName?.toLowerCase().includes(query);
        const matchesEmail = booking.travelerEmail?.toLowerCase().includes(query);
        const matchesPhone = booking.travelerPhone?.toLowerCase().includes(query);
        const matchesId = booking.id?.toLowerCase().includes(query);

        if (!matchesTitle && !matchesName && !matchesEmail && !matchesPhone && !matchesId) {
          return false;
        }
      }

      // 2. Status Filter
      if (filters.selectedStatus !== 'All Status') {
        if (booking.status?.toLowerCase() !== filters.selectedStatus.toLowerCase()) {
          return false;
        }
      }

      // 3. Payment Filter
      if (filters.selectedPayment !== 'All Payments') {
        const isPaid = booking.paymentStatus === 'paid';
        if (filters.selectedPayment === 'Paid' && !isPaid) return false;
        if (filters.selectedPayment === 'Unpaid' && isPaid) return false;
      }

      // 4. Date Range Filter
      if (filters.startDate || filters.endDate) {
        const targetDateStr =
          filters.dateFilterType === 'booking'
            ? booking.bookingDate || ''
            : booking.travelDate || '';

        if (!targetDateStr) return true; // keep if no date recorded
      }

      return true;
    });
  }, [bookings, filters]);

  // Group filtered bookings by Trip
  const tripGroups = useMemo<TripBookingsGroup[]>(() => {
    const groupsMap = new Map<string, TripPartnerBooking[]>();

    filteredBookings.forEach((b) => {
      const title = b.tripTitle || 'General Bookings';
      if (!groupsMap.has(title)) {
        groupsMap.set(title, []);
      }
      groupsMap.get(title)!.push(b);
    });

    const result: TripBookingsGroup[] = [];

    groupsMap.forEach((tripBookings, title) => {
      // Lookup trip details from myTrips or fallback from first booking
      const tripMatch = myTrips.find((t) => t.title.toLowerCase() === title.toLowerCase());
      const firstB = tripBookings[0];

      const tripId = tripMatch?.id || firstB?.tripId || 'trip-1';
      const tripLocation = tripMatch?.destination || firstB?.tripLocation || 'Kausani';
      const tripDuration = tripMatch?.duration || firstB?.tripDuration || '3D / 2N';
      const tripImage = tripMatch?.image || firstB?.tripImage || '/trips/spiti.png';

      const totalBookings = tripBookings.length;
      const totalRevenue = tripBookings
        .filter((b) => b.paymentStatus === 'paid')
        .reduce((sum, b) => sum + (b.amount || 0), 0);
      const unpaidCount = tripBookings.filter((b) => b.paymentStatus !== 'paid').length;

      result.push({
        tripId,
        tripTitle: title,
        tripLocation,
        tripDuration,
        tripImage,
        totalBookings,
        totalRevenue,
        unpaidCount,
        bookings: tripBookings,
      });
    });

    return result;
  }, [filteredBookings, myTrips]);

  const hasActiveFilters = Boolean(
    filters.searchQuery ||
    filters.selectedStatus !== 'All Status' ||
    filters.selectedPayment !== 'All Payments' ||
    filters.startDate ||
    filters.endDate
  );

  const handleExportCSV = useCallback(() => {
    const headers = [
      'ID',
      'Trip Title',
      'Traveler Name',
      'Email',
      'Phone',
      'Guests',
      'Travel Date',
      'Booking Date',
      'Status',
      'Payment Status',
      'Amount',
    ];
    const rows = filteredBookings.map((b) => [
      `"${b.id}"`,
      `"${b.tripTitle?.replace(/"/g, '""') || ''}"`,
      `"${b.travelerName?.replace(/"/g, '""') || ''}"`,
      `"${b.travelerEmail || ''}"`,
      `"${b.travelerPhone || ''}"`,
      b.guestsCount || 1,
      `"${b.travelDate || ''}"`,
      `"${b.bookingDate || ''}"`,
      `"${b.status || 'Booked'}"`,
      `"${b.paymentStatus || 'unpaid'}"`,
      b.amount || 0,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'bookings-export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredBookings]);

  return {
    filters,
    tripGroups,
    expandedTrips,
    hasActiveFilters,
    totalResultsCount: filteredBookings.length,
    setSearchQuery,
    setSelectedStatus,
    setSelectedPayment,
    setDateFilterType,
    setStartDate,
    setEndDate,
    resetFilters,
    toggleTripAccordion,
    handleMarkPaid,
    handleDeleteBooking,
    handleExportCSV,
  };
};


