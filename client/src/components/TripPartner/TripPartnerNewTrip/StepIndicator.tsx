'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { TRIP_STEPS, StepNumber } from './types';

interface StepIndicatorProps {
  currentStep: StepNumber;
  maxReachedStep: number;
  onSelectStep: (step: StepNumber) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  maxReachedStep,
  onSelectStep,
}) => {
  return (
    <div
      role="navigation"
      aria-label="Trip creation progress"
      className="flex items-center justify-between max-w-xl mx-auto mb-6 sm:mb-10 relative px-1 sm:px-2 w-full font-jakarta"
    >
      {TRIP_STEPS.map((step, idx) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        const isClickable = step.number <= maxReachedStep;

        return (
          <React.Fragment key={step.number}>
            <div
              onClick={() => {
                if (isClickable) {
                  onSelectStep(step.number);
                }
              }}
              style={{ cursor: isClickable ? 'pointer' : 'default' }}
              aria-current={isActive ? 'step' : undefined}
              className="flex flex-col items-center relative select-none min-w-0 shrink-0"
            >
              <div
                aria-label={`Step ${step.number}: ${step.label}`}
                className={`w-8 h-8 min-[480px]:w-9 min-[480px]:h-9 sm:w-10.5 sm:h-10.5 rounded-full flex items-center justify-center font-black text-xs min-[480px]:text-[13px] sm:text-[15px] transition-all duration-200 border ${
                  isActive
                    ? 'bg-amber-500 text-white border-amber-500 shadow-[0_6px_16px_-2px_rgba(250,203,43,0.45)]'
                    : isCompleted
                    ? 'bg-gray-900 text-white border-gray-900 shadow-xs'
                    : 'bg-white text-gray-300 border-gray-200 shadow-xs'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.number}
              </div>
              <span
                className={`mt-1.5 sm:mt-2 text-[9px] min-[480px]:text-[10px] sm:text-[11px] uppercase tracking-wider text-center transition-colors truncate max-w-[3.5rem] min-[480px]:max-w-[4.25rem] sm:max-w-none ${
                  isActive ? 'font-black text-gray-900' : 'font-bold text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting line between nodes (except after last step) */}
            {idx < TRIP_STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 sm:mx-2 mb-4.5 sm:mb-6 transition-colors duration-300 ${
                  step.number < currentStep ? 'bg-amber-500' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
