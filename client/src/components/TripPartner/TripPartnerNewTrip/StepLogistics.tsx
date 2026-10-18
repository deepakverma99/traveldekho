'use client';

import React from 'react';
import { Moon, Sun, ChevronDown, Plus, AlertCircle, MapPin, Building, Mountain, Navigation } from 'lucide-react';
import {
  StepContentArea,
  FormGroup,
  FieldLabel,
  FieldLabelRow,
  FieldInput,
  FieldHint,
  FieldErrorText,
  ToggleSwitch,
  SelectWrapper,
  FieldSelect,
  AddItemLinkButton,
  RequiredAsterisk,
} from './styles';
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
    const filtered = filterAlphanumeric(value);
    const updated = [...pickupPoints];
    updated[index] = filtered;
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
    const filtered = filterAlphanumeric(value);
    const updated = [...destinationsCovered];
    updated[index] = filtered;
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

  // Reusable Location hook using country-state-city
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

  // Validation checks
  const isNightsValid = isValidOnlyNumbers(formData.durationNights);
  const isDaysValid = isValidOnlyNumbers(formData.durationDays);

  return (
    <StepContentArea>
      {/* 3-Column Row: Destination City, Destination State, Difficulty */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">


        {/* Destination State Dropdown */}
        <FormGroup>
          <FieldLabel htmlFor="trip-destination-state">
            <span className="flex items-center gap-1.5 text-gray-800">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Destination State <RequiredAsterisk>*</RequiredAsterisk>
            </span>
          </FieldLabel>
          <SelectWrapper>
            <FieldSelect
              id="trip-destination-state"
              value={formData.destinationState || ''}
              onChange={(e) => handleStateChange(e.target.value)}
              style={{
                fontSize: '0.9375rem',
                fontWeight: 500,
              }}
            >
              <option value="">Select State</option>
              {states.map((st) => (
                <option key={st.isoCode} value={st.name}>
                  {st.name}
                </option>
              ))}
            </FieldSelect>
            <ChevronDown />
          </SelectWrapper>
        </FormGroup>

        {/* Destination City Dropdown */}
        <FormGroup>
          <FieldLabel htmlFor="trip-destination-city">
            <span className="flex items-center gap-1.5 text-gray-800">
              <Building className="w-3.5 h-3.5 text-amber-500" />
              Destination City <RequiredAsterisk>*</RequiredAsterisk>
            </span>
          </FieldLabel>
          <SelectWrapper
            style={{
              opacity: !formData.destinationState ? 0.6 : 1,
              transition: 'opacity 0.2s ease',
            }}
          >
            <FieldSelect
              id="trip-destination-city"
              value={formData.destinationCity || ''}
              disabled={!formData.destinationState}
              onChange={(e) => handleCityChange(e.target.value)}
              style={{
                fontSize: '0.9375rem',
                fontWeight: 500,
              }}
            >
              <option value="">
                {formData.destinationState ? 'Select City' : 'Select State first'}
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
            </FieldSelect>
            <ChevronDown />
          </SelectWrapper>
        </FormGroup>

        {/* Difficulty with Toggle Switch */}
        <FormGroup>
          <FieldLabelRow>
            <label htmlFor="trip-difficulty" className="flex items-center gap-1.5 text-gray-800" style={{ cursor: 'pointer' }}>
              <Mountain className="w-3.5 h-3.5 text-amber-500" />
              Difficulty
            </label>
            <ToggleSwitch
              type="button"
              role="switch"
              aria-checked={formData.showDifficulty ?? true}
              $isActive={formData.showDifficulty ?? true}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                updateForm({ showDifficulty: !(formData.showDifficulty ?? true) });
              }}
              title="Toggle difficulty level"
            >
              <span />
            </ToggleSwitch>
          </FieldLabelRow>
          <SelectWrapper
            style={{
              opacity: formData.showDifficulty === false ? 0.45 : 1,
              transition: 'opacity 0.2s ease',
            }}
          >
            <FieldSelect
              id="trip-difficulty"
              value={formData.difficulty}
              disabled={formData.showDifficulty === false}
              onChange={(e) =>
                updateForm({ difficulty: e.target.value as TripDifficulty })
              }
              style={{
                fontSize: '0.9375rem',
                fontWeight: 500,
              }}
            >
              {DIFFICULTY_OPTIONS.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </FieldSelect>
            <ChevronDown />
          </SelectWrapper>
        </FormGroup>
      </div>

      {/* Duration (Nights & Days) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        <FormGroup>
          <FieldLabel htmlFor="trip-nights">
            <span className="flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-amber-500" /> Duration (Nights){' '}
              <RequiredAsterisk>*</RequiredAsterisk>
            </span>
          </FieldLabel>
          <FieldInput
            id="trip-nights"
            type="text"
            inputMode="numeric"
            placeholder="0"
            $hasError={!isNightsValid}
            value={formData.durationNights ?? ''}
            onChange={(e) =>
              updateForm({ durationNights: filterOnlyNumbers(e.target.value) })
            }
          />
          {!isNightsValid && (
            <FieldErrorText>
              <AlertCircle />
              Only numbers are allowed
            </FieldErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <FieldLabel htmlFor="trip-days">
            <span className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" /> Duration (Days){' '}
              <RequiredAsterisk>*</RequiredAsterisk>
            </span>
            <FieldHint>
              Display: {formData.durationNights} nights / {formData.durationDays} days
            </FieldHint>
          </FieldLabel>
          <FieldInput
            id="trip-days"
            type="text"
            inputMode="numeric"
            placeholder="1"
            $hasError={!isDaysValid}
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
          />
          {!isDaysValid && (
            <FieldErrorText>
              <AlertCircle />
              Only numbers are allowed
            </FieldErrorText>
          )}
        </FormGroup>
      </div>

      {/* Pickup Points Section */}
      <FormGroup>
        <FieldLabelRow>
          <span className="flex items-center gap-1.5 text-gray-800">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            Pickup Points (e.g. New Delhi - Terminal 3){' '}
            <RequiredAsterisk>*</RequiredAsterisk>
          </span>
          <AddItemLinkButton
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddPickupPoint();
            }}
            title="Add another pickup point"
          >
            <Plus />
            <span>Add Point</span>
          </AddItemLinkButton>
        </FieldLabelRow>

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
      </FormGroup>

      {/* Destinations Covered (Traveling Locations) Section */}
      <FormGroup>
        <FieldLabelRow>
          <span className="flex items-center gap-1.5 text-gray-800">
            <Navigation className="w-3.5 h-3.5 text-amber-500" />
            Destinations Covered (Traveling Locations){' '}
            <RequiredAsterisk>*</RequiredAsterisk>
          </span>
          <AddItemLinkButton
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddDestinationCovered();
            }}
            title="Add another location"
          >
            <Plus />
            <span>Add Location</span>
          </AddItemLinkButton>
        </FieldLabelRow>

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
      </FormGroup>
    </StepContentArea>
  );
};
