export interface NotificationSettings {
  emailAlerts: boolean;
  smsAlerts: boolean;
  promoMarketing: boolean;
}

export interface SettingsTabProps {
  userName: string;
  userPhone?: string;
  userEmail?: string;
  onLogout: () => void;
}

