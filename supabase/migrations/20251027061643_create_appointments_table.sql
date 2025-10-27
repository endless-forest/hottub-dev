/*
  # Create appointments table for showroom visit booking

  1. New Table
    - `appointments`
      - `id` (uuid, primary key)
      - `name` (text) - Customer name
      - `email` (text) - Customer email
      - `phone` (text) - Customer phone number
      - `date` (date) - Appointment date
      - `time` (text) - Appointment time
      - `model_interest` (text) - Hot tub model of interest
      - `notes` (text) - Additional notes
      - `status` (text) - Appointment status (pending, confirmed, completed, cancelled)
      - `created_at` (timestamptz) - Creation timestamp
  
  2. Security
    - Enable RLS on appointments table
    - Public can insert appointments (booking form)
    - Authenticated users can view appointments (admin dashboard)
*/

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

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can book appointments"
  ON appointments FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);