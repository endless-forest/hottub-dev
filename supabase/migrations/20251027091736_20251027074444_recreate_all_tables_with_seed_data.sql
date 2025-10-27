/*
  # Recreate All Tables with Seed Data for Santa Rosa Spas
  
  1. Tables Created
    - `products` - Hot tub inventory
      - id (uuid, primary key)
      - name (text) - Model name
      - brand (text) - Manufacturer
      - description (text) - Product details
      - price_range (text) - Display price
      - image_url (text) - Product image
      - video_url (text) - Product video
      - created_at (timestamptz)
    
    - `leads` - Customer inquiries from contact form
      - id (uuid, primary key)
      - name (text) - Customer name
      - email (text) - Customer email
      - phone (text) - Customer phone
      - message (text) - Inquiry message
      - source (text) - Lead origin
      - created_at (timestamptz)
    
    - `appointments` - Showroom visit bookings
      - id (uuid, primary key)
      - name (text) - Customer name
      - email (text) - Customer email
      - phone (text) - Customer phone
      - date (date) - Appointment date
      - time (text) - Appointment time
      - model_interest (text) - Product of interest
      - notes (text) - Additional notes
      - status (text) - Status (pending/confirmed/completed/cancelled)
      - created_at (timestamptz)
  
  2. Security (RLS Policies)
    - Products: Anyone can view (anon + authenticated)
    - Leads: Anyone can submit, authenticated can view
    - Appointments: Anyone can book, authenticated can view/update
  
  3. Seed Data
    - 3 hot tub products with real images from Pexels
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  description text NOT NULL,
  price_range text NOT NULL,
  image_url text NOT NULL,
  video_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view products" ON products;
DROP POLICY IF EXISTS "Enable read access for all users" ON products;

-- Create products policy
CREATE POLICY "Enable read access for all users"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  source text DEFAULT 'website',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on leads
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can submit leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can view leads" ON leads;

-- Create leads policies
CREATE POLICY "Anyone can submit leads"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  date date NOT NULL,
  time text NOT NULL,
  model_interest text,
  notes text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on appointments
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can book appointments" ON appointments;
DROP POLICY IF EXISTS "Authenticated users can view appointments" ON appointments;
DROP POLICY IF EXISTS "Authenticated users can update appointments" ON appointments;

-- Create appointments policies
CREATE POLICY "Anyone can book appointments"
  ON appointments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update appointments"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Seed products data (clear existing first)
DELETE FROM products;

INSERT INTO products (name, brand, description, price_range, image_url, video_url) VALUES
  (
    'Serenity 4000',
    'AquaTherm',
    'Perfect for families, this 4-person spa features LED mood lighting, 28 precision jets, and an energy-efficient heating system. Built with premium acrylic and includes a waterproof cover.',
    '$6,000–$8,000',
    'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg',
    'https://youtu.be/demo1'
  ),
  (
    'Cascade Elite',
    'HydroLux',
    'Our premium 6-person luxury model with cascading waterfall feature, therapeutic jet system with 42 jets, built-in sound system, and smartphone app control. Perfect for entertaining.',
    '$9,000–$12,000',
    'https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg',
    'https://youtu.be/demo2'
  ),
  (
    'Tranquil Duo',
    'ZenFlow',
    'Compact 2-person spa ideal for smaller spaces without compromising on features. Includes 18 therapeutic jets, LED lighting, and whisper-quiet operation. Great for apartments and patios.',
    '$4,000–$6,000',
    'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg',
    'https://youtu.be/demo3'
  );