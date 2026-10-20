import {
  HeroSection,
  UpcomingTripsSection,
  NearbyTripsSection,
  WeatherForecastSection,
  IndiaOnWheelsSection,
  DestinationsSection,
  BudgetFriendlySection,
  ExploreOffbeatSection,
  MountainsSection,
  HikeSection,
  HeritageSection,
  EducationalTripsSection,
  VibeWithUsSection,
  VendorsSection,
} from "@/components/Home";
import { FloatingBackground } from "@/components/shared";

export default function Home() {
  return (
    <main className="relative flex-1 w-full bg-background overflow-x-hidden min-h-screen">
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

