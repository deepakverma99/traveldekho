'use client';

import React from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  useAppDispatch,
  useAppSelector,
  selectActiveGalleryIndex,
  openGalleryPhoto,
  closeGalleryPhoto,
  nextGalleryPhoto,
  prevGalleryPhoto,
} from '@/redux';

interface TripGallerySectionProps {
  gallery: string[];
}

export const TripGallerySection: React.FC<TripGallerySectionProps> = ({
  gallery,
}) => {
  const dispatch = useAppDispatch();
  const activePhotoIndex = useAppSelector(selectActiveGalleryIndex);

  const handleOpenPhoto = (index: number) => {
    dispatch(openGalleryPhoto(index));
  };

  const handleClosePhoto = () => {
    dispatch(closeGalleryPhoto());
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(prevGalleryPhoto(gallery.length));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(nextGalleryPhoto(gallery.length));
  };

  return (
    <section>
      <h2 className="text-2xl sm:mb-8 md:text-3xl text-gray-900 mb-6 font-caveat font-bold">
        Gallery
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        {gallery.map((photo, index) => {
          const isFeatured = index === 0;
          return (
            <div
              key={photo + index}
              onClick={() => handleOpenPhoto(index)}
              className={`group relative overflow-hidden rounded-2xl aspect-square cursor-zoom-in bg-gray-100 ${
                isFeatured ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <Image
                src={photo}
                alt={`Trip photo ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes={
                  isFeatured
                    ? '(max-width: 768px) 100vw, 50vw'
                    : '(max-width: 768px) 50vw, 25vw'
                }
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/15" />
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={handleClosePhoto}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={handleClosePhoto}
            aria-label="Close Lightbox"
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-20 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-20 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
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
            aria-label="Next Photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-20 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
