import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppMode } from '@/hooks/useAppMode';
import { MapPin, Star, Users, Wifi, Car, Coffee, Shield, X } from 'lucide-react';
import { Hotel } from '@/data/hotelsData';
import { BookingDialog } from '@/components/BookingDialog';
import { ContactHotelDialog } from '@/components/ContactHotelDialog';

interface ViewHotelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hotel: Hotel | null;
}

export const ViewHotelDialog = ({ open, onOpenChange, hotel }: ViewHotelDialogProps) => {
  const { language } = useAppMode();
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  if (!hotel) return null;

  const amenityIcons = {
    'WiFi': Wifi,
    'Parking': Car,
    'Restaurant': Coffee,
    'Discret': Shield,
    'Piscine': Users,
    'Spa': Star,
    'Conference': Users,
    'Navette': Car,
    'Plage': MapPin,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-2xl font-bold">{hotel.name}</span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            {language === 'en' ? 'Hotel details and amenities' : 'Détails et équipements de l\'hôtel'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Image principale */}
          <div className="relative">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            {hotel.isDiscrete && (
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                <Shield className="w-3 h-3 mr-1" />
                {language === 'en' ? 'Discrete' : 'Discret'}
              </Badge>
            )}
          </div>

          {/* Informations de base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span className="text-lg">{hotel.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">{hotel.rating}/5</span>
                <span className="text-muted-foreground">({hotel.reviews} avis)</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <span>{language === 'en' ? 'Suitable for couples and individuals' : 'Adapté aux couples et individuels'}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">
                  {hotel.price.toLocaleString()} FCFA
                </div>
                <div className="text-muted-foreground">
                  {language === 'en' ? 'per night' : 'par nuit'}
                </div>
              </div>
              
              <Button 
                className="w-full gradient-ivorian" 
                size="lg"
                onClick={() => setBookingDialogOpen(true)}
              >
                {language === 'en' ? 'Book Now' : 'Réserver Maintenant'}
              </Button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {language === 'en' ? 'Description' : 'Description'}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {hotel.description}
            </p>
          </div>

          {/* Équipements */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {language === 'en' ? 'Amenities' : 'Équipements'}
            </h3>
            <div className="flex flex-wrap gap-3">
              {hotel.amenities.map((amenity) => {
                const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons];
                return (
                  <div key={amenity} className="flex items-center bg-muted rounded-full px-4 py-2">
                    {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Caractéristiques */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {language === 'en' ? 'Features' : 'Caractéristiques'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {hotel.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Informations pratiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/50 rounded-lg">
            <div>
              <h4 className="font-semibold mb-2">
                {language === 'en' ? 'Check-in / Check-out' : 'Arrivée / Départ'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Check-in: 15:00 - Check-out: 12:00' : 'Arrivée: 15h00 - Départ: 12h00'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                {language === 'en' ? 'Cancellation' : 'Annulation'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Free cancellation up to 24h before' : 'Annulation gratuite jusqu\'à 24h avant'}
              </p>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-3 pt-4">
            <Button 
              className="flex-1 gradient-ivorian" 
              size="lg"
              onClick={() => setBookingDialogOpen(true)}
            >
              {language === 'en' ? 'Reserve Now' : 'Réserver Maintenant'}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setContactDialogOpen(true)}
            >
              {language === 'en' ? 'Contact Hotel' : 'Contacter l\'Hôtel'}
            </Button>
          </div>
        </div>

        {/* Dialogs enfants */}
        <BookingDialog 
          open={bookingDialogOpen}
          onOpenChange={setBookingDialogOpen}
          hotel={hotel}
        />
        
        <ContactHotelDialog 
          open={contactDialogOpen}
          onOpenChange={setContactDialogOpen}
          hotel={hotel}
        />
      </DialogContent>
    </Dialog>
  );
};