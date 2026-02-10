-- Add expires_at column for auto-cleanup (10 days after creation)
alter table public.valentines
  add column if not exists expires_at timestamptz
  generated always as (created_at + interval '10 days') stored;

-- Optional: create index for efficient cleanup queries
create index if not exists idx_valentines_expires_at on public.valentines (expires_at);

-- Cleanup: run periodically (e.g. via Vercel Cron or Supabase Edge Function)
-- Delete expired rows. Storage files should be removed separately via Supabase client
-- before deleting rows (fetch photo1_path, photo2_path, delete from storage, then delete row).
