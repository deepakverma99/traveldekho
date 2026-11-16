export type CityIconType =
  | 'mountain'
  | 'rafting'
  | 'fort'
  | 'palace'
  | 'spiritual'
  | 'monument'
  | 'temple'
  | 'pine';

export interface DiscoverCityItem {
  id: string;
  name: string;
  subtitle: string;
  tripCountText: string;
  iconType: CityIconType;
  image?: string;
  emoji?: string;
  tags: string[];
  href: string;
}

export interface ClimateConditionLine {
  iconType: 'snow' | 'wave' | 'raft' | 'fort' | 'check' | 'sun';
  text: string;
}

export interface DestinationClimateItem {
  id: string;
  destination: string;
  context: string;
  temp: string;
  badgeText: string;
  iconType: 'sun' | 'thermometer';
  image?: string;
  condition1: ClimateConditionLine;
  condition2: ClimateConditionLine;
  tripCountText: string;
  href: string;
}

export interface DiscoverBharatSectionProps {
  id?: string;
  className?: string;
}
