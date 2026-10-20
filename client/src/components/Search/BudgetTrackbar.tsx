'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { RotateCcw } from 'lucide-react';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export interface BudgetTrackbarProps {
  minBudget?: number | null;
  maxBudget?: number | null;
  onChange: (min: number | null, max: number | null) => void;
  minLimit?: number;
  maxLimit?: number;
  step?: number;
  className?: string;
}

const DEFAULT_MIN = 2000;
const DEFAULT_MAX = 40000;
const DEFAULT_STEP = 500;
const MIN_GAP = 1000;

const Root = styled.div`
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.25rem;
  font-family: ${typography.fonts.jakarta};
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const RangeDisplay = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
`;

const PriceValue = styled.span`
  font-size: 0.9375rem;
  font-weight: 800;
  color: ${colors.charcoal};
  letter-spacing: -0.01em;
`;

const RangeSeparator = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${colors.gray[400]};
  padding: 0 0.125rem;
`;

const ResetTrackBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 11px;
  font-weight: 700;
  color: ${colors.amber[600]};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.15s ease;

  &:hover {
    color: ${colors.amber[700]};
    background-color: ${colors.amber[50]};
  }

  svg {
    width: 0.75rem;
    height: 0.75rem;
  }
`;

const TrackContainer = styled.div`
  position: relative;
  width: 100%;
  height: 28px;
  display: flex;
  align-items: center;
  user-select: none;
`;

const BaseTrack = styled.div`
  position: absolute;
  width: 100%;
  height: 6px;
  border-radius: 9999px;
  background-color: ${colors.gray[200]};
`;

const ActiveTrack = styled.div<{ $left: number; $width: number }>`
  position: absolute;
  left: ${({ $left }) => $left}%;
  width: ${({ $width }) => $width}%;
  height: 6px;
  border-radius: 9999px;
  background: linear-gradient(90deg, ${colors.amber[400]} 0%, ${colors.amber[500]} 100%);
  box-shadow: 0 1px 3px rgba(244, 140, 6, 0.25);
  transition: background 0.15s ease;
`;

const RangeInput = styled.input<{ $zIndex: number }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 6px;
  background: none;
  pointer-events: none;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  margin: 0;
  z-index: ${({ $zIndex }) => $zIndex};

  &::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    pointer-events: auto;
    width: 20px;
    height: 20px;
    border-radius: 9999px;
    background-color: ${colors.white};
    border: 2.5px solid ${colors.amber[500]};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.04);
    cursor: grab;
    transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;

    &:hover {
      transform: scale(1.15);
      border-color: ${colors.amber[600]};
      box-shadow: 0 2px 8px rgba(244, 140, 6, 0.35);
    }

    &:active {
      cursor: grabbing;
      transform: scale(1.22);
      box-shadow: 0 0 0 4px ${colors.amber[100]};
    }
  }

  &::-moz-range-thumb {
    pointer-events: auto;
    width: 20px;
    height: 20px;
    border-radius: 9999px;
    background-color: ${colors.white};
    border: 2.5px solid ${colors.amber[500]};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    cursor: grab;
    transition: transform 0.15s ease;

    &:hover {
      transform: scale(1.15);
      border-color: ${colors.amber[600]};
    }

    &:active {
      cursor: grabbing;
      transform: scale(1.22);
      box-shadow: 0 0 0 4px ${colors.amber[100]};
    }
  }

  &::-webkit-slider-runnable-track {
    background: transparent;
    border: none;
  }

  &::-moz-range-track {
    background: transparent;
    border: none;
  }
`;

const MinMaxLegend = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
  font-size: 11px;
  font-weight: 600;
  color: ${colors.gray[400]};
`;

const PresetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.375rem;
  margin-top: 0.875rem;
`;

const PresetButton = styled.button<{ $isActive: boolean }>`
  padding: 0.3125rem 0.25rem;
  font-size: 10px;
  font-weight: 700;
  border-radius: 0.5rem;
  text-align: center;
  border: 1px solid ${({ $isActive }) => ($isActive ? colors.charcoal : colors.gray[200])};
  background-color: ${({ $isActive }) => ($isActive ? colors.charcoal : colors.white)};
  color: ${({ $isActive }) => ($isActive ? colors.white : colors.gray[700])};
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  box-shadow: ${({ $isActive }) => ($isActive ? '0 1px 3px rgba(0, 0, 0, 0.15)' : 'none')};

  &:hover {
    border-color: ${({ $isActive }) => ($isActive ? colors.black : colors.gray[300])};
    background-color: ${({ $isActive }) => ($isActive ? colors.black : colors.gray[100])};
    color: ${({ $isActive }) => ($isActive ? colors.white : colors.gray[900])};
  }
`;

const formatCurrency = (val: number): string => {
  return `₹${val.toLocaleString('en-IN')}`;
};

export const BudgetTrackbar: React.FC<BudgetTrackbarProps> = ({
  minBudget,
  maxBudget,
  onChange,
  minLimit = DEFAULT_MIN,
  maxLimit = DEFAULT_MAX,
  step = DEFAULT_STEP,
  className = '',
}) => {
  const [prevProps, setPrevProps] = useState<{
    min: number | null;
    max: number | null;
  }>({
    min: minBudget ?? null,
    max: maxBudget ?? null,
  });
  const [minVal, setMinVal] = useState<number>(minBudget ?? minLimit);
  const [maxVal, setMaxVal] = useState<number>(maxBudget ?? maxLimit);

  // Sync internal state when external props change (e.g. filter reset or active chip removal)
  if (
    prevProps.min !== (minBudget ?? null) ||
    prevProps.max !== (maxBudget ?? null)
  ) {
    setPrevProps({ min: minBudget ?? null, max: maxBudget ?? null });
    setMinVal(minBudget ?? minLimit);
    setMaxVal(maxBudget ?? maxLimit);
  }

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const commitBudgetChange = useCallback(
    (newMin: number, newMax: number) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        const finalMin = newMin <= minLimit ? null : newMin;
        const finalMax = newMax >= maxLimit ? null : newMax;
        onChange(finalMin, finalMax);
      }, 150);
    },
    [minLimit, maxLimit, onChange]
  );

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - MIN_GAP);
    setMinVal(value);
    commitBudgetChange(value, maxVal);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + MIN_GAP);
    setMaxVal(value);
    commitBudgetChange(minVal, value);
  };

  const handleReset = () => {
    setMinVal(minLimit);
    setMaxVal(maxLimit);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    onChange(null, null);
  };

  const applyPreset = (presetMin: number, presetMax: number) => {
    setMinVal(presetMin);
    setMaxVal(presetMax);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    const finalMin = presetMin <= minLimit ? null : presetMin;
    const finalMax = presetMax >= maxLimit ? null : presetMax;
    onChange(finalMin, finalMax);
  };

  const minPercent = Math.min(
    100,
    Math.max(0, Math.round(((minVal - minLimit) / (maxLimit - minLimit)) * 100))
  );
  const maxPercent = Math.min(
    100,
    Math.max(0, Math.round(((maxVal - minLimit) / (maxLimit - minLimit)) * 100))
  );

  const isFiltered = minVal > minLimit || maxVal < maxLimit;

  return (
    <Root className={className}>
      <HeaderRow>
        <RangeDisplay>
          <PriceValue>{formatCurrency(minVal)}</PriceValue>
          <RangeSeparator>–</RangeSeparator>
          <PriceValue>
            {formatCurrency(maxVal)}
            {maxVal >= maxLimit ? '+' : ''}
          </PriceValue>
        </RangeDisplay>

        {isFiltered && (
          <ResetTrackBtn type="button" onClick={handleReset} title="Reset budget">
            <RotateCcw />
            <span>Reset</span>
          </ResetTrackBtn>
        )}
      </HeaderRow>

      <TrackContainer>
        <BaseTrack />
        <ActiveTrack
          $left={minPercent}
          $width={Math.max(0, maxPercent - minPercent)}
        />

        <RangeInput
          type="range"
          min={minLimit}
          max={maxLimit}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          $zIndex={minVal > maxLimit - 1000 ? 5 : 3}
          aria-label="Minimum budget"
        />

        <RangeInput
          type="range"
          min={minLimit}
          max={maxLimit}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          $zIndex={4}
          aria-label="Maximum budget"
        />
      </TrackContainer>

      <MinMaxLegend>
        <span>{formatCurrency(minLimit)}</span>
        <span>{formatCurrency(maxLimit)}+</span>
      </MinMaxLegend>

      <PresetsContainer>
        <PresetButton
          type="button"
          $isActive={!isFiltered}
          onClick={() => applyPreset(minLimit, maxLimit)}
        >
          All
        </PresetButton>
        <PresetButton
          type="button"
          $isActive={minVal === minLimit && maxVal === 8000}
          onClick={() => applyPreset(minLimit, 8000)}
        >
          &lt; ₹8k
        </PresetButton>
        <PresetButton
          type="button"
          $isActive={minVal === 8000 && maxVal === 20000}
          onClick={() => applyPreset(8000, 20000)}
        >
          ₹8k - ₹20k
        </PresetButton>
        <PresetButton
          type="button"
          $isActive={minVal === 20000 && maxVal === maxLimit}
          onClick={() => applyPreset(20000, maxLimit)}
        >
          ₹20k+
        </PresetButton>
      </PresetsContainer>
    </Root>
  );
};
