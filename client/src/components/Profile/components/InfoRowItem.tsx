'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { colorTokens } from '@/theme';

export interface InfoRowItemProps {
  id: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
  placeholder?: string;
  isPlaceholder?: boolean;
  onClick?: () => void;
  isDestructive?: boolean;
}

export const InfoRowItem: React.FC<InfoRowItemProps> = ({
  icon: Icon,
  label,
  value,
  placeholder,
  isPlaceholder = false,
  onClick,
  isDestructive = false,
}) => {
  const displayValue = value || placeholder || 'Not set';

  if (isDestructive) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center justify-between py-3.5 px-3 rounded-2xl hover:bg-red-50/60 transition-colors text-left group cursor-pointer"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
            <Icon className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-red-400">
              {label}
            </span>
            <span className="block text-sm sm:text-[15px] font-bold text-red-600 mt-0.5">
              {displayValue}
            </span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-red-300 group-hover:text-red-500 transition-colors stroke-[2]" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between py-3 px-3 rounded-2xl hover:bg-gray-50/80 transition-colors text-left group cursor-pointer"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
          <Icon
            className="w-5 h-5 stroke-[2]"
            style={{ color: colorTokens.primaryContainer }}
          />
        </div>
        <div className="min-w-0">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
            {label}
          </span>
          <span
            className={`block text-sm sm:text-[15px] mt-0.5 truncate ${
              isPlaceholder
                ? 'font-medium italic text-gray-400'
                : 'font-bold text-gray-900'
            }`}
          >
            {displayValue}
          </span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors stroke-[2] shrink-0 ml-2" />
    </button>
  );
};
