'use client';

import React from 'react';
import { ShieldAlert } from 'lucide-react';

export interface TripDisclaimerFieldProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const TripDisclaimerField: React.FC<TripDisclaimerFieldProps> = ({
  value = '',
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-2 w-full font-jakarta ${className}`}>
      <label htmlFor="trip-disclaimer" className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-gray-800">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
          Trip Disclaimer / Important Notice
        </span>
        <span className="text-[10px] font-bold text-gray-400 normal-case tracking-normal">
          Optional notice or safety guidelines for travelers
        </span>
      </label>
      <textarea
        id="trip-disclaimer"
        rows={3}
        placeholder="e.g. Weather conditions in high altitude passes can lead to route changes. Travelers must carry valid ID proof and ensure medical fitness for high-altitude acclimatization."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl py-3.5 px-4 sm:px-5 text-sm sm:text-[15px] font-medium leading-relaxed text-gray-900 font-jakarta outline-none min-h-[7.5rem] sm:min-h-[8.5rem] resize-y transition-all placeholder:text-gray-400 placeholder:font-medium bg-[#f8fafc] border-2 border-transparent hover:bg-[#f1f5f9] focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25"
      />
    </div>
  );
};
