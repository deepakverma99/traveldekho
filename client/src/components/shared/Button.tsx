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
}

const StyledButton = styled(motion.button)`
  position: relative;
  overflow: hidden;
  background-color: ${colors.gold};
  color: ${colors.black};
  border-radius: 9999px;
  font-family: ${typography.fonts.sans};
  font-weight: ${typography.weights.bold};
  border: none;
  cursor: pointer;
  outline: none;
  isolation: isolate;
  transition: color 0.3s ease;

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

    &::before {
      transform: scaleX(1);
    }
  }

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
}: ButtonProps) => {
  return (
    <StyledButton
      id={id}
      type={type}
      disabled={disabled}
      className={`px-6 py-2.5 text-xs uppercase tracking-wider font-bold group flex items-center justify-center gap-2 ${className || ''}`.trim()}
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
