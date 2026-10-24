'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { selectPartnerBookings, selectCurrentPartner } from '@/redux/slices/tripPartnerSlice';
import { MOCK_PARTNER_BOOKINGS } from '@/components/TripPartner/data/bookings.data';
import { useClipboard } from '@/hooks';
import { BookingDetailData } from '../types';

export const useBookingDetail = (bookingId: string) => {
  const router = useRouter();
  const reduxBookings = useAppSelector(selectPartnerBookings);
  const currentPartner = useAppSelector(selectCurrentPartner);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { copy: copyLink, hasCopied: isCopied } = useClipboard({
    timeout: 2500,
    onSuccess: () => {
      setToastMessage('Booking link copied to clipboard!');
      setTimeout(() => setToastMessage(null), 2500);
    },
  });

  // Find booking data or create robust fallback
  const bookingData = useMemo<BookingDetailData>(() => {
    const rawBooking =
      reduxBookings.find((b) => b.id.toLowerCase() === bookingId.toLowerCase()) ||
      MOCK_PARTNER_BOOKINGS.find((b) => b.id.toLowerCase() === bookingId.toLowerCase()) ||
      MOCK_PARTNER_BOOKINGS[0];

    // Compute reference ID (Matches user screenshot format #B7F022B60916)
    let ref = bookingId.toUpperCase().replace(/-/g, '');
    if (ref.length > 12) {
      ref = ref.slice(-12);
    }
    const referenceId = `#${ref || 'B7F022B60916'}`;

    // Dates
    const checkInDate = rawBooking.travelDate || '30/10/2026';
    let checkOutDate = '01/11/2026';
    try {
      const parts = checkInDate.split('/').map(Number);
      if (parts.length === 3) {
        const [d, m, y] = parts;
        const inDate = new Date(y, m - 1, d);
        // default 2 nights duration
        inDate.setDate(inDate.getDate() + 2);
        const day = String(inDate.getDate()).padStart(2, '0');
        const month = String(inDate.getMonth() + 1).padStart(2, '0');
        const year = inDate.getFullYear();
        checkOutDate = `${day}/${month}/${year}`;
      }
    } catch {
      checkOutDate = '01/11/2026';
    }

    const guestsCount = rawBooking.guestsCount || 1;
    const baseAmount = rawBooking.amount || 5400;
    const bookingAmount = 1; // token booking fee as in screenshot
    const isPaid = rawBooking.paymentStatus === 'paid';
    const dueAmount = isPaid ? 0 : baseAmount;

    return {
      id: bookingId,
      referenceId,
      tripId: rawBooking.tripId || 'trip-2',
      tripTitle: rawBooking.tripTitle || 'The Kausani story 2.0',
      tripLocation: rawBooking.tripLocation || 'Kausani',
      tripDuration: rawBooking.tripDuration || '3 DAYS',
      tripImage: rawBooking.tripImage || '/trips/spiti.png',
      travelDate: checkInDate,
      bookingDate: rawBooking.bookingDate || '18 OCT 2026',
      checkInDate,
      checkOutDate,
      guestsCount,
      primaryGuestsCount: 1,
      additionalGuestsCount: Math.max(0, guestsCount - 1),
      status: rawBooking.status || 'BOOKED',
      paymentStatus: rawBooking.paymentStatus || 'unpaid',
      amount: baseAmount,
      baseAmount,
      bookingAmount,
      dueAmount,
      travelerName: rawBooking.travelerName || 'Aman',
      travelerPhone: rawBooking.travelerPhone || '8130303030',
      travelerEmail: rawBooking.travelerEmail || 'guest@traveldekho.local',
      partnerName: currentPartner?.displayName || 'TRAVELLR TIME',
      partnerVerified: true,
      partnerPhone: '+91 9899558944',
    };
  }, [bookingId, reduxBookings, currentPartner]);

  // Actions
  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/trip-partner/travellr/bookings');
    }
  }, [router]);



  const handleShare = useCallback(() => {
    if (typeof window !== 'undefined') {
      copyLink(window.location.href);
    }
  }, [copyLink]);

  const handleCallPartner = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.location.href = `tel:${bookingData.partnerPhone.replace(/\s+/g, '')}`;
    }
  }, [bookingData.partnerPhone]);

  return {
    bookingData,
    isCopied,
    toastMessage,
    handleBack,
    handleShare,
    handleCallPartner,
  };
};
