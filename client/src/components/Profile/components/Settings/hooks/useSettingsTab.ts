'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, logout } from '@/redux';
import { NotificationSettings } from '../types';
import { clearAuthSession } from '@/lib/authStorage';

const SETTINGS_STORAGE_KEY = 'traveldekho_settings_notifications';

const DEFAULT_NOTIFICATIONS: NotificationSettings = {
  emailAlerts: true,
  smsAlerts: false,
  promoMarketing: true,
};

function getInitialNotifications(): NotificationSettings {
  if (typeof window === 'undefined') return DEFAULT_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_NOTIFICATIONS, ...JSON.parse(raw) };
    }
  } catch {
    // fallback
  }
  return DEFAULT_NOTIFICATIONS;
}

export interface UseSettingsTabReturn {
  notifications: NotificationSettings;
  handleToggle: (key: keyof NotificationSettings) => void;
  isCloseModalOpen: boolean;
  openCloseModal: () => void;
  closeCloseModal: () => void;
  handleConfirmCloseAccount: () => void;
}

export function useSettingsTab(onLogout?: () => void): UseSettingsTabReturn {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [notifications, setNotifications] = useState<NotificationSettings>(getInitialNotifications);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  const handleToggle = useCallback((key: keyof NotificationSettings) => {
    setNotifications((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const openCloseModal = useCallback(() => {
    setIsCloseModalOpen(true);
  }, []);

  const closeCloseModal = useCallback(() => {
    setIsCloseModalOpen(false);
  }, []);

  const handleConfirmCloseAccount = useCallback(() => {
    // Clear auth and session storage
    clearAuthSession();
    try {
      localStorage.removeItem('traveldekho_traveler_profile');
      localStorage.removeItem('traveldekho_user_wishlist');
      localStorage.removeItem('traveldekho_user_reviews');
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
    } catch {
      // ignore
    }

    if (onLogout) {
      onLogout();
    } else {
      dispatch(logout());
      router.push('/');
    }
    setIsCloseModalOpen(false);
  }, [dispatch, router, onLogout]);

  return {
    notifications,
    handleToggle,
    isCloseModalOpen,
    openCloseModal,
    closeCloseModal,
    handleConfirmCloseAccount,
  };
}

