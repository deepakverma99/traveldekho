'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { BookingFilterType, TravelerBooking, BookingFilterOption } from '../types';
import { TRAVELER_MOCK_BOOKINGS } from '../data/bookingsData';

export interface UseBookingsTabReturn {
  activeFilter: BookingFilterType;
  setActiveFilter: (filter: BookingFilterType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredBookings: TravelerBooking[];
  filterOptions: BookingFilterOption[];
  copiedId: string | null;
  handleCopyRef: (ref: string) => void;
  handleViewDetails: (bookingId: string) => void;
  totalBookingsCount: number;
}

export function useBookingsTab(): UseBookingsTabReturn {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<BookingFilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Compute filter counts dynamically
  const counts = useMemo(() => {
    return {
      all: TRAVELER_MOCK_BOOKINGS.length,
      upcoming: TRAVELER_MOCK_BOOKINGS.filter((b) => b.status === 'UPCOMING').length,
      completed: TRAVELER_MOCK_BOOKINGS.filter((b) => b.status === 'COMPLETED').length,
      cancelled: TRAVELER_MOCK_BOOKINGS.filter((b) => b.status === 'CANCELLED').length,
    };
  }, []);

  const filterOptions: BookingFilterOption[] = useMemo(
    () => [
      { id: 'all', label: 'All Bookings', count: counts.all },
      { id: 'upcoming', label: 'Upcoming', count: counts.upcoming },
      { id: 'completed', label: 'Completed', count: counts.completed },
      { id: 'cancelled', label: 'Cancelled', count: counts.cancelled },
    ],
    [counts]
  );

  // Filtered booking list
  const filteredBookings = useMemo(() => {
    return TRAVELER_MOCK_BOOKINGS.filter((booking) => {
      // 1. Filter by status
      if (activeFilter === 'upcoming' && booking.status !== 'UPCOMING') return false;
      if (activeFilter === 'completed' && booking.status !== 'COMPLETED') return false;
      if (activeFilter === 'cancelled' && booking.status !== 'CANCELLED') return false;

      // 2. Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = booking.tripTitle.toLowerCase().includes(query);
        const matchesDest = booking.destination.toLowerCase().includes(query);
        const matchesRef = booking.referenceId.toLowerCase().includes(query);
        return matchesTitle || matchesDest || matchesRef;
      }

      return true;
    });
  }, [activeFilter, searchQuery]);

  const handleCopyRef = useCallback((ref: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(ref);
      setCopiedId(ref);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }, []);

  const handleViewDetails = useCallback(
    (bookingId: string) => {
      router.push(`/bookings/${bookingId}`);
    },
    [router]
  );

  return {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    filteredBookings,
    filterOptions,
    copiedId,
    handleCopyRef,
    handleViewDetails,
    totalBookingsCount: TRAVELER_MOCK_BOOKINGS.length,
  };
}

