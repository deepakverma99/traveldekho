'use client';

import React from 'react';
import { ShieldAlert, Trash2 } from 'lucide-react';

interface DangerZoneCardProps {
  onOpenCloseAccount: () => void;
}

export const DangerZoneCard: React.FC<DangerZoneCardProps> = ({
  onOpenCloseAccount,
}) => {
  return (
    <section
      aria-labelledby="danger-zone-heading"
      className="bg-[#fff6f6] rounded-3xl border border-red-100/90 shadow-[0_2px_16px_rgba(239,68,68,0.04)] p-6 sm:p-7 md:p-8 font-jakarta mt-6"
    >
      <div className="flex items-center gap-2 pb-2.5 border-b border-red-100">
        <ShieldAlert className="w-4.5 h-4.5 text-red-500 stroke-[2.2]" />
        <h3
          id="danger-zone-heading"
          className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-red-600"
        >
          DANGER ZONE
        </h3>
      </div>

      <p className="text-xs sm:text-[13px] text-red-600/80 font-medium leading-relaxed mt-3">
        Deleting your account is permanent. All of your trip bookings, itinerary history,
        and passport stamps will be deleted forever.
      </p>

      <div className="mt-5">
        <button
          type="button"
          onClick={onOpenCloseAccount}
          className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl border border-red-200 bg-white hover:bg-red-50/80 text-red-600 font-bold text-xs uppercase tracking-wider shadow-2xs transition-all duration-200 cursor-pointer active:scale-97 select-none"
        >
          <Trash2 className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>CLOSE ACCOUNT</span>
        </button>
      </div>
    </section>
  );
};

export default DangerZoneCard;

