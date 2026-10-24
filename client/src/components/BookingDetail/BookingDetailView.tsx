'use client';

import React from 'react';
import { ArrowLeft, Download, Share2, Check } from 'lucide-react';
import { FloatingBackground } from '@/components/shared';
import { useBookingDetail } from './hooks/useBookingDetail';
import { BookingDetailHero } from './components/BookingDetailHero';
import { TravelerDetailsCard } from './components/TravelerDetailsCard';
import { TripPartnerInfoCard } from './components/TripPartnerInfoCard';
import { PaymentSummaryCard } from './components/PaymentSummaryCard';
import { PrepForTripCard } from './components/PrepForTripCard';
import { NeedHelpCard } from './components/NeedHelpCard';
import { BookingDetailProps } from './types';

export const BookingDetailView: React.FC<BookingDetailProps> = ({ bookingId }) => {
  const {
    bookingData,
    isCopied,
    toastMessage,
    handleBack,
    handleShare,
    handleCallPartner,
  } = useBookingDetail(bookingId);

  return (
    <main className="grow min-h-screen bg-white w-full relative font-jakarta overflow-x-hidden print:bg-white print:p-0">
      <FloatingBackground fixed />

      <div className="w-full pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-1 print:p-0 print:max-w-full">
        {/* Top Navigation Bar: Back (Matches Breadcrumb size, h-5/h-6, and mb-2 on Search page) */}
        <div className="mb-2 sm:mb-2.5 flex items-center justify-between gap-4 print:hidden">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 h-6 py-2 px-2.5 bg-white border border-gray-200 rounded-full text-gray-600 text-[11px] sm:text-xs font-medium cursor-pointer shadow-2xs transition-all hover:bg-gray-50 hover:text-amber-600 hover:border-amber-300 hover:-translate-x-0.5 [&>svg]:w-3 [&>svg]:h-3"
          >
            <ArrowLeft />
            <span>Back to My Bookings</span>
          </button>
        </div>

        {/* Page Header: Title, Status & Actions */}
        <div className="pt-1.5 sm:pt-2 mb-5 sm:mb-7 md:mb-8">
          <div className="flex flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center flex-wrap gap-2 sm:gap-3">
                <h1 className="text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-extrabold tracking-tight text-charcoal leading-tight">
                  Booking <span className="text-primary">Detail</span>
                </h1>
                <div className="inline-flex items-center gap-1.5 py-0.5 sm:py-1 px-2.5 sm:px-3 rounded-full text-[11px] sm:text-xs font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  <span>{bookingData.status}</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-1.5 font-medium leading-relaxed">
                View complete reservation details, traveler information, and payment breakdown.
              </p>
            </div>

            {/* Share button always aligned to the right of header */}
            <div className="flex items-center shrink-0 self-start sm:self-center print:hidden">
              <button
                type="button"
                onClick={handleShare}
                title="Share Booking Link"
                className="inline-flex items-center gap-1.5 py-1.5 px-3 sm:px-3.5 rounded-2xl bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm font-bold cursor-pointer shadow-xs transition-all hover:bg-black hover:text-white hover:border-black hover:-translate-y-0.5 active:scale-97 shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5"
              >
                {isCopied ? <Check className="text-green-600" /> : <Share2 />}
                <span>{isCopied ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <BookingDetailHero data={bookingData} />
            <TravelerDetailsCard data={bookingData} />
            <TripPartnerInfoCard data={bookingData} onCall={handleCallPartner} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <PaymentSummaryCard data={bookingData} />
            <PrepForTripCard />
            <NeedHelpCard />
          </div>
        </div>

        {/* Feedback Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white py-3 px-4.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-3 duration-200">
            <Check className="w-4 h-4 text-green-400" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </main>
  );
};
