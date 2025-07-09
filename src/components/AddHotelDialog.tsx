import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppMode } from '@/hooks/useAppMode';
import { useToast } from '@/hooks/use-toast';

interface AddHotelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddHotelDialog = ({ open, onOpenChange }: AddHotelDialogProps) => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rooms: '',
    description: '',
    category: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.name || !formData.location || !formData.rooms) {
      toast({
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' ? 'Please fill in all required fields' : 'Veuillez remplir tous les champs obligatoires',
        variant: 'destructive'
      });
      return;
    }

    // Simulation d'ajout d'hôtel
    toast({
      title: language === 'en' ? 'Hotel Added' : 'Hôtel Ajouté',
      description: language === 'en' ? `${formData.name} has been added successfully` : `${formData.name} a été ajouté avec succès`
    });

    // Reset form and close dialog
    setFormData({ name: '', location: '', rooms: '', description: '', category: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {language === 'en' ? 'Add New Hotel' : 'Ajouter un Nouvel Hôtel'}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' 
              ? 'Enter the details of the new hotel.' 
              : 'Entrez les détails du nouvel hôtel.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">
              {language === 'en' ? 'Hotel Name' : 'Nom de l\'Hôtel'} *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder={language === 'en' ? 'Enter hotel name' : 'Entrez le nom de l\'hôtel'}
            />
          </div>

          <div>
            <Label htmlFor="location">
              {language === 'en' ? 'Location' : 'Localisation'} *
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder={language === 'en' ? 'Enter location' : 'Entrez la localisation'}
            />
          </div>

          <div>
            <Label htmlFor="rooms">
              {language === 'en' ? 'Number of Rooms' : 'Nombre de Chambres'} *
            </Label>
            <Input
              id="rooms"
              type="number"
              value={formData.rooms}
              onChange={(e) => setFormData(prev => ({ ...prev, rooms: e.target.value }))}
              placeholder={language === 'en' ? 'Enter number of rooms' : 'Entrez le nombre de chambres'}
            />
          </div>

          <div>
            <Label htmlFor="category">
              {language === 'en' ? 'Category' : 'Catégorie'}
            </Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'en' ? 'Select category' : 'Sélectionnez une catégorie'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="luxury">
                  {language === 'en' ? 'Luxury' : 'Luxe'}
                </SelectItem>
                <SelectItem value="business">
                  {language === 'en' ? 'Business' : 'Affaires'}
                </SelectItem>
                <SelectItem value="budget">
                  {language === 'en' ? 'Budget' : 'Économique'}
                </SelectItem>
                <SelectItem value="resort">
                  {language === 'en' ? 'Resort' : 'Resort'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">
              {language === 'en' ? 'Description' : 'Description'}
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder={language === 'en' ? 'Enter hotel description' : 'Entrez la description de l\'hôtel'}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {language === 'en' ? 'Cancel' : 'Annuler'}
            </Button>
            <Button type="submit">
              {language === 'en' ? 'Add Hotel' : 'Ajouter Hôtel'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};