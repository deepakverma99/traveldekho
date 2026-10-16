export interface CityDestinationItem {
  id: string;
  name: string;
  state: string;
  image: string;
  query: string;
}

export interface CityCardProps {
  city: CityDestinationItem;
}
