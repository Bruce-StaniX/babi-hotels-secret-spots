// Données des hôtels par commune en Côte d'Ivoire

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  amenities: string[];
  isDiscrete: boolean;
  reviews: number;
  features: string[];
  description: string;
}

export const hotelsData: Hotel[] = [
  // Abobo (4 hébergements)
  {
    id: "abobo-1",
    name: "Hôtel Palm Beach Abobo",
    location: "Abobo",
    rating: 4.2,
    price: 18000,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Parking", "Restaurant"],
    isDiscrete: true,
    reviews: 45,
    features: ["Piscine", "Bar", "Service 24h/24"],
    description: "Hôtel moderne et discret au cœur d'Abobo"
  },
  {
    id: "abobo-2",
    name: "Villa Serenity Abobo",
    location: "Abobo",
    rating: 4.0,
    price: 15000,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Parking"],
    isDiscrete: true,
    reviews: 32,
    features: ["Jardin privé", "Calme"],
    description: "Villa calme et privée pour vos séjours discrets"
  },
  {
    id: "abobo-3",
    name: "Motel Confidentia",
    location: "Abobo",
    rating: 3.8,
    price: 12000,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Discret"],
    isDiscrete: true,
    reviews: 28,
    features: ["Entrée privée", "Stationnement discret"],
    description: "Motel discret avec service personnalisé"
  },
  {
    id: "abobo-4",
    name: "Lodge Paradise",
    location: "Abobo",
    rating: 4.1,
    price: 16500,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking"],
    isDiscrete: false,
    reviews: 38,
    features: ["Vue jardin", "Restaurant", "Reception 24h"],
    description: "Lodge confortable avec excellent service"
  },

  // Adjamé (4 hébergements)
  {
    id: "adjame-1",
    name: "Hôtel Business Center",
    location: "Adjamé",
    rating: 4.3,
    price: 22000,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Parking", "Restaurant", "Conference"],
    isDiscrete: false,
    reviews: 67,
    features: ["Centre d'affaires", "Salle de conférence", "Petit déjeuner"],
    description: "Hôtel d'affaires moderne au centre d'Adjamé"
  },
  {
    id: "adjame-2",
    name: "Villa Romance Adjamé",
    location: "Adjamé",
    rating: 4.5,
    price: 25000,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Parking", "Discret"],
    isDiscrete: true,
    reviews: 52,
    features: ["Jacuzzi privé", "Suite romantique", "Service room"],
    description: "Villa romantique pour moments intimes"
  },
  {
    id: "adjame-3",
    name: "Motel Express",
    location: "Adjamé",
    rating: 3.9,
    price: 14000,
    image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Parking"],
    isDiscrete: true,
    reviews: 41,
    features: ["Check-in rapide", "Parking privé"],
    description: "Motel pratique pour séjours courts"
  },
  {
    id: "adjame-4",
    name: "Résidence Élégance",
    location: "Adjamé",
    rating: 4.2,
    price: 19500,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking"],
    isDiscrete: false,
    reviews: 44,
    features: ["Décoration soignée", "Restaurant gastronomique"],
    description: "Résidence élégante avec service de qualité"
  },

  // Cocody (4 hébergements)
  {
    id: "cocody-1",
    name: "Villa Romance Cocody",
    location: "Cocody",
    rating: 4.8,
    price: 35000,
    image: "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Piscine", "Restaurant", "Spa"],
    isDiscrete: true,
    reviews: 89,
    features: ["Piscine privée", "Jacuzzi", "Vue panoramique", "Service VIP"],
    description: "Villa de luxe avec piscine privée et services premium"
  },
  {
    id: "cocody-2",
    name: "Hôtel Prestige Cocody",
    location: "Cocody",
    rating: 4.6,
    price: 28000,
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking", "Spa"],
    isDiscrete: false,
    reviews: 72,
    features: ["Spa wellness", "Restaurant gastronomique", "Terrasse"],
    description: "Hôtel prestige avec spa et restaurant gastronomique"
  },
  {
    id: "cocody-3",
    name: "Suite Privée Cocody",
    location: "Cocody",
    rating: 4.7,
    price: 32000,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Discret", "Parking"],
    isDiscrete: true,
    reviews: 63,
    features: ["Suite privée", "Balcon panoramique", "Service personnalisé"],
    description: "Suite privée avec vue imprenable sur la lagune"
  },
  {
    id: "cocody-4",
    name: "Résidence Royal",
    location: "Cocody",
    rating: 4.4,
    price: 26000,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking", "Piscine"],
    isDiscrete: false,
    reviews: 55,
    features: ["Piscine", "Restaurant", "Jardins", "Conciergerie"],
    description: "Résidence haut de gamme avec jardins tropicaux"
  },

  // Plateau (4 hébergements)
  {
    id: "plateau-1",
    name: "Suite Présidentielle Plateau",
    location: "Plateau",
    rating: 4.9,
    price: 45000,
    image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Spa", "Conference", "Discret"],
    isDiscrete: true,
    reviews: 95,
    features: ["Balcon privé", "Service room", "Petit déjeuner", "Vue sur lagune"],
    description: "Suite présidentielle avec vue exceptionnelle sur la lagune"
  },
  {
    id: "plateau-2",
    name: "Hôtel Central Business",
    location: "Plateau",
    rating: 4.5,
    price: 35000,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Conference", "Parking"],
    isDiscrete: false,
    reviews: 78,
    features: ["Centre d'affaires", "Salles de réunion", "Restaurant d'affaires"],
    description: "Hôtel d'affaires au cœur du quartier financier"
  },
  {
    id: "plateau-3",
    name: "Villa Secrète Plateau",
    location: "Plateau",
    rating: 4.7,
    price: 38000,
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Discret", "Parking", "Spa"],
    isDiscrete: true,
    reviews: 67,
    features: ["Entrée discrète", "Spa privé", "Rooftop"],
    description: "Villa secrète avec spa privé et rooftop exclusif"
  },
  {
    id: "plateau-4",
    name: "Résidence Executive",
    location: "Plateau",
    rating: 4.6,
    price: 32000,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking", "Conference"],
    isDiscrete: false,
    reviews: 71,
    features: ["Salles executive", "Restaurant fine dining", "Valet parking"],
    description: "Résidence executive pour clientèle d'affaires"
  },

  // Marcory (4 hébergements)
  {
    id: "marcory-1",
    name: "Hôtel Lagune View",
    location: "Marcory",
    rating: 4.3,
    price: 24000,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking"],
    isDiscrete: false,
    reviews: 58,
    features: ["Vue lagune", "Restaurant", "Terrasse"],
    description: "Hôtel avec vue panoramique sur la lagune"
  },
  {
    id: "marcory-2",
    name: "Villa Intimité",
    location: "Marcory",
    rating: 4.4,
    price: 26500,
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Discret", "Parking"],
    isDiscrete: true,
    reviews: 49,
    features: ["Jardin privé", "Piscine", "Discrétion totale"],
    description: "Villa intime avec jardin et piscine privés"
  },
  {
    id: "marcory-3",
    name: "Motel Confort Plus",
    location: "Marcory",
    rating: 4.0,
    price: 18000,
    image: "https://images.unsplash.com/photo-1570213489059-0aac6626cade?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Parking"],
    isDiscrete: true,
    reviews: 36,
    features: ["Confort moderne", "Parking sécurisé"],
    description: "Motel moderne avec tout le confort nécessaire"
  },
  {
    id: "marcory-4",
    name: "Lodge Familial",
    location: "Marcory",
    rating: 4.2,
    price: 21000,
    image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking"],
    isDiscrete: false,
    reviews: 43,
    features: ["Chambres familiales", "Aire de jeux", "Restaurant familial"],
    description: "Lodge accueillant pour familles"
  },

  // Treichville (4 hébergements)
  {
    id: "treichville-1",
    name: "Hôtel Port Autonome",
    location: "Treichville",
    rating: 4.1,
    price: 22000,
    image: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking"],
    isDiscrete: false,
    reviews: 52,
    features: ["Proche du port", "Restaurant", "Business center"],
    description: "Hôtel pratique près du port autonome"
  },
  {
    id: "treichville-2",
    name: "Villa Discrète Treich",
    location: "Treichville",
    rating: 4.3,
    price: 25000,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Discret", "Parking"],
    isDiscrete: true,
    reviews: 47,
    features: ["Entrée privée", "Jacuzzi", "Service discret"],
    description: "Villa discrète avec services personnalisés"
  },
  {
    id: "treichville-3",
    name: "Motel Express Treich",
    location: "Treichville",
    rating: 3.9,
    price: 16000,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Parking"],
    isDiscrete: true,
    reviews: 34,
    features: ["Check-in express", "Parking gratuit"],
    description: "Motel express pour séjours d'affaires"
  },
  {
    id: "treichville-4",
    name: "Résidence Marina",
    location: "Treichville",
    rating: 4.2,
    price: 23500,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking"],
    isDiscrete: false,
    reviews: 41,
    features: ["Vue marina", "Restaurant", "Terrasse"],
    description: "Résidence avec vue sur la marina"
  },

  // Yopougon (4 hébergements)
  {
    id: "yopougon-1",
    name: "Hôtel Moderne Yop",
    location: "Yopougon",
    rating: 4.0,
    price: 19000,
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking"],
    isDiscrete: false,
    reviews: 48,
    features: ["Design moderne", "Restaurant", "Salle de fitness"],
    description: "Hôtel au design moderne dans Yopougon"
  },
  {
    id: "yopougon-2",
    name: "Villa Privée Yop",
    location: "Yopougon",
    rating: 4.2,
    price: 21500,
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Discret", "Parking"],
    isDiscrete: true,
    reviews: 39,
    features: ["Villa privée", "Jardin", "Piscine privée"],
    description: "Villa privée avec jardin et piscine"
  },
  {
    id: "yopougon-3",
    name: "Motel Comfort",
    location: "Yopougon",
    rating: 3.8,
    price: 15000,
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Parking"],
    isDiscrete: true,
    reviews: 31,
    features: ["Confort simple", "Parking sécurisé"],
    description: "Motel confortable et abordable"
  },
  {
    id: "yopougon-4",
    name: "Lodge Familial Yop",
    location: "Yopougon",
    rating: 4.1,
    price: 18500,
    image: "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking"],
    isDiscrete: false,
    reviews: 37,
    features: ["Ambiance familiale", "Restaurant", "Aire de jeux"],
    description: "Lodge accueillant pour toute la famille"
  },

  // Koumassi (4 hébergements)
  {
    id: "koumassi-1",
    name: "Hôtel Industriel Koumassi",
    location: "Koumassi",
    rating: 4.0,
    price: 20000,
    image: "https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking"],
    isDiscrete: false,
    reviews: 44,
    features: ["Zone industrielle", "Restaurant", "Salles de réunion"],
    description: "Hôtel pratique en zone industrielle"
  },
  {
    id: "koumassi-2",
    name: "Villa Discrétion",
    location: "Koumassi",
    rating: 4.3,
    price: 23000,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Discret", "Parking"],
    isDiscrete: true,
    reviews: 42,
    features: ["Totale discrétion", "Jardin privé", "Service personnalisé"],
    description: "Villa offrant une discrétion totale"
  },
  {
    id: "koumassi-3",
    name: "Motel Transit",
    location: "Koumassi",
    rating: 3.7,
    price: 14500,
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Parking"],
    isDiscrete: true,
    reviews: 29,
    features: ["Séjour court", "Parking gratuit"],
    description: "Motel idéal pour séjours de transit"
  },
  {
    id: "koumassi-4",
    name: "Résidence Industrielle",
    location: "Koumassi",
    rating: 4.1,
    price: 19500,
    image: "https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking"],
    isDiscrete: false,
    reviews: 38,
    features: ["Clientèle d'affaires", "Restaurant", "Wifi haut débit"],
    description: "Résidence pour professionnels en déplacement"
  },

  // Autres communes (ajout des hôtels manquants)
  
  // Alépé (4 hébergements)
  {
    id: "alepe-1",
    name: "Hôtel Rivière Alépé",
    location: "Alépé",
    rating: 4.0,
    price: 16000,
    image: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking"],
    isDiscrete: false,
    reviews: 35,
    features: ["Vue rivière", "Restaurant local", "Calme"],
    description: "Hôtel paisible au bord de la rivière"
  },
  {
    id: "alepe-2",
    name: "Villa Discréte Alépé",
    location: "Alépé",
    rating: 3.9,
    price: 14500,
    image: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00ba?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Discret", "Parking"],
    isDiscrete: true,
    reviews: 28,
    features: ["Jardin privé", "Discrétion", "Parking sécurisé"],
    description: "Villa discrète en périphérie d'Alépé"
  },
  {
    id: "alepe-3",
    name: "Motel Transit Alépé",
    location: "Alépé",
    rating: 3.7,
    price: 12000,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Parking"],
    isDiscrete: true,
    reviews: 22,
    features: ["Séjour court", "Prix abordable"],
    description: "Motel simple pour transit"
  },
  {
    id: "alepe-4",
    name: "Lodge Familial Alépé",
    location: "Alépé",
    rating: 4.1,
    price: 15500,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking"],
    isDiscrete: false,
    reviews: 31,
    features: ["Ambiance familiale", "Restaurant traditionnel"],
    description: "Lodge accueillant pour familles"
  },

  // Anyama (4 hébergements)
  {
    id: "anyama-1",
    name: "Hôtel Résidentiel Anyama",
    location: "Anyama",
    rating: 4.1,
    price: 18000,
    image: "https://images.unsplash.com/photo-1533619239233-6280475a633a?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking"],
    isDiscrete: false,
    reviews: 42,
    features: ["Zone résidentielle", "Calme", "Restaurant"],
    description: "Hôtel dans quartier résidentiel calme"
  },
  {
    id: "anyama-2",
    name: "Villa Privée Anyama",
    location: "Anyama",
    rating: 4.3,
    price: 20500,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Discret", "Parking"],
    isDiscrete: true,
    reviews: 36,
    features: ["Villa privée", "Jardin", "Discrétion totale"],
    description: "Villa privée avec jardin luxuriant"
  },
  {
    id: "anyama-3",
    name: "Motel Comfort Anyama",
    location: "Anyama",
    rating: 3.8,
    price: 15000,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Parking"],
    isDiscrete: true,
    reviews: 29,
    features: ["Confort moderne", "Prix accessible"],
    description: "Motel confortable et abordable"
  },
  {
    id: "anyama-4",
    name: "Résidence Verte",
    location: "Anyama",
    rating: 4.0,
    price: 17500,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking"],
    isDiscrete: false,
    reviews: 38,
    features: ["Environnement vert", "Restaurant", "Piscine"],
    description: "Résidence entourée de verdure"
  },

  // Port-Bouët (4 hébergements)
  {
    id: "port-bouet-1",
    name: "Hôtel Aéroport VIP",
    location: "Port-Bouët",
    rating: 4.4,
    price: 28000,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking", "Navette"],
    isDiscrete: false,
    reviews: 67,
    features: ["Navette aéroport", "Service 24h", "Restaurant"],
    description: "Hôtel VIP avec navette aéroport"
  },
  {
    id: "port-bouet-2",
    name: "Villa Océan",
    location: "Port-Bouët",
    rating: 4.6,
    price: 32000,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Discret", "Parking", "Plage"],
    isDiscrete: true,
    reviews: 59,
    features: ["Vue océan", "Plage privée", "Jacuzzi"],
    description: "Villa avec vue océan et plage privée"
  },
  {
    id: "port-bouet-3",
    name: "Motel Airport",
    location: "Port-Bouët",
    rating: 3.9,
    price: 17000,
    image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Parking", "Navette"],
    isDiscrete: true,
    reviews: 33,
    features: ["Proche aéroport", "Navette gratuite"],
    description: "Motel pratique près de l'aéroport"
  },
  {
    id: "port-bouet-4",
    name: "Résidence Balnéaire",
    location: "Port-Bouët",
    rating: 4.3,
    price: 25000,
    image: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Restaurant", "Parking", "Plage"],
    isDiscrete: false,
    reviews: 51,
    features: ["Accès plage", "Restaurant", "Piscine"],
    description: "Résidence balnéaire avec accès direct à la plage"
  }
];

// Fonction pour obtenir les hôtels par commune
export const getHotelsByLocation = (location: string): Hotel[] => {
  if (!location || location === "all") return hotelsData;
  
  // Normaliser la recherche pour gérer les variations d'écriture
  const normalizedLocation = location.toLowerCase().replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e');
  
  return hotelsData.filter(hotel => {
    const normalizedHotelLocation = hotel.location.toLowerCase().replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e');
    return normalizedHotelLocation === normalizedLocation;
  });
};

// Fonction pour rechercher des hôtels
export const searchHotels = (query: string, location?: string): Hotel[] => {
  let results = hotelsData;
  
  if (location && location !== "all") {
    results = getHotelsByLocation(location);
  }
  
  if (query) {
    const searchTerm = query.toLowerCase().replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e');
    results = results.filter(hotel => {
      const normalizedName = hotel.name.toLowerCase().replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e');
      const normalizedLocation = hotel.location.toLowerCase().replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e');
      const normalizedDescription = hotel.description.toLowerCase().replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e');
      
      return normalizedName.includes(searchTerm) ||
        normalizedLocation.includes(searchTerm) ||
        normalizedDescription.includes(searchTerm) ||
        hotel.features.some(feature => {
          const normalizedFeature = feature.toLowerCase().replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e');
          return normalizedFeature.includes(searchTerm);
        });
    });
  }
  
  return results;
};

// Liste des communes disponibles avec leurs noms d'affichage
export const communes = [
  "abobo", "adjame", "alepe", "anyama", "assinie", "attecoube", 
  "azaguie", "bingerville", "bonoua", "cocody", "dabou", 
  "grand-bassam", "jacqueville", "koumassi", "marcory", 
  "plateau", "port-bouet", "songon", "treichville", "yopougon"
];

export const getCommuneDisplayName = (commune: string): string => {
  const displayNames: { [key: string]: string } = {
    "abobo": "Abobo",
    "adjame": "Adjamé", 
    "alepe": "Alépé",
    "anyama": "Anyama",
    "assinie": "Assinie",
    "attecoube": "Attécoubé",
    "azaguie": "Azaguié",
    "bingerville": "Bingerville",
    "bonoua": "Bonoua",
    "cocody": "Cocody",
    "dabou": "Dabou",
    "grand-bassam": "Grand-Bassam",
    "jacqueville": "Jacqueville",
    "koumassi": "Koumassi", 
    "marcory": "Marcory",
    "plateau": "Plateau",
    "port-bouet": "Port-Bouët",
    "songon": "Songon",
    "treichville": "Treichville",
    "yopougon": "Yopougon"
  };
  return displayNames[commune] || commune;
};