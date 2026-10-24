'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { extractUsernameFromEmail, savePartnerSession } from './utils/partnerAuth';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectPartnerLoginEmail,
  selectPartnerLoginPassword,
  selectPartnerLoginShowPassword,
  selectPartnerLoginLoading,
  selectPartnerLoginSuccess,
  setPartnerLoginEmail,
  setPartnerLoginPassword,
  togglePartnerLoginShowPassword,
  partnerLoginStart,
  partnerLoginSuccess,
} from '@/redux/slices/tripPartnerSlice';

export const TripPartnerLoginForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const email = useAppSelector(selectPartnerLoginEmail);
  const password = useAppSelector(selectPartnerLoginPassword);
  const showPassword = useAppSelector(selectPartnerLoginShowPassword);
  const isLoading = useAppSelector(selectPartnerLoginLoading);
  const isSuccess = useAppSelector(selectPartnerLoginSuccess);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    dispatch(partnerLoginStart());

    // Development mode: extract username prefix and save session
    const username = extractUsernameFromEmail(email);
    const partnerUser = savePartnerSession({ email, username });

    setTimeout(() => {
      dispatch(partnerLoginSuccess(partnerUser));
      setTimeout(() => {
        router.push(`/trip-partner/${username}/dashboard`);
      }, 350);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-jakarta">
      {isSuccess && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-bold rounded-xl animate-fade-in-up">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>Login successful! Redirecting to partner dashboard...</span>
        </div>
      )}

      <div>
        <input
          placeholder="Trip Partner Email"
          type="email"
          required
          autoFocus
          value={email}
          onChange={(e) => dispatch(setPartnerLoginEmail(e.target.value))}
          autoComplete="email"
          aria-label="Trip Partner Email"
          className="w-full bg-gray-100 border-2 border-transparent rounded-xl py-3.5 px-5 text-sm font-bold text-gray-900 outline-none shadow-xs transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
        />
      </div>

      <div className="relative w-full">
        <input
          placeholder="Trip Partner Password"
          type={showPassword ? 'text' : 'password'}
          required
          value={password}
          onChange={(e) => dispatch(setPartnerLoginPassword(e.target.value))}
          autoComplete="current-password"
          aria-label="Trip Partner Password"
          className="w-full bg-gray-100 border-2 border-transparent rounded-xl py-3.5 pl-5 pr-12 text-sm font-bold text-gray-900 outline-none shadow-xs transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
        />
        <button
          type="button"
          onClick={() => dispatch(togglePartnerLoginShowPassword())}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 p-1 cursor-pointer bg-transparent border-none flex items-center justify-center transition-colors hover:text-black"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Eye className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={isLoading ? {} : { scale: 1.01 }}
        whileTap={isLoading ? {} : { scale: 0.98 }}
        className="w-full rounded-xl flex justify-center items-center p-3.5 text-sm font-black tracking-widest cursor-pointer mt-4 relative overflow-hidden bg-primary text-charcoal border-none font-jakarta transition-all duration-300 hover:bg-neutral-900 hover:text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            <span>VERIFYING...</span>
          </>
        ) : (
          <span>SECURE LOGIN</span>
        )}
      </motion.button>
    </form>
  );
};
