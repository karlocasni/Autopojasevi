-- Ensure Bookings table allows new reservations (Public Insert)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public inserts" ON bookings;
CREATE POLICY "Allow public inserts" ON bookings FOR INSERT WITH CHECK (true);

-- Allow reading own bookings (optional, if you use it)
-- DROP POLICY IF EXISTS "Allow public read" ON bookings;
-- CREATE POLICY "Allow public read" ON bookings FOR SELECT USING (true); -- CAREFUL: This exposes all bookings if not filtered!

-- Ensure columns are nullable just in case
ALTER TABLE bookings ALTER COLUMN vin DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN software_version_image_url DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN broj_pojaseva DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN broj_zvjezdica DROP NOT NULL;
