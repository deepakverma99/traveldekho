export interface TripTag {
  label: string;
  variant?: 'amber' | 'blue' | 'gray';
}

export interface TripItem {
  id: string;
  slug: string;
  title: string;
  destination: string;
  duration: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: string;
  date: string;
  freeGoodies?: boolean;
  tags: (string | TripTag)[];
  partner: {
    name: string;
    logo?: string;
    ratingText?: string;
  };
}
