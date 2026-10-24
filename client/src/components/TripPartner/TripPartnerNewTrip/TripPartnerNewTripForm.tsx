'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  AlertCircle,
  Rocket,
  FileCheck,
} from 'lucide-react';
import { Button } from '@/components/shared';
import { StepIndicator } from './StepIndicator';
import { StepBasic } from './StepBasic';
import { StepLogistics } from './StepLogistics';
import { StepDetails } from './StepDetails';
import { StepPlan } from './StepPlan';
import { StepFinal } from './StepFinal';
import {
  NewTripFormData,
  INITIAL_FORM_DATA,
  StepNumber,
  isValidAlphanumericDot,
  isValidOnlyNumbers,
  isValidAlphanumeric,
  isValidTag,
  syncItineraryDays,
} from './types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addPartnerTrip,
  selectCurrentPartner,
} from '@/redux/slices/tripPartnerSlice';
import { PartnerTripItem } from '../types/';
import { formatPartnerDisplayName } from '../utils/partnerAuth';

interface TripPartnerNewTripFormProps {
  username: string;
}

const getInitialFormData = (): NewTripFormData => ({
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

export const TripPartnerNewTripForm: React.FC<TripPartnerNewTripFormProps> = ({
  username,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentPartner = useAppSelector(selectCurrentPartner);

  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [maxReachedStep, setMaxReachedStep] = useState<number>(1);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<NewTripFormData>(getInitialFormData);

  const resetForm = () => {
    setFormData(getInitialFormData());
    setCurrentStep(1);
    setMaxReachedStep(1);
    setValidationError(null);
    setIsSubmitting(false);
  };

  // Ensure clean slate when leaving or re-entering the form
  React.useEffect(() => {
    return () => {
      resetForm();
    };
  }, []);

  const updateForm = (fields: Partial<NewTripFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    if (validationError) {
      setValidationError(null);
    }
  };

  const validateStep1 = (): boolean => {
    // 1. Trip Title
    if (!formData.title.trim()) {
      setValidationError('Please enter a trip title before proceeding.');
      return false;
    }
    if (!isValidAlphanumericDot(formData.title)) {
      setValidationError('Trip Title: only numbers, alphabets and . are allowed.');
      return false;
    }

    // 2. Category
    const hasCategories =
      (formData.categories && formData.categories.length > 0) ||
      Boolean(formData.category && formData.category.trim());
    if (!hasCategories) {
      setValidationError('Please select at least one category for your journey.');
      return false;
    }

    // 3. Short Catchphrase
    if (!formData.shortCatchphrase.trim()) {
      setValidationError('Please enter a short catchphrase before proceeding.');
      return false;
    }
    if (!isValidAlphanumericDot(formData.shortCatchphrase)) {
      setValidationError('Short Catchphrase: only numbers, alphabets and . are allowed.');
      return false;
    }

    // 4. Detailed Description
    if (!formData.description.trim()) {
      setValidationError('Please enter the detailed description before proceeding.');
      return false;
    }
    if (!isValidAlphanumericDot(formData.description)) {
      setValidationError('Detailed Description: only numbers, alphabets and . are allowed.');
      return false;
    }

    return true;
  };

  const validateStep2 = (): boolean => {
    // 5. Destination State
    if (!formData.destinationState?.trim()) {
      setValidationError('Please select a destination state before proceeding.');
      return false;
    }

    // 6. Destination City
    if (!formData.destinationCity?.trim()) {
      setValidationError('Please select a destination city before proceeding.');
      return false;
    }

    // 7. Duration (Nights)
    if (
      formData.durationNights === undefined ||
      formData.durationNights === null ||
      String(formData.durationNights).trim() === ''
    ) {
      setValidationError('Please enter duration in nights.');
      return false;
    }
    if (!isValidOnlyNumbers(formData.durationNights)) {
      setValidationError('Duration (Nights): only numbers are allowed.');
      return false;
    }

    // 8. Duration (Days)
    if (
      formData.durationDays === undefined ||
      formData.durationDays === null ||
      String(formData.durationDays).trim() === ''
    ) {
      setValidationError('Please enter duration in days.');
      return false;
    }
    if (!isValidOnlyNumbers(formData.durationDays)) {
      setValidationError('Duration (Days): only numbers are allowed.');
      return false;
    }
    if (Number(formData.durationDays) < 1) {
      setValidationError('Trip duration must be at least 1 day.');
      return false;
    }

    // 9. Pickup Points
    const hasPickup = formData.pickupPoints?.some((p) => p.trim());
    if (!hasPickup) {
      setValidationError('Please add at least one pickup point before proceeding.');
      return false;
    }
    const invalidPickup = formData.pickupPoints?.find(
      (p) => p.trim() && !isValidAlphanumeric(p)
    );
    if (invalidPickup !== undefined) {
      setValidationError('Pickup Points: only alphabets and numbers are allowed.');
      return false;
    }

    // 10. Destinations Covered
    const hasDestCovered = formData.destinationsCovered?.some((d) => d.trim());
    if (!hasDestCovered) {
      setValidationError('Please add at least one destination covered before proceeding.');
      return false;
    }
    const invalidDestination = formData.destinationsCovered?.find(
      (d) => d.trim() && !isValidAlphanumeric(d)
    );
    if (invalidDestination !== undefined) {
      setValidationError('Destinations Covered: only alphabets and numbers are allowed.');
      return false;
    }

    return true;
  };

  const validateStep3 = (): boolean => {
    if (!formData.tags || formData.tags.length === 0) {
      setValidationError(
        'Please select or add at least one trip highlight / tag before proceeding.'
      );
      return false;
    }
    const invalidTag = formData.tags.find((t) => !isValidTag(t));
    if (invalidTag !== undefined) {
      setValidationError(
        'Trip Highlights & Tags: only alphabets and # are allowed.'
      );
      return false;
    }

    // Inclusions and Exclusions are optional, but if present, only alphabets and numbers are allowed
    const invalidInclusion = formData.inclusions?.find(
      (item) => item.trim() && !isValidAlphanumeric(item)
    );
    if (invalidInclusion !== undefined) {
      setValidationError(
        "What's Included: only alphabets and numbers are allowed."
      );
      return false;
    }

    const invalidExclusion = formData.exclusions?.find(
      (item) => item.trim() && !isValidAlphanumeric(item)
    );
    if (invalidExclusion !== undefined) {
      setValidationError(
        "What's Not Included: only alphabets and numbers are allowed."
      );
      return false;
    }

    return true;
  };

  const validateCurrentStep = (): boolean => {
    setValidationError(null);

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
      if (!formData.itinerary || formData.itinerary.length === 0) {
        setValidationError('Please add at least one day to the itinerary.');
        return false;
      }
    }

    return true;
  };

  const handleContinue = () => {
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
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setValidationError(null);
      setCurrentStep((prev) => (prev - 1) as StepNumber);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleStepSelect = (step: StepNumber) => {
    if (step < currentStep) {
      setValidationError(null);
      setCurrentStep(step);
    } else if (validateCurrentStep()) {
      setCurrentStep(step);
    }
  };

  const handleSave = (asDraft = false) => {
    if (!asDraft) {
      if (!validateStep1()) {
        setCurrentStep(1);
        window.scrollTo({ top: 100, behavior: 'smooth' });
        return;
      }
      if (!validateStep2()) {
        setCurrentStep(2);
        window.scrollTo({ top: 100, behavior: 'smooth' });
        return;
      }
      if (!validateStep3()) {
        setCurrentStep(3);
        window.scrollTo({ top: 100, behavior: 'smooth' });
        return;
      }
      if (!formData.itinerary || formData.itinerary.length === 0) {
        setValidationError('Please add at least one day to the itinerary.');
        setCurrentStep(4);
        window.scrollTo({ top: 100, behavior: 'smooth' });
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
      .replace(/(^-|-$)+/g, '');

    const finalStatus = asDraft ? 'Draft' : formData.status;

    const computedPrice =
      formData.occupancyPricing && formData.occupancyPricing.length > 0
        ? Math.min(
            ...formData.occupancyPricing
              .map((o) => {
                const p = Number(o.price) || 0;
                const d = Number(o.discountPercent) || 0;
                return p > 0 ? Math.round(p * (1 - d / 100)) : 0;
              })
              .filter((p) => p > 0)
          ) || formData.price
        : formData.price;

    const dateDisplay = formData.datesOnRequest
      ? 'Dates on Request'
      : formData.departureBatches?.[0]?.startDate
      ? `Batch: ${formData.departureBatches[0].startDate}`
      : formData.scheduleDates || 'Every Friday';

    const newTripItem: PartnerTripItem = {
      id: `trip-${Date.now()}`,
      slug: `${slug}-${Math.floor(Math.random() * 899 + 100)}`,
      title: formData.title.trim() || 'Untitled Journey',
      destination: formData.destination.trim() || 'Himalayas, India',
      duration: `${formData.durationNights} nights / ${formData.durationDays} days`,
      image: formData.image || '/trips/zanskar.png',
      price: computedPrice,
      originalPrice: formData.originalPrice,
      discount: formData.discount,
      date: dateDisplay,
      status: finalStatus,
      category: formData.categories[0] || formData.category || 'Weekend Gateway',
      difficulty: formData.difficulty,
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

    // Reset all form fields back to fresh initial state
    resetForm();

    setTimeout(() => {
      router.push(`/trip-partner/${username}/trips`);
      router.refresh();
    }, 400);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-5 sm:pt-8 pb-14 sm:pb-20 font-jakarta min-w-0">
      {/* Top Breadcrumb Navigation */}
      <div className="mb-4 sm:mb-6">
        <Link
          href={`/trip-partner/${username}/trips`}
          className="inline-flex items-center gap-1.5 h-6 py-2 px-2.5 bg-white border border-gray-200 rounded-full text-gray-600 text-[11px] sm:text-xs font-medium cursor-pointer shadow-2xs transition-all hover:bg-gray-50 hover:text-amber-600 hover:border-amber-300 hover:-translate-x-0.5 [&>svg]:w-3 [&>svg]:h-3"
        >
          <ArrowLeft />
          <span>Back to My Trips</span>
        </Link>
      </div>

      {/* Main Header Matching User Screenshot */}
      <header className="text-center mb-7 sm:mb-9">
        <h1 className="text-2xl min-[400px]:text-[1.75rem] sm:text-4xl md:text-[2.5rem] font-black text-gray-900 tracking-tight leading-tight">
          Launch Your <span className="text-amber-500">Journey</span>
        </h1>
        <p className="mt-1.5 text-[13px] sm:text-[15px] font-normal text-gray-500 tracking-tight leading-relaxed">
          Fill in the details to publish your next big trip
        </p>
      </header>

      {/* 5-Step Stepper Progress Bar */}
      <StepIndicator
        currentStep={currentStep}
        maxReachedStep={maxReachedStep}
        onSelectStep={handleStepSelect}
      />

      {/* Form Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl min-[480px]:rounded-3xl sm:rounded-4xl border border-amber-500/12 shadow-[0_8px_30px_-4px_rgba(115,92,0,0.06),0_1px_4px_0_rgba(0,0,0,0.02)] p-3.5 sm:p-8 md:p-11 min-h-auto sm:min-h-[26rem] flex flex-col justify-between w-full box-border"
      >
        {/* Validation Error Message */}
        {validationError && (
          <div role="alert" className="flex items-center gap-2 p-3 sm:px-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-[13px] font-bold mb-4 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:shrink-0">
            <AlertCircle />
            <span>{validationError}</span>
          </div>
        )}

        {/* Dynamic Step Content with Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentStep === 1 && (
              <StepBasic formData={formData} updateForm={updateForm} />
            )}
            {currentStep === 2 && (
              <StepLogistics formData={formData} updateForm={updateForm} />
            )}
            {currentStep === 3 && (
              <StepDetails formData={formData} updateForm={updateForm} />
            )}
            {currentStep === 4 && (
              <StepPlan formData={formData} updateForm={updateForm} />
            )}
            {currentStep === 5 && (
              <StepFinal formData={formData} updateForm={updateForm} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-between gap-3 sm:gap-4 mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-gray-100 w-full">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 py-3.5 px-7 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-black font-extrabold text-[13px] uppercase tracking-wide font-jakarta rounded-full cursor-pointer transition-all duration-200 [&>svg]:w-4 [&>svg]:h-4 w-full sm:w-auto"
            >
              <ArrowLeft /> Previous
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {currentStep < 5 ? (
            <Button
              size="lg"
              showArrow={true}
              onClick={handleContinue}
              disabled={isSubmitting}
              className="w-full sm:w-auto justify-center"
            >
              Continue
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleSave(true)}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 py-3.5 px-7 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-black font-extrabold text-[13px] uppercase tracking-wide font-jakarta rounded-full cursor-pointer transition-all duration-200 [&>svg]:w-4 [&>svg]:h-4 w-full sm:w-auto"
              >
                <FileCheck /> {isSubmitting ? 'Saving...' : 'Save Draft'}
              </button>

              <Button
                size="lg"
                rightIcon={!isSubmitting ? <Rocket className="w-4 h-4 stroke-[2.5]" /> : undefined}
                showArrow={false}
                onClick={() => handleSave(false)}
                disabled={isSubmitting}
                className="w-full sm:w-auto justify-center"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Trip'}
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
