'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

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
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs sm:text-sm font-jakarta ${className}`}>
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isHome = index === 0 && showHomeIcon;

          return (
            <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0 select-none" aria-hidden="true" />
              )}

              {isLast || !item.href ? (
                <span aria-current="page" className="font-bold text-amber-600 inline-flex items-center gap-1.5 [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:text-amber-600">
                  {isHome && (item.icon || <Home />)}
                  <span>{item.label}</span>
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="font-medium text-gray-500 inline-flex items-center gap-1.5 transition-colors no-underline hover:text-amber-600 [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:text-gray-400 [&:hover>svg]:text-amber-600"
                >
                  {isHome && (item.icon || <Home />)}
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
