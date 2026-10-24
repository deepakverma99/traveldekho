'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setPartnerSession } from '@/redux/slices/tripPartnerSlice';
import {
  getStoredPartner,
  savePartnerSession,
  formatPartnerDisplayName,
} from '../../utils/partnerAuth';
import { PartnerProfileData } from '../types';
import { DEFAULT_PARTNER_PROFILE } from '../data';

const PROFILE_STORAGE_PREFIX = 'traveldekho_partner_profile_';

export const usePartnerProfile = (username: string) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Initialize initial profile state
  const initialData: PartnerProfileData = useMemo(() => {
    const session = getStoredPartner(username);
    let extendedData: Partial<PartnerProfileData> = {};

    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(`${PROFILE_STORAGE_PREFIX}${username}`);
        if (raw) {
          extendedData = JSON.parse(raw);
        }
      } catch {
        // Fallback to default
      }
    }

    return {
      ...DEFAULT_PARTNER_PROFILE,
      username: session.username || username,
      displayName: session.displayName || formatPartnerDisplayName(username),
      companyName: session.companyName || `${formatPartnerDisplayName(username)} Travels`,
      email: session.email || `${username}@gmail.com`,
      ...extendedData,
    };
  }, [username]);

  const [formData, setFormData] = useState<PartnerProfileData>(initialData);
  const [initialSnapshot, setInitialSnapshot] = useState<PartnerProfileData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setFormData(initialData);
    setInitialSnapshot(initialData);
  }, [initialData]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  const isDirty = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(initialSnapshot);
  }, [formData, initialSnapshot]);

  const updateField = useCallback(
    <K extends keyof PartnerProfileData>(key: K, value: PartnerProfileData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const updateSocial = useCallback(
    (key: keyof PartnerProfileData['social'], value: string) => {
      setFormData((prev) => ({
        ...prev,
        social: { ...prev.social, [key]: value },
      }));
    },
    []
  );

  const toggleRegion = useCallback((region: string) => {
    setFormData((prev) => {
      const exists = prev.operatingRegions.includes(region);
      const updated = exists
        ? prev.operatingRegions.filter((r) => r !== region)
        : [...prev.operatingRegions, region];
      return { ...prev, operatingRegions: updated };
    });
  }, []);

  const toggleBadge = useCallback((badgeId: string) => {
    setFormData((prev) => {
      const updated = (prev.trustBadges || []).map((b) =>
        b.id === badgeId ? { ...b, enabled: !b.enabled } : b
      );
      return { ...prev, trustBadges: updated };
    });
  }, []);

  const handleAvatarChange = useCallback((newAvatarUrl: string) => {
    setFormData((prev) => ({ ...prev, avatar: newAvatarUrl }));
    showToast('Agency logo updated.');
  }, [showToast]);

  const handleCoverChange = useCallback((newCoverUrl: string) => {
    setFormData((prev) => ({ ...prev, coverImage: newCoverUrl }));
    showToast('Cover banner updated.');
  }, [showToast]);

  const handleSave = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      setIsSaving(true);

      const sanitizedUsername =
        formData.username.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '') || username;

      const updatedProfile: PartnerProfileData = {
        ...formData,
        username: sanitizedUsername,
        displayName: formData.displayName.trim() || formatPartnerDisplayName(sanitizedUsername),
        companyName: formData.companyName.trim() || `${formatPartnerDisplayName(sanitizedUsername)} Travels`,
        email: formData.email.trim(),
      };

      // 1. Save core auth session
      const savedUser = savePartnerSession({
        username: sanitizedUsername,
        displayName: updatedProfile.displayName,
        companyName: updatedProfile.companyName,
        email: updatedProfile.email,
        avatar: updatedProfile.avatar,
        isVerified: updatedProfile.isVerified,
      });

      // 2. Persist extended profile data
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(
            `${PROFILE_STORAGE_PREFIX}${sanitizedUsername}`,
            JSON.stringify(updatedProfile)
          );
        } catch {
          // LocalStorage fallback
        }
      }

      // 3. Sync Redux state
      dispatch(setPartnerSession(savedUser));

      setInitialSnapshot(updatedProfile);
      setFormData(updatedProfile);
      setIsSaving(false);
      showToast('Profile changes saved successfully!');

      // Redirect if handle changed
      if (sanitizedUsername !== username) {
        setTimeout(() => {
          router.push(`/trip-partner/${sanitizedUsername}/profile`);
        }, 1000);
      }
    },
    [formData, username, dispatch, router, showToast]
  );

  const handleReset = useCallback(() => {
    setFormData(initialSnapshot);
    showToast('Reverted unsaved changes.');
  }, [initialSnapshot, showToast]);

  return {
    formData,
    isDirty,
    isSaving,
    toastMessage,
    updateField,
    updateSocial,
    toggleRegion,
    toggleBadge,
    handleAvatarChange,
    handleCoverChange,
    handleSave,
    handleReset,
  };
};
