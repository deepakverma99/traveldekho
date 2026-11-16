'use client';

import { useState, useCallback } from 'react';
import { TravelerReview, PendingReviewItem, ReviewTabSubFilter } from '../types';
import { INITIAL_PENDING_REVIEWS } from '../data/reviewsData';
import { saveStoredProfile, getStoredProfile } from '@/components/Profile/utils/profileStorage';

const WRITTEN_REVIEWS_STORAGE_KEY = 'traveldekho_user_reviews';
const PENDING_REVIEWS_STORAGE_KEY = 'traveldekho_user_pending_reviews';

function getInitialWrittenReviews(): TravelerReview[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(WRITTEN_REVIEWS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // fallback
  }
  return [];
}

function getInitialPendingReviews(): PendingReviewItem[] {
  if (typeof window === 'undefined') return INITIAL_PENDING_REVIEWS;
  try {
    const stored = localStorage.getItem(PENDING_REVIEWS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // fallback
  }
  return INITIAL_PENDING_REVIEWS;
}

export interface UseReviewsTabReturn {
  activeSubFilter: ReviewTabSubFilter;
  setActiveSubFilter: (filter: ReviewTabSubFilter) => void;
  writtenReviews: TravelerReview[];
  pendingReviews: PendingReviewItem[];
  isWriteModalOpen: boolean;
  selectedPendingTrip: PendingReviewItem | null;
  openWriteModal: (trip: PendingReviewItem) => void;
  closeWriteModal: () => void;
  handleSubmitReview: (data: { rating: number; title: string; content: string }) => void;
  writtenCount: number;
  pendingCount: number;
}

export function useReviewsTab(): UseReviewsTabReturn {
  const [activeSubFilter, setActiveSubFilter] = useState<ReviewTabSubFilter>('written');
  const [writtenReviews, setWrittenReviews] = useState<TravelerReview[]>(getInitialWrittenReviews);
  const [pendingReviews, setPendingReviews] = useState<PendingReviewItem[]>(getInitialPendingReviews);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [selectedPendingTrip, setSelectedPendingTrip] = useState<PendingReviewItem | null>(null);

  const openWriteModal = useCallback((trip: PendingReviewItem) => {
    setSelectedPendingTrip(trip);
    setIsWriteModalOpen(true);
  }, []);

  const closeWriteModal = useCallback(() => {
    setIsWriteModalOpen(false);
    setSelectedPendingTrip(null);
  }, []);

  const handleSubmitReview = useCallback(
    (data: { rating: number; title: string; content: string }) => {
      if (!selectedPendingTrip) return;

      const newReview: TravelerReview = {
        id: `rev-${Date.now()}`,
        tripId: selectedPendingTrip.bookingId,
        tripTitle: selectedPendingTrip.tripTitle,
        destination: selectedPendingTrip.destination,
        tripImage: selectedPendingTrip.tripImage,
        rating: data.rating,
        title: data.title,
        content: data.content,
        date: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        travelDate: selectedPendingTrip.travelDate,
        partnerName: selectedPendingTrip.partnerName,
        isVerified: true,
      };

      const updatedWritten = [newReview, ...writtenReviews];
      const updatedPending = pendingReviews.filter(
        (p) => p.id !== selectedPendingTrip.id
      );

      setWrittenReviews(updatedWritten);
      setPendingReviews(updatedPending);

      // Persist reviews and update Passport counter in real-time
      try {
        localStorage.setItem(WRITTEN_REVIEWS_STORAGE_KEY, JSON.stringify(updatedWritten));
        localStorage.setItem(PENDING_REVIEWS_STORAGE_KEY, JSON.stringify(updatedPending));
      } catch {
        // ignore
      }

      // Sync reviews written count with profile storage
      const current = getStoredProfile();
      saveStoredProfile({
        ...current,
        reviewsWritten: updatedWritten.length,
      });

      closeWriteModal();
      setActiveSubFilter('written');
    },
    [selectedPendingTrip, writtenReviews, pendingReviews, closeWriteModal]
  );

  return {
    activeSubFilter,
    setActiveSubFilter,
    writtenReviews,
    pendingReviews,
    isWriteModalOpen,
    selectedPendingTrip,
    openWriteModal,
    closeWriteModal,
    handleSubmitReview,
    writtenCount: writtenReviews.length,
    pendingCount: pendingReviews.length,
  };
}
