'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Wand2,
  X,
  Check,
  AlertCircle,
  Compass,
  Layers,
  Sparkles,
  FileText,
  Loader2,
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import {
  StepContentArea,
  FormGroup,
  FieldLabel,
  FieldInput,
  FieldTextarea,
  CatchphraseTextarea,
  FieldHint,
  FieldErrorText,
  InputWithButtonWrapper,
  FillButtonWrapper,
  FillButton,
  MultiselectWrapper,
  MultiselectBox,
  CategoryChipsScroll,
  MultiselectPlaceholder,
  CategoryPill,
  MultiselectDropdown,
  MultiselectList,
  MultiselectOption,
  RequiredAsterisk,
} from './styles';
import {
  NewTripFormData,
  CATEGORY_OPTIONS,
  isValidAlphanumericDot,
  filterAlphanumericDot,
} from './types';
import { ThumbnailImageField } from './ThumbnailImageField';
import { GalleryImagesField } from './GalleryImagesField';
import { TripReelsField } from './TripReelsField';
import { TripDisclaimerField } from './TripDisclaimerField';
import { fetchAutoFill, AVAILABLE_IMAGES } from '@/lib/autoFillService';

interface StepBasicProps {
  formData: NewTripFormData;
  updateForm: (fields: Partial<NewTripFormData>) => void;
}

export const StepBasic: React.FC<StepBasicProps> = ({
  formData,
  updateForm,
}) => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const categoryWrapperRef = useRef<HTMLDivElement>(null);

  // Close multiselect dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        categoryWrapperRef.current &&
        !categoryWrapperRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    };

    if (isCategoryDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isCategoryDropdownOpen]);

  // Normalize selected categories array
  const selectedCategories =
    formData.categories && formData.categories.length > 0
      ? formData.categories
      : formData.category
      ? [formData.category]
      : [];

  const toggleCategory = (cat: string) => {
    let updated: string[];
    if (selectedCategories.includes(cat)) {
      updated = selectedCategories.filter((c) => c !== cat);
    } else {
      updated = [...selectedCategories, cat];
    }
    updateForm({
      categories: updated,
      category: updated[0] || '',
    });
  };

  // Validation state checks
  const isTitleValid = isValidAlphanumericDot(formData.title);
  const isCatchphraseValid = isValidAlphanumericDot(formData.shortCatchphrase);
  const isDescriptionValid = isValidAlphanumericDot(formData.description);

  // Sanitize string to allowed characters (alphabets, numbers, period, space)
  const cleanToAllowed = (str: string) => str.replace(/[^a-zA-Z0-9.\s]/g, '');

  // AI-powered Smart Fill handler using OpenRouter GPT-4o
  const handleAutoFill = async () => {
    const title = formData.title.trim();
    if (!title || isAutoFilling) return;

    setIsAutoFilling(true);

    try {
      const result = await fetchAutoFill(title);

      const catchphrase = cleanToAllowed(result.shortCatchphrase || '').slice(0, 100);
      const description = cleanToAllowed(result.description || '');

      const image = AVAILABLE_IMAGES.includes(result.image)
        ? result.image
        : formData.image || '/trips/zanskar.png';

      // ONLY update the 3 requested fields:
      // 1. shortCatchphrase
      // 2. Thumbnail Image URL (image)
      // 3. Trip Blueprint (description)
      updateForm({
        shortCatchphrase: catchphrase,
        image,
        description,
      });
    } catch (error) {
      console.error('AutoFill failed:', error);
    } finally {
      setIsAutoFilling(false);
    }
  };

  return (
    <StepContentArea>
      {/* 2-Column Grid: Title with dynamic FILL button & Multiselect Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Trip Title */}
        <FormGroup>
          <FieldLabel htmlFor="trip-title">
            <span className="flex items-center gap-1.5 text-gray-800">
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              Trip Title <RequiredAsterisk>*</RequiredAsterisk>
            </span>
            <FieldHint>{formData.title.length}/60 chars</FieldHint>
          </FieldLabel>
          <InputWithButtonWrapper>
            <FieldInput
              id="trip-title"
              type="text"
              required
              maxLength={60}
              $hasError={!isTitleValid}
              placeholder="e.g., Hidden Gems of Spiti Valley"
              value={formData.title}
              onChange={(e) =>
                updateForm({ title: filterAlphanumericDot(e.target.value) })
              }
              style={{
                paddingRight: formData.title.trim().length > 0 ? '5.75rem' : '1.25rem',
              }}
              autoFocus
            />

            {/* Smart FILL Button with Magic Wand Icon */}
            <AnimatePresence>
              {formData.title.trim().length > 0 && (
                <FillButtonWrapper>
                  <FillButton
                    type="button"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    whileHover={isAutoFilling ? {} : { scale: 1.04 }}
                    whileTap={isAutoFilling ? {} : { scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    onClick={handleAutoFill}
                    title="Auto-fill trip details using AI"
                    disabled={isAutoFilling}
                    style={{ opacity: isAutoFilling ? 0.7 : 1, cursor: isAutoFilling ? 'wait' : 'pointer' }}
                  >
                    {isAutoFilling ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Wand2 />
                    )}
                    <span>{isAutoFilling ? 'AI...' : 'FILL'}</span>
                  </FillButton>
                </FillButtonWrapper>
              )}
            </AnimatePresence>
          </InputWithButtonWrapper>
          {!isTitleValid && (
            <FieldErrorText>
              <AlertCircle />
              Only numbers, alphabets and . are allowed
            </FieldErrorText>
          )}
        </FormGroup>

        {/* Category Multiselect */}
        <FormGroup>
          <FieldLabel htmlFor="trip-category">
            <span className="flex items-center gap-1.5 text-gray-800">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              Category <RequiredAsterisk>*</RequiredAsterisk>
            </span>
            {selectedCategories.length > 0 && (
              <FieldHint>{selectedCategories.length} selected</FieldHint>
            )}
          </FieldLabel>

          <MultiselectWrapper ref={categoryWrapperRef}>
            <MultiselectBox
              id="trip-category"
              $isOpen={isCategoryDropdownOpen}
              onClick={() => setIsCategoryDropdownOpen((prev) => !prev)}
              tabIndex={0}
              role="combobox"
              aria-expanded={isCategoryDropdownOpen}
              aria-label="Select categories"
            >
              {selectedCategories.length === 0 ? (
                <MultiselectPlaceholder>
                  Select a category to add...
                </MultiselectPlaceholder>
              ) : (
                <CategoryChipsScroll
                  onWheel={(e) => {
                    if (e.deltaY !== 0) {
                      e.currentTarget.scrollLeft += e.deltaY;
                    }
                  }}
                >
                  {selectedCategories.map((cat) => (
                    <CategoryPill key={cat}>
                      <span>{cat}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategory(cat);
                        }}
                        aria-label={`Remove ${cat}`}
                      >
                        <X />
                      </button>
                    </CategoryPill>
                  ))}
                </CategoryChipsScroll>
              )}

              <ChevronDown
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform duration-200 pointer-events-none ${
                  isCategoryDropdownOpen ? 'rotate-180 text-amber-500' : ''
                }`}
              />
            </MultiselectBox>

            {/* Floating Multiselect Dropdown */}
            <AnimatePresence>
              {isCategoryDropdownOpen && (
                <MultiselectDropdown
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <MultiselectList>
                    {CATEGORY_OPTIONS.map((cat) => {
                      const isSelected = selectedCategories.includes(cat);
                      return (
                        <MultiselectOption
                          key={cat}
                          $selected={isSelected}
                          onClick={() => toggleCategory(cat)}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                                isSelected
                                  ? 'bg-amber-400 border-amber-500 text-black shadow-xs'
                                  : 'border-gray-300 bg-white'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={isSelected ? 'font-black' : 'font-semibold'}>
                              {cat}
                            </span>
                          </div>
                          {isSelected && (
                            <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded-full">
                              Selected
                            </span>
                          )}
                        </MultiselectOption>
                      );
                    })}
                  </MultiselectList>
                </MultiselectDropdown>
              )}
            </AnimatePresence>
          </MultiselectWrapper>
        </FormGroup>
      </div>

      {/* 2-Column Responsive Grid: Thumbnail Image URL & Short Catchphrase Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-start">
        {/* Reusable Thumbnail Image URL Field */}
        <ThumbnailImageField
          value={formData.image}
          onChange={(image) => updateForm({ image })}
          tripTitle={formData.title}
          category={selectedCategories[0] || formData.category}
        />

        {/* Short Catchphrase */}
        <FormGroup>
          <FieldLabel htmlFor="trip-catchphrase">
            <span className="flex items-center gap-1.5 text-gray-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Short Catchphrase <RequiredAsterisk>*</RequiredAsterisk>
            </span>
            <FieldHint>
              {formData.shortCatchphrase ? `${formData.shortCatchphrase.length}/100` : 'Visible on preview cards'}
            </FieldHint>
          </FieldLabel>
          <CatchphraseTextarea
            id="trip-catchphrase"
            rows={2}
            maxLength={100}
            $hasError={!isCatchphraseValid}
            placeholder="Summarize the vibe in one sentence..."
            value={formData.shortCatchphrase}
            onChange={(e) =>
              updateForm({ shortCatchphrase: filterAlphanumericDot(e.target.value) })
            }
          />
          {!isCatchphraseValid && (
            <FieldErrorText>
              <AlertCircle />
              Only numbers, alphabets and . are allowed
            </FieldErrorText>
          )}
        </FormGroup>
      </div>

      {/* Full Width: Detailed Description */}
      <FormGroup>
        <FieldLabel htmlFor="trip-description">
          <span className="flex items-center gap-1.5 text-gray-800">
            <FileText className="w-3.5 h-3.5 text-amber-500" />
            Detailed Description <RequiredAsterisk>*</RequiredAsterisk>
          </span>
        </FieldLabel>
        <FieldTextarea
          id="trip-description"
          rows={5}
          $hasError={!isDescriptionValid}
          placeholder="Tell the story of this trip. What makes it special?"
          value={formData.description}
          onChange={(e) =>
            updateForm({ description: filterAlphanumericDot(e.target.value) })
          }
        />
        {!isDescriptionValid && (
          <FieldErrorText>
            <AlertCircle />
            Only numbers, alphabets and . are allowed
          </FieldErrorText>
        )}
      </FormGroup>

      {/* Reusable Trip Disclaimer / Important Notice Field */}
      <TripDisclaimerField
        value={formData.disclaimer || ''}
        onChange={(disclaimer) => updateForm({ disclaimer })}
      />

      {/* 2-Column Responsive Grid: Gallery Images & Trip Reels Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-start">
        {/* Reusable Gallery Images Field (Max 10) matching Image 1 Design */}
        <GalleryImagesField
          images={formData.gallery || []}
          onChange={(gallery) => updateForm({ gallery })}
          maxImages={10}
          tripTitle={formData.title}
          category={selectedCategories[0] || formData.category}
        />

        {/* Reusable Trip Reels Field (Max 5 Short Videos) matching Image 1 Design */}
        <TripReelsField
          reels={formData.reels || []}
          onChange={(reels) => updateForm({ reels })}
          maxReels={5}
        />
      </div>
    </StepContentArea>
  );
};
