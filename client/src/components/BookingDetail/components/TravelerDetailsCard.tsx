'use client';

import React from 'react';
import { UserCheck, Phone, Mail, User } from 'lucide-react';
import { BookingDetailData } from '../types';

interface TravelerDetailsCardProps {
  data: BookingDetailData;
}

export const TravelerDetailsCard: React.FC<TravelerDetailsCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-[1.75rem] p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <UserCheck className="w-4.5 h-4.5" />
          </div>
          <h3 className="text-[15px] font-black text-gray-900 uppercase tracking-wider m-0">
            Traveler Details
          </h3>
        </div>
      </div>

      <div className="bg-[#FAF8F5] rounded-2xl p-5 sm:p-6 border border-gray-100 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full w-fit border border-amber-200">
            Primary Contact
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {data.guestsCount} Traveler(s)
          </span>
        </div>

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center">
              <User className="w-2.5 h-2.5 inline mr-1 text-gray-400" />
              Full Name
            </span>
            <span className="text-[15px] font-extrabold text-gray-900 break-words">
              {data.travelerName}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center">
              <Phone className="w-2.5 h-2.5 inline mr-1 text-gray-400" />
              Contact Phone
            </span>
            <span className="text-[15px] font-extrabold text-gray-900 break-words">
              {data.travelerPhone}
            </span>
          </div>

          {data.travelerEmail && (
            <div className="flex flex-col gap-1 min-[480px]:col-span-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center">
                <Mail className="w-2.5 h-2.5 inline mr-1 text-gray-400" />
                Email Address
              </span>
              <span className="text-[15px] font-extrabold text-gray-900 break-all">
                {data.travelerEmail}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
