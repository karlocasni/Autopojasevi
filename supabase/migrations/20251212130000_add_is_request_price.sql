
-- Add is_request_price column to services table
ALTER TABLE services ADD COLUMN IF NOT EXISTS is_request_price BOOLEAN DEFAULT FALSE;
