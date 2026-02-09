-- Valentines table
create table if not exists public.valentines (
  id text primary key,
  target text not null check (target in ('for_him', 'for_her')),
  photo1_path text not null,
  photo2_path text not null,
  created_at timestamptz default now()
);

-- Allow anonymous insert (for creating valentines without auth)
alter table public.valentines enable row level security;

create policy "Allow anonymous insert"
  on public.valentines for insert
  to anon
  with check (true);

create policy "Allow public read by id"
  on public.valentines for select
  to anon
  using (true);

-- Storage bucket for photos (create via Supabase Dashboard or run in SQL Editor)
-- insert into storage.buckets (id, name, public) values ('photos', 'photos', true);
-- create policy "Allow public read" on storage.objects for select using (bucket_id = 'photos');
-- create policy "Allow anonymous upload" on storage.objects for insert to anon with check (bucket_id = 'photos');
