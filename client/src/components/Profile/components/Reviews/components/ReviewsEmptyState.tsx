'use client';

import React from 'react';
import { Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/shared';
import { colorTokens } from '@/theme';

interface ReviewsEmptyStateProps {
  type: 'written' | 'pending';
  onSwitchToPending?: () => void;
  pendingCount?: number;
}

export const ReviewsEmptyState: React.FC<ReviewsEmptyStateProps> = ({
  type,
  onSwitchToPending,
  pendingCount = 0,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 sm:p-12 text-center my-4 font-jakarta w-full">
      <div
        className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4"
        style={{
          backgroundColor: colorTokens.accentWarmTint,
          color: colorTokens.primaryContainer,
        }}
      >
        <Star className="w-8 h-8 stroke-[2]" />
      </div>

      <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2">
        {type === 'written' ? 'You haven’t written any reviews yet' : 'No trips awaiting review'}
      </h3>

      <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mb-6 leading-relaxed">
        {type === 'written'
          ? pendingCount > 0
            ? 'You have completed trips ready for your rating! Share your authentic experience to help other explorers.'
            : 'Reviews are exclusively written by verified travelers after completing trips booked on TravelDekho.'
          : 'All your completed trips have been reviewed! Book your next adventure to share more traveler feedback.'}
      </p>

      {type === 'written' && pendingCount > 0 && onSwitchToPending && (
        <div className="flex justify-center">
          <Button
            variant="primary"
            size="sm"
            rounded="xl"
            onClick={onSwitchToPending}
            leftIcon={<Sparkles className="w-3.5 h-3.5" />}
          >
            Review Pending Trips ({pendingCount})
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsEmptyState;

