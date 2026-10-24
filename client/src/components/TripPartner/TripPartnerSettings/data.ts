import { PartnerSettingsData, SettingsTabItem, PartnerKycData } from './types';

export const SETTINGS_TABS: SettingsTabItem[] = [
  {
    id: 'profile',
    label: 'Profile Setting',
    subtitle: 'Account details, credentials & security',
  },

  {
    id: 'notifications',
    label: 'Notification Setting',
    subtitle: 'Email booking & operational alerts',
  },

  {
    id: 'kyc',
    label: 'KYC Status',
    subtitle: 'Business documents & compliance status',
    badge: 'Verified',
  },
];

export const SUPPORTED_BANKS = [
  'HDFC Bank',
  'ICICI Bank',
  'State Bank of India',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Canara Bank',
  'IndusInd Bank',
  'Federal Bank',
];

export const PAYOUT_SCHEDULE_OPTIONS = [
  {
    value: 'weekly',
    label: 'Weekly Settlement',
    description: 'Direct deposit every Monday for completed tours',
  },
  {
    value: 'biweekly',
    label: 'Bi-Weekly Settlement',
    description: 'Direct deposit on the 1st and 16th of each month',
  },
  {
    value: 'monthly',
    label: 'Monthly Settlement',
    description: 'Consolidated settlement on the 1st of every month',
  },
] as const;

export const CANCELLATION_POLICIES = [
  {
    id: 'flexible',
    title: 'Flexible Policy',
    description: '100% refund up to 7 days before trip start; 50% refund thereafter.',
    recommended: false,
  },
  {
    id: 'moderate',
    title: 'Moderate Policy (Recommended)',
    description: '100% refund up to 14 days before trip start; 50% refund up to 7 days.',
    recommended: true,
  },
  {
    id: 'strict',
    title: 'Strict Expedition Policy',
    description: '50% refund up to 30 days before departure; non-refundable within 30 days.',
    recommended: false,
  },
] as const;

export const BOOKING_CUTOFF_OPTIONS = [
  { hours: 12, label: '12 Hours Before' },
  { hours: 24, label: '24 Hours Before (Standard)' },
  { hours: 48, label: '48 Hours Before' },
  { hours: 72, label: '72 Hours Before (Expedition)' },
];

export const DEFAULT_PARTNER_KYC: PartnerKycData = {
  registrationType: 'company',
  verificationStatus: 'verified',
  verifiedDate: '12 Oct 2025',
  // Company fields
  companyIncorporation: {
    fileName: 'travellr_incorporation_certificate.pdf',
    fileSize: '1.8 MB',
    uploadedAt: '12 Oct 2025',
  },
  companyPan: {
    fileName: 'company_pan_card.pdf',
    fileSize: '740 KB',
    uploadedAt: '12 Oct 2025',
  },
  companyGst: '02AAACW1234F1Z5',
  founderAadhaar: {
    fileName: 'founder_aadhaar_card.pdf',
    fileSize: '1.2 MB',
    uploadedAt: '12 Oct 2025',
  },
  founderPan: {
    fileName: 'founder_pan_card.pdf',
    fileSize: '610 KB',
    uploadedAt: '12 Oct 2025',
  },
  companyCancelledCheck: {
    fileName: 'hdfc_cancelled_check.pdf',
    fileSize: '890 KB',
    uploadedAt: '12 Oct 2025',
  },
  // Trip Partner (Individual) fields
  partnerAadhaar: null,
  partnerPan: null,
  partnerCancelledCheck: null,
  partnerElectricityBill: null,
  partnerSupportingDocs: null,
};


export const DEFAULT_PARTNER_SETTINGS: PartnerSettingsData = {
  username: 'travellr',
  bankDetails: {
    accountHolderName: 'Travellr Times Expeditions Pvt Ltd',
    bankName: 'HDFC Bank',
    accountNumber: '••••••••4812',
    ifscCode: 'HDFC0001248',
    accountType: 'current',
    payoutSchedule: 'weekly',
    isVerified: true,
    branchName: 'Mall Road, Manali Branch',
  },
  notifications: {
    emailNewBookings: true,
    emailCancellations: true,
    emailDateRequests: true,
    emailMonthlyPayouts: true,
    whatsappInstantAlerts: true,
    whatsappDepartureSummaries: false,
    smsCriticalAlerts: true,
  },
  policies: {
    instantBookingEnabled: true,
    bookingCutoffHours: 24,
    cancellationPolicy: 'moderate',
    minAdvanceNoticeDays: 2,
    autoAcceptDateRequests: false,
  },
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: '14 Oct 2026',
    lastLoginIp: '103.21.244.18 (Himachal Pradesh, IN)',
    sessionTimeoutMinutes: 60,
  },
  kyc: DEFAULT_PARTNER_KYC,
};

