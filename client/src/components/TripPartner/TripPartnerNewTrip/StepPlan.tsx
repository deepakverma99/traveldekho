'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, X, CalendarDays, Home, Utensils, Sparkles } from 'lucide-react';
import {
  StepContentArea,
  FieldLabel,
  RequiredAsterisk,
  FieldTextarea,
  DayExperienceContainer,
  AddDayTextButton,
  DayCardBox,
  DayBadgeSquircle,
  DaySectionLabel,
  MealPillButton,
} from './styles';
import {
  NewTripFormData,
  ItineraryDay,
  syncItineraryDays,
  createDefaultItineraryDay,
  filterAlphanumeric,
} from './types';

interface StepPlanProps {
  formData: NewTripFormData;
  updateForm: (fields: Partial<NewTripFormData>) => void;
}

const AVAILABLE_MEALS = ['Breakfast', 'Lunch', 'Dinner'] as const;

export const StepPlan: React.FC<StepPlanProps> = ({
  formData,
  updateForm,
}) => {
  // Active activity input state per day
  const [activeActivityInputDay, setActiveActivityInputDay] = useState<number | null>(null);
  const [newActivityText, setNewActivityText] = useState('');

  // Sync itinerary whenever durationDays changes
  const targetDays = Math.max(1, Number(formData.durationDays) || formData.itinerary?.length || 1);

  useEffect(() => {
    if (formData.itinerary?.length !== targetDays && targetDays > 0) {
      updateForm({
        itinerary: syncItineraryDays(formData.itinerary, targetDays),
      });
    }
  }, [formData.durationDays, targetDays, formData.itinerary, updateForm]);

  const handleUpdateDay = (index: number, partialDay: Partial<ItineraryDay>) => {
    const updatedItinerary = formData.itinerary.map((day, idx) =>
      idx === index ? { ...day, ...partialDay } : day
    );
    updateForm({ itinerary: updatedItinerary });
  };

  const handleToggleMeal = (dayIndex: number, meal: string) => {
    const day = formData.itinerary[dayIndex];
    const currentMeals = day.meals || [];
    const exists = currentMeals.includes(meal);
    const newMeals = exists
      ? currentMeals.filter((m) => m !== meal)
      : [...currentMeals, meal];
    handleUpdateDay(dayIndex, { meals: newMeals });
  };

  const handleAddDay = () => {
    const newDayNumber = formData.itinerary.length + 1;
    const newDay = createDefaultItineraryDay(newDayNumber, newDayNumber);
    const updated = [...formData.itinerary, newDay];
    updateForm({
      itinerary: updated,
      durationDays: newDayNumber,
      durationNights: Math.max(0, newDayNumber - 1),
    });
  };

  const handleRemoveDay = (index: number) => {
    if (formData.itinerary.length <= 1) return;
    const updated = formData.itinerary
      .filter((_, idx) => idx !== index)
      .map((day, idx) => ({ ...day, day: idx + 1 }));
    updateForm({
      itinerary: updated,
      durationDays: updated.length,
      durationNights: Math.max(0, updated.length - 1),
    });
  };

  const handleAddActivity = (dayIndex: number) => {
    const trimmed = newActivityText.trim();
    if (trimmed) {
      const day = formData.itinerary[dayIndex];
      const currentActivities = day.activities || [];
      if (!currentActivities.includes(trimmed)) {
        handleUpdateDay(dayIndex, { activities: [...currentActivities, trimmed] });
      }
      setNewActivityText('');
      setActiveActivityInputDay(null);
    }
  };

  const handleRemoveActivity = (dayIndex: number, actIndex: number) => {
    const day = formData.itinerary[dayIndex];
    const currentActivities = day.activities || [];
    handleUpdateDay(dayIndex, {
      activities: currentActivities.filter((_, i) => i !== actIndex),
    });
  };

  return (
    <StepContentArea>
      {/* Day-by-Day Experience Header & Cards */}
      <DayExperienceContainer>
        <FieldLabel as="div" className="pb-1">
          <span className="flex items-center gap-1.5 text-gray-800">
            <CalendarDays className="w-3.5 h-3.5 text-amber-500" />
            Day-by-Day Experience <RequiredAsterisk>*</RequiredAsterisk>
          </span>
          <AddDayTextButton type="button" onClick={handleAddDay}>
            <Plus className="w-3.5 h-3.5" /> ADD DAY
          </AddDayTextButton>
        </FieldLabel>

        {formData.itinerary.map((day, idx) => (
          <DayCardBox key={day.day}>
            {/* Top Row: Day 1 Badge + Title input + Delete button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <DayBadgeSquircle>Day {day.day}</DayBadgeSquircle>

              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="Title for this day..."
                  value={day.title || ''}
                  onChange={(e) =>
                    handleUpdateDay(idx, { title: e.target.value })
                  }
                  className="w-full bg-white border border-gray-200/90 rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-gray-800 placeholder-gray-400 outline-none shadow-2xs focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                />
              </div>

              {formData.itinerary.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveDay(idx)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer rounded-xl hover:bg-red-50 shrink-0"
                  aria-label={`Delete day ${day.day}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Description Textarea */}
            <div>
              <FieldTextarea
                rows={2}
                placeholder="What will travelers do on this day?"
                value={day.description || ''}
                onChange={(e) =>
                  handleUpdateDay(idx, { description: e.target.value })
                }
                className="!min-h-[5.5rem] !text-xs !py-3 !px-4 !bg-white !rounded-2xl !border-gray-200/90 shadow-2xs focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
              />
            </div>

            {/* Accommodation Input */}
            <div>
              <DaySectionLabel htmlFor={`stay-day-${day.day}`}>
                <Home className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>ACCOMMODATION</span>
              </DaySectionLabel>
              <input
                id={`stay-day-${day.day}`}
                type="text"
                placeholder="e.g., Hotel / Camp / Homestay at Manali"
                value={day.accommodation || ''}
                onChange={(e) =>
                  handleUpdateDay(idx, { accommodation: e.target.value })
                }
                className="w-full bg-white border border-gray-200/90 rounded-2xl px-4 py-2.5 text-xs font-semibold text-gray-800 placeholder-gray-400 outline-none shadow-2xs focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
              />
            </div>

            {/* Bottom Row: Meals & Activities */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-gray-100">
              {/* Meals Toggle */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mr-1 flex items-center gap-1">
                  <Utensils className="w-3 h-3 text-amber-500" />
                  MEALS:
                </span>
                {AVAILABLE_MEALS.map((meal) => {
                  const isChecked = day.meals?.includes(meal);
                  return (
                    <MealPillButton
                      type="button"
                      key={meal}
                      $selected={Boolean(isChecked)}
                      onClick={() => handleToggleMeal(idx, meal)}
                    >
                      {isChecked ? `✓ ${meal.toUpperCase()}` : meal.toUpperCase()}
                    </MealPillButton>
                  );
                })}
              </div>

              {/* Activities */}
              <div className="flex items-center gap-1.5 flex-wrap sm:justify-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mr-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  ACTIVITIES
                </span>
                {day.activities?.map((act, actIdx) => (
                  <span
                    key={actIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold"
                  >
                    {act}
                    <button
                      type="button"
                      onClick={() => handleRemoveActivity(idx, actIdx)}
                      className="hover:text-red-600 cursor-pointer ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {activeActivityInputDay === day.day ? (
                  <div className="inline-flex items-center gap-1">
                    <input
                      type="text"
                      placeholder="e.g. Trekking"
                      value={newActivityText}
                      onChange={(e) =>
                        setNewActivityText(filterAlphanumeric(e.target.value))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddActivity(idx);
                        }
                      }}
                      className="px-2 py-1 bg-white border border-amber-300 rounded-lg text-xs font-semibold outline-none w-28"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => handleAddActivity(idx)}
                      className="px-2 py-1 bg-amber-400 hover:bg-amber-500 text-black rounded-lg text-[10px] font-black uppercase cursor-pointer"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveActivityInputDay(null);
                        setNewActivityText('');
                      }}
                      className="text-gray-400 hover:text-gray-600 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveActivityInputDay(day.day);
                      setNewActivityText('');
                    }}
                    className="text-xs font-black uppercase tracking-wider text-amber-500 hover:text-amber-600 cursor-pointer flex items-center gap-0.5 transition-colors"
                  >
                    + ADD
                  </button>
                )}
              </div>
            </div>
          </DayCardBox>
        ))}
      </DayExperienceContainer>
    </StepContentArea>
  );
};
