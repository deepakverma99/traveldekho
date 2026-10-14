'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitOtp?: (data: { countryCode: string; mobileNumber: string }) => void;
}

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`;

const ModalCard = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 380px;
  min-height: 450px;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[200]};
  border-radius: 1rem;
  box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: 640px) {
    min-height: 500px;
  }
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 1.25rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: ${colors.gray[400]};
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 100;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.gray[100]};
    color: ${colors.gray[900]};
  }
`;

const LogoContainer = styled.div`
  position: relative;
  height: 9rem;
  width: 16rem;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05));
  transition: filter 0.3s ease;
  cursor: pointer;
  margin-top: -1rem;
  margin-bottom: 0;

  @media (min-width: 640px) {
    height: 11rem;
    width: 20rem;
  }

  @media (min-width: 768px) {
    height: 13rem;
    width: 24rem;
  }

  &:hover {
    filter: drop-shadow(0 4px 12px rgba(255, 209, 51, 0.5));
  }
`;

const Badge = styled.div`
  color: ${colors.gray[900]};
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.black};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  background-color: rgba(255, 209, 51, 0.2);
  padding: 0.5rem 1.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 209, 51, 0.5);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-top: 0.5rem;

  @media (min-width: 768px) {
    font-size: ${typography.sizes.base};
  }
`;

const CountrySelect = styled.select`
  background-color: ${colors.gray[50]};
  border: 2px solid ${colors.gray[200]};
  border-radius: 0.75rem;
  padding: 1rem 0.5rem;
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.bold};
  color: ${colors.gray[900]};
  outline: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  flex-shrink: 0;
  transition: colors 0.2s ease, border-color 0.2s ease;

  @media (min-width: 640px) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  &:hover {
    border-color: ${colors.gray[300]};
  }

  &:focus {
    background-color: ${colors.white};
    border-color: ${colors.primaryContainer};
  }
`;

const PhoneInput = styled.input`
  flex: 1;
  width: 100%;
  min-width: 0;
  background-color: ${colors.gray[50]};
  border: 2px solid ${colors.gray[200]};
  border-radius: 0.75rem;
  padding: 1rem 0.75rem;
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.bold};
  color: ${colors.gray[900]};
  outline: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  @media (min-width: 640px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  &::placeholder {
    color: ${colors.gray[400]};
  }

  &:hover {
    border-color: ${colors.gray[300]};
  }

  &:focus {
    background-color: ${colors.white};
    border-color: ${colors.primaryContainer};
    box-shadow: 0 0 0 4px rgba(255, 209, 51, 0.2);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: ${colors.primaryContainer};
  color: ${colors.primaryContainerText};
  font-weight: ${typography.weights.black};
  padding: 1rem 0;
  margin-top: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 8px 20px -6px rgba(255, 209, 51, 0.5);
  font-size: ${typography.sizes.sm};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: ${colors.black};
    color: ${colors.white};
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25);
  }

  &:disabled {
    opacity: 0.5;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

interface LoginFormProps {
  onClose: () => void;
  onSubmitOtp?: (data: { countryCode: string; mobileNumber: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSubmitOtp }) => {
  const [countryCode, setCountryCode] = useState('+91');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(rawValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length === 10) {
      onSubmitOtp?.({ countryCode, mobileNumber });
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex gap-2 w-full">
        <CountrySelect
          aria-label="Country Code"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="bg-gray-50 border-2 border-gray-200 hover:border-gray-300 rounded-xl px-2 sm:px-3 py-4 text-sm font-bold outline-none focus:bg-white focus:border-[#FFD133] text-gray-900 shadow-sm cursor-pointer transition-colors shrink-0"
        >
          <option value="+91">🇮🇳 +91</option>
          <option value="+1">🇺🇸 +1</option>
        </CountrySelect>

        <PhoneInput
          className="flex-1 w-full min-w-0 bg-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:bg-white focus:border-[#FFD133] focus:ring-4 focus:ring-[#FFD133]/20 rounded-xl py-4 px-3 sm:px-4 text-sm font-bold text-gray-900 placeholder:text-gray-400 outline-none transition-all shadow-sm"
          placeholder="Mobile Number"
          maxLength={10}
          required
          type="tel"
          value={mobileNumber}
          onChange={handleMobileChange}
          autoFocus
        />
      </div>

      <SubmitButton
        className="w-full bg-[#FFD133] text-[#715a00] font-black py-4 mt-6 rounded-xl shadow-[0_8px_20px_-6px_rgba(255,209,51,0.5)] hover:bg-black hover:text-white transition-all duration-300 text-sm uppercase tracking-widest disabled:opacity-50 disabled:shadow-none"
        type="submit"
        disabled={mobileNumber.length !== 10}
        tabIndex={0}
      >
        Get OTP
      </SubmitButton>

      <div className="text-center mt-8">
        <p className="text-sm font-semibold text-gray-500">
          Are you a vendor?{' '}
          <Link
            href="/trip-partner/login"
            onClick={onClose}
            className="text-amber-700 hover:text-black transition-colors"
          >
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
};

// Safe client-side mount hook for portal without setState in useEffect
const emptySubscribe = () => () => {};
const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
};

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSubmitOtp,
}) => {
  const isMounted = useIsMounted();

  // Handle Escape key press and scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          key="login-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-modal-heading"
        >
          <ModalCard
            key="login-modal-card"
            className="relative w-full max-w-[380px] min-h-[450px] sm:min-h-[500px] bg-white border border-gray-200 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] z-10 flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalContent className="w-full h-full flex-1 p-5 sm:p-8 rounded-2xl relative overflow-hidden flex flex-col justify-center">
              {/* Close Button */}
              <CloseButton
                aria-label="Close"
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors z-[100]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </CloseButton>

              <div className="relative z-10 pt-4">
                {/* Brand Header */}
                <div className="flex flex-col items-center mb-6">
                  <LogoContainer className="group/logo relative h-36 sm:h-44 md:h-52 w-64 sm:w-80 md:w-96 filter drop-shadow-sm hover:drop-shadow-[0_4px_12px_rgba(255,209,51,0.5)] transition-all duration-300 mb-0 cursor-pointer -mt-4">
                    <Image
                      alt="TravelDekho"
                      src="/TravelDekho animated logo.gif"
                      fill
                      unoptimized
                      priority
                      className="object-contain"
                    />
                  </LogoContainer>

                  <Badge
                    id="login-modal-heading"
                    className="text-gray-900 text-sm md:text-base font-black uppercase tracking-[0.15em] bg-[#FFD133]/20 px-6 py-2 rounded-2xl border border-[#FFD133]/50 shadow-sm mt-2"
                  >
                    Login / Signup
                  </Badge>
                </div>

                {/* Login Form with isolated state */}
                <LoginForm onClose={onClose} onSubmitOtp={onSubmitOtp} />
              </div>
            </ModalContent>
          </ModalCard>
        </Backdrop>
      )}
    </AnimatePresence>,
    document.body
  );
};
