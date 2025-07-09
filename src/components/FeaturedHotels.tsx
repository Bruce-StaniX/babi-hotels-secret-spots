
import HotelCard from "./HotelCard";
import { useNavigate } from "react-router-dom";
import { hotelsData } from "@/data/hotelsData";

const FeaturedHotels = () => {
  const navigate = useNavigate();
  
  // Sélectionner quelques hôtels populaires de différentes communes
  const featuredHotels = [
    hotelsData.find(h => h.id === "cocody-1"), // Villa Romance Cocody
    hotelsData.find(h => h.id === "plateau-1"), // Suite Présidentielle Plateau
    hotelsData.find(h => h.id === "marcory-2"), // Villa Intimité
    hotelsData.find(h => h.id === "port-bouet-2"), // Villa Océan
    hotelsData.find(h => h.id === "adjame-2"), // Villa Romance Adjamé
    hotelsData.find(h => h.id === "yopougon-2"), // Villa Privée Yop
  ].filter(Boolean); // Filtrer les undefined

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
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/search')}
            className="bg-ivorian-orange text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-ivorian-orange-light transition-colors duration-300 transform hover:scale-105"
          >
            Voir tous les hébergements
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedHotels;
