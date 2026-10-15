'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { extractUsernameFromEmail, savePartnerSession } from './utils/partnerAuth';

const SearchSubmitButton = styled(motion.button)`
  width: 100%;
  border-radius: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.875rem;
  font-size: 0.875rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  cursor: pointer;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
  background-color: ${colors.gold};
  color: ${colors.charcoal};
  border: none;
  font-family: ${typography.fonts.jakarta};
  transition: color 0.4s ease, box-shadow 0.4s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: ${colors.black};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
  }

  &:hover:not(:disabled) {
    color: ${colors.white};
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);

    &::before {
      transform: scaleX(1);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }

  > span,
  > svg {
    position: relative;
    z-index: 10;
  }
`;

export const TripPartnerLoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('travellr@gmail.com');
  const [password, setPassword] = useState('travellr@123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Development mode: extract username prefix and save session
    const username = extractUsernameFromEmail(email);
    savePartnerSession({ email, username });

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push(`/trip-partner/${username}/dashboard`);
      }, 350);
    }, 600);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {isSuccess && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-bold rounded-xl animate-fade-in-up">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>Login successful! Redirecting to partner dashboard...</span>
        </div>
      )}

      <div>
        <input
          className="w-full bg-[#f4f5f7] border-2 border-transparent hover:border-gray-300 focus:border-[#FFD133] focus:ring-4 focus:ring-[#FFD133]/20 rounded-xl py-4 px-5 text-sm font-bold text-gray-900 placeholder:text-gray-400 outline-none transition-all shadow-sm"
          placeholder="Trip Partner Email"
          type="email"
          required
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          aria-label="Trip Partner Email"
        />
      </div>

      <div className="relative">
        <input
          className="w-full bg-[#f4f5f7] border-2 border-transparent hover:border-gray-300 focus:border-[#FFD133] focus:ring-4 focus:ring-[#FFD133]/20 rounded-xl py-4 px-5 pr-12 text-sm font-bold text-gray-900 placeholder:text-gray-400 outline-none transition-all shadow-sm"
          placeholder="Trip Partner Password"
          type={showPassword ? 'text' : 'password'}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          aria-label="Trip Partner Password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors cursor-pointer p-1"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Eye className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <SearchSubmitButton
        type="submit"
        disabled={isLoading}
        whileHover={isLoading ? {} : { scale: 1.01 }}
        whileTap={isLoading ? {} : { scale: 0.98 }}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            <span>VERIFYING...</span>
          </>
        ) : (
          <span>SECURE LOGIN</span>
        )}
      </SearchSubmitButton>
    </form>
  );
};
