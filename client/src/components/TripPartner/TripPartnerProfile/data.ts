import { PartnerProfileData, PartnerTrustBadge } from './types';

export const DEFAULT_TRUST_BADGES: PartnerTrustBadge[] = [
  {
    id: 'badge-verified',
    title: 'Government Registered',
    description: 'Officially certified Tour & Adventure Travel Operator in India',
    iconName: 'ShieldCheck',
    enabled: true,
  },
  {
    id: 'badge-scout',
    title: 'Scout-Verified Protocols',
    description: 'Itineraries and safety equipment inspected by TravelDekho scouts',
    iconName: 'Award',
    enabled: true,
  },
  {
    id: 'badge-guides',
    title: 'Certified Mountain Guides',
    description: 'Local wilderness leaders certified by IMF & NIMS',
    iconName: 'Compass',
    enabled: true,
  },
  {
    id: 'badge-support',
    title: '24/7 Ground Operations',
    description: 'Dedicated basecamp support team available around the clock',
    iconName: 'Headphones',
    enabled: true,
  },
];

export const POPULAR_OPERATING_REGIONS = [
  'Himachal Pradesh',
  'Ladakh',
  'Uttarakhand',
  'Kashmir',
  'Sikkim',
  'Meghalaya',
  'Goa',
  'Kerala',
  'Rajasthan',
  'Andaman Islands',
];

export const DEFAULT_PARTNER_PROFILE: PartnerProfileData = {
  username: 'travellr',
  displayName: 'travellr times',
  companyName: 'Travellr Times Expeditions Pvt Ltd',
  tagline: 'Authentic Himalayan expeditions, high-altitude treks & scout-verified offbeat tours',
  bio: 'Founded by a passionate team of mountain explorers and local Sherpas, Travellr Times specializes in handcrafted backpacking, customized group circuits, and authentic Himalayan journeys across Ladakh, Spiti, Uttarakhand, and Himachal Pradesh. We focus on ethical, zero-waste adventure travel.',
  email: 'travellr@gmail.com',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  address: 'Suite 402, High Pass Tower, Old Manali Road',
  city: 'Manali',
  state: 'Himachal Pradesh',
  pincode: '175131',
  gstin: '02AABCT1234F1Z5',
  operatingRegions: ['Himachal Pradesh', 'Ladakh', 'Uttarakhand', 'Kashmir'],
  yearsInBusiness: 7,
  social: {
    website: 'https://travellrtimes.in',
    instagram: 'https://instagram.com/travellrtimes',
    youtube: 'https://youtube.com/@travellrtimes',
    facebook: 'https://facebook.com/travellrtimes',
  },
  avatar: '/trips/spiti.png',
  coverImage: '/trips/zanskar.png',
  isVerified: true,
  rating: 4.9,
  reviewsCount: 142,
  tripsHosted: 38,
  joinedDate: 'March 2023',
  trustBadges: DEFAULT_TRUST_BADGES,
};
