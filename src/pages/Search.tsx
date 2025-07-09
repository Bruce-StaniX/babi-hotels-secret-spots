import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search as SearchIcon, MapPin, Star, Filter, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { searchHotels, communes, Hotel, getCommuneDisplayName } from '@/data/hotelsData';

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    priceRange: 'all',
    rating: 'all'
  });
  const [searchResults, setSearchResults] = useState<Hotel[]>([]);

  // Effet pour récupérer les paramètres d'URL et effectuer la recherche
  useEffect(() => {
    const locationParam = searchParams.get('location');
    const dateParam = searchParams.get('date');
    const guestsParam = searchParams.get('guests');

    if (locationParam) {
      setFilters(prev => ({ ...prev, location: locationParam }));
    }

    // Effectuer la recherche avec les paramètres
    const results = searchHotels(searchQuery, locationParam || filters.location);
    setSearchResults(results);
  }, [searchParams, searchQuery]);

  const handleLocationChange = (location: string) => {
    const actualLocation = location === "all" ? "" : location;
    setFilters(prev => ({ ...prev, location: actualLocation }));
    const results = searchHotels(searchQuery, actualLocation);
    setSearchResults(results);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const results = searchHotels(query, filters.location);
    setSearchResults(results);
  };

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
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Location Filter */}
        <div className="mb-6">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
              <Select 
                value={filters.location || "all"} 
                onValueChange={handleLocationChange}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Filtrer par commune..." />
                </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les communes</SelectItem>
                {communes.map((commune) => (
                  <SelectItem key={commune} value={commune}>
                    {getCommuneDisplayName(commune)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                      <span className="text-lg font-bold text-primary">{hotel.price.toLocaleString()} FCFA</span>
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