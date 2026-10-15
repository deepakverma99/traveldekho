'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { typography } from '@/theme/typography';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = '',
  showHomeIcon = true,
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-xs sm:text-sm ${className}`}
      style={{ fontFamily: typography.fonts.jakarta }}
    >
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isHome = index === 0 && showHomeIcon;

          return (
            <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
              {index > 0 && (
                <ChevronRight
                  className="w-3.5 h-3.5 text-gray-400 shrink-0 select-none"
                  aria-hidden="true"
                />
              )}

              {isLast || !item.href ? (
                <span
                  aria-current="page"
                  className="font-bold text-amber-600 inline-flex items-center gap-1.5"
                >
                  {isHome && (item.icon || <Home className="w-3.5 h-3.5 text-amber-600" />)}
                  <span>{item.label}</span>
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="font-medium text-gray-500 hover:text-amber-600 transition-colors inline-flex items-center gap-1.5 group"
                >
                  {isHome && (
                    item.icon || (
                      <Home className="w-3.5 h-3.5 text-gray-400 group-hover:text-amber-600 transition-colors" />
                    )
                  )}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
