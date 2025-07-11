import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star } from 'lucide-react';
import { Hotel } from '@/data/hotelsData';
import AdBanner from '@/components/AdBanner';

interface SearchResultsProps {
  searchResults: Hotel[];
  location: string;
  onViewHotel: (hotel: Hotel) => void;
}

export const SearchResults = ({ searchResults, location, onViewHotel }: SearchResultsProps) => {
  return (
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
                      onClick={() => onViewHotel(hotel)}
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
                location={location}
                dismissible={true}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};