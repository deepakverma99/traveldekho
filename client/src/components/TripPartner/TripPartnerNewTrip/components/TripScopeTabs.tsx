'use client';

import React from 'react';
import { TripType } from '../types';

interface TripScopeTabsProps {
  activeScope: TripType;
  onScopeChange: (scope: TripType) => void;
}

export const TripScopeTabs: React.FC<TripScopeTabsProps> = ({
  activeScope,
  onScopeChange,
}) => {
  return (
    <div
      role="tablist"
      aria-label="Trip Destination Scope"
      className="flex items-center p-1.5 bg-[#f1f5f9] rounded-2xl w-full sm:w-auto self-start border border-gray-200/90 shadow-2xs font-jakarta select-none"
    >
      <button
        id="tab-scope-domestic"
        role="tab"
        type="button"
        aria-selected={activeScope === 'domestic'}
        aria-controls="panel-scope-domestic"
        onClick={() => onScopeChange('domestic')}
        className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-2.5 px-5 sm:px-6 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer outline-none focus:outline-none focus:ring-0 ${
          activeScope === 'domestic'
            ? 'bg-[#ff5722] text-white shadow-[0_2px_8px_rgba(255,87,34,0.35)]'
            : 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-white/70'
        }`}
      >
        <span className="text-base leading-none">🇮🇳</span>
        <span>Domestic</span>
        <span
          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full transition-colors ${
            activeScope === 'domestic'
              ? 'bg-white/20 text-white'
              : 'bg-gray-200/80 text-gray-600'
          }`}
        >
          India
        </span>
      </button>

      <button
        id="tab-scope-international"
        role="tab"
        type="button"
        aria-selected={activeScope === 'international'}
        aria-controls="panel-scope-international"
        onClick={() => onScopeChange('international')}
        className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-2.5 px-5 sm:px-6 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer outline-none focus:outline-none focus:ring-0 ${
          activeScope === 'international'
            ? 'bg-[#ff5722] text-white shadow-[0_2px_8px_rgba(255,87,34,0.35)]'
            : 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-white/70'
        }`}
      >
        <span className="text-base leading-none">✈️</span>
        <span>International</span>
        <span
          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full transition-colors ${
            activeScope === 'international'
              ? 'bg-white/20 text-white'
              : 'bg-gray-200/80 text-gray-600'
          }`}
        >
          Global
        </span>
      </button>
    </div>
  );
};

