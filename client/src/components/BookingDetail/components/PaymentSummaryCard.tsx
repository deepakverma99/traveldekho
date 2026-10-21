'use client';

import React from 'react';
import { CreditCard, CheckCircle2 } from 'lucide-react';
import { BookingDetailData } from '../types';

interface PaymentSummaryCardProps {
  data: BookingDetailData;
}

export const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({ data }) => {
  const isSettled = data.dueAmount === 0;

  return (
    <div className="bg-white rounded-[1.75rem] border border-gray-100 p-6 sm:p-7 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <CreditCard className="w-4.5 h-4.5" />
          </div>
          <h3 className="text-[15px] font-black text-gray-900 uppercase tracking-wider m-0">
            Payment Summary
          </h3>
        </div>

        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
            isSettled
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}
        >
          {isSettled ? 'Paid in Full' : 'Pay at Location'}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-600">Base Amount</span>
        <span className="text-lg font-black text-gray-900">
          ₹{data.baseAmount.toLocaleString('en-IN')}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-600">Booking Amount (Advance)</span>
        <span className="text-lg font-black text-gray-900">
          ₹{data.bookingAmount.toLocaleString('en-IN')}
        </span>
      </div>

      <div className="h-px border-t border-dashed border-gray-200 my-1" />

      <div
        className={`rounded-2xl p-5 flex flex-col gap-1.5 border-[1.5px] ${
          isSettled
            ? 'bg-gradient-to-br from-emerald-50 to-[#F0FDF4] border-emerald-200'
            : 'bg-gradient-to-br from-amber-50 to-[#FFFBEB] border-amber-200'
        }`}
      >
        <span
          className={`text-[10px] font-black uppercase tracking-wider ${
            isSettled ? 'text-emerald-800' : 'text-amber-900'
          }`}
        >
          Due at Location (Trip Partner)
        </span>
        <div className="flex items-baseline gap-2">
          <span
            className={`text-4xl font-black tracking-tight leading-none ${
              isSettled ? 'text-emerald-700' : 'text-gray-900'
            }`}
          >
            ₹{data.dueAmount.toLocaleString('en-IN')}
          </span>
        </div>
        <span
          className={`text-[11px] font-bold mt-1 ${
            isSettled ? 'text-emerald-600' : 'text-amber-800'
          }`}
        >
          {isSettled ? (
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 inline text-emerald-600" />
              Settled online • Zero pending at check-in
            </span>
          ) : (
            'Payable directly to trip partner upon arrival'
          )}
        </span>
      </div>
    </div>
  );
};
