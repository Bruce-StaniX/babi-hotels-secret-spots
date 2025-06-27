
import { useAppMode } from "@/hooks/useAppMode";
import OnboardingFlow from "@/components/OnboardingFlow";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedHotels from "@/components/FeaturedHotels";
import Footer from "@/components/Footer";

const Index = () => {
  const { isOnboardingComplete, completeOnboarding, isPrivacyModeActive } = useAppMode();

  if (!isOnboardingComplete) {
    return <OnboardingFlow onComplete={completeOnboarding} />;
  }

  return (
    <div className={`min-h-screen ${isPrivacyModeActive ? 'privacy-mode' : ''}`}>
      <Navigation />
      <HeroSection />
      <FeaturedHotels />
      <Footer />
    </div>
  );
};

export default Index;
