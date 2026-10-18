'use client';

import React, { useState, useRef } from 'react';
import {
  Video,
  UploadCloud,
  X,
  Play,
  Film,
} from 'lucide-react';
import {
  FormGroup,
  FieldLabel,
  FieldHint,
  ThumbnailInputArea,
  ThumbnailActionButton,
  ReelsGridContainer,
  ReelCardItem,
  AddReelCardButton,
} from './styles';

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
    <FormGroup className={className}>
      <FieldLabel htmlFor="trip-reels-input">
        <span className="flex items-center gap-1.5 text-gray-800">
          <Video className="w-3.5 h-3.5 text-amber-500" />
          Trip Reels (Max {maxReels} Short Videos)
        </span>
        <FieldHint>
          {reels.length}/{maxReels} uploaded
        </FieldHint>
      </FieldLabel>

      {/* Hidden File Input for Video Reels */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="video/*"
        className="hidden"
        onChange={handleFilesSelected}
      />

      {/* Spacious Rounded Textarea Box matching Image 1 Design */}
      <ThumbnailInputArea
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
      />

      {/* Single Upload Reels Button */}
      <ThumbnailActionButton
        type="button"
        onClick={handleUploadClick}
        disabled={isFull}
        title="Upload short videos / reels from your device"
      >
        <UploadCloud className="w-4 h-4 stroke-[2.2]" />
        <span>Upload Reels</span>
      </ThumbnailActionButton>

      {/* Reels Thumbnails Grid */}
      {reels.length > 0 && (
        <ReelsGridContainer>
          {reels.map((reel, idx) => {
            const isDirectVideo =
              reel.startsWith('data:video') ||
              reel.endsWith('.mp4') ||
              reel.endsWith('.webm') ||
              reel.endsWith('.mov');

            return (
              <ReelCardItem key={idx}>
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
                  <div className="w-full h-full bg-linear-to-b from-gray-900 to-black flex flex-col items-center justify-center p-2 text-center">
                    <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center mb-2 shadow-md">
                      <Play className="w-5 h-5 ml-0.5 fill-black" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-300 line-clamp-2 px-1">
                      {reel.replace(/^https?:\/\/(www\.)?/, '')}
                    </span>
                  </div>
                )}
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-black/80 text-amber-300 backdrop-blur-xs shadow-xs">
                  Reel #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all shadow-sm cursor-pointer hover:scale-105"
                  title="Remove reel"
                >
                  <X className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </ReelCardItem>
            );
          })}

          {!isFull && (
            <AddReelCardButton
              type="button"
              onClick={handleUploadClick}
              title="Upload more video reels"
            >
              <Film className="w-6 h-6 text-amber-500" />
              <span className="text-[11px] font-bold text-gray-700">Upload Reel</span>
            </AddReelCardButton>
          )}
        </ReelsGridContainer>
      )}
    </FormGroup>
  );
};
