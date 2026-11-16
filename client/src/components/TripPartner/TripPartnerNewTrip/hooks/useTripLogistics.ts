'use client';

import { useMemo, useCallback } from 'react';
import { Country, City } from 'country-state-city';
import { useCityState } from '@/hooks/useCityState';
import {
  NewTripFormData,
  TripType,
  syncItineraryDays,
} from '../types';
import {
  POPULAR_INTERNATIONAL_COUNTRIES,
} from '../constants/destinations';

interface UseTripLogisticsProps {
  formData: NewTripFormData;
  updateForm: (fields: Partial<NewTripFormData>) => void;
}

export const useTripLogistics = ({
  formData,
  updateForm,
}: UseTripLogisticsProps) => {
  const tripType: TripType = formData.tripType || 'domestic';

  // 1. Domestic: City & State resolution for India ('IN')
  const { states: domesticStates, cities: domesticCities, getCitiesForState } = useCityState({
    countryCode: 'IN',
    selectedState: formData.destinationState,
  });

  // 2. International: Filter all countries (excluding India)
  const allInternationalCountries = useMemo(() => {
    try {
      return Country.getAllCountries()
        .filter((c) => c.isoCode !== 'IN')
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch {
      return [];
    }
  }, []);

  // 3. Resolve active international country code
  const activeCountryCode = useMemo(() => {
    if (tripType !== 'international') return 'IN';
    if (formData.destinationCountryCode) return formData.destinationCountryCode;

    if (formData.destinationCountry) {
      const match =
        POPULAR_INTERNATIONAL_COUNTRIES.find(
          (c) => c.name.toLowerCase() === formData.destinationCountry?.toLowerCase()
        ) ||
        allInternationalCountries.find(
          (c) => c.name.toLowerCase() === formData.destinationCountry?.toLowerCase()
        );
      if (match) {
        return 'code' in match ? match.code : match.isoCode;
      }
    }
    return '';
  }, [tripType, formData.destinationCountryCode, formData.destinationCountry, allInternationalCountries]);

  // 4. Resolve international cities for active country
  const internationalCities = useMemo(() => {
    if (tripType !== 'international' || !activeCountryCode) return [];

    const popularEntry = POPULAR_INTERNATIONAL_COUNTRIES.find(
      (c) => c.code === activeCountryCode
    );
    const popularCityList = popularEntry ? popularEntry.popularCities : [];

    try {
      const rawCities = City.getCitiesOfCountry(activeCountryCode) || [];
      const uniqueRawNames = Array.from(
        new Set(rawCities.map((c) => c.name?.trim()).filter(Boolean))
      );
      const otherCities = uniqueRawNames
        .filter((name) => !popularCityList.includes(name))
        .sort((a, b) => a.localeCompare(b));

      return Array.from(new Set([...popularCityList, ...otherCities]));
    } catch {
      return popularCityList;
    }
  }, [tripType, activeCountryCode]);

  // 5. Handlers for switching Scope (Domestic vs International)
  const handleScopeChange = useCallback(
    (newScope: TripType) => {
      if (newScope === tripType) return;

      if (newScope === 'domestic') {
        const defaultState = 'Himachal Pradesh';
        const defaultCity = 'Manali';
        const combined = `${defaultCity}, ${defaultState}`;

        updateForm({
          tripType: 'domestic',
          destinationCountry: 'India',
          destinationCountryCode: 'IN',
          destinationState: defaultState,
          destinationCity: defaultCity,
          destination: combined,
          visaPolicy: 'Not Required',
        });
      } else {
        const defaultCountry = 'Thailand';
        const defaultCode = 'TH';
        const defaultCity = 'Bangkok';
        const combined = `${defaultCity}, ${defaultCountry}`;

        updateForm({
          tripType: 'international',
          destinationCountry: defaultCountry,
          destinationCountryCode: defaultCode,
          destinationState: '',
          destinationCity: defaultCity,
          destination: combined,
          visaPolicy: formData.visaPolicy && formData.visaPolicy !== 'Not Required'
            ? formData.visaPolicy
            : 'Visa on Arrival',
        });
      }
    },
    [tripType, updateForm, formData.visaPolicy]
  );

  // 6. Domestic Location handlers
  const handleDomesticStateChange = useCallback(
    (stateName: string) => {
      const newCities = stateName ? getCitiesForState(stateName) : [];
      const isCityStillValid =
        formData.destinationCity &&
        newCities.some(
          (c) => c.name.toLowerCase() === formData.destinationCity?.toLowerCase()
        );
      const newCity = isCityStillValid ? formData.destinationCity : '';
      const combined = [newCity, stateName].filter(Boolean).join(', ');

      updateForm({
        destinationState: stateName,
        destinationCity: newCity,
        destination: combined,
      });
    },
    [getCitiesForState, formData.destinationCity, updateForm]
  );

  const handleDomesticCityChange = useCallback(
    (cityName: string) => {
      const combined = [cityName, formData.destinationState].filter(Boolean).join(', ');
      updateForm({
        destinationCity: cityName,
        destination: combined,
      });
    },
    [formData.destinationState, updateForm]
  );

  // 7. International Location handlers
  const handleInternationalCountryChange = useCallback(
    (countryCode: string) => {
      const countryObj =
        POPULAR_INTERNATIONAL_COUNTRIES.find((c) => c.code === countryCode) ||
        allInternationalCountries.find((c) => c.isoCode === countryCode);

      if (!countryObj) return;

      const countryName = countryObj.name;
      const popularEntry = POPULAR_INTERNATIONAL_COUNTRIES.find(
        (c) => c.code === countryCode
      );
      const firstCity = popularEntry?.popularCities[0] || '';
      const combined = [firstCity, countryName].filter(Boolean).join(', ');

      updateForm({
        destinationCountry: countryName,
        destinationCountryCode: countryCode,
        destinationState: '',
        destinationCity: firstCity,
        destination: combined,
      });
    },
    [allInternationalCountries, updateForm]
  );

  const handleInternationalCityChange = useCallback(
    (cityName: string) => {
      const combined = [cityName, formData.destinationCountry].filter(Boolean).join(', ');
      updateForm({
        destinationCity: cityName,
        destination: combined,
      });
    },
    [formData.destinationCountry, updateForm]
  );

  // 8. Pickup Points helpers
  const pickupPoints = useMemo(
    () =>
      formData.pickupPoints && formData.pickupPoints.length > 0
        ? formData.pickupPoints
        : [''],
    [formData.pickupPoints]
  );

  const handleAddPickupPoint = useCallback(() => {
    const updated = [...pickupPoints, ''];
    updateForm({
      pickupPoints: updated,
      pickupPoint: updated.find((p) => p.trim()) || updated[0] || '',
    });
  }, [pickupPoints, updateForm]);

  const handleUpdatePickupPoint = useCallback(
    (index: number, value: string) => {
      const updated = [...pickupPoints];
      updated[index] = value;
      updateForm({
        pickupPoints: updated,
        pickupPoint: updated.find((p) => p.trim()) || updated[0] || '',
      });
    },
    [pickupPoints, updateForm]
  );

  const handleRemovePickupPoint = useCallback(
    (index: number) => {
      if (pickupPoints.length <= 1) {
        updateForm({ pickupPoints: [''], pickupPoint: '' });
        return;
      }
      const updated = pickupPoints.filter((_, i) => i !== index);
      updateForm({
        pickupPoints: updated,
        pickupPoint: updated.find((p) => p.trim()) || updated[0] || '',
      });
    },
    [pickupPoints, updateForm]
  );

  // 9. Destinations Covered helpers
  const destinationsCovered = useMemo(
    () =>
      formData.destinationsCovered && formData.destinationsCovered.length > 0
        ? formData.destinationsCovered
        : [''],
    [formData.destinationsCovered]
  );

  const handleAddDestinationCovered = useCallback(() => {
    const updated = [...destinationsCovered, ''];
    updateForm({ destinationsCovered: updated });
  }, [destinationsCovered, updateForm]);

  const handleUpdateDestinationCovered = useCallback(
    (index: number, value: string) => {
      const updated = [...destinationsCovered];
      updated[index] = value;
      updateForm({ destinationsCovered: updated });
    },
    [destinationsCovered, updateForm]
  );

  const handleRemoveDestinationCovered = useCallback(
    (index: number) => {
      if (destinationsCovered.length <= 1) {
        updateForm({ destinationsCovered: [''] });
        return;
      }
      const updated = destinationsCovered.filter((_, i) => i !== index);
      updateForm({ destinationsCovered: updated });
    },
    [destinationsCovered, updateForm]
  );

  // 10. Duration handlers
  const handleDurationDaysChange = useCallback(
    (daysStr: string) => {
      const num = Number(daysStr);
      const updatePayload: Partial<NewTripFormData> = {
        durationDays: daysStr,
      };
      if (num > 0) {
        updatePayload.itinerary = syncItineraryDays(formData.itinerary, num);
      }
      updateForm(updatePayload);
    },
    [formData.itinerary, updateForm]
  );

  return {
    tripType,
    handleScopeChange,
    domesticStates,
    domesticCities,
    handleDomesticStateChange,
    handleDomesticCityChange,
    activeCountryCode,
    popularInternationalCountries: POPULAR_INTERNATIONAL_COUNTRIES,
    allInternationalCountries,
    internationalCities,
    handleInternationalCountryChange,
    handleInternationalCityChange,
    pickupPoints,
    handleAddPickupPoint,
    handleUpdatePickupPoint,
    handleRemovePickupPoint,
    destinationsCovered,
    handleAddDestinationCovered,
    handleUpdateDestinationCovered,
    handleRemoveDestinationCovered,
    handleDurationDaysChange,
  };
};

