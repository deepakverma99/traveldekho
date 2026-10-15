import { TripDetail } from './types';

export const kausaniTripDetail: TripDetail = {
  id: 'trip-kausani-8039',
  slug: 'the-kausani-story-8039',
  title: 'The Kausani story 2.0',
  description:
    'Nestled in the tranquil Himalayas, discover breathtaking panoramic views of snow-capped peaks, serene ashrams, and verdant tea estates on an unforgettable guided getaway.',
  destination: 'Kausani',
  duration: '2 nights / 3 days',
  heroImage:
    '/storage/traveldekho-media/traveldekho/trips/thumbnails/e96dd397-e4b9-48ad-b03d-c2a33d374ea1.jpg',
  tags: [
    { label: 'Budget Friendly', variant: 'amber' },
    { label: 'Explore Offbeat', variant: 'amber' },
    { label: 'Hike', variant: 'amber' },
    { label: 'Mountains', variant: 'amber' },
    { label: 'Heritage', variant: 'amber' },
    { label: 'Educational Trips', variant: 'amber' },
    { label: 'Weekend Escapes', variant: 'amber' },
    { label: 'moderate', variant: 'white' },
  ],
  difficulty: 'moderate',
  about: {
    description: `Nestled in the Himalayas, Kausani is known for its breathtaking panoramic views of the snow-capped Nanda Devi and Trishul peaks. Visit the Anasakti Ashram, where Mahatma Gandhi was inspired to write his 'Anasakti Yoga', and explore the charming local markets to experience the Kumaoni culture and cuisine unique to this tranquil hill station.`,
    mapImage:
      '/storage/traveldekho-media/traveldekho/trips/thumbnails/0f93d97d-f35e-497f-b4f1-2f24caca5a26.jpg',
  },
  itinerary: [
    {
      day: 'D1',
      title: 'We will Depart from Bareilly around 6 AM in a traveller or Bus .',
      description:
        'Antakshri, Dumb Charades, Dancing sessions, and lots of interactive games throughout the journey.',
      meals: 'B',
    },
    {
      day: 'D2',
      title:
        'We will start our journey at 3:00 PM by visiting the Baijnath Temple to admire the top view of the hill, followed by a stroll down Mall Road for some shopping in Main Kausani.',
      description:
        'After dinner, the captain will arrange games like Never Have I Ever, Truth and Dare, etc.',
      meals: 'B / D',
    },
    {
      day: 'D3',
      title: 'Witness Golden Sunrise over Himalayan Peaks & Return Journey.',
      description:
        'Early morning sunrise walk to the tea estates, visit Anasakti Ashram for peace meditation, pack memories, and head back with a heart full of stories.',
      meals: 'B',
    },
  ],
  packageDetails: {
    included: [
      'We will start our journey at 3:00 PM by visiting the Baijnath Temple to admire the top view of the hill, followed by a stroll down Mall Road for some shopping in Main Kausani.',
      'Reach the hotel for an awesome dinner Bonfire & DJ night',
      'After dinner, the captain will arrange games like Never Have I Ever, Truth and Dare, etc.',
      'Deluxe hotel accommodation on double / triple sharing basis',
      'Scout-verified trip captain and 24/7 dedicated local assistance',
    ],
    excluded: [
      'extra locations',
      'Any meals not explicitly mentioned in the itinerary inclusion',
      'Personal expenses, tips, porter charges, and laundry',
      'Emergency medical evacuations or changes due to landslides/weather',
    ],
  },
  costing: [
    {
      dateRange: '30 Oct 2026 → 1 Nov 2026',
      location: 'Kausani',
      price: 6000,
    },
    {
      dateRange: '24 Nov 2026 → 27 Nov 2026',
      location: 'Kausani',
      price: 6000,
    },
    {
      dateRange: '15 Dec 2026 → 18 Dec 2026',
      location: 'Kausani',
      price: 6500,
    },
  ],
  gallery: [
    '/storage/traveldekho-media/traveldekho/trips/gallery/48ec2772-962d-4aa6-959d-a85efccfeed8.jpg',
    '/storage/traveldekho-media/traveldekho/trips/gallery/a66a7eab-961a-44f6-9676-26beda48240b.jpg',
    '/storage/traveldekho-media/traveldekho/trips/gallery/bda2dabb-34e6-44dc-8279-41e3520bc7c9.jpg',
    '/storage/traveldekho-media/traveldekho/trips/gallery/1836dda1-bfc7-49ee-8f49-5a951da11c6d.webp',
    '/storage/traveldekho-media/traveldekho/trips/gallery/5e0f158c-a9b4-4033-8725-9b728194c15e.jpg',
  ],
  destinationsCovered: [
    'Kausani State',
    'Kausani Tea Estate',
    'Kausani uttrakhand',
  ],
  pickupPoints: [
    'Bareilly Junction',
    'Bareilly Satellite Bus Stand',
    'Invertis University',
  ],
  partner: {
    name: 'Travellr Time',
    slug: 'travellr-times',
    logo: '/storage/traveldekho-media/traveldekho/vendors/5cc48027-9426-42d5-adc9-39a619643417.webp',
    isVerified: true,
  },
  pricing: {
    startingPrice: 5400,
    originalPrice: 6000,
    discount: '₹600 Off',
  },
  dateSlots: [
    {
      id: 'slot-1',
      date: '30 Oct 2026',
      price: 6000,
      month: 'October',
    },
    {
      id: 'slot-2',
      date: '24 Nov 2026',
      price: 6000,
      month: 'November',
    },
    {
      id: 'slot-3',
      date: '15 Dec 2026',
      price: 6500,
      month: 'December',
    },
  ],
  weather: {
    location: 'uttrakhand',
    currentTemp: '25°C',
    condition: 'Light Rain',
    forecast: [
      { day: 'Today', condition: 'Rain', temp: '27°', icon: 'rain' },
      { day: 'Tomorrow', condition: 'Cold', temp: '24°', icon: 'snow' },
      { day: 'Day 3', condition: 'Sunny', temp: '28°', icon: 'sun' },
    ],
  },
};

const genericMockTrips: Record<string, Partial<TripDetail>> = {
  'manali-times-0563': {
    title: 'Manali Times & Solang Valley Escape',
    description:
      'Experience the magic of snow-peaked mountains, scenic Solang valleys, and vibrant local culture in Himachal Pradesh.',
    destination: 'Manali',
    duration: '2 nights / 3 days',
    heroImage: '/destinations/manali.png',
    pricing: {
      startingPrice: 8010,
      originalPrice: 9000,
      discount: '₹990 Off',
    },
    destinationsCovered: ['Old Manali', 'Solang Valley', 'Hadimba Temple', 'Jogini Waterfall'],
    pickupPoints: ['Majnu Ka Tilla, Delhi', 'Kashmere Gate, Delhi', 'Chandigarh Sector 43'],
  },
  'ladakh-5433': {
    title: 'Ladakh High Passes & Pangong Tso Expedition',
    description:
      'Explore the magical landscapes of Ladakh. From iconic viewpoints to cultural heritage sites, enjoy an all-inclusive adventure led by certified trip captains.',
    destination: 'Ladakh',
    duration: '5 nights / 6 days',
    heroImage: '/trips/ladakh.png',
    pricing: {
      startingPrice: 18500,
      originalPrice: 22000,
      discount: '₹3,500 Off',
    },
    destinationsCovered: ['Leh Palace', 'Khardung La Pass', 'Nubra Valley', 'Pangong Lake'],
    pickupPoints: ['Kushok Bakula Rimpochee Airport (IXL), Leh'],
  },
  'zanskar-valley-expedition': {
    title: 'Zanskar Frozen River & High Valley Trek',
    description:
      'Venture into the raw, untouched beauty of Zanskar with thrilling high mountain passes, ancient cliffside monasteries, and pristine glacial valleys.',
    destination: 'Zanskar',
    duration: '6 nights / 7 days',
    heroImage: '/trips/zanskar.png',
    pricing: {
      startingPrice: 24999,
      originalPrice: 28999,
      discount: '₹4,000 Off',
    },
    destinationsCovered: ['Padum', 'Phugtal Monastery', 'Shinkula Pass', 'Zangla Fort'],
    pickupPoints: ['Leh Main Market', 'Kargil Tourist Centre'],
  },
};

export const getTripBySlug = (slug: string): TripDetail => {
  // If exact match or kausani-related
  if (slug === 'the-kausani-story-8039' || slug.includes('kausani')) {
    return kausaniTripDetail;
  }

  // Check generic known trips
  const matched = genericMockTrips[slug];
  if (matched) {
    const tripDesc =
      matched.description ||
      `Explore the magical landscapes of ${matched.destination || 'the Himalayas'}. From iconic viewpoints to cultural heritage sites, enjoy an all-inclusive adventure led by certified trip captains.`;

    return {
      ...kausaniTripDetail,
      ...matched,
      slug,
      id: `trip-${slug}`,
      description: tripDesc,
      about: {
        ...kausaniTripDetail.about,
        description: tripDesc,
      },
    };
  }

  // Fallback for any other slug: adapt gracefully
  const cleanTitle = slug
    .replace(/-[a-z0-9]{4,}$/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const fallbackDesc = `Explore the magical landscapes of ${cleanTitle || 'the Himalayas'}. From iconic viewpoints to cultural heritage sites, enjoy an all-inclusive adventure led by certified trip captains.`;

  return {
    ...kausaniTripDetail,
    id: `trip-${slug}`,
    slug,
    title: cleanTitle || 'Himalayan Expedition & Adventure',
    description: fallbackDesc,
    about: {
      ...kausaniTripDetail.about,
      description: fallbackDesc,
    },
  };
};
