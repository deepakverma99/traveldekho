'use client';

import React from 'react';
import {
  Moon,
  Sun,
  ChevronDown,
  Plus,
  AlertCircle,
  MapPin,
  Building,
  Mountain,
  Navigation,
  Globe,
  ShieldCheck,
  PlaneTakeoff,
} from 'lucide-react';
import { PlaceAutocompleteInput } from '@/components/shared';
import {
  NewTripFormData,
  DIFFICULTY_OPTIONS,
  VISA_POLICY_OPTIONS,
  isValidOnlyNumbers,
  isValidAlphanumeric,
  filterOnlyNumbers,
  filterAlphanumeric,
} from './types';
import { TripDifficulty } from '../types/';
import { TripScopeTabs } from './components/TripScopeTabs';
import { useTripLogistics } from './hooks/useTripLogistics';

interface StepLogisticsProps {
  formData: NewTripFormData;
  updateForm: (fields: Partial<NewTripFormData>) => void;
  invalidFieldId?: string | null;
}

export const StepLogistics: React.FC<StepLogisticsProps> = ({
  formData,
  updateForm,
  invalidFieldId,
}) => {
  const {
    tripType,
    handleScopeChange,
    domesticStates,
    domesticCities,
    handleDomesticStateChange,
    handleDomesticCityChange,
    activeCountryCode,
    popularInternationalCountries,
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
  } = useTripLogistics({ formData, updateForm });

  const isNightsValid = isValidOnlyNumbers(formData.durationNights);
  const isDaysValid = isValidOnlyNumbers(formData.durationDays);

  return (
    <div className="w-full flex flex-col gap-6 sm:gap-7 font-jakarta">
      {/* Scope Navigation Tabs: Domestic vs International */}
      <div className="flex flex-col gap-2">
        <label className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-gray-800">
            <Globe className="w-3.5 h-3.5 text-[#ff5722]" />
            Trip Destination Type <span className="text-red-500 ml-1 font-bold inline">*</span>
          </span>
          <span className="text-[10px] font-bold text-gray-400 normal-case tracking-normal">
            {tripType === 'domestic' ? 'Exploring India' : 'Worldwide Destinations'}
          </span>
        </label>
        <TripScopeTabs activeScope={tripType} onScopeChange={handleScopeChange} />
      </div>

      {/* Row 1: State/Country, City & Difficulty */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
        {tripType === 'domestic' ? (
          <>
            {/* Domestic State Select */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="trip-destination-state"
                className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5 text-gray-800">
                  <MapPin className="w-3.5 h-3.5 text-[#ff5722]" />
                  State <span className="text-red-500 ml-1 font-bold inline">*</span>
                </span>
              </label>
              <div className="relative w-full [&>svg]:absolute [&>svg]:right-5 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-4.5 [&>svg]:h-4.5 [&>svg]:text-gray-500 [&>svg]:pointer-events-none">
                <select
                  id="trip-destination-state"
                  value={formData.destinationState || ''}
                  onChange={(e) => handleDomesticStateChange(e.target.value)}
                  className={`w-full hover:bg-[#f1f5f9] focus:bg-white border-2 rounded-2xl py-3 pl-4 sm:pl-5 pr-11 text-sm sm:text-[15px] font-medium text-gray-900 font-jakarta outline-none focus:outline-none focus:ring-0 appearance-none cursor-pointer transition-all ${
                    invalidFieldId === 'trip-destination-state' && !formData.destinationState
                      ? 'bg-red-50 border-red-400'
                      : 'bg-[#f8fafc] border-transparent focus:border-[#ff5722]'
                  }`}
                >
                  <option value="" disabled>
                    Select Indian State...
                  </option>
                  {domesticStates.map((st) => (
                    <option key={st.isoCode} value={st.name}>
                      {st.name}
                    </option>
                  ))}
                </select>
                <ChevronDown />
              </div>
            </div>

            {/* Domestic City Select */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="trip-destination-city"
                className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5 text-gray-800">
                  <Building className="w-3.5 h-3.5 text-[#ff5722]" />
                  City <span className="text-red-500 ml-1 font-bold inline">*</span>
                </span>
              </label>
              <div className="relative w-full [&>svg]:absolute [&>svg]:right-5 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-4.5 [&>svg]:h-4.5 [&>svg]:text-gray-500 [&>svg]:pointer-events-none">
                <select
                  id="trip-destination-city"
                  value={formData.destinationCity || ''}
                  onChange={(e) => handleDomesticCityChange(e.target.value)}
                  disabled={!formData.destinationState}
                  className={`w-full hover:bg-[#f1f5f9] focus:bg-white border-2 rounded-2xl py-3 pl-4 sm:pl-5 pr-11 text-sm sm:text-[15px] font-medium text-gray-900 font-jakarta outline-none focus:outline-none focus:ring-0 appearance-none cursor-pointer transition-all disabled:opacity-50 ${
                    invalidFieldId === 'trip-destination-city' && !formData.destinationCity
                      ? 'bg-red-50 border-red-400'
                      : 'bg-[#f8fafc] border-transparent focus:border-[#ff5722]'
                  }`}
                >
                  <option value="" disabled>
                    {formData.destinationState ? 'Select City...' : 'Select State First'}
                  </option>
                  {formData.destinationCity &&
                    !domesticCities.some(
                      (c) =>
                        c.name.toLowerCase() === formData.destinationCity?.toLowerCase()
                    ) && (
                      <option key={`dom-custom-${formData.destinationCity}`} value={formData.destinationCity}>
                        {formData.destinationCity}
                      </option>
                    )}
                  {domesticCities.map((ct, idx) => (
                    <option key={`dom-city-${ct.name}-${ct.latitude || idx}`} value={ct.name}>
                      {ct.name}
                    </option>
                  ))}
                </select>
                <ChevronDown />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* International Country Select */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="trip-destination-country"
                className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5 text-gray-800">
                  <Globe className="w-3.5 h-3.5 text-[#ff5722]" />
                  Country <span className="text-red-500 ml-1 font-bold inline">*</span>
                </span>
                <span className="text-[10px] font-bold text-gray-400 normal-case tracking-normal">
                  Select destination country
                </span>
              </label>
              <div className="relative w-full [&>svg]:absolute [&>svg]:right-5 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-4.5 [&>svg]:h-4.5 [&>svg]:text-gray-500 [&>svg]:pointer-events-none">
                <select
                  id="trip-destination-country"
                  value={activeCountryCode || ''}
                  onChange={(e) => handleInternationalCountryChange(e.target.value)}
                  className={`w-full hover:bg-[#f1f5f9] focus:bg-white border-2 rounded-2xl py-3 pl-4 sm:pl-5 pr-11 text-sm sm:text-[15px] font-medium text-gray-900 font-jakarta outline-none focus:outline-none focus:ring-0 appearance-none cursor-pointer transition-all ${
                    invalidFieldId === 'trip-destination-country' && !formData.destinationCountry
                      ? 'bg-red-50 border-red-400'
                      : 'bg-[#f8fafc] border-transparent focus:border-[#ff5722]'
                  }`}
                >
                  <option value="" disabled>
                    Select Destination Country...
                  </option>
                  <optgroup label="🌟 Popular Destinations">
                    {popularInternationalCountries.map((c) => (
                      <option key={`pop-${c.code}`} value={c.code}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🌍 All Other Countries">
                    {allInternationalCountries
                      .filter(
                        (c) =>
                          !popularInternationalCountries.some((p) => p.code === c.isoCode)
                      )
                      .map((c) => (
                        <option key={c.isoCode} value={c.isoCode}>
                          {c.flag} {c.name}
                        </option>
                      ))}
                  </optgroup>
                </select>
                <ChevronDown />
              </div>
            </div>

            {/* International City / Region Select */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="trip-destination-city"
                className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5 text-gray-800">
                  <Building className="w-3.5 h-3.5 text-[#ff5722]" />
                  City / Region <span className="text-red-500 ml-1 font-bold inline">*</span>
                </span>
                <span className="text-[10px] font-bold text-gray-400 normal-case tracking-normal">
                  {formData.destinationCountry || 'Select country first'}
                </span>
              </label>
              <div className="relative w-full [&>svg]:absolute [&>svg]:right-5 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-4.5 [&>svg]:h-4.5 [&>svg]:text-gray-500 [&>svg]:pointer-events-none">
                <select
                  id="trip-destination-city"
                  value={formData.destinationCity || ''}
                  onChange={(e) => handleInternationalCityChange(e.target.value)}
                  disabled={!activeCountryCode}
                  className={`w-full hover:bg-[#f1f5f9] focus:bg-white border-2 rounded-2xl py-3 pl-4 sm:pl-5 pr-11 text-sm sm:text-[15px] font-medium text-gray-900 font-jakarta outline-none focus:outline-none focus:ring-0 appearance-none cursor-pointer transition-all disabled:opacity-50 ${
                    invalidFieldId === 'trip-destination-city' && !formData.destinationCity
                      ? 'bg-red-50 border-red-400'
                      : 'bg-[#f8fafc] border-transparent focus:border-[#ff5722]'
                  }`}
                >
                  <option value="" disabled>
                    {activeCountryCode ? 'Select City / Region...' : 'Select Country First'}
                  </option>
                  {formData.destinationCity &&
                    !internationalCities.includes(formData.destinationCity) && (
                      <option key={`intl-custom-${formData.destinationCity}`} value={formData.destinationCity}>
                        {formData.destinationCity}
                      </option>
                    )}
                  {internationalCities.map((cityName, idx) => (
                    <option key={`intl-city-${cityName}-${idx}`} value={cityName}>
                      {cityName}
                    </option>
                  ))}
                </select>
                <ChevronDown />
              </div>
            </div>
          </>
        )}

        {/* Difficulty with Toggle Switch (Shared) */}
        <div className="flex flex-col gap-2 w-full">
          <div className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between select-none">
            <label htmlFor="trip-difficulty" className="flex items-center gap-1.5 text-gray-800 cursor-pointer">
              <Mountain className="w-3.5 h-3.5 text-[#ff5722]" />
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
                (formData.showDifficulty ?? true) ? 'bg-[#ff5722]' : 'bg-gray-300'
              } focus-visible:ring-2 focus-visible:ring-[#ff5722]`}
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
              className="w-full bg-[#f8fafc] hover:bg-[#f1f5f9] focus:bg-white border-2 border-transparent focus:border-[#ff5722] rounded-2xl py-3 pl-4 sm:pl-5 pr-11 text-sm sm:text-[15px] font-medium text-gray-900 font-jakarta outline-none focus:outline-none focus:ring-0 appearance-none cursor-pointer transition-all disabled:opacity-50"
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

      {/* Row 2: Duration (Nights & Days) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="trip-nights" className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-[#ff5722]" /> Duration (Nights){' '}
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
            className={`w-full rounded-2xl py-3 px-4 sm:py-3.5 sm:px-5 text-sm sm:text-[15px] font-semibold text-gray-900 font-jakarta outline-none focus:outline-none focus:ring-0 transition-all placeholder:text-gray-400 placeholder:font-medium ${
              !isNightsValid || (invalidFieldId === 'trip-nights' && (formData.durationNights === undefined || String(formData.durationNights).trim() === ''))
                ? 'bg-red-50 border-2 border-red-400 hover:bg-red-100/50 focus:bg-white focus:border-red-500'
                : 'bg-[#f8fafc] border-2 border-transparent hover:bg-[#f1f5f9] focus:bg-white focus:border-[#ff5722]'
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
              <Sun className="w-3.5 h-3.5 text-[#ff5722]" /> Duration (Days){' '}
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
            onChange={(e) => handleDurationDaysChange(filterOnlyNumbers(e.target.value))}
            className={`w-full rounded-2xl py-3 px-4 sm:py-3.5 sm:px-5 text-sm sm:text-[15px] font-semibold text-gray-900 font-jakarta outline-none focus:outline-none focus:ring-0 transition-all placeholder:text-gray-400 placeholder:font-medium ${
              !isDaysValid || (invalidFieldId === 'trip-days' && (formData.durationDays === undefined || String(formData.durationDays).trim() === '' || Number(formData.durationDays) < 1))
                ? 'bg-red-50 border-2 border-red-400 hover:bg-red-100/50 focus:bg-white focus:border-red-500'
                : 'bg-[#f8fafc] border-2 border-transparent hover:bg-[#f1f5f9] focus:bg-white focus:border-[#ff5722]'
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

      {/* Row 3 (International Specific): Visa Policy */}
      {tripType === 'international' && (
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="trip-visa-policy"
            className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between"
          >
            <span className="flex items-center gap-1.5 text-gray-800">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ff5722]" />
              Visa Requirement / Policy
            </span>
            <span className="text-[10px] font-bold text-gray-400 normal-case tracking-normal">
              Displayed as badge on trip card & details
            </span>
          </label>
          <div className="relative w-full [&>svg]:absolute [&>svg]:right-5 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-4.5 [&>svg]:h-4.5 [&>svg]:text-gray-500 [&>svg]:pointer-events-none">
            <select
              id="trip-visa-policy"
              value={formData.visaPolicy || 'Visa on Arrival'}
              onChange={(e) => updateForm({ visaPolicy: e.target.value })}
              className="w-full bg-[#f8fafc] hover:bg-[#f1f5f9] focus:bg-white border-2 border-transparent focus:border-[#ff5722] rounded-2xl py-3 pl-4 sm:pl-5 pr-11 text-sm sm:text-[15px] font-medium text-gray-900 font-jakarta outline-none focus:outline-none focus:ring-0 appearance-none cursor-pointer transition-all"
            >
              {VISA_POLICY_OPTIONS.map((policy) => (
                <option key={policy} value={policy}>
                  {policy}
                </option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </div>
      )}

      {/* Row 4: Pickup Points / Departure Airports Section */}
      <div className="flex flex-col gap-2 w-full">
        <div className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between select-none">
          <span className="flex items-center gap-1.5 text-gray-800">
            {tripType === 'international' ? (
              <PlaneTakeoff className="w-3.5 h-3.5 text-[#ff5722]" />
            ) : (
              <MapPin className="w-3.5 h-3.5 text-[#ff5722]" />
            )}
            {tripType === 'international'
              ? 'Departure Airports / Starting Hubs (Pickup Points)'
              : 'Pickup Points (e.g. New Delhi - Terminal 3)'}{' '}
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
            className="inline-flex items-center gap-1.5 bg-transparent border-none text-[#ff5722] hover:text-[#e04d1f] text-xs font-black tracking-wider uppercase cursor-pointer transition-all duration-150 hover:-translate-y-0.5 [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:stroke-[2.5]"
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
              placeholder={
                tripType === 'international'
                  ? 'e.g. Delhi (DEL), Mumbai (BOM)...'
                  : 'Pickup point...'
              }
              hasError={
                !isValidAlphanumeric(point) ||
                (invalidFieldId === `trip-pickup-${index}` && !point.trim())
              }
              errorMessage="Only alphabets and numbers are allowed"
              onChange={(val) => handleUpdatePickupPoint(index, val)}
              onDelete={() => handleRemovePickupPoint(index)}
              showDelete={true}
              filterInput={filterAlphanumeric}
            />
          ))}
        </div>
      </div>

      {/* Row 5: Destinations Covered Section */}
      <div className="flex flex-col gap-2 w-full">
        <div className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between select-none">
          <span className="flex items-center gap-1.5 text-gray-800">
            <Navigation className="w-3.5 h-3.5 text-[#ff5722]" />
            {tripType === 'international'
              ? 'Destinations Covered (Cities / Spots Visited)'
              : 'Destinations Covered (Traveling Locations)'}{' '}
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
            className="inline-flex items-center gap-1.5 bg-transparent border-none text-[#ff5722] hover:text-[#e04d1f] text-xs font-black tracking-wider uppercase cursor-pointer transition-all duration-150 hover:-translate-y-0.5 [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:stroke-[2.5]"
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
              placeholder={
                tripType === 'international'
                  ? 'e.g., Bangkok, Phuket, Phi Phi'
                  : 'e.g., Sissu'
              }
              hasError={
                !isValidAlphanumeric(location) ||
                (invalidFieldId === `trip-destination-covered-${index}` && !location.trim())
              }
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
