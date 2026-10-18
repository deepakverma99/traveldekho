import styled, { keyframes } from 'styled-components';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const pulseGlow = keyframes`
  0%, 100% {
    transform: scale(0.95);
    opacity: 0.12;
  }
  50% {
    transform: scale(1.08);
    opacity: 0.22;
  }
`;

const progressSweep = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const LoadingContainer = styled.main<{ $fullScreen?: boolean }>`
  position: relative;
  min-height: ${({ $fullScreen }) => ($fullScreen ? 'calc(100vh - 80px)' : '60vh')};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${colors.cream};
  overflow: hidden;
  padding: 2.5rem 1rem;
  font-family: ${typography.fonts.jakarta};
  z-index: 1;
`;

export const LoadingContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 28rem;
  width: 100%;
`;

export const AmbientBackglow = styled.div`
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    ${colors.amber[400]} 0%,
    ${colors.amber[200]} 40%,
    transparent 70%
  );
  pointer-events: none;
  animation: ${pulseGlow} 4s ease-in-out infinite;
  z-index: 0;
`;

export const GifWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  user-select: none;
`;

export const ProgressBarTrack = styled.div`
  position: relative;
  width: 11rem;
  height: 3.5px;
  background-color: ${colors.amber[200]}50;
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const ProgressBarFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${colors.amber[500]} 50%,
    transparent 100%
  );
  animation: ${progressSweep} 1.6s ease-in-out infinite;
  border-radius: 9999px;
`;

export const LoadingTitle = styled.h1`
  font-size: 1.125rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: ${colors.charcoal};
  margin-bottom: 0.35rem;

  @media (min-width: 640px) {
    font-size: 1.25rem;
  }
`;

export const LoadingSubtitle = styled.p`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${colors.amber[900]};
  opacity: 0.75;
  line-height: 1.4;
  max-width: 20rem;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;
