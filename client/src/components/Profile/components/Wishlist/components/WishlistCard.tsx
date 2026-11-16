'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { WishlistItem } from '../types';
import { TripCard } from '@/components/shared';

interface WishlistCardProps {
  item: WishlistItem;
  onRemove: (id: string) => void;
  onExplore?: (slug: string) => void;
  priority?: boolean;
}

export const WishlistCard: React.FC<WishlistCardProps> = ({
  item,
  onRemove,
  priority = false,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.2 }}
      className="w-full flex"
    >
      <TripCard
        trip={item}
        priority={priority}
        fullWidth
        isWishlisted={true}
        onWishlistToggle={() => onRemove(item.id)}
      />
    </motion.div>
  );
};

export default WishlistCard;
