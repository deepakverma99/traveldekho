'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
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

const FormRoot = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SuccessAlert = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: ${colors.green[50]};
  border: 1px solid ${colors.green[100]};
  color: ${colors.green[700]};
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 0.75rem;
`;

const SuccessIcon = styled(CheckCircle2)`
  width: 1rem;
  height: 1rem;
  color: ${colors.green[600]};
  flex-shrink: 0;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input<{ $hasRightIcon?: boolean }>`
  width: 100%;
  background-color: ${colors.gray[100]};
  border: 2px solid ${colors.transparent};
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  padding-right: ${({ $hasRightIcon }) => ($hasRightIcon ? '3rem' : '1.25rem')};
  font-size: 0.875rem;
  font-weight: 700;
  color: ${colors.gray[900]};
  outline: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  font-family: ${typography.fonts.sans};

  &::placeholder {
    color: ${colors.gray[400]};
  }

  &:hover {
    border-color: ${colors.gray[300]};
  }

  &:focus {
    border-color: ${colors.primaryContainer};
    box-shadow: 0 0 0 4px ${colors.primaryContainer}33;
  }
`;

const ToggleVisibilityBtn = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.gray[400]};
  padding: 0.25rem;
  cursor: pointer;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.black};
  }
`;

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
    <FormRoot onSubmit={handleSubmit}>
      {isSuccess && (
        <SuccessAlert className="animate-fade-in-up">
          <SuccessIcon />
          <span>Login successful! Redirecting to partner dashboard...</span>
        </SuccessAlert>
      )}

      <div>
        <StyledInput
          placeholder="Trip Partner Email"
          type="email"
          required
          autoFocus
          value={email}
          onChange={(e) => dispatch(setPartnerLoginEmail(e.target.value))}
          autoComplete="email"
          aria-label="Trip Partner Email"
        />
      </div>

      <InputWrapper>
        <StyledInput
          $hasRightIcon
          placeholder="Trip Partner Password"
          type={showPassword ? 'text' : 'password'}
          required
          value={password}
          onChange={(e) => dispatch(setPartnerLoginPassword(e.target.value))}
          autoComplete="current-password"
          aria-label="Trip Partner Password"
        />
        <ToggleVisibilityBtn
          type="button"
          onClick={() => dispatch(togglePartnerLoginShowPassword())}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Eye className="w-4 h-4" aria-hidden="true" />
          )}
        </ToggleVisibilityBtn>
      </InputWrapper>

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
    </FormRoot>
  );
};

