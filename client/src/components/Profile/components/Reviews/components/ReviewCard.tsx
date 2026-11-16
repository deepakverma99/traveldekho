'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, MapPin, Calendar } from 'lucide-react';
import { TravelerReview } from '../types';
import { colorTokens } from '@/theme';

interface ReviewCardProps {
  review: TravelerReview;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-5 sm:p-6 font-jakarta flex flex-col md:flex-row gap-5 items-stretch"
    >
      {/* Trip Mini Thumbnail */}
      <div className="relative w-full md:w-44 h-36 md:h-auto rounded-2xl overflow-hidden shrink-0 bg-gray-100">
        <Image
          src={review.tripImage}
          alt={review.tripTitle}
          fill
          sizes="180px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
          <p className="text-[11px] font-bold truncate leading-tight">{review.tripTitle}</p>
          <div className="flex items-center gap-1 text-[10px] text-white/80 mt-0.5">
            <MapPin className="w-2.5 h-2.5" />
            <span className="truncate">{review.destination}</span>
          </div>
        </div>
      </div>

      {/* Main Review Text */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Top Bar: Stars + Verified Badge + Date */}
          <div className="flex items-center justify-between flex-wrap gap-2 pb-2.5 border-b border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating ? 'fill-amber-400' : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-black text-gray-800 ml-1">
                {review.rating}.0
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200/60">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Verified Traveler</span>
              </div>
              <span className="text-[11px] text-gray-400 font-semibold">{review.date}</span>
            </div>
          </div>

          {/* Review Title */}
          <h4 className="text-base sm:text-lg font-black text-gray-900 tracking-tight mt-3">
            {review.title}
          </h4>

          {/* Review Body */}
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed mt-2 whitespace-pre-line">
            {review.content}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="flex items-center gap-4 text-[11px] text-gray-500 font-semibold pt-3 mt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>Traveled: {review.travelDate}</span>
          </div>
          <span>•</span>
          <span style={{ color: colorTokens.primary }}>
            Operator: {review.partnerName}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default ReviewCard;

