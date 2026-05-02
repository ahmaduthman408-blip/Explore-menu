-- Supabase SQL Schema for Admin Dashboard

-- 1. Products Table
CREATE TABLE public.products (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  volume TEXT,
  notes TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  video_url TEXT,
  category TEXT,
  stock_left INTEGER DEFAULT 100,
  tags TEXT[] DEFAULT '{}',
  urgency_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Orders Table
CREATE TABLE public.orders (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Pending', 'Processing', 'Shipped', 'Delivered')) DEFAULT 'Pending',
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Reviews Table
CREATE TABLE public.reviews (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Customers Table
CREATE TABLE public.customers (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  orders_count INTEGER DEFAULT 0,
  total_spent NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Settings Table (Enforced as a single row)
CREATE TABLE public.settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  website_name TEXT NOT NULL DEFAULT 'EXPLORE MENU',
  logo TEXT DEFAULT '',
  our_story TEXT DEFAULT 'Welcome to our store. We provide the best fragrance experiences.',
  admin_password TEXT NOT NULL DEFAULT 'Abu Nasir 123'
);

-- Insert initial default settings
INSERT INTO public.settings (id, website_name, logo, our_story, admin_password) 
VALUES (
  1, 
  'EXPLORE MENU', 
  '', 
  'Welcome to our store. We provide the best fragrance experiences.', 
  'Abu Nasir 123'
)
ON CONFLICT (id) DO NOTHING;

-- Row Level Security (RLS) Policies (Optional but recommended)
-- Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products, reviews, and settings
CREATE POLICY "Public products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public settings are viewable by everyone" ON public.settings FOR SELECT USING (true);

-- (Requires authenticated roles for insert/update/delete. To allow anonymous inserts during dev, change 'false' to 'true')
CREATE POLICY "Admin full access products" ON public.products FOR ALL USING (true);
CREATE POLICY "Admin full access orders" ON public.orders FOR ALL USING (true);
CREATE POLICY "Admin full access reviews" ON public.reviews FOR ALL USING (true);
CREATE POLICY "Admin full access customers" ON public.customers FOR ALL USING (true);
CREATE POLICY "Admin full access settings" ON public.settings FOR ALL USING (true);
