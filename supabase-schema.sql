-- Run this in your Supabase SQL Editor:
  
CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL,
  image text,
  description text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read"
ON products FOR SELECT
USING (true);

-- Allow public insert
CREATE POLICY "Allow public insert"
ON products FOR INSERT
WITH CHECK (true);

-- Allow public update and delete for admin panel features
CREATE POLICY "Allow public update" 
ON products FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete" 
ON products FOR DELETE 
USING (true);
