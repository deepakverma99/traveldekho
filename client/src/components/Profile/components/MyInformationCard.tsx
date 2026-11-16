'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Calendar,
  Users,
  MapPin,
  Mail,
  Smartphone,
  Star,
  History,
  LogOut,
} from 'lucide-react';
import { UserProfileData, EditableProfileField } from '../types';
import { InfoRowItem } from './InfoRowItem';

interface MyInformationCardProps {
  profileData: UserProfileData;
  onEditField: (field: EditableProfileField) => void;
  onLogout: () => void;
  onNavigateToWishlist?: () => void;
  onNavigateToBookings?: () => void;
}

export const MyInformationCard: React.FC<MyInformationCardProps> = ({
  profileData,
  onEditField,
  onLogout,
  onNavigateToWishlist,
  onNavigateToBookings,
}) => {
  const router = useRouter();

  const handleSavedTrips = () => {
    if (onNavigateToWishlist) {
      onNavigateToWishlist();
    } else {
      router.push('/wishlist');
    }
  };

  const handleHistory = () => {
    if (onNavigateToBookings) {
      onNavigateToBookings();
    } else {
      router.push('/bookings');
    }
  };

  return (
    <section
      aria-labelledby="my-information-heading"
      className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-5 sm:p-7 md:p-8 font-jakarta"
    >
      <h3
        id="my-information-heading"
        className="text-base sm:text-lg font-black uppercase tracking-tight text-gray-900 pb-3 border-b border-gray-100"
      >
        MY INFORMATION
      </h3>

      <div className="divide-y divide-gray-100/80">
        {/* Full Name */}
        <InfoRowItem
          id="full-name"
          icon={User}
          label="FULL NAME"
          value={profileData.fullName}
          onClick={() => onEditField('fullName')}
        />

        {/* Nickname */}
        <InfoRowItem
          id="nickname"
          icon={User}
          label="NICKNAME"
          value={profileData.nickname}
          onClick={() => onEditField('nickname')}
        />

        {/* Date of Birth */}
        <InfoRowItem
          id="date-of-birth"
          icon={Calendar}
          label="DATE OF BIRTH"
          value={profileData.dateOfBirth}
          placeholder="Set Date of Birth"
          isPlaceholder={!profileData.dateOfBirth}
          onClick={() => onEditField('dateOfBirth')}
        />

        {/* Gender */}
        <InfoRowItem
          id="gender"
          icon={Users}
          label="GENDER"
          value={profileData.gender}
          placeholder="Set Gender"
          isPlaceholder={!profileData.gender}
          onClick={() => onEditField('gender')}
        />

        {/* I Am From */}
        <InfoRowItem
          id="location"
          icon={MapPin}
          label="I AM FROM"
          value={profileData.location}
          placeholder="Set Location"
          isPlaceholder={!profileData.location}
          onClick={() => onEditField('location')}
        />

        {/* Email Address */}
        <InfoRowItem
          id="email-address"
          icon={Mail}
          label="EMAIL ADDRESS"
          value={profileData.email}
          placeholder="Set Email Address"
          isPlaceholder={!profileData.email}
          onClick={() => onEditField('email')}
        />

        {/* Phone Number */}
        <InfoRowItem
          id="phone-number"
          icon={Smartphone}
          label="PHONE NUMBER"
          value={profileData.phoneNumber}
        />

        {/* Favorites */}
        <InfoRowItem
          id="favorites"
          icon={Star}
          label="FAVORITES"
          value="Saved Trips"
          onClick={handleSavedTrips}
        />

        {/* History */}
        <InfoRowItem
          id="history"
          icon={History}
          label="HISTORY"
          value="Transaction History"
          onClick={handleHistory}
        />

        {/* Session Log Out */}
        <InfoRowItem
          id="session"
          icon={LogOut}
          label="SESSION"
          value="Log Out"
          isDestructive
          onClick={onLogout}
        />
      </div>
    </section>
  );
};

