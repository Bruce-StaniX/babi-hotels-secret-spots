import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useAppMode } from '@/hooks/useAppMode';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  label?: string;
}

export const ImageUpload = ({ 
  images, 
  onImagesChange, 
  maxImages = 10,
  label 
}: ImageUploadProps) => {
  const { language } = useAppMode();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('hotel-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('hotel-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      toast({
        title: language === 'en' ? 'Too many images' : 'Trop d\'images',
        description: language === 'en' 
          ? `Maximum ${maxImages} images allowed` 
          : `Maximum ${maxImages} images autorisées`,
        variant: 'destructive'
      });
      return;
    }

    setUploading(true);
    const newImages: string[] = [];

    for (const file of Array.from(files)) {
      if (file.type.startsWith('image/')) {
        const url = await uploadImage(file);
        if (url) {
          newImages.push(url);
        }
      }
    }

    if (newImages.length > 0) {
      onImagesChange([...images, ...newImages]);
      toast({
        title: language === 'en' ? 'Images uploaded' : 'Images téléchargées',
        description: language === 'en' 
          ? `${newImages.length} images uploaded successfully` 
          : `${newImages.length} images téléchargées avec succès`
      });
    }

    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    
    if (images.length + files.length > maxImages) {
      toast({
        title: language === 'en' ? 'Too many images' : 'Trop d\'images',
        description: language === 'en' 
          ? `Maximum ${maxImages} images allowed` 
          : `Maximum ${maxImages} images autorisées`,
        variant: 'destructive'
      });
      return;
    }

    setUploading(true);
    const newImages: string[] = [];

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const url = await uploadImage(file);
        if (url) {
          newImages.push(url);
        }
      }
    }

    if (newImages.length > 0) {
      onImagesChange([...images, ...newImages]);
    }

    setUploading(false);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div className="space-y-4">
      {label && <Label>{label}</Label>}
      
      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-col items-center gap-2">
          <Upload className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {language === 'en' 
              ? 'Drag and drop images here, or click to select'
              : 'Glissez-déposez les images ici, ou cliquez pour sélectionner'}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || images.length >= maxImages}
          >
            {uploading 
              ? (language === 'en' ? 'Uploading...' : 'Téléchargement...')
              : (language === 'en' ? 'Select Images' : 'Sélectionner Images')
            }
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="w-4 h-4" />
              </Button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  {language === 'en' ? 'Main' : 'Principal'}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        {language === 'en' 
          ? `${images.length}/${maxImages} images. First image will be the main photo.`
          : `${images.length}/${maxImages} images. La première image sera la photo principale.`}
      </p>
    </div>
  );
};