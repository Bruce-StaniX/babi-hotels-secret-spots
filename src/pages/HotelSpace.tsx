import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Hotel, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  Users, 
  MapPin, 
  Star,
  BarChart3,
  MessageSquare,
  Eye,
  Settings,
  ArrowLeft
} from 'lucide-react';
import { useAppMode } from '@/hooks/useAppMode';
import { AddHotelDialog } from '@/components/AddHotelDialog';
import { ViewHotelDialog } from '@/components/ViewHotelDialog';
import { EditHotelDialog } from '@/components/EditHotelDialog';
import { ContactDialog } from '@/components/ContactDialog';
import { ReplyDialog } from '@/components/ReplyDialog';

const HotelSpace = () => {
  const { language } = useAppMode();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hotels');
  
  // Dialog states
  const [addHotelOpen, setAddHotelOpen] = useState(false);
  const [viewHotelOpen, setViewHotelOpen] = useState(false);
  const [editHotelOpen, setEditHotelOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  
  // Selected items
  const [selectedHotel, setSelectedHotel] = useState<typeof hotels[0] | null>(null);
  const [selectedReservation, setSelectedReservation] = useState<typeof reservations[0] | null>(null);

  // Données fictives pour la démonstration
  const hotels = [
    {
      id: 1,
      name: 'Hôtel Ivoire Palace',
      location: 'Abidjan, Côte d\'Ivoire',
      rating: 4.8,
      rooms: 120,
      status: 'active',
      bookings: 45,
      revenue: '2,450,000 FCFA'
    },
    {
      id: 2,
      name: 'Safari Lodge Yamoussoukro',
      location: 'Yamoussoukro, Côte d\'Ivoire',
      rating: 4.6,
      rooms: 80,
      status: 'active',
      bookings: 32,
      revenue: '1,680,000 FCFA'
    }
  ];

  const reservations = [
    {
      id: 1,
      guestName: 'Kouamé Jean',
      hotel: 'Hôtel Ivoire Palace',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      status: 'confirmed',
      amount: '180,000 FCFA'
    },
    {
      id: 2,
      guestName: 'Marie Diallo',
      hotel: 'Safari Lodge Yamoussoukro',
      checkIn: '2024-01-20',
      checkOut: '2024-01-22',
      status: 'pending',
      amount: '120,000 FCFA'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: { fr: string; en: string } } = {
      active: { fr: 'Actif', en: 'Active' },
      inactive: { fr: 'Inactif', en: 'Inactive' },
      confirmed: { fr: 'Confirmé', en: 'Confirmed' },
      pending: { fr: 'En attente', en: 'Pending' },
      cancelled: { fr: 'Annulé', en: 'Cancelled' }
    };
    return language === 'en' ? statusMap[status]?.en || status : statusMap[status]?.fr || status;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                console.log('Back button clicked');
                navigate(-1);
              }}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === 'en' ? 'Back' : 'Retour'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Hotel className="w-8 h-8 text-primary" />
                {language === 'en' ? 'Hotel Management Space' : 'Espace Hôtelier'}
              </h1>
              <p className="text-muted-foreground mt-2">
                {language === 'en' 
                  ? 'Manage your hotels, reservations and analytics' 
                  : 'Gérez vos hôtels, réservations et analyses'}
              </p>
            </div>
          </div>
          <Button className="gradient-ivorian" onClick={() => setAddHotelOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Add Hotel' : 'Ajouter un Hôtel'}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {language === 'en' ? 'Total Hotels' : 'Hôtels Total'}
                  </p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <Hotel className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {language === 'en' ? 'Active Bookings' : 'Réservations Actives'}
                  </p>
                  <p className="text-2xl font-bold">77</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {language === 'en' ? 'Total Rooms' : 'Chambres Total'}
                  </p>
                  <p className="text-2xl font-bold">200</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {language === 'en' ? 'Monthly Revenue' : 'Revenus Mensuels'}
                  </p>
                  <p className="text-2xl font-bold">4.1M</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hotels">
              {language === 'en' ? 'Hotels' : 'Hôtels'}
            </TabsTrigger>
            <TabsTrigger value="reservations">
              {language === 'en' ? 'Reservations' : 'Réservations'}
            </TabsTrigger>
            <TabsTrigger value="analytics">
              {language === 'en' ? 'Analytics' : 'Analyses'}
            </TabsTrigger>
            <TabsTrigger value="messages">
              {language === 'en' ? 'Messages' : 'Messages'}
            </TabsTrigger>
          </TabsList>

          {/* Hotels Tab */}
          <TabsContent value="hotels" className="space-y-6">
            <div className="grid gap-6">
              {hotels.map((hotel) => (
                <Card key={hotel.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <h3 className="text-xl font-semibold">{hotel.name}</h3>
                          <Badge className={getStatusColor(hotel.status)}>
                            {getStatusText(hotel.status)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {hotel.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {hotel.rating}/5
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {hotel.rooms} {language === 'en' ? 'rooms' : 'chambres'}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {language === 'en' ? 'Active Bookings' : 'Réservations Actives'}
                            </p>
                            <p className="text-lg font-semibold">{hotel.bookings}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {language === 'en' ? 'Monthly Revenue' : 'Revenus Mensuels'}
                            </p>
                            <p className="text-lg font-semibold">{hotel.revenue}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedHotel(hotel);
                            setViewHotelOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {language === 'en' ? 'View' : 'Voir'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedHotel(hotel);
                            setEditHotelOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          {language === 'en' ? 'Edit' : 'Modifier'}
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations" className="space-y-6">
            <div className="space-y-4">
              {reservations.map((reservation) => (
                <Card key={reservation.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <h3 className="font-semibold">{reservation.guestName}</h3>
                          <Badge className={getStatusColor(reservation.status)}>
                            {getStatusText(reservation.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{reservation.hotel}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Check-in: {reservation.checkIn}</span>
                          <span>Check-out: {reservation.checkOut}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">{reservation.amount}</p>
                         <div className="flex gap-2 mt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedReservation(reservation);
                              // You can add view details functionality here
                            }}
                          >
                            {language === 'en' ? 'View Details' : 'Voir Détails'}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedReservation(reservation);
                              setContactOpen(true);
                            }}
                          >
                            {language === 'en' ? 'Contact' : 'Contacter'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? 'Occupancy Rate' : 'Taux d\'Occupation'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">78%</div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Average for this month' : 'Moyenne pour ce mois'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? 'Customer Satisfaction' : 'Satisfaction Client'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold">4.7</div>
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Based on 234 reviews' : 'Basé sur 234 avis'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Recent Messages' : 'Messages Récents'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Messages from guests and support requests' 
                    : 'Messages des clients et demandes de support'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <MessageSquare className="w-5 h-5 text-primary mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Marie Kouassi</span>
                        <span className="text-sm text-muted-foreground">Il y a 2h</span>
                      </div>
                      <p className="text-sm">
                        {language === 'en' 
                          ? 'Hello, I have a question about my upcoming reservation...' 
                          : 'Bonjour, j\'ai une question concernant ma réservation à venir...'}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setReplyOpen(true)}
                    >
                      {language === 'en' ? 'Reply' : 'Répondre'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <AddHotelDialog open={addHotelOpen} onOpenChange={setAddHotelOpen} />
      
      <ViewHotelDialog 
        open={viewHotelOpen} 
        onOpenChange={setViewHotelOpen} 
        hotel={selectedHotel} 
      />
      
      <EditHotelDialog 
        open={editHotelOpen} 
        onOpenChange={setEditHotelOpen} 
        hotel={selectedHotel} 
      />
      
      <ContactDialog 
        open={contactOpen} 
        onOpenChange={setContactOpen} 
        guestName={selectedReservation?.guestName || ''} 
        reservationId={selectedReservation?.id} 
      />
      
      <ReplyDialog 
        open={replyOpen} 
        onOpenChange={setReplyOpen} 
        originalMessage={language === 'en' 
          ? 'Hello, I have a question about my upcoming reservation...' 
          : 'Bonjour, j\'ai une question concernant ma réservation à venir...'} 
        senderName="Marie Kouassi" 
      />
    </div>
  );
};

export default HotelSpace;