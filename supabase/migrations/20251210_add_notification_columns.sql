-- Add notification tracking columns to bookings table

ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS sms_tag TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS reminder_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT FALSE;

-- Optional: Create an index for faster querying of reminders
CREATE INDEX IF NOT EXISTS idx_bookings_reminder_date 
ON public.bookings (appointment_date, reminder_sent);
