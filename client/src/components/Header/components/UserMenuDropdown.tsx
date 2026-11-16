'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  User,
  Heart,
  Briefcase,
  LogOut,
} from 'lucide-react';
import { useAppDispatch, useAppSelector, selectUser, logout } from '@/redux';

export const UserMenuDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const userName = user?.name || 'Deepak';
  const initial = userName.charAt(0).toUpperCase() || 'D';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleLogout = () => {
    setIsOpen(false);
    dispatch(logout());
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* User Capsule Pill Button */}
      <button
        type="button"
        id="user-menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-200/90 bg-white hover:border-gray-300 shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer select-none"
      >
        {/* Yellow Initial Avatar */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-400 text-black font-black text-xs sm:text-sm flex items-center justify-center shrink-0">
          {initial}
        </div>

        {/* User Name */}
        <span className="font-bold text-xs sm:text-sm text-gray-900 tracking-tight">
          {userName}
        </span>

        {/* Dropdown Chevron */}
        <ChevronDown
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 stroke-[2.2] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            className="absolute right-0 top-full mt-2 w-52 sm:w-56 bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-gray-100 p-2 z-50 font-jakarta"
          >
            {/* Account Title Header */}
            <div className="px-3 pt-2.5 pb-2 border-b border-gray-100">
              <span className="text-[11px] font-semibold text-gray-400 block tracking-normal">
                Account
              </span>
              <span className="text-[14px] font-bold text-gray-900 block truncate leading-tight mt-0.5">
                {userName}
              </span>
            </div>

            {/* Menu Items List */}
            <div className="mt-1.5 flex flex-col gap-0.5">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-[13px] font-semibold text-gray-700 hover:text-black hover:bg-gray-50 transition-colors select-none"
              >
                <User className="w-4 h-4 text-gray-500 stroke-[2] shrink-0" />
                <span>My Profile</span>
              </Link>

              <Link
                href="/wishlist"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-[13px] font-semibold text-gray-700 hover:text-black hover:bg-gray-50 transition-colors select-none"
              >
                <Heart className="w-4 h-4 text-gray-500 stroke-[2] shrink-0" />
                <span>My Wishlist</span>
              </Link>

              <Link
                href="/bookings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-[13px] font-semibold text-gray-700 hover:text-black hover:bg-gray-50 transition-colors select-none"
              >
                <Briefcase className="w-4 h-4 text-gray-500 stroke-[2] shrink-0" />
                <span>My Bookings</span>
              </Link>
            </div>

            {/* Logout Action */}
            <div className="pt-1.5 mt-1 border-t border-gray-100">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-[13px] font-semibold text-red-600 hover:bg-red-50/80 w-full transition-colors cursor-pointer text-left select-none"
              >
                <LogOut className="w-4 h-4 text-red-600 stroke-[2] shrink-0" />
                <span>Log Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

