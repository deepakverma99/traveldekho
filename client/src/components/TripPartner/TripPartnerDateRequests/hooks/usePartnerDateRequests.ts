'use client';

import { useState, useMemo, useCallback } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { addDateToPartnerTrip } from '@/redux/slices/tripPartnerSlice';
import {
  DateRequestItem,
  DateRequestsFilterState,
  DateRequestsStatsData,
  AddDateToTripFormValues,
} from '../types';
import { INITIAL_DATE_REQUESTS } from '../data';
import { formatDateRange } from '../utils/dateRequestUtils';

export const usePartnerDateRequests = () => {
  const dispatch = useAppDispatch();
  const [requests, setRequests] = useState<DateRequestItem[]>(INITIAL_DATE_REQUESTS);
  const [filters, setFilters] = useState<DateRequestsFilterState>({
    searchQuery: '',
    statusFilter: 'all',
    sortBy: 'newest',
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Add Date to Trip Modal State
  const [isAddDateModalOpen, setIsAddDateModalOpen] = useState(false);
  const [selectedRequestForDateModal, setSelectedRequestForDateModal] = useState<DateRequestItem | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchQuery.trim().length > 0 ||
      filters.statusFilter !== 'all' ||
      filters.sortBy !== 'newest'
    );
  }, [filters]);

  const stats: DateRequestsStatsData = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter((r) => r.status === 'pending').length;
    const accepted = requests.filter((r) => r.status === 'accepted').length;
    const declined = requests.filter((r) => r.status === 'declined').length;
    const potentialRevenue = requests
      .filter((r) => r.status !== 'declined')
      .reduce((sum, r) => sum + (r.totalEstimatedRevenue || 0), 0);

    return {
      total,
      pending,
      accepted,
      declined,
      potentialRevenue,
    };
  }, [requests]);

  const filteredRequests = useMemo(() => {
    let list = [...requests];

    // Status filter
    if (filters.statusFilter !== 'all') {
      list = list.filter((r) => r.status === filters.statusFilter);
    }

    // Search query filter
    const q = filters.searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (r) =>
          r.travelerName.toLowerCase().includes(q) ||
          r.tripTitle.toLowerCase().includes(q) ||
          r.tripLocation.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          r.travelerEmail.toLowerCase().includes(q) ||
          r.travelerPhone.includes(q)
      );
    }

    // Sort order
    list.sort((a, b) => {
      switch (filters.sortBy) {
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'travelDate':
          return (
            new Date(a.requestedStartDate).getTime() -
            new Date(b.requestedStartDate).getTime()
          );
        case 'guests':
          return b.guestsCount - a.guestsCount;
        case 'revenue':
          return b.totalEstimatedRevenue - a.totalEstimatedRevenue;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return list;
  }, [requests, filters]);

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const setStatusFilter = useCallback((status: string) => {
    setFilters((prev) => ({ ...prev, statusFilter: status }));
  }, []);

  const setSortBy = useCallback((sortBy: any) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      statusFilter: 'all',
      sortBy: 'newest',
    });
  }, []);

  const openAddDateModal = useCallback((request: DateRequestItem) => {
    setSelectedRequestForDateModal(request);
    setIsAddDateModalOpen(true);
  }, []);

  const closeAddDateModal = useCallback(() => {
    setIsAddDateModalOpen(false);
    setSelectedRequestForDateModal(null);
  }, []);

  const handleAddDateToTrip = useCallback(
    (requestId: string, values: AddDateToTripFormValues) => {
      const dateRange = formatDateRange(values.startDate, values.endDate);
      let targetTripTitle = '';
      let targetTripId = '';

      setRequests((prev) =>
        prev.map((r) => {
          if (r.id === requestId) {
            targetTripTitle = r.tripTitle;
            targetTripId = r.tripId;
            return {
              ...r,
              status: 'accepted',
              dateAddedToTrip: true,
              addedDateRange: dateRange,
              responseNote: `Accepted & slotted departure date (${dateRange}).`,
            };
          }
          return r;
        })
      );

      // Sync to Redux trips
      dispatch(
        addDateToPartnerTrip({
          tripId: targetTripId,
          tripTitle: targetTripTitle,
          date: dateRange,
        })
      );

      closeAddDateModal();
      showToast(`Departure date (${dateRange}) added to trip successfully!`);
    },
    [dispatch, closeAddDateModal, showToast]
  );

  const handleAcceptRequest = useCallback(
    (requestId: string, note?: string) => {
      let targetReq: DateRequestItem | null = null;
      setRequests((prev) =>
        prev.map((r) => {
          if (r.id === requestId) {
            targetReq = {
              ...r,
              status: 'accepted',
              responseNote: note || 'Accepted custom date inquiry and ready to add in the trip.',
            };
            return targetReq;
          }
          return r;
        })
      );
      showToast('Date request accepted!');
      if (targetReq) {
        openAddDateModal(targetReq);
      }
    },
    [showToast, openAddDateModal]
  );

  const handleDeclineRequest = useCallback(
    (requestId: string, reason?: string) => {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === requestId
            ? {
                ...r,
                status: 'declined',
                responseNote: reason || 'Declined due to schedule conflict or full batch capacity.',
              }
            : r
        )
      );
      showToast('Date request declined.');
    },
    [showToast]
  );

  const handleDeleteRequest = useCallback(
    (requestId: string) => {
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
      showToast('Date request deleted.');
    },
    [showToast]
  );

  const handleExportCSV = useCallback(() => {
    if (requests.length === 0) return;

    const headers = [
      'Request ID',
      'Trip Title',
      'Traveler Name',
      'Email',
      'Phone',
      'Guests',
      'Start Date',
      'End Date',
      'Flexible',
      'Estimated Revenue',
      'Status',
      'Created At',
      'Special Notes',
    ];

    const rows = filteredRequests.map((r) => [
      r.id,
      `"${r.tripTitle.replace(/"/g, '""')}"`,
      `"${r.travelerName.replace(/"/g, '""')}"`,
      r.travelerEmail,
      r.travelerPhone,
      r.guestsCount,
      r.requestedStartDate,
      r.requestedEndDate,
      r.flexibleDates ? 'Yes' : 'No',
      r.totalEstimatedRevenue,
      r.status,
      r.createdAt,
      `"${(r.specialNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `date-requests-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Exported date requests to CSV');
  }, [requests.length, filteredRequests, showToast]);

  return {
    requests,
    filteredRequests,
    filters,
    stats,
    hasActiveFilters,
    toastMessage,
    isAddDateModalOpen,
    selectedRequestForDateModal,
    openAddDateModal,
    closeAddDateModal,
    handleAddDateToTrip,
    setSearchQuery,
    setStatusFilter,
    setSortBy,
    resetFilters,
    handleAcceptRequest,
    handleDeclineRequest,
    handleDeleteRequest,
    handleExportCSV,
  };
};
