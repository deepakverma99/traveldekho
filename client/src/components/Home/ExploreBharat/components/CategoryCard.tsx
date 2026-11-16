'use client';

import React from 'react';
import Link from 'next/link';
import { colorTokens } from '@/theme';
import { ExploreCategoryItem } from '../types';
import { CategoryIcon } from './CategoryIcon';

interface CategoryCardProps {
  category: ExploreCategoryItem;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      href={category.href}
      style={{
        backgroundColor: colorTokens.surfacePure,
        borderColor: colorTokens.surfaceBorder,
      }}
      className="group relative flex items-center gap-3 px-4 py-3 sm:px-4.5 sm:py-3.5 rounded-2xl border shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-gray-300 transition-all duration-200 shrink-0 cursor-pointer select-none font-jakarta min-w-[200px] sm:min-w-[220px]"
    >
      {/* Real Travel Category Icon Badge */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-orange-50/90 border border-orange-100 text-orange-600 flex items-center justify-center shrink-0 shadow-xs transition-transform duration-200 group-hover:scale-105 group-hover:bg-orange-100/80">
        <CategoryIcon iconType={category.iconType} className="w-5 h-5 stroke-[2.2]" />
      </div>

      {/* Info Stack */}
      <div className="flex flex-col min-w-0">
        <span
          style={{ color: colorTokens.textPrimary }}
          className="text-[13px] sm:text-[14px] font-bold tracking-tight leading-snug group-hover:text-primary transition-colors truncate"
        >
          {category.name}
        </span>
        <span
          style={{ color: colorTokens.textTertiary }}
          className="text-[11px] sm:text-xs font-medium tracking-normal mt-0.5"
        >
          {category.countText}
        </span>
      </div>
    </Link>
  );
};
