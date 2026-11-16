'use client';

import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { restoreAuthSession, logout } from './slices/authSlice';
import { getStoredAuthSession } from '@/lib/authStorage';

export interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [store] = useState<AppStore>(() => makeStore());

  useEffect(() => {
    // Restore traveler session on client mount
    const session = getStoredAuthSession();
    if (session?.user) {
      store.dispatch(
        restoreAuthSession({ user: session.user, token: session.token })
      );
    }

    // Synchronize auth state across multiple tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'traveldekho_auth_session') {
        const updated = getStoredAuthSession();
        if (updated?.user) {
          store.dispatch(
            restoreAuthSession({ user: updated.user, token: updated.token })
          );
        } else {
          store.dispatch(logout());
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
};
