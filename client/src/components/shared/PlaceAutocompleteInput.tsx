'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Trash2, AlertCircle, Loader2 } from 'lucide-react';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
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
  disabled?: boolean;
  id?: string;
  name?: string;
  filterInput?: (val: string) => string;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InputWrapper = styled.div<{ $hasError?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${({ $hasError }) => ($hasError ? '#fef2f2' : '#f8fafc')};
  border: 2px solid ${({ $hasError }) => ($hasError ? colors.red[400] : 'transparent')};
  border-radius: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $hasError }) => ($hasError ? '#fee2e2' : '#f1f5f9')};
  }

  &:focus-within {
    background-color: ${colors.white};
    border-color: ${({ $hasError }) => ($hasError ? colors.red[500] : colors.gold)};
    box-shadow: 0 0 0 4px
      ${({ $hasError }) =>
        $hasError ? 'rgba(239, 68, 68, 0.18)' : 'rgba(250, 203, 43, 0.2)'};
  }

  input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    padding: 0.9375rem 3.5rem 0.9375rem 1.25rem;
    font-size: 0.9375rem;
    font-weight: 500;
    color: ${colors.gray[900]};
    font-family: ${typography.fonts.jakarta};

    &::placeholder {
      color: ${colors.gray[400]};
      font-weight: 500;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const DeleteIconButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  background-color: #fee2e2;
  color: ${colors.red[500]};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fecaca;
    color: ${colors.red[700]};
    transform: translateY(-50%) scale(1.04);
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const SuggestionsCard = styled.div`
  position: absolute;
  top: calc(100% + 0.35rem);
  left: 0;
  width: 100%;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[200]};
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  max-height: 280px;
  overflow-y: auto;
  z-index: 50;
  padding: 0.35rem 0;

  /* Sleek custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.gray[300]};
    border-radius: 9999px;
  }
`;

const SuggestionItem = styled.div<{ $isHighlighted: boolean }>`
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid ${colors.gray[100]};
  background-color: ${({ $isHighlighted }) =>
    $isHighlighted ? colors.gray[100] : 'transparent'};
  transition: background-color 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${colors.gray[50]};
  }
`;

const PlaceMainText = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${colors.gray[900]};
  line-height: 1.25;
`;

const PlaceSecondaryText = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  color: ${colors.gray[500]};
  line-height: 1.35;
`;

const LoadingRow = styled.div`
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: ${colors.gray[500]};

  svg {
    width: 0.875rem;
    height: 0.875rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorText = styled.span`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.15rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${colors.red[500]};
  letter-spacing: -0.01em;

  svg {
    width: 0.8125rem;
    height: 0.8125rem;
    flex-shrink: 0;
  }
`;

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
  disabled = false,
  id,
  name,
  filterInput,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use the custom Google Places hook
  const { predictions, isLoading, search, clearPredictions, getPlaceDetails } =
    useGooglePlaces({
      apiKey,
      countryCode,
      debounceMs: 250,
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
    // Sanitize prediction mainText if filter is present (removes parentheses/symbols safely)
    const formatted = filterInput
      ? filterInput(prediction.mainText.replace(/[()]/g, ''))
      : prediction.mainText;

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || predictions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < predictions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : predictions.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < predictions.length) {
        handleSelectPrediction(predictions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <Container ref={containerRef}>
      <InputWrapper $hasError={hasError}>
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
        />

        {showDelete && onDelete && (
          <DeleteIconButton
            type="button"
            onClick={onDelete}
            aria-label="Delete entry"
            title="Delete entry"
          >
            <Trash2 />
          </DeleteIconButton>
        )}
      </InputWrapper>

      {isOpen && (predictions.length > 0 || isLoading) && (
        <SuggestionsCard>
          {isLoading && predictions.length === 0 && (
            <LoadingRow>
              <Loader2 />
              <span>Searching locations...</span>
            </LoadingRow>
          )}

          {predictions.map((item, idx) => (
            <SuggestionItem
              key={item.placeId}
              $isHighlighted={idx === highlightedIndex}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelectPrediction(item);
              }}
              onMouseEnter={() => setHighlightedIndex(idx)}
            >
              <PlaceMainText>{item.mainText}</PlaceMainText>
              {item.secondaryText && (
                <PlaceSecondaryText>{item.secondaryText}</PlaceSecondaryText>
              )}
            </SuggestionItem>
          ))}
        </SuggestionsCard>
      )}

      {hasError && (
        <ErrorText>
          <AlertCircle />
          {errorMessage}
        </ErrorText>
      )}
    </Container>
  );
};
