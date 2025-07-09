import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation as NavigationIcon, Filter, Star, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { useAppMode } from '@/hooks/useAppMode';

const Map = () => {
  const navigate = useNavigate();
  const { skipToHomepage } = useAppMode();
  const [selectedHotel, setSelectedHotel] = useState<number | null>(null);

  const hotels = [
    {
      id: 1,
      name: "Villa Romance Cocody",
      location: "Cocody",
      price: "25000",
      rating: 4.8,
      image: "/lovable-uploads/7166ae21-46de-4d2d-9098-e5e5e3128fb0.png",
      coordinates: { lat: 5.35, lng: -3.96 },
      distance: "1.2 km"
    },
    {
      id: 2,
      name: "Suite Présidentielle Plateau",
      location: "Plateau",
      price: "35000",
      rating: 4.9,
      image: "/lovable-uploads/7166ae21-46de-4d2d-9098-e5e5e3128fb0.png",
      coordinates: { lat: 5.32, lng: -4.02 },
      distance: "2.8 km"
    },
    {
      id: 3,
      name: "Chambre Luxury Marcory",
      location: "Marcory",
      price: "20000",
      rating: 4.6,
      image: "/lovable-uploads/7166ae21-46de-4d2d-9098-e5e5e3128fb0.png",
      coordinates: { lat: 5.28, lng: -3.99 },
      distance: "3.5 km"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                skipToHomepage();
                navigate('/');
              }}
              className="mr-3"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Carte</h1>
              <p className="text-muted-foreground">Explorez les hébergements autour de vous</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 h-[600px]">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="glass-morphism h-full">
              <CardContent className="p-0 h-full relative">
                {/* Placeholder Map */}
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Map Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="border border-muted/30"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Hotel Markers */}
                  {hotels.map((hotel, index) => (
                    <div
                      key={hotel.id}
                      className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                        index === 0 ? 'top-1/3 left-1/3' :
                        index === 1 ? 'top-1/2 left-2/3' : 'top-2/3 left-1/4'
                      }`}
                      onClick={() => setSelectedHotel(hotel.id)}
                    >
                      <div className={`p-2 rounded-full ${
                        selectedHotel === hotel.id ? 'bg-primary' : 'bg-background'
                      } shadow-lg border-2 border-primary/50 hover:scale-110 transition-transform`}>
                        <MapPin className={`w-4 h-4 ${
                          selectedHotel === hotel.id ? 'text-primary-foreground' : 'text-primary'
                        }`} />
                      </div>
                      {selectedHotel === hotel.id && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10">
                          <Card className="w-48 glass-morphism">
                            <CardContent className="p-3">
                              <h4 className="font-semibold text-sm text-foreground">{hotel.name}</h4>
                              <p className="text-xs text-muted-foreground">{hotel.location}</p>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-sm font-bold text-primary">{hotel.price} FCFA</span>
                                <div className="flex items-center">
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  <span className="text-xs text-muted-foreground ml-1">{hotel.rating}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                    <p className="text-muted-foreground">Carte interactive des hébergements</p>
                    <p className="text-sm text-muted-foreground mt-2">Cliquez sur les marqueurs pour plus d'infos</p>
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 space-y-2">
                  <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur">
                    <NavigationIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>

                {/* User Location */}
                <div className="absolute bottom-4 left-4">
                  <Button className="bg-background/80 backdrop-blur text-foreground border">
                    <MapPin className="w-4 h-4 mr-2" />
                    Ma position
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hotel List */}
          <div className="lg:col-span-1">
            <Card className="glass-morphism h-full">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-foreground">Hébergements proches</h3>
                  <Badge variant="secondary">{hotels.length}</Badge>
                </div>
                
                <div className="space-y-3 overflow-y-auto max-h-[500px]">
                  {hotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      onClick={() => setSelectedHotel(hotel.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all motion-blur ${
                        selectedHotel === hotel.id 
                          ? 'bg-primary/10 border border-primary/30' 
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium text-foreground text-sm truncate">{hotel.name}</h4>
                            <Button variant="ghost" size="icon" className="w-6 h-6">
                              <Heart className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center text-xs text-muted-foreground mb-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {hotel.location} • {hotel.distance}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                              <span className="text-xs text-muted-foreground">{hotel.rating}</span>
                            </div>
                            <span className="text-sm font-bold text-primary">{hotel.price} FCFA</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;