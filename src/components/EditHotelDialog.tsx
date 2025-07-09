import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppMode } from '@/hooks/useAppMode';
import { useToast } from '@/hooks/use-toast';

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

interface EditHotelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hotel: Hotel | null;
}

export const EditHotelDialog = ({ open, onOpenChange, hotel }: EditHotelDialogProps) => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rooms: '',
    status: '',
    description: ''
  });

  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name,
        location: hotel.location,
        rooms: hotel.rooms.toString(),
        status: hotel.status,
        description: ''
      });
    }
  }, [hotel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.rooms) {
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' ? 'Please fill in all required fields' : 'Veuillez remplir tous les champs obligatoires',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: language === 'en' ? 'Hotel Updated' : 'Hôtel Modifié',
      description: language === 'en' ? `${formData.name} has been updated successfully` : `${formData.name} a été modifié avec succès`
    });

    onOpenChange(false);
  };

  if (!hotel) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {language === 'en' ? 'Edit Hotel' : 'Modifier l\'Hôtel'}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' 
              ? 'Update the hotel information.' 
              : 'Mettre à jour les informations de l\'hôtel.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-name">
              {language === 'en' ? 'Hotel Name' : 'Nom de l\'Hôtel'} *
            </Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="edit-location">
              {language === 'en' ? 'Location' : 'Localisation'} *
            </Label>
            <Input
              id="edit-location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="edit-rooms">
              {language === 'en' ? 'Number of Rooms' : 'Nombre de Chambres'} *
            </Label>
            <Input
              id="edit-rooms"
              type="number"
              value={formData.rooms}
              onChange={(e) => setFormData(prev => ({ ...prev, rooms: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="edit-status">
              {language === 'en' ? 'Status' : 'Statut'}
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">
                  {language === 'en' ? 'Active' : 'Actif'}
                </SelectItem>
                <SelectItem value="inactive">
                  {language === 'en' ? 'Inactive' : 'Inactif'}
                </SelectItem>
                <SelectItem value="pending">
                  {language === 'en' ? 'Pending' : 'En attente'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="edit-description">
              {language === 'en' ? 'Description' : 'Description'}
            </Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder={language === 'en' ? 'Additional notes or description' : 'Notes additionnelles ou description'}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {language === 'en' ? 'Cancel' : 'Annuler'}
            </Button>
            <Button type="submit">
              {language === 'en' ? 'Update Hotel' : 'Mettre à Jour'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};