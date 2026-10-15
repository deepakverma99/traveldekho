'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
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
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

const ModalCard = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 400px;
  background-color: ${colors.white};
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 2rem;
  box-shadow: 0 25px 70px -15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 2rem 1.75rem 1.75rem;

  @media (min-width: 640px) {
    padding: 2.5rem 2.25rem 2rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  color: ${colors.gray[400]};
  background-color: ${colors.gray[100]};
  border: none;
  cursor: pointer;
  z-index: 100;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.gray[200]};
    color: ${colors.gray[900]};
    transform: rotate(90deg);
  }
`;

const CountrySelect = styled.select`
  background-color: #f4f5f7;
  border: 2px solid transparent;
  border-radius: 0.75rem;
  padding: 0.875rem 0.625rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: ${colors.gray[900]};
  outline: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;

  @media (min-width: 640px) {
    padding-left: 0.875rem;
    padding-right: 0.875rem;
  }

  &:hover {
    border-color: ${colors.gray[300]};
  }

  &:focus {
    background-color: ${colors.white};
    border-color: ${colors.gold};
    box-shadow: 0 0 0 4px rgba(250, 203, 43, 0.2);
  }
`;

const PhoneInput = styled.input`
  flex: 1;
  width: 100%;
  min-width: 0;
  background-color: #f4f5f7;
  border: 2px solid transparent;
  border-radius: 0.75rem;
  padding: 0.875rem 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: ${colors.gray[900]};
  outline: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;

  &::placeholder {
    color: ${colors.gray[400]};
    font-weight: 600;
  }

  &:hover {
    border-color: ${colors.gray[300]};
  }

  &:focus {
    background-color: ${colors.white};
    border-color: ${colors.gold};
    box-shadow: 0 0 0 4px rgba(250, 203, 43, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
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
  margin-top: 1.25rem;
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
    background-color: ${colors.gray[200]};
    color: ${colors.gray[400]};
    box-shadow: none;
    cursor: not-allowed;
    opacity: 0.8;
  }

  > span {
    position: relative;
    z-index: 10;
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

  const isComplete = mobileNumber.length === 10;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex gap-2.5 w-full">
        <CountrySelect
          aria-label="Country Code"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        >
          <option value="+91">🇮🇳 +91</option>
          <option value="+1">🇺🇸 +1</option>
        </CountrySelect>

        <PhoneInput
          placeholder="Mobile Number"
          maxLength={10}
          required
          type="tel"
          value={mobileNumber}
          onChange={handleMobileChange}
          autoFocus
          aria-label="Mobile Number"
        />
      </div>

      <SubmitButton
        type="submit"
        disabled={!isComplete}
        whileHover={isComplete ? { scale: 1.01 } : {}}
        whileTap={isComplete ? { scale: 0.98 } : {}}
      >
        <span>GET OTP</span>
      </SubmitButton>

      <div className="text-center mt-6 pt-1">
        <p className="text-xs sm:text-sm font-semibold text-gray-500">
          Are you a trip partner ?{' '}
          <Link
            href="/trip-partner/login"
            onClick={onClose}
            className="text-amber-700 hover:text-amber-900 font-bold hover:underline transition-colors ml-1"
          >
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
};

// Safe client-side mount hook for portal without setState in useEffect
const emptySubscribe = () => () => { };
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
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <CloseButton aria-label="Close" onClick={onClose}>
              <X className="w-4 h-4" aria-hidden="true" />
            </CloseButton>

            {/* Brand Header */}
            <div className="flex flex-col items-center mb-6">

              {/* Title & Subtitle */}
              <h2
                id="login-modal-heading"
                className="text-2xl font-black font-jakarta text-[#191c1d] tracking-tight text-center"
              >
                Login <span style={{ color: colors.gold }}>/ Signup</span>
              </h2>
              <p className="text-[#5e5e5e] text-xs sm:text-sm font-semibold text-center mt-1">
                Enter your mobile number to get OTP
              </p>
            </div>

            {/* Login Form */}
            <LoginForm onClose={onClose} onSubmitOtp={onSubmitOtp} />
          </ModalCard>
        </Backdrop>
      )}
    </AnimatePresence>,
    document.body
  );
};
