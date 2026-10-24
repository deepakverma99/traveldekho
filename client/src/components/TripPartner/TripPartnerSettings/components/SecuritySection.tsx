'use client';

import React, { useState } from 'react';
import {
  Shield,
  KeyRound,
  CheckCircle2,
  Eye,
  EyeOff,
} from 'lucide-react';

import { partnerColors } from '@/theme/colors';
import { PartnerSecuritySettings } from '../types';

interface SecuritySectionProps {
  security: PartnerSecuritySettings;
  toggleTwoFactor?: () => void;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({
  security,
}) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) return;

    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setShowPasswordForm(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 2000);
  };

  return (
    <div
      className="w-full min-w-0 rounded-2xl p-3.5 sm:p-5 md:p-6 lg:p-8 border shadow-sm space-y-4 sm:space-y-6"
      style={{
        backgroundColor: partnerColors.surface,
        borderColor: partnerColors.border,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 sm:gap-3 pb-3.5 sm:pb-4 border-b" style={{ borderColor: partnerColors.borderLight }}>
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            backgroundColor: partnerColors.accentLight,
            color: partnerColors.accent,
          }}
        >
          <Shield className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-base md:text-lg font-black tracking-tight" style={{ color: partnerColors.dark }}>
            Password & Account Credentials
          </h3>
          <p className="text-[11px] sm:text-xs font-semibold leading-relaxed" style={{ color: partnerColors.textSecondary }}>
            Manage partner dashboard login password and credentials.
          </p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-5 w-full">
        {/* Change Password Card */}
        <div
          className="p-3.5 sm:p-5 rounded-xl border space-y-3.5 sm:space-y-4 w-full min-w-0"
          style={{
            backgroundColor: partnerColors.surfaceMuted,
            borderColor: partnerColors.border,
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div
                className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: partnerColors.surfaceSubtle,
                  color: partnerColors.dark,
                }}
              >
                <KeyRound className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-bold" style={{ color: partnerColors.dark }}>
                  Partner Password
                </h4>
                <p className="text-[10px] sm:text-[11px] font-medium" style={{ color: partnerColors.textMuted }}>
                  Last modified on {security.lastPasswordChange}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="px-3.5 py-2 sm:py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer w-full sm:w-auto text-center active:scale-95 hover:opacity-90 shrink-0"
              style={{
                backgroundColor: partnerColors.surface,
                borderColor: partnerColors.border,
                color: partnerColors.textPrimary,
              }}
            >
              {showPasswordForm ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {showPasswordForm && (
            <form onSubmit={handlePasswordSubmit} className="pt-3 border-t space-y-3 animate-fade-in-up" style={{ borderColor: partnerColors.borderLight }}>
              {passwordSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Password updated successfully!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type={showPasswordText ? 'text' : 'password'}
                  required
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="px-3 py-2 text-xs font-medium rounded-xl border bg-white outline-none"
                  style={{ borderColor: partnerColors.border }}
                />
                <input
                  type={showPasswordText ? 'text' : 'password'}
                  required
                  placeholder="New Password (min 8 chars)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="px-3 py-2 text-xs font-medium rounded-xl border bg-white outline-none"
                  style={{ borderColor: partnerColors.border }}
                />
                <input
                  type={showPasswordText ? 'text' : 'password'}
                  required
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="px-3 py-2 text-xs font-medium rounded-xl border bg-white outline-none"
                  style={{ borderColor: partnerColors.border }}
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setShowPasswordText(!showPasswordText)}
                  className="text-[11px] font-semibold text-gray-500 hover:text-gray-700 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  {showPasswordText ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPasswordText ? 'Hide characters' : 'Show characters'}</span>
                </button>

                <button
                  type="submit"
                  disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-all disabled:opacity-50 cursor-pointer w-full sm:w-auto text-center"
                  style={{ backgroundColor: partnerColors.dark }}
                >
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

