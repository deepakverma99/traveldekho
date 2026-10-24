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
import { motion, AnimatePresence } from 'framer-motion';
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

  // Sync categories array and single category field
  const selectedCategories = formData.categories || (formData.category ? [formData.category] : []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        categoryWrapperRef.current &&
        !categoryWrapperRef.current.contains(e.target as Node)
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

  // Sanitize string to allowed characters (alphabets, numbers, period, space)
  const cleanToAllowed = (str: string) => str.replace(/[^a-zA-Z0-9.\s]/g, '');

  // AI Auto-Fill Handler
  const handleAutoFill = async () => {
    const title = formData.title?.trim();
    if (!title || isAutoFilling) return;

    setIsAutoFilling(true);
    try {
      const result = await fetchAutoFill(title);
      const catchphrase = cleanToAllowed(result.shortCatchphrase || '').slice(0, 100);
      const description = cleanToAllowed(result.description || '');

      const image = AVAILABLE_IMAGES.includes(result.image)
        ? result.image
        : formData.image || '/trips/zanskar.png';

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

  // Field validation checks (allow empty strings initially)
  const isTitleValid = isValidAlphanumericDot(formData.title);
  const isCatchphraseValid = isValidAlphanumericDot(formData.shortCatchphrase);
  const isDescriptionValid = isValidAlphanumericDot(formData.description);

  return (
    <div className="w-full flex flex-col gap-6 sm:gap-7 font-jakarta">
      {/* 2-Column Responsive Grid: Title & Category Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-start">
        {/* Title Input with Inline FILL Button */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="trip-title" className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-800">
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              Trip Title <span className="text-red-500 ml-1 font-bold inline">*</span>
            </span>
            <span className="text-[10px] font-bold text-gray-400 normal-case tracking-normal">
              Type title & click Auto Fill
            </span>
          </label>

          <div className="relative w-full">
            <input
              id="trip-title"
              type="text"
              placeholder="e.g. Majestic Spiti Valley Expedition"
              value={formData.title}
              onChange={(e) =>
                updateForm({ title: filterAlphanumericDot(e.target.value) })
              }
              className={`w-full rounded-2xl py-3 px-4 sm:py-3.5 sm:px-5 pr-28 text-sm sm:text-[15px] font-semibold text-gray-900 font-jakarta outline-none transition-all placeholder:text-gray-400 placeholder:font-medium ${
                !isTitleValid
                  ? 'bg-red-50 border-2 border-red-400 hover:bg-red-100/50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
                  : 'bg-[#f8fafc] border-2 border-transparent hover:bg-[#f1f5f9] focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25'
              }`}
            />

            {/* Smart Inline FILL Button inside input */}
            <AnimatePresence>
              {formData.title && formData.title.trim().length >= 3 && (
                <div className="absolute right-2 top-0 bottom-0 flex items-center pointer-events-none z-10">
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.85, x: 8 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.85, x: 8 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleAutoFill}
                    disabled={isAutoFilling}
                    title="Automatically fill itinerary, highlights, and details using AI"
                    className="pointer-events-auto inline-flex items-center gap-1.5 py-1.5 px-3.5 bg-amber-500 hover:bg-amber-400 text-white rounded-full text-[11px] font-black tracking-wider uppercase font-jakarta cursor-pointer shadow-[0_2px_8px_rgba(250,203,43,0.45)] hover:shadow-[0_4px_12px_rgba(250,203,43,0.6)] transition-all [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:stroke-[2.5]"
                  >
                    {isAutoFilling ? (
                      <>
                        <Loader2 className="animate-spin" />
                        <span>Filling...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 />
                        <span>Auto Fill</span>
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </AnimatePresence>
          </div>
          {!isTitleValid && (
            <span className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-red-500 tracking-tight">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              Only numbers, alphabets and . are allowed
            </span>
          )}
        </div>

        {/* Category Multiselect */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="trip-category" className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-800">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              Category <span className="text-red-500 ml-1 font-bold inline">*</span>
            </span>
            {selectedCategories.length > 0 && (
              <span className="text-[10px] font-bold text-gray-400 normal-case tracking-normal">
                {selectedCategories.length} selected
              </span>
            )}
          </label>

          <div ref={categoryWrapperRef} className="relative w-full">
            <div
              id="trip-category"
              onClick={() => setIsCategoryDropdownOpen((prev) => !prev)}
              tabIndex={0}
              role="combobox"
              aria-expanded={isCategoryDropdownOpen}
              aria-label="Select categories"
              className={`w-full h-13.5 rounded-2xl pr-10 pl-3.5 flex items-center cursor-pointer relative overflow-hidden transition-all ${
                isCategoryDropdownOpen
                  ? 'bg-white border-2 border-amber-400 ring-4 ring-amber-200/25'
                  : 'bg-[#f8fafc] hover:bg-[#f1f5f9] border-2 border-transparent'
              }`}
            >
              {selectedCategories.length === 0 ? (
                <span className="text-gray-400 text-[15px] font-medium select-none whitespace-nowrap">
                  Select a category to add...
                </span>
              ) : (
                <div
                  onWheel={(e) => {
                    if (e.deltaY !== 0) {
                      e.currentTarget.scrollLeft += e.deltaY;
                    }
                  }}
                  className="flex items-center gap-1.5 overflow-x-auto overflow-y-hidden whitespace-nowrap w-full pr-2 scrollbar-hide"
                >
                  {selectedCategories.map((cat) => (
                    <span
                      key={cat}
                      className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 py-1 px-2.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[11px] font-extrabold tracking-wide select-none [&>button]:inline-flex [&>button]:items-center [&>button]:justify-center [&>button]:bg-transparent [&>button]:border-none [&>button]:text-amber-800 hover:[&>button]:text-red-600 [&>button]:cursor-pointer [&>button]:p-0 [&>button>svg]:w-3 [&>button>svg]:h-3"
                    >
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
                    </span>
                  ))}
                </div>
              )}

              <ChevronDown
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform duration-200 pointer-events-none ${
                  isCategoryDropdownOpen ? 'rotate-180 text-amber-500' : ''
                }`}
              />
            </div>

            {/* Floating Multiselect Dropdown */}
            <AnimatePresence>
              {isCategoryDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-[calc(100%+0.375rem)] left-0 right-0 z-50 bg-white border border-gray-200 rounded-2xl shadow-[0_12px_28px_-6px_rgba(0,0,0,0.15),0_8px_10px_-6px_rgba(0,0,0,0.05)] p-2 max-h-68 flex flex-col gap-1"
                >
                  <div className="overflow-y-auto max-h-50 flex flex-col gap-0.5 pr-1">
                    {CATEGORY_OPTIONS.map((cat) => {
                      const isSelected = selectedCategories.includes(cat);
                      return (
                        <div
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-[13px] font-bold cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-amber-50 text-amber-900'
                              : 'bg-transparent text-gray-800 hover:bg-amber-100 hover:text-amber-900'
                          }`}
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
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
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
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="trip-catchphrase" className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Short Catchphrase <span className="text-red-500 ml-1 font-bold inline">*</span>
            </span>
            <span className="text-[10px] font-bold text-gray-400 normal-case tracking-normal">
              {formData.shortCatchphrase ? `${formData.shortCatchphrase.length}/100` : 'Visible on preview cards'}
            </span>
          </label>
          <textarea
            id="trip-catchphrase"
            rows={2}
            maxLength={100}
            placeholder="Summarize the vibe in one sentence..."
            value={formData.shortCatchphrase}
            onChange={(e) =>
              updateForm({ shortCatchphrase: filterAlphanumericDot(e.target.value) })
            }
            className={`w-full rounded-2xl p-4 sm:p-5 text-sm sm:text-[15px] font-medium leading-normal text-gray-900 font-jakarta min-h-[5.5rem] resize-y outline-none transition-all placeholder:text-gray-400 placeholder:font-medium ${
              !isCatchphraseValid
                ? 'bg-red-50 border-2 border-red-400 hover:bg-red-100/50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
                : 'bg-[#f8fafc] border-2 border-transparent hover:bg-[#f1f5f9] focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25'
            }`}
          />
          {!isCatchphraseValid && (
            <span className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-red-500 tracking-tight">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              Only numbers, alphabets and . are allowed
            </span>
          )}
        </div>
      </div>

      {/* Full Width: Detailed Description */}
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="trip-description" className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-gray-800">
            <FileText className="w-3.5 h-3.5 text-amber-500" />
            Detailed Description <span className="text-red-500 ml-1 font-bold inline">*</span>
          </span>
        </label>
        <textarea
          id="trip-description"
          rows={5}
          placeholder="Tell the story of this trip. What makes it special?"
          value={formData.description}
          onChange={(e) =>
            updateForm({ description: filterAlphanumericDot(e.target.value) })
          }
          className={`w-full rounded-2xl py-3.5 px-4 sm:px-5 text-sm sm:text-[15px] font-medium leading-relaxed text-gray-900 font-jakarta outline-none min-h-[7.5rem] sm:min-h-[8.5rem] resize-y transition-all placeholder:text-gray-400 placeholder:font-medium ${
            !isDescriptionValid
              ? 'bg-red-50 border-2 border-red-400 hover:bg-red-100/50 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
              : 'bg-[#f8fafc] border-2 border-transparent hover:bg-[#f1f5f9] focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25'
          }`}
        />
        {!isDescriptionValid && (
          <span className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-red-500 tracking-tight">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            Only numbers, alphabets and . are allowed
          </span>
        )}
      </div>

      {/* Reusable Trip Disclaimer / Important Notice Field */}
      <TripDisclaimerField
        value={formData.disclaimer || ''}
        onChange={(disclaimer) => updateForm({ disclaimer })}
      />

      {/* 2-Column Responsive Grid: Gallery Images & Trip Reels Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-start">
        {/* Reusable Gallery Images Field (Max 10) */}
        <GalleryImagesField
          images={formData.gallery || []}
          onChange={(gallery) => updateForm({ gallery })}
          maxImages={10}
          tripTitle={formData.title}
          category={selectedCategories[0] || formData.category}
        />

        {/* Reusable Trip Reels Field (Max 5 Short Videos) */}
        <TripReelsField
          reels={formData.reels || []}
          onChange={(reels) => updateForm({ reels })}
          maxReels={5}
        />
      </div>
    </div>
  );
};
