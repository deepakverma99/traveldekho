import {
  User,
  Calendar,
  Heart,
  Star,
  Settings,
} from 'lucide-react';
import { ProfileTabItem, UserProfileData } from '../types';

export const PROFILE_NAV_ITEMS: ProfileTabItem[] = [
  {
    id: 'profile',
    label: 'My Profile',
    icon: User,
  },
  {
    id: 'bookings',
    label: 'My Bookings',
    icon: Calendar,
  },
  {
    id: 'wishlist',
    label: 'Wishlist',
    icon: Heart,
  },
  {
    id: 'reviews',
    label: 'Reviews',
    icon: Star,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
  },
];

export const DEFAULT_PROFILE_DATA: UserProfileData = {
  fullName: 'Deepak',
  nickname: 'Deepak',
  dateOfBirth: '',
  gender: '',
  location: '',
  email: '',
  phoneNumber: '9140506902',
  completedTrips: 2,
  reviewsWritten: 0,
  passportNo: 'TD-8D1B5A',
  nationality: 'IND',
  authority: 'TRAVELDEKHO',
};

