'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, setDestination as setReduxDestination } from '@/redux';

export type HeroDropdownType = 'destination' | 'pickup' | null;

export const useHeroBooking = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [destination, setDestination] = useState<string>('');
  const [pickup, setPickup] = useState<string>('');
  const [activeDropdown, setActiveDropdown] = useState<HeroDropdownType>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = (type: HeroDropdownType) => {
    setActiveDropdown((prev) => (prev === type ? null : type));
  };

  const handleSelectDestination = (city: string) => {
    setDestination(city);
    setActiveDropdown(null);
  };

  const handleSelectPickup = (city: string) => {
    setPickup(city);
    setActiveDropdown(null);
  };

  const handleSearch = () => {
    if (destination) {
      dispatch(setReduxDestination(destination));
    }

    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (pickup) params.set('pickup', pickup);

    const queryString = params.toString();
    router.push(queryString ? `/search?${queryString}` : '/search');
  };

  return {
    destination,
    setDestination,
    pickup,
    setPickup,
    activeDropdown,
    setActiveDropdown,
    toggleDropdown,
    containerRef,
    handleSelectDestination,
    handleSelectPickup,
    handleSearch,
  };
};
