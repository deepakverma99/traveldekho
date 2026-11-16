'use client';

import { useState, useMemo } from 'react';
import { useCarouselScroll } from '@/redux';
import { TripCategory } from '../types';
import {
  TOP_RANKED_DOMESTIC_TRIPS,
  TOP_RANKED_INTERNATIONAL_TRIPS,
} from '../data';

export const useTopRankedTrips = () => {
  const [activeCategory, setActiveCategory] = useState<TripCategory>('domestic');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const { trackRef, canScrollLeft, canScrollRight, handleScroll } =
    useCarouselScroll('top-10-ranked-trips');

  const filteredTrips = useMemo(() => {
    const tripList =
      activeCategory === 'domestic'
        ? TOP_RANKED_DOMESTIC_TRIPS
        : TOP_RANKED_INTERNATIONAL_TRIPS;

    if (!selectedRegion) {
      return tripList;
    }

    const filtered = tripList.filter(
      (trip) =>
        trip.destination.toLowerCase().includes(selectedRegion.toLowerCase()) ||
        trip.title.toLowerCase().includes(selectedRegion.toLowerCase())
    );

    // If specific region filter returns empty, fallback to showing full list
    return filtered.length > 0 ? filtered : tripList;
  }, [activeCategory, selectedRegion]);

  const handleToggleCategory = (category: TripCategory) => {
    setActiveCategory(category);
    setSelectedRegion(null);
  };

  const handleToggleRegion = (region: string) => {
    setSelectedRegion((prev) => (prev === region ? null : region));
  };

  return {
    activeCategory,
    selectedRegion,
    filteredTrips,
    trackRef,
    canScrollLeft,
    canScrollRight,
    handleScroll,
    handleToggleCategory,
    handleToggleRegion,
  };
};
