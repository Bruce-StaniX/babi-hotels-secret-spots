import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Star, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Villa Romance Cocody",
      location: "Cocody",
      price: "25000",
      rating: 4.8,
      image: "/lovable-uploads/7166ae21-46de-4d2d-9098-e5e5e3128fb0.png",
      dateAdded: "Il y a 2 jours"
    },
    {
      id: 2,
      name: "Suite Présidentielle Plateau",
      location: "Plateau", 
      price: "35000",
      rating: 4.9,
      image: "/lovable-uploads/7166ae21-46de-4d2d-9098-e5e5e3128fb0.png",
      dateAdded: "Il y a 1 semaine"
    }
  ]);

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
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
              onClick={() => navigate(-1)}
              className="mr-3"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Mes Favoris</h1>
              <p className="text-muted-foreground">Vos hébergements préférés</p>
            </div>
          </div>
        </div>

        {favorites.length === 0 ? (
          <Card className="glass-morphism">
            <CardContent className="p-8 text-center">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Aucun favori</h3>
              <p className="text-muted-foreground mb-4">
                Vous n'avez pas encore ajouté d'hébergements à vos favoris
              </p>
              <Button>Découvrir des hébergements</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-foreground">
                {favorites.length} hébergement{favorites.length > 1 ? 's' : ''} favori{favorites.length > 1 ? 's' : ''}
              </h2>
              <Button variant="outline" size="sm">
                Tout partager
              </Button>
            </div>
            
            {favorites.map((hotel) => (
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
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFavorite(hotel.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        {hotel.location}
                      </div>
                      
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm text-muted-foreground mr-3">{hotel.rating}</span>
                        <Badge variant="secondary" className="text-xs">
                          Ajouté {hotel.dateAdded}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">{hotel.price} FCFA</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Partager</Button>
                          <Button size="sm">Réserver</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;