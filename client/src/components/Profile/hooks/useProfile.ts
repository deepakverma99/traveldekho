'use client';

import { useState, useMemo, useCallback, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector, selectUser, logout } from '@/redux';
import {
  ProfileTabId,
  UserProfileData,
  EditableProfileField,
} from '../types';
import { DEFAULT_PROFILE_DATA } from '../config/profileNav';
import {
  getStoredProfile,
  subscribeProfile,
  getServerProfileSnapshot,
  saveStoredProfile,
  generatePassportNumber,
} from '../utils/profileStorage';

export interface UseProfileReturn {
  activeTab: ProfileTabId;
  setActiveTab: (tab: ProfileTabId) => void;
  profileData: UserProfileData;
  activeEditField: EditableProfileField | null;
  isEditModalOpen: boolean;
  openEditModal: (field: EditableProfileField) => void;
  closeEditModal: () => void;
  handleSaveField: (field: EditableProfileField, value: string) => void;
  handleLogout: () => void;
  userInitial: string;
}

export function useProfile(defaultTab: ProfileTabId = 'profile'): UseProfileReturn {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectUser);

  const [activeTab, setActiveTab] = useState<ProfileTabId>(defaultTab);
  const [activeEditField, setActiveEditField] = useState<EditableProfileField | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Synchronize with external profile store safely
  const storedData = useSyncExternalStore(
    subscribeProfile,
    getStoredProfile,
    getServerProfileSnapshot
  );

  // Compute merged profile data
  const profileData: UserProfileData = useMemo(() => {
    const rawName = authUser?.name || storedData.fullName || DEFAULT_PROFILE_DATA.fullName;
    const rawPhone = authUser?.mobileNumber || storedData.phoneNumber || DEFAULT_PROFILE_DATA.phoneNumber;
    const rawEmail = authUser?.email || storedData.email || DEFAULT_PROFILE_DATA.email;
    const passportNo = generatePassportNumber(rawPhone || rawName);

    return {
      fullName: rawName,
      nickname: storedData.nickname || rawName,
      dateOfBirth: storedData.dateOfBirth || DEFAULT_PROFILE_DATA.dateOfBirth,
      gender: storedData.gender || DEFAULT_PROFILE_DATA.gender,
      location: storedData.location || DEFAULT_PROFILE_DATA.location,
      email: rawEmail,
      phoneNumber: rawPhone,
      completedTrips: storedData.completedTrips ?? DEFAULT_PROFILE_DATA.completedTrips,
      reviewsWritten: storedData.reviewsWritten ?? DEFAULT_PROFILE_DATA.reviewsWritten,
      passportNo,
      nationality: storedData.nationality || DEFAULT_PROFILE_DATA.nationality,
      authority: DEFAULT_PROFILE_DATA.authority,
    };
  }, [authUser, storedData]);

  const userInitial = useMemo(() => {
    const name = profileData.fullName || 'Deepak';
    return name.charAt(0).toUpperCase() || 'D';
  }, [profileData.fullName]);

  const openEditModal = useCallback((field: EditableProfileField) => {
    setActiveEditField(field);
    setIsEditModalOpen(true);
  }, []);

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setActiveEditField(null);
  }, []);

  const handleSaveField = useCallback(
    (field: EditableProfileField, value: string) => {
      saveStoredProfile({ [field]: value });
      closeEditModal();
    },
    [closeEditModal]
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
    router.push('/');
  }, [dispatch, router]);

  return {
    activeTab,
    setActiveTab,
    profileData,
    activeEditField,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    handleSaveField,
    handleLogout,
    userInitial,
  };
}
