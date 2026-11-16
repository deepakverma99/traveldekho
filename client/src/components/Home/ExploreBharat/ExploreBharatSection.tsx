'use client';

import React from 'react';
import { colorTokens } from '@/theme';
import { ExploreBharatSectionProps } from './types';
import { useExploreBharat } from './hooks';
import {
  ExploreCategoryCarousel,
  ExploreBharatHeader,
  StateCard,
} from './components';

export const ExploreBharatSection: React.FC<ExploreBharatSectionProps> = ({
  id = 'explore-bharat-section',
  className = '',
}) => {
  const { isExpanded, toggleExpanded, displayedStates } = useExploreBharat();

  return (
    <section
      id={id}
      style={{ backgroundColor: colorTokens.surfacePure }}
      className={`relative w-full py-10 md:py-14 overflow-hidden font-sans z-10 ${className}`.trim()}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Explore by Category Section */}
        <ExploreCategoryCarousel />

        {/* 2. Explore Bharat Header */}
        <ExploreBharatHeader
          isExpanded={isExpanded}
          onToggleExpanded={toggleExpanded}
        />

        {/* 3. States Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {displayedStates.map((state) => (
            <StateCard key={state.id} state={state} />
          ))}
        </div>
      </div>
    </section>
  );
};
