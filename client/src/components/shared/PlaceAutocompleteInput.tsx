'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Trash2, AlertCircle, Loader2, MapPin, Navigation } from 'lucide-react';
import { useGooglePlaces, PlacePrediction, PlaceDetails } from '@/hooks/useGooglePlaces';

export interface PlaceAutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelected?: (place: PlaceDetails) => void;
  placeholder?: string;
  onDelete?: () => void;
  showDelete?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  countryCode?: string;
  apiKey?: string;
  debounceMs?: number;
  disabled?: boolean;
  id?: string;
  name?: string;
  filterInput?: (val: string) => string;
}

export const PlaceAutocompleteInput: React.FC<PlaceAutocompleteInputProps> = ({
  value,
  onChange,
  onPlaceSelected,
  placeholder = 'Search place or city...',
  onDelete,
  showDelete = true,
  hasError = false,
  errorMessage = 'Only alphabets and numbers are allowed',
  countryCode = 'in',
  apiKey,
  debounceMs = 300,
  disabled = false,
  id,
  name,
  filterInput,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use the enhanced Google & live geocoding Places hook
  const { predictions, isLoading, search, clearPredictions, getPlaceDetails } =
    useGooglePlaces({
      apiKey,
      countryCode,
      debounceMs,
    });

  // Handle outside click to close suggestions card
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const cleanVal = filterInput ? filterInput(rawVal) : rawVal;

    onChange(cleanVal);

    if (cleanVal.trim().length >= 2) {
      search(cleanVal);
      setIsOpen(true);
      setHighlightedIndex(-1);
    } else {
      clearPredictions();
      setIsOpen(false);
    }
  };

  const handleInputFocus = () => {
    if (value && value.trim().length >= 2) {
      search(value);
      setIsOpen(true);
    }
  };

  const handleSelectPrediction = async (prediction: PlacePrediction) => {
    const rawName = prediction.mainText || prediction.description || '';
    const formatted = filterInput
      ? filterInput(rawName.replace(/[()]/g, ''))
      : rawName;

    const trimmed = formatted.trim();
    onChange(trimmed);
    clearPredictions();
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();

    if (onPlaceSelected) {
      const details = await getPlaceDetails(prediction);
      if (details) {
        onPlaceSelected(details);
      }
    }
  };

  const handleSelectCustom = (customText: string) => {
    const cleaned = filterInput ? filterInput(customText) : customText;
    const trimmed = cleaned.trim();
    onChange(trimmed);
    clearPredictions();
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();

    if (onPlaceSelected) {
      onPlaceSelected({
        name: trimmed,
        formattedAddress: trimmed,
      });
    }
  };

  // Determine whether to display the custom location option
  const trimmedVal = value ? value.trim() : '';
  const hasExactMatch = useMemo(() => {
    if (!trimmedVal) return false;
    return predictions.some(
      (p) => p.mainText.toLowerCase() === trimmedVal.toLowerCase()
    );
  }, [predictions, trimmedVal]);

  const showCustomOption = trimmedVal.length >= 2 && !hasExactMatch;
  const customOptionIndex = predictions.length;
  const totalItems = predictions.length + (showCustomOption ? 1 : 0);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || totalItems === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < predictions.length) {
        handleSelectPrediction(predictions[highlightedIndex]);
      } else if (
        showCustomOption &&
        (highlightedIndex === customOptionIndex || highlightedIndex === -1)
      ) {
        handleSelectCustom(trimmedVal);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full flex flex-col gap-1">
      <div
        className={`relative flex items-center w-full rounded-2xl transition-all duration-200 border-2 ${
          hasError
            ? 'bg-red-50 border-red-400 hover:bg-red-100/50 focus-within:bg-white focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/20'
            : 'bg-slate-50 border-transparent hover:bg-slate-100/70 focus-within:bg-white focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-amber-400/20'
        }`}
      >
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="text"
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          className="w-full bg-transparent border-none outline-none py-3.5 pl-5 pr-14 text-sm font-medium text-gray-900 font-jakarta placeholder:text-gray-400 placeholder:font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        />

        {showDelete && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete entry"
            title="Delete entry"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-red-100 text-red-500 border-none flex items-center justify-center cursor-pointer transition-all hover:bg-red-200 hover:text-red-700 hover:scale-105 active:scale-95 [&>svg]:w-4 [&>svg]:h-4"
          >
            <Trash2 />
          </button>
        )}
      </div>

      {isOpen && (predictions.length > 0 || isLoading || showCustomOption) && (
        <div className="absolute top-[calc(100%+0.35rem)] left-0 w-full bg-white border border-gray-200 rounded-2xl shadow-xl max-h-[290px] overflow-y-auto z-50 py-1.5">
          {isLoading && (
            <div className="p-3.5 px-4 flex items-center gap-2.5 text-xs font-medium text-gray-600 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-amber-500 [&>svg]:animate-spin">
              <Loader2 />
              <span>Searching locations...</span>
            </div>
          )}

          {predictions.map((item, idx) => (
            <div
              key={item.placeId}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelectPrediction(item);
              }}
              onMouseEnter={() => setHighlightedIndex(idx)}
              className={`p-3 px-4 flex items-start gap-3 cursor-pointer text-left border-b border-gray-100 last:border-b-0 transition-colors ${
                idx === highlightedIndex ? 'bg-gray-100' : 'bg-transparent hover:bg-gray-50'
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 [&>svg]:w-3.5 [&>svg]:h-3.5">
                <MapPin />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                <span className="text-sm font-bold text-gray-900 leading-tight overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.mainText}
                </span>
                {item.secondaryText && (
                  <span className="text-xs font-normal text-gray-500 leading-snug overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.secondaryText}
                  </span>
                )}
              </div>
            </div>
          ))}

          {showCustomOption && (
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelectCustom(trimmedVal);
              }}
              onMouseEnter={() => setHighlightedIndex(customOptionIndex)}
              className={`p-3 px-4 flex items-start gap-3 cursor-pointer text-left border-t border-gray-100 transition-colors ${
                highlightedIndex === customOptionIndex
                  ? 'bg-amber-50'
                  : 'bg-[#fdfdfd] hover:bg-amber-50'
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 [&>svg]:w-3.5 [&>svg]:h-3.5">
                <Navigation />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                <span className="text-sm font-bold text-gray-900 leading-tight overflow-hidden text-ellipsis whitespace-nowrap">
                  Use &ldquo;{trimmedVal}&rdquo;
                </span>
                <span className="text-xs font-normal text-gray-500 leading-snug overflow-hidden text-ellipsis whitespace-nowrap">
                  {predictions.length > 0
                    ? 'Custom location • Click or press Enter to use'
                    : 'No direct catalog matches • Click or press Enter to use'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {hasError && (
        <span className="flex items-center gap-1.5 mt-0.5 text-xs font-semibold text-red-500 tracking-tight [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:shrink-0">
          <AlertCircle />
          {errorMessage}
        </span>
      )}
    </div>
  );
};
