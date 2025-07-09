import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppMode } from '@/hooks/useAppMode';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Hotel, Users, TrendingUp, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AddHotelDialog from '@/components/admin/AddHotelDialog';
import EditHotelDialog from '@/components/admin/EditHotelDialog';
import ViewHotelDialog from '@/components/admin/ViewHotelDialog';
import { Tables } from '@/integrations/supabase/types';

type Hotel = Tables<'hotels'>;

const AdminHotels = () => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHotels(data || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' ? 'Failed to fetch hotels' : 'Impossible de charger les hôtels',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateHotelStatus = async (hotelId: string, status: string, adminNotes?: string) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .update({ 
          status,
          admin_notes: adminNotes,
          approved_at: status === 'approved' ? new Date().toISOString() : null
        })
        .eq('id', hotelId);

      if (error) throw error;

      await fetchHotels();
      toast({
        title: language === 'en' ? 'Success' : 'Succès',
        description: language === 'en' 
          ? `Hotel ${status} successfully` 
          : `Hôtel ${status === 'approved' ? 'approuvé' : status === 'rejected' ? 'rejeté' : 'mis à jour'} avec succès`,
      });
    } catch (error) {
      console.error('Error updating hotel:', error);
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' ? 'Failed to update hotel' : 'Impossible de mettre à jour l\'hôtel',
        variant: 'destructive',
      });
    }
  };

  const deleteHotel = async (hotelId: string) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', hotelId);

      if (error) throw error;

      await fetchHotels();
      toast({
        title: language === 'en' ? 'Success' : 'Succès',
        description: language === 'en' ? 'Hotel deleted successfully' : 'Hôtel supprimé avec succès',
      });
    } catch (error) {
      console.error('Error deleting hotel:', error);
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' ? 'Failed to delete hotel' : 'Impossible de supprimer l\'hôtel',
        variant: 'destructive',
      });
    }
  };

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

  const filteredHotels = hotels.filter(hotel => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return hotel.status === 'pending';
    if (activeTab === 'approved') return hotel.status === 'approved' || hotel.status === 'active';
    if (activeTab === 'rejected') return hotel.status === 'rejected' || hotel.status === 'suspended';
    return true;
  });

  const stats = {
    total: hotels.length,
    pending: hotels.filter(h => h.status === 'pending').length,
    approved: hotels.filter(h => h.status === 'approved' || h.status === 'active').length,
    rejected: hotels.filter(h => h.status === 'rejected' || h.status === 'suspended').length
  };

  if (loading) {
    return <div className="text-center py-8">{language === 'en' ? 'Loading hotels...' : 'Chargement des hôtels...'}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {language === 'en' ? 'Hotel Management' : 'Gestion des Hôtels'}
        </h2>
        <AddHotelDialog onHotelAdded={fetchHotels}>
          <Button className="gradient-ivorian">
            <Plus className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Add Hotel' : 'Ajouter Hôtel'}
          </Button>
        </AddHotelDialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Hotel className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Total Hotels' : 'Total Hôtels'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Pending' : 'En attente'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.approved}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Approved' : 'Approuvés'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Hotel className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{stats.rejected}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Rejected' : 'Rejetés'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for filtering */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            {language === 'en' ? 'All' : 'Tous'} ({stats.total})
          </TabsTrigger>
          <TabsTrigger value="pending">
            {language === 'en' ? 'Pending' : 'En attente'} ({stats.pending})
          </TabsTrigger>
          <TabsTrigger value="approved">
            {language === 'en' ? 'Approved' : 'Approuvés'} ({stats.approved})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            {language === 'en' ? 'Rejected' : 'Rejetés'} ({stats.rejected})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredHotels.map((hotel) => (
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
                    <EditHotelDialog hotel={hotel} onHotelUpdated={fetchHotels}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        {language === 'en' ? 'Edit' : 'Modifier'}
                      </Button>
                    </EditHotelDialog>
                    {hotel.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => updateHotelStatus(hotel.id, 'approved')}
                        >
                          {language === 'en' ? 'Approve' : 'Approuver'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive border-destructive"
                          onClick={() => updateHotelStatus(hotel.id, 'rejected', 'Rejected by admin')}
                        >
                          {language === 'en' ? 'Reject' : 'Rejeter'}
                        </Button>
                      </>
                    )}
                    {hotel.status === 'active' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-orange-600 border-orange-600"
                        onClick={() => updateHotelStatus(hotel.id, 'suspended', 'Suspended by admin')}
                      >
                        {language === 'en' ? 'Suspend' : 'Suspendre'}
                      </Button>
                    )}
                    {hotel.status === 'suspended' && (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => updateHotelStatus(hotel.id, 'active')}
                      >
                        {language === 'en' ? 'Reactivate' : 'Réactiver'}
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive"
                      onClick={() => {
                        if (confirm(language === 'en' ? 'Are you sure you want to delete this hotel?' : 'Êtes-vous sûr de vouloir supprimer cet hôtel ?')) {
                          deleteHotel(hotel.id);
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredHotels.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {language === 'en' ? 'No hotels found' : 'Aucun hôtel trouvé'}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminHotels;