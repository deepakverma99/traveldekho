'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addPartnerTrip,
  selectCurrentPartner,
} from '@/redux/slices/tripPartnerSlice';
import { PartnerTripItem } from '../../types/';
import { formatPartnerDisplayName } from '../../utils/partnerAuth';
import {
  NewTripFormData,
  INITIAL_FORM_DATA,
  StepNumber,
  isValidAlphanumericDot,
  isValidOnlyNumbers,
  isValidAlphanumeric,
  isValidTag,
  syncItineraryDays,
} from '../types';
import { scrollToAndHighlightField } from '../utils/scrollHelper';

export const getInitialFormData = (): NewTripFormData => ({
  ...INITIAL_FORM_DATA,
  title: '',
  category: '',
  categories: [],
  shortCatchphrase: '',
  description: '',
  destination: '',
  destinationCity: '',
  destinationState: '',
  showDifficulty: true,
  pickupPoints: [''],
  destinationsCovered: [''],
  tags: [],
  inclusions: [],
  exclusions: [],
  image: '',
  gallery: [],
  reels: [],
  disclaimer: '',
  occupancyPricing: [
    { id: 'opt-1', sharingType: 'Triple', price: 0, discountPercent: 0 },
    { id: 'opt-2', sharingType: 'Double', price: 0, discountPercent: 0 },
  ],
  whatsappNumber: '+919899558944',
  departureBatches: [
    { id: 'batch-1', startDate: '', endDate: '' },
  ],
});

export const useNewTripForm = (username: string) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentPartner = useAppSelector(selectCurrentPartner);

  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [maxReachedStep, setMaxReachedStep] = useState<number>(1);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [invalidFieldId, setInvalidFieldId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<NewTripFormData>(getInitialFormData);

  const resetForm = useCallback(() => {
    setFormData(getInitialFormData());
    setCurrentStep(1);
    setMaxReachedStep(1);
    setValidationError(null);
    setInvalidFieldId(null);
    setIsSubmitting(false);
  }, []);

  // Ensure clean slate when leaving or re-entering the form
  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  const updateForm = useCallback((fields: Partial<NewTripFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    setValidationError(null);
    setInvalidFieldId(null);
  }, []);

  const reportError = useCallback((message: string, fieldId: string): boolean => {
    setValidationError(message);
    setInvalidFieldId(fieldId);
    scrollToAndHighlightField(fieldId);
    return false;
  }, []);

  const validateStep1 = useCallback((): boolean => {
    // 1. Trip Title
    if (!formData.title.trim()) {
      return reportError('Please enter a trip title before proceeding.', 'trip-title');
    }
    if (!isValidAlphanumericDot(formData.title)) {
      return reportError('Trip Title: only numbers, alphabets and . are allowed.', 'trip-title');
    }

    // 2. Category
    const hasCategories =
      (formData.categories && formData.categories.length > 0) ||
      Boolean(formData.category && formData.category.trim());
    if (!hasCategories) {
      return reportError('Please select at least one category for your journey.', 'trip-category');
    }

    // 3. Short Catchphrase
    if (!formData.shortCatchphrase.trim()) {
      return reportError('Please enter a short catchphrase before proceeding.', 'trip-catchphrase');
    }
    if (!isValidAlphanumericDot(formData.shortCatchphrase)) {
      return reportError('Short Catchphrase: only numbers, alphabets and . are allowed.', 'trip-catchphrase');
    }

    // 4. Detailed Description
    if (!formData.description.trim()) {
      return reportError('Please enter the detailed description before proceeding.', 'trip-description');
    }
    if (!isValidAlphanumericDot(formData.description)) {
      return reportError('Detailed Description: only numbers, alphabets and . are allowed.', 'trip-description');
    }

    return true;
  }, [formData.title, formData.categories, formData.category, formData.shortCatchphrase, formData.description, reportError]);

  const validateStep2 = useCallback((): boolean => {
    const isDomestic = formData.tripType !== 'international';

    if (isDomestic) {
      // 5. Destination State (Domestic)
      if (!formData.destinationState?.trim()) {
        return reportError('Please select a destination state before proceeding.', 'trip-destination-state');
      }

      // 6. Destination City (Domestic)
      if (!formData.destinationCity?.trim()) {
        return reportError('Please select a destination city before proceeding.', 'trip-destination-city');
      }
    } else {
      // 5. Destination Country (International)
      if (!formData.destinationCountry?.trim()) {
        return reportError('Please select a destination country before proceeding.', 'trip-destination-country');
      }

      // 6. Destination City / Region (International)
      if (!formData.destinationCity?.trim()) {
        return reportError('Please select or enter a destination city before proceeding.', 'trip-destination-city');
      }
    }

    // 7. Duration (Nights)
    if (
      formData.durationNights === undefined ||
      formData.durationNights === null ||
      String(formData.durationNights).trim() === ''
    ) {
      return reportError('Please enter duration in nights.', 'trip-nights');
    }
    if (!isValidOnlyNumbers(formData.durationNights)) {
      return reportError('Duration (Nights): only numbers are allowed.', 'trip-nights');
    }

    // 8. Duration (Days)
    if (
      formData.durationDays === undefined ||
      formData.durationDays === null ||
      String(formData.durationDays).trim() === ''
    ) {
      return reportError('Please enter duration in days.', 'trip-days');
    }
    if (!isValidOnlyNumbers(formData.durationDays)) {
      return reportError('Duration (Days): only numbers are allowed.', 'trip-days');
    }
    if (Number(formData.durationDays) < 1) {
      return reportError('Trip duration must be at least 1 day.', 'trip-days');
    }

    // 9. Pickup Points
    const hasPickup = formData.pickupPoints?.some((p) => p.trim());
    if (!hasPickup) {
      return reportError('Please add at least one pickup point before proceeding.', 'trip-pickup-0');
    }
    const invalidPickupIdx = formData.pickupPoints?.findIndex(
      (p) => p.trim() && !isValidAlphanumeric(p)
    );
    if (invalidPickupIdx !== undefined && invalidPickupIdx >= 0) {
      return reportError('Pickup Points: only alphabets and numbers are allowed.', `trip-pickup-${invalidPickupIdx}`);
    }

    // 10. Destinations Covered
    const hasDestCovered = formData.destinationsCovered?.some((d) => d.trim());
    if (!hasDestCovered) {
      return reportError('Please add at least one destination covered before proceeding.', 'trip-destination-covered-0');
    }
    const invalidDestIdx = formData.destinationsCovered?.findIndex(
      (d) => d.trim() && !isValidAlphanumeric(d)
    );
    if (invalidDestIdx !== undefined && invalidDestIdx >= 0) {
      return reportError('Destinations Covered: only alphabets and numbers are allowed.', `trip-destination-covered-${invalidDestIdx}`);
    }

    return true;
  }, [
    formData.tripType,
    formData.destinationCountry,
    formData.destinationState,
    formData.destinationCity,
    formData.durationNights,
    formData.durationDays,
    formData.pickupPoints,
    formData.destinationsCovered,
    reportError,
  ]);

  const validateStep3 = useCallback((): boolean => {
    // 11. Tags / Highlights
    if (!formData.tags || formData.tags.length === 0) {
      return reportError(
        'Please select or add at least one trip highlight / tag before proceeding.',
        'trip-tags-container'
      );
    }
    const invalidTag = formData.tags.find((t) => !isValidTag(t));
    if (invalidTag !== undefined) {
      return reportError(
        'Trip Highlights & Tags: only alphabets and # are allowed.',
        'trip-custom-tag'
      );
    }

    // Inclusions and Exclusions validation
    const invalidInclusion = formData.inclusions?.find(
      (item) => item.trim() && !isValidAlphanumeric(item)
    );
    if (invalidInclusion !== undefined) {
      return reportError(
        "What's Included: only alphabets and numbers are allowed.",
        'trip-inclusion-input'
      );
    }

    const invalidExclusion = formData.exclusions?.find(
      (item) => item.trim() && !isValidAlphanumeric(item)
    );
    if (invalidExclusion !== undefined) {
      return reportError(
        "What's Not Included: only alphabets and numbers are allowed.",
        'trip-exclusion-input'
      );
    }

    return true;
  }, [formData.tags, formData.inclusions, formData.exclusions, reportError]);

  const validateStep4 = useCallback((): boolean => {
    if (!formData.itinerary || formData.itinerary.length === 0) {
      return reportError('Please add at least one day to the itinerary.', 'trip-add-day-btn');
    }
    const emptyTitleDay = formData.itinerary.find((d) => !d.title?.trim());
    if (emptyTitleDay) {
      return reportError(`Please enter a title for Day ${emptyTitleDay.day}.`, `trip-day-title-${emptyTitleDay.day}`);
    }
    const emptyDescDay = formData.itinerary.find((d) => !d.description?.trim());
    if (emptyDescDay) {
      return reportError(`Please enter a description for Day ${emptyDescDay.day}.`, `trip-day-desc-${emptyDescDay.day}`);
    }
    return true;
  }, [formData.itinerary, reportError]);

  const validateCurrentStep = useCallback((): boolean => {
    setValidationError(null);
    setInvalidFieldId(null);

    if (currentStep === 1) {
      return validateStep1();
    }
    if (currentStep === 2) {
      return validateStep2();
    }
    if (currentStep === 3) {
      return validateStep3();
    }
    if (currentStep === 4) {
      return validateStep4();
    }

    return true;
  }, [currentStep, validateStep1, validateStep2, validateStep3, validateStep4]);

  const handleContinue = useCallback(() => {
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep === 2) {
      const daysCount = Math.max(1, Number(formData.durationDays) || 1);
      updateForm({ itinerary: syncItineraryDays(formData.itinerary, daysCount) });
    }

    if (currentStep < 5) {
      const nextStep = (currentStep + 1) as StepNumber;
      setCurrentStep(nextStep);
      setMaxReachedStep((prev) => Math.max(prev, nextStep));
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  }, [currentStep, validateCurrentStep, formData.durationDays, formData.itinerary, updateForm]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setValidationError(null);
      setInvalidFieldId(null);
      setCurrentStep((prev) => (prev - 1) as StepNumber);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  }, [currentStep]);

  const handleStepSelect = useCallback((step: StepNumber) => {
    if (step < currentStep) {
      setValidationError(null);
      setInvalidFieldId(null);
      setCurrentStep(step);
    } else if (validateCurrentStep()) {
      setCurrentStep(step);
    }
  }, [currentStep, validateCurrentStep]);

  const handleSave = useCallback((asDraft = false) => {
    if (!asDraft) {
      if (!validateStep1()) {
        setCurrentStep(1);
        return;
      }
      if (!validateStep2()) {
        setCurrentStep(2);
        return;
      }
      if (!validateStep3()) {
        setCurrentStep(3);
        return;
      }
      if (!validateStep4()) {
        setCurrentStep(4);
        return;
      }
    }

    setIsSubmitting(true);

    const partnerName =
      currentPartner?.displayName ||
      currentPartner?.companyName ||
      formatPartnerDisplayName(username);

    const slug = (formData.title || 'new-trip')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') || `trip-${Date.now()}`;

    // Compute active batches
    const rawBatches = formData.departureBatches || [];
    const validBatches = rawBatches
      .filter((b) => b.startDate)
      .map((b) => ({
        id: b.id,
        startDate: b.startDate,
        endDate: b.endDate || b.startDate,
      }));

    const finalBatches =
      validBatches.length > 0
        ? validBatches
        : [
            {
              id: 'batch-fallback',
              startDate: new Date().toISOString().split('T')[0],
              endDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
            },
          ];

    // Compute pricing options
    const rawPricing = formData.occupancyPricing || [];
    const validPricing = rawPricing.map((opt) => ({
      id: opt.id,
      sharingType: opt.sharingType,
      price: Number(opt.price) || 5000,
      discountPercent: Number(opt.discountPercent) || 0,
    }));

    const finalPricing =
      validPricing.length > 0
        ? validPricing
        : [
            { id: 'p1', sharingType: 'Double', price: 5000, discountPercent: 0 },
            { id: 'p2', sharingType: 'Triple', price: 4500, discountPercent: 0 },
          ];

    // Primary starting price
    const minPricingOption = finalPricing.reduce(
      (min, opt) => (opt.price < min.price ? opt : min),
      finalPricing[0]
    );
    const calculatedBasePrice = minPricingOption ? minPricingOption.price : 5000;
    const finalStartingPrice = formData.price > 0 ? formData.price : calculatedBasePrice;

    const primaryBatch = finalBatches[0];
    const newTripItem: PartnerTripItem = {
      id: `partner-trip-${Date.now()}`,
      slug,
      title: formData.title || 'Untitled Journey',
      status: asDraft ? 'Draft' : 'Pending Review',
      category: formData.categories?.[0] || formData.category || 'Weekend Escapes',
      destination:
        (formData.tripType === 'international'
          ? [formData.destinationCity, formData.destinationCountry].filter(Boolean).join(', ')
          : [formData.destinationCity, formData.destinationState].filter(Boolean).join(', ')) ||
        formData.destination ||
        (formData.tripType === 'international' ? 'International' : 'India'),
      difficulty: formData.difficulty || 'Moderate',
      price: finalStartingPrice,
      originalPrice: finalStartingPrice ? Math.round(finalStartingPrice * 1.25) : 12000,
      discount: '20% OFF',
      duration: `${formData.durationNights || 1}N / ${formData.durationDays || 2}D`,
      date: primaryBatch.startDate
        ? `${primaryBatch.startDate} - ${primaryBatch.endDate}`
        : 'Dates on Request',
      image: formData.image || '/trips/zanskar.png',
      bookingsCount: 0,
      tags:
        formData.tags.length > 0 || (formData.categories && formData.categories.length > 0)
          ? Array.from(new Set([...formData.tags, ...(formData.categories || [])]))
          : ['Explore', 'Scenic'],
      partner: {
        name: partnerName,
        ratingText: '5.0',
      },
    };

    dispatch(addPartnerTrip(newTripItem));
    resetForm();

    setTimeout(() => {
      router.push(`/trip-partner/${username}/trips`);
      router.refresh();
    }, 400);
  }, [
    validateStep1,
    validateStep2,
    validateStep3,
    validateStep4,
    currentPartner,
    username,
    formData,
    dispatch,
    resetForm,
    router,
  ]);

  return {
    currentStep,
    maxReachedStep,
    validationError,
    invalidFieldId,
    isSubmitting,
    formData,
    updateForm,
    resetForm,
    handleContinue,
    handleBack,
    handleStepSelect,
    handleSave,
  };
};
