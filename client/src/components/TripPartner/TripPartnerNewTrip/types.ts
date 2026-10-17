import { TripDifficulty, TripPartnerCardStatus } from '../types/';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals: string[];
  accommodation?: string;
  activities?: string[];
}

export const ROOM_SHARING_OPTIONS = [
  'Single',
  'Double',
  'Triple',
  'Dormitory',
] as const;

export type RoomSharingType = (typeof ROOM_SHARING_OPTIONS)[number];

export interface OccupancyPricingOption {
  id: string;
  sharingType: string;
  price: number | string;
  discountPercent?: number | string;
}

export interface DepartureBatch {
  id: string;
  startDate: string;
  endDate: string;
}

export interface NewTripFormData {
  // Step 1: Basic
  title: string;
  category: string;
  categories: string[];
  shortCatchphrase: string;
  description: string;
  disclaimer: string;
  reels: string[];

  // Step 2: Logistics
  destination: string;
  destinationCity: string;
  destinationState: string;
  showDifficulty?: boolean;
  durationNights: number | string;
  durationDays: number | string;
  pickupPoint: string;
  pickupPoints: string[];
  destinationsCovered: string[];
  dropPoint: string;
  scheduleType: 'recurring' | 'fixed';
  scheduleDates: string;
  maxSeats: number;

  // Step 3: Details
  price: number;
  originalPrice: number;
  discount: string;
  difficulty: TripDifficulty;
  tags: string[];
  inclusions: string[];
  exclusions: string[];

  // Step 4: Plan
  stayType: string;
  itinerary: ItineraryDay[];

  // Step 5: Final
  occupancyPricing?: OccupancyPricingOption[];
  whatsappNumber?: string;
  datesOnRequest?: boolean;
  departureBatches?: DepartureBatch[];
  image: string;
  gallery: string[];
  thingsToCarry?: string[];
  cancellationPolicy?: string;
  status: TripPartnerCardStatus;
}

export type StepNumber = 1 | 2 | 3 | 4 | 5;

export interface StepConfig {
  number: StepNumber;
  label: string;
}

export const TRIP_STEPS: readonly StepConfig[] = [
  { number: 1, label: 'BASIC' },
  { number: 2, label: 'LOGISTICS' },
  { number: 3, label: 'DETAILS' },
  { number: 4, label: 'PLAN' },
  { number: 5, label: 'FINAL' },
] as const;

export const CATEGORY_OPTIONS: readonly string[] = [
  'Budget Friendly',
  'Educational Trips',
  'Explore Offbeat',
  'Heritage',
  'Hike',
  'Mountains',
  'Weekend Escapes',
] as const;

/**
 * Validation rule: only numbers, alphabets, period (.) and whitespace are allowed
 */
export const isValidAlphanumericDot = (value: string): boolean => {
  if (!value) return true;
  return /^[a-zA-Z0-9.\s]*$/.test(value);
};

/**
 * Validation rule: only numbers (0-9) are allowed
 */
export const isValidOnlyNumbers = (value: string | number): boolean => {
  if (value === '' || value === undefined || value === null) return true;
  return /^\d+$/.test(String(value).trim());
};

/**
 * Validation rule: only alphabets and numbers are allowed (and whitespace)
 */
export const isValidAlphanumeric = (value: string): boolean => {
  if (!value) return true;
  return /^[a-zA-Z0-9\s]*$/.test(value);
};

/**
 * Filter: allow only numbers (0-9) to be entered
 */
export const filterOnlyNumbers = (value: string): string => {
  if (!value) return '';
  return value.replace(/\D/g, '');
};

/**
 * Filter: allow only alphabets, numbers, and whitespace to be entered
 */
export const filterAlphanumeric = (value: string): string => {
  if (!value) return '';
  return value.replace(/[^a-zA-Z0-9\s]/g, '');
};

/**
 * Filter: allow only numbers, alphabets, period (.), and whitespace to be entered
 */
export const filterAlphanumericDot = (value: string): string => {
  if (!value) return '';
  return value.replace(/[^a-zA-Z0-9.\s]/g, '');
};

/**
 * Validation rule: only alphabets and # are allowed (and whitespace)
 */
export const isValidTag = (value: string): boolean => {
  if (!value) return true;
  return /^[a-zA-Z#\s]*$/.test(value);
};

/**
 * Filter: allow only alphabets, #, and whitespace to be entered
 */
export const filterTagInput = (value: string): string => {
  if (!value) return '';
  return value.replace(/[^a-zA-Z#\s]/g, '');
};

export const DIFFICULTY_OPTIONS: readonly TripDifficulty[] = [
  'Easy',
  'Moderate',
  'Challenging',
  'Difficult',
] as const;

export const DEFAULT_PRESET_IMAGES: readonly { label: string; url: string }[] = [
  { label: 'Spiti Valley', url: '/trips/spiti.png' },
  { label: 'Ladakh Passes', url: '/trips/ladakh.png' },
  { label: 'Zanskar Valley', url: '/trips/zanskar.png' },
  { label: 'Leh & Turtuk', url: '/trips/leh-turtuk.png' },
  { label: 'Zanskar River', url: '/trips/zanskar-valley.png' },
  { label: 'Spain Trail', url: '/trips/spain.png' },
] as const;

export const COMMON_INCLUSION_SUGGESTIONS: readonly string[] = [
  'Transfers via AC Deluxe Tempo Traveller',
  '2 Nights Hotel / Camp Stay on sharing basis',
  'Daily Breakfast and Dinner included',
  'Experienced Team Captain & Guide',
  'All Inner Line Permits and State Taxes',
  'Welcome Drinks',
  'Trekking Poles',
] as const;

export const COMMON_EXCLUSION_SUGGESTIONS: readonly string[] = [
  'Personal expenses and room service',
  'Lunch and beverages outside plan',
  'Any adventure activities not mentioned',
  'Personal travel insurance',
] as const;

export const COMMON_STAY_TYPE_SUGGESTIONS: readonly string[] = [
  '3-Star Hotels',
  'Alpine Camps',
  'Boutique Homestay',
  'Luxury Resort',
  'Riverside Tents',
] as const;

export const createDefaultItineraryDay = (
  dayNumber: number,
  totalDays: number = 3
): ItineraryDay => {
  if (dayNumber === 1) {
    return {
      day: 1,
      title: 'Departure & Scenic Mountain Drive',
      description:
        'Overnight drive from starting hub. Wake up to crisp alpine views and check into our riverside base.',
      meals: ['Dinner'],
      accommodation: 'Boutique Hotel & Alpine Camps',
      activities: ['Scenic Drive'],
    };
  }
  if (dayNumber === totalDays && totalDays > 1) {
    return {
      day: dayNumber,
      title: 'Sunrise Walk & Return Journey',
      description:
        'Morning tea with panoramic views. Visit hidden viewpoints before heading back to the drop location.',
      meals: ['Breakfast'],
      accommodation: 'Boutique Hotel & Alpine Camps',
      activities: ['Sunrise Viewpoint'],
    };
  }
  return {
    day: dayNumber,
    title: `Day ${dayNumber}: Exploration & Valley Sightseeing`,
    description:
      'Explore scenic high-altitude viewpoints, ancient monasteries, local bazaars, and an evening campfire session.',
    meals: ['Breakfast', 'Dinner'],
    accommodation: 'Boutique Hotel & Alpine Camps',
    activities: ['Sightseeing', 'Campfire'],
  };
};

export const syncItineraryDays = (
  currentItinerary: ItineraryDay[] = [],
  daysCount: number | string
): ItineraryDay[] => {
  const targetDays = Math.max(1, Number(daysCount) || 1);
  const result: ItineraryDay[] = [];

  for (let i = 1; i <= targetDays; i++) {
    const existing = currentItinerary[i - 1];
    if (existing) {
      result.push({
        ...existing,
        day: i,
        meals: existing.meals || [],
        accommodation: existing.accommodation ?? 'Boutique Hotel & Alpine Camps',
        activities: existing.activities ?? [],
      });
    } else {
      result.push(createDefaultItineraryDay(i, targetDays));
    }
  }

  return result;
};

export const INITIAL_FORM_DATA: NewTripFormData = {
  title: '',
  category: '',
  categories: [],
  shortCatchphrase: '',
  description: '',
  disclaimer: '',
  reels: [],

  destination: '',
  destinationCity: '',
  destinationState: '',
  showDifficulty: true,
  durationNights: 2,
  durationDays: 3,
  pickupPoint: '',
  pickupPoints: [''],
  destinationsCovered: [''],
  dropPoint: '',
  scheduleType: 'recurring',
  scheduleDates: 'Every Friday',
  maxSeats: 16,

  price: 6500,
  originalPrice: 8000,
  discount: '19% OFF',
  difficulty: 'Easy',
  tags: [],
  inclusions: [],
  exclusions: [],

  stayType: 'Boutique Hotel & Alpine Camps',
  itinerary: [
    {
      day: 1,
      title: 'Departure & Scenic Mountain Drive',
      description:
        'Overnight drive from starting hub. Wake up to crisp alpine views and check into our riverside base.',
      meals: ['Dinner'],
      accommodation: 'Boutique Hotel & Alpine Camps',
      activities: ['Scenic Drive'],
    },
    {
      day: 2,
      title: 'Exploration & Valley Sightseeing',
      description:
        'Explore scenic high-altitude viewpoints, ancient monasteries, local bazaars, and an evening campfire session.',
      meals: ['Breakfast', 'Dinner'],
      accommodation: 'Boutique Hotel & Alpine Camps',
      activities: ['Sightseeing', 'Campfire'],
    },
    {
      day: 3,
      title: 'Sunrise Walk & Return Journey',
      description:
        'Morning tea with panoramic views. Visit hidden viewpoints before heading back to the drop location.',
      meals: ['Breakfast'],
      accommodation: 'Boutique Hotel & Alpine Camps',
      activities: ['Sunrise Viewpoint'],
    },
  ],

  image: '/trips/zanskar.png',
  gallery: ['/trips/ladakh.png', '/trips/spiti.png'],
  whatsappNumber: '+919899558944',
  datesOnRequest: false,
  departureBatches: [
    { id: 'batch-1', startDate: '', endDate: '' },
  ],
  occupancyPricing: [
    { id: 'opt-1', sharingType: 'Triple', price: 0, discountPercent: 0 },
    { id: 'opt-2', sharingType: 'Double', price: 0, discountPercent: 0 },
  ],
  status: 'Published',
};
