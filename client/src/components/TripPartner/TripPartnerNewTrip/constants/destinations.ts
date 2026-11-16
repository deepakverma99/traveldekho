/**
 * Configuration and metadata for Domestic and International trip logistics.
 */

export interface PopularCountryConfig {
  code: string;
  name: string;
  flag: string;
  popularCities: string[];
}

export const POPULAR_INTERNATIONAL_COUNTRIES: PopularCountryConfig[] = [
  {
    code: 'TH',
    name: 'Thailand',
    flag: '🇹🇭',
    popularCities: ['Bangkok', 'Phuket', 'Pattaya', 'Chiang Mai', 'Krabi', 'Koh Samui', 'Phi Phi Islands'],
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    popularCities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah', 'Fujairah'],
  },
  {
    code: 'VN',
    name: 'Vietnam',
    flag: '🇻🇳',
    popularCities: ['Hanoi', 'Da Nang', 'Ho Chi Minh City', 'Ha Long Bay', 'Hoi An', 'Nha Trang', 'Phu Quoc'],
  },
  {
    code: 'ID',
    name: 'Indonesia',
    flag: '🇮🇩',
    popularCities: ['Bali', 'Ubud', 'Seminyak', 'Kuta', 'Jakarta', 'Lombok', 'Gili Islands', 'Nusa Penida'],
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    popularCities: ['Singapore', 'Sentosa Island', 'Marina Bay'],
  },
  {
    code: 'MY',
    name: 'Malaysia',
    flag: '🇲🇾',
    popularCities: ['Kuala Lumpur', 'Langkawi', 'Penang', 'Genting Highlands', 'Kota Kinabalu'],
  },
  {
    code: 'MV',
    name: 'Maldives',
    flag: '🇲🇻',
    popularCities: ['Male', 'Maafushi', 'Hulhumale', 'Baa Atoll', 'Ari Atoll'],
  },
  {
    code: 'LK',
    name: 'Sri Lanka',
    flag: '🇱🇰',
    popularCities: ['Colombo', 'Kandy', 'Galle', 'Bentota', 'Sigiriya', 'Nuwara Eliya', 'Ella'],
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    popularCities: ['Tokyo', 'Kyoto', 'Osaka', 'Mount Fuji', 'Hiroshima', 'Nara', 'Sapporo'],
  },
  {
    code: 'CH',
    name: 'Switzerland',
    flag: '🇨🇭',
    popularCities: ['Zurich', 'Geneva', 'Interlaken', 'Lucerne', 'Zermatt', 'Grindelwald'],
  },
  {
    code: 'TR',
    name: 'Turkey',
    flag: '🇹🇷',
    popularCities: ['Istanbul', 'Cappadocia', 'Antalya', 'Bodrum', 'Pamukkale'],
  },
  {
    code: 'KZ',
    name: 'Kazakhstan',
    flag: '🇰🇿',
    popularCities: ['Almaty', 'Astana', 'Shymbulak'],
  },
  {
    code: 'GE',
    name: 'Georgia',
    flag: '🇬🇪',
    popularCities: ['Tbilisi', 'Batumi', 'Kazbegi', 'Gudauri'],
  },
  {
    code: 'AZ',
    name: 'Azerbaijan',
    flag: '🇦🇿',
    popularCities: ['Baku', 'Gabala', 'Shahdag'],
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    popularCities: ['Barcelona', 'Madrid', 'Seville', 'Ibiza', 'Valencia', 'Mallorca'],
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    popularCities: ['Paris', 'Nice', 'Lyon', 'Cannes', 'Marseille'],
  },
  {
    code: 'NP',
    name: 'Nepal',
    flag: '🇳🇵',
    popularCities: ['Kathmandu', 'Pokhara', 'Chitwan', 'Nagarkot', 'Lumbini'],
  },
  {
    code: 'BT',
    name: 'Bhutan',
    flag: '🇧🇹',
    popularCities: ['Thimphu', 'Paro', 'Punakha'],
  },
];

