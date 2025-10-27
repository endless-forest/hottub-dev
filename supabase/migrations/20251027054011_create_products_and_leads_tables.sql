/*
  # Create products and leads tables for Santa Rosa Spas

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - Hot tub model name
      - `brand` (text) - Manufacturer/brand
      - `description` (text) - Product description
      - `price_range` (text) - Price range display
      - `image_url` (text) - Product image URL
      - `created_at` (timestamptz) - Creation timestamp
    
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text) - Customer name
      - `email` (text) - Customer email
      - `message` (text) - Customer message
      - `created_at` (timestamptz) - Submission timestamp
  
  2. Security
    - Enable RLS on both tables
    - Products: Public read access (anyone can view)
    - Leads: Public insert access (anyone can submit), authenticated read access
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  description text NOT NULL,
  price_range text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit leads"
  ON leads FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);