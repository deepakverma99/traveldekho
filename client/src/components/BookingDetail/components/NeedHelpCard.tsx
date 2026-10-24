'use client';

import React from 'react';
import { Headphones, Phone, Mail } from 'lucide-react';

export const NeedHelpCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#1A1615] to-[#292420] rounded-xl sm:rounded-2xl p-3 sm:p-3.5 md:p-4 text-white shadow-[0_10px_30px_-5px_rgba(26,22,21,0.35)] flex flex-col gap-2 sm:gap-2.5 border border-white/10">
      <div className="flex items-center gap-1.5 text-[9.5px] sm:text-[10px] font-black uppercase tracking-widest text-amber-400">
        <Headphones className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        <span>Need Help?</span>
      </div>

      <p className="text-[10.5px] sm:text-[11px] font-medium leading-relaxed m-0 text-white/70">
        Our dedicated concierge team is available 24/7 to assist with your journey, transfers, and questions.
      </p>

      <div className="flex flex-col gap-1 pt-1.5 border-t border-white/10">
        <a
          href="tel:+919899558944"
          className="inline-flex items-center gap-1.5 text-[13px] sm:text-sm font-black text-white hover:text-amber-400 transition-colors"
        >
          <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
          <span>+91 9899558944</span>
        </a>

        <a
          href="mailto:BUSINESS.TRAVELDEKHO@GMAIL.COM"
          className="flex items-center gap-1 text-[9.5px] sm:text-[10px] font-medium text-white/60 hover:text-amber-400 transition-colors break-all"
        >
          <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0" />
          <span>BUSINESS.TRAVELDEKHO@GMAIL.COM</span>
        </a>
      </div>
    </div>
  );
};
