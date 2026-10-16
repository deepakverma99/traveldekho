'use client';

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';

export interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [store] = useState<AppStore>(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
};
