'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { colorTokens } from '@/theme';

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
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  isFullWidth?: boolean;
  style?: React.CSSProperties;
}

const sizeClasses: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-xs sm:text-sm',
  lg: 'px-6 py-3.5 text-sm',
  xl: 'px-7 py-4 text-sm sm:text-[15px]',
};

const roundedClasses: Record<'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full', string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  leftIcon,
  rightIcon,
  showArrow = false,
  disabled = false,
  type = 'button',
  id,
  size = 'md',
  variant = 'primary',
  rounded = 'xl',
  isFullWidth = false,
  style,
}) => {
  const isPrimary = variant === 'primary';

  return (
    <motion.button
      id={id}
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? undefined : { scale: 1.01 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      style={{
        backgroundColor: isPrimary ? colorTokens.primaryContainer : colorTokens.surfacePure,
        color: isPrimary ? colorTokens.onPrimary : colorTokens.textPrimary,
        borderColor: isPrimary ? 'transparent' : colorTokens.surfaceBorder,
        ...style,
      }}
      className={`relative flex items-center justify-center gap-2 flex-nowrap whitespace-nowrap cursor-pointer outline-none transition-all duration-200 font-extrabold uppercase tracking-wider font-jakarta select-none border ${
        isPrimary
          ? 'hover:brightness-95 shadow-[0_10px_25px_-5px_rgba(255,87,34,0.38)] hover:shadow-[0_14px_30px_-5px_rgba(255,87,34,0.48)]'
          : 'hover:bg-gray-50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-gray-300'
      } ${sizeClasses[size]} ${roundedClasses[rounded]} ${
        isFullWidth ? 'w-full' : 'w-auto'
      } ${disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''} ${className}`.trim()}
    >
      {leftIcon && <span className="flex items-center shrink-0">{leftIcon}</span>}
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0">{children}</span>
      {rightIcon && <span className="flex items-center shrink-0">{rightIcon}</span>}
      {showArrow && <ArrowRight className="w-4 h-4 stroke-[2.5] shrink-0" />}
    </motion.button>
  );
};
