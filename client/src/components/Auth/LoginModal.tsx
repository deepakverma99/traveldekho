'use client';

import React, { useEffect, useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
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
  closeLoginModal,
  setCountryCode,
  setMobileNumber,
  setOtp,
  setStep,
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

const BackStepButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  color: ${colors.gray[500]};
  background-color: ${colors.gray[100]};
  border: none;
  cursor: pointer;
  z-index: 100;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.gray[200]};
    color: ${colors.gray[900]};
  }
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 900;
  font-family: ${typography.fonts.jakarta};
  color: ${colors.charcoal};
  letter-spacing: -0.025em;
  text-align: center;
`;

const TitleAccent = styled.span`
  color: ${colors.gold};
`;

const ModalSubtitle = styled.p`
  color: ${colors.gray[500]};
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  margin-top: 0.25rem;
`;

const ActiveMobileDisplay = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.35rem;
  background-color: ${colors.amber[50]};
  border: 1px solid ${colors.amber[200]};
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${colors.amber[900]};
`;

const InputRow = styled.div`
  display: flex;
  gap: 0.625rem;
  width: 100%;
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

const OtpInput = styled.input`
  width: 100%;
  background-color: #f4f5f7;
  border: 2px solid transparent;
  border-radius: 0.75rem;
  padding: 0.875rem 1rem;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.5em;
  text-align: center;
  color: ${colors.charcoal};
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${colors.gray[400]};
    font-weight: 600;
    letter-spacing: normal;
    font-size: 0.875rem;
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
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const PartnerFooterWrapper = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 0.25rem;
`;

const PartnerText = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${colors.gray[500]};

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

const PartnerLink = styled(Link)`
  color: ${colors.amber[700]};
  font-weight: 700;
  margin-left: 0.25rem;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.amber[900]};
    text-decoration: underline;
  }
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${colors.amber[700]};
  cursor: pointer;
  margin-top: 0.75rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.amber[900]};
    text-decoration: underline;
  }
`;

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

    // Simulate OTP verification & authentication success
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
          <OtpInput
            placeholder="• • • •"
            maxLength={6}
            required
            type="tel"
            value={otp}
            onChange={handleOtpChange}
            autoFocus
            aria-label="One-Time Password"
          />
          <ResendButton
            type="button"
            onClick={() => dispatch(requestOtpSuccess())}
          >
            Resend OTP
          </ResendButton>
        </div>

        {error && (
          <p className="text-xs font-semibold text-red-600 text-center">
            {error}
          </p>
        )}

        <SubmitButton
          type="submit"
          disabled={!isOtpValid || isLoading}
          whileHover={isOtpValid ? { scale: 1.01 } : {}}
          whileTap={isOtpValid ? { scale: 0.98 } : {}}
        >
          <span>
            <CheckCircle2 className="w-4 h-4" />
            {isLoading ? 'VERIFYING...' : 'VERIFY & LOGIN'}
          </span>
        </SubmitButton>
      </form>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handlePhoneSubmit}>
      <InputRow>
        <CountrySelect
          aria-label="Country Code"
          value={countryCode}
          onChange={handleCountryCodeChange}
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
      </InputRow>

      {error && (
        <p className="text-xs font-semibold text-red-600 text-center">
          {error}
        </p>
      )}

      <SubmitButton
        type="submit"
        disabled={!isMobileComplete || isLoading}
        whileHover={isMobileComplete ? { scale: 1.01 } : {}}
        whileTap={isMobileComplete ? { scale: 0.98 } : {}}
      >
        <span>{isLoading ? 'SENDING OTP...' : 'GET OTP'}</span>
      </SubmitButton>

      <PartnerFooterWrapper>
        <PartnerText>
          Are you a trip partner ?
          <PartnerLink href="/trip-partner/login" onClick={onClose}>
            Login here
          </PartnerLink>
        </PartnerText>
      </PartnerFooterWrapper>
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

  // Handle Escape key press and scroll locking
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
        <Backdrop
          key="login-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
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
            {/* Back button if on OTP step */}
            {step === 'otp' && (
              <BackStepButton
                aria-label="Back to phone number"
                onClick={handleBackToPhone}
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </BackStepButton>
            )}

            {/* Close Button */}
            <CloseButton aria-label="Close" onClick={handleClose}>
              <X className="w-4 h-4" aria-hidden="true" />
            </CloseButton>

            {/* Brand Header */}
            <ModalHeader>
              <ModalTitle id="login-modal-heading">
                {step === 'otp' ? (
                  <>
                    Verify <TitleAccent>OTP</TitleAccent>
                  </>
                ) : (
                  <>
                    Login <TitleAccent>/ Signup</TitleAccent>
                  </>
                )}
              </ModalTitle>
              <ModalSubtitle>
                {step === 'otp'
                  ? 'Enter the verification code sent to'
                  : 'Enter your mobile number to get OTP'}
              </ModalSubtitle>
              {step === 'otp' && mobileNumber && (
                <ActiveMobileDisplay>
                  <span>
                    {countryCode} {mobileNumber}
                  </span>
                </ActiveMobileDisplay>
              )}
            </ModalHeader>

            {/* Login / OTP Form */}
            <LoginForm onClose={handleClose} onSubmitOtp={onSubmitOtp} />
          </ModalCard>
        </Backdrop>
      )}
    </AnimatePresence>,
    document.body
  );
};
