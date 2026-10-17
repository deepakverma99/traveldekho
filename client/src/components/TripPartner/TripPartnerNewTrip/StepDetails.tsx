'use client';

import React, { useState } from 'react';
import { Plus, X, Tag, Check, ShieldAlert } from 'lucide-react';
import {
  StepContentArea,
  FormGroup,
  FieldLabel,
  FieldInput,
  FieldHint,
  ChipBadge,
  RequiredAsterisk,
  SuggestionChip,
  SuggestionsContainer,
  SuggestionsTitle,
} from './styles';
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

  const addCustomTag = () => {
    const trimmed = newTagInput.trim();
    if (trimmed && /[a-zA-Z]/.test(trimmed)) {
      const cleanTag = trimmed.replace(/^#+/, '').trim();
      if (cleanTag && !formData.tags.includes(cleanTag)) {
        updateForm({ tags: [...formData.tags, cleanTag] });
        setNewTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateForm({ tags: formData.tags.filter((t) => t !== tagToRemove) });
  };

  const toggleSuggestedTag = (tag: string) => {
    if (formData.tags.includes(tag)) {
      removeTag(tag);
    } else {
      updateForm({ tags: [...formData.tags, tag] });
    }
  };

  const addInclusion = () => {
    const trimmed = newInclusionInput.trim();
    if (trimmed) {
      if (!formData.inclusions.includes(trimmed)) {
        updateForm({ inclusions: [...formData.inclusions, trimmed] });
      }
      setNewInclusionInput('');
    }
  };

  const removeInclusion = (index: number) => {
    updateForm({
      inclusions: formData.inclusions.filter((_, i) => i !== index),
    });
  };

  const toggleSuggestedInclusion = (item: string) => {
    if (formData.inclusions.includes(item)) {
      updateForm({
        inclusions: formData.inclusions.filter((inc) => inc !== item),
      });
    } else {
      updateForm({
        inclusions: [...formData.inclusions, item],
      });
    }
  };

  const addExclusion = () => {
    const trimmed = newExclusionInput.trim();
    if (trimmed) {
      if (!formData.exclusions.includes(trimmed)) {
        updateForm({ exclusions: [...formData.exclusions, trimmed] });
      }
      setNewExclusionInput('');
    }
  };

  const removeExclusion = (index: number) => {
    updateForm({
      exclusions: formData.exclusions.filter((_, i) => i !== index),
    });
  };

  const toggleSuggestedExclusion = (item: string) => {
    if (formData.exclusions.includes(item)) {
      updateForm({
        exclusions: formData.exclusions.filter((exc) => exc !== item),
      });
    } else {
      updateForm({
        exclusions: [...formData.exclusions, item],
      });
    }
  };

  return (
    <StepContentArea>
      {/* Trip Tags & Keywords */}
      <FormGroup>
        <FieldLabel>
          <span className="flex items-center gap-1.5 text-gray-800">
            <Tag className="w-3.5 h-3.5 text-amber-500" />
            Trip Highlights & Tags <RequiredAsterisk>*</RequiredAsterisk>
          </span>
          <FieldHint>
            {formData.tags.length > 0
              ? `${formData.tags.length} selected`
              : 'At least 1 required • Click to toggle presets'}
          </FieldHint>
        </FieldLabel>

        {/* Selected Tags list */}
        <div className="flex flex-wrap gap-2 p-3 bg-gray-50/60 rounded-2xl min-h-[44px] items-center border border-gray-100">
          {formData.tags.map((tag) => {
            const displayTag = tag.startsWith('#') ? tag : `#${tag}`;
            return (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-bold"
              >
                {displayTag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                  aria-label={`Remove tag ${tag}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}

          {/* Input to add custom tag */}
          <div className="inline-flex items-center gap-1 flex-1 min-w-[140px]">
            <input
              type="text"
              placeholder="+ custom tag..."
              value={newTagInput}
              onChange={(e) => setNewTagInput(filterTagInput(e.target.value))}
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
              <ChipBadge
                key={tag}
                $selected={isSelected}
                onClick={() => toggleSuggestedTag(tag)}
              >
                <Tag className="w-3 h-3 opacity-60" />
                {tag}
              </ChipBadge>
            );
          })}
        </div>
      </FormGroup>

      {/* Inclusions & Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Inclusions */}
        <div className="space-y-3">
          <FieldLabel>
            <span className="flex items-center gap-1.5 text-green-700 font-extrabold">
              <Check className="w-4 h-4 text-green-600" />
              What&apos;s Included {formData.inclusions.length > 0 ? `(${formData.inclusions.length})` : ''}
            </span>
            <FieldHint>Optional</FieldHint>
          </FieldLabel>

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
            <FieldInput
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
          <SuggestionsContainer>
            <SuggestionsTitle>
              <span>Suggested Inclusions</span>
              <span className="text-[10px] text-gray-400 lowercase font-medium">
                click to toggle
              </span>
            </SuggestionsTitle>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_INCLUSION_SUGGESTIONS.map((option) => {
                const isSelected = formData.inclusions.includes(option);
                return (
                  <SuggestionChip
                    key={option}
                    type="button"
                    $variant="inclusion"
                    $selected={isSelected}
                    onClick={() => toggleSuggestedInclusion(option)}
                  >
                    {isSelected ? (
                      <Check className="w-3 h-3 text-green-600 shrink-0" />
                    ) : (
                      <Plus className="w-3 h-3 opacity-60 shrink-0" />
                    )}
                    {option}
                  </SuggestionChip>
                );
              })}
            </div>
          </SuggestionsContainer>
        </div>

        {/* Exclusions */}
        <div className="space-y-3">
          <FieldLabel>
            <span className="flex items-center gap-1.5 text-red-600 font-extrabold">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              What&apos;s Not Included {formData.exclusions.length > 0 ? `(${formData.exclusions.length})` : ''}
            </span>
            <FieldHint>Optional</FieldHint>
          </FieldLabel>

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
            <FieldInput
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
          <SuggestionsContainer>
            <SuggestionsTitle>
              <span>Suggested Exclusions</span>
              <span className="text-[10px] text-gray-400 lowercase font-medium">
                click to toggle
              </span>
            </SuggestionsTitle>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_EXCLUSION_SUGGESTIONS.map((option) => {
                const isSelected = formData.exclusions.includes(option);
                return (
                  <SuggestionChip
                    key={option}
                    type="button"
                    $variant="exclusion"
                    $selected={isSelected}
                    onClick={() => toggleSuggestedExclusion(option)}
                  >
                    {isSelected ? (
                      <Check className="w-3 h-3 text-red-600 shrink-0" />
                    ) : (
                      <Plus className="w-3 h-3 opacity-60 shrink-0" />
                    )}
                    {option}
                  </SuggestionChip>
                );
              })}
            </div>
          </SuggestionsContainer>
        </div>
      </div>
    </StepContentArea>
  );
};
