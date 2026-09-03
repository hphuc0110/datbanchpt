-- Allow public booking API to update Pancake sync fields without granting
-- broad SELECT/UPDATE to anon (anon key is public in the browser).

create or replace function public.set_booking_pancake_sync(
  p_booking_id uuid,
  p_order_id bigint default null,
  p_system_id bigint default null,
  p_sync_status text default null,
  p_sync_error text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_sync_status is not null
     and p_sync_status not in ('pending', 'synced', 'failed', 'skipped') then
    raise exception 'invalid pancake_sync_status';
  end if;

  update public.bookings
  set
    pancake_order_id = coalesce(p_order_id, pancake_order_id),
    pancake_system_id = coalesce(p_system_id, pancake_system_id),
    pancake_sync_status = coalesce(p_sync_status, pancake_sync_status),
    pancake_sync_error = p_sync_error,
    pancake_synced_at = now()
  where id = p_booking_id
    and created_at > now() - interval '24 hours';
end;
$$;

revoke all on function public.set_booking_pancake_sync(uuid, bigint, bigint, text, text) from public;
grant execute on function public.set_booking_pancake_sync(uuid, bigint, bigint, text, text)
  to anon, authenticated;
