import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppMode } from '@/hooks/useAppMode';
import { HotelFormData } from '@/hooks/useHotelEditForm';
import { ImageUpload } from '@/components/ImageUpload';

interface HotelAdditionalInfoProps {
  formData: HotelFormData;
  onUpdate: (updates: Partial<HotelFormData>) => void;
  onAmenitiesChange: (value: string) => void;
}

export const HotelAdditionalInfo = ({ formData, onUpdate, onAmenitiesChange }: HotelAdditionalInfoProps) => {
  const { language } = useAppMode();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="amenities">
          {language === 'en' ? 'Amenities' : 'Équipements'}
        </Label>
        <Input
          id="amenities"
          value={formData.amenities.join(', ')}
          onChange={(e) => onAmenitiesChange(e.target.value)}
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
        <Select 
          value={formData.status} 
          onValueChange={(value) => onUpdate({ 
            status: value as 'approved' | 'pending' | 'active' | 'rejected' | 'suspended' 
          })}
        >
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
        onImagesChange={(images) => onUpdate({ images })}
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
          onChange={(e) => onUpdate({ admin_notes: e.target.value })}
          rows={2}
          placeholder={language === 'en' ? 'Internal notes for administrators...' : 'Notes internes pour les administrateurs...'}
        />
      </div>
    </>
  );
};