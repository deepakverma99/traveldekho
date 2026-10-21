'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

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
  const variantClasses =
    variant === 'primary'
      ? 'bg-primary text-white border-0 shadow-[0_4px_18px_rgba(249,115,22,0.38)] hover:shadow-[0_8px_24px_rgba(249,115,22,0.5)]'
      : 'bg-white text-charcoal border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:text-white hover:shadow-[0_8px_24px_rgba(249,115,22,0.35)] [&:hover_svg]:text-white';

  return (
    <motion.button
      id={id}
      type={type}
      disabled={disabled}
      style={style}
      className={`relative overflow-hidden rounded-full font-sans font-bold cursor-pointer outline-none isolate transition-all duration-300 whitespace-nowrap before:content-[''] before:absolute before:inset-0 before:bg-black before:scale-x-0 before:origin-left before:transition-transform before:duration-350 before:ease-out before:rounded-full before:z-0 hover:before:scale-x-100 disabled:opacity-65 disabled:cursor-not-allowed disabled:pointer-events-none ${variantClasses} ${sizeClasses[size]} uppercase tracking-wider group flex items-center justify-center gap-2 ${className || ''}`.trim()}
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
    </motion.button>
  );
};
