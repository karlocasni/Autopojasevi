-- Add specialized price columns to services table
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS price_disassembled numeric,
ADD COLUMN IF NOT EXISTS price_per_star numeric;
