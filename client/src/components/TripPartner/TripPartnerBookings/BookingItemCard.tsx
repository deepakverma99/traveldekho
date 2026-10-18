'use client';

import React from 'react';
import { Users, Mail, Calendar, Check, Trash2, ExternalLink } from 'lucide-react';
import {
  BookingCard,
  TravelerDetailsLeft,
  TravelerAvatar,
  TravelerTextMeta,
  BookingActionsRight,
  AmountBlock,
  StatusPillArea,
  MarkPaidButton,
  PaidBadge,
  ActionIconButton,
} from './styles';
import { TripPartnerBooking } from '../types';

interface BookingItemCardProps {
  booking: TripPartnerBooking;
  onMarkPaid: (bookingId: string) => void;
  onDelete: (bookingId: string) => void;
}

export const BookingItemCard: React.FC<BookingItemCardProps> = ({
  booking,
  onMarkPaid,
  onDelete,
}) => {
  const isPaid = booking.paymentStatus === 'paid';
  const guests = booking.guestsCount || 1;
  const travelDate = booking.travelDate || '30/10/2026';
  const bookingDate = booking.bookingDate || '18 OCT 2026';

  return (
    <BookingCard>
      {/* Left: Avatar & Traveler Details */}
      <TravelerDetailsLeft>
        <TravelerAvatar>
          <Users className="w-5 h-5 stroke-[2.2]" />
        </TravelerAvatar>

        <TravelerTextMeta>
          <h3>{booking.travelerName}</h3>

          {booking.travelerPhone && (
            <p className="phone">{booking.travelerPhone}</p>
          )}

          <p className="email">
            <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{booking.travelerEmail}</span>
          </p>

          <p className="details">
            <span>{guests} {guests > 1 ? 'GUESTS' : 'GUEST'}</span>
            <span>•</span>
            <Calendar className="w-3 h-3 text-gray-400" />
            <span>{travelDate}</span>
          </p>
        </TravelerTextMeta>
      </TravelerDetailsLeft>

      {/* Right: Amount, Status, Paid Action, and Icon Buttons */}
      <BookingActionsRight>
        {/* Amount */}
        <AmountBlock>
          <span className="label">Amount</span>
          <span className="value">₹{booking.amount?.toLocaleString('en-IN')}</span>
        </AmountBlock>

        {/* Status Pill & Booking Date */}
        <StatusPillArea>
          <span className="badge">
            {booking.status || 'BOOKED'}
          </span>
          <span className="date">{bookingDate}</span>
        </StatusPillArea>

        {/* Mark Paid / Paid Status */}
        {isPaid ? (
          <PaidBadge>
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>PAID</span>
          </PaidBadge>
        ) : (
          <MarkPaidButton
            type="button"
            onClick={() => onMarkPaid(booking.id)}
            title="Click to mark this booking as paid"
          >
            <span>💰</span>
            <span>MARK PAID</span>
          </MarkPaidButton>
        )}

        {/* Action Icon Buttons */}
        <div className="flex items-center gap-1.5">
          <ActionIconButton
            type="button"
            $variant="danger"
            onClick={() => {
              if (window.confirm(`Are you sure you want to remove booking for ${booking.travelerName}?`)) {
                onDelete(booking.id);
              }
            }}
            title="Delete Booking"
            aria-label="Delete booking"
          >
            <Trash2 />
          </ActionIconButton>

          <ActionIconButton
            type="button"
            $variant="default"
            onClick={() => {
              alert(`Booking ID: ${booking.id}\nTraveler: ${booking.travelerName}\nAmount: ₹${booking.amount}`);
            }}
            title="View Booking Details"
            aria-label="View booking details"
          >
            <ExternalLink />
          </ActionIconButton>
        </div>
      </BookingActionsRight>
    </BookingCard>
  );
};
