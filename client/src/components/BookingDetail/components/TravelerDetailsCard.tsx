'use client';

import React from 'react';
import { UserCheck, Phone, Mail, User } from 'lucide-react';
import { BookingDetailData } from '../types';

interface TravelerDetailsCardProps {
  data: BookingDetailData;
}

export const TravelerDetailsCard: React.FC<TravelerDetailsCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-3.5 sm:gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <UserCheck className="w-4 h-4" />
          </div>
          <h3 className="text-[13px] sm:text-[14px] font-black text-gray-900 uppercase tracking-wider m-0">
            Traveler Details
          </h3>
        </div>
      </div>

      <div className="bg-[#FAF8F5] rounded-xl p-3.5 sm:p-4.5 border border-gray-100 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="bg-amber-100 text-amber-900 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full w-fit border border-amber-200/80">
            Primary Contact
          </span>
          <span className="text-[9.5px] font-bold text-gray-400 uppercase tracking-widest">
            {data.guestsCount} Traveler(s)
          </span>
        </div>

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3 sm:gap-4 pt-1">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] sm:text-[9.5px] font-black text-gray-400 uppercase tracking-wider flex items-center">
              <User className="w-2.5 h-2.5 inline mr-1 text-gray-400 shrink-0" />
              Full Name
            </span>
            <span className="text-[13px] sm:text-[14px] font-bold text-gray-900 break-words">
              {data.travelerName}
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] sm:text-[9.5px] font-black text-gray-400 uppercase tracking-wider flex items-center">
              <Phone className="w-2.5 h-2.5 inline mr-1 text-gray-400 shrink-0" />
              Contact Phone
            </span>
            <span className="text-[13px] sm:text-[14px] font-bold text-gray-900 break-words">
              {data.travelerPhone}
            </span>
          </div>

          {data.travelerEmail && (
            <div className="flex flex-col gap-0.5 min-[480px]:col-span-2">
              <span className="text-[9px] sm:text-[9.5px] font-black text-gray-400 uppercase tracking-wider flex items-center">
                <Mail className="w-2.5 h-2.5 inline mr-1 text-gray-400 shrink-0" />
                Email Address
              </span>
              <span className="text-[12.5px] sm:text-[13px] font-bold text-gray-900 break-all">
                {data.travelerEmail}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
