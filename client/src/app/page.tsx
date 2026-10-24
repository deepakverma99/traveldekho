import dynamic from 'next/dynamic';
import {
  HeroSection,
  UpcomingTripsSection,
  NearbyTripsSection,
} from "@/components/Home";
import { FloatingBackground } from "@/components/shared";

const WeatherForecastSection = dynamic(
  () => import('@/components/Home/WeatherForecast').then((mod) => mod.WeatherForecastSection)
);
const IndiaOnWheelsSection = dynamic(
  () => import('@/components/Home/IndiaOnWheels').then((mod) => mod.IndiaOnWheelsSection)
);
const DestinationsSection = dynamic(
  () => import('@/components/Home/Destinations').then((mod) => mod.DestinationsSection)
);
const BudgetFriendlySection = dynamic(
  () => import('@/components/Home/BudgetFriendly').then((mod) => mod.BudgetFriendlySection)
);
const ExploreOffbeatSection = dynamic(
  () => import('@/components/Home/ExploreOffbeat').then((mod) => mod.ExploreOffbeatSection)
);
const MountainsSection = dynamic(
  () => import('@/components/Home/Mountains').then((mod) => mod.MountainsSection)
);
const HikeSection = dynamic(
  () => import('@/components/Home/Hike').then((mod) => mod.HikeSection)
);
const HeritageSection = dynamic(
  () => import('@/components/Home/Heritage').then((mod) => mod.HeritageSection)
);
const EducationalTripsSection = dynamic(
  () => import('@/components/Home/EducationalTrips').then((mod) => mod.EducationalTripsSection)
);
const VibeWithUsSection = dynamic(
  () => import('@/components/Home/VibeWithUs').then((mod) => mod.VibeWithUsSection)
);
const VendorsSection = dynamic(
  () => import('@/components/Home/Vendors').then((mod) => mod.VendorsSection)
);

export default function Home() {
  return (
    <main className="relative flex-1 w-full bg-white overflow-x-hidden min-h-screen">
      <FloatingBackground fixed />
      <HeroSection />
      <UpcomingTripsSection />
      <NearbyTripsSection />
      <WeatherForecastSection />
      <IndiaOnWheelsSection />
      <DestinationsSection />
      <BudgetFriendlySection />
      <ExploreOffbeatSection />
      <MountainsSection />
      <HikeSection />
      <HeritageSection />
      <EducationalTripsSection />
      <VibeWithUsSection />
      <VendorsSection />
    </main>
  );
}

