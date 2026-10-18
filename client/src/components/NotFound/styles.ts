'use client';

import styled, { keyframes } from 'styled-components';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const compassOscillate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(18deg);
  }
  50% {
    transform: rotate(-14deg);
  }
  75% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const pulseDot = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.35);
    opacity: 0.7;
  }
`;

const floatSlight = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
`;

export const NotFoundContainer = styled.main`
  flex: 1;
  min-height: calc(100vh - 120px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 3rem 1.25rem 4rem;
  background-color: ${colors.cream};

  @media (max-width: 640px) {
    padding: 2rem 1rem 3rem;
    min-height: calc(100vh - 100px);
  }
`;

export const AmbientGlow = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(280px, 45vw, 520px);
  height: clamp(280px, 45vw, 520px);
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    rgba(250, 203, 43, 0.22) 0%,
    rgba(245, 158, 11, 0.08) 50%,
    transparent 70%
  );
  filter: blur(80px);
  pointer-events: none;
  z-index: 1;
`;

export const ContentCard = styled.div`
  position: relative;
  z-index: 10;
  max-width: 720px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(229, 231, 235, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  margin-bottom: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.white};
    border-color: ${colors.amber[400]};
  }
`;

export const StatusIndicator = styled.span`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: ${colors.amber[500]};
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25);
  animation: ${pulseDot} 2.5s infinite ease-in-out;
`;

export const StatusText = styled.span`
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.gray[700]};
  font-family: ${typography.fonts.sans};
`;

export const HeroCodeDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.5rem, 3vw, 1.75rem);
  margin: 0.5rem 0 1.25rem;
  position: relative;
`;

export const CodeDigit = styled.span`
  font-family: ${typography.fonts.montserrat};
  font-size: clamp(5.25rem, 18vw, 10.5rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.05em;
  color: ${colors.charcoal};
  text-shadow: 0 12px 35px rgba(0, 0, 0, 0.07);
  user-select: none;
`;

export const CompassCenter = styled.div`
  width: clamp(4.75rem, 16vw, 9.25rem);
  height: clamp(4.75rem, 16vw, 9.25rem);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(145deg, #fff2a3 0%, ${colors.gold} 55%, #dfac16 100%);
  box-shadow:
    0 12px 36px rgba(250, 203, 43, 0.45),
    0 2px 8px rgba(0, 0, 0, 0.08),
    inset 0 2px 4px rgba(255, 255, 255, 0.8),
    inset 0 -2px 4px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.04);
  }
`;

export const CompassInnerRing = styled.div`
  width: 82%;
  height: 82%;
  border-radius: 9999px;
  border: 2px dashed rgba(120, 53, 15, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const CompassNeedle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.charcoal};
  animation: ${compassOscillate} 6s infinite ease-in-out;

  svg {
    width: clamp(2.25rem, 8vw, 4.25rem);
    height: clamp(2.25rem, 8vw, 4.25rem);
  }
`;

export const FloatingMiniBadge = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  ${({ $position }) => ($position === 'left' ? 'left: -12%; top: 18%;' : 'right: -12%; bottom: 18%;')}
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(229, 231, 235, 0.85);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  font-size: 0.75rem;
  font-weight: 700;
  color: ${colors.gray[700]};
  white-space: nowrap;
  animation: ${floatSlight} 4s infinite ease-in-out;
  animation-delay: ${({ $position }) => ($position === 'left' ? '0s' : '1.5s')};
  pointer-events: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Heading = styled.h1`
  font-family: ${typography.fonts.jakarta};
  font-size: clamp(1.625rem, 4.2vw, 2.625rem);
  font-weight: 800;
  color: ${colors.charcoal};
  line-height: 1.25;
  letter-spacing: -0.025em;
  margin: 0 0 0.875rem;
`;

export const Description = styled.p`
  font-size: clamp(0.9375rem, 2vw, 1.0625rem);
  font-family: ${typography.fonts.sans};
  color: ${colors.gray[600]};
  line-height: 1.6;
  max-width: 560px;
  margin: 0 auto 2.25rem;
  font-weight: 450;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  margin: 0.5rem 0 0;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    max-width: 320px;
  }
`;
