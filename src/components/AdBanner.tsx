import { useState, useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

export interface Ad {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  target_url: string;
  advertiser_name: string;
  advertiser_email: string;
  ad_type: string;
  position: string;
  location_filter: string[] | null;
  budget_limit: number | null;
  budget_spent: number;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  price_per_click: number;
  price_per_impression: number;
}

interface AdBannerProps {
  type: 'banner' | 'sidebar' | 'search_result' | 'featured';
  position: 'top' | 'middle' | 'bottom' | 'left' | 'right';
  location?: string;
  className?: string;
  dismissible?: boolean;
}

const AdBanner = ({ type, position, location, className = '', dismissible = false }: AdBannerProps) => {
  const [ad, setAd] = useState<Ad | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAd();
  }, [type, position, location]);

  const fetchAd = async () => {
    try {
      setIsLoading(true);
      let query = supabase
        .from('ads')
        .select('*')
        .eq('ad_type', type)
        .eq('position', position)
        .eq('is_active', true);

      if (location) {
        query = query.or(`location_filter.is.null,location_filter.cs.{${location}}`);
      }

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching ad:', error);
        return;
      }

      if (data) {
        setAd(data);
        trackImpression(data.id);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const trackImpression = async (adId: string) => {
    try {
      await supabase.from('ad_analytics').insert({
        ad_id: adId,
        event_type: 'impression',
        user_location: location,
        user_agent: navigator.userAgent
      });
    } catch (error) {
      console.error('Error tracking impression:', error);
    }
  };

  const trackClick = async (adId: string) => {
    try {
      await supabase.from('ad_analytics').insert({
        ad_id: adId,
        event_type: 'click',
        user_location: location,
        user_agent: navigator.userAgent
      });
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  const handleAdClick = () => {
    if (ad) {
      trackClick(ad.id);
      window.open(ad.target_url, '_blank');
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible || isLoading || !ad) {
    return null;
  }

  const getAdClasses = () => {
    const baseClasses = "cursor-pointer hover:scale-[1.02] transition-transform duration-200";
    
    switch (type) {
      case 'banner':
        return `${baseClasses} w-full max-w-4xl mx-auto`;
      case 'sidebar':
        return `${baseClasses} w-64 max-w-xs`;
      case 'search_result':
        return `${baseClasses} w-full`;
      case 'featured':
        return `${baseClasses} w-full max-w-2xl`;
      default:
        return baseClasses;
    }
  };

  return (
    <Card className={`${getAdClasses()} ${className} relative glass-morphism border-primary/20`}>
      {dismissible && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 h-6 w-6 opacity-60 hover:opacity-100"
          onClick={handleDismiss}
        >
          <X className="w-3 h-3" />
        </Button>
      )}
      
      <CardContent className="p-3" onClick={handleAdClick}>
        <div className="flex gap-3 items-center">
          {ad.image_url && (
            <img
              src={ad.image_url}
              alt={ad.title}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-sm text-foreground truncate">
                {ad.title}
              </h3>
              <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            </div>
            
            {ad.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {ad.description}
              </p>
            )}
            
            <p className="text-xs text-primary/80 mt-1">
              Par {ad.advertiser_name}
            </p>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mt-2 text-center opacity-60">
          Publicité
        </div>
      </CardContent>
    </Card>
  );
};

export default AdBanner;