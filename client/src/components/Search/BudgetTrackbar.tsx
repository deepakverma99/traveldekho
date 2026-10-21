'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';

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

const formatCurrency = (val: number): string => {
  return `₹${val.toLocaleString('en-IN')}`;
};

const rangeInputClasses =
  'absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-transparent pointer-events-none appearance-none outline-none m-0 ' +
  '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto ' +
  '[&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full ' +
  '[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[2.5px] [&::-webkit-slider-thumb]:border-primary ' +
  '[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing ' +
  '[&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-115 active:[&::-webkit-slider-thumb]:scale-125 ' +
  '[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 ' +
  '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-[2.5px] ' +
  '[&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-grab ' +
  'active:[&::-moz-range-thumb]:cursor-grabbing [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent';

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
    <div className={`w-full pt-2 pb-1 font-jakarta ${className}`}>
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-baseline gap-1">
          <span className="text-[15px] font-extrabold text-charcoal tracking-tight">
            {formatCurrency(minVal)}
          </span>
          <span className="text-xs font-bold text-gray-400 px-0.5">–</span>
          <span className="text-[15px] font-extrabold text-charcoal tracking-tight">
            {formatCurrency(maxVal)}
            {maxVal >= maxLimit ? '+' : ''}
          </span>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={handleReset}
            title="Reset budget"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:text-amber-700 hover:bg-amber-50 px-1 py-0.5 rounded cursor-pointer transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Track Container */}
      <div className="relative w-full h-7 flex items-center select-none">
        {/* Base Track */}
        <div className="absolute w-full h-1.5 rounded-full bg-gray-200" />

        {/* Active Colored Track */}
        <div
          className="absolute h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_1px_3px_rgba(244,140,6,0.25)] transition-all duration-150"
          style={{
            left: `${minPercent}%`,
            width: `${Math.max(0, maxPercent - minPercent)}%`,
          }}
        />

        {/* Min Input Slider */}
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          style={{ zIndex: minVal > maxLimit - 1000 ? 5 : 3 }}
          aria-label="Minimum budget"
          className={rangeInputClasses}
        />

        {/* Max Input Slider */}
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          style={{ zIndex: 4 }}
          aria-label="Maximum budget"
          className={rangeInputClasses}
        />
      </div>

      {/* Min/Max Legend */}
      <div className="flex items-center justify-between mt-1 text-[11px] font-semibold text-gray-400">
        <span>{formatCurrency(minLimit)}</span>
        <span>{formatCurrency(maxLimit)}+</span>
      </div>

      {/* Presets Container */}
      <div className="grid grid-cols-4 gap-1.5 mt-3.5">
        <button
          type="button"
          onClick={() => applyPreset(minLimit, maxLimit)}
          className={`py-1.5 px-1 text-[10px] font-bold rounded-lg text-center cursor-pointer transition-all whitespace-nowrap ${
            !isFiltered
              ? 'bg-charcoal text-white border border-charcoal shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => applyPreset(minLimit, 8000)}
          className={`py-1.5 px-1 text-[10px] font-bold rounded-lg text-center cursor-pointer transition-all whitespace-nowrap ${
            minVal === minLimit && maxVal === 8000
              ? 'bg-charcoal text-white border border-charcoal shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          &lt; ₹8k
        </button>
        <button
          type="button"
          onClick={() => applyPreset(8000, 20000)}
          className={`py-1.5 px-1 text-[10px] font-bold rounded-lg text-center cursor-pointer transition-all whitespace-nowrap ${
            minVal === 8000 && maxVal === 20000
              ? 'bg-charcoal text-white border border-charcoal shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          ₹8k - ₹20k
        </button>
        <button
          type="button"
          onClick={() => applyPreset(20000, maxLimit)}
          className={`py-1.5 px-1 text-[10px] font-bold rounded-lg text-center cursor-pointer transition-all whitespace-nowrap ${
            minVal === 20000 && maxVal === maxLimit
              ? 'bg-charcoal text-white border border-charcoal shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          ₹20k+
        </button>
      </div>
    </div>
  );
};
