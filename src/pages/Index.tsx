
import { useAppMode } from "@/hooks/useAppMode";
import OnboardingFlow from "@/components/OnboardingFlow";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedHotels from "@/components/FeaturedHotels";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import AdSidebar from "@/components/AdSidebar";

const Index = () => {
  const { isOnboardingComplete, completeOnboarding, isPrivacyModeActive } = useAppMode();

  if (!isOnboardingComplete) {
    return <OnboardingFlow onComplete={completeOnboarding} />;
  }

  return (
    <div className={`min-h-screen ${isPrivacyModeActive ? 'privacy-mode' : ''}`}>
      <Navigation />
      
      {/* Top Banner Ad */}
      <div className="py-4 bg-background/50">
        <div className="container mx-auto px-4">
          <AdBanner type="banner" position="top" dismissible={true} />
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1">
          <HeroSection />
          
          {/* Featured Ad between sections */}
          <div className="py-8 bg-background/30">
            <div className="container mx-auto px-4">
              <AdBanner type="featured" position="middle" dismissible={true} />
            </div>
          </div>
          
          <FeaturedHotels />
        </div>

        {/* Sidebar Ads */}
        <div className="hidden lg:block w-72 p-4">
          <div className="sticky top-20">
            <AdSidebar />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
