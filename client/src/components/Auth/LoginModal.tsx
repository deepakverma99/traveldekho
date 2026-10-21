'use client';

import React, { useEffect, useSyncExternalStore, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, CheckCircle2 } from 'lucide-react';
import {
  useAppDispatch,
  useAppSelector,
  selectIsLoginModalOpen,
  selectCountryCode,
  selectMobileNumber,
  selectIsMobileComplete,
  selectAuthStep,
  selectAuthOtp,
  selectAuthLoading,
  selectAuthError,
  setCountryCode,
  setMobileNumber,
  setOtp,
  setStep,
  closeLoginModal,
  requestOtpStart,
  requestOtpSuccess,
  loginSuccess,
  resetLoginForm,
} from '@/redux';

export interface LoginModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmitOtp?: (data: { countryCode: string; mobileNumber: string }) => void;
}

interface LoginFormProps {
  onClose?: () => void;
  onSubmitOtp?: (data: { countryCode: string; mobileNumber: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSubmitOtp }) => {
  const dispatch = useAppDispatch();
  const countryCode = useAppSelector(selectCountryCode);
  const mobileNumber = useAppSelector(selectMobileNumber);
  const isMobileComplete = useAppSelector(selectIsMobileComplete);
  const step = useAppSelector(selectAuthStep);
  const otp = useAppSelector(selectAuthOtp);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMobileNumber(e.target.value));
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCountryCode(e.target.value));
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setOtp(e.target.value));
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMobileComplete) return;

    dispatch(requestOtpStart());
    onSubmitOtp?.({ countryCode, mobileNumber });
    dispatch(requestOtpSuccess());
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) return;

    dispatch(
      loginSuccess({
        user: {
          id: `usr_${Date.now()}`,
          mobileNumber: `${countryCode}${mobileNumber}`,
          name: 'Traveler',
        },
      })
    );
    onClose?.();
  };

  if (step === 'otp') {
    const isOtpValid = otp.length >= 4;

    return (
      <form className="space-y-4" onSubmit={handleOtpSubmit}>
        <div className="flex flex-col items-center">
          <input
            placeholder="• • • •"
            maxLength={6}
            required
            type="tel"
            value={otp}
            onChange={handleOtpChange}
            autoFocus
            aria-label="One-Time Password"
            className="w-full bg-[#f4f5f7] border-2 border-transparent rounded-xl py-3.5 px-4 text-xl font-extrabold tracking-[0.5em] text-center text-charcoal outline-none transition-all placeholder:text-gray-400 placeholder:font-semibold placeholder:tracking-normal placeholder:text-sm hover:border-gray-300 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20"
          />
          <button
            type="button"
            onClick={() => dispatch(requestOtpSuccess())}
            className="bg-transparent border-none text-xs font-bold text-amber-700 cursor-pointer mt-3 transition-colors hover:text-amber-900 hover:underline"
          >
            Resend OTP
          </button>
        </div>

        {error && (
          <p className="text-xs font-semibold text-red-600 text-center">
            {error}
          </p>
        )}

        <motion.button
          type="submit"
          disabled={!isOtpValid || isLoading}
          whileHover={isOtpValid ? { scale: 1.01 } : {}}
          whileTap={isOtpValid ? { scale: 0.98 } : {}}
          className="w-full rounded-xl flex justify-center items-center p-3.5 text-sm font-extrabold tracking-widest cursor-pointer mt-5 relative overflow-hidden bg-primary text-charcoal border-none font-jakarta transition-all duration-300 before:content-[''] before:absolute before:inset-0 before:bg-black before:scale-x-0 before:origin-left before:transition-transform before:duration-500 before:ease-out before:z-0 hover:not-disabled:text-white hover:not-disabled:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:not-disabled:before:scale-x-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-80"
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {isLoading ? 'VERIFYING...' : 'VERIFY & LOGIN'}
          </span>
        </motion.button>
      </form>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handlePhoneSubmit}>
      <div className="flex gap-2.5 w-full">
        <select
          aria-label="Country Code"
          value={countryCode}
          onChange={handleCountryCodeChange}
          className="bg-[#f4f5f7] border-2 border-transparent rounded-xl py-3.5 px-2.5 sm:px-3.5 text-sm font-bold text-gray-900 outline-none cursor-pointer shrink-0 transition-all hover:border-gray-300 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20"
        >
          <option value="+91">🇮🇳 +91</option>
          <option value="+1">🇺🇸 +1</option>
        </select>

        <input
          placeholder="Mobile Number"
          maxLength={10}
          required
          type="tel"
          value={mobileNumber}
          onChange={handleMobileChange}
          autoFocus
          aria-label="Mobile Number"
          className="flex-1 w-full min-w-0 bg-[#f4f5f7] border-2 border-transparent rounded-xl py-3.5 px-4 text-sm font-bold text-gray-900 outline-none shadow-xs transition-all placeholder:text-gray-400 placeholder:font-semibold hover:border-gray-300 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20"
        />
      </div>

      {error && (
        <p className="text-xs font-semibold text-red-600 text-center">
          {error}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={!isMobileComplete || isLoading}
        whileHover={isMobileComplete ? { scale: 1.01 } : {}}
        whileTap={isMobileComplete ? { scale: 0.98 } : {}}
        className="w-full rounded-xl flex justify-center items-center p-3.5 text-sm font-extrabold tracking-widest cursor-pointer mt-5 relative overflow-hidden bg-primary text-charcoal border-none font-jakarta transition-all duration-300 before:content-[''] before:absolute before:inset-0 before:bg-black before:scale-x-0 before:origin-left before:transition-transform before:duration-500 before:ease-out before:z-0 hover:not-disabled:text-white hover:not-disabled:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:not-disabled:before:scale-x-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-80"
      >
        <span className="relative z-10">
          {isLoading ? 'SENDING OTP...' : 'GET OTP'}
        </span>
      </motion.button>

      <div className="text-center mt-6 pt-1">
        <p className="text-xs sm:text-sm font-semibold text-gray-500">
          Are you a trip partner ?
          <Link
            href="/trip-partner/login"
            onClick={onClose}
            className="text-amber-700 font-bold ml-1 no-underline transition-colors hover:text-amber-900 hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
};

const emptySubscribe = () => () => {};
const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
};

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen: propIsOpen,
  onClose,
  onSubmitOtp,
}) => {
  const dispatch = useAppDispatch();
  const reduxIsOpen = useAppSelector(selectIsLoginModalOpen);
  const step = useAppSelector(selectAuthStep);
  const countryCode = useAppSelector(selectCountryCode);
  const mobileNumber = useAppSelector(selectMobileNumber);

  const isMounted = useIsMounted();
  const isOpen = propIsOpen !== undefined ? propIsOpen : reduxIsOpen;

  const handleClose = useCallback(() => {
    dispatch(closeLoginModal());
    dispatch(resetLoginForm());
    onClose?.();
  }, [dispatch, onClose]);

  const handleBackToPhone = () => {
    dispatch(setStep('phone'));
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="login-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-modal-heading"
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/55 backdrop-blur-md"
        >
          <motion.div
            key="login-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[400px] bg-white border border-black/[0.08] rounded-[2rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden p-7 pt-8 sm:p-9 sm:pt-10 sm:pb-8"
          >
            {/* Back button if on OTP step */}
            {step === 'otp' && (
              <button
                type="button"
                aria-label="Back to phone number"
                onClick={handleBackToPhone}
                className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 border-0 cursor-pointer z-50"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>
            )}

            {/* Close Button */}
            <button
              type="button"
              aria-label="Close"
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 hover:rotate-90 transition-all duration-200 border-0 cursor-pointer z-50"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Brand Header */}
            <div className="flex flex-col items-center mb-6">
              <h2 id="login-modal-heading" className="text-2xl leading-8 font-black font-jakarta text-charcoal tracking-tight text-center">
                {step === 'otp' ? (
                  <>
                    Verify <span className="text-primary">OTP</span>
                  </>
                ) : (
                  <>
                    Login <span className="text-primary">/ Signup</span>
                  </>
                )}
              </h2>
              <p className="text-gray-500 text-sm font-semibold text-center mt-1">
                {step === 'otp'
                  ? 'Enter the verification code sent to'
                  : 'Enter your mobile number to get OTP'}
              </p>
              {step === 'otp' && mobileNumber && (
                <div className="inline-flex items-center gap-2 mt-1.5 bg-amber-50 border border-amber-200 py-1 px-2.5 rounded-full text-xs font-bold text-amber-900">
                  <span>
                    {countryCode} {mobileNumber}
                  </span>
                </div>
              )}
            </div>

            {/* Login / OTP Form */}
            <LoginForm onClose={handleClose} onSubmitOtp={onSubmitOtp} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
