import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import FeaturedTreks from "@/components/sections/FeaturedTreks";
import TrekRegions from "@/components/sections/TrekRegions";
import WhyUs from "@/components/sections/WhyUs";
import TestimonialsPreview from "@/components/sections/TestimonialsPreview";
import PhotoTeaser from "@/components/sections/PhotoTeaser";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturedTreks />
      <TrekRegions />
      <WhyUs />
      <TestimonialsPreview />
      <PhotoTeaser />
      <CTABanner />
    </>
  );
}
