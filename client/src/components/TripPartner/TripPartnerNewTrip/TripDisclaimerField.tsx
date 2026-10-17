'use client';

import React from 'react';
import { ShieldAlert } from 'lucide-react';
import {
  FormGroup,
  FieldLabel,
  FieldHint,
  FieldTextarea,
} from './styles';

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
    <FormGroup className={className}>
      <FieldLabel htmlFor="trip-disclaimer">
        <span className="flex items-center gap-1.5 text-gray-800">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
          Trip Disclaimer / Important Notice
        </span>
        <FieldHint>Optional notice or safety guidelines for travelers</FieldHint>
      </FieldLabel>
      <FieldTextarea
        id="trip-disclaimer"
        rows={3}
        placeholder="e.g. Weather conditions in high altitude passes can lead to route changes. Travelers must carry valid ID proof and ensure medical fitness for high-altitude acclimatization."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormGroup>
  );
};
