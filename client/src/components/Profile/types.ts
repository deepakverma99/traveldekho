import React from 'react';

export type ProfileTabId =
  | 'profile'
  | 'bookings'
  | 'wishlist'
  | 'reviews'
  | 'settings';

export interface ProfileTabItem {
  id: ProfileTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  badge?: number | string;
}

export interface UserProfileData {
  fullName: string;
  nickname: string;
  dateOfBirth: string;
  gender: string;
  location: string;
  email: string;
  phoneNumber: string;
  completedTrips: number;
  reviewsWritten: number;
  passportNo: string;
  nationality: string;
  authority: string;
}

export type EditableProfileField =
  | 'fullName'
  | 'nickname'
  | 'dateOfBirth'
  | 'gender'
  | 'location'
  | 'email';

export interface InfoRowConfig {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  icon: React.ComponentType<{ className?: string }>;
  isEditable?: boolean;
  fieldKey?: EditableProfileField;
  isAction?: boolean;
  actionType?: 'logout' | 'favorites' | 'history';
  isDestructive?: boolean;
}

