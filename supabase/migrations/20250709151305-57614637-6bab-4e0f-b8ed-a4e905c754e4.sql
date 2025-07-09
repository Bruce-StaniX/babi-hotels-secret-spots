-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create ads table for managing advertisements
CREATE TABLE public.ads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  target_url TEXT NOT NULL,
  advertiser_name TEXT NOT NULL,
  advertiser_email TEXT NOT NULL,
  location_filter TEXT[], -- Array of communes where ad should show
  ad_type TEXT NOT NULL CHECK (ad_type IN ('banner', 'sidebar', 'search_result', 'featured')),
  position TEXT NOT NULL CHECK (position IN ('top', 'middle', 'bottom', 'left', 'right')),
  price_per_click DECIMAL(10,2) DEFAULT 0,
  price_per_impression DECIMAL(10,2) DEFAULT 0,
  budget_limit DECIMAL(10,2),
  budget_spent DECIMAL(10,2) DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ad_analytics table for tracking performance
CREATE TABLE public.ad_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ad_id UUID NOT NULL REFERENCES public.ads(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('impression', 'click')),
  user_location TEXT, -- commune where event occurred
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for ads (public read access for active ads)
CREATE POLICY "Anyone can view active ads" 
ON public.ads 
FOR SELECT 
USING (is_active = true AND (end_date IS NULL OR end_date > now()) AND start_date <= now());

-- Create policies for ad analytics (public insert for tracking)
CREATE POLICY "Anyone can insert ad analytics" 
ON public.ad_analytics 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_ads_active ON public.ads (is_active, start_date, end_date);
CREATE INDEX idx_ads_type_position ON public.ads (ad_type, position);
CREATE INDEX idx_ads_location ON public.ads USING GIN(location_filter);
CREATE INDEX idx_ad_analytics_ad_id ON public.ad_analytics (ad_id);
CREATE INDEX idx_ad_analytics_created_at ON public.ad_analytics (created_at);

-- Create trigger for updating updated_at timestamp
CREATE TRIGGER update_ads_updated_at
BEFORE UPDATE ON public.ads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample ads for demonstration
INSERT INTO public.ads (title, description, image_url, target_url, advertiser_name, advertiser_email, location_filter, ad_type, position, price_per_click, budget_limit) VALUES
('Restaurant Le Palmier', 'Cuisine ivoirienne authentique près de vos hébergements', 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400', 'https://restaurant-palmier.ci', 'Restaurant Le Palmier', 'contact@palmier.ci', ARRAY['cocody', 'plateau', 'marcory'], 'banner', 'top', 0.50, 50000),
('Taxi VIP Abidjan', 'Transport discret et confortable 24h/24', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400', 'https://taxivip-abidjan.ci', 'Taxi VIP', 'info@taxivip.ci', NULL, 'sidebar', 'right', 0.75, 75000),
('Boutique Elegance', 'Mode et accessoires de luxe à Cocody', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', 'https://elegance-boutique.ci', 'Boutique Elegance', 'contact@elegance.ci', ARRAY['cocody', 'plateau'], 'search_result', 'middle', 1.00, 100000),
('Spa Détente Royale', 'Massage et bien-être dans un cadre discret', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400', 'https://spa-detente.ci', 'Spa Détente', 'reservation@spa-detente.ci', ARRAY['cocody', 'marcory', 'plateau'], 'featured', 'top', 1.25, 80000);