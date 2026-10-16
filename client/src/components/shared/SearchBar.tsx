'use client';

import React from 'react';
import styled from 'styled-components';
import { Search, X } from 'lucide-react';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export interface SearchBarProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  action?: string;
  method?: string;
  name?: string;
  className?: string;
  variant?: 'header' | 'filter';
  maxWidth?: string;
  minWidth?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  'aria-label'?: string;
}

/* Header variant container */
const HeaderContainer = styled.form`
  display: none;
  align-items: center;
  margin-left: 1rem;
  flex: 1;
  max-width: 24rem;

  @media (min-width: 768px) {
    display: flex;
  }

  @media (min-width: 1024px) {
    margin-left: 2rem;
    max-width: 28rem;
  }
`;

const HeaderInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const HeaderInput = styled.input`
  width: 100%;
  height: 2.5rem;
  padding-left: 1rem;
  padding-right: 2.5rem;
  font-size: ${typography.sizes.sm};
  color: ${colors.gray[600]};
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(253, 230, 138, 0.6);
  border-radius: 9999px;
  outline: none;
  transition: all 0.2s;
  font-weight: ${typography.weights.medium};

  &::placeholder {
    color: ${colors.gray[400]};
  }

  &:focus {
    border-color: ${colors.amber[400]};
    box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2);
  }
`;

const HeaderSubmitButton = styled.button`
  position: absolute;
  right: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  border-radius: 9999px;
  transition: background-color 0.2s;
  border: 1px solid rgba(253, 230, 138, 0.4);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: ${colors.amber[400]};

    svg {
      color: ${colors.white};
    }
  }

  svg {
    transition: color 0.2s;
  }
`;

/* Filter/Standard variant container */
const FilterContainer = styled.div<{ $maxWidth?: string; $minWidth?: string }>`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: ${({ $minWidth }) => $minWidth || '180px'};
  max-width: ${({ $maxWidth }) => $maxWidth || '260px'};

  .search-icon-left {
    position: absolute;
    left: 0.875rem;
    color: ${colors.gray[400]};
    width: 1rem;
    height: 1rem;
    pointer-events: none;
  }
`;

const FilterInput = styled.input<{ $hasClear?: boolean }>`
  width: 100%;
  padding: 0.5625rem ${({ $hasClear }) => ($hasClear ? '2.25rem' : '0.875rem')} 0.5625rem 2.375rem;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[200]};
  border-radius: 0.75rem;
  font-size: 0.8125rem;
  color: ${colors.gray[800]};
  font-family: ${typography.fonts.jakarta};
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${colors.gray[400]};
    font-weight: 500;
  }

  &:focus {
    border-color: ${colors.amber[400]};
    box-shadow: 0 0 0 3px ${colors.amber[100]}80;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 0.625rem;
  background: transparent;
  border: none;
  color: ${colors.gray[400]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.125rem;
  transition: color 0.15s ease;

  &:hover {
    color: ${colors.gray[600]};
  }

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
`;

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  onSubmit,
  placeholder = 'Search your next Destination',
  action = '/search',
  method = 'GET',
  name = 'q',
  className,
  variant = 'header',
  maxWidth,
  minWidth,
  autoComplete = 'off',
  autoFocus,
  'aria-label': ariaLabel = 'Search',
}) => {
  if (variant === 'filter') {
    return (
      <FilterContainer
        $maxWidth={maxWidth}
        $minWidth={minWidth}
        className={className}
      >
        <Search className="search-icon-left" />
        <FilterInput
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          aria-label={ariaLabel}
          $hasClear={Boolean(value && onClear)}
        />
        {value && onClear && (
          <ClearButton
            type="button"
            onClick={onClear}
            aria-label="Clear search"
          >
            <X />
          </ClearButton>
        )}
      </FilterContainer>
    );
  }

  return (
    <HeaderContainer
      action={action}
      method={method}
      onSubmit={onSubmit}
      className={className}
    >
      <HeaderInputWrapper>
        <HeaderInput
          placeholder={placeholder}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          aria-label={ariaLabel}
        />
        <HeaderSubmitButton type="submit" aria-label="Submit Search">
          <Search className="w-4 h-4 text-gray-400" />
        </HeaderSubmitButton>
      </HeaderInputWrapper>
    </HeaderContainer>
  );
};
