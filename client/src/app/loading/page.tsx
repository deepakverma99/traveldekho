import type { Metadata } from 'next';
import { LoadingView } from '@/components/Loading';

export const metadata: Metadata = {
  title: 'Loading',
  description: 'Planning your next journey with TravelDekho...',
};

export default function LoadingPreviewPage() {
  return <LoadingView fullScreen />;
}
