'use client';

import React from 'react';
import {
  MountainSnow,
  Waves,
  Castle,
  Crown,
  Flame,
  Landmark,
  Sparkles,
  TreePine,
  MapPin,
} from 'lucide-react';
import { CityIconType } from '../types';

interface CityIconProps {
  type: CityIconType;
  className?: string;
}

export const CityIcon: React.FC<CityIconProps> = ({
  type,
  className = 'w-5 h-5',
}) => {
  switch (type) {
    case 'mountain':
      // Manali: Snow peaks, Solang & Rohtang
      return <MountainSnow className={className} />;
    case 'rafting':
      // Rishikesh: Yoga, Rafting & Ganga Aarti
      return <Waves className={className} />;
    case 'fort':
      // Jaipur: Pink City, Hawa Mahal & Forts
      return <Castle className={className} />;
    case 'palace':
      // Udaipur: City of Lakes, Pichola & Palaces
      return <Crown className={className} />;
    case 'spiritual':
      // Varanasi: Spiritual Ghats, Sarnath & Silk
      return <Flame className={className} />;
    case 'monument':
      // Agra: Mughal Heritage & Taj Mahal
      return <Landmark className={className} />;
    case 'temple':
      // Amritsar: Golden Temple & Punjabi Soul
      return <Sparkles className={className} />;
    case 'pine':
      // Shimla: Colonial Charms & Mall Road
      return <TreePine className={className} />;
    default:
      return <MapPin className={className} />;
  }
};
