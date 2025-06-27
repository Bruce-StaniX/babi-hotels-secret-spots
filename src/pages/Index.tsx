
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedHotels from "@/components/FeaturedHotels";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturedHotels />
      <Footer />
    </div>
  );
};

export default Index;
