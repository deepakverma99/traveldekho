'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { ChevronRight } from 'lucide-react';
import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showArrow?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary';
  style?: React.CSSProperties;
}

const sizeClasses: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-6 py-2.5 text-xs',
  lg: 'px-7 py-3.5 text-xs',
  xl: 'px-8 py-4 text-sm',
};

const StyledButton = styled(motion.button) <{ $variant: 'primary' | 'secondary' }>`
  position: relative;
  overflow: hidden;
  border-radius: 9999px;
  font-family: ${typography.fonts.sans};
  font-weight: ${typography.weights.bold};
  cursor: pointer;
  outline: none;
  isolation: isolate;
  transition: color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  white-space: nowrap;

  ${({ $variant }) =>
    $variant === 'primary'
      ? `
    background-color: ${colors.orange[500]};
    color: ${colors.white};
    border: none;
    box-shadow: 0 4px 18px rgba(249, 115, 22, 0.38);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: ${colors.black};
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 9999px;
      z-index: 0;
    }

    &:hover:not(:disabled) {
      color: ${colors.white};
      box-shadow: 0 8px 24px rgba(249, 115, 22, 0.5);

      &::before {
        transform: scaleX(1);
      }
    }
  `
      : `
    background-color: ${colors.white};
    color: ${colors.charcoal};
    border: 1.5px solid ${colors.gray[200]};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: ${colors.black};
     
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 9999px;
      z-index: 0;
    }

    &:hover:not(:disabled) {
      color: ${colors.white};
      
      box-shadow: 0 8px 24px rgba(249, 115, 22, 0.35);

      &::before {
        transform: scaleX(1);
      }

      svg {
        color: ${colors.white};
      }
    }
  `}

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const Button = ({
  children,
  onClick,
  className,
  leftIcon,
  rightIcon,
  showArrow = !leftIcon && !rightIcon,
  disabled = false,
  type = 'button',
  id,
  size = 'md',
  variant = 'primary',
  style,
}: ButtonProps) => {
  return (
    <StyledButton
      id={id}
      type={type}
      disabled={disabled}
      $variant={variant}
      style={style}
      className={`${sizeClasses[size]} uppercase tracking-wider font-bold group flex items-center justify-center gap-2 ${className || ''}`.trim()}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      {leftIcon && <span className="relative z-10 flex items-center shrink-0">{leftIcon}</span>}
      <span className="relative z-10">{children}</span>
      {rightIcon && <span className="relative z-10 flex items-center shrink-0">{rightIcon}</span>}
      {showArrow && (
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10 shrink-0" />
      )}
    </StyledButton>
  );
};
