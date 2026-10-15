'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { X, CheckCircle, Calendar, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { TripDetail, DateSlot } from './types';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

interface TripBookingModalProps {
  trip: TripDetail;
  selectedSlot: DateSlot;
  travellers: number;
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: opacity 0.2s ease;
`;

const ModalCard = styled.div`
  position: relative;
  background-color: ${colors.white};
  border-radius: 1.5rem;
  max-width: 32rem;
  width: 100%;
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid ${colors.gray[100]};
  z-index: 10;
  overflow: hidden;

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: ${colors.gray[100]};
  color: ${colors.gray[500]};
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${colors.gray[200]};
  }
`;

const ReservationBadge = styled.span`
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${colors.amber[600]};
  background-color: ${colors.amber[50]};
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  border: 1px solid ${colors.amber[200]}80;
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 900;
  color: ${colors.gray[900]};
  margin-top: 0.5rem;
  letter-spacing: -0.01em;
  font-family: ${typography.fonts.jakarta};
`;

const BookingInfoPill = styled.div`
  background-color: ${colors.gray[50]};
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid ${colors.gray[100]};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CalendarSquare = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  background-color: ${colors.amber[100]};
  color: ${colors.amber[700]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${colors.gray[200]};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.gray[900]};
  outline: none;
  transition: border-color 0.15s ease;

  &:focus {
    border-color: ${colors.amber[400]};
  }
`;

const FormLabel = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${colors.gray[700]};
  margin-bottom: 0.375rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CheckoutButton = styled.button`
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.875rem 1rem;
  background-color: ${colors.amber[400]};
  color: ${colors.gray[900]};
  font-weight: 800;
  border-radius: 0.75rem;
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.black};
    color: ${colors.white};
  }
`;

export const TripBookingModal: React.FC<TripBookingModalProps> = ({
  trip,
  selectedSlot,
  travellers,
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const totalAmount = selectedSlot.price * travellers;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <ModalOverlay>
      {/* Backdrop */}
      <Backdrop onClick={onClose} aria-hidden="true" />

      {/* Modal Card */}
      <ModalCard className="animate-fade-in-up">
        {/* Close Button */}
        <CloseButton
          type="button"
          onClick={onClose}
          aria-label="Close booking modal"
        >
          <X style={{ width: '1rem', height: '1rem' }} />
        </CloseButton>

        {!isSuccess ? (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <ReservationBadge>Confirm Reservation</ReservationBadge>
              <ModalTitle>{trip.title}</ModalTitle>
            </div>

            {/* Selected Booking Info Pill */}
            <BookingInfoPill>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <CalendarSquare>
                  <Calendar style={{ width: '1rem', height: '1rem' }} />
                </CalendarSquare>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.gray[900] }}>
                    {selectedSlot.date}
                  </p>
                  <p style={{ fontSize: '11px', color: colors.gray[500], fontWeight: 500 }}>
                    {trip.duration}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users style={{ width: '1rem', height: '1rem', color: colors.purple[600] }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: colors.gray[900] }}>
                  {travellers} {travellers === 1 ? 'Traveller' : 'Travellers'}
                </span>
              </div>
            </BookingInfoPill>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <FormLabel>Full Name</FormLabel>
                <FormInput
                  type="text"
                  required
                  placeholder="e.g. Deepak Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <FormLabel>Email Address</FormLabel>
                <FormInput
                  type="email"
                  required
                  placeholder="e.g. traveller@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <FormLabel>Phone Number</FormLabel>
                <FormInput
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Price Breakdown */}
              <div
                style={{
                  paddingTop: '0.75rem',
                  borderTop: `1px solid ${colors.gray[100]}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: colors.gray[400],
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Total Payable Amount
                  </p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 900, color: colors.gray[900] }}>
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    fontSize: '0.75rem',
                    color: colors.green[700],
                    backgroundColor: colors.green[50],
                    padding: '0.375rem 0.75rem',
                    borderRadius: '9999px',
                    border: `1px solid ${colors.green[100]}`,
                  }}
                >
                  <ShieldCheck style={{ width: '1rem', height: '1rem' }} />
                  <span style={{ fontWeight: 700 }}>Scout Protected</span>
                </div>
              </div>

              <CheckoutButton type="submit">
                <span>Proceed to Secure Checkout</span>
                <ArrowRight style={{ width: '1rem', height: '1rem' }} />
              </CheckoutButton>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
            <div
              style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: colors.green[100],
                color: colors.green[600],
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}
              className="animate-bounce"
            >
              <CheckCircle style={{ width: '2rem', height: '2rem' }} />
            </div>
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                color: colors.gray[900],
                marginBottom: '0.5rem',
                fontFamily: typography.fonts.jakarta,
              }}
            >
              Booking Request Received!
            </h3>
            <p style={{ fontSize: '0.875rem', color: colors.gray[600], marginBottom: '1.5rem', lineHeight: 1.625 }}>
              Thank you, <span style={{ fontWeight: 700, color: colors.gray[900] }}>{name}</span>! Our certified Scout Captain will contact you via WhatsApp / Phone at <span style={{ fontWeight: 700, color: colors.gray[900] }}>{phone}</span> with your itinerary details and confirmation voucher.
            </p>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: colors.amber[400],
                color: colors.black,
                fontWeight: 800,
                fontSize: '0.875rem',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
              }}
            >
              Back to Trip Details
            </button>
          </div>
        )}
      </ModalCard>
    </ModalOverlay>
  );
};
