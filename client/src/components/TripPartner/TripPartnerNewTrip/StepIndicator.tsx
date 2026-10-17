'use client';

import React from 'react';
import { Check } from 'lucide-react';
import {
  StepperWrapper,
  StepNode,
  StepCircle,
  StepNodeLabel,
  StepTrackLine,
} from './styles';
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
    <StepperWrapper role="navigation" aria-label="Trip creation progress">
      {TRIP_STEPS.map((step, idx) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        const isClickable = step.number <= maxReachedStep;

        return (
          <React.Fragment key={step.number}>
            <StepNode
              onClick={() => {
                if (isClickable) {
                  onSelectStep(step.number);
                }
              }}
              style={{ cursor: isClickable ? 'pointer' : 'default' }}
              aria-current={isActive ? 'step' : undefined}
            >
              <StepCircle
                $isActive={isActive}
                $isCompleted={isCompleted}
                aria-label={`Step ${step.number}: ${step.label}`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.number}
              </StepCircle>
              <StepNodeLabel $isActive={isActive}>{step.label}</StepNodeLabel>
            </StepNode>

            {/* Connecting line between nodes (except after last step) */}
            {idx < TRIP_STEPS.length - 1 && (
              <StepTrackLine $isCompleted={step.number < currentStep} />
            )}
          </React.Fragment>
        );
      })}
    </StepperWrapper>
  );
};
