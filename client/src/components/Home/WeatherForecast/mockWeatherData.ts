import { WeatherDestination } from './types';

export const mockWeatherData: WeatherDestination[] = [
  {
    id: 'weather-agra',
    city: 'Agra',
    currentTemp: '19°C',
    condition: 'Clear',
    currentIcon: 'sun',
    href: '/search?q=Agra',
    forecast: [
      { day: 'Today', temp: '21°', icon: 'sun' },
      { day: 'Tomorrow', temp: '18°', icon: 'cloud' },
      { day: 'Day 3', temp: '22°', icon: 'cloud-rain' },
    ],
  },
  {
    id: 'weather-alleppey',
    city: 'Alleppey',
    currentTemp: '23°C',
    condition: 'Clear',
    currentIcon: 'sun',
    href: '/search?q=Alleppey',
    forecast: [
      { day: 'Today', temp: '25°', icon: 'sun' },
      { day: 'Tomorrow', temp: '22°', icon: 'cloud' },
      { day: 'Day 3', temp: '26°', icon: 'cloud-rain' },
    ],
  },
  {
    id: 'weather-andamans',
    city: 'Andamans',
    currentTemp: '23°C',
    condition: 'Clear',
    currentIcon: 'sun',
    href: '/search?q=Andamans',
    forecast: [
      { day: 'Today', temp: '25°', icon: 'sun' },
      { day: 'Tomorrow', temp: '22°', icon: 'cloud' },
      { day: 'Day 3', temp: '26°', icon: 'cloud-rain' },
    ],
  },
  {
    id: 'weather-bangalore',
    city: 'Bangalore',
    currentTemp: '24°C',
    condition: 'Partly Cloudy',
    currentIcon: 'cloud',
    href: '/search?q=Bangalore',
    forecast: [
      { day: 'Today', temp: '26°', icon: 'cloud' },
      { day: 'Tomorrow', temp: '23°', icon: 'cloud-rain' },
      { day: 'Day 3', temp: '27°', icon: 'snowflake' },
    ],
  },
];
