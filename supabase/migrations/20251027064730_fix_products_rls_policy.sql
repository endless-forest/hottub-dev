/*
  # Fix Products RLS Policy
  
  1. Changes
    - Drop existing policy that uses 'public' role
    - Create new policy that allows 'anon' role to view products
    - This fixes the issue where products weren't loading on the frontend
  
  2. Security
    - Products remain publicly readable
    - Only affects SELECT operations
*/

-- Drop the old policy
DROP POLICY IF EXISTS "Anyone can view products" ON products;

-- Create new policy with correct role
CREATE POLICY "Enable read access for all users"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);
