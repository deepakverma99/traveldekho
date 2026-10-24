'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Image as ImageIcon,
  UploadCloud,
  Loader2,
  Trash2,
  Check,
  Sparkles,
} from 'lucide-react';
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
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
      onChange(trimmed);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP, etc.).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert('Image file size must be less than 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (result) {
        onChange(result);
        setPromptText(file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      let query = tripTitle.trim();

      if (
        promptText &&
        !promptText.startsWith('http') &&
        !promptText.startsWith('data:') &&
        !promptText.startsWith('/')
      ) {
        query = promptText.trim();
      } else if (!query && promptText) {
        query = promptText
          .replace(/^\/trips\/|\.(png|jpg|jpeg|webp)$|[-_]/gi, ' ')
          .replace(/[^a-zA-Z0-9\s]/g, ' ')
          .trim();
      }

      if (!query) {
        query = category || 'Himalayan travel';
      }

      let images = cachedImagesRef.current;

      if (!images.length || lastQueryRef.current.toLowerCase() !== query.toLowerCase()) {
        images = await fetchGoogleImages(query);
        cachedImagesRef.current = images;
        lastQueryRef.current = query;
        imageIndexRef.current = 0;
      }

      if (images && images.length > 0) {
        const selected = images[imageIndexRef.current % images.length];
        imageIndexRef.current = (imageIndexRef.current + 1) % images.length;
        onChange(selected);
        setPromptText(selected);
      } else {
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
    <div className={`flex flex-col gap-2 w-full font-jakarta ${className}`}>
      <label htmlFor="thumbnail-image-url" className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-gray-800">
          <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
          Thumbnail Image URL
        </span>
        {value && <span className="text-[10px] font-bold text-green-600 normal-case tracking-normal">Image selected</span>}
      </label>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelected}
      />

      {/* Spacious Rounded Textarea Box */}
      <textarea
        id="thumbnail-image-url"
        rows={2}
        placeholder="Describe image to generate with AI or paste URL..."
        value={promptText || value || ''}
        onChange={(e) => handleTextChange(e.target.value)}
        className="w-full bg-[#f8fafc] hover:bg-[#f1f5f9] focus:bg-white border-2 border-transparent focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25 rounded-2xl p-4 sm:p-5 text-sm sm:text-[15px] font-medium text-gray-900 font-jakarta min-h-[5.5rem] resize-y outline-none transition-all placeholder:text-gray-400 placeholder:font-medium"
      />

      {/* Side-by-Side Action Buttons */}
      <div className="flex items-center gap-2.5 flex-wrap w-full">
        <button
          type="button"
          onClick={handleUploadClick}
          title="Upload image from computer"
          className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 bg-white text-amber-600 border-[1.5px] border-amber-500 rounded-full text-[13px] font-bold tracking-tight font-jakarta cursor-pointer transition-all duration-200 shadow-2xs min-w-0 w-auto self-start hover:bg-amber-50 hover:border-amber-600 hover:text-amber-700 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-55 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:shadow-none [&>span]:whitespace-nowrap [&>span]:overflow-hidden [&>span]:text-ellipsis [&>svg]:w-3.75 [&>svg]:h-3.75 [&>svg]:text-amber-500 disabled:[&>svg]:text-gray-400"
        >
          <UploadCloud className="w-4 h-4 stroke-[2.2]" />
          <span>Upload Image</span>
        </button>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          title="Get a new image from Google"
          className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 bg-white text-amber-600 border-[1.5px] border-amber-500 rounded-full text-[13px] font-bold tracking-tight font-jakarta cursor-pointer transition-all duration-200 shadow-2xs min-w-0 w-auto self-start hover:bg-amber-50 hover:border-amber-600 hover:text-amber-700 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-55 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:shadow-none [&>span]:whitespace-nowrap [&>span]:overflow-hidden [&>span]:text-ellipsis [&>svg]:w-3.75 [&>svg]:h-3.75 [&>svg]:text-amber-500 disabled:[&>svg]:text-gray-400"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
              <span>Fetching Image...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 stroke-[2.2]" />
              <span>Generate</span>
            </>
          )}
        </button>
      </div>

      {/* Thumbnail Preview Card */}
      {value && (
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 flex flex-col sm:flex-row sm:items-center gap-3 p-3 sm:px-4">
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
        </div>
      )}
    </div>
  );
};
