'use client';

import { useState, useCallback, useMemo } from 'react';
import { EXPLORE_STATES } from '../data';
import { ExploreStateItem } from '../types';

export const useExploreBharat = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const displayedStates: ExploreStateItem[] = useMemo(() => {
    if (isExpanded) {
      return EXPLORE_STATES;
    }
    return EXPLORE_STATES.slice(0, 4);
  }, [isExpanded]);

  return {
    isExpanded,
    toggleExpanded,
    displayedStates,
    totalStatesCount: EXPLORE_STATES.length,
  };
};
