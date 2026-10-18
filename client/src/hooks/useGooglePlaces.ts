'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { City, State } from 'country-state-city';

const DEFAULT_API_KEY =
  (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '').trim();

/**
 * Validates Google Maps API Key:
 * Ensures it starts with AIza, is at least 35 characters long, and contains no placeholder text or spaces.
 */
export const isValidGoogleKey = (key?: string): boolean => {
  if (!key) return false;
  const trimmed = key.trim().replace(/^['"]|['"]$/g, '');
  return (
    !trimmed.includes(' ') &&
    !trimmed.toLowerCase().includes('google map api') &&
    !trimmed.toLowerCase().includes('your_api_key') &&
    trimmed.startsWith('AIza') &&
    trimmed.length >= 35
  );
};

export interface PlaceCoordinates {
  lat: number;
  lng: number;
}

export interface PlacePrediction {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
  location?: PlaceCoordinates;
  _raw?: unknown;
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
  lat?: number;
  lng?: number;
}[] = [
  // Delhi NCR
  { mainText: 'Delhi', secondaryText: 'India', lat: 28.6139, lng: 77.209 },
  {
    mainText: 'Delhi Airport (DEL)',
    secondaryText: 'Terminal 3, New Delhi, Delhi, India',
    lat: 28.5562,
    lng: 77.1000,
  },
  {
    mainText: 'Terminal 3 IGI Airport',
    secondaryText: 'New Delhi, Delhi, India',
    lat: 28.5562,
    lng: 77.1000,
  },
  {
    mainText: 'Terminal 1 IGI Airport',
    secondaryText: 'Palam, New Delhi, Delhi, India',
    lat: 28.5684,
    lng: 77.1123,
  },
  {
    mainText: 'Delhi Cantt',
    secondaryText: 'Delhi Cantonment, New Delhi, Delhi, India',
    lat: 28.5983,
    lng: 77.1235,
  },
  {
    mainText: 'Delhi Junction',
    secondaryText: 'Old Delhi, Mori Gate, New Delhi, Delhi, India',
    lat: 28.6609,
    lng: 77.2276,
  },
  {
    mainText: 'Majnu Ka Tilla',
    secondaryText: 'Civil Lines, North Delhi, Delhi, India',
    lat: 28.7005,
    lng: 77.2268,
  },
  {
    mainText: 'Kashmere Gate ISBT',
    secondaryText: 'Kashmere Gate, New Delhi, Delhi, India',
    lat: 28.6676,
    lng: 77.2281,
  },
  {
    mainText: 'Anand Vihar ISBT',
    secondaryText: 'Anand Vihar, New Delhi, Delhi, India',
    lat: 28.6502,
    lng: 77.3160,
  },
  {
    mainText: 'New Delhi Railway Station',
    secondaryText: 'Bhavbhuti Marg, Ajmeri Gate, New Delhi, India',
    lat: 28.6430,
    lng: 77.2223,
  },
  {
    mainText: 'Hazrat Nizamuddin Railway Station',
    secondaryText: 'Nizamuddin, New Delhi, Delhi, India',
    lat: 28.5893,
    lng: 77.2530,
  },
  {
    mainText: 'Sarai Kale Khan ISBT',
    secondaryText: 'Sarai Kale Khan, New Delhi, Delhi, India',
    lat: 28.5925,
    lng: 77.2604,
  },
  { mainText: 'Aerocity', secondaryText: 'IGI Airport, New Delhi, Delhi, India', lat: 28.5495, lng: 77.1215 },
  { mainText: 'Connaught Place', secondaryText: 'New Delhi, Delhi, India', lat: 28.6315, lng: 77.2167 },
  { mainText: 'Noida Sector 62', secondaryText: 'Noida, Uttar Pradesh, India', lat: 28.6280, lng: 77.3649 },
  { mainText: 'Gurugram IFFCO Chowk', secondaryText: 'Sector 29, Gurugram, Haryana, India', lat: 28.4720, lng: 77.0725 },
  // Uttar Pradesh
  { mainText: 'Sitapur', secondaryText: 'Uttar Pradesh, India', lat: 27.5684, lng: 80.6829 },
  { mainText: 'Lalbagh Sitapur', secondaryText: 'Sitapur, Uttar Pradesh, India', lat: 27.5712, lng: 80.6762 },
  { mainText: 'Lucknow Charbagh', secondaryText: 'Charbagh, Lucknow, Uttar Pradesh, India', lat: 26.8324, lng: 80.9174 },
  { mainText: 'Varanasi Cantt', secondaryText: 'Varanasi, Uttar Pradesh, India', lat: 25.3284, lng: 82.9863 },
  { mainText: 'Agra Cantt', secondaryText: 'Agra, Uttar Pradesh, India', lat: 27.1574, lng: 77.9912 },
  // Himachal Pradesh
  {
    mainText: 'Manali Mall Road',
    secondaryText: 'Mall Road, Manali, Himachal Pradesh, India',
    lat: 32.2396,
    lng: 77.1887,
  },
  { mainText: 'Old Manali', secondaryText: 'Manali, Himachal Pradesh, India', lat: 32.2532, lng: 77.1751 },
  { mainText: 'Solang Valley', secondaryText: 'Manali, Himachal Pradesh, India', lat: 32.3166, lng: 77.1575 },
  { mainText: 'Sissu', secondaryText: 'Lahaul and Spiti, Himachal Pradesh, India', lat: 32.4800, lng: 77.1250 },
  { mainText: 'Atal Tunnel', secondaryText: 'Rohtang, Himachal Pradesh, India', lat: 32.3646, lng: 77.1332 },
  { mainText: 'Rohtang Pass', secondaryText: 'Manali, Himachal Pradesh, India', lat: 32.3721, lng: 77.2466 },
  {
    mainText: 'Kasol',
    secondaryText: 'Parvati Valley, Kullu, Himachal Pradesh, India',
    lat: 32.0100,
    lng: 77.3150,
  },
  {
    mainText: 'Tosh',
    secondaryText: 'Parvati Valley, Kullu, Himachal Pradesh, India',
    lat: 32.0150,
    lng: 77.4520,
  },
  {
    mainText: 'Kheerganga',
    secondaryText: 'Parvati Valley, Kullu, Himachal Pradesh, India',
    lat: 31.9890,
    lng: 77.5110,
  },
  {
    mainText: 'Jibhi',
    secondaryText: 'Tirthan Valley, Kullu, Himachal Pradesh, India',
    lat: 31.6370,
    lng: 77.3450,
  },
  {
    mainText: 'Shimla Old Bus Stand',
    secondaryText: 'Cart Road, Shimla, Himachal Pradesh, India',
    lat: 31.1048,
    lng: 77.1734,
  },
  {
    mainText: 'Shimla Mall Road',
    secondaryText: 'Mall Road, Shimla, Himachal Pradesh, India',
    lat: 31.1048,
    lng: 77.1734,
  },
  {
    mainText: 'Dharamshala Bus Stand',
    secondaryText: 'Dharamshala, Himachal Pradesh, India',
    lat: 32.2190,
    lng: 76.3234,
  },
  {
    mainText: 'McLeod Ganj',
    secondaryText: 'Dharamshala, Kangra, Himachal Pradesh, India',
    lat: 32.2426,
    lng: 76.3213,
  },
  {
    mainText: 'Bir Billing',
    secondaryText: 'Baijnath, Kangra, Himachal Pradesh, India',
    lat: 32.0514,
    lng: 76.7214,
  },
  { mainText: 'Kaza', secondaryText: 'Spiti Valley, Himachal Pradesh, India', lat: 32.2276, lng: 78.0710 },
  // Chandigarh & Punjab
  {
    mainText: 'Chandigarh ISBT Sector 43',
    secondaryText: 'Sector 43, Chandigarh, India',
    lat: 30.7180,
    lng: 76.7450,
  },
  {
    mainText: 'Chandigarh ISBT Sector 17',
    secondaryText: 'Sector 17, Chandigarh, India',
    lat: 30.7398,
    lng: 76.7827,
  },
  {
    mainText: 'Chandigarh Railway Station',
    secondaryText: 'Daria, Chandigarh, India',
    lat: 30.7020,
    lng: 76.8220,
  },
  {
    mainText: 'Amritsar Golden Temple',
    secondaryText: 'Amritsar, Punjab, India',
    lat: 31.6200,
    lng: 74.8765,
  },
  // Uttarakhand
  {
    mainText: 'Rishikesh Bus Station',
    secondaryText: 'Rishikesh, Uttarakhand, India',
    lat: 30.1033,
    lng: 78.2947,
  },
  { mainText: 'Laxman Jhula', secondaryText: 'Rishikesh, Uttarakhand, India', lat: 30.1245, lng: 78.3305 },
  { mainText: 'Tapovan', secondaryText: 'Rishikesh, Uttarakhand, India', lat: 30.1294, lng: 78.3245 },
  {
    mainText: 'Haridwar Railway Station',
    secondaryText: 'Haridwar, Uttarakhand, India',
    lat: 29.9457,
    lng: 78.1488,
  },
  { mainText: 'Har Ki Pauri', secondaryText: 'Haridwar, Uttarakhand, India', lat: 29.9567, lng: 78.1706 },
  {
    mainText: 'Dehradun ISBT',
    secondaryText: 'Haridwar Bypass Road, Dehradun, Uttarakhand, India',
    lat: 30.2868,
    lng: 78.0062,
  },
  {
    mainText: 'Mussoorie Mall Road',
    secondaryText: 'Mussoorie, Dehradun, Uttarakhand, India',
    lat: 30.4598,
    lng: 78.0644,
  },
  {
    mainText: 'Nainital Mall Road',
    secondaryText: 'Nainital, Uttarakhand, India',
    lat: 29.3919,
    lng: 79.4542,
  },
  // Jammu & Kashmir / Ladakh
  { mainText: 'Leh Main Bazaar', secondaryText: 'Leh, Ladakh, India', lat: 34.1642, lng: 77.5848 },
  { mainText: 'Pangong Tso', secondaryText: 'Leh, Ladakh, India', lat: 33.7595, lng: 78.6674 },
  { mainText: 'Nubra Valley', secondaryText: 'Ladakh, India', lat: 34.6863, lng: 77.5673 },
  {
    mainText: 'Srinagar TRC Bus Stand',
    secondaryText: 'Srinagar, Jammu and Kashmir, India',
    lat: 34.0747,
    lng: 74.8204,
  },
  { mainText: 'Dal Lake', secondaryText: 'Srinagar, Jammu and Kashmir, India', lat: 34.0837, lng: 74.8580 },
  {
    mainText: 'Gulmarg Gondola',
    secondaryText: 'Baramulla, Jammu and Kashmir, India',
    lat: 34.0484,
    lng: 74.3805,
  },
  // Rajasthan
  {
    mainText: 'Jaipur Sindhi Camp',
    secondaryText: 'Station Road, Sindhi Camp, Jaipur, Rajasthan, India',
    lat: 26.9239,
    lng: 75.7972,
  },
  {
    mainText: 'Jaipur Airport (JAI)',
    secondaryText: 'Sanganer, Jaipur, Rajasthan, India',
    lat: 26.8289,
    lng: 75.8056,
  },
  {
    mainText: 'Udaipur City Railway Station',
    secondaryText: 'Udaipur, Rajasthan, India',
    lat: 24.5765,
    lng: 73.6967,
  },
  { mainText: 'Jodhpur Junction', secondaryText: 'Jodhpur, Rajasthan, India', lat: 26.2840, lng: 73.0180 },
  // Maharashtra & South India
  { mainText: 'Mumbai CST', secondaryText: 'Fort, Mumbai, Maharashtra, India', lat: 18.9400, lng: 72.8354 },
  {
    mainText: 'Mumbai Airport (BOM)',
    secondaryText: 'Sahar, Andheri East, Mumbai, Maharashtra, India',
    lat: 19.0896,
    lng: 72.8656,
  },
  {
    mainText: 'Pune Swargate Bus Station',
    secondaryText: 'Swargate, Pune, Maharashtra, India',
    lat: 18.5018,
    lng: 73.8580,
  },
  {
    mainText: 'Bengaluru Majestic (KSR)',
    secondaryText: 'Kempegowda, Bengaluru, Karnataka, India',
    lat: 12.9774,
    lng: 77.5708,
  },
  {
    mainText: 'Bengaluru Airport (BLR)',
    secondaryText: 'Devanahalli, Bengaluru, Karnataka, India',
    lat: 13.1986,
    lng: 77.7066,
  },
  { mainText: 'Goa Dabolim Airport (GOI)', secondaryText: 'Dabolim, Goa, India', lat: 15.3808, lng: 73.8314 },
  { mainText: 'Goa Mopa Airport (GOX)', secondaryText: 'Mopa, Pernem, Goa, India', lat: 15.7483, lng: 73.8647 },
  { mainText: 'Panaji KTC Bus Stand', secondaryText: 'Panaji, Goa, India', lat: 15.4989, lng: 73.8278 },
];

/**
 * Real-time live geocoding & place search via OpenStreetMap Photon API.
 * Free, fast, CORS-enabled worldwide geocoding with India coordinates bias.
 */
async function fetchPhotonPlaces(
  query: string,
  signal?: AbortSignal
): Promise<PlacePrediction[]> {
  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(
      query
    )}&limit=8&lat=28.6139&lon=77.2090`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const onParentAbort = () => {
      controller.abort();
    };
    if (signal) {
      signal.addEventListener('abort', onParentAbort);
    }

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener('abort', onParentAbort);
    }

    if (!response.ok) return [];

    const data = await response.json();
    if (!data || !Array.isArray(data.features)) return [];

    const results: PlacePrediction[] = [];
    const seenNames = new Set<string>();

    for (const feature of data.features) {
      const p = feature.properties || {};
      const coords = feature.geometry?.coordinates; // [lng, lat]

      const mainText =
        p.name ||
        p.street ||
        p.locality ||
        p.district ||
        p.city ||
        query;

      const secondaryParts: string[] = [];
      if (p.street && p.street !== mainText) secondaryParts.push(p.street);
      if (p.locality && p.locality !== mainText) secondaryParts.push(p.locality);
      if (p.district && p.district !== mainText) secondaryParts.push(p.district);
      if (p.city && p.city !== mainText) secondaryParts.push(p.city);
      if (p.state) secondaryParts.push(p.state);
      if (p.country && p.country !== 'India') secondaryParts.push(p.country);

      const secondaryText = secondaryParts.join(', ') || 'India';
      const dedupeKey = `${mainText.toLowerCase()}-${(p.city || '').toLowerCase()}-${(p.state || '').toLowerCase()}`;

      if (!seenNames.has(dedupeKey)) {
        seenNames.add(dedupeKey);
        results.push({
          placeId: `osm-${feature.properties.osm_type || 'p'}-${feature.properties.osm_id || Math.random().toString(36).substring(2, 9)}`,
          description: `${mainText}, ${secondaryText}`,
          mainText,
          secondaryText,
          location:
            Array.isArray(coords) && coords.length >= 2
              ? { lat: coords[1], lng: coords[0] }
              : undefined,
          _raw: feature,
        });
      }

      if (results.length >= 8) break;
    }

    return results;
  } catch {
    // If aborted or network fails, gracefully return empty array to trigger fallback
    return [];
  }
}

/**
 * Intelligent multi-word token matching across curated transit hubs and 4,242 Indian cities.
 * Resolves searches like "lalbag sitapur", "new delhi terminal 3", "manali mall road", etc.
 */
function matchFallbackPlaces(query: string): PlacePrediction[] {
  const qLower = query.toLowerCase().trim();
  if (!qLower) return [];
  const queryTokens = qLower.split(/[\s,.-]+/).filter((t) => t.length > 1);
  if (queryTokens.length === 0) return [];

  const results: PlacePrediction[] = [];
  const seenKeys = new Set<string>();

  // 1. Search curated transit hubs
  for (const item of FALLBACK_DESTINATIONS) {
    const mainLower = item.mainText.toLowerCase();
    const secLower = item.secondaryText.toLowerCase();
    const combined = `${mainLower} ${secLower}`;

    const isExact = mainLower.startsWith(qLower) || combined.includes(qLower);
    const allTokensMatch =
      queryTokens.length > 1 && queryTokens.every((tok) => combined.includes(tok));
    const anyTokenMatch = queryTokens.some((tok) => mainLower.includes(tok));

    if (isExact || allTokensMatch || anyTokenMatch) {
      const key = item.mainText.toLowerCase();
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        results.push({
          placeId: `fallback-${item.mainText.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          description: `${item.mainText}, ${item.secondaryText}`,
          mainText: item.mainText,
          secondaryText: item.secondaryText,
          location:
            item.lat && item.lng ? { lat: item.lat, lng: item.lng } : undefined,
        });
      }
    }
    if (results.length >= 8) break;
  }

  // 2. Search Indian cities database
  if (results.length < 8) {
    try {
      const indianCities = City.getCitiesOfCountry('IN') || [];
      const stateMap = new Map<string, string>();

      for (const city of indianCities) {
        const cLower = city.name.toLowerCase();
        let stateName = stateMap.get(city.stateCode);
        if (!stateName) {
          const st = State.getStateByCodeAndCountry(city.stateCode, 'IN');
          stateName = st?.name || city.stateCode;
          stateMap.set(city.stateCode, stateName);
        }
        const stLower = stateName.toLowerCase();
        const cityCombined = `${cLower} ${stLower}`;

        const isExact = cLower.startsWith(qLower) || cityCombined.includes(qLower);
        const allTokens =
          queryTokens.length > 1 && queryTokens.every((tok) => cityCombined.includes(tok));
        const anyToken = queryTokens.some((tok) => cLower.startsWith(tok) || cLower === tok);

        if (isExact || allTokens || anyToken) {
          if (!seenKeys.has(cLower)) {
            seenKeys.add(cLower);
            results.push({
              placeId: `city-${city.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${city.stateCode}`,
              description: `${city.name}, ${stateName}, India`,
              mainText: city.name,
              secondaryText: `${stateName}, India`,
              location:
                city.latitude && city.longitude
                  ? { lat: parseFloat(city.latitude), lng: parseFloat(city.longitude) }
                  : undefined,
            });
          }
        }
        if (results.length >= 8) break;
      }
    } catch (err) {
      console.warn('[useGooglePlaces] fallback Indian cities error:', err);
    }
  }

  return results;
}

/**
 * Custom hook to integrate Google Maps Places Autocomplete & Location API.
 * Follows SOLID principles:
 * - Single responsibility: handles Google Maps SDK loading, debouncing, AbortController request cancellation, and multi-tier geocoding.
 * - Resilient fallback: seamlessly falls back to real-time live OSM Photon geocoding and local token-based city search when Google API key is missing or invalid.
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

  // In-memory cache for instantaneous backspace & typing experience
  const cacheRef = useRef<Map<string, PlacePrediction[]>>(new Map());

  // Safe script loading only when a valid Google API key is provided
  const [isLoaded, setIsLoaded] = useState<boolean>(() => {
    return typeof window !== 'undefined' && Boolean(window.google?.maps?.places);
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    (window as unknown as { gm_authFailure?: () => void }).gm_authFailure = () => {
      console.warn('[useGooglePlaces] Google Maps authentication failed, using live OSM & local dataset.');
    };

    if (window.google?.maps?.places) {
      return;
    }

    if (!isValidGoogleKey(apiKey)) {
      return;
    }

    const scriptId = 'google-map-script';
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existingScript) {
      const handleLoad = () => setIsLoaded(true);
      existingScript.addEventListener('load', handleLoad);
      return () => existingScript.removeEventListener('load', handleLoad);
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => {
      console.warn('[useGooglePlaces] Google Maps script failed to load, falling back to live OSM dataset.');
    };
    document.head.appendChild(script);
  }, [apiKey]);

  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const searchSeqRef = useRef<number>(0);

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
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    searchSeqRef.current += 1;
    setPredictions([]);
    setIsLoading(false);
    setError(null);
  }, []);

  // Fetch suggestions using debounced multi-tier pipeline: Google Maps -> Live OSM -> Local Token Matching
  const search = useCallback(
    (query: string) => {
      // 1. Cancel previous pending timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }

      // 2. Abort any previous pending fetch request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }

      const trimmed = query.trim();
      if (!trimmed || trimmed.length < 2) {
        searchSeqRef.current += 1;
        setPredictions([]);
        setIsLoading(false);
        setError(null);
        return;
      }

      if (!enabled) return;

      const cacheKey = trimmed.toLowerCase();

      // 3. Instant cached result
      if (cacheRef.current.has(cacheKey)) {
        setPredictions(cacheRef.current.get(cacheKey)!);
        setIsLoading(false);
        setError(null);
        return;
      }

      // 4. Mark loading immediately so the user sees active search feedback
      setIsLoading(true);

      // 5. Sequence counter to avoid race conditions
      const currentSeq = ++searchSeqRef.current;

      // 6. Debounced search trigger
      debounceTimerRef.current = setTimeout(async () => {
        if (searchSeqRef.current !== currentSeq) return;

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        let results: PlacePrediction[] = [];

        // Tier 1: Try Google Maps if a genuine key is configured
        if (
          isLoaded &&
          typeof window !== 'undefined' &&
          window.google?.maps &&
          isValidGoogleKey(apiKey)
        ) {
          try {
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

              const { suggestions } =
                await placesLib.AutocompleteSuggestion.fetchAutocompleteSuggestions(
                  request
                );

              if (suggestions && suggestions.length > 0) {
                results = suggestions.map(
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
              }
            }
          } catch (err) {
            console.warn('[useGooglePlaces] Google Places modern API error:', err);
          }

          // Legacy AutocompleteService fallback for Google
          if (results.length === 0 && window.google?.maps?.places?.AutocompleteService) {
            try {
              const service = new window.google.maps.places.AutocompleteService();
              const legacyResults = await new Promise<PlacePrediction[]>((resolve) => {
                const timer = setTimeout(() => resolve([]), 1200);
                service.getPlacePredictions(
                  {
                    input: trimmed,
                    sessionToken: sessionTokenRef.current || undefined,
                    componentRestrictions: countryCode
                      ? { country: countryCode }
                      : { country: 'in' },
                  },
                  (preds, status) => {
                    clearTimeout(timer);
                    if (
                      status === window.google.maps.places.PlacesServiceStatus.OK &&
                      preds &&
                      preds.length > 0
                    ) {
                      resolve(
                        preds.map((item) => ({
                          placeId: item.place_id,
                          description: item.description,
                          mainText:
                            item.structured_formatting?.main_text || item.description,
                          secondaryText:
                            item.structured_formatting?.secondary_text || '',
                        }))
                      );
                    } else {
                      resolve([]);
                    }
                  }
                );
              });
              if (legacyResults.length > 0) {
                results = legacyResults;
              }
            } catch (err) {
              console.warn('[useGooglePlaces] Google legacy service error:', err);
            }
          }
        }

        // Tier 2: Real-time Live Geocoding via Photon OpenStreetMap
        if (results.length === 0 && !abortController.signal.aborted) {
          try {
            const photonResults = await fetchPhotonPlaces(trimmed, abortController.signal);
            if (photonResults && photonResults.length > 0) {
              results = photonResults;
            }
          } catch (err) {
            console.warn('[useGooglePlaces] Live OSM fetch error:', err);
          }
        }

        // Tier 3: Local Token-based Matching Fallback (curated hubs & Indian cities)
        if (results.length === 0 && !abortController.signal.aborted) {
          results = matchFallbackPlaces(trimmed);
        }

        // Commit results only if this search request is still current
        if (searchSeqRef.current === currentSeq) {
          if (results.length > 0) {
            cacheRef.current.set(cacheKey, results);
          }
          setPredictions(results);
          setIsLoading(false);
          setError(null);
        }
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

      if (suggestion.location) {
        return {
          placeId: suggestion.placeId,
          name: shortTitle,
          formattedAddress: suggestion.description,
          location: suggestion.location,
        };
      }

      try {
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
            formattedAddress: place.formattedAddress || suggestion.description,
            location:
              lat !== undefined && lng !== undefined ? { lat, lng } : undefined,
          };
        }

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
                    formattedAddress: place.formatted_address || suggestion.description,
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
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
