'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Home,
  Mountain,
  Trees,
} from 'lucide-react';
import { FloatingBackground, Button } from '@/components/shared';
import {
  NotFoundContainer,
  AmbientGlow,
  ContentCard,
  StatusBadge,
  StatusIndicator,
  StatusText,
  HeroCodeDisplay,
  CodeDigit,
  CompassCenter,
  CompassInnerRing,
  CompassNeedle,
  FloatingMiniBadge,
  Heading,
  Description,
  ButtonGroup,
} from './styles';

export const NotFoundView: React.FC = () => {
  return (
    <NotFoundContainer>
      {/* Floating travel icons background exactly like the home page */}
      <FloatingBackground fixed />

      {/* Subtle warm ambient glow */}
      <AmbientGlow aria-hidden="true" />

      <ContentCard>
        {/* Status Badge */}
        <StatusBadge>
          <StatusIndicator />
          <StatusText>Page Not Found</StatusText>
        </StatusBadge>

        {/* 404 Hero Display with Animated Compass */}
        <HeroCodeDisplay>
          <FloatingMiniBadge $position="left" aria-hidden="true">
            <Trees className="w-3.5 h-3.5 text-emerald-600" />
            <span>Lost in the Wild</span>
          </FloatingMiniBadge>

          <CodeDigit>4</CodeDigit>

          <CompassCenter title="Lost compass spinning">
            <CompassInnerRing>
              <CompassNeedle>
                <Compass strokeWidth={2.2} />
              </CompassNeedle>
            </CompassInnerRing>
          </CompassCenter>

          <CodeDigit>4</CodeDigit>

          <FloatingMiniBadge $position="right" aria-hidden="true">
            <Mountain className="w-3.5 h-3.5 text-amber-600" />
            <span>Elevation: Unknown</span>
          </FloatingMiniBadge>
        </HeroCodeDisplay>

        {/* Headings */}
        <Heading>Looks like you&apos;ve wandered off the map.</Heading>
        <Description>
          The trail you followed seems to have vanished into thin air. The page
          you&apos;re looking for may have been moved, renamed, or is waiting to
          be charted in your next adventure.
        </Description>

        {/* Action Buttons using shared Button component */}
        <ButtonGroup>
          <Link href="/" className="inline-block w-full sm:w-auto">
            <Button
              size="lg"
              leftIcon={<Home className="w-4 h-4" />}
              showArrow
              className="w-full sm:w-auto justify-center"
            >
              Return to Home
            </Button>
          </Link>

          <Link href="/trips" className="inline-block w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<Compass className="w-4 h-4 text-amber-500" />}
              className="w-full sm:w-auto justify-center"
            >
              Explore All Trips
            </Button>
          </Link>
        </ButtonGroup>
      </ContentCard>
    </NotFoundContainer>
  );
};
