import type React from 'react';
import type { PartnerTripItem } from './trips.types';

export interface TripPartnerDashboardProps {
  username: string;
  displayName: string;
}

export interface TripPartnerMyTripsProps {
  username: string;
}

export interface TripPartnerTripCardProps {
  trip: PartnerTripItem;
  onEdit?: (trip: PartnerTripItem) => void;
  onDelete?: (tripId: string) => void;
  onArchive?: (tripId: string) => void;
  onCopyDetails?: (trip: PartnerTripItem) => void;
  priority?: boolean;
}

export interface TripPartnerStatCardProps {
  label: string;
  value: string | number;
  trend: {
    percentage: number;
    text: string;
    isPositive: boolean;
  };
  icon: React.ComponentType<{ className?: string }>;
}

export interface TripPartnerSidebarProps {
  username: string;
}

export interface TripPartnerHeaderProps {
  username: string;
  displayName: string;
}

export interface TripPartnerLayoutProps {
  children: React.ReactNode;
  username: string;
}

export interface TripPartnerLogoutModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  displayName?: string;
}

export interface TripPartnerMobileNavProps {
  username: string;
}
