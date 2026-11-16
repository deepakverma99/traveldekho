export interface StoredAuthSession {
  user: {
    id: string;
    mobileNumber?: string;
    name?: string;
    email?: string;
  };
  token?: string;
  timestamp: number;
}

const STORAGE_KEY = 'traveldekho_auth_session';

export function getStoredAuthSession(): StoredAuthSession | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.user) {
      return parsed as StoredAuthSession;
    }
  } catch {
    // fallback on parse error
  }
  return null;
}

export function saveAuthSession(
  user: StoredAuthSession['user'],
  token?: string
): void {
  if (typeof window === 'undefined') return;
  try {
    const session: StoredAuthSession = {
      user,
      token,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // fallback on storage quota or security error
  }
}

export function clearAuthSession(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // fallback on storage error
  }
}

