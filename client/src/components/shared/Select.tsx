'use client';

import React from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options?: readonly SelectOption[] | SelectOption[];
  isFullWidth?: boolean;
  wrapperClassName?: string;
  icon?: React.ReactNode;
}

const SelectContainer = styled.div<{ $isFullWidth?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};

  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};
    padding: 0.5625rem 2.25rem 0.5625rem 0.875rem;
    background-color: ${colors.white};
    border: 1px solid ${colors.gray[200]};
    border-radius: 0.75rem;
    font-size: 0.8125rem;
    font-weight: 700;
    color: ${colors.gray[800]};
    font-family: ${typography.fonts.jakarta};
    cursor: pointer;
    outline: none;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${colors.gray[300]};
      background-color: ${colors.gray[50]}80;
    }

    &:focus {
      border-color: ${colors.amber[400]};
      box-shadow: 0 0 0 3px ${colors.amber[100]}80;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
      background-color: ${colors.gray[100]};
    }
  }

  .select-chevron-icon {
    position: absolute;
    right: 0.75rem;
    color: ${colors.gray[500]};
    pointer-events: none;
    width: 0.875rem;
    height: 0.875rem;
  }
`;

export const Select: React.FC<SelectProps> = ({
  options,
  children,
  isFullWidth,
  wrapperClassName,
  icon,
  className,
  ...selectProps
}) => {
  return (
    <SelectContainer $isFullWidth={isFullWidth} className={wrapperClassName}>
      <select className={className} {...selectProps}>
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
      {icon ? (
        <span className="select-chevron-icon">{icon}</span>
      ) : (
        <ChevronDown className="select-chevron-icon" />
      )}
    </SelectContainer>
  );
};
