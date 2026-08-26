-- Cung Hỷ Phát Tài — initial schema
-- Run this in Supabase SQL Editor

-- Bookings / table reservations
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  booking_date date not null,
  booking_time time not null,
  guest_count text not null,
  preferred_area text default 'Bàn thường',
  special_requests text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Contact / feedback messages
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  contact text not null,
  subject text default 'Câu hỏi / Góp ý chung',
  message text not null,
  status text not null default 'new'
    check (status in ('new', 'read', 'resolved')),
  created_at timestamptz not null default now()
);

-- Menu items (for admin CRUD & public display)
create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(12, 0),
  category text not null default 'mon-chinh'
    check (category in ('mon-chinh', 'dimsum', 'signature', 'sang')),
  image_url text,
  is_signature boolean default false,
  is_featured boolean default false,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz not null default now()
);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists bookings_updated_at on public.bookings;
create trigger bookings_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

-- RLS
alter table public.bookings enable row level security;
alter table public.contact_messages enable row level security;
alter table public.menu_items enable row level security;

-- Public can create bookings & contact messages
create policy "Anyone can create bookings"
  on public.bookings for insert
  to anon, authenticated
  with check (true);

create policy "Anyone can create contact messages"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

-- Public can read active menu items
create policy "Anyone can read active menu items"
  on public.menu_items for select
  to anon, authenticated
  using (is_active = true);

-- Authenticated admins can manage everything
create policy "Authenticated can read bookings"
  on public.bookings for select
  to authenticated
  using (true);

create policy "Authenticated can update bookings"
  on public.bookings for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can delete bookings"
  on public.bookings for delete
  to authenticated
  using (true);

create policy "Authenticated can read contact messages"
  on public.contact_messages for select
  to authenticated
  using (true);

create policy "Authenticated can update contact messages"
  on public.contact_messages for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can delete contact messages"
  on public.contact_messages for delete
  to authenticated
  using (true);

create policy "Authenticated can manage menu items"
  on public.menu_items for all
  to authenticated
  using (true)
  with check (true);

-- Seed signature dishes
insert into public.menu_items (name, description, category, is_signature, is_featured, sort_order, image_url) values
  (
    'SET XỐT CUA THƯỢNG HẢI',
    'Set tinh hoa với súp cua, mì tươi và dimsum — hương vị Thượng Hải đậm đà, cân bằng giữa ngọt thanh của cua và nước sốt đặc trưng.',
    'signature', true, true, 1,
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&q=80'
  ),
  (
    'CHÁO CUA TRIỀU CHÂU',
    'Cháo cua mềm mịn theo công thức Triều Châu, thơm vị biển và thảo mộc thanh nhẹ.',
    'signature', true, false, 2,
    'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&q=80'
  ),
  (
    'VỊT PHÚ QUÝ',
    'Vịt quay da giòn, thịt mềm, nước sốt đậm đà — món ăn tượng trưng cho sự phú quý.',
    'signature', true, false, 3,
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80'
  ),
  (
    'GÀ QUÝ PHI',
    'Gà hấp/xào theo phong cách cung đình, gia vị cân bằng, hương thơm thanh nhã.',
    'signature', true, false, 4,
    'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80'
  )
on conflict do nothing;
