-- Add VIN and Software Image URL columns to bookings table
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS vin TEXT,
ADD COLUMN IF NOT EXISTS software_version_image_url TEXT;

-- Create storage bucket for booking files if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('booking-files', 'booking-files', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow public uploads
-- Drop first to avoid error if exists
DROP POLICY IF EXISTS "Public Uploads" ON storage.objects;
CREATE POLICY "Public Uploads" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'booking-files' );

-- Policy to allow public reads
DROP POLICY IF EXISTS "Public Reads" ON storage.objects;
CREATE POLICY "Public Reads"
ON storage.objects FOR SELECT
USING ( bucket_id = 'booking-files' );
