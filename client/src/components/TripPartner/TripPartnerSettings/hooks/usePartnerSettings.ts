'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  PartnerSettingsData,
  SettingsTabType,
  KycRegistrationType,
  KycUploadFile,
  PartnerKycData,
} from '../types';

import { DEFAULT_PARTNER_SETTINGS } from '../data';



const SETTINGS_STORAGE_PREFIX = 'traveldekho_partner_settings_';

export const usePartnerSettings = (username: string) => {
  const initialData: PartnerSettingsData = useMemo(() => {
    let storedData: Partial<PartnerSettingsData> = {};

    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(`${SETTINGS_STORAGE_PREFIX}${username}`);
        if (raw) {
          storedData = JSON.parse(raw);
        }
      } catch {
        // Fallback
      }
    }

    return {
      ...DEFAULT_PARTNER_SETTINGS,
      username,
      ...storedData,
      bankDetails: {
        ...DEFAULT_PARTNER_SETTINGS.bankDetails,
        ...(storedData.bankDetails || {}),
      },
      notifications: {
        ...DEFAULT_PARTNER_SETTINGS.notifications,
        ...(storedData.notifications || {}),
      },
      policies: {
        ...DEFAULT_PARTNER_SETTINGS.policies,
        ...(storedData.policies || {}),
      },
      security: {
        ...DEFAULT_PARTNER_SETTINGS.security,
        ...(storedData.security || {}),
      },
      kyc: {
        ...DEFAULT_PARTNER_SETTINGS.kyc,
        ...(storedData.kyc || {}),
      },
    };
  }, [username]);

  const [settings, setSettings] = useState<PartnerSettingsData>(initialData);
  const [initialSnapshot, setInitialSnapshot] = useState<PartnerSettingsData>(initialData);
  const [activeTab, setActiveTab] = useState<SettingsTabType>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);


  useEffect(() => {
    setSettings(initialData);
    setInitialSnapshot(initialData);
  }, [initialData]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  const isDirty = useMemo(() => {
    return JSON.stringify(settings) !== JSON.stringify(initialSnapshot);
  }, [settings, initialSnapshot]);

  const updateBankDetails = useCallback(
    <K extends keyof PartnerSettingsData['bankDetails']>(
      key: K,
      value: PartnerSettingsData['bankDetails'][K]
    ) => {
      setSettings((prev) => ({
        ...prev,
        bankDetails: { ...prev.bankDetails, [key]: value },
      }));
    },
    []
  );

  const toggleNotification = useCallback((key: keyof PartnerSettingsData['notifications']) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  }, []);

  const updatePolicy = useCallback(
    <K extends keyof PartnerSettingsData['policies']>(
      key: K,
      value: PartnerSettingsData['policies'][K]
    ) => {
      setSettings((prev) => ({
        ...prev,
        policies: { ...prev.policies, [key]: value },
      }));
    },
    []
  );

  const toggleTwoFactor = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        twoFactorEnabled: !prev.security.twoFactorEnabled,
      },
    }));
  }, []);

  const handleSave = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      setIsSaving(true);

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(
            `${SETTINGS_STORAGE_PREFIX}${username}`,
            JSON.stringify(settings)
          );
        } catch {
          // LocalStorage error fallback
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 400));

      setInitialSnapshot(settings);
      setIsSaving(false);
      showToast('Settings & payout preferences saved successfully!');
    },
    [settings, username, showToast]
  );

  const setKycRegistrationType = useCallback((type: KycRegistrationType) => {
    setSettings((prev) => ({
      ...prev,
      kyc: {
        ...prev.kyc,
        registrationType: type,
      },
    }));
  }, []);

  const updateKycFile = useCallback(
    (field: keyof PartnerKycData, file: KycUploadFile | null) => {
      setSettings((prev) => ({
        ...prev,
        kyc: {
          ...prev.kyc,
          [field]: file,
        },
      }));
      if (file) {
        showToast('Document uploaded successfully.');
      } else {
        showToast('Document removed.');
      }
    },
    [showToast]
  );

  const updateCompanyGst = useCallback((gst: string) => {
    setSettings((prev) => ({
      ...prev,
      kyc: {
        ...prev.kyc,
        companyGst: gst.toUpperCase(),
      },
    }));
  }, []);

  const handleReset = useCallback(() => {
    setSettings(initialSnapshot);
    showToast('Reverted unsaved settings changes.');
  }, [initialSnapshot, showToast]);

  return {
    settings,
    activeTab,
    setActiveTab,
    isDirty,
    isSaving,
    toastMessage,
    updateBankDetails,
    toggleNotification,
    updatePolicy,
    toggleTwoFactor,
    setKycRegistrationType,
    updateKycFile,
    updateCompanyGst,
    handleSave,
    handleReset,
  };
};


