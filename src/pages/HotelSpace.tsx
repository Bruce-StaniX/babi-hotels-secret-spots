import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Filter, ArrowLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import HotelCard from '@/components/HotelCard';
import { hotelsData, searchHotels, communes, getCommuneDisplayName } from '@/data/hotelsData';

const HotelSpace = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredHotels, setFilteredHotels] = useState(hotelsData);

  useEffect(() => {
    const locationParam = searchParams.get('location');
    if (locationParam) setSelectedLocation(locationParam);
  }, [searchParams]);

  useEffect(() => {
    const results = searchHotels(searchQuery, selectedLocation);
    setFilteredHotels(results);
  }, [searchQuery, selectedLocation]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="mr-3">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Nos Hébergements</h1>
            <p className="text-muted-foreground">Découvrez tous nos établissements disponibles</p>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher par nom ou commune..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative min-w-[200px]">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Toutes les communes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les communes</SelectItem>
                  {communes.map((commune) => (
                    <SelectItem key={commune} value={commune}>
                      {getCommuneDisplayName(commune)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            {filteredHotels.length} hébergement{filteredHotels.length > 1 ? 's' : ''} trouvé{filteredHotels.length > 1 ? 's' : ''}
            {selectedLocation && (
              <span className="text-muted-foreground ml-2">
                à {getCommuneDisplayName(selectedLocation)}
              </span>
            )}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Aucun hébergement trouvé</h3>
            <p className="text-muted-foreground">Essayez de modifier vos critères de recherche.</p>
            <Button onClick={() => { setSearchQuery(''); setSelectedLocation(''); }} variant="outline" className="mt-4">
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelSpace;