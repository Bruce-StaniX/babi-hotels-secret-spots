import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAppMode } from '@/hooks/useAppMode';
import { Edit } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { useHotelEditForm } from '@/hooks/useHotelEditForm';
import { HotelBasicInfo } from './HotelBasicInfo';
import { HotelContactInfo } from './HotelContactInfo';
import { HotelAdditionalInfo } from './HotelAdditionalInfo';

type Hotel = Tables<'hotels'>;

interface EditHotelDialogProps {
  children: React.ReactNode;
  hotel: Hotel;
  onHotelUpdated?: () => void;
}

const EditHotelDialog = ({ children, hotel, onHotelUpdated }: EditHotelDialogProps) => {
  const { language } = useAppMode();
  const [open, setOpen] = useState(false);
  
  const {
    formData,
    loading,
    updateFormData,
    handleAmenitiesChange,
    handleSubmit
  } = useHotelEditForm(hotel, () => {
    setOpen(false);
    if (onHotelUpdated) onHotelUpdated();
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            {language === 'en' ? 'Edit Hotel' : 'Modifier l\'Hôtel'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <HotelBasicInfo 
            formData={formData} 
            onUpdate={updateFormData} 
          />
          
          <HotelContactInfo 
            formData={formData} 
            onUpdate={updateFormData} 
          />
          
          <HotelAdditionalInfo 
            formData={formData} 
            onUpdate={updateFormData}
            onAmenitiesChange={handleAmenitiesChange}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {language === 'en' ? 'Cancel' : 'Annuler'}
            </Button>
            <Button type="submit" disabled={loading} className="gradient-ivorian hover-scale">
              {loading ? (language === 'en' ? 'Updating...' : 'Mise à jour...') : (language === 'en' ? 'Update Hotel' : 'Mettre à Jour')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditHotelDialog;