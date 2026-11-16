'use client';

import { useMemo } from 'react';
import { TRAVEL_CLIMATES } from '../data';
import { DestinationClimateItem } from '../types';

export const useTravelClimate = () => {
  const climates: DestinationClimateItem[] = useMemo(() => {
    return TRAVEL_CLIMATES;
  }, []);

  return {
    climates,
  };
};
