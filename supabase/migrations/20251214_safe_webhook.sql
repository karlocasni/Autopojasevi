-- Enable the pg_net extension for HTTP requests
create extension if not exists pg_net;

-- Create the trigger function with Error Handling (Safe Mode)
create or replace function public.handle_reservation_webhook()
returns trigger as $$
declare
  -- Hardcode the Anon Key to ensure it's available in the trigger context
  anon_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjcGdtemV3dmFjbGJ4ZXl2am5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NTczMzQsImV4cCI6MjA4MDUzMzMzNH0.MsapRRGwXMwadiSTWedBP87jm7HQL4LV0EFI5ENDnJM';
begin
  begin
    perform net.http_post(
      url := 'https://gcpgmzewvaclbxeyvjng.supabase.co/functions/v1/handle-reservation-update',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || anon_key
      ),
      body := jsonb_build_object(
        'type', TG_OP,
        'table', TG_TABLE_NAME,
        'schema', TG_TABLE_SCHEMA,
        'record', row_to_json(NEW),
        'old_record', row_to_json(OLD)
      )
    );
  exception when others then
    -- KEY CHANGE: Catch any error so the Booking is SAVED even if email fails
    raise warning 'Webhook trigger failed: %', SQLERRM;
  end;
  return NEW;
end;
$$ language plpgsql security definer;

-- Re-attach the trigger
drop trigger if exists on_booking_change on public.bookings;
create trigger on_booking_change
after insert or update on public.bookings
for each row execute function public.handle_reservation_webhook();
