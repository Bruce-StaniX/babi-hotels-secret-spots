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
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1439886183900-e79ec0057170?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1438565434616-3ef039228b15?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400&h=300&fit=crop",
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
  if (!location) return hotelsData;
  return hotelsData.filter(hotel => 
    hotel.location.toLowerCase() === location.toLowerCase()
  );
};

// Fonction pour rechercher des hôtels
export const searchHotels = (query: string, location?: string): Hotel[] => {
  let results = hotelsData;
  
  if (location) {
    results = getHotelsByLocation(location);
  }
  
  if (query) {
    const searchTerm = query.toLowerCase();
    results = results.filter(hotel =>
      hotel.name.toLowerCase().includes(searchTerm) ||
      hotel.location.toLowerCase().includes(searchTerm) ||
      hotel.description.toLowerCase().includes(searchTerm) ||
      hotel.features.some(feature => feature.toLowerCase().includes(searchTerm))
    );
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