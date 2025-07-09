
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Wifi, Car, Coffee, Shield } from "lucide-react";
import { ViewHotelDialog } from "@/components/ViewHotelDialog";
import type { Hotel } from "@/data/hotelsData";
interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const amenityIcons = {
    'WiFi': Wifi,
    'Parking': Car,
    'Restaurant': Coffee,
    'Discret': Shield,
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group">
      <div className="relative">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {hotel.isDiscrete && (
          <Badge className="absolute top-3 left-3 bg-ivorian-green text-white">
            <Shield className="w-3 h-3 mr-1" />
            Discret
          </Badge>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-semibold ml-1">{hotel.rating}</span>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
            {hotel.name}
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-ivorian-orange">
              {hotel.price.toLocaleString()} CFA
            </div>
            <div className="text-sm text-gray-500">par nuit</div>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{hotel.location}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
          <span>{hotel.rating} • {hotel.reviews} avis</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 4).map((amenity) => {
            const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons];
            return (
              <div key={amenity} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                {IconComponent && <IconComponent className="w-3 h-3 mr-1" />}
                <span className="text-xs text-gray-600">{amenity}</span>
              </div>
            );
          })}
        </div>

        <Button 
          className="w-full gradient-ivorian hover:opacity-90 transition-opacity"
          onClick={() => setViewDialogOpen(true)}
        >
          Voir les détails
        </Button>
      </CardContent>

      <ViewHotelDialog 
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        hotel={hotel}
      />
    </Card>
  );
};

export default HotelCard;
