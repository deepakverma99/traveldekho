'use client';

import React from 'react';
import { Plus, Trash2, BedDouble, ChevronDown } from 'lucide-react';
import { FormGroup, FieldLabelRow, AddItemLinkButton } from './styles';
import {
  OccupancyPricingOption,
  ROOM_SHARING_OPTIONS,
  RoomSharingType,
  filterOnlyNumbers,
} from './types';

export interface OccupancyPricingFieldProps {
  options: OccupancyPricingOption[];
  onChange: (options: OccupancyPricingOption[]) => void;
  className?: string;
}

const normalizeSharingType = (type: string): RoomSharingType => {
  if (ROOM_SHARING_OPTIONS.includes(type as RoomSharingType)) {
    return type as RoomSharingType;
  }
  const lower = (type || '').toLowerCase();
  if (lower.includes('single')) return 'Single';
  if (lower.includes('double')) return 'Double';
  if (lower.includes('triple')) return 'Triple';
  if (lower.includes('dorm')) return 'Dormitory';
  return 'Double';
};

export const OccupancyPricingField: React.FC<OccupancyPricingFieldProps> = ({
  options = [],
  onChange,
  className = '',
}) => {
  const activeOptions = React.useMemo(() => {
    return options && options.length > 0
      ? options
      : [
          { id: 'opt-1', sharingType: 'Triple', price: 0, discountPercent: 0 },
          { id: 'opt-2', sharingType: 'Double', price: 0, discountPercent: 0 },
        ];
  }, [options]);

  const canAddOption = activeOptions.length < ROOM_SHARING_OPTIONS.length;

  const handleAddOption = () => {
    const usedTypes = activeOptions.map((o) => normalizeSharingType(o.sharingType));
    const nextAvailable =
      ROOM_SHARING_OPTIONS.find((opt) => !usedTypes.includes(opt)) ||
      ROOM_SHARING_OPTIONS[0];

    const newOption: OccupancyPricingOption = {
      id: `opt-${Date.now()}`,
      sharingType: nextAvailable,
      price: 0,
      discountPercent: 0,
    };
    onChange([...activeOptions, newOption]);
  };

  const handleUpdateOption = (
    id: string,
    partial: Partial<OccupancyPricingOption>
  ) => {
    const updated = activeOptions.map((opt) =>
      opt.id === id ? { ...opt, ...partial } : opt
    );
    onChange(updated);
  };

  const handleRemoveOption = (id: string) => {
    if (activeOptions.length <= 1) {
      onChange([
        { id: 'opt-1', sharingType: 'Double', price: 0, discountPercent: 0 },
      ]);
      return;
    }
    onChange(activeOptions.filter((opt) => opt.id !== id));
  };

  // Calculate the least price among all options after discount
  const leastPriceInfo = React.useMemo(() => {
    const calculated = activeOptions.map((opt) => {
      const base = Number(opt.price) || 0;
      const disc = Number(opt.discountPercent) || 0;
      const finalPrice =
        base > 0 ? Math.max(0, Math.round(base * (1 - disc / 100))) : 0;
      return {
        sharingType: normalizeSharingType(opt.sharingType),
        basePrice: base,
        discountPercent: disc,
        finalPrice,
      };
    });

    const validOptions = calculated.filter((o) => o.finalPrice > 0);
    if (validOptions.length === 0) {
      const fallback = calculated.find((o) => o.basePrice > 0) || calculated[0];
      return {
        leastPrice: fallback?.basePrice || 0,
        originalBasePrice: fallback?.basePrice || 0,
        sharingType: fallback?.sharingType || '',
        discountPercent: 0,
      };
    }

    const minOption = validOptions.reduce((min, curr) =>
      curr.finalPrice < min.finalPrice ? curr : min
    );

    return {
      leastPrice: minOption.finalPrice,
      originalBasePrice: minOption.basePrice,
      sharingType: minOption.sharingType,
      discountPercent: minOption.discountPercent,
    };
  }, [activeOptions]);

  return (
    <FormGroup className={className}>
      {/* Header: OCCUPANCY & TRANSPORTATION PRICING with + ADD OPTION */}
      <FieldLabelRow className="pb-1">
        <span className="flex items-center gap-1.5 text-gray-800 text-xs font-black uppercase tracking-wider">
          <BedDouble className="w-3.5 h-3.5 text-amber-500" />
          Occupancy & Transportation Pricing
        </span>
        {canAddOption && (
          <AddItemLinkButton
            type="button"
            onClick={handleAddOption}
            title="Add another occupancy sharing option"
          >
            <Plus />
            <span>Add Option</span>
          </AddItemLinkButton>
        )}
      </FieldLabelRow>

      {/* Option Rows */}
      <div className="space-y-4">
        {activeOptions.map((option, index) => {
          const selectedType = normalizeSharingType(option.sharingType);

          return (
            <div
              key={option.id || index}
              className="flex items-end gap-3 sm:gap-4 p-0.5"
            >
              {/* Room Sharing Type Dropdown */}
              <div className="flex-1 min-w-0">
                <label
                  htmlFor={`sharing-type-${option.id}`}
                  className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1.5"
                >
                  Room Sharing Type
                </label>
                <div className="relative">
                  <select
                    id={`sharing-type-${option.id}`}
                    value={selectedType}
                    onChange={(e) =>
                      handleUpdateOption(option.id, { sharingType: e.target.value })
                    }
                    className="w-full bg-[#f8fafc] border-2 border-transparent hover:bg-[#f1f5f9] focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25 rounded-2xl pl-5 pr-10 py-3.5 text-sm sm:text-base font-bold text-gray-900 outline-none transition-all shadow-2xs appearance-none cursor-pointer"
                  >
                    {ROOM_SHARING_OPTIONS.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="font-bold text-gray-900 bg-white"
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 flex items-center">
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </div>

              {/* Price (INR) */}
              <div className="flex-1 min-w-0">
                <label
                  htmlFor={`sharing-price-${option.id}`}
                  className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1.5"
                >
                  Price (INR)
                </label>
                <input
                  id={`sharing-price-${option.id}`}
                  type="text"
                  inputMode="numeric"
                  value={option.price === '' ? '' : option.price}
                  placeholder="0"
                  onChange={(e) => {
                    const filtered = filterOnlyNumbers(e.target.value);
                    handleUpdateOption(option.id, {
                      price: filtered === '' ? '' : Number(filtered),
                    });
                  }}
                  className="w-full bg-[#f8fafc] border-2 border-transparent hover:bg-[#f1f5f9] focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-200/25 rounded-2xl px-5 py-3.5 text-sm sm:text-base font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none transition-all shadow-2xs"
                />
              </div>

              {/* Delete Option Button */}
              {activeOptions.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(option.id)}
                  className="w-13 h-13 rounded-2xl bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 transition-colors flex items-center justify-center shrink-0 cursor-pointer mb-0.5 shadow-2xs"
                  title="Remove sharing option"
                >
                  <Trash2 className="w-4 h-4 stroke-[2.2]" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Discount Section (Optional - Per Option) */}
      <div className="pt-3 space-y-2.5">
        <div className="text-[10px] font-black uppercase tracking-wider text-gray-500">
          Discount % (Optional — Per Option)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {activeOptions.map((option, index) => {
            const basePrice = Number(option.price) || 0;
            const discountPercent = Number(option.discountPercent) || 0;
            const discountedPrice = Math.max(
              0,
              Math.round(basePrice * (1 - discountPercent / 100))
            );
            const displayTitle =
              normalizeSharingType(option.sharingType) || `Option ${index + 1}`;

            return (
              <div
                key={`discount-${option.id || index}`}
                className="flex items-center justify-between p-3.5 sm:p-4 bg-white border border-gray-200/90 rounded-2xl shadow-2xs hover:border-gray-300 transition-all gap-2"
              >
                {/* Sharing Type Title + Base Price */}
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span className="font-extrabold text-sm text-gray-900 truncate">
                    {displayTitle}
                  </span>
                  {basePrice > 0 && (
                    <span className="text-[11px] font-semibold text-gray-400 shrink-0">
                      (₹{basePrice.toLocaleString()})
                    </span>
                  )}
                </div>

                {/* Right Controls: Discount input + Option's discounted price */}
                <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-500">
                      Discount
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={3}
                      value={option.discountPercent ?? 0}
                      onChange={(e) => {
                        const filtered = filterOnlyNumbers(e.target.value);
                        const val =
                          filtered === ''
                            ? ''
                            : Math.min(100, Math.max(0, Number(filtered)));
                        handleUpdateOption(option.id, { discountPercent: val });
                      }}
                      className="w-14 h-8 text-center font-bold text-xs text-gray-900 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                    />
                    <span className="text-xs font-bold text-gray-400">%</span>
                  </div>

                  <div className="text-right min-w-[3.5rem]">
                    <span className="text-sm sm:text-base font-black text-gray-900">
                      ₹{discountedPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Single Total Trip Amount Display (Least price of all sharing types) */}
        <div className="mt-3.5 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-300/60 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-gray-900">
                Total Trip Amount
              </span>
              {leastPriceInfo.sharingType && leastPriceInfo.leastPrice > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/25 text-amber-950 border border-amber-300/60">
                  Lowest ({leastPriceInfo.sharingType})
                </span>
              )}
            </div>
            <p className="text-xs font-semibold text-gray-500">
              The lowest rate among sharing options will be the trip&apos;s starting total amount.
            </p>
          </div>

          <div className="flex items-baseline gap-2 sm:self-center">
            <span className="text-xs font-bold text-gray-400">Starting from</span>
            {leastPriceInfo.discountPercent > 0 && leastPriceInfo.originalBasePrice > leastPriceInfo.leastPrice && (
              <span className="text-sm font-bold text-gray-400 line-through">
                ₹{leastPriceInfo.originalBasePrice.toLocaleString()}
              </span>
            )}
            <span className="text-xl sm:text-2xl font-black text-gray-900">
              ₹{leastPriceInfo.leastPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </FormGroup>
  );
};
