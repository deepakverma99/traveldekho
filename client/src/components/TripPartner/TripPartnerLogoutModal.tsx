'use client';

import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectIsPartnerLogoutModalOpen,
  selectCurrentPartner,
  closePartnerLogoutModal,
  partnerLogout,
} from '@/redux/slices/tripPartnerSlice';

import { type TripPartnerLogoutModalProps } from './types/';

export type { TripPartnerLogoutModalProps };

export const TripPartnerLogoutModal: React.FC<TripPartnerLogoutModalProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
  onConfirm: propOnConfirm,
  displayName: propDisplayName,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const reduxIsOpen = useAppSelector(selectIsPartnerLogoutModalOpen);
  const currentPartner = useAppSelector(selectCurrentPartner);

  const isOpen = propIsOpen !== undefined ? propIsOpen : reduxIsOpen;
  const displayName = propDisplayName || currentPartner?.displayName;

  const handleClose = useCallback(() => {
    if (propOnClose) {
      propOnClose();
    } else {
      dispatch(closePartnerLogoutModal());
    }
  }, [propOnClose, dispatch]);

  const handleConfirm = useCallback(() => {
    if (propOnConfirm) {
      propOnConfirm();
    } else {
      dispatch(partnerLogout());
      router.push('/trip-partner/login');
    }
  }, [propOnConfirm, dispatch, router]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        className="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 z-10 overflow-hidden text-center font-jakarta animate-fade-in-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 border border-red-100 flex items-center justify-center mx-auto my-2 mb-4">
          <LogOut className="w-5 h-5" />
        </div>

        <h3 id="logout-title" className="text-lg font-black text-gray-900 mb-2 tracking-tight">
          Log Out of Partner Portal?
        </h3>

        <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
          Are you sure you want to log out{displayName ? <> of <strong>{displayName}</strong></> : ''}? You will need to log in again to manage your trips and bookings.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-[13px] font-bold text-gray-700 bg-gray-100 border border-gray-200 hover:bg-gray-200 hover:text-gray-900 active:scale-98 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-[13px] font-extrabold text-white bg-red-600 hover:bg-red-700 active:scale-98 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
