import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useAppMode } from '@/hooks/useAppMode';
import { MapPin, Star, Users, BarChart3, Calendar } from 'lucide-react';

interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  rooms: number;
  status: string;
  bookings: number;
  revenue: string;
}

interface ViewHotelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hotel: Hotel | null;
}

export const ViewHotelDialog = ({ open, onOpenChange, hotel }: ViewHotelDialogProps) => {
  const { language } = useAppMode();

  if (!hotel) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: { fr: string; en: string } } = {
      active: { fr: 'Actif', en: 'Active' },
      inactive: { fr: 'Inactif', en: 'Inactive' },
      pending: { fr: 'En attente', en: 'Pending' }
    };
    return language === 'en' ? statusMap[status]?.en || status : statusMap[status]?.fr || status;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {hotel.name}
            <Badge className={getStatusColor(hotel.status)}>
              {getStatusText(hotel.status)}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {language === 'en' ? 'Hotel details and statistics' : 'Détails et statistiques de l\'hôtel'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{hotel.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{hotel.rating}/5</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                {hotel.rooms} {language === 'en' ? 'rooms' : 'chambres'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                {hotel.bookings} {language === 'en' ? 'active bookings' : 'réservations actives'}
              </span>
            </div>
          </div>

          {/* Revenue Information */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">
                {language === 'en' ? 'Revenue Information' : 'Informations sur les Revenus'}
              </h3>
            </div>
            <p className="text-2xl font-bold text-primary">{hotel.revenue}</p>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? 'Monthly revenue' : 'Revenus mensuels'}
            </p>
          </div>

          {/* Additional Details */}
          <div className="space-y-3">
            <h3 className="font-semibold">
              {language === 'en' ? 'Additional Details' : 'Détails Supplémentaires'}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">
                  {language === 'en' ? 'Occupancy Rate:' : 'Taux d\'occupation:'}
                </span>
                <span className="ml-2 font-medium">78%</span>
              </div>
              <div>
                <span className="text-muted-foreground">
                  {language === 'en' ? 'Average Stay:' : 'Séjour moyen:'}
                </span>
                <span className="ml-2 font-medium">
                  {language === 'en' ? '3.2 nights' : '3,2 nuits'}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">
                  {language === 'en' ? 'Staff Count:' : 'Nombre d\'employés:'}
                </span>
                <span className="ml-2 font-medium">45</span>
              </div>
              <div>
                <span className="text-muted-foreground">
                  {language === 'en' ? 'Check-in Time:' : 'Heure d\'arrivée:'}
                </span>
                <span className="ml-2 font-medium">15:00</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};