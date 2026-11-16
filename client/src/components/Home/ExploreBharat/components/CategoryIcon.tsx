'use client';

import React from 'react';
import {
  Footprints,
  Palmtree,
  Bike,
  Tent,
  MountainSnow,
  Sun,
  Sailboat,
  Binoculars,
  Sparkles,
  Backpack,
  Compass,
} from 'lucide-react';
import { CategoryIconType } from '../types';

interface CategoryIconProps {
  iconType: CategoryIconType;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  iconType,
  className = 'w-5 h-5',
}) => {
  switch (iconType) {
    case 'footprints':
      return <Footprints className={className} />;
    case 'beach':
      return <Palmtree className={className} />;
    case 'bike':
      return <Bike className={className} />;
    case 'tent':
      return <Tent className={className} />;
    case 'mountain':
      return <MountainSnow className={className} />;
    case 'desert':
      return <Sun className={className} />;
    case 'rafting':
      return <Sailboat className={className} />;
    case 'wildlife':
      return <Binoculars className={className} />;
    case 'spiritual':
      return <Sparkles className={className} />;
    case 'backpack':
      return <Backpack className={className} />;
    default:
      return <Compass className={className} />;
  }
};
