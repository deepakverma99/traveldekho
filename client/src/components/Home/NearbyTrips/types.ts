export type LocationPermissionState = 'idle' | 'requesting' | 'denied' | 'granted';

export interface LocationPermissionCardProps {
  isLoading?: boolean;
  onRetry: () => void;
}

export interface NearbyTripsSectionProps {
  initialState?: LocationPermissionState;
}
