
-- Enable RLS on services table
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Allow public read access to services
CREATE POLICY "Allow public read access" ON services
  FOR SELECT USING (true);

-- Allow authenticated users (admins) to insert/update/delete services
CREATE POLICY "Allow authenticated insert" ON services
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON services
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON services
  FOR DELETE USING (auth.role() = 'authenticated');
