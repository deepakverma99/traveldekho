'use client';

import React from 'react';
import { Headphones, Phone, Mail } from 'lucide-react';

export const NeedHelpCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#1A1615] to-[#292420] rounded-[1.75rem] p-7 sm:p-8 text-white shadow-[0_10px_30px_-5px_rgba(26,22,21,0.35)] flex flex-col gap-4 border border-white/10">
      <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-amber-400">
        <Headphones className="w-4 h-4" />
        <span>Need Help?</span>
      </div>

      <p className="text-[13px] font-medium leading-relaxed m-0 text-white/75">
        Our dedicated concierge team is available 24/7 to assist with your journey, transfers, and questions.
      </p>

      <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
        <a
          href="tel:+919899558944"
          className="inline-flex items-center gap-2 text-xl font-black text-white hover:text-amber-400 transition-colors"
        >
          <Phone className="w-5 h-5 text-amber-400" />
          <span>+91 9899558944</span>
        </a>

        <a
          href="mailto:BUSINESS.TRAVELDEKHO@GMAIL.COM"
          className="flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-amber-400 transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>BUSINESS.TRAVELDEKHO@GMAIL.COM</span>
        </a>
      </div>
    </div>
  );
};
