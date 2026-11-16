'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserProfileData } from '../types';

interface MiniPassportCardProps {
  profileData: UserProfileData;
  userInitial: string;
}

export const MiniPassportCard: React.FC<MiniPassportCardProps> = ({
  profileData,
  userInitial,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full relative overflow-hidden rounded-2xl p-4 text-white select-none border-2 border-orange-300/40 shadow-[0_12px_30px_rgba(255,87,34,0.24)] mb-5 font-jakarta"
      style={{
        background:
          'linear-gradient(165deg, #ff5722 0%, #e64a19 45%, #b02f00 100%)',
      }}
    >
      {/* Background Rings */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center"
      >
        <div className="w-40 h-40 rounded-full border border-white/50" />
      </div>

      {/* Header */}
      <div className="relative text-center">
        <p className="text-[8.5px] font-bold tracking-[0.2em] text-orange-100 uppercase">
          PASSPORT
        </p>
        <h4 className="text-xs font-black tracking-[0.2em] text-white uppercase mt-0.5">
          PASSPORT
        </h4>
      </div>

      {/* Center Seal */}
      <div className="relative my-3 flex justify-center items-center">
        <div className="relative p-1.5 rounded-full border border-orange-200/30">
          <div className="w-12 h-12 rounded-full bg-orange-50 text-[#b02f00] font-black text-lg flex items-center justify-center shadow-inner ring-2 ring-orange-300/50">
            {userInitial}
          </div>
          <div className="absolute -bottom-1 -right-1 transform -rotate-12 bg-orange-950/40 border border-dashed border-orange-950/70 text-orange-950 font-black px-1.5 py-0.2 rounded-full text-[7px] uppercase tracking-wider">
            ★ PASSED ★
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-orange-200/30 my-2.5" />

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-left">
        <div>
          <span className="block text-[7.5px] font-bold uppercase tracking-wider text-orange-100/80">
            NAME / NOM
          </span>
          <span className="block text-xs font-extrabold text-white truncate mt-0.5">
            {profileData.fullName || 'Deepak'}
          </span>
        </div>

        <div>
          <span className="block text-[7.5px] font-bold uppercase tracking-wider text-orange-100/80">
            ORIGIN
          </span>
          <span className="block text-xs font-extrabold text-white mt-0.5">
            {profileData.nationality || 'IND'}
          </span>
        </div>

        <div>
          <span className="block text-[7.5px] font-bold uppercase tracking-wider text-orange-100/80">
            SIGNATURE
          </span>
          <span className="block font-caveat text-sm text-orange-100 font-bold truncate leading-none pt-0.5">
            {profileData.fullName || 'Deepak'}
          </span>
        </div>

        <div>
          <span className="block text-[7.5px] font-bold uppercase tracking-wider text-orange-100/80">
            ROLE
          </span>
          <span className="block text-[10px] font-extrabold text-white tracking-wider mt-0.5">
            TRAVELLER
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MiniPassportCard;

