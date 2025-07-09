import { useState } from 'react';
import { Tables } from '@/integrations/supabase/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAppMode } from '@/hooks/useAppMode';

type Hotel = Tables<'hotels'>;

export interface HotelFormData {
  name: string;
  description: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  status: 'approved' | 'pending' | 'active' | 'rejected' | 'suspended';
  admin_notes: string;
  rating: number;
  amenities: string[];
  images: string[];
}

export const useHotelEditForm = (hotel: Hotel, onSuccess?: () => void) => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<HotelFormData>({
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

  const updateFormData = (updates: Partial<HotelFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleAmenitiesChange = (value: string) => {
    const amenities = value.split(',').map(item => item.trim()).filter(item => item.length > 0);
    updateFormData({ amenities });
  };

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

      if (onSuccess) onSuccess();
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

  return {
    formData,
    loading,
    updateFormData,
    handleAmenitiesChange,
    handleSubmit
  };
};