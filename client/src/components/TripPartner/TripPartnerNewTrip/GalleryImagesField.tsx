'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Images,
  UploadCloud,
  X,
} from 'lucide-react';
import {
  FormGroup,
  FieldLabel,
  FieldHint,
  ThumbnailInputArea,
  ThumbnailActionButton,
  GalleryGridContainer,
  GalleryThumbnailCard,
  AddMediaCardButton,
} from './styles';

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
    <FormGroup className={className}>
      <FieldLabel htmlFor="trip-gallery-input">
        <span className="flex items-center gap-1.5 text-gray-800">
          <Images className="w-3.5 h-3.5 text-amber-500" />
          Gallery Images (Max {maxImages})
        </span>
        <FieldHint>
          {images.length}/{maxImages} uploaded
        </FieldHint>
      </FieldLabel>

      {/* Hidden File Input for Multiple Uploads */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFilesSelected}
      />

      {/* Spacious Rounded Textarea Box matching Image 1 Design */}
      <ThumbnailInputArea
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
      />

      {/* Single Upload Images Button */}
      <ThumbnailActionButton
        type="button"
        onClick={handleUploadClick}
        disabled={isFull}
        title="Upload multiple photos from your device"
        style={{ width: '100%' }}
      >
        <UploadCloud className="w-5 h-5 stroke-[2.2]" />
        <span>Upload Images</span>
      </ThumbnailActionButton>

      {/* Gallery Thumbnails Grid */}
      {images.length > 0 && (
        <GalleryGridContainer>
          {images.map((url, idx) => (
            <GalleryThumbnailCard key={idx}>
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
                title="Remove photo"
              >
                <X className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </GalleryThumbnailCard>
          ))}

          {!isFull && (
            <AddMediaCardButton
              type="button"
              onClick={handleUploadClick}
              title="Upload more photos"
            >
              <UploadCloud className="w-5 h-5 text-amber-500" />
              <span className="text-[11px] font-bold text-gray-700">Upload Photo</span>
            </AddMediaCardButton>
          )}
        </GalleryGridContainer>
      )}
    </FormGroup>
  );
};
