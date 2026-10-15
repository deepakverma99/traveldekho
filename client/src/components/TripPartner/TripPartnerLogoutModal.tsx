'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { LogOut, X } from 'lucide-react';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export interface TripPartnerLogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  displayName?: string;
}

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: opacity 0.2s ease;
`;

const ModalCard = styled.div`
  position: relative;
  background-color: ${colors.white};
  border-radius: 1rem;
  max-width: 26rem;
  width: 100%;
  padding: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  border: 1px solid ${colors.gray[100]};
  z-index: 10;
  overflow: hidden;
  text-align: center;
  font-family: ${typography.fonts.jakarta};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.375rem;
  border-radius: 9999px;
  background-color: ${colors.gray[100]};
  color: ${colors.gray[500]};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${colors.gray[200]};
    color: ${colors.gray[800]};
  }
`;

const IconCircle = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  background-color: ${colors.red[50]};
  color: ${colors.red[600]};
  border: 1px solid ${colors.red[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem auto 1rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 900;
  color: ${colors.gray[900]};
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
`;

const ModalDescription = styled.p`
  font-size: 0.8125rem;
  color: ${colors.gray[500]};
  line-height: 1.5;
  margin-bottom: 1.5rem;

  strong {
    color: ${colors.gray[800]};
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${colors.gray[700]};
  background-color: ${colors.gray[100]};
  border: 1px solid ${colors.gray[200]};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${colors.gray[200]};
    color: ${colors.gray[900]};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ConfirmLogoutButton = styled.button`
  flex: 1;
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 800;
  color: ${colors.white};
  background-color: ${colors.red[600]};
  border: none;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${colors.red[700]};
    box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.25);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const TripPartnerLogoutModal: React.FC<TripPartnerLogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  displayName,
}) => {
  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
    <ModalOverlay>
      <Backdrop onClick={onClose} aria-hidden="true" />
      <ModalCard className="animate-fade-in-up" role="dialog" aria-modal="true" aria-labelledby="logout-title">
        <CloseButton type="button" onClick={onClose} aria-label="Close modal">
          <X className="w-4 h-4" />
        </CloseButton>

        <IconCircle>
          <LogOut className="w-5 h-5" />
        </IconCircle>

        <ModalTitle id="logout-title">Log Out of Partner Portal?</ModalTitle>

        <ModalDescription>
          Are you sure you want to log out{displayName ? <> of <strong>{displayName}</strong></> : ''}? You will need to log in again to manage your trips and bookings.
        </ModalDescription>

        <ButtonRow>
          <CancelButton type="button" onClick={onClose}>
            Cancel
          </CancelButton>
          <ConfirmLogoutButton type="button" onClick={onConfirm}>
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </ConfirmLogoutButton>
        </ButtonRow>
      </ModalCard>
    </ModalOverlay>
  );
};
