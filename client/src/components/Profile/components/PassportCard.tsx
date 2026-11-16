'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserProfileData } from '../types';

interface PassportCardProps {
  profileData: UserProfileData;
  userInitial: string;
}

export const PassportCard: React.FC<PassportCardProps> = ({
  profileData,
  userInitial,
}) => {
  const sanitizedName = (profileData.fullName || 'DEEPAK')
    .toUpperCase()
    .replace(/[^A-Z]/g, '');

  const mrzLine = `P<IND<<${sanitizedName}${'<'.repeat(
    Math.max(0, 36 - sanitizedName.length - 7)
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-[310px] mx-auto lg:mx-0 relative overflow-hidden rounded-[26px] p-5 sm:p-5.5 text-white select-none border-2 border-orange-300/40 shadow-[0_18px_45px_rgba(255,87,34,0.26)]"
      style={{
        background:
          'linear-gradient(165deg, #ff5722 0%, #e64a19 45%, #b02f00 100%)',
      }}
    >
      {/* Subtle Guilloche / Passport Watermark Background Rings */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center"
      >
        <div className="w-72 h-72 rounded-full border border-white/40 flex items-center justify-center">
          <div className="w-56 h-56 rounded-full border border-white/50 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border border-dashed border-white/60" />
          </div>
        </div>
      </div>

      {/* Header Top Labels */}
      <div className="relative text-center">
        <p className="text-[9.5px] sm:text-[10px] font-bold tracking-[0.24em] text-orange-100 uppercase">
          REPUBLIC OF TRAVELDEKHO
        </p>
        <h3 className="text-lg sm:text-xl font-black tracking-[0.22em] text-white uppercase mt-0.5">
          PASSPORT
        </h3>
      </div>

      {/* Circular Avatar Seal & Stamp */}
      <div className="relative my-4 sm:my-5 flex justify-center items-center">
        {/* Outer Circular Rings */}
        <div className="relative flex items-center justify-center p-2.5 rounded-full border border-orange-200/30">
          <div className="p-2 rounded-full border border-dashed border-orange-200/40">
            {/* Center Avatar Badge */}
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-orange-50 text-[#b02f00] font-black text-2xl sm:text-3xl flex items-center justify-center shadow-[inset_0_3px_8px_rgba(0,0,0,0.15)] ring-4 ring-orange-300/50">
              {userInitial}
            </div>
          </div>

          {/* Overlapping Stamp: APPROVED TRAVELDEKHO VISA */}
          <div className="absolute -bottom-1 -right-2 transform -rotate-12 bg-orange-950/30 backdrop-blur-[2px] border-2 border-dashed border-orange-950/70 text-orange-950 font-black px-2 py-0.5 rounded-full text-[8.5px] uppercase tracking-wider shadow-sm">
            ★ APPROVED ★
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-orange-200/30 my-3.5" />

      {/* Information 2-Column Grid */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 text-left">
        {/* Row 1 */}
        <div>
          <span className="block text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-orange-100/80">
            SURNAME / NOM
          </span>
          <span className="block text-xs sm:text-[13.5px] font-extrabold text-white tracking-wide truncate mt-0.5">
            {profileData.fullName || 'Deepak'}
          </span>
        </div>

        <div>
          <span className="block text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-orange-100/80">
            GIVEN NAMES
          </span>
          <span className="block text-xs sm:text-[13.5px] font-extrabold text-white tracking-wide truncate mt-0.5">
            {profileData.fullName || 'Deepak'}
          </span>
        </div>

        {/* Row 2 */}
        <div>
          <span className="block text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-orange-100/80">
            PASSPORT NO.
          </span>
          <span className="block text-xs sm:text-[13.5px] font-extrabold text-white font-mono tracking-widest truncate mt-0.5">
            {profileData.passportNo}
          </span>
        </div>

        <div>
          <span className="block text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-orange-100/80">
            NATIONALITY
          </span>
          <span className="block text-xs sm:text-[13.5px] font-extrabold text-white tracking-wide mt-0.5">
            {profileData.nationality}
          </span>
        </div>

        {/* Row 3 */}
        <div>
          <span className="block text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-orange-100/80">
            SIGNATURE
          </span>
          <span className="block font-caveat text-lg sm:text-xl text-orange-100 font-bold leading-none pt-0.5 truncate">
            {profileData.fullName || 'Deepak'}
          </span>
        </div>

        <div>
          <span className="block text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-orange-100/80">
            AUTHORITY
          </span>
          <span className="block text-[11px] sm:text-xs font-extrabold text-white tracking-wider truncate mt-0.5">
            {profileData.authority}
          </span>
        </div>
      </div>

      {/* Monospace MRZ Code Line */}
      <div className="border-t border-orange-200/25 mt-3.5 pt-2.5 text-center">
        <p className="font-mono text-[8.5px] sm:text-[9px] tracking-[0.14em] text-orange-100/60 uppercase truncate">
          {mrzLine}
        </p>
      </div>
    </motion.div>
  );
};
