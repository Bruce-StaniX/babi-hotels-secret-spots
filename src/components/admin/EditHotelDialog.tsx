import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppMode } from '@/hooks/useAppMode';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Edit } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { ImageUpload } from '@/components/ImageUpload';

type Hotel = Tables<'hotels'>;

interface EditHotelDialogProps {
  children: React.ReactNode;
  hotel: Hotel;
  onHotelUpdated?: () => void;
}

const EditHotelDialog = ({ children, hotel, onHotelUpdated }: EditHotelDialogProps) => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    status: 'approved' as 'approved' | 'pending' | 'active' | 'rejected' | 'suspended',
    admin_notes: '',
    rating: 0,
    amenities: [] as string[],
    images: [] as string[]
  });

  useEffect(() => {
    if (open && hotel) {
      setFormData({
        name: hotel.name || '',
        description: hotel.description || '',
        location: hotel.location || '',
        address: hotel.address || '',
        phone: hotel.phone || '',
        email: hotel.email || '',
        website: hotel.website || '',
        status: hotel.status as 'approved' | 'pending' | 'active' | 'rejected' | 'suspended',
        admin_notes: hotel.admin_notes || '',
        rating: hotel.rating || 0,
        amenities: hotel.amenities || [],
        images: hotel.images || []
      });
    }
  }, [open, hotel]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData: any = {
        name: formData.name,
        description: formData.description,
        location: formData.location,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        status: formData.status,
        admin_notes: formData.admin_notes,
        rating: formData.rating,
        amenities: formData.amenities,
        images: formData.images.length > 0 ? formData.images : null
      };

      // Add approved_at if status is being changed to approved
      if (formData.status === 'approved' && hotel.status !== 'approved') {
        updateData.approved_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('hotels')
        .update(updateData)
        .eq('id', hotel.id);

      if (error) throw error;

      toast({
        title: language === 'en' ? 'Success' : 'Succès',
        description: language === 'en' ? 'Hotel updated successfully' : 'Hôtel mis à jour avec succès',
      });

      setOpen(false);
      if (onHotelUpdated) onHotelUpdated();
    } catch (error) {
      console.error('Error updating hotel:', error);
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' ? 'Failed to update hotel' : 'Impossible de mettre à jour l\'hôtel',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAmenitiesChange = (value: string) => {
    const amenities = value.split(',').map(item => item.trim()).filter(item => item.length > 0);
    setFormData({ ...formData, amenities });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            {language === 'en' ? 'Edit Hotel' : 'Modifier l\'Hôtel'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {language === 'en' ? 'Hotel Name' : 'Nom de l\'Hôtel'} *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">
                {language === 'en' ? 'Location' : 'Emplacement'} *
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              {language === 'en' ? 'Description' : 'Description'}
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">
              {language === 'en' ? 'Address' : 'Adresse'}
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">
                {language === 'en' ? 'Phone' : 'Téléphone'}
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">
                {language === 'en' ? 'Email' : 'Email'}
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">
                {language === 'en' ? 'Rating' : 'Note'} (0-5)
              </Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">
              {language === 'en' ? 'Website' : 'Site Web'}
            </Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amenities">
              {language === 'en' ? 'Amenities' : 'Équipements'}
            </Label>
            <Input
              id="amenities"
              value={formData.amenities.join(', ')}
              onChange={(e) => handleAmenitiesChange(e.target.value)}
              placeholder={language === 'en' ? 'WiFi, Pool, Gym, Restaurant...' : 'WiFi, Piscine, Gym, Restaurant...'}
            />
            <p className="text-xs text-muted-foreground">
              {language === 'en' ? 'Separate amenities with commas' : 'Séparez les équipements par des virgules'}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">
              {language === 'en' ? 'Status' : 'Statut'}
            </Label>
            <Select value={formData.status} onValueChange={(value) => 
              setFormData({ ...formData, status: value as 'approved' | 'pending' | 'active' | 'rejected' | 'suspended' })
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approved">
                  {language === 'en' ? 'Approved' : 'Approuvé'}
                </SelectItem>
                <SelectItem value="active">
                  {language === 'en' ? 'Active' : 'Actif'}
                </SelectItem>
                <SelectItem value="pending">
                  {language === 'en' ? 'Pending' : 'En attente'}
                </SelectItem>
                <SelectItem value="rejected">
                  {language === 'en' ? 'Rejected' : 'Rejeté'}
                </SelectItem>
                <SelectItem value="suspended">
                  {language === 'en' ? 'Suspended' : 'Suspendu'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ImageUpload
            images={formData.images}
            onImagesChange={(images) => setFormData({ ...formData, images })}
            maxImages={10}
            label={language === 'en' ? 'Hotel Photos' : 'Photos de l\'Hôtel'}
          />

          <div className="space-y-2">
            <Label htmlFor="admin_notes">
              {language === 'en' ? 'Admin Notes' : 'Notes Admin'}
            </Label>
            <Textarea
              id="admin_notes"
              value={formData.admin_notes}
              onChange={(e) => setFormData({ ...formData, admin_notes: e.target.value })}
              rows={2}
              placeholder={language === 'en' ? 'Internal notes for administrators...' : 'Notes internes pour les administrateurs...'}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {language === 'en' ? 'Cancel' : 'Annuler'}
            </Button>
            <Button type="submit" disabled={loading} className="gradient-ivorian">
              {loading ? (language === 'en' ? 'Updating...' : 'Mise à jour...') : (language === 'en' ? 'Update Hotel' : 'Mettre à Jour')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditHotelDialog;