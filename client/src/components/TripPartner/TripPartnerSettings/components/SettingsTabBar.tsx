'use client';

import React from 'react';
import { UserCog, Bell, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { partnerColors, colors } from '@/theme/colors';
import { SettingsTabType } from '../types';
import { SETTINGS_TABS } from '../data';

interface SettingsTabBarProps {
  activeTab: SettingsTabType;
  onTabChange: (tab: SettingsTabType) => void;
}

export const SettingsTabBar: React.FC<SettingsTabBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const getTabIcon = (tabId: SettingsTabType, isActive: boolean) => {
    const iconClass = 'w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 transition-transform duration-200';
    const strokeColor = isActive ? '#ffffff' : partnerColors.textSecondary;

    switch (tabId) {
      case 'profile':
        return <UserCog className={iconClass} style={{ color: strokeColor }} />;
      case 'notifications':
        return <Bell className={iconClass} style={{ color: strokeColor }} />;
      case 'kyc':
        return <ShieldCheck className={iconClass} style={{ color: isActive ? '#ffffff' : '#059669' }} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="w-full rounded-2xl p-1 sm:p-1.5 md:p-2 border shadow-xs transition-all font-jakarta"
      style={{
        backgroundColor: partnerColors.surface,
        borderColor: partnerColors.border,
      }}
      role="tablist"
      aria-label="Partner Settings Navigation"
    >
      <div className="grid grid-cols-3 gap-1 sm:gap-1.5 md:gap-2 w-full">
        {SETTINGS_TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`group relative flex flex-col sm:flex-row items-center justify-center sm:justify-start lg:justify-center gap-1 sm:gap-2 md:gap-2.5 px-1.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-xl text-center sm:text-left cursor-pointer transition-all duration-200 border w-full min-w-0 ${
                isActive
                  ? 'shadow-[0_4px_18px_rgba(244,140,6,0.38)] font-black'
                  : 'hover:bg-slate-200/60 font-bold'
              }`}
              style={{
                backgroundColor: isActive ? colors.primary : partnerColors.surfaceSubtle,
                borderColor: isActive ? colors.primary : partnerColors.borderLight,
                color: isActive ? '#ffffff' : partnerColors.textPrimary,
              }}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-2 md:gap-2.5 min-w-0 w-full sm:w-auto">
                <div
                  className={`p-1 sm:p-1.5 rounded-lg transition-colors shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-white border border-slate-200/70 shadow-2xs group-hover:border-slate-300'
                  }`}
                >
                  {getTabIcon(tab.id, isActive)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-1">
                    <span
                      className={`text-[10px] min-[360px]:text-[11px] min-[400px]:text-xs sm:text-[13px] tracking-tight font-extrabold block leading-tight ${
                        isActive ? 'text-white font-black' : 'text-slate-800 group-hover:text-black font-extrabold'
                      }`}
                    >
                      {tab.label}
                    </span>
                    {tab.badge && (
                      <span
                        className={`md:hidden inline-flex items-center justify-center shrink-0 ${
                          isActive ? 'text-white' : 'text-emerald-600'
                        }`}
                        title="Active"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <span
                    className={`hidden lg:block text-[10px] sm:text-[11px] truncate mt-0.5 font-medium ${
                      isActive ? 'text-amber-50' : 'text-slate-500'
                    }`}
                  >
                    {tab.subtitle}
                  </span>
                </div>
              </div>

              {/* Status Badge (for KYC or special tabs on tablet/desktop) */}
              {tab.badge && (
                <div
                  className={`hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ml-auto border ${
                    isActive
                      ? 'bg-white/25 text-white border-white/40'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>{tab.badge}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

