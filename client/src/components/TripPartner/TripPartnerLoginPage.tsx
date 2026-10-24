'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { TripPartnerBackground } from './TripPartnerBackground';
import { TripPartnerLoginForm } from './TripPartnerLoginForm';

export const TripPartnerLoginPage: React.FC = () => {
  return (
    <main className="flex-1 flex flex-col w-full min-h-screen font-jakarta">
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-cream">
        {/* Background Ambient Glows and Exact Homepage Floating Icons */}
        <TripPartnerBackground />

        {/* Login Card */}
        <div className="w-full max-w-[420px] bg-white border border-gray-100 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] pt-14 px-8 pb-8 sm:pt-16 sm:px-10 sm:pb-10 relative z-10 animate-fade-in-up">
          {/* Top-left: Back to Home Button */}
          <Link
            href="/"
            title="Return to TravelDekho Homepage"
            className="absolute top-5 left-5 sm:top-6 sm:left-7 inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-amber-700 transition-colors cursor-pointer group/back"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gray-400 group-hover/back:text-amber-500 group-hover/back:-translate-x-1 transition-all" />
            <span>Back to Home</span>
          </Link>

          {/* Logo */}
          <div className="flex justify-center mb-3">
            <Link
              href="/"
              title="TravelDekho Homepage"
              className="relative h-11 w-44 sm:h-12 sm:w-48 block transition-transform hover:scale-105 active:scale-95"
            >
              <Image
                alt="TravelDekho"
                src="/TravelDekho-logo.png"
                fill
                priority
                className="object-contain"
                sizes="192px"
              />
            </Link>
          </div>

          {/* Title & Subtitle */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-charcoal tracking-tight mb-1">
              Trip <span className="text-primary">Partner Portal</span>
            </h1>
            <p className="text-gray-600 text-sm font-semibold">
              Manage your trips and bookings
            </p>
          </div>

          {/* Credentials Form */}
          <TripPartnerLoginForm />
        </div>
      </div>
    </main>
  );
};
