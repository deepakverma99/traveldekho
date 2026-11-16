'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { PendingReviewItem } from '../types';
import { Button } from '@/components/shared';

interface WriteReviewModalProps {
  isOpen: boolean;
  trip: PendingReviewItem | null;
  onClose: () => void;
  onSubmit: (data: { rating: number; title: string; content: string }) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  trip,
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!isOpen || !trip) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({ rating, title: title.trim(), content: content.trim() });
    setTitle('');
    setContent('');
    setRating(5);
  };

  const activeDisplayRating = hoverRating ?? rating;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-jakarta">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-100 z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
            <div>
              <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
                Review Your Trip
              </h3>
              <p className="text-xs text-gray-500 font-medium truncate max-w-xs mt-0.5">
                {trip.tripTitle}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Star Rating Picker */}
            <div className="flex flex-col items-center justify-center py-2 bg-amber-50/50 rounded-2xl border border-amber-100/60">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 mb-1.5">
                Overall Experience Rating
              </span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer transition-transform hover:scale-115 active:scale-95"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= activeDisplayRating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-black text-amber-900 mt-1">
                {activeDisplayRating === 5 && '🌟 Extraordinary! Exceeded Expectations'}
                {activeDisplayRating === 4 && '😊 Very Good Experience'}
                {activeDisplayRating === 3 && '👍 Average Trip'}
                {activeDisplayRating === 2 && '😕 Below Expectations'}
                {activeDisplayRating === 1 && '😞 Poor Experience'}
              </span>
            </div>

            {/* Headline */}
            <div>
              <label
                htmlFor="review-title"
                className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5"
              >
                Review Title
              </label>
              <input
                id="review-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Breathtaking views and top-notch scout guides!"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff5722] focus:ring-2 focus:ring-[#ff5722]/15 text-sm font-semibold text-gray-900 outline-none transition-all placeholder:text-gray-400 placeholder:font-normal"
              />
            </div>

            {/* Review Body */}
            <div>
              <label
                htmlFor="review-content"
                className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5"
              >
                Detailed Feedback
              </label>
              <textarea
                id="review-content"
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What did you love most? How were the stay, local guides, and transport? Any tips for fellow travelers?"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff5722] focus:ring-2 focus:ring-[#ff5722]/15 text-sm font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <Button type="submit" size="sm" rounded="xl">
                Submit Review
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WriteReviewModal;

