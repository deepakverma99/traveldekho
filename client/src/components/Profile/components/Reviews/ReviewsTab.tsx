'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';
import { useReviewsTab } from './hooks/useReviewsTab';
import { ReviewCard } from './components/ReviewCard';
import { PendingReviewCard } from './components/PendingReviewCard';
import { WriteReviewModal } from './components/WriteReviewModal';
import { ReviewsEmptyState } from './components/ReviewsEmptyState';
import { colorTokens } from '@/theme';

export const ReviewsTab: React.FC = () => {
  const {
    activeSubFilter,
    setActiveSubFilter,
    writtenReviews,
    pendingReviews,
    isWriteModalOpen,
    selectedPendingTrip,
    openWriteModal,
    closeWriteModal,
    handleSubmitReview,
    writtenCount,
    pendingCount,
  } = useReviewsTab();

  return (
    <div className="w-full font-jakarta">
      {/* Category Subtitle & Hero Headline */}
      <div className="mb-6 sm:mb-8">
        <span
          className="block text-[11px] sm:text-xs font-black uppercase tracking-[0.24em] mb-1"
          style={{ color: colorTokens.primary }}
        >
          TRAVEL DIARIES & RATINGS
        </span>
        <h1 className="flex items-baseline gap-2">
          <span
            className="font-caveat text-4xl sm:text-5xl font-bold tracking-normal"
            style={{ color: colorTokens.primaryContainer }}
          >
            My
          </span>
          <span
            className="font-black text-3xl sm:text-4xl tracking-tight uppercase"
            style={{ color: colorTokens.primaryContainer }}
          >
            REVIEWS
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
          Authentic feedback and star ratings shared with the TravelDekho explorer community.
        </p>
      </div>

      {/* Sub Filter Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveSubFilter('written')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold tracking-tight transition-all duration-200 cursor-pointer select-none flex items-center gap-2 border ${
            activeSubFilter === 'written'
              ? 'text-white shadow-[0_6px_16px_rgba(255,87,34,0.3)] border-transparent'
              : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-gray-200/80'
          }`}
          style={{
            backgroundColor:
              activeSubFilter === 'written' ? colorTokens.primaryContainer : undefined,
          }}
        >
          <Star className="w-3.5 h-3.5" />
          <span>Written Reviews</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              activeSubFilter === 'written' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {writtenCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubFilter('pending')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold tracking-tight transition-all duration-200 cursor-pointer select-none flex items-center gap-2 border ${
            activeSubFilter === 'pending'
              ? 'text-white shadow-[0_6px_16px_rgba(255,87,34,0.3)] border-transparent'
              : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-gray-200/80'
          }`}
          style={{
            backgroundColor:
              activeSubFilter === 'pending' ? colorTokens.primaryContainer : undefined,
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pending Reviews</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              activeSubFilter === 'pending'
                ? 'bg-white/20 text-white'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {pendingCount}
          </span>
        </button>
      </div>

      {/* Reviews Content Area */}
      {activeSubFilter === 'written' && (
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {writtenReviews.length > 0 ? (
              writtenReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <ReviewsEmptyState
                type="written"
                pendingCount={pendingCount}
                onSwitchToPending={() => setActiveSubFilter('pending')}
              />
            )}
          </AnimatePresence>
        </div>
      )}

      {activeSubFilter === 'pending' && (
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {pendingReviews.length > 0 ? (
              pendingReviews.map((item) => (
                <PendingReviewCard
                  key={item.id}
                  item={item}
                  onWriteReview={openWriteModal}
                />
              ))
            ) : (
              <ReviewsEmptyState type="pending" />
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isWriteModalOpen}
        trip={selectedPendingTrip}
        onClose={closeWriteModal}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
};

export default ReviewsTab;

