-- Remove the webhook trigger to restore booking functionality
DROP TRIGGER IF EXISTS on_booking_change ON public.bookings;
DROP FUNCTION IF EXISTS public.handle_reservation_webhook();
