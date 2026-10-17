'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { City, State } from 'country-state-city';

const LIBRARIES: 'places'[] = ['places'];
const DEFAULT_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
  'AIzaSyARxLvhDjQP2HVm--_1kIARy8CpVgQ1Dqg';

export interface PlacePrediction {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
  _raw?: unknown;
}

export interface PlaceCoordinates {
  lat: number;
  lng: number;
}

export interface PlaceDetails {
  placeId?: string;
  name: string;
  formattedAddress: string;
  location?: PlaceCoordinates;
}

export interface UseGooglePlacesOptions {
  /**
   * Google Maps API Key. Defaults to NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.
   */
  apiKey?: string;

  /**
   * Country code for restricting predictions (e.g., 'in' for India). Defaults to 'in'.
   */
  countryCode?: string;

  /**
   * Debounce delay in milliseconds before dispatching autocomplete requests. Defaults to 300ms.
   */
  debounceMs?: number;

  /**
   * Place types to filter predictions (e.g. ['geocode', 'establishment']).
   */
  types?: string[];

  /**
   * Whether places search is enabled. Defaults to true.
   */
  enabled?: boolean;
}

export interface UseGooglePlacesReturn {
  predictions: PlacePrediction[];
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
  search: (query: string) => void;
  clearPredictions: () => void;
  getPlaceDetails: (suggestion: PlacePrediction) => Promise<PlaceDetails | null>;
  refreshSessionToken: () => void;
}

/**
 * Curated high-frequency transit hubs, railway stations, airports, ISBTs, and travel destinations
 * to serve as high-fidelity fallback when Google Maps API key is offline or throttled.
 */
const FALLBACK_DESTINATIONS: readonly {
  mainText: string;
  secondaryText: string;
}[] = [
    // Delhi NCR
    { mainText: 'Delhi', secondaryText: 'India' },
    { mainText: 'Delhi Airport (DEL)', secondaryText: 'New Delhi, Delhi, India' },
    {
      mainText: 'Delhi Cantt',
      secondaryText:
        'Jail Road, Nangal Village, Delhi Cantonment, New Delhi, Delhi, India',
    },
    {
      mainText: 'Delhi Junction',
      secondaryText: 'Old Delhi, Mori Gate, New Delhi, Delhi, India',
    },
    {
      mainText: 'Majnu Ka Tilla',
      secondaryText: 'Civil Lines, North Delhi, Delhi, India',
    },
    {
      mainText: 'Kashmere Gate ISBT',
      secondaryText: 'Kashmere Gate, New Delhi, Delhi, India',
    },
    {
      mainText: 'Anand Vihar ISBT',
      secondaryText: 'Anand Vihar, New Delhi, Delhi, India',
    },
    {
      mainText: 'New Delhi Railway Station',
      secondaryText: 'Bhavbhuti Marg, Ajmeri Gate, New Delhi, India',
    },
    {
      mainText: 'Hazrat Nizamuddin Railway Station',
      secondaryText: 'Nizamuddin, New Delhi, Delhi, India',
    },
    {
      mainText: 'Sarai Kale Khan ISBT',
      secondaryText: 'Sarai Kale Khan, New Delhi, Delhi, India',
    },
    { mainText: 'Aerocity', secondaryText: 'IGI Airport, New Delhi, Delhi, India' },
    { mainText: 'Connaught Place', secondaryText: 'New Delhi, Delhi, India' },
    // Himachal Pradesh
    {
      mainText: 'Manali Mall Road',
      secondaryText: 'Mall Road, Manali, Himachal Pradesh, India',
    },
    { mainText: 'Old Manali', secondaryText: 'Manali, Himachal Pradesh, India' },
    { mainText: 'Solang Valley', secondaryText: 'Manali, Himachal Pradesh, India' },
    { mainText: 'Sissu', secondaryText: 'Lahaul and Spiti, Himachal Pradesh, India' },
    { mainText: 'Atal Tunnel', secondaryText: 'Rohtang, Himachal Pradesh, India' },
    { mainText: 'Rohtang Pass', secondaryText: 'Manali, Himachal Pradesh, India' },
    {
      mainText: 'Kasol',
      secondaryText: 'Parvati Valley, Kullu, Himachal Pradesh, India',
    },
    {
      mainText: 'Tosh',
      secondaryText: 'Parvati Valley, Kullu, Himachal Pradesh, India',
    },
    {
      mainText: 'Kheerganga',
      secondaryText: 'Parvati Valley, Kullu, Himachal Pradesh, India',
    },
    {
      mainText: 'Jibhi',
      secondaryText: 'Tirthan Valley, Kullu, Himachal Pradesh, India',
    },
    {
      mainText: 'Shimla Old Bus Stand',
      secondaryText: 'Cart Road, Shimla, Himachal Pradesh, India',
    },
    {
      mainText: 'Shimla Mall Road',
      secondaryText: 'Mall Road, Shimla, Himachal Pradesh, India',
    },
    {
      mainText: 'Dharamshala Bus Stand',
      secondaryText: 'Dharamshala, Himachal Pradesh, India',
    },
    {
      mainText: 'McLeod Ganj',
      secondaryText: 'Dharamshala, Kangra, Himachal Pradesh, India',
    },
    {
      mainText: 'Bir Billing',
      secondaryText: 'Baijnath, Kangra, Himachal Pradesh, India',
    },
    { mainText: 'Kaza', secondaryText: 'Spiti Valley, Himachal Pradesh, India' },
    // Chandigarh & Punjab
    {
      mainText: 'Chandigarh ISBT Sector 43',
      secondaryText: 'Sector 43, Chandigarh, India',
    },
    {
      mainText: 'Chandigarh ISBT Sector 17',
      secondaryText: 'Sector 17, Chandigarh, India',
    },
    {
      mainText: 'Chandigarh Railway Station',
      secondaryText: 'Daria, Chandigarh, India',
    },
    {
      mainText: 'Amritsar Golden Temple',
      secondaryText: 'Amritsar, Punjab, India',
    },
    // Uttarakhand
    {
      mainText: 'Rishikesh Bus Station',
      secondaryText: 'Rishikesh, Uttarakhand, India',
    },
    { mainText: 'Laxman Jhula', secondaryText: 'Rishikesh, Uttarakhand, India' },
    { mainText: 'Tapovan', secondaryText: 'Rishikesh, Uttarakhand, India' },
    {
      mainText: 'Haridwar Railway Station',
      secondaryText: 'Haridwar, Uttarakhand, India',
    },
    { mainText: 'Har Ki Pauri', secondaryText: 'Haridwar, Uttarakhand, India' },
    {
      mainText: 'Dehradun ISBT',
      secondaryText: 'Haridwar Bypass Road, Dehradun, Uttarakhand, India',
    },
    {
      mainText: 'Mussoorie Mall Road',
      secondaryText: 'Mussoorie, Dehradun, Uttarakhand, India',
    },
    {
      mainText: 'Nainital Mall Road',
      secondaryText: 'Nainital, Uttarakhand, India',
    },
    // Jammu & Kashmir / Ladakh
    { mainText: 'Leh Main Bazaar', secondaryText: 'Leh, Ladakh, India' },
    { mainText: 'Pangong Tso', secondaryText: 'Leh, Ladakh, India' },
    { mainText: 'Nubra Valley', secondaryText: 'Ladakh, India' },
    {
      mainText: 'Srinagar TRC Bus Stand',
      secondaryText: 'Srinagar, Jammu and Kashmir, India',
    },
    { mainText: 'Dal Lake', secondaryText: 'Srinagar, Jammu and Kashmir, India' },
    {
      mainText: 'Gulmarg Gondola',
      secondaryText: 'Baramulla, Jammu and Kashmir, India',
    },
    // Rajasthan
    {
      mainText: 'Jaipur Sindhi Camp',
      secondaryText: 'Station Road, Sindhi Camp, Jaipur, Rajasthan, India',
    },
    {
      mainText: 'Jaipur Airport (JAI)',
      secondaryText: 'Sanganer, Jaipur, Rajasthan, India',
    },
    {
      mainText: 'Udaipur City Railway Station',
      secondaryText: 'Udaipur, Rajasthan, India',
    },
    { mainText: 'Jodhpur Junction', secondaryText: 'Jodhpur, Rajasthan, India' },
    // Maharashtra & South India
    { mainText: 'Mumbai CST', secondaryText: 'Fort, Mumbai, Maharashtra, India' },
    {
      mainText: 'Mumbai Airport (BOM)',
      secondaryText: 'Sahar, Andheri East, Mumbai, Maharashtra, India',
    },
    {
      mainText: 'Pune Swargate Bus Station',
      secondaryText: 'Swargate, Pune, Maharashtra, India',
    },
    {
      mainText: 'Bengaluru Majestic (KSR)',
      secondaryText: 'Kempegowda, Bengaluru, Karnataka, India',
    },
    {
      mainText: 'Bengaluru Airport (BLR)',
      secondaryText: 'Devanahalli, Bengaluru, Karnataka, India',
    },
    { mainText: 'Goa Dabolim Airport (GOI)', secondaryText: 'Dabolim, Goa, India' },
    { mainText: 'Goa Mopa Airport (GOX)', secondaryText: 'Mopa, Pernem, Goa, India' },
    { mainText: 'Panaji KTC Bus Stand', secondaryText: 'Panaji, Goa, India' },
  ];

/**
 * Pure helper function to search fallback destinations and Indian cities database
 */
function matchFallbackPlaces(query: string): PlacePrediction[] {
  const qLower = query.toLowerCase();
  const results: PlacePrediction[] = [];

  // 1. Check curated transit hubs
  for (const item of FALLBACK_DESTINATIONS) {
    if (
      item.mainText.toLowerCase().includes(qLower) ||
      item.secondaryText.toLowerCase().includes(qLower)
    ) {
      results.push({
        placeId: `fallback-${item.mainText.toLowerCase().replace(/\s+/g, '-')}`,
        description: `${item.mainText}, ${item.secondaryText}`,
        mainText: item.mainText,
        secondaryText: item.secondaryText,
      });
    }
    if (results.length >= 6) break;
  }

  // 2. Supplement with Indian cities database
  if (results.length < 6) {
    try {
      const indianCities = City.getCitiesOfCountry('IN') || [];
      const stateMap = new Map<string, string>();

      for (const city of indianCities) {
        if (city.name.toLowerCase().includes(qLower)) {
          if (
            !results.some(
              (r) => r.mainText.toLowerCase() === city.name.toLowerCase()
            )
          ) {
            let stateName = stateMap.get(city.stateCode);
            if (!stateName) {
              const st = State.getStateByCodeAndCountry(city.stateCode, 'IN');
              stateName = st?.name || city.stateCode;
              stateMap.set(city.stateCode, stateName);
            }

            results.push({
              placeId: `city-${city.name.toLowerCase()}-${city.stateCode}`,
              description: `${city.name}, ${stateName}, India`,
              mainText: city.name,
              secondaryText: `${stateName}, India`,
            });
          }
        }
        if (results.length >= 6) break;
      }
    } catch {
      // Fallback silently if city lookup encounters issues
    }
  }

  return results;
}

/**
 * Custom hook to integrate Google Maps Places Autocomplete & Location API.
 * Follows SOLID principles:
 * - Single responsibility: handles Google Maps SDK loading, session token lifecycle, debouncing, and place details retrieval.
 * - Clean interface: provides predictions, place details, loading state, and search controls.
 * - Resilient fallback: provides realistic transit hubs and city matches if offline or throttled.
 */
export const useGooglePlaces = ({
  apiKey = DEFAULT_API_KEY,
  countryCode = 'in',
  debounceMs = 300,
  types,
  enabled = true,
}: UseGooglePlacesOptions = {}): UseGooglePlacesReturn => {
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize official Google Maps Places script with useJsApiLoader
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: LIBRARIES,
    version: 'weekly',
  });

  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Refresh Autocomplete Session Token for billing best practices
  const refreshSessionToken = useCallback(() => {
    if (typeof window !== 'undefined' && window.google?.maps?.places?.AutocompleteSessionToken) {
      sessionTokenRef.current =
        new window.google.maps.places.AutocompleteSessionToken();
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      refreshSessionToken();
    }
  }, [isLoaded, refreshSessionToken]);

  // Clear active predictions and cancel pending debounces
  const clearPredictions = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    setPredictions([]);
    setIsLoading(false);
  }, []);

  // Fetch suggestions using modern AutocompleteSuggestion API or legacy AutocompleteService
  const search = useCallback(
    (query: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      const trimmed = query.trim();
      if (!trimmed || trimmed.length < 2) {
        setPredictions([]);
        setIsLoading(false);
        return;
      }

      if (!enabled) return;

      setIsLoading(true);

      debounceTimerRef.current = setTimeout(async () => {
        // If Google Maps is loaded and API key is present
        if (isLoaded && typeof window !== 'undefined' && window.google?.maps && apiKey) {
          try {
            // 1. Try modern Places Library AutocompleteSuggestion API
            const placesLib = (await window.google.maps.importLibrary(
              'places'
            )) as google.maps.PlacesLibrary;

            if (placesLib.AutocompleteSuggestion?.fetchAutocompleteSuggestions) {
              const request: google.maps.places.AutocompleteRequest = {
                input: trimmed,
                sessionToken: sessionTokenRef.current || undefined,
                includedRegionCodes: countryCode ? [countryCode.toLowerCase()] : ['in'],
              };

              if (types && types.length > 0) {
                request.includedPrimaryTypes = types;
              }

              const { suggestions: results } =
                await placesLib.AutocompleteSuggestion.fetchAutocompleteSuggestions(
                  request
                );

              if (results && results.length > 0) {
                const normalized: PlacePrediction[] = results.map(
                  (suggestion: google.maps.places.AutocompleteSuggestion) => {
                    const prediction = suggestion.placePrediction;
                    return {
                      placeId: prediction?.placeId || '',
                      description: prediction?.text?.text || '',
                      mainText:
                        prediction?.mainText?.text ||
                        prediction?.text?.text ||
                        '',
                      secondaryText: prediction?.secondaryText?.text || '',
                      _raw: prediction,
                    };
                  }
                );

                setPredictions(normalized);
                setIsLoading(false);
                setError(null);
                return;
              }
            }
          } catch (err) {
            console.warn('[useGooglePlaces] AutocompleteSuggestion error:', err);
          }

          // 2. Try legacy AutocompleteService as fallback
          try {
            if (window.google.maps.places?.AutocompleteService) {
              const service = new window.google.maps.places.AutocompleteService();
              service.getPlacePredictions(
                {
                  input: trimmed,
                  sessionToken: sessionTokenRef.current || undefined,
                  componentRestrictions: countryCode
                    ? { country: countryCode }
                    : { country: 'in' },
                },
                (
                  results: google.maps.places.AutocompletePrediction[] | null,
                  status: google.maps.places.PlacesServiceStatus
                ) => {
                  setIsLoading(false);
                  if (
                    status === window.google.maps.places.PlacesServiceStatus.OK &&
                    results &&
                    results.length > 0
                  ) {
                    const mapped: PlacePrediction[] = results.map((item) => ({
                      placeId: item.place_id,
                      description: item.description,
                      mainText:
                        item.structured_formatting?.main_text || item.description,
                      secondaryText:
                        item.structured_formatting?.secondary_text || '',
                    }));
                    setPredictions(mapped);
                    setError(null);
                  } else {
                    setPredictions(matchFallbackPlaces(trimmed));
                  }
                }
              );
              return;
            }
          } catch (err) {
            console.warn('[useGooglePlaces] AutocompleteService error:', err);
          }
        }

        // 3. Fallback search (when offline or Maps not yet initialized)
        const fallback = matchFallbackPlaces(trimmed);
        setPredictions(fallback);
        setIsLoading(false);
        setError(null);
      }, debounceMs);
    },
    [apiKey, countryCode, debounceMs, enabled, isLoaded, types]
  );

  // Fetch full place details (coordinates, formatted address, display name)
  const getPlaceDetails = useCallback(
    async (suggestion: PlacePrediction): Promise<PlaceDetails | null> => {
      const shortTitle =
        suggestion.mainText ||
        suggestion.description?.split(',')[0].trim() ||
        '';

      try {
        // Modern Places API: toPlace() + fetchFields()
        const rawPrediction = suggestion._raw as {
          toPlace?: () => {
            fetchFields: (opts: { fields: string[] }) => Promise<void>;
            displayName?: string;
            formattedAddress?: string;
            location?: {
              lat: () => number;
              lng: () => number;
            };
          };
        } | null;

        if (rawPrediction && typeof rawPrediction.toPlace === 'function') {
          const place = rawPrediction.toPlace();
          await place.fetchFields({
            fields: ['displayName', 'formattedAddress', 'location'],
          });

          const lat = place.location?.lat ? place.location.lat() : undefined;
          const lng = place.location?.lng ? place.location.lng() : undefined;

          refreshSessionToken();

          return {
            placeId: suggestion.placeId,
            name: place.displayName || shortTitle,
            formattedAddress: place.formattedAddress || '',
            location:
              lat !== undefined && lng !== undefined ? { lat, lng } : undefined,
          };
        }

        // Fallback: legacy PlacesService
        if (
          suggestion.placeId &&
          typeof window !== 'undefined' &&
          window.google?.maps?.places?.PlacesService
        ) {
          const mapDiv = document.createElement('div');
          const placesService = new window.google.maps.places.PlacesService(mapDiv);

          return new Promise<PlaceDetails | null>((resolve) => {
            placesService.getDetails(
              {
                placeId: suggestion.placeId,
                fields: ['name', 'formatted_address', 'geometry'],
              },
              (place, status) => {
                refreshSessionToken();
                if (
                  status === window.google.maps.places.PlacesServiceStatus.OK &&
                  place
                ) {
                  const lat = place.geometry?.location?.lat();
                  const lng = place.geometry?.location?.lng();
                  resolve({
                    placeId: suggestion.placeId,
                    name: place.name || shortTitle,
                    formattedAddress: place.formatted_address || '',
                    location:
                      lat !== undefined && lng !== undefined
                        ? { lat, lng }
                        : undefined,
                  });
                } else {
                  resolve({
                    placeId: suggestion.placeId,
                    name: shortTitle,
                    formattedAddress: suggestion.description,
                  });
                }
              }
            );
          });
        }
      } catch (err) {
        console.warn('[useGooglePlaces] getPlaceDetails error:', err);
      }

      refreshSessionToken();
      return {
        placeId: suggestion.placeId,
        name: shortTitle,
        formattedAddress: suggestion.description,
      };
    },
    [refreshSessionToken]
  );

  // Cleanup pending debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    predictions,
    isLoading,
    isLoaded,
    error,
    search,
    clearPredictions,
    getPlaceDetails,
    refreshSessionToken,
  };
};
