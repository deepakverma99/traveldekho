'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { Smartphone, Play, Info, X, User, Heart, Briefcase, LogOut } from 'lucide-react';
import { colorTokens } from '@/theme';
import { useAppDispatch, useAppSelector, selectIsAuthenticated, selectUser, logout } from '@/redux';
import { partnerLinks } from '../config';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  isMounted: boolean;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onLoginClick,
  isMounted,
}) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  if (!isMounted) return null;

  const userName = user?.name || 'Deepak';
  const initial = userName.charAt(0).toUpperCase() || 'D';


  return createPortal(
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 z-[9998] bg-black/60 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Right Slide-Over Drawer */}
      <div
        className={`lg:hidden fixed right-0 top-0 bottom-0 z-[9999] w-[85%] max-w-sm shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ backgroundColor: colorTokens.surfacePure }}
      >
        {/* Drawer Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b shrink-0"
          style={{ borderColor: colorTokens.surfaceBorder }}
        >
          <Link className="flex items-center gap-2" href="/" onClick={onClose}>
            <div className="relative h-11 w-36">
              <Image
                alt="TravelDekho Logo"
                src="/TravelDekho-logo.png"
                fill
                priority
                className="object-contain"
                sizes="150px"
              />
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-full cursor-pointer hover:bg-gray-100"
            style={{ color: colorTokens.textSecondary }}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <nav className="flex flex-col gap-2.5">
            {/* Get the App */}
            <Link
              className="flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-200"
              style={{ backgroundColor: colorTokens.surfaceContainerLow }}
              href="/app"
              onClick={onClose}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colorTokens.accentWarmTint;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colorTokens.surfaceContainerLow;
              }}
            >
              <div
                className="p-2.5 rounded-xl shrink-0"
                style={{
                  backgroundColor: colorTokens.accentWarmTint,
                  color: colorTokens.primaryContainer,
                }}
              >
                <Smartphone className="w-5 h-5" />
              </div>
              <span
                className="font-bold text-xs uppercase tracking-wider"
                style={{ color: colorTokens.textPrimary }}
              >
                Get the App
              </span>
            </Link>

            {/* Vlog */}
            <Link
              className="flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-200"
              style={{ backgroundColor: colorTokens.surfaceContainerLow }}
              href="/vlog"
              onClick={onClose}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colorTokens.accentWarmTint;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colorTokens.surfaceContainerLow;
              }}
            >
              <div
                className="p-2.5 rounded-xl shrink-0"
                style={{
                  backgroundColor: colorTokens.accentWarmTint,
                  color: colorTokens.primaryContainer,
                }}
              >
                <Play className="w-5 h-5 fill-current" />
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="font-bold text-xs uppercase tracking-wider"
                  style={{ color: colorTokens.textPrimary }}
                >
                  Watch Vlogs
                </span>
                <span
                  className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase text-white leading-none shadow-xs"
                  style={{ backgroundColor: colorTokens.primaryContainer }}
                >
                  NEW
                </span>
              </div>
            </Link>

            {/* About Us */}
            <Link
              className="flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-200"
              style={{ backgroundColor: colorTokens.surfaceContainerLow }}
              href="/about"
              onClick={onClose}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colorTokens.accentWarmTint;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colorTokens.surfaceContainerLow;
              }}
            >
              <div
                className="p-2.5 rounded-xl shrink-0"
                style={{
                  backgroundColor: colorTokens.accentWarmTint,
                  color: colorTokens.primaryContainer,
                }}
              >
                <Info className="w-5 h-5" />
              </div>
              <span
                className="font-bold text-xs uppercase tracking-wider"
                style={{ color: colorTokens.textPrimary }}
              >
                About Us
              </span>
            </Link>
          </nav>

          {/* Join Our Network Section */}
          <div>
            <p
              className="text-[10px] font-black uppercase tracking-[0.2em] mb-3"
              style={{ color: colorTokens.textSecondary }}
            >
              Join Our Network
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {partnerLinks.map((partner) => {
                const Icon = partner.icon;
                return (
                  <Link
                    key={partner.href}
                    className="flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all duration-200 gap-2 text-center"
                    style={{
                      borderColor: colorTokens.surfaceBorder,
                      backgroundColor: colorTokens.surfacePure,
                    }}
                    href={partner.href}
                    onClick={onClose}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colorTokens.accentWarmTint;
                      e.currentTarget.style.borderColor = colorTokens.primaryContainer;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colorTokens.surfacePure;
                      e.currentTarget.style.borderColor = colorTokens.surfaceBorder;
                    }}
                  >
                    <div
                      className="p-2 rounded-xl"
                      style={{
                        backgroundColor: colorTokens.accentWarmTint,
                        color: colorTokens.primaryContainer,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className="text-[11px] font-bold leading-tight"
                      style={{ color: colorTokens.textPrimary }}
                    >
                      {partner.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Auth Section */}
          <div className="border-t pt-5" style={{ borderColor: colorTokens.surfaceBorder }}>
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-amber-400 text-black font-black text-sm flex items-center justify-center shrink-0">
                    {initial}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Account
                    </span>
                    <span className="text-sm font-extrabold text-gray-900 truncate">
                      {userName}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Link
                    href="/profile"
                    onClick={onClose}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-xs font-bold text-gray-700 transition-colors"
                  >
                    <User className="w-4 h-4 mb-1 text-gray-500" />
                    Profile
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={onClose}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-xs font-bold text-gray-700 transition-colors"
                  >
                    <Heart className="w-4 h-4 mb-1 text-gray-500" />
                    Wishlist
                  </Link>
                  <Link
                    href="/bookings"
                    onClick={onClose}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-xs font-bold text-gray-700 transition-colors"
                  >
                    <Briefcase className="w-4 h-4 mb-1 text-gray-500" />
                    Bookings
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    dispatch(logout());
                    onClose();
                  }}
                  className="flex items-center justify-center h-12 w-full rounded-2xl font-bold uppercase tracking-wider text-xs border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onLoginClick();
                }}
                className="flex items-center justify-center h-14 w-full rounded-2xl font-bold uppercase tracking-[0.18em] text-xs shadow-lg transition-all duration-300 cursor-pointer active:scale-98"
                style={{
                  backgroundColor: colorTokens.primaryContainer,
                  color: colorTokens.onPrimary,
                  boxShadow: '0 10px 25px -5px rgba(255,87,34,0.38)',
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};
