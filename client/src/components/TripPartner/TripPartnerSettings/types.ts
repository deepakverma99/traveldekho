export type SettingsTabType = 'profile' | 'notifications' | 'kyc';

export interface SettingsTabItem {
  id: SettingsTabType;
  label: string;
  subtitle: string;
  badge?: string;
}

export type KycRegistrationType = 'company' | 'trip_partner';

export type KycVerificationStatus = 'verified' | 'pending' | 'in_review' | 'rejected' | 'not_submitted';

export interface KycUploadFile {
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  fileUrl?: string;
}

export interface PartnerKycData {
  registrationType: KycRegistrationType;
  verificationStatus: KycVerificationStatus;
  verifiedDate?: string;
  // Company fields
  companyIncorporation?: KycUploadFile | null;
  companyPan?: KycUploadFile | null;
  companyGst: string;
  founderAadhaar?: KycUploadFile | null;
  founderPan?: KycUploadFile | null;
  companyCancelledCheck?: KycUploadFile | null;
  // Trip Partner fields
  partnerAadhaar?: KycUploadFile | null;
  partnerPan?: KycUploadFile | null;
  partnerCancelledCheck?: KycUploadFile | null;
  partnerElectricityBill?: KycUploadFile | null;
  partnerSupportingDocs?: KycUploadFile | null;
}


export interface PartnerBankDetails {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: 'current' | 'savings';
  payoutSchedule: 'weekly' | 'biweekly' | 'monthly';
  isVerified: boolean;
  branchName?: string;
}

export interface PartnerNotificationSettings {
  emailNewBookings: boolean;
  emailCancellations: boolean;
  emailDateRequests: boolean;
  emailMonthlyPayouts: boolean;
  whatsappInstantAlerts: boolean;
  whatsappDepartureSummaries: boolean;
  smsCriticalAlerts: boolean;
}

export interface PartnerBookingPolicies {
  instantBookingEnabled: boolean;
  bookingCutoffHours: number; // e.g. 24, 48, 72 hours before departure
  cancellationPolicy: 'flexible' | 'moderate' | 'strict';
  minAdvanceNoticeDays: number;
  autoAcceptDateRequests: boolean;
}

export interface PartnerSecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  lastLoginIp: string;
  sessionTimeoutMinutes: number;
}

export interface PartnerSettingsData {
  username: string;
  bankDetails: PartnerBankDetails;
  notifications: PartnerNotificationSettings;
  policies: PartnerBookingPolicies;
  security: PartnerSecuritySettings;
  kyc: PartnerKycData;
}

export interface TripPartnerSettingsViewProps {
  username: string;
}

