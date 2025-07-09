import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppMode } from '@/hooks/useAppMode';
import { HotelFormData } from '@/hooks/useHotelEditForm';

interface HotelContactInfoProps {
  formData: HotelFormData;
  onUpdate: (updates: Partial<HotelFormData>) => void;
}

export const HotelContactInfo = ({ formData, onUpdate }: HotelContactInfoProps) => {
  const { language } = useAppMode();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">
            {language === 'en' ? 'Phone' : 'Téléphone'}
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
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
            onChange={(e) => onUpdate({ email: e.target.value })}
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
            onChange={(e) => onUpdate({ rating: parseFloat(e.target.value) || 0 })}
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
          onChange={(e) => onUpdate({ website: e.target.value })}
          placeholder="https://"
        />
      </div>
    </>
  );
};