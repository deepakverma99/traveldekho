'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { colorTokens } from '@/theme';

export interface BookingDropdownProps {
  id?: string;
  label: string;
  value: string;
  placeholder: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  options: readonly string[] | string[];
  onSelect: (option: string) => void;
  onInputChange?: (value: string) => void;
  inputValue?: string;
  searchPlaceholder?: string;
  sectionTitle?: string;
  className?: string;
  rounded?: 'md' | 'lg' | 'xl' | '2xl';
}

const dropdownRoundedClasses: Record<'md' | 'lg' | 'xl' | '2xl', string> = {
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
};

export const BookingDropdown: React.FC<BookingDropdownProps> = ({
  id,
  label,
  value,
  placeholder,
  icon,
  isOpen,
  onToggle,
  options,
  onSelect,
  onInputChange,
  inputValue = '',
  searchPlaceholder = 'Search...',
  sectionTitle = 'Popular Options',
  className = '',
  rounded = 'xl',
}) => {
  const roundedClass = dropdownRoundedClasses[rounded];

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        id={id}
        type="button"
        onClick={onToggle}
        style={{
          backgroundColor: isOpen ? colorTokens.surfacePure : colorTokens.surfaceSubtle,
          borderColor: isOpen ? colorTokens.primaryContainer : colorTokens.surfaceBorder,
        }}
        className={`w-full flex items-center justify-between ${roundedClass} py-3 px-4 transition-all duration-200 text-left border cursor-pointer group outline-none ${
          isOpen ? 'ring-2 ring-[#FF5722]/15' : 'hover:border-gray-200'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="shrink-0 flex items-center" style={{ color: colorTokens.primaryContainer }}>
            {icon}
          </span>
          <div className="flex flex-col min-w-0">
            <span
              className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase"
              style={{ color: colorTokens.textSecondary }}
            >
              {label}
            </span>
            <span
              className="text-[13px] sm:text-[14px] font-medium truncate"
              style={{ color: colorTokens.textPrimary }}
            >
              {value || placeholder}
            </span>
          </div>
        </div>
        <ChevronDown
          className="w-4 h-4 transition-transform duration-200 shrink-0 ml-2"
          style={{
            color: isOpen ? colorTokens.primaryContainer : colorTokens.textTertiary,
            transform: isOpen ? 'rotate(180deg)' : 'none',
          }}
        />
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            style={{
              backgroundColor: colorTokens.surfacePure,
              borderColor: colorTokens.surfaceBorder,
            }}
            className={`absolute z-30 left-0 right-0 top-full mt-2 ${roundedClass} shadow-[0_15px_35px_-5px_rgba(0,0,0,0.15)] border p-2.5 max-h-60 overflow-y-auto scrollbar-hide`}
          >
            {/* Search Input when onInputChange is provided */}
            {onInputChange && (
              <div
                style={{
                  backgroundColor: colorTokens.surfaceSubtle,
                  borderColor: colorTokens.surfaceBorder,
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg mb-2 border"
              >
                <Search className="w-4 h-4 shrink-0" style={{ color: colorTokens.textTertiary }} />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => onInputChange(e.target.value)}
                  placeholder={searchPlaceholder}
                  autoFocus
                  style={{ color: colorTokens.textPrimary }}
                  className="w-full bg-transparent text-[13px] outline-none font-medium placeholder:text-gray-400"
                />
              </div>
            )}

            {/* Section Title */}
            {sectionTitle && (
              <div
                className="text-[11px] font-bold uppercase tracking-wider px-3 py-1"
                style={{ color: colorTokens.textTertiary }}
              >
                {sectionTitle}
              </div>
            )}

            {/* Options List */}
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                style={{ color: colorTokens.textSecondary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colorTokens.accentWarmTint;
                  e.currentTarget.style.color = colorTokens.primaryContainer;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = colorTokens.textSecondary;
                }}
                className="w-full text-left px-3 py-2 text-[13px] font-medium rounded-lg transition-colors cursor-pointer"
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
