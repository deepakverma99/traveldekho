export interface TripDetailTag {
  label: string;
  variant?: 'amber' | 'white' | 'blue';
}

export interface ItineraryItem {
  day: string;
  title: string;
  description: string;
  meals?: string;
}

export interface PackageDetails {
  included: string[];
  excluded: string[];
}

export interface CostingSlot {
  dateRange: string;
  location: string;
  price: number;
}

export interface DateSlot {
  id: string;
  date: string;
  price: number;
  month: string;
}

export interface TripPartner {
  name: string;
  slug: string;
  logo: string;
  isVerified: boolean;
}

export interface WeatherForecastDay {
  day: string;
  condition: string;
  temp: string;
  icon: 'rain' | 'snow' | 'sun' | 'cloud';
}

export interface TripWeather {
  location: string;
  currentTemp: string;
  condition: string;
  forecast: WeatherForecastDay[];
}

export interface TripDetail {
  id: string;
  slug: string;
  title: string;
  description?: string;
  destination: string;
  duration: string;
  heroImage: string;
  tags: TripDetailTag[];
  difficulty: string;
  about: {
    description: string;
    mapImage?: string;
  };
  itinerary: ItineraryItem[];
  packageDetails: PackageDetails;
  costing: CostingSlot[];
  gallery: string[];
  destinationsCovered: string[];
  pickupPoints: string[];
  partner: TripPartner;
  pricing: {
    startingPrice: number;
    originalPrice: number;
    discount: string;
  };
  dateSlots: DateSlot[];
  weather: TripWeather;
}
