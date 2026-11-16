'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { colorTokens } from '@/theme';
import { partnerLinks } from '../config';

interface JoinUsDropdownProps {
  onItemClick?: () => void;
}

export const JoinUsDropdown: React.FC<JoinUsDropdownProps> = ({ onItemClick }) => {
  return (
    <div className="absolute right-0 top-full pt-2.5 opacity-0 translate-y-1.5 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition-all duration-200 ease-out z-50">
      <div
        className="w-72 rounded-2xl shadow-xl border p-2 backdrop-blur-md"
        style={{
          backgroundColor: colorTokens.surfacePure,
          borderColor: colorTokens.surfaceBorder,
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.12), 0 0 1px 1px rgba(0,0,0,0.04)',
        }}
      >
        <div
          className="px-3 py-2 border-b mb-1"
          style={{ borderColor: colorTokens.surfaceBorder }}
        >
          <p
            className="text-[10px] font-black uppercase tracking-[0.18em]"
            style={{ color: colorTokens.textSecondary }}
          >
            Join Our Network
          </p>
        </div>

        <div className="flex flex-col gap-1">
          {partnerLinks.map((partner) => {
            const Icon = partner.icon;
            return (
              <Link
                key={partner.href}
                href={partner.href}
                onClick={onItemClick}
                className="group/item flex items-center gap-3 p-2.5 rounded-xl transition-all duration-150"
                style={{
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colorTokens.accentWarmTint;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-105"
                  style={{
                    backgroundColor: colorTokens.accentWarmTint,
                    color: colorTokens.primaryContainer,
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p
                      className="text-xs font-bold transition-colors truncate group-hover/item:text-[#ff5722]"
                      style={{ color: colorTokens.textPrimary }}
                    >
                      {partner.title}
                    </p>
                    <ChevronRight
                      className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0"
                      style={{ color: colorTokens.primaryContainer }}
                    />
                  </div>
                  <p
                    className="text-[11px] truncate"
                    style={{ color: colorTokens.textSecondary }}
                  >
                    {partner.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
