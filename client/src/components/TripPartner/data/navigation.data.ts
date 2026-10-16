import {
  LayoutDashboard,
  Map,
  CalendarCheck,
  CalendarClock,
  CircleUser,
  Settings,
} from 'lucide-react';
import { PartnerNavItem, PartnerComputedNavItem } from '../types/';

export const PARTNER_SIDEBAR_NAV_ITEMS: readonly PartnerNavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    pathSegment: 'dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'trips',
    label: 'My Trips',
    pathSegment: 'trips',
    icon: Map,
  },
  {
    id: 'bookings',
    label: 'Bookings',
    pathSegment: 'bookings',
    icon: CalendarCheck,
  },
  {
    id: 'date-requests',
    label: 'Date Requests',
    pathSegment: 'date-requests',
    icon: CalendarClock,
  },
  {
    id: 'profile',
    label: 'Public Profile',
    pathSegment: 'profile',
    icon: CircleUser,
  },
  {
    id: 'settings',
    label: 'Settings',
    pathSegment: 'settings',
    icon: Settings,
  },
] as const;

export function getPartnerNavItems(
  username: string,
  currentPathname: string | null
): PartnerComputedNavItem[] {
  return PARTNER_SIDEBAR_NAV_ITEMS.map((item) => {
    const href = `/trip-partner/${username}/${item.pathSegment}`;
    const isActive = Boolean(
      currentPathname && currentPathname.includes(`/${item.pathSegment}`)
    );
    return {
      ...item,
      href,
      isActive,
    };
  });
}
