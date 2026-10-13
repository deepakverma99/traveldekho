'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  Plane,
  BaggageClaim,
  Compass,
  Map,
  Camera,
  Tent,
  Sun,
  Palmtree,
  Navigation,
  Ticket,
} from 'lucide-react';
import { colors } from '@/theme/colors';

const floatNormal = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const floatSlow = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-14px); }
`;

const floatFast = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-7px); }
`;

const floatDiagonal = keyframes`
  0%, 100% { transform: translate(0px, 0px); }
  50% { transform: translate(6px, -10px); }
`;

const FloatingIconWrapper = styled.div<{ $anim: 'normal' | 'slow' | 'fast' | 'diagonal'; $delay?: string }>`
  position: absolute;
  pointer-events: none;
  animation: ${(props) => {
      switch (props.$anim) {
        case 'slow':
          return floatSlow;
        case 'fast':
          return floatFast;
        case 'diagonal':
          return floatDiagonal;
        default:
          return floatNormal;
      }
    }}
    5s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay || '0s'};
  transition: opacity 0.5s ease;
`;

export const FloatingDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Ambient background glows */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, rgb(255, 209, 51) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, rgb(255, 209, 51) 0%, transparent 70%)',
        }}
      />

      {/* Floating Travel Icons */}
      <FloatingIconWrapper $anim="fast" $delay="0.3s" className="top-[12%] left-[8%]">
        <Plane className="w-8 h-8 md:w-14 md:h-14 rotate-[15deg] opacity-50 text-amber-600" />
      </FloatingIconWrapper>

      <FloatingIconWrapper $anim="slow" $delay="0.5s" className="top-[55%] left-[4%]">
        <BaggageClaim className="w-6 h-6 md:w-10 md:h-10 -rotate-12 opacity-40 text-amber-600" />
      </FloatingIconWrapper>

      <FloatingIconWrapper $anim="diagonal" $delay="0.4s" className="top-[25%] left-[40%]">
        <Compass className="w-10 h-10 md:w-16 md:h-16 rotate-45 opacity-20 text-amber-600" />
      </FloatingIconWrapper>

      <FloatingIconWrapper $anim="slow" $delay="0.5s" className="bottom-[20%] right-[3%]">
        <Map className="w-7 h-7 md:w-12 md:h-12 rotate-[10deg] opacity-40 text-amber-600" />
      </FloatingIconWrapper>

      <FloatingIconWrapper $anim="fast" $delay="0.2s" className="top-[10%] right-[8%]">
        <Camera className="w-6 h-6 md:w-10 md:h-10 -rotate-[15deg] opacity-30 text-amber-600" />
      </FloatingIconWrapper>

      <FloatingIconWrapper $anim="normal" $delay="0.4s" className="top-[75%] left-[22%]">
        <Tent className="w-8 h-8 md:w-12 md:h-12 rotate-[5deg] opacity-30 text-amber-600" />
      </FloatingIconWrapper>

      <FloatingIconWrapper $anim="slow" $delay="0.5s" className="top-[8%] left-[60%]">
        <Sun className="w-10 h-10 md:w-16 md:h-16 opacity-25 text-amber-600" />
      </FloatingIconWrapper>

      <FloatingIconWrapper $anim="diagonal" $delay="0.3s" className="bottom-[25%] left-[45%]">
        <Palmtree className="w-8 h-8 md:w-14 md:h-14 -rotate-[10deg] opacity-25 text-amber-600" />
      </FloatingIconWrapper>

      <FloatingIconWrapper $anim="fast" $delay="0.1s" className="top-[40%] right-[35%]">
        <Navigation className="w-6 h-6 md:w-10 md:h-10 rotate-[45deg] opacity-30 text-amber-600" />
      </FloatingIconWrapper>

      <FloatingIconWrapper $anim="normal" $delay="0.3s" className="bottom-[10%] right-[30%]">
        <Ticket className="w-7 h-7 md:w-12 md:h-12 -rotate-[20deg] opacity-40 text-amber-600" />
      </FloatingIconWrapper>
    </div>
  );
};
