'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { colors } from '@/theme/colors';
import { TripPartnerBackground } from './TripPartnerBackground';
import { TripPartnerLoginForm } from './TripPartnerLoginForm';

export const TripPartnerLoginPage: React.FC = () => {
  return (
    <main className="flex-1 flex flex-col w-full min-h-screen">
      <div className="w-full h-full">
        <div>
          <div
            className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
            style={{ background: '#FFFBF0' }}
          >
            {/* Background Ambient Glows and Exact Homepage Floating Icons */}
            <TripPartnerBackground />

            {/* Login Card */}
            <div className="w-full max-w-[420px] bg-white border border-gray-100 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] p-8 sm:p-10 pt-14 sm:pt-16 relative z-10 animate-fade-in-up">
              {/* Top-left: Back to Home Button */}
              <Link
                href="/"
                title="Return to TravelDekho Homepage"
                className="absolute top-5 left-5 sm:top-6 sm:left-7 inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-amber-700 transition-colors group cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-gray-400 group-hover:text-amber-400" />
                <span>Back to Home</span>
              </Link>

              {/* Logo */}
              <div className="flex justify-center mb-3">
                <Link
                  href="/"
                  title="TravelDekho Homepage"
                  className="relative h-11 w-44 sm:h-12 sm:w-48 transition-transform hover:scale-105 active:scale-95 block"
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

              {/* Title & Subtitle with Reduced Spacing */}
              <div className="space-y-1 text-center mb-6">
                <h1 className="text-2xl font-black font-jakarta text-[#191c1d] tracking-tight">
                  Trip <span style={{ color: colors.gold }}>Partner Portal</span>
                </h1>
                <p className="text-[#5e5e5e] text-sm font-semibold">
                  Manage your trips and bookings
                </p>
              </div>

              {/* Credentials Form */}
              <TripPartnerLoginForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
