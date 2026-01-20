ALTER TABLE bookings ADD COLUMN IF NOT EXISTS price NUMERIC;
-- Fix: Add price column to store confirmation price
