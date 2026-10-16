import type React from 'react';

/**
 * Navigation item structure for Partner sidebar and mobile navbar
 */
export interface PartnerNavItem {
  id: string;
  label: string;
  pathSegment: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface PartnerComputedNavItem extends PartnerNavItem {
  href: string;
  isActive: boolean;
}
