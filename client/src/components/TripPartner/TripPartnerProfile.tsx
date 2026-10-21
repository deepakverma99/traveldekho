'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, CheckCircle2, Save, Building, Mail, ShieldCheck } from 'lucide-react';
import {
  getStoredPartner,
  savePartnerSession,
  formatPartnerDisplayName,
} from './utils/partnerAuth';

export interface TripPartnerProfileProps {
  username: string;
}

export const TripPartnerProfile: React.FC<TripPartnerProfileProps> = ({ username }) => {
  const router = useRouter();

  const [usernameInput, setUsernameInput] = useState(() => {
    const partner = getStoredPartner(username);
    return partner?.username || username;
  });
  const [displayName, setDisplayName] = useState(() => {
    const partner = getStoredPartner(username);
    return partner?.displayName || formatPartnerDisplayName(username);
  });
  const [companyName, setCompanyName] = useState(() => {
    const partner = getStoredPartner(username);
    return partner?.companyName || `${formatPartnerDisplayName(username)} Travels`;
  });
  const [email, setEmail] = useState(() => {
    const partner = getStoredPartner(username);
    return partner?.email || `${username}@gmail.com`;
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedUsername =
      usernameInput.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '') || username;

    savePartnerSession({
      username: sanitizedUsername,
      displayName: displayName.trim(),
      companyName: companyName.trim(),
      email: email.trim(),
    });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      if (sanitizedUsername !== username) {
        router.push(`/trip-partner/${sanitizedUsername}/profile`);
      }
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
          Public <span className="text-amber-500">Profile</span>
        </h1>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
          Update your partner handle, brand name, and public visibility
        </p>
      </div>

      {isSaved && (
        <div className="mb-6 flex items-center gap-2 p-4 bg-green-50 border border-green-200 text-green-700 text-sm font-bold rounded-2xl animate-fade-in-up">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
          <span>Profile and username updated successfully!</span>
        </div>
      )}

      <form
        onSubmit={handleSave}
        className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-10 shadow-sm space-y-6"
      >
        {/* Avatar & Verification Banner */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <div className="w-16 h-16 rounded-3xl bg-amber-400 text-black flex items-center justify-center font-black text-2xl uppercase shadow-md shadow-amber-200">
            {displayName.charAt(0) || 'T'}
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900 capitalize">{displayName}</h3>
            <p className="text-xs font-bold text-green-600 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-4 h-4" /> Verified TravelDekho Trip Partner
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Username / Route Slug */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
              Partner Handle / Username (Route URL)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">
                /trip-partner/
              </span>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full bg-[#f4f5f7] border-2 border-transparent hover:border-gray-300 focus:bg-white focus:border-[#facb2b] focus:ring-4 focus:ring-[#facb2b]/20 rounded-xl py-3.5 pl-28 pr-4 text-sm font-bold text-gray-900 outline-none transition-all"
              />
            </div>
            <p className="text-[11px] font-semibold text-gray-400 mt-1.5">
              Taken initially from your email prefix. Changing this updates your dashboard route.
            </p>
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
              Display Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-[#f4f5f7] border-2 border-transparent hover:border-gray-300 focus:bg-white focus:border-[#facb2b] focus:ring-4 focus:ring-[#facb2b]/20 rounded-xl py-3.5 pl-11 pr-4 text-sm font-bold text-gray-900 outline-none transition-all"
              />
            </div>
          </div>

          {/* Company / Agency Name */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
              Agency / Company Name
            </label>
            <div className="relative">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-[#f4f5f7] border-2 border-transparent hover:border-gray-300 focus:bg-white focus:border-[#facb2b] focus:ring-4 focus:ring-[#facb2b]/20 rounded-xl py-3.5 pl-11 pr-4 text-sm font-bold text-gray-900 outline-none transition-all"
              />
            </div>
          </div>

          {/* Registered Email */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
              Contact Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#f4f5f7] border-2 border-transparent hover:border-gray-300 focus:bg-white focus:border-[#facb2b] focus:ring-4 focus:ring-[#facb2b]/20 rounded-xl py-3.5 pl-11 pr-4 text-sm font-bold text-gray-900 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-400 hover:bg-amber-500 text-black font-black text-sm rounded-full shadow-lg shadow-amber-200 transition-all cursor-pointer active:scale-95"
          >
            <Save className="w-4 h-4" /> Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
};
