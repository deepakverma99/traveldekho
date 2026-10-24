'use client';

import React from 'react';
import { CreditCard, CheckCircle2, Copy, Check } from 'lucide-react';
import { colors } from '@/theme/colors';
import { useClipboard } from '@/hooks';
import { BookingDetailData } from '../types';

interface PaymentSummaryCardProps {
  data: BookingDetailData;
}

export const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({ data }) => {
  const isSettled = data.dueAmount === 0;
  const { copy, hasCopied: isCopied } = useClipboard({ timeout: 2000 });

  const handleCopyRef = () => {
    if (data.referenceId) {
      copy(data.referenceId);
    }
  };

  return (
    <div
      className="relative rounded-2xl p-3.5 sm:p-4 md:p-5 overflow-hidden font-jakarta shadow-[0_16px_40px_-12px_rgba(244,140,6,0.2),0_6px_20px_-8px_rgba(250,161,46,0.22)] flex flex-col gap-2.5 sm:gap-3 border border-amber-300/60"
      style={{
        background: `linear-gradient(145deg, ${colors.amber[300]} 0%, ${colors.amber[400]} 55%, ${colors.amber[500]} 100%)`,
      }}
    >
      {/* Sheen Radial Overlay matching Homepage Search Card */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.9) 0%, transparent 55%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.7) 0%, transparent 45%)',
        }}
      />

      <div className="relative z-10 flex flex-col gap-2.5 sm:gap-3">
        {/* Top-Right Copyable Reference (Dedicated top corner, not in heading row) */}
        <div className="flex items-center justify-end -mb-0.5">
          <button
            type="button"
            onClick={handleCopyRef}
            title="Click to copy Reference ID"
            aria-label={`Copy Reference ID ${data.referenceId}`}
            className="group/copy inline-flex items-center gap-1 py-0.5 px-2 bg-white/85 hover:bg-white backdrop-blur-md rounded-md sm:rounded-lg border border-white/80 text-charcoal text-[10px] font-bold shadow-2xs transition-all duration-150 cursor-pointer hover:shadow-xs active:scale-95 shrink-0"
          >
            <span className="text-[8px] font-bold text-charcoal/70 uppercase tracking-wider">Ref:</span>
            <span className="font-mono font-black text-[10px] text-charcoal">{data.referenceId}</span>
            {isCopied ? (
              <span className="inline-flex items-center gap-0.5 text-[8.5px] font-extrabold text-emerald-700 tracking-wide">
                <Check className="w-2 h-2 text-emerald-600 shrink-0" />
                Copied!
              </span>
            ) : (
              <Copy className="w-2 h-2 text-charcoal/60 group-hover/copy:text-charcoal transition-colors shrink-0" />
            )}
          </button>
        </div>

        {/* Heading: Payment Summary (Dedicated row with icon) */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-md bg-green-200/45 backdrop-blur-sm border border-green-600/60 flex items-center justify-center text-emerald-700 shadow-2xs shrink-0">
            <CreditCard className="w-3.5 h-3.5 text-green-600" />
          </div>
          <h3 className="text-xs sm:text-[13px] font-black text-charcoal uppercase tracking-wider m-0 truncate">
            Payment Summary
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11.5px] sm:text-xs font-bold text-charcoal/85">Base Amount</span>
          <span className="text-[13px] sm:text-sm font-black text-charcoal">
            ₹{data.baseAmount.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11.5px] sm:text-xs font-bold text-charcoal/85">Booking Amount (Advance)</span>
          <span className="text-[13px] sm:text-sm font-black text-charcoal">
            ₹{data.bookingAmount.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="h-px border-t border-dashed border-charcoal/20 my-0.5" />

        <div className="bg-white rounded-2xl p-3.5 sm:p-4 flex flex-col gap-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-green-600">
                PAY AT LOCATION
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-gray-500">
                (Trip Partner)
              </span>
            </div>
            <span className="text-2xl sm:text-3xl font-black tracking-tight leading-none text-black">
              ₹{data.dueAmount.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="h-px bg-gray-200" />

          <div className="flex items-center gap-2">
            {isSettled ? (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Settled online • Zero pending at check-in
              </span>
            ) : (
              <>
                <span className="w-4 h-4 rounded-full bg-red-400 text-white flex items-center justify-center font-bold text-[10px] leading-none shrink-0 select-none">
                  i
                </span>
                <span className="text-xs sm:text-[12.5px] font-medium text-gray-500 leading-tight">
                  Payable directly to trip partner upon arrival.
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
