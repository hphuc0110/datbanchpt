-- Pancake POS sync fields for bookings
alter table public.bookings
  add column if not exists pancake_order_id bigint,
  add column if not exists pancake_system_id bigint,
  add column if not exists pancake_sync_status text not null default 'pending'
    check (pancake_sync_status in ('pending', 'synced', 'failed', 'skipped')),
  add column if not exists pancake_sync_error text,
  add column if not exists pancake_synced_at timestamptz;

create index if not exists bookings_pancake_order_id_idx
  on public.bookings (pancake_order_id)
  where pancake_order_id is not null;
