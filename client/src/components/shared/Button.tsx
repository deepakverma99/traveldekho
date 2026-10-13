'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { ChevronRight } from 'lucide-react';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
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

  &:hover {
    color: ${colors.white};

    &::before {
      transform: scaleX(1);
    }
  }
`;

export const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <StyledButton
      className={`px-8 py-2.5 text-xs uppercase tracking-widest font-bold group flex items-center gap-2 ${className || ''}`.trim()}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>
      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
    </StyledButton>
  );
};
