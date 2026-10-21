'use client';

import React from 'react';
import {
  Plane,
  Compass,
  Sun,
  Ticket,
  Map,
  Tent,
  Navigation,
  BaggageClaim,
  Camera,
  Palmtree,
} from 'lucide-react';

export interface FloatingBackgroundProps {
  fixed?: boolean;
  className?: string;
}

interface FloatingIconConfig {
  top: string;
  left: string;
  animationClass: string;
  delay: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  size: number;
  rotate: string;
}

const ICONS_CONFIG: FloatingIconConfig[] = [
  { top: '10%', left: '10%', animationClass: 'animate-float', delay: '0s', Icon: Plane, size: 32, rotate: '-45deg' },
  { top: '16.6667%', left: '39%', animationClass: 'animate-float-slow', delay: '0.5s', Icon: Compass, size: 39, rotate: '-14deg' },
  { top: '23.3333%', left: '68%', animationClass: 'animate-float-fast', delay: '1s', Icon: Sun, size: 46, rotate: '17deg' },
  { top: '30%', left: '17%', animationClass: 'animate-float-diagonal', delay: '1.5s', Icon: Ticket, size: 33, rotate: '-42deg' },
  { top: '36.6667%', left: '46%', animationClass: 'animate-float', delay: '2s', Icon: Map, size: 40, rotate: '-11deg' },
  { top: '43.3333%', left: '75%', animationClass: 'animate-float-slow', delay: '0s', Icon: Tent, size: 47, rotate: '20deg' },
  { top: '50%', left: '24%', animationClass: 'animate-float-fast', delay: '0.5s', Icon: Navigation, size: 34, rotate: '-39deg' },
  { top: '56.6667%', left: '53%', animationClass: 'animate-float-diagonal', delay: '1s', Icon: BaggageClaim, size: 41, rotate: '-8deg' },
  { top: '63.3333%', left: '82%', animationClass: 'animate-float', delay: '1.5s', Icon: Camera, size: 48, rotate: '23deg' },
  { top: '70%', left: '31%', animationClass: 'animate-float-slow', delay: '2s', Icon: Palmtree, size: 35, rotate: '-36deg' },
  { top: '76.6667%', left: '60%', animationClass: 'animate-float-fast', delay: '0s', Icon: Plane, size: 42, rotate: '-5deg' },
  { top: '83.3333%', left: '89%', animationClass: 'animate-float-diagonal', delay: '0.5s', Icon: Compass, size: 49, rotate: '26deg' },
];

export const FloatingBackground: React.FC<FloatingBackgroundProps> = ({
  fixed = true,
  className = '',
}) => {
  return (
    <div
      className={`${
        fixed ? 'fixed' : 'absolute'
      } inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      aria-hidden="true"
    >
      {ICONS_CONFIG.map(({ top, left, animationClass, delay, Icon, size, rotate }, idx) => (
        <div
          key={idx}
          className={`absolute pointer-events-none z-0 opacity-15 ${animationClass}`}
          style={{
            top,
            left,
            animationDelay: delay,
          }}
        >
          <Icon
            className="text-amber-500"
            style={{ width: size, height: size, transform: `rotate(${rotate})` }}
          />
        </div>
      ))}
    </div>
  );
};
