
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Users, Search } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "2"
  });

  const handleSearch = () => {
    // Construire les paramètres de recherche
    const searchParams = new URLSearchParams();
    if (searchData.location) searchParams.set('location', searchData.location);
    if (searchData.checkIn) searchParams.set('checkin', searchData.checkIn);
    if (searchData.checkOut) searchParams.set('checkout', searchData.checkOut);
    if (searchData.guests) searchParams.set('guests', searchData.guests);
    
    // Naviguer vers la page de recherche avec les paramètres
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-ivorian-orange via-ivorian-orange-light to-ivorian-gold overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-white"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Hotro de Babi
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-2">
            Votre refuge discret en Côte d'Ivoire
          </p>
          <p className="text-lg text-white/80">
            Réservez en toute confidentialité les meilleurs hôtels et motels
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-4xl mx-auto animate-slide-up">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Trouvez votre hébergement idéal
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                <Select value={searchData.location} onValueChange={(value) => setSearchData({...searchData, location: value})}>
                  <SelectTrigger className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-ivorian-orange">
                    <SelectValue placeholder="Abidjan, Yamoussoukro..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abobo">Abobo</SelectItem>
                    <SelectItem value="adjame">Adjamé</SelectItem>
                    <SelectItem value="alepe">Alépé</SelectItem>
                    <SelectItem value="anyama">Anyama</SelectItem>
                    <SelectItem value="assinie">Assinie</SelectItem>
                    <SelectItem value="attecoube">Attécoubé</SelectItem>
                    <SelectItem value="azaguie">Azaguié</SelectItem>
                    <SelectItem value="bingerville">Bingerville</SelectItem>
                    <SelectItem value="bonoua">Bonoua</SelectItem>
                    <SelectItem value="cocody">Cocody</SelectItem>
                    <SelectItem value="dabou">Dabou</SelectItem>
                    <SelectItem value="grand-bassam">Grand-Bassam</SelectItem>
                    <SelectItem value="jacqueville">Jacqueville</SelectItem>
                    <SelectItem value="koumassi">Koumassi</SelectItem>
                    <SelectItem value="marcory">Marcory</SelectItem>
                    <SelectItem value="plateau">Plateau</SelectItem>
                    <SelectItem value="port-bouet">Port-Bouët</SelectItem>
                    <SelectItem value="songon">Songon</SelectItem>
                    <SelectItem value="treichville">Treichville</SelectItem>
                    <SelectItem value="yopougon">Yopougon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Check-in */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                <Input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                  className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-ivorian-orange"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Check-out */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                <Input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                  className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-ivorian-orange"
                  min={searchData.checkIn || new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Guests */}
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                <Select value={searchData.guests} onValueChange={(value) => setSearchData({...searchData, guests: value})}>
                  <SelectTrigger className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-ivorian-orange">
                    <SelectValue placeholder="2 personnes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 personne</SelectItem>
                    <SelectItem value="2">2 personnes</SelectItem>
                    <SelectItem value="3">3 personnes</SelectItem>
                    <SelectItem value="4">4 personnes</SelectItem>
                    <SelectItem value="5">5 personnes</SelectItem>
                    <SelectItem value="6+">6+ personnes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleSearch}
              className="w-full h-16 text-xl font-semibold gradient-ivorian hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <Search className="mr-3 h-6 w-6" />
              Rechercher des hébergements
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-slide-up">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Partout en Côte d'Ivoire</h3>
            <p className="text-white/80">Des hébergements dans toutes les grandes villes</p>
          </div>

          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Discrétion Garantie</h3>
            <p className="text-white/80">Vos réservations restent privées et confidentielles</p>
          </div>

          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Réservation Instantanée</h3>
            <p className="text-white/80">Confirmation immédiate, 24h/24 et 7j/7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
