'use client';

import React, { useState } from 'react';
import { Plus, X, Tag, Check, ShieldAlert } from 'lucide-react';
import {
  NewTripFormData,
  filterTagInput,
  filterAlphanumeric,
  COMMON_INCLUSION_SUGGESTIONS,
  COMMON_EXCLUSION_SUGGESTIONS,
} from './types';

interface StepDetailsProps {
  formData: NewTripFormData;
  updateForm: (fields: Partial<NewTripFormData>) => void;
}

const COMMON_TAG_SUGGESTIONS = [
  'Scenic',
  'Mountains',
  'Campfire',
  'Stargazing',
  'Photography',
  'Offbeat',
  'Biking',
  'Trek',
  'Riverside',
  'Monastery',
  'Snow Trails',
];

export const StepDetails: React.FC<StepDetailsProps> = ({
  formData,
  updateForm,
}) => {
  const [newTagInput, setNewTagInput] = useState('');
  const [newInclusionInput, setNewInclusionInput] = useState('');
  const [newExclusionInput, setNewExclusionInput] = useState('');

  // Handle Tags
  const toggleSuggestedTag = (tag: string) => {
    const exists = formData.tags.includes(tag);
    const updated = exists
      ? formData.tags.filter((t) => t !== tag)
      : [...formData.tags, tag];
    updateForm({ tags: updated });
  };

  const addCustomTag = () => {
    const trimmed = filterTagInput(newTagInput);
    if (!trimmed) return;
    if (!formData.tags.includes(trimmed)) {
      updateForm({ tags: [...formData.tags, trimmed] });
    }
    setNewTagInput('');
  };

  const removeTag = (index: number) => {
    updateForm({
      tags: formData.tags.filter((_, idx) => idx !== index),
    });
  };

  // Handle Inclusions
  const toggleSuggestedInclusion = (item: string) => {
    const exists = formData.inclusions.includes(item);
    const updated = exists
      ? formData.inclusions.filter((i) => i !== item)
      : [...formData.inclusions, item];
    updateForm({ inclusions: updated });
  };

  const addInclusion = () => {
    const trimmed = newInclusionInput.trim();
    if (!trimmed) return;
    if (!formData.inclusions.includes(trimmed)) {
      updateForm({ inclusions: [...formData.inclusions, trimmed] });
    }
    setNewInclusionInput('');
  };

  const removeInclusion = (index: number) => {
    updateForm({
      inclusions: formData.inclusions.filter((_, idx) => idx !== index),
    });
  };

  // Handle Exclusions
  const toggleSuggestedExclusion = (item: string) => {
    const exists = formData.exclusions.includes(item);
    const updated = exists
      ? formData.exclusions.filter((i) => i !== item)
      : [...formData.exclusions, item];
    updateForm({ exclusions: updated });
  };

  const addExclusion = () => {
    const trimmed = newExclusionInput.trim();
    if (!trimmed) return;
    if (!formData.exclusions.includes(trimmed)) {
      updateForm({ exclusions: [...formData.exclusions, trimmed] });
    }
    setNewExclusionInput('');
  };

  const removeExclusion = (index: number) => {
    updateForm({
      exclusions: formData.exclusions.filter((_, idx) => idx !== index),
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 sm:gap-7 font-jakarta">
      {/* Tags Section */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-gray-800">
            <Tag className="w-3.5 h-3.5 text-amber-500" />
            Trip Tags / Highlights
          </span>
          <span className="text-[10px] font-bold text-gray-400 normal-case tracking-normal">
            Select or type tags (Press Enter)
          </span>
        </label>

        {/* Selected Tags Display & Custom Input */}
        <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#f8fafc] border border-gray-200/80 rounded-2xl min-h-[3.25rem]">
          {formData.tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-charcoal font-black rounded-full text-xs shadow-xs"
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(idx)}
                className="hover:text-red-700 transition-colors cursor-pointer"
                aria-label={`Remove tag ${tag}`}
              >
                <X className="w-3 h-3 stroke-[3]" />
              </button>
            </span>
          ))}

          <div className="flex-1 min-w-[140px] flex items-center">
            <input
              type="text"
              placeholder="Type custom tag..."
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustomTag();
                }
              }}
              className="bg-transparent text-xs font-bold text-gray-800 placeholder-gray-400 outline-none w-full px-2"
            />
            {newTagInput.trim() && (
              <button
                type="button"
                onClick={addCustomTag}
                className="text-xs font-black text-amber-600 px-2 py-0.5 rounded bg-amber-100 cursor-pointer"
              >
                Add
              </button>
            )}
          </div>
        </div>

        {/* Suggested Tags list */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {COMMON_TAG_SUGGESTIONS.map((tag) => {
            const isSelected = formData.tags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleSuggestedTag(tag)}
                className={`inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-bold cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-amber-100 text-amber-900 border border-amber-400'
                    : 'bg-gray-100 text-gray-700 border border-transparent hover:bg-amber-50 hover:border-amber-300'
                }`}
              >
                <Tag className="w-3 h-3 opacity-60" />
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Inclusions & Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-2">
        {/* Inclusions */}
        <div className="space-y-3">
          <label className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-green-700 font-extrabold">
              <Check className="w-4 h-4 text-green-600" />
              What&apos;s Included {formData.inclusions.length > 0 ? `(${formData.inclusions.length})` : ''}
            </span>
            <span className="text-[10px] font-bold text-gray-400 normal-case tracking-normal">Optional</span>
          </label>

          {/* Active Inclusions List */}
          {formData.inclusions.length > 0 && (
            <div className="space-y-2">
              {formData.inclusions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-green-50/60 border border-green-100 rounded-xl text-xs font-bold text-gray-800"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    {item}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeInclusion(idx)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                    aria-label={`Remove inclusion ${item}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Custom Inclusion Input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Welcome Drinks, Trekking Poles"
              value={newInclusionInput}
              onChange={(e) =>
                setNewInclusionInput(filterAlphanumeric(e.target.value))
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addInclusion();
                }
              }}
              className="w-full rounded-2xl py-3 px-4 sm:py-3.5 sm:px-5 text-sm sm:text-[15px] font-semibold text-gray-900 font-jakarta outline-none transition-all placeholder:text-gray-400 placeholder:font-medium bg-[#f8fafc] border-2 border-transparent hover:bg-[#f1f5f9] focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25"
            />
            <button
              type="button"
              onClick={addInclusion}
              disabled={!newInclusionInput.trim()}
              className="px-3.5 bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-black shrink-0 transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Add inclusion"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Suggested Inclusions */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wide text-gray-500">
              <span>Suggested Inclusions</span>
              <span className="text-[10px] text-gray-400 lowercase font-medium">
                click to toggle
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_INCLUSION_SUGGESTIONS.map((option) => {
                const isSelected = formData.inclusions.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleSuggestedInclusion(option)}
                    className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-bold leading-tight cursor-pointer transition-all duration-150 text-left ${
                      isSelected
                        ? 'bg-green-100 text-green-900 border border-green-500 shadow-2xs hover:bg-green-200'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-green-50 hover:border-green-300 hover:text-green-800'
                    }`}
                  >
                    {isSelected ? (
                      <Check className="w-3 h-3 text-green-600 shrink-0" />
                    ) : (
                      <Plus className="w-3 h-3 opacity-60 shrink-0" />
                    )}
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Exclusions */}
        <div className="space-y-3">
          <label className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-red-600 font-extrabold">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              What&apos;s Not Included {formData.exclusions.length > 0 ? `(${formData.exclusions.length})` : ''}
            </span>
            <span className="text-[10px] font-bold text-gray-400 normal-case tracking-normal">Optional</span>
          </label>

          {/* Active Exclusions List */}
          {formData.exclusions.length > 0 && (
            <div className="space-y-2">
              {formData.exclusions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-red-50/60 border border-red-100 rounded-xl text-xs font-bold text-gray-800"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                    {item}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExclusion(idx)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                    aria-label={`Remove exclusion ${item}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Custom Exclusion Input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Flight tickets, Extra meals"
              value={newExclusionInput}
              onChange={(e) =>
                setNewExclusionInput(filterAlphanumeric(e.target.value))
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addExclusion();
                }
              }}
              className="w-full rounded-2xl py-3 px-4 sm:py-3.5 sm:px-5 text-sm sm:text-[15px] font-semibold text-gray-900 font-jakarta outline-none transition-all placeholder:text-gray-400 placeholder:font-medium bg-[#f8fafc] border-2 border-transparent hover:bg-[#f1f5f9] focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25"
            />
            <button
              type="button"
              onClick={addExclusion}
              disabled={!newExclusionInput.trim()}
              className="px-3.5 bg-red-500 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-black shrink-0 transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Add exclusion"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Suggested Exclusions */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wide text-gray-500">
              <span>Suggested Exclusions</span>
              <span className="text-[10px] text-gray-400 lowercase font-medium">
                click to toggle
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_EXCLUSION_SUGGESTIONS.map((option) => {
                const isSelected = formData.exclusions.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleSuggestedExclusion(option)}
                    className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-bold leading-tight cursor-pointer transition-all duration-150 text-left ${
                      isSelected
                        ? 'bg-red-100 text-red-900 border border-red-400 shadow-2xs hover:bg-red-200'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-red-50 hover:border-red-300 hover:text-red-800'
                    }`}
                  >
                    {isSelected ? (
                      <Check className="w-3 h-3 text-red-600 shrink-0" />
                    ) : (
                      <Plus className="w-3 h-3 opacity-60 shrink-0" />
                    )}
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
