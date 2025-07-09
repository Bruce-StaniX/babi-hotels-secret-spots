import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppMode } from '@/hooks/useAppMode';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

interface AddHotelDialogProps {
  children: React.ReactNode;
  onHotelAdded?: () => void;
}

const AddHotelDialog = ({ children, onHotelAdded }: AddHotelDialogProps) => {
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
    status: 'approved' as 'approved' | 'pending' | 'active',
    admin_notes: '',
    images: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate a dummy user_id for admin-created hotels
      const dummyUserId = crypto.randomUUID();
      
      // Process images URLs
      const imageUrls = formData.images
        .split(',')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      const { error } = await supabase
        .from('hotels')
        .insert({
          ...formData,
          images: imageUrls.length > 0 ? imageUrls : null,
          owner_id: dummyUserId,
          approved_at: formData.status === 'approved' ? new Date().toISOString() : null
        });

      if (error) throw error;

      toast({
        title: language === 'en' ? 'Success' : 'Succès',
        description: language === 'en' ? 'Hotel added successfully' : 'Hôtel ajouté avec succès',
      });

      setOpen(false);
      setFormData({
        name: '',
        description: '',
        location: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        status: 'approved',
        admin_notes: '',
        images: ''
      });
      
      if (onHotelAdded) onHotelAdded();
    } catch (error) {
      console.error('Error adding hotel:', error);
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' ? 'Failed to add hotel' : 'Impossible d\'ajouter l\'hôtel',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {language === 'en' ? 'Add New Hotel' : 'Ajouter un Nouvel Hôtel'}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Label htmlFor="status">
              {language === 'en' ? 'Initial Status' : 'Statut Initial'}
            </Label>
            <Select value={formData.status} onValueChange={(value) => 
              setFormData({ ...formData, status: value as 'approved' | 'pending' | 'active' })
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
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">
              {language === 'en' ? 'Photos (URLs)' : 'Photos (URLs)'}
            </Label>
            <Textarea
              id="images"
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              rows={3}
              placeholder={language === 'en' 
                ? 'Enter image URLs separated by commas...\nhttps://example.com/image1.jpg, https://example.com/image2.jpg'
                : 'Entrez les URLs des images séparées par des virgules...\nhttps://example.com/image1.jpg, https://example.com/image2.jpg'
              }
            />
            <p className="text-xs text-muted-foreground">
              {language === 'en' 
                ? 'Separate multiple image URLs with commas. First image will be the main photo.'
                : 'Séparez les URLs des images par des virgules. La première image sera la photo principale.'
              }
            </p>
          </div>

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
              {loading ? (language === 'en' ? 'Adding...' : 'Ajout...') : (language === 'en' ? 'Add Hotel' : 'Ajouter l\'Hôtel')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHotelDialog;