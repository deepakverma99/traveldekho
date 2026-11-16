'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { WishlistItem } from '../types';
import { INITIAL_WISHLIST_ITEMS } from '../data/wishlistData';

const WISHLIST_STORAGE_KEY = 'traveldekho_user_wishlist';

function getInitialWishlist(): WishlistItem[] {
  if (typeof window === 'undefined') return INITIAL_WISHLIST_ITEMS;
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback to initial
  }
  return INITIAL_WISHLIST_ITEMS;
}

export interface UseWishlistTabReturn {
  wishlist: WishlistItem[];
  filteredItems: WishlistItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleRemove: (id: string) => void;
  handleExploreTrip: (slug: string) => void;
  totalCount: number;
}

export function useWishlistTab(): UseWishlistTabReturn {
  const router = useRouter();
  const [wishlist, setWishlist] = useState<WishlistItem[]>(getInitialWishlist);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRemove = useCallback((id: string) => {
    setWishlist((prev) => {
      const next = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const handleExploreTrip = useCallback(
    (slug: string) => {
      router.push(`/trips/${slug}`);
    },
    [router]
  );

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return wishlist;
    const query = searchQuery.toLowerCase().trim();
    return wishlist.filter((item) => {
      const partnerName = item.partner?.name || '';
      return (
        item.title.toLowerCase().includes(query) ||
        item.destination.toLowerCase().includes(query) ||
        partnerName.toLowerCase().includes(query)
      );
    });
  }, [wishlist, searchQuery]);

  return {
    wishlist,
    filteredItems,
    searchQuery,
    setSearchQuery,
    handleRemove,
    handleExploreTrip,
    totalCount: wishlist.length,
  };
}
