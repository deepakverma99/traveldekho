'use client';

import React from 'react';
import Link from 'next/link';
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
import { useNewTripForm } from './hooks/useNewTripForm';

interface TripPartnerNewTripFormProps {
  username: string;
}

export const TripPartnerNewTripForm: React.FC<TripPartnerNewTripFormProps> = ({
  username,
}) => {
  const {
    currentStep,
    maxReachedStep,
    validationError,
    invalidFieldId,
    isSubmitting,
    formData,
    updateForm,
    handleContinue,
    handleBack,
    handleStepSelect,
    handleSave,
  } = useNewTripForm(username);

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-5 sm:pt-8 pb-14 sm:pb-20 font-jakarta min-w-0">
      {/* Top Breadcrumb Navigation */}
      <div className="mb-4 sm:mb-6">
        <Link
          href={`/trip-partner/${username}/trips`}
          className="inline-flex items-center gap-1.5 h-6 py-2 px-2.5 bg-white border border-gray-200 rounded-full text-gray-600 text-[11px] sm:text-xs font-medium cursor-pointer shadow-2xs transition-all hover:bg-gray-50 hover:text-[#ff5722] hover:border-orange-300 hover:-translate-x-0.5 [&>svg]:w-3 [&>svg]:h-3"
        >
          <ArrowLeft />
          <span>Back to My Trips</span>
        </Link>
      </div>

      {/* Main Header Matching User Screenshot */}
      <header className="text-center mb-7 sm:mb-9">
        <h1 className="text-2xl min-[400px]:text-[1.75rem] sm:text-4xl md:text-[2.5rem] font-black text-gray-900 tracking-tight leading-tight">
          Launch Your <span className="text-[#ff5722]">Journey</span>
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
        className="bg-white rounded-2xl min-[480px]:rounded-3xl sm:rounded-4xl border border-orange-500/12 shadow-[0_8px_30px_-4px_rgba(255,87,34,0.06),0_1px_4px_0_rgba(0,0,0,0.02)] p-3.5 sm:p-8 md:p-11 min-h-auto sm:min-h-[26rem] flex flex-col justify-between w-full box-border"
      >
        {/* Validation Error Message */}
        {validationError && (
          <div
            role="alert"
            id="trip-form-validation-alert"
            className="flex items-center gap-2 p-3 sm:px-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-[13px] font-bold mb-4 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:shrink-0 animate-fade-in"
          >
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
              <StepBasic
                formData={formData}
                updateForm={updateForm}
                invalidFieldId={invalidFieldId}
              />
            )}
            {currentStep === 2 && (
              <StepLogistics
                formData={formData}
                updateForm={updateForm}
                invalidFieldId={invalidFieldId}
              />
            )}
            {currentStep === 3 && (
              <StepDetails
                formData={formData}
                updateForm={updateForm}
                invalidFieldId={invalidFieldId}
              />
            )}
            {currentStep === 4 && (
              <StepPlan
                formData={formData}
                updateForm={updateForm}
                invalidFieldId={invalidFieldId}
              />
            )}
            {currentStep === 5 && (
              <StepFinal
                formData={formData}
                updateForm={updateForm}
              />
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
