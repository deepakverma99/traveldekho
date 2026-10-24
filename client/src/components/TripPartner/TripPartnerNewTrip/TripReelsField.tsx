'use client';

import React, { useState, useRef } from 'react';
import {
  Video,
  UploadCloud,
  X,
  Play,
  Film,
  Plus,
} from 'lucide-react';

export interface TripReelsFieldProps {
  reels: string[];
  onChange: (reels: string[]) => void;
  maxReels?: number;
  className?: string;
}

export const TripReelsField: React.FC<TripReelsFieldProps> = ({
  reels = [],
  onChange,
  maxReels = 5,
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState('');

  const isFull = reels.length >= maxReels;

  const handleUploadClick = () => {
    if (isFull) return;
    fileInputRef.current?.click();
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = maxReels - reels.length;
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
      onChange([...reels, ...valid].slice(0, maxReels));
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddReel = () => {
    if (isFull) return;
    const trimmed = inputText.trim();
    if (!trimmed) {
      handleUploadClick();
      return;
    }

    onChange([...reels, trimmed].slice(0, maxReels));
    setInputText('');
  };

  const handleRemove = (index: number) => {
    onChange(reels.filter((_, idx) => idx !== index));
  };

  return (
    <div className={`flex flex-col gap-2 w-full font-jakarta ${className}`}>
      <label htmlFor="trip-reels-input" className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-gray-800">
          <Video className="w-3.5 h-3.5 text-amber-500" />
          Trip Reels (Max {maxReels} Short Videos)
        </span>
        <span className="text-[10px] font-bold text-gray-400 normal-case tracking-normal">
          {reels.length}/{maxReels} uploaded
        </span>
      </label>

      {/* Hidden File Input for Video Reels */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="video/*"
        className="hidden"
        onChange={handleFilesSelected}
      />

      {/* Spacious Rounded Textarea Box */}
      <textarea
        id="trip-reels-input"
        rows={2}
        placeholder="Paste video reel URL (press Enter) or upload short videos below..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isFull}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddReel();
          }
        }}
        className="w-full bg-[#f8fafc] hover:bg-[#f1f5f9] focus:bg-white border-2 border-transparent focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25 rounded-2xl p-4 sm:p-5 text-sm sm:text-[15px] font-medium text-gray-900 font-jakarta min-h-[5.5rem] resize-y outline-none transition-all placeholder:text-gray-400 placeholder:font-medium disabled:opacity-50"
      />

      {/* Single Upload Reels Button */}
      <button
        type="button"
        onClick={handleUploadClick}
        disabled={isFull}
        title="Upload short videos / reels from your device"
        className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 bg-white text-amber-600 border-[1.5px] border-amber-500 rounded-full text-[13px] font-bold tracking-tight font-jakarta cursor-pointer transition-all duration-200 shadow-2xs min-w-0 w-auto self-start hover:bg-amber-50 hover:border-amber-600 hover:text-amber-700 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-55 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:shadow-none [&>span]:whitespace-nowrap [&>span]:overflow-hidden [&>span]:text-ellipsis [&>svg]:w-3.75 [&>svg]:h-3.75 [&>svg]:text-amber-500 disabled:[&>svg]:text-gray-400"
      >
        <UploadCloud className="w-4 h-4 stroke-[2.2]" />
        <span>Upload Reels</span>
      </button>

      {/* Reels Thumbnails Grid */}
      {reels.length > 0 && (
        <div className="grid grid-cols-2 min-[480px]:grid-cols-3 gap-3 mt-3">
          {reels.map((reel, idx) => {
            const isDirectVideo =
              reel.startsWith('data:video') ||
              reel.endsWith('.mp4') ||
              reel.endsWith('.webm') ||
              reel.endsWith('.mov');

            return (
              <div
                key={idx}
                className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-gray-200 hover:border-amber-400 bg-gray-900 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                {isDirectVideo ? (
                  <video
                    src={reel}
                    className="w-full h-full object-cover"
                    controls={false}
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white p-3 text-center">
                    <Film className="w-8 h-8 text-amber-400 mb-2 opacity-80" />
                    <span className="text-[10px] font-mono text-gray-400 truncate max-w-full">
                      External Reel
                    </span>
                  </div>
                )}

                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[9px] font-black bg-black/75 text-white backdrop-blur-xs shadow-xs flex items-center gap-1">
                  <Play className="w-2.5 h-2.5 fill-white" /> #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all shadow-sm cursor-pointer hover:scale-105"
                  title="Remove reel"
                  aria-label="Remove reel"
                >
                  <X className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
            );
          })}

          {/* Quick Add More Card */}
          {!isFull && (
            <button
              type="button"
              onClick={handleUploadClick}
              title="Add more video reels"
              className="flex flex-col items-center justify-center gap-1.5 aspect-[9/16] rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/50 hover:bg-amber-100/50 hover:border-amber-500 cursor-pointer hover:-translate-y-0.5 transition-all duration-200 text-amber-700"
            >
              <Plus className="w-6 h-6 text-amber-500 stroke-[2.5]" />
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                Add Reel
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
