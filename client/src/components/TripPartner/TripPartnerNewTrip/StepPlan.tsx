'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, X, CalendarDays, Home, Utensils, Sparkles } from 'lucide-react';
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
        itinerary: syncItineraryDays(formData.itinerary || [], targetDays),
      });
    }
  }, [targetDays, formData.itinerary, updateForm]);

  const handleUpdateDay = (index: number, partial: Partial<ItineraryDay>) => {
    const updated = [...formData.itinerary];
    updated[index] = { ...updated[index], ...partial };
    updateForm({ itinerary: updated });
  };

  const handleAddDay = () => {
    const nextDayNum = formData.itinerary.length + 1;
    const newDay = createDefaultItineraryDay(nextDayNum);
    updateForm({
      itinerary: [...formData.itinerary, newDay],
      durationDays: String(nextDayNum),
    });
  };

  const handleRemoveDay = (index: number) => {
    if (formData.itinerary.length <= 1) return;
    const filtered = formData.itinerary
      .filter((_, idx) => idx !== index)
      .map((day, idx) => ({ ...day, day: idx + 1 }));
    updateForm({
      itinerary: filtered,
      durationDays: String(filtered.length),
    });
  };

  const handleToggleMeal = (dayIndex: number, meal: string) => {
    const day = formData.itinerary[dayIndex];
    const currentMeals = day.meals || [];
    const isChecked = currentMeals.includes(meal);
    const updatedMeals = isChecked
      ? currentMeals.filter((m) => m !== meal)
      : [...currentMeals, meal];

    handleUpdateDay(dayIndex, { meals: updatedMeals });
  };

  const handleAddActivity = (dayIndex: number) => {
    const trimmed = newActivityText.trim();
    if (!trimmed) return;

    const day = formData.itinerary[dayIndex];
    const currentActivities = day.activities || [];
    if (!currentActivities.includes(trimmed)) {
      handleUpdateDay(dayIndex, {
        activities: [...currentActivities, trimmed],
      });
    }

    setNewActivityText('');
    setActiveActivityInputDay(null);
  };

  const handleRemoveActivity = (dayIndex: number, actIndex: number) => {
    const day = formData.itinerary[dayIndex];
    const currentActivities = day.activities || [];
    handleUpdateDay(dayIndex, {
      activities: currentActivities.filter((_, i) => i !== actIndex),
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 sm:gap-7 font-jakarta">
      {/* Day-by-Day Experience Header & Cards */}
      <div className="flex flex-col gap-5 pt-2">
        <div className="text-[11.5px] font-black uppercase tracking-wider text-gray-700 flex items-center justify-between pb-1">
          <span className="flex items-center gap-1.5 text-gray-800">
            <CalendarDays className="w-3.5 h-3.5 text-amber-500" />
            Day-by-Day Experience <span className="text-red-500 ml-1 font-bold inline">*</span>
          </span>
          <button
            type="button"
            onClick={handleAddDay}
            className="inline-flex items-center gap-1 text-xs font-black tracking-wide uppercase text-amber-500 hover:text-amber-600 bg-transparent border-none cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-3.5 h-3.5" /> ADD DAY
          </button>
        </div>

        {formData.itinerary.map((day, idx) => (
          <div
            key={day.day}
            className="bg-gray-50/70 hover:border-amber-300 border border-gray-200 rounded-3xl p-4 sm:p-6 flex flex-col gap-4 shadow-2xs transition-all duration-200"
          >
            {/* Top Row: Day 1 Badge + Title input + Delete button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="min-w-14 sm:min-w-18 h-9 sm:h-11 px-2 sm:px-3.5 rounded-xl sm:rounded-2xl bg-amber-500 text-charcoal font-black text-xs sm:text-[13px] tracking-wide flex items-center justify-center shrink-0 whitespace-nowrap shadow-[0_2px_6px_rgba(250,203,43,0.35)]">
                Day {day.day}
              </div>

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
              <textarea
                rows={2}
                placeholder="What will travelers do on this day?"
                value={day.description || ''}
                onChange={(e) =>
                  handleUpdateDay(idx, { description: e.target.value })
                }
                className="w-full !min-h-[5.5rem] !text-xs !py-3 !px-4 !bg-white !rounded-2xl !border !border-gray-200/90 shadow-2xs focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all outline-none resize-y text-gray-900 font-medium font-jakarta"
              />
            </div>

            {/* Accommodation Input */}
            <div>
              <label htmlFor={`stay-day-${day.day}`} className="inline-flex items-center gap-1.5 text-[11px] font-black tracking-wider uppercase text-gray-700 mb-1.5">
                <Home className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>ACCOMMODATION</span>
              </label>
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
                    <button
                      type="button"
                      key={meal}
                      onClick={() => handleToggleMeal(idx, meal)}
                      className={`py-1.5 px-3.5 rounded-xl text-[11px] font-extrabold tracking-wide uppercase cursor-pointer transition-all duration-150 ${
                        isChecked
                          ? 'bg-amber-500 text-charcoal border border-amber-500 shadow-xs'
                          : 'bg-white text-gray-400 border border-gray-200 hover:border-gray-300 hover:text-gray-600'
                      }`}
                    >
                      {isChecked ? `✓ ${meal.toUpperCase()}` : meal.toUpperCase()}
                    </button>
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
          </div>
        ))}
      </div>
    </div>
  );
};
