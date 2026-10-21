'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options?: readonly SelectOption[] | SelectOption[];
  isFullWidth?: boolean;
  wrapperClassName?: string;
  icon?: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  options,
  children,
  isFullWidth,
  wrapperClassName = '',
  icon,
  className = '',
  ...selectProps
}) => {
  return (
    <div
      className={`relative inline-flex items-center ${
        isFullWidth ? 'w-full' : 'w-auto'
      } ${wrapperClassName}`}
    >
      <select
        className={`appearance-none py-2.5 pl-3.5 pr-9 bg-white border border-gray-200 rounded-xl text-[13px] font-bold text-gray-800 font-jakarta cursor-pointer outline-none transition-all hover:border-gray-300 hover:bg-gray-50/50 focus:border-amber-400 focus:ring-3 focus:ring-amber-100/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-gray-100 ${
          isFullWidth ? 'w-full' : 'w-auto'
        } ${className}`}
        {...selectProps}
      >
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
      {icon ? (
        <span className="absolute right-3 text-gray-500 pointer-events-none w-3.5 h-3.5 flex items-center justify-center">
          {icon}
        </span>
      ) : (
        <ChevronDown className="absolute right-3 text-gray-500 pointer-events-none w-3.5 h-3.5" />
      )}
    </div>
  );
};
