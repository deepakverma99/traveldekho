'use client';

import React, { useRef, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { VibeItem } from './types';

interface VibeCardProps {
  item: VibeItem;
}

export const VibeCard: React.FC<VibeCardProps> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy or interruption fallback
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div className="relative w-52 flex-shrink-0 md:w-[18.875rem]">
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl shadow-md bg-neutral-900 group">
        <div
          role="button"
          tabIndex={0}
          onClick={togglePlay}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              togglePlay();
            }
          }}
          className="relative h-full w-full cursor-pointer select-none"
        >
          <video
            ref={videoRef}
            loop
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            playsInline
            muted={isMuted}
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            className="h-full w-full object-cover"
          >
            <source src={item.videoSrc} type="video/mp4" />
            <source src={`/storage/traveldekho-media/traveldekho/vibe/videos/${item.videoSrc.split('/').pop()}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/75 pointer-events-none" />

          {/* Details Overlay */}
          <div className="absolute bottom-3 left-3 right-12 z-10 pointer-events-none">
            <h4 className="text-white font-bold text-xs md:text-sm drop-shadow-md line-clamp-1 uppercase tracking-tight">
              {item.title}
            </h4>
            <p className="text-[10px] text-amber-300 font-bold uppercase tracking-wider drop-shadow-sm mt-0.5">
              📍 {item.location}
            </p>
          </div>

          {/* Centered Play Button when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none bg-black/25 transition-opacity duration-200">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white shadow-lg">
                <Play className="w-5 h-5 ml-0.5 fill-white" />
              </div>
            </div>
          )}

          {/* Mute / Unmute Button */}
          <button
            type="button"
            data-mute-button="true"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            onClick={toggleMute}
            className="absolute bottom-2.5 right-2.5 z-10 rounded-full bg-black/60 backdrop-blur-sm p-2 text-white transition hover:bg-black/90 active:scale-95 cursor-pointer shadow-md"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-white" />
            ) : (
              <Volume2 className="h-4 w-4 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
