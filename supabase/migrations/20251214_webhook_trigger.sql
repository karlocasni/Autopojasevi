-- Create a hook to trigger the edge function on INSERT and UPDATE
-- NOTE: You might need to enable the 'pg_net' extension if not enabled.
create extension if not exists pg_net;

-- Create the trigger function if it doesn't exist
create or replace function public.handle_reservation_webhook()
returns trigger as $$
begin
  perform net.http_post(
    url := 'https://gcpgmzewvaclbxeyvjng.supabase.co/functions/v1/handle-reservation-update',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('request.header.apikey', true) || '"}',
    body := json_build_object(
      'type', TG_OP,
      'table', TG_TABLE_NAME,
      'schema', TG_TABLE_SCHEMA,
      'record', row_to_json(NEW),
      'old_record', row_to_json(OLD)
    )::jsonb
  );
  return NEW;
end;
$$ language plpgsql security definer;

-- Create the trigger
drop trigger if exists on_booking_change on public.bookings;
create trigger on_booking_change
after insert or update on public.bookings
for each row execute function public.handle_reservation_webhook();
