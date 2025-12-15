-- Add columns if they don't exist
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS vin TEXT,
ADD COLUMN IF NOT EXISTS software_version_image_url TEXT;

-- Create bucket if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('booking-files', 'booking-files', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Public Reads" ON storage.objects;

-- Re-create policies ensuring they target the specific bucket
CREATE POLICY "Public Uploads" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'booking-files' );

CREATE POLICY "Public Reads"
ON storage.objects FOR SELECT
USING ( bucket_id = 'booking-files' );
