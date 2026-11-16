import {
  Users,
  Building2,
  Bus,
  Briefcase,
  type LucideIcon,
} from 'lucide-react';

export interface PartnerLinkItem {
  title: string;
  subtitle: string;
  href: string;
  icon: LucideIcon;
}

export const partnerLinks: PartnerLinkItem[] = [
  {
    title: 'Trip Partner',
    subtitle: 'Host & manage trips',
    href: '/trip-partner',
    icon: Users,
  },
  {
    title: 'Hotel Partner',
    subtitle: 'List your stays & resorts',
    href: '/hotel-partner',
    icon: Building2,
  },
  {
    title: 'Travel Partner',
    subtitle: 'Fleet & transport partner',
    href: '/travel-partner',
    icon: Bus,
  },
  {
    title: 'Work With Us',
    subtitle: 'Scout network & creators',
    href: '/work-with-us',
    icon: Briefcase,
  },
];
