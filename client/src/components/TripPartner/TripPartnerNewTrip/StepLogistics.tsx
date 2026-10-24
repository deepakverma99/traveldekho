'use client';

import React from 'react';
import { Moon, Sun, ChevronDown, Plus, AlertCircle, MapPin, Building, Mountain, Navigation } from 'lucide-react';
import { PlaceAutocompleteInput } from '@/components/shared';
import {
  NewTripFormData,
  DIFFICULTY_OPTIONS,
  isValidOnlyNumbers,
  isValidAlphanumeric,
  filterOnlyNumbers,
  filterAlphanumeric,
  syncItineraryDays,
} from './types';
import { TripDifficulty } from '../types/';
import { useCityState } from '@/hooks';

interface StepLogisticsProps {
  formData: NewTripFormData;
  updateForm: (fields: Partial<NewTripFormData>) => void;
}

export const StepLogistics: React.FC<StepLogisticsProps> = ({
  formData,
  updateForm,
}) => {
  // Ensure array has default 1 item
  const pickupPoints =
    formData.pickupPoints && formData.pickupPoints.length > 0
      ? formData.pickupPoints
      : [''];

  const destinationsCovered =
    formData.destinationsCovered && formData.destinationsCovered.length > 0
      ? formData.destinationsCovered
      : [''];

  const handleAddPickupPoint = () => {
    const updated = [...pickupPoints, ''];
    updateForm({
      pickupPoints: updated,
      pickupPoint: updated.find((p) => p.trim()) || updated[0] || '',
    });
  };

  const handleUpdatePickupPoint = (index: number, value: string) => {
    const updated = [...pickupPoints];
    updated[index] = value;
    updateForm({
      pickupPoints: updated,
      pickupPoint: updated.find((p) => p.trim()) || updated[0] || '',
    });
  };

  const handleRemovePickupPoint = (index: number) => {
    if (pickupPoints.length <= 1) {
      updateForm({ pickupPoints: [''], pickupPoint: '' });
      return;
    }
    const updated = pickupPoints.filter((_, i) => i !== index);
    updateForm({
      pickupPoints: updated,
      pickupPoint: updated.find((p) => p.trim()) || updated[0] || '',
    });
  };

  const handleAddDestinationCovered = () => {
    const updated = [...destinationsCovered, ''];
    updateForm({ destinationsCovered: updated });
  };

  const handleUpdateDestinationCovered = (index: number, value: string) => {
    const updated = [...destinationsCovered];
    updated[index] = value;
    updateForm({ destinationsCovered: updated });
  };

  const handleRemoveDestinationCovered = (index: number) => {
    if (destinationsCovered.length <= 1) {
      updateForm({ destinationsCovered: [''] });
      return;
    }
    const updated = destinationsCovered.filter((_, i) => i !== index);
    updateForm({ destinationsCovered: updated });
  };

  const isNightsValid = isValidOnlyNumbers(formData.durationNights);
  const isDaysValid = isValidOnlyNumbers(formData.durationDays);

  const { states, cities, getCitiesForState } = useCityState({
    countryCode: 'IN',
    selectedState: formData.destinationState,
  });

  const handleStateChange = (stateName: string) => {
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
  };

  const handleCityChange = (cityName: string) => {
    const combined = [cityName, formData.destinationState].filter(Boolean).join(', ');
    updateForm({
      destinationCity: cityName,
      destination: combined,
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 sm:gap-7 font-jakarta">
      {/* State, City & Difficulty Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
        {/* Destination State */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="trip-destination-state" className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-800">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              State <span className="text-red-500 ml-1 font-bold inline">*</span>
            </span>
          </label>
          <div className="relative w-full [&>svg]:absolute [&>svg]:right-5 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-4.5 [&>svg]:h-4.5 [&>svg]:text-gray-500 [&>svg]:pointer-events-none">
            <select
              id="trip-destination-state"
              value={formData.destinationState || ''}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full bg-[#f8fafc] hover:bg-[#f1f5f9] focus:bg-white border-2 border-transparent focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25 rounded-2xl py-3 pl-4 sm:pl-5 pr-11 text-sm sm:text-[15px] font-medium text-gray-900 font-jakarta outline-none appearance-none cursor-pointer transition-all"
            >
              <option value="" disabled>
                Select Indian State...
              </option>
              {states.map((st) => (
                <option key={st.isoCode} value={st.name}>
                  {st.name}
                </option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* Destination City */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="trip-destination-city" className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-800">
              <Building className="w-3.5 h-3.5 text-amber-500" />
              City <span className="text-red-500 ml-1 font-bold inline">*</span>
            </span>
          </label>
          <div className="relative w-full [&>svg]:absolute [&>svg]:right-5 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-4.5 [&>svg]:h-4.5 [&>svg]:text-gray-500 [&>svg]:pointer-events-none">
            <select
              id="trip-destination-city"
              value={formData.destinationCity || ''}
              onChange={(e) => handleCityChange(e.target.value)}
              disabled={!formData.destinationState}
              className="w-full bg-[#f8fafc] hover:bg-[#f1f5f9] focus:bg-white border-2 border-transparent focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25 rounded-2xl py-3 pl-4 sm:pl-5 pr-11 text-sm sm:text-[15px] font-medium text-gray-900 font-jakarta outline-none appearance-none cursor-pointer transition-all disabled:opacity-50"
            >
              <option value="" disabled>
                {formData.destinationState ? 'Select City...' : 'Select State First'}
              </option>
              {/* Preserve existing city if not in official list */}
              {formData.destinationCity &&
                !cities.some(
                  (c) =>
                    c.name.toLowerCase() === formData.destinationCity?.toLowerCase()
                ) && (
                  <option value={formData.destinationCity}>
                    {formData.destinationCity}
                  </option>
                )}
              {cities.map((ct) => (
                <option key={`${ct.name}-${ct.latitude || ''}`} value={ct.name}>
                  {ct.name}
                </option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* Difficulty with Toggle Switch */}
        <div className="flex flex-col gap-2 w-full">
          <div className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between select-none">
            <label htmlFor="trip-difficulty" className="flex items-center gap-1.5 text-gray-800 cursor-pointer">
              <Mountain className="w-3.5 h-3.5 text-amber-500" />
              Difficulty
            </label>
            <button
              type="button"
              role="switch"
              aria-checked={formData.showDifficulty ?? true}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                updateForm({ showDifficulty: !(formData.showDifficulty ?? true) });
              }}
              title="Toggle difficulty level"
              className={`relative inline-flex items-center w-8.5 h-4.75 rounded-full p-0.5 cursor-pointer transition-colors duration-200 outline-none shrink-0 ${
                (formData.showDifficulty ?? true) ? 'bg-amber-500' : 'bg-gray-300'
              } focus-visible:ring-2 focus-visible:ring-amber-500`}
            >
              <span
                className={`block w-3.75 h-3.75 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                  (formData.showDifficulty ?? true) ? 'translate-x-3.75' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <div
            className="relative w-full [&>svg]:absolute [&>svg]:right-5 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-4.5 [&>svg]:h-4.5 [&>svg]:text-gray-500 [&>svg]:pointer-events-none"
            style={{
              opacity: formData.showDifficulty === false ? 0.45 : 1,
              transition: 'opacity 0.2s ease',
            }}
          >
            <select
              id="trip-difficulty"
              value={formData.difficulty}
              disabled={formData.showDifficulty === false}
              onChange={(e) =>
                updateForm({ difficulty: e.target.value as TripDifficulty })
              }
              className="w-full bg-[#f8fafc] hover:bg-[#f1f5f9] focus:bg-white border-2 border-transparent focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25 rounded-2xl py-3 pl-4 sm:pl-5 pr-11 text-sm sm:text-[15px] font-medium text-gray-900 font-jakarta outline-none appearance-none cursor-pointer transition-all disabled:opacity-50"
            >
              {DIFFICULTY_OPTIONS.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </div>
      </div>

      {/* Duration (Nights & Days) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="trip-nights" className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-amber-500" /> Duration (Nights){' '}
              <span className="text-red-500 ml-1 font-bold inline">*</span>
            </span>
          </label>
          <input
            id="trip-nights"
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={formData.durationNights ?? ''}
            onChange={(e) =>
              updateForm({ durationNights: filterOnlyNumbers(e.target.value) })
            }
            className={`w-full rounded-2xl py-3 px-4 sm:py-3.5 sm:px-5 text-sm sm:text-[15px] font-semibold text-gray-900 font-jakarta outline-none transition-all placeholder:text-gray-400 placeholder:font-medium ${
              !isNightsValid
                ? 'bg-red-50 border-2 border-red-400 hover:bg-red-100/50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
                : 'bg-[#f8fafc] border-2 border-transparent hover:bg-[#f1f5f9] focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25'
            }`}
          />
          {!isNightsValid && (
            <span className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-red-500 tracking-tight">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              Only numbers are allowed
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="trip-days" className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" /> Duration (Days){' '}
              <span className="text-red-500 ml-1 font-bold inline">*</span>
            </span>
            <span className="text-[10px] font-bold text-gray-400 normal-case tracking-normal">
              Display: {formData.durationNights} nights / {formData.durationDays} days
            </span>
          </label>
          <input
            id="trip-days"
            type="text"
            inputMode="numeric"
            placeholder="1"
            value={formData.durationDays ?? ''}
            onChange={(e) => {
              const filtered = filterOnlyNumbers(e.target.value);
              const num = Number(filtered);
              const updatePayload: Partial<NewTripFormData> = {
                durationDays: filtered,
              };
              if (num > 0) {
                updatePayload.itinerary = syncItineraryDays(formData.itinerary, num);
              }
              updateForm(updatePayload);
            }}
            className={`w-full rounded-2xl py-3 px-4 sm:py-3.5 sm:px-5 text-sm sm:text-[15px] font-semibold text-gray-900 font-jakarta outline-none transition-all placeholder:text-gray-400 placeholder:font-medium ${
              !isDaysValid
                ? 'bg-red-50 border-2 border-red-400 hover:bg-red-100/50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
                : 'bg-[#f8fafc] border-2 border-transparent hover:bg-[#f1f5f9] focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25'
            }`}
          />
          {!isDaysValid && (
            <span className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-red-500 tracking-tight">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              Only numbers are allowed
            </span>
          )}
        </div>
      </div>

      {/* Pickup Points Section */}
      <div className="flex flex-col gap-2 w-full">
        <div className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between select-none">
          <span className="flex items-center gap-1.5 text-gray-800">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            Pickup Points (e.g. New Delhi - Terminal 3){' '}
            <span className="text-red-500 ml-1 font-bold inline">*</span>
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddPickupPoint();
            }}
            title="Add another pickup point"
            className="inline-flex items-center gap-1.5 bg-transparent border-none text-amber-500 hover:text-amber-600 text-xs font-black tracking-wider uppercase cursor-pointer transition-all duration-150 hover:-translate-y-0.5 [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:stroke-[2.5]"
          >
            <Plus />
            <span>Add Point</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {pickupPoints.map((point, index) => (
            <PlaceAutocompleteInput
              key={`pickup-${index}`}
              id={`trip-pickup-${index}`}
              value={point}
              placeholder="Pickup point..."
              hasError={!isValidAlphanumeric(point)}
              errorMessage="Only alphabets and numbers are allowed"
              onChange={(val) => handleUpdatePickupPoint(index, val)}
              onDelete={() => handleRemovePickupPoint(index)}
              showDelete={true}
              filterInput={filterAlphanumeric}
            />
          ))}
        </div>
      </div>

      {/* Destinations Covered (Traveling Locations) Section */}
      <div className="flex flex-col gap-2 w-full">
        <div className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between select-none">
          <span className="flex items-center gap-1.5 text-gray-800">
            <Navigation className="w-3.5 h-3.5 text-amber-500" />
            Destinations Covered (Traveling Locations){' '}
            <span className="text-red-500 ml-1 font-bold inline">*</span>
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddDestinationCovered();
            }}
            title="Add another location"
            className="inline-flex items-center gap-1.5 bg-transparent border-none text-amber-500 hover:text-amber-600 text-xs font-black tracking-wider uppercase cursor-pointer transition-all duration-150 hover:-translate-y-0.5 [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:stroke-[2.5]"
          >
            <Plus />
            <span>Add Location</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {destinationsCovered.map((location, index) => (
            <PlaceAutocompleteInput
              key={`location-${index}`}
              id={`trip-destination-covered-${index}`}
              value={location}
              placeholder="e.g., Sissu"
              hasError={!isValidAlphanumeric(location)}
              errorMessage="Only alphabets and numbers are allowed"
              onChange={(val) => handleUpdateDestinationCovered(index, val)}
              onDelete={() => handleRemoveDestinationCovered(index)}
              showDelete={true}
              filterInput={filterAlphanumeric}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
