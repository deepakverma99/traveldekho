import { UserProfileData } from '../types';
import { DEFAULT_PROFILE_DATA } from '../config/profileNav';

const PROFILE_STORAGE_KEY = 'traveldekho_traveler_profile';
const PROFILE_CHANGE_EVENT = 'traveldekho_profile_change';

const EMPTY_PROFILE: Partial<UserProfileData> = Object.freeze({});

let cachedRaw = '';
let cachedData: Partial<UserProfileData> = EMPTY_PROFILE;

export function getStoredProfile(): Partial<UserProfileData> {
  if (typeof window === 'undefined') return EMPTY_PROFILE;
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) {
      return EMPTY_PROFILE;
    }
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedData = JSON.parse(raw);
    }
    return cachedData;
  } catch {
    return EMPTY_PROFILE;
  }
}

export function subscribeProfile(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handleStorage = (e: StorageEvent) => {
    if (e.key === PROFILE_STORAGE_KEY) {
      callback();
    }
  };
  const handleCustom = () => callback();

  window.addEventListener('storage', handleStorage);
  window.addEventListener(PROFILE_CHANGE_EVENT, handleCustom);
  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(PROFILE_CHANGE_EVENT, handleCustom);
  };
}

export const getServerProfileSnapshot = (): Partial<UserProfileData> => EMPTY_PROFILE;

export function saveStoredProfile(profile: Partial<UserProfileData>): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredProfile();
    const updated = { ...current, ...profile };
    const serialized = JSON.stringify(updated);
    localStorage.setItem(PROFILE_STORAGE_KEY, serialized);
    cachedRaw = serialized;
    cachedData = updated;
    window.dispatchEvent(new CustomEvent(PROFILE_CHANGE_EVENT));
  } catch {
    // ignore quota/security errors
  }
}

export function generatePassportNumber(seed: string): string {
  if (!seed) return DEFAULT_PROFILE_DATA.passportNo;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(6, '0').slice(0, 6);
  return `TD-${hex}`;
}
