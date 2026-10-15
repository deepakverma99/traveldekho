'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { PackageDetails } from './types';
import { typography } from '@/theme/typography';

interface TripPackageSectionProps {
  packageDetails: PackageDetails;
}

export const TripPackageSection: React.FC<TripPackageSectionProps> = ({
  packageDetails,
}) => {
  return (
    <section>
      <h2
        className="text-2xl md:text-3xl text-gray-900 mb-6 sm:mb-8"
        style={{ fontFamily: typography.fonts.caveat }}
      >
        What&apos;s in the Package?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Included Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-md flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest text-green-700">
              Included
            </h3>
          </div>

          <div className="space-y-2.5">
            {packageDetails.included.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 sm:p-3.5 bg-green-50/50 rounded-xl border border-green-100/50"
              >
                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 break-words flex-1 leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Excluded Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-500 rounded-md flex items-center justify-center">
              <X className="w-3 h-3 text-white" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest text-red-700">
              Excluded
            </h3>
          </div>

          <div className="space-y-2.5">
            {packageDetails.excluded.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 sm:p-3.5 bg-red-50/50 rounded-xl border border-red-100/50"
              >
                <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-500 break-words flex-1 leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
