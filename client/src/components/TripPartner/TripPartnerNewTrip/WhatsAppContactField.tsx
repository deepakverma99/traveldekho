'use client';

import React from 'react';
import { Phone } from 'lucide-react';
import { FormGroup, FieldLabel, FieldHint } from './styles';
import { filterOnlyNumbers } from './types';

export interface WhatsAppContactFieldProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const WhatsAppContactField: React.FC<WhatsAppContactFieldProps> = ({
  value,
  onChange,
  className = '',
}) => {
  // Extract the local 10 digits without leading +91 / 91
  const displayDigits = React.useMemo(() => {
    if (!value) return '';
    let digits = value.replace(/\D/g, '');
    if (digits.length > 10 && digits.startsWith('91')) {
      digits = digits.slice(2);
    }
    return digits.slice(0, 10);
  }, [value]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let clean = filterOnlyNumbers(e.target.value);
    if (clean.length > 10 && clean.startsWith('91')) {
      clean = clean.slice(2);
    }
    const digits = clean.slice(0, 10);
    // Always store with +91 if digits are present
    onChange(digits ? `+91${digits}` : '');
  };

  return (
    <FormGroup className={className}>
      <FieldLabel htmlFor="whatsapp-contact-number">
        <span className="flex items-center gap-1.5 text-gray-800">
          <Phone className="w-3.5 h-3.5 text-emerald-500" />
          WhatsApp Contact Number
        </span>
        <FieldHint>Direct inquiry number for travelers</FieldHint>
      </FieldLabel>

      <div className="relative flex items-center">
        {/* Country Code Prefix Badge (+91) */}
        <div className="absolute left-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100/90 border border-gray-200/80 rounded-xl select-none pointer-events-none">
          <span className="text-sm leading-none" role="img" aria-label="India flag">
            🇮🇳
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-gray-900 tracking-tight">
            +91
          </span>
        </div>

        <input
          id="whatsapp-contact-number"
          type="tel"
          inputMode="numeric"
          placeholder="98995 58944"
          maxLength={10}
          value={displayDigits}
          onChange={handleNumberChange}
          className="w-full bg-[#f8fafc] border-2 border-transparent hover:bg-[#f1f5f9] focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25 rounded-2xl pl-24 pr-5 py-3.5 text-sm sm:text-base font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none transition-all shadow-2xs"
        />
      </div>
    </FormGroup>
  );
};

