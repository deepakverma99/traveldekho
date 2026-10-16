export interface DestinationItem {
  id: string;
  name: string;
  slogan: string;
  image: string;
  query: string;
}

export interface DestinationCardProps {
  destination: DestinationItem;
}
