'use client';

import { useMemo, useCallback } from 'react';
import { State, City, Country, IState, ICity, ICountry } from 'country-state-city';

export interface UseCityStateOptions {
  /**
   * Country ISO code (e.g. 'IN' for India). Defaults to 'IN'.
   */
  countryCode?: string;

  /**
   * Currently selected state name or ISO code (e.g. 'Himachal Pradesh' or 'HP').
   */
  selectedState?: string;
}

export interface UseCityStateReturn {
  /**
   * Current country ISO code being used.
   */
  countryCode: string;

  /**
   * List of all states for the selected country, sorted alphabetically by name.
   */
  states: IState[];

  /**
   * Resolved IState object for the selected state (if matched).
   */
  activeState: IState | undefined;

  /**
   * List of all cities for the resolved active state, sorted alphabetically by name.
   */
  cities: ICity[];

  /**
   * Find a state by its name (case-insensitive).
   */
  getStateByName: (name: string) => IState | undefined;

  /**
   * Find a state by its ISO code (case-insensitive).
   */
  getStateByCode: (code: string) => IState | undefined;

  /**
   * Get cities for a specific state code or state name.
   */
  getCitiesForState: (stateCodeOrName: string) => ICity[];

  /**
   * List of all available countries.
   */
  countries: ICountry[];
}

// Module-level static cache of countries list
const STATIC_COUNTRIES: ICountry[] = (() => {
  try {
    return Country.getAllCountries() || [];
  } catch {
    return [];
  }
})();

/**
 * Custom hook to provide country, state, and city data using the `country-state-city` package.
 * Optimized with memoization to prevent unnecessary recalculations across re-renders.
 */
export const useCityState = ({
  countryCode = 'IN',
  selectedState = '',
}: UseCityStateOptions = {}): UseCityStateReturn => {
  // 1. Fetch all states for countryCode, memoized and sorted alphabetically
  const states = useMemo(() => {
    try {
      const rawStates = State.getStatesOfCountry(countryCode) || [];
      return [...rawStates].sort((a, b) => a.name.localeCompare(b.name));
    } catch {
      return [];
    }
  }, [countryCode]);

  // 2. Helper to find state by name
  const getStateByName = useCallback(
    (name: string): IState | undefined => {
      if (!name) return undefined;
      const lower = name.trim().toLowerCase();
      return states.find((s) => s.name.toLowerCase() === lower);
    },
    [states]
  );

  // 3. Helper to find state by ISO code
  const getStateByCode = useCallback(
    (code: string): IState | undefined => {
      if (!code) return undefined;
      const upper = code.trim().toUpperCase();
      return states.find((s) => s.isoCode.toUpperCase() === upper);
    },
    [states]
  );

  // 4. Resolve the active state from the passed selectedState (supports name or code)
  const activeState = useMemo(() => {
    if (!selectedState) return undefined;
    const trimmed = selectedState.trim();
    return getStateByCode(trimmed) || getStateByName(trimmed);
  }, [selectedState, getStateByCode, getStateByName]);

  // 5. Helper to get cities for an arbitrary state code or name
  const getCitiesForState = useCallback(
    (stateCodeOrName: string): ICity[] => {
      if (!stateCodeOrName) return [];
      const trimmed = stateCodeOrName.trim();
      const targetState = getStateByCode(trimmed) || getStateByName(trimmed);
      const targetCode = targetState?.isoCode || trimmed;

      try {
        const rawCities = City.getCitiesOfState(countryCode, targetCode) || [];
        return [...rawCities].sort((a, b) => a.name.localeCompare(b.name));
      } catch {
        return [];
      }
    },
    [countryCode, getStateByCode, getStateByName]
  );

  // 6. Memoized cities for the currently active state
  const cities = useMemo(() => {
    if (!activeState) return [];
    try {
      const rawCities = City.getCitiesOfState(countryCode, activeState.isoCode) || [];
      return [...rawCities].sort((a, b) => a.name.localeCompare(b.name));
    } catch {
      return [];
    }
  }, [countryCode, activeState]);

  return {
    countryCode,
    states,
    activeState,
    cities,
    getStateByName,
    getStateByCode,
    getCitiesForState,
    countries: STATIC_COUNTRIES,
  };
};
