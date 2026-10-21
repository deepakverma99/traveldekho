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
    handlePrintInvoice,
    handleShare,
    handleCallPartner,
  } = useBookingDetail(bookingId);

  return (
    <main className="min-h-screen bg-cream w-full relative font-jakarta py-6 px-4 sm:py-8 sm:px-6 lg:py-10 lg:px-8 pb-16 sm:pb-20 lg:pb-24 overflow-x-hidden print:bg-white print:p-0">
      <FloatingBackground fixed />

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-7 relative z-1">
        {/* Top Navigation Bar: Back & Actions */}
        <div className="flex items-center justify-between gap-4 flex-wrap print:hidden">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 py-2 px-4.5 bg-white border border-gray-200 rounded-full text-gray-600 text-xs font-extrabold uppercase tracking-wide cursor-pointer shadow-xs transition-all hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 hover:-translate-x-0.5 [&>svg]:w-3.5 [&>svg]:h-3.5"
          >
            <ArrowLeft />
            <span>Back to My Bookings</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrintInvoice}
              title="Print / Download Invoice"
              className="inline-flex items-center gap-2 py-2 px-4.5 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-extrabold uppercase tracking-wide cursor-pointer shadow-xs transition-all hover:bg-amber-400 hover:text-gray-900 hover:border-amber-400 hover:-translate-y-0.5 hover:shadow-[0_4px_8px_-2px_rgba(244,140,6,0.25)] active:scale-97 [&>svg]:w-3.5 [&>svg]:h-3.5"
            >
              <Download />
              <span>Invoice</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              title="Share Booking Link"
              className="inline-flex items-center gap-2 py-2 px-4.5 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-extrabold uppercase tracking-wide cursor-pointer shadow-xs transition-all hover:bg-amber-400 hover:text-gray-900 hover:border-amber-400 hover:-translate-y-0.5 hover:shadow-[0_4px_8px_-2px_rgba(244,140,6,0.25)] active:scale-97 [&>svg]:w-3.5 [&>svg]:h-3.5"
            >
              {isCopied ? <Check className="text-green-600" /> : <Share2 />}
              <span>{isCopied ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Page Header: Title, Status, Reference */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center flex-wrap gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Booking Detail
            </h1>
            <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              <span>{bookingData.status}</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/80 border border-gray-200/80 text-xs font-semibold text-gray-500 shadow-xs">
            <span>Reference:</span>
            <span className="font-mono font-bold text-gray-900">{bookingData.referenceId}</span>
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
