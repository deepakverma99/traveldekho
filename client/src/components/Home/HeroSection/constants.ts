'use client';

import {
  Plane,
  Compass,
  Mountain,
  Map,
  Camera,
  Tent,
  Palmtree,
  Navigation,
  Sunrise,
  Backpack,
} from 'lucide-react';
import type { ComponentType } from 'react';

export interface FloatingIconItem {
  Icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  size: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
  rotate: number;
}

export const FLOATING_ICONS: FloatingIconItem[] = [
  { Icon: Plane, size: 28, top: '8%', left: '5%', delay: 0, duration: 6, rotate: -30 },
  { Icon: Compass, size: 24, top: '18%', left: '88%', delay: 1, duration: 7, rotate: 15 },
  { Icon: Mountain, size: 32, top: '72%', left: '8%', delay: 0.5, duration: 8, rotate: 0 },
  { Icon: Map, size: 22, top: '85%', left: '92%', delay: 1.5, duration: 6.5, rotate: -20 },
  { Icon: Camera, size: 26, top: '40%', left: '3%', delay: 2, duration: 7.5, rotate: 10 },
  { Icon: Tent, size: 20, top: '55%', left: '95%', delay: 0.8, duration: 6, rotate: -15 },
  { Icon: Palmtree, size: 30, top: '30%', left: '92%', delay: 1.2, duration: 8.5, rotate: 5 },
  { Icon: Navigation, size: 22, top: '65%', left: '4%', delay: 1.8, duration: 7, rotate: 25 },
  { Icon: Sunrise, size: 26, top: '12%', left: '50%', delay: 0.3, duration: 9, rotate: 0 },
  { Icon: Backpack, size: 24, top: '78%', left: '50%', delay: 2.2, duration: 6.5, rotate: -10 },
];

export interface HeroStatItem {
  value: number;
  suffix: string;
  label: string;
}

export const HERO_STATS: HeroStatItem[] = [
  { value: 500, suffix: '+', label: 'Trips Listed' },
  { value: 10, suffix: 'K+', label: 'Happy Travelers' },
  { value: 120, suffix: '+', label: 'Verified Partners' },
  { value: 50, suffix: '+', label: 'Destinations' },
];

export interface DestinationShowcaseItem {
  name: string;
  image: string;
  tag: string;
}

export const SHOWCASE_DESTINATIONS: DestinationShowcaseItem[] = [
  { name: 'Manali', image: '/destinations/manali.png', tag: 'Trending' },
  { name: 'Ladakh', image: '/destinations/ladakh.png', tag: 'Adventure' },
  { name: 'Goa', image: '/destinations/goa.png', tag: 'Beach' },
  { name: 'Kashmir', image: '/destinations/kashmir.png', tag: 'Paradise' },
  { name: 'Kerala', image: '/destinations/kerala.png', tag: 'Backwaters' },
  { name: 'Rishikesh', image: '/destinations/rishikesh.png', tag: 'Spiritual' },
];

