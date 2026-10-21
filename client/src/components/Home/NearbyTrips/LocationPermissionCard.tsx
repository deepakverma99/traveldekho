'use client';

import React from 'react';
import { MapPin, RefreshCw } from 'lucide-react';
import { Button } from '@/components/shared';
import { LocationPermissionCardProps } from './types';

export const LocationPermissionCard: React.FC<LocationPermissionCardProps> = ({
  isLoading = false,
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 w-full bg-amber-50/40 rounded-3xl border-2 border-amber-100 text-center font-jakarta">
      <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
        <MapPin className="w-7 h-7 text-primary" aria-hidden="true" />
      </div>

      <p className="font-bold text-gray-800 text-sm mb-2">
        Location access needed
      </p>

      <p className="text-xs text-gray-500 mb-2 max-w-xs leading-relaxed">
        Location permission denied. Enable it in your browser settings to see trips near you.
      </p>

      <p className="text-[11px] text-gray-400 mb-5 max-w-xs">
        On mobile: tap the 🔒 lock icon in your browser address bar → Site Settings → Allow Location.
      </p>

      <Button
        id="nearby-trips-try-again-button"
        type="button"
        disabled={isLoading}
        onClick={onRetry}
        leftIcon={
          <RefreshCw
            className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`}
            aria-hidden="true"
          />
        }
      >
        {isLoading ? 'Checking...' : 'Try Again'}
      </Button>
    </div>
  );
};
