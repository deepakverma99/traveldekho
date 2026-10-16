'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
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
import {
  useAppDispatch,
  useAppSelector,
  selectSearchFilters,
  setDestination,
  setBudget,
  toggleCategory as toggleCategoryAction,
  toggleDuration as toggleDurationAction,
  toggleDifficulty as toggleDifficultyAction,
  setSelectedDate,
} from '@/redux';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

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

const SidebarWrapper = styled.aside`
  width: 100%;
  background-color: ${colors.white};
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;
  overflow: hidden;
  height: fit-content;
  border: 1px solid ${colors.gray[100]};
`;

const SectionContainer = styled.div<{ $hasBorderTop?: boolean }>`
  padding-bottom: 1rem;
  padding-top: ${({ $hasBorderTop }) => ($hasBorderTop ? '1rem' : '0')};
  border-top: ${({ $hasBorderTop }) => ($hasBorderTop ? `1px solid ${colors.gray[100]}` : 'none')};
`;

const AccordionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
`;

const IconTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const SectionIconWrapper = styled.div<{ $bg: string; $color: string }>`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.5rem;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const SectionTitle = styled.span`
  font-size: 14px;
  font-weight: 800;
  color: ${colors.charcoal};
  font-family: ${typography.fonts.jakarta};
`;

const ChevronIcon = styled(ChevronDown)<{ $isOpen: boolean }>`
  width: 1rem;
  height: 1rem;
  color: ${colors.gray[500]};
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 1rem;
`;

const StyledTextInput = styled.input`
  width: 100%;
  height: 3rem;
  padding-left: 2.5rem;
  padding-right: 1rem;
  background-color: ${colors.gray[50]};
  border: 1px solid ${colors.gray[200]};
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  outline: none;
  color: ${colors.gray[800]};
  transition: all 0.2s ease;

  &::placeholder {
    color: ${colors.gray[400]};
  }

  &:focus {
    border-color: ${colors.amber[400]};
    background-color: ${colors.white};
  }
`;

const BudgetFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const StyledNumberInput = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 0 1rem;
  background-color: ${colors.gray[50]};
  border: 1px solid ${colors.gray[200]};
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  outline: none;
  color: ${colors.gray[800]};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${colors.amber[400]};
  }
`;

const ApplyButton = styled.button`
  height: 2.5rem;
  padding: 0 1rem;
  background-color: ${colors.amber[400]};
  color: ${colors.black};
  font-weight: 900;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.amber[500]};
  }
`;

const ChipsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const FilterChip = styled.button<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${typography.fonts.vietnam};

  ${({ $isSelected }) =>
    $isSelected
      ? `
    background-color: ${colors.amber[100]};
    border: 1px solid ${colors.amber[400]};
    color: ${colors.amber[900]};
    font-weight: 700;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  `
      : `
    background-color: transparent;
    border: 1px solid ${colors.gray[200]};
    color: ${colors.gray[700]};
    font-weight: 500;

    &:hover {
      background-color: ${colors.gray[50]};
    }
  `}
`;

const CalendarBox = styled.div`
  width: 100%;
  background-color: ${colors.white};
  border-radius: 1rem;
  border: 1px solid ${colors.gray[100]};
  padding: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-top: 1rem;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
`;

const MonthLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.charcoal};
  font-family: ${typography.fonts.jakarta};
`;

const CalendarArrowBtn = styled.button`
  padding: 0.25rem;
  border-radius: 9999px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${colors.gray[500]};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.gray[100]};
  }
`;

const CalendarDayButton = styled.button<{ $isSelected: boolean; $isHighlighted: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  font-size: 13px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${typography.fonts.vietnam};

  ${({ $isSelected, $isHighlighted }) =>
    $isSelected
      ? `
    background-color: ${colors.amber[500]};
    color: ${colors.white};
    font-weight: 700;
    box-shadow: 0 0 0 2px ${colors.amber[300]};
  `
      : $isHighlighted
      ? `
    color: ${colors.amber[600]};
    font-weight: 700;
    box-shadow: 0 0 0 2px ${colors.amber[200]};
    background-color: transparent;

    &:hover {
      background-color: ${colors.amber[50]};
    }
  `
      : `
    color: ${colors.charcoal};
    background-color: transparent;

    &:hover {
      background-color: ${colors.gray[100]};
    }
  `}
`;

export const SearchFilterSidebar: React.FC<SearchFilterSidebarProps> = ({
  filters: propFilters,
  onFilterChange,
  className,
}) => {
  const dispatch = useAppDispatch();
  const reduxFilters = useAppSelector(selectSearchFilters);
  const filters = propFilters ?? reduxFilters;

  const [prevBudget, setPrevBudget] = useState<{
    min: number | null;
    max: number | null;
  }>({
    min: filters.minBudget,
    max: filters.maxBudget,
  });

  const [minBudgetInput, setMinBudgetInput] = useState<string>(
    filters.minBudget !== null && filters.minBudget !== undefined
      ? filters.minBudget.toString()
      : ''
  );
  const [maxBudgetInput, setMaxBudgetInput] = useState<string>(
    filters.maxBudget !== null && filters.maxBudget !== undefined
      ? filters.maxBudget.toString()
      : ''
  );

  // Synchronize local input state if filters change externally (e.g., reset or chip removed)
  if (
    prevBudget.min !== filters.minBudget ||
    prevBudget.max !== filters.maxBudget
  ) {
    setPrevBudget({ min: filters.minBudget, max: filters.maxBudget });
    setMinBudgetInput(
      filters.minBudget !== null && filters.minBudget !== undefined
        ? filters.minBudget.toString()
        : ''
    );
    setMaxBudgetInput(
      filters.maxBudget !== null && filters.maxBudget !== undefined
        ? filters.maxBudget.toString()
        : ''
    );
  }

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

  const handleDestinationChange = (val: string) => {
    if (onFilterChange) {
      onFilterChange({ ...filters, destination: val });
    } else {
      dispatch(setDestination(val));
    }
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

  const handleApplyBudget = () => {
    const min = minBudgetInput ? Number(minBudgetInput) : null;
    const max = maxBudgetInput ? Number(maxBudgetInput) : null;
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
    <SidebarWrapper className={className || ''}>
      {/* 1. Destination */}
      <SectionContainer>
        <AccordionButton
          type="button"
          onClick={() => toggleSection('destination')}
        >
          <IconTitleGroup>
            <SectionIconWrapper $bg={colors.red[50]} $color={colors.red[500]}>
              <MapPin className="w-4 h-4" />
            </SectionIconWrapper>
            <SectionTitle>
              Destination
            </SectionTitle>
          </IconTitleGroup>
          <ChevronIcon $isOpen={!!openSections.destination} />
        </AccordionButton>
        {openSections.destination && (
          <InputContainer>
            <StyledTextInput
              placeholder="Search a city..."
              type="text"
              value={filters.destination}
              onChange={(e) => handleDestinationChange(e.target.value)}
              autoComplete="off"
              name="location"
            />
            <MapPin
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: colors.gray[400] }}
            />
          </InputContainer>
        )}
      </SectionContainer>

      {/* 2. Budget (₹) */}
      <SectionContainer $hasBorderTop>
        <AccordionButton
          type="button"
          onClick={() => toggleSection('budget')}
        >
          <IconTitleGroup>
            <SectionIconWrapper $bg={colors.green[50]} $color={colors.green[600]}>
              <Wallet className="w-4 h-4" />
            </SectionIconWrapper>
            <SectionTitle>
              Budget (₹)
            </SectionTitle>
          </IconTitleGroup>
          <ChevronIcon $isOpen={!!openSections.budget} />
        </AccordionButton>
        {openSections.budget && (
          <BudgetFlex>
            <StyledNumberInput
              placeholder="Min"
              type="number"
              value={minBudgetInput}
              onChange={(e) => setMinBudgetInput(e.target.value)}
            />
            <span style={{ color: colors.gray[400], fontWeight: 700 }}>-</span>
            <StyledNumberInput
              placeholder="Max"
              type="number"
              value={maxBudgetInput}
              onChange={(e) => setMaxBudgetInput(e.target.value)}
            />
            <ApplyButton type="button" onClick={handleApplyBudget}>
              Apply
            </ApplyButton>
          </BudgetFlex>
        )}
      </SectionContainer>

      {/* 3. Trip Category */}
      <SectionContainer $hasBorderTop>
        <AccordionButton
          type="button"
          onClick={() => toggleSection('category')}
        >
          <IconTitleGroup>
            <SectionIconWrapper $bg={colors.amber[50]} $color={colors.amber[600]}>
              <Tags className="w-4 h-4" />
            </SectionIconWrapper>
            <SectionTitle>
              Trip Category
            </SectionTitle>
          </IconTitleGroup>
          <ChevronIcon $isOpen={!!openSections.category} />
        </AccordionButton>
        {openSections.category && (
          <ChipsWrap>
            {CATEGORIES.map((cat) => {
              const isSelected = filters.selectedCategories.includes(cat);
              return (
                <FilterChip
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  $isSelected={isSelected}
                >
                  <span>{cat}</span>
                </FilterChip>
              );
            })}
          </ChipsWrap>
        )}
      </SectionContainer>

      {/* 4. Duration */}
      <SectionContainer $hasBorderTop>
        <AccordionButton
          type="button"
          onClick={() => toggleSection('duration')}
        >
          <IconTitleGroup>
            <SectionIconWrapper $bg={colors.blue[50]} $color={colors.blue[600]}>
              <Clock className="w-4 h-4" />
            </SectionIconWrapper>
            <SectionTitle>
              Duration
            </SectionTitle>
          </IconTitleGroup>
          <ChevronIcon $isOpen={!!openSections.duration} />
        </AccordionButton>
        {openSections.duration && (
          <ChipsWrap>
            {DURATIONS.map((dur) => {
              const isSelected = filters.selectedDurations.includes(dur);
              return (
                <FilterChip
                  key={dur}
                  type="button"
                  onClick={() => toggleDuration(dur)}
                  $isSelected={isSelected}
                >
                  <span>{dur}</span>
                </FilterChip>
              );
            })}
          </ChipsWrap>
        )}
      </SectionContainer>

      {/* 5. Difficulty */}
      <SectionContainer $hasBorderTop>
        <AccordionButton
          type="button"
          onClick={() => toggleSection('difficulty')}
        >
          <IconTitleGroup>
            <SectionIconWrapper $bg={colors.red[50]} $color={colors.red[500]}>
              <Mountain className="w-4 h-4" />
            </SectionIconWrapper>
            <SectionTitle>
              Difficulty
            </SectionTitle>
          </IconTitleGroup>
          <ChevronIcon $isOpen={!!openSections.difficulty} />
        </AccordionButton>
        {openSections.difficulty && (
          <ChipsWrap>
            {DIFFICULTIES.map((diff) => {
              const isSelected = filters.selectedDifficulties.includes(diff);
              return (
                <FilterChip
                  key={diff}
                  type="button"
                  onClick={() => toggleDifficulty(diff)}
                  $isSelected={isSelected}
                >
                  <span>{diff}</span>
                </FilterChip>
              );
            })}
          </ChipsWrap>
        )}
      </SectionContainer>

      {/* 6. Departure Date */}
      <SectionContainer $hasBorderTop>
        <AccordionButton
          type="button"
          onClick={() => toggleSection('departureDate')}
        >
          <IconTitleGroup>
            <SectionIconWrapper $bg={colors.blue[50]} $color={colors.blue[500]}>
              <CalendarIcon className="w-4 h-4" />
            </SectionIconWrapper>
            <SectionTitle>
              Departure Date
            </SectionTitle>
          </IconTitleGroup>
          <ChevronIcon $isOpen={!!openSections.departureDate} />
        </AccordionButton>
        {openSections.departureDate && (
          <CalendarBox>
            {/* Calendar Month Header */}
            <CalendarHeader>
              <CalendarArrowBtn
                type="button"
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </CalendarArrowBtn>
              <MonthLabel>
                October 2026
              </MonthLabel>
              <CalendarArrowBtn
                type="button"
                aria-label="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </CalendarArrowBtn>
            </CalendarHeader>

            {/* Day of Week Headers */}
            <div className="grid grid-cols-7 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <div
                  key={d}
                  className="text-center text-[12px] font-medium py-1"
                  style={{ color: colors.gray[400] }}
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
                  className="flex justify-center items-center h-8 text-[13px] cursor-default"
                  style={{
                    fontFamily: typography.fonts.vietnam,
                    color: colors.gray[300],
                  }}
                >
                  {prevDay}
                </div>
              ))}

              {/* Days 1 to 13 (disabled/past) */}
              {Array.from({ length: 13 }, (_, i) => i + 1).map((day) => (
                <div
                  key={`past-${day}`}
                  className="flex justify-center items-center h-8 text-[13px] cursor-not-allowed line-through"
                  style={{
                    fontFamily: typography.fonts.vietnam,
                    color: colors.gray[300],
                  }}
                >
                  {day}
                </div>
              ))}

              {/* Active departure days from 14 to 31 */}
              {Array.from({ length: 18 }, (_, i) => i + 14).map((day) => {
                const isSelected = filters.selectedDate === day;
                const isHighlighted = day === 14;

                return (
                  <CalendarDayButton
                    key={`day-${day}`}
                    type="button"
                    onClick={() => handleDateClick(day)}
                    $isSelected={isSelected}
                    $isHighlighted={isHighlighted}
                  >
                    {day}
                  </CalendarDayButton>
                );
              })}

              {/* Next month trailing days */}
              {[1, 2, 3, 4, 5, 6, 7].map((nextDay) => (
                <div
                  key={`next-${nextDay}`}
                  className="flex justify-center items-center h-8 text-[13px] cursor-default"
                  style={{
                    fontFamily: typography.fonts.vietnam,
                    color: colors.gray[300],
                  }}
                >
                  {nextDay}
                </div>
              ))}
            </div>
          </CalendarBox>
        )}
      </SectionContainer>
    </SidebarWrapper>
  );
};

