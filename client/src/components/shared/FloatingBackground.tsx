'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
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

const dynamicFloat = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(var(--y-offset, -20px));
  }
`;

const FloatingIconItem = styled.div<{
  $top: string;
  $left: string;
  $yOffset: string;
  $duration: string;
  $delay: string;
}>`
  position: absolute;
  pointer-events: none;
  z-index: 0;
  opacity: 0.15;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  --y-offset: ${(props) => props.$yOffset};
  animation: ${dynamicFloat} ${(props) => props.$duration} ease-in-out infinite;
  animation-delay: ${(props) => props.$delay};
`;

export interface FloatingBackgroundProps {
  fixed?: boolean;
  className?: string;
}

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
      <FloatingIconItem $top="10%" $left="10%" $yOffset="-15px" $duration="6s" $delay="0s">
        <Plane className="text-amber-500" style={{ width: 32, height: 32, transform: 'rotate(-45deg)' }} />
      </FloatingIconItem>

      <FloatingIconItem $top="16.6667%" $left="39%" $yOffset="-26px" $duration="9s" $delay="0.5s">
        <Compass className="text-amber-500" style={{ width: 39, height: 39, transform: 'rotate(-14deg)' }} />
      </FloatingIconItem>

      <FloatingIconItem $top="23.3333%" $left="68%" $yOffset="-17px" $duration="8s" $delay="1s">
        <Sun className="text-amber-500" style={{ width: 46, height: 46, transform: 'rotate(17deg)' }} />
      </FloatingIconItem>

      <FloatingIconItem $top="30%" $left="17%" $yOffset="-28px" $duration="7s" $delay="1.5s">
        <Ticket className="text-amber-500" style={{ width: 33, height: 33, transform: 'rotate(-42deg)' }} />
      </FloatingIconItem>

      <FloatingIconItem $top="36.6667%" $left="46%" $yOffset="-19px" $duration="6s" $delay="2s">
        <Map className="text-amber-500" style={{ width: 40, height: 40, transform: 'rotate(-11deg)' }} />
      </FloatingIconItem>

      <FloatingIconItem $top="43.3333%" $left="75%" $yOffset="-30px" $duration="9s" $delay="0s">
        <Tent className="text-amber-500" style={{ width: 47, height: 47, transform: 'rotate(20deg)' }} />
      </FloatingIconItem>

      <FloatingIconItem $top="50%" $left="24%" $yOffset="-21px" $duration="8s" $delay="0.5s">
        <Navigation className="text-amber-500" style={{ width: 34, height: 34, transform: 'rotate(-39deg)' }} />
      </FloatingIconItem>

      <FloatingIconItem $top="56.6667%" $left="53%" $yOffset="-32px" $duration="7s" $delay="1s">
        <BaggageClaim className="text-amber-500" style={{ width: 41, height: 41, transform: 'rotate(-8deg)' }} />
      </FloatingIconItem>

      <FloatingIconItem $top="63.3333%" $left="82%" $yOffset="-23px" $duration="6s" $delay="1.5s">
        <Camera className="text-amber-500" style={{ width: 48, height: 48, transform: 'rotate(23deg)' }} />
      </FloatingIconItem>

      <FloatingIconItem $top="70%" $left="31%" $yOffset="-34px" $duration="9s" $delay="2s">
        <Palmtree className="text-amber-500" style={{ width: 35, height: 35, transform: 'rotate(-36deg)' }} />
      </FloatingIconItem>

      <FloatingIconItem $top="76.6667%" $left="60%" $yOffset="-25px" $duration="8s" $delay="0s">
        <Plane className="text-amber-500" style={{ width: 42, height: 42, transform: 'rotate(-5deg)' }} />
      </FloatingIconItem>

      <FloatingIconItem $top="83.3333%" $left="89%" $yOffset="-16px" $duration="7s" $delay="0.5s">
        <Compass className="text-amber-500" style={{ width: 49, height: 49, transform: 'rotate(26deg)' }} />
      </FloatingIconItem>
    </div>
  );
};
