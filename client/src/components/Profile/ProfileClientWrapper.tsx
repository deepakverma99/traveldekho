'use client';

import dynamic from 'next/dynamic';
import { ProfileSkeleton } from './components';

export const ProfileClientWrapper = dynamic(
  () => import('./ProfileView').then((mod) => mod.ProfileView),
  {
    ssr: false,
    loading: () => <ProfileSkeleton />,
  }
);

