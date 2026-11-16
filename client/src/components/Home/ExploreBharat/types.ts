
export type CategoryIconType =
  | 'footprints'
  | 'beach'
  | 'bike'
  | 'tent'
  | 'mountain'
  | 'desert'
  | 'rafting'
  | 'wildlife'
  | 'spiritual'
  | 'backpack';

export interface ExploreCategoryItem {
  id: string;
  name: string;
  countText: string;
  iconType: CategoryIconType;
  emoji?: string;
  href: string;
}

export type StateIconType =
  | 'mountain'
  | 'om'
  | 'beach'
  | 'fort'
  | 'palm'
  | 'pass'
  | 'waterfall'
  | 'monastery';

export interface ExploreStateItem {
  id: string;
  name: string;
  subtitle: string;
  tripCountText: string;
  iconType: StateIconType;
  image?: string;
  tags: string[];
  href: string;
}

export interface ExploreBharatSectionProps {
  id?: string;
  className?: string;
}
