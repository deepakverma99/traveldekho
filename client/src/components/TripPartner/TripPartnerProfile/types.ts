/**
 * Trip Partner Profile Types
 */

export interface PartnerSocialLinks {
  website?: string;
  instagram?: string;
  youtube?: string;
  facebook?: string;
}

export interface PartnerTrustBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  enabled: boolean;
}

export interface PartnerProfileData {
  username: string;
  displayName: string;
  companyName: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstin?: string;
  operatingRegions: string[];
  yearsInBusiness: number;
  social: PartnerSocialLinks;
  avatar: string;
  coverImage: string;
  isVerified: boolean;
  rating: number;
  reviewsCount: number;
  tripsHosted: number;
  joinedDate: string;
  trustBadges?: PartnerTrustBadge[];
}

export interface TripPartnerProfileViewProps {
  username: string;
}
