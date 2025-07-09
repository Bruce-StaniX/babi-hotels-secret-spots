import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAppMode } from '@/hooks/useAppMode';
import { HotelFormData } from '@/hooks/useHotelEditForm';

interface HotelBasicInfoProps {
  formData: HotelFormData;
  onUpdate: (updates: Partial<HotelFormData>) => void;
}

export const HotelBasicInfo = ({ formData, onUpdate }: HotelBasicInfoProps) => {
  const { language } = useAppMode();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            {language === 'en' ? 'Hotel Name' : 'Nom de l\'Hôtel'} *
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
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
            onChange={(e) => onUpdate({ location: e.target.value })}
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
          onChange={(e) => onUpdate({ description: e.target.value })}
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
          onChange={(e) => onUpdate({ address: e.target.value })}
        />
      </div>
    </>
  );
};