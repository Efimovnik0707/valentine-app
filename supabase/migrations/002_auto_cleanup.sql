-- Add expires_at column for auto-cleanup (10 days after creation)
alter table public.valentines add column if not exists expires_at timestamptz;

-- Trigger: set expires_at on insert (PostgreSQL doesn't allow generated columns referencing other columns)
create or replace function public.set_expires_at()
returns trigger as $$
begin
  new.expires_at := new.created_at + interval '10 days';
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_expires_at_trigger on public.valentines;
create trigger set_expires_at_trigger
  before insert on public.valentines
  for each row execute function public.set_expires_at();

-- Backfill existing rows
update public.valentines set expires_at = created_at + interval '10 days' where expires_at is null;

-- Index for cleanup queries
create index if not exists idx_valentines_expires_at on public.valentines (expires_at);
