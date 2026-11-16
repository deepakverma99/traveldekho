'use client';

import React from 'react';
import {
  MountainSnow,
  Flame,
  Palmtree,
  Castle,
  Compass,
  CloudRain,
  Landmark,
  MapPin,
} from 'lucide-react';
import { StateIconType } from '../types';

interface StateIconProps {
  type: StateIconType;
  className?: string;
}

export const StateIcon: React.FC<StateIconProps> = ({
  type,
  className = 'w-5 h-5',
}) => {
  switch (type) {
    case 'mountain':
      // Himachal Pradesh: Treks, Valleys & Snow
      return <MountainSnow className={className} />;
    case 'om':
      // Uttarakhand: Holy Rivers & High Peaks
      return <Flame className={className} />;
    case 'beach':
      // Goa: Beaches, Nightlife & Water Sports
      return <Palmtree className={className} />;
    case 'fort':
      // Rajasthan: Forts, Royal Desert & Palaces
      return <Castle className={className} />;
    case 'palm':
      // Kerala: Backwaters, Ayurveda & Spice Plantations
      return <Palmtree className={className} />;
    case 'pass':
      // Ladakh: High Passes, Monasteries & Lakes
      return <Compass className={className} />;
    case 'waterfall':
      // Meghalaya: Living Root Bridges & Waterfalls
      return <CloudRain className={className} />;
    case 'monastery':
      // Sikkim: Himalayan Vistas & Monasteries
      return <Landmark className={className} />;
    default:
      return <MapPin className={className} />;
  }
};
