
import HotelCard from "./HotelCard";

const FeaturedHotels = () => {
  const hotels = [
    {
      id: "1",
      name: "Villa Sereine Cocody",
      location: "Cocody, Abidjan",
      rating: 4.8,
      price: 35000,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
      amenities: ["WiFi", "Parking", "Discret", "Restaurant"],
      isDiscrete: true,
      reviews: 127
    },
    {
      id: "2",
      name: "Motel Lagune",
      location: "Marcory, Abidjan",
      rating: 4.5,
      price: 22000,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      amenities: ["WiFi", "Parking", "Discret"],
      isDiscrete: true,
      reviews: 89
    },
    {
      id: "3",
      name: "Résidence Étoile",
      location: "Plateau, Abidjan",
      rating: 4.7,
      price: 42000,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      amenities: ["WiFi", "Restaurant", "Discret", "Parking"],
      isDiscrete: true,
      reviews: 156
    },
    {
      id: "4",
      name: "Auberge Palmier",
      location: "Yamoussoukro",
      rating: 4.3,
      price: 28000,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      amenities: ["WiFi", "Parking", "Restaurant"],
      isDiscrete: false,
      reviews: 73
    },
    {
      id: "5",
      name: "Lodge Tranquille",
      location: "Bouaké",
      rating: 4.6,
      price: 25000,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      amenities: ["WiFi", "Discret", "Parking"],
      isDiscrete: true,
      reviews: 92
    },
    {
      id: "6",
      name: "Hôtel Perle",
      location: "Korhogo",
      rating: 4.4,
      price: 30000,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      amenities: ["WiFi", "Restaurant", "Parking", "Discret"],
      isDiscrete: true,
      reviews: 64
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Hébergements Populaires
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos établissements les mieux notés pour un séjour discret et confortable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-ivorian-orange text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-ivorian-orange-light transition-colors duration-300 transform hover:scale-105">
            Voir tous les hébergements
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedHotels;
