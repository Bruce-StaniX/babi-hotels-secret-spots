-- Create storage bucket for hotel images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('hotel-images', 'hotel-images', true);

-- Create RLS policies for hotel images storage
CREATE POLICY "Anyone can view hotel images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'hotel-images');

CREATE POLICY "Authenticated users can upload hotel images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'hotel-images' AND auth.role() = 'authenticated');

CREATE POLICY "Hotel owners can update their hotel images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'hotel-images' AND auth.role() = 'authenticated');

CREATE POLICY "Hotel owners can delete their hotel images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'hotel-images' AND auth.role() = 'authenticated');