'use client';

import { useState, useCallback, useMemo } from 'react';
import { DISCOVER_CITIES } from '../data';
import { DiscoverCityItem } from '../types';

export const useDiscoverCities = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const displayedCities: DiscoverCityItem[] = useMemo(() => {
    if (isExpanded) {
      return DISCOVER_CITIES;
    }
    return DISCOVER_CITIES.slice(0, 4);
  }, [isExpanded]);

  return {
    isExpanded,
    toggleExpanded,
    displayedCities,
    totalCitiesCount: DISCOVER_CITIES.length,
  };
};
