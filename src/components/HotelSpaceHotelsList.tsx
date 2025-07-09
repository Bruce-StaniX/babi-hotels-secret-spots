import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hotel, Plus, Eye, Edit } from 'lucide-react';
import { useAppMode } from '@/hooks/useAppMode';
import { Tables } from '@/integrations/supabase/types';
import AddHotelDialog from '@/components/admin/AddHotelDialog';
import EditHotelDialog from '@/components/admin/EditHotelDialog';
import ViewHotelDialog from '@/components/admin/ViewHotelDialog';

type Hotel = Tables<'hotels'>;

interface HotelSpaceHotelsListProps {
  hotels: Hotel[];
  onHotelUpdated: () => void;
}

export const HotelSpaceHotelsList = ({ hotels, onHotelUpdated }: HotelSpaceHotelsListProps) => {
  const { language } = useAppMode();

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      active: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800',
      suspended: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: language === 'en' ? 'Pending Review' : 'En attente de validation',
      approved: language === 'en' ? 'Approved' : 'Approuvé',
      active: language === 'en' ? 'Active' : 'Actif',
      rejected: language === 'en' ? 'Rejected' : 'Rejeté',
      suspended: language === 'en' ? 'Suspended' : 'Suspendu'
    };
    return texts[status as keyof typeof texts] || status;
  };

  if (hotels.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Hotel className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {language === 'en' ? 'No hotels yet' : 'Aucun hôtel pour le moment'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {language === 'en' 
              ? 'Start by adding your first hotel to get started' 
              : 'Commencez par ajouter votre premier hôtel'}
          </p>
          <AddHotelDialog onHotelAdded={onHotelUpdated}>
            <Button className="gradient-ivorian">
              <Plus className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Add Your First Hotel' : 'Ajouter Votre Premier Hôtel'}
            </Button>
          </AddHotelDialog>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {hotels.map((hotel) => (
        <Card key={hotel.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="font-semibold text-lg">{hotel.name}</h3>
                  <Badge className={getStatusColor(hotel.status)}>
                    {getStatusText(hotel.status)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{hotel.description}</p>
                <p className="text-sm text-muted-foreground mb-1">
                  📍 {hotel.location}
                </p>
                <p className="text-sm text-muted-foreground">
                  ⭐ {hotel.rating}/5 ({hotel.review_count} {language === 'en' ? 'reviews' : 'avis'})
                </p>
                {hotel.admin_notes && (
                  <p className="text-sm text-orange-600 mt-2">
                    <strong>{language === 'en' ? 'Admin Notes:' : 'Notes Admin:'}</strong> {hotel.admin_notes}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <ViewHotelDialog hotel={hotel}>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    {language === 'en' ? 'View' : 'Voir'}
                  </Button>
                </ViewHotelDialog>
                <EditHotelDialog hotel={hotel} onHotelUpdated={onHotelUpdated}>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    {language === 'en' ? 'Edit' : 'Modifier'}
                  </Button>
                </EditHotelDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};