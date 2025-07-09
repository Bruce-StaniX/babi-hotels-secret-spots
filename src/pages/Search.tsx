import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, MapPin, Star, Filter, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    priceRange: 'all',
    rating: 'all'
  });

  const searchResults = [
    {
      id: 1,
      name: "Villa Romance Cocody",
      location: "Cocody",
      price: "25000",
      rating: 4.8,
      image: "/lovable-uploads/7166ae21-46de-4d2d-9098-e5e5e3128fb0.png",
      features: ["Piscine privée", "Jacuzzi", "Vue panoramique"]
    },
    {
      id: 2,
      name: "Suite Présidentielle Plateau",
      location: "Plateau",
      price: "35000",
      rating: 4.9,
      image: "/lovable-uploads/7166ae21-46de-4d2d-9098-e5e5e3128fb0.png",
      features: ["Balcon privé", "Service room", "Petit déjeuner"]
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
              onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')}
              className="mr-3"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Recherche</h1>
              <p className="text-muted-foreground">Trouvez l'hébergement parfait</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher un hébergement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
          <Button variant="outline" size="sm">
            <MapPin className="w-4 h-4 mr-2" />
            Près de moi
          </Button>
          <Button variant="outline" size="sm">
            <Star className="w-4 h-4 mr-2" />
            Mieux notés
          </Button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            {searchResults.length} résultats trouvés
          </h2>
          
          {searchResults.map((hotel) => (
            <Card key={hotel.id} className="glass-morphism hover:scale-[1.02] transition-transform motion-blur">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground">{hotel.name}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-muted-foreground ml-1">{hotel.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      {hotel.location}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {hotel.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary">{hotel.price} FCFA</span>
                      <Button size="sm">Voir détails</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;