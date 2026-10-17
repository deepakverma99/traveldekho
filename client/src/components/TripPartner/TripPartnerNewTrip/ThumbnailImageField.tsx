'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Image as ImageIcon,
  UploadCloud,
  Loader2,
  Trash2,
  Check,
} from 'lucide-react';
import {
  FormGroup,
  FieldLabel,
  FieldHint,
  ThumbnailInputArea,
  ThumbnailButtonsGrid,
  ThumbnailActionButton,
  ThumbnailPreviewCard,
} from './styles';
import { DEFAULT_PRESET_IMAGES } from './types';
import { fetchGoogleImages } from '@/lib/googleImageService';

export interface ThumbnailImageFieldProps {
  value: string;
  onChange: (url: string) => void;
  tripTitle?: string;
  category?: string;
  className?: string;
}

export const ThumbnailImageField: React.FC<ThumbnailImageFieldProps> = ({
  value,
  onChange,
  tripTitle = '',
  category = '',
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [prevValue, setPrevValue] = useState(value);
  const [promptText, setPromptText] = useState(value || '');
  const [isGenerating, setIsGenerating] = useState(false);

  const cachedImagesRef = useRef<string[]>([]);
  const lastQueryRef = useRef<string>('');
  const imageIndexRef = useRef<number>(0);

  // Sync prompt text when external value changes without cascading effect
  if (value !== prevValue) {
    setPrevValue(value);
    setPromptText(value || '');
  }

  const handleTextChange = (val: string) => {
    setPromptText(val);
    const trimmed = val.trim();
    if (!trimmed) {
      onChange('');
      return;
    }
    // Direct image URL or base64 data
    if (
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('/') ||
      trimmed.startsWith('data:image/')
    ) {
      onChange(trimmed);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          onChange(dataUrl);
          setPromptText(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      // Determine the best query for search
      let query = tripTitle.trim();

      // If user typed custom text in the box that is not a raw URL/path, use it
      if (
        promptText &&
        !promptText.startsWith('http') &&
        !promptText.startsWith('data:') &&
        !promptText.startsWith('/')
      ) {
        query = promptText.trim();
      } else if (!query && promptText) {
        // Strip out file extension and path: e.g. /trips/spiti.png -> spiti
        query = promptText
          .replace(/^\/trips\/|\.(png|jpg|jpeg|webp)$|[-_]/gi, ' ')
          .replace(/[^a-zA-Z0-9\s]/g, ' ')
          .trim();
      }

      if (!query) {
        query = category || 'Himalayan travel';
      }

      let images = cachedImagesRef.current;

      // If query changed or cache is empty, fetch fresh batch from Google/web
      if (!images.length || lastQueryRef.current.toLowerCase() !== query.toLowerCase()) {
        images = await fetchGoogleImages(query);
        cachedImagesRef.current = images;
        lastQueryRef.current = query;
        imageIndexRef.current = 0;
      }

      if (images && images.length > 0) {
        // Pick the next image in the array to give a new image every click
        const selected = images[imageIndexRef.current % images.length];
        imageIndexRef.current = (imageIndexRef.current + 1) % images.length;
        onChange(selected);
        setPromptText(selected);
      } else {
        // Offline / fallback pool
        const presets = DEFAULT_PRESET_IMAGES;
        const filtered = presets.filter((p) => p.url !== value);
        const pool = filtered.length > 0 ? filtered : presets;
        const randomPreset = pool[Math.floor(Math.random() * pool.length)];
        onChange(randomPreset.url);
        setPromptText(randomPreset.url);
      }
    } catch (err) {
      console.warn('[ThumbnailImageField] Generate error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    onChange('');
    setPromptText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <FormGroup className={className}>
      <FieldLabel htmlFor="thumbnail-image-url">
        <span className="flex items-center gap-1.5 text-gray-800">
          <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
          Thumbnail Image URL
        </span>
        {value && <FieldHint className="text-green-600 font-bold">Image selected</FieldHint>}
      </FieldLabel>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelected}
      />

      {/* Spacious Rounded Textarea Box matching screenshot */}
      <ThumbnailInputArea
        id="thumbnail-image-url"
        rows={2}
        placeholder="Describe image to generate with AI or paste URL..."
        value={promptText || value || ''}
        onChange={(e) => handleTextChange(e.target.value)}
      />

      {/* Side-by-Side Action Buttons */}
      <ThumbnailButtonsGrid>
        <ThumbnailActionButton
          type="button"
          onClick={handleUploadClick}
          title="Upload image from computer"
        >
          <UploadCloud className="w-5 h-5 stroke-[2.2]" />
          <span>Upload Image</span>
        </ThumbnailActionButton>

        <ThumbnailActionButton
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          title="Get a new image from Google"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-black" />
              <span>Fetching Image...</span>
            </>
          ) : (
            <span>Generate</span>
          )}
        </ThumbnailActionButton>
      </ThumbnailButtonsGrid>

      {/* Thumbnail Preview Card */}
      {value && (
        <ThumbnailPreviewCard>
          <div className="relative w-full sm:w-36 h-24 rounded-xl overflow-hidden bg-gray-200 shrink-0 border border-gray-200">
            <Image
              src={value}
              alt="Trip Thumbnail Preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full">
                <Check className="w-3 h-3 stroke-[3]" />
                Active Thumbnail
              </span>
              <p className="text-xs font-semibold text-gray-700 mt-2 truncate">
                {value.startsWith('data:') ? 'Uploaded File from Device' : value}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove Image
              </button>
            </div>
          </div>
        </ThumbnailPreviewCard>
      )}
    </FormGroup>
  );
};
