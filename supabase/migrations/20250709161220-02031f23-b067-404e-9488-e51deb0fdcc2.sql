-- Create subscriptions table for subscription management
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('freemium', 'premium', 'enterprise')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'suspended')),
  start_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_date TIMESTAMPTZ,
  auto_renew BOOLEAN DEFAULT true,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create hotels table with enhanced admin management
CREATE TABLE public.hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  images TEXT[],
  amenities TEXT[],
  room_types JSONB DEFAULT '[]',
  pricing JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended', 'active')),
  admin_notes TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES auth.users(id)
);

-- Create hotel analytics table
CREATE TABLE public.hotel_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES public.hotels(id) ON DELETE CASCADE,
  views INTEGER DEFAULT 0,
  bookings INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create subscription notifications table
CREATE TABLE public.subscription_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('expiry_warning_7d', 'expiry_warning_1d', 'expired', 'renewed')),
  sent_at TIMESTAMPTZ DEFAULT now(),
  email_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions
CREATE POLICY "Users can view their own subscriptions" ON public.subscriptions
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" ON public.subscriptions
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Service can manage all subscriptions" ON public.subscriptions
FOR ALL USING (true);

-- RLS Policies for hotels
CREATE POLICY "Everyone can view approved hotels" ON public.hotels
FOR SELECT USING (status = 'approved' OR status = 'active');

CREATE POLICY "Hotel owners can view their own hotels" ON public.hotels
FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Hotel owners can insert their own hotels" ON public.hotels
FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Hotel owners can update their own hotels" ON public.hotels
FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Admins can manage all hotels" ON public.hotels
FOR ALL USING (true);

-- RLS Policies for hotel analytics
CREATE POLICY "Hotel owners can view their analytics" ON public.hotel_analytics
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.hotels 
    WHERE hotels.id = hotel_analytics.hotel_id 
    AND hotels.owner_id = auth.uid()
  )
);

CREATE POLICY "Admins can view all analytics" ON public.hotel_analytics
FOR ALL USING (true);

-- RLS Policies for subscription notifications
CREATE POLICY "Users can view their own notifications" ON public.subscription_notifications
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service can manage notifications" ON public.subscription_notifications
FOR ALL USING (true);

-- Create indexes for performance
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_subscriptions_end_date ON public.subscriptions(end_date);
CREATE INDEX idx_hotels_owner_id ON public.hotels(owner_id);
CREATE INDEX idx_hotels_status ON public.hotels(status);
CREATE INDEX idx_hotels_location ON public.hotels(location);
CREATE INDEX idx_hotel_analytics_hotel_id ON public.hotel_analytics(hotel_id);
CREATE INDEX idx_hotel_analytics_date ON public.hotel_analytics(date);

-- Create updated_at triggers
CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hotels_updated_at
BEFORE UPDATE ON public.hotels
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for testing
INSERT INTO public.subscriptions (user_id, plan_type, status, end_date) VALUES
(gen_random_uuid(), 'premium', 'active', now() + interval '30 days'),
(gen_random_uuid(), 'freemium', 'active', null),
(gen_random_uuid(), 'premium', 'expired', now() - interval '5 days');

INSERT INTO public.hotels (owner_id, name, description, location, status) VALUES
(gen_random_uuid(), 'Hotel Ivoire Palace', 'Luxury hotel in the heart of Abidjan', 'Abidjan, Plateau', 'approved'),
(gen_random_uuid(), 'Grand Hotel Bassam', 'Historic hotel with modern amenities', 'Grand-Bassam', 'pending'),
(gen_random_uuid(), 'Hotel Tiama', 'Business hotel with conference facilities', 'Abidjan, Marcory', 'active'),
(gen_random_uuid(), 'Safari Lodge Yamoussoukro', 'Safari experience near the capital', 'Yamoussoukro', 'suspended');