'use client';

import React, { useState } from 'react';
import {
  Wallet,
  Tags,
  Clock,
  Mountain,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { FilterState } from './types';
import { BudgetTrackbar } from './BudgetTrackbar';
import {
  useAppDispatch,
  useAppSelector,
  selectSearchFilters,
  setBudget,
  toggleCategory as toggleCategoryAction,
  toggleDuration as toggleDurationAction,
  toggleDifficulty as toggleDifficultyAction,
  setSelectedDate,
} from '@/redux';

export interface SearchFilterSidebarProps {
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  onResetFilters?: () => void;
  className?: string;
}

const CATEGORIES = [
  'Budget Friendly',
  'Weekend Escapes',
  'Explore Offbeat',
  'Mountains',
  'Hike',
  'Beach',
  'Spiritual',
  'Heritage',
  'Educational Trips',
];

const DURATIONS = ['1-3 Days', '4-7 Days', '8+ Days'];

const DIFFICULTIES = ['Easy', 'Moderate', 'Challenging', 'Extreme'];

export const SearchFilterSidebar: React.FC<SearchFilterSidebarProps> = ({
  filters: propFilters,
  onFilterChange,
  className,
}) => {
  const dispatch = useAppDispatch();
  const reduxFilters = useAppSelector(selectSearchFilters);
  const filters = propFilters ?? reduxFilters;

  // Accordion state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    budget: true,
    category: true,
    duration: true,
    difficulty: true,
    departureDate: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCategory = (category: string) => {
    if (onFilterChange) {
      const updated = filters.selectedCategories.includes(category)
        ? filters.selectedCategories.filter((c) => c !== category)
        : [...filters.selectedCategories, category];
      onFilterChange({ ...filters, selectedCategories: updated });
    } else {
      dispatch(toggleCategoryAction(category));
    }
  };

  const toggleDuration = (duration: string) => {
    if (onFilterChange) {
      const updated = filters.selectedDurations.includes(duration)
        ? filters.selectedDurations.filter((d) => d !== duration)
        : [...filters.selectedDurations, duration];
      onFilterChange({ ...filters, selectedDurations: updated });
    } else {
      dispatch(toggleDurationAction(duration));
    }
  };

  const toggleDifficulty = (difficulty: string) => {
    if (onFilterChange) {
      const updated = filters.selectedDifficulties.includes(difficulty)
        ? filters.selectedDifficulties.filter((d) => d !== difficulty)
        : [...filters.selectedDifficulties, difficulty];
      onFilterChange({ ...filters, selectedDifficulties: updated });
    } else {
      dispatch(toggleDifficultyAction(difficulty));
    }
  };

  const handleBudgetChange = (min: number | null, max: number | null) => {
    if (onFilterChange) {
      onFilterChange({
        ...filters,
        minBudget: min,
        maxBudget: max,
      });
    } else {
      dispatch(setBudget({ min, max }));
    }
  };

  const handleDateClick = (day: number) => {
    const isSelected = filters.selectedDate === day;
    const newDate = isSelected ? null : day;
    if (onFilterChange) {
      onFilterChange({
        ...filters,
        selectedDate: newDate,
      });
    } else {
      dispatch(setSelectedDate(newDate));
    }
  };

  return (
    <aside
      className={`w-full bg-white rounded-2xl shadow-xs p-4.5 overflow-hidden h-fit border border-gray-200 ${
        className || ''
      }`}
    >
      {/* 1. Budget (₹) */}
      <div className="pb-4">
        <button
          type="button"
          onClick={() => toggleSection('budget')}
          className="flex items-center justify-between w-full text-left cursor-pointer bg-transparent border-none p-0"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Wallet className="w-4 h-4" />
            </div>
            <span className="text-sm font-extrabold text-charcoal font-jakarta">
              Budget (₹)
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              openSections.budget ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
        {openSections.budget && (
          <BudgetTrackbar
            minBudget={filters.minBudget}
            maxBudget={filters.maxBudget}
            onChange={handleBudgetChange}
          />
        )}
      </div>

      {/* 2. Trip Category */}
      <div className="pb-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left cursor-pointer bg-transparent border-none p-0"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Tags className="w-4 h-4" />
            </div>
            <span className="text-sm font-extrabold text-charcoal font-jakarta">
              Trip Category
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              openSections.category ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
        {openSections.category && (
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {CATEGORIES.map((cat) => {
              const isSelected = filters.selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`flex items-center gap-1 py-1.5 px-2.5 rounded-full text-[11px] cursor-pointer transition-all duration-200 font-vietnam ${
                    isSelected
                      ? 'bg-charcoal border border-charcoal text-white font-bold shadow-xs hover:bg-black hover:border-black'
                      : 'bg-transparent border border-gray-200 text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900'
                  }`}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Duration */}
      <div className="pb-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => toggleSection('duration')}
          className="flex items-center justify-between w-full text-left cursor-pointer bg-transparent border-none p-0"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-sm font-extrabold text-charcoal font-jakarta">
              Duration
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              openSections.duration ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
        {openSections.duration && (
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {DURATIONS.map((dur) => {
              const isSelected = filters.selectedDurations.includes(dur);
              return (
                <button
                  key={dur}
                  type="button"
                  onClick={() => toggleDuration(dur)}
                  className={`flex items-center gap-1 py-1.5 px-2.5 rounded-full text-[11px] cursor-pointer transition-all duration-200 font-vietnam ${
                    isSelected
                      ? 'bg-charcoal border border-charcoal text-white font-bold shadow-xs hover:bg-black hover:border-black'
                      : 'bg-transparent border border-gray-200 text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900'
                  }`}
                >
                  <span>{dur}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Difficulty */}
      <div className="pb-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => toggleSection('difficulty')}
          className="flex items-center justify-between w-full text-left cursor-pointer bg-transparent border-none p-0"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <Mountain className="w-4 h-4" />
            </div>
            <span className="text-sm font-extrabold text-charcoal font-jakarta">
              Difficulty
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              openSections.difficulty ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
        {openSections.difficulty && (
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {DIFFICULTIES.map((diff) => {
              const isSelected = filters.selectedDifficulties.includes(diff);
              return (
                <button
                  key={diff}
                  type="button"
                  onClick={() => toggleDifficulty(diff)}
                  className={`flex items-center gap-1 py-1.5 px-2.5 rounded-full text-[11px] cursor-pointer transition-all duration-200 font-vietnam ${
                    isSelected
                      ? 'bg-charcoal border border-charcoal text-white font-bold shadow-xs hover:bg-black hover:border-black'
                      : 'bg-transparent border border-gray-200 text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900'
                  }`}
                >
                  <span>{diff}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Departure Date */}
      <div className="pb-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => toggleSection('departureDate')}
          className="flex items-center justify-between w-full text-left cursor-pointer bg-transparent border-none p-0"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <span className="text-sm font-extrabold text-charcoal font-jakarta">
              Departure Date
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              openSections.departureDate ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
        {openSections.departureDate && (
          <div className="w-full bg-white rounded-2xl border border-gray-100 p-4 shadow-xs mt-4">
            {/* Calendar Month Header */}
            <div className="flex justify-between items-center mb-4 px-2">
              <button
                type="button"
                aria-label="Previous Month"
                className="p-1 rounded-full border-none bg-transparent cursor-pointer text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold text-charcoal font-jakarta">
                October 2026
              </span>
              <button
                type="button"
                aria-label="Next Month"
                className="p-1 rounded-full border-none bg-transparent cursor-pointer text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Day of Week Headers */}
            <div className="grid grid-cols-7 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <div
                  key={d}
                  className="text-center text-[12px] font-medium py-1 text-gray-400"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day Numbers Grid */}
            <div className="grid grid-cols-7 gap-y-1">
              {/* Previous month leading days */}
              {[27, 28, 29, 30].map((prevDay) => (
                <div
                  key={`prev-${prevDay}`}
                  className="flex justify-center items-center h-8 text-[13px] cursor-default font-vietnam text-gray-300"
                >
                  {prevDay}
                </div>
              ))}

              {/* Days 1 to 13 (disabled/past) */}
              {Array.from({ length: 13 }, (_, i) => i + 1).map((day) => (
                <div
                  key={`past-${day}`}
                  className="flex justify-center items-center h-8 text-[13px] cursor-not-allowed line-through font-vietnam text-gray-300"
                >
                  {day}
                </div>
              ))}

              {/* Active departure days from 14 to 31 */}
              {Array.from({ length: 18 }, (_, i) => i + 14).map((day) => {
                const isSelected = filters.selectedDate === day;
                const isHighlighted = day === 14;

                return (
                  <button
                    key={`day-${day}`}
                    type="button"
                    onClick={() => handleDateClick(day)}
                    className={`flex justify-center items-center h-8 text-[13px] rounded-full border-none cursor-pointer transition-all duration-200 font-vietnam ${
                      isSelected
                        ? 'bg-amber-500 text-white font-bold ring-2 ring-amber-300'
                        : isHighlighted
                        ? 'text-amber-600 font-bold ring-2 ring-amber-200 hover:bg-amber-50'
                        : 'text-charcoal hover:bg-gray-100'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}

              {/* Next month trailing days */}
              {[1, 2, 3, 4, 5, 6, 7].map((nextDay) => (
                <div
                  key={`next-${nextDay}`}
                  className="flex justify-center items-center h-8 text-[13px] cursor-default font-vietnam text-gray-300"
                >
                  {nextDay}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
