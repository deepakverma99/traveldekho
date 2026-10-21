'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  action?: string;
  method?: string;
  name?: string;
  className?: string;
  variant?: 'header' | 'filter';
  maxWidth?: string;
  minWidth?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  'aria-label'?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  onSubmit,
  placeholder = 'Search your next Destination',
  action = '/search',
  method = 'GET',
  name = 'q',
  className = '',
  variant = 'header',
  maxWidth,
  minWidth,
  autoComplete = 'off',
  autoFocus,
  'aria-label': ariaLabel = 'Search',
}) => {
  if (variant === 'filter') {
    return (
      <div
        style={{
          minWidth: minWidth || '180px',
          maxWidth: maxWidth || '260px',
        }}
        className={`relative flex items-center flex-1 ${className}`}
      >
        <Search className="absolute left-3.5 text-gray-400 w-4 h-4 pointer-events-none" />
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          aria-label={ariaLabel}
          className={`w-full py-2.25 bg-white border border-gray-200 rounded-xl text-[13px] text-gray-800 font-jakarta outline-none transition-all placeholder:text-gray-400 placeholder:font-medium focus:border-amber-400 focus:ring-3 focus:ring-amber-100/50 pl-9.5 ${
            value && onClear ? 'pr-9' : 'pr-3.5'
          }`}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="absolute right-2.5 bg-transparent border-0 text-gray-400 cursor-pointer flex items-center justify-center p-0.5 transition-colors hover:text-gray-600 [&>svg]:w-3.5 [&>svg]:h-3.5"
          >
            <X />
          </button>
        )}
      </div>
    );
  }

  return (
    <form
      action={action}
      method={method}
      onSubmit={onSubmit}
      className={`hidden md:flex items-center ml-4 lg:ml-8 flex-1 max-w-sm lg:max-w-md ${className}`}
    >
      <div className="relative w-full">
        <input
          placeholder={placeholder}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          aria-label={ariaLabel}
          className="w-full h-10 pl-4.5 pr-11 text-sm text-gray-800 bg-white border border-gray-300 rounded-full outline-none transition-all font-medium shadow-xs placeholder:text-gray-400 hover:border-gray-400 focus:border-amber-500 focus:ring-3 focus:ring-amber-100"
        />
        <button
          type="submit"
          aria-label="Submit Search"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center bg-white rounded-full transition-all border border-gray-200 shadow-xs cursor-pointer hover:bg-amber-500 hover:border-amber-500 [&:hover_svg]:text-white"
        >
          <Search className="w-4 h-4 text-gray-400 transition-colors" />
        </button>
      </div>
    </form>
  );
};
