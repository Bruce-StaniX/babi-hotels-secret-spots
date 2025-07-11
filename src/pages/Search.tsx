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
import { ViewHotelDialog } from '@/components/ViewHotelDialog';
import AdBanner from '@/components/AdBanner';
import AdSidebar from '@/components/AdSidebar';

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
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [sortBy, setSortBy] = useState<'default' | 'rating' | 'proximity'>('default');
  const [showFilters, setShowFilters] = useState(false);

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

  const sortResults = (results: Hotel[], sortType: 'default' | 'rating' | 'proximity') => {
    const sorted = [...results];
    switch (sortType) {
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'proximity':
        // Pour l'instant, on simule le tri par proximité avec un ordre aléatoire
        // En réalité, il faudrait la géolocalisation de l'utilisateur
        return sorted.sort(() => Math.random() - 0.5);
      default:
        return sorted;
    }
  };

  const handleSortByRating = () => {
    const newSortBy = sortBy === 'rating' ? 'default' : 'rating';
    setSortBy(newSortBy);
    const sortedResults = sortResults(searchResults, newSortBy);
    setSearchResults(sortedResults);
  };

  const handleSortByProximity = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          const newSortBy = sortBy === 'proximity' ? 'default' : 'proximity';
          setSortBy(newSortBy);
          const sortedResults = sortResults(searchResults, newSortBy);
          setSearchResults(sortedResults);
        },
        () => {
          alert('Veuillez autoriser la géolocalisation pour trier par proximité');
        }
      );
    } else {
      alert('La géolocalisation n\'est pas supportée par votre navigateur');
    }
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Top Banner Ad */}
      <div className="py-2 bg-background/50">
        <div className="container mx-auto px-4">
          <AdBanner type="banner" position="top" location={filters.location} dismissible={true} />
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 container mx-auto px-4 py-6 pb-20 md:pb-6">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
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
                <SelectContent className="max-h-60 overflow-y-auto">
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
            <Button 
              variant={showFilters ? "default" : "outline"} 
              size="sm"
              onClick={handleToggleFilters}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
            <Button 
              variant={sortBy === 'proximity' ? "default" : "outline"} 
              size="sm"
              onClick={handleSortByProximity}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Près de moi
            </Button>
            <Button 
              variant={sortBy === 'rating' ? "default" : "outline"} 
              size="sm"
              onClick={handleSortByRating}
            >
              <Star className="w-4 h-4 mr-2" />
              Mieux notés
            </Button>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mb-6 p-4 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Filtres avancés</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Gamme de prix</label>
                  <Select 
                    value={filters.priceRange} 
                    onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une gamme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les prix</SelectItem>
                      <SelectItem value="budget">Budget (&lt; 25,000 FCFA)</SelectItem>
                      <SelectItem value="mid">Moyen (25,000 - 50,000 FCFA)</SelectItem>
                      <SelectItem value="luxury">Luxe (&gt; 50,000 FCFA)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Note minimum</label>
                  <Select 
                    value={filters.rating} 
                    onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Note minimum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les notes</SelectItem>
                      <SelectItem value="4">4+ étoiles</SelectItem>
                      <SelectItem value="3">3+ étoiles</SelectItem>
                      <SelectItem value="2">2+ étoiles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              {searchResults.length} résultats trouvés
            </h2>
            
            {searchResults.map((hotel, index) => (
              <div key={hotel.id}>
                <Card className="glass-morphism hover:scale-[1.02] transition-transform motion-blur">
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
                          <Button 
                            size="sm"
                            onClick={() => {
                              setSelectedHotel(hotel);
                              setViewDialogOpen(true);
                            }}
                          >
                            Voir détails
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Insert ad after every 3rd result */}
                {(index + 1) % 3 === 0 && (
                  <div className="my-4">
                    <AdBanner 
                      type="search_result" 
                      position="middle" 
                      location={filters.location}
                      dismissible={true}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Ads */}
        <div className="hidden lg:block w-72 p-4">
          <div className="sticky top-20">
            <AdSidebar location={filters.location} />
          </div>
        </div>
      </div>

      <ViewHotelDialog 
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        hotel={selectedHotel}
      />
    </div>
  );
};

export default Search;