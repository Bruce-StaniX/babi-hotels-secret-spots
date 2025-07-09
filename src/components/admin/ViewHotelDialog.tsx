import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useAppMode } from '@/hooks/useAppMode';
import { Eye, MapPin, Phone, Mail, Globe, Calendar, Star } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Hotel = Tables<'hotels'>;

interface ViewHotelDialogProps {
  children: React.ReactNode;
  hotel: Hotel;
}

const ViewHotelDialog = ({ children, hotel }: ViewHotelDialogProps) => {
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
      pending: language === 'en' ? 'Pending' : 'En attente',
      approved: language === 'en' ? 'Approved' : 'Approuvé',
      active: language === 'en' ? 'Active' : 'Actif',
      rejected: language === 'en' ? 'Rejected' : 'Rejeté',
      suspended: language === 'en' ? 'Suspended' : 'Suspendu'
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            {language === 'en' ? 'Hotel Details' : 'Détails de l\'Hôtel'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Photos */}
          {hotel.images && hotel.images.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">
                {language === 'en' ? 'Photos' : 'Photos'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {hotel.images.map((imageUrl, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={`${hotel.name} - Photo ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop';
                      }}
                    />
                    {index === 0 && (
                      <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs">
                        {language === 'en' ? 'Main' : 'Principal'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Header with name and status */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getStatusColor(hotel.status)}>
                  {getStatusText(hotel.status)}
                </Badge>
                <div className="flex items-center gap-1 text-yellow-600">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{hotel.rating}/5</span>
                  <span className="text-muted-foreground">
                    ({hotel.review_count} {language === 'en' ? 'reviews' : 'avis'})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {hotel.description && (
            <div>
              <h3 className="font-semibold mb-2">
                {language === 'en' ? 'Description' : 'Description'}
              </h3>
              <p className="text-muted-foreground">{hotel.description}</p>
            </div>
          )}

          {/* Location Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {language === 'en' ? 'Location' : 'Emplacement'}
              </h3>
              <p className="text-muted-foreground">{hotel.location}</p>
              {hotel.address && (
                <p className="text-sm text-muted-foreground mt-1">{hotel.address}</p>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                {language === 'en' ? 'Contact Information' : 'Informations de Contact'}
              </h3>
              <div className="space-y-2">
                {hotel.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${hotel.phone}`} className="text-primary hover:underline">
                      {hotel.phone}
                    </a>
                  </div>
                )}
                {hotel.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${hotel.email}`} className="text-primary hover:underline">
                      {hotel.email}
                    </a>
                  </div>
                )}
                {hotel.website && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4" />
                    <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {hotel.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Amenities */}
          {hotel.amenities && hotel.amenities.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">
                {language === 'en' ? 'Amenities' : 'Équipements'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((amenity, index) => (
                  <Badge key={index} variant="outline">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Admin Information */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Administrative Information' : 'Informations Administratives'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">
                    {language === 'en' ? 'Created:' : 'Créé:'}
                  </span>
                  <span className="text-muted-foreground">
                    {new Date(hotel.created_at).toLocaleDateString()}
                  </span>
                </div>
                {hotel.approved_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">
                      {language === 'en' ? 'Approved:' : 'Approuvé:'}
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(hotel.approved_at).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <span className="font-medium">
                  {language === 'en' ? 'Hotel ID:' : 'ID Hôtel:'}
                </span>
                <span className="text-muted-foreground ml-2 font-mono text-xs">
                  {hotel.id}
                </span>
              </div>
            </div>
            
            {hotel.admin_notes && (
              <div className="mt-4">
                <h4 className="font-medium text-orange-600 mb-1">
                  {language === 'en' ? 'Admin Notes:' : 'Notes Admin:'}
                </h4>
                <p className="text-sm text-muted-foreground bg-orange-50 p-3 rounded">
                  {hotel.admin_notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewHotelDialog;