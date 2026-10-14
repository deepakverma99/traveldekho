export type WeatherIconType = 'sun' | 'cloud' | 'cloud-rain' | 'snowflake';

export interface ForecastDay {
  day: string;
  temp: string;
  icon: WeatherIconType;
}

export interface WeatherDestination {
  id: string;
  city: string;
  currentTemp: string;
  condition: string;
  currentIcon: WeatherIconType;
  href: string;
  forecast: [ForecastDay, ForecastDay, ForecastDay];
}

export interface WeatherCardProps {
  destination: WeatherDestination;
}
