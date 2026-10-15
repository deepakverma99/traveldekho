'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { typography } from '@/theme/typography';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface TripGallerySectionProps {
  gallery: string[];
}

export const TripGallerySection: React.FC<TripGallerySectionProps> = ({
  gallery,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handleOpenPhoto = (index: number) => {
    setActivePhotoIndex(index);
  };

  const handleClosePhoto = () => {
    setActivePhotoIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) =>
        prev === 0 ? gallery.length - 1 : (prev as number) - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) =>
        prev === gallery.length - 1 ? 0 : (prev as number) + 1
      );
    }
  };

  return (
    <section>
      <h2
        className="text-2xl md:text-3xl text-gray-900 mb-6 sm:mb-8"
        style={{ fontFamily: typography.fonts.caveat }}
      >
        Gallery
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        {gallery.map((photo, index) => {
          const isFeatured = index === 0;
          return (
            <div
              key={photo + index}
              onClick={() => handleOpenPhoto(index)}
              className={`relative overflow-hidden rounded-2xl aspect-square cursor-zoom-in bg-gray-100 group ${
                isFeatured ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <Image
                src={photo}
                alt={`Trip photo ${index + 1}`}
                fill
                sizes={
                  isFeatured
                    ? '(max-width: 768px) 100vw, 50vw'
                    : '(max-width: 768px) 50vw, 25vw'
                }
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={handleClosePhoto}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={handleClosePhoto}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-20 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-20 cursor-pointer"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[65vh] md:h-[75vh] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={gallery[activePhotoIndex]}
                alt={`Trip photo preview ${activePhotoIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-20 cursor-pointer"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
