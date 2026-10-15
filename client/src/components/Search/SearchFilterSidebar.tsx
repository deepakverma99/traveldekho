'use client';

import React, { useState } from 'react';
import {
  MapPin,
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
import { typography } from '@/theme/typography';

export interface SearchFilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
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
  filters,
  onFilterChange,
  className,
}) => {
  const [minBudgetInput, setMinBudgetInput] = useState<string>(
    filters.minBudget ? filters.minBudget.toString() : ''
  );
  const [maxBudgetInput, setMaxBudgetInput] = useState<string>(
    filters.maxBudget ? filters.maxBudget.toString() : ''
  );

  // Accordion state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    destination: true,
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
    const updated = filters.selectedCategories.includes(category)
      ? filters.selectedCategories.filter((c) => c !== category)
      : [...filters.selectedCategories, category];
    onFilterChange({ ...filters, selectedCategories: updated });
  };

  const toggleDuration = (duration: string) => {
    const updated = filters.selectedDurations.includes(duration)
      ? filters.selectedDurations.filter((d) => d !== duration)
      : [...filters.selectedDurations, duration];
    onFilterChange({ ...filters, selectedDurations: updated });
  };

  const toggleDifficulty = (difficulty: string) => {
    const updated = filters.selectedDifficulties.includes(difficulty)
      ? filters.selectedDifficulties.filter((d) => d !== difficulty)
      : [...filters.selectedDifficulties, difficulty];
    onFilterChange({ ...filters, selectedDifficulties: updated });
  };

  const handleApplyBudget = () => {
    onFilterChange({
      ...filters,
      minBudget: minBudgetInput ? Number(minBudgetInput) : null,
      maxBudget: maxBudgetInput ? Number(maxBudgetInput) : null,
    });
  };

  return (
    <aside
      className={`w-full bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.04)] p-6 overflow-hidden h-fit border border-gray-100 ${
        className || ''
      }`}
    >
      {/* 1. Destination */}
      <div className="pb-4">
        <button
          type="button"
          onClick={() => toggleSection('destination')}
          className="flex items-center justify-between w-full text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <span
              className="text-[14px] font-extrabold text-[#191c1d]"
              style={{ fontFamily: typography.fonts.jakarta }}
            >
              Destination
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              openSections.destination ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.destination && (
          <div className="mt-4">
            <div className="relative w-full">
              <input
                className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-amber-400 focus:bg-white transition-all text-gray-800 placeholder:text-gray-400"
                placeholder="Search a city..."
                type="text"
                value={filters.destination}
                onChange={(e) =>
                  onFilterChange({ ...filters, destination: e.target.value })
                }
                autoComplete="off"
                name="location"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* 2. Budget (₹) */}
      <div className="border-t border-gray-100 py-4">
        <button
          type="button"
          onClick={() => toggleSection('budget')}
          className="flex items-center justify-between w-full text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Wallet className="w-4 h-4" />
            </div>
            <span
              className="text-[14px] font-extrabold text-[#191c1d]"
              style={{ fontFamily: typography.fonts.jakarta }}
            >
              Budget (₹)
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              openSections.budget ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.budget && (
          <div className="mt-4">
            <div className="flex items-center gap-3">
              <input
                placeholder="Min"
                className="w-full h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-amber-400 transition-all text-gray-800"
                type="number"
                value={minBudgetInput}
                onChange={(e) => setMinBudgetInput(e.target.value)}
              />
              <span className="text-gray-400 font-bold">-</span>
              <input
                placeholder="Max"
                className="w-full h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-amber-400 transition-all text-gray-800"
                type="number"
                value={maxBudgetInput}
                onChange={(e) => setMaxBudgetInput(e.target.value)}
              />
              <button
                type="button"
                onClick={handleApplyBudget}
                className="h-10 px-4 bg-amber-400 text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-amber-500 transition-colors cursor-pointer shrink-0"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Trip Category */}
      <div className="border-t border-gray-100 py-4">
        <button
          type="button"
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
              <Tags className="w-4 h-4" />
            </div>
            <span
              className="text-[14px] font-extrabold text-[#191c1d]"
              style={{ fontFamily: typography.fonts.jakarta }}
            >
              Trip Category
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              openSections.category ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.category && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = filters.selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold shadow-xs'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                    style={{ fontFamily: typography.fonts.vietnam }}
                  >
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. Duration */}
      <div className="border-t border-gray-100 py-4">
        <button
          type="button"
          onClick={() => toggleSection('duration')}
          className="flex items-center justify-between w-full text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <span
              className="text-[14px] font-extrabold text-[#191c1d]"
              style={{ fontFamily: typography.fonts.jakarta }}
            >
              Duration
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              openSections.duration ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.duration && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map((dur) => {
                const isSelected = filters.selectedDurations.includes(dur);
                return (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => toggleDuration(dur)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold shadow-xs'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                    style={{ fontFamily: typography.fonts.vietnam }}
                  >
                    <span>{dur}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 5. Difficulty */}
      <div className="border-t border-gray-100 py-4">
        <button
          type="button"
          onClick={() => toggleSection('difficulty')}
          className="flex items-center justify-between w-full text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
              <Mountain className="w-4 h-4" />
            </div>
            <span
              className="text-[14px] font-extrabold text-[#191c1d]"
              style={{ fontFamily: typography.fonts.jakarta }}
            >
              Difficulty
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              openSections.difficulty ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.difficulty && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map((diff) => {
                const isSelected = filters.selectedDifficulties.includes(diff);
                return (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => toggleDifficulty(diff)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold shadow-xs'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                    style={{ fontFamily: typography.fonts.vietnam }}
                  >
                    <span>{diff}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 6. Departure Date */}
      <div className="border-t border-gray-100 py-4">
        <button
          type="button"
          onClick={() => toggleSection('departureDate')}
          className="flex items-center justify-between w-full text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <span
              className="text-[14px] font-extrabold text-[#191c1d]"
              style={{ fontFamily: typography.fonts.jakarta }}
            >
              Departure Date
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              openSections.departureDate ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.departureDate && (
          <div className="mt-4">
            <div className="w-full bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              {/* Calendar Month Header */}
              <div className="flex justify-between items-center mb-4 px-2">
                <button
                  type="button"
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-500" />
                </button>
                <span
                  className="text-[14px] font-bold text-[#191c1d]"
                  style={{ fontFamily: typography.fonts.jakarta }}
                >
                  October 2026
                </span>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  aria-label="Next Month"
                >
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Day of Week Headers */}
              <div className="grid grid-cols-7 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                  <div
                    key={d}
                    className="text-center text-[12px] font-medium text-gray-400 py-1"
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
                    className="flex justify-center items-center h-8 text-[13px] text-gray-300 cursor-default"
                    style={{ fontFamily: typography.fonts.vietnam }}
                  >
                    {prevDay}
                  </div>
                ))}

                {/* Days 1 to 13 (disabled/past) */}
                {Array.from({ length: 13 }, (_, i) => i + 1).map((day) => (
                  <div
                    key={`past-${day}`}
                    className="flex justify-center items-center h-8 text-[13px] text-gray-300 cursor-not-allowed line-through"
                    style={{ fontFamily: typography.fonts.vietnam }}
                  >
                    {day}
                  </div>
                ))}

                {/* Active departure days from 14 to 31 */}
                {Array.from({ length: 18 }, (_, i) => i + 14).map((day) => {
                  const isSelected = filters.selectedDate === day;
                  const isHighlighted = day === 14; // Current day highlight as in HTML

                  return (
                    <button
                      key={`day-${day}`}
                      type="button"
                      onClick={() =>
                        onFilterChange({
                          ...filters,
                          selectedDate: isSelected ? null : day,
                        })
                      }
                      className={`flex justify-center items-center h-8 text-[13px] transition-colors rounded-full cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-white font-bold ring-2 ring-amber-300 shadow-sm'
                          : isHighlighted
                          ? 'text-amber-600 font-bold ring-2 ring-amber-200 hover:bg-amber-50'
                          : 'text-[#191c1d] hover:bg-gray-100'
                      }`}
                      style={{ fontFamily: typography.fonts.vietnam }}
                    >
                      {day}
                    </button>
                  );
                })}

                {/* Next month trailing days */}
                {[1, 2, 3, 4, 5, 6, 7].map((nextDay) => (
                  <div
                    key={`next-${nextDay}`}
                    className="flex justify-center items-center h-8 text-[13px] text-gray-300 cursor-default"
                    style={{ fontFamily: typography.fonts.vietnam }}
                  >
                    {nextDay}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
