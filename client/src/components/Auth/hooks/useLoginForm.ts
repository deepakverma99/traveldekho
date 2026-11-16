'use client';

import { useCallback, useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  selectCountryCode,
  selectMobileNumber,
  selectIsMobileValid,
  selectAuthStep,
  selectAuthOtp,
  selectAuthLoading,
  selectAuthError,
  setCountryCode,
  setMobileNumber,
  setOtp,
  requestOtpStart,
  requestOtpSuccess,
  loginSuccess,
} from '@/redux';

export interface UseLoginFormProps {
  onClose?: () => void;
  onSubmitOtp?: (data: { countryCode: string; mobileNumber: string }) => void;
}

const DEFAULT_DEV_OTP = '1234';

export const useLoginForm = ({ onClose, onSubmitOtp }: UseLoginFormProps = {}) => {
  const dispatch = useAppDispatch();
  const countryCode = useAppSelector(selectCountryCode);
  const mobileNumber = useAppSelector(selectMobileNumber);
  const isMobileValid = useAppSelector(selectIsMobileValid);
  const step = useAppSelector(selectAuthStep);
  const otp = useAppSelector(selectAuthOtp);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [mockOtp, setMockOtp] = useState<string>(DEFAULT_DEV_OTP);

  const isDev = process.env.NODE_ENV !== 'production';
  const isOtpValid = isDev ? otp.length >= 1 : otp.length >= 4;

  const sendMockOtpAlert = useCallback((code: string) => {
    if (typeof window !== 'undefined') {
      window.alert(`[TravelDekho Dev Mode]\nYour Mock OTP is: ${code}`);
    }
  }, []);

  const handleMobileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setMobileNumber(e.target.value));
    },
    [dispatch]
  );

  const handleCountryCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setCountryCode(e.target.value));
    },
    [dispatch]
  );

  const handleOtpChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setOtp(e.target.value));
    },
    [dispatch]
  );

  const handlePhoneSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!isMobileValid) return;

      dispatch(requestOtpStart());
      onSubmitOtp?.({ countryCode, mobileNumber });
      dispatch(requestOtpSuccess());

      // In development mode, alert mock OTP
      if (isDev) {
        const generatedCode = DEFAULT_DEV_OTP;
        setMockOtp(generatedCode);
        sendMockOtpAlert(generatedCode);
      }
    },
    [isMobileValid, dispatch, onSubmitOtp, countryCode, mobileNumber, isDev, sendMockOtpAlert]
  );

  const handleResendOtp = useCallback(() => {
    dispatch(requestOtpSuccess());
    if (isDev) {
      sendMockOtpAlert(mockOtp);
    }
  }, [dispatch, isDev, sendMockOtpAlert, mockOtp]);

  const handleOtpSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!isOtpValid) return;

      dispatch(
        loginSuccess({
          user: {
            id: `usr_${Date.now()}`,
            mobileNumber: `${countryCode}${mobileNumber}`,
            name: 'Deepak',
          },
        })
      );
      onClose?.();
    },
    [isOtpValid, dispatch, countryCode, mobileNumber, onClose]
  );

  return {
    countryCode,
    mobileNumber,
    step,
    otp,
    isLoading,
    error,
    isMobileValid,
    isOtpValid,
    isDev,
    mockOtp,
    handleMobileChange,
    handleCountryCodeChange,
    handleOtpChange,
    handlePhoneSubmit,
    handleOtpSubmit,
    handleResendOtp,
  };
};

