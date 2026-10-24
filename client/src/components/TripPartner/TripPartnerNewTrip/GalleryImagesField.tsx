'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Images,
  UploadCloud,
  X,
  Plus,
} from 'lucide-react';

export interface GalleryImagesFieldProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  tripTitle?: string;
  category?: string;
  className?: string;
}

export const GalleryImagesField: React.FC<GalleryImagesFieldProps> = ({
  images = [],
  onChange,
  maxImages = 10,
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState('');

  const isFull = images.length >= maxImages;

  const handleUploadClick = () => {
    if (isFull) return;
    fileInputRef.current?.click();
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = maxImages - images.length;
    if (remainingSlots <= 0) return;

    const filesToRead = Array.from(files).slice(0, remainingSlots);
    const readPromises = filesToRead.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve((event.target?.result as string) || '');
          };
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readPromises).then((newUrls) => {
      const valid = newUrls.filter(Boolean);
      onChange([...images, ...valid].slice(0, maxImages));
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddUrl = () => {
    if (isFull) return;
    const trimmed = inputText.trim();
    if (
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('/') ||
      trimmed.startsWith('data:image/')
    ) {
      onChange([...images, trimmed].slice(0, maxImages));
      setInputText('');
    }
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, idx) => idx !== index));
  };

  return (
    <div className={`flex flex-col gap-2 w-full font-jakarta ${className}`}>
      <label htmlFor="trip-gallery-input" className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-gray-800">
          <Images className="w-3.5 h-3.5 text-amber-500" />
          Gallery Images (Max {maxImages})
        </span>
        <span className="text-[10px] font-bold text-gray-400 normal-case tracking-normal">
          {images.length}/{maxImages} uploaded
        </span>
      </label>

      {/* Hidden File Input for Multiple Uploads */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFilesSelected}
      />

      {/* Spacious Rounded Textarea Box */}
      <textarea
        id="trip-gallery-input"
        rows={2}
        placeholder="Paste image URL (press Enter) or upload images below..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isFull}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddUrl();
          }
        }}
        className="w-full bg-[#f8fafc] hover:bg-[#f1f5f9] focus:bg-white border-2 border-transparent focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25 rounded-2xl p-4 sm:p-5 text-sm sm:text-[15px] font-medium text-gray-900 font-jakarta min-h-[5.5rem] resize-y outline-none transition-all placeholder:text-gray-400 placeholder:font-medium disabled:opacity-50"
      />

      {/* Single Upload Images Button */}
      <button
        type="button"
        onClick={handleUploadClick}
        disabled={isFull}
        title="Upload multiple photos from your device"
        className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 bg-white text-amber-600 border-[1.5px] border-amber-500 rounded-full text-[13px] font-bold tracking-tight font-jakarta cursor-pointer transition-all duration-200 shadow-2xs min-w-0 w-auto self-start hover:bg-amber-50 hover:border-amber-600 hover:text-amber-700 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-55 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:shadow-none [&>span]:whitespace-nowrap [&>span]:overflow-hidden [&>span]:text-ellipsis [&>svg]:w-3.75 [&>svg]:h-3.75 [&>svg]:text-amber-500 disabled:[&>svg]:text-gray-400"
      >
        <UploadCloud className="w-4 h-4 stroke-[2.2]" />
        <span>Upload Images</span>
      </button>

      {/* Gallery Thumbnails Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 min-[480px]:grid-cols-3 gap-3 mt-3">
          {images.map((url, idx) => (
            <div
              key={idx}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 hover:border-amber-400 bg-gray-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <Image
                src={url}
                alt={`Gallery image ${idx + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
              <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[9px] font-black bg-black/75 text-white backdrop-blur-xs shadow-xs">
                #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all shadow-sm cursor-pointer hover:scale-105"
                title="Remove image"
                aria-label="Remove image"
              >
                <X className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          ))}

          {/* Quick Add More Card */}
          {!isFull && (
            <button
              type="button"
              onClick={handleUploadClick}
              title="Add more photos"
              className="flex flex-col items-center justify-center gap-1.5 aspect-[4/3] rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/50 hover:bg-amber-100/50 hover:border-amber-500 cursor-pointer hover:-translate-y-0.5 transition-all duration-200 text-amber-700"
            >
              <Plus className="w-5 h-5 text-amber-500 stroke-[2.5]" />
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                Add More
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
