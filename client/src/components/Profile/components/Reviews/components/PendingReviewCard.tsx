'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Star, Sparkles } from 'lucide-react';
import { PendingReviewItem } from '../types';
import { Button } from '@/components/shared';
import { colorTokens } from '@/theme';

interface PendingReviewCardProps {
  item: PendingReviewItem;
  onWriteReview: (item: PendingReviewItem) => void;
}

export const PendingReviewCard: React.FC<PendingReviewCardProps> = ({
  item,
  onWriteReview,
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-4 sm:p-5 font-jakarta flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-between"
    >
      <div className="flex items-center gap-4 w-full sm:w-auto">
        {/* Thumbnail */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-gray-100">
          <Image
            src={item.tripImage}
            alt={item.tripTitle}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/50 mb-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Trip Completed</span>
          </div>

          <h4 className="text-sm sm:text-base font-extrabold text-gray-900 tracking-tight truncate">
            {item.tripTitle}
          </h4>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mt-1">
            <MapPin
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: colorTokens.primaryContainer }}
            />
            <span className="truncate">{item.destination}</span>
            <span>•</span>
            <div className="flex items-center gap-1 shrink-0">
              <Calendar className="w-3 h-3" />
              <span>{item.travelDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-auto shrink-0 flex justify-end">
        <Button
          variant="primary"
          size="sm"
          rounded="xl"
          onClick={() => onWriteReview(item)}
          leftIcon={<Star className="w-3.5 h-3.5 fill-current" />}
        >
          Write a Review
        </Button>
      </div>
    </motion.article>
  );
};

export default PendingReviewCard;

